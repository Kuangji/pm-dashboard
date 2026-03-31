const CHANNEL_DECISIONS = [
  "频道搜索页一级只分标准搜索与 AI搜索",
  "自然语言是标准搜索输入形态，不是一级模式",
  "标准搜索自然语言最终必须回填现有 schema 参数",
  "AI搜索与标准搜索互切时各自保留 session",
  "AI搜索允许一键带入当前标准搜索条件",
  "AI搜索默认按 10 条批次结果设计",
  "AI搜索不做解释层与逐条匹配理由",
];

const SIMILAR_DECISIONS = [
  "相似网红继续独立为默认入口域",
  "新默认流程改为单频道输入 + 多模态向量召回",
  "旧收藏夹方案保留为页内次级 Tab",
  "新相似网红结果仍是普通结果列表",
  "相似网红不并入 AI搜索 批次消费流程",
];

const DATA = {
  workstreams: {
    channel: {
      label: "频道搜索模式升级",
      sections: {
        standard: {
          label: "标准搜索",
          decisions: CHANNEL_DECISIONS,
          scenes: [
            {
              id: "standard-keyword",
              label: "关键词基线",
              title: "标准搜索 · 关键词模式基线",
              summary: "保留现有关键词搜索心智，作为自然语言输入模式的稳定对照组。",
              goals: [
                "确保关键词模式不回归",
                "让用户明确感知标准搜索仍然存在",
                "为自然语言模式提供稳定参照",
              ],
              rules: [
                "搜索 API、结果卡和排序逻辑沿用现有标准搜索",
                "关键词模式不新增会话区或 AI 结果协议",
                "只在搜索区内增加输入形态切换",
              ],
              checks: [
                "关键词输入主路径清楚可见",
                "现有筛选区与结果列表骨架稳定",
                "自然语言模式未抢占主认知",
              ],
              render: renderStandardKeyword,
            },
            {
              id: "standard-natural-input",
              label: "自然语言输入",
              title: "标准搜索 · 自然语言输入形态",
              summary: "自然语言只是更友好的建参入口，用户仍处于标准搜索工作流中。",
              goals: [
                "建立关键词 / 自然语言显式切换",
                "允许用户用一句话描述需求",
                "仍然保持标准搜索语义",
              ],
              rules: [
                "自然语言模式不单列为一级模式",
                "输入区语义是建参，不是 AI 会话",
                "提交后要回落到现有参数体系",
              ],
              checks: [
                "用户能一眼看懂自己还在标准搜索里",
                "自然语言输入框与关键词模式明显区分",
                "提交动作明确可执行",
              ],
              render: renderStandardNaturalInput,
            },
            {
              id: "standard-natural-backfill",
              label: "回填出结果",
              title: "标准搜索 · 自然语言回填现有参数",
              summary: "系统将自然语言解析结果回填到关键词与筛选参数，再出标准搜索结果。",
              goals: [
                "把自然语言显式回落到 schema 参数体系",
                "让用户看到现有搜索控件被重新组织",
                "维持标准结果页心智",
              ],
              rules: [
                "不新增解释层",
                "不新增追问流",
                "结果仍然是标准搜索结果列表",
              ],
              checks: [
                "回填后的参数可被直观看见",
                "结果列表仍是原搜索体系",
                "用户理解这是‘建参后搜索’，不是另一种结果协议",
              ],
              render: renderStandardNaturalBackfill,
            },
          ],
        },
        ai: {
          label: "AI搜索（智能精选）",
          decisions: CHANNEL_DECISIONS,
          scenes: [
            {
              id: "ai-blank",
              label: "空白起手",
              title: "AI搜索 · 从 0 开始搜索",
              summary: "用户从空白自然语言起手，建立独立于标准搜索的探索式工作流。",
              goals: [
                "明确 AI搜索是独立模式",
                "允许自然语言直接起搜",
                "提供带入当前条件的桥接入口",
              ],
              rules: [
                "AI搜索与标准搜索互切时不自动同步",
                "AI搜索允许一键带入当前标准搜索条件",
                "顶部只保留必要的搜索上下文，不做解释层",
              ],
              checks: [
                "空白起手和带条件起手都能被理解",
                "模式切换和标准搜索边界清楚",
                "主按钮与次级按钮层级清楚",
              ],
              render: renderAiBlank,
            },
            {
              id: "ai-seeded",
              label: "带条件起手",
              title: "AI搜索 · 带入当前标准搜索条件",
              summary: "从标准搜索显式桥接进入 AI搜索，带着当前条件继续探索。",
              goals: [
                "让已有标准搜索条件成为 AI搜索 的种子",
                "避免用户重复重写完整 query",
                "保持桥接是用户主动行为",
              ],
              rules: [
                "只允许显式带入，不自动继承",
                "带入后的条件只影响当前 AI搜索 session",
                "标准搜索原状态保留不被改写",
              ],
              checks: [
                "带入条件的来源被看见",
                "用户仍可直接修改 query",
                "用户能理解这是新 session，不是标准搜索继续编辑",
              ],
              render: renderAiSeeded,
            },
            {
              id: "ai-running",
              label: "执行中",
              title: "AI搜索 · AI任务执行中",
              summary: "批次执行中必须有明确过程感，避免‘空白但不知道是不是还在搜’。",
              goals: [
                "建立稳定的过程反馈",
                "让用户知道系统正在生成当前批次",
                "避免误判为空态",
              ],
              rules: [
                "执行态必须锁定当前 query",
                "结果区要用 skeleton 承接",
                "不能只剩空白页面",
              ],
              checks: [
                "状态提示明显",
                "结果区骨架稳定",
                "下一批或修改 query 的下一步动作仍可预测",
              ],
              render: renderAiRunning,
            },
            {
              id: "ai-batch-results",
              label: "一批结果",
              title: "AI搜索 · 一批结果 + 逐项消费",
              summary: "当前批次结果返回后，用户对每项做采纳、排除或待定。",
              goals: [
                "建立结果消费感",
                "让单项反馈动作轻且可持续",
                "为下一批提供明确前置动作",
              ],
              rules: [
                "单项状态只允许 accepted / excluded / pending",
                "accepted 只进入本次 session 候选池",
                "此页仍是搜索工具，不是收藏操作页",
              ],
              checks: [
                "卡片操作层级清楚",
                "用户能区分三种判断动作",
                "页面没有变成重型工作台",
              ],
              render: renderAiBatchResults,
            },
            {
              id: "ai-summary-expanded",
              label: "摘要展开",
              title: "AI搜索 · 顶部摘要展开",
              summary: "顶部摘要默认看计数，必要时展开查看已采纳、待定与排除明细。",
              goals: [
                "让用户知道本次 session 已经消费了什么",
                "避免固定侧栏带来的过重感",
                "维持结果区为主要工作区",
              ],
              rules: [
                "摘要默认展示计数",
                "展开后可看明细，不改结果列表主结构",
                "展开明细也不触发业务写入",
              ],
              checks: [
                "计数与明细一致",
                "展开层级可理解",
                "不会抢走当前批次结果的主视线",
              ],
              render: renderAiSummaryExpanded,
            },
            {
              id: "ai-next-batch",
              label: "下一批",
              title: "AI搜索 · 手动触发下一批",
              summary: "批次推进必须由用户主动控制，方便在两批之间判断和调 query。",
              goals: [
                "强化用户掌控节奏",
                "让批次边界足够清楚",
                "保留中途停下或改 query 的空间",
              ],
              rules: [
                "不做自动阈值推进",
                "下一批是主按钮",
                "按钮位置应贴近当前批次消费结束点",
              ],
              checks: [
                "用户知道什么时候可以进入下一批",
                "下一批不是隐式触发",
                "批次消费与批次推进被看成两个动作",
              ],
              render: renderAiNextBatch,
            },
            {
              id: "ai-query-adjust",
              label: "调 query 重搜",
              title: "AI搜索 · 修改条件后重新搜索",
              summary: "用户可随时修改自然语言 query，重新生成更贴近目标的批次。",
              goals: [
                "让调优成本低",
                "把 query 作为 AI搜索 的主编辑面",
                "明确重搜会生成新批次",
              ],
              rules: [
                "调优主要通过自然语言完成",
                "不引入完整显式筛选器编辑器",
                "重搜后重新进入执行态",
              ],
              checks: [
                "用户理解已换了一轮查询条件",
                "新批次与上一批区别清楚",
                "AI搜索仍保持独立 session 心智",
              ],
              render: renderAiQueryAdjust,
            },
          ],
        },
      },
    },
    similar: {
      label: "相似网红替换",
      sections: {
        core: {
          label: "相似网红",
          decisions: SIMILAR_DECISIONS,
          scenes: [
            {
              id: "similar-default",
              label: "新默认首屏",
              title: "相似网红 · 单频道种子搜索默认首屏",
              summary: "默认主流程从收藏夹输入改为单频道输入，让用户无需先准备收藏夹。",
              goals: [
                "把新默认入口做轻",
                "让单频道输入心智明确",
                "保留旧流程作为次级入口",
              ],
              rules: [
                "相似网红继续是独立入口",
                "新默认支持搜索 / URL / handle",
                "旧收藏夹方案仅作次级 Tab",
              ],
              checks: [
                "默认主入口不是收藏夹",
                "旧入口仍然可见",
                "用户能快速理解‘选一个频道找相似’",
              ],
              render: renderSimilarDefault,
            },
            {
              id: "similar-seeded",
              label: "种子锁定结果",
              title: "相似网红 · 单频道种子已锁定后的结果列表",
              summary: "锁定一个频道后，直接给标准相似结果列表，不走 AI搜索 批次消费流。",
              goals: [
                "强化单频道种子心智",
                "保持相似搜索的专业列表感",
                "体现新默认召回由向量逻辑驱动",
              ],
              rules: [
                "结果保持普通相似结果列表",
                "默认按相似程度排序",
                "不做采纳 / 排除 / 待定",
              ],
              checks: [
                "种子频道信息可见",
                "结果列表语义稳定",
                "用户不会误以为进入了 AI搜索",
              ],
              render: renderSimilarSeeded,
            },
            {
              id: "similar-legacy-tab",
              label: "旧流程次级入口",
              title: "相似网红 · 收藏夹相似搜索次级 Tab",
              summary: "旧方案仍保留可访问性，但降级为页内次级入口，不再占据默认主流程。",
              goals: [
                "照顾旧用户迁移",
                "不让旧方案继续主导默认入口",
                "让新旧主次关系清楚可见",
              ],
              rules: [
                "旧收藏夹流程保留为页内次级 Tab",
                "不抢新默认首屏主视觉",
                "不改造成新的默认心智",
              ],
              checks: [
                "旧流程仍然能访问",
                "新默认与旧入口主次清楚",
                "不会让页面结构变成双主入口",
              ],
              render: renderSimilarLegacyTab,
            },
          ],
        },
      },
    },
  },
};

const state = {
  workstream: "channel",
  section: "standard",
  scene: "standard-keyword",
};

const els = {
  workstreamTabs: document.getElementById("workstream-tabs"),
  sectionTabs: document.getElementById("section-tabs"),
  sceneTabs: document.getElementById("scene-tabs"),
  sectionTitle: document.getElementById("section-title"),
  sceneTitle: document.getElementById("scene-title"),
  sceneSummary: document.getElementById("scene-summary"),
  previewRoot: document.getElementById("preview-root"),
  goalList: document.getElementById("goal-list"),
  ruleList: document.getElementById("rule-list"),
  checkList: document.getElementById("check-list"),
  decisionTags: document.getElementById("decision-tags"),
};

function getWorkstream() {
  return DATA.workstreams[state.workstream];
}

function getSection() {
  return getWorkstream().sections[state.section];
}

function getScene() {
  return getSection().scenes.find((scene) => scene.id === state.scene);
}

function setDefaultSectionAndScene(workstreamKey) {
  const workstream = DATA.workstreams[workstreamKey];
  const firstSectionKey = Object.keys(workstream.sections)[0];
  state.workstream = workstreamKey;
  state.section = firstSectionKey;
  state.scene = workstream.sections[firstSectionKey].scenes[0].id;
}

function renderTabs(target, items, activeValue, onClick) {
  target.innerHTML = items
    .map(
      (item) => `
        <button class="${item.value === activeValue ? "is-active" : ""}" data-value="${item.value}">
          ${item.label}
        </button>
      `
    )
    .join("");

  target.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => onClick(button.dataset.value));
  });
}

function renderInspector(scene, decisions) {
  els.goalList.innerHTML = scene.goals.map((goal) => `<li>${goal}</li>`).join("");
  els.ruleList.innerHTML = scene.rules.map((rule) => `<li>${rule}</li>`).join("");
  els.checkList.innerHTML = scene.checks.map((check) => `<li>${check}</li>`).join("");
  els.decisionTags.innerHTML = decisions
    .map((decision) => `<span class="decision-tag">${decision}</span>`)
    .join("");
}

function renderPreview(scene) {
  els.previewRoot.innerHTML = `<div class="preview-canvas">${scene.render()}</div>`;
}

function render() {
  const workstream = getWorkstream();
  const section = getSection();
  const scene = getScene();

  renderTabs(
    els.workstreamTabs,
    Object.entries(DATA.workstreams).map(([value, meta]) => ({ value, label: meta.label })),
    state.workstream,
    (value) => {
      setDefaultSectionAndScene(value);
      render();
    }
  );

  renderTabs(
    els.sectionTabs,
    Object.entries(workstream.sections).map(([value, meta]) => ({ value, label: meta.label })),
    state.section,
    (value) => {
      state.section = value;
      state.scene = workstream.sections[value].scenes[0].id;
      render();
    }
  );

  renderTabs(
    els.sceneTabs,
    section.scenes.map((sceneItem) => ({ value: sceneItem.id, label: sceneItem.label })),
    state.scene,
    (value) => {
      state.scene = value;
      render();
    }
  );

  els.sectionTitle.textContent = workstream.label;
  els.sceneTitle.textContent = scene.title;
  els.sceneSummary.textContent = scene.summary;

  renderPreview(scene);
  renderInspector(scene, section.decisions);
}

function renderAppShell({ activeTop = "search", pageTitle, pageSummary, pageTabsHtml, bodyHtml }) {
  return `
    <div class="preview-app">
      <div class="app-topbar">
        <div class="app-brand">
          <div class="brand-mark"></div>
          <span>NOX 聚星</span>
        </div>
        <div class="topbar-meta">
          <span class="meta-pill">价格</span>
          <span class="meta-pill">消息中心</span>
          <span class="meta-pill">简体中文</span>
        </div>
      </div>
      <div class="app-subnav">
        <div class="subnav-links">
          ${renderSubnav(activeTop)}
        </div>
        <div class="page-tabs">${pageTabsHtml}</div>
      </div>
      <div class="app-body">
        <div class="search-card-header">
          <div>
            <p class="kicker">Page Context</p>
            <h3>${pageTitle}</h3>
            <p>${pageSummary}</p>
          </div>
        </div>
        ${bodyHtml}
      </div>
    </div>
  `;
}

function renderSubnav(active) {
  const tabs = [
    { key: "search", label: "搜索" },
    { key: "social", label: "其他社媒" },
    { key: "ttshop", label: "TT Shop" },
    { key: "similar", label: "相似网红" },
  ];

  return tabs
    .map(
      (tab) => `<span class="subnav-link ${tab.key === active ? "is-active" : ""}">${tab.label}</span>`
    )
    .join("");
}

function creatorCard({
  name,
  handle,
  tags,
  metrics,
  scoreLabel,
  scoreClass = "",
  actions = [],
  similarity,
}) {
  const tagHtml = tags.map((tag) => `<span class="list-chip">${tag}</span>`).join("");
  const metricHtml = metrics.map((metric) => `<span>${metric}</span>`).join("");
  const actionHtml = actions
    .map(
      (action) =>
        `<span class="action-btn ${action.state ? `is-${action.state}` : ""}">${action.label}</span>`
    )
    .join("");

  return `
    <article class="creator-card">
      <div class="creator-avatar"></div>
      <div class="creator-main">
        <div class="creator-title">
          <h4>${name}</h4>
          <span>${handle}</span>
        </div>
        <div class="pill-row">${tagHtml}</div>
        <div class="creator-metrics">${metricHtml}</div>
      </div>
      <div class="creator-side">
        <div class="score-row">
          ${similarity ? `<span class="score-chip similarity-chip">${similarity}</span>` : ""}
          <span class="score-chip ${scoreClass}">${scoreLabel}</span>
        </div>
        <div class="result-actions">${actionHtml}</div>
      </div>
    </article>
  `;
}

function standardSearchLayout({ activeInput = "keyword", queryBox, contextStrip = "", summaryStrip = "", resultsHtml }) {
  return `
    ${contextStrip}
    <section class="search-card">
      <div class="search-surface">
        <div class="input-mode-tabs">
          <span class="input-tab ${activeInput === "keyword" ? "is-active" : ""}">关键词</span>
          <span class="input-tab ${activeInput === "natural" ? "is-active" : ""}">自然语言</span>
        </div>
        ${queryBox}
        ${summaryStrip}
      </div>
    </section>
    ${resultsHtml}
  `;
}

function aiSearchLayout({ contextStrip = "", searchBox, bucketBoard = "", resultsHtml }) {
  return `
    ${contextStrip}
    <section class="search-card">
      <div class="search-surface">
        <div class="input-mode-tabs">
          <span class="page-tab">标准搜索</span>
          <span class="page-tab is-active">AI搜索（智能精选）</span>
        </div>
        ${searchBox}
      </div>
    </section>
    ${bucketBoard}
    ${resultsHtml}
  `;
}

function renderStandardKeyword() {
  const queryBox = `
    <div class="search-bar">
      <div class="search-label"><span class="accent-dot"></span>关键词搜索</div>
      <div class="readonly-field">输入关键字、频道名、URL 或 Amazon 链接，按 Enter 开始搜索</div>
      <div class="pill-row">
        <span class="read-pill">地区：美国</span>
        <span class="read-pill">粉丝量：10万 - 100万</span>
        <span class="list-chip">关键词：gaming</span>
      </div>
      <div class="cta-row">
        <button class="cta-btn">搜索</button>
        <button class="ghost-btn">更多筛选</button>
      </div>
    </div>
  `;

  const resultsHtml = `
    <section class="result-board">
      <div class="board-head">
        <h3>标准搜索结果</h3>
        <div class="board-meta">6.05万 条结果 · 默认排序</div>
      </div>
      <div class="card-stack">
        ${creatorCard({
          name: "Markiplier",
          handle: "@markiplier",
          tags: ["gaming", "action game", "US"],
          metrics: ["粉丝 3850万", "近 30 天均播 160.12万", "地区 美国"],
          scoreLabel: "合作倾向 5/10",
          actions: [{ label: "加入名单" }, { label: "找相似" }],
        })}
        ${creatorCard({
          name: "FGTeeV",
          handle: "@fgteev",
          tags: ["family", "kids gaming", "US"],
          metrics: ["粉丝 2520万", "近 30 天均播 47.12万", "地区 美国"],
          scoreLabel: "合作倾向 1/10",
          actions: [{ label: "加入名单" }, { label: "找相似" }],
        })}
      </div>
    </section>
  `;

  return renderAppShell({
    activeTop: "search",
    pageTitle: "频道搜索 · 标准搜索",
    pageSummary: "关键词模式保持现状，只在搜索区里增加输入形态切换。",
    pageTabsHtml: '<span class="page-tab is-active">标准搜索</span><span class="page-tab">AI搜索</span>',
    bodyHtml: standardSearchLayout({ activeInput: "keyword", queryBox, resultsHtml }),
  });
}

function renderStandardNaturalInput() {
  const queryBox = `
    <div class="search-bar">
      <div class="search-label"><span class="accent-dot"></span>自然语言建参</div>
      <div class="search-textarea">帮我找美国做母婴玩具开箱、粉丝 10 万到 100 万、近 30 天还在持续更新的 YouTube 频道</div>
      <div class="pill-row">
        <span class="list-chip">输出仍回到标准搜索参数体系</span>
        <span class="list-chip">不进入 AI 搜索批次工作流</span>
      </div>
      <div class="cta-row">
        <button class="cta-btn">解析并搜索</button>
        <button class="ghost-btn">示例需求</button>
      </div>
    </div>
  `;

  const resultsHtml = `
    <section class="result-board">
      <div class="empty-state">
        <div class="empty-illustration"></div>
        <p class="empty-title">等待把自然语言回填为标准搜索参数</p>
        <p class="empty-copy">提交后系统会把 query 映射为关键词和筛选条件，再走现有频道搜索结果页。</p>
      </div>
    </section>
  `;

  return renderAppShell({
    activeTop: "search",
    pageTitle: "频道搜索 · 标准搜索 / 自然语言",
    pageSummary: "自然语言只是更友好的建参入口，用户仍然处于标准搜索心智中。",
    pageTabsHtml: '<span class="page-tab is-active">标准搜索</span><span class="page-tab">AI搜索</span>',
    bodyHtml: standardSearchLayout({ activeInput: "natural", queryBox, resultsHtml }),
  });
}

function renderStandardNaturalBackfill() {
  const summaryStrip = `
    <div class="summary-strip">
      <div class="summary-copy">
        <span class="status-pill">已回填参数</span>
        <p>自然语言已转换为关键词、地区、粉丝量与活跃度约束，当前已进入标准搜索结果页。</p>
      </div>
    </div>
  `;

  const queryBox = `
    <div class="search-bar">
      <div class="search-label"><span class="accent-dot"></span>自然语言建参</div>
      <div class="search-textarea">帮我找美国做母婴玩具开箱、粉丝 10 万到 100 万、近 30 天还在持续更新的 YouTube 频道</div>
      <div class="pill-row">
        <span class="read-pill">关键词：toy unboxing</span>
        <span class="read-pill">地区：美国</span>
        <span class="read-pill">粉丝量：10万 - 100万</span>
        <span class="read-pill">活跃度：近 30 天更新</span>
      </div>
      <div class="cta-row">
        <button class="cta-btn">重新解析</button>
        <button class="ghost-btn">切回关键词模式</button>
      </div>
    </div>
  `;

  const resultsHtml = `
    <section class="result-board">
      <div class="board-head">
        <h3>标准搜索结果</h3>
        <div class="board-meta">1,248 条结果 · 默认排序</div>
      </div>
      <div class="card-stack">
        ${creatorCard({
          name: "The Fizzy Show",
          handle: "@TheFizzyShow",
          tags: ["toys", "family", "kids"],
          metrics: ["粉丝 543万", "近 30 天均播 56.91万", "地区 美国"],
          scoreLabel: "合作倾向 3/10",
          actions: [{ label: "加入名单" }, { label: "找相似" }],
        })}
        ${creatorCard({
          name: "Caleb Kids Show",
          handle: "@CalebKidsShow",
          tags: ["kids", "toy review", "US"],
          metrics: ["粉丝 209万", "近 30 天均播 85.35万", "地区 美国"],
          scoreLabel: "合作倾向 3/10",
          actions: [{ label: "加入名单" }, { label: "找相似" }],
        })}
      </div>
    </section>
  `;

  return renderAppShell({
    activeTop: "search",
    pageTitle: "频道搜索 · 自然语言回填后的标准结果页",
    pageSummary: "用户看到的是现有参数体系被重组，而不是另起一套 AI 结果协议。",
    pageTabsHtml: '<span class="page-tab is-active">标准搜索</span><span class="page-tab">AI搜索</span>',
    bodyHtml: standardSearchLayout({ activeInput: "natural", queryBox, summaryStrip, resultsHtml }),
  });
}

function renderAiBlank() {
  const searchBox = `
    <div class="search-bar">
      <div class="search-label"><span class="accent-dot"></span>AI 搜索工作台</div>
      <div class="search-textarea placeholder">描述你要找的频道，例如：帮我找美国做户外跑步装备测评、互动率高、最近一个月持续更新的 YouTube 频道</div>
      <div class="pill-row">
        <span class="list-chip">从 0 开始搜索</span>
        <span class="list-chip">探索式批次召回</span>
      </div>
      <div class="cta-row">
        <button class="cta-btn">开始 AI搜索</button>
        <button class="ghost-btn">带入当前标准搜索条件</button>
      </div>
    </div>
  `;

  const resultsHtml = `
    <section class="result-board">
      <div class="empty-state">
        <div class="empty-illustration"></div>
        <p class="empty-title">从 0 开始 AI 搜索</p>
        <p class="empty-copy">输入自然语言后，系统将按批次返回少量候选，供你逐项采纳、排除或待定。</p>
      </div>
    </section>
  `;

  return renderAppShell({
    activeTop: "search",
    pageTitle: "频道搜索 · AI搜索（智能精选）",
    pageSummary: "AI搜索是独立于标准搜索的探索式工作流，不回写标准搜索参数。",
    pageTabsHtml: '<span class="page-tab">标准搜索</span><span class="page-tab is-active">AI搜索</span>',
    bodyHtml: aiSearchLayout({ searchBox, resultsHtml }),
  });
}

function renderAiSeeded() {
  const contextStrip = `
    <section class="context-strip">
      <div class="context-copy">
        <h3>已带入当前标准搜索条件</h3>
        <p>来自标准搜索：地区美国 / 粉丝量 10万-100万 / 关键词 running gear。当前条件只作为本次 AI搜索 的起点。</p>
      </div>
      <button class="ghost-btn">清空重来</button>
    </section>
  `;

  const searchBox = `
    <div class="search-bar">
      <div class="search-label"><span class="accent-dot"></span>AI 搜索工作台</div>
      <div class="search-textarea">再帮我更偏向真实测评型频道，最近 30 天至少更新 4 次，不要太泛娱乐。</div>
      <div class="pill-row">
        <span class="read-pill">种子：美国 / 10万-100万 / running gear</span>
      </div>
      <div class="cta-row">
        <button class="cta-btn">生成第一批候选</button>
        <button class="ghost-btn">改成从 0 开始</button>
      </div>
    </div>
  `;

  const resultsHtml = `
    <section class="result-board">
      <div class="empty-state">
        <div class="empty-illustration"></div>
        <p class="empty-title">准备基于当前条件开始 AI 搜索</p>
        <p class="empty-copy">这一步只借用标准搜索条件，不会反向写回标准搜索。</p>
      </div>
    </section>
  `;

  return renderAppShell({
    activeTop: "search",
    pageTitle: "频道搜索 · AI搜索带条件起手",
    pageSummary: "显式桥接进入 AI搜索，避免自动继承带来的模式混淆。",
    pageTabsHtml: '<span class="page-tab">标准搜索</span><span class="page-tab is-active">AI搜索</span>',
    bodyHtml: aiSearchLayout({ contextStrip, searchBox, resultsHtml }),
  });
}

function renderAiRunning() {
  const searchBox = `
    <div class="search-bar">
      <div class="search-label"><span class="accent-dot"></span>AI 搜索工作台</div>
      <div class="search-textarea">帮我找美国做户外跑步装备测评、互动率高、最近一个月持续更新的 YouTube 频道</div>
      <div class="summary-strip">
        <div class="summary-copy">
          <span class="status-pill is-running">AI任务执行中</span>
          <p>正在生成第 1 批候选结果，请稍候。当前 query 已锁定，可在结果返回后继续调整。</p>
        </div>
      </div>
    </div>
  `;

  const resultsHtml = `
    <section class="result-board">
      <div class="board-head">
        <h3>第 1 批候选</h3>
        <div class="board-meta">批次执行中 · 预计返回 10 条</div>
      </div>
      <div class="card-stack">
        ${skeletonCard()}
        ${skeletonCard()}
        ${skeletonCard()}
      </div>
    </section>
  `;

  return renderAppShell({
    activeTop: "search",
    pageTitle: "频道搜索 · AI搜索执行中",
    pageSummary: "执行态必须清楚表达‘正在生成本批结果’，不能让用户误判为空态。",
    pageTabsHtml: '<span class="page-tab">标准搜索</span><span class="page-tab is-active">AI搜索</span>',
    bodyHtml: aiSearchLayout({ searchBox, resultsHtml }),
  });
}

function renderAiBatchResults() {
  const searchBox = `
    <div class="search-bar">
      <div class="search-label"><span class="accent-dot"></span>AI 搜索工作台</div>
      <div class="search-textarea">帮我找美国做户外跑步装备测评、互动率高、最近一个月持续更新的 YouTube 频道</div>
      <div class="summary-strip">
        <div class="summary-copy">
          <span class="status-pill">第 1 批已返回</span>
          <p>请逐项标记采纳、排除或待定，完成后再手动触发下一批。</p>
        </div>
      </div>
    </div>
  `;

  const bucketBoard = `
    <section class="bucket-board">
      <div class="bucket-row">
        <h3>本次 AI 搜索摘要</h3>
        <div class="bucket-row">
          <span class="bucket-pill accepted">已采纳 2</span>
          <span class="bucket-pill pending">待定 1</span>
          <span class="bucket-pill excluded">排除 3</span>
        </div>
      </div>
      <p class="bucket-empty">默认只展示计数，展开后可查看明细。</p>
    </section>
  `;

  const resultsHtml = `
    <section class="result-board">
      <div class="board-head">
        <h3>第 1 批候选</h3>
        <div class="board-meta">10 条候选 · 默认按相关性排序</div>
      </div>
      <div class="card-stack">
        ${creatorCard({
          name: "The Run Experience",
          handle: "@therunexperience",
          tags: ["running", "gear review", "coach"],
          metrics: ["粉丝 98万", "近 30 天均播 21.6万", "地区 美国"],
          scoreLabel: "批次相关度 A",
          scoreClass: "similarity-chip",
          actions: [
            { label: "采纳", state: "accepted" },
            { label: "待定" },
            { label: "排除" },
          ],
        })}
        ${creatorCard({
          name: "Believe in the Run",
          handle: "@believeintherun",
          tags: ["shoe test", "running", "US"],
          metrics: ["粉丝 34万", "近 30 天均播 9.8万", "地区 美国"],
          scoreLabel: "批次相关度 B",
          scoreClass: "similarity-chip",
          actions: [
            { label: "采纳" },
            { label: "待定", state: "pending" },
            { label: "排除" },
          ],
        })}
        ${creatorCard({
          name: "Daily Runner Life",
          handle: "@dailyrunnerlife",
          tags: ["running vlog", "gear", "US"],
          metrics: ["粉丝 15万", "近 30 天均播 4.2万", "地区 美国"],
          scoreLabel: "批次相关度 B",
          scoreClass: "similarity-chip",
          actions: [
            { label: "采纳" },
            { label: "待定" },
            { label: "排除", state: "excluded" },
          ],
        })}
      </div>
    </section>
  `;

  return renderAppShell({
    activeTop: "search",
    pageTitle: "频道搜索 · AI搜索批次结果",
    pageSummary: "每个结果都被消费为 accepted / pending / excluded 之一，采纳只进入当前 session 候选池。",
    pageTabsHtml: '<span class="page-tab">标准搜索</span><span class="page-tab is-active">AI搜索</span>',
    bodyHtml: aiSearchLayout({ searchBox, bucketBoard, resultsHtml }),
  });
}

function renderAiSummaryExpanded() {
  const searchBox = `
    <div class="search-bar">
      <div class="search-label"><span class="accent-dot"></span>AI 搜索工作台</div>
      <div class="search-textarea">帮我找美国做户外跑步装备测评、互动率高、最近一个月持续更新的 YouTube 频道</div>
      <div class="summary-strip">
        <div class="summary-copy">
          <span class="status-pill">第 1 批已返回</span>
          <p>顶部摘要已展开，可检查当前 session 已经采纳、待定和排除的对象。</p>
        </div>
      </div>
    </div>
  `;

  const bucketBoard = `
    <section class="bucket-board">
      <div class="bucket-row">
        <h3>本次 AI 搜索摘要</h3>
        <div class="bucket-row">
          <span class="bucket-pill accepted">已采纳 2</span>
          <span class="bucket-pill pending">待定 1</span>
          <span class="bucket-pill excluded">排除 3</span>
        </div>
      </div>
      <div class="bucket-grid">
        <article class="bucket-card">
          <h4>已采纳</h4>
          <ul>
            <li>The Run Experience</li>
            <li>Believe in the Run</li>
          </ul>
        </article>
        <article class="bucket-card">
          <h4>待定</h4>
          <ul>
            <li>The Running Channel</li>
          </ul>
        </article>
        <article class="bucket-card">
          <h4>排除</h4>
          <ul>
            <li>Daily Runner Life</li>
            <li>Outdoor Trend Digest</li>
            <li>Generic Top Gear</li>
          </ul>
        </article>
      </div>
    </section>
  `;

  const resultsHtml = `
    <section class="result-board">
      <div class="board-head">
        <h3>第 1 批候选</h3>
        <div class="board-meta">结果区仍是主工作区，顶部摘要仅做集合查看</div>
      </div>
      <div class="card-stack">
        ${creatorCard({
          name: "The Run Experience",
          handle: "@therunexperience",
          tags: ["running", "gear review", "coach"],
          metrics: ["粉丝 98万", "近 30 天均播 21.6万", "地区 美国"],
          scoreLabel: "批次相关度 A",
          scoreClass: "similarity-chip",
          actions: [
            { label: "采纳", state: "accepted" },
            { label: "待定" },
            { label: "排除" },
          ],
        })}
        ${creatorCard({
          name: "Believe in the Run",
          handle: "@believeintherun",
          tags: ["shoe test", "running", "US"],
          metrics: ["粉丝 34万", "近 30 天均播 9.8万", "地区 美国"],
          scoreLabel: "批次相关度 B",
          scoreClass: "similarity-chip",
          actions: [
            { label: "采纳", state: "accepted" },
            { label: "待定" },
            { label: "排除" },
          ],
        })}
      </div>
    </section>
  `;

  return renderAppShell({
    activeTop: "search",
    pageTitle: "频道搜索 · AI搜索摘要展开",
    pageSummary: "顶部摘要默认看计数，展开后只承担集合查看，不抢结果区主视线。",
    pageTabsHtml: '<span class="page-tab">标准搜索</span><span class="page-tab is-active">AI搜索</span>',
    bodyHtml: aiSearchLayout({ searchBox, bucketBoard, resultsHtml }),
  });
}

function renderAiNextBatch() {
  const searchBox = `
    <div class="search-bar">
      <div class="search-label"><span class="accent-dot"></span>AI 搜索工作台</div>
      <div class="search-textarea">帮我找美国做户外跑步装备测评、互动率高、最近一个月持续更新的 YouTube 频道</div>
      <div class="summary-strip">
        <div class="summary-copy">
          <span class="status-pill">第 1 批已消费</span>
          <p>用户已经完成当前批次判断，可以选择获取下一批，或继续修改 query。</p>
        </div>
      </div>
    </div>
  `;

  const bucketBoard = `
    <section class="bucket-board">
      <div class="bucket-row">
        <h3>本次 AI 搜索摘要</h3>
        <div class="bucket-row">
          <span class="bucket-pill accepted">已采纳 3</span>
          <span class="bucket-pill pending">待定 2</span>
          <span class="bucket-pill excluded">排除 5</span>
        </div>
      </div>
      <p class="bucket-empty">下一批不是自动触发，用户拥有节奏控制权。</p>
    </section>
  `;

  const resultsHtml = `
    <section class="result-board">
      <div class="board-head">
        <h3>第 1 批已完成</h3>
        <div class="board-meta">可继续拿下一批，或回到 query 重新约束目标</div>
      </div>
      <div class="card-stack">
        ${creatorCard({
          name: "The Run Experience",
          handle: "@therunexperience",
          tags: ["running", "gear review", "coach"],
          metrics: ["粉丝 98万", "近 30 天均播 21.6万", "地区 美国"],
          scoreLabel: "已采纳",
          actions: [{ label: "已采纳", state: "accepted" }],
        })}
      </div>
      <div class="footer-cta">
        <button class="cta-btn">获取下一批 10 条候选</button>
      </div>
    </section>
  `;

  return renderAppShell({
    activeTop: "search",
    pageTitle: "频道搜索 · AI搜索下一批",
    pageSummary: "批次推进必须由用户显式触发，方便在每轮之间停下来判断或调 query。",
    pageTabsHtml: '<span class="page-tab">标准搜索</span><span class="page-tab is-active">AI搜索</span>',
    bodyHtml: aiSearchLayout({ searchBox, bucketBoard, resultsHtml }),
  });
}

function renderAiQueryAdjust() {
  const searchBox = `
    <div class="search-bar">
      <div class="search-label"><span class="accent-dot"></span>AI 搜索工作台</div>
      <div class="search-textarea">帮我更偏向真实鞋类测评，不要偏 vlog，也不要泛运动资讯号。</div>
      <div class="summary-strip">
        <div class="summary-copy">
          <span class="status-pill">已更新 query</span>
          <p>系统将基于新 query 重生成第 2 轮候选，本轮会保留原 session 摘要，但重新执行召回。</p>
        </div>
      </div>
      <div class="cta-row">
        <button class="cta-btn">重新生成候选</button>
        <button class="ghost-btn">查看上一轮已采纳</button>
      </div>
    </div>
  `;

  const bucketBoard = `
    <section class="bucket-board">
      <div class="bucket-row">
        <h3>当前 session 摘要</h3>
        <div class="bucket-row">
          <span class="bucket-pill accepted">已采纳 3</span>
          <span class="bucket-pill pending">待定 2</span>
          <span class="bucket-pill excluded">排除 5</span>
        </div>
      </div>
      <p class="bucket-empty">用户通过改自然语言条件调优，不在 MVP 里引入完整显式筛选器编辑器。</p>
    </section>
  `;

  const resultsHtml = `
    <section class="result-board">
      <div class="board-head">
        <h3>新 query 下的候选</h3>
        <div class="board-meta">系统将更偏向真实鞋类测评频道</div>
      </div>
      <div class="card-stack">
        ${creatorCard({
          name: "Believe in the Run",
          handle: "@believeintherun",
          tags: ["shoe test", "running", "US"],
          metrics: ["粉丝 34万", "近 30 天均播 9.8万", "地区 美国"],
          scoreLabel: "新批次相关度 A",
          scoreClass: "similarity-chip",
          actions: [
            { label: "采纳", state: "accepted" },
            { label: "待定" },
            { label: "排除" },
          ],
        })}
        ${creatorCard({
          name: "RoadTrailRun",
          handle: "@roadtrailrun",
          tags: ["running shoes", "review", "US"],
          metrics: ["粉丝 18万", "近 30 天均播 6.2万", "地区 美国"],
          scoreLabel: "新批次相关度 A",
          scoreClass: "similarity-chip",
          actions: [
            { label: "采纳" },
            { label: "待定" },
            { label: "排除" },
          ],
        })}
      </div>
    </section>
  `;

  return renderAppShell({
    activeTop: "search",
    pageTitle: "频道搜索 · AI搜索调 query 重搜",
    pageSummary: "AI搜索的主要调优面仍然是自然语言 query，而不是复杂显式筛选器。",
    pageTabsHtml: '<span class="page-tab">标准搜索</span><span class="page-tab is-active">AI搜索</span>',
    bodyHtml: aiSearchLayout({ searchBox, bucketBoard, resultsHtml }),
  });
}

function renderSimilarDefault() {
  const bodyHtml = `
    <section class="seed-input-card">
      <div class="search-card-header">
        <div>
          <p class="kicker">Default Flow</p>
          <h3>频道种子搜索</h3>
          <p class="seed-helper">默认主流程不再从收藏夹起手，而是围绕一个明确频道直接找相似网红。</p>
        </div>
      </div>
      <div class="secondary-tab-row">
        <span class="secondary-tab is-active">频道种子搜索</span>
        <span class="secondary-tab">收藏夹相似搜索</span>
      </div>
      <div class="seed-entry-card">
        <div class="seed-entry-row">
          <div class="search-label"><span class="accent-dot"></span>输入种子频道</div>
          <span class="seed-mode-pill">支持搜索 / URL / handle</span>
        </div>
        <div class="seed-input placeholder">粘贴频道 URL、输入 @handle，或直接搜索频道名称</div>
        <div class="cta-row">
          <button class="cta-btn">开始找相似网红</button>
          <button class="ghost-btn">从结果卡找相似</button>
        </div>
      </div>
    </section>
  `;

  return renderAppShell({
    activeTop: "similar",
    pageTitle: "相似网红",
    pageSummary: "默认主流程由收藏夹输入切换为单频道输入，旧方案只保留为次级入口。",
    pageTabsHtml: '<span class="page-tab is-active">相似网红</span>',
    bodyHtml,
  });
}

function renderSimilarSeeded() {
  const bodyHtml = `
    <section class="seed-input-card">
      <div class="search-card-header">
        <div>
          <p class="kicker">Vector Recall</p>
          <h3>频道种子已锁定</h3>
          <p class="seed-helper">新默认召回由多模态向量完成，但前台仍保持标准相似结果列表心智。</p>
        </div>
      </div>
      <div class="secondary-tab-row">
        <span class="secondary-tab is-active">频道种子搜索</span>
        <span class="secondary-tab">收藏夹相似搜索</span>
      </div>
      <div class="seed-card">
        <div class="seed-card-main">
          <div class="creator-avatar"></div>
          <div>
            <h4>Hollyland Tech</h4>
            <p>@HollylandTech · YouTube · 已作为相似召回种子</p>
          </div>
        </div>
        <div class="pill-row">
          <span class="seed-badge">单频道种子</span>
          <span class="read-pill">默认按相似程度排序</span>
        </div>
      </div>
    </section>
    <section class="result-board">
      <div class="board-head">
        <h3>相似结果列表</h3>
        <div class="board-meta">默认主流程 · 多模态向量召回</div>
      </div>
      <div class="card-stack">
        ${creatorCard({
          name: "Aputure",
          handle: "@aputure",
          tags: ["film gear", "creator tools", "US"],
          metrics: ["粉丝 72万", "近 30 天均播 8.4万", "地区 美国"],
          scoreLabel: "默认排序",
          similarity: "相似度 92%",
          actions: [{ label: "查看详情" }, { label: "加入名单" }],
        })}
        ${creatorCard({
          name: "DJI Pro",
          handle: "@djipro",
          tags: ["video gear", "camera tools", "global"],
          metrics: ["粉丝 41万", "近 30 天均播 6.1万", "地区 美国"],
          scoreLabel: "默认排序",
          similarity: "相似度 88%",
          actions: [{ label: "查看详情" }, { label: "加入名单" }],
        })}
      </div>
    </section>
  `;

  return renderAppShell({
    activeTop: "similar",
    pageTitle: "相似网红",
    pageSummary: "新默认相似网红结果保持普通列表形态，不走 AI 搜索批次消费流程。",
    pageTabsHtml: '<span class="page-tab is-active">相似网红</span>',
    bodyHtml,
  });
}

function renderSimilarLegacyTab() {
  const bodyHtml = `
    <section class="legacy-card">
      <div class="search-card-header">
        <div>
          <p class="kicker">Legacy Flow</p>
          <h3>收藏夹相似搜索</h3>
          <p class="legacy-helper">旧流程仍保留可访问性，但明确降为页内次级入口，不再占据默认主入口。</p>
        </div>
      </div>
      <div class="secondary-tab-row">
        <span class="secondary-tab">频道种子搜索</span>
        <span class="secondary-tab is-active">收藏夹相似搜索</span>
      </div>
      <div class="seed-entry-card">
        <div class="seed-entry-row">
          <div class="search-label"><span class="accent-dot"></span>选择收藏夹</div>
          <span class="seed-mode-pill">旧流程次级入口</span>
        </div>
        <div class="readonly-field">收藏夹：摄影灯光合作池（26 位创作者）</div>
        <div class="pill-row">
          <span class="list-chip">标签聚合</span>
          <span class="list-chip">重合度计算</span>
          <span class="list-chip">兼容旧用户</span>
        </div>
        <div class="cta-row">
          <button class="cta-btn">继续旧流程搜索</button>
          <button class="ghost-btn">切回新默认流程</button>
        </div>
      </div>
    </section>
  `;

  return renderAppShell({
    activeTop: "similar",
    pageTitle: "相似网红",
    pageSummary: "旧收藏夹方案继续可达，但它只作为兼容入口，不再主导新的相似搜索心智。",
    pageTabsHtml: '<span class="page-tab is-active">相似网红</span>',
    bodyHtml,
  });
}

function skeletonCard() {
  return `
    <article class="skeleton-card">
      <div class="skeleton-row">
        <span class="skeleton-chip"></span>
        <span class="skeleton-chip"></span>
      </div>
      <div class="skeleton-line" style="width: 48%"></div>
      <div class="skeleton-line" style="width: 72%"></div>
      <div class="skeleton-block"></div>
    </article>
  `;
}

render();
