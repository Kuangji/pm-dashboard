/* 按关联视频发布日期分桶；仅聚合调用方给出的固定 mock，不计算观看增长。 */
(() => {
  'use strict';
  const DAY = 86400000;
  const cache = new Map();
  const clone = value => Array.isArray(value) ? value.map(clone) : value && typeof value === 'object'
    ? Object.fromEntries(Object.entries(value).map(([key, item]) => [key, clone(item)])) : value;
  const esc = value => String(value ?? '').replace(/[&<>"']/g, char =>
    ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'}[char]));
  const iso = time => new Date(time).toISOString().slice(0, 10);
  function parseDate(value) {
    if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
    const time = Date.parse(value + 'T00:00:00Z');
    return Number.isFinite(time) && iso(time) === value ? time : null;
  }
  function floor(time, grain) {
    const date = new Date(time);
    if (grain === 'week') return time - ((date.getUTCDay() + 6) % 7) * DAY;
    if (grain === 'month') return Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 1);
    return time;
  }
  function next(time, grain) {
    if (grain === 'month') {
      const date = new Date(time);
      return Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + 1, 1);
    }
    return time + (grain === 'week' ? 7 : 1) * DAY;
  }
  function bucketLabel(start, end, grain) {
    if (grain === 'month') return start.slice(0, 7);
    if (grain === 'week') return start.slice(5) + '—' + iso(parseDate(end) - DAY).slice(5);
    return start.slice(5);
  }
  function buildBuckets(rows, start, end, grain = 'day') {
    const from = parseDate(start);
    const to = parseDate(end);
    if (from === null || to === null || from >= to) throw new RangeError('发布日期范围须为有效的半开日期区间');
    if (!['day', 'week', 'month'].includes(grain)) throw new RangeError('不支持的发布日期粒度：' + grain);
    const buckets = [];
    const positions = new Map();
    for (let cursor = floor(from, grain); cursor < to; cursor = next(cursor, grain)) {
      const bucketStart = iso(Math.max(cursor, from));
      const bucketEnd = iso(Math.min(next(cursor, grain), to));
      positions.set(cursor, buckets.length);
      buckets.push({start:bucketStart, end:bucketEnd,
        label:bucketLabel(bucketStart, bucketEnd, grain), count:0, rows:[]});
    }
    const seen = new Set();
    (Array.isArray(rows) ? rows : []).forEach(row => {
      if (!row || row.id === undefined || row.id === null || row.id === '') return;
      const value = typeof row.date === 'string' ? row.date : '';
      if (!/^\d{4}-\d{2}-\d{2}(?:$|T)/.test(value)) return;
      const time = parseDate(value.slice(0, 10));
      if (time === null || time < from || time >= to) return;
      // 先限定发布日期，再在相同平台和频道内按视频 ID 去重；不按商品关系重复计数。
      const key = JSON.stringify([row.platform ?? row.platformId ?? '', row.channelId ?? '', row.id]);
      if (seen.has(key)) return;
      seen.add(key);
      const bucket = buckets[positions.get(floor(time, grain))];
      bucket.rows.push(clone(row));
      bucket.count++;
    });
    return buckets;
  }
  const interval = (start, end) => start + ' 至 ' + iso(parseDate(end)-DAY);
  function render({id, title = '关联内容发布趋势', rows = [], start, end,
    grain = 'day', context = '', unavailable = false, selected = null, embedded = false}) {
    if (typeof id !== 'string' || !id) throw new TypeError('发布日期图表需要独立 id');
    buildBuckets([], start, end, grain);
    const chartId = 'publication-trend-' + id;
    const rangeText = interval(start, end);
    const controls = '<label class="publication-grain" for="' + esc(chartId + '-grain') + '">发布粒度' +
      '<select id="' + esc(chartId + '-grain') + '" data-trend-grain="' + esc(id) +
      '" data-trend-id="' + esc(id) + '">' +
      [['day', '日'], ['week', '周'], ['month', '月']].map(([value, label]) =>
        '<option value="' + value + '"' + (grain === value ? ' selected' : '') + '>' + label + '</option>').join('') +
      '</select></label>';
    let content;
    if (unavailable) {
      cache.delete(id);
      content = '<div class="publication-unavailable" role="status"><strong>关联数据未提供</strong>' +
        '<p>当前范围的发布趋势未知，不以零次发布代替。</p></div>';
    } else {
      const actual = buildBuckets(rows, start, end, grain);
      cache.set(id, clone(actual));
      const total = actual.reduce((sum, bucket) => sum + bucket.count, 0);
      const maximum = Math.max(1, ...actual.map(bucket => bucket.count));
      const columns = actual.map((bucket, index) => {
        const pressed = !!selected && selected.start === bucket.start && selected.end === bucket.end;
        const description = interval(bucket.start, bucket.end) + '，发布视频 ' + bucket.count +
          ' 条；当前统计范围 ' + rangeText + '。按发布日期计数，不代表观看增长。';
        const state = pressed ? ' is-selected' : '';
        return '<div class="publication-column" role="listitem"><div class="publication-column-well">' +
          '<button type="button" class="publication-bar' + state + (bucket.count ? '' : ' is-zero') +
          '" data-trend-id="' + esc(id) + '" data-trend-bucket="' + index +
          '" aria-label="' + esc(description) + '" title="' + esc(description) +
          '" aria-pressed="' + pressed + '"' + (bucket.count ? '' : ' disabled') +
          ' style="--publication-height:' + (bucket.count / maximum * 100).toFixed(6) + '%">' +
          '<span class="publication-count">' + bucket.count + '</span></button></div>' +
          '<span class="publication-date" title="' + esc(interval(bucket.start, bucket.end)) + '">' +
          esc(bucket.label) + '</span></div>';
      }).join('');
      content = '<p class="publication-total">当前范围内发布关联视频 <strong>' + total + ' 条</strong>' +
        (total ? '；点击非零柱查看对应视频。' : '；暂无已收录关联视频。') + '</p>' +
        '<div class="publication-y-title">发布视频数（条）</div>' +
        '<div class="publication-scroll" role="region" tabindex="0" aria-label="' +
        esc(title + '；' + rangeText + '；可横向滚动查看所有日期桶') + '">' +
        '<div class="publication-y-ticks" aria-hidden="true"><span>' + maximum + '</span>' +
        '<span>0</span></div>' +
        '<div class="publication-plot" role="list" aria-label="各日期桶发布视频数" style="min-width:' +
        Math.max(240, actual.length * 72) + 'px">' + columns + '</div></div>' +
        '<p class="publication-x-title">发布日期</p>';
    }
    // render 只生成 HTML 和保存当前桶，不绑定事件；调用方决定抽屉与范围筛选。
    const body = '<div class="publication-toolbar"><div>' +
      (context ? '<p class="publication-context">' + esc(context) + '</p>' : '') +
      '<p class="publication-range">当前范围：' + esc(rangeText) + '</p></div>' + controls + '</div>' +
      content + '<p class="publication-note">按关联视频的发布日期统计，不代表商品首次上架、实际合作次数或观看量增长。</p>';
    if (embedded) return '<div class="publication-content" data-publication-trend="' + esc(id) +
      '" role="region" aria-label="' + esc(title) + '">' + body + '</div>';
    return '<section class="online-module publication-module" data-publication-trend="' + esc(id) +
      '" aria-labelledby="' + esc(chartId + '-title') + '"><div class="online-section-heading">' +
      '<span aria-hidden="true"></span><h2 id="' + esc(chartId + '-title') + '">' + esc(title) + '</h2></div>' +
      '<div class="online-card publication-card">' + body + '</div></section>';
  }
  function getBucket(id, index) {
    if (!/^\d+$/.test(String(index))) return null;
    const value = cache.get(id)?.[Number(index)];
    return value ? clone(value) : null;
  }
  window.PublicationTrend = {buildBuckets, render, getBucket};
})();
