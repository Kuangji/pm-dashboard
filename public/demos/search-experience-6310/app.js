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

const refinedCreators = [creators[0], creators[3], creators[4]].map((item) => ({ ...item }));

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
  entry: "A",
  intent: "agent",
  mode: "continue",
  round: 1,
  searchRound: 1,
  recallAdjusted: false,
  resultSet: creators,
  accepted: 0,
  excluded: 0,
  snapshotLabel: "当前召回结果快照",
  outputSize: 20,
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
    edit: "✎",
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
          <a class="side-item ${active === "confirm" ? "active" : ""}"><span class="side-dot"></span>任务确认</a>
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
  const chips = state.searchRound > 1 ? adjustedSearchConditions : initialSearchConditions;
  const boardMeta = state.searchRound > 1 ? "重新召回结果 · 286 个候选频道 · Agent 确认条件已生效" : "324 个候选频道 · 默认排序 · 当前条件已生效";
  const content = `
    <section class="page">
      <div class="page-head">
        <div>
          <h1>频道搜索</h1>
          <p>标准搜索负责召回候选池；639 自然语言能力负责把需求转成可执行的搜索条件。</p>
        </div>
        <button class="btn">导出结果</button>
      </div>

      <section class="panel nl-panel">
        <div>
          <h2>639 自然语言搜索</h2>
          <p>输入一句营销需求，先生成确认卡；确认抽屉里再选择先看搜索结果或自然语言直达智能精选。</p>
        </div>
        <div class="nl-input">帮我找美国母婴玩具测评频道，适合新品推广，优先真人出镜、近期更新稳定，不要纯动画儿歌。</div>
        <div class="toolbar">
          <button class="btn btn-primary" data-action="nl-open-confirm">${icon("spark")} 生成确认卡</button>
        </div>
      </section>

      <section class="panel search-box">
        <div class="search-row">
          <div class="search-input">toy unboxing</div>
          <button class="btn btn-primary">${icon("search")} 搜索</button>
          <button class="btn">${icon("filter")} 更多筛选</button>
        </div>
        <div class="filter-row">${chips.map((item, index) => chip(item, index < 2)).join("")}</div>
      </section>

      <section class="panel">
        <div class="board-head">
          <div>
            <h2>标准搜索结果</h2>
            <div class="board-meta">${boardMeta}</div>
          </div>
          <div class="toolbar">
            <button class="btn">隐藏不适合结果</button>
            <button class="btn btn-primary" data-action="snapshot-confirm">${icon("spark")} 对当前结果做智能精选</button>
          </div>
        </div>
        <div class="creator-list">${creators.map((item) => creatorRow(item)).join("")}</div>
      </section>
    </section>
  `;
  return shell(content + confirmDrawer(), "search");
}

function taskBaseCard() {
  const isEntryA = state.entry === "A";
  const adjusted = state.recallAdjusted || !isEntryA;
  const title = isEntryA && !adjusted ? "轻确认：基于当前结果" : "完整确认：重新召回后精选";
  const description = isEntryA && !adjusted
    ? "默认冻结当前可见召回结果，用户只补充精选策略和输出目标。"
    : "确认后先按召回条件重新执行标准搜索，再冻结新结果快照交给 Agent 精选。";
  return `
    <section class="confirm-card confirm-base">
      <div>
        <div class="confirm-eyebrow">任务基底</div>
        <h2>${title}</h2>
        <p>${description}</p>
      </div>
      <div class="base-flow">
        <span>${isEntryA && !adjusted ? "当前召回结果" : "确认后的召回条件"}</span>
        <span>→</span>
        <span>${isEntryA && !adjusted ? "冻结快照" : "重新召回"}</span>
        <span>→</span>
        <span>Agent 智能精选</span>
      </div>
      <div class="toolbar">
        ${isEntryA && !adjusted ? `<button class="btn" data-action="adjust-recall">${icon("edit")} 调整召回条件</button>` : ""}
        ${isEntryA && adjusted ? `<button class="btn" data-action="keep-current-snapshot">改回基于当前结果</button>` : ""}
      </div>
    </section>
  `;
}

function recallConditionsCard() {
  const adjusted = state.recallAdjusted || state.entry === "B";
  const conditions = adjusted ? adjustedSearchConditions : initialSearchConditions;
  const helper = adjusted
    ? "召回条件已进入可编辑状态；确认后会重新召回，不再直接使用当前可见列表。"
    : "入口 A 默认只展示来源条件；如需修改，可点击“调整召回条件”切换成重新召回后精选。";
  return `
    <section class="confirm-card">
      <div class="confirm-section-head">
        <div>
          <div class="confirm-eyebrow">SearchInput</div>
          <h3>召回条件</h3>
        </div>
        <span class="status-badge ${adjusted ? "warning" : ""}">${adjusted ? "将重新召回" : "来源条件"}</span>
      </div>
      <p>${helper}</p>
      <div class="condition-grid">
        ${conditions.map((item) => `<button class="condition-token">${item}</button>`).join("")}
      </div>
      <div class="inline-editor ${adjusted ? "show" : ""}">
        <label>用户修改后的补充条件</label>
        <textarea>优先美国和加拿大市场；粉丝量可以放宽到 500 万；排除纯动画儿歌、搬运和内容低质账号。</textarea>
      </div>
    </section>
  `;
}

function strategyConfirmCard() {
  return `
    <section class="confirm-card">
      <div class="confirm-section-head">
        <div>
          <div class="confirm-eyebrow">CurationIntent</div>
          <h3>精选策略</h3>
        </div>
        <span class="status-badge">Agent 精筛输入</span>
      </div>
      <p>这部分不改变召回池，只告诉 Agent 在候选池里优先谁、排除谁、如何解释 shortlist。</p>
      <div class="strategy-input-row single">
        <textarea class="strategy-input">优先真实玩具测评、亲子家庭场景、近期更新稳定、妈妈群体适配度高、品牌合作气质成熟的频道；排除纯动画儿歌、搬运号和泛娱乐账号。</textarea>
      </div>
      <div class="strategy-summary">
        <div class="summary-cell"><span>优先</span><p>真实测评、亲子场景、更新稳定</p></div>
        <div class="summary-cell"><span>排除</span><p>纯动画儿歌、低质搬运、泛娱乐账号</p></div>
        <div class="summary-cell"><span>解释</span><p>给出入选理由、风险标记、适合作用</p></div>
      </div>
    </section>
  `;
}

function outputTargetCard() {
  return `
    <section class="confirm-card">
      <div class="confirm-section-head">
        <div>
          <div class="confirm-eyebrow">Output</div>
          <h3>输出目标</h3>
        </div>
        <span class="status-badge">当前 ${state.outputSize} 个</span>
      </div>
      <p>决定 Agent 最终交付物的颗粒度。v0 先验证 shortlist 数量、理由和风险标记。</p>
      <div class="segmented">
        <button class="${state.outputSize === 20 ? "active" : ""}" data-action="set-output-20">20 个精简 shortlist</button>
        <button class="${state.outputSize === 50 ? "active" : ""}" data-action="set-output-50">50 个备选池</button>
      </div>
    </section>
  `;
}

function confirmDrawer() {
  if (!state.drawerOpen) return "";
  const isEntryA = state.entry === "A";
  const adjusted = state.recallAdjusted || !isEntryA;
  const intro = isEntryA
    ? "入口 A：从标准搜索结果页进入。默认轻确认；若修改召回条件，则切换为重新召回后精选。"
    : "入口 B：从自然语言进入。默认完整确认，因为输入质量会同时影响召回和精选。";
  const primaryText = adjusted ? "直接智能精选：重新召回后执行" : "直接智能精选：基于当前结果";
  const secondaryText = adjusted ? "确认条件，先看搜索结果" : "返回当前搜索结果";
  return `
    <div class="drawer-mask" data-action="close-drawer"></div>
    <aside class="confirm-drawer" aria-label="Agent 任务确认">
      <div class="drawer-head">
        <div>
          <h1>Agent 任务确认</h1>
          <p>${intro}</p>
        </div>
        <button class="btn btn-icon" data-action="close-drawer">${icon("close")}</button>
      </div>
      <div class="drawer-body">
        ${taskBaseCard()}
        ${recallConditionsCard()}
        ${strategyConfirmCard()}
        ${outputTargetCard()}
      </div>
      <div class="drawer-footer">
        <div class="drawer-hint">
          <strong>确认后会发生什么</strong>
          <span>${adjusted ? "按召回条件重新搜索，再冻结新快照。" : "冻结当前标准搜索结果为输入快照。"}然后把精选策略交给 Agent，输出 ${state.outputSize} 个 shortlist。</span>
        </div>
        <div class="drawer-actions">
          <button class="btn" data-action="confirm-results">${secondaryText}</button>
          <button class="btn btn-primary" data-action="confirm-agent">${icon("spark")} ${primaryText}</button>
        </div>
      </div>
    </aside>
  `;
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
          <span>${state.snapshotLabel} · 第 ${state.round} 轮 · 已采纳 ${state.accepted}</span>
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
  const snapshotCount = state.snapshotLabel.includes("重新召回") ? 286 : 324;
  return `
    <section class="panel snapshot-card">
      <div class="snapshot-top">
        <div>
          <h2>输入快照 · ${state.snapshotLabel}</h2>
          <p>智能精选只处理已冻结的候选快照。召回条件和精选策略已在确认卡里形成任务输入合同。</p>
        </div>
        <div class="toolbar">
          <button class="btn" data-action="back-search">${icon("back")} 返回标准结果</button>
          <button class="btn" data-action="review-confirm">查看任务确认</button>
        </div>
      </div>
      <div class="snapshot-stats">
        <div class="stat-cell"><span>候选频道</span><strong>${snapshotCount}</strong></div>
        <div class="stat-cell"><span>平台</span><strong>YouTube</strong></div>
        <div class="stat-cell"><span>输出目标</span><strong>${state.outputSize} 个</strong></div>
        <div class="stat-cell"><span>当前轮次</span><strong>第 ${state.round} 轮</strong></div>
      </div>
      <div class="pill-row">
        ${(state.snapshotLabel.includes("重新召回") ? adjustedSearchConditions : initialSearchConditions).map((item, index) => chip(item, index === 0)).join("")}
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
      <div class="rescreen-banner">重新筛模式：将基于本轮基底重新生成，不沿用当前结果继续收窄。</div>
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
          <div class="board-meta">基于：${state.round === 1 ? state.snapshotLabel : `第 ${state.round - 1} 轮结果`} · 当前 ${state.resultSet.length} 个 · 相对输入快照保留约 ${Math.round((state.resultSet.length / 324) * 100)}%</div>
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
        <div class="stat-cell"><span>本轮基底</span><strong>${state.round === 1 ? "输入快照" : `第 ${state.round - 1} 轮`}</strong></div>
        <div class="stat-cell"><span>本轮结果</span><strong>${state.resultSet.length}</strong></div>
        <div class="stat-cell"><span>输出目标</span><strong>${state.outputSize}</strong></div>
        <div class="stat-cell"><span>任务入口</span><strong>${state.entry === "A" ? "入口 A" : "入口 B"}</strong></div>
      </div>
      <div class="creator-list">${state.resultSet.map((item) => creatorRow(item, "curation")).join("")}</div>
    </section>
  `;
}

function workbenchPage() {
  const content = `
    <section class="page">
      <div class="page-head">
        <div>
          <h1>智能精选工作台</h1>
          <p>Agent 在确认后的输入快照内筛选 shortlist；后续继续筛 / 重新筛都不改变标准搜索召回职责。</p>
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
  return shell(content + confirmDrawer(), "curation");
}

function showToast(message) {
  state.toast = message;
  render();
  window.setTimeout(() => {
    state.toast = "";
    render();
  }, 1600);
}

function openConfirm(entry, adjusted = false) {
  state.drawerOpen = true;
  state.entry = entry;
  state.recallAdjusted = adjusted;
  state.mode = "continue";
  render();
}

function startCuration() {
  const shouldRecall = state.entry === "B" || state.recallAdjusted;
  state.drawerOpen = false;
  state.page = "curation";
  state.mode = "continue";
  state.round = 1;
  state.resultSet = refinedCreators;
  state.snapshotLabel = shouldRecall ? "重新召回结果快照" : "当前召回结果快照";
  if (shouldRecall) state.searchRound = 2;
  showToast(shouldRecall ? "已重新召回并冻结新快照，开始智能精选" : "已冻结当前结果快照，开始智能精选");
}

function render() {
  document.body.dataset.mode = state.mode;
  const app = document.getElementById("app");
  if (state.page === "search") app.innerHTML = searchResultsPage();
  if (state.page === "curation") app.innerHTML = workbenchPage();
}

document.addEventListener("click", (event) => {
  const action = event.target.closest("[data-action]")?.dataset.action;
  if (!action) return;

  if (action === "snapshot-confirm") {
    openConfirm("A", false);
    return;
  }
  if (action === "nl-open-confirm") {
    openConfirm("B", true);
    return;
  }
  if (action === "close-drawer") {
    state.drawerOpen = false;
    render();
    return;
  }
  if (action === "adjust-recall") {
    state.recallAdjusted = true;
    showToast("已切换为：重新召回后精选");
    return;
  }
  if (action === "keep-current-snapshot") {
    state.recallAdjusted = false;
    showToast("已改回：基于当前结果轻确认");
    return;
  }
  if (action === "confirm-results") {
    state.drawerOpen = false;
    state.page = "search";
    if (state.entry === "B" || state.recallAdjusted) {
      state.searchRound = 2;
      showToast("已按确认后的召回条件展示新一轮搜索结果");
    } else {
      showToast("已返回当前标准搜索结果");
    }
    return;
  }
  if (action === "confirm-agent") {
    startCuration();
    return;
  }
  if (action === "review-confirm") {
    state.drawerOpen = true;
    render();
    return;
  }
  if (action === "back-search") {
    state.drawerOpen = false;
    state.page = "search";
    state.mode = "continue";
    render();
    return;
  }
  if (action === "set-output-20" || action === "set-output-50") {
    state.outputSize = action === "set-output-20" ? 20 : 50;
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
    showToast("基底选择器 v0：当前列表 / 输入快照 / 最近 3 轮");
  }
});

render();
