(() => {
  'use strict';
  const D = window.ChannelReviewData;
  const B = window.BrandPeriodReview;
  const $ = selector => document.querySelector(selector);
  const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const icon = name => window.ChannelReviewIcons[name] || window.ChannelReviewIcons.Info || '';
  const money = value => typeof value==='number'&&Number.isFinite(value)?'$'+value.toLocaleString('en-US'):'--';
  const number = value => typeof value==='number'&&Number.isFinite(value)?value.toLocaleString('zh-CN'):'--';
  const button = (text, action, id='', kind='') => '<button class="btn '+kind+'" data-action="'+action+'" data-id="'+esc(id)+'">'+text+'</button>';
  const tag = (text, kind='') => '<span class="tag '+kind+'">'+esc(text)+'</span>';
  const defaultProductSort = 'totalViews';
  const ui = {page:'overview', point:'P04', group:'all', query:'', sample:'filled', brandQuery:'', promotion:'', sort:'videoCount', sortDirection:'desc', pageSize:10, productMetadata:'provided', fullProductPage:1, fullProductSize:10, fullProductBrand:'', fullProductSort:defaultProductSort, fullProductSortDirection:'desc', layoutTab:'brand', comparisonView:'performance', trendGrain:'month', trendBrand:'', trendProduct:'', trendStatus:'available', trendSelected:null, locateProducts:false, drawerBrand:null, contentType:'all', mentionType:'all', notes:{}};
  const statuses = ['未审阅','有疑问','建议调整','本轮无补充'];
  let toastTimer;
  let publicationDrawer=null;
  const point = () => D.points.find(p => p.id === ui.point) || D.points[0];
  const note = id => ui.notes[id] || {status:'未审阅',text:''};
  const changedNotes = () => D.points.filter(p => note(p.id).status !== '未审阅' || note(p.id).text.trim());
  const navigate = (page, id='') => {
    const hash = page === 'point' ? '#point='+id : '#'+page;
    if (location.hash === hash) { parseRoute(); render(); }
    else location.hash = hash;
    window.scrollTo(0,0);
  };
  function parseRoute() {
    const route = location.hash.slice(1);
    if (route.startsWith('point=')) {
      const id = route.slice(6);
      if (D.points.some(p => p.id === id)) { ui.page='point'; ui.point=id; return; }
    }
    if (route==='product-detail') ui.point='P05';
    if (route==='channel-publications') ui.point='V01';
    ui.page = ['overview','points','channel-layout','brands','products','product-detail','channel-publications','notes'].includes(route) ? route : 'overview';
  }
  function toast(text) {
    clearTimeout(toastTimer);
    $('#toast').textContent=text;
    toastTimer=setTimeout(() => { $('#toast').textContent=''; }, 3200);
  }
  function notice(title, text, warning=false) {
    return '<div class="notice '+(warning?'warning':'')+'">'+icon(warning?'CircleAlert':'Info')+'<div><strong>'+esc(title)+'</strong><p>'+esc(text)+'</p></div></div>';
  }
  function navItem(page, label, name, count='') {
    const active = ui.page === page;
    return '<button class="nav-item '+(active?'active':'')+'" data-page="'+page+'" '+(active?'aria-current="page"':'')+'>'+icon(name)+'<span>'+label+'</span>'+(count?'<span class="count">'+count+'</span>':'')+'</button>';
  }
  const titles = {'channel-publications':'非推广 vs 推广','channel-layout':'频道详情 · 总页面骨架',overview:'先看范围，再逐点讨论',points:'修改点评审清单',brands:'品牌提及 · 线上功能参照',products:'推广商品 · 品牌与视频数示意','product-detail':'商品详情 · 关联视频示意',notes:'本次审阅记录'};
  const descriptions = {
    'channel-publications':'适用于 YouTube 频道。在原模块内切换观看表现与发布数量，共用品牌 TAB 统计时间。',
    'channel-layout':'以 YouTube 频道为样例。灰块为已有模块，橙框标出本轮修改。',
    overview:'优先让内容/视频关联到具体品牌和商品。',
    points:'候选分别管理，讨论结果先写入 Input，再同步对应 Demo。',
    brands:'以 YouTube 品牌表为样例。Instagram 本期适用 B01 品牌总数。',
    products:'适用于 YouTube 频道。推广商品表默认按本频道关联视频总观看量降序，支持品牌筛选、排序和视频反查。',
    'product-detail':'适用于通用商品详情（当前为 Amazon）。在「关联视频」查看总览、发布趋势和完整清单。',
    notes:'意见仅在本次页面内保留，导出后可带回讨论。'
  };
  function render() {
    const p = point();
    const heading = ui.page==='point' ? p.id+' · '+p.title : titles[ui.page];
    const desc = ui.page==='point' ? p.value : descriptions[ui.page];
    $('#app').innerHTML =
      '<a class="skip-link" href="#main-content">跳到主要内容</a>'+
      '<div class="review-strip"><div class="inline">'+icon('ClipboardCheck')+'<strong>功能审阅 Demo</strong><span class="description">独立模拟 · 所有数值为虚构样本 · 渐进讨论与实现</span></div><div class="inline">'+button('导出意见','export')+button(icon('RotateCcw')+' 重置','reset')+'</div></div>'+
      '<header class="product-header"><div class="brand"><span class="brand-mark">N</span><div>'+esc(D.releaseName)+'<small>'+esc(D.releaseVersion)+' · 频道详情页数据指标扩展</small></div></div>'+tag(D.version)+'</header>'+
      '<div class="layout"><aside class="sidebar" aria-label="评审导航"><div class="nav-group"><div class="nav-title">评审入口</div>'+navItem('overview','本轮范围','LayoutDashboard')+navItem('points','修改点评审','ClipboardCheck',String(D.points.length))+navItem('channel-layout','频道详情总览','Layers')+'</div>'+
      '<div class="nav-group"><div class="nav-title">功能示意</div>'+navItem('channel-publications','非推广 vs 推广','Layers')+navItem('brands','品牌提及','Tags')+navItem('products','推广商品','Package')+navItem('product-detail','商品详情','Package')+'</div>'+
      '<div class="nav-group"><div class="nav-title">审阅记录</div>'+navItem('notes','意见与备注','MessageSquare',String(changedNotes().length))+'</div>'+
      '<div class="nav-note">Input 与 Demo 同步迭代<br>不包含业务故事<br>非真实页面 / 非设计定稿</div></aside>'+
      '<div class="workspace '+(['brands','products','channel-layout','channel-publications'].includes(ui.page)?'baseline-layout':(ui.page==='product-detail'||ui.page==='point'&&['P03','P05','V04','V06'].includes(ui.point))?'association-layout':'')+'"><main class="main" id="main-content" tabindex="-1"><div class="breadcrumbs">'+icon('Layers')+'频道详情页'+icon('ChevronRight')+(['brands','products'].includes(ui.page)?'品牌数据'+icon('ChevronRight')+(ui.page==='brands'?'品牌提及':'推广商品'):ui.page==='point'?'修改点评审':heading)+'</div>'+
      '<div class="page-header"><div><h1>'+esc(heading)+'</h1>'+
      (ui.page==='point'?'<p data-point-platform>适用平台 · '+esc(p.platform)+'</p>':'')+
      '<p>'+esc(desc)+'</p></div>'+tag(ui.page==='point'?p.scopeStatus+' · '+p.implementation:ui.page==='brands'?'现有模块 + B01':ui.page==='products'?'现有模块 + P04':ui.page==='product-detail'?'方案示意 · P05':'渐进评审',ui.page==='point'?(p.implementation==='已演示'?'implemented':'pending'):'reference')+'</div>'+
      (isBrandReview()?brandPeriodControl()+brandPeriodSummary():'')+pageContent()+'</main>'+rulePanel()+'</div></div>';
    window.ChannelReview = {getState:() => ({...structuredClone(ui),brandPeriod:B.getRange()}),getPoints:() => structuredClone(D.points),navigate};
    if(ui.page==='products'&&ui.locateProducts){ui.locateProducts=false;requestAnimationFrame(()=>{$('#complete-product-brand')?.focus({preventScroll:true});$('.complete-products-module')?.scrollIntoView({block:'start'});});}
  }
  function pageContent() {
    if (ui.page==='point') return pointPage();
    if (ui.page==='channel-layout') return channelLayout();
    if (ui.page==='channel-publications') return channelPublications();
    if (ui.page==='brands') return brandBaseline();
    if (ui.page==='products') return productBaseline();
    if (ui.page==='product-detail') return productDetailDemo();
    if (ui.page==='points') return pointsPage();
    if (ui.page==='notes') return notesPage();
    return overview();
  }
  function channelLayout() {
    const bars=(count=3)=>'<div class="wire-bars" aria-hidden="true">'+Array.from({length:count},()=>'<i></i>').join('')+'</div>';
    const block=(title,detail,action='',label='',id='',kind='')=>'<section class="wire-block '+(action?'wire-change ':'')+kind+'"><div class="wire-block-heading"><h3>'+title+'</h3>'+(action?tag('本轮扩展','reference'):tag('沿现状'))+'</div><p>'+detail+'</p>'+bars()+(action?button(label,action,id):'')+'</section>';
    const tabs=[['overview','数据总览'],['audience','受众数据'],['content','内容数据'],['brand','品牌数据']];
    let panel='';
    if(ui.layoutTab==='brand') panel=brandPeriodControl()+
      block('基本数据','广告平均观看量 / 广告平均互动率 / 平均合作价格 / 广告发布数量')+
      block('非推广 VS. 推广','V01：原模块内切换「观看表现／发布数量」。观看表现保留逐视频观看量对比；发布数量支持日/周/月、品牌商品筛选与视频抽屉。','navigate','查看双视图示意','channel-publications','wire-publications')+
      block('品牌成本','报价范围 / 合作价格范围 / 付款倾向')+
      '<div class="wire-group"><h3>效率 &amp; 成功率</h3><div class="wire-grid">'+block('合作效率','既有分析卡')+block('合作漏斗','既有分析卡')+'</div></div>'+ 
      block('推广商品 · 完整商品表 / 商品分类','P01 / P02 / P04：原推广商品区首屏展示可排序的完整商品表，默认按本频道关联视频总观看量降序。保留品牌筛选、商品分类和本频道视频抽屉。','layoutProducts','查看推广商品','','wire-products')+
      block('品牌提及 · 品牌表 / 合作详情','B01：表底品牌总数；P03：合作详情视频卡强展示品牌和商品。详情可带品牌查看推广商品。','navigate','查看品牌提及示意','brands','wire-brands');
    else if(ui.layoutTab==='content') panel=
      '<p class="caption">前置区域按当前代码顺序概括；线上留存实测只覆盖末尾视频列表。模块可能因权限/数据条件隐藏。</p>'+block('内容类型 / 统计范围','沿现有筛选区')+block('基本数据','既有内容表现指标区')+block('互动','既有互动图表区')+block('发布分析','发布时间表 / 发布频率')+block('频道标签','有标签数据时显示')+
      block('内容数据 · 视频列表','P03：沿用现有视频卡，仅增加品牌/商品数量标记；点击在关联抽屉中展开。','point','查看双TAB关联方案','P03','wire-content')+
      '<div class="wire-video-grid" aria-hidden="true">'+[1,2,3].map(()=>'<div class="wire-video"><div></div>'+bars(2)+'<span>品牌 / 商品标记</span></div>').join('')+'</div>';
    else panel=block(ui.layoutTab==='overview'?'频道概览模块':'受众数据模块','沿用现有页面；这里只作区域占位，不展开本轮范围外的明细。');
    return notice('频道详情的对应总页面','四个TAB沿用线上名称；灰块表示已有区域，橙框及编号定位本轮扩展。下方为功能位置骨架，尺寸和最终模块顺序待设计。')+
      '<div class="wire-legend"><span><i></i>已有模块</span><span><i class="changed"></i>本轮扩展</span><span>按钮进入独立功能示意</span></div>'+
      '<section class="channel-wireframe" aria-label="频道详情总页面布局骨架"><div class="wire-site-header"><strong>NoxInfluencer</strong><span>站点导航 / 搜索 / 账号区 · 沿现状</span></div>'+
      '<div class="wire-channel-head"><div class="wire-avatar" aria-hidden="true"></div><div><h2>频道头像、名称与账号信息</h2><p>地区 / 语言 / 标签 / 订阅等现有操作</p>'+bars(2)+'</div></div>'+
      '<div class="wire-summary">'+['粉丝数','最近发布','最近推广','频道评价'].map(t=>'<div><span>'+t+'</span>'+bars(1)+'</div>').join('')+'</div>'+
      '<div class="wire-tabs" role="tablist" aria-label="频道详情骨架TAB">'+tabs.map(([id,label])=>'<button id="layout-tab-'+id+'" role="tab" data-action="layoutTab" data-id="'+id+'" aria-controls="layout-panel" aria-selected="'+(ui.layoutTab===id)+'" tabindex="'+(ui.layoutTab===id?'0':'-1')+'">'+label+'</button>').join('')+'</div>'+
      '<div class="wire-panel" id="layout-panel" role="tabpanel" aria-labelledby="layout-tab-'+ui.layoutTab+'">'+panel+'</div></section>'+
      '<section class="wire-extension"><h2>延展到独立商品详情页</h2><p>频道商品标题 → 商品详情：P05 完整关联视频列表 + 网红频道筛选；V04 商品发布趋势保留；V06 四总览／两环图与可排序完整清单共用视频TAB频道筛选，三榜并入清单，点桶仅筛清单。商品行其他区域 → 留在频道页打开本频道视频抽屉。</p><button class="btn" data-page="product-detail">查看商品详情示意</button></section>';
  }
  function overview() {
    return '<section class="surface section"><h2>版本目标</h2><p>为频道详情页做数据指标扩展，范围是品牌—商品。最高优先解决：从内容/视频看清关联品牌和商品。</p>'+
      '<dl><div class="scope-line"><dt>YouTube</dt><dd>频道详情覆盖视频关联、品牌数据时间、品牌总数、推广商品和频道发布数量。</dd></div>'+
      '<div class="scope-line"><dt>通用商品详情</dt><dd>当前为 Amazon。「关联视频」覆盖频道筛选、总览与占比、发布趋势和可排序的完整清单。</dd></div>'+
      '<div class="scope-line"><dt>Instagram</dt><dd>本期仅 B01 品牌总数，沿用现有品牌表统计范围和分页总数。</dd></div>'+
      '<div class="scope-line"><dt>TikTok</dt><dd>频道详情与 TikTok Shop 商品详情仅纳入回归检查。</dd></div></dl></section>'+
      '<section class="section"><div class="section-title"><h2>先认识已有模块</h2>'+tag('仅作参照')+'</div><div class="module-links">'+
      '<button class="module-link" data-page="brands">'+icon('Tags')+'<h3>品牌提及</h3><p>已有品牌、视频数、观看量、互动率和最近发布时间。</p><span class="inline">查看简化参照 '+icon('ArrowRight')+'</span></button>'+
      '<button class="module-link" data-page="products">'+icon('Package')+'<h3>推广商品</h3><p>完整商品表默认按总观看量降序，支持品牌筛选和查看关联视频。</p><span class="inline">查看简化参照 '+icon('ArrowRight')+'</span></button></div></section>'+
      notice('推广商品表','原推广商品区用一张完整商品表呈现商品，默认按本频道关联视频总观看量降序，表格下方保留商品分类。')+
      '<section class="section"><div class="section-title"><h2>逐点展开</h2>'+button('查看全部修改点','navigate','points')+'</div>'+pointList(D.points.slice(0,4))+'</section>';
  }
  function pointList(points) {
    if (!points.length) return '<div class="empty">'+icon('Search')+'没有匹配的修改点</div>';
    return '<div class="point-list">'+points.map(p => '<article class="point-row" data-point="'+p.id+'"><div class="point-id">'+p.id+'</div><div><div class="review-meta">'+tag(D.groups[p.group])+tag(p.scopeStatus,p.implementation==='已演示'?'implemented':'pending')+tag(p.priority)+'</div><h3>'+esc(p.title)+'</h3><div class="placement" data-point-platform>适用平台 · '+esc(p.platform)+'</div><p>'+esc(p.value)+'</p><div class="placement">修改位置：'+esc(p.placement)+'</div></div>'+button('进入评审 '+icon('ChevronRight'),'point',p.id)+'</article>').join('')+'</div>';
  }
  function pointsPage() {
    const filtered = D.points.filter(p => (ui.group==='all'||p.group===ui.group)&&[p.id,p.title,p.value,p.placement].join(' ').toLowerCase().includes(ui.query.toLowerCase()));
    return '<div class="filterbar"><input id="point-query" type="search" aria-label="搜索修改点" placeholder="搜索指标或修改位置" value="'+esc(ui.query)+'"><label for="point-group">范围<select id="point-group"><option value="all">全部范围</option>'+Object.entries(D.groups).map(([key,value])=>'<option value="'+key+'" '+(ui.group===key?'selected':'')+'>'+value+'</option>').join('')+'</select></label><span class="muted" role="status">'+filtered.length+' 项</span></div>'+
      pointList(filtered)+'<p class="caption">P03双TAB关联方案已演示、待评审；P01完整商品表位于原推广商品区，P02默认按本频道关联视频总观看量降序。B01低优先级已演示，P04/P05商品列表与详情清单已演示；S01品牌TAB时间选择器已确认并演示，不跨TAB；V01/V04发布能力、V06商品视频模块频道联动已确认并演示。</p>';
  }
  function pointPage() {
    const p=point();
    const index=D.points.indexOf(p);
    if (p.id==='V01') return channelPublications();
    if (['V04','V06'].includes(p.id)) return productDetailDemo();
    if (p.id==='S01') return timeScopeDemo();
    if (p.id==='P02') return notice('P02 · 商品表现指标与排序','推广商品表默认按本频道关联视频总观看量降序。通过两个表头可切换总观看量或互动率排序，先筛选和排序，再分页。')+productBaseline();
    if (p.id==='P01') return notice('P01 · 推广商品完整表','在原推广商品区查看完整清单。可以按商品所属品牌筛选或从品牌合作详情带入品牌。')+productBaseline();
    if (p.id==='P04') return notice('P04 · 商品列表品牌与视频数','品牌在商品资料区补充；点击标题进商品详情；其余区域打开本频道该商品视频抽屉。')+productBaseline();
    if (p.id==='P05') return productDetailDemo();
    if (p.id==='P03') return notice('P03 · 双TAB关联方案','品牌数据在卡下直接展示；内容数据只加标记，点击进入右侧抽屉。切换TAB比较同一组视频的呈现。')+'<div id="association-demo">'+window.ChannelAssociations.page()+'</div>';
    if (p.implementation==='已演示') return notice('B01 · 品牌总数','下方用 YouTube 样例演示表底左侧总数与右侧分页。Instagram 复用该展示方式，直接取现有品牌表的分页总数，沿用原统计范围。')+brandBaseline();
    return notice('本修改点尚未实现','先确认需要解决的判断，再决定字段与呈现。审阅意见不会自动变成已确认需求。',true)+
      '<section class="surface section"><div class="contract-row"><div class="label">修改位置</div><p>'+esc(p.placement)+'</p></div>'+
      '<div class="contract-row"><div class="label">当前已有</div><p>'+esc(p.current)+'</p></div>'+
      '<div class="contract-row"><div class="label">候选复用方式</div><p>'+esc(p.reuse)+'</p></div>'+
      '<div class="contract-row"><div class="label">本点需要讨论</div><p>'+esc(p.question)+'</p></div></section>'+
      '<section class="pending-stage" data-implementation="pending">'+icon('Clock')+'<h2>讨论后，在这里逐步补入示意</h2><p>当前先看相关已有模块，后续只实现本点已收口的修改。</p>'+button('查看'+(p.module==='brands'?'品牌':'商品')+'现状参照','navigate',p.module)+'</section>'+
      '<div class="inline">'+button('返回修改点清单','navigate','points')+(index>0?button('上一点','point',D.points[index-1].id):'')+(index<D.points.length-1?button('下一点 '+icon('ArrowRight'),'point',D.points[index+1].id):'')+'</div>';
  }
  function isBrandReview() {
    return ['brands','products','channel-publications'].includes(ui.page)||ui.page==='point'&&['B01','P01','P02','P04','S01','V01'].includes(ui.point);
  }
  function brandPeriodControl() {
    return '<div class="brand-period-toolbar" data-brand-period-control><div><strong>品牌数据</strong><small>时间范围仅作用于本TAB</small></div><label for="brand-period">统计时间<select id="brand-period" data-brand-period>'+B.options.map(o=>'<option value="'+o.value+'" '+(B.getRange()===o.value?'selected':'')+'>'+o.label+'</option>').join('')+'</select></label></div>';
  }
  function brandPeriodSummary() {
    const s=B.summary();
    return '<div class="brand-period-summary" data-brand-period-summary>'+[
      ['广告平均观看量',number(s.adVideoAvgViews===null?null:Math.round(s.adVideoAvgViews)),'总体平均观看量 '+number(s.videoAvgViews===null?null:Math.round(s.videoAvgViews))],
      ['广告平均互动率',(s.adVideoEngagementRatePct===null?'--':s.adVideoEngagementRatePct.toFixed(2)+'%'),'总体平均互动率 '+(s.overallEngagementRatePct===null?'--':s.overallEngagementRatePct.toFixed(2)+'%')],
      ['平均合作价格','--','沿现有独立业务口径，本轮不从视频重算'],
      ['广告发布数量',String(s.adVideoCount||0),'所选范围内 · 总体发布数量 '+String(s.videoCount||0)]
    ].map(([label,value,detail])=>'<div><span>'+label+'</span><strong>'+value+'</strong><small>'+detail+'</small></div>').join('')+'</div>';
  }
  function channelScopeNote() {
    return '<p class="caption" data-channel-scope>品牌数据 · '+esc(B.label())+' · 统一控制本TAB品牌/商品内容统计及关联视频。固定虚构数据，示例基准日2026-11-17。</p>';
  }
  function timeScopeDemo() {
    return notice('S01 · 仅品牌数据TAB内统一时间','本轮新增局部时间选择器，统一品牌、商品内容统计和对应列表/抽屉；不做跨TAB全局统一。切换上方范围可查看模拟联动。')+
      '<section class="surface section" data-scope-policy><h2>一个品牌TAB，共用一个时间值</h2><div class="table-wrap"><table><thead><tr><th>作用位置</th><th>行为</th></tr></thead><tbody>'+[
        ['品牌提及与合作详情','品牌数、提及视频及表现随时间更新'],
        ['推广商品表 / 商品分类','在完整范围集合上更新列表、总数、指标与分类'],
        ['本频道商品视频抽屉','继承品牌TAB时间，视频数与所开清单一致'],
        ['其他TAB / 独立商品详情','保持各自原范围，不受本选择器影响']
      ].map(row=>'<tr>'+row.map(value=>'<td>'+value+'</td>').join('')+'</tr>').join('')+'</tbody></table></div><p class="caption">仅使用时间选项，不加入近N内容。6M按日历月示意，不视为固定180天；生产日期字段与接口范围仍待接入。</p><div class="inline">'+button('查看品牌提及','navigate','brands')+button('查看推广商品','navigate','products')+'</div></section>'+
      channelScopeNote()+notice('复用既有口径','切换范围后先筛完整集合、再排序分页，保留品牌筛选、排序及每页容量。报价、回复及合作效率不从视频重算。所有数字为模拟，未接生产接口。');
  }
  function channelPerformance() {
    // 分类为明确指定的虚构样例，既不从AD标记推断，也不从品牌/商品关系推断。
    const categories=[{id:'normal',label:'非推广'},{id:'cooperation',label:'合作推广'},{id:'suspected',label:'疑似推广'}];
    const types={'assoc-brand-only':'normal','assoc-single':'suspected','assoc-multi':'cooperation','p1-video-2':'cooperation','p1-video-5':'suspected','p1-video-12':'cooperation'};
    const ordinary=[
      {id:'performance-normal-1',title:'我的日常桌面工作流',date:'2026-06-14',viewsValue:210000},
      {id:'performance-normal-2',title:'用了半年的设备，现在怎么样',date:'2026-09-15',viewsValue:168000},
      {id:'performance-normal-3',title:'回答大家最近的问题',date:'2026-11-13',viewsValue:192000}
    ].map((v,i)=>({...v,category:'normal',image:'./assets/video-'+(i+1)+'.jpg',brands:[]}));
    const rows=ui.trendStatus==='available'?[...B.videos().filter(v=>types[v.id]).map(v=>({...v,category:types[v.id]})),...ordinary.filter(v=>B.includesDate(v.date))].sort((a,b)=>a.date.localeCompare(b.date)):[];
    const range=B.options.find(o=>o.value===B.getRange());
    const rangeEnd=new Date(Date.parse(range.end+'T00:00:00Z')-86400000).toISOString().slice(0,10);
    const context='<p class="publication-context">当前频道：星野数码评测 · '+esc(B.label())+'</p><p class="publication-range">当前范围：'+range.start+' 至 '+rangeEnd+'</p>';
    if(ui.trendStatus==='unavailable')return '<div data-channel-performance>'+context+'<div class="publication-unavailable"><strong>观看数据未提供</strong><p>当前范围的观看表现未知，不以0观看代替。</p></div></div>';
    if(!rows.length)return '<div data-channel-performance>'+context+'<div class="online-no-data">当前范围暂无已收录视频</div></div>';
    const compact=value=>number(Number((value/10000).toFixed(2)))+'万';
    const maximum=Math.max(1,...rows.map(v=>v.viewsValue));
    const means=categories.map(c=>{const list=rows.filter(v=>v.category===c.id);return {...c,value:list.length?list.reduce((sum,v)=>sum+v.viewsValue,0)/list.length:null};});
    const legend='<div class="performance-legend">'+categories.map(c=>'<span class="performance-key '+c.id+'"><i></i>'+c.label+'</span>').join('')+'</div>';
    const averages='<div class="performance-averages">'+means.map(c=>'<div class="performance-average '+c.id+'"><i></i><span>平均观看量 - '+c.label+'<strong>'+ (c.value===null?'--':compact(c.value))+'</strong></span></div>').join('')+'</div>';
    const lines=means.filter(c=>c.value!==null).map(c=>'<span class="performance-reference '+c.id+'" style="bottom:'+(c.value/maximum*100)+'%" title="平均观看量 - '+c.label+'：'+number(Math.round(c.value))+'"></span>').join('');
    const bars=rows.map(v=>{const category=categories.find(c=>c.id===v.category),brands=(v.brands||[]).map(id=>D.brands.find(b=>b.id===id)?.name).filter(Boolean).join('、');const label=v.date+' · '+v.title+' · '+category.label+' · 观看量 '+number(v.viewsValue)+(brands?' · 品牌：'+brands:'');return '<div class="performance-column"><a class="performance-bar '+v.category+'" style="height:'+(v.viewsValue/maximum*100)+'%" href="./destination.html?type=video&id='+encodeURIComponent(v.id)+'" target="_blank" rel="noopener" data-performance-video="'+esc(v.id)+'" aria-label="'+esc(label)+'" title="'+esc(label)+'"><span>'+compact(v.viewsValue)+'</span></a><small>'+v.date.slice(5)+'</small></div>';}).join('');
    return '<div data-channel-performance>'+context+'<div class="performance-legends">'+legend+averages+'</div><div class="publication-y-title">视频观看量（次）</div><div class="performance-scroll" role="region" tabindex="0" aria-label="逐视频观看量；可横向滚动"><div class="performance-y-ticks"><span>'+compact(maximum)+'</span><span>0</span></div><div class="performance-plot" style="min-width:'+Math.max(480,rows.length*72)+'px"><div class="performance-lines" aria-hidden="true">'+lines+'</div>'+bars+'</div></div><p class="publication-x-title">视频发布日期（每柱一条视频）</p><p class="publication-note">沿用近期内容观看量对比；均值虚线与三类颜色对应。每条视频显示当前累计观看量。</p></div>';
  }
  function channelPublications() {
    const range=B.options.find(o=>o.value===B.getRange());
    const rows=ui.trendStatus==='available'?B.videos().filter(v=>(!ui.trendBrand||(v.brands||[]).includes(ui.trendBrand))&&(!ui.trendProduct||(v.products||[]).includes(ui.trendProduct))):[];
    const products=D.products.filter(p=>!ui.trendBrand||p.brandId===ui.trendBrand);
    const context='当前频道：星野数码评测 · '+B.label()+(ui.trendBrand?' · '+D.brands.find(b=>b.id===ui.trendBrand)?.name:' · 全部品牌')+(ui.trendProduct?' · '+D.products.find(p=>p.id===ui.trendProduct)?.name:' · 全部商品');
    const publication='<div class="filterbar publication-filters"><label for="channel-trend-brand">品牌<select id="channel-trend-brand"><option value="">全部品牌</option>'+D.brands.map(b=>'<option value="'+b.id+'" '+(ui.trendBrand===b.id?'selected':'')+'>'+esc(b.name)+'</option>').join('')+'</select></label><label for="channel-trend-product">商品<select id="channel-trend-product"><option value="">全部商品</option>'+products.map(p=>'<option value="'+p.id+'" '+(ui.trendProduct===p.id?'selected':'')+'>'+esc(p.name)+'</option>').join('')+'</select></label>'+((ui.trendBrand||ui.trendProduct)?button('清除趋势条件','clearTrendFilters'):'')+'</div>'+
      window.PublicationTrend.render({id:'channel-publications',title:'关联内容发布数量',rows,start:range.start,end:range.end,grain:ui.trendGrain,context,unavailable:ui.trendStatus==='unavailable',selected:ui.trendSelected,embedded:true})+
      '<p class="caption">品牌和商品条件仅作用发布数量及其视频查看。</p>';
    const tabs=[['performance','观看表现'],['publications','发布数量']];
    return notice('V01 · 原模块内扩展发布数量','共用「非推广 vs 推广」图卡，切换视图查看不同指标。观看表现保留线上结构，使用独立固定虚构样例；发布数量按完整已收录关联样例去重计数，含仅品牌内容。')+
      '<div class="review-baseline-tools"><label for="channel-trend-state">图表样例 <select id="channel-trend-state">'+[['available','有记录'],['empty','无记录'],['unavailable','数据未提供']].map(([v,t])=>'<option value="'+v+'" '+(ui.trendStatus===v?'selected':'')+'>'+t+'</option>').join('')+'</select></label><span class="muted">虚构集合 · 示例基准日2026-11-17</span></div>'+
      '<section class="online-module channel-comparison" data-channel-comparison><div class="online-section-heading"><span aria-hidden="true"></span><h2>非推广 vs 推广</h2></div><div class="online-card channel-comparison-card"><div class="comparison-tabs" role="tablist" aria-label="非推广与推广图表视图">'+tabs.map(([id,label])=>'<button id="comparison-tab-'+id+'" role="tab" data-action="comparisonView" data-id="'+id+'" aria-controls="comparison-panel" aria-selected="'+(ui.comparisonView===id)+'" tabindex="'+(ui.comparisonView===id?'0':'-1')+'">'+label+'</button>').join('')+'</div><div id="comparison-panel" role="tabpanel" aria-labelledby="comparison-tab-'+ui.comparisonView+'">'+(ui.comparisonView==='performance'?channelPerformance():publication)+'</div></div></section>';
  }
  function renderPublicationDrawer(focus='') {
    const st=publicationDrawer;if(!st)return;
    const pages=Math.max(1,Math.ceil(st.bucket.rows.length/st.size));st.page=Math.min(st.page,pages);
    const rows=st.bucket.rows.slice((st.page-1)*st.size,st.page*st.size);
    $('#dialog').className='online-drawer publication-video-drawer';
    $('#dialog').innerHTML='<div class="online-drawer-header"><h2 id="dialog-title">时间段关联视频</h2><button class="btn icon" data-action="cancel" aria-label="关闭时间段视频">×</button></div><div class="online-drawer-body"><p class="publication-context">星野数码评测 · '+esc(B.label())+'</p><p class="publication-range">发布日期：'+st.bucket.start+' 至 '+new Date(Date.parse(st.bucket.end+'T00:00:00Z')-86400000).toISOString().slice(0,10)+'</p>'+window.ProductVideoReview.cards(rows)+
      '<div class="product-video-pagination"><span class="publication-video-total">共 '+st.bucket.count+' 条关联视频</span><div class="product-pagination-controls"><button data-action="publicationPrev" aria-label="时间段视频上一页" '+(st.page<=1?'disabled':'')+'>‹</button><span>'+st.page+' / '+pages+'</span><button data-action="publicationNext" aria-label="时间段视频下一页" '+(st.page>=pages?'disabled':'')+'>›</button><label class="sr-only" for="publication-drawer-size">时间段视频每页数量</label><select id="publication-drawer-size">'+[10,20,50].map(n=>'<option value="'+n+'" '+(st.size===n?'selected':'')+'>'+n+'条/页</option>').join('')+'</select></div></div></div>';
    if(focus){const target=document.querySelector(focus);(target&&!target.disabled?target:$('#dialog [data-action="cancel"]'))?.focus({preventScroll:true});}
  }
  function openPublicationBucket(index,trigger) {
    const bucket=window.PublicationTrend.getBucket('channel-publications',index);if(!bucket||!bucket.count)return;
    ui.trendSelected={start:bucket.start,end:bucket.end,label:bucket.label};
    document.querySelectorAll('[data-trend-id="channel-publications"][data-trend-bucket]').forEach(b=>{b.setAttribute('aria-pressed',b===trigger?'true':'false');b.classList.toggle('is-selected',b===trigger);});
    publicationDrawer={bucket,page:1,size:10,trigger};renderPublicationDrawer();$('#dialog').showModal();
  }
  function productDetailDemo() {
    return notice(ui.point==='V06'?'V06 · 商品关联视频TAB频道联动':'P05 / V04 / V06 · 商品详情关联视频','总览四指标、两环图、发布趋势和唯一完整清单共用频道筛选；三组榜单并入清单的播放量／点赞量／评论数排序。点趋势柱只筛清单。关联网红TAB独立；商品标题进入仍默认全部频道。')+window.ProductVideoReview.sampleControl()+'<div id="product-detail-demo">'+window.ProductVideoReview.page()+'</div>';
  }
  function sampleControl() {
    return '<div class="filterbar"><label for="sample-state">样例状态<select id="sample-state"><option value="filled" '+(ui.sample==='filled'?'selected':'')+'>有记录</option><option value="empty" '+(ui.sample==='empty'?'selected':'')+'>无记录</option></select></label><span class="muted">仅切换虚构样例</span></div>';
  }
  function channelHeader() {
    return '<div class="baseline-header"><div class="channel-avatar">星</div><div><h2>星野数码评测</h2><p>YouTube · 虚构频道 · 数据只为说明已有功能结构</p></div></div>';
  }
  function empty() {
    return '<div class="empty">'+icon('Package')+'暂无已收录记录<p>此状态不代表该频道现实中从未推广品牌或商品。</p></div>';
  }
  function liveModuleHeading(title) {
    return '<div class="online-section-heading"><span aria-hidden="true"></span><h2>'+title+'</h2></div>';
  }
  function baselineTools(module) {
    return channelScopeNote()+'<div class="review-baseline-tools">'+sampleControl()+button('查看相关修改点',module==='brands'?'brandPoints':'productPoints')+'</div>';
  }
  function sortedHeader(label, key) {
    const active=ui.sort===key;
    return '<th aria-sort="'+(active?(ui.sortDirection==='asc'?'ascending':'descending'):'none')+'"><button data-action="brandSort" data-id="'+key+'">'+label+'<span class="sort-arrows '+(active?ui.sortDirection:'')+'" aria-hidden="true">▴<br>▾</span></button></th>';
  }
  function brandBaseline() {
    const matches=ui.sample==='empty'?[]:B.brands().filter(b=>b.name.toLowerCase().includes(ui.brandQuery.toLowerCase())&&(!ui.promotion||b.promotionTypes.includes(ui.promotion))).map(b=>ui.promotion?{...b,...b.promotionStats[ui.promotion]}:b);
    const rows=[...matches].sort((a,b)=> {
      const av=ui.sort==='rate'?parseFloat(a.rate):a[ui.sort];
      const bv=ui.sort==='rate'?parseFloat(b.rate):b[ui.sort];
      if(av===null||typeof av==='number'&&!Number.isFinite(av))return bv===null||typeof bv==='number'&&!Number.isFinite(bv)?0:1;
      if(bv===null||typeof bv==='number'&&!Number.isFinite(bv))return -1;
      return (typeof av==='string'?av.localeCompare(bv):av-bv)*(ui.sortDirection==='asc'?1:-1);
    }).slice(0,ui.pageSize);
    return notice('线上对应：品牌数据 → 品牌提及','恢复线上模块名称、列序、筛选和入口；数据虚构。单品牌均播已在“合作详情”抽屉中存在。')+
      baselineTools('brands')+'<section class="online-module" data-live-module="brands">'+liveModuleHeading('品牌提及')+
      '<div class="online-card"><div class="online-brand-toolbar"><h3>提及品牌</h3><div class="online-controls"><label class="sr-only" for="promotion-type">选择推广类型</label><select id="promotion-type" aria-label="选择推广类型"><option value="" '+(!ui.promotion?'selected':'')+'>选择推广类型</option>'+[['paid','付费推广'],['mention','仅提及'],['suspect','疑似推广']].map(([value,text])=>'<option value="'+value+'" '+(ui.promotion===value?'selected':'')+'>'+text+'</option>').join('')+'</select><div class="online-search">'+icon('Search')+'<input id="brand-query" type="search" aria-label="按品牌名搜索" placeholder="按品牌名搜索" value="'+esc(ui.brandQuery)+'"></div></div></div>'+
      '<div class="online-table-scroll" role="region" aria-label="品牌提及示例表" tabindex="0"><table class="online-brand-table"><thead><tr><th>品牌</th>'+sortedHeader('推广','videoCount')+sortedHeader('互动率','rate')+sortedHeader('总观看量','views')+sortedHeader('上次视频时间','date')+'<th>预算</th><th>提及视频</th></tr></thead><tbody>'+
      (rows.length?rows.map(b=>'<tr data-action="brandVideos" data-id="'+b.id+'" tabindex="0" aria-label="打开'+esc(b.name)+'的合作详情"><td><div class="online-brand-cell"><a class="online-brand-logo" href="./destination.html?type=brand&id='+b.id+'" target="_blank" rel="noopener" aria-label="'+esc(b.name)+'品牌报告入口（示例）"><img src="./assets/brand-placeholder.png" alt=""></a><div><a class="online-brand-name" href="./destination.html?type=brand&id='+b.id+'" target="_blank" rel="noopener">'+esc(b.name)+'</a><small>'+esc(b.domain)+'</small></div></div></td><td class="num">'+b.videoCount+'</td><td class="num">'+b.rate+'</td><td class="num">'+number(b.views)+'</td><td>'+b.date+'</td><td class="num">'+money(b.budget)+'</td><td><button class="online-video-entry" data-action="brandVideos" data-id="'+b.id+'" aria-label="查看'+esc(b.name)+'的提及视频"><img src="'+b.thumbnail+'" alt="示例视频缩略图"><span class="online-chevron" aria-hidden="true">›</span></button></td></tr>').join(''):'<tr><td colspan="7"><div class="online-no-data">暂无数据</div></td></tr>')+
      '</tbody></table></div><div class="online-table-footer"><span class="brand-total" aria-live="polite">共 '+matches.length+' 个品牌</span><div class="online-pagination" aria-label="品牌列表分页"><button disabled aria-label="上一页">‹</button><button class="current" aria-current="page">1</button><button disabled aria-label="下一页">›</button><label class="sr-only" for="brand-page-size">每页数量</label><select id="brand-page-size" aria-label="每页数量">'+[10,20,50].map(n=>'<option value="'+n+'" '+(ui.pageSize===n?'selected':'')+'>'+n+'条/页</option>').join('')+'</select></div></div></div></section>'+
      '<p class="caption">评审说明：表头沿用线上“推广”和“预算”的名称；提及不等于实际付费合作，预算为估算。缩略图为公开展示素材，名称和数值为虚构样例。</p>';
  }
  function categoryDonut() {
    const categories=B.categories();
    const colors=['#377dff','#fa6300','#38cb89'];let start=0;
    const circles=categories.map((c,i)=>{const html='<circle cx="110" cy="110" r="85.25" pathLength="100" fill="none" stroke="'+colors[i]+'" stroke-width="27.5" stroke-dasharray="'+c.percent+' '+(100-c.percent)+'" stroke-dashoffset="'+(-start)+'"></circle>';start+=c.percent;return html;}).join('');
    return '<div class="online-chart"><svg viewBox="0 0 220 220" role="img" aria-label="商品分类环形图：'+esc(categories.map(c=>c.name+c.percent+'%').join('，'))+'"><g transform="rotate(-90 110 110)">'+circles+'</g></svg></div>'+
      '<div class="online-chart-legend">'+categories.map((c,i)=>'<span class="online-legend-item"><i style="background:'+colors[i]+'"></i><span class="num">'+c.percent+'%</span> '+esc(c.name)+' <em>('+c.count+')</em></span>').join('')+'</div>';
  }
  function productBaseline() {
    return notice('P04 · 品牌数据 → 推广商品','商品行显示品牌和本频道视频数。点击标题进入商品详情，点击其余区域打开本频道关联视频抽屉。')+
      baselineTools('products')+
      '<div class="review-baseline-tools"><label for="product-metadata-state">商品资料样例 <select id="product-metadata-state"><option value="provided" '+(ui.productMetadata==='provided'?'selected':'')+'>已提供品牌和视频数</option><option value="missing" '+(ui.productMetadata==='missing'?'selected':'')+'>品牌与视频数缺失</option></select></label></div>'+
      '<section class="online-module" data-live-module="products">'+liveModuleHeading('推广商品')+
      completeProducts()+
      '<div class="online-card online-category-card"><h3>商品分类</h3>'+(ui.sample==='empty'?'<div class="online-no-data">暂无数据</div>':categoryDonut())+'</div></section>';
  }
  function productMetricValue(p,key) {
    const value=B.metric(p.id,key);
    return typeof value==='number'&&Number.isFinite(value)?value:null;
  }
  function compareProductMetric(a,b,key,direction='desc') {
    const av=productMetricValue(a,key),bv=productMetricValue(b,key);
    if(av===null&&bv===null)return 0;
    if(av===null)return 1;
    if(bv===null)return -1;
    return (av-bv)*(direction==='asc'?1:-1);
  }
  function productMetricHeader(label,key) {
    const active=ui.fullProductSort===key;
    return '<th aria-sort="'+(active?(ui.fullProductSortDirection==='asc'?'ascending':'descending'):'none')+'"><button data-action="productMetricSort" data-id="'+key+'" aria-label="按'+label+(active&&ui.fullProductSortDirection==='desc'?'升序':'降序')+'排序">'+label+'<span class="sort-arrows '+(active?ui.fullProductSortDirection:'')+'" aria-hidden="true">'+(active?(ui.fullProductSortDirection==='asc'?'▴':'▾'):'▴<br>▾')+'</span></button></th>';
  }
  function completeProducts() {
    const R=window.ProductReviewData,all=ui.sample==='empty'?[]:B.products();
    const items=all.filter(p=>{const id=ui.productMetadata==='missing'?'':p.brandId||'';return !ui.fullProductBrand||(ui.fullProductBrand==='__unknown__'?!id:id===ui.fullProductBrand);});
    items.sort((a,b)=>compareProductMetric(a,b,ui.fullProductSort,ui.fullProductSortDirection));
    const pages=Math.max(1,Math.ceil(items.length/ui.fullProductSize));ui.fullProductPage=Math.min(ui.fullProductPage,pages);
    const rows=items.slice((ui.fullProductPage-1)*ui.fullProductSize,ui.fullProductPage*ui.fullProductSize);
    return '<div class="online-card complete-products-module" data-live-module="complete-products"><div class="complete-products-toolbar"><p class="product-list-scope">当前频道：星野数码评测 · '+esc(B.label())+'已收录关联商品</p><div class="complete-products-brand-controls"><label for="complete-product-brand">商品品牌</label><select id="complete-product-brand"><option value="">全部品牌</option>'+D.brands.map(b=>'<option value="'+b.id+'" '+(ui.fullProductBrand===b.id?'selected':'')+'>'+esc(b.name)+'</option>').join('')+'<option value="__unknown__" '+(ui.fullProductBrand==='__unknown__'?'selected':'')+'>未知品牌</option></select>'+(ui.fullProductBrand?button('清除品牌','clearProductBrand'):'')+'</div></div><div class="complete-products-scroll" role="region" aria-label="全部推广商品表" tabindex="0"><table class="complete-products-table"><thead><tr><th>商品</th><th>品牌</th><th>分类</th><th>价格</th><th>本频道关联视频</th>'+productMetricHeader('本频道关联视频总观看量','totalViews')+productMetricHeader('互动率','engagementRatePct')+'</tr></thead><tbody>'+
      (rows.length?rows.map(p=>{const b=ui.productMetadata==='missing'?null:D.brands.find(b=>b.id===p.brandId);const count=ui.productMetadata==='missing'?null:B.count(p.id);return '<tr class="channel-product-row" data-product-id="'+p.id+'" data-action="productVideos" data-id="'+p.id+'" tabindex="0" aria-haspopup="dialog" aria-label="查看'+esc(p.name)+'的本频道关联视频"><td><div class="complete-product-name"><img src="'+p.image+'" alt=""><a class="complete-product-title" href="'+R.detailHref(p.id)+'" target="_blank" rel="noopener">'+esc(p.name)+'</a></div></td><td>'+(b?'<span class="complete-product-brand">'+esc(b.name)+'</span>':'<span class="missing">--</span>')+'</td><td><span class="complete-product-category" title="'+esc(p.category)+'">'+esc(p.category)+'</span></td><td>'+esc(p.price)+'</td><td>'+(count===null?'<span class="complete-product-count-missing">--</span>':'<button class="complete-product-video-count" data-action="productVideos" data-id="'+p.id+'" aria-haspopup="dialog" aria-label="查看本频道关联的'+count+'条视频">'+count+'</button>')+'</td><td class="complete-product-total-views num">'+(productMetricValue(p,'totalViews')===null?'<span class="missing">--</span>':number(productMetricValue(p,'totalViews')))+'</td><td class="complete-product-engagement-rate num">'+(productMetricValue(p,'engagementRatePct')===null?'<span class="missing">--</span>':productMetricValue(p,'engagementRatePct').toFixed(2)+'%')+'</td></tr>';}).join(''):'<tr><td colspan="7"><div class="online-no-data">'+(ui.fullProductBrand?'当前品牌筛选下暂无可展示商品':'暂无已收录推广商品')+'</div></td></tr>')+
      '</tbody></table></div><div class="product-video-pagination"><span class="complete-product-total" aria-live="polite">共 '+items.length+' 件商品</span><div class="product-pagination-controls"><button data-action="completeProductsPrev" aria-label="商品列表上一页" '+(ui.fullProductPage<=1?'disabled':'')+'>‹</button><span>'+ui.fullProductPage+' / '+pages+'</span><button data-action="completeProductsNext" aria-label="商品列表下一页" '+(ui.fullProductPage>=pages?'disabled':'')+'>›</button><label class="sr-only" for="complete-product-size">商品列表每页数量</label><select id="complete-product-size">'+[10,20,50].map(n=>'<option value="'+n+'" '+(ui.fullProductSize===n?'selected':'')+'>'+n+'条/页</option>').join('')+'</select></div></div></div>';
  }
  function renderBrandDrawer() {
    const b=B.brands().find(item=>item.id===ui.drawerBrand);
    if (!b) return;
    const videos=window.ChannelAssociations.brandVideos(b).filter(v=>(ui.contentType==='all'||v.type===ui.contentType)&&(ui.mentionType==='all'||v.promotion===ui.mentionType));
    const filtered=ui.contentType!=='all'||ui.mentionType!=='all';
    const snapshot=ui.mentionType==='all'?b:b.promotionStats[ui.mentionType];
    const hasSummary=ui.contentType==='all'&&!!snapshot;
    $('#dialog').className='online-drawer';
    $('#dialog').innerHTML='<div class="online-drawer-header"><h2 id="dialog-title">合作详情</h2><button class="btn icon" data-action="cancel" aria-label="关闭合作详情">×</button></div>'+
      '<div class="online-drawer-body"><div class="online-drawer-pair"><div class="online-brand-cell"><img class="online-drawer-logo" src="./assets/brand-placeholder.png" alt=""><div><strong>'+esc(b.name)+'</strong><small>'+esc(b.domain)+'</small></div></div><span class="muted">⇄</span><div class="online-brand-cell"><div class="channel-avatar">星</div><div><strong>星野数码评测</strong><small>美国 · 英语</small></div></div></div>'+
      '<div class="brand-products-entry"><span>本频道 · 该品牌 · '+esc(B.label())+'</span>'+button('查看推广商品 ›','brandProducts',b.id)+'</div>'+
      '<div class="online-content-toolbar"><h3>内容数据 <small>'+(hasSummary?snapshot.videoCount:videos.length)+'</small></h3><div class="online-drawer-filters"><label class="sr-only" for="drawer-content-type">内容形式</label><select id="drawer-content-type" aria-label="内容形式">'+[['all','全部'],['video','视频'],['shorts','Shorts']].map(([v,t])=>'<option value="'+v+'" '+(ui.contentType===v?'selected':'')+'>'+t+'</option>').join('')+'</select><label class="sr-only" for="drawer-mention-type">提及方式</label><select id="drawer-mention-type" aria-label="提及方式">'+[['all','全部'],['paid','付费推广'],['mention','仅提及'],['suspect','疑似推广']].map(([v,t])=>'<option value="'+v+'" '+(ui.mentionType===v?'selected':'')+'>'+t+'</option>').join('')+'</select></div></div>'+
      '<div class="online-drawer-metrics">'+[['总观看量',hasSummary?number(snapshot.views):'--'],['平均观看量',hasSummary?number(snapshot.avgViews):'--'],['互动率',hasSummary?snapshot.rate:'--']].map(([label,value])=>'<div><small>'+label+'</small><strong>'+value+'</strong></div>').join('')+'</div>'+
      '<div class="online-drawer-videos">'+(videos.length?videos.map(v=>window.ChannelAssociations.card(v,'brand','drawer-'+b.id+'-'+v.id,b.id)).join(''):'<div class="online-no-data">暂无数据</div>')+'</div>'+
      '<p class="caption">虚构内容示例，仅列两条样本；卡内展示视频全部已收录关联，可能包含其他品牌（方案新增）；初始汇总为示例数据。筛选仅演示可见内容，缺少对应汇总时显示“--”，不补造统计口径。这里的平均观看量是线上已有功能。</p></div>';
  }

  function notesPage() {
    return notice('只记录本次审阅意见','意见不改变 Input 或候选状态；请将导出的意见带回讨论，收口后再同步文档与 Demo。')+
      '<div class="section-title"><h2>'+changedNotes().length+' 项有审阅记录</h2>'+button(icon('Download')+' 导出审阅意见','export','','primary')+'</div>'+
      D.points.map(p=>'<article class="review-row"><div class="section-title"><div><small>'+p.id+' · '+D.groups[p.group]+'</small><h3>'+esc(p.title)+'</h3></div>'+button('打开本点','point',p.id)+'</div>'+tag(note(p.id).status)+tag(p.scopeStatus,p.implementation==='已演示'?'implemented':'pending')+'<p class="review-note">'+esc(note(p.id).text||'尚未填写备注。')+'</p></article>').join('');
  }
  function rulePanel() {
    const p=point();
    return '<aside class="rule-panel" aria-label="评审说明"><div class="rule-heading">'+icon('ClipboardCheck')+'评审说明</div>'+
      '<section class="rule-block"><h3>本轮目标</h3><p>最高优先：从内容/视频看清关联品牌与商品。</p><p>扩充现有内容列表/卡片，复用已收录关系；商品清单和表现指标随后讨论。</p></section>'+
      (['point','product-detail','channel-publications'].includes(ui.page)?'<section class="rule-block"><h3>当前修改点 · '+p.id+'</h3><p>'+esc(p.boundary)+'</p><p>'+tag(p.scopeStatus,p.implementation==='已演示'?'implemented':'pending')+' '+tag(p.implementation)+' '+tag(p.priority)+'</p></section>'+
      '<section class="rule-block note-form"><h3>本点审阅意见</h3><label for="note-status">意见标记</label><select id="note-status">'+statuses.map(s=>'<option '+(note(p.id).status===s?'selected':'')+'>'+s+'</option>').join('')+'</select><label for="note-text">备注</label><textarea id="note-text" maxlength="4000" placeholder="记录具体疑问、建议或讨论结论…">'+esc(note(p.id).text)+'</textarea><div class="note-count">仅当前页面会话保留，刷新将清空。</div><p>“本轮无补充”不表示正式批准。</p></section>':'')+
      '<section class="rule-block"><h3>渐进同步方式</h3><p>讨论结果先记入 Product Input，再同步对应 Demo。</p><p>未收口的点只列候选，不提前演示为既定方案。</p></section>'+
      '<section class="rule-block"><h3>新增数据模块的进入条件</h3><ul><li>明确帮助用户完成什么判断。</li><li>说明现有模块为什么不够。</li><li>确认数据依据与新增价值。</li></ul><p>价值确认后才进入 Input 和 Demo。</p></section>'+
      '<section class="rule-block"><h3>当前覆盖与限制</h3><p>已有模块：按线上功能组织的模拟参照。</p><p>B01已确认、已演示（低优先级）；P03双TAB方案已演示、待评审；P04/P05已确认并演示；P01完整商品清单已演示；P02两项可排序指标列已演示；S01品牌TAB时间选择器已确认并演示，不跨TAB；V01/V04发布能力、V06商品视频模块频道联动已确认并演示。</p><p>没有真实接口、销售归因或业务故事。</p></section>'+
      '<section class="rule-block"><h3>事实依据</h3><p>初始事实：2026-11-13；模块外观与合作详情复查：2026-11-16。数值为虚构，图片为公开展示素材。</p><a href="./facts.html" target="_blank" rel="noopener">查看事实与口径说明 '+icon('ChevronRight')+'</a></section></aside>';
  }
  function openDialog(body, footer) {
    $('#dialog').className='';
    $('#dialog').innerHTML='<div class="dialog-body">'+body+'</div><div class="dialog-footer">'+footer+'</div>';
    $('#dialog').showModal();
  }
  function exportNotes() {
    const data={demo:D.releaseName+' · 功能审阅',releaseVersion:D.releaseVersion,releaseName:D.releaseName,version:D.version,exportedAt:new Date().toISOString(),baselineDate:D.baselineDate,scope:'频道详情页品牌-商品指标扩展',note:'本文件只记录会话内意见，不代表正式需求确认。',points:D.points.map(p=>({id:p.id,title:p.title,platform:p.platform,scopeStatus:p.scopeStatus,implementation:p.implementation,priority:p.priority,review:note(p.id)}))};
    const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json;charset=utf-8'});
    const url=URL.createObjectURL(blob),a=document.createElement('a');
    a.href=url;a.download=D.releaseVersion+'-'+D.releaseName+'-审阅意见.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
    toast('已导出本次审阅意见');
  }
  document.addEventListener('click',event => {
    if (event.target.closest('.skip-link')) { event.preventDefault(); $('#main-content').focus(); return; }
    const bucket=event.target.closest('[data-trend-id="channel-publications"][data-trend-bucket]');
    if(bucket){openPublicationBucket(bucket.dataset.trendBucket,bucket);return;}
    const nav=event.target.closest('[data-page]');
    if (nav) { navigate(nav.dataset.page); return; }
    if (event.target.closest('a')) return;
    const control=event.target.closest('[data-action]');
    if (!control) return;
    const {action,id}=control.dataset;
    if (action==='navigate') navigate(id);
    if (action==='layoutProducts') {ui.locateProducts=true;navigate('products');}
    if (action==='layoutTab') {ui.layoutTab=id;render();$('#layout-tab-'+id)?.focus({preventScroll:true});}
    if (action==='comparisonView') {ui.comparisonView=id;ui.trendSelected=null;render();$('#comparison-tab-'+ui.comparisonView)?.focus({preventScroll:true});}
    if (action==='clearTrendFilters') {ui.trendBrand='';ui.trendProduct='';ui.trendSelected=null;render();$('#channel-trend-brand')?.focus({preventScroll:true});}
    if (action==='publicationNext'||action==='publicationPrev') {publicationDrawer.page+=action==='publicationNext'?1:-1;renderPublicationDrawer('[data-action="'+action+'"]');}
    if (action==='point') navigate('point',id);
    if (action==='brandPoints'||action==='productPoints') {ui.group=action==='brandPoints'?'brand':'product';ui.query='';navigate('points');}
    if (action==='export') exportNotes();
    if (action==='cancel') $('#dialog').close();
    if (action==='reset') openDialog('<h2 id="dialog-title">重置本次示例与意见？</h2><p>当前备注和意见标记将清空。需要保留时，请先取消并导出。</p>',button('取消','cancel')+button('重置','confirmReset','','primary'));
    if (action==='confirmReset') {ui.comparisonView='performance';ui.trendGrain='month';ui.trendBrand='';ui.trendProduct='';ui.trendStatus='available';ui.trendSelected=null;B.reset();window.ChannelAssociations.reset();window.ProductVideoReview.reset();ui.productMetadata='provided';ui.fullProductPage=1;ui.fullProductSize=10;ui.fullProductBrand='';ui.fullProductSort=defaultProductSort;ui.fullProductSortDirection='desc';ui.notes={};ui.sample='filled';ui.brandQuery='';ui.query='';ui.group='all';ui.sort='videoCount';ui.sortDirection='desc';ui.promotion='';ui.pageSize=10;ui.drawerBrand=null;$('#dialog').close();render();toast('示例与意见已重置');}
    if (action==='completeProductsNext'||action==='completeProductsPrev') {ui.fullProductPage+=action==='completeProductsNext'?1:-1;render();document.querySelector('.complete-products-module')?.scrollIntoView({block:'start'});}
    if (action==='productMetricSort') {ui.fullProductSortDirection=ui.fullProductSort===id&&ui.fullProductSortDirection==='desc'?'asc':'desc';ui.fullProductSort=id;ui.fullProductPage=1;render();document.querySelector('[data-action="productMetricSort"][data-id="'+id+'"]')?.focus({preventScroll:true});}
    if (action==='clearProductBrand') {ui.fullProductBrand='';ui.fullProductPage=1;render();$('#complete-product-brand')?.focus({preventScroll:true});}
    if (action==='brandProducts') {ui.fullProductBrand=id;ui.fullProductPage=1;ui.locateProducts=true;$('#dialog').close();navigate('products');}
    if (action==='productVideos') window.ProductVideoReview.openChannelDrawer(id,control,ui.productMetadata==='missing'?'unavailable':'available',isBrandReview()||ui.page==='point'&&ui.point==='P03'&&window.ChannelAssociations.getActiveTab()==='brand'?'brand':'content');
    if (action==='brandSort') {ui.sortDirection=ui.sort===id&&ui.sortDirection==='desc'?'asc':'desc';ui.sort=id;render();}
    if (action==='brandVideos') {
      ui.drawerBrand=id;ui.contentType='all';ui.mentionType=ui.promotion||'all';renderBrandDrawer();$('#dialog').showModal();
    }
  });
  $('#dialog').addEventListener('close',()=>{const trigger=publicationDrawer?.trigger;publicationDrawer=null;$('#dialog').innerHTML='';$('#dialog').className='';ui.drawerBrand=null;if(trigger?.isConnected)trigger.focus({preventScroll:true});});
  document.addEventListener('change',event => {
    const el=event.target;
    if (el.matches('[data-trend-grain="channel-publications"]')) {ui.trendGrain=el.value;ui.trendSelected=null;render();document.querySelector('[data-trend-grain="channel-publications"]')?.focus({preventScroll:true});return;}
    if (el.id==='channel-trend-brand'||el.id==='channel-trend-product'||el.id==='channel-trend-state'){if(el.id==='channel-trend-brand'){ui.trendBrand=el.value;if(ui.trendBrand&&ui.trendProduct&&D.products.find(p=>p.id===ui.trendProduct)?.brandId!==ui.trendBrand)ui.trendProduct='';}else if(el.id==='channel-trend-product')ui.trendProduct=el.value;else ui.trendStatus=el.value;ui.trendSelected=null;render();$('#'+el.id)?.focus({preventScroll:true});return;}
    if (el.id==='publication-drawer-size'&&publicationDrawer){publicationDrawer.size=Number(el.value);publicationDrawer.page=1;renderPublicationDrawer('#publication-drawer-size');return;}
    if (el.matches('[data-brand-period]')) {ui.trendSelected=null;B.setRange(el.value);ui.fullProductPage=1;document.querySelectorAll('dialog[open]').forEach(d=>d.close());render();document.querySelector('[data-brand-period]')?.focus({preventScroll:true});return;}
    if (el.id==='complete-product-brand') {ui.fullProductBrand=el.value;ui.fullProductPage=1;render();$('#complete-product-brand')?.focus({preventScroll:true});}
    if (el.id==='complete-product-size') {ui.fullProductSize=Number(el.value);ui.fullProductPage=1;render();}
    if (el.id==='product-metadata-state') {ui.productMetadata=el.value;render();}
    if (el.id==='point-group') {ui.group=el.value;render();}
    if (el.id==='sample-state') {ui.sample=el.value;ui.fullProductPage=1;render();}
    if (el.id==='promotion-type') {ui.promotion=el.value;render();}
    if (el.id==='brand-page-size') {ui.pageSize=Number(el.value);render();}
    if (el.id==='drawer-content-type') {ui.contentType=el.value;renderBrandDrawer();}
    if (el.id==='drawer-mention-type') {ui.mentionType=el.value;renderBrandDrawer();}
    if (el.id==='note-status') {ui.notes[ui.point]={...note(ui.point),status:el.value};}
  });
  document.addEventListener('input',event => {
    const el=event.target;
    if (el.id==='note-text') {ui.notes[ui.point]={...note(ui.point),text:el.value};return;}
    const key=el.id==='point-query'?'query':el.id==='brand-query'?'brandQuery':null;
    if (!key) return;
    ui[key]=el.value;const at=el.selectionStart;const id=el.id;render();const input=$('#'+id);input.focus();input.setSelectionRange(at,at);
  });
  document.addEventListener('keydown',event=>{if(event.target.matches('[data-action="comparisonView"]')&&['ArrowLeft','ArrowRight','Home','End'].includes(event.key)){event.preventDefault();ui.comparisonView=event.key==='Home'?'performance':event.key==='End'?'publications':ui.comparisonView==='performance'?'publications':'performance';ui.trendSelected=null;render();$('#comparison-tab-'+ui.comparisonView).focus({preventScroll:true});return;}if(event.target.matches('[data-action="layoutTab"]')&&['ArrowLeft','ArrowRight','Home','End'].includes(event.key)){event.preventDefault();const tabs=['overview','audience','content','brand'],index=tabs.indexOf(ui.layoutTab);ui.layoutTab=event.key==='Home'?tabs[0]:event.key==='End'?tabs.at(-1):tabs[(index+(event.key==='ArrowRight'?1:3))%4];render();$('#layout-tab-'+ui.layoutTab).focus({preventScroll:true});return;}if((event.key==='Enter'||event.key===' ')&&event.target.matches('tr[data-action], [data-product-card]')){event.preventDefault();event.target.click();}});
  window.addEventListener('hashchange',() => {parseRoute();render();});
  window.BrandPeriodUI={control:brandPeriodControl};
  parseRoute();render();
})();
