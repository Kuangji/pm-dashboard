const option = document.body.dataset.option
function getStoredScope() {
  try {
    return window.sessionStorage.getItem('monitor761Scope')
  } catch (error) {
    return null
  }
}

function setStoredScope(scope) {
  try {
    window.sessionStorage.setItem('monitor761Scope', scope)
  } catch (error) {
    // file:// previews in the Codex sidebar can block Web Storage.
  }
}

const storedScope = getStoredScope()
const scopeParamKey = 'projects'

function getScopeFromUrl() {
  const raw = new URLSearchParams(window.location.search).get(scopeParamKey)
  if (!raw) return null
  if (raw === 'all') return { scope: 'all', ids: [] }
  const ids = raw.split(',').map(id => id.trim()).filter(Boolean)
  if (ids.length > 1) return { scope: 'selected', ids }
  if (ids.length === 1) return { scope: 'single', ids }
  return null
}

const urlScope = getScopeFromUrl()
const initialScope = urlScope?.scope || (option === 'd' ? (storedScope === 'all' ? 'all' : 'selected') : 'single')
const initialProjectIds = urlScope?.ids || []
const initialParams = new URLSearchParams(window.location.search)
const notificationTaskId = initialParams.get('task')
const isNotificationEntry = initialParams.get('from') === 'notification' && notificationTaskId
const isArchivePreview = initialParams.get('projectStatus') === 'archived'
let pendingArchiveCard = null
let pendingArchiveProjectName = '当前项目'

const pages = {
  list: {
    title: '实体页 1 · 项目列表',
    desc: '内容监控默认入口：保留项目列表一级页面，用轻量近期速览帮助用户进入不同项目范围的工作台。',
    tag: '一级页面'
  },
  a: {
    title: '实体页 2 · 内容监控工作台',
    desc: '统一工作台：当前为单项目范围，第一屏回答近期状态、内容变化和贡献来源，内容列表承接下钻。',
    tag: '统一工作台'
  },
  b: {
    title: '归档 B · 列表运营型',
    desc: '已归档：保留运营关注队列和批量操作强化思路，不作为主布局继续推进。',
    tag: '归档参考'
  },
  c: {
    title: '归档 C · 看板分析型',
    desc: '已归档：仅抽取贡献分析和数据可信度模块表达，不整体采用。',
    tag: '归档参考'
  },
  d: {
    title: '实体页 2 · 内容监控工作台',
    desc: '统一工作台：当前为跨项目范围，通过项目范围控制条承接原总监控列表心智。',
    tag: '统一工作台'
  }
}

const rows = [
  ['Summer Routine 2026 | skincare refresh', 'Lena Beauty Lab', 'May Launch', 'YT', '128.4K', '+18.2K', '2.1K', '260', '正常', '74', '4.8%', '19/60天', 31, '自动追踪 · Rule A', '12 分钟前', '1.1K', '已绑定', '$3.2K', '已填写'],
  ['Unboxing new mini camera for travel creators', 'Mika Studio', 'Beauty Review', 'TT', '86.1K', '+9.7K', '1.4K', '180', '正常', '46', '6.2%', '42/60天', 70, '手动添加', '2026-05-03', '860', '已绑定', '$1.8K', '已填写'],
  ['GRWM: soft glam for weekend brunch', 'Ava Daily', 'TikTok Spring', 'IG', '54.3K', '+1.1K', '320', '12', '样本不足', '18', '--', '58/60天', 96, '自动追踪 · Rule C', '52 分钟前', '240', '已绑定', '$920', '已填写'],
  ['Honest review after 30 days of usage', 'TechSkin Review', 'Camera Trial', 'X', '23.9K', '+0', '12', '4', '正常', '2', '1.3%', '12/30天', 40, '手动添加', '2026-05-08', '--', '未绑定', '$480', '已填写'],
  ['Creator haul recap with manual budget', 'Nora Finds', 'Holiday Seeding', 'YT', '12.6K', '+320', '220', '16', '正常', '9', '2.9%', '60/60天', 100, '手动添加', '2026-04-22', '160', '已绑定', '--', '未填写'],
  ['Short-form paid review without budget input', 'Kai Shorts', 'May Launch', 'TT', '9.4K', '+860', '430', '31', '正常', '11', '5.1%', '8/30天', 26, '自动追踪 · Rule B', '38 分钟前', '42', '已绑定', '--', '未填写']
].map(([title, creator, project, platform, views, inc, likes, comments, commentStatus, shares, er, progress, pct, source, createdAt, shortClicks, shortlinkStatus, budget, budgetStatus]) => ({
  title,
  creator,
  project,
  platform,
  views,
  inc,
  likes,
  comments,
  commentStatus,
  shares,
  er,
  progress,
  pct,
  source,
  createdAt,
  shortClicks,
  shortlinkStatus,
  budget,
  budgetStatus
}))

const projectOptions = [
  ['May Creator Launch', 'YouTube / TikTok', 46, true, '运行中'],
  ['Beauty Review', 'Instagram / TikTok', 38, true, '运行中'],
  ['TikTok Spring Test', 'TikTok', 21, true, '运行中'],
  ['Camera Trial', 'YouTube / X', 12, false, '运行中'],
  ['Holiday Seeding', 'Instagram', 11, false, '已归档']
]

const ranks = [
  ['Summer Routine 2026', '+18.2K'],
  ['Mini camera unboxing', '+9.7K'],
  ['Soft glam brunch GRWM', '+1.1K'],
  ['30 days honest review', '+0']
]

const labelCounts = [
  ['Launch', 42],
  ['Review', 31],
  ['Paid', 28],
  ['Organic', 19],
  ['Unboxing', 16],
  ['Tutorial', 12],
  ['Q2', 10],
  ['Creator Tier', 8]
]

const tagContributionData = {
  delta: [
    { tag: 'Launch', content: 42, active: 31, views: 142600, engagement: 16840, likes: 13200, comments: 2140, shares: 1500, clicks: 1240 },
    { tag: 'Review', content: 31, active: 22, views: 98600, engagement: 11210, likes: 8600, comments: 1840, shares: 770, clicks: 820 },
    { tag: 'Paid', content: 28, active: 18, views: 76400, engagement: 8730, likes: 6900, comments: 1080, shares: 750, clicks: 630 },
    { tag: 'Organic', content: 19, active: 14, views: 53100, engagement: 6220, likes: 4700, comments: 980, shares: 540, clicks: 390 },
    { tag: 'Unboxing', content: 16, active: 12, views: 38600, engagement: 4210, likes: 3300, comments: 610, shares: 300, clicks: 260 },
    { tag: 'Tutorial', content: 12, active: 9, views: 22800, engagement: 2640, likes: 2100, comments: 310, shares: 230, clicks: 140 },
    { tag: 'Q2', content: 10, active: 7, views: 15100, engagement: 1820, likes: 1420, comments: 260, shares: 140, clicks: 90 },
    { tag: 'Creator Tier', content: 8, active: 5, views: 9800, engagement: 1030, likes: 820, comments: 130, shares: 80, clicks: 52 }
  ],
  snapshot: [
    { tag: 'Launch', content: 42, active: 42, views: 1254000, engagement: 146800, likes: 118200, comments: 18400, shares: 10200, clicks: 8400 },
    { tag: 'Review', content: 31, active: 31, views: 982000, engagement: 103500, likes: 82000, comments: 14600, shares: 6900, clicks: 6100 },
    { tag: 'Paid', content: 28, active: 28, views: 748000, engagement: 84200, likes: 66100, comments: 10700, shares: 7400, clicks: 5200 },
    { tag: 'Organic', content: 19, active: 19, views: 486000, engagement: 52200, likes: 41100, comments: 7600, shares: 3500, clicks: 2600 },
    { tag: 'Unboxing', content: 16, active: 16, views: 324000, engagement: 36700, likes: 28900, comments: 5200, shares: 2600, clicks: 1740 },
    { tag: 'Tutorial', content: 12, active: 12, views: 221000, engagement: 24100, likes: 19000, comments: 3400, shares: 1700, clicks: 980 },
    { tag: 'Q2', content: 10, active: 10, views: 143000, engagement: 15100, likes: 11900, comments: 2100, shares: 1100, clicks: 680 },
    { tag: 'Creator Tier', content: 8, active: 8, views: 96000, engagement: 10200, likes: 7800, comments: 1600, shares: 800, clicks: 420 }
  ]
}

const tagMetricLabels = {
  views: '观看',
  engagement: 'Engagement',
  likes: '点赞',
  comments: '评论',
  shares: '分享',
  clicks: '短链点击',
  content: '内容数'
}

const tagModeLabels = {
  delta: '观察期增量',
  snapshot: '当前累计值'
}

const tagModeNotes = {
  delta: '当前展示的是数据观察周期内的变化量：观看、互动和短链点击都按观察期增量统计；选择“内容数”时按观察期活跃内容排序。多标签内容会重复归属。',
  snapshot: '当前展示的是最新累计值：不取观察期差值，用于查看现在各标签沉淀的总体数据；选择“内容数”时按标签内容总数排序。多标签内容会重复归属。'
}

const primaryFilterOptions = [
  ['监控状态', ['全部 (128)', '监控中', '已完成', '已删除', '其他状态']],
  ['地区', ['全部地区', '美国', '日本', '韩国', '中国台湾', '巴西', '英国', '其他']],
  ['视频标签', ['全部标签', '无标签（17）', ...labelCounts.slice(0, 6).map(([label, count]) => `${label}（${count}）`)]],
  ['额外标签1', ['全部', '无标签', '产品线 A', '产品线 B', 'Campaign', 'Creator Tier']],
  ['额外标签2', ['全部', '无标签', 'Q2', 'Test', 'High Priority']],
  ['创建人', ['全部', 'Yuki Chen', 'Kuangji', 'Sophia', 'Alex']],
  ['监控时长', ['全部', '60 天', '120 天', '180 天', '240 天', '360 天']],
  ['观看量', ['全部观看量', '< 1 万', '1 万 - 10 万', '10 万 - 50 万', '50 万以上', '自定义']],
  ['视频类型', ['youtube长视频', 'youtube短视频', 'tt视频', 'tt图片', 'ins posts', 'ins reels', 'x图文', 'x视频']],
  ['来源 / 自动追踪规则', ['全部来源', '手动添加', '自动追踪全部', '自动追踪 · Rule A', '自动追踪 · Rule B', '自动追踪 · Rule C']],
  ['发布日期', ['全部日期', '最近 7 天', '最近 30 天', '本月', '自定义']]
]

const secondaryFilterOptions = [
  ['数据问题', ['全部', '需关注', '低增长 / 停滞', '数据不可解释', '配置缺失']],
  ['短链状态', ['全部', '已绑定', '未绑定', '已绑定无点击']],
  ['预算状态', ['全部', '已填写', '未填写', '不可计算']],
  ['评论状态', ['全部', '正常', '暂无评论', '样本过少', '未同步 / 处理中']],
  ['近期新增', ['全部', '最近 1 小时', '今日新增', '最近 7 天', '自动追踪新增']]
]

const projectOverviewFilterOptions = [
  ['日期范围', ['最近 7 天', '最近 30 天', '本月', '自定义']],
  ['项目范围', ['全部可见项目', '运行中项目', '已归档项目', '自定义项目范围']],
  ['平台范围', ['全部平台', 'YouTube', 'TikTok', 'Instagram', 'X']]
]

const projectCardFilterOptions = [
  ['卡片状态', ['运行中', '已归档', '全部状态']],
  ['创建人', ['全部', 'Yuki Chen', 'Kuangji', 'Sophia', 'Alex']],
  ['平台', ['全部', 'YouTube', 'TikTok', 'Instagram', 'X']]
]

const multiFilterMenus = new WeakMap()

function filterSelect(label, options, className = '') {
  if (label === '视频类型') return multiFilterSelect(label, options, className)
  return `
    <label class="filter-select ${className}">
      <span>${label}</span>
      <select aria-label="${label}">
        ${options.map(option => `<option>${option}</option>`).join('')}
      </select>
    </label>`
}

function multiFilterSelect(label, options, className = '') {
  return `
    <div class="filter-select filter-multi-select ${className}" data-multi-filter>
      <span>${label}</span>
      <button class="multi-filter-trigger" type="button" data-multi-toggle aria-label="${label}" aria-expanded="false">
        <b data-multi-summary>全部类型</b>
      </button>
      <div class="multi-filter-menu" data-multi-menu hidden>
        ${options.map(option => `
          <label class="multi-filter-option">
            <input type="checkbox" value="${option}" data-multi-option>
            <span>${option}</span>
          </label>`).join('')}
      </div>
    </div>`
}

function isWorkbench() {
  return ['a', 'd'].includes(option)
}

function scopeMeta(type = initialScope) {
  if (type === 'single') {
    const projectIndex = Number((initialProjectIds[0] || 'project-1').replace('project-', '')) - 1
    const projectName = projectOptions[projectIndex]?.[0] || 'May Creator Launch'
    return {
      title: projectName,
      desc: `${isArchivePreview ? '已归档项目' : '单项目范围'} · Yuki Chen · 协作者 4 · 创建于 2026-04-18`,
      content: '当前内容 46',
      platform: '覆盖平台 3',
      issue: '需关注 7',
      mode: '单项目范围'
    }
  }
  if (type === 'all') {
    return {
      title: '全部可见项目',
      desc: '跨项目范围 · 当前账号可见 12 个项目 · 承接原总监控列表心智',
      content: '当前内容 128',
      platform: '覆盖平台 4',
      issue: '需关注 23',
      mode: '全部项目范围'
    }
  }
  return {
    title: '已选 3 个项目',
    desc: '跨项目范围 · May Creator Launch / Beauty Review / TikTok Spring Test',
    content: '当前内容 105',
    platform: '覆盖平台 4',
    issue: '需关注 21',
    mode: '多项目范围'
  }
}

function shell(content) {
  return `
    <div class="demo-shell">
      <aside class="side-nav">
        <div class="brand"><span class="brand-mark">N</span>NoxInfluencer</div>
        <div class="side-section">
          <p class="side-label">效果监控</p>
          <a class="side-item active" href="./index.html"><span class="side-dot"></span>内容监控</a>
          <a class="side-item"><span class="side-dot"></span>短链管理</a>
          <a class="side-item"><span class="side-dot"></span>服务记录</a>
        </div>
        <div class="side-section">
          <p class="side-label">主要实体页面</p>
          <a class="side-item ${option === 'list' ? 'active' : ''}" href="./project-list.html">项目列表</a>
          <a class="side-item ${isWorkbench() ? 'active' : ''}" href="./option-a-project-workbench.html">内容监控工作台</a>
        </div>
        <div class="side-section">
          <p class="side-label">归档参考</p>
          <a class="side-item ${option === 'b' ? 'active' : ''}" href="./option-b-list-ops.html">B 列表运营</a>
          <a class="side-item ${option === 'c' ? 'active' : ''}" href="./option-c-dashboard-board.html">C 看板分析</a>
        </div>
      </aside>
      <main class="main">
        <div class="topbar"><div class="topbar-title">内容监控 2.0 二期 · 统一工作台 Demo</div></div>
        ${content}
      </main>
    </div>`
}

function workbenchHeader() {
  const meta = scopeMeta()
  return `
    <div class="project-header ${isArchivePreview ? 'archived-workbench' : ''}">
      <div class="workbench-title-block">
        <div class="scope-headline" data-scope-bar>
          <div>
            <div class="scope-kicker">当前范围</div>
            <h2><span data-scope-title>${meta.title}</span><span class="scope-edit-icon" data-open-drawer="scope-config" role="button" title="编辑项目范围" aria-label="编辑项目范围">✎</span>${isArchivePreview ? '<span class="chip gray lifecycle-chip">已归档</span>' : ''}</h2>
            <p data-scope-desc>${meta.desc}</p>
            ${isArchivePreview ? '<p class="archive-state-note">归档项目保留历史数据查看；添加监控和自动追踪新增已暂停，已存在任务继续更新到原监控结束时间。</p>' : ''}
          </div>
          <div class="scope-summary">
            <span data-scope-content>${meta.content}</span>
            <span data-scope-platform>${meta.platform}</span>
            <span data-scope-issue>${meta.issue}</span>
            <button class="btn btn-light scope-export-action" data-export-action="full">全量导出 XLSX</button>
            <button class="btn btn-light scope-archive-action" data-archive-project>${isArchivePreview ? '取消归档' : '归档项目'}</button>
            <button class="btn btn-primary scope-add-monitor" ${isArchivePreview ? 'disabled title="已归档项目不能新增监控"' : ''}>添加监控</button>
          </div>
        </div>
      </div>
    </div>
    ${globalFilterSticky()}`
}

function projectHeader(page) {
  return `
    <div class="project-header">
      <div>
        <h1 class="project-title">${page.title}</h1>
        <p class="project-desc">${page.desc}</p>
        <div class="project-meta"><span class="avatar"></span><span>Yuki Chen</span><span class="divider"></span><span>协作者 4</span><span class="divider"></span><span>创建于 2026-04-18</span><span class="chip orange">${page.tag}</span></div>
      </div>
      <div class="header-actions"><button class="btn btn-light" data-nav="./project-list.html">返回项目列表</button><button class="btn btn-primary">添加监控</button></div>
    </div>
    <div class="filter-row">
      ${primaryFilterOptions.map(([label, options]) => filterSelect(label, options, label === '发布日期' ? 'date-filter-select' : '')).join('')}
    </div>`
}

function scopeEditorDrawer() {
  return `
    <aside class="config-drawer scope-drawer" data-config-drawer="scope-config" data-scope-editor hidden>
      <div class="config-drawer-head">
        <div>
          <h2>编辑项目范围</h2>
          <p>项目范围决定 Dashboard、趋势、贡献分析和内容列表的聚合口径。</p>
        </div>
        <button class="drawer-close" data-close-drawer>×</button>
      </div>
      <div class="scope-editor-body">
        <button class="scope-all-option ${initialScope === 'all' ? 'active' : ''}" data-scope-all>
          <span class="scope-all-check">${initialScope === 'all' ? '✓' : ''}</span>
          <span>
            <strong>全部可见项目</strong>
            <em>查看当前账号可见的全部项目内容，适合承接原总监控列表。</em>
          </span>
        </button>
        <div class="scope-section-title">或选择具体项目</div>
        <div class="selected-scope-cache" data-selected-scope-cache>
          <div class="selected-scope-head">
            <strong>已选中项目</strong>
            <span data-selected-scope-count>0 个</span>
          </div>
          <div class="selected-scope-tags" data-selected-scope-tags></div>
        </div>
        <div class="scope-filter-tools">
          ${projectCardFilterOptions.map(([label, options]) => filterSelect(label, options)).join('')}
          <div class="search">搜索项目名称</div>
        </div>
        <div class="scope-projects scope-projects-drawer">
          ${projectOptions
            .map(([name, platforms, count, checked, status], index) => {
              const projectId = `project-${index + 1}`
              const isChecked = initialProjectIds.length
                ? initialProjectIds.includes(projectId)
                : initialScope === 'single'
                  ? index === 0
                  : initialScope === 'all'
                    ? false
                    : checked
              return `
                <label class="scope-project ${isChecked ? 'checked' : ''}" data-scope-project data-project-id="${projectId}" data-content-count="${count}">
                  <span class="scope-check">${isChecked ? '✓' : ''}</span>
                  <span><strong>${name}</strong><em>${platforms} · ${count} 条内容 · ${status}</em></span>
                </label>`
            })
            .join('')}
        </div>
        <p class="scope-editor-note" data-scope-message>改变范围后，工作台内所有看板和列表按新范围重新聚合。</p>
      </div>
      <div class="config-drawer-foot">
        <button class="btn btn-light" data-close-drawer>取消</button>
        <button class="btn btn-primary" data-save-scope data-close-drawer>应用项目范围</button>
      </div>
    </aside>`
}

function toolbar() {
  return `
    <div class="monitor-toolbar sticky-monitor-toolbar">
      <span class="filter-group-label">一级筛选 · 平台</span>
      <div class="platform-tabs"><span class="platform-tab active">All <b>128</b></span><span class="platform-tab">YT <b>46</b></span><span class="platform-tab">TT <b>52</b></span><span class="platform-tab">IG <b>21</b></span><span class="platform-tab">X <b>9</b></span></div>
      <div class="search global-search">搜索频道 / 标题 / 链接</div>
    </div>`
}

function globalFilterSticky() {
  return `
    <div class="global-filter-sticky">
      <div class="filter-row workbench-filter-row">
        <span class="filter-group-label">一级筛选 · 内容集合</span>
        ${primaryFilterOptions.map(([label, options]) => filterSelect(label, options, label === '发布日期' ? 'date-filter-select' : '')).join('')}
      </div>
    </div>`
}

function workbenchAnchors() {
  return `<div class="section-anchor-nav"><a href="#dashboard-section" data-anchor-target="dashboard-section">数据看板</a><a href="#raw-data-section" data-anchor-target="raw-data-section">原始数据</a><a href="#content-list-section" data-anchor-target="content-list-section">监控内容</a></div>`
}

const overviewMetrics = [
  ['观看增量', '428.6K', '+18.4%', '按当前数据观察区间计算，表示所选内容集合在观察区间内的观看增长。'],
  ['Engagement 增量', '41.1K', '+9.6%', '点赞、评论、分享在观察区间内的增量合计。'],
  ['互动率', '5.7%', '+0.8%', '按当前观察区间内 Engagement 增量 / 观看增量计算；观看增量为 0 时显示 --。'],
  ['活跃内容', '42', '32.8%', '观察区间内观看、点赞、评论或分享发生变化的内容数。']
]

const overviewActions = [
  ['需关注内容', '7', '低增长 / 配置缺失', '包含低增长、数据不可解释、评论样本不足、短链或预算配置缺失等内容。', 'attention'],
  ['自动追踪新增', '13', '最近 1 小时', '自动追踪规则在近期抓取并创建的监控任务；点击后只筛选下方列表。', 'auto-track'],
  ['短链待处理', '4', '未绑定 / 无点击', '短链缺失会影响 CTR、点击分布和短链贡献解释。', 'shortlink-gap'],
  ['预算未填写', '31', '影响 CPV / CPM', '预算需要用户手动填写；未填写时成本效率指标不可计算。', 'budget-gap'],
  ['评论数据不足', '12', '样本不足 / 未同步', '评论获取能力不扩展时，需明确告知评论分析可能不可用。', 'comment-gap']
]

const rawMetrics = [
  ['观看量', '428.6K', '所选内容集合在当前数据观察区间内的观看增量。', true],
  ['点赞数', '32.8K', '所选内容集合在当前数据观察区间内的点赞增量。', true],
  ['评论数', '1.9K', '所选内容集合在当前数据观察区间内的评论增量；样本不足时仅作提示。', true],
  ['分享数', '6.4K', '所选内容集合在当前数据观察区间内的分享增量。', true],
  ['Engagement 总量', '41.1K', '当前口径为点赞、评论、分享的增量合计。', true],
  ['互动率', '5.7%', '按当前观察区间内 Engagement 总量 / 观看量计算；观看量为 0 时显示 --。', true],
  ['Nox 短链点击数', '2.4K', '仅统计已绑定 Nox 短链的点击数据；未绑定内容不计入。', true],
  ['预算消耗', '未填写', '预算/成本需要用户手动填写，默认不随采集数据自动生成。', false],
  ['CPM', '--', '千次观看成本；预算未填写或观看口径不完整时不可计算。', false],
  ['CPV', '--', '单次观看成本；预算未填写或观看口径不完整时不可计算。', false],
  ['CTR', '--', '点击率；短链点击或曝光/观看分母缺失时不可计算。', false]
]

const observationRangeLabel = '2026-05-03 -- 2026-05-11'

function metricHelp(text) {
  return `<span class="metric-help" title="${text}" aria-label="${text}">?</span>`
}

const drilldownViews = {
  diagnostic: {
    title: '观察区间变化明细',
    desc: '解释当前观察区间内主要增长来自哪些内容，不改写工作台筛选。',
    condition: '临时条件：观看 / Engagement 有明显增量',
    insight: '当前增长集中在 8 条内容，其中 3 条来自自动追踪规则。',
    display: '看清增长来自哪些内容、哪些来源和哪些指标。',
    process: '可快速定位增长内容、仅看自动追踪来源，或应用为列表筛选后继续处理。',
    quickActions: ['查看增长内容', '只看自动追踪来源', '应用为增长筛选'],
    columns: ['内容', '观看增量', 'Engagement', '状态'],
    rows: [
      ['Summer Routine 2026', '+18.2K', '+2.4K', '数据完整'],
      ['Mini camera unboxing', '+9.7K', '+1.5K', '短链未绑定'],
      ['Night routine follow-up', '+6.4K', '+880', '自动追踪'],
      ['30 days honest review', '+0', '+14', '低增长']
    ],
    action: '应用为增长内容筛选'
  },
  active: {
    title: '活跃内容明细',
    desc: '展示观察区间内有观看或互动变化的内容集合。',
    condition: '临时条件：观看、点赞、评论或分享任一指标发生变化',
    insight: '活跃内容 42 条；其中 13 条由自动追踪新增。',
    display: '看清哪些内容近期有数据变化，以及变化来自观看还是互动。',
    process: '可快速定位活跃内容、查看自动追踪新增，或应用为列表筛选。',
    quickActions: ['查看活跃内容', '只看自动追踪新增', '应用为活跃筛选'],
    columns: ['内容', '变化类型', '来源', '状态'],
    rows: [
      ['Summer Routine 2026', '观看 + 互动', '自动追踪 / Rule A', '监控中'],
      ['Ingredient explainer shorts', '观看变化', '手动添加', '监控中'],
      ['Mini camera unboxing', '互动变化', '手动添加', '已完成'],
      ['GRWM weekend brunch', '评论变化', '自动追踪 / Rule C', '评论不足']
    ],
    action: '应用为活跃内容筛选'
  },
  attention: {
    title: '需关注内容明细',
    desc: '聚合低增长、配置缺失和数据不可解释内容，便于排查。',
    condition: '临时条件：低增长 / 评论不足 / 短链缺失 / 预算未填',
    insight: '需关注内容 7 条；优先处理短链缺失和预算未填，才能解释效率指标。',
    display: '看清每条内容为什么需要关注，以及会影响哪些指标。',
    process: '可直接进入评论状态、绑定短链、补充预算等处理动作。',
    quickActions: ['查看评论状态', '绑定短链', '补充预算'],
    rowActions: true,
    columns: ['内容', '原因', '影响指标', '建议动作'],
    rows: [
      ['Soft glam brunch GRWM', '评论样本不足', '评论分析', '查看评论状态'],
      ['30 days honest review', '低增长', '观看趋势', '检查投放节奏'],
      ['Mini camera unboxing', '短链未绑定', 'CTR', '绑定短链'],
      ['Creator haul recap', '预算未填写', 'CPV / CPM', '补充预算']
    ],
    action: '应用为需关注筛选'
  },
  rank: {
    title: '内容变化榜临时明细',
    desc: '展示当前榜单指标命中的内容集合。点击单个内容行仍进入单内容监控抽屉。',
    condition: '临时条件：按观看增量降序，展示 Top 内容',
    insight: 'Top 4 内容贡献了 71% 的观看增量，榜首由自动追踪规则命中。',
    display: '看清榜单命中内容、贡献指标和排序依据。',
    process: '可切换榜单指标，也可打开单内容抽屉查看任务配置与数据趋势。',
    quickActions: ['切换榜单指标', '打开单内容抽屉'],
    columns: ['内容', '观看', '点赞', 'ER'],
    rows: [
      ['Summer Routine 2026', '+18.2K', '+2.1K', '4.8%'],
      ['Mini camera unboxing', '+9.7K', '+1.4K', '6.2%'],
      ['Soft glam brunch GRWM', '+1.1K', '+320', '--'],
      ['30 days honest review', '+0', '+12', '1.3%']
    ],
    action: '应用榜单排序到列表'
  },
  efficiency: {
    title: '效率指标计算明细',
    desc: '解释效率指标为什么可算，并列出参与计算的内容和口径。',
    condition: '临时条件：短链已绑定、预算已填写、分子分母同观察区间',
    insight: 'CTR、CPV、CPM 当前可计算；自定义 CPC 依赖外部回填点击数。',
    display: '看清效率指标的分子、分母、缺失项和排除范围。',
    process: '可快速补充预算、绑定短链，或只看当前可计算内容。',
    quickActions: ['补充预算', '绑定短链', '查看可计算内容'],
    columns: ['指标', '当前值', '口径状态', '缺失影响'],
    rows: [
      ['CTR', '2.8%', '短链已绑定', '4 条未绑定不计入'],
      ['CPV', '$0.18', '预算已填写', '预算未填内容排除'],
      ['CPM', '$182', '同观察区间', '观看量为 0 时不可算'],
      ['自定义 CPC', '$0.42', '自定义点击已回填', '无回填时间则展示当前值']
    ],
    action: '应用为效率可计算筛选'
  },
  trust: {
    title: '数据可信度问题明细',
    desc: '列出影响解释和计算的缺失状态，帮助用户回到列表处理。',
    condition: '临时条件：评论不足 / 短链缺失 / 预算未填写 / 缺少基线点',
    insight: '预算未填写影响成本效率，短链缺失影响 CTR，评论不足影响评论分析。',
    display: '看清当前数据为什么不完整，以及分别影响哪些分析结论。',
    process: '可按问题类型快速处理，或把问题内容应用为列表筛选。',
    quickActions: ['查看评论状态', '绑定短链', '补充预算'],
    rowActions: true,
    columns: ['问题', '内容数', '影响指标', '处理入口'],
    rows: [
      ['评论数据不足', '12', '评论分析 / 情感解释', '查看评论状态'],
      ['未绑定短链', '4', 'CTR / 点击分析', '绑定短链'],
      ['预算未填写', '31', 'CPV / CPM', '补充预算'],
      ['缺少基线点', '5', '区间增量', '查看采样状态']
    ],
    action: '应用为数据问题筛选'
  }
}

function metricCards(compact = false) {
  const overview = overviewMetrics.map(([label, value, note]) => [label, value, note])
  if (compact) {
    return `<div class="compact-metrics">${overview.concat([['自动追踪新增', '13', '最近 7 天'], ['短链点击', '2.4K', '4 条未绑定']]).map(item => `<div class="compact-metric"><div class="metric-label">${item[0]}</div><div class="metric-value">${item[1]} <span class="metric-note">${item[2]}</span></div></div>`).join('')}</div>`
  }
  return `
    <section class="diagnostic-summary overview-summary">
      <div class="section-head"><div><h2 class="section-title">观察区间概览</h2><span class="section-sub">按数据观察周期快速理解当前内容集合的近期状态。</span></div></div>
      <div class="overview-layout">
        <div class="overview-group">
          <div class="overview-group-title">现状快照</div>
          <div class="metrics overview-metrics">${overviewMetrics.map(([label, value, delta, note]) => `<div class="metric overview-card">${metricHelp(note)}<span class="metric-label">${label}</span><div class="metric-value">${value}</div><span class="metric-delta">${delta}</span></div>`).join('')}</div>
        </div>
        <div class="overview-group action-overview-group">
          <div class="overview-group-title">待处理提示</div>
          <div class="overview-action-list">${overviewActions.map(([label, value, tag, note, filter]) => `<button class="overview-action-card" data-apply-list-filter="${filter}">${metricHelp(note)}<span><strong>${label}</strong><em>${tag}</em></span><b>${value}</b></button>`).join('')}</div>
        </div>
      </div>
    </section>`
}

function observationControl(mode = 'default') {
  const compact = mode === 'compact'
  return `
    <div class="observation-control ${compact ? 'compact-observation-control' : ''}" data-observation-control>
      <button class="observation-main" type="button" data-toggle-observation aria-expanded="false">
        <div>
          <span class="observation-label">${compact ? '统计口径 · 数据观察周期' : '数据观察周期'}</span>
          <strong class="observation-value">${observationRangeLabel}</strong>
        </div>
        <span class="observation-toggle-icon">⌄</span>
      </button>
      <div class="observation-popover" data-observation-popover hidden>
        <div class="observation-popover-head">
          <span>选择数据观察周期</span>
          <span class="help-dot" title="统计已监控内容在所选时间段内的数据变化；不等同于发布日期筛选。">?</span>
        </div>
        <div class="observation-presets">
          <button class="observation-chip active" type="button">近 7 天</button>
          <button class="observation-chip" type="button">近 30 天</button>
          <button class="observation-chip disabled" type="button" disabled title="观察周期结束日期早于发布日期起点，无法产生有效看板数据">上一周期</button>
          <button class="observation-chip" type="button">项目全周期</button>
          <button class="observation-chip" type="button">自定义</button>
        </div>
        <div class="observation-guard">
          <strong>发布日期联动规则</strong>
          <span>发布日期起点：2026-05-03；观察周期结束日期不能早于该日期。</span>
          <div class="observation-guard-actions">
            <button type="button">调整为发布日起 7 天</button>
            <button type="button">调整为与发布日期一致</button>
          </div>
        </div>
        <span class="observation-note">影响数据看板内的概览、趋势、榜单和贡献分析；不改变监控内容列表。</span>
      </div>
    </div>`
}

function rawMetricPanel() {
  return `
    <section id="raw-data-section" class="raw-metrics-panel raw-data-anchor">
      <div class="workbench-section-head raw-data-head">
        <div>
          <h2>原始数据</h2>
          <p>延续线上可配置数据块，贴近监控内容列表的当前统计上下文。</p>
        </div>
        <button class="btn btn-ghost" data-open-drawer="metric-config">配置数据块</button>
      </div>
      <div class="metrics raw-metrics">
        ${rawMetrics.map(([label, value, note, enabled]) => `<div class="metric ${enabled ? '' : 'muted-metric'}">${metricHelp(note)}<div class="metric-label">${label}</div><div class="metric-value">${value}</div></div>`).join('')}
      </div>
    </section>`
}

function rankList(title = '内容级变化榜') {
  const rows = [
    ['Summer Routine 2026', '+18.2K', '+2.1K', '+260', '+74', '4.8%', '自动追踪 / Rule A'],
    ['Mini camera unboxing', '+9.7K', '+1.4K', '+88', '+41', '6.2%', '手动添加'],
    ['Soft glam brunch GRWM', '+1.1K', '+320', '--', '+9', '--', '评论样本不足'],
    ['30 days honest review', '+0', '+12', '+2', '+0', '1.3%', '短链缺失']
  ]
  return `<section class="panel rank-panel"><div class="section-head"><div><h2 class="section-title">${title}</h2><span class="section-sub">榜单指标可切换；仅作为数据看板内分析，不改写监控内容列表。</span></div></div><div class="rank-metric-tabs"><span class="active">观看增量</span><span>Engagement</span><span>点赞</span><span>评论</span><span>分享</span><span>ER</span></div><div class="rank-table"><div class="rank-table-head"><span>内容</span><span>观看</span><span>点赞</span><span>评论</span><span>分享</span><span>ER</span></div>${rows.map((r, i) => `<button class="rank-table-row" data-open-drawer="content-detail"><div><span class="rank-index">${i + 1}</span><div><div class="rank-title">${r[0]}</div><div class="rank-meta">${r[6]}</div></div></div><strong>${r[1]}</strong><span>${r[2]}</span><span>${r[3]}</span><span>${r[4]}</span><span>${r[5]}</span></button>`).join('')}</div></section>`
}

function contributionPanel() {
  const rows = [
    ['Lena Beauty Lab', '46%', '+196.4K', '18.2K', '1.1K', '8'],
    ['Mika Studio', '24%', '+102.8K', '9.6K', '860', '6'],
    ['Ava Daily', '13%', '+55.7K', '4.1K', '320', '5'],
    ['TechSkin Review', '8%', '+34.2K', '1.8K', '120', '4']
  ]
  return `<section class="panel contribution-panel"><div class="section-head"><div><h2 class="section-title">达人 / 频道贡献</h2><span class="section-sub">可切换指标查看贡献来源；如需切片分析，使用平台 Tab、搜索或后续独立的创作者/频道筛选。</span></div></div><div class="rank-metric-tabs contribution-tabs"><span class="active">观看增量</span><span>Engagement</span><span>短链点击</span><span>内容数</span></div><div class="contribution-table"><div class="contribution-head"><span>达人 / 频道</span><span>贡献占比</span><span>观看</span><span>Engagement</span><span>短链点击</span><span>内容数</span></div>${rows.map(n => `<button class="contribution-row" data-open-drawer="channel-detail"><div class="progress-name">${n[0]}</div><div class="contribution-progress"><div class="progress-track"><div class="progress-fill" style="width:${n[1]}"></div></div><strong>${n[1]}</strong></div><span>${n[2]}</span><span>${n[3]}</span><span>${n[4]}</span><span>${n[5]}</span></button>`).join('')}</div></section>`
}

function formatMetricValue(value, metric = 'views') {
  if (metric === 'content') return String(value)
  if (value >= 1000000) return `${(value / 1000000).toFixed(2)}M`
  if (value >= 1000) return `${(value / 1000).toFixed(value >= 10000 ? 1 : 0)}K`
  return String(value)
}

function tagContributionPanel() {
  return `<section class="panel tag-contribution-panel" data-tag-contribution>
    <div class="section-head">
      <div>
        <h2 class="section-title">标签贡献分析</h2>
        <span class="section-sub">按当前筛选集合查看标签表现；可在观察期增量和当前累计值之间切换。</span>
      </div>
    </div>
    <div class="tag-toolbar">
      <div class="segmented-control" data-tag-mode>
        <button class="active" data-mode="delta" type="button">观察期增量</button>
        <button data-mode="snapshot" type="button">当前累计值</button>
      </div>
      <div class="rank-metric-tabs tag-metric-tabs" data-tag-metrics>
        ${Object.entries(tagMetricLabels).map(([key, label], index) => `<button class="${index === 0 ? 'active' : ''}" data-metric="${key}" type="button">${label}</button>`).join('')}
      </div>
    </div>
    <div class="tag-scope-note" data-tag-note>${tagModeNotes.delta}</div>
    <div class="tag-analysis-layout">
      <div class="tag-bars" data-tag-bars></div>
      <div class="tag-donut-card">
        <div class="donut-chart" data-tag-donut></div>
        <div class="donut-legend" data-tag-legend></div>
      </div>
    </div>
    <div class="tag-table" data-tag-table></div>
  </section>`
}

function trendPanel(title = '关键指标趋势') {
  return `<section class="panel"><div class="section-head"><h2 class="section-title">${title}</h2><span class="section-sub">默认展示可观测增长；效率指标仅同口径时进入。</span></div><div class="trend-tabs"><span class="active">观看量</span><span>Engagement</span><span>短链点击</span><span class="disabled">CPV 口径不足</span></div><div class="chart"><div class="chart-line"></div><div class="chart-line alt"></div></div></section>`
}

function archivedBarsPanel() {
  return `<section class="panel"><div class="section-head"><h2 class="section-title">平台切片</h2><span class="section-sub">归档参考模块，不进入当前主工作台。</span></div><div class="bars">${[['YT', 78], ['TT', 62], ['IG', 34], ['X', 20]].map(b => `<div class="bar"><div class="bar-fill" style="height:${b[1]}%"></div><div class="bar-name">${b[0]}</div></div>`).join('')}</div></section>`
}

function efficiencyPanel() {
  const items = [
    ['可计算效率指标', '3 项', 'CTR、CPV、CPM 在当前观察区间内分子分母同口径，可在原始数据中查看数值。', 'CTR / CPV / CPM'],
    ['短链覆盖缺口', '4 条', '未绑定 Nox 短链的内容不计入 CTR，需要补充短链后才能解释点击效率。', '影响 CTR'],
    ['预算填写缺口', '31 条', '预算/成本需要用户手动填写；未填写内容不参与 CPV、CPM 计算。', '影响 CPV / CPM'],
    ['自定义口径待确认', '1 项', '自定义 CPC 依赖外部回填点击数，缺少回填时间时只展示当前值。', 'CPC']
  ]
  return `<section class="panel efficiency-panel"><div class="section-head"><h2 class="section-title">效率指标观察</h2><span class="section-sub">只解释效率指标的可计算性和缺口；具体数值在原始数据中展示。</span></div><div class="efficiency-grid">${items.map(([label, value, desc, state], index) => `<button class="efficiency-item" data-apply-list-filter="${index === 0 ? 'efficiency-ready' : index === 1 ? 'shortlink-gap' : index === 2 ? 'budget-gap' : 'custom-metric'}">${metricHelp(desc)}<div><strong>${label}</strong></div><em>${value}</em><i>${state}</i></button>`).join('')}</div></section>`
}

function trustPanel(cross = false) {
  const states = [
    ['评论数据不足', `${cross ? 21 : 12} 条内容`, '影响评论/情感解释'],
    ['未绑定短链', `${cross ? 9 : 4} 条内容`, '影响 CTR / 点击分析'],
    ['预算未填写', `${cross ? 48 : 31} 条内容`, '影响 CPV / CPM'],
    ['缺少基线点', `${cross ? 8 : 5} 条内容`, '区间增量为部分统计']
  ]
  return `<section class="panel tint trust-panel"><div class="section-head"><h2 class="section-title">数据可信度</h2><span class="section-sub">解释为什么部分指标不可计算，并把用户带回列表处理。</span></div><div class="state-list">${states.map(([label, value, desc], index) => `<button class="state-row" data-apply-list-filter="${['comment-gap', 'shortlink-gap', 'budget-gap', 'baseline-gap'][index]}">${metricHelp(desc)}<span><strong>${label}</strong></span><b>${value}</b></button>`).join('')}</div></section>`
}

function drilldownPurpose(view) {
  return `<div class="drilldown-purpose-grid">
    <div><span>展示重点</span><strong>${view.display}</strong></div>
    <div><span>快速处理</span><strong>${view.process}</strong></div>
  </div>`
}

function quickActionStrip(actions = []) {
  return `<div class="quick-action-panel">
    <div><strong>快速处理</strong><span>以下为轻量处理入口；不会自动改变主列表筛选。</span></div>
    <div class="quick-action-strip">${actions.map(action => `<button class="quick-action" type="button">${action}</button>`).join('')}</div>
  </div>`
}

function drilldownDrawer() {
  const viewOptions = Object.entries(drilldownViews)
    .map(([key, view]) => `<section class="drilldown-view" data-drilldown-panel="${key}" ${key === 'rank' ? '' : 'hidden'}>
      <div class="drilldown-context"><span>当前范围：May Creator Launch</span><span>数据观察：${observationRangeLabel}</span><span>${view.condition}</span></div>
      ${drilldownPurpose(view)}
      <div class="temporary-filter"><strong>${view.condition.replace('临时条件：', '')}</strong><p>${view.insight}</p></div>
      ${quickActionStrip(view.quickActions)}
      <div class="drilldown-result-head">${view.columns.map(column => `<span>${column}</span>`).join('')}</div>
      <div class="drilldown-mini-table">
        ${view.rows.map(row => `<div class="drilldown-row drilldown-row-${view.columns.length}">${row.map((cell, index) => {
          if (index === 0) return `<div><strong>${cell}</strong><span>${view.desc}</span></div>`
          if (index === 1) return `<em>${cell}</em>`
          if (view.rowActions && index === row.length - 1) return `<button class="inline-action" type="button">${cell}</button>`
          return `<b>${cell}</b>`
        }).join('')}</div>`).join('')}
      </div>
    </section>`)
    .join('')
  return `
    <aside class="config-drawer drilldown-drawer" data-config-drawer="drilldown-view" hidden>
      <div class="config-drawer-head"><div><h2 data-drilldown-title>${drilldownViews.rank.title}</h2><p data-drilldown-desc>${drilldownViews.rank.desc}</p></div><button class="drawer-close" data-close-drawer>×</button></div>
      <div class="drilldown-body">
        ${viewOptions}
      </div>
      <div class="config-drawer-foot"><button class="btn btn-light" data-close-drawer>关闭</button><button class="btn btn-primary" data-close-drawer data-drilldown-action>${drilldownViews.rank.action}</button></div>
    </aside>`
}

function contentDetailDrawer() {
  return `
    <aside class="config-drawer drilldown-drawer task-detail-drawer" data-config-drawer="content-detail" hidden>
      <div class="config-drawer-head"><div><h2>单内容监控</h2><p>单条监控任务详情：内容身份、监控配置、数据趋势与分析状态。</p></div><button class="drawer-close" data-close-drawer>×</button></div>
      <div class="drilldown-body">
        ${isNotificationEntry ? `<div class="notification-entry-note"><strong>来自自动追踪通知</strong><span>通知每小时汇总发送；当前链接定位到任务 ${notificationTaskId}，并自动打开本任务抽屉。</span></div>` : ''}
        <section class="detail-hero">
          <div class="detail-thumb"><span>51:55</span></div>
          <div class="detail-main">
            <div class="detail-platform"><span class="platform-badge">YouTube</span><span class="chip green">监控中</span></div>
            <h3>[LIVE] Windrose - Is it worth buying? Duo w/ DM testing it out</h3>
            <p>KiraC's Vault Pass in PoE here! Get yourself a HANDBUILT Beefy Computer without breaking your wallet HERE...</p>
            <div class="detail-creator"><span class="avatar"></span><strong>GhazzyTV</strong><span>@GhazzyTV</span><span>2026-04-15 22:59</span></div>
            <a class="detail-link" href="#">https://www.youtube.com/watch?v=MmXLgSF7...</a>
          </div>
          <button class="btn btn-light">导出</button>
        </section>
        <section class="monitor-config-panel">
          <div class="config-panel-title">监控配置</div>
          <div class="config-field"><span>所属项目</span><strong>May Creator Launch</strong><button>✎</button></div>
          <div class="config-field"><span>任务负责人</span><strong>待确认字段</strong><button>✎</button></div>
          <div class="config-field"><span>监控时长</span><strong>2026-04-15 ~ 2026-06-14</strong><button>✎</button></div>
          <div class="config-field"><span>合作视频/贴文链接</span><strong>youtube.com/watch?v=MmXLgSF7...</strong></div>
          <div class="config-field"><span>视频标签</span><em>+ 添加视频标签</em></div>
          <div class="config-field"><span>额外标签1</span><em>+ 添加额外标签1</em></div>
          <div class="config-field"><span>额外标签2</span><em>+ 添加额外标签2</em></div>
          <div class="config-field"><span>Nox 短链</span><em>+ 添加Nox短链</em></div>
          <div class="config-field"><span>预算/成本</span><em>未填写 · 手动填写</em><button>✎</button></div>
          <div class="config-field"><span>视频备注</span><em>+ 添加备注</em></div>
          <div class="config-field"><span>来源</span><strong>自动追踪 / Rule A</strong></div>
        </section>
        <section class="detail-section">
          <div class="detail-section-head"><div><h3>数据总览</h3><p>继承项目工作台原始数据块配置。</p></div></div>
          <div class="detail-metric-grid">
            ${[
              ['观看量', '1,427'], ['点赞数', '14'], ['评论数', '0'], ['分享数', '0'], ['互动率', '0.98%'], ['CPV', '0'], ['自定义数据', '--']
            ].map(([label, value]) => `<div class="detail-metric"><span>${label}</span><strong>${value}</strong></div>`).join('')}
          </div>
        </section>
        <section class="detail-section">
          <div class="detail-section-head"><h3>视频/贴文数据趋势</h3><div class="detail-tools"><button class="btn btn-light btn-sm" type="button">导出数据</button><span class="view-switch"><span class="active">⌁</span><span>☷</span></span><span class="select">2026-03-13 ~ 2026-05-12</span></div></div>
          <div class="trend-snapshot-row">
            <div><span>观看量</span><strong>1,427</strong></div>
            <div><span>点赞数</span><strong>14</strong></div>
            <div><span>评论数</span><strong>0</strong></div>
            <div><span>Nox短链点击数</span><strong>0</strong></div>
          </div>
          <div class="trend-legend"><span class="blue-line">观看量</span><span class="green-line">点赞数</span><span class="yellow-line">评论数</span><span class="orange-line">Nox短链点击数</span></div>
          <div class="chart drawer-chart"><div class="chart-line"></div><div class="chart-line alt"></div></div>
        </section>
        <section class="detail-section">
          <div class="detail-section-head"><h3>单条看板解释</h3><p>只解释当前内容自身，不展示项目级排名。</p></div>
          <div class="detail-dashboard-grid">
            <div class="detail-mini-panel">
              <strong>Engagement 构成</strong>
              <div class="stack-bar"><span style="width:82%"></span><span style="width:13%"></span><span style="width:5%"></span></div>
              <div class="mini-legend"><span>点赞 82%</span><span>评论 13%</span><span>分享 5%</span></div>
            </div>
            <div class="detail-mini-panel">
              <strong>效率指标状态</strong>
              <div class="state-list compact-state-list"><div class="state-row"><span>CTR</span><b>短链未绑定</b></div><div class="state-row"><span>CPV / CPM</span><b>预算未填写</b></div></div>
            </div>
          </div>
        </section>
        <section class="detail-section">
          <div class="detail-section-head"><h3>Nox短链点击数据分布（位置和设备）</h3></div>
          <div class="shortlink-empty">
            <div class="map-placeholder">暂无数据</div>
            <div class="device-rings"><span>安卓<br><b>0.00%</b></span><span>网页<br><b>0.00%</b></span><span>IOS<br><b>0.00%</b></span></div>
          </div>
        </section>
        <section class="detail-section">
          <div class="detail-section-head"><h3>评论情感分析</h3></div>
          <div class="comment-empty"><div class="donut-placeholder"></div><span>暂无数据</span></div>
        </section>
        <section class="detail-section">
          <div class="detail-section-head"><h3>评论高频词</h3></div>
          <div class="empty-line">暂无可分析评论数据</div>
        </section>
      </div>
      <div class="config-drawer-foot"><button class="btn btn-light" data-close-drawer>关闭</button><button class="btn btn-primary" data-close-drawer>打开原视频</button></div>
    </aside>`
}

function channelDetailDrawer() {
  return `
    <aside class="config-drawer drilldown-drawer" data-config-drawer="channel-detail" hidden>
      <div class="config-drawer-head"><div><h2>频道相关内容</h2><p>聚合当前项目范围内该达人/频道关联的监控内容。</p></div><button class="drawer-close" data-close-drawer>×</button></div>
      <div class="drilldown-body">
        <div class="drilldown-context"><span>频道：Lena Beauty Lab</span><span>当前范围：May Creator Launch</span><span>数据观察：${observationRangeLabel}</span></div>
        <div class="drilldown-purpose-grid">
          <div><span>展示重点</span><strong>看清该频道在当前范围内贡献了哪些内容和变化。</strong></div>
          <div><span>快速处理</span><strong>可快速进入频道内容集合，或应用为列表筛选继续批量处理。</strong></div>
        </div>
        ${quickActionStrip(['查看该频道内容', '只看短链缺失', '应用为列表筛选'])}
        <div class="drilldown-mini-table">
          ${[
            ['Summer Routine 2026', '+18.2K', 'YouTube', '监控中'],
            ['Night routine follow-up', '+6.4K', 'TikTok', '监控中'],
            ['Ingredient explainer shorts', '+2.1K', 'Instagram', '短链缺失']
          ].map(row => `<div class="drilldown-row"><div><strong>${row[0]}</strong><span>${row[2]}</span></div><em>${row[1]}</em><b>${row[3]}</b></div>`).join('')}
        </div>
      </div>
      <div class="config-drawer-foot"><button class="btn btn-light" data-close-drawer>关闭</button><button class="btn btn-primary" data-close-drawer>应用为列表筛选</button></div>
    </aside>`
}

function configDrawers() {
  const requiredMetricNames = ['观看量', '点赞数', '评论数', '分享数', '互动率']
  const metricItems = ['观看量', '点赞数', '评论数', '分享数', 'Engagement 总量', '互动率', 'Nox 短链点击数', '预算消耗', 'CPM', 'CPV', 'CTR'].map((name, index) => [name, index < 7, requiredMetricNames.includes(name)])
  const columnItems = [
    ['内容', true, true],
    ['所属项目', initialScope !== 'single'],
    ['观看量', true],
    ['近期观看量趋势', true],
    ['点赞数', true],
    ['评论数', true],
    ['分享数', true],
    ['收藏', false],
    ['点击数', false],
    ['互动率', true],
    ['进度', true],
    ['预估视频价值', false],
    ['预算消耗', true],
    ['CPM', false],
    ['CPV', false],
    ['状态', false],
    ['地区', false],
    ['内容类型', false],
    ['视频标签', false],
    ['额外标签1', false],
    ['额外标签2', false],
    ['备注', false],
    ['任务负责人', false],
    ['创建人', false],
    ['监控时长', false],
    ['发布日期', false],
    ['来源', true],
    ['新增时间', true],
    ['Nox短链点击数', true]
  ]
  const drawer = (id, title, desc, items) => `
    <aside class="config-drawer" data-config-drawer="${id}" hidden>
      <div class="config-drawer-head"><div><h2>${title}</h2><p>${desc}</p></div><button class="drawer-close" data-close-drawer>×</button></div>
      <div class="config-list">${items.map(([label, enabled, fixed]) => `<div class="config-row ${fixed ? 'fixed-config-row' : ''}"><span class="drag-handle ${fixed ? 'fixed-handle' : ''}">${fixed ? '必选' : '⋮⋮'}</span><span class="config-name">${label}</span><button class="switch ${enabled ? 'on' : ''}" ${fixed ? 'disabled title="该指标与线上必选项一致，不能隐藏或排序"' : 'data-switch'}><span></span></button></div>`).join('')}</div>
      <div class="config-drawer-foot"><button class="btn btn-light" data-close-drawer>取消</button><button class="btn btn-primary" data-close-drawer>保存为账号配置</button></div>
    </aside>`
  return `<div class="drawer-mask" data-drawer-mask hidden></div>${scopeEditorDrawer()}${drilldownDrawer()}${contentDetailDrawer()}${channelDetailDrawer()}${drawer('metric-config', '配置原始数据块', '控制原始数据块的展示项。成本和效率类指标依赖用户填写或短链配置，默认不强展示。', metricItems)}${drawer('column-config', '配置表头', '账号级配置：可显示/隐藏字段，也可拖动排序。', columnItems)}`
}

function sparkline(index) {
  const paths = [
    'M2 28 C14 23 20 16 30 17 S46 24 58 8',
    'M2 26 C14 24 22 22 31 18 S47 10 58 12',
    'M2 16 C13 18 22 18 31 20 S48 22 58 24',
    'M2 18 C14 18 22 18 31 18 S47 18 58 18',
    'M2 27 C16 21 25 18 34 13 S49 10 58 6',
    'M2 22 C16 24 24 19 34 17 S49 12 58 14'
  ]
  return `<svg class="inline-sparkline" viewBox="0 0 60 32" role="img" aria-label="近期观看量趋势"><path d="${paths[index % paths.length]}"></path></svg>`
}

function shortlinkCell(row) {
  if (row.shortlinkStatus === '已绑定') return `<span>${row.shortClicks}</span>`
  return `<span>${row.shortClicks}</span><button class="cell-action" type="button" data-open-drawer="content-detail">绑定</button>`
}

function budgetCell(row) {
  if (row.budgetStatus === '已填写') return `<span>${row.budget}</span>`
  return `<span>${row.budget}</span><button class="cell-action" type="button" data-open-drawer="content-detail">填写</button>`
}

function table() {
  const isCrossProject = initialScope !== 'single'
  return `
    <div class="table-wrap"><table>
      <thead><tr><th class="select-col"><input type="checkbox" aria-label="选择全部" data-select-all-rows></th><th style="width:24%">内容</th>${isCrossProject ? '<th style="width:12%">所属项目</th>' : ''}<th><button class="sort-head" data-apply-list-filter="views">观看量</button></th><th>近期观看量趋势</th><th>点赞数</th><th>评论数</th><th>分享数</th><th><button class="sort-head" data-apply-list-filter="er">互动率</button></th><th>进度</th><th>Nox短链点击</th><th>预算消耗</th><th style="width:12%">来源</th><th>新增时间</th><th class="table-config-head"><button class="icon-btn" data-open-drawer="column-config" title="配置表头" aria-label="配置表头">⚙</button></th></tr></thead>
      <tbody>${rows.map((row, index) => `<tr data-content-row data-open-task-detail><td class="select-col"><input type="checkbox" aria-label="选择 ${row.title}" data-content-check></td><td><div class="content-cell"><div class="thumb"><span class="platform">${row.platform}</span></div><div class="nowrap"><div class="cell-title">${row.title}</div><div class="cell-sub">${row.creator}</div></div></div></td>${isCrossProject ? `<td><span class="chip blue">${row.project}</span></td>` : ''}<td>${row.views}</td><td>${sparkline(index)}</td><td>${row.likes}</td><td><span>${row.comments}</span>${row.commentStatus !== '正常' ? `<span class="cell-state">${row.commentStatus}</span>` : ''}</td><td>${row.shares}</td><td>${row.er}</td><td><div class="monitor-progress"><span class="cell-sub">${row.progress} ${row.pct}%</span><div class="progress-track"><div class="progress-fill" style="width:${row.pct}%"></div></div></div></td><td>${shortlinkCell(row)}</td><td>${budgetCell(row)}</td><td>${row.source}</td><td>${row.createdAt}</td><td>${index === 0 ? '<span class="row-hint">详情</span>' : ''}</td></tr>`).join('')}</tbody>
    </table></div>`
}

function contentListSection() {
  return `
    <section id="content-list-section" class="content-list-anchor">
      <div class="workbench-section-head">
        <div>
          <h2>监控内容 <span class="count-badge">128</span></h2>
          <p>继承当前项目范围和筛选上下文，用于下钻具体内容。</p>
        </div>
        <div class="header-actions"><button class="btn btn-light btn-sm" data-export-action="current-view">导出当前视图 XLSX</button><div class="view-switch"><span>▦</span><span class="active">☰</span></div></div>
      </div>
      <div class="list-filter-panel">
        <div class="list-filter-head">
          <div><strong>列表内处理筛选</strong><span>只用于定位需要查看或处理的任务，不改变数据看板、原始数据和贡献分析。</span></div>
          <button class="btn btn-light">清空列表筛选</button>
        </div>
        <div class="list-filter-notice" data-list-filter-notice hidden>已应用列表筛选；当前条件只影响下方监控内容列表。</div>
        <div class="list-filter-row">
          ${secondaryFilterOptions.map(([label, options]) => filterSelect(label, options)).join('')}
        </div>
        <div class="applied-filter-line" data-applied-filter-line hidden><span class="tag-label">已应用列表条件</span><span class="filter-tag local applied-filter" data-applied-filter></span></div>
      </div>
      <div class="content-batch-bar" data-content-batch-bar hidden>
        <span data-content-selected-count>已选 0 条内容</span>
        <button class="btn btn-light">移动到其他项目</button>
        <button class="btn btn-light">打标签</button>
        <button class="btn btn-light">修改任务负责人</button>
        <button class="btn btn-light">修改监控时长</button>
        <button class="btn btn-light">导出</button>
        <button class="btn btn-danger">删除</button>
      </div>
      ${table()}
    </section>`
}

function dashboardSection(cross = false) {
  return `
    <section id="dashboard-section" class="dashboard-anchor">
      <div class="workbench-section-head dashboard-head">
        <div>
          <h2>数据看板</h2>
          <p>诊断观察区间内的内容变化与近期动向；效率与可信度提醒稍后统一重构。</p>
        </div>
        <div class="dashboard-actions">${observationControl()}<button class="btn btn-light btn-sm" data-export-action="dashboard">导出看板 XLSX</button></div>
      </div>
      ${metricCards()}
      <div class="grid-2 mb-20">${rankList(cross ? '跨项目内容变化榜' : '内容变化榜')}${trendPanel(cross ? '跨项目关键指标趋势' : '关键指标趋势')}</div>
      ${contributionPanel()}
      ${tagContributionPanel()}
    </section>`
}

function optionA() {
  return shell(`${workbenchHeader()}<div class="page"><div class="monitor-container">${toolbar()}${workbenchAnchors()}${dashboardSection(false)}${rawMetricPanel()}${contentListSection()}</div></div>${configDrawers()}`)
}

function optionD() {
  return shell(`${workbenchHeader()}<div class="page"><div class="monitor-container">${toolbar()}${workbenchAnchors()}${dashboardSection(true)}${rawMetricPanel()}${contentListSection()}</div></div>${configDrawers()}`)
}

function drawerPreview() {
  return `<aside class="drawer-preview"><h2 class="drawer-title">任务详情抽屉 · 状态解释</h2><p class="note">单条内容不升级为独立页，重点解释数据为什么为空或不可计算。</p><div class="drawer-section"><div class="state-list"><div class="state-row"><span>评论分析</span><strong>样本过少</strong></div><div class="state-row"><span>Nox 短链</span><strong>已绑定无点击</strong></div><div class="state-row"><span>预算消耗</span><strong>用户未填写</strong></div><div class="state-row"><span>自动追踪来源</span><strong>Rule A</strong></div></div></div><div class="drawer-section"><div class="section-head"><h2 class="section-title">单条趋势</h2></div><div class="chart" style="height:180px"><div class="chart-line"></div></div></div></aside>`
}

function projectRow(name, checked, views, er, issues, autoCount, status = '运行中') {
  const archived = status === '已归档'
  return `<div class="project-card-row ${checked ? 'selected' : ''} ${archived ? 'archived' : ''}" data-project-card data-project-status="${status}" data-selected="${checked ? 'true' : 'false'}"><div><h2 class="project-title"><button class="row-check" data-row-check>${checked ? '☑' : '☐'}</button> ${name}</h2><div class="project-meta"><span class="avatar"></span><span>Yuki Chen</span><span class="divider"></span><span>协作者 4</span><span class="divider"></span><span>2026-04-18</span>${archived ? '<span class="divider"></span><span>不再自动新增</span>' : ''}</div></div><div class="project-data"><div><strong>${views}</strong><div class="data-label">7天观看</div></div><div><strong>${er}</strong><div class="data-label">7天互动率</div></div><div><strong>${issues}</strong><div class="data-label">需关注</div></div><div><strong>${archived ? '暂停' : autoCount}</strong><div class="data-label">自动新增</div></div><div><strong>YT TT IG</strong><div class="data-label">平台</div></div></div><div class="project-actions"><span class="chip ${archived ? 'gray' : 'green'}">${status}</span>${archived ? '<span class="archive-action-hint">点击查看历史</span>' : '<button class="btn btn-light btn-sm" data-archive-project>归档</button>'}</div></div>`
}

function pagination() {
  return `<div class="pagination" data-pagination><span class="pagination-total">共 128 条</span><button class="page-btn disabled" data-page-prev>上一页</button><button class="page-btn active" data-page="1">1</button><button class="page-btn" data-page="2">2</button><button class="page-btn" data-page="3">3</button><span class="page-ellipsis">...</span><button class="page-btn" data-page="13">13</button><button class="page-btn" data-page-next>下一页</button><span class="page-size">10 条/页</span></div>`
}

function projectListPage() {
  return shell(`
    <div class="page">
      <div class="list-header"><div><h1>内容监控项目列表</h1><p>一级实体页面。用户从这里进入内容监控工作台，并由项目范围决定单项目、已选项目或全部项目视角。</p></div><div class="header-actions"><button class="btn btn-primary">创建项目</button></div></div>
      <section class="overview-panel"><div class="section-head"><div><h2 class="section-title">项目近期概览</h2><p class="section-sub">此处按独立的概览口径统计，不受下方卡片列表筛选影响。</p></div><button class="btn btn-ghost" data-nav="./option-d-ia-transition.html" data-scope="all">查看全部项目内容</button></div><div class="overview-filters">${projectOverviewFilterOptions.map(([label, options]) => filterSelect(label, options)).join('')}</div>${metricCards(true)}</section>
      <section class="project-list-panel" data-project-list-panel>
        <div class="section-head"><div><h2 class="section-title">项目列表</h2><p class="section-sub">下方筛选只决定卡片显示，不改变上方概览数据。</p></div><div class="header-actions"><button class="btn btn-light" data-toggle-batch>多选项目</button><button class="btn btn-light" data-cancel-batch hidden>取消多选</button></div></div>
        <div class="project-list-tools">${projectCardFilterOptions.map(([label, options]) => filterSelect(label, options)).join('')}<div class="search">搜索项目名称</div></div>
        <div class="batch-action-bar" data-batch-bar hidden><span data-selected-count>已选 0 个项目</span><button class="btn btn-primary" data-selected-action data-nav="./option-d-ia-transition.html" data-scope="selected" disabled>查看已选项目内容</button></div>
        <div class="project-list">${projectRow('May Creator Launch', false, '188.4K', '5.8%', 7, 13)}${projectRow('Beauty Review', false, '96.1K', '4.2%', 8, 4)}${projectRow('TikTok Spring Test', false, '73.6K', '6.7%', 6, 9)}${projectRow('Camera Trial', false, '29.8K', '2.1%', 1, 0)}${projectRow('Holiday Seeding', false, '12.6K', '2.9%', 3, 1, '已归档')}</div>
        ${pagination()}
      </section>
    </div>`)
}

function optionB() {
  return shell(`${projectHeader(pages.b)}<div class="page"><div class="monitor-container">${toolbar()}${metricCards(true)}<div class="ops-layout"><section><div class="content-tabs" style="margin-top:0"><div class="tab-list"><span class="title-tab active">监控内容 <span class="count-badge">128</span></span></div><div><button class="btn btn-light">批量标签</button><button class="btn btn-light">批量续期</button></div></div>${table()}</section><aside class="panel tint"><div class="section-head"><h2 class="section-title">运营关注队列</h2><span class="section-sub">从当前筛选生成</span></div>${rankList('快速变化内容')}</aside></div></div></div>${drawerPreview()}`)
}

function optionC() {
  return shell(`${projectHeader(pages.c)}<div class="page"><div class="monitor-container">${toolbar()}${metricCards()}<div class="board-hero">${trendPanel('项目近期表现看板')}<div>${contributionPanel()}<div class="mt-20">${rankList('内容贡献 Top')}</div></div></div><div class="board-grid">${archivedBarsPanel()}<section class="panel"><div class="section-head"><h2 class="section-title">内容变化矩阵</h2></div><div class="trust-grid"><div class="trust-card"><span class="chip orange">爆发</span><div class="metric-value">11</div><div class="note">观看增量 Top</div></div><div class="trust-card"><span class="chip blue">低增长</span><div class="metric-value">18</div><div class="note">需判断是否停滞</div></div><div class="trust-card"><span class="chip red">不可解释</span><div class="metric-value">7</div><div class="note">评论/短链/预算状态</div></div></div></section><section class="panel tint"><div class="section-head"><h2 class="section-title">可信度提示</h2></div><p class="note">评论获取能力不扩展；当前仅展示已有评论数据及空态原因。成本指标依赖用户手动填写。</p></section></div>${contentListSection()}</div></div>`)
}

function indexPage() {
  return shell(`
    <div class="page index-page">
      <div class="index-hero"><h1>内容监控 761 · 统一工作台 Demo</h1><p>本组 Demo 直接参考 kol-next 内容监控真实页面结构和样式。当前主结构为：项目列表 > 内容监控工作台。工作台通过项目范围承载单项目、已选多项目和全部可见项目三种状态；B/C 已归档，仅作为局部组件思路参考。</p></div>
      <div class="index-section-title">主要实体页面</div>
      <div class="option-grid">${['list', 'a'].map(key => `<a class="option-card" href="${key === 'list' ? './project-list.html' : './option-a-project-workbench.html'}"><span class="option-tag">${pages[key].tag}</span><h2>${pages[key].title}</h2><p>${pages[key].desc}</p></a>`).join('')}</div>
      <div class="index-section-title archived">兼容入口 / 归档参考</div>
      <div class="option-grid archived">${['d', 'b', 'c'].map(key => `<a class="option-card archived" href="${{ d: './option-d-ia-transition.html', b: './option-b-list-ops.html', c: './option-c-dashboard-board.html' }[key]}"><span class="option-tag muted-tag">${pages[key].tag}</span><h2>${pages[key].title}</h2><p>${pages[key].desc}</p></a>`).join('')}</div>
    </div>`)
}

const renderMap = { index: indexPage, list: projectListPage, a: optionA, b: optionB, c: optionC, d: optionD }
document.getElementById('app').innerHTML = renderMap[option]()

function archiveConfirmDialog() {
  return `
    <div class="confirm-mask" data-confirm-mask hidden>
      <section class="confirm-dialog" role="dialog" aria-modal="true" aria-labelledby="archive-dialog-title">
        <div class="confirm-kicker">项目生命周期</div>
        <h2 id="archive-dialog-title">确认归档项目</h2>
        <div class="confirm-project" data-confirm-project>当前项目</div>
        <p>归档后，项目从默认项目列表退出；历史数据、内容列表和任务详情仍可查看。</p>
        <ul>
          <li>添加监控与自动追踪新增将暂停。</li>
          <li>已存在监控任务继续更新到原监控结束时间。</li>
          <li>如需停止采集，请单独结束或批量调整监控任务。</li>
        </ul>
        <div class="confirm-actions">
          <button class="btn btn-light" data-close-confirm>取消</button>
          <button class="btn btn-primary" data-confirm-archive>确认归档</button>
        </div>
      </section>
    </div>`
}

document.getElementById('app').insertAdjacentHTML('beforeend', archiveConfirmDialog())

function navigateTo(target, scope) {
  if (!target) return
  if (scope) setStoredScope(scope)
  window.location.href = target
}

function setArchivedPreview(enabled) {
  const params = new URLSearchParams(window.location.search)
  if (enabled) params.set('projectStatus', 'archived')
  else params.delete('projectStatus')
  const query = params.toString()
  window.location.href = `${window.location.pathname}${query ? `?${query}` : ''}${window.location.hash}`
}

function openArchiveConfirm(projectName = '当前项目') {
  pendingArchiveProjectName = projectName
  const mask = document.querySelector('[data-confirm-mask]')
  const project = document.querySelector('[data-confirm-project]')
  if (project) project.textContent = projectName
  if (mask) mask.hidden = false
}

function closeArchiveConfirm() {
  const mask = document.querySelector('[data-confirm-mask]')
  if (mask) mask.hidden = true
  pendingArchiveCard = null
  pendingArchiveProjectName = '当前项目'
}

function archiveProjectCard(card) {
  if (!card) return
  card.classList.add('archived')
  card.dataset.projectStatus = '已归档'
  const autoMetric = card.querySelector('.project-data > div:nth-child(4) strong')
  if (autoMetric) autoMetric.textContent = '暂停'
  const actions = card.querySelector('.project-actions')
  if (actions) {
    actions.innerHTML = '<span class="chip gray">已归档</span><span class="archive-action-hint">点击查看历史</span>'
  }
  const meta = card.querySelector('.project-meta')
  if (meta && !meta.textContent.includes('不再自动新增')) {
    meta.insertAdjacentHTML('beforeend', '<span class="divider"></span><span>不再自动新增</span>')
  }
}

function updateProjectCard(card, selected) {
  card.dataset.selected = selected ? 'true' : 'false'
  card.classList.toggle('selected', selected)
  const check = card.querySelector('[data-row-check]')
  if (check) check.textContent = selected ? '☑' : '☐'
  updateBatchCount()
}

function updateBatchCount() {
  const count = document.querySelectorAll('[data-project-card].selected').length
  const countEl = document.querySelector('[data-selected-count]')
  if (countEl) countEl.textContent = `已选 ${count} 个项目`
  const action = document.querySelector('[data-selected-action]')
  if (action) {
    action.disabled = count === 0
    action.classList.toggle('disabled', count === 0)
  }
}

function setBatchMode(enabled) {
  const panel = document.querySelector('[data-project-list-panel]')
  if (!panel) return
  panel.classList.toggle('is-batch', enabled)
  document.querySelector('[data-batch-bar]').hidden = !enabled
  document.querySelector('[data-toggle-batch]').hidden = enabled
  document.querySelector('[data-cancel-batch]').hidden = !enabled
  document.querySelectorAll('[data-project-card]').forEach(card => card.classList.toggle('batch-mode', enabled))
  updateBatchCount()
}

function setPage(page) {
  const paginationEl = document.querySelector('[data-pagination]')
  if (!paginationEl) return
  const targetPage = Math.max(1, Math.min(13, page))
  paginationEl.dataset.currentPage = String(targetPage)
  paginationEl.querySelectorAll('[data-page]').forEach(button => button.classList.toggle('active', Number(button.dataset.page) === targetPage))
  paginationEl.querySelector('[data-page-prev]').classList.toggle('disabled', targetPage === 1)
  paginationEl.querySelector('[data-page-next]').classList.toggle('disabled', targetPage === 13)
}

function updateScopeSummary() {
  const selector = document.querySelector('[data-scope-editor]')
  const scopeBar = document.querySelector('[data-scope-bar]')
  if (!selector || !scopeBar) return
  const projects = [...selector.querySelectorAll('[data-scope-project]')]
  const selected = projects.filter(project => project.classList.contains('checked'))
  const allOption = selector.querySelector('[data-scope-all]')
  const activeMode = allOption?.classList.contains('active') ? 'all' : selected.length <= 1 ? 'single' : 'selected'
  const total = activeMode === 'all' || selected.length === 0 ? projects.reduce((sum, project) => sum + Number(project.dataset.contentCount || 0), 0) : selected.reduce((sum, project) => sum + Number(project.dataset.contentCount || 0), 0)
  const title = activeMode === 'all' ? '全部可见项目' : activeMode === 'single' ? selected[0]?.querySelector('strong')?.textContent || 'May Creator Launch' : `已选 ${selected.length || 3} 个项目`
  const desc = activeMode === 'all' ? '跨项目范围 · 当前账号可见 12 个项目 · 承接原总监控列表心智' : activeMode === 'single' ? '单项目范围 · 指标、趋势和列表仅按当前项目计算' : `跨项目范围 · ${selected.map(project => project.querySelector('strong')?.textContent).filter(Boolean).slice(0, 3).join(' / ') || '已选项目'}`
  document.querySelectorAll('[data-scope-title]').forEach(el => {
    el.textContent = title
  })
  scopeBar.querySelector('[data-scope-desc]').textContent = desc
  document.querySelectorAll('[data-scope-content]').forEach(el => {
    el.textContent = `当前内容 ${total}`
  })
  scopeBar.querySelector('[data-scope-platform]').textContent = activeMode === 'single' ? '覆盖平台 3' : '覆盖平台 4'
  document.querySelectorAll('[data-scope-issue]').forEach(el => {
    el.textContent = activeMode === 'all' ? '需关注 23' : `需关注 ${Math.max(1, (selected.length || 1) * 7)}`
  })
  selector.querySelector('[data-scope-message]').textContent =
    activeMode === 'all'
      ? '当前将查看全部可见项目。'
      : selected.length === 1
        ? '当前将查看 1 个项目，应用后进入单项目范围。'
        : `当前将查看 ${selected.length} 个项目，应用后进入多项目范围。`
  updateSelectedScopeCache(selector, selected, activeMode)
  updateScopeUrl(activeMode, selected)
}

function updateScopeUrl(activeMode, selected) {
  const params = new URLSearchParams(window.location.search)
  if (activeMode === 'all') {
    params.set(scopeParamKey, 'all')
  } else {
    const ids = selected.map((project, index) => project.dataset.projectId || `project-${index + 1}`)
    params.set(scopeParamKey, ids.length ? ids.join(',') : 'project-1')
  }
  const query = params.toString()
  const nextUrl = `${window.location.pathname}${query ? `?${query}` : ''}${window.location.hash}`
  window.history.replaceState(null, '', nextUrl)
}

function updateSelectedScopeCache(selector, selected, activeMode) {
  const countEl = selector.querySelector('[data-selected-scope-count]')
  const tagsEl = selector.querySelector('[data-selected-scope-tags]')
  if (!countEl || !tagsEl) return
  if (activeMode === 'all') {
    countEl.textContent = '全部'
    tagsEl.innerHTML = '<span class="selected-scope-empty">当前查看全部可见项目</span>'
    return
  }
  countEl.textContent = `${selected.length} 个`
  tagsEl.innerHTML = selected.length
    ? selected
        .map(project => {
          const name = project.querySelector('strong')?.textContent || '未命名项目'
          return `<button class="selected-scope-tag" data-remove-scope-project="${name}">${name}<span>×</span></button>`
        })
        .join('')
    : '<span class="selected-scope-empty">暂无已选项目，默认查看全部可见项目</span>'
}

function updateMultiFilterSummary(filter) {
  const menu = getMultiFilterMenu(filter)
  const checked = menu ? [...menu.querySelectorAll('[data-multi-option]:checked')].map(input => input.value) : []
  const summary = filter.querySelector('[data-multi-summary]')
  if (!summary) return
  if (!checked.length) {
    summary.textContent = '全部类型'
  } else if (checked.length <= 2) {
    summary.textContent = checked.join('、')
  } else {
    summary.textContent = `已选 ${checked.length} 项`
  }
}

function getMultiFilterMenu(filter) {
  return multiFilterMenus.get(filter) || filter.querySelector('[data-multi-menu]')
}

function positionMultiFilterMenu(filter) {
  const toggle = filter.querySelector('[data-multi-toggle]')
  const menu = getMultiFilterMenu(filter)
  if (!toggle || !menu) return
  const rect = filter.getBoundingClientRect()
  const menuWidth = menu.offsetWidth || 220
  const viewportWidth = document.documentElement.clientWidth || window.innerWidth
  const left = Math.min(rect.left, viewportWidth - menuWidth - 12)
  menu.style.left = `${Math.max(12, left)}px`
  menu.style.top = `${rect.bottom + 8}px`
}

function setDrilldownView(type) {
  const view = drilldownViews[type] || drilldownViews.rank
  const drawer = document.querySelector('[data-config-drawer="drilldown-view"]')
  if (!drawer) return
  drawer.querySelector('[data-drilldown-title]').textContent = view.title
  drawer.querySelector('[data-drilldown-desc]').textContent = view.desc
  drawer.querySelector('[data-drilldown-action]').textContent = view.action
  drawer.querySelectorAll('[data-drilldown-panel]').forEach(panel => {
    panel.hidden = panel.dataset.drilldownPanel !== type
  })
}

const listFilterLabels = {
  views: '排序：观看量降序',
  er: '排序：ER 降序',
  'auto-track': '近期新增：自动追踪入库',
  channel: '创作者/频道：Lena Beauty Lab',
  attention: '数据问题：需关注内容',
  'efficiency-ready': '指标状态：CTR/CPV/CPM 可计算',
  'shortlink-gap': '短链状态：未绑定/无点击',
  'budget-gap': '预算状态：未填写',
  'custom-metric': '自定义指标：口径待确认',
  'comment-gap': '评论状态：样本不足/未同步',
  'baseline-gap': '数据状态：缺少基线点'
}

function applyListFilter(type) {
  const section = document.getElementById('content-list-section')
  if (!section) return
  const label = listFilterLabels[type] || '列表筛选：已应用'
  const tag = section.querySelector('[data-applied-filter]')
  const line = section.querySelector('[data-applied-filter-line]')
  const notice = section.querySelector('[data-list-filter-notice]')
  if (tag) {
    tag.textContent = label
    tag.hidden = false
  }
  if (line) line.hidden = false
  if (notice) {
    notice.textContent = `已应用「${label}」，当前条件只影响下方监控内容列表。`
    notice.hidden = false
  }
  section.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function getTagState(panel) {
  const mode = panel.querySelector('[data-tag-mode] .active')?.dataset.mode || 'delta'
  const metric = panel.querySelector('[data-tag-metrics] .active')?.dataset.metric || 'views'
  return { mode, metric }
}

function renderTagContribution(panel) {
  const { mode, metric } = getTagState(panel)
  const sortMetric = metric === 'content' && mode === 'delta' ? 'active' : metric
  const data = [...tagContributionData[mode]].sort((a, b) => b[sortMetric] - a[sortMetric])
  const top = data.slice(0, 7)
  const other = data.slice(7)
  const valueOf = item => item[sortMetric]
  const otherValue = other.reduce((sum, item) => sum + valueOf(item), 0)
  const makeOther = () => ({
    tag: '其它',
    content: other.reduce((sum, item) => sum + item.content, 0),
    active: other.reduce((sum, item) => sum + item.active, 0),
    views: other.reduce((sum, item) => sum + item.views, 0),
    engagement: other.reduce((sum, item) => sum + item.engagement, 0),
    likes: other.reduce((sum, item) => sum + item.likes, 0),
    comments: other.reduce((sum, item) => sum + item.comments, 0),
    shares: other.reduce((sum, item) => sum + item.shares, 0),
    clicks: other.reduce((sum, item) => sum + item.clicks, 0)
  })
  const chartData = otherValue > 0 ? [...top, makeOther()] : top
  const total = chartData.reduce((sum, item) => sum + valueOf(item), 0) || 1
  const max = Math.max(...chartData.map(item => valueOf(item)), 1)
  const colors = ['#fa6300', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444', '#14b8a6', '#94a3b8']
  const bars = panel.querySelector('[data-tag-bars]')
  const donut = panel.querySelector('[data-tag-donut]')
  const legend = panel.querySelector('[data-tag-legend]')
  const table = panel.querySelector('[data-tag-table]')
  const note = panel.querySelector('[data-tag-note]')
  const metricHead = mode === 'delta' ? {
    views: '观看增量',
    engagement: 'Engagement 增量',
    likes: '点赞增量',
    comments: '评论增量',
    shares: '分享增量',
    clicks: '短链点击增量',
    content: '观察期活跃内容'
  } : {
    views: '当前观看',
    engagement: '当前 Engagement',
    likes: '当前点赞',
    comments: '当前评论',
    shares: '当前分享',
    clicks: '当前短链点击',
    content: '标签内容总数'
  }
  const tableColumns = mode === 'delta'
    ? [
        ['content', '标签内容数'],
        ['active', '观察期活跃内容'],
        ['views', metricHead.views],
        ['engagement', metricHead.engagement],
        ['likes', metricHead.likes],
        ['comments', metricHead.comments],
        ['shares', metricHead.shares],
        ['clicks', metricHead.clicks]
      ]
    : [
        ['content', '标签内容总数'],
        ['views', metricHead.views],
        ['engagement', metricHead.engagement],
        ['likes', metricHead.likes],
        ['comments', metricHead.comments],
        ['shares', metricHead.shares],
        ['clicks', metricHead.clicks]
      ]
  if (note) note.textContent = tagModeNotes[mode]
  if (bars) {
    bars.innerHTML = chartData.map((item, index) => {
      const itemValue = valueOf(item)
      const percent = Math.round((itemValue / total) * 100)
      return `<div class="tag-bar-row">
        <div><strong>${item.tag}</strong><span>${mode === 'delta' ? '观察期变化量' : '当前累计值'} · ${item.content} 条内容 · ${percent}%</span></div>
        <div class="tag-bar-track"><i style="width:${Math.max(4, (itemValue / max) * 100)}%;background:${colors[index % colors.length]}"></i></div>
        <b>${formatMetricValue(itemValue, sortMetric)}</b>
      </div>`
    }).join('')
  }
  if (donut) {
    let cursor = 0
    const stops = chartData.map((item, index) => {
      const start = cursor
      const end = cursor + (valueOf(item) / total) * 100
      cursor = end
      return `${colors[index % colors.length]} ${start}% ${end}%`
    }).join(', ')
    donut.style.background = `conic-gradient(${stops})`
    donut.innerHTML = `<div><strong>${tagMetricLabels[metric]}</strong><span>${tagModeLabels[mode]}</span></div>`
  }
  if (legend) {
    legend.innerHTML = chartData.slice(0, 5).map((item, index) => `<span><i style="background:${colors[index % colors.length]}"></i>${item.tag}</span>`).join('')
  }
  if (table) {
    table.innerHTML = `<div class="tag-table-head"><span>标签</span>${tableColumns.map(([key, label]) => `<span class="${key === sortMetric ? 'sorted' : ''}">${label}${key === sortMetric ? ' ↓' : ''}</span>`).join('')}</div>
      ${data.map(item => `<div class="tag-table-row">
        <strong>${item.tag}</strong>${tableColumns.map(([key]) => `<span class="${key === sortMetric ? 'sorted' : ''}">${formatMetricValue(item[key], key)}</span>`).join('')}
      </div>`).join('')}`
  }
}

function initTagContribution() {
  document.querySelectorAll('[data-tag-contribution]').forEach(panel => {
    panel.querySelectorAll('[data-tag-mode] button, [data-tag-metrics] button').forEach(button => {
      button.addEventListener('click', () => {
        const group = button.closest('[data-tag-mode], [data-tag-metrics]')
        group?.querySelectorAll('button').forEach(item => item.classList.toggle('active', item === button))
        renderTagContribution(panel)
      })
    })
    renderTagContribution(panel)
  })
}

function cellRef(columnIndex, rowIndex) {
  let column = ''
  let current = columnIndex + 1
  while (current > 0) {
    const modulo = (current - 1) % 26
    column = String.fromCharCode(65 + modulo) + column
    current = Math.floor((current - modulo) / 26)
  }
  return `${column}${rowIndex + 1}`
}

function xmlEscape(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function sheetXml(rowsForSheet) {
  const rowsXml = rowsForSheet.map((row, rowIndex) => {
    const cells = row.map((value, columnIndex) => `<c r="${cellRef(columnIndex, rowIndex)}" t="inlineStr"><is><t>${xmlEscape(value)}</t></is></c>`).join('')
    return `<row r="${rowIndex + 1}">${cells}</row>`
  }).join('')
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><sheetData>${rowsXml}</sheetData></worksheet>`
}

function workbookXml(sheetNames) {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets>${sheetNames.map((name, index) => `<sheet name="${xmlEscape(name.slice(0, 31))}" sheetId="${index + 1}" r:id="rId${index + 1}"/>`).join('')}</sheets></workbook>`
}

function workbookRelsXml(sheetCount) {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">${Array.from({ length: sheetCount }, (_, index) => `<Relationship Id="rId${index + 1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet${index + 1}.xml"/>`).join('')}</Relationships>`
}

function contentTypesXml(sheetCount) {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>${Array.from({ length: sheetCount }, (_, index) => `<Override PartName="/xl/worksheets/sheet${index + 1}.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>`).join('')}</Types>`
}

const crcTable = (() => {
  const table = []
  for (let n = 0; n < 256; n += 1) {
    let c = n
    for (let k = 0; k < 8; k += 1) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
    table[n] = c >>> 0
  }
  return table
})()

function crc32(bytes) {
  let crc = 0xffffffff
  bytes.forEach(byte => {
    crc = crcTable[(crc ^ byte) & 0xff] ^ (crc >>> 8)
  })
  return (crc ^ 0xffffffff) >>> 0
}

function u16(value) {
  return [value & 0xff, (value >>> 8) & 0xff]
}

function u32(value) {
  return [value & 0xff, (value >>> 8) & 0xff, (value >>> 16) & 0xff, (value >>> 24) & 0xff]
}

function zipDateParts(date = new Date()) {
  return {
    time: ((date.getHours() & 0x1f) << 11) | ((date.getMinutes() & 0x3f) << 5) | Math.floor(date.getSeconds() / 2),
    date: (((date.getFullYear() - 1980) & 0x7f) << 9) | (((date.getMonth() + 1) & 0x0f) << 5) | (date.getDate() & 0x1f)
  }
}

function makeZip(files) {
  const encoder = new TextEncoder()
  const fileParts = []
  const centralParts = []
  let offset = 0
  const { time, date } = zipDateParts()
  files.forEach(file => {
    const nameBytes = encoder.encode(file.name)
    const contentBytes = encoder.encode(file.content)
    const crc = crc32(contentBytes)
    const localHeader = new Uint8Array([
      ...u32(0x04034b50), ...u16(20), ...u16(0), ...u16(0), ...u16(time), ...u16(date),
      ...u32(crc), ...u32(contentBytes.length), ...u32(contentBytes.length), ...u16(nameBytes.length), ...u16(0)
    ])
    fileParts.push(localHeader, nameBytes, contentBytes)
    const centralHeader = new Uint8Array([
      ...u32(0x02014b50), ...u16(20), ...u16(20), ...u16(0), ...u16(0), ...u16(time), ...u16(date),
      ...u32(crc), ...u32(contentBytes.length), ...u32(contentBytes.length), ...u16(nameBytes.length), ...u16(0),
      ...u16(0), ...u16(0), ...u16(0), ...u32(0), ...u32(offset)
    ])
    centralParts.push(centralHeader, nameBytes)
    offset += localHeader.length + nameBytes.length + contentBytes.length
  })
  const centralSize = centralParts.reduce((sum, part) => sum + part.length, 0)
  const end = new Uint8Array([
    ...u32(0x06054b50), ...u16(0), ...u16(0), ...u16(files.length), ...u16(files.length),
    ...u32(centralSize), ...u32(offset), ...u16(0)
  ])
  return new Blob([...fileParts, ...centralParts, end], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
}

function createXlsxBlob(sheets) {
  const files = [
    { name: '[Content_Types].xml', content: contentTypesXml(sheets.length) },
    { name: '_rels/.rels', content: '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>' },
    { name: 'xl/workbook.xml', content: workbookXml(sheets.map(sheet => sheet.name)) },
    { name: 'xl/_rels/workbook.xml.rels', content: workbookRelsXml(sheets.length) },
    ...sheets.map((sheet, index) => ({ name: `xl/worksheets/sheet${index + 1}.xml`, content: sheetXml(sheet.rows) }))
  ]
  return makeZip(files)
}

function dashboardExportSheets() {
  const tagRows = mode => tagContributionData[mode].map(item => [
    item.tag, item.content, item.active, item.views, item.engagement, item.likes, item.comments, item.shares, item.clicks
  ])
  return [
    { name: 'README', rows: [['导出范围', '当前筛选视图下的数据看板'], ['项目范围', scopeMeta().title], ['数据观察周期', '2026-05-03 -- 2026-05-11'], ['说明', '标签图表前端只展示 TOP 20 + 其它，导出包含全部标签明细。']] },
    { name: 'dashboard_overview', rows: [['指标', '值', '口径'], ['观看增量', '428.6K', '观察区间内变化量'], ['Engagement 增量', '41.1K', '点赞 + 评论 + 分享'], ['互动率', '5.7%', '观察区间内互动 / 观看'], ['活跃内容', '42', '观察区间内有观看或互动变化']] },
    { name: 'content_rank', rows: [['内容', '观看增量', '点赞', '评论', '分享', 'ER'], ['Summer Routine 2026', '+18.2K', '+2.1K', '+260', '+74', '4.8%'], ['Mini camera unboxing', '+9.7K', '+1.4K', '+88', '+41', '6.2%'], ['Soft glam brunch GRWM', '+1.1K', '+320', '--', '+9', '--']] },
    { name: 'creator_contribution', rows: [['达人/频道', '贡献占比', '观看', 'Engagement', '短链点击', '内容数'], ['Lena Beauty Lab', '46%', '+196.4K', '18.2K', '1.1K', 8], ['Mika Studio', '24%', '+102.8K', '9.6K', 860, 6], ['Ava Daily', '13%', '+55.7K', '4.1K', 320, 5]] },
    { name: 'tag_delta', rows: [['标签', '标签内容数', '观察期活跃内容', '观看增量', 'Engagement增量', '点赞增量', '评论增量', '分享增量', '短链点击增量'], ...tagRows('delta')] },
    { name: 'tag_snapshot', rows: [['标签', '标签内容总数', '当前观看', '当前Engagement', '当前点赞', '当前评论', '当前分享', '当前短链点击'], ...tagContributionData.snapshot.map(item => [item.tag, item.content, item.views, item.engagement, item.likes, item.comments, item.shares, item.clicks])] }
  ]
}

function taskRowsForExport() {
  return rows.map(row => [
    row.title, row.creator, row.project, row.platform, row.views, row.likes, row.comments, row.shares,
    row.er, row.progress, row.shortClicks, row.shortlinkStatus, row.budget, row.budgetStatus, row.source, row.createdAt
  ])
}

function rawMetricRows() {
  return [
    ['观看量', '428.6K', '线上已配置原始数据块'],
    ['点赞数', '32.8K', '线上已配置原始数据块'],
    ['评论数', '1.9K', '线上已配置原始数据块'],
    ['分享数', '6.4K', '线上已配置原始数据块'],
    ['Engagement 总量', '41.1K', '点赞 + 评论 + 分享'],
    ['互动率', '5.7%', 'Engagement / 观看'],
    ['Nox 短链点击数', '2.4K', '仅统计已绑定短链点击'],
    ['预算消耗', '未填写', '用户手动填写'],
    ['CPM', '--', '依赖预算'],
    ['CPV', '--', '依赖预算'],
    ['CTR', '--', '依赖短链点击与观看']
  ]
}

function buildExportWorkbook(type) {
  if (type === 'dashboard') return createXlsxBlob(dashboardExportSheets())
  const scope = type === 'full' ? '未经筛选的全部监控任务表格数据 + 原始聚合数据' : '当前筛选视图下的监控任务表格数据 + 原始数据'
  return createXlsxBlob([
    { name: 'README', rows: [['导出范围', scope], ['项目范围', scopeMeta().title], ['导出格式', 'XLSX 多 sheet'], ['说明', type === 'full' ? '保留既有全页面导出口径，不受当前筛选影响。' : '继承当前一级筛选和列表内筛选；不包含数据看板图表。']] },
    { name: type === 'full' ? 'monitor_tasks_all' : 'monitor_tasks_current', rows: [['内容', '创建人/频道', '所属项目', '平台', '观看量', '点赞数', '评论数', '分享数', '互动率', '进度', 'Nox短链点击', '短链状态', '预算消耗', '预算状态', '来源', '新增时间'], ...taskRowsForExport()] },
    { name: type === 'full' ? 'raw_aggregate_all' : 'raw_aggregate_current', rows: [['指标', '值', '说明'], ...rawMetricRows()] }
  ])
}

function showExportToast(label) {
  let toast = document.querySelector('[data-export-toast]')
  if (!toast) {
    toast = document.createElement('div')
    toast.className = 'export-toast'
    toast.dataset.exportToast = ''
    document.body.appendChild(toast)
  }
  toast.textContent = `${label} 已生成 XLSX 下载`
  toast.hidden = false
  window.clearTimeout(showExportToast.timer)
  showExportToast.timer = window.setTimeout(() => {
    toast.hidden = true
  }, 2400)
}

function exportWorkbook(type) {
  const labels = {
    full: '全量导出',
    dashboard: '数据看板导出',
    'current-view': '当前视图导出'
  }
  const blob = buildExportWorkbook(type)
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `monitor-761-${type}-${new Date().toISOString().slice(0, 10)}.xlsx`
  document.body.appendChild(link)
  link.click()
  link.remove()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
  showExportToast(labels[type] || '导出')
}

function openDrawer(id) {
  const drawer = document.querySelector(`[data-config-drawer="${id}"]`)
  const mask = document.querySelector('[data-drawer-mask]')
  if (!drawer || !mask) return
  drawer.hidden = false
  mask.hidden = false
}

function bindInteractions() {
  initTagContribution()

  document.querySelectorAll('[data-export-action]').forEach(button => {
    button.addEventListener('click', event => {
      event.stopPropagation()
      exportWorkbook(button.dataset.exportAction)
    })
  })

  document.querySelectorAll('[data-nav]').forEach(button => {
    button.addEventListener('click', event => {
      event.stopPropagation()
      if (button.disabled) return
      navigateTo(button.dataset.nav, button.dataset.scope)
    })
  })

  document.querySelectorAll('[data-anchor-target]').forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault()
      const target = document.getElementById(link.dataset.anchorTarget)
      if (!target) return
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      history.replaceState(null, '', `#${link.dataset.anchorTarget}`)
    })
  })

  document.querySelectorAll('[data-project-card]').forEach(card => {
    card.addEventListener('click', event => {
      if (event.target.closest('[data-row-check]')) {
        updateProjectCard(card, card.dataset.selected !== 'true')
        return
      }
      if (document.querySelector('[data-project-list-panel]')?.classList.contains('is-batch')) {
        updateProjectCard(card, card.dataset.selected !== 'true')
      } else if (!event.target.closest('button')) {
        setStoredScope('single')
        const archived = card.dataset.projectStatus === '已归档'
        navigateTo(`./option-a-project-workbench.html${archived ? '?projectStatus=archived' : ''}`)
      }
    })
  })

  document.querySelectorAll('[data-archive-project]').forEach(button => {
    button.addEventListener('click', event => {
      event.stopPropagation()
      if (isArchivePreview) {
        setArchivedPreview(false)
      } else {
        pendingArchiveCard = button.closest('[data-project-card]')
        const projectName = pendingArchiveCard?.querySelector('.project-title')?.textContent?.replace(/[☑☐]/g, '').trim() || '当前项目'
        openArchiveConfirm(projectName)
      }
    })
  })

  document.querySelector('[data-confirm-archive]')?.addEventListener('click', () => {
    const card = pendingArchiveCard
    closeArchiveConfirm()
    if (card) {
      archiveProjectCard(card)
    } else {
      setArchivedPreview(true)
    }
  })

  document.querySelectorAll('[data-close-confirm], [data-confirm-mask]').forEach(control => {
    control.addEventListener('click', event => {
      if (event.target.closest('.confirm-dialog') && !event.target.closest('[data-close-confirm]')) return
      closeArchiveConfirm()
    })
  })

  document.querySelector('[data-toggle-batch]')?.addEventListener('click', () => setBatchMode(true))
  document.querySelector('[data-cancel-batch]')?.addEventListener('click', () => setBatchMode(false))

  const paginationEl = document.querySelector('[data-pagination]')
  if (paginationEl) {
    paginationEl.dataset.currentPage = '1'
    paginationEl.querySelectorAll('[data-page]').forEach(button => button.addEventListener('click', () => setPage(Number(button.dataset.page))))
    paginationEl.querySelector('[data-page-prev]')?.addEventListener('click', () => {
      if (!paginationEl.querySelector('[data-page-prev]').classList.contains('disabled')) setPage(Number(paginationEl.dataset.currentPage || 1) - 1)
    })
    paginationEl.querySelector('[data-page-next]')?.addEventListener('click', () => {
      if (!paginationEl.querySelector('[data-page-next]').classList.contains('disabled')) setPage(Number(paginationEl.dataset.currentPage || 1) + 1)
    })
  }

  const selector = document.querySelector('[data-scope-editor]')
  if (selector) {
    updateScopeSummary()

    selector.querySelectorAll('[data-scope-project]').forEach(project => {
      project.addEventListener('click', () => {
        const allOption = selector.querySelector('[data-scope-all]')
        if (allOption) {
          allOption.classList.remove('active')
          allOption.querySelector('.scope-all-check').textContent = ''
        }
        project.classList.toggle('checked')
        project.querySelector('.scope-check').textContent = project.classList.contains('checked') ? '✓' : ''
        const hasSelected = selector.querySelectorAll('[data-scope-project].checked').length > 0
        if (!hasSelected && allOption) {
          allOption.classList.add('active')
          allOption.querySelector('.scope-all-check').textContent = '✓'
        }
        updateScopeSummary()
      })
    })

    selector.querySelector('[data-scope-all]')?.addEventListener('click', () => {
      const allOption = selector.querySelector('[data-scope-all]')
      allOption.classList.add('active')
      allOption.querySelector('.scope-all-check').textContent = '✓'
      selector.querySelectorAll('[data-scope-project]').forEach(project => {
        project.classList.remove('checked')
        project.querySelector('.scope-check').textContent = ''
      })
      updateScopeSummary()
    })

    selector.addEventListener('click', event => {
      const tag = event.target.closest('[data-remove-scope-project]')
      if (!tag) return
      const targetName = tag.dataset.removeScopeProject
      selector.querySelectorAll('[data-scope-project]').forEach(project => {
        if (project.querySelector('strong')?.textContent === targetName) {
          project.classList.remove('checked')
          project.querySelector('.scope-check').textContent = ''
        }
      })
      const allOption = selector.querySelector('[data-scope-all]')
      const hasSelected = selector.querySelectorAll('[data-scope-project].checked').length > 0
      if (!hasSelected && allOption) {
        allOption.classList.add('active')
        allOption.querySelector('.scope-all-check').textContent = '✓'
      }
      updateScopeSummary()
    })
  }

  document.querySelectorAll('[data-observation-control]').forEach(control => {
    const toggle = control.querySelector('[data-toggle-observation]')
    const popover = control.querySelector('[data-observation-popover]')
    if (!toggle || !popover) return
    toggle.addEventListener('click', event => {
      event.stopPropagation()
      const nextExpanded = popover.hidden
      document.querySelectorAll('[data-observation-popover]').forEach(panel => {
        panel.hidden = true
      })
      document.querySelectorAll('[data-toggle-observation]').forEach(button => {
        button.setAttribute('aria-expanded', 'false')
      })
      popover.hidden = !nextExpanded
      toggle.setAttribute('aria-expanded', String(nextExpanded))
      control.classList.toggle('expanded', nextExpanded)
    })
    popover.addEventListener('click', event => {
      event.stopPropagation()
    })
  })

  document.addEventListener('click', () => {
    document.querySelectorAll('[data-observation-popover]').forEach(panel => {
      panel.hidden = true
    })
    document.querySelectorAll('[data-toggle-observation]').forEach(button => {
      button.setAttribute('aria-expanded', 'false')
    })
    document.querySelectorAll('[data-observation-control]').forEach(control => {
      control.classList.remove('expanded')
    })
    document.querySelectorAll('[data-multi-menu]').forEach(menu => {
      menu.hidden = true
    })
    document.querySelectorAll('[data-multi-toggle]').forEach(button => {
      button.setAttribute('aria-expanded', 'false')
    })
  })

  document.querySelectorAll('[data-multi-filter]').forEach(filter => {
    const toggle = filter.querySelector('[data-multi-toggle]')
    const menu = getMultiFilterMenu(filter)
    if (!toggle || !menu) return
    if (menu.parentElement !== document.body) {
      document.body.appendChild(menu)
      multiFilterMenus.set(filter, menu)
    }
    toggle.addEventListener('click', event => {
      event.stopPropagation()
      const nextExpanded = menu.hidden
      document.querySelectorAll('[data-multi-menu]').forEach(panel => {
        panel.hidden = true
      })
      document.querySelectorAll('[data-multi-toggle]').forEach(button => {
        button.setAttribute('aria-expanded', 'false')
      })
      menu.hidden = !nextExpanded
      toggle.setAttribute('aria-expanded', String(nextExpanded))
      if (nextExpanded) positionMultiFilterMenu(filter)
    })
    menu.addEventListener('click', event => {
      event.stopPropagation()
    })
    menu.querySelectorAll('[data-multi-option]').forEach(input => {
      input.addEventListener('change', () => updateMultiFilterSummary(filter))
    })
    updateMultiFilterSummary(filter)
  })

  window.addEventListener('scroll', () => {
    document.querySelectorAll('[data-multi-filter]').forEach(filter => {
      const menu = getMultiFilterMenu(filter)
      if (menu && !menu.hidden) positionMultiFilterMenu(filter)
    })
  }, true)

  window.addEventListener('resize', () => {
    document.querySelectorAll('[data-multi-filter]').forEach(filter => {
      const menu = getMultiFilterMenu(filter)
      if (menu && !menu.hidden) positionMultiFilterMenu(filter)
    })
  })

  document.querySelectorAll('[data-open-drawer]').forEach(button => {
    button.addEventListener('click', event => {
      event.stopPropagation()
      if (button.dataset.openDrawer === 'drilldown-view') {
        setDrilldownView(button.dataset.drilldownType || 'rank')
      }
      openDrawer(button.dataset.openDrawer)
    })
  })

  document.querySelectorAll('[data-apply-list-filter]').forEach(button => {
    button.addEventListener('click', event => {
      event.stopPropagation()
      applyListFilter(button.dataset.applyListFilter)
    })
  })

  const updateContentBatch = () => {
    const selected = document.querySelectorAll('[data-content-check]:checked').length
    const bar = document.querySelector('[data-content-batch-bar]')
    const count = document.querySelector('[data-content-selected-count]')
    if (bar) bar.hidden = selected === 0
    if (count) count.textContent = `已选 ${selected} 条内容`
  }

  document.querySelector('[data-select-all-rows]')?.addEventListener('change', event => {
    document.querySelectorAll('[data-content-check]').forEach(check => {
      check.checked = event.target.checked
      check.closest('[data-content-row]')?.classList.toggle('selected', check.checked)
    })
    updateContentBatch()
  })

  document.querySelectorAll('[data-content-check]').forEach(check => {
    check.addEventListener('change', event => {
      event.stopPropagation()
      check.closest('[data-content-row]')?.classList.toggle('selected', check.checked)
      updateContentBatch()
    })
  })

  document.querySelectorAll('[data-open-task-detail]').forEach(row => {
    row.addEventListener('click', event => {
      if (event.target.closest('input, button, a, [data-open-drawer], [data-apply-list-filter]')) return
      openDrawer('content-detail')
    })
  })

  document.querySelectorAll('[data-close-drawer], [data-drawer-mask]').forEach(control => {
    control.addEventListener('click', () => {
      document.querySelectorAll('[data-config-drawer]').forEach(drawer => {
        drawer.hidden = true
      })
      const mask = document.querySelector('[data-drawer-mask]')
      if (mask) mask.hidden = true
    })
  })

  document.querySelectorAll('[data-switch]').forEach(button => {
    button.addEventListener('click', () => {
      if (button.disabled) return
      button.classList.toggle('on')
    })
  })
}

bindInteractions()
if (isNotificationEntry) {
  openDrawer('content-detail')
}
