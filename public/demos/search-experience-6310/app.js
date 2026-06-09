const creators = [
  {
    name: "T-Series",
    handle: "@tseries",
    initials: "T",
    tags: ["entertainm...", "music of asia", "music"],
    metrics: ["3.12亿", "3432.79亿", "2.63万"],
    country: "印度",
    score: "2 /10",
    ratio: "0.01%",
    interaction: "1.24%",
    exposure: "7.21万",
    fit: "低合作倾向",
    reason: "大型综合音乐频道，适合作为低相关样例留在经典结果里。",
    videos: [
      ["3247", "2026-06-01", "music"],
      ["8422", "2026-06-01", "lyrical"],
      ["4.21万", "2026-06-01", "show"],
    ],
  },
  {
    name: "Alejo Igoa",
    handle: "@AlejoIgoa",
    initials: "A",
    tags: ["humor", "challenge", "entertainm..."],
    metrics: ["1.16亿", "349.77亿", "1328"],
    country: "阿根廷",
    score: "8 /10",
    ratio: "4.4%",
    interaction: "2.75%",
    exposure: "1571.06万",
    fit: "高合作倾向",
    reason: "亲子娱乐向内容强，右侧视频用于保留线上经典搜索的信息密度。",
    videos: [
      ["120.61万", "2026-05-31", "toy"],
      ["648.72万", "2026-05-28", "family"],
      ["404.01万", "2026-05-27", "stage"],
    ],
  },
  {
    name: "Cocomelon - Nursery Rhymes",
    handle: "@CoComelon",
    initials: "C",
    tags: ["kids", "nursery rhy...", "kids educ..."],
    metrics: ["2.01亿", "2224.8亿", "2016"],
    country: "美国",
    score: "3 /10",
    ratio: "0.48%",
    interaction: "0.52%",
    exposure: "265.07万",
    fit: "需谨慎",
    reason: "儿童内容强，但偏动画儿歌，保留为标准结果里的非目标样例。",
    videos: [
      ["23.65万", "2026-05-31", "night"],
      ["32.49万", "2026-05-30", "kids"],
      ["86.39万", "2026-05-29", "play"],
    ],
  },
  {
    name: "Bispo Bruno Leonardo",
    handle: "@BispoBrunoLeonardo",
    initials: "B",
    tags: ["oração", "divinasrevel...", "religion"],
    metrics: ["7460万", "115亿", "9634"],
    country: "巴西",
    score: "7 /10",
    ratio: "1.09%",
    interaction: "56.55%",
    exposure: "104.47万",
    fit: "非目标内容",
    reason: "频道规模高但内容类目偏离，用于模拟经典搜索中需要人工判断的行。",
    videos: [
      ["161.69万", "2026-05-31", "talk"],
      ["58.42万", "2026-05-31", "talk"],
      ["122.14万", "2026-05-31", "talk"],
    ],
  },
  {
    name: "김프로KIMPRO",
    handle: "@kimpro828",
    initials: "K",
    tags: ["김프로", "kimpro", "유백합"],
    metrics: ["1.25亿", "1190.14亿", "3646"],
    country: "韩国",
    score: "3 /10",
    ratio: "13.36%",
    interaction: "0.53%",
    exposure: "1085.36万",
    fit: "需复核",
    reason: "娱乐内容曝光高，保留经典搜索的高密度横向比较能力。",
    videos: [
      ["200.47万", "2025-11-19", "kids"],
      ["161.03万", "2025-11-19", "floor"],
      ["346.47万", "2025-11-19", "room"],
    ],
  },
];

const refinedCreators = [creators[0], creators[3], creators[4]].map((item) => ({ ...item }));
const CURATION_TARGET_RATIO_LIMIT = 0.8;
const CURATION_AVAILABLE_RESULT_LIMIT = 120;

const curationResults = [
  {
    ...creators[1],
    reason: "亲子娱乐和玩具内容占比高，真人出镜稳定，适合新品测评和短视频二创素材测试。",
    risk: "内容娱乐化较强，需要复核品牌安全边界。",
  },
  {
    ...creators[2],
    reason: "儿童受众明确、更新稳定，适合作为母婴玩具大频道对照样本。",
    risk: "动画儿歌占比高，不建议进入首批真人测评邀约。",
  },
  {
    ...creators[4],
    reason: "家庭娱乐曝光高，部分内容与亲子场景相关，可作为备选扩量对象。",
    risk: "内容垂直度不足，合作诉求需要更明确的产品植入场景。",
  },
];

const curationSessions = [
  {
    id: "baby-toy-na",
    active: true,
    title: "母婴玩具测评 · 美国/加拿大",
    status: "completed",
    statusText: "已完成",
    meta: "20 个精选",
  },
  {
    id: "pet-unboxing",
    active: false,
    title: "宠物用品开箱频道",
    status: "running",
    statusText: "运行中",
    meta: "约 6 分钟",
  },
  {
    id: "beauty-launch",
    active: false,
    title: "美妆新品合作候选",
    status: "stopped",
    statusText: "已停止",
    meta: "50 个备选",
  },
];

const initialSearchConditions = [
  "平台：YouTube",
  "地区：美国",
  "关键词：toy unboxing / family toys",
  "粉丝量：10万 - 100万",
  "排除：纯动画儿歌",
];

const adjustedSearchConditions = [
  "平台：YouTube",
  "地区：美国 + 加拿大",
  "关键词：toy review / parenting / STEM toys",
  "粉丝量：10万 - 500万",
  "近 90 天有稳定更新",
  "排除：纯动画儿歌、低质搬运",
];

const state = {
  page: "search",
  drawerOpen: false,
  intent: "agent",
  mode: "continue",
  searchRound: 1,
  searchMode: "natural",
  resultSet: creators,
  excluded: 0,
  curationTarget: 100,
  producedCount: 20,
  batchSize: 20,
  currentBatch: 1,
  curationRunning: true,
  fillPromptOpen: false,
  fillLoading: false,
  targetEditing: false,
  targetDraft: "200",
  lowSupplyWarning: false,
  targetError: "",
  curationInsufficient: false,
  snapshotLabel: "当前召回结果快照",
  outputSize: 20,
  requirementRevision: 2,
  strategyText: "基于当前搜索结果，筛出更适合母婴玩具新品推广的频道，优先真实测评和亲子家庭场景。",
  strategyDraft: "优先真人出镜、真实测评和亲子家庭场景；不要纯动画儿歌、低质搬运和泛娱乐内容。",
  strategyEditing: false,
  confirmFromCuration: false,
  editSubmitting: false,
  curationTaskDrawerOpen: false,
  deletedSessionIds: [],
  deleteConfirmSessionId: "",
  toast: "",
};

function applyDemoRouteFromUrl() {
  const params = new URLSearchParams(window.location.search);
  if (params.get("agent") === "review" || params.get("page") === "curation") {
    state.page = "curation";
    state.drawerOpen = false;
    state.mode = "continue";
  }
}

function icon(name) {
  const icons = {
    search: "⌕",
    filter: "▾",
    spark: "✦",
    back: "←",
    check: "✓",
    close: "×",
    archive: "▣",
    menu: "☰",
    edit: "✎",
    send: "↑",
    loading: "↻",
  };
  return icons[name] || "•";
}

function shell(content, active = "search") {
  return `
    <div class="shell">
      <aside class="side-nav">
        <div class="brand"><span class="brand-mark">N</span>NoxInfluencer</div>
        <div class="side-section">
          <p class="side-label">工作台</p>
          <a class="side-item ${active === "search" ? "active" : ""}" href="#search" data-action="nav-search"><span class="side-dot"></span>网红发现</a>
          <a class="side-item ${active === "curation" ? "active" : ""}" href="#curation" data-action="nav-curation"><span class="side-dot"></span>智能精选</a>
          <a class="side-item is-muted" href="#invite" data-action="nav-placeholder"><span class="side-dot"></span>邀约网红</a>
          <a class="side-item is-muted" href="#cooperate" data-action="nav-placeholder"><span class="side-dot"></span>合作网红</a>
        </div>
        <div class="side-section">
          <p class="side-label">辅助功能</p>
          <a class="side-item is-muted" href="#favorites" data-action="nav-placeholder">收藏夹</a>
          <a class="side-item is-muted" href="#similar" data-action="nav-placeholder">相似网红</a>
          <a class="side-item is-muted" href="#exports" data-action="nav-placeholder">导出记录</a>
        </div>
      </aside>
      <main class="main">
        <div class="topbar">
          <div class="topbar-title">频道搜索 · v6.3.10 智能精选 Demo</div>
          <div class="topbar-actions">
            <button class="btn btn-quiet">简体中文</button>
            <button class="btn btn-icon">${icon("menu")}</button>
          </div>
        </div>
        ${content}
      </main>
      <div class="toast ${state.toast ? "show" : ""}">${state.toast}</div>
    </div>
  `;
}

function chip(text, strong = false) {
  return `<span class="chip ${strong ? "chip-strong" : ""}">${text}</span>`;
}

function videoThumb(video, index) {
  return `
    <div class="classic-video-thumb tone-${index + 1}">
      <span class="play-dot">▶</span>
      <span>${video[0]}</span>
      <time>${video[1]}</time>
    </div>
  `;
}

function classicCreatorRow(item) {
  return `
    <div class="classic-row simplified">
      <div class="row-check"><input type="checkbox" aria-label="选择 ${item.name}" /></div>
      <div class="classic-avatar">${item.initials}</div>
      <div class="classic-profile">
        <div class="profile-title">
          <strong>${item.name}</strong>
          <span class="verify-dot">v</span>
          <span>${item.handle}</span>
        </div>
        <div class="tag-row">${item.tags.map((tag) => `<span class="classic-tag">${tag}</span>`).join("")}<span class="more-dot">...</span></div>
        <div class="profile-metrics">
          <span>♙ ${item.metrics[0]}</span>
          <span>◷ ${item.metrics[1]}</span>
          <span>▣ ${item.metrics[2]}</span>
        </div>
        <div class="profile-country">⌖ ${item.country}</div>
      </div>
      <div class="classic-stats">
        <div><span>合作倾向</span><strong class="score">❤ ${item.score}</strong></div>
        <div><span>观看量/粉丝量</span><strong>${item.ratio}</strong></div>
        <div><span>粉丝互动率</span><strong>${item.interaction}</strong></div>
        <div><span>预计曝光量 (180天)</span><strong>${item.exposure}</strong></div>
      </div>
      <div class="classic-video-strip" aria-label="近期视频示意">
        ${item.videos.map((video, index) => videoThumb(video, index)).join("")}
      </div>
    </div>
  `;
}

function creatorRow(item, mode = "search") {
  const actions =
    mode === "curation"
      ? `<div class="action-stack">
          <button class="btn btn-primary" data-action="accept">${icon("check")} 采纳</button>
          <button class="btn" data-action="exclude">${icon("close")} 排除</button>
        </div>`
      : `<div class="action-stack">
          <button class="btn">查看详情</button>
          <button class="btn">加入名单</button>
        </div>`;
  return `
    <div class="creator-row">
      <div class="avatar">${item.initials}</div>
      <div class="creator-main">
        <h3>${item.name}</h3>
        <p>${item.handle}</p>
        <div class="tag-row">${item.tags.map((tag) => `<span class="mini-tag">${tag}</span>`).join("")}</div>
      </div>
      <div class="metric-block">
        <strong>${item.metrics[0]}</strong>
        <p>${item.metrics.slice(1).join(" · ")}</p>
      </div>
      <div class="reason-block">
        <strong>${item.fit}</strong>
        <p>${item.reason}</p>
      </div>
      ${actions}
    </div>
  `;
}

function curationTaskReminder() {
  const sessions = visibleCurationSessions();
  const runningCount = sessions.filter((session) => session.status === "running").length;
  const completedCount = sessions.filter((session) => session.status === "completed").length;
  const stoppedCount = sessions.filter((session) => session.status === "stopped").length;
  const summary = [
    completedCount ? `${completedCount} 个已完成` : "",
    runningCount ? `${runningCount} 个运行中` : "",
    stoppedCount ? `${stoppedCount} 个已停止` : "",
  ].filter(Boolean).join("，") || "暂无任务";
  return `
    <section class="curation-task-reminder">
      <button class="curation-task-summary" data-action="toggle-curation-tasks" aria-expanded="${state.curationTaskDrawerOpen}">
        <span class="status-badge success">Agent 精选</span>
        <strong>${sessions.length} 个精选任务</strong>
        <span>${summary}</span>
        <span class="task-summary-action">查看</span>
      </button>
    </section>
  `;
}

function visibleCurationSessions() {
  return curationSessions.filter((session) => !state.deletedSessionIds.includes(session.id));
}

function curationTaskItem(session) {
  const canDelete = session.status === "completed" || session.status === "stopped";
  const confirming = state.deleteConfirmSessionId === session.id;
  return `
    <article class="curation-task-item ${session.active ? "active" : ""} ${confirming ? "confirming" : ""}">
      <button class="curation-task-main" data-action="open-curation-task">
        <strong>${session.title}</strong>
        <span><b>${session.statusText}</b> · ${session.meta}</span>
        <em>${session.active ? "查看结果" : "查看任务"}</em>
      </button>
      <div class="task-item-actions">
        <button
          class="task-delete-btn"
          data-action="${canDelete ? "ask-delete-session" : "blocked-delete-session"}"
          data-session-id="${session.id}"
          ${canDelete ? "" : "disabled"}
          title="${canDelete ? "删除这条临时任务记录" : "运行中任务需先停止生成"}"
        >删除记录</button>
      </div>
      ${confirming ? `
        <div class="delete-confirm-row">
          <span>删除后将从任务列表移除</span>
          <button data-action="confirm-delete-session" data-session-id="${session.id}">确认删除</button>
          <button data-action="cancel-delete-session">取消</button>
        </div>
      ` : ""}
    </article>
  `;
}

function curationTaskDrawer() {
  if (!state.curationTaskDrawerOpen) return "";
  const sessions = visibleCurationSessions();
  return `
    <div class="drawer-mask" data-action="close-task-drawer-mask"></div>
    <aside class="curation-task-drawer" aria-label="精选任务">
      <div class="task-drawer-head">
        <div>
          <h2>精选任务</h2>
          <p>运行中任务需停止后才能删除；改需求会创建新任务。</p>
        </div>
        <div class="task-drawer-head-actions">
          <button class="btn btn-primary" data-action="new-session-from-current">${icon("spark")} 基于当前需求新建任务</button>
          <button class="btn btn-icon" data-action="close-task-drawer">${icon("close")}</button>
        </div>
      </div>
      <div class="curation-task-list">
        ${sessions.length ? sessions.map(curationTaskItem).join("") : `
          <div class="curation-task-empty">暂无可找回的精选任务</div>
        `}
      </div>
    </aside>
  `;
}

function curationStatusPanel() {
  const runningText = state.curationRunning ? `第 ${state.currentBatch + 1} 批生成中` : "已停止生成";
  const progressPercent = Math.min(100, Math.round((state.producedCount / state.curationTarget) * 100));
  const insufficientPanel = state.curationInsufficient ? `
    <div class="insufficient-result-alert">
      <strong>当前候选频道无法达到目标名单量</strong>
      <span>已完成可用结果筛选，建议降低目标数量、调整外部搜索结果，或基于当前需求新建任务。</span>
    </div>
  ` : "";
  return `
    <section class="panel curation-status-panel">
      <div class="curation-status-main">
        <div>
          <div class="status-badge ${state.curationRunning ? "warning" : "success"}">${state.curationRunning ? "运行中" : "已停止"}</div>
          <h2>母婴玩具测评频道精选</h2>
          <p>${state.strategyText}</p>
        </div>
      </div>
      <div class="curation-kpi-grid">
        <div class="stat-cell"><span>候选频道</span><strong>${resultSetCount()}</strong></div>
        <div class="stat-cell target-cell">
          <span>目标名单</span>
          ${targetCountControl()}
        </div>
        <div class="stat-cell"><span>已产出</span><strong>${state.producedCount}</strong></div>
        <div class="stat-cell"><span>已移出</span><strong>${state.excluded}</strong></div>
      </div>
      <div class="batch-progress-panel">
        <div class="batch-progress-head">
          <strong>${state.producedCount} / ${state.curationTarget}</strong>
          <div class="batch-progress-actions">
            <span>${runningText}</span>
            ${state.curationRunning ? `<button class="btn btn-stop" data-action="stop-curation">停止生成</button>` : ""}
          </div>
        </div>
        <div class="batch-progress-track"><span style="width: ${progressPercent}%"></span></div>
        <div class="batch-progress-meta">
          <span>每批约 ${state.batchSize} 个</span>
          <span>${state.curationRunning ? "可查看已产出结果，完成或停止后才能进入后续动作" : "当前精选名单可保存、邀约或导出"}</span>
        </div>
      </div>
      ${insufficientPanel}
    </section>
  `;
}

function targetCountControl() {
  const limit = targetLimit();
  const targetMeta = `<small class="target-limit-note">候选频道 ${resultSetCount()} · 建议上限 ${limit}</small>`;
  if (!state.targetEditing) {
    return `
      <strong>${state.curationTarget}</strong>
      <button class="kpi-inline-action" ${state.curationRunning ? "disabled" : ""} data-action="open-append-target">追加</button>
    `;
  }
  return `
    <div class="target-edit-control">
      <input
        type="number"
        min="${state.curationTarget + 1}"
        max="${limit}"
        step="10"
        value="${state.targetDraft}"
        data-field="target-draft"
        aria-label="目标名单数量"
      />
      <button data-action="confirm-append-target" aria-label="确认目标名单数量">${icon("check")}</button>
      <button data-action="close-append-target" aria-label="取消修改目标名单数量">${icon("close")}</button>
    </div>
    ${targetMeta}
    ${targetEditMessage()}
  `;
}

function targetLimit() {
  return Math.floor(resultSetCount() * CURATION_TARGET_RATIO_LIMIT);
}

function targetBlockingError(value) {
  if (!Number.isFinite(value)) return "请输入有效数量";
  if (value <= state.curationTarget) return `目标数量只能增加，需大于当前 ${state.curationTarget}`;
  if (value > targetLimit()) return `目标不能超过候选频道量的 ${Math.round(CURATION_TARGET_RATIO_LIMIT * 100)}%`;
  return "";
}

function targetSoftWarning(value) {
  return Number.isFinite(value) && value > CURATION_AVAILABLE_RESULT_LIMIT
    ? "当前候选频道可能筛不满"
    : "";
}

function targetEditMessage() {
  if (state.targetError) return `<small class="target-warning is-error">${state.targetError}</small>`;
  if (state.lowSupplyWarning) return `<small class="target-warning">当前候选频道可能筛不满</small>`;
  return "";
}

function curationResultRow(item, index) {
  return `
    <article class="curation-result-row">
      <div class="curation-rank">${String(index + 1).padStart(2, "0")}</div>
      <div class="avatar">${item.initials}</div>
      <div class="curation-channel">
        <div class="profile-title">
          <strong>${item.name}</strong>
          <span class="verify-dot">v</span>
          <span>${item.handle}</span>
        </div>
        <div class="tag-row">${item.tags.map((tag) => `<span class="classic-tag">${tag}</span>`).join("")}</div>
        <div class="profile-metrics">
          <span>♙ ${item.metrics[0]}</span>
          <span>◷ ${item.metrics[1]}</span>
          <span>⌖ ${item.country}</span>
        </div>
      </div>
      <div class="curation-evidence">
        <div class="recommendation-copy">
          <span>推荐理由</span>
          <p>${item.reason}</p>
          <div class="risk-note"><span>风险提示</span>${item.risk}</div>
        </div>
      </div>
      <div class="curation-row-actions">
        <button class="btn btn-quiet" data-action="exclude">${icon("close")} 移出精选</button>
      </div>
    </article>
  `;
}

function fillPromptPanel() {
  if (!state.fillPromptOpen && !state.fillLoading) return "";
  return `
    <section class="fill-prompt-panel ${state.fillLoading ? "is-loading" : ""}">
      <div>
        <strong>${state.fillLoading ? "正在补入新的精选频道" : "已移出 1 个精选结果"}</strong>
        <p>${state.fillLoading ? "系统会参考本次移出反馈，在当前候选频道内即时补位。" : "是否基于当前策略、候选频道和移出反馈补齐 1 个结果？"}</p>
      </div>
      <div class="toolbar">
        ${state.fillLoading
          ? `<span class="loading-dot" aria-label="补齐中"></span>`
          : `<button class="btn btn-primary" data-action="confirm-fill">${icon("spark")} 补齐 1 个</button>
             <button class="btn" data-action="skip-fill">暂不补齐</button>`}
      </div>
    </section>
  `;
}

function curationResultsPanel() {
  const actionLocked = state.curationRunning;
  return `
    <section class="panel curation-results-panel">
      <div class="curation-results-head">
        <div>
          <h2>精选结果</h2>
        </div>
        <div class="curation-bulk-actions">
          <button class="btn btn-primary" ${actionLocked ? "disabled" : ""} data-action="save-shortlist">保存至收藏夹</button>
          <button class="btn" ${actionLocked ? "disabled" : ""} data-action="send-invite">进入邀约</button>
          <button class="btn" ${actionLocked ? "disabled" : ""} data-action="export-shortlist">导出结果</button>
        </div>
      </div>
      ${fillPromptPanel()}
      <div class="curation-result-list">
        ${curationResults.map((item, index) => curationResultRow(item, index)).join("")}
      </div>
    </section>
  `;
}

function searchResultsPage() {
  const chips = state.searchRound > 1 ? adjustedSearchConditions : initialSearchConditions;
  const isNaturalLanguage = state.searchMode === "natural";
  const shouldShowCurationBridge = true;
  const resultsCopy = state.searchRound > 1
    ? "当前列表已按搜索条件更新，可继续查看或进入精选。"
    : "搜索会根据条件生成候选频道列表；以下列表只作为结果形态占位。";
  const curationBridge = shouldShowCurationBridge
    ? `<button class="btn btn-primary curation-bridge" data-action="snapshot-confirm">${icon("spark")} 对当前结果做智能精选</button>`
    : "";
  const searchInput = isNaturalLanguage
    ? `
        <div class="classic-input-row natural">
          <span class="search-icon">⌕</span>
          <button class="ai-switch" data-action="set-search-mode-keyword" aria-label="切换为关键词搜索" title="切换为关键词搜索">AI</button>
          <textarea
            class="composer-text"
            data-field="natural-query"
            aria-label="自然语言搜索内容"
          >帮我找美国母婴玩具测评频道，适合新品推广，优先真人出镜、近期更新稳定，不要纯动画儿歌。</textarea>
          <button class="classic-save">▣</button>
          <button class="btn btn-primary" data-action="nl-run-search">展示结果</button>
        </div>
      `
    : `
        <div class="classic-input-row keyword">
          <span class="search-icon">⌕</span>
          <button class="ai-switch off" data-action="set-search-mode-natural" aria-label="切换为自然语言搜索" title="切换为自然语言搜索">AI</button>
          <div class="keyword-field">输入关键字、网红频道链接或Amazon商品链接，按Enter键开始搜索</div>
          <button class="classic-save">▣</button>
          <button class="btn btn-primary">展示结果</button>
        </div>
      `;
  const content = `
    <section class="page">
      <section class="classic-search-panel">
        <div class="classic-filter-wrap" aria-label="经典搜索筛选区">
          <div class="platform-switch">
            <div class="switch-group platform-group">
              <span class="platform active youtube">▶</span>
              <span class="platform tiktok">♪</span>
              <span class="platform instagram">◎</span>
              <span class="platform x">𝕏</span>
            </div>
            <div class="switch-group type-group">
              <span class="classify active">频道</span>
              <span class="classify">视频</span>
            </div>
          </div>
          <div class="simple-filter-row">
            <button class="filter-select">网红分类 <span>⌄</span></button>
            <button class="filter-select">地区 <span>⌄</span></button>
            <button class="filter-select">粉丝量 <span>⌄</span></button>
            <button class="filter-button">⌯ 筛选</button>
          </div>
        </div>
        ${searchInput}
        <div class="classic-option-row">
          <div class="ai-keyword-inline"><span>✦</span> AI推荐关键词</div>
          <div class="combination-switch"><i></i> 必须包含所有搜索词 <span class="question-dot">?</span></div>
          <div class="precision-inline"><b></b> 精准模式：关闭⌄</div>
        </div>
        <div class="condition-label">当前搜索条件</div>
        <div class="filter-row compact">${chips.map((item, index) => chip(item, index < 2)).join("")}</div>
        <div class="condition-tools">
          <button class="btn" data-action="simulate-search-change">模拟调整筛选并搜索</button>
          <span>搜索页负责生成候选频道；智能精选只使用当前结果继续筛选。</span>
        </div>
        ${curationTaskReminder()}
      </section>

      <section class="classic-results-panel">
        <div class="classic-result-head">
          <div>
            <h2>2801.74万 条结果</h2>
            <div class="board-meta">${resultsCopy}</div>
          </div>
          <div class="toolbar">
            <button class="filter-select compact">隐藏特定结果 <span>⌄</span></button>
            <button class="filter-select sort compact">默认排序 +按相关视频排序 <span>⌄</span></button>
            <button class="icon-tool">⇧</button>
            <button class="icon-tool">☻</button>
            ${curationBridge}
          </div>
        </div>
        <div class="result-warning"><span>i</span> 本页有 2 个结果未予展示</div>
        <div class="classic-list">${creators.map((item) => classicCreatorRow(item)).join("")}</div>
        <div class="results-footer-skeleton"><span class="skeleton-line w-48"></span><span class="skeleton-line w-320"></span></div>
      </section>
    </section>
  `;
  return shell(content + curationTaskDrawer() + confirmDrawer(), "search");
}

function strategyInstructionCard() {
  if (state.editSubmitting) return loadingConfirmCard("精选策略说明", ["w-220", "w-320", "w-260"]);
  return `
    <section class="confirm-card confirm-base strategy-instruction-card">
      <div class="confirm-section-head">
        <div>
          <h2>精选策略说明</h2>
          <div class="requirement-meta">基于当前搜索结果</div>
        </div>
        <div class="requirement-actions">
          <span class="status-badge">第 ${state.requirementRevision} 版</span>
          ${state.strategyEditing ? "" : `<button class="btn btn-quiet btn-reset" data-action="edit-strategy-text">修改精选策略</button>`}
        </div>
      </div>
      <p>${state.strategyText}</p>
      ${state.strategyEditing ? `
        <div class="inline-strategy-editor">
          <textarea
            class="strategy-input strategy-editor-textarea"
            data-field="strategy-draft"
            placeholder="补充或改写你希望 Agent 如何筛选当前结果，例如优先真实测评、排除低质搬运。"
          >${state.strategyDraft}</textarea>
          <div class="iterate-actions">
            <button class="btn btn-primary" data-action="apply-strategy-text">确定</button>
            <button class="btn" data-action="cancel-strategy-text">取消</button>
          </div>
        </div>
      ` : ""}
    </section>
  `;
}

function shouldUseAdjustedRecall() {
  return state.searchRound > 1;
}

function currentRecallConditions() {
  return shouldUseAdjustedRecall() ? adjustedSearchConditions : initialSearchConditions;
}

function resultSetCount() {
  return shouldUseAdjustedRecall() ? "286" : "324";
}

function strategyData() {
  return {
    include: ["真实测评", "亲子场景", "更新稳定", "妈妈适配", "合作成熟"],
    exclude: ["动画儿歌", "低质搬运", "泛娱乐", "近期停更"],
    explain: ["推荐理由", "主要风险", "适合场景", "边界提示"],
  };
}

function strategyPillGroups(variant = "") {
  const { include, exclude, explain } = strategyData();
  const groupClass = variant ? ` ${variant}` : "";
  const renderChip = (item, active) => `<button class="atomic-chip ${active ? "active" : ""}" data-action="toggle-strategy-chip" aria-pressed="${active}">${item}</button>`;
  return `
    <div class="atomic-strategy-list${groupClass}">
      <div class="atomic-row">
        <h4>优先保留</h4>
        <div class="atomic-list">${include.map((item, index) => renderChip(item, index < 4)).join("")}</div>
      </div>
      <div class="atomic-row">
        <h4>排除条件</h4>
        <div class="atomic-list">${exclude.map((item, index) => renderChip(item, index < 3)).join("")}</div>
      </div>
      <div class="atomic-row">
        <h4>解释维度</h4>
        <div class="atomic-list">${explain.map((item) => renderChip(item, true)).join("")}</div>
      </div>
    </div>
  `;
}

function outputConfigControls() {
  return `
    <div class="output-row output-number-row">
      <label class="output-number-field">
        <span>精选数量</span>
        <input
          type="number"
          min="1"
          max="200"
          step="1"
          value="${state.outputSize}"
          data-field="output-size"
          aria-label="精选数量"
        />
      </label>
      <small>范围 1 - 200，不能超过当前候选频道量。</small>
    </div>
    <details class="secondary-editor compact">
      <summary>更多输出规则</summary>
      <div class="config-grid">
        <label><input type="checkbox" checked data-action="stage-output-edit" /> 保留边界候选</label>
        <label><input type="checkbox" checked data-action="stage-output-edit" /> 边界候选不进前 20</label>
        <label><input type="checkbox" data-action="stage-output-edit" /> 低相关度降权</label>
        <label><input type="checkbox" data-action="stage-output-edit" /> 标记大型频道</label>
        <label><input type="checkbox" checked data-action="stage-output-edit" /> 生成推荐理由</label>
        <label><input type="checkbox" checked data-action="stage-output-edit" /> 标记主要风险</label>
        <label><input type="checkbox" data-action="stage-output-edit" /> 输出排除摘要</label>
      </div>
    </details>
  `;
}

function strategyConfirmCard() {
  if (state.editSubmitting) return loadingConfirmCard("精选策略", ["w-320", "w-280", "w-240"]);
  return `
    <section class="confirm-card confirm-group strategy-group">
      <div class="confirm-section-head">
        <div>
          <h3>精选策略</h3>
        </div>
        <span class="status-badge">已整理</span>
      </div>
      ${strategyPillGroups()}
    </section>
  `;
}

function outputTargetCard() {
  if (state.editSubmitting) return loadingConfirmCard("输出设置", ["w-180", "w-220"]);
  return `
    <section class="confirm-card config-card">
      <div class="confirm-section-head">
        <div>
          <h3>输出设置</h3>
        </div>
        <span class="status-badge">当前 ${state.outputSize} 个</span>
      </div>
      ${outputConfigControls()}
    </section>
  `;
}

function loadingConfirmCard(title, widths) {
  return `
    <section class="confirm-card confirm-loading-card" aria-busy="true" aria-label="${title} 正在更新">
      <div class="loading-card-head">
        <h3>${title}</h3>
        <span class="status-badge warning">更新中</span>
      </div>
      <div class="loading-lines">
        ${widths.map((width) => `<span class="skeleton-line ${width}"></span>`).join("")}
      </div>
    </section>
  `;
}

function loadingConfirmBody() {
  return [
    loadingConfirmCard("精选策略说明", ["w-220", "w-320", "w-260"]),
    loadingConfirmCard("精选策略", ["w-320", "w-280", "w-240"]),
    loadingConfirmCard("输出设置", ["w-180", "w-220"]),
  ].join("");
}

function confirmDrawerBody() {
  return [
    strategyInstructionCard(),
    strategyConfirmCard(),
    outputTargetCard(),
  ].join("");
}

function confirmDrawer() {
  if (!state.drawerOpen) return "";
  const primaryText = state.confirmFromCuration ? "创建新的精选任务" : "开始 Agent 精选";
  return `
    <div class="drawer-mask" data-action="close-drawer-mask"></div>
    <aside class="confirm-drawer" aria-label="精选策略">
      <div class="drawer-head">
        <div class="drawer-title-block">
          <h1>精选策略</h1>
          <div class="drawer-subtitle">使用当前搜索结果继续筛选</div>
        </div>
        <div class="drawer-head-actions">
          <div class="drawer-agent-package">
            <button class="btn btn-primary" data-action="confirm-agent">${icon("spark")} ${primaryText}</button>
          </div>
          <button class="btn btn-icon" data-action="close-drawer">${icon("close")}</button>
        </div>
      </div>
      <div class="drawer-body ${state.editSubmitting ? "is-loading" : ""}">
        ${confirmDrawerBody()}
      </div>
    </aside>
  `;
}

function agentTodoPage() {
  const content = `
    <section class="page">
      <div class="page-head">
        <div>
          <h1>Agent 精选</h1>
          <p>基于已确认的候选频道生成精选结果。</p>
        </div>
        <div class="toolbar">
          <button class="btn btn-session-list" data-action="toggle-curation-tasks">精选任务</button>
        </div>
      </div>
      <div class="curation-review-main">
        ${curationStatusPanel()}
        ${curationResultsPanel()}
      </div>
    </section>
  `;
  return shell(content + curationTaskDrawer() + confirmDrawer(), "curation");
}

function showToast(message) {
  state.toast = message;
  render();
  window.setTimeout(() => {
    state.toast = "";
    render();
  }, 1600);
}

function openConfirm() {
  state.drawerOpen = true;
  state.mode = "continue";
  render();
}

function startCuration() {
  state.drawerOpen = false;
  state.page = "curation";
  state.confirmFromCuration = false;
  state.mode = "continue";
  state.resultSet = refinedCreators;
  state.snapshotLabel = "当前搜索结果快照";
  showToast("已基于当前搜索结果开始智能精选");
}

function render() {
  document.body.dataset.mode = state.mode;
  const app = document.getElementById("app");
  if (state.page === "search") app.innerHTML = searchResultsPage();
  if (state.page === "curation") app.innerHTML = agentTodoPage();
}

document.addEventListener("click", (event) => {
  const actionTarget = event.target.closest("[data-action]");
  const action = actionTarget?.dataset.action;
  if (!action) return;
  event.preventDefault();

  if (action === "nav-search") {
    state.drawerOpen = false;
    state.page = "search";
    state.mode = "continue";
    render();
    return;
  }
  if (action === "nav-curation") {
    state.drawerOpen = false;
    state.page = "curation";
    state.mode = "continue";
    render();
    return;
  }
  if (action === "nav-placeholder") {
    showToast("当前 Demo 只展开网红发现和智能精选链路");
    return;
  }
  if (action === "toggle-curation-tasks") {
    state.curationTaskDrawerOpen = true;
    state.deleteConfirmSessionId = "";
    render();
    return;
  }
  if (action === "close-task-drawer" || action === "close-task-drawer-mask") {
    state.curationTaskDrawerOpen = false;
    state.deleteConfirmSessionId = "";
    render();
    return;
  }
  if (action === "blocked-delete-session") {
    showToast("运行中的任务需先停止生成后才能删除");
    return;
  }
  if (action === "ask-delete-session") {
    state.deleteConfirmSessionId = actionTarget.dataset.sessionId;
    render();
    return;
  }
  if (action === "cancel-delete-session") {
    state.deleteConfirmSessionId = "";
    render();
    return;
  }
  if (action === "confirm-delete-session") {
    const sessionId = actionTarget.dataset.sessionId;
    const session = curationSessions.find((item) => item.id === sessionId);
    if (!session || session.status === "running") {
      showToast("运行中的任务需先停止生成后才能删除");
      state.deleteConfirmSessionId = "";
      render();
      return;
    }
    state.deletedSessionIds = Array.from(new Set([...state.deletedSessionIds, sessionId]));
    state.deleteConfirmSessionId = "";
    showToast("已删除临时精选任务记录");
    return;
  }
  if (action === "open-curation-task") {
    state.page = "curation";
    state.drawerOpen = false;
    state.mode = "continue";
    state.curationTaskDrawerOpen = false;
    state.deleteConfirmSessionId = "";
    render();
    return;
  }

  if (action === "snapshot-confirm") {
    state.confirmFromCuration = false;
    openConfirm();
    return;
  }
  if (action === "nl-run-search") {
    state.searchRound = 2;
    showToast("已按自然语言搜索内容展示结果");
    return;
  }
  if (action === "set-search-mode-keyword" || action === "set-search-mode-natural") {
    state.searchMode = action === "set-search-mode-natural" ? "natural" : "keyword";
    render();
    return;
  }
  if (action === "close-drawer" || action === "close-drawer-mask") {
    state.drawerOpen = false;
    state.strategyEditing = false;
    render();
    return;
  }
  if (action === "simulate-search-change") {
    state.searchRound = 2;
    showToast("已模拟外部搜索条件变化，当前结果集已更新");
    return;
  }
  if (action === "edit-strategy-text") {
    state.strategyEditing = true;
    state.strategyDraft = state.strategyText;
    render();
    return;
  }
  if (action === "cancel-strategy-text") {
    state.strategyEditing = false;
    state.strategyDraft = state.strategyText;
    render();
    return;
  }
  if (action === "apply-strategy-text") {
    state.editSubmitting = true;
    state.strategyEditing = false;
    render();
    window.setTimeout(() => {
      state.editSubmitting = false;
      state.strategyText = state.strategyDraft.trim() || state.strategyText;
      state.requirementRevision += 1;
      showToast("已更新精选策略");
    }, 700);
    return;
  }
  if (action === "confirm-agent") {
    startCuration();
    return;
  }
  if (action === "new-session-from-current") {
    state.page = "curation";
    state.confirmFromCuration = true;
    state.drawerOpen = true;
    state.curationTaskDrawerOpen = false;
    render();
    return;
  }
  if (
    action === "stage-output-edit"
  ) {
    showToast("已更新输出规则");
    return;
  }
  if (action === "toggle-strategy-chip") {
    actionTarget.classList.toggle("active");
    actionTarget.setAttribute("aria-pressed", actionTarget.classList.contains("active") ? "true" : "false");
    showToast("已更新策略项");
    return;
  }
  if (action === "exclude") {
    state.excluded += 1;
    state.fillPromptOpen = true;
    state.fillLoading = false;
    showToast("已从本次精选中移出");
    return;
  }
  if (action === "confirm-fill") {
    state.fillPromptOpen = false;
    state.fillLoading = true;
    render();
    window.setTimeout(() => {
      state.fillLoading = false;
      state.producedCount = Math.min(state.curationTarget, state.producedCount + 1);
      showToast("已补入 1 个新的精选频道");
    }, 900);
    return;
  }
  if (action === "skip-fill") {
    state.fillPromptOpen = false;
    showToast("已保留当前精选名单，不补齐");
    return;
  }
  if (action === "stop-curation") {
    state.curationRunning = false;
    showToast("已停止继续生成，可处理当前精选名单");
    return;
  }
  if (action === "open-append-target") {
    state.targetEditing = true;
    state.targetDraft = String(Math.min(state.curationTarget + 100, targetLimit()));
    state.targetError = "";
    state.lowSupplyWarning = Number.parseInt(state.targetDraft, 10) > CURATION_AVAILABLE_RESULT_LIMIT;
    render();
    return;
  }
  if (action === "close-append-target") {
    state.targetEditing = false;
    state.lowSupplyWarning = false;
    state.targetError = "";
    render();
    return;
  }
  if (action === "confirm-append-target") {
    const nextTarget = Number.parseInt(state.targetDraft, 10);
    const validationMessage = targetBlockingError(nextTarget);
    if (validationMessage) {
      state.targetError = validationMessage;
      render();
      return;
    }
    const addedCount = nextTarget - state.curationTarget;
    state.curationTarget = nextTarget;
    state.curationRunning = true;
    state.targetEditing = false;
    state.lowSupplyWarning = false;
    state.targetError = "";
    state.curationInsufficient = nextTarget > CURATION_AVAILABLE_RESULT_LIMIT;
    if (state.curationInsufficient) {
      state.curationRunning = false;
      state.producedCount = CURATION_AVAILABLE_RESULT_LIMIT;
      showToast(`已筛出 ${CURATION_AVAILABLE_RESULT_LIMIT} 个可用结果，未达到目标 ${nextTarget}`);
    } else {
      state.curationInsufficient = false;
      showToast(`已追加 ${addedCount} 个目标，继续精选中`);
    }
    return;
  }
  if (action === "save-shortlist") {
    if (state.curationRunning) {
      showToast("当前仍在生成后续批次，请先等待完成或停止生成");
      return;
    }
    showToast("已保存至收藏夹，可继续管理精选频道");
    return;
  }
  if (action === "send-invite") {
    if (state.curationRunning) {
      showToast("当前仍在生成后续批次，请先等待完成或停止生成");
      return;
    }
    showToast("已带入精选频道，进入邀约准备流程");
    return;
  }
  if (action === "export-shortlist") {
    if (state.curationRunning) {
      showToast("当前仍在生成后续批次，请先等待完成或停止生成");
      return;
    }
    showToast("已生成导出任务：频道、推荐理由与风险说明");
    return;
  }
  if (action === "switch-session") {
    showToast("Demo 仅展示当前精选任务，session 切换待下一轮细化");
    return;
  }
});

document.addEventListener("input", (event) => {
  const field = event.target?.dataset?.field;
  if (field === "target-draft") {
    state.targetDraft = event.target.value;
    const nextTarget = Number.parseInt(state.targetDraft, 10);
    state.targetError = targetBlockingError(nextTarget);
    state.lowSupplyWarning = !state.targetError && Boolean(targetSoftWarning(nextTarget));
  }
  if (field === "strategy-draft") {
    state.strategyDraft = event.target.value;
  }
  if (field === "output-size") {
    const value = Number.parseInt(event.target.value, 10);
    const max = Math.min(200, Number.parseInt(resultSetCount(), 10));
    if (Number.isNaN(value)) return;
    state.outputSize = Math.max(1, Math.min(max, value));
    if (state.outputSize !== value) {
      event.target.value = String(state.outputSize);
      showToast(`精选数量需在 1 - ${max} 之间`);
    }
  }
});

applyDemoRouteFromUrl();
render();
