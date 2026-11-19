/* 品牌 TAB 独立时间模型：只筛选固定虚构样例，不修改商品详情或原始关系数据。 */
(() => {
  'use strict';
  const D = window.ChannelReviewData;
  const R = window.ProductReviewData;
  const END = '2026-11-18';
  const options = Object.freeze([
    {value:'7D', label:'近7天', start:'2026-11-11', end:END},
    {value:'1M', label:'近1月', start:'2026-10-18', end:END},
    {value:'3M', label:'近3月', start:'2026-08-18', end:END},
    {value:'6M', label:'近6月', start:'2026-05-18', end:END},
    {value:'1Y', label:'近1年', start:'2025-11-18', end:END}
  ].map(option => Object.freeze(option)));
  let range = '6M';
  const clone = value => Array.isArray(value) ? value.map(clone) : value && typeof value === 'object'
    ? Object.fromEntries(Object.entries(value).map(([key, item]) => [key, clone(item)])) : value;
  const current = () => options.find(option => option.value === range);
  const baseline = () => range === '6M' || range === '1Y';
  const numeric = value => typeof value === 'number' && Number.isFinite(value);
  const rounded = (value, digits = 4) => Number(value.toFixed(digits));
  function includesDate(iso) {
    if (typeof iso !== 'string' || !/^\d{4}-\d{2}-\d{2}(?:$|T)/.test(iso)) return false;
    const date = iso.slice(0, 10);
    return date >= current().start && date < current().end;
  }

  const canonical = {
    'assoc-multi': {viewsValue:153000, likesValue:3420, commentsValue:128},
    'assoc-single': {viewsValue:82000, likesValue:2180, commentsValue:76},
    'assoc-brand-only': {viewsValue:126000, likesValue:2890, commentsValue:102}
  };
  function channelVideos(productId) {
    return R.videos(productId).filter(video => video.channelId === R.currentChannelId).map(video => {
      const result = clone(video);
      if (canonical[video.id]) return Object.assign(result, canonical[video.id]);
      const match = /-video-(\d+)$/.exec(video.id);
      const index = match ? Number(match[1]) - 1 : null;
      if (index !== null) {
        // 数字来自原 fixture 生成规则，不从“万”等展示缩写反算。
        Object.assign(result, {
          viewsValue:186000 - index * 6000,
          likesValue:3200 - index * 51,
          commentsValue:180 - index * 4
        });
      } else {
        Object.assign(result, {viewsValue:null, likesValue:null, commentsValue:null});
      }
      return result;
    });
  }
  const unique = videos => [...new Map(videos.map(video => [video.id, video])).values()];
  function videos(productId) {
    const result = productId ? channelVideos(productId)
      : unique([...D.products.flatMap(product => channelVideos(product.id)),
        ...(R.associationVideos||[]).filter(video=>!video.products.length).map(video=>({...clone(video),channelId:R.currentChannelId,...canonical[video.id]}))]);
    return result.filter(video => includesDate(video.date)).sort((a, b) => b.date.localeCompare(a.date));
  }
  function products() {
    return clone(baseline() ? D.products : D.products.filter(product => videos(product.id).length > 0));
  }
  function aggregate(list) {
    const sum = key => !list.length || list.some(video => !numeric(video[key]))
      ? null : list.reduce((total, video) => total + video[key], 0);
    const totalViews = sum('viewsValue');
    const likes = sum('likesValue');
    const comments = sum('commentsValue');
    return {
      videoCount:list.length,
      totalViews,
      avgViews:totalViews === null ? null : Math.round(totalViews / list.length),
      engagementRatePct:totalViews === null || totalViews === 0 || likes === null || comments === null
        ? null : rounded((likes + comments) / totalViews * 100)
    };
  }
  function metric(productId, key) {
    if (key !== 'totalViews' && key !== 'engagementRatePct') return null;
    // 聚合未提供不等于原始视频数值缺失；该商品聚合继续保持未知。
    if (R.productMetrics[productId]?.[key] === null) return null;
    // 保留旧聚合的默认形态；实时读取以兼容审阅中注入的 0 / null 样例。
    const value = baseline() ? R.productMetrics[productId]?.[key] : aggregate(videos(productId))[key];
    return numeric(value) ? value : null;
  }
  function brandVideoList(brand) {
    return videos().filter(video=>(video.brands||[]).includes(brand.id));
  }
  function promotionType(brand, video) {
    const types = brand.promotionTypes || [];
    if (types.length === 1) return types[0];
    // 关系类型是固定 mock 分组，不将视频 AD 标志推断为该品牌的付费事实。
    const index = Number(/-video-(\d+)$/.exec(video.id)?.[1] || 1) - 1;
    return types[index % types.length] || 'mention';
  }
  function brandStats(list) {
    const stats = aggregate(list);
    return {
      videoCount:stats.videoCount,
      views:stats.totalViews,
      avgViews:stats.avgViews,
      rate:stats.engagementRatePct === null ? '--' : rounded(stats.engagementRatePct, 2) + '%',
      date:list.length ? list.map(video => video.date).sort().at(-1) : null,
      budget:null
    };
  }
  function brands() {
    return D.brands.flatMap(brand => {
      const list = brandVideoList(brand);
      if (!list.length) return [];
      const promotionStats = Object.fromEntries((brand.promotionTypes || []).map(type =>
        [type, {...brandStats(list.filter(video => promotionType(brand, video) === type)),
          budget:brand.promotionStats?.[type]?.budget ?? null}]));
      // 预估预算沿原独立 mock 口径，不按短窗视频推算或按比例缩放。
      return [{...clone(brand), ...brandStats(list), budget:brand.budget ?? null, promotionStats,
        promotionTypes:Object.keys(promotionStats).filter(type => promotionStats[type].videoCount > 0), mock:true}];
    });
  }
  function categories() {
    if (baseline()) return clone(D.categories);
    const list = products();
    if (!list.length) return [];
    const counts = new Map([['电子产品', 0], ['家居', 0], ['其他 / 分类缺失', 0]]);
    list.forEach(product => {
      const category = product.category || '';
      const name = /^(Electronics|Cell Phones & Accessories)(\s*>|$)/.test(category) ? '电子产品'
        : /^Home(\s*>|$)/.test(category) ? '家居' : '其他 / 分类缺失';
      counts.set(name, counts.get(name) + 1);
    });
    const result = [...counts].filter(([, count]) => count > 0)
      .map(([name, count]) => ({name, count, percent:rounded(count / list.length * 100, 1)}));
    result.at(-1).percent = rounded(100 - result.slice(0, -1).reduce((sum, item) => sum + item.percent, 0), 1);
    return result;
  }
  function summary() {
    const list = videos();
    const all = unique(list);
    const ads = all.filter(video => video.ad === true);
    const total = aggregate(all);
    const ad = aggregate(ads);
    const days = (Date.parse(END + 'T00:00:00Z') - Date.parse(current().start + 'T00:00:00Z')) / 86400000;
    return {
      mock:true,
      mockLabel:'固定虚构视频集合的简单汇总，不代表线上统计',
      range,
      start:current().start,
      end:END,
      videoCount:total.videoCount,
      adVideoCount:ad.videoCount,
      videoAvgViews:total.avgViews,
      adVideoAvgViews:ad.avgViews,
      overallEngagementRatePct:total.engagementRatePct,
      adVideoEngagementRatePct:ad.engagementRatePct,
      videoCountPerMonth:rounded(total.videoCount * 30 / days, 2),
      adVideoCountPerMonth:rounded(ad.videoCount * 30 / days, 2),
      adVideoPercent:all.length ? ads.length / all.length : null
    };
  }
  window.BrandPeriodReview = {
    options,
    getRange:() => range,
    setRange:key => {
      if (!options.some(option => option.value === key)) throw new RangeError('不支持的品牌时间范围：' + key);
      range = key;
      return range;
    },
    label:() => current().label,
    includesDate,
    products,
    videos,
    count:productId => videos(productId).length,
    metric,
    brands,
    categories,
    summary,
    reset:() => { range = '6M'; return range; }
  };
})();
