const creators = [
  {
    name: "Toys and Colors",
    handle: "@toysandcolors",
    initials: "TC",
    tags: ["kids", "toy review", "family"],
    metrics: ["粉丝 1170万", "均播 42.6万", "美国"],
    fit: "妈妈群体适配高",
    reason: "真人家庭场景稳定，近期内容以玩具体验和亲子互动为主。",
  },
  {
    name: "Cool Items Official",
    handle: "@CoolItemsOfficial916",
    initials: "CI",
    tags: ["home decor", "gadgets", "5minute"],
    metrics: ["粉丝 42.8万", "均播 21.2万", "美国"],
    fit: "需谨慎",
    reason: "内容覆盖玩具和家居，但频道定位偏泛，合作气质不够聚焦。",
  },
  {
    name: "Markiplier",
    handle: "@markiplier",
    initials: "M",
    tags: ["gaming", "action", "entertainment"],
    metrics: ["粉丝 2337万", "均播 160万", "美国"],
    fit: "建议排除",
    reason: "频道影响力强，但核心受众和当前玩具测评策略偏离较大。",
  },
  {
    name: "The Toy Insider",
    handle: "@thetoyinsider",
    initials: "TI",
    tags: ["toy expert", "review", "parent guide"],
    metrics: ["粉丝 18.4万", "均播 3.8万", "美国"],
    fit: "专业适配",
    reason: "内容定位明确，适合作为高可信度玩具测评合作候选。",
  },
  {
    name: "Family Fun Pack",
    handle: "@familyfunpack",
    initials: "FP",
    tags: ["family", "kids", "lifestyle"],
    metrics: ["粉丝 1010万", "均播 38.1万", "美国"],
    fit: "品牌友好",
    reason: "家庭生活方式内容稳定，适合偏亲子场景的合作表达。",
  },
];

const refinedCreators = [
  creators[0],
  creators[3],
  creators[4],
].map((item) => ({ ...item }));

const state = {
  page: "search",
  mode: "continue",
  round: 1,
  resultSet: creators,
  accepted: 0,
  excluded: 0,
  toast: "",
};

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
          <a class="side-item ${active === "search" ? "active" : ""}"><span class="side-dot"></span>网红发现</a>
          <a class="side-item ${active === "curation" ? "active" : ""}"><span class="side-dot"></span>智能精选</a>
          <a class="side-item"><span class="side-dot"></span>邀约网红</a>
          <a class="side-item"><span class="side-dot"></span>合作网红</a>
        </div>
        <div class="side-section">
          <p class="side-label">辅助功能</p>
          <a class="side-item">收藏夹</a>
          <a class="side-item">相似网红</a>
          <a class="side-item">导出记录</a>
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

function searchResultsPage() {
  const content = `
    <section class="page">
      <div class="page-head">
        <div>
          <h1>频道搜索</h1>
          <p>标准搜索先产出候选频道列表，智能精选只作为当前结果之后的深筛工作台。</p>
        </div>
        <button class="btn">导出结果</button>
      </div>
      <section class="panel search-box">
        <div class="search-row">
          <div class="search-input">toy unboxing</div>
          <button class="btn btn-primary">${icon("search")} 搜索</button>
          <button class="btn">${icon("filter")} 更多筛选</button>
        </div>
        <div class="filter-row">
          ${chip("地区：美国", true)}
          ${chip("粉丝量：10万 - 100万", true)}
          ${chip("平台：YouTube")}
          ${chip("近 90 天互动率更高")}
          ${chip("排除：纯动画儿歌")}
        </div>
      </section>
      <section class="panel">
        <div class="board-head">
          <div>
            <h2>标准搜索结果</h2>
            <div class="board-meta">324 个候选频道 · 默认排序 · 当前条件已生效</div>
          </div>
          <div class="toolbar">
            <button class="btn">隐藏不适合结果</button>
            <button class="btn btn-primary" data-action="create-snapshot">${icon("spark")} 对当前结果做智能精选</button>
          </div>
        </div>
        <div class="creator-list">
          ${creators.map((item) => creatorRow(item)).join("")}
        </div>
      </section>
    </section>
  `;
  return shell(content, "search");
}

function sessionPanel() {
  return `
    <aside class="panel session-panel">
      <div class="session-head">
        <h3>精选 session</h3>
        <button class="btn btn-icon" title="收起">${icon("archive")}</button>
      </div>
      <div class="session-list">
        <button class="session-item active">
          <strong>玩具测评候选精选</strong>
          <span>原始快照 324 · 第 ${state.round} 轮 · 已采纳 ${state.accepted}</span>
        </button>
        <button class="session-item">
          <strong>摄影器材候选精选</strong>
          <span>原始快照 186 · 第 2 轮 · 昨天</span>
        </button>
      </div>
    </aside>
  `;
}

function snapshotCard() {
  return `
    <section class="panel snapshot-card">
      <div class="snapshot-top">
        <div>
          <h2>输入快照 · 标准搜索结果</h2>
          <p>这份列表已在进入智能精选时冻结。后续标准搜索条件变化，不影响当前 session。</p>
        </div>
        <div class="toolbar">
          <button class="btn" data-action="back-search">${icon("back")} 返回标准结果</button>
          <button class="btn">查看来源条件</button>
        </div>
      </div>
      <div class="snapshot-stats">
        <div class="stat-cell"><span>候选频道</span><strong>324</strong></div>
        <div class="stat-cell"><span>平台</span><strong>YouTube</strong></div>
        <div class="stat-cell"><span>生成时间</span><strong>05-27 14:20</strong></div>
        <div class="stat-cell"><span>当前轮次</span><strong>第 ${state.round} 轮</strong></div>
      </div>
      <div class="pill-row">
        ${chip("关键词：toy unboxing", true)}
        ${chip("地区：美国")}
        ${chip("粉丝量：10万 - 100万")}
        ${chip("排除：纯动画儿歌")}
      </div>
    </section>
  `;
}

function strategyPanel() {
  const isRescreen = state.mode === "rescreen";
  const buttonLabel = isRescreen ? "重新生成这一轮" : "继续筛";
  const baseText = isRescreen ? "本轮基底（第 1 轮之前）" : `当前列表（第 ${state.round} 轮，${state.resultSet.length} 个）`;
  const note = isRescreen ? "重新筛将基于本轮基底重新生成，不沿用当前结果继续收窄。" : "下一条策略将继续收窄当前结果。";
  return `
    <section class="panel strategy-panel">
      <div class="rescreen-banner">
        重新筛模式：将基于本轮基底重新生成，不沿用当前结果继续收窄。
      </div>
      <div class="strategy-bar">
        <button class="base-selector" data-action="toggle-base">基于：${baseText} ▾</button>
        <span class="mode-note">${note}</span>
      </div>
      <div class="strategy-input-row">
        <textarea class="strategy-input">${isRescreen ? "换个方向，优先看内容专业度和家长信任感，不再强调娱乐表现。" : "继续筛，重点看近期更新稳定、妈妈群体适配度高、合作气质成熟的频道。"}</textarea>
        <button class="btn btn-primary" data-action="${isRescreen ? "run-rescreen" : "continue-filter"}">${icon("spark")} ${buttonLabel}</button>
      </div>
      <div class="strategy-summary">
        <div class="summary-cell"><span>优先</span><p>真实测评、亲子场景、更新稳定</p></div>
        <div class="summary-cell"><span>排除</span><p>纯动画儿歌、低质搬运、泛娱乐账号</p></div>
        <div class="summary-cell"><span>重点研究</span><p>妈妈群体适配度、品牌合作气质</p></div>
      </div>
    </section>
  `;
}

function resultBoard() {
  return `
    <section class="panel">
      <div class="board-head">
        <div>
          <h2>当前轮次结果</h2>
          <div class="board-meta">基于：${state.round === 1 ? "原始快照" : `第 ${state.round - 1} 轮结果`} · 当前 ${state.resultSet.length} 个 · 相对原始快照保留约 ${Math.round((state.resultSet.length / 324) * 100)}%</div>
        </div>
        <div class="toolbar">
          <div class="collection-summary">
            <span class="collection-pill">已采纳 ${state.accepted}</span>
            <span class="collection-pill">已排除 ${state.excluded}</span>
          </div>
          <button class="btn" data-action="enter-rescreen">重新筛本轮</button>
        </div>
      </div>
      <div class="result-status">
        <div class="stat-cell"><span>本轮基底</span><strong>${state.round === 1 ? "原始快照" : `第 ${state.round - 1} 轮`}</strong></div>
        <div class="stat-cell"><span>本轮结果</span><strong>${state.resultSet.length}</strong></div>
        <div class="stat-cell"><span>相对基底</span><strong>${state.round === 1 ? "-319" : "-2"}</strong></div>
        <div class="stat-cell"><span>相对原始快照</span><strong>${state.resultSet.length} / 324</strong></div>
      </div>
      <div class="creator-list">
        ${state.resultSet.map((item) => creatorRow(item, "curation")).join("")}
      </div>
    </section>
  `;
}

function workbenchPage() {
  const content = `
    <section class="page">
      <div class="page-head">
        <div>
          <h1>智能精选工作台</h1>
          <p>对冻结的频道列表快照做深筛。这里不是重新搜索全库，而是在当前候选范围内继续收敛 shortlist。</p>
        </div>
        <button class="btn btn-primary">导出 shortlist</button>
      </div>
      <div class="workbench">
        ${sessionPanel()}
        <div class="work-main">
          ${snapshotCard()}
          ${strategyPanel()}
          ${resultBoard()}
        </div>
      </div>
    </section>
  `;
  return shell(content, "curation");
}

function showToast(message) {
  state.toast = message;
  render();
  window.setTimeout(() => {
    state.toast = "";
    render();
  }, 1600);
}

function render() {
  document.body.dataset.mode = state.mode;
  document.getElementById("app").innerHTML = state.page === "search" ? searchResultsPage() : workbenchPage();
}

document.addEventListener("click", (event) => {
  const action = event.target.closest("[data-action]")?.dataset.action;
  if (!action) return;

  if (action === "create-snapshot") {
    state.page = "curation";
    state.mode = "continue";
    showToast("已基于当前 324 个候选频道创建输入快照");
    return;
  }
  if (action === "back-search") {
    state.page = "search";
    state.mode = "continue";
    render();
    return;
  }
  if (action === "continue-filter") {
    state.round += 1;
    state.resultSet = refinedCreators;
    state.mode = "continue";
    showToast("已基于当前列表继续筛选，生成新一轮结果");
    return;
  }
  if (action === "enter-rescreen") {
    state.mode = "rescreen";
    render();
    return;
  }
  if (action === "run-rescreen") {
    state.round += 1;
    state.resultSet = [creators[3], creators[0], creators[4]];
    state.mode = "continue";
    showToast("已基于本轮基底重新生成");
    return;
  }
  if (action === "accept") {
    state.accepted += 1;
    showToast("已采纳到当前 session");
    return;
  }
  if (action === "exclude") {
    state.excluded += 1;
    showToast("已排除，后续轮次不再优先展示");
    return;
  }
  if (action === "toggle-base") {
    showToast("基底选择器 v0：当前列表 / 原始快照 / 最近 3 轮");
  }
});

render();
