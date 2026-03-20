const scenarios = {
  "keyword-input": {
    mode: "classic",
    inputTitle: "",
    inputHint: "",
    miniAction: null,
    primaryAction: null,
    status: null,
    session: null,
    question: null,
    conditions: null,
    keywordFlow: {
      draft: "swim vest",
      tags: [],
      openMenu: false,
    },
  },
  "keyword-tag": {
    mode: "classic",
    inputTitle: "",
    inputHint: "",
    miniAction: null,
    primaryAction: null,
    status: null,
    session: null,
    question: null,
    conditions: null,
    keywordFlow: {
      draft: "",
      tags: [{ text: "swim vest", scope: "标签" }],
      openMenu: false,
    },
  },
  "keyword-multi": {
    mode: "classic",
    inputTitle: "",
    inputHint: "",
    miniAction: null,
    primaryAction: null,
    status: null,
    session: null,
    question: null,
    conditions: null,
    keywordFlow: {
      draft: "water sports",
      tags: [{ text: "swim vest", scope: "标签" }],
      openMenu: false,
    },
  },
  "keyword-menu": {
    mode: "classic",
    inputTitle: "",
    inputHint: "",
    miniAction: null,
    primaryAction: null,
    status: null,
    session: null,
    question: null,
    conditions: null,
    keywordFlow: {
      draft: "",
      tags: [
        { text: "swim vest", scope: "标签" },
        { text: "water sports", scope: "标签" },
      ],
      openMenu: true,
    },
  },
  "url-resolving": {
    mode: "resolving",
    inputTitle: "https://www.youtube.com/@HollylandTech",
    inputHint: "",
    miniAction: "识别中",
    primaryAction: null,
    status: {
      state: "识别中",
      stateClass: "",
      spinner: true,
      text: "正在识别链接类型与目标频道。如果能直接锁定目标，将沿用原有精确搜索路径。",
    },
    session: null,
    question: null,
    conditions: null,
  },
  "url-exact": {
    mode: "classic",
    inputTitle: "https://www.youtube.com/@HollylandTech",
    inputHint: "",
    miniAction: null,
    primaryAction: null,
    status: {
      state: "已识别频道",
      stateClass: "ok",
      spinner: false,
      text: "已锁定目标频道 @HollylandTech，继续沿用原有精确搜索路径。",
    },
    session: null,
    question: null,
    conditions: null,
  },
  "url-mismatch": {
    mode: "expanded",
    inputTitle: "https://www.instagram.com/creator_xxx",
    inputHint: "",
    miniAction: null,
    primaryAction: null,
    status: {
      state: "平台不匹配",
      stateClass: "warn",
      spinner: false,
      text: "当前在 YouTube 频道搜索页，该链接属于 Instagram。需要修正后再继续。",
    },
    session: {
      label: "当前卡点",
      summary: "链接可识别，但目标平台与当前页面不一致。",
      meta: ["可切平台", "可删链接改写", "不建议静默忽略链接"],
    },
    question: {
      title: "你想切换到 Instagram 搜索，还是继续搜 YouTube？",
      choices: ["切到 Instagram", "删掉链接继续搜 YouTube", "重新粘贴 YouTube 链接"],
      caption: "这是 URL 修正问题，不是开放式追问。",
    },
    conditions: {
      anchor: null,
      hard: ["当前平台：YouTube"],
      soft: [],
      hint: "平台冲突优先于其它偏好。",
    },
  },
  "url-unsupported": {
    mode: "expanded",
    inputTitle: "https://www.amazon.com/dp/B0XXXXXX",
    inputHint: "",
    miniAction: null,
    primaryAction: null,
    status: {
      state: "类型不支持",
      stateClass: "warn",
      spinner: false,
      text: "当前版本不支持直接使用该类链接起搜，可改为频道链接、关键词或自然语言描述。",
    },
    session: {
      label: "当前卡点",
      summary: "链接结构可识别，但不属于本搜索框当前支持的 URL 类型。",
      meta: ["可改为频道链接", "可改为关键词", "可改为自然语言"],
    },
    question: {
      title: "你要继续用什么方式搜索？",
      choices: ["改为频道链接", "删掉链接输入关键词", "直接描述想找什么"],
      caption: "这里只处理输入类型修正。",
    },
    conditions: null,
  },
  "url-invalid": {
    mode: "expanded",
    inputTitle: "https://www.youtube.com/this-link-is-broken",
    inputHint: "",
    miniAction: null,
    primaryAction: null,
    status: {
      state: "无法识别",
      stateClass: "warn",
      spinner: false,
      text: "未识别到可用频道链接。你可以重新粘贴频道主页链接，或直接输入频道名。",
    },
    session: {
      label: "当前卡点",
      summary: "该链接未能映射为有效频道资源。",
      meta: ["重新贴链接", "只输频道名", "改成自然语言"],
    },
    question: {
      title: "你更想怎么修正？",
      choices: ["重新粘贴链接", "直接输入频道名", "改为自然语言搜索"],
      caption: "修正态应该短、明确，只处理当前卡点。",
    },
    conditions: null,
  },
  "natural-init": {
    mode: "expanded",
    inputTitle: "帮我找美国做汽配评测、最近活跃、粉丝 5k-20k 的 YouTube 红人",
    inputHint: "",
    miniAction: null,
    primaryAction: "搜索",
    status: null,
    session: {
      label: "搜索框已展开",
      summary: "系统正在把自然语言拆成可执行搜索条件。",
      meta: ["刚进入 Agent 模式", "尚未返回结果"],
    },
    question: null,
    conditions: null,
  },
  "natural-retrieving": {
    mode: "expanded",
    inputTitle: "帮我找美国做汽配评测、最近活跃、粉丝 5k-20k 的 YouTube 红人",
    inputHint: "",
    miniAction: null,
    primaryAction: "搜索",
    status: {
      state: "首轮搜索中",
      stateClass: "",
      spinner: true,
      text: "系统已提取主要条件，正在当前平台结果集中执行第一轮搜索。",
    },
    session: {
      label: "当前任务",
      summary: "正在搜索：YouTube 频道 · 美国 · 汽配/工具测评 · 粉丝 5k-20k · 近期活跃",
      meta: ["已理解 5 个硬条件", "正在 retrieving"],
    },
    question: null,
    conditions: null,
  },
  "natural-results": {
    mode: "expanded",
    inputTitle: "帮我找美国做汽配评测、最近活跃、粉丝 5k-20k 的 YouTube 红人",
    inputHint: "",
    miniAction: null,
    primaryAction: "搜索",
    status: {
      state: "首轮结果已返回",
      stateClass: "ok",
      spinner: false,
      text: "已将你的描述拆成可执行搜索条件，并在当前平台结果集中完成第一轮召回。",
    },
    session: {
      label: "当前任务",
      summary: "正在搜索：YouTube 频道 · 美国 · 汽配/工具测评 · 粉丝 5k-20k · 近期活跃",
      meta: ["系统已理解 5 个硬条件", "未触发追问", "结果区已刷新"],
    },
    question: null,
    conditions: {
      anchor: null,
      hard: ["美国", "YouTube", "汽配 / 工具测评", "5k-20k 粉丝", "近 30 天活跃"],
      soft: [],
      hint: "所有条件都已进入首轮搜索。",
    },
  },
  "natural-clarifying": {
    mode: "expanded",
    inputTitle: "帮我找美国做汽配评测、最近活跃、粉丝 5k-20k 的 YouTube 红人",
    inputHint: "",
    miniAction: null,
    primaryAction: "搜索",
    status: {
      state: "需要补充",
      stateClass: "",
      spinner: false,
      text: "首轮结果已返回，但“汽配评测”仍可继续缩小范围。",
    },
    session: {
      label: "当前任务",
      summary: "系统已找到一批候选频道，但还有一个高影响问题可进一步 refine。",
      meta: ["结果已返回", "当前存在 1 个追问"],
    },
    question: {
      title: "你更偏维修教程、产品开箱，还是车载配件测评？",
      choices: ["维修教程", "产品开箱", "车载配件测评"],
      caption: "每次只问一个高影响问题。",
    },
    conditions: {
      anchor: null,
      hard: ["美国", "YouTube", "5k-20k 粉丝", "近 30 天活跃"],
      soft: ["汽配评测"],
      hint: "“汽配评测”当前作为待细化条件存在。",
    },
  },
  "mixed-parse": {
    mode: "expanded",
    inputTitle:
      "https://www.youtube.com/@HollylandTech 帮我找美国类似调性的频道，粉丝 1w-10w，最好近期活跃，性价比高",
    inputHint: "",
    miniAction: null,
    primaryAction: "搜索",
    status: {
      state: "解析中",
      stateClass: "",
      spinner: true,
      text: "系统正在判断这串输入里哪些是锚点，哪些是硬条件，哪些只是参考偏好。",
    },
    session: {
      label: "系统解析摘要",
      summary: "当前输入包含 URL、地区、粉丝量、活跃度和软性偏好。",
      meta: ["解析锚点", "解析硬条件", "解析软偏好"],
    },
    question: null,
    conditions: null,
  },
  "mixed-anchor": {
    mode: "expanded",
    inputTitle:
      "https://www.youtube.com/@HollylandTech 帮我找美国类似调性的频道，粉丝 1w-10w，最好近期活跃，性价比高",
    inputHint: "",
    miniAction: null,
    primaryAction: "搜索",
    status: {
      state: "锚点优先",
      stateClass: "ok",
      spinner: false,
      text: "当前按 URL 锚点优先处理，其他描述不会自动覆盖精确频道语义。",
    },
    session: {
      label: "系统解析摘要",
      summary: "已按 URL 锁定频道：@HollylandTech。",
      meta: ["URL 优先", "其它条件后置解释"],
    },
    question: null,
    conditions: {
      anchor: "URL 锚点：@HollylandTech",
      hard: ["美国", "1w-10w 粉丝", "近 30 天活跃"],
      soft: [],
      hint: "当前优先保证精确 URL 语义不被破坏。",
    },
  },
  "mixed-soft": {
    mode: "expanded",
    inputTitle:
      "https://www.youtube.com/@HollylandTech 帮我找美国类似调性的频道，粉丝 1w-10w，最好近期活跃，性价比高",
    inputHint: "",
    miniAction: null,
    primaryAction: "搜索",
    status: {
      state: "软条件待澄清",
      stateClass: "",
      spinner: false,
      text: "“类似调性”“性价比高”暂不直接作为硬过滤器，而是先作为参考偏好展示。",
    },
    session: {
      label: "系统解析摘要",
      summary: "硬条件已经生效，软条件被降级为参考偏好。",
      meta: ["硬条件 3 项", "软偏好 2 项"],
    },
    question: null,
    conditions: {
      anchor: "URL 锚点：@HollylandTech",
      hard: ["美国", "1w-10w 粉丝", "近 30 天活跃"],
      soft: ["类似调性", "性价比高"],
      hint: "软偏好不会伪装成已严格生效的过滤器。",
    },
  },
  "mixed-clarifying": {
    mode: "expanded",
    inputTitle:
      "https://www.youtube.com/@HollylandTech 帮我找美国类似调性的频道，粉丝 1w-10w，最好近期活跃，性价比高",
    inputHint: "",
    miniAction: null,
    primaryAction: "搜索",
    status: {
      state: "混合解析完成",
      stateClass: "ok",
      spinner: false,
      text: "当前按 URL 锚点优先处理，其他描述被拆成硬条件与软偏好。不会自动把 URL 解释成“找类似频道”。",
    },
    session: {
      label: "系统解析摘要",
      summary: "已按 URL 锁定频道：@HollylandTech；当前不会自动扩展为“找类似频道”任务。",
      meta: ["硬条件 3 项", "软偏好 2 项", "建议先确认是否要找“类似频道”"],
    },
    question: {
      title: "你是想继续看这个频道，还是想找“和它类似”的其他频道？",
      choices: ["继续看这个频道", "找类似频道", "先按当前条件看结果"],
      caption: "这里只问一个高价值问题，不把会话推成长聊天流。",
    },
    conditions: {
      anchor: "URL 锚点：@HollylandTech",
      hard: ["美国", "1w-10w 粉丝", "近 30 天活跃"],
      soft: ["类似调性", "性价比高"],
      hint: "软偏好不会被伪装成已严格生效的过滤器。",
    },
  },
  "repair-invalid": {
    mode: "expanded",
    inputTitle: "https://www.youtube.com/this-link-is-broken",
    inputHint: "",
    miniAction: null,
    primaryAction: null,
    status: {
      state: "URL 无法识别",
      stateClass: "warn",
      spinner: false,
      text: "未识别到可用频道链接。你可以重新贴链接，或改为频道名 / 自然语言。",
    },
    session: {
      label: "当前卡点",
      summary: "链接未映射到有效频道资源。",
      meta: ["重新贴链接", "输入频道名", "改为自然语言"],
    },
    question: {
      title: "你想怎么继续修正？",
      choices: ["重新粘贴链接", "直接输入频道名", "改为自然语言搜索"],
      caption: "这里只处理 URL 修正。",
    },
    conditions: null,
  },
  "repair-mismatch": {
    mode: "expanded",
    inputTitle: "https://www.instagram.com/creator_xxx 我想在 YouTube 上找类似风格的频道",
    inputHint: "",
    miniAction: null,
    primaryAction: null,
    status: {
      state: "平台不匹配",
      stateClass: "warn",
      spinner: false,
      text: "当前在 YouTube 频道搜索页，该链接属于 Instagram。建议你切换平台，或删除链接后直接描述你想找的 YouTube 频道。",
    },
    session: {
      label: "当前卡点",
      summary: "链接可识别，但与当前搜索页平台不匹配。",
      meta: ["可修改 URL", "可删除链接改为自然语言", "不建议静默忽略该链接"],
    },
    question: {
      title: "你更想怎么继续？",
      choices: ["切到 Instagram 搜索", "删掉链接继续搜 YouTube", "重新粘贴 YouTube 频道链接"],
      caption: "修正态应该短、明确，只处理当前卡点。",
    },
    conditions: {
      anchor: null,
      hard: ["当前平台：YouTube"],
      soft: ["类似风格"],
      hint: "平台冲突优先于风格偏好。",
    },
  },
  "repair-unsupported": {
    mode: "expanded",
    inputTitle: "https://www.amazon.com/dp/B0XXXXXX",
    inputHint: "",
    miniAction: null,
    primaryAction: null,
    status: {
      state: "类型不支持",
      stateClass: "warn",
      spinner: false,
      text: "当前版本不支持使用该类链接起搜，请改为频道链接、关键词或自然语言。",
    },
    session: {
      label: "当前卡点",
      summary: "链接结构可识别，但不属于搜索框当前支持的 URL 类型。",
      meta: ["可改成频道链接", "可删掉链接", "可改为自然语言"],
    },
    question: {
      title: "你要换成什么方式继续搜索？",
      choices: ["改为频道链接", "删掉链接输关键词", "直接描述想找什么"],
      caption: "这里只处理输入类型修正。",
    },
    conditions: null,
  },
  "repair-empty": {
    mode: "expanded",
    inputTitle: "美国 户外 水上运动 频道 粉丝 5k-10k 最近活跃",
    inputHint: "",
    miniAction: null,
    primaryAction: null,
    status: {
      state: "有条件无结果",
      stateClass: "warn",
      spinner: false,
      text: "当前条件过窄，结果为空。系统建议你先放宽一个最影响结果的条件。",
    },
    session: {
      label: "当前卡点",
      summary: "系统没有找到满足所有条件的频道。",
      meta: ["可放宽粉丝范围", "可放宽类目", "可删掉活跃限制"],
    },
    question: {
      title: "你想先放宽哪一个条件？",
      choices: ["粉丝范围", "内容类目", "近期活跃"],
      caption: "修正态不是聊天，而是帮助你恢复可搜状态。",
    },
    conditions: {
      anchor: null,
      hard: ["美国", "户外 / 水上运动", "5k-10k 粉丝", "近期活跃"],
      soft: [],
      hint: "至少需要放宽一项硬条件才能恢复结果。",
    },
  },
};

let currentScenario = "keyword-input";
let currentScene = "keyword";
let currentVariant = "balanced";

const sceneMap = {
  keyword: [
    { id: "keyword-input", label: "输入态" },
    { id: "keyword-tag", label: "完成态" },
    { id: "keyword-multi", label: "多关键词" },
    { id: "keyword-menu", label: "匹配目标" },
  ],
  url: [
    { id: "url-resolving", label: "识别中" },
    { id: "url-exact", label: "精确识别成功" },
    { id: "url-mismatch", label: "平台不匹配" },
    { id: "url-unsupported", label: "类型不支持" },
    { id: "url-invalid", label: "无法识别" },
  ],
  natural: [
    { id: "natural-init", label: "刚展开" },
    { id: "natural-retrieving", label: "首轮搜索中" },
    { id: "natural-results", label: "首轮结果已返回" },
    { id: "natural-clarifying", label: "追问态" },
  ],
  mixed: [
    { id: "mixed-parse", label: "解析摘要态" },
    { id: "mixed-anchor", label: "锚点优先态" },
    { id: "mixed-soft", label: "软条件待澄清态" },
    { id: "mixed-clarifying", label: "追问态" },
  ],
  repair: [
    { id: "repair-invalid", label: "URL 无法识别" },
    { id: "repair-mismatch", label: "平台不匹配" },
    { id: "repair-unsupported", label: "类型不支持" },
    { id: "repair-empty", label: "有条件无结果" },
  ],
};

const shellTargets = {
  balanced: document.getElementById("balanced-shell"),
  glass: document.getElementById("glass-shell"),
  neon: document.getElementById("neon-shell"),
  querychip: document.getElementById("querychip-shell"),
  workbench: document.getElementById("workbench-shell"),
  assistant: document.getElementById("assistant-shell"),
};

const stateNodeMap = {
  "keyword-input": ["draft_keyword", "compact_classic", "idle"],
  "keyword-tag": ["committed_keyword", "committed_keyword-return", "compact_classic", "idle"],
  "keyword-multi": ["committed_keyword", "compact_classic", "idle"],
  "keyword-menu": ["tag_scope_menu_open", "compact_classic", "idle"],
  "url-resolving": ["compact_resolving"],
  "url-exact": ["return-state"],
  "url-mismatch": ["expanded_repair"],
  "url-unsupported": ["expanded_repair"],
  "url-invalid": ["expanded_repair"],
  "natural-init": ["expanded_agent"],
  "natural-retrieving": ["expanded_agent", "retrieving"],
  "natural-results": ["results_ready"],
  "natural-clarifying": ["expanded_clarifying", "clarifying"],
  "mixed-parse": ["expanded_agent"],
  "mixed-anchor": ["expanded_agent"],
  "mixed-soft": ["expanded_agent"],
  "mixed-clarifying": ["expanded_agent", "refining"],
  "repair-invalid": ["expanded_repair"],
  "repair-mismatch": ["expanded_repair"],
  "repair-unsupported": ["expanded_repair"],
  "repair-empty": ["empty_repair"],
};

function renderShell(themeName, target) {
  const data = scenarios[currentScenario];
  const isExpanded = data.mode === "expanded";
  const isResolving = data.mode === "resolving";
  const keywordFlow = data.keywordFlow;

  target.innerHTML = `
    <div class="search-box ${isExpanded ? "expanded" : "classic"}">
      <div class="shell-chrome">
        <div class="search-icon">${isResolving ? "↻" : "⌕"}</div>
        <div class="main-input">
          ${keywordFlow ? renderKeywordFlow(keywordFlow) : `<p class="line-1">${data.inputTitle}</p>`}
          ${data.inputHint ? `<p class="line-2">${data.inputHint}</p>` : ""}
        </div>
        ${data.miniAction || data.primaryAction ? `
          <div class="action-cluster">
            ${data.miniAction ? `<span class="mini-button">${data.miniAction}</span>` : ""}
            ${data.primaryAction ? `<span class="mini-button primary">${data.primaryAction}</span>` : ""}
          </div>
        ` : ""}
      </div>

      <div class="stack ${data.status ? "" : "hidden"}">
        ${data.status ? renderStatus(data.status) : ""}
      </div>

      <div class="stack ${data.session || data.question || data.conditions ? "" : "hidden"}">
        ${data.session ? renderSession(data.session) : ""}
        ${data.question ? renderQuestion(data.question) : ""}
        ${data.conditions ? renderConditions(data.conditions) : ""}
      </div>

      ${keywordFlow?.openMenu ? renderTargetMenu() : ""}
    </div>
  `;
}

function renderKeywordFlow(flow) {
  const tags = flow.tags
    .map(
      (tag) => `
        <span class="query-token ${tag.exclude ? "exclude" : ""}">
          <span>${tag.text}</span>
          <span class="divider"></span>
          <span class="scope">${tag.scope}</span>
        </span>
      `,
    )
    .join("");

  const draft = `<span class="draft-fragment with-caret">${flow.draft || ""}</span>`;

  return `
    <div class="query-line">
      ${tags}
      ${draft}
    </div>
  `;
}

function renderTargetMenu() {
  return `
    <div class="target-menu">
      <div class="menu-item is-active">按频道标签</div>
      <div class="menu-item">按频道名</div>
      <div class="menu-item">按频道简介</div>
      <div class="menu-item">按发布内容</div>
      <div class="menu-item">从全部来源</div>
      <div class="menu-divider"></div>
      <div class="toggle-row">
        <span>排除该关键词</span>
        <span class="toggle-pill"></span>
      </div>
    </div>
  `;
}

function renderStatus(status) {
  return `
    <div class="micro-status ${status.spinner ? "" : "is-stable"}">
      <div class="status-topline">
        <span>Search status</span>
      </div>
      ${status.spinner ? `<div class="spinner" aria-hidden="true"></div>` : `<div class="status-mark ${status.stateClass || ""}" aria-hidden="true"></div>`}
      <div class="main-input" style="flex:1 1 auto;">
        <p class="line-1" style="font-size:14px;">${status.state}</p>
        <p class="status-text">${status.text}</p>
      </div>
      <span class="state-badge ${status.stateClass || ""}">${status.state}</span>
    </div>
  `;
}

function renderSession(session) {
  const meta = session.meta
    .map((item) => `<span class="chip">${item}</span>`)
    .join("");

  return `
    <section class="session-card">
      <div class="card-label">
        <span>${session.label}</span>
        <span class="state-badge ok">session active</span>
      </div>
      <p class="card-text">${session.summary}</p>
      <div class="meta-row" style="margin-top:10px;">${meta}</div>
    </section>
  `;
}

function renderQuestion(question) {
  const choices = question.choices
    .map((item) => `<span class="chip soft">${item}</span>`)
    .join("");

  return `
    <section class="question-card">
      <div class="card-label">
        <span>clarification</span>
        <span class="state-badge">one question only</span>
      </div>
      <h3 class="question-title">${question.title}</h3>
      <div class="hint-row">${choices}</div>
      <p class="card-text" style="margin-top:10px;">${question.caption}</p>
    </section>
  `;
}

function renderConditions(conditions) {
  const hard = conditions.hard.map((item) => `<span class="chip">${item}</span>`).join("");
  const soft = conditions.soft
    .map((item) => `<span class="chip reference">${item}</span>`)
    .join("");

  return `
    <section class="conditions-card">
      <div class="card-label">
        <span>condition graph</span>
        <span class="legend">硬条件与参考偏好分开表达</span>
      </div>
      ${conditions.anchor ? `
        <div class="anchor-group">
          <div class="legend">锚点</div>
          <div class="chip-row">
            <span class="chip anchor">${conditions.anchor}</span>
          </div>
        </div>
      ` : ""}
      <div class="soft-group" style="${conditions.anchor ? "" : "margin-top:0;padding-top:0;border-top:none;"}">
        <div class="legend">已生效硬条件</div>
        <div class="chip-row">${hard}</div>
      </div>
      ${conditions.soft.length ? `
        <div class="soft-group">
          <div class="legend">参考偏好 / 待澄清</div>
          <div class="chip-row">${soft}</div>
        </div>
      ` : ""}
      <p class="card-text" style="margin-top:12px;">${conditions.hint}</p>
    </section>
  `;
}

function rerenderAll() {
  Object.entries(shellTargets).forEach(([variant, target]) => renderShell(variant, target));
}

function applyVariantVisibility() {
  document.querySelectorAll(".demo-panel").forEach((panel) => {
    const isVisible = panel.dataset.cardVariant === currentVariant;
    panel.hidden = !isVisible;
  });
}

function renderSubstatePicker() {
  const picker = document.getElementById("substate-picker");
  const states = sceneMap[currentScene] || [];
  picker.innerHTML = states
    .map(
      (state) => `
        <button data-scenario="${state.id}" class="${state.id === currentScenario ? "is-active" : ""}">
          ${state.label}
        </button>
      `,
    )
    .join("");
}

function applyStateMachineSelection() {
  const activeNodes = new Set(stateNodeMap[currentScenario] || []);
  document.querySelectorAll(".svg-state-target").forEach((node) => {
    const isActive = activeNodes.has(node.dataset.node);
    node.classList.toggle("is-selected", isActive);
  });
}

document.getElementById("scene-picker").addEventListener("click", (event) => {
  const button = event.target.closest("button[data-scene]");
  if (!button) return;
  currentScene = button.dataset.scene;
  currentScenario = sceneMap[currentScene][0].id;
  document
    .querySelectorAll("#scene-picker button")
    .forEach((node) => node.classList.toggle("is-active", node === button));
  renderSubstatePicker();
  rerenderAll();
});

document.getElementById("substate-picker").addEventListener("click", (event) => {
  const button = event.target.closest("button[data-scenario]");
  if (!button) return;
  currentScenario = button.dataset.scenario;
  document
    .querySelectorAll("#substate-picker button")
    .forEach((node) => node.classList.toggle("is-active", node === button));
  rerenderAll();
  applyStateMachineSelection();
});

document.getElementById("variant-picker").addEventListener("click", (event) => {
  const button = event.target.closest("button[data-variant]");
  if (!button) return;
  document
    .querySelectorAll("#variant-picker button")
    .forEach((node) => node.classList.toggle("is-active", node === button));

  currentVariant = button.dataset.variant;
  applyVariantVisibility();
});

document.querySelector(".state-machine-panel").addEventListener("click", (event) => {
  const target = event.target.closest(".svg-state-target");
  if (!target) return;
  currentScene = target.dataset.scene;
  currentScenario = target.dataset.scenario;
  document
    .querySelectorAll("#scene-picker button")
    .forEach((node) => node.classList.toggle("is-active", node.dataset.scene === currentScene));
  renderSubstatePicker();
  applyStateMachineSelection();
  rerenderAll();
});

rerenderAll();
applyVariantVisibility();
renderSubstatePicker();
applyStateMachineSelection();
