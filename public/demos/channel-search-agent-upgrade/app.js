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
  url: {
    mode: "resolving",
    inputTitle: "https://www.youtube.com/@HollylandTech",
    inputHint: "",
    miniAction: "识别中",
    primaryAction: null,
    status: {
      state: "识别中",
      stateClass: "",
      text: "正在识别链接类型与目标频道。如果能直接锁定目标，将沿用原有精确搜索路径。",
    },
    session: null,
    question: null,
    conditions: null,
  },
  natural: {
    mode: "expanded",
    inputTitle: "帮我找美国做汽配评测、最近活跃、粉丝 5k-20k 的 YouTube 红人",
    inputHint: "",
    miniAction: null,
    primaryAction: "搜索",
    status: {
      state: "首轮结果已返回",
      stateClass: "ok",
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
  mixed: {
    mode: "expanded",
    inputTitle:
      "https://www.youtube.com/@HollylandTech 帮我找美国类似调性的频道，粉丝 1w-10w，最好近期活跃，性价比高",
    inputHint: "",
    miniAction: null,
    primaryAction: "搜索",
    status: {
      state: "混合解析完成",
      stateClass: "ok",
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
  repair: {
    mode: "expanded",
    inputTitle: "https://www.instagram.com/creator_xxx 我想在 YouTube 上找类似风格的频道",
    inputHint: "",
    miniAction: null,
    primaryAction: null,
    status: {
      state: "平台不匹配",
      stateClass: "warn",
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
};

let currentScenario = "keyword-input";

const shellTargets = {
  balanced: document.getElementById("balanced-shell"),
  glass: document.getElementById("glass-shell"),
  neon: document.getElementById("neon-shell"),
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
    <div class="micro-status">
      <div class="status-topline">
        <span>Search status</span>
      </div>
      <div class="spinner" aria-hidden="true"></div>
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

document.getElementById("scenario-picker").addEventListener("click", (event) => {
  const button = event.target.closest("button[data-scenario]");
  if (!button) return;
  currentScenario = button.dataset.scenario;
  document
    .querySelectorAll("#scenario-picker button")
    .forEach((node) => node.classList.toggle("is-active", node === button));
  rerenderAll();
});

document.getElementById("variant-picker").addEventListener("click", (event) => {
  const button = event.target.closest("button[data-variant]");
  if (!button) return;
  document
    .querySelectorAll("#variant-picker button")
    .forEach((node) => node.classList.toggle("is-active", node === button));

  const variant = button.dataset.variant;
  document.querySelectorAll(".demo-panel").forEach((panel) => {
    panel.style.order = panel.dataset.cardVariant === variant ? "-1" : "0";
  });
});

rerenderAll();
