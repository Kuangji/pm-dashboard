const CHANNEL_DECISIONS = [
  "频道搜索页一级只分标准搜索与 AI搜索",
  "自然语言是标准搜索输入形态，不是一级模式",
  "标准搜索自然语言最终必须回填现有 schema 参数",
  "本轮 AI搜索主线先以从 0 开始为准",
  "AI搜索允许一键带入当前标准搜索条件，但细节留到下一轮",
  "AI搜索默认按 10 条批次结果设计",
  "AI搜索不做解释层与逐条匹配理由",
];

const SIMILAR_DECISIONS = [
  "相似网红继续独立为默认入口域",
  "新默认流程改为单频道输入 + 多模态向量召回",
  "支持 URL 携带平台 + 频道ID 直达并自动搜索",
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
            {
              id: "standard-bridge-ai",
              label: "带条件跳转 AI",
              title: "标准搜索 · 带条件跳到 AI搜索",
              summary: "当标准搜索已有一组可用条件但结果不理想时，用户应能显式把当前条件带去 AI搜索。",
              goals: [
                "补齐标准搜索到 AI搜索 的桥接线",
                "让用户知道可带入哪些现有条件",
                "明确这是新 AI搜索 session，而不是标准搜索继续编辑",
              ],
              rules: [
                "桥接动作必须出现在标准结果页里",
                "桥接只带入当前条件，不反写标准搜索状态",
                "桥接是明显可见的次级 CTA，不抢主搜索动作",
              ],
              checks: [
                "用户在标准搜索结果页能看见去 AI搜索 的路径",
                "带入条件范围说明清楚",
                "标准搜索与 AI搜索 的边界仍然稳定",
              ],
              render: renderStandardBridgeToAi,
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
              title: "AI搜索 · 带条件起手（占位）",
              summary: "本轮只保留从标准搜索显式桥接进入 AI搜索 的入口和占位态，细节留到下一轮。",
              goals: [
                "保留标准搜索到 AI搜索 的显式入口",
                "把这条线标记为下一轮待细化",
                "避免本轮 demo 假装已经定完 seed 细节",
              ],
              rules: [
                "只保留入口，不锁死字段带入和预填 query 规则",
                "本轮 AI搜索主线仍以从 0 开始为准",
                "标准搜索原状态保留不被改写",
              ],
              checks: [
                "用户能看见这条桥接线存在",
                "用户知道这部分细节尚未定版",
                "不会误以为本轮已确定 seed 完整交互",
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
                "让下一批成为清楚的主动作",
              ],
              rules: [
                "单项状态只允许 accepted / excluded / pending",
                "accepted 只进入本次 session 候选池",
                "未处理项进入下一批时自动归为 pending",
                "此页仍是搜索工具，不是收藏操作页",
              ],
              checks: [
                "卡片操作层级清楚",
                "用户能区分三种判断动作",
                "下一批与改 query 的主次关系清楚",
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
                "明确未处理项会自动归入待定",
              ],
              rules: [
                "不做自动阈值推进",
                "下一批是主按钮",
                "进入下一批后结果区只保留当前批次",
              ],
              checks: [
                "用户知道什么时候可以进入下一批",
                "下一批不是隐式触发",
                "session 摘要跨批次累计",
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
              label: "等待输入",
              title: "相似网红 · 等待输入频道",
              summary: "默认主流程是等待输入频道的空白态，支持搜索、粘贴 URL 或输入 handle。",
              goals: [
                "把默认起手做成明确的空白输入态",
                "让单频道输入心智明确",
                "保留旧流程作为次级入口",
              ],
              rules: [
                "相似网红继续是独立入口",
                "新默认支持搜索 / URL / handle",
                "也支持 URL 带种子信息直达",
                "旧收藏夹方案仅作次级 Tab",
              ],
              checks: [
                "默认主入口不是收藏夹",
                "旧入口仍然可见",
                "用户能快速理解‘先给一个频道，再找相似’",
              ],
              render: renderSimilarDefault,
            },
            {
              id: "similar-ready",
              label: "种子已识别",
              title: "相似网红 · 当前频道种子已识别",
              summary: "一旦形成有效种子，输入壳层切成频道卡展示态，等待用户正式开始搜索。",
              goals: [
                "把有效种子清楚展示出来",
                "让用户确认当前种子后再开始搜索",
                "维持输入壳层的一致性",
              ],
              rules: [
                "有效种子后不再保留可继续输入框",
                "展示态中必须有更换频道入口",
                "URL、handle、搜索选中最终都收敛成同一频道卡",
              ],
              checks: [
                "用户明确知道当前种子是谁",
                "主按钮只在有效种子下可点",
                "频道卡展示态不会和空白输入态混淆",
              ],
              render: renderSimilarReady,
            },
            {
              id: "similar-running",
              label: "执行中",
              title: "相似网红 · 计算执行中",
              summary: "从空白输入或带种子 URL 进入后，先经历独立执行中态，再返回相似结果。",
              goals: [
                "把相似计算的等待感表达清楚",
                "让 URL 带种子直达也有稳定承接",
                "避免用户误会结果是瞬时给出的",
              ],
              rules: [
                "运行态顶部输入区暂时锁定",
                "页面明确显示当前种子频道",
                "结果区用骨架承接",
              ],
              checks: [
                "用户知道系统正在围绕哪个频道计算",
                "运行态不是空白页",
                "结果返回路径可预测",
              ],
              render: renderSimilarRunning,
            },
            {
              id: "similar-seeded",
              label: "结果页",
              title: "相似网红 · 相似结果列表",
              summary: "结果页顶部继续保留可编辑种子输入区，方便直接换种子重搜。",
              goals: [
                "强化单频道种子心智",
                "保持相似搜索的专业列表感",
                "让用户可以直接换种子继续搜",
              ],
              rules: [
                "结果保持普通相似结果列表",
                "默认按相似程度排序",
                "结果页顶部继续保留可编辑种子输入区",
                "不做采纳 / 排除 / 待定",
              ],
              checks: [
                "当前种子信息清楚可见",
                "结果列表语义稳定",
                "用户不会误以为进入了 AI搜索",
              ],
              render: renderSimilarSeeded,
            },
            {
              id: "similar-editing",
              label: "更换频道中",
              title: "相似网红 · 更换频道种子",
              summary: "结果页点击更换频道后，顶部回到可编辑混合框，但旧结果先保留，直到新种子提交。",
              goals: [
                "让用户可以在结果页直接换种子",
                "在新种子提交前保留旧结果作为上下文",
                "把编辑态和展示态边界拉清楚",
              ],
              rules: [
                "更换频道后顶部壳层回到混合输入框",
                "旧结果在新提交前不立刻清空",
                "无有效种子时主按钮仍不可用",
              ],
              checks: [
                "用户知道自己正在编辑新种子",
                "旧结果仍可参考",
                "阻塞反馈出现在输入框下方",
              ],
              render: renderSimilarEditing,
            },
            {
              id: "similar-editing-ready",
              label: "新种子待提交",
              title: "相似网红 · 新种子已识别待提交",
              summary: "在结果页更换频道后，新种子一旦识别成功，顶部再次切回频道卡展示态，但旧结果仍暂时保留。",
              goals: [
                "让用户确认新种子后再启动新一轮搜索",
                "保留旧结果直到正式提交",
                "维持输入壳层从编辑态回到展示态的连续性",
              ],
              rules: [
                "新种子识别成功后顶部切回频道卡展示态",
                "旧结果仍保留到用户点击开始搜索",
                "提交后再进入新的执行中态",
              ],
              checks: [
                "用户能区分当前展示的是旧结果还是新种子",
                "开始搜索按钮层级清楚",
                "页面不会因换种子变成空白",
              ],
              render: renderSimilarEditingReady,
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
  sceneMemory: createSceneMemory(),
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

els.previewRoot.addEventListener("click", handlePreviewNavigation);

function createSceneMemory() {
  return Object.fromEntries(
    Object.entries(DATA.workstreams).map(([workstreamKey, workstream]) => [
      workstreamKey,
      Object.fromEntries(
        Object.entries(workstream.sections).map(([sectionKey, section]) => [sectionKey, section.scenes[0].id])
      ),
    ])
  );
}

function getFirstSectionKey(workstreamKey) {
  return Object.keys(DATA.workstreams[workstreamKey].sections)[0];
}

function getFirstSceneId(workstreamKey, sectionKey) {
  return DATA.workstreams[workstreamKey].sections[sectionKey].scenes[0].id;
}

function rememberScene(workstreamKey = state.workstream, sectionKey = state.section, sceneId = state.scene) {
  state.sceneMemory[workstreamKey][sectionKey] = sceneId;
}

function getRememberedScene(workstreamKey, sectionKey) {
  return state.sceneMemory[workstreamKey][sectionKey] || getFirstSceneId(workstreamKey, sectionKey);
}

function getWorkstream() {
  return DATA.workstreams[state.workstream];
}

function getSection() {
  return getWorkstream().sections[state.section];
}

function getScene() {
  return getSection().scenes.find((scene) => scene.id === state.scene);
}

function navigateTo({ workstream = state.workstream, section, scene }) {
  rememberScene();

  const nextSection = section || (workstream === state.workstream ? state.section : getFirstSectionKey(workstream));
  const nextScene = scene || getRememberedScene(workstream, nextSection);

  state.workstream = workstream;
  state.section = nextSection;
  state.scene = nextScene;
  rememberScene(workstream, nextSection, nextScene);
  render();
}

function handlePreviewNavigation(event) {
  const trigger = event.target.closest("[data-nav-workstream], [data-nav-section], [data-nav-scene]");
  if (!trigger) {
    return;
  }

  event.preventDefault();

  navigateTo({
    workstream: trigger.dataset.navWorkstream || state.workstream,
    section: trigger.dataset.navSection,
    scene: trigger.dataset.navScene,
  });
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
    (value) => navigateTo({ workstream: value })
  );

  renderTabs(
    els.sectionTabs,
    Object.entries(workstream.sections).map(([value, meta]) => ({ value, label: meta.label })),
    state.section,
    (value) => navigateTo({ section: value })
  );

  renderTabs(
    els.sceneTabs,
    section.scenes.map((sceneItem) => ({ value: sceneItem.id, label: sceneItem.label })),
    state.scene,
    (value) => navigateTo({ scene: value })
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
    { key: "search", label: "搜索", target: { workstream: "channel" } },
    { key: "social", label: "其他社媒" },
    { key: "ttshop", label: "TT Shop" },
    { key: "similar", label: "相似网红", target: { workstream: "similar" } },
  ];

  return tabs
    .map(
      (tab) =>
        renderNavPill({
          label: tab.label,
          className: "subnav-link",
          isActive: tab.key === active,
          target: tab.target,
        })
    )
    .join("");
}

function navAttrs(target = {}) {
  return [
    target.workstream ? `data-nav-workstream="${target.workstream}"` : "",
    target.section ? `data-nav-section="${target.section}"` : "",
    target.scene ? `data-nav-scene="${target.scene}"` : "",
  ]
    .filter(Boolean)
    .join(" ");
}

function renderNavPill({ label, className, isActive = false, target }) {
  const classes = `${className}${isActive ? " is-active" : ""}`;
  if (!target || isActive) {
    return `<span class="${classes}">${label}</span>`;
  }
  return `<button type="button" class="${classes}" ${navAttrs(target)}>${label}</button>`;
}

function renderChannelPageTabs({ active, standardTarget = { workstream: "channel", section: "standard" }, aiTarget = { workstream: "channel", section: "ai" } }) {
  return [
    renderNavPill({
      label: "标准搜索",
      className: "page-tab",
      isActive: active === "standard",
      target: active === "standard" ? undefined : standardTarget,
    }),
    renderNavPill({
      label: "AI搜索",
      className: "page-tab",
      isActive: active === "ai",
      target: active === "ai" ? undefined : aiTarget,
    }),
  ].join("");
}

function renderAiModeTabs({ standardTarget = { workstream: "channel", section: "standard" } }) {
  return `
    ${renderNavPill({ label: "标准搜索", className: "page-tab", target: standardTarget })}
    ${renderNavPill({ label: "AI搜索（智能精选）", className: "page-tab", isActive: true })}
  `;
}

function renderStandardInputTabs({ activeInput }) {
  return `
    ${renderNavPill({
      label: "关键词",
      className: "input-tab",
      isActive: activeInput === "keyword",
      target: activeInput === "keyword" ? undefined : { workstream: "channel", section: "standard", scene: "standard-keyword" },
    })}
    ${renderNavPill({
      label: "自然语言",
      className: "input-tab",
      isActive: activeInput === "natural",
      target: activeInput === "natural" ? undefined : { workstream: "channel", section: "standard", scene: "standard-natural-input" },
    })}
  `;
}

function renderSimilarSecondaryTabs({ active }) {
  return `
    ${renderNavPill({
      label: "频道种子搜索",
      className: "secondary-tab",
      isActive: active === "seed",
      target: active === "seed" ? undefined : { workstream: "similar", section: "core", scene: "similar-default" },
    })}
    ${renderNavPill({
      label: "收藏夹相似搜索",
      className: "secondary-tab",
      isActive: active === "legacy",
      target: active === "legacy" ? undefined : { workstream: "similar", section: "core", scene: "similar-legacy-tab" },
    })}
  `;
}

function renderBucketPill({ label, tone, target }) {
  const className = `bucket-pill ${tone}`.trim();
  if (!target) {
    return `<span class="${className}">${label}</span>`;
  }
  return `<button type="button" class="${className}" ${navAttrs(target)}>${label}</button>`;
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
      (action) => {
        const className = `action-btn ${action.state ? `is-${action.state}` : ""}`.trim();
        if (!action.target) {
          return `<span class="${className}">${action.label}</span>`;
        }
        return `<button type="button" class="${className}" ${navAttrs(action.target)}>${action.label}</button>`;
      }
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
          ${renderStandardInputTabs({ activeInput })}
        </div>
        ${queryBox}
        ${summaryStrip}
      </div>
    </section>
    ${resultsHtml}
  `;
}

function aiSearchLayout({ contextStrip = "", searchBox, bucketBoard = "", resultsHtml, standardTarget = { workstream: "channel", section: "standard" } }) {
  return `
    ${contextStrip}
    <section class="search-card">
      <div class="search-surface">
        <div class="input-mode-tabs">
          ${renderAiModeTabs({ standardTarget })}
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
          actions: [{ label: "加入名单" }, { label: "找相似", target: { workstream: "similar", section: "core", scene: "similar-running" } }],
        })}
        ${creatorCard({
          name: "FGTeeV",
          handle: "@fgteev",
          tags: ["family", "kids gaming", "US"],
          metrics: ["粉丝 2520万", "近 30 天均播 47.12万", "地区 美国"],
          scoreLabel: "合作倾向 1/10",
          actions: [{ label: "加入名单" }, { label: "找相似", target: { workstream: "similar", section: "core", scene: "similar-running" } }],
        })}
      </div>
    </section>
  `;

  return renderAppShell({
    activeTop: "search",
    pageTitle: "频道搜索 · 标准搜索",
    pageSummary: "关键词模式保持现状，只在搜索区里增加输入形态切换。",
    pageTabsHtml: renderChannelPageTabs({ active: "standard" }),
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
        <button class="cta-btn" type="button" ${navAttrs({ workstream: "channel", section: "standard", scene: "standard-natural-backfill" })}>解析并搜索</button>
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
    pageTabsHtml: renderChannelPageTabs({ active: "standard" }),
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
      <div class="cta-row">
        <button class="ghost-btn" type="button" ${navAttrs({ workstream: "channel", section: "ai", scene: "ai-seeded" })}>带当前条件去 AI搜索</button>
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
        <button class="cta-btn" type="button" ${navAttrs({ workstream: "channel", section: "standard", scene: "standard-natural-input" })}>重新解析</button>
        <button class="ghost-btn" type="button" ${navAttrs({ workstream: "channel", section: "standard", scene: "standard-keyword" })}>切回关键词模式</button>
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
          actions: [{ label: "加入名单" }, { label: "找相似", target: { workstream: "similar", section: "core", scene: "similar-running" } }],
        })}
        ${creatorCard({
          name: "Caleb Kids Show",
          handle: "@CalebKidsShow",
          tags: ["kids", "toy review", "US"],
          metrics: ["粉丝 209万", "近 30 天均播 85.35万", "地区 美国"],
          scoreLabel: "合作倾向 3/10",
          actions: [{ label: "加入名单" }, { label: "找相似", target: { workstream: "similar", section: "core", scene: "similar-running" } }],
        })}
      </div>
    </section>
  `;

  return renderAppShell({
    activeTop: "search",
    pageTitle: "频道搜索 · 自然语言回填后的标准结果页",
    pageSummary: "用户看到的是现有参数体系被重组，而不是另起一套 AI 结果协议。",
    pageTabsHtml: renderChannelPageTabs({
      active: "standard",
      aiTarget: { workstream: "channel", section: "ai", scene: "ai-seeded" },
    }),
    bodyHtml: standardSearchLayout({ activeInput: "natural", queryBox, summaryStrip, resultsHtml }),
  });
}

function renderStandardBridgeToAi() {
  const contextStrip = `
    <section class="context-strip">
      <div class="context-copy">
        <h3>当前结果不够理想？</h3>
        <p>可把当前标准搜索条件带入 AI搜索 继续探索。将带入：地区美国 / 粉丝量 10万-100万 / 关键词 toy unboxing，不会改写当前标准搜索状态。</p>
      </div>
      <button class="cta-btn" type="button" ${navAttrs({ workstream: "channel", section: "ai", scene: "ai-seeded" })}>带当前条件去 AI搜索</button>
    </section>
  `;

  const summaryStrip = `
    <div class="summary-strip">
      <div class="summary-copy">
        <span class="status-pill">标准搜索仍保留现场</span>
        <p>点击桥接动作后，将基于现有条件创建一个新的 AI搜索 session，适合在结果不够理想时继续探索。</p>
      </div>
    </div>
  `;

  const queryBox = `
    <div class="search-bar">
      <div class="search-label"><span class="accent-dot"></span>标准搜索当前条件</div>
      <div class="readonly-field">当前已通过自然语言回填为标准搜索参数，可继续直接搜索，也可改走 AI搜索。</div>
      <div class="pill-row">
        <span class="read-pill">关键词：toy unboxing</span>
        <span class="read-pill">地区：美国</span>
        <span class="read-pill">粉丝量：10万 - 100万</span>
        <span class="read-pill">活跃度：近 30 天更新</span>
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
        <div class="board-meta">1,248 条结果 · 当前标准结果可继续浏览</div>
      </div>
      <div class="card-stack">
        ${creatorCard({
          name: "The Fizzy Show",
          handle: "@TheFizzyShow",
          tags: ["toys", "family", "kids"],
          metrics: ["粉丝 543万", "近 30 天均播 56.91万", "地区 美国"],
          scoreLabel: "合作倾向 3/10",
          actions: [{ label: "加入名单" }, { label: "找相似", target: { workstream: "similar", section: "core", scene: "similar-running" } }],
        })}
        ${creatorCard({
          name: "Caleb Kids Show",
          handle: "@CalebKidsShow",
          tags: ["kids", "toy review", "US"],
          metrics: ["粉丝 209万", "近 30 天均播 85.35万", "地区 美国"],
          scoreLabel: "合作倾向 3/10",
          actions: [{ label: "加入名单" }, { label: "找相似", target: { workstream: "similar", section: "core", scene: "similar-running" } }],
        })}
      </div>
    </section>
  `;

  return renderAppShell({
    activeTop: "search",
    pageTitle: "频道搜索 · 从标准搜索带条件跳到 AI搜索",
    pageSummary: "桥接动作必须在标准搜索结果页中可见，而不是只存在于 AI搜索 空白态。",
    pageTabsHtml: renderChannelPageTabs({
      active: "standard",
      aiTarget: { workstream: "channel", section: "ai", scene: "ai-seeded" },
    }),
    bodyHtml: standardSearchLayout({
      activeInput: "natural",
      contextStrip,
      queryBox,
      summaryStrip,
      resultsHtml,
    }),
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
        <button class="cta-btn" type="button" ${navAttrs({ workstream: "channel", section: "ai", scene: "ai-running" })}>开始 AI搜索</button>
        <button class="ghost-btn" type="button" ${navAttrs({ workstream: "channel", section: "ai", scene: "ai-seeded" })}>带入当前标准搜索条件</button>
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
    pageTabsHtml: renderChannelPageTabs({ active: "ai", standardTarget: { workstream: "channel", section: "standard" } }),
    bodyHtml: aiSearchLayout({ searchBox, resultsHtml, standardTarget: { workstream: "channel", section: "standard" } }),
  });
}

function renderAiSeeded() {
  const contextStrip = `
    <section class="context-strip">
      <div class="context-copy">
        <h3>已保留带条件起手入口</h3>
        <p>这条线本轮先作为桥接占位态保留：入口存在，但带入字段、seed 展示和预填 query 细节留到下一轮再定。</p>
      </div>
      <button class="ghost-btn" type="button" ${navAttrs({ workstream: "channel", section: "standard", scene: "standard-natural-backfill" })}>回标准结果页</button>
    </section>
  `;

  const searchBox = `
    <div class="search-bar">
      <div class="search-label"><span class="accent-dot"></span>AI 搜索工作台</div>
      <div class="readonly-field">来自标准搜索的结构化条件会作为后续 AI 搜索 seed，但这部分具体承载方式本轮不定版。</div>
      <div class="pill-row">
        <span class="read-pill">入口已保留</span>
        <span class="list-chip">seed 展示待下一轮</span>
        <span class="list-chip">query 预填待下一轮</span>
      </div>
      <div class="cta-row">
        <button class="cta-btn" type="button" ${navAttrs({ workstream: "channel", section: "ai", scene: "ai-blank" })}>先体验从 0 开始主线</button>
        <button class="ghost-btn" type="button" ${navAttrs({ workstream: "channel", section: "ai", scene: "ai-blank" })}>回到 AI 空白起手</button>
      </div>
    </div>
  `;

  const resultsHtml = `
    <section class="result-board">
      <div class="empty-state">
        <div class="empty-illustration"></div>
        <p class="empty-title">本轮先不细化带条件起手</p>
        <p class="empty-copy">当前只确保这条桥接路径可见、可进入、可被继续讨论，而不把 seed 细节提前写死。</p>
      </div>
    </section>
  `;

  return renderAppShell({
    activeTop: "search",
    pageTitle: "频道搜索 · AI搜索带条件起手（占位）",
    pageSummary: "入口保留，但带入字段、seed 展示和 query 预填规则放到下一轮统一细化。",
    pageTabsHtml: renderChannelPageTabs({ active: "ai", standardTarget: { workstream: "channel", section: "standard", scene: "standard-natural-backfill" } }),
    bodyHtml: aiSearchLayout({
      contextStrip,
      searchBox,
      resultsHtml,
      standardTarget: { workstream: "channel", section: "standard", scene: "standard-natural-backfill" },
    }),
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
        <div class="cta-row">
          <button class="cta-btn" type="button" ${navAttrs({ workstream: "channel", section: "ai", scene: "ai-batch-results" })}>Mock 召回完成</button>
          <span class="list-chip">仅 demo：手动推进到结果返回</span>
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
    pageTabsHtml: renderChannelPageTabs({ active: "ai", standardTarget: { workstream: "channel", section: "standard", scene: "standard-keyword" } }),
    bodyHtml: aiSearchLayout({ searchBox, resultsHtml, standardTarget: { workstream: "channel", section: "standard", scene: "standard-keyword" } }),
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
          <p>你可以先处理关键结果，再直接进入下一批；未处理项会在切到下一批时自动归入待定。</p>
        </div>
      </div>
    </div>
  `;

  const bucketBoard = `
    <section class="bucket-board">
      <div class="bucket-row">
        <h3>本次 AI 搜索摘要</h3>
        <div class="bucket-row">
          ${renderBucketPill({ label: "已采纳 2", tone: "accepted", target: { workstream: "channel", section: "ai", scene: "ai-summary-expanded" } })}
          ${renderBucketPill({ label: "待定 1", tone: "pending", target: { workstream: "channel", section: "ai", scene: "ai-summary-expanded" } })}
          ${renderBucketPill({ label: "排除 3", tone: "excluded", target: { workstream: "channel", section: "ai", scene: "ai-summary-expanded" } })}
        </div>
      </div>
      <p class="bucket-empty">这里统计的是整个 session 的累计结果，不只看当前批次。</p>
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
            { label: "采纳", state: "accepted", target: { workstream: "channel", section: "ai", scene: "ai-summary-expanded" } },
            { label: "待定", target: { workstream: "channel", section: "ai", scene: "ai-summary-expanded" } },
            { label: "排除", target: { workstream: "channel", section: "ai", scene: "ai-summary-expanded" } },
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
            { label: "采纳", target: { workstream: "channel", section: "ai", scene: "ai-summary-expanded" } },
            { label: "待定", state: "pending", target: { workstream: "channel", section: "ai", scene: "ai-summary-expanded" } },
            { label: "排除", target: { workstream: "channel", section: "ai", scene: "ai-summary-expanded" } },
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
            { label: "采纳", target: { workstream: "channel", section: "ai", scene: "ai-summary-expanded" } },
            { label: "待定", target: { workstream: "channel", section: "ai", scene: "ai-summary-expanded" } },
            { label: "排除", state: "excluded", target: { workstream: "channel", section: "ai", scene: "ai-summary-expanded" } },
          ],
        })}
      </div>
      <div class="footer-cta">
        <button class="cta-btn" type="button" ${navAttrs({ workstream: "channel", section: "ai", scene: "ai-next-batch" })}>进入下一批</button>
        <button class="ghost-btn" type="button" ${navAttrs({ workstream: "channel", section: "ai", scene: "ai-query-adjust" })}>改 query 重搜</button>
      </div>
    </section>
  `;

  return renderAppShell({
    activeTop: "search",
    pageTitle: "频道搜索 · AI搜索批次结果",
    pageSummary: "每个结果都被消费为 accepted / pending / excluded 之一，采纳只进入当前 session 候选池。",
    pageTabsHtml: renderChannelPageTabs({ active: "ai", standardTarget: { workstream: "channel", section: "standard", scene: "standard-keyword" } }),
    bodyHtml: aiSearchLayout({ searchBox, bucketBoard, resultsHtml, standardTarget: { workstream: "channel", section: "standard", scene: "standard-keyword" } }),
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
        <div class="cta-row">
          <button class="cta-btn" type="button" ${navAttrs({ workstream: "channel", section: "ai", scene: "ai-next-batch" })}>进入下一批</button>
          <button class="ghost-btn" type="button" ${navAttrs({ workstream: "channel", section: "ai", scene: "ai-query-adjust" })}>改 query 重搜</button>
        </div>
      </div>
    </div>
  `;

  const bucketBoard = `
    <section class="bucket-board">
      <div class="bucket-row">
        <h3>本次 AI 搜索摘要</h3>
        <div class="bucket-row">
          ${renderBucketPill({ label: "已采纳 2", tone: "accepted" })}
          ${renderBucketPill({ label: "待定 1", tone: "pending" })}
          ${renderBucketPill({ label: "排除 3", tone: "excluded" })}
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
    pageTabsHtml: renderChannelPageTabs({ active: "ai", standardTarget: { workstream: "channel", section: "standard", scene: "standard-keyword" } }),
    bodyHtml: aiSearchLayout({ searchBox, bucketBoard, resultsHtml, standardTarget: { workstream: "channel", section: "standard", scene: "standard-keyword" } }),
  });
}

function renderAiNextBatch() {
  const searchBox = `
    <div class="search-bar">
      <div class="search-label"><span class="accent-dot"></span>AI 搜索工作台</div>
      <div class="search-textarea">帮我找美国做户外跑步装备测评、互动率高、最近一个月持续更新的 YouTube 频道</div>
      <div class="summary-strip">
        <div class="summary-copy">
          <span class="status-pill">准备进入下一批</span>
          <p>当前批次未处理项将自动归入待定，顶部摘要继续沿用整个 session 的累计结果。</p>
        </div>
      </div>
    </div>
  `;

  const bucketBoard = `
    <section class="bucket-board">
      <div class="bucket-row">
        <h3>本次 AI 搜索摘要</h3>
        <div class="bucket-row">
          ${renderBucketPill({ label: "已采纳 3", tone: "accepted" })}
          ${renderBucketPill({ label: "待定 4", tone: "pending" })}
          ${renderBucketPill({ label: "排除 5", tone: "excluded" })}
        </div>
      </div>
      <p class="bucket-empty">结果区不会保留上一批的长列表，历史消费会沉淀到顶部摘要里。</p>
    </section>
  `;

  const resultsHtml = `
    <section class="result-board">
      <div class="board-head">
        <h3>即将获取第 2 批</h3>
        <div class="board-meta">当前批次历史已折叠，未处理项自动归入待定</div>
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
        <button class="cta-btn" type="button" ${navAttrs({ workstream: "channel", section: "ai", scene: "ai-running" })}>开始获取下一批 10 条候选</button>
        <button class="ghost-btn" type="button" ${navAttrs({ workstream: "channel", section: "ai", scene: "ai-query-adjust" })}>改 query 重搜</button>
      </div>
    </section>
  `;

  return renderAppShell({
    activeTop: "search",
    pageTitle: "频道搜索 · AI搜索下一批",
    pageSummary: "批次推进必须由用户显式触发，方便在每轮之间停下来判断或调 query。",
    pageTabsHtml: renderChannelPageTabs({ active: "ai", standardTarget: { workstream: "channel", section: "standard", scene: "standard-keyword" } }),
    bodyHtml: aiSearchLayout({ searchBox, bucketBoard, resultsHtml, standardTarget: { workstream: "channel", section: "standard", scene: "standard-keyword" } }),
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
        <button class="cta-btn" type="button" ${navAttrs({ workstream: "channel", section: "ai", scene: "ai-running" })}>重新生成候选</button>
        <button class="ghost-btn" type="button" ${navAttrs({ workstream: "channel", section: "ai", scene: "ai-summary-expanded" })}>查看上一轮已采纳</button>
      </div>
    </div>
  `;

  const bucketBoard = `
    <section class="bucket-board">
      <div class="bucket-row">
        <h3>当前 session 摘要</h3>
        <div class="bucket-row">
          ${renderBucketPill({ label: "已采纳 3", tone: "accepted", target: { workstream: "channel", section: "ai", scene: "ai-summary-expanded" } })}
          ${renderBucketPill({ label: "待定 2", tone: "pending", target: { workstream: "channel", section: "ai", scene: "ai-summary-expanded" } })}
          ${renderBucketPill({ label: "排除 5", tone: "excluded", target: { workstream: "channel", section: "ai", scene: "ai-summary-expanded" } })}
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
            { label: "采纳", state: "accepted", target: { workstream: "channel", section: "ai", scene: "ai-summary-expanded" } },
            { label: "待定", target: { workstream: "channel", section: "ai", scene: "ai-summary-expanded" } },
            { label: "排除", target: { workstream: "channel", section: "ai", scene: "ai-summary-expanded" } },
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
            { label: "采纳", target: { workstream: "channel", section: "ai", scene: "ai-summary-expanded" } },
            { label: "待定", target: { workstream: "channel", section: "ai", scene: "ai-summary-expanded" } },
            { label: "排除", target: { workstream: "channel", section: "ai", scene: "ai-summary-expanded" } },
          ],
        })}
      </div>
    </section>
  `;

  return renderAppShell({
    activeTop: "search",
    pageTitle: "频道搜索 · AI搜索调 query 重搜",
    pageSummary: "AI搜索的主要调优面仍然是自然语言 query，而不是复杂显式筛选器。",
    pageTabsHtml: renderChannelPageTabs({ active: "ai", standardTarget: { workstream: "channel", section: "standard", scene: "standard-keyword" } }),
    bodyHtml: aiSearchLayout({ searchBox, bucketBoard, resultsHtml, standardTarget: { workstream: "channel", section: "standard", scene: "standard-keyword" } }),
  });
}

function renderSimilarResolvedSeedShell({
  title = "当前频道种子",
  statusLabel,
  description,
  primaryLabel,
  primaryTarget,
  secondaryLabel,
  secondaryTarget,
  chips = [],
  seedName = "Hollyland Tech",
  seedHandle = "@HollylandTech",
  seedPlatform = "YouTube",
}) {
  const chipHtml = chips.map((chip) => `<span class="${chip.tone || "read-pill"}">${chip.label}</span>`).join("");
  const actionsHtml =
    primaryLabel || secondaryLabel
      ? `<div class="cta-row">
          ${primaryLabel ? `<button class="cta-btn" type="button" ${navAttrs(primaryTarget)}>${primaryLabel}</button>` : ""}
          ${secondaryLabel ? `<button class="ghost-btn" type="button" ${navAttrs(secondaryTarget)}>${secondaryLabel}</button>` : ""}
        </div>`
      : "";
  return `
    <div class="seed-entry-card">
      <div class="seed-entry-row">
        <div class="search-label"><span class="accent-dot"></span>${title}</div>
        ${statusLabel ? `<span class="seed-mode-pill">${statusLabel}</span>` : ""}
      </div>
      <div class="seed-card embedded">
        <div class="seed-card-main">
          <div class="creator-avatar"></div>
          <div>
            <h4>${seedName}</h4>
            <p>${seedHandle} · ${seedPlatform} · 已识别为有效频道种子</p>
          </div>
        </div>
        <div class="pill-row">
          <span class="seed-badge">当前频道种子</span>
          <span class="read-pill">平台：${seedPlatform}</span>
        </div>
      </div>
      ${description ? `<p class="seed-inline-hint">${description}</p>` : ""}
      ${chipHtml ? `<div class="pill-row">${chipHtml}</div>` : ""}
      ${actionsHtml}
    </div>
  `;
}

function renderSimilarEditableSeedShell({
  inputValue,
  placeholder = "搜索频道名称、粘贴频道 URL 或输入 @handle",
  helperText,
  validationTone = "hint",
  primaryLabel = "开始找相似网红",
  primaryTarget,
  primaryDisabled = false,
  secondaryLabel,
  secondaryTarget,
  suggestions = [],
}) {
  const suggestionHtml = suggestions
    .map(
      (item) => `
        <button class="seed-suggestion ${item.selected ? "is-selected" : ""}" type="button" ${item.target ? navAttrs(item.target) : ""}>
          <span class="seed-suggestion-title">${item.title}</span>
          <span class="seed-suggestion-meta">${item.meta}</span>
        </button>
      `
    )
    .join("");

  return `
    <div class="seed-entry-card">
      <div class="seed-entry-row">
        <div class="search-label"><span class="accent-dot"></span>输入种子频道</div>
        <span class="seed-mode-pill">支持搜索 / URL / handle</span>
      </div>
      <div class="seed-input ${!inputValue ? "placeholder" : ""}">${inputValue || placeholder}</div>
      <p class="seed-inline-hint ${validationTone === "error" ? "is-error" : ""}">${helperText}</p>
      ${suggestionHtml ? `<div class="seed-suggestion-list">${suggestionHtml}</div>` : ""}
      <div class="cta-row">
        <button class="cta-btn" type="button" ${primaryTarget ? navAttrs(primaryTarget) : ""} ${primaryDisabled ? "disabled" : ""}>${primaryLabel}</button>
        ${
          secondaryLabel
            ? `<button class="ghost-btn" type="button" ${navAttrs(secondaryTarget)}> ${secondaryLabel}</button>`
            : ""
        }
      </div>
    </div>
  `;
}

function renderSimilarResultsList() {
  return `
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
}

function renderSimilarDefault() {
  const inputShell = renderSimilarEditableSeedShell({
    inputValue: "hollyland",
    helperText: "请输入频道 URL / @handle，或从搜索结果中选择一个明确频道后再开始搜索。",
    validationTone: "error",
    primaryDisabled: true,
    secondaryLabel: "模拟 URL 带种子直达",
    secondaryTarget: { workstream: "similar", section: "core", scene: "similar-running" },
    suggestions: [
      {
        title: "Hollyland Tech",
        meta: "@HollylandTech · YouTube · 搜索结果候选",
        target: { workstream: "similar", section: "core", scene: "similar-ready" },
      },
      {
        title: "Hollyland Academy",
        meta: "@hollylandacademy · YouTube · 搜索结果候选",
      },
    ],
  });

  const bodyHtml = `
    <section class="seed-input-card">
      <div class="search-card-header">
        <div>
          <p class="kicker">Blank Input</p>
          <h3>等待输入频道</h3>
          <p class="seed-helper">默认主流程先等待用户输入频道，也支持通过 URL 带平台与频道 ID 直达并自动开始搜索。</p>
        </div>
      </div>
      <div class="secondary-tab-row">${renderSimilarSecondaryTabs({ active: "seed" })}</div>
      ${inputShell}
      <div class="pill-row">
        <span class="list-chip">搜索型输入必须先从候选结果中选中频道</span>
        <span class="list-chip">URL / @handle 在显式提交时解析锁定</span>
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

function renderSimilarReady() {
  const bodyHtml = `
    <section class="seed-input-card">
      <div class="search-card-header">
        <div>
          <p class="kicker">Resolved Seed</p>
          <h3>当前频道种子已识别</h3>
          <p class="seed-helper">搜索关键词、URL 和 @handle 最终都收敛成同一频道种子卡，确认后再开始搜索。</p>
        </div>
      </div>
      <div class="secondary-tab-row">${renderSimilarSecondaryTabs({ active: "seed" })}</div>
      ${renderSimilarResolvedSeedShell({
        statusLabel: "已形成有效种子",
        description: "当前频道已被识别为有效种子，此时主按钮可用；如需修改，请先点击“更换频道”。",
        primaryLabel: "开始找相似网红",
        primaryTarget: { workstream: "similar", section: "core", scene: "similar-running" },
        secondaryLabel: "更换频道",
        secondaryTarget: { workstream: "similar", section: "core", scene: "similar-default" },
        chips: [
          { label: "来源：搜索结果已选中", tone: "read-pill" },
          { label: "平台：YouTube", tone: "list-chip" },
        ],
      })}
    </section>
  `;

  return renderAppShell({
    activeTop: "similar",
    pageTitle: "相似网红",
    pageSummary: "一旦识别出有效种子，顶部输入壳层切成频道卡展示态，再进入搜索主线。",
    pageTabsHtml: '<span class="page-tab is-active">相似网红</span>',
    bodyHtml,
  });
}

function renderSimilarRunning() {
  const seedShell = renderSimilarResolvedSeedShell({
    statusLabel: "执行中已锁定",
    description: "页面通过 URL 带 platform + channelId 直达时，顶部直接进入频道卡展示态，不再先显示空白输入框。",
    chips: [
      { label: "来源：URL 直达", tone: "read-pill" },
      { label: "platform=youtube", tone: "list-chip" },
      { label: "channelId=UC4WZ...", tone: "list-chip" },
    ],
  });

  const bodyHtml = `
    <section class="seed-input-card">
      <div class="search-card-header">
        <div>
          <p class="kicker">Running State</p>
          <h3>正在围绕当前频道计算相似结果</h3>
          <p class="seed-helper">这条线既可以来自手动输入，也可以来自 URL 带种子直达。由于计算更慢，必须先经过独立执行中态。</p>
        </div>
      </div>
      <div class="secondary-tab-row">${renderSimilarSecondaryTabs({ active: "seed" })}</div>
      ${seedShell}
    </section>
    <section class="result-board">
      <div class="board-head">
        <h3>相似结果计算中</h3>
        <div class="board-meta">多模态向量召回执行中</div>
      </div>
      <div class="card-stack">
        ${skeletonCard()}
        ${skeletonCard()}
      </div>
      <div class="footer-cta">
        <button class="cta-btn" type="button" ${navAttrs({ workstream: "similar", section: "core", scene: "similar-seeded" })}>Mock 召回完成</button>
      </div>
    </section>
  `;

  return renderAppShell({
    activeTop: "similar",
    pageTitle: "相似网红",
    pageSummary: "已知种子频道时，先进入执行中，再返回相似结果页。",
    pageTabsHtml: '<span class="page-tab is-active">相似网红</span>',
    bodyHtml,
  });
}

function renderSimilarSeeded() {
  const seedShell = renderSimilarResolvedSeedShell({
    statusLabel: "结果已返回",
    description: "结果页继续复用同一个种子输入壳层；点击“更换频道”后再回到可编辑混合框。",
    primaryLabel: "重新找相似",
    primaryTarget: { workstream: "similar", section: "core", scene: "similar-running" },
    secondaryLabel: "更换频道",
    secondaryTarget: { workstream: "similar", section: "core", scene: "similar-editing" },
    chips: [
      { label: "当前种子：Hollyland Tech", tone: "seed-badge" },
      { label: "默认按相似程度排序", tone: "read-pill" },
    ],
  });

  const bodyHtml = `
    <section class="seed-input-card">
      <div class="search-card-header">
        <div>
          <p class="kicker">Vector Recall</p>
          <h3>相似结果已返回</h3>
          <p class="seed-helper">结果页顶部继续保留可编辑种子输入区，方便直接换一个频道继续找相似。</p>
        </div>
      </div>
      <div class="secondary-tab-row">${renderSimilarSecondaryTabs({ active: "seed" })}</div>
      ${seedShell}
    </section>
    ${renderSimilarResultsList()}
  `;

  return renderAppShell({
    activeTop: "similar",
    pageTitle: "相似网红",
    pageSummary: "新默认相似网红结果保持普通列表形态，不走 AI 搜索批次消费流程。",
    pageTabsHtml: '<span class="page-tab is-active">相似网红</span>',
    bodyHtml,
  });
}

function renderSimilarEditing() {
  const inputShell = renderSimilarEditableSeedShell({
    inputValue: "aputure",
    helperText: "请选择一个频道作为新的种子频道；在正式提交前，当前旧结果会先保留供参考。",
    validationTone: "error",
    primaryDisabled: true,
    secondaryLabel: "取消更换",
    secondaryTarget: { workstream: "similar", section: "core", scene: "similar-seeded" },
    suggestions: [
      {
        title: "Aputure",
        meta: "@aputure · YouTube · 搜索结果候选",
        target: { workstream: "similar", section: "core", scene: "similar-editing-ready" },
      },
      {
        title: "Aputure Academy",
        meta: "@aputureacademy · YouTube · 搜索结果候选",
      },
    ],
  });

  const bodyHtml = `
    <section class="seed-input-card">
      <div class="search-card-header">
        <div>
          <p class="kicker">Edit Seed</p>
          <h3>更换频道种子</h3>
          <p class="seed-helper">点击更换频道后，顶部回到混合输入框，但旧结果会先保留，直到你真正提交新的有效种子。</p>
        </div>
      </div>
      <div class="secondary-tab-row">${renderSimilarSecondaryTabs({ active: "seed" })}</div>
      ${inputShell}
    </section>
    ${renderSimilarResultsList()}
  `;

  return renderAppShell({
    activeTop: "similar",
    pageTitle: "相似网红",
    pageSummary: "编辑新种子时，旧结果仍保留在页面下方，直到新提交触发新的执行中态。",
    pageTabsHtml: '<span class="page-tab is-active">相似网红</span>',
    bodyHtml,
  });
}

function renderSimilarEditingReady() {
  const seedShell = renderSimilarResolvedSeedShell({
    statusLabel: "新种子已识别",
    description: "你已经选中了一个新的有效频道种子；旧结果仍暂时保留，点击主按钮后才进入新一轮执行中。",
    primaryLabel: "开始找相似网红",
    primaryTarget: { workstream: "similar", section: "core", scene: "similar-running" },
    secondaryLabel: "更换频道",
    secondaryTarget: { workstream: "similar", section: "core", scene: "similar-editing" },
    seedName: "Aputure",
    seedHandle: "@aputure",
    seedPlatform: "YouTube",
    chips: [
      { label: "新种子：Aputure", tone: "seed-badge" },
      { label: "旧结果暂时保留", tone: "list-chip" },
    ],
  });

  const bodyHtml = `
    <section class="seed-input-card">
      <div class="search-card-header">
        <div>
          <p class="kicker">Ready To Resubmit</p>
          <h3>新种子待提交</h3>
          <p class="seed-helper">混合框重新解析出有效种子后，顶部壳层再次切成频道卡展示态，但在正式提交前旧结果仍保留。</p>
        </div>
      </div>
      <div class="secondary-tab-row">${renderSimilarSecondaryTabs({ active: "seed" })}</div>
      ${seedShell}
    </section>
    ${renderSimilarResultsList()}
  `;

  return renderAppShell({
    activeTop: "similar",
    pageTitle: "相似网红",
    pageSummary: "新种子识别成功后，顶部回到频道卡展示态，等待用户正式启动新一轮搜索。",
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
      <div class="secondary-tab-row">${renderSimilarSecondaryTabs({ active: "legacy" })}</div>
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
          <button class="ghost-btn" type="button" ${navAttrs({ workstream: "similar", section: "core", scene: "similar-default" })}>切回新默认流程</button>
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
