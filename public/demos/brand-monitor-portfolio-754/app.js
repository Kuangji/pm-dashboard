(function () {
  'use strict';

  if (new URLSearchParams(location.search).has('assetScope')) {
    window.BrandAssetLibrary.openPage();
    return;
  }

  const engine = window.Brand754;
  const { configLabel } = window.BrandAssetLibrary;
  const app = document.getElementById('app');
  const manager = document.getElementById('view-manager');
  const dialog = document.getElementById('dialog');
  const notice = document.getElementById('announcement');
  const picker = document.getElementById('config-picker');
  const pickerPageSize = 8;
  const demoVersion = 'v0.29';
  const platformNames = { all: '全部平台', youtube: 'YouTube', instagram: 'Instagram', tiktok: 'TikTok' };
  const roleNames = { editor: '可管理', viewer: '仅查看', base: '仅基础报告（47）', advanced: '仅高级报告（49）', revoked: '权限已撤销' };
  const scenarios = { normal: '正常数据', many: '多个子视图 · 对比勾选', full: '大样本月报 · 5 个对比成员', anker: 'Anker · 人工选取', first: '尚未创建子视图', missing: '观看量与字段缺失', incomplete: '刷新取数不完整' };
  const statusNames = { available: '可用', generating: '首次生成中', updating: '更新中', failed: '生成失败', inactive: '已停用' };
  const tabs = {
    overview: '品牌概览',
    comparison: '子视图对比',
    strategy: '营销策略',
    dynamics: '市场动态',
    assets: '营销资产'
  };
  const points = [
    { id: 'Q01', title: '子视图查询与标签', route: 'manage', steps: ['在「子视图管理」里创建子视图，填写名称和任选的视图标签。', '纳入内容标签 trail，排除 home，预览命中内容与依据。', '生成快照，在管理列表的对应行勾选「参与对比」，保存对比选择。', '切换「观看量与字段缺失」，只选 TikTok，输入文本短语并预览。'], expected: '视图标签用于识别和组织。发布后即可选为对比分项。' },
    { id: 'Q02', title: 'Anker 人工选取与快照', route: 'anker', steps: ['打开 Anker 的子视图管理，选择「创建子视图」。', '在条件组 1 选择主配置 anker solix，并点击组内的「添加条件」填入内容文本 C1000。点击组外的「添加条件组」，在与首组用「并且」连接的条件组 2 填入 户外，再在该组添加 收纳。每个包含组也可以单独选择所属的主配置，例如 Instagram 的 SOLIX 官号。', '预览每条内容的命中依据，保存同批快照，再从管理列表打开报告核对明细。'], expected: 'MIS 配置摘录供人工选取，预览与保存使用同一批 Anker 样例内容。' },
    { id: 'S01', title: '快照与对比', route: 'comparison', steps: ['在对比 TAB 读取期间、指标和快照截至时间。', '打开「子视图管理」，在「对比显示」临时隐藏一行，切换最近 7 天或平台。', '在抽屉内点「统一刷新」，分别模拟失败和成功。'], expected: '临时隐藏只影响显示。覆盖诊断始终按全部已配置成员计算。' },
    { id: 'R01', title: '主品牌报告与对比配置', route: 'comparison', steps: ['从月报指标表查看提及视频数、总观看量和单条观看中位数，点击总观看量打开观看量最高的视频。', '打开「子视图管理」，勾选「新品体验内容」行的「参与对比」并保存。', '在抽屉中核对覆盖与重叠，关闭后查看平台构成，再从抽屉清空配置。'], expected: '新增分项后指标、平台构成和发布节奏联动，主品牌分母保持一致。清空成员后，同一 TAB 显示「尚未配置对比成员」。' },
    { id: 'R05', title: '达人、互动与推广结构', route: 'comparison', steps: ['在规模与表现中核对参与网红数和总互动量。', '查看多次发布达人的人数与名单，在同平台互动率图切换平台、点开样本评论。', '点推广类型构成的一段，核对该视图和分类下的内容。'], expected: '切换图内平台仅影响互动率。达人按平台账号去重，各推广类型内容数之和等于视图内命中数。' },
    { id: 'R07', title: '子视图重合度', route: 'overlap', steps: ['在重合度矩阵中点选两个子视图的交叉格，核对共同内容和两侧的覆盖比例。', '切换到参与网红，核对同一组合的双向覆盖，再点开共同达人查看两侧各自的发布条数。'], expected: '分母随所选组合和维度变化。报告的日期、平台及可见成员同时约束组合与明细。' },
    { id: 'R06', title: '五个子视图的满载月报', route: 'full-comparison', steps: ['查看十月的主品牌和五个子视图。', '对照推广结构与平台构成，需要精确值时展开数量和占比。', '切换平台或发布日期，从表格、图中分类或趋势点下钻核对。'], expected: '五个分项共用主品牌快照，各图、表和明细随着相同的成员与范围更新。' },
    { id: 'R04', title: '从多个子视图中选择对比成员', route: 'compare-select', steps: ['查看管理列表中已勾选的五个子视图。', '取消一项，勾选另一项，点击「保存对比选择」。', '关闭抽屉，在子视图对比中核对五个成员和主品牌基准。'], expected: '达到上限后仍可取消已选成员。主品牌基准独立展示。' },
    { id: 'R02', title: '子视图报告', route: 'comparison', steps: ['从对比过滤后打开山野系列子报和明细。', '对照独立入口及刷新前的旧链接。'], expected: '下钻沿用所选批次、日期和平台。独立入口使用最新已发布的快照。' },
    { id: 'R03', title: '发布趋势与下钻', route: 'comparison', steps: ['进入「子视图对比」的发布趋势。', '切换按日和按周，选择一个日期或直接点击曲线点。', '打开某个分项的内容库，核对条数、平台、时间段与批次，再返回曲线。'], expected: '主品牌参考线和子视图使用同一批次。点位的条数与同批内容库一致。' },
    { id: 'L01', title: '管理入口与生命周期', route: 'manage', steps: ['关闭抽屉，切到营销资产，再开关抽屉核对报告状态。', '在抽屉编辑山野系列，模拟失败，核对旧规则后重试。', '停用后打开原链接，再切换仅查看或权限已撤销。'], expected: '管理独立于报告标签。更新失败仍能读旧结果，停用或撤权即时限制旧链接。' },
    { id: 'F01', title: '评审意见回流', route: 'review', steps: ['选择一个评审点，记录观察与期望。', '导出 JSON，核对版本、身份、场景及配置的对比成员。'], expected: '意见在本次会话保留，导出用于随后回写 Input、Spec、Design 和 Demo。' }
  ];

  const isAnkerRoute = () => ['#anker', '#anker-query', '#anker-impact', '#anker-bulk'].includes(location.hash);
  const isFullRoute = () => ['#full-comparison', '#overlap'].includes(location.hash) || new URLSearchParams(location.hash.slice(1)).get('scene') === 'full';
  let scenario = isAnkerRoute() ? 'anker' : isFullRoute() ? 'full' : location.hash === '#compare-select' ? 'many' : 'normal';
  let state = engine.createState(scenario);
  let scope = defaultComparisonScope();
  const hiddenRows = new Set();
  let comparisonDraft = null;
  let activeTab = tabFromHash();
  let activeAsset = 'videos';
  let assetPage = 1;
  let engagementPlatform = 'youtube';
  let trendGranularity = 'week';
  let trendBucket = null;
  let pairExpanded = location.hash === '#overlap';
  let pairDimension = 'content';
  let pairSelection = null;
  let editor = null;
  let picking = null;
  let preview = null;
  let bulkRepairResult = null;
  let previousFocus = null;
  let noticeTimer;
  const feedback = {};
  const openedAssetScopes = new Set();
  let assetAccessSignature;
  let inlineLibrary = null;

  const text = value => String(value ?? '').replace(/[&<>"']/g, item => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[item]);
  const number = value => Number.isFinite(value) ? value.toLocaleString('zh-CN') : '—';
  const percent = value => Number.isFinite(value) ? (value * 100).toLocaleString('zh-CN', { maximumFractionDigits: 1 }) + '%' : '—';
  const engagementPercent = value => Number.isFinite(value)
    ? value.toLocaleString('zh-CN', { style: 'percent', maximumFractionDigits: 2 }) : '—';
  const disabled = condition => condition ? ' disabled' : '';
  const selected = condition => condition ? ' selected' : '';
  const checked = condition => condition ? ' checked' : '';
  const canEdit = () => state.role === 'editor';

  function defaultComparisonScope() {
    const [month] = engine.completeComparisonMonths(state);
    return month ? { month, platform: 'all' } : { days: 30, platform: 'all' };
  }

  function rollingStartDate(end) {
    const start = new Date(end + 'T00:00:00Z');
    start.setUTCDate(start.getUTCDate() - 29);
    return start.toISOString().slice(0, 10);
  }

  function tabFromHash() {
    const name = location.hash.slice(1).split('&')[0];
    if (['compare-select', 'full-comparison', 'overlap'].includes(name)) return 'comparison';
    return Object.hasOwn(tabs, name) ? name : 'overview';
  }

  function reportHash(tab) {
    if (scenario === 'full' && tab === 'comparison') return '#full-comparison';
    return '#' + (tab === 'overview' ? 'report' : tab) + (scenario === 'full' ? '&scene=full' : '');
  }

  const hasMonitorAccess = () => state.role === 'editor' || state.role === 'viewer';

  function getRoute() {
    const hash = location.hash.slice(1);
    if (hash === 'review') return { page: hash };
    const params = new URLSearchParams(hash);
    if (params.has('point') && points.some(point => point.id === params.get('point'))) {
      return { page: 'point', id: params.get('point') };
    }
    if (params.has('child')) {
      const batch = params.get('batch') || undefined;
      return {
        page: 'child',
        id: params.get('child'),
        batch,
        filters: {
          ...(params.has('month') ? { month: params.get('month') } : { days: Number(params.get('days') ?? 30) }),
          platform: params.get('platform') || 'all'
        }
      };
    }
    return { page: 'report' };
  }

  function childLink(id, batch, filters) {
    const params = new URLSearchParams({ child: id });
    if (scenario === 'full') params.set('scene', 'full');
    if (batch) {
      params.set('batch', batch);
      if (filters.month) params.set('month', filters.month);
      else params.set('days', filters.days);
      params.set('platform', filters.platform);
    }
    return '#' + params;
  }

  function optionList(options, current) {
    return Object.entries(options).map(([value, label]) => '<option value="' + text(value) + '"' + selected(value === current) + '>' + text(label) + '</option>').join('');
  }

  function button(label, action, opts = {}) {
    const attrs = Object.entries(opts.data ?? {}).map(([key, value]) => ' data-' + key + '="' + text(value) + '"').join('');
    return '<button type="button" class="btn ' + (opts.style ?? '') + '" data-action="' + action + '"' + attrs + disabled(opts.disabled) + '>' + text(label) + '</button>';
  }

  function tag(label, style = '') {
    return '<span class="tag ' + style + '">' + text(label) + '</span>';
  }

  function viewLabels(labels) {
    return labels?.length ? '<span class="view-labels">' + labels.map(label => tag(label)).join('') + '</span>' : '';
  }

  function statusTag(status, hasSnapshot) {
    const label = status === 'failed' && hasSnapshot ? '更新失败 · 旧结果可用'
      : status === 'failed' ? '首次生成失败' : statusNames[status] ?? '待生成';
    const style = status === 'available' ? 'good' : status === 'failed' ? 'danger'
      : status === 'inactive' ? '' : 'pending';
    return tag(label, style);
  }

  function notify(message) {
    clearTimeout(noticeTimer);
    const target = manager.open ? manager.querySelector('#manager-status') : notice;
    notice.hidden = target !== notice;
    target.textContent = message;
    target.hidden = false;
    noticeTimer = setTimeout(() => { target.hidden = true; }, 4200);
  }

  function render() {
    // An open asset tab is bound to this source report's permission and publication.
    const access = JSON.stringify([scenario, hasMonitorAccess(), state.publication.id,
      state.views.filter(view => view.active && !view.activationPending).map(view => view.id)]);
    if (assetAccessSignature !== access) {
      for (const key of openedAssetScopes) window.BrandAssetStore.remove(key);
      openedAssetScopes.clear();
      assetAccessSignature = access;
    }
    const route = getRoute();
    const nav = [
      { id: 'report', name: '主品牌报告', symbol: '▤', isActive: route.page === 'report' || route.page === 'child' },
      { id: 'review', name: '评审清单', symbol: '☷', isActive: route.page === 'review' || route.page === 'point' }
    ];
    const current = route.page === 'child' ? '子视图报告' : nav.find(item => item.isActive).name;
    let body;
    if (route.page === 'review' || route.page === 'point') body = reviewPage(route);
    else if (state.role === 'revoked') body = '<section class="card pad"><div class="empty" data-test="denied"><strong>主品牌报告访问权限已撤销</strong><p>关联子视图快照和历史链接也不可查看。</p></div></section>';
    else body = reportPage(route);

    app.innerHTML = '<div class="shell"><aside class="rail" aria-label="工作区导航">'
      + '<a class="wordmark" href="' + reportHash('overview') + '"><span class="logo-mark" aria-hidden="true">N</span><span>Nox 聚星</span></a>'
      + '<div class="rail-caption">品牌监控</div><nav class="rail-nav">'
      + nav.map(item => '<a class="rail-link' + (item.isActive ? ' active' : '') + '" href="' + (item.id === 'report' ? reportHash('overview') : '#' + item.id) + '"'
        + (item.isActive ? ' aria-current="page"' : '') + '><span class="nav-symbol" aria-hidden="true">' + item.symbol + '</span>' + item.name + '</a>').join('')
      + '</nav><div class="rail-footer"><strong>v7.5.4 · Demo ' + demoVersion + '</strong><small>独立功能评审 · ' + (scenario === 'anker' ? 'MIS 配置摘录／模拟内容' : '虚构数据') + '</small></div></aside>'
      + '<div class="workspace"><header class="topbar"><div class="crumbs">品牌监控 <span aria-hidden="true">/</span> <strong>' + current + '</strong></div>'
      + '<div class="tools">' + tag('评审环境', 'brand')
      + '<label>场景<select aria-label="演示场景" data-setting="scenario">' + optionList(scenarios, scenario) + '</select></label>'
      + '<label>身份<select aria-label="演示身份" data-setting="role">' + optionList(roleNames, state.role) + '</select></label></div></header>'
      + '<main class="content vertical" tabindex="-1" id="main-content">' + body + '</main></div></div>';
    const library = app.querySelector('[data-inline-library]');
    if (library) {
      try {
        const payload = assetPayload({ source: 'report', assetLibrary: library.dataset.inlineLibrary });
        const readFilters = window.BrandAssetLibrary.mountInline(library, payload);
        inlineLibrary = readFilters ? { context: inlineLibraryContext(payload), kind: payload.kind, readFilters } : null;
      } catch (error) {
        inlineLibrary = null;
        library.textContent = error.message || '该快照不可用，请从当前报告重新打开。';
      }
    } else inlineLibrary = null;
  }

  function taskBanner() {
    const task = state.task;
    if (!task) return state.lastError ? '<p class="callout error" data-test="task-error">' + text(state.lastError) + '</p>' : '';
    const names = { retry: '重试生成', save: '生成子视图快照', activate: '生成启用版本', refresh: '统一刷新' };
    return '<div class="task-bar" data-test="task"><p><strong>' + text(names[task.kind]) + '中</strong>'
      + '<span class="small muted">在演示中手动选择任务结果。</span></p><div class="actions">'
      + button('模拟成功', 'settle', { style: 'compact', data: { outcome: 'success' }, disabled: !canEdit() })
      + button('模拟失败', 'settle', { style: 'compact', data: { outcome: 'failure' }, disabled: !canEdit() })
      + '</div></div>';
  }

  function reportPage(route) {
    const isChild = route.page === 'child';
    const reportTabs = Object.entries(tabs).filter(([key]) => {
      if (!hasMonitorAccess()) return key === (state.role === 'advanced' ? 'strategy' : 'overview');
      return !isChild || key !== 'comparison';
    });
    const panelTab = reportTabs.some(([key]) => key === activeTab) ? activeTab : reportTabs[0][0];
    const filters = isChild ? route.filters : scope;
    const child = isChild ? engine.readChild(state, route.id, filters, route.batch) : null;
    if (isChild && !child.ok) {
      const view = state.views.find(item => item.id === route.id && item.active);
      const retryLink = child.reason === 'expired' || child.reason === 'range';
      return '<section class="card pad vertical"><div class="page-intro"><a href="' + reportHash('overview') + '">← 主品牌报告</a><h1>子视图报告</h1></div>'
        + '<div class="empty" data-test="child-unavailable" data-reason="' + text(child.reason) + '"><strong>' + text(child.error) + '</strong>'
        + (retryLink && view ? '<p><a href="' + childLink(route.id) + '">打开当前子视图报告</a></p>' : '') + '</div></section>';
    }
    const records = panelTab === 'comparison' ? [] : isChild ? child.records : engine.filterRecords(state.liveRecords, { days: 30, platform: 'all' }, state.publication.dateEnd);
    const total = isChild ? child.total : engine.summarize(records);
    const publishers = panelTab !== 'comparison' ? engine.publisherSummary(records) : null;
    const title = isChild ? child.name : state.brand.name;
    const reportName = isChild ? '子视图报告' : '主品牌报告';
    const marker = isChild ? title.slice(0, 2) : state.brand.name === 'Anker' ? 'A' : 'T';
    const identity = isChild ? '所属主品牌 ' + state.brand.name + ' · 规则 v' + child.version : state.brand.category;
    const poolBatch = scenario === 'anker' && isChild ? ' · 主池 ' + child.poolBatchId : '';
    const snapshotText = isChild ? child.dateStart + ' 至 ' + child.dateEnd + ' · ' + platformNames[filters.platform] + ' · 截至 ' + child.cutoff + ' · ' + child.batchId
      : '标准报告 · 最近 30 天 · ' + rollingStartDate(state.publication.dateEnd) + ' 至 ' + state.publication.dateEnd + ' · 全部平台 · 截至 ' + state.liveCutoff;
    return '<section class="card brand-head" data-test="report-header"><div class="brand-mark' + (isChild ? ' child' : '') + '" aria-hidden="true">' + text(marker) + '</div>'
      + '<div><p class="overline">' + reportName + '</p><h1>' + text(title) + '</h1><p class="small muted">' + text(identity) + '</p>'
      + (isChild ? viewLabels(child.rule.labels) : '') + '</div>'
      + '<div class="actions">' + (isChild ? '<a href="' + reportHash(route.batch ? 'comparison' : 'overview')
        + '" class="btn">← 返回主品牌</a>' : hasMonitorAccess() ? '<button type="button" class="btn" data-action="open-manager" aria-haspopup="dialog" aria-controls="view-manager">子视图管理</button>' : '') + '</div></section>'
      + (panelTab === 'comparison' ? '' : '<div class="scope" data-test="report-scope">' + text(snapshotText + poolBatch)
      + (isChild ? impactSummary(state.views.find(view => view.id === route.id), 'report') : '') + '</div>'
      + '<section class="kpis" aria-label="现有报告指标示意">'
      + kpi('总内容数', total.videos, '条', 'report-videos')
      + kpi('观看量', total.views, '次', 'report-views')
      + kpi('总网红数', publishers.creatorCount, '已匹配资料的去重账号', 'report-channels') + '</section>')
      + '<section class="card" aria-label="品牌报告板块"><div class="tabs" role="tablist">'
      + reportTabs.map(([key, label]) => '<button type="button" role="tab" id="tab-' + key + '" aria-controls="report-panel" aria-selected="' + (panelTab === key) + '" tabindex="' + (panelTab === key ? 0 : -1) + '" class="tab' + (panelTab === key ? ' active' : '') + '" data-action="tab" data-id="' + key + '">' + label + '</button>').join('')
      + '</div><div role="tabpanel" id="report-panel" aria-labelledby="tab-' + panelTab + '" class="pad vertical' + (panelTab === 'comparison' && state.comparisonViewIds.filter(id => !hiddenRows.has(id)).length >= 4 ? ' dense-comparison' : '') + '">'
      + (panelTab === 'comparison' ? comparisonPage()
        : panelTab === 'overview' ? (isChild ? childOverview(records, filters, child) : standardTrend(records))
        : reportSection(records, child, panelTab, publishers)) + '</div></section>';
  }

  function kpi(label, value, unit, id) {
    return '<div class="card kpi"><span class="overline">' + label + '</span><strong class="value" data-test="' + id + '">' + number(value)
      + '</strong><span class="small">' + (value === null ? '数据未提供' : unit) + '</span></div>';
  }

  function comparisonScope(result) {
    return '<details class="metric-help"><summary aria-label="对比统计范围">?</summary>'
      + '<div class="metric-tip" data-test="comparison-scope"><strong>同批主品牌基准</strong>'
      + '<p>' + text(result.dateStart + ' 至 ' + result.dateEnd + ' · ' + platformNames[scope.platform]) + '</p>'
      + '<p>数据截至 ' + text(result.cutoff) + ' · 批次 ' + text(result.batchId) + '</p><p>视频数和总观看量分别除以同批主品牌的对应总量。同一视频可命中多个视图，各行占比相加可能超过 100%。单条观看中位数按每条视频的截至观看量计算。参与网红数按平台账号去重，仅计已匹配频道资料的账号。总互动量采用各平台内容的快照值。</p></div></details>';
  }

  function comparisonPage() {
    if (!state.comparisonViewIds.length) {
      pairSelection = null;
      return '<div class="empty workspace-empty" data-test="comparison-empty"><strong>尚未配置对比成员</strong><p>'
        + (canEdit() ? '在子视图管理中选择要比较的视图。' : '管理者配置成员后，可在此查看对比。') + '</p>'
        + (canEdit() ? button('打开子视图管理', 'open-manager') : '') + '</div>';
    }
    const result = engine.compare(state, scope);
    if (!result.ok) return '<div role="status" class="empty">' + text(result.error) + '</div>';
    const rows = result.rows.filter(row => !hiddenRows.has(row.id));
    const trend = engine.publicationTrend(state, scope, trendGranularity, result.batchId);
    const pool = { ...result.total, id: 'pool', name: '主品牌基准', platforms: engine.platforms };
    return '<section class="comparison" aria-labelledby="comparison-heading">'
      + '<div class="section-heading workspace-heading"><div class="comparison-title"><h2 id="comparison-heading" tabindex="-1">规模与表现</h2>'
      + comparisonScope(result) + '</div><div class="filters">' + comparisonFilters('工作区') + '</div></div>'
      + '<p class="small muted monthly-range" data-test="monthly-range">发布日期 ' + text(bucketLabel(result))
      + ' · 观看量截至 ' + text(result.cutoff) + '（UTC+8）</p>'
      + '<div class="table-wrap" tabindex="0" aria-label="子视图对比表横向滚动"><table class="comparison-table monthly-table" aria-label="子视图对比">'
      + '<thead><tr><th scope="col">主品牌 / 子视图</th><th scope="col">提及视频数</th><th scope="col">总观看量</th><th scope="col">单条观看中位数</th><th scope="col">参与网红数</th><th scope="col">总互动量</th><th scope="col">操作</th></tr></thead><tbody>'
      + [pool, ...rows].map(row => comparisonRow(result, row)).join('') + '</tbody></table></div>'
      + (!rows.length ? '<p class="small muted">当前已隐藏所有子视图分项。</p>' : '') + '</section>'
      + pairOverlapSection(result, rows)
      + (rows.length ? '<div class="monthly-metric-pair">' + repeatChart([pool, ...rows]) + engagementChart([pool, ...rows]) + '</div>'
        + promotionChart([pool, ...rows]) + viewShareChart(result, rows) : '')
      + (scope.platform === 'all' && rows.length ? platformComposition(rows) : '')
      + '<section class="workspace-trend" aria-label="发布趋势"><h2>发布节奏</h2><div id="publication-trend" class="trend-comparison">'
      + (trend.ok ? renderTrendComparison(trend) : '<p class="callout">' + text(trend.error) + '</p>') + '</div></section>';
  }

  function pairDetail(pair, names, batchId) {
    const creators = pairDimension === 'creators';
    const unit = creators ? ' 个' : ' 条';
    const first = text(names.get(pair.firstId)), second = text(names.get(pair.secondId));
    const commonLabel = creators ? '共同达人' : '共同视频';
    const unavailable = pair.reason === 'missing' ? '账号身份或资料匹配信息缺失。' : '至少一个子视图未收录所选平台。';
    if (!pair.applicable) return '<div data-test="pair-details" class="pair-card"><h3>' + first + ' × ' + second
      + '</h3><p class="small muted">' + unavailable + '</p></div>';
    function side(name, other, total, only, share) {
      return '<div class="pair-side"><div><b>' + name + '</b><span>' + number(total) + unit + '</span></div>'
        + '<div class="pair-share"><i aria-hidden="true" style="width:' + (share === null ? 0 : share * 100)
        + '%"></i></div><p class="small">共同部分占 ' + percent(share) + '<span>未在' + other + '出现 ' + number(only) + unit + '</span></p></div>';
    }
    return '<div data-test="pair-details" class="pair-card"><h3>' + first + ' × ' + second + '</h3>'
      + (pair.union === 0 ? '<p class="small muted">两组去重合计为零，重合度无法计算。</p>' : '')
      + '<p class="pair-calculation">' + commonLabel + ' <b>' + number(pair.intersection) + unit
      + '</b> / 两者去重合计 <b>' + number(pair.union) + unit + '</b> · 重合度 <b>' + percent(pair.jaccard) + '</b></p>'
      + side(first, second, pair.firstCount, pair.firstOnly, pair.shareOfFirst)
      + side(second, first, pair.secondCount, pair.secondOnly, pair.shareOfSecond)
      + libraryLink(creators ? 'influencer' : 'content', 'pair',
        { action: 'pair-records', first: pair.firstId, second: pair.secondId, batch: batchId }, '查看' + commonLabel)
      + '</div>';
  }

  // Fixed anchors retain detail among low-overlap content pairs and high-overlap creator pairs.
  const pairScale = [
    { at: 0, rgb: [246, 249, 255] }, { at: .02, rgb: [217, 232, 253] },
    { at: .05, rgb: [179, 207, 245] }, { at: .30, rgb: [154, 184, 223] },
    { at: .60, rgb: [49, 91, 153] }, { at: 1, rgb: [22, 53, 95] }
  ];

  function pairColor(value) {
    const upperIndex = pairScale.findIndex(anchor => value <= anchor.at);
    const lower = pairScale[Math.max(0, upperIndex - 1)], upper = pairScale[upperIndex];
    const fraction = upper.at === lower.at ? 0 : (value - lower.at) / (upper.at - lower.at);
    const rgb = lower.rgb.map((channel, index) => Math.round(channel + (upper.rgb[index] - channel) * fraction));
    const linear = rgb.map(channel => channel <= 10 ? channel / 3294.6 : ((channel / 255 + .055) / 1.055) ** 2.4);
    const luminance = linear[0] * .2126 + linear[1] * .7152 + linear[2] * .0722;
    const ink = luminance > .23 ? 'var(--ink)' : luminance >= .179 ? '#000' : '#fff';
    return '--heat:rgb(' + rgb.join(',') + ');color:' + ink;
  }

  function pairMatrix(rows, pairs, current, dimension) {
    function cell(row, column) {
      if (row.id === column.id) return '<td data-diagonal class="pair-diagonal" aria-label="同一子视图">·</td>';
      const pair = pairs.find(item => (item.firstId === row.id && item.secondId === column.id)
        || (item.firstId === column.id && item.secondId === row.id));
      const value = pair.jaccard;
      const level = value === null ? 'unavailable' : value === 0 ? 'zero' : 'value';
      const fill = value === null ? '' : ' style="' + pairColor(value) + '"';
      const unavailable = pair.reason === 'platform' ? '未收录所选平台' : pair.reason === 'missing' ? '账号资料不完整' : '两组去重合计为零';
      const label = text(row.name + ' × ' + column.name + ' · ' + (value === null ? unavailable : dimension + '重合度 ' + percent(value)));
      return '<td><button type="button" class="pair-cell"' + fill + ' data-level="' + level + '" data-action="select-pair" data-first="'
        + text(row.id) + '" data-second="' + text(column.id) + '" aria-pressed="' + (pair === current)
        + '" aria-label="' + label + '" title="' + label + '">' + percent(value) + '</button></td>';
    }
    const header = (row, scope) => '<th scope="' + scope + '" title="' + text(row.name) + '"><span>' + text(row.name) + '</span></th>';
    const table = '<table class="pair-matrix" data-test="pair-matrix" aria-label="' + dimension + '重合度矩阵"><thead><tr><td></td>'
      + rows.map(row => header(row, 'col')).join('') + '</tr></thead><tbody>' + rows.map(row =>
        '<tr>' + header(row, 'row') + rows.map(column => cell(row, column)).join('') + '</tr>').join('') + '</tbody></table>';
    const legend = pairScale.map(anchor => '<span><i aria-hidden="true" style="--heat:rgb(' + anchor.rgb.join(',') + ')"></i>' + percent(anchor.at) + '</span>').join('');
    return '<div class="pair-matrix-panel"><div class="pair-scroll">' + table + '</div>'
      + '<div class="pair-legend"><b>重合度色标</b>' + legend + '</div></div>';
  }

  function pairOverlapSection(result, rows) {
    const names = new Map(rows.map(row => [row.id, row.name]));
    const creators = pairDimension === 'creators';
    const pairs = (creators ? result.creatorPairOverlaps : result.pairOverlaps)
      .filter(p => names.has(p.firstId) && names.has(p.secondId))
      .sort((a, b) => (b.jaccard ?? -1) - (a.jaccard ?? -1) || (b.intersection ?? -1) - (a.intersection ?? -1));
    const best = pairs[0];
    const pair = pairs.find(item => (item.firstId === pairSelection?.first && item.secondId === pairSelection?.second)
      || (item.firstId === pairSelection?.second && item.secondId === pairSelection?.first));
    if (!pair) pairSelection = null;
    const dimension = creators ? '参与网红' : '内容';
    const bestName = best && text(names.get(best.firstId)) + ' × ' + text(names.get(best.secondId));
    let summary = '至少显示两个子视图即可比较';
    if (best) {
      summary = best.jaccard === null ? '当前范围没有可计算的组合' : best.intersection === 0
        ? '可比组合均无共同' + (creators ? '达人' : '视频')
        : bestName + ' · ' + dimension + '重合度' + (pairs.length > 1 ? '最高 ' : ' ') + percent(best.jaccard);
    }
    const controls = ['content', 'creators'].map(value => '<button type="button" data-action="pair-dimension" data-dimension="'
      + value + '" aria-pressed="' + (pairDimension === value) + '">' + (value === 'content' ? '内容' : '参与网红') + '</button>').join('');
    return '<details id="pair-overlap" data-test="pair-overlap" class="pair-analysis"' + (pairExpanded ? ' open' : '') + '>'
      + '<summary><strong>子视图重合度</strong><span>' + summary + '</span></summary>'
      + (best ? '<div class="pair-toolbar"><div role="group" aria-label="重合度维度" class="pair-switch">' + controls
        + '</div><span class="small muted">重合度 = 共同' + dimension + '数 ÷ 两组去重后的' + dimension + '数。点选交叉格可查看明细。</span></div>'
        + '<div class="pair-layout' + (pair ? ' has-selection' : '') + '">' + pairMatrix(rows, pairs, pair, dimension)
        + (pair ? pairDetail(pair, names, result.batchId) : '') + '</div>' : '<p class="small muted">请在子视图管理中选择并显示至少两个成员。</p>') + '</details>';
  }

  function rateRow(row, value, maximum, detail, action, platform, unavailable, canInspect) {
    const name = text(row.name);
    const track = value === null ? '' : '<span class="rate-track" aria-hidden="true"><i style="left:'
      + (value / maximum * 100) + '%"></i></span>';
    const label = action === 'engagement-detail' ? engagementPercent(value) : percent(value);
    return '<div class="rate-row' + (row.id === 'pool' ? ' rate-baseline' : '') + '" data-view-id="' + text(row.id) + '">'
      + '<span class="rate-name">' + name + '</span><div class="rate-value">' + track
      + (canInspect ? '<button type="button" class="btn link" data-action="' + action + '" data-id="' + text(row.id)
        + '" data-platform="' + platform + '" aria-label="' + text(row.name + ' · ' + label + ' · 查看明细') + '">' + label + '</button>' : '<span>' + label + '</span>')
      + '</div><span class="rate-caption">' + text([unavailable, detail].filter(Boolean).join(' · ')) + '</span></div>';
  }

  function repeatChart(rows) {
    return '<section class="metric-card" data-test="repeat-chart" aria-labelledby="repeat-heading">'
      + '<h2 id="repeat-heading">多次发布达人占比</h2><p class="chart-description">当期发布至少 2 条命中内容的账号，占全部发布账号的比例。</p>'
      + rows.map(row => {
        const covered = scope.platform === 'all' || row.platforms.includes(scope.platform);
        const count = row.repeatCreatorCount;
        const denominator = row.publisherCount;
        const reason = !covered ? '未收录所选平台' : denominator === 0 ? '暂无发布账号' : denominator === null ? '账号数据不完整' : '';
        const counted = covered && Number.isFinite(denominator) && Number.isFinite(count);
        return rateRow(row, covered ? row.repeatCreatorRate : null, 1, counted ? number(count) + ' / ' + number(denominator) + ' 个账号' : '',
          'repeat-detail', scope.platform, reason, counted && denominator > 0);
      }).join('') + '</section>';
  }

  const engagementFormula = platform => platform === 'tiktok' ? '（赞 + 评 + 分享 + 收藏）÷ 观看' : '（赞 + 评）÷ 观看';

  function engagementChart(rows) {
    const platform = scope.platform === 'all' ? engagementPlatform : scope.platform;
    const observedMax = Math.max(0, ...rows.map(row => row.platforms.includes(platform) ? row.engagementByPlatform[platform].rate ?? 0 : 0));
    const step = Math.pow(10, Math.floor(Math.log10(observedMax || .01)));
    const maximum = Math.ceil((observedMax || .01) / step) * step;
    const select = scope.platform === 'all' ? '<select aria-label="互动率图平台" data-setting="engagement-platform">'
      + engine.platforms.map(key => '<option value="' + key + '"' + selected(key === platform) + '>' + platformNames[key] + '</option>').join('') + '</select>'
      : '<span class="small muted">' + platformNames[platform] + '</span>';
    return '<section class="metric-card" data-test="engagement-chart" aria-labelledby="engagement-heading">'
      + '<div class="section-heading"><h2 id="engagement-heading">同平台互动率</h2>' + select + '</div>'
      + '<p class="chart-description">' + engagementFormula(platform) + (platform === 'instagram' ? '，仅视频样本。' : '。') + '图中刻度 0–' + percent(maximum) + '。</p>'
      + rows.map(row => {
        const covered = row.platforms.includes(platform);
        const item = row.engagementByPlatform[platform];
        return rateRow(row, covered ? item.rate : null, maximum,
          covered ? '有效样本 ' + number(item.validCount) + ' / ' + number(item.sampleCount) + ' 条' : '',
          'engagement-detail', platform, covered ? item.reason : '未收录所选平台', covered && item.sampleCount > 0);
      }).join('') + '</section>';
  }

  // With four or five members a shared key keeps the composition rows aligned.
  function compactComposition(rows, isPromotion) {
    const entries = isPromotion ? Object.entries(engine.promotionLabels) : engine.platforms.map(id => [id, platformNames[id]]);
    const style = isPromotion ? 'promo-' : 'platform-';
    const test = isPromotion ? 'promotion-chart' : 'platform-composition';
    const heading = isPromotion ? 'promotion-heading' : 'composition-heading';
    const title = isPromotion ? '推广类型构成' : '平台构成';
    const getCounts = row => isPromotion ? row.promotionCounts : row.platformCounts;
    const covered = row => scope.platform === 'all' || row.platforms.includes(scope.platform);
    function cell(row, [key, label], segment) {
      const count = getCounts(row)[key];
      const applicable = covered(row) && (isPromotion || row.platforms.includes(key));
      const share = row.videos > 0 && applicable ? count / row.videos : null;
      const quantity = applicable ? number(count) + ' 条 · ' + percent(share) : '未收录';
      const caption = text(row.name + ' · ' + label + ' · ' + quantity);
      const action = isPromotion ? 'promotion-detail' : segment ? 'platform-segment' : 'platform-drill';
      const attrs = ' type="button" data-action="' + action + '" data-id="' + text(row.id) + '" data-'
        + (isPromotion ? 'category' : 'platform') + '="' + key + '" aria-label="' + caption + '" title="' + caption + '"';
      if (segment) {
        if (!share) return '';
        return '<button' + attrs + ' class="' + style + key + '" style="width:' + (share * 100) + '%">'
          + (share >= .13 ? percent(share) : '') + '</button>';
      }
      return '<td>' + (count && applicable ? '<button' + attrs + ' class="btn link">' + quantity + '</button>' : quantity) + '</td>';
    }
    return '<section class="' + test + ' dense-composition" data-test="' + test + '" aria-labelledby="' + heading + '">'
      + '<h2 id="' + heading + '">' + title + '</h2>'
      + '<div class="dense-legend">' + entries.map(([id, label]) => '<span><i class="' + style + id + '"></i>' + label + '</span>').join('') + '</div>'
      + rows.map(row => '<div class="dense-composition-row" data-view-id="' + text(row.id) + '"><strong>' + text(row.name) + '</strong>'
        + (covered(row) && row.videos ? '<div class="composition-track">' + entries.map(entry => cell(row, entry, true)).join('') + '</div>'
          + '<span>' + number(row.videos) + ' 条</span>' : '<span class="dense-empty">' + (covered(row) ? '当前范围无内容' : '未收录所选平台') + '</span>') + '</div>').join('')
      + '<details class="dense-values"><summary>查看各类条数与占比</summary><div class="table-wrap" tabindex="0" aria-label="' + title + '数值横向滚动">'
      + '<table><thead><tr><th>主品牌 / 子视图</th>' + entries.map(([, label]) => '<th>' + label + '</th>').join('') + '</tr></thead><tbody>'
      + rows.map(row => '<tr><th scope="row">' + text(row.name) + '</th>' + entries.map(entry => cell(row, entry, false)).join('') + '</tr>').join('')
      + '</tbody></table></div></details></section>';
  }

  function promotionChart(rows) {
    if (rows.length >= 5) return compactComposition(rows, true);
    const entries = Object.entries(engine.promotionLabels);
    return '<section class="promotion-chart" data-test="promotion-chart" aria-labelledby="promotion-heading">'
      + '<h2 id="promotion-heading">推广类型构成</h2><p class="chart-description">按各视图的命中内容数计算。选择分类可查看对应作品。</p>'
      + rows.map(row => {
        const covered = scope.platform === 'all' || row.platforms.includes(scope.platform);
        const id = text(row.id);
        function categoryControl(key, label, segment) {
          const count = row.promotionCounts[key];
          const share = row.videos ? count / row.videos : null;
          const title = label + ' ' + number(count) + ' 条 · ' + percent(share);
          const attrs = ' type="button" data-action="promotion-detail" data-id="' + id + '" data-category="' + key
            + '" aria-label="' + text(row.name + ' · ' + title) + '"';
          if (segment) return !count ? '' : '<button' + attrs + ' class="promo-' + key + '" tabindex="-1" title="' + title + '" style="width:' + (share * 100) + '%"></button>';
          return '<button' + attrs + ' class="platform-key" ' + disabled(count === 0) + '><i aria-hidden="true" class="promo-'
            + key + '"></i>' + label + ' <span>' + number(count) + ' · ' + percent(share) + '</span></button>';
        }
        return '<div class="composition-row" data-view-id="' + id + '"><h3>' + text(row.name) + (covered ? '<small>共 ' + number(row.videos) + ' 条</small>' : '')
          + '</h3>' + (!covered ? '<span class="small muted">未收录所选平台</span>' : row.videos === 0 ? '<span class="small muted">当前范围无内容</span>'
            : '<div><div class="composition-track">' + entries.map(([key, label]) => categoryControl(key, label, true)).join('')
              + '</div><div class="platform-keys">' + entries.map(([key, label]) => categoryControl(key, label, false)).join('') + '</div></div>') + '</div>';
      }).join('') + '</section>';
  }

  function viewShareChart(result, rows) {
    const applicable = row => scope.platform === 'all' || row.platforms.includes(scope.platform);
    const rank = row => applicable(row) ? (row.viewShare ?? -1) : -2;
    const sorted = [...rows].sort((a, b) => rank(b) - rank(a));
    function shareBar(metric, label, share, denominator) {
      const unavailable = denominator === 0 ? '主品牌总量为零' : '观看量数据缺失';
      const track = share === null ? '' : '<span class="share-track" aria-hidden="true"><i style="width:'
        + (share * 100) + '%"></i></span>';
      return '<div class="share-metric" data-metric="' + metric + '"><span>' + label + '</span>'
        + (share === null ? '<span class="share-missing">— · ' + unavailable + '</span>'
          : track + '<strong>' + percent(share) + '</strong>') + '</div>';
    }
    return '<section class="share-chart" data-test="view-share-chart" aria-labelledby="share-heading">'
      + '<h2 id="share-heading">观看量占主品牌比重</h2><p class="small muted">主品牌总观看量 '
      + number(result.total.views) + ' · 提及视频 ' + number(result.total.videos) + ' 条。同一视频可计入多个子视图。</p>'
      + sorted.map(row => '<div class="composition-row" data-share-id="' + text(row.id) + '"><h3>' + text(row.name) + '</h3>'
        + (applicable(row) ? '<div class="share-pair">' + shareBar('views', '观看量占比', row.viewShare, result.total.views)
          + shareBar('videos', '视频数占比', row.videoShare, result.total.videos) + '</div>'
          : '<span class="small muted">未收录所选平台</span>') + '</div>').join('') + '</section>';
  }

  function platformComposition(rows) {
    if (rows.length >= 4) return compactComposition(rows, false);
    return '<section class="platform-composition" data-test="platform-composition" aria-labelledby="composition-heading">'
      + '<div class="section-heading"><h2 id="composition-heading">平台构成</h2><span class="small muted">各视图内的视频数及占比</span></div>'
      + rows.map(row => {
        const pieces = engine.platforms.map(platform => {
          const count = row.platformCounts[platform];
          const ratio = row.videos ? count / row.videos : null;
          const included = row.platforms.includes(platform);
          const label = included ? number(count) + ' 条 · ' + percent(ratio) : '未收录';
          return { platform, count, ratio, included, label };
        });
        const track = row.videos ? '<div class="composition-track">' + pieces.filter(piece => piece.count)
          .map(piece => '<button type="button" tabindex="-1" class="platform-' + piece.platform + '" data-action="platform-segment" data-id="'
            + text(row.id) + '" data-platform="' + piece.platform + '" style="width:' + (piece.ratio * 100) + '%" title="'
            + text(row.name + ' · ' + platformNames[piece.platform] + ' · ' + piece.label) + '"></button>').join('') + '</div>' : '';
        const buttons = pieces.map(piece => '<button type="button" class="platform-key" data-action="platform-drill" data-id="'
          + text(row.id) + '" data-platform="' + piece.platform + '"' + disabled(!piece.included) + ' aria-label="'
          + text(row.name + ' · ' + platformNames[piece.platform] + ' · ' + piece.label) + '"><i aria-hidden="true" class="platform-'
          + piece.platform + '"></i>' + platformNames[piece.platform] + ' <span>' + piece.label + '</span></button>').join('');
        return '<div class="composition-row"><h3>' + text(row.name) + '<small>共 ' + number(row.videos) + ' 条</small></h3><div>'
          + track + '<div class="platform-keys">' + buttons + '</div></div></div>';
      }).join('') + '</section>';
  }

  function coverageSummary(result) {
    const total = result.total.videos;
    const rate = total ? result.covered / total : null;
    const progress = rate === null ? '' : '<div class="coverage-track" aria-hidden="true"><i style="width:' + (rate * 100) + '%"></i></div>';
    const overlapLabel = result.rows.length === 2 ? result.rows.map(row => row.name).join(' 与 ') + '共同命中' : '同时命中至少两个已配置子视图';
    return '<section class="coverage-summary" aria-label="覆盖诊断"><div class="section-heading"><h3>覆盖诊断</h3><span class="small muted">'
      + number(result.rows.length) + ' 个已配置子视图 · 去重后计数</span></div>'
      + '<div class="coverage-values"><div><span>已覆盖</span><strong data-test="covered">' + number(result.covered) + ' 条</strong><small>主品牌共 '
      + number(total) + ' 条</small></div><div><span>未覆盖</span><strong data-test="unassigned">' + number(result.unassigned) + ' 条</strong></div>'
      + '<div><span>视频覆盖率</span><strong>' + percent(rate) + '</strong></div></div>' + progress
      + '<div class="coverage-links">' + button('查看已覆盖视频', 'open-records', { style: 'link', data: { id: 'covered' } })
      + button('查看未覆盖视频', 'open-records', { style: 'link', data: { id: 'uncovered' } }) + '</div>'
      + (result.rows.length >= 2 ? '<div class="overlap-inspect"><span>' + text(overlapLabel) + ' <strong data-test="overlap">'
        + number(result.overlap) + ' 条</strong></span>' + button('查看共同视频', 'open-records', { style: 'link', data: { id: 'overlap' } }) + '</div>' : '') + '</section>';
  }

  function comparisonRow(result, row) {
    const isPool = row.id === 'pool';
    const id = text(row.id);
    const applicable = scope.platform === 'all' || row.platforms.includes(scope.platform);
    const identity = isPool ? '主品牌基准' : '<div class="row-title"><span class="row-mark" style="color:' + trendColor(row.id) + '" aria-hidden="true">'
      + text(row.name.slice(0, 2)) + '</span><div>' + text(row.name) + viewLabels(row.labels) + '</div></div>';
    const videos = '<span class="number" ' + (isPool ? 'data-test="pool-videos"' : 'data-value="videos"') + '>' + number(row.videos) + '</span>'
      + (isPool ? '' : monthlyShare(row.videoShare, result.total.videos));
    const views = row.views === null ? '<span class="number">—</span>' : '<button class="btn link metric-value" type="button" data-action="top-videos" data-id="'
      + id + '" aria-label="' + text(row.name + ' · 总观看量 ' + number(row.views) + ' · 查看头部视频') + '">' + number(row.views) + '</button>';
    const sample = row.validViewCount < row.videos ? '观看量完整 ' + number(row.validViewCount) + ' / ' + number(row.videos) + ' 条'
      : (row.videos > 0 && row.videos < 5 ? '小样本 · ' : '样本 ') + number(row.videos) + ' 条';
    const metrics = '<td>' + videos + '</td><td>' + views + (isPool ? '' : monthlyShare(row.viewShare, result.total.views)) + '</td>'
      + '<td><span data-value="median" class="number">' + number(row.medianViews) + '</span><small class="metric-sub">' + sample + '</small></td>'
      + '<td><button type="button" class="btn link metric-value" data-value="creators" data-action="creator-detail" data-id="' + id
      + '" aria-label="' + text(row.name + ' · 查看参与网红名单') + '"' + disabled(row.creatorCount === null) + '>' + number(row.creatorCount) + '</button></td>'
      + '<td><span data-value="engagements" class="number" title="' + (row.engagements === null ? '互动数据缺失' : '同批内容的互动量合计') + '">' + number(row.engagements) + '</span></td>'
      + '<td><div class="actions">' + (isPool ? '' : '<a class="btn link" href="' + childLink(row.id, result.batchId, scope) + '">查看报告</a>')
      + button(isPool ? '查看明细' : '明细', 'open-records', { style: 'link', data: { id: row.id } }) + '</div></td>';
    return '<tr ' + (isPool ? 'class="baseline"' : 'data-row="' + id + '"') + '><th scope="row">' + identity + '</th>'
      + (applicable ? metrics : '<td>—</td><td>—</td><td>—</td><td>—</td><td>—</td><td class="small muted">未收录所选平台</td>') + '</tr>';
  }

  function monthlyShare(value, denominator) {
    if (value === null) {
      const reason = denominator === 0 ? '分母为零' : '数据不可用';
      return '<small class="metric-sub" title="' + reason + '">占比 —</small>';
    }
    return '<small class="metric-sub">占主品牌 ' + percent(value) + '</small>';
  }

  function standardTrend(records) {
    const buckets = engine.publicationBuckets(rollingStartDate(state.publication.dateEnd), state.publication.dateEnd, 'day');
    const series = [{ id: 'standard', name: state.brand.name, points: engine.countByPublicationDate(records, buckets) }];
    return '<section class="trend-section"><h2>推广活动趋势</h2><p class="small muted">发布内容数 · 主品牌标准报告示意</p>'
      + renderTrendPlot(buckets, series) + '</section>';
  }

  function trendColor(id) {
    if (id === 'pool') return 'var(--muted)';
    if (id === 'standard') return 'var(--accent-dark)';
    const colors = ['#a84200', '#245dc4', '#14785c', '#7746a6', '#af3659'];
    return colors[state.comparisonViewIds.indexOf(id)] ?? 'var(--blue)';
  }

  function bucketLabel(bucket) {
    return bucket.dateStart === bucket.dateEnd ? bucket.dateStart : bucket.dateStart + ' 至 ' + bucket.dateEnd;
  }

  function renderTrendComparison(trend) {
    const visible = trend.series.filter(series => !hiddenRows.has(series.id));
    const selectedIndex = Number.isInteger(trendBucket) && trend.buckets[trendBucket] ? trendBucket : trend.buckets.length - 1;
    return '<div class="section-heading"><div><h3>发布内容数</h3><p class="small muted" data-test="trend-scope">'
      + text(trend.dateStart + ' 至 ' + trend.dateEnd + ' · ' + platformNames[scope.platform] + ' · 截至 ' + trend.cutoff + ' · ' + trend.batchId)
      + '</p></div><label class="small">粒度 <select data-setting="trend-granularity" aria-label="趋势粒度">'
      + optionList({ day: '按日', week: '按周' }, trendGranularity) + '</select></label></div>'
      + '<div class="trend-legend">' + visible.map(series => '<span><i aria-hidden="true" style="--series-color:' + trendColor(series.id)
        + '" class="' + (series.id === 'pool' ? 'reference' : '') + '"></i>' + text(series.name) + '</span>').join('') + '</div>'
      + renderTrendPlot(trend.buckets, visible, trend.batchId, selectedIndex)
      + '<div class="trend-readout"><label class="small">查看日期 <select data-setting="trend-bucket" aria-label="趋势日期">'
      + trend.buckets.map((bucket, index) => '<option value="' + index + '"' + selected(index === selectedIndex) + '>'
        + text(bucketLabel(bucket)) + '</option>').join('') + '</select></label>'
      + '<div class="trend-values">' + visible.map(series => {
        const count = series.points[selectedIndex];
        return '<div><span>' + text(series.name) + '</span>'
          + (count === null ? '<span class="small muted">未收录所选平台</span>'
            : '<button type="button" class="btn link" data-action="trend-point" data-id="' + text(series.id) + '" data-bucket="' + selectedIndex
              + '" data-batch="' + text(trend.batchId) + '" data-count="' + count + '" aria-label="' + text(series.name + ' · ' + count + ' 条 · 查看内容库') + '">'
              + number(count) + ' 条</button>') + '</div>';
      }).join('') + '</div></div>';
  }

  function renderTrendPlot(buckets, series, batchId, selectedIndex) {
    const left = 40;
    const right = 638;
    const top = 14;
    const bottom = 142;
    const peak = Math.max(1, ...series.flatMap(item => item.points));
    const step = Math.ceil(peak / 3);
    const x = index => buckets.length === 1 ? (left + right) / 2 : left + index * (right - left) / (buckets.length - 1);
    const y = value => bottom - value * (bottom - top) / (step * 3);
    const guides = [0, step, step * 2, step * 3].map(value => '<line x1="' + left + '" x2="' + right + '" y1="' + y(value) + '" y2="' + y(value) + '" />'
      + '<text x="' + (left - 9) + '" y="' + (y(value) + 4) + '" text-anchor="end">' + value + '</text>').join('');
    const dateMarker = selectedIndex === undefined ? '' : '<line class="trend-date-marker" x1="' + x(selectedIndex)
      + '" x2="' + x(selectedIndex) + '" y1="' + top + '" y2="' + bottom + '" />';
    const labels = [...new Set([0, Math.floor((buckets.length - 1) / 2), buckets.length - 1])].map((index, position, indices) =>
      '<text x="' + x(index) + '" y="164" text-anchor="' + (position === 0 ? 'start' : position === indices.length - 1 ? 'end' : 'middle')
      + '">' + text(buckets[index].dateStart.slice(5)) + '</text>').join('');
    const curves = series.map(item => {
      if (item.points.some(value => value === null)) return '';
      const color = trendColor(item.id);
      const points = item.points.map((value, index) => x(index) + ',' + y(value)).join(' ');
      const dots = item.points.map((value, index) => '<circle cx="' + x(index) + '" cy="' + y(value) + '" r="' + (batchId ? 3.5 : 2.4) + '"'
        + (batchId ? ' class="trend-point' + (series.length >= 5 && buckets.length > 10 && index !== selectedIndex ? ' quiet-point' : '') + '" data-action="trend-point" data-id="' + text(item.id) + '" data-bucket="' + index + '" data-batch="' + text(batchId) + '"' : '')
        + '><title>' + text(item.name + ' · ' + bucketLabel(buckets[index]) + ' · ' + value + ' 条') + '</title></circle>').join('');
      return '<g style="--series-color:' + color + '"><polyline points="' + points + '"'
        + (item.id === 'pool' ? ' stroke-dasharray="5 4"' : '') + ' />' + dots + '</g>';
    }).join('');
    return '<div class="trend-plot"><svg viewBox="0 0 656 177" role="img" aria-label="发布内容数趋势图">'
      + '<g class="trend-grid">' + guides + labels + dateMarker + '</g>' + curves + '</svg></div>';
  }

  function childOverview(records, filters, child) {
    return '<div class="section-heading"><div class="heading-copy"><h2>品牌表现概览</h2><p class="small muted">本页指标与明细读取 ' + text(child.batchId) + '</p></div>'
      + button('查看内容明细', 'open-records', { data: { id: child.id, own: 'true' } }) + '</div>'
      + (records.length ? '' : '<div class="empty" data-test="zero-child">本期查询已成功，当前范围命中 0 条内容。</div>');
  }

  function distribution(records) {
    const items = engine.platforms.map(platform => ({ platform, count: records.filter(record => record.platform === platform).length }));
    const max = Math.max(...items.map(item => item.count), 1);
    return '<div class="card pad"><div class="heading-copy"><h3>平台内容分布</h3><p class="small muted">当前报告范围内的提及视频数</p></div>'
      + '<div class="chart">' + items.map(item => '<div class="chart-item"><strong class="number">' + item.count + '</strong><div class="chart-bar" aria-hidden="true" style="height:'
        + Math.round(item.count / max * 84) + 'px"></div><span>' + platformNames[item.platform] + '</span></div>').join('') + '</div></div>';
  }

  function reportSection(records, child, panelTab, publishers) {
    if (panelTab === 'assets') return assetsSection(records, publishers, child);
    if (panelTab === 'strategy') {
      const languageLabels = { zh: '中文', en: '英语', ja: '日语', ko: '韩语', de: '德语', fr: '法语', es: '西班牙语', unknown: '未识别' };
      const languages = new Map();
      for (const record of records) {
        const key = record.lang || 'unknown';
        languages.set(key, (languages.get(key) ?? 0) + 1);
      }
      const languageRows = [...languages].sort((a, b) => b[1] - a[1]).map(([key, count]) =>
        '<li>' + text(languageLabels[key] ?? key) + ' <strong>' + number(count) + '</strong></li>').join('');
      return '<div class="heading-copy"><h2>营销策略解构</h2><p class="small muted">按当前报告的内容范围查看发布分布。</p></div><div class="split">'
        + distribution(records) + '<div class="card pad"><h3>内容语言</h3><ul class="module-list">' + (languageRows || '<li>当前范围无内容</li>') + '</ul></div></div><p class="callout small">网红画像、受众重合与商品策略依赖生产数据。</p>';
    }
    const end = child?.dateEnd ?? state.publication.dateEnd;
    const recent = engine.filterRecords(records, { days: 3, platform: 'all' }, end);
    const distinctDates = new Set(records.map(record => record.date)).size;
    return '<div class="heading-copy"><h2>市场动态监控</h2><p class="small muted">以当前报告的数据截至时间解释近期表现。</p></div><div class="kpis">'
      + kpi('最近 3 天新增内容', recent.length, '条', 'dynamics-3')
      + kpi('当前范围新增内容', records.length, '条', 'dynamics-scope')
      + kpi('有发布的日期', distinctDates, '天', 'dynamics-days')
      + '</div><p class="callout small">新合作达人和长历史异动为待核验的标准模块。</p>';
  }

  function assetsSection(records, publishers, child) {
    const groups = { videos: '内容库', channels: '网红库', tags: '标签库', products: '商品库' };
    const groupControls = Object.entries(groups).map(([id, label]) => button(label, 'asset', { style: activeAsset === id ? 'compact primary' : 'compact', data: { id } })).join('');
    const scoped = hasMonitorAccess() && ['videos', 'channels'].includes(activeAsset);
    let body;
    if (scoped) {
      const period = child || { dateStart: rollingStartDate(state.publication.dateEnd), dateEnd: state.publication.dateEnd,
        cutoff: state.publication.cutoff, batchId: state.publication.id };
      const context = (child?.name || state.brand.name) + ' · ' + period.dateStart + ' 至 ' + period.dateEnd
        + ' · 同批快照 ' + period.batchId + ' · 截至 ' + period.cutoff;
      body = '<p class="small muted" data-test="inline-asset-scope">' + text(context) + '</p><div data-inline-library="'
        + (activeAsset === 'videos' ? 'content' : 'influencer') + '"></div>';
    } else if (activeAsset === 'products') body = '<p class="callout small">商品关系需按当前内容范围验证，当前示例未提供商品数据。</p>';
    else if (activeAsset === 'videos') body = assetTable(records);
    else {
      const values = new Map();
      if (activeAsset === 'channels') {
        for (const account of publishers.creators.filter(account => account.profileMatched === true)) {
          values.set(account.platform + ':' + account.id, { name: platformNames[account.platform] + ' · ' + account.name,
            detail: account.id, count: account.videoCount });
        }
      } else {
        for (const item of records) {
          for (const tag of new Set(item.tags)) {
            const entry = values.get(tag) ?? { name: tag, count: 0 };
            entry.count += 1;
            values.set(tag, entry);
          }
        }
      }
      body = values.size ? '<ul class="module-list">' + [...values.values()].sort((a, b) => b.count - a.count).map(entry =>
        '<li><div>' + text(entry.name) + (entry.detail ? '<div class="small muted">' + text(entry.detail) + '</div>' : '')
        + '</div><strong>' + number(entry.count) + ' 条</strong></li>').join('') + '</ul>' : '<p class="empty">当前范围没有匹配内容。</p>';
    }
    const libraryActions = hasMonitorAccess() ? '<div class="actions" aria-label="同批资产库">'
      + libraryLink('content', 'report') + libraryLink('influencer', 'report') + '</div>' : '';
    return '<div class="section-heading"><h2>营销资产库</h2>' + libraryActions + '</div><div class="actions">' + groupControls + '</div>' + body;
  }

  function sortedRecords(records) {
    return [...records].sort((a, b) => b.date.localeCompare(a.date) || b.id.localeCompare(a.id));
  }

  function assetTable(records) {
    if (!records.length) return '<div class="empty" data-test="detail-count">当前范围命中 0 条内容。</div>';
    const maxPages = Math.max(1, Math.ceil(records.length / 8));
    const page = Math.min(assetPage, maxPages);
    const rows = sortedRecords(records).slice((page - 1) * 8, page * 8);
    return '<div class="table-wrap" tabindex="0" aria-label="内容明细表横向滚动"><table class="asset-table" aria-label="内容明细"><thead><tr>'
      + '<th scope="col">内容</th><th scope="col">平台</th><th scope="col">发布时间</th><th scope="col">观看量</th>'
      + '</tr></thead><tbody>'
      + rows.map(row => '<tr><th scope="row">' + text(row.title) + '<div class="small muted">' + text(row.channel) + ' · #' + text(row.id) + '</div>'
        + (scenario === 'anker' && row.matchedConditions?.length ? '<div class="small muted anker-reasons">' + reasonLines(row.matchedConditions) + '</div>' : '') + '</th>'
        + '<td>' + platformNames[row.platform] + '</td><td>' + text(row.date) + '</td><td class="number">' + number(row.views) + '</td></tr>').join('')
      + '</tbody></table></div>' + paginationFooter(records.length, '条', page, maxPages);
  }

  function comparisonFilters(prefix) {
    const periods = engine.completeComparisonMonths(state).map(month => '<option value="' + text(month) + '"' + selected(scope.month === month)
      + '>' + month.slice(0, 4) + ' 年 ' + Number(month.slice(5)) + ' 月</option>').join('');
    return '<label>期间<select data-setting="days" aria-label="' + prefix + '日期">'
      + periods + optionList({ 30: '最近 30 天', 7: '最近 7 天' }, String(scope.days)) + '</select></label>'
      + '<label>平台<select data-setting="platform" aria-label="' + prefix + '平台">' + optionList(platformNames, scope.platform) + '</select></label>';
  }

  function comparisonSettings() {
    const selected = engine.comparisonCandidates(state).filter(view => state.comparisonViewIds.includes(view.id));
    return '<section class="card pad comparison-settings" aria-labelledby="comparison-settings-title">'
      + '<h3 id="comparison-settings-title">对比显示</h3>'
      + '<div class="filters">' + comparisonFilters('对比')
      + (canEdit() ? button('统一刷新', 'refresh', { disabled: Boolean(state.task) }) : '') + '</div>'
      + (selected.length ? '<div class="filters choice-row" role="group" aria-label="显示分项"><span class="small muted">本次显示</span>'
        + selected.map(view => '<label><input type="checkbox" data-setting="row" value="' + text(view.id) + '"'
          + checked(!hiddenRows.has(view.id)) + '>' + text(view.name) + '</label>').join('') + '</div>'
        : '<p class="small muted">尚未选择对比视图。</p>')
      + '</section>';
  }

  function bulkRepairActions() {
    if (!canEdit()) return '';
    if (bulkRepairResult) {
      const updated = bulkRepairResult.updated.length;
      const remaining = bulkRepairResult.remaining.length;
      return '<div class="bulk-impact" data-test="bulk-impact-result" role="status" tabindex="-1">'
        + '已处理 ' + updated + ' 个子视图' + (remaining ? '，' + remaining + ' 个需手动处理。' : '。') + '</div>';
    }
    const affected = state.views.filter(view => view.active && view.rule && view.configIssues?.length);
    if (!affected.length) return '';
    return '<div class="bulk-impact"><div><strong>' + affected.length + ' 个子视图受主配置变动影响</strong>'
      + '<p class="small muted">采用主品牌最新配置，移除失效项。需要补充条件的视图保留原结果。</p></div>'
      + button('一键处理全部', 'repair-all-config', { disabled: Boolean(state.task) }) + '</div>';
  }

  function comparisonSelectionBar() {
    return '<div class="comparison-selection-bar">'
      + '<div><strong data-test="comparison-selection-count" tabindex="-1" aria-live="polite"></strong>'
      + '<p class="small muted" data-test="comparison-selection-hint"></p></div>'
      + (canEdit() ? '<div class="actions">' + button('取消更改', 'reset-comparison-views', { style: 'compact' })
        + button('保存对比选择', 'save-comparison-views', { style: 'primary compact' }) + '</div>' : '') + '</div>';
  }

  function syncComparisonSelection() {
    const eligible = new Set(engine.comparisonCandidates(state).map(view => view.id));
    const saved = new Set(state.comparisonViewIds);
    if (comparisonDraft) {
      for (const id of comparisonDraft) if (!eligible.has(id)) comparisonDraft.delete(id);
      if (comparisonDraft.size === saved.size && [...comparisonDraft].every(id => saved.has(id))) comparisonDraft = null;
    }
    const chosen = comparisonDraft ?? saved;
    const limit = engine.maxComparisonViews;
    for (const input of manager.querySelectorAll('[name="comparisonView"]')) {
      input.checked = chosen.has(input.value);
      input.disabled = !canEdit() || !eligible.has(input.value) || (!input.checked && chosen.size >= limit);
    }
    const count = manager.querySelector('[data-test="comparison-selection-count"]');
    if (!count) return;
    count.textContent = '已选 ' + chosen.size + ' / ' + limit;
    manager.querySelector('[data-test="comparison-selection-hint"]').textContent = chosen.size > limit
      ? '请将成员减至 ' + limit + ' 个以内再保存。'
      : chosen.size === limit && canEdit() ? '已达上限，取消一项即可更换。' : '主品牌基准单独展示。';
    if (canEdit()) {
      manager.querySelector('[data-action="save-comparison-views"]').disabled = !comparisonDraft || chosen.size > limit;
      manager.querySelector('[data-action="reset-comparison-views"]').disabled = !comparisonDraft;
    }
  }

  function renderManager() {
    const scrollTop = manager.scrollTop;
    const diagnostics = state.comparisonViewIds.length ? engine.compare(state, scope) : null;
    manager.innerHTML = '<header class="dialog-head"><div><h2 id="manager-title" tabindex="-1">子视图管理</h2><p class="small muted">'
      + text(state.brand.name) + '</p></div>' + button('关闭', 'close-manager', { style: 'compact' }) + '</header>'
      + '<div class="dialog-body">' + taskBanner() + bulkRepairActions()
      + '<section class="manager-view-list" aria-labelledby="view-list-title"><div class="section-heading"><h3 id="view-list-title">子视图列表</h3>'
      + (canEdit() ? button('创建子视图', 'open-editor', { style: 'primary', disabled: Boolean(state.task) }) : '') + '</div>'
      + (!state.views.length ? '<div class="empty"><strong>还没有子视图</strong><p>可从主品牌池创建子视图。</p></div>'
        : '<ul class="view-list" aria-label="子视图列表">' + state.views.map(manageRow).join('') + '</ul>' + comparisonSelectionBar())
      + '</section><p id="manager-status" class="small muted" role="status" hidden></p>'
      + comparisonSettings() + (diagnostics?.ok ? coverageSummary(diagnostics) : '')
      + (!canEdit() ? '<p class="callout small">当前身份可查看已发布报告。</p>' : '') + '</div>';
    syncComparisonSelection();
    manager.scrollTop = scrollTop;
  }

  function openManager() {
    if (getRoute().page !== 'report' || !hasMonitorAccess() || manager.open) return;
    comparisonDraft = null;
    renderManager();
    manager.showModal();
    manager.querySelector('#manager-title').focus({ preventScroll: true });
  }

  function openManagerShortcut() {
    if (isAnkerRoute()) {
      if (location.hash === '#anker-impact') engine.seedImpactExample(state);
      if (location.hash === '#anker-bulk') {
        const previousCount = state.views.length;
        engine.seedBulkImpactExample(state);
        if (state.views.length !== previousCount) bulkRepairResult = null;
      }
      openManager();
      if (location.hash === '#anker-query' && manager.open && canEdit()) {
        openEditor(undefined, {
          name: 'Anker SOLIX 户外与收纳', groupMatch: 'any', parentConfigIds: ['tag-solix'],
          include: [{ type: 'text', value: 'C1000' }],
          require: [{ type: 'text', value: '户外', groupId: '1' }, { type: 'text', value: '收纳', groupId: '1' }]
        });
      }
      return true;
    }
    if (location.hash === '#compare-select') {
      if (scenario !== 'many') selectScenario('many');
      history.replaceState(null, '', '#comparison');
      openManager();
      return true;
    }
    if (location.hash !== '#manage') return false;
    history.replaceState(null, '', '#report');
    openManager();
    return true;
  }

  function issueDescription(issue) {
    const subject = [platformNames[issue.platform], configLabel(issue)].filter(Boolean).join(' ');
    return '条件组 ' + issue.groupNumber + ' · ' + subject + (issue.kind === 'removed' ? ' 已从主品牌配置移除' : ' 的匹配值已变更');
  }

  function impactSummary(view, surface) {
    if (!view?.active || !view.rule) return '';
    const issues = view.configIssues ?? [];
    const target = surface === 'report' ? 'report-impact' : 'view-impact';
    if (!issues.length) {
      if (!((state.task?.kind === 'refresh' && view.rule) || (surface === 'report' && view.status === 'updating'))) return '';
      return '<div class="impact-line small" data-test="' + target + '">' + tag('更新中', 'pending')
        + '正在生成新结果，当前仍可查看已发布快照。</div>';
    }
    const first = issues[0];
    const remaining = bulkRepairResult?.remaining.find(item => item.id === view.id);
    return '<div class="impact-line small" data-test="' + target + '">' + tag('需处理', 'brand')
      + '<span>' + text(issueDescription(first)) + (issues.length > 1 ? ' 等 ' + issues.length + ' 项' : '') + '。</span>'
      + (remaining && surface === 'manager' ? '<span>' + text(remaining.reason) + '</span>' : '')
      + (canEdit() ? button('处理条件', 'repair-config', { style: 'link', data: { id: view.id }, disabled: Boolean(state.task) })
        : issues.length > 1 ? '<details><summary>查看变动</summary><ul>' + issues.map(issue =>
          '<li>' + text(issueDescription(issue)) + '</li>').join('') + '</ul></details>' : '')
      + (surface === 'report' ? '<span class="muted">当前显示已发布快照。</span>' : '') + '</div>';
  }

  function manageRow(view) {
    const available = view.active && !view.activationPending ? state.publication.children[view.id] : null;
    const rule = available?.rule ?? view.rule ?? view.pendingRule;
    const platforms = (rule?.platforms ?? []).map(key => platformNames[key]).join(' / ');
    const affected = Boolean(view.active && view.configIssues?.length);
    const pending = view.pendingRule ? '<div class="small muted">待发布规则 v' + view.pendingRule.version + '</div>' : '';
    return '<li class="card view-item" data-row="' + text(view.id) + '"><div class="view-item-head"><div class="actions">'
      + '<strong>' + (available ? '<a href="' + childLink(view.id) + '">' + text(available.name) + '</a>' : text(view.name)) + '</strong>'
      + viewLabels(rule?.labels)
      + (affected && view.status === 'available' ? '' : statusTag(view.status, Boolean(available))) + '</div>'
      + '<label class="member-choice"><input type="checkbox" name="comparisonView" value="' + text(view.id)
      + '" aria-label="参与对比 · ' + text(view.name) + '">参与对比</label></div><div class="small muted">' + (text(platforms) || '—') + '</div>' + pending
      + impactSummary(view, 'manager')
      + '<div class="section-heading"><span class="small muted">'
      + (available ? text(state.publication.cutoff) + ' · ' + text(state.publication.id) + (scenario === 'anker' ? ' · 主池 ' + text(state.publication.poolBatchId) : '') + ' · 规则 v' + available.version : '暂无可用快照')
      + '</span><div class="actions">'
      + (canEdit() ? (affected ? ''
        : button('编辑', 'open-editor', { style: 'link', disabled: !view.active || Boolean(state.task), data: { id: view.id } }))
        + (view.status === 'failed' && view.active ? button('重试', 'retry', { style: 'link', disabled: Boolean(state.task), data: { id: view.id } }) : '')
        + button(view.active ? '停用' : '启用', 'confirm-active', { style: 'link', disabled: !view.active && Boolean(state.task), data: { id: view.id, active: String(!view.active) } }) : '只读')
      + '</div></div></li>';
  }

  function reviewPage(route) {
    const exportAction = button('导出评审意见', 'export', { style: 'primary', disabled: !Object.keys(feedback).length });
    if (route.page === 'review') {
      return '<header class="section-heading"><div class="page-intro"><span class="overline">v7.5.4 独立 Demo</span><h1>评审清单</h1><p class="note">逐项操作核对，记录本轮观察与期望。</p></div>'
        + '<div class="actions"><a class="btn" href="#full-comparison">满载月报</a><a class="btn" href="./chart-gallery.html">对比图表样稿</a>' + exportAction + '</div></header><section class="review-grid">' + points.map(point => '<a class="card pad review-card" href="#point=' + point.id + '">'
          + '<div class="actions">' + tag(point.id) + (feedback[point.id] ? tag('已记录', 'good') : '') + '</div><h2>'
          + point.title + '</h2><p>' + point.expected + '</p><span class="small muted">打开评审点 →</span></a>').join('') + '</section>';
    }
    const point = points.find(item => item.id === route.id);
    const note = feedback[point.id] ?? { status: 'pending', comment: '' };
    return '<header class="section-heading"><div class="page-intro"><a href="#review">← 评审清单</a><h1>' + point.id + ' ' + point.title + '</h1></div>'
      + '<div class="actions"><a href="#' + point.route + '" class="btn">进入演示</a>' + exportAction + '</div></header>'
      + '<section class="card pad review-item"><h2>操作步骤</h2><ol>' + point.steps.map(step => '<li>' + step + '</li>').join('')
      + '</ol><p class="callout"><strong>预期</strong>　' + point.expected + '</p></section>'
      + '<section class="card pad review-form"><h2>本次评审意见</h2><label>结论 <select aria-label="评审结论" data-review="status" data-id="' + point.id + '">'
      + optionList({ pending: '待讨论', agreed: '本轮认可', change: '需要修改' }, note.status) + '</select></label>'
      + '<label for="review-comment">观察和期望</label><textarea id="review-comment" data-review="comment" data-id="' + point.id + '" placeholder="记录操作、观察结果和期望">' + text(note.comment)
      + '</textarea><p class="small muted">意见随会话保留。导出后可作为文档回流的依据。</p></section>';
  }

  function openDialog(markup) {
    if (!dialog.open) previousFocus = document.activeElement;
    dialog.innerHTML = markup;
    if (!dialog.open) dialog.showModal();
  }

  function closeDialog() {
    if (dialog.open) dialog.close();
  }

  manager.addEventListener('close', () => {
    if (manager.open) return;
    comparisonDraft = null;
    if (dialog.open) return;
    app.querySelector('[data-action="open-manager"]')?.focus({ preventScroll: true });
  });

  dialog.addEventListener('close', () => {
    if (dialog.open) return;
    editor = null;
    preview = null;
    if (previousFocus?.isConnected) previousFocus.focus({ preventScroll: true });
    else if (manager.open) manager.querySelector('#manager-title')?.focus({ preventScroll: true });
  });

  function modalHead(title, note = '') {
    return '<header class="dialog-head"><div><h2 id="dialog-title">' + text(title) + '</h2>'
      + (note ? '<p class="small muted">' + text(note) + '</p>' : '') + '</div>' + button('关闭', 'close', { style: 'compact' }) + '</header>';
  }

  function saveComparisonSelection() {
    if (!canEdit() || !manager.open || !comparisonDraft) return;
    const prior = new Set(state.comparisonViewIds);
    const result = engine.setComparisonViews(state, [...comparisonDraft]);
    if (!result.ok) { notify(result.error); return; }
    for (const id of comparisonDraft) if (!prior.has(id)) hiddenRows.delete(id);
    comparisonDraft = null;
    render();
    renderManager();
    manager.querySelector('[data-test="comparison-selection-count"]').focus({ preventScroll: true });
    notify('对比配置已保存');
  }

  function openEditor(id, preset) {
    if (!canEdit()) return;
    const view = state.views.find(item => item.id === id && item.active);
    if (id && !view) return;
    const existing = view?.pendingRule ?? view?.rule;
    editor = existing ? JSON.parse(JSON.stringify(existing))
      : { name: '', labels: [], platforms: [...engine.platforms], include: [{ type: 'tag', value: '', platform: 'all' }], exclude: [] };
    if (scenario === 'anker' && !existing) Object.assign(editor, { parentConfigIds: [], include: [], require: [] }, preset);
    if (scenario === 'anker') editor = engine.upgradeConditionGroups(editor);
    preview = null;
    renderEditor();
  }

  function readEditor() {
    const form = dialog.querySelector('#query-form');
    if (!form) return;
    editor.name = form.elements.name.value;
    editor.labels = form.elements.viewLabels.value.split(/[,，、]/);
    editor.platforms = [...form.querySelectorAll('[name="platform"]:checked')].map(input => input.value);
    const readRow = row => {
      const type = row.querySelector('[data-part="type"]').value;
      const value = row.querySelector('[data-part="value"]').value;
      const platform = row.querySelector('[data-part="platform"]').value;
      const condition = { type, value, ...(platform === 'all' ? {} : { platform }) };
      if (row.hasAttribute('data-starter') && type === 'text' && !value && platform === 'all') condition.starter = true;
      return condition;
    };
    for (const role of ['include', 'exclude']) {
      editor[role] = [...form.querySelectorAll('[data-rule="' + role + '"]')].map(readRow);
    }
    if (scenario === 'anker') {
      editor.require = [...form.querySelectorAll('fieldset[data-group-id]')].flatMap(block => {
        const groupId = block.dataset.groupId;
        const selected = editor.require.filter(row => row.groupId === groupId && row.configId);
        const manual = [...block.querySelectorAll('[data-rule="require"]')].map(row => ({ ...readRow(row), groupId }));
        return [...selected, ...manual];
      });
    }
  }

  function selectedConfigIds(groupId) {
    return groupId
      ? editor.require.filter(row => row.groupId === groupId && row.configId).map(row => row.configId)
      : editor.parentConfigIds ?? [];
  }

  function selectionSummary(groupId) {
    const ids = new Set(selectedConfigIds(groupId));
    const issues = engine.configIssues(state, editor).filter(issue => issue.groupId === groupId);
    const items = state.parentConfig.filter(item => ids.has(item.id) && !issues.some(issue => issue.configId === item.id));
    const descriptions = { tag: '内容标签是', account: '发布账号是', link: '内容外链匹配' };
    const rows = items.slice(0, 3).map(item => '<li><span class="small muted">'
      + text([platformNames[item.platform], descriptions[item.type]].filter(Boolean).join(' · '))
      + '</span> <strong>' + text(configLabel(item)) + '</strong></li>');
    return '<div class="selection-bar"><button type="button" class="btn compact" data-action="open-picker" aria-haspopup="dialog" aria-controls="config-picker">'
      + (ids.size ? '调整主配置' : '选择主配置') + '</button>'
      + (ids.size ? '<span class="small muted">已选 ' + ids.size + ' 项</span>' : '') + '</div>'
      + issues.map(configIssueRow).join('')
      + (rows.length ? '<ul class="config-conditions">' + rows.join('') + '</ul>' : '')
      + (items.length > 3 ? '<span class="small muted">另 ' + (items.length - 3) + ' 项，可在主配置中查看</span>' : '');
  }

  function configIssueRow(issue) {
    const changed = issue.kind === 'changed';
    const data = { id: issue.configId };
    const current = changed && state.parentConfig.find(item => item.id === issue.configId);
    return '<div class="config-issue" data-test="config-issue" tabindex="-1">'
      + '<strong>' + text(issueDescription(issue)) + '</strong>'
      + (current ? '<span>当前配置：' + text(configLabel(current)) + '</span>' : '')
      + '<div class="actions">' + (changed ? button('采用当前配置', 'accept-changed', { style: 'link', data }) : '')
      + button('移除失效项', 'remove-invalid', { style: 'link', data }) + '</div></div>';
  }

  function resolveConfigIssue(control) {
    if (!canEdit() || !editor) return;
    readEditor();
    const groupId = control.closest('fieldset').dataset.groupId;
    const configId = control.dataset.id;
    const issue = engine.configIssues(state, editor).find(item => item.groupId === groupId && item.configId === configId);
    if (!issue) return;
    const adopt = control.dataset.action === 'accept-changed';
    const current = state.parentConfig.find(item => item.id === configId);
    if (adopt && (!current || issue.kind !== 'changed')) return;
    if (groupId) {
      const index = editor.require.findIndex(row => row.groupId === groupId && row.configId === configId);
      if (index < 0) return;
      if (adopt) editor.require[index] = { ...current, configId, groupId };
      else if (editor.require.filter(row => row.groupId === groupId).length === 1) {
        editor.require[index] = { type: 'text', value: '', groupId, starter: true };
      } else editor.require.splice(index, 1);
    } else {
      editor.parentConditions = (editor.parentConditions ?? []).filter(row => row.configId !== configId);
      if (adopt) editor.parentConditions.push({ ...current, configId });
      else editor.parentConfigIds = editor.parentConfigIds.filter(id => id !== configId);
    }
    preview = null;
    renderEditor();
    const block = groupId ? dialog.querySelector('[data-group-id="' + CSS.escape(groupId) + '"]')
      : dialog.querySelector('fieldset[data-match="any"]');
    block?.querySelector('[data-action="open-picker"]')?.focus();
  }

  const searchKey = value => String(value).normalize('NFKC').toLowerCase().replace(/[\s_-]+/g, '');

  function openPicker(control) {
    readEditor();
    const block = control.closest('fieldset');
    const groupId = block.dataset.groupId;
    const blocks = [...dialog.querySelectorAll('fieldset[data-match="any"]')];
    picker.querySelector('#picker-title').textContent = '条件组 ' + (blocks.indexOf(block) + 1) + ' · 选择主配置';
    const counts = new Map();
    for (const item of state.parentConfig) counts.set(item.group, (counts.get(item.group) || 0) + 1);
    picking = { groupId, ids: new Set(selectedConfigIds(groupId)), page: 1, selectedOnly: false };
    picker.querySelector('input[type="search"]').value = '';
    picker.querySelector('select').innerHTML = '<option value="">全部类别（' + state.parentConfig.length + '）</option>'
      + [...counts].map(([group, count]) => '<option value="' + text(group) + '">' + text(group) + '（' + count + '）</option>').join('');
    updatePicker();
    picker.showModal();
    picker.querySelector('input[type="search"]').focus();
  }

  function updatePicker(focusId) {
    const query = searchKey(picker.querySelector('input[type="search"]').value);
    const group = picker.querySelector('select').value;
    const rows = state.parentConfig.filter(item => (!group || item.group === group)
      && (!picking.selectedOnly || picking.ids.has(item.id)) && (searchKey(item.label).includes(query) || searchKey(configLabel(item)).includes(query)));
    const addResults = picker.querySelector('[data-action="picker-add-results"]');
    picking.resultIds = rows.map(item => item.id);
    addResults.hidden = !query || picking.selectedOnly || !rows.some(item => !picking.ids.has(item.id));
    addResults.textContent = '选中全部 ' + rows.length + ' 个搜索结果';
    const pages = Math.max(1, Math.ceil(rows.length / pickerPageSize));
    picking.page = Math.max(1, Math.min(picking.page, pages));
    const start = (picking.page - 1) * pickerPageSize;
    const result = picker.querySelector('#picker-results');
    const fields = { tag: '完整标签', account: '发布账号', link: '内容外链' };
    result.innerHTML = rows.slice(start, start + pickerPageSize).map(item => {
      const meta = [item.group, platformNames[item.platform], fields[item.type]].filter(Boolean).join(' · ');
      return '<label class="picker-row"><input name="parentConfig" type="checkbox" value="' + text(item.id) + '"'
        + checked(picking.ids.has(item.id)) + '><span><strong>' + text(configLabel(item)) + '</strong><small>' + text(meta) + '</small></span></label>';
    }).join('') || '<p class="picker-empty">' + (picking.selectedOnly && !picking.ids.size ? '尚未选择配置。' : '没有匹配项，请调整搜索词或类别。') + '</p>';
    picker.querySelector('#picker-count').textContent = (picking.selectedOnly ? '当前已选' : '候选配置') + ' · ' + rows.length + ' 项';
    const only = picker.querySelector('[data-action="picker-selected"]');
    only.textContent = '只看已选（' + picking.ids.size + '）';
    only.setAttribute('aria-pressed', String(picking.selectedOnly));
    picker.querySelector('#picker-page').textContent = picking.page + ' / ' + pages;
    picker.querySelector('.picker-pager').hidden = pages === 1;
    picker.querySelector('[data-action="picker-prev"]').disabled = picking.page === 1;
    picker.querySelector('[data-action="picker-next"]').disabled = picking.page === pages;
    if (focusId) {
      const boxes = [...result.querySelectorAll('input')];
      const focusTarget = boxes.find(box => box.value === focusId) ?? boxes[0] ?? only;
      focusTarget.focus({ preventScroll: true });
    } else result.scrollTop = 0;
  }

  picker.addEventListener('input', event => {
    if (event.target.type === 'search') {
      picking.page = 1;
      updatePicker();
    }
  });

  picker.addEventListener('change', event => {
    const control = event.target;
    if (control.name === 'parentConfig') {
      if (control.checked) picking.ids.add(control.value);
      else picking.ids.delete(control.value);
      updatePicker(control.value);
    } else {
      picking.page = 1;
      updatePicker();
    }
  });

  picker.addEventListener('click', event => {
    const action = event.target.closest('button')?.dataset.action;
    if (!action) return;
    if (action === 'picker-apply' || action === 'picker-cancel') {
      if (action === 'picker-apply') {
        const { groupId, ids } = picking;
        const previous = selectedConfigIds(groupId);
        if (previous.length !== ids.size || previous.some(id => !ids.has(id))) {
          if (groupId) {
            const groups = engine.groupRequiredConditions(editor.require);
            const manual = groups.get(groupId).filter(row => !row.configId && !(row.starter && ids.size));
            const previousRows = groups.get(groupId);
            groups.set(groupId, [...[...ids].map(configId => previousRows.find(row => row.configId === configId) ?? { groupId, configId }), ...manual]);
            editor.require = [...groups.values()].flat();
          } else {
            editor.parentConfigIds = [...ids];
            editor.parentConditions = (editor.parentConditions ?? []).filter(row => ids.has(row.configId));
          }
          preview = null;
          renderEditor();
        }
      }
      picker.close();
      return;
    }
    if (action === 'picker-add-results') {
      for (const id of picking.resultIds) picking.ids.add(id);
      updatePicker();
      picker.querySelector('[data-action="picker-selected"]').focus({ preventScroll: true });
      return;
    }
    if (action === 'picker-selected') {
      const search = picker.querySelector('input[type="search"]');
      const category = picker.querySelector('select');
      if (!picking.selectedOnly) {
        picking.browse = { query: search.value, group: category.value, page: picking.page };
        search.value = '';
        category.value = '';
        picking.page = 1;
      } else {
        search.value = picking.browse.query;
        category.value = picking.browse.group;
        picking.page = picking.browse.page;
      }
      picking.selectedOnly = !picking.selectedOnly;
    } else if (action === 'picker-next' || action === 'picker-prev') {
      picking.page += action === 'picker-next' ? 1 : -1;
    } else return;
    updatePicker();
    if (event.target.disabled) picker.querySelector('.picker-pager button:not(:disabled)')?.focus({ preventScroll: true });
  });

  picker.addEventListener('close', () => {
    if (!picking || picker.open) return;
    const groupId = picking.groupId;
    picking = null;
    const block = groupId ? dialog.querySelector('[data-group-id="' + CSS.escape(groupId) + '"]')
      : dialog.querySelector('fieldset[data-match="any"]');
    const focus = block?.querySelector('[data-action="open-picker"]') ?? dialog.querySelector('[data-action="add-condition-group"]');
    focus?.focus({ preventScroll: true });
  });

  function renderEditor() {
    const header = modalHead(editor.id ? '编辑子视图' : '创建子视图', scenario === 'anker'
      ? 'Anker（17220） · 模拟视频与指标 · 主池 ' + state.publication.poolBatchId : '主品牌池 · ' + state.brand.name);
    const flags = engine.platforms.map(key => '<label><input type="checkbox" name="platform" value="' + key + '"' + checked(editor.platforms.includes(key)) + '>' + platformNames[key] + '</label>').join('');
    openDialog(header + '<form id="query-form"><div class="dialog-body">'
      + '<label class="form-block">子视图名称<input class="field" name="name" maxlength="48" value="' + text(editor.name) + '" placeholder="' + (scenario === 'anker' ? '例如 SOLIX 储能' : '例如 周末露营') + '"></label>'
      + '<label class="form-block">视图标签（选填）<input class="field" name="viewLabels" maxlength="100" aria-describedby="view-label-help" value="'
      + text((editor.labels ?? []).join('，')) + '" placeholder="例如 产品线，活动"></label>'
      + '<p id="view-label-help" class="small condition-help">用逗号区分多个标签。标签用于组织视图，查询条件在下方设置。</p>'
      + '<fieldset class="form-block"><legend>收录平台</legend><div class="token-row">' + flags + '</div></fieldset>'
      + (scenario === 'anker'
        ? ankerRuleGroups()
        : ruleGroup('include', '纳入条件', '满足任一条件即可纳入。可用完整标签 trail 或 home 试跑。')
          + ruleGroup('exclude', '排除条件', '命中任一排除条件即剔除。'))
      + '<div id="preview" aria-live="polite">' + renderPreview() + '</div></div>'
      + '<footer class="dialog-footer">' + button('预览命中', 'preview') + button('取消', 'close')
      + '<button type="submit" class="btn primary"' + disabled(scenario === 'anker' && !preview?.ok) + '>'
      + (scenario === 'anker' ? '保存同批快照' : '保存并生成') + '</button></footer></form>');
  }

  function ruleRows(group, label, conditions = editor[group] ?? []) {
    const typeOptions = scenario === 'anker'
      ? { text: '内容文本', tag: '内容标签' } : { text: '文本短语', tag: '完整内容标签' };
    return conditions.map((condition, index) => {
      const legacyAccount = condition.type === 'account';
      const options = legacyAccount ? { account: '发布账号（历史）' } : typeOptions;
      return '<div class="field-row" data-rule="' + group + '"' + (condition.starter ? ' data-starter' : '') + '>'
      + '<select aria-label="' + label + '类型" data-part="type"' + disabled(legacyAccount) + '>' + optionList(options, condition.type) + '</select>'
      + (scenario === 'anker' ? '<span class="match-operator">' + (condition.type === 'text' ? '包含' : '是') + '</span>' : '')
      + '<input class="field" aria-label="' + label + '值" data-part="value" maxlength="100" value="' + text(condition.value) + '" placeholder="输入条件"' + (legacyAccount ? ' readonly' : '') + '>'
      + '<select aria-label="' + label + '适用平台" data-part="platform"' + disabled(legacyAccount) + '>' + optionList(platformNames, condition.platform ?? 'all') + '</select>'
      + button('移除', 'remove-rule', { style: 'compact', data: { group, id: index } }) + '</div>';
    }).join('');
  }

  function ankerRuleGroups() {
    const add = (group, label = '添加条件') => button(label, 'add-rule', { style: 'compact', data: { group } });
    const any = '<fieldset class="match-group" data-match="any"><legend>条件组 1 · 满足任一项</legend>'
      + '<div data-test="selection-summary">' + selectionSummary() + '</div>'
      + ruleRows('include', '任一项条件') + '<div>' + add('include') + '</div></fieldset>';
    const groups = engine.groupRequiredConditions(editor.require ?? []);
    const groupCount = 1 + groups.size;
    const limit = engine.maxInclusionGroups;
    let limitHint = '';
    if (groupCount === limit) limitHint = '已达 ' + limit + ' 个条件组上限';
    if (groupCount > limit) limitHint = '已有 ' + groupCount + ' 个条件组，请减少至 ' + limit + ' 个后再预览或保存。';
    const extraGroups = [...groups].map(([id, conditions], index) =>
      '<div class="group-conjunction">并且</div><fieldset class="match-group" data-match="any" data-group-id="' + text(id) + '">'
      + '<legend>条件组 ' + (index + 2) + ' · 满足任一项</legend>'
      + '<div data-test="selection-summary">' + selectionSummary(id) + '</div>'
      + ruleRows('require', '条件组 ' + (index + 2) + ' 条件', conditions.filter(row => !row.configId)) + '<div>' + add('require') + '</div></fieldset>').join('');
    const exclude = editor.exclude.length
      ? '<fieldset class="match-group" data-match="none"><legend>排除符合任一项的内容</legend>'
        + ruleRows('exclude', '排除条件') + '<div>' + add('exclude') + '</div></fieldset>'
      : '<div>' + add('exclude', '添加排除条件') + '</div>';
    return '<div class="anker-rule-groups">' + any + extraGroups + '<div class="rule-group-actions">'
      + button('添加条件组', 'add-condition-group', { style: 'compact', disabled: groupCount >= limit })
      + (limitHint ? '<span class="small condition-help" role="status">' + text(limitHint) + '</span>' : '')
      + '</div>' + exclude + '</div>';
  }

  function editConditionRows(control) {
    readEditor();
    const newGroup = control.dataset.action === 'add-condition-group';
    const removing = control.dataset.action === 'remove-rule';
    const group = newGroup ? 'require' : control.dataset.group;
    const conditions = editor[group] ??= [];
    const oldGroup = control.closest('fieldset');
    let groupId = oldGroup?.dataset.groupId;
    if (newGroup) {
      const usedIds = new Set(conditions.map(row => row.groupId));
      if (1 + usedIds.size >= engine.maxInclusionGroups) return;
      let id = 1;
      while (usedIds.has(String(id))) id++;
      groupId = String(id);
    }
    if (removing) {
      const manual = conditions.filter(row => !row.configId && (!groupId || row.groupId === groupId));
      const target = manual[Number(control.dataset.id)];
      conditions.splice(conditions.indexOf(target), 1);
    } else {
      const row = { type: scenario === 'anker' ? 'text' : 'tag', value: '' };
      if (groupId) row.groupId = groupId;
      if (newGroup) row.starter = true;
      conditions.push(row);
    }
    preview = null;
    renderEditor();
    if (scenario !== 'anker') return;
    const container = groupId ? dialog.querySelector('[data-group-id="' + CSS.escape(groupId) + '"]') : dialog;
    const fields = container?.querySelectorAll('[data-rule="' + group + '"] [data-part="value"]') ?? [];
    const next = removing ? fields[Number(control.dataset.id)] : fields[fields.length - 1];
    const fallback = container?.querySelector('[data-action="add-rule"][data-group="' + group + '"]');
    (next ?? fallback ?? dialog.querySelector('[data-action="add-condition-group"]')).focus();
  }

  function ruleGroup(group, label, help) {
    const rows = ruleRows(group, label);
    return '<fieldset class="form-block"><legend>' + label + '</legend><p class="small condition-help">' + help + '</p>' + rows
      + '<div>' + button('添加' + label, 'add-rule', { style: 'compact', data: { group } }) + '</div></fieldset>';
  }

  function reasonLines(evidence) {
    return window.BrandAssetLibrary.formatMatchReasons(evidence).map(text).join('<br>');
  }

  function renderPreview() {
    if (!preview) return scenario === 'anker' ? '<p class="small condition-help">预览命中后可保存同批快照。</p>' : '';
    if (!preview.ok) return '<p class="callout error" data-test="preview-error">' + text(preview.error) + '</p>';
    if (scenario === 'anker') {
      return '<section class="preview anker-preview"><strong>命中 ' + number(preview.records.length) + ' 条</strong> / 主池 '
        + number(state.publication.records.length) + ' 条模拟内容<p class="small muted">主池 ' + text(preview.poolBatchId) + ' · '
        + text(preview.dateStart + ' 至 ' + preview.dateEnd + ' · 截至 ' + preview.cutoff) + '</p><p class="small">'
        + preview.platforms.map(platform => platformNames[platform] + ' ' + preview.records.filter(row => row.platform === platform).length + ' 条').join(' · ') + '</p>'
        + (preview.records.length ? '<ul>' + preview.records.map(record => '<li><strong>' + text(record.title) + '</strong> · ' + platformNames[record.platform]
          + '<div class="small muted">' + reasonLines(record.matchedConditions) + '</div></li>').join('') + '</ul>'
          : '<p>当前范围命中 0 条。</p>') + '</section>';
    }
    return '<div class="preview"><strong>命中 ' + number(preview.records.length) + ' 条</strong>'
      + '<p class="small muted">' + text(preview.dateStart + ' 至 ' + preview.dateEnd + ' · '
        + preview.platforms.map(platform => platformNames[platform]).join(' / ') + ' · 截至 ' + preview.cutoff + ' · ' + preview.batchId) + '</p>'
      + (preview.records.length ? '<ul>' + preview.records.slice(0, 5).map(record => '<li>' + text(record.title) + ' · ' + platformNames[record.platform]
        + '<div class="small muted">命中条件 ' + text((record.matchedConditions ?? []).map(item => typeof item === 'string' ? item : item.value).join('、')) + '</div></li>').join('') + '</ul>'
        : '<p class="small muted">规则有效，当前范围没有命中内容。</p>') + '</div>';
  }

  function openCreatorDetails(id, onlyRepeat) {
    const result = engine.readCreatorDetails(state, id, scope, state.publication.id);
    if (!result.ok) return notify(result.error);
    const creators = result.creators.filter(creator => onlyRepeat ? creator.videoCount >= 2 : creator.profileMatched === true);
    openResultLibrary(result, scope.platform, 'influencer', {
      title: result.name + (onlyRepeat ? ' · 多次发布达人' : ' · 参与网红'),
      definition: onlyRepeat ? '当期发布至少两条命中作品的账号，含缺少频道资料的发布者。占比按这批账号数除以当期全部发布账号数计算。'
        : '当期发布过命中作品且已匹配频道资料的账号，每个平台账号计一次。',
      creators, exact: onlyRepeat
    });
  }

  function openEngagementDetails(id, platform) {
    const result = engine.readEngagementContents(state, id, scope, state.publication.id, platform);
    if (!result.ok) return notify(result.error);
    const definition = '互动率按' + engagementFormula(platform) + '计算' + (platform === 'instagram' ? '，仅含视频样本。' : '。')
      + (result.reason ? result.reason + '。' : '互动率 ' + engagementPercent(result.rate) + ' · 互动合计 ' + number(result.numerator) + ' · 观看合计 ' + number(result.denominator) + '。')
      + '有效样本 ' + number(result.validCount) + ' / ' + number(result.sampleCount) + ' 条，单条评论中位数 ' + number(result.medianComments) + '。作品按评论数降序排列。';
    openResultLibrary(result, platform, 'content', { title: result.name + ' · 互动明细', definition, exact: true, evidenceType: 'engagement' });
  }

  function paginationFooter(count, unit, page, pages) {
    return '<div class="summary-footer"><span data-test="detail-count">共 ' + number(count) + ' ' + unit + '</span><div class="actions">'
      + button('上一页', 'page', { style: 'compact', data: { id: page - 1 }, disabled: page <= 1 }) + '<span>' + page + ' / ' + pages + '</span>'
      + button('下一页', 'page', { style: 'compact', data: { id: page + 1 }, disabled: page >= pages }) + '</div></div>';
  }

  function newAssetKey() {
    return Array.from(crypto.getRandomValues(new Uint32Array(4)), word => word.toString(16).padStart(8, '0')).join('');
  }

  function libraryLink(kind, source, data = {}, label = '查看') {
    const key = newAssetKey();
    const attrs = Object.entries(data).map(([name, value]) => ' data-' + name + '="' + text(value) + '"').join('');
    return '<a class="btn compact" target="_blank" rel="noopener" data-asset-library="' + kind + '" data-source="' + source
      + '" data-key="' + key + '" href="?assetScope=' + key + '"' + attrs + '>在' + (kind === 'content' ? '内容库' : '网红库') + text(label) + ' ↗</a>';
  }

  function pairSource(first, second, batchId, creators) {
    if (hiddenRows.has(first) || hiddenRows.has(second)) return { ok: false, error: '该组合已从报告中隐藏。' };
    const result = creators ? engine.readCreatorOverlap(state, first, second, scope, batchId)
      : engine.readComparisonOverlap(state, first, second, scope, batchId);
    if (!result.ok) return result;
    const batch = state.publication;
    if (batch.id !== result.batchId) return { ok: false, error: '来源快照已更新，请重新选择。' };
    const firstName = batch.children[first].name, secondName = batch.children[second].name;
    return { ...result, sharedCreators: creators ? result.creators : null, firstName, secondName, sideIds: [first, second], exact: true,
      title: firstName + ' × ' + secondName + (creators ? ' · 共同达人' : ' · 共同视频'),
      definition: creators ? '分别从两个视图归集已匹配的参与网红，再按平台账号取交集。同一账号可以在两边发布不同作品。'
        : '同一平台上的同一作品须同时命中两个视图，每条作品计一次。' };
  }

  function assetSource(data) {
    if (data.source === 'pair') {
      const result = pairSource(data.first, data.second, data.batch, data.assetLibrary === 'influencer');
      if (!result.ok) throw new Error(result.error);
      return result;
    }
    if (data.source !== 'report') throw new Error('来源已失效，请从报告重新打开。');
    const route = getRoute();
    if (route.page === 'child') {
      const child = engine.readChild(state, route.id, route.filters, route.batch);
      if (!child.ok) throw new Error(child.error);
      return { ...child, title: child.name, platform: route.filters.platform, childReport: true };
    }
    const batch = state.publication;
    return { title: state.brand.name, id: 'pool', batchId: batch.id, cutoff: batch.cutoff, platform: 'all',
      dateStart: rollingStartDate(batch.dateEnd), dateEnd: batch.dateEnd };
  }

  function inlineLibraryContext(payload) {
    return JSON.stringify([assetAccessSignature, getRoute().id || 'pool', payload.dateStart, payload.dateEnd, payload.platform]);
  }

  function assetPayload(data, selectedSource) {
    if (!hasMonitorAccess()) throw new Error('当前身份无权查看这批资产。');
    const source = selectedSource || assetSource(data);
    const batch = state.publication;
    if (source.batchId !== batch.id) throw new Error('来源快照已被替换，请从当前报告重新打开。');
    const selectedScope = { platform: source.platform, dateStart: source.dateStart, dateEnd: source.dateEnd };
    const records = source.childReport ? source.records : engine.filterRecords(batch.records, selectedScope, batch.dateEnd);
    const views = engine.comparisonCandidates(state).map(({ id, name }) => ({
      id, name, keys: engine.filterRecords(batch.children[id].records, selectedScope, batch.dateEnd)
        .map(record => record.platform + ':' + record.id)
    }));
    const kind = data.assetLibrary;
    const exact = source.exact || ['covered', 'uncovered', 'overlap'].includes(source.id);
    const selectedViews = !source.childReport && !exact && source.id !== 'pool' ? [source.id] : [];
    if (selectedViews.some(id => !views.some(view => view.id === id))) throw new Error('来源子视图不可用。');
    const entry = data.source === 'report' ? 'browse' : 'drill';
    const payload = { version: 1, entry, brandName: state.brand.name, kind, batchId: batch.id, cutoff: batch.cutoff,
      ...selectedScope, mode: exact ? 'ids' : 'views', views, records, selectedViews };
    if (entry === 'drill') payload.drillContext = { title: source.title, definition: source.definition };
    if (source.evidenceType) payload.evidenceType = source.evidenceType;
    if (data.source === 'report' && inlineLibrary?.context === inlineLibraryContext(payload)) {
      const filters = inlineLibrary.readFilters();
      payload.initialFilters = inlineLibrary.kind === kind ? filters : { views: filters.views, platform: filters.platform, query: '', sort: 'source' };
    }
    if (exact) {
      const entries = kind === 'content' ? source.records : source.sharedCreators || source.creators;
      if (!Array.isArray(entries)) throw new Error('来源名单不可用。');
      payload.ids = entries.map(({ platform, id }) => ({ platform, id }));
      if (kind === 'influencer') {
        payload.accounts = entries.map(({ platform, id, name, profileMatched, videoCount, firstVideos, secondVideos }) =>
          ({ platform, id, name, profileMatched: source.sharedCreators ? true : profileMatched, videoCount, firstVideos, secondVideos }));
        if (source.sharedCreators) {
          payload.sideNames = [source.firstName, source.secondName];
          payload.sideIds = source.sideIds;
        } else payload.sourceViewId = source.id;
      } else {
        payload.records = entries;
      }
    }
    return payload;
  }

  function prepareLibraryLink(event) {
    const link = event.target.closest('a[data-asset-library]');
    if (!link) return;
    try {
      const filters = link.dataset.source === 'report' && inlineLibrary ? JSON.stringify(inlineLibrary.readFilters()) : '';
      if (openedAssetScopes.has(link.dataset.key)) {
        if (link.dataset.filterState === filters) return;
        // Leave the previously opened tab bound to its original filters.
        link.dataset.key = newAssetKey();
        link.setAttribute('href', '?assetScope=' + link.dataset.key);
      }
      window.BrandAssetStore.write(link.dataset.key, assetPayload(link.dataset));
      link.dataset.filterState = filters;
      openedAssetScopes.add(link.dataset.key);
    } catch (error) {
      event.preventDefault();
      notify(error?.message || '无法读取本次下钻范围，请从报告重新打开。');
    }
  }

  for (const name of ['click', 'auxclick', 'contextmenu', 'dragstart']) document.addEventListener(name, prepareLibraryLink);

  function openRecords(id, own) {
    const route = getRoute();
    if (own && route.page === 'child') {
      openResultLibrary(engine.readChild(state, id, route.filters, route.batch), route.filters.platform, 'content', { childReport: true });
      return;
    }
    const coverageDefinition = {
      covered: '当前主品牌池中至少命中一个已配置对比成员的作品，按平台与作品 ID 去重。',
      uncovered: '当前主品牌池中未命中任何已配置对比成员的作品。',
      overlap: '当前主品牌池中同时命中至少两个已配置对比成员的作品，每条作品计一次。'
    }[id];
    if (coverageDefinition && !manager.open) return;
    const result = engine.readComparisonContents(state, id, scope, state.publication.id);
    const detail = coverageDefinition ? { title: '覆盖诊断 · ' + result.name, definition: coverageDefinition } : {};
    openResultLibrary(result, scope.platform, 'content', detail);
  }

  function openTopVideos(id) {
    const result = engine.readTopViews(state, id, scope, state.publication.id);
    if (!result.ok) return notify(result.error);
    const count = result.records.length;
    const summary = result.sampleSize <= 5
      ? '本期共 ' + number(result.sampleSize) + ' 条视频，列出全部作品，按截至观看量排序。'
      : '本期共 ' + number(result.sampleSize) + ' 条视频，前 ' + count + ' 条合计 ' + number(result.topViews) + ' 次观看。'
        + (result.totalViews ? '占本组 ' + number(result.totalViews) + ' 次总观看的 ' + percent(result.share) + '。' : '本组总观看为 0，贡献占比无法计算。');
    openResultLibrary(result, scope.platform, 'content', { title: result.name + ' · 头部视频', definition: '在来源范围内按同批观看量降序取前五条。' + summary, exact: true });
  }

  function openTrendPoint(control) {
    const { id, batch } = control.dataset;
    const index = Number(control.dataset.bucket);
    const trend = engine.publicationTrend(state, scope, trendGranularity, batch);
    if (!trend.ok) return notify(trend.error);
    const bucket = trend.buckets[index];
    if (!bucket) return;
    trendBucket = index;
    if (control instanceof SVGElement) {
      render();
      [...app.querySelectorAll('.trend-values button')].find(button => button.dataset.id === id)?.focus({ preventScroll: true });
    }
    const result = engine.readComparisonContents(state, id, scope, batch, bucket);
    openResultLibrary(result, scope.platform, 'content', { title: result.name + ' · 发布节奏',
      definition: '按作品发布日期统计，列出所选' + (trendGranularity === 'week' ? '周' : '日') + '内发布的命中作品，每个平台作品计一次。' });
  }

  function openResultLibrary(result, platform, kind = 'content', detail = {}) {
    if (!result.ok) return notify(result.error);
    const definition = result.id === 'pool' ? '当期收录在主品牌数据池中的作品，每个平台作品计一次。'
      : '当期命中该子视图查询条件的作品，每个平台作品计一次。';
    const source = { ...result, platform, title: result.name + ' · 内容明细', definition, ...detail };
    try {
      const key = newAssetKey();
      window.BrandAssetStore.write(key, assetPayload({ assetLibrary: kind }, source));
      openedAssetScopes.add(key);
      window.open('?assetScope=' + key, '_blank', 'noopener');
    } catch (error) {
      notify(error.message || '无法打开本次下钻名单。');
    }
  }

  function activeDialog(id, next) {
    const item = state.views.find(view => view.id === id);
    if (!item || !canEdit()) return;
    const verb = next ? '启用' : '停用';
    const message = next ? '生成快照后可打开此报告，也可重新加入对比。'
      : '停用后，此报告及历史链接将无法打开。'
        + (state.comparisonViewIds.includes(id) ? '该视图也会从当前对比中移除。' : '');
    openDialog(modalHead(verb + item.name) + '<div class="dialog-body"><p>' + message + '</p></div><footer class="dialog-footer">'
      + button('取消', 'close') + button('确认' + verb, 'set-active', { style: 'primary', data: { id, active: String(next) } }) + '</footer>');
  }

  function exportFeedback() {
    const data = { release: 'v7.5.4', demo: demoVersion, exportedAt: new Date().toISOString(), feedback: Object.values(feedback) };
    const url = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2) + '\n'], { type: 'application/json' }));
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = '754-demo-review-' + demoVersion + '.json';
    anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 0);
    notify('评审意见已导出');
  }

  function finish(result, message) {
    if (result.ok) bulkRepairResult = null;
    render();
    if (manager.open) {
      renderManager();
      if (!dialog.open) manager.querySelector('#manager-title').focus({ preventScroll: true });
    }
    notify(result.ok ? message : result.error);
  }

  document.addEventListener('click', event => {
    const help = app.querySelector('.metric-help[open]');
    if (help && !help.contains(event.target)) help.open = false;
    const control = event.target.closest('button[data-action], circle[data-action]');
    if (!control || control.disabled) return;
    const { action, id, outcome, group, active, own } = control.dataset;
    switch (action) {
      case 'tab':
        if (getRoute().page === 'report' && activeTab !== id) {
          history.pushState(null, '', reportHash(id));
        }
        activeTab = id;
        assetPage = 1;
        render();
        document.getElementById('tab-' + id)?.focus({ preventScroll: true });
        break;
      case 'asset':
        activeAsset = id;
        assetPage = 1;
        render();
        app.querySelector('[data-action="asset"][data-id="' + id + '"]')?.focus();
        break;
      case 'open-manager': openManager(); break;
      case 'save-comparison-views': saveComparisonSelection(); break;
      case 'reset-comparison-views':
        comparisonDraft = null;
        syncComparisonSelection();
        manager.querySelector('[data-test="comparison-selection-count"]').focus({ preventScroll: true });
        break;
      case 'close-manager': manager.close(); break;
      case 'open-editor': openEditor(id); break;
      case 'repair-all-config': {
        if (!manager.open || !canEdit() || state.task) break;
        const result = engine.repairAllConfigIssues(state);
        if (!result.ok) { notify(result.error); break; }
        bulkRepairResult = result;
        render();
        renderManager();
        manager.querySelector('[data-test="bulk-impact-result"]').focus({ preventScroll: true });
        break;
      }
      case 'repair-config':
        if (!canEdit() || state.task) break;
        openEditor(id);
        dialog.querySelector('[data-test="config-issue"]')?.focus();
        break;
      case 'remove-invalid':
      case 'accept-changed': resolveConfigIssue(control); break;
      case 'open-picker': openPicker(control); break;
      case 'close': closeDialog(); break;
      case 'refresh': finish(engine.refresh(state), '已提交统一刷新任务'); break;
      case 'retry': finish(engine.retry(state, id), '已按待发布规则重试'); break;
      case 'settle': finish(engine.settle(state, outcome, state.task?.id), '新快照已发布'); break;
      case 'select-pair':
      case 'pair-dimension': {
        pairExpanded = true;
        const { first, second, dimension } = control.dataset;
        if (action === 'pair-dimension') pairDimension = dimension;
        else pairSelection = { first, second };
        render();
        const target = Array.from(app.querySelectorAll('[data-action="' + action + '"]')).find(element =>
          action === 'pair-dimension' ? element.dataset.dimension === dimension
            : element.dataset.first === first && element.dataset.second === second);
        target?.focus({ preventScroll: true });
        if (action === 'select-pair' && window.matchMedia('(max-width: 710px)').matches) {
          app.querySelector('[data-test="pair-details"]')?.scrollIntoView({ block: 'nearest' });
        }
        break;
      }
      case 'open-records': openRecords(id, own === 'true'); break;
      case 'platform-segment':
      case 'platform-drill': {
        const platform = control.dataset.platform;
        const result = engine.readComparisonContents(state, id, { ...scope, platform }, state.publication.id);
        openResultLibrary(result, platform, 'content', { title: result.name + ' · 平台构成',
          definition: '列出当期在 ' + platformNames[platform] + ' 发布的命中作品，每条作品计一次。' });
        break;
      }
      case 'creator-detail':
      case 'repeat-detail': openCreatorDetails(id, control.dataset.action === 'repeat-detail'); break;
      case 'engagement-detail': openEngagementDetails(id, control.dataset.platform); break;
      case 'promotion-detail': {
        const category = control.dataset.category;
        const result = engine.readPromotionContents(state, id, scope, state.publication.id, category);
        const label = engine.promotionLabels[category];
        openResultLibrary(result, scope.platform, 'content', { exact: true, title: result.name + ' · ' + label,
          definition: '列出当期命中作品中，快照推广类型为「' + label + '」的作品。' });
        break;
      }
      case 'top-videos': openTopVideos(id); break;
      case 'trend-point': openTrendPoint(control); break;
      case 'page':
        assetPage = Math.max(1, Number(id));
        render();
        break;
      case 'confirm-active': activeDialog(id, active === 'true'); break;
      case 'set-active': {
        const result = engine.setActive(state, id, active === 'true');
        closeDialog();
        finish(result, active === 'true' ? '已提交启用任务' : '子视图已停用');
        break;
      }
      case 'add-condition-group':
      case 'add-rule':
      case 'remove-rule':
        editConditionRows(control);
        break;
      case 'preview':
        readEditor();
        preview = engine.preview(state, editor);
        dialog.querySelector('#preview').innerHTML = renderPreview();
        if (scenario === 'anker') {
          dialog.querySelector('#query-form [type="submit"]').disabled = !preview.ok;
          dialog.querySelector('#preview').scrollIntoView({ block: 'center' });
        }
        break;
      case 'export': exportFeedback(); break;
    }
  });

  dialog.addEventListener('input', event => {
    if (scenario === 'anker' && editor && event.target.closest('#query-form')) {
      if (['name', 'viewLabels'].includes(event.target.name)) return;
      if (event.target.matches('[data-part="type"]')) {
        const row = event.target.closest('[data-rule]');
        row.querySelector('.match-operator').textContent = event.target.value === 'text' ? '包含' : '是';
      }
    }
    if (editor && preview && event.target.closest('#query-form') && !event.target.closest('#preview')) {
      preview = null;
      dialog.querySelector('#preview').innerHTML = renderPreview();
      if (scenario === 'anker') dialog.querySelector('#query-form [type="submit"]').disabled = true;
    }
  });

  dialog.addEventListener('submit', event => {
    if (event.target.id !== 'query-form') return;
    event.preventDefault();
    readEditor();
    if (scenario === 'anker' && !preview?.ok) return;
    const result = engine.save(state, editor, preview?.poolBatchId);
    if (!result.ok) {
      preview = result;
      dialog.querySelector('#preview').innerHTML = renderPreview();
      if (scenario === 'anker') dialog.querySelector('#query-form [type="submit"]').disabled = true;
      return;
    }
    closeDialog();
    if (scenario === 'anker') {
      const published = engine.settle(state, 'success', result.taskId);
      finish(published, '快照已保存 · 主池 ' + state.publication.poolBatchId);
    } else finish(result, '已保存规则，等待生成结果');
  });

  function selectScenario(name) {
    comparisonDraft = null;
    bulkRepairResult = null;
    const previousRole = state.role;
    scenario = name;
    state = engine.createState(scenario === 'incomplete' ? 'normal' : scenario);
    if (scenario === 'incomplete') state.liveComplete = false;
    scope = defaultComparisonScope();
    engagementPlatform = 'youtube';
    state.role = previousRole;
    hiddenRows.clear();
    activeTab = tabFromHash();
    assetPage = 1;
    trendGranularity = 'week';
    trendBucket = null;
    pairExpanded = location.hash === '#overlap';
    pairSelection = null;
    pairDimension = 'content';
    render();
  }

  app.addEventListener('click', event => {
    const summary = event.target.closest('#pair-overlap > summary');
    if (summary) pairExpanded = !summary.parentElement.open;
  });

  document.addEventListener('change', event => {
    const item = event.target;
    if (item.name === 'comparisonView' && manager.open && canEdit()) {
      const ids = comparisonDraft ?? new Set(state.comparisonViewIds);
      if (!item.checked) ids.delete(item.value);
      else if (!item.disabled && ids.size < engine.maxComparisonViews) ids.add(item.value);
      comparisonDraft = ids;
      syncComparisonSelection();
      return;
    }
    const setting = item.dataset.setting;
    switch (setting) {
      case 'scenario': {
        if (item.value === 'full') history.replaceState(null, '', '#full-comparison');
        else if (item.value === 'many') history.replaceState(null, '', '#comparison');
        else if (item.value === 'anker') history.replaceState(null, '', '#anker');
        else if (isFullRoute()) history.replaceState(null, '', '#comparison');
        else if (isAnkerRoute()) history.replaceState(null, '', '#report');
        selectScenario(item.value);
        if (['anker', 'many'].includes(item.value)) {
          openManager();
          return;
        }
        app.querySelector('[data-setting="scenario"]').focus();
        return;
      }
      case 'role':
        state.role = item.value;
        closeDialog();
        if (manager.open) manager.close();
        break;
      case 'platform': scope.platform = item.value; break;
      case 'days':
        scope = item.value.includes('-') ? { month: item.value, platform: scope.platform }
          : { days: Number(item.value), platform: scope.platform };
        trendBucket = null;
        break;
      case 'engagement-platform': engagementPlatform = item.value; break;
      case 'trend-granularity': trendGranularity = item.value; trendBucket = null; break;
      case 'trend-bucket': trendBucket = Number(item.value); break;
      case 'row':
        if (item.checked) hiddenRows.delete(item.value);
        else hiddenRows.add(item.value);
        break;
      default: return;
    }
    render();
    if (manager.open && ['platform', 'days', 'row'].includes(setting)) {
      renderManager();
      const control = Array.from(manager.querySelectorAll('[data-setting="' + setting + '"]')).find(input => input.value === item.value);
      control?.focus({ preventScroll: true });
    } else if (['role', 'platform', 'days', 'engagement-platform', 'trend-granularity', 'trend-bucket'].includes(setting)) {
      app.querySelector('[data-setting="' + setting + '"]')?.focus({ preventScroll: true });
    }
  });

  document.addEventListener('input', event => {
    const field = event.target.dataset.review;
    if (!field) return;
    const id = event.target.dataset.id;
    feedback[id] = {
      id, status: 'pending', comment: '', ...feedback[id], [field]: event.target.value,
      scenario, role: state.role, location: '#point=' + id, batchId: state.publication.id,
      comparisonViewIds: [...state.comparisonViewIds]
    };
    const exportButton = app.querySelector('[data-action="export"]');
    if (exportButton) exportButton.disabled = false;
  });

  app.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      const help = app.querySelector('.metric-help[open]');
      if (help) {
        help.open = false;
        help.querySelector('summary').focus({ preventScroll: true });
      }
      return;
    }
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key) || event.target.getAttribute('role') !== 'tab') return;
    event.preventDefault();
    const keys = Array.from(app.querySelectorAll('[role="tab"]'), tab => tab.dataset.id);
    const index = keys.indexOf(event.target.dataset.id);
    const direction = event.key === 'ArrowRight' ? 1 : -1;
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? keys.length - 1 : (index + direction + keys.length) % keys.length;
    app.querySelector('[data-action="tab"][data-id="' + keys[next] + '"]').click();
  });

  window.addEventListener('hashchange', () => {
    if (location.hash === '#main-content') return;
    if (picker.open) picker.close();
    if (dialog.open) closeDialog();
    if (manager.open) manager.close();
    activeTab = tabFromHash();
    activeAsset = 'videos';
    assetPage = 1;
    if (location.hash === '#overlap' || location.hash === '#full-comparison') pairExpanded = location.hash === '#overlap';
    if (isFullRoute() && scenario !== 'full') selectScenario('full');
    else render();
    if (isAnkerRoute() && scenario !== 'anker') selectScenario('anker');
    if (openManagerShortcut()) return;
    if (focusOverlapShortcut()) return;
    if (location.hash === '#comparison' || location.hash === '#full-comparison') {
      const heading = document.getElementById('comparison-heading');
      if (heading) {
        heading.focus();
        heading.scrollIntoView({ block: 'start' });
        return;
      }
    }
    document.getElementById('main-content').focus({ preventScroll: true });
    window.scrollTo(0, 0);
  });

  function focusOverlapShortcut() {
    const summary = location.hash === '#overlap' && app.querySelector('#pair-overlap > summary');
    if (!summary) return false;
    summary.focus({ preventScroll: true });
    summary.scrollIntoView({ block: 'start' });
    return true;
  }

  render();
  openManagerShortcut();
  focusOverlapShortcut();
})();
