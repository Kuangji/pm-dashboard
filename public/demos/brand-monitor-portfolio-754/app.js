(function () {
  'use strict';

  const engine = window.Brand754;
  const app = document.getElementById('app');
  const manager = document.getElementById('view-manager');
  const dialog = document.getElementById('dialog');
  const notice = document.getElementById('announcement');
  const demoVersion = 'v0.7';
  const platformNames = { all: '全部平台', youtube: 'YouTube', instagram: 'Instagram', tiktok: 'TikTok' };
  const roleNames = { editor: '可管理', viewer: '仅查看', revoked: '权限已撤销' };
  const scenarios = { normal: '正常数据', first: '尚未创建子视图', missing: '观看量与字段缺失', incomplete: '刷新取数不完整' };
  const statusNames = { available: '可用', generating: '首次生成中', updating: '更新中', failed: '生成失败', inactive: '已停用' };
  const tabs = {
    overview: '品牌概览',
    strategy: '营销策略',
    dynamics: '市场动态',
    assets: '营销资产'
  };
  const points = [
    { id: 'Q01', title: '子视图查询与标签', route: 'manage', steps: ['在「子视图管理」里创建子视图，填写名称和任选的视图标签。', '纳入内容标签 trail，排除 home，预览命中内容与依据。', '生成快照，在同一抽屉的「配置对比」中查找该视图。', '切换「观看量与字段缺失」，只选 TikTok，输入文本短语并预览。'], expected: '视图标签用于识别和组织。发布后即可选为对比分项。' },
    { id: 'S01', title: '快照与对比', route: 'report', steps: ['默认对比核对 100、60、55 与未覆盖 10。', '打开「子视图管理」，在「对比设置」隐藏一行，切换最近 7 天或平台。', '在抽屉内点「统一刷新」，分别模拟失败和成功。'], expected: '临时隐藏只影响显示。报告只展示数据、统计范围和下钻入口。' },
    { id: 'R01', title: '主品牌报告与对比配置', route: 'report', steps: ['对照页首的现有指标示意和新增子视图对比，点击标题旁的问号查看对比统计范围。', '打开「子视图管理」，用「配置对比」加入「新品体验内容」。', '关闭抽屉后核对分母和未覆盖数，再从抽屉清空配置。'], expected: '新增分项后未覆盖数从 10 变为 8，批次与分母保持一致。清空配置后保留主品牌基准。' },
    { id: 'R02', title: '子视图报告', route: 'report', steps: ['从对比过滤后打开山野系列子报和明细。', '对照独立入口及刷新前的旧链接。'], expected: '下钻沿用所选批次、日期和平台。独立入口使用最新已发布的快照。' },
    { id: 'L01', title: '管理入口与生命周期', route: 'manage', steps: ['关闭抽屉，切到营销资产，再开关抽屉核对报告状态。', '在抽屉编辑山野系列，模拟失败，核对旧规则后重试。', '停用后打开原链接，再切换仅查看或权限已撤销。'], expected: '管理独立于报告标签。更新失败仍能读旧结果，停用或撤权即时限制旧链接。' },
    { id: 'F01', title: '评审意见回流', route: 'review', steps: ['选择一个评审点，记录观察与期望。', '导出 JSON，核对版本、身份、场景及配置的对比成员。'], expected: '意见在本次会话保留，导出用于随后回写 Input、Spec、Design 和 Demo。' }
  ];

  let state = engine.createState();
  let scenario = 'normal';
  let scope = { days: 30, platform: 'all' };
  const hiddenRows = new Set();
  let activeTab = 'overview';
  let activeAsset = 'videos';
  let assetPage = 1;
  let editor = null;
  let preview = null;
  let drill = null;
  let previousFocus = null;
  let noticeTimer;
  const feedback = {};

  const text = value => String(value ?? '').replace(/[&<>"']/g, item => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[item]);
  const number = value => Number.isFinite(value) ? value.toLocaleString('zh-CN') : '—';
  const percent = value => Number.isFinite(value) ? (value * 100).toLocaleString('zh-CN', { maximumFractionDigits: 1 }) + '%' : '—';
  const disabled = condition => condition ? ' disabled' : '';
  const selected = condition => condition ? ' selected' : '';
  const checked = condition => condition ? ' checked' : '';
  const canEdit = () => state.role === 'editor';

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
          days: params.has('days') ? Number(params.get('days')) : 30,
          platform: params.get('platform') || 'all'
        }
      };
    }
    return { page: 'report' };
  }

  function childLink(id, batch, filters) {
    const params = new URLSearchParams({ child: id });
    if (batch) {
      params.set('batch', batch);
      params.set('days', filters.days);
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
      + '<a class="wordmark" href="#report"><span class="logo-mark" aria-hidden="true">N</span><span>Nox 聚星</span></a>'
      + '<div class="rail-caption">品牌监控</div><nav class="rail-nav">'
      + nav.map(item => '<a class="rail-link' + (item.isActive ? ' active' : '') + '" href="#' + item.id + '"'
        + (item.isActive ? ' aria-current="page"' : '') + '><span class="nav-symbol" aria-hidden="true">' + item.symbol + '</span>' + item.name + '</a>').join('')
      + '</nav><div class="rail-footer"><strong>v7.5.4 · Demo ' + demoVersion + '</strong><small>独立功能评审 · 虚构数据</small></div></aside>'
      + '<div class="workspace"><header class="topbar"><div class="crumbs">品牌监控 <span aria-hidden="true">/</span> <strong>' + current + '</strong></div>'
      + '<div class="tools">' + tag('评审环境', 'brand')
      + '<label>场景<select aria-label="演示场景" data-setting="scenario">' + optionList(scenarios, scenario) + '</select></label>'
      + '<label>身份<select aria-label="演示身份" data-setting="role">' + optionList(roleNames, state.role) + '</select></label></div></header>'
      + '<main class="content vertical" tabindex="-1" id="main-content">' + body + '</main></div></div>';
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
    const filters = isChild ? route.filters : scope;
    const child = isChild ? engine.readChild(state, route.id, filters, route.batch) : null;
    if (isChild && !child.ok) {
      const view = state.views.find(item => item.id === route.id && item.active);
      const retryLink = child.reason === 'expired' || child.reason === 'range';
      return '<section class="card pad vertical"><div class="page-intro"><a href="#report">← 主品牌报告</a><h1>子视图报告</h1></div>'
        + '<div class="empty" data-test="child-unavailable" data-reason="' + text(child.reason) + '"><strong>' + text(child.error) + '</strong>'
        + (retryLink && view ? '<p><a href="' + childLink(route.id) + '">打开当前子视图报告</a></p>' : '') + '</div></section>';
    }
    const records = isChild ? child.records : engine.filterRecords(state.liveRecords, { days: 30, platform: 'all' }, state.publication.dateEnd);
    const total = isChild ? child.total : engine.summarize(records);
    const channels = new Set(records.map(record => record.platform + ':' + record.channelId)).size;
    const title = isChild ? child.name : state.brand.name;
    const reportName = isChild ? '子视图报告' : '主品牌报告';
    const marker = isChild ? title.slice(0, 2) : 'T';
    const identity = isChild ? '所属主品牌 ' + state.brand.name + ' · 规则 v' + child.version : state.brand.category;
    const snapshotText = isChild ? child.dateStart + ' 至 ' + child.dateEnd + ' · ' + platformNames[filters.platform] + ' · 截至 ' + child.cutoff + ' · ' + child.batchId
      : '标准报告示意 · ' + state.publication.dateStart + ' 至 ' + state.publication.dateEnd + ' · 全部平台 · 截至 2026-11-23 09:00';
    return '<section class="card brand-head" data-test="report-header"><div class="brand-mark' + (isChild ? ' child' : '') + '" aria-hidden="true">' + text(marker) + '</div>'
      + '<div><p class="overline">' + reportName + '</p><h1>' + text(title) + '</h1><p class="small muted">' + text(identity) + '</p>'
      + (isChild ? viewLabels(child.rule.labels) : '') + '</div>'
      + '<div class="actions">' + (isChild ? '<a href="' + (route.batch ? '#comparison' : '#report')
        + '" class="btn">← 返回主品牌</a>' : '<button type="button" class="btn" data-action="open-manager" aria-haspopup="dialog" aria-controls="view-manager">子视图管理</button>') + '</div></section>'
      + '<div class="scope" data-test="report-scope">' + text(snapshotText) + '</div>'
      + '<section class="kpis" aria-label="现有报告指标示意">'
      + kpi('总内容数', total.videos, '条', 'report-videos')
      + kpi('观看量', total.views, '次', 'report-views')
      + kpi('总网红数', channels, '去重频道', 'report-channels') + '</section>'
      + '<section class="card" aria-label="品牌报告板块"><div class="tabs" role="tablist">'
      + Object.entries(tabs).map(([key, label]) => '<button type="button" role="tab" id="tab-' + key + '" aria-controls="report-panel" aria-selected="' + (activeTab === key) + '" tabindex="' + (activeTab === key ? 0 : -1) + '" class="tab' + (activeTab === key ? ' active' : '') + '" data-action="tab" data-id="' + key + '">' + label + '</button>').join('')
      + '</div><div role="tabpanel" id="report-panel" aria-labelledby="tab-' + activeTab + '" class="pad vertical">'
      + (activeTab === 'overview' ? (isChild ? childOverview(records, filters, child) : comparisonPage())
        : reportSection(records, child)) + '</div></section>';
  }

  function kpi(label, value, unit, id) {
    return '<div class="card kpi"><span class="overline">' + label + '</span><strong class="value" data-test="' + id + '">' + number(value)
      + '</strong><span class="small">' + (value === null ? '数据未提供' : unit) + '</span></div>';
  }

  function comparisonScope(result) {
    return '<details class="metric-help"><summary aria-label="对比统计范围">?</summary>'
      + '<div class="metric-tip" data-test="comparison-scope"><strong>同批主品牌基准</strong>'
      + '<p>' + text(result.dateStart + ' 至 ' + result.dateEnd + ' · ' + platformNames[scope.platform]) + '</p>'
      + '<p>数据截至 ' + text(result.cutoff) + ' · 批次 ' + text(result.batchId) + '</p></div></details>';
  }

  function comparisonPage() {
    const result = engine.compare(state, scope);
    let rows = [];
    if (result.ok) rows = result.rows.filter(row => !hiddenRows.has(row.id));
    return '<section class="comparison" aria-labelledby="comparison-heading">'
      + '<div class="comparison-title"><h2 id="comparison-heading" tabindex="-1">子视图对比</h2>'
      + (result.ok ? comparisonScope(result) : '')
      + '</div>'
      + (!result.ok ? '<div class="empty">' + text(result.error) + '</div>'
        : '<div class="table-wrap" tabindex="0" aria-label="子视图对比表横向滚动"><table class="comparison-table" aria-label="子视图对比"><thead><tr><th scope="col">主品牌 / 子视图</th><th scope="col">提及视频数</th><th scope="col">视频覆盖率</th><th scope="col">观看量</th><th scope="col">观看覆盖率</th><th scope="col">操作</th></tr></thead><tbody>'
          + '<tr class="baseline"><th scope="row">主品牌基准</th><td class="number" data-test="pool-videos">' + number(result.total.videos) + '</td><td>—</td><td class="number">' + number(result.total.views) + '</td><td>—</td><td>'
          + button('查看明细', 'open-records', { style: 'link', data: { id: 'pool' } }) + '</td></tr>'
          + rows.map((row, index) => comparisonRow(result, row, index)).join('')
          + '</tbody></table></div>'
          + (result.rows.length
            ? '<div class="summary-footer"><span>未被所配置视图覆盖 <strong data-test="unassigned">'
              + (result.unassigned === null ? '待同批数据完整' : number(result.unassigned) + ' 条') + '</strong></span>'
              + '<span>同一内容可命中多个分项，覆盖率相加可能超过 100%。</span></div>'
            : '<div class="empty" data-test="comparison-empty">尚未选择对比视图。</div>'))
      + '</section>';
  }

  function comparisonRow(result, row, index) {
    const platforms = (row.platforms ?? []).map(p => platformNames[p]).filter(Boolean).join(' / ');
    return '<tr data-row="' + text(row.id) + '"><th scope="row"><div class="row-title"><span class="row-mark' + (index % 2 ? ' cool' : '') + '" aria-hidden="true">'
      + text(row.name.slice(0, 2)) + '</span><div>' + text(row.name) + viewLabels(row.labels) + '<div><span class="small muted">规则 v' + row.version + '</span>'
      + (platforms && row.platforms.length < engine.platforms.length ? ' <span class="small muted">' + text(platforms) + '</span>' : '') + '</div></div></div></th>'
      + '<td class="number" data-value="videos">' + number(row.videos) + '</td><td>' + share(row.videoShare, row.videos, result.total.videos) + '</td>'
      + '<td class="number">' + number(row.views) + '</td><td>' + share(row.viewShare, row.views, result.total.views) + '</td><td>'
      + '<div class="actions"><a class="btn link" href="' + childLink(row.id, result.batchId, scope) + '">查看报告</a>'
      + button('明细', 'open-records', { style: 'link', data: { id: row.id } }) + '</div></td></tr>';
  }

  function share(value, numerator, denominator) {
    if (!Number.isFinite(value)) {
      const reason = denominator === 0 ? '分母为零' : numerator === null || denominator === null ? '数据不可用' : '暂无覆盖率';
      return '<span title="' + reason + '" aria-label="' + reason + '">—</span>';
    }
    return '<div class="share"><span class="number">' + percent(value) + '</span><span class="bar-track" aria-hidden="true"><span class="bar-fill" style="width:'
      + Math.max(0, Math.min(100, value * 100)) + '%"></span></span></div>';
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
        + Math.max(2, Math.round(item.count / max * 84)) + 'px"></div><span>' + platformNames[item.platform] + '</span></div>').join('') + '</div></div>';
  }

  function reportSection(records, child) {
    if (activeTab === 'assets') return assetsSection(records);
    if (activeTab === 'strategy') {
      const zh = records.filter(record => record.lang === 'zh').length;
      const en = records.filter(record => record.lang === 'en').length;
      return '<div class="heading-copy"><h2>营销策略解构</h2><p class="small muted">按当前报告的内容范围查看发布分布。</p></div><div class="split">'
        + distribution(records) + '<div class="card pad"><h3>内容语言</h3><ul class="module-list"><li>中文 <strong>' + zh + '</strong></li><li>英语 <strong>'
        + en + '</strong></li></ul></div></div><p class="callout small">网红画像、受众重合与商品策略依赖生产数据。</p>';
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

  function assetsSection(records) {
    const groups = { videos: '内容库', channels: '网红库', tags: '标签库', products: '商品库' };
    const groupControls = Object.entries(groups).map(([id, label]) => button(label, 'asset', { style: activeAsset === id ? 'compact primary' : 'compact', data: { id } })).join('');
    let body;
    if (activeAsset === 'products') body = '<p class="callout small">商品关系需按当前内容范围验证，当前示例未提供商品数据。</p>';
    else if (activeAsset === 'videos') body = assetTable(records);
    else {
      const values = new Map();
      for (const item of records) {
        if (activeAsset === 'channels') {
          const id = item.platform + ':' + item.channelId;
          const entry = values.get(id) ?? {
            name: platformNames[item.platform] + ' · ' + item.channel,
            detail: item.channelId,
            count: 0
          };
          entry.count += 1;
          values.set(id, entry);
        } else {
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
    return '<div class="section-heading"><h2>营销资产库</h2><div class="actions">' + groupControls + '</div></div>' + body;
  }

  function sortedRecords(records) {
    return [...records].sort((a, b) => b.date.localeCompare(a.date) || b.id.localeCompare(a.id));
  }

  function assetTable(records) {
    if (!records.length) return '<div class="empty">当前范围命中 0 条内容。</div>';
    const maxPages = Math.max(1, Math.ceil(records.length / 8));
    const page = Math.min(assetPage, maxPages);
    const rows = sortedRecords(records).slice((page - 1) * 8, page * 8);
    return '<div class="table-wrap" tabindex="0" aria-label="内容明细表横向滚动"><table class="asset-table" aria-label="内容明细"><thead><tr>'
      + '<th scope="col">内容</th><th scope="col">平台</th><th scope="col">发布时间</th><th scope="col">观看量</th></tr></thead><tbody>'
      + rows.map(row => '<tr><th scope="row">' + text(row.title) + '<div class="small muted">' + text(row.channel) + ' · #' + text(row.id) + '</div></th>'
        + '<td>' + platformNames[row.platform] + '</td><td>' + text(row.date) + '</td><td class="number">' + number(row.views) + '</td></tr>').join('')
      + '</tbody></table></div><div class="summary-footer"><span data-test="detail-count">共 ' + number(records.length) + ' 条</span><div class="actions">'
      + button('上一页', 'page', { style: 'compact', data: { id: page - 1 }, disabled: page <= 1 }) + '<span>' + page + ' / ' + maxPages + '</span>'
      + button('下一页', 'page', { style: 'compact', data: { id: page + 1 }, disabled: page >= maxPages }) + '</div></div>';
  }

  function comparisonSettings() {
    const selected = engine.comparisonCandidates(state).filter(view => state.comparisonViewIds.includes(view.id));
    return '<section class="card pad comparison-settings" aria-labelledby="comparison-settings-title">'
      + '<div class="section-heading"><h3 id="comparison-settings-title">对比设置</h3>'
      + (canEdit() ? button('配置对比', 'open-comparison') : '') + '</div>'
      + '<div class="filters"><label>日期<select data-setting="days" aria-label="对比日期">'
      + optionList({ 30: '最近 30 天', 7: '最近 7 天' }, String(scope.days)) + '</select></label>'
      + '<label>平台<select data-setting="platform" aria-label="对比平台">' + optionList(platformNames, scope.platform) + '</select></label>'
      + (canEdit() ? button('统一刷新', 'refresh', { disabled: Boolean(state.task) }) : '') + '</div>'
      + (selected.length ? '<div class="filters choice-row" role="group" aria-label="显示分项"><span class="small muted">显示分项</span>'
        + selected.map(view => '<label><input type="checkbox" data-setting="row" value="' + text(view.id) + '"'
          + checked(!hiddenRows.has(view.id)) + '>' + text(view.name) + '</label>').join('') + '</div>'
        : '<p class="small muted">尚未选择对比视图。</p>')
      + '<p id="manager-status" class="small muted" role="status" hidden></p>'
      + '</section>';
  }

  function renderManager() {
    const scrollTop = manager.scrollTop;
    manager.innerHTML = '<header class="dialog-head"><div><h2 id="manager-title" tabindex="-1">子视图管理</h2><p class="small muted">'
      + text(state.brand.name) + '</p></div>' + button('关闭', 'close-manager', { style: 'compact' }) + '</header>'
      + '<div class="dialog-body">' + comparisonSettings() + taskBanner()
      + '<div class="section-heading"><h3>子视图</h3>'
      + (canEdit() ? button('创建子视图', 'open-editor', { style: 'primary', disabled: Boolean(state.task) }) : '') + '</div>'
      + (!state.views.length ? '<div class="empty"><strong>还没有子视图</strong><p>可从主品牌池创建子视图。</p></div>'
        : '<ul class="view-list" aria-label="子视图列表">' + state.views.map(manageRow).join('') + '</ul>')
      + (!canEdit() ? '<p class="callout small">当前身份可查看已发布报告。</p>' : '') + '</div>';
    manager.scrollTop = scrollTop;
  }

  function openManager() {
    if (getRoute().page !== 'report' || state.role === 'revoked' || manager.open) return;
    renderManager();
    manager.showModal();
    manager.querySelector('#manager-title').focus({ preventScroll: true });
  }

  function openManagerShortcut() {
    if (location.hash !== '#manage') return false;
    history.replaceState(null, '', '#report');
    openManager();
    return true;
  }

  function manageRow(view) {
    const available = view.active && !view.activationPending ? state.publication.children[view.id] : null;
    const rule = available?.rule ?? view.rule ?? view.pendingRule;
    const platforms = (rule?.platforms ?? []).map(key => platformNames[key]).join(' / ');
    const pending = view.pendingRule ? '<div class="small muted">待发布规则 v' + view.pendingRule.version + '</div>' : '';
    return '<li class="card view-item" data-row="' + text(view.id) + '"><div class="actions">'
      + '<strong>' + (available ? '<a href="' + childLink(view.id) + '">' + text(available.name) + '</a>' : text(view.name)) + '</strong>'
      + viewLabels(rule?.labels)
      + statusTag(view.status, Boolean(available)) + '</div><div class="small muted">' + (text(platforms) || '—') + '</div>' + pending
      + '<div class="section-heading"><span class="small muted">'
      + (available ? text(state.publication.cutoff) + ' · ' + text(state.publication.id) + ' · 规则 v' + available.version : '暂无可用快照')
      + '</span><div class="actions">'
      + (canEdit() ? button('编辑', 'open-editor', { style: 'link', disabled: !view.active || Boolean(state.task), data: { id: view.id } })
        + (view.status === 'failed' && view.active ? button('重试', 'retry', { style: 'link', disabled: Boolean(state.task), data: { id: view.id } }) : '')
        + button(view.active ? '停用' : '启用', 'confirm-active', { style: 'link', disabled: !view.active && Boolean(state.task), data: { id: view.id, active: String(!view.active) } }) : '只读')
      + '</div></div></li>';
  }

  function reviewPage(route) {
    const exportAction = button('导出评审意见', 'export', { style: 'primary', disabled: !Object.keys(feedback).length });
    if (route.page === 'review') {
      return '<header class="section-heading"><div class="page-intro"><span class="overline">v7.5.4 独立 Demo</span><h1>评审清单</h1><p class="note">逐项操作核对，记录本轮观察与期望。</p></div>'
        + exportAction + '</header><section class="review-grid">' + points.map(point => '<a class="card pad review-card" href="#point=' + point.id + '">'
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

  function openDialog(markup, drawer = false) {
    if (!dialog.open) previousFocus = document.activeElement;
    dialog.classList.toggle('drawer', drawer);
    dialog.innerHTML = markup;
    if (!dialog.open) dialog.showModal();
  }

  function closeDialog() {
    if (dialog.open) dialog.close();
  }

  manager.addEventListener('close', () => {
    app.querySelector('[data-action="open-manager"]')?.focus({ preventScroll: true });
  });

  dialog.addEventListener('close', () => {
    editor = null;
    preview = null;
    drill = null;
    if (previousFocus?.isConnected) previousFocus.focus({ preventScroll: true });
    else if (manager.open) {
      const trigger = previousFocus?.dataset.action === 'open-comparison'
        ? manager.querySelector('[data-action="open-comparison"]') : manager.querySelector('#manager-title');
      trigger?.focus({ preventScroll: true });
    }
  });

  function modalHead(title, note = '') {
    return '<header class="dialog-head"><div><h2 id="dialog-title">' + text(title) + '</h2>'
      + (note ? '<p class="small muted">' + text(note) + '</p>' : '') + '</div>' + button('关闭', 'close', { style: 'compact' }) + '</header>';
  }

  function openComparison() {
    if (!manager.open || !canEdit()) return;
    const choices = engine.comparisonCandidates(state);
    openDialog(modalHead('配置对比', state.brand.name) + '<form id="comparison-form"><div class="dialog-body">'
      + '<p class="small muted">选择对比分项。覆盖率分母始终是同批主品牌基准。</p>'
      + (choices.length ? '<fieldset class="form-block comparison-options"><legend>已发布的子视图</legend>'
        + choices.map(view => '<label class="comparison-option"><input type="checkbox" name="comparisonView" value="' + text(view.id) + '"'
          + checked(state.comparisonViewIds.includes(view.id)) + '><span><strong>' + text(view.name) + '</strong>'
          + viewLabels(view.labels) + '</span></label>').join('') + '</fieldset>'
        : '<p class="empty">暂无可选子视图。发布成功后即可加入对比。</p>')
      + '</div><footer class="dialog-footer">' + button('取消', 'close')
      + '<button type="submit" class="btn primary">保存对比配置</button></footer></form>');
  }

  function openEditor(id) {
    if (!canEdit()) return;
    const view = state.views.find(item => item.id === id && item.active);
    if (id && !view) return;
    const existing = view?.pendingRule ?? view?.rule;
    editor = existing ? JSON.parse(JSON.stringify(existing))
      : { name: '', labels: [], platforms: [...engine.platforms], include: [{ type: 'tag', value: '', platform: 'all' }], exclude: [] };
    preview = null;
    renderEditor();
  }

  function readEditor() {
    const form = dialog.querySelector('#query-form');
    if (!form) return;
    editor.name = form.elements.name.value;
    editor.labels = form.elements.viewLabels.value.split(/[,，、]/);
    editor.platforms = [...form.querySelectorAll('[name="platform"]:checked')].map(input => input.value);
    for (const group of ['include', 'exclude']) {
      editor[group] = [...form.querySelectorAll('[data-rule="' + group + '"]')].map(row => {
        const type = row.querySelector('[data-part="type"]').value;
        const value = row.querySelector('[data-part="value"]').value;
        const platform = row.querySelector('[data-part="platform"]').value;
        return { type, value, ...(platform === 'all' ? {} : { platform }) };
      });
    }
  }

  function renderEditor() {
    const header = modalHead(editor.id ? '编辑子视图' : '创建子视图', '主品牌池 · ' + state.brand.name);
    const flags = engine.platforms.map(key => '<label><input type="checkbox" name="platform" value="' + key + '"' + checked(editor.platforms.includes(key)) + '>' + platformNames[key] + '</label>').join('');
    openDialog(header + '<form id="query-form"><div class="dialog-body">'
      + '<label class="form-block">子视图名称<input class="field" name="name" maxlength="48" value="' + text(editor.name) + '" placeholder="例如 周末露营"></label>'
      + '<label class="form-block">视图标签（选填）<input class="field" name="viewLabels" maxlength="100" aria-describedby="view-label-help" value="'
      + text((editor.labels ?? []).join('，')) + '" placeholder="例如 产品线，活动"></label>'
      + '<p id="view-label-help" class="small condition-help">用逗号区分多个标签。标签用于组织视图，查询条件在下方设置。</p>'
      + '<fieldset class="form-block"><legend>收录平台</legend><div class="token-row">' + flags + '</div></fieldset>'
      + ruleGroup('include', '纳入条件', '满足任一条件即可纳入。可用完整标签 trail 或 home 试跑。')
      + ruleGroup('exclude', '排除条件', '命中任一排除条件即剔除。')
      + '<div id="preview" aria-live="polite">' + renderPreview() + '</div></div>'
      + '<footer class="dialog-footer">' + button('预览命中', 'preview') + button('取消', 'close')
      + '<button type="submit" class="btn primary">保存并生成</button></footer></form>');
  }

  function ruleGroup(group, label, help) {
    const typeOptions = group === 'include' ? { text: '文本短语', tag: '完整内容标签', account: '发布账号 ID' } : { text: '文本短语', tag: '完整内容标签' };
    const rows = editor[group].map((condition, index) => '<div class="field-row" data-rule="' + group + '">'
      + '<select aria-label="' + label + '类型" data-part="type">' + optionList(typeOptions, condition.type) + '</select>'
      + '<input class="field" aria-label="' + label + '值" data-part="value" maxlength="100" value="' + text(condition.value) + '" placeholder="输入条件">'
      + '<select aria-label="' + label + '适用平台" data-part="platform">' + optionList(platformNames, condition.platform ?? 'all') + '</select>'
      + button('移除', 'remove-rule', { style: 'compact', data: { group, id: index } }) + '</div>').join('');
    return '<fieldset class="form-block"><legend>' + label + '</legend><p class="small condition-help">' + help + '</p>' + rows
      + '<div>' + button('添加' + label, 'add-rule', { style: 'compact', data: { group } }) + '</div></fieldset>';
  }

  function renderPreview() {
    if (!preview) return '';
    if (!preview.ok) return '<p class="callout error" data-test="preview-error">' + text(preview.error) + '</p>';
    return '<div class="preview"><strong>命中 ' + number(preview.records.length) + ' 条</strong>'
      + '<p class="small muted">' + text(preview.dateStart + ' 至 ' + preview.dateEnd + ' · '
        + preview.platforms.map(platform => platformNames[platform]).join(' / ') + ' · 截至 ' + preview.cutoff + ' · ' + preview.batchId) + '</p>'
      + (preview.records.length ? '<ul>' + preview.records.slice(0, 5).map(record => '<li>' + text(record.title) + ' · ' + platformNames[record.platform]
        + '<div class="small muted">命中条件 ' + text((record.matchedConditions ?? []).map(item => typeof item === 'string' ? item : item.value).join('、')) + '</div></li>').join('') + '</ul>'
        : '<p class="small muted">规则有效，当前范围没有命中内容。</p>') + '</div>';
  }

  function renderDrill() {
    openDialog(modalHead(drill.title, drill.caption) + '<div class="dialog-body">' + assetTable(drill.records) + '</div>', true);
  }

  function openRecords(id, own) {
    const route = getRoute();
    const filters = own && route.page === 'child' ? route.filters : scope;
    const batch = own && route.page === 'child' ? route.batch : state.publication.id;
    let result;
    if (id === 'pool') {
      const comparison = engine.compare(state, filters, batch);
      if (!comparison.ok) return notify(comparison.error);
      result = { ...comparison, name: '主品牌基准', records: engine.filterRecords(state.publication.records, filters, state.publication.dateEnd) };
    } else {
      result = engine.readChild(state, id, filters, batch);
      if (!result.ok) return notify(result.error);
    }
    assetPage = 1;
    drill = {
      title: result.name + ' · 内容明细',
      caption: result.dateStart + ' 至 ' + result.dateEnd + ' · ' + platformNames[filters.platform] + ' · ' + result.batchId,
      records: result.records
    };
    renderDrill();
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
    const control = event.target.closest('button[data-action]');
    if (!control || control.disabled) return;
    const { action, id, outcome, group, active, own } = control.dataset;
    switch (action) {
      case 'tab':
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
      case 'open-comparison': openComparison(); break;
      case 'close-manager': manager.close(); break;
      case 'open-editor': openEditor(id); break;
      case 'close': closeDialog(); break;
      case 'refresh': finish(engine.refresh(state), '已提交统一刷新任务'); break;
      case 'retry': finish(engine.retry(state, id), '已按待发布规则重试'); break;
      case 'settle': finish(engine.settle(state, outcome, state.task?.id), '新快照已发布'); break;
      case 'open-records': openRecords(id, own === 'true'); break;
      case 'page':
        assetPage = Math.max(1, Number(id));
        if (drill) renderDrill();
        else render();
        break;
      case 'confirm-active': activeDialog(id, active === 'true'); break;
      case 'set-active': {
        const result = engine.setActive(state, id, active === 'true');
        closeDialog();
        finish(result, active === 'true' ? '已提交启用任务' : '子视图已停用');
        break;
      }
      case 'add-rule':
      case 'remove-rule':
        readEditor();
        if (action === 'add-rule') editor[group].push({ type: 'tag', value: '' });
        else editor[group].splice(Number(id), 1);
        preview = null;
        renderEditor();
        break;
      case 'preview':
        readEditor();
        preview = engine.preview(state, editor);
        dialog.querySelector('#preview').innerHTML = renderPreview();
        break;
      case 'export': exportFeedback(); break;
    }
  });

  dialog.addEventListener('input', event => {
    if (editor && preview && event.target.closest('#query-form') && !event.target.closest('#preview')) {
      preview = null;
      dialog.querySelector('#preview').textContent = '';
    }
  });

  dialog.addEventListener('submit', event => {
    if (event.target.id === 'comparison-form') {
      event.preventDefault();
      const ids = new FormData(event.target).getAll('comparisonView');
      const prior = state.comparisonViewIds;
      const result = engine.setComparisonViews(state, ids);
      if (!result.ok) {
        notify(result.error);
        return;
      }
      for (const id of ids) if (!prior.includes(id)) hiddenRows.delete(id);
      closeDialog();
      finish(result, '对比配置已保存');
      return;
    }
    if (event.target.id !== 'query-form') return;
    event.preventDefault();
    readEditor();
    const result = engine.save(state, editor);
    if (!result.ok) {
      preview = result;
      dialog.querySelector('#preview').innerHTML = renderPreview();
      return;
    }
    closeDialog();
    finish(result, '已保存规则，等待生成结果');
  });

  document.addEventListener('change', event => {
    const item = event.target;
    switch (item.dataset.setting) {
      case 'scenario': {
        const previousRole = state.role;
        scenario = item.value;
        state = engine.createState(scenario === 'incomplete' ? 'normal' : scenario);
        if (scenario === 'incomplete') state.liveComplete = false;
        state.role = previousRole;
        scope = { days: 30, platform: 'all' };
        hiddenRows.clear();
        activeTab = 'overview';
        assetPage = 1;
        render();
        app.querySelector('[data-setting="scenario"]').focus();
        return;
      }
      case 'role':
        state.role = item.value;
        closeDialog();
        if (manager.open) manager.close();
        break;
      case 'platform': scope.platform = item.value; break;
      case 'days': scope.days = Number(item.value); break;
      case 'row':
        if (item.checked) hiddenRows.delete(item.value);
        else hiddenRows.add(item.value);
        break;
      default: return;
    }
    render();
    if (item.dataset.setting === 'role') app.querySelector('[data-setting="role"]').focus();
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
    const keys = Object.keys(tabs);
    const index = keys.indexOf(activeTab);
    const direction = event.key === 'ArrowRight' ? 1 : -1;
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? keys.length - 1 : (index + direction + keys.length) % keys.length;
    app.querySelector('[data-action="tab"][data-id="' + keys[next] + '"]').click();
  });

  window.addEventListener('hashchange', () => {
    if (location.hash === '#main-content') return;
    if (dialog.open) closeDialog();
    if (manager.open) manager.close();
    activeTab = 'overview';
    activeAsset = 'videos';
    assetPage = 1;
    render();
    if (openManagerShortcut()) return;
    if (location.hash === '#comparison') {
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

  render();
  openManagerShortcut();
})();
