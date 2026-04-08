const STANDARD_DECISIONS = [
  "自然语言是标准搜索输入形态，不是一级模式",
  "自然语言搜索动作永远回落到当前生效 schema 参数",
  "自然语言既支持整套重建，也支持基于当前条件的增量调整",
  "关键词模式把关键词胶囊留在搜索框内；自然语言模式把关键词并入当前生效条件",
  "结果页顶部固定为：输入框 -> 当前生效条件 -> 折叠历史",
  "自然语言历史只记录成功搜索，切到关键词模式即清空",
  "解析失败以内联提示呈现，旧结果继续保留",
];

const AI_DECISIONS = [
  "智能精选是频道列表后的 deep research 工作台，不是并列搜索模式",
  "输入对象是冻结的结果快照 + 来源搜索条件，不是全库自由搜索",
  "顶部顺序固定为：输入快照 -> 精选策略 -> session 集合 -> 当前轮次结果",
  "默认动作是继续筛，重新筛必须显式触发",
  "继续筛基于当前列表；重新筛回到本轮直接基底",
  "智能精选的 session 需要持久化，刷新后默认恢复最近活动的未归档 session",
  "session 之间彼此独立，不共享采纳 / 排除与策略进度",
  "轻量差异只表达相对本轮基底与原始快照的收敛程度",
];

const SIMILAR_DECISIONS = [
  "相似网红继续独立为默认入口域",
  "新默认流程改为单频道输入 + 多模态向量召回",
  "支持 URL 携带平台 + 频道ID 直达并自动搜索",
  "旧收藏夹方案保留为页内次级 Tab",
  "新相似网红结果仍是普通结果列表",
  "相似网红不并入智能精选工作台流程",
];

const BRIDGE_DECISIONS = [
  "桥接智能精选属于 v6.3.10，不属于 v6.3.9 的标准搜索交付",
  "桥接入口只保留在标准搜索结果页，不出现在 v6.3.9 的产品 UI 中",
  "桥接带走的是标准搜索当前结果快照与来源条件，而不是几条 seed 字段",
  "桥接文案应强调“对这份结果做智能精选”，而不是“带条件继续搜索”",
];

const RELEASE_ORDER = ["v6.3.9", "v6.3.10"];

const SCENE_META = {
  "standard-keyword": { release: "v6.3.9" },
  "standard-natural-input": { release: "v6.3.9" },
  "standard-natural-running": { release: "v6.3.9" },
  "standard-natural-backfill": { release: "v6.3.9" },
  "standard-natural-failure": { release: "v6.3.9" },
  "similar-default": { release: "v6.3.9" },
  "similar-ready": { release: "v6.3.9" },
  "similar-running": { release: "v6.3.9" },
  "similar-seeded": { release: "v6.3.9" },
  "similar-editing": { release: "v6.3.9" },
  "similar-editing-ready": { release: "v6.3.9" },
  "similar-legacy-tab": { release: "v6.3.9" },
  "standard-bridge-ai": { release: "v6.3.10", dependsOn: "v6.3.9" },
  "ai-blank": { release: "v6.3.10", dependsOn: "v6.3.9" },
  "ai-seeded": { release: "v6.3.10", dependsOn: "v6.3.9" },
  "ai-running": { release: "v6.3.10", dependsOn: "v6.3.9" },
  "ai-batch-results": { release: "v6.3.10", dependsOn: "v6.3.9" },
  "ai-summary-expanded": { release: "v6.3.10", dependsOn: "v6.3.9" },
  "ai-next-batch": { release: "v6.3.10", dependsOn: "v6.3.9" },
  "ai-query-adjust": { release: "v6.3.10", dependsOn: "v6.3.9" },
};

const RELEASE_META = {
  "v6.3.9": { label: "v6.3.9", tone: "current", title: "当前版本" },
  "v6.3.10": { label: "v6.3.10", tone: "next", title: "下个版本" },
};

const DATA = {
  workstreams: {
    channel: {
      label: "频道搜索模式升级",
      sections: {
        standard: {
          label: "标准搜索",
          decisions: STANDARD_DECISIONS,
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
                "关键词胶囊继续留在搜索框内",
              ],
              checks: [
                "关键词输入主路径清楚可见",
                "现有筛选区与结果列表骨架稳定",
                "与自然语言模式的展示差异清楚",
              ],
              render: renderStandardKeyword,
            },
            {
              id: "standard-natural-input",
              label: "自然语言输入",
              title: "标准搜索 · 自然语言输入形态",
              summary: "用户可带着当前标准搜索现场切进自然语言模式，用空白输入框继续重建或增量调整条件。",
              goals: [
                "让自然语言成为标准搜索里的建参入口",
                "允许用户基于当前条件继续描述需求",
                "保持标准搜索现场不丢失",
              ],
              rules: [
                "输入框默认空白，但当前生效条件必须可见",
                "自然语言语义既可重建也可增量调整",
                "提交后要先经过轻处理中态",
              ],
              checks: [
                "用户知道自己正在基于哪套条件继续说",
                "自然语言输入框与关键词模式明显区分",
                "当前标准结果现场保持稳定",
              ],
              render: renderStandardNaturalInput,
            },
            {
              id: "standard-natural-running",
              label: "解析中",
              title: "标准搜索 · 自然语言轻处理中",
              summary: "点击解析后给一个轻量处理中反馈，再回到标准搜索结果页，不进入独立执行页。",
              goals: [
                "承认系统正在解析自然语言",
                "避免用户误以为页面没反应",
                "保持这条线仍属于标准搜索",
              ],
              rules: [
                "处理中态应是轻量的，不做独立 AI 执行页",
                "结果区要给出过渡反馈",
                "允许 demo 手动触发成功或失败分支",
              ],
              checks: [
                "用户知道系统正在更新搜索条件",
                "标准搜索心智没有丢失",
                "成功与失败都可被验证",
              ],
              render: renderStandardNaturalRunning,
            },
            {
              id: "standard-natural-backfill",
              label: "回填结果",
              title: "标准搜索 · 自然语言回填后的标准结果页",
              summary: "回填成功后，结果页顶部变成紧凑输入框、当前生效条件与折叠历史的组合工作台。",
              goals: [
                "把自然语言显式回落到 schema 参数体系",
                "让自然语言结果页支持继续输入下一句",
                "把历史记录做成轻量搜索轨迹",
              ],
              rules: [
                "结果页顶部顺序固定为：输入框 -> 当前生效条件 -> 折叠历史",
                "不单独展示 diff 层",
                "结果仍然是标准搜索结果列表",
              ],
              checks: [
                "当前生效条件清楚可见",
                "成功搜索进入历史时间线",
                "结果列表仍是原搜索体系",
              ],
              render: renderStandardNaturalBackfill,
            },
            {
              id: "standard-bridge-ai",
              label: "桥接智能精选",
              title: "标准搜索 · 当前条件桥接智能精选",
              summary: "这条桥接线属于 v6.3.10：把标准搜索已经产出的结果快照与来源条件显式带到智能精选继续处理。",
              decisions: BRIDGE_DECISIONS,
              goals: [
                "补齐标准搜索到智能精选的桥接线",
                "让用户继续看到自然语言历史与当前搜索现场",
                "明确这是新智能精选 session，而不是标准搜索继续编辑",
              ],
              rules: [
                "桥接动作挂在当前生效条件区",
                "桥接只带入当前条件，不反写标准搜索状态",
                "关键词 / 自然语言切换仍留在输入框里",
              ],
              checks: [
                "用户在标准搜索结果页能看见去智能精选的路径",
                "智能精选桥接没有抢走自然语言继续输入的主线",
                "标准搜索与智能精选的边界仍然稳定",
              ],
              render: renderStandardBridgeToAi,
            },
            {
              id: "standard-natural-failure",
              label: "解析失败",
              title: "标准搜索 · 自然语言解析失败",
              summary: "新一句自然语言无法解析时，失败提示以内联方式出现，旧结果与当前条件继续保留。",
              goals: [
                "让失败反馈足够轻，不打断标准搜索",
                "避免因一次失败而丢掉现场",
                "保持用户仍可继续自然语言尝试",
              ],
              rules: [
                "失败提示贴在输入框下方",
                "旧结果继续保留，不切失败空态",
                "不自动退回关键词，也不自动跳智能精选",
              ],
              checks: [
                "失败原因与改写建议清楚",
                "旧结果仍可继续浏览",
                "用户能立刻继续下一次自然语言尝试",
              ],
              render: renderStandardNaturalFailure,
            },
          ],
        },
        ai: {
          label: "智能精选",
          decisions: AI_DECISIONS,
          scenes: [
            {
              id: "ai-blank",
              label: "等待快照",
              title: "智能精选 · 等待输入快照",
              summary: "智能精选不直接面向全库搜索，而是等待一份可追溯的结果快照进入工作台。",
              goals: [
                "把智能精选定义成结果后的下一阶段",
                "明确它的输入对象是一份结果快照",
                "避免继续被误解成独立搜索模式",
              ],
              rules: [
                "空态不提供全库自由搜索承诺",
                "要明确说明需从标准搜索结果桥接进入",
                "session 为空时也保持工作台结构感",
              ],
              checks: [
                "用户不会误解这里能直接搜全库",
                "桥接入口语义清楚",
                "空态不抢标准搜索主路径",
              ],
              render: renderAiBlank,
            },
            {
              id: "ai-seeded",
              label: "桥接进入",
              title: "智能精选 · 标准结果桥接进入",
              summary: "标准搜索会冻结当前结果快照与来源条件，再把这份快照送入智能精选工作台。",
              goals: [
                "把输入对象从结果范围描述改成结果快照",
                "让用户知道这份快照来自哪里",
                "明确这是新建 session，而不是继续编辑标准搜索",
              ],
              rules: [
                "桥接后先展示输入快照卡，再进入首轮精选",
                "带入的是结果快照与来源条件，不是几条 seed 字段",
                "标准搜索原状态保留不被改写",
              ],
              checks: [
                "用户能理解自己正基于一份结果快照继续精选",
                "桥接文案不再使用并列搜索语义",
                "回标准搜索的路径仍清楚",
              ],
              render: renderAiSeeded,
            },
            {
              id: "ai-running",
              label: "执行中",
              title: "智能精选 · 执行中",
              summary: "执行态要清楚表达：系统正在基于输入快照和当前策略处理这一轮结果。",
              goals: [
                "让执行态对用户足够透明",
                "保留输入快照和当前策略上下文",
                "让用户知道这是一轮处理中，不是在请求另一批新结果",
              ],
              rules: [
                "执行态仍保留输入快照卡和 session 集合",
                "当前策略与当前基底必须可见",
                "结果区使用 skeleton 作为过渡",
              ],
              checks: [
                "用户知道为什么正在等待",
                "当前输入快照与策略没有丢失",
                "继续筛 / 重新筛的后续动作仍可预测",
              ],
              render: renderAiRunning,
            },
            {
              id: "ai-batch-results",
              label: "当前轮次结果",
              title: "智能精选 · 当前轮次结果",
              summary: "当前轮次返回后，用户对结果做采纳或排除，并决定是继续筛还是重新筛。",
              goals: [
                "让采纳 / 排除动作足够轻",
                "把结果消费与下一步策略动作分清",
                "保持 shortlist 工作节奏顺畅",
              ],
              rules: [
                "卡片显式动作只保留采纳 / 排除",
                "条目被处理后立即离开当前列表",
                "结果页主出口改为继续筛 / 重新筛",
                "此页仍是精选工作台，不是收藏操作页",
              ],
              checks: [
                "采纳 / 排除后条目真的离开当前列表",
                "继续筛 / 重新筛的语义清楚",
                "结果消费路径没有旧分批推进心智残留",
              ],
              render: renderAiBatchResults,
            },
            {
              id: "ai-summary-expanded",
              label: "集合回看",
              title: "智能精选 · 集合回看与改判",
              summary: "顶部摘要只保留已采纳 / 已排除，展开后既能回看，也能轻量改判。",
              goals: [
                "让用户知道当前 session 已沉淀了什么",
                "支持从集合里轻量改判",
                "不把历史结果重新塞回主列表",
              ],
              rules: [
                "顶部主摘要只保留已采纳 / 已排除",
                "展开后可看明细，也可改判为回当前列表",
                "改判动作不新建 session",
                "展开明细也不触发业务写入",
              ],
              checks: [
                "计数与明细一致",
                "改判入口足够轻",
                "不会抢走当前轮次结果的主视线",
              ],
              render: renderAiSummaryExpanded,
            },
            {
              id: "ai-next-batch",
              label: "重新筛",
              title: "智能精选 · 重新筛本轮",
              summary: "当用户不认同本轮方向时，应显式回到本轮直接基底，重新生成这一轮，而不是继续收窄当前结果。",
              goals: [
                "把重新筛与继续筛的语义拆开",
                "让用户知道自己在回到哪份列表重来",
                "避免一句话同时承担两种计算语义",
              ],
              rules: [
                "重新筛是次级动作，不抢默认继续筛主路径",
                "进入重新筛模式后，基底自动切到本轮直接基底",
                "需要提供返回继续筛的退出动作",
              ],
              checks: [
                "用户明确知道自己不是在继续收窄当前结果",
                "本轮基底信息清楚可见",
                "模式切换没有歧义",
              ],
              render: renderAiNextBatch,
            },
            {
              id: "ai-query-adjust",
              label: "继续筛",
              title: "智能精选 · 继续筛",
              summary: "继续筛默认基于当前结果列表，把一句新的精选策略继续作用在当前 shortlist 上。",
              goals: [
                "保留自然语言作为策略主入口",
                "让继续筛成为默认主路径",
                "保持同一个 session 的连续精修心智",
              ],
              rules: [
                "默认基底是当前列表",
                "继续筛不新建 session",
                "前台只展示轻量系统理解摘要，不打开完整策略编辑器",
              ],
              checks: [
                "用户知道下一条策略将作用于当前列表",
                "继续筛不像重新开始",
                "已采纳 / 已排除继续留在同一个 session 内",
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
                "用户不会误以为进入了智能精选",
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
  aiSessions: null,
  aiUi: {
    summaryExpanded: false,
    rejudgeItemId: null,
    archiveExpanded: false,
    queryAdjustOpen: false,
    rescreenOpen: false,
    sidebarCollapsed: false,
  },
};

const els = {
  workstreamTabs: document.getElementById("workstream-tabs"),
  sectionTabs: document.getElementById("section-tabs"),
  sceneTabs: document.getElementById("scene-tabs"),
  sectionTitle: document.getElementById("section-title"),
  sceneTitle: document.getElementById("scene-title"),
  sceneMeta: document.getElementById("scene-meta"),
  sceneSummary: document.getElementById("scene-summary"),
  previewRoot: document.getElementById("preview-root"),
  goalList: document.getElementById("goal-list"),
  ruleList: document.getElementById("rule-list"),
  checkList: document.getElementById("check-list"),
  versionTags: document.getElementById("version-tags"),
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

function getSceneMeta(sceneOrId) {
  const sceneId = typeof sceneOrId === "string" ? sceneOrId : sceneOrId.id;
  return SCENE_META[sceneId] || { release: "v6.3.9" };
}

function getReleaseMeta(release) {
  return RELEASE_META[release] || RELEASE_META["v6.3.9"];
}

function sortScenesByRelease(scenes) {
  return scenes
    .map((scene, index) => ({ scene, index }))
    .sort((left, right) => {
      const leftRelease = RELEASE_ORDER.indexOf(getSceneMeta(left.scene).release);
      const rightRelease = RELEASE_ORDER.indexOf(getSceneMeta(right.scene).release);
      if (leftRelease !== rightRelease) {
        return leftRelease - rightRelease;
      }
      return left.index - right.index;
    })
    .map(({ scene }) => scene);
}

function navigateTo({ workstream = state.workstream, section, scene }) {
  rememberScene();

  const nextSection = section || (workstream === state.workstream ? state.section : getFirstSectionKey(workstream));
  let nextScene = scene || getRememberedScene(workstream, nextSection);

  if (workstream === "channel" && nextSection === "ai" && !scene) {
    nextScene = getDefaultAiScene();
  }

  if (workstream === "channel" && nextSection === "ai" && scene) {
    setAiPresetForScene(nextScene);
  }

  state.workstream = workstream;
  state.section = nextSection;
  state.scene = nextScene;
  rememberScene(workstream, nextSection, nextScene);
  render();
}

function handlePreviewNavigation(event) {
  if (handlePreviewAiAction(event)) {
    return;
  }

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

function handlePreviewAiAction(event) {
  const trigger = event.target.closest("[data-ai-action]");
  if (!trigger) {
    return false;
  }

  event.preventDefault();

  const { aiAction, aiPoolSource, aiItemId, aiTarget, aiSessionId } = trigger.dataset;

  switch (aiAction) {
    case "start-ai":
      startAiSession(aiPoolSource);
      return true;
    case "start-bridged-ai":
      createAiSessionFromStandardBridge();
      return true;
    case "create-session":
      createAiSessionDraft();
      return true;
    case "switch-session":
      switchAiSession(aiSessionId);
      return true;
    case "rename-session":
      renameAiSession(aiSessionId);
      return true;
    case "archive-session":
      archiveAiSession(aiSessionId);
      return true;
    case "toggle-archive":
      toggleAiArchivePanel();
      return true;
    case "toggle-sidebar":
      toggleAiSidebar();
      return true;
    case "restore-session":
      restoreAiSession(aiSessionId);
      return true;
    case "mock-complete":
      completeAiBatch();
      return true;
    case "open-summary":
      openAiSummary();
      return true;
    case "accept-item":
      handleAiDecision(aiItemId, "accepted");
      return true;
    case "exclude-item":
      handleAiDecision(aiItemId, "excluded");
      return true;
    case "open-query-adjust":
      openAiQueryAdjust();
      return true;
    case "regenerate-query":
      regenerateAiQuery();
      return true;
    case "open-rescreen":
      openAiRescreen();
      return true;
    case "close-rescreen":
      closeAiRescreen();
      return true;
    case "run-rescreen":
      rerunAiFromBase();
      return true;
    case "open-rejudge":
      openAiRejudge(aiItemId);
      return true;
    case "rejudge":
      applyAiRejudge(aiItemId, aiTarget);
      return true;
    default:
      return false;
  }
}

function renderTabs(target, items, activeValue, onClick) {
  target.innerHTML = items
    .map(
      (item) => `
        <button class="${item.value === activeValue ? "is-active" : ""}" data-value="${item.value}">
          ${item.labelHtml || item.label}
        </button>
      `
    )
    .join("");

  target.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => onClick(button.dataset.value));
  });
}

function renderSceneTabs(target, scenes, activeValue, onClick) {
  renderTabs(
    target,
    sortScenesByRelease(scenes).map((sceneItem) => {
      const sceneMeta = getSceneMeta(sceneItem);
      const releaseMeta = getReleaseMeta(sceneMeta.release);
      return {
        value: sceneItem.id,
        labelHtml: `
          <span class="scene-tab-label">
            <span>${sceneItem.label}</span>
            <span class="scene-version-pill is-${releaseMeta.tone}">${releaseMeta.label}</span>
          </span>
        `,
      };
    }),
    activeValue,
    onClick
  );
}

function renderSceneVersionMeta(scene) {
  const sceneMeta = getSceneMeta(scene);
  const releaseMeta = getReleaseMeta(sceneMeta.release);
  const tags = [
    `<span class="scene-meta-pill is-${releaseMeta.tone}">${releaseMeta.label}</span>`,
    sceneMeta.dependsOn ? `<span class="scene-meta-pill">依赖 ${sceneMeta.dependsOn}</span>` : "",
  ].filter(Boolean);
  return tags.join("");
}

function renderVersionInspector(scene) {
  const sceneMeta = getSceneMeta(scene);
  const releaseMeta = getReleaseMeta(sceneMeta.release);
  const tags = [
    `<span class="decision-tag">版本：${releaseMeta.label}</span>`,
    `<span class="decision-tag">${releaseMeta.title}</span>`,
    sceneMeta.dependsOn ? `<span class="decision-tag">依赖：${sceneMeta.dependsOn}</span>` : "",
  ].filter(Boolean);
  els.versionTags.innerHTML = tags.join("");
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

  renderSceneTabs(els.sceneTabs, section.scenes, state.scene, (value) => navigateTo({ scene: value }));

  els.sectionTitle.textContent = workstream.label;
  els.sceneTitle.textContent = scene.title;
  els.sceneMeta.innerHTML = renderSceneVersionMeta(scene);
  els.sceneSummary.textContent = scene.summary;

  renderPreview(scene);
  renderInspector(scene, scene.decisions || section.decisions);
  renderVersionInspector(scene);
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

function renderChannelPageTabs({
  active,
  standardTarget = { workstream: "channel", section: "standard" },
  aiTarget = { workstream: "channel", section: "ai" },
  showAi = true,
}) {
  const items = [
    renderNavPill({
      label: "标准搜索",
      className: "page-tab",
      isActive: active === "standard",
      target: active === "standard" ? undefined : standardTarget,
    }),
  ];

  if (showAi) {
    items.push(
      renderNavPill({
        label: "智能精选",
        className: "page-tab",
        isActive: active === "ai",
        target: active === "ai" ? undefined : aiTarget,
      })
    );
  }

  return items.join("");
}

function renderAiModeTabs({ standardTarget = { workstream: "channel", section: "standard" } }) {
  return `
    ${renderNavPill({ label: "标准搜索结果", className: "page-tab", target: standardTarget })}
    ${renderNavPill({ label: "智能精选", className: "page-tab", isActive: true })}
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

function renderBucketPill({ label, tone, target, attrs = "" }) {
  const className = `bucket-pill ${tone}`.trim();
  if (attrs) {
    return `<button type="button" class="${className}" ${attrs}>${label}</button>`;
  }
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
        if (action.attrs) {
          return `<button type="button" class="${className}" ${action.attrs}>${action.label}</button>`;
        }
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

const SIMILAR_RESULT_TARGET = { workstream: "similar", section: "core", scene: "similar-running" };

const STANDARD_GAMING_RESULTS = [
  {
    name: "Markiplier",
    handle: "@markiplier",
    tags: ["gaming", "action game", "US"],
    metrics: ["粉丝 3850万", "近 30 天均播 160.12万", "地区 美国"],
    scoreLabel: "合作倾向 5/10",
  },
  {
    name: "FGTeeV",
    handle: "@fgteev",
    tags: ["family", "kids gaming", "US"],
    metrics: ["粉丝 2520万", "近 30 天均播 47.12万", "地区 美国"],
    scoreLabel: "合作倾向 1/10",
  },
];

const STANDARD_TOY_RESULTS = [
  {
    name: "The Fizzy Show",
    handle: "@TheFizzyShow",
    tags: ["toys", "family", "kids"],
    metrics: ["粉丝 543万", "近 30 天均播 56.91万", "地区 美国"],
    scoreLabel: "合作倾向 3/10",
  },
  {
    name: "Caleb Kids Show",
    handle: "@CalebKidsShow",
    tags: ["kids", "toy review", "US"],
    metrics: ["粉丝 209万", "近 30 天均播 85.35万", "地区 美国"],
    scoreLabel: "合作倾向 3/10",
  },
];

const STANDARD_REFINED_RESULTS = [
  {
    name: "Ryan's World Toys",
    handle: "@RyansWorldToys",
    tags: ["toy unboxing", "family", "US"],
    metrics: ["粉丝 182万", "近 90 天互动率 4.8%", "地区 美国"],
    scoreLabel: "合作倾向 4/10",
  },
  {
    name: "Toys and Colors",
    handle: "@toysandcolors",
    tags: ["kids", "toy demo", "US"],
    metrics: ["粉丝 1170万", "近 90 天互动率 3.7%", "地区 美国"],
    scoreLabel: "合作倾向 2/10",
  },
];

function withStandardActions(cards) {
  return cards.map((card) => ({
    ...card,
    actions: [
      { label: "加入名单" },
      { label: "找相似", target: SIMILAR_RESULT_TARGET },
    ],
  }));
}

function renderStandardResultsBoard({ meta, cards }) {
  return `
    <section class="result-board">
      <div class="board-head">
        <h3>标准搜索结果</h3>
        <div class="board-meta">${meta}</div>
      </div>
      <div class="card-stack">
        ${withStandardActions(cards).map((card) => creatorCard(card)).join("")}
      </div>
    </section>
  `;
}

function renderNaturalInputBox({
  value = "",
  placeholder = "",
  helperText = "",
  primaryLabel = "解析并搜索",
  primaryTarget,
  secondaryLabel,
  secondaryTarget,
  compact = false,
  errorText = "",
}) {
  const fieldClass = `search-textarea${compact ? " is-compact" : ""}${!value ? " placeholder" : ""}`;
  return `
    <div class="search-bar">
      <div class="search-label"><span class="accent-dot"></span>自然语言建参</div>
      <div class="${fieldClass}">${value || placeholder}</div>
      ${helperText ? `<p class="nl-inline-hint">${helperText}</p>` : ""}
      ${errorText ? `<p class="nl-inline-hint is-error">${errorText}</p>` : ""}
      <div class="cta-row">
        <button class="cta-btn" type="button" ${navAttrs(primaryTarget)}>${primaryLabel}</button>
        ${secondaryLabel ? `<button class="ghost-btn" type="button" ${navAttrs(secondaryTarget)}>${secondaryLabel}</button>` : ""}
      </div>
    </div>
  `;
}

function renderNaturalConditionsPanel({
  title = "当前生效条件",
  helper,
  conditions,
  meta,
  aiTarget,
  aiAttrs = "",
}) {
  const aiButton =
    aiAttrs || aiTarget
      ? `<button class="ghost-btn" type="button" ${aiAttrs || navAttrs(aiTarget)}>对这份结果做智能精选</button>`
      : "";
  return `
    <div class="nl-panel">
      <div class="nl-panel-head">
        <div>
          <div class="nl-panel-title">${title}</div>
          <p class="nl-panel-copy">${helper}</p>
        </div>
        ${meta ? `<span class="seed-badge">${meta}</span>` : ""}
      </div>
      <div class="pill-row">
        ${conditions.map((condition) => `<span class="read-pill">${condition}</span>`).join("")}
      </div>
      ${aiButton ? `<div class="cta-row">${aiButton}</div>` : ""}
    </div>
  `;
}

function renderNaturalHistoryTimeline({ items, expanded = false }) {
  if (!items.length) {
    return `
      <div class="nl-panel nl-history-panel">
        <div class="nl-panel-head">
          <div>
            <div class="nl-panel-title">自然语言历史</div>
            <p class="nl-panel-copy">还没有成功触发标准搜索的自然语言记录。</p>
          </div>
          <span class="read-pill">折叠时间线</span>
        </div>
      </div>
    `;
  }

  return `
    <div class="nl-panel nl-history-panel">
      <div class="nl-panel-head">
        <div>
          <div class="nl-panel-title">自然语言历史</div>
          <p class="nl-panel-copy">仅记录成功触发过标准搜索的自然语言查询。</p>
        </div>
        <span class="read-pill">${expanded ? "已展开" : `已折叠 · ${items.length} 条`}</span>
      </div>
      ${
        expanded
          ? `
            <div class="nl-history-list">
              ${items
                .map(
                  (item) => `
                    <button type="button" class="nl-history-item" ${navAttrs(item.target)}>
                      <span class="nl-history-query">${item.query}</span>
                      <span class="nl-history-meta">${item.summary}</span>
                    </button>
                  `
                )
                .join("")}
            </div>
          `
          : `
            <button type="button" class="nl-history-item is-collapsed" ${navAttrs(items[items.length - 1].target)}>
              <span class="nl-history-query">${items[items.length - 1].query}</span>
              <span class="nl-history-meta">${items[items.length - 1].summary}</span>
            </button>
          `
      }
    </div>
  `;
}

const AI_ITEM_LIBRARY = {
  "run-experience": {
    name: "The Run Experience",
    handle: "@therunexperience",
    tags: ["running", "gear review", "coach"],
    metrics: ["粉丝 98万", "近 30 天均播 21.6万", "地区 美国"],
    scoreLabel: "更贴近训练型跑步频道",
  },
  "believe-run": {
    name: "Believe in the Run",
    handle: "@believeintherun",
    tags: ["shoe test", "running", "US"],
    metrics: ["粉丝 34万", "近 30 天均播 9.8万", "地区 美国"],
    scoreLabel: "更贴近真实鞋测",
  },
  "daily-runner": {
    name: "Daily Runner Life",
    handle: "@dailyrunnerlife",
    tags: ["running vlog", "gear", "US"],
    metrics: ["粉丝 15万", "近 30 天均播 4.2万", "地区 美国"],
    scoreLabel: "偏 vlog，相关性较弱",
  },
  roadtrailrun: {
    name: "RoadTrailRun",
    handle: "@roadtrailrun",
    tags: ["running shoes", "review", "US"],
    metrics: ["粉丝 18万", "近 30 天均播 6.2万", "地区 美国"],
    scoreLabel: "更贴近鞋类评测",
  },
  "doctors-running": {
    name: "Doctors of Running",
    handle: "@doctorsofrunning",
    tags: ["shoe science", "running", "US"],
    metrics: ["粉丝 12万", "近 30 天均播 3.9万", "地区 美国"],
    scoreLabel: "专业鞋测信号更强",
  },
  "ginger-runner": {
    name: "The Ginger Runner",
    handle: "@thegingerrunner",
    tags: ["trail run", "gear", "US"],
    metrics: ["粉丝 29万", "近 30 天均播 7.4万", "地区 美国"],
    scoreLabel: "偏越野方向",
  },
  "ben-parkes": {
    name: "Ben Parkes",
    handle: "@benparkes",
    tags: ["running", "marathon", "review"],
    metrics: ["粉丝 23万", "近 30 天均播 5.6万", "地区 英国"],
    scoreLabel: "测评和训练兼有",
  },
  "marathon-handbook": {
    name: "Marathon Handbook",
    handle: "@marathonhandbook",
    tags: ["running tips", "shoe review", "global"],
    metrics: ["粉丝 19万", "近 30 天均播 4.7万", "地区 美国"],
    scoreLabel: "更偏资讯但仍相关",
  },
  "ryans-world": {
    name: "Ryan's World Toys",
    handle: "@RyansWorldToys",
    tags: ["toy unboxing", "family", "US"],
    metrics: ["粉丝 182万", "近 90 天互动率 4.8%", "地区 美国"],
    scoreLabel: "真人出镜，合作适配高",
  },
  "toys-colors": {
    name: "Toys and Colors",
    handle: "@toysandcolors",
    tags: ["kids", "toy demo", "US"],
    metrics: ["粉丝 1170万", "近 90 天互动率 3.7%", "地区 美国"],
    scoreLabel: "内容强但偏剧情化",
  },
  "caleb-kids": {
    name: "Caleb Kids Show",
    handle: "@CalebKidsShow",
    tags: ["kids", "toy review", "US"],
    metrics: ["粉丝 209万", "近 90 天互动率 4.2%", "地区 美国"],
    scoreLabel: "更偏亲子开箱",
  },
  toycaboodle: {
    name: "Toy Caboodle",
    handle: "@toycaboodle",
    tags: ["toy review", "family", "US"],
    metrics: ["粉丝 162万", "近 90 天互动率 4.5%", "地区 美国"],
    scoreLabel: "真人讲解更充分",
  },
  "family-playlab": {
    name: "Family Playlab",
    handle: "@familyplaylab",
    tags: ["toy demo", "family", "US"],
    metrics: ["粉丝 68万", "近 90 天互动率 5.1%", "地区 美国"],
    scoreLabel: "更贴近妈妈群体表达",
  },
  "kids-camp": {
    name: "Kids Camp Reviews",
    handle: "@kidscampreviews",
    tags: ["toy testing", "parenting", "US"],
    metrics: ["粉丝 41万", "近 90 天互动率 4.9%", "地区 美国"],
    scoreLabel: "真人测评感更强",
  },
};

const AI_POOL_CONFIG = {
  global: {
    badge: "待带入结果快照",
    poolScope: "当前还没有带入任何结果快照。智能精选需要先从标准搜索结果页桥接一份冻结列表快照进入。",
    chips: ["来源：等待桥接", "输入：结果快照", "状态：未开始"],
    queries: {
      default: "从当前结果里优先保留更适合妈妈群体合作、表达真实、近期持续更新的频道。",
      refined: "继续筛：在当前 shortlist 里更偏向真人出镜、商品表达清楚、合作气质成熟的频道。",
      reframed: "重新筛：回到本轮基底，改为优先看近期内容专业度和真实测评感，不强调妈妈群体表达。",
    },
    defaultBatches: [
      ["run-experience", "believe-run", "daily-runner"],
      ["roadtrailrun", "ginger-runner", "marathon-handbook"],
      ["doctors-running", "ben-parkes", "run-experience"],
    ],
    refinedBatches: [
      ["believe-run", "roadtrailrun", "doctors-running"],
      ["ben-parkes", "marathon-handbook", "ginger-runner"],
      ["run-experience", "roadtrailrun", "believe-run"],
    ],
    reframedBatches: [
      ["roadtrailrun", "doctors-running", "ben-parkes"],
      ["believe-run", "marathon-handbook", "ginger-runner"],
      ["doctors-running", "roadtrailrun", "run-experience"],
    ],
  },
  standard_search_scope: {
    badge: "标准结果快照",
    poolScope: "这是一份由标准搜索冻结下来的结果快照：324 个美国 toy unboxing 候选频道。智能精选会在这份快照上继续 deep research 与精筛。",
    chips: ["来源：标准搜索结果", "快照规模：324 个候选频道", "关键词：toy unboxing", "地区：美国"],
    queries: {
      default: "从这份结果里优先保留更适合妈妈群体合作的真实玩具测评频道，排除纯剧情短剧型账号。",
      refined: "继续筛：在当前结果里更偏向真人出镜、商品表达清楚、品牌合作气质更成熟的频道。",
      reframed: "重新筛：回到本轮基底，改为优先看近期互动稳定、内容更专业、弱化纯亲子娱乐表达的频道。",
    },
    defaultBatches: [
      ["ryans-world", "toys-colors", "caleb-kids"],
      ["toycaboodle", "family-playlab", "kids-camp"],
      ["ryans-world", "toycaboodle", "family-playlab"],
    ],
    refinedBatches: [
      ["toycaboodle", "family-playlab", "ryans-world"],
      ["kids-camp", "caleb-kids", "toys-colors"],
      ["family-playlab", "toycaboodle", "kids-camp"],
    ],
    reframedBatches: [
      ["kids-camp", "toycaboodle", "family-playlab"],
      ["caleb-kids", "ryans-world", "toys-colors"],
      ["family-playlab", "kids-camp", "toycaboodle"],
    ],
  },
};

const AI_STORAGE_KEY = "search-experience-mvp-upgrade-ai-sessions-v3";

function aiActionAttrs(action, data = {}) {
  return [
    `data-ai-action="${action}"`,
    ...Object.entries(data).map(([key, value]) => {
      const attrKey = key.replace(/[A-Z]/g, (char) => `-${char.toLowerCase()}`);
      return `data-ai-${attrKey}="${value}"`;
    }),
  ].join(" ");
}

function cloneAiItem(itemId) {
  return { id: itemId, ...AI_ITEM_LIBRARY[itemId] };
}

function getAiBatchIds(poolSource, queryVariant, batchIndex) {
  const config = AI_POOL_CONFIG[poolSource];
  const batches =
    queryVariant === "reframed"
      ? config.reframedBatches || config.refinedBatches
      : queryVariant === "refined"
        ? config.refinedBatches
        : config.defaultBatches;
  return batches[Math.min(batchIndex, batches.length - 1)] || batches[0] || [];
}

function buildAiVisibleIds({
  poolSource = "global",
  queryVariant = "default",
  batchIndex = 0,
  acceptedIds = [],
  excludedIds = [],
  currentIds,
} = {}) {
  const visibleIds =
    currentIds ||
    getAiBatchIds(poolSource, queryVariant, batchIndex).filter(
      (itemId) => !acceptedIds.includes(itemId) && !excludedIds.includes(itemId)
    );

  return [...visibleIds];
}

function createAiSessionId() {
  return `ai-session-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

function getAiEntrySource(poolSource) {
  return poolSource === "standard_search_scope" ? "from_standard_bridge" : "from_snapshot_waiting";
}

function buildAiSessionTitle({ poolSource, query }) {
  const prefix = poolSource === "standard_search_scope" ? "结果快照精选" : "待桥接精选";
  const detail = (query || AI_POOL_CONFIG[poolSource].poolScope).replace(/[。！]/g, "").slice(0, 18);
  return `${prefix} · ${detail}`;
}

function inferAiSessionStatus(session) {
  if (session.status && session.status !== "archived") {
    return session.status;
  }

  if (session.currentIds?.length || session.acceptedIds?.length || session.excludedIds?.length) {
    return "reviewing_batch";
  }

  return "idle";
}

function buildAiSession({
  id = createAiSessionId(),
  title,
  titleMode = "auto",
  poolSource = "global",
  poolScope = AI_POOL_CONFIG[poolSource].poolScope,
  entrySource = getAiEntrySource(poolSource),
  queryVariant = "default",
  query = AI_POOL_CONFIG[poolSource].queries[queryVariant],
  batchIndex = 0,
  status = "idle",
  acceptedIds = [],
  excludedIds = [],
  currentIds,
  autoReason = "",
  createdAt = Date.now(),
  lastActiveAt = Date.now(),
  archivedAt = null,
  resumeStatus = null,
} = {}) {
  const visibleIds = buildAiVisibleIds({
    poolSource,
    queryVariant,
    batchIndex,
    acceptedIds,
    excludedIds,
    currentIds,
  });

  return {
    id,
    title: title || buildAiSessionTitle({ poolSource, query }),
    titleMode,
    poolSource,
    poolScope,
    entrySource,
    queryVariant,
    query,
    batchIndex,
    status,
    acceptedIds: [...acceptedIds],
    excludedIds: [...excludedIds],
    currentIds: visibleIds,
    autoReason,
    createdAt,
    lastActiveAt,
    archivedAt,
    resumeStatus,
  };
}

function createAiSessionStore(sessions = [], activeSessionId = null, archivedSessionIds = []) {
  return {
    sessions,
    activeSessionId,
    archivedSessionIds,
  };
}

function normalizeAiSession(rawSession = {}, index = 0) {
  const poolSource = rawSession.poolSource in AI_POOL_CONFIG ? rawSession.poolSource : "global";
  const queryVariant =
    rawSession.queryVariant === "reframed"
      ? "reframed"
      : rawSession.queryVariant === "refined"
        ? "refined"
        : "default";
  const acceptedIds = Array.isArray(rawSession.acceptedIds) ? rawSession.acceptedIds.filter((id) => AI_ITEM_LIBRARY[id]) : [];
  const excludedIds = Array.isArray(rawSession.excludedIds) ? rawSession.excludedIds.filter((id) => AI_ITEM_LIBRARY[id]) : [];
  const currentIds = Array.isArray(rawSession.currentIds) ? rawSession.currentIds.filter((id) => AI_ITEM_LIBRARY[id]) : undefined;
  const query = rawSession.query || AI_POOL_CONFIG[poolSource].queries[queryVariant];
  const createdAt = Number(rawSession.createdAt) || Date.now() - index * 1000;
  const lastActiveAt = Number(rawSession.lastActiveAt) || createdAt;

  return buildAiSession({
    id: rawSession.id || createAiSessionId(),
    title: rawSession.title,
    titleMode: rawSession.titleMode === "custom" ? "custom" : "auto",
    poolSource,
    poolScope: rawSession.poolScope || AI_POOL_CONFIG[poolSource].poolScope,
    entrySource: rawSession.entrySource || getAiEntrySource(poolSource),
    queryVariant,
    query,
    batchIndex: Number.isFinite(rawSession.batchIndex) ? rawSession.batchIndex : 0,
    status: rawSession.archivedAt ? "archived" : inferAiSessionStatus(rawSession),
    acceptedIds,
    excludedIds,
    currentIds,
    autoReason: rawSession.autoReason || "",
    createdAt,
    lastActiveAt,
    archivedAt: rawSession.archivedAt || null,
    resumeStatus: rawSession.resumeStatus || null,
  });
}

function persistAiSessionStore() {
  try {
    window.localStorage.setItem(AI_STORAGE_KEY, JSON.stringify(state.aiSessions));
  } catch (error) {
    console.warn("AI session store persist failed", error);
  }
}

function loadAiSessionStore() {
  try {
    const raw = window.localStorage.getItem(AI_STORAGE_KEY);
    if (!raw) {
      return createAiSessionStore();
    }

    const parsed = JSON.parse(raw);
    const sessions = Array.isArray(parsed.sessions) ? parsed.sessions.map(normalizeAiSession) : [];
    const sessionIds = new Set(sessions.map((session) => session.id));
    const archivedSessionIds = Array.isArray(parsed.archivedSessionIds)
      ? parsed.archivedSessionIds.filter((id) => sessionIds.has(id))
      : sessions.filter((session) => session.archivedAt).map((session) => session.id);
    const activeSessionId =
      parsed.activeSessionId && sessionIds.has(parsed.activeSessionId) ? parsed.activeSessionId : null;

    return createAiSessionStore(sessions, activeSessionId, archivedSessionIds);
  } catch (error) {
    console.warn("AI session store load failed", error);
    return createAiSessionStore();
  }
}

function ensureAiSessionStore() {
  if (!state.aiSessions) {
    state.aiSessions = loadAiSessionStore();
  }

  const visibleSessions = state.aiSessions.sessions
    .filter((session) => !state.aiSessions.archivedSessionIds.includes(session.id))
    .sort((left, right) => right.lastActiveAt - left.lastActiveAt);
  if (!state.aiSessions.activeSessionId && visibleSessions.length) {
    state.aiSessions.activeSessionId = visibleSessions[0].id;
  }
}

function getAiSessionStore() {
  ensureAiSessionStore();
  return state.aiSessions;
}

function getAiSessionById(sessionId) {
  return getAiSessionStore().sessions.find((session) => session.id === sessionId) || null;
}

function getVisibleAiSessions() {
  return getAiSessionStore().sessions
    .filter((session) => !getAiSessionStore().archivedSessionIds.includes(session.id))
    .sort((left, right) => right.lastActiveAt - left.lastActiveAt);
}

function getArchivedAiSessions() {
  return getAiSessionStore().sessions
    .filter((session) => getAiSessionStore().archivedSessionIds.includes(session.id))
    .sort((left, right) => (right.archivedAt || right.lastActiveAt) - (left.archivedAt || left.lastActiveAt));
}

function getMostRecentVisibleAiSession() {
  return getVisibleAiSessions()[0] || null;
}

function getActiveAiSession() {
  const store = getAiSessionStore();
  const activeSession =
    store.sessions.find(
      (session) => session.id === store.activeSessionId && !store.archivedSessionIds.includes(session.id)
    ) || null;
  const fallbackSession = activeSession || getMostRecentVisibleAiSession();
  if (fallbackSession && fallbackSession.id !== store.activeSessionId) {
    store.activeSessionId = fallbackSession.id;
  }
  return fallbackSession;
}

function getAiSceneFromSession(session) {
  if (!session) {
    return "ai-blank";
  }

  if (state.aiUi.rescreenOpen) {
    return "ai-next-batch";
  }

  if (state.aiUi.queryAdjustOpen) {
    return "ai-query-adjust";
  }

  if (state.aiUi.summaryExpanded) {
    return "ai-summary-expanded";
  }

  if (session.status === "running" || session.status === "auto_advancing") {
    return "ai-running";
  }

  if (session.status === "idle" && session.poolSource === "standard_search_scope") {
    return "ai-seeded";
  }

  if (session.status === "idle") {
    return "ai-blank";
  }

  return "ai-batch-results";
}

function getDefaultAiScene() {
  return getAiSceneFromSession(getActiveAiSession());
}

function resetAiEphemeralUi() {
  state.aiUi.summaryExpanded = false;
  state.aiUi.rejudgeItemId = null;
  state.aiUi.queryAdjustOpen = false;
  state.aiUi.rescreenOpen = false;
}

function toggleAiSidebar() {
  state.aiUi.sidebarCollapsed = !state.aiUi.sidebarCollapsed;
  render();
}

function syncAiScene({ scene } = {}) {
  state.scene = scene || getDefaultAiScene();
  rememberScene("channel", "ai", state.scene);
}

function renderAiAfterStateChange({ scene, persist = true } = {}) {
  syncAiScene({ scene });
  if (persist) {
    persistAiSessionStore();
  }
  render();
}

function touchAiSession(session, nextStatus = session.status) {
  session.status = nextStatus;
  session.lastActiveAt = Date.now();
  if (session.titleMode !== "custom") {
    session.title = buildAiSessionTitle({ poolSource: session.poolSource, query: session.query });
  }
}

function enterAiWorkspace() {
  state.workstream = "channel";
  state.section = "ai";
}

function createAiSessionDraft() {
  const store = getAiSessionStore();
  const baseSession = getActiveAiSession();
  const poolSource = baseSession?.poolSource || "standard_search_scope";
  const session = buildAiSession({
    poolSource,
    status: "idle",
    queryVariant: "default",
    query: AI_POOL_CONFIG[poolSource].queries.default,
  });
  store.sessions.push(session);
  store.activeSessionId = session.id;
  resetAiEphemeralUi();
  enterAiWorkspace();
  renderAiAfterStateChange();
}

function createAiSessionFromStandardBridge() {
  const store = getAiSessionStore();
  const session = buildAiSession({ poolSource: "standard_search_scope", status: "idle" });
  store.sessions.push(session);
  store.activeSessionId = session.id;
  resetAiEphemeralUi();
  enterAiWorkspace();
  renderAiAfterStateChange({ scene: "ai-seeded" });
}

function setAiPresetForScene(sceneId) {
  const seededSession = buildAiSession({
    id: "preset-seeded",
    title: "结果快照精选 · 妈妈群体玩具测评",
    poolSource: "standard_search_scope",
    status: "idle",
    createdAt: Date.now() - 90000,
    lastActiveAt: Date.now() - 90000,
  });
  const alternateSession = buildAiSession({
    id: "preset-alt",
    title: "结果快照精选 · 更专业产品表达",
    titleMode: "custom",
    poolSource: "standard_search_scope",
    queryVariant: "refined",
    query: AI_POOL_CONFIG.standard_search_scope.queries.refined,
    status: "reviewing_batch",
    acceptedIds: ["family-playlab"],
    excludedIds: ["toys-colors"],
    currentIds: ["kids-camp"],
    batchIndex: 1,
    createdAt: Date.now() - 150000,
    lastActiveAt: Date.now() - 110000,
  });
  const archivedSession = buildAiSession({
    id: "preset-archived",
    title: "结果快照精选 · 旧 session",
    titleMode: "custom",
    poolSource: "standard_search_scope",
    status: "archived",
    acceptedIds: ["toycaboodle"],
    excludedIds: ["caleb-kids"],
    currentIds: ["kids-camp"],
    createdAt: Date.now() - 300000,
    lastActiveAt: Date.now() - 200000,
    archivedAt: Date.now() - 60000,
  });

  const preservedSidebarCollapsed = state.aiUi?.sidebarCollapsed || false;
  state.aiSessions = createAiSessionStore(
    [seededSession, alternateSession, archivedSession],
    seededSession.id,
    [archivedSession.id]
  );
  state.aiUi = {
    summaryExpanded: false,
    rejudgeItemId: null,
    archiveExpanded: false,
    queryAdjustOpen: false,
    rescreenOpen: false,
    sidebarCollapsed: preservedSidebarCollapsed,
  };

  switch (sceneId) {
    case "ai-blank":
      state.aiSessions = createAiSessionStore([], null, []);
      break;
    case "ai-seeded":
      state.aiSessions = createAiSessionStore([seededSession, archivedSession], seededSession.id, [archivedSession.id]);
      break;
    case "ai-running":
      seededSession.status = "running";
      seededSession.autoReason = "";
      state.aiSessions = createAiSessionStore([seededSession, alternateSession, archivedSession], seededSession.id, [archivedSession.id]);
      break;
    case "ai-batch-results":
      seededSession.status = "reviewing_batch";
      seededSession.currentIds = buildAiVisibleIds({ poolSource: "standard_search_scope" });
      state.aiSessions = createAiSessionStore([seededSession, alternateSession, archivedSession], seededSession.id, [archivedSession.id]);
      break;
    case "ai-summary-expanded":
      seededSession.status = "reviewing_batch";
      seededSession.acceptedIds = ["family-playlab"];
      seededSession.excludedIds = ["toys-colors"];
      seededSession.currentIds = ["toycaboodle"];
      state.aiSessions = createAiSessionStore([seededSession, alternateSession, archivedSession], seededSession.id, [archivedSession.id]);
      state.aiUi.summaryExpanded = true;
      break;
    case "ai-next-batch":
      seededSession.status = "reviewing_batch";
      seededSession.acceptedIds = ["family-playlab"];
      seededSession.excludedIds = ["toys-colors"];
      seededSession.currentIds = ["toycaboodle", "kids-camp"];
      state.aiSessions = createAiSessionStore([seededSession, alternateSession, archivedSession], seededSession.id, [archivedSession.id]);
      state.aiUi.rescreenOpen = true;
      break;
    case "ai-query-adjust":
      seededSession.status = "reviewing_batch";
      seededSession.queryVariant = "refined";
      seededSession.query = AI_POOL_CONFIG.standard_search_scope.queries.refined;
      seededSession.acceptedIds = ["family-playlab"];
      seededSession.excludedIds = ["toys-colors"];
      seededSession.currentIds = ["toycaboodle", "kids-camp"];
      state.aiSessions = createAiSessionStore([seededSession, alternateSession, archivedSession], seededSession.id, [archivedSession.id]);
      state.aiUi.queryAdjustOpen = true;
      break;
    default:
      break;
  }
}

function switchAiSession(sessionId) {
  const session = getAiSessionById(sessionId);
  if (!session || getAiSessionStore().archivedSessionIds.includes(sessionId)) {
    return;
  }

  getAiSessionStore().activeSessionId = sessionId;
  session.lastActiveAt = Date.now();
  resetAiEphemeralUi();
  renderAiAfterStateChange();
}

function renameAiSession(sessionId) {
  const session = getAiSessionById(sessionId);
  if (!session) {
    return;
  }

  const nextTitle = window.prompt("重命名 session", session.title);
  if (!nextTitle || !nextTitle.trim()) {
    return;
  }

  session.title = nextTitle.trim();
  session.titleMode = "custom";
  session.lastActiveAt = Date.now();
  persistAiSessionStore();
  render();
}

function archiveAiSession(sessionId) {
  const session = getAiSessionById(sessionId);
  if (!session) {
    return;
  }

  const store = getAiSessionStore();
  if (!store.archivedSessionIds.includes(sessionId)) {
    store.archivedSessionIds.push(sessionId);
  }

  session.resumeStatus = session.status;
  session.status = "archived";
  session.archivedAt = Date.now();
  session.lastActiveAt = Date.now();

  if (store.activeSessionId === sessionId) {
    const fallback = getVisibleAiSessions().find((candidate) => candidate.id !== sessionId) || null;
    store.activeSessionId = fallback ? fallback.id : null;
  }

  resetAiEphemeralUi();
  renderAiAfterStateChange();
}

function restoreAiSession(sessionId) {
  const session = getAiSessionById(sessionId);
  if (!session) {
    return;
  }

  const store = getAiSessionStore();
  store.archivedSessionIds = store.archivedSessionIds.filter((id) => id !== sessionId);
  session.archivedAt = null;
  session.status = session.resumeStatus || inferAiSessionStatus(session);
  session.resumeStatus = null;
  session.lastActiveAt = Date.now();
  store.activeSessionId = sessionId;
  resetAiEphemeralUi();
  renderAiAfterStateChange();
}

function toggleAiArchivePanel() {
  state.aiUi.archiveExpanded = !state.aiUi.archiveExpanded;
  render();
}

function createAiDemoState() {
  ensureAiSessionStore();
  return getAiState();
}

function getAiState() {
  const session = getActiveAiSession();
  const poolSource = session?.poolSource || "global";
  const config = AI_POOL_CONFIG[poolSource];
  const effectiveSession =
    session ||
    buildAiSession({
      id: "ephemeral-ai-empty",
      poolSource,
      status: "idle",
      createdAt: Date.now(),
      lastActiveAt: Date.now(),
    });

  return {
    ...effectiveSession,
    config,
    acceptedItems: effectiveSession.acceptedIds.map(cloneAiItem),
    excludedItems: effectiveSession.excludedIds.map(cloneAiItem),
    currentItems: effectiveSession.currentIds.map(cloneAiItem),
    remainingCount: effectiveSession.currentIds.length,
    batchTitle: `第 ${effectiveSession.batchIndex + 1} 轮结果`,
    isEphemeral: !session,
    sessionCount: getVisibleAiSessions().length,
    archivedCount: getArchivedAiSessions().length,
  };
}

function startAiSession(poolSource) {
  const store = getAiSessionStore();
  const activeSession = getActiveAiSession();

  if (activeSession && activeSession.status === "idle" && activeSession.poolSource === poolSource) {
    touchAiSession(activeSession, "running");
    activeSession.autoReason = "";
  } else {
    const session = buildAiSession({ poolSource, status: "running" });
    store.sessions.push(session);
    store.activeSessionId = session.id;
  }

  resetAiEphemeralUi();
  enterAiWorkspace();
  renderAiAfterStateChange({ scene: "ai-running" });
}

function completeAiBatch() {
  const session = getActiveAiSession();
  if (!session) {
    return;
  }

  touchAiSession(session, "reviewing_batch");
  session.autoReason = "";
  resetAiEphemeralUi();
  renderAiAfterStateChange({ scene: "ai-batch-results" });
}

function openAiSummary() {
  state.aiUi.summaryExpanded = !state.aiUi.summaryExpanded;
  state.aiUi.rejudgeItemId = null;
  state.aiUi.queryAdjustOpen = false;
  state.aiUi.rescreenOpen = false;
  syncAiScene();
  render();
}

function openAiQueryAdjust() {
  state.aiUi.queryAdjustOpen = true;
  state.aiUi.summaryExpanded = false;
  state.aiUi.rescreenOpen = false;
  state.aiUi.rejudgeItemId = null;
  syncAiScene({ scene: "ai-query-adjust" });
  render();
}

function openAiRescreen() {
  state.aiUi.rescreenOpen = true;
  state.aiUi.summaryExpanded = false;
  state.aiUi.queryAdjustOpen = false;
  state.aiUi.rejudgeItemId = null;
  syncAiScene({ scene: "ai-next-batch" });
  render();
}

function closeAiRescreen() {
  state.aiUi.rescreenOpen = false;
  syncAiScene({ scene: "ai-batch-results" });
  render();
}

function regenerateAiQuery() {
  const session = getActiveAiSession();
  if (!session) {
    return;
  }

  session.queryVariant = "refined";
  session.query = AI_POOL_CONFIG[session.poolSource].queries.refined;
  session.batchIndex += 1;
  session.currentIds = buildAiVisibleIds({
    poolSource: session.poolSource,
    queryVariant: session.queryVariant,
    batchIndex: session.batchIndex,
    acceptedIds: session.acceptedIds,
    excludedIds: session.excludedIds,
  });
  session.autoReason = "正在基于当前列表和新的精选策略继续收窄结果。";
  touchAiSession(session, "running");
  resetAiEphemeralUi();
  renderAiAfterStateChange({ scene: "ai-running" });
}

function rerunAiFromBase() {
  const session = getActiveAiSession();
  if (!session) {
    return;
  }

  session.queryVariant = "reframed";
  session.query = AI_POOL_CONFIG[session.poolSource].queries.reframed;
  session.batchIndex += 1;
  session.currentIds = buildAiVisibleIds({
    poolSource: session.poolSource,
    queryVariant: session.queryVariant,
    batchIndex: session.batchIndex,
    acceptedIds: session.acceptedIds,
    excludedIds: session.excludedIds,
  });
  session.autoReason = "正在基于本轮直接基底重新生成这一轮结果。";
  touchAiSession(session, "running");
  resetAiEphemeralUi();
  renderAiAfterStateChange({ scene: "ai-running" });
}

function handleAiDecision(itemId, bucket) {
  const session = getActiveAiSession();
  if (!session) {
    return;
  }

  session.currentIds = session.currentIds.filter((id) => id !== itemId);
  session.acceptedIds = session.acceptedIds.filter((id) => id !== itemId);
  session.excludedIds = session.excludedIds.filter((id) => id !== itemId);

  if (bucket === "accepted") {
    session.acceptedIds.push(itemId);
  } else {
    session.excludedIds.push(itemId);
  }

  state.aiUi.rejudgeItemId = null;
  touchAiSession(session, "reviewing_batch");

  persistAiSessionStore();
  render();
}

function openAiRejudge(itemId) {
  state.aiUi.rejudgeItemId = state.aiUi.rejudgeItemId === itemId ? null : itemId;
  render();
}

function applyAiRejudge(itemId, target) {
  const session = getActiveAiSession();
  if (!session) {
    return;
  }

  session.acceptedIds = session.acceptedIds.filter((id) => id !== itemId);
  session.excludedIds = session.excludedIds.filter((id) => id !== itemId);
  session.currentIds = session.currentIds.filter((id) => id !== itemId);

  if (target === "accepted") {
    session.acceptedIds.push(itemId);
  } else if (target === "excluded") {
    session.excludedIds.push(itemId);
  } else if (!session.currentIds.includes(itemId)) {
    session.currentIds.unshift(itemId);
  }

  touchAiSession(session, "reviewing_batch");
  state.aiUi.rejudgeItemId = null;
  persistAiSessionStore();
  render();
}

function formatAiSessionTime(timestamp) {
  if (!timestamp) {
    return "刚刚更新";
  }

  const diffMinutes = Math.max(0, Math.round((Date.now() - timestamp) / 60000));
  if (diffMinutes < 1) {
    return "刚刚更新";
  }
  if (diffMinutes < 60) {
    return `${diffMinutes} 分钟前更新`;
  }

  const date = new Date(timestamp);
  return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")} 更新`;
}

function getAiSessionStatusCopy(session) {
  if (session.status === "archived") {
    return "已归档";
  }
  if (session.status === "running") {
    return "执行中";
  }
  if (session.status === "idle" && session.poolSource === "standard_search_scope") {
    return "等待首轮精选";
  }
  if (session.status === "idle") {
    return "等待桥接";
  }
  return session.currentIds.length
    ? `第 ${session.batchIndex + 1} 轮 · 剩余 ${session.currentIds.length} 条待处理`
    : `第 ${session.batchIndex + 1} 轮 · 已处理完成`;
}

function renderAiSessionSidebar() {
  const activeSession = getActiveAiSession();
  const visibleSessions = getVisibleAiSessions();
  const archivedSessions = getArchivedAiSessions();
  const isCollapsed = state.aiUi.sidebarCollapsed;
  const activeStatus = activeSession ? getAiSessionStatusCopy(activeSession) : "尚未开始";

  const renderSessionItem = (session, { archived = false } = {}) => `
    <article class="ai-session-item${activeSession?.id === session.id ? " is-active" : ""}${archived ? " is-archived" : ""}" ${
      archived ? "" : aiActionAttrs("switch-session", { sessionId: session.id })
    }>
      <div class="ai-session-item-head">
        <div>
          <strong>${session.title}</strong>
          <div class="pill-row">
            <span class="seed-badge">${AI_POOL_CONFIG[session.poolSource].badge}</span>
          </div>
        </div>
        <div class="ai-session-item-actions">
          ${
            archived
              ? `<button class="ghost-btn compact-btn" type="button" ${aiActionAttrs("restore-session", { sessionId: session.id })}>恢复并打开</button>`
              : `
                <button class="ghost-btn compact-btn" type="button" ${aiActionAttrs("rename-session", { sessionId: session.id })}>改名</button>
                <button class="ghost-btn compact-btn" type="button" ${aiActionAttrs("archive-session", { sessionId: session.id })}>归档</button>
              `
          }
        </div>
      </div>
      <div class="ai-session-status">${getAiSessionStatusCopy(session)}</div>
      <div class="ai-session-meta">${formatAiSessionTime(session.lastActiveAt)} · 已采纳 ${session.acceptedIds.length} · 已排除 ${session.excludedIds.length}</div>
    </article>
  `;

  if (isCollapsed) {
    return `
      <aside class="ai-session-sidebar is-collapsed">
        <button
          class="ai-sidebar-toggle is-floating"
          type="button"
          title="展开 session 列表（${visibleSessions.length} 个进行中，${archivedSessions.length} 个归档）"
          ${aiActionAttrs("toggle-sidebar")}
        >
          展开
        </button>
      </aside>
    `;
  }

  return `
    <aside class="ai-session-sidebar">
      <div class="ai-session-sidebar-head">
        <div>
          <h3>智能精选 session</h3>
          <p>刷新后保留，彼此独立，不共享采纳 / 排除与策略进度。</p>
        </div>
        <div class="ai-session-sidebar-cta">
          <button class="ghost-btn compact-btn" type="button" ${aiActionAttrs("toggle-sidebar")}>收起</button>
          ${activeSession ? `<button class="cta-btn" type="button" ${aiActionAttrs("create-session")}>基于当前快照新建</button>` : ""}
        </div>
      </div>
      <div class="ai-session-section">
        <div class="ai-session-section-head">
          <span>进行中 / 最近使用</span>
          <span class="read-pill">${visibleSessions.length} 个</span>
        </div>
        ${
          visibleSessions.length
            ? `<div class="ai-session-list">${visibleSessions.map((session) => renderSessionItem(session)).join("")}</div>`
            : `<div class="ai-session-empty">还没有未归档 session。请先从标准搜索结果页桥接一份结果快照进入。</div>`
        }
      </div>
      <div class="ai-session-section">
        <button class="ai-archive-toggle" type="button" ${aiActionAttrs("toggle-archive")}>
          <span>已归档</span>
          <span class="read-pill">${archivedSessions.length} 个</span>
        </button>
        ${
          state.aiUi.archiveExpanded && archivedSessions.length
            ? `<div class="ai-session-list is-archived">${archivedSessions.map((session) => renderSessionItem(session, { archived: true })).join("")}</div>`
            : ""
        }
      </div>
    </aside>
  `;
}

function renderAiPoolCard(ai) {
  return `
    <section class="context-strip ai-pool-card">
      <div class="context-copy">
        <h3>当前输入快照</h3>
        <p>${ai.poolScope}</p>
      </div>
      <div class="pill-row">
        <span class="seed-badge">${ai.config.badge}</span>
        ${ai.config.chips.map((chip) => `<span class="read-pill">${chip}</span>`).join("")}
      </div>
    </section>
  `;
}

function renderAiSummaryBoard(ai, { expanded = false } = {}) {
  const acceptedPill = renderBucketPill({
    label: `已采纳 ${ai.acceptedItems.length}`,
    tone: "accepted",
    attrs: aiActionAttrs("open-summary"),
  });
  const excludedPill = renderBucketPill({
    label: `已排除 ${ai.excludedItems.length}`,
    tone: "excluded",
    attrs: aiActionAttrs("open-summary"),
  });

  if (!expanded) {
    return `
      <section class="bucket-board">
        <div class="bucket-row">
          <h3>当前 session 集合</h3>
          <div class="bucket-row">${acceptedPill}${excludedPill}</div>
        </div>
        <p class="bucket-empty">已采纳会作为正向偏好继续影响后续轮次；已排除会在后续轮次中被硬过滤。</p>
      </section>
    `;
  }

  const renderCollection = (title, items, tone) => `
    <article class="bucket-card">
      <h4>${title}</h4>
      ${
        items.length
          ? `<div class="ai-collection-list">
              ${items
                .map(
                  (item) => `
                    <div class="ai-collection-item">
                      <div>
                        <strong>${item.name}</strong>
                        <span>${item.handle}</span>
                      </div>
                      <button type="button" class="action-btn is-${tone}" ${aiActionAttrs("open-rejudge", { itemId: item.id })}>改判</button>
                      ${
                        state.aiUi.rejudgeItemId === item.id
                          ? `<div class="ai-rejudge-menu">
                              <button type="button" class="action-btn is-accepted" ${aiActionAttrs("rejudge", { itemId: item.id, target: "accepted" })}>采纳</button>
                              <button type="button" class="action-btn is-excluded" ${aiActionAttrs("rejudge", { itemId: item.id, target: "excluded" })}>排除</button>
                              <button type="button" class="action-btn" ${aiActionAttrs("rejudge", { itemId: item.id, target: "current" })}>回当前列表</button>
                            </div>`
                          : ""
                      }
                    </div>
                  `
                )
                .join("")}
            </div>`
          : `<p class="bucket-empty">当前还没有${title}。</p>`
      }
    </article>
  `;

  return `
    <section class="bucket-board">
      <div class="bucket-row">
        <h3>当前 session 集合</h3>
        <div class="bucket-row">${acceptedPill}${excludedPill}</div>
      </div>
      <div class="bucket-grid ai-bucket-grid">
        ${renderCollection("已采纳", ai.acceptedItems, "accepted")}
        ${renderCollection("已排除", ai.excludedItems, "excluded")}
      </div>
    </section>
  `;
}

function renderAiCandidateResults(ai, { scene = "results" } = {}) {
  if (scene === "running") {
    return `
      <section class="result-board">
        <div class="board-head">
          <h3>${ai.batchTitle}</h3>
          <div class="board-meta">执行中 · 正在基于输入快照和当前策略处理本轮结果</div>
        </div>
        <div class="card-stack">
          ${skeletonCard()}
          ${skeletonCard()}
          ${skeletonCard()}
        </div>
      </section>
    `;
  }

  const footerMeta = ai.remainingCount
    ? `当前轮次还剩 ${ai.remainingCount} 条待处理`
    : "本轮结果已处理完成，可继续筛或重新筛本轮";

  return `
    <section class="result-board">
      <div class="board-head">
        <h3>${ai.batchTitle}</h3>
        <div class="board-meta">基于当前策略生成的 shortlist 结果</div>
      </div>
      ${
        ai.currentItems.length
          ? `<div class="card-stack">
              ${ai.currentItems
                .map((item) =>
                  creatorCard({
                    ...item,
                    scoreLabel: item.scoreLabel,
                    scoreClass: "similarity-chip",
                    actions: [
                      { label: "采纳", state: "accepted", attrs: aiActionAttrs("accept-item", { itemId: item.id }) },
                      { label: "排除", state: "excluded", attrs: aiActionAttrs("exclude-item", { itemId: item.id }) },
                    ],
                  })
                )
                .join("")}
            </div>`
          : `<div class="empty-state empty-state-compact">
              <div class="empty-illustration"></div>
              <p class="empty-title">本轮结果已处理完成</p>
              <p class="empty-copy">你可以继续筛当前结果，或回到本轮基底重新筛一版。</p>
            </div>`
      }
      <div class="footer-cta footer-cta-between">
        <span class="footer-meta">${footerMeta}</span>
        <div class="cta-row">
          <button class="cta-btn" type="button" ${aiActionAttrs("open-query-adjust")}>继续筛</button>
          <button class="ghost-btn" type="button" ${aiActionAttrs("open-rescreen")}>重新筛本轮</button>
        </div>
      </div>
    </section>
  `;
}

function getAiStandardTarget(ai) {
  return ai.poolSource === "standard_search_scope"
    ? { workstream: "channel", section: "standard", scene: "standard-bridge-ai" }
    : { workstream: "channel", section: "standard", scene: "standard-keyword" };
}

function renderAiQueryBox(ai, {
  helperText,
  statusPill,
  statusCopy,
  primaryAction,
  secondaryAction,
  strategyMeta = "",
}) {
  return `
    <div class="search-bar">
      <div class="search-label"><span class="accent-dot"></span>精选策略指令</div>
      <div class="search-textarea${ai.status === "reviewing_batch" || state.aiUi.queryAdjustOpen || state.aiUi.rescreenOpen ? " is-compact" : ""}">${ai.query}</div>
      ${helperText ? `<p class="nl-inline-hint">${helperText}</p>` : ""}
      ${strategyMeta ? `<div class="pill-row">${strategyMeta}</div>` : ""}
      ${
        statusPill || statusCopy
          ? `<div class="summary-strip">
              <div class="summary-copy">
                ${statusPill ? `<span class="status-pill${ai.status === "running" || ai.status === "auto_advancing" ? " is-running" : ""}">${statusPill}</span>` : ""}
                ${statusCopy ? `<p>${statusCopy}</p>` : ""}
              </div>
            </div>`
          : ""
      }
      ${
        primaryAction || secondaryAction
          ? `<div class="cta-row">
              ${primaryAction || ""}
              ${secondaryAction || ""}
            </div>`
          : ""
      }
    </div>
  `;
}

ensureAiSessionStore();

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
    <div class="ai-workspace-shell${state.aiUi.sidebarCollapsed ? " is-sidebar-collapsed" : ""}">
      ${renderAiSessionSidebar()}
      <div class="ai-workspace-main">
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
      </div>
    </div>
  `;
}

function renderStandardKeyword() {
  const queryBox = `
    <div class="search-bar">
      <div class="search-label"><span class="accent-dot"></span>关键词搜索</div>
      <div class="keyword-token-field">
        <span class="keyword-pill">gaming</span>
        <span class="keyword-field-hint">关键词在经典搜索里继续留在搜索框内，表示“成词”输入。</span>
      </div>
      <div class="pill-row">
        <span class="read-pill">地区：美国</span>
        <span class="read-pill">粉丝量：10万 - 100万</span>
      </div>
      <div class="cta-row">
        <button class="cta-btn">搜索</button>
        <button class="ghost-btn">更多筛选</button>
      </div>
    </div>
  `;

  const resultsHtml = renderStandardResultsBoard({
    meta: "6.05万 条结果 · 默认排序",
    cards: STANDARD_GAMING_RESULTS,
  });

  return renderAppShell({
    activeTop: "search",
    pageTitle: "频道搜索 · 标准搜索",
    pageSummary: "关键词模式保持现状，只在搜索区里增加输入形态切换。",
    pageTabsHtml: renderChannelPageTabs({ active: "standard", showAi: false }),
    bodyHtml: standardSearchLayout({ activeInput: "keyword", queryBox, resultsHtml }),
  });
}

function renderStandardNaturalInput() {
  const queryBox = renderNaturalInputBox({
    placeholder: "例如：帮我找美国做母婴玩具开箱的 YouTube 频道，或直接说“再加上粉丝 50 万以上”。",
    helperText: "当前仍在标准搜索里：如果你说“帮我找…”，会重建条件；如果你说“再加上…”、“改成…”，会基于当前条件继续调整。",
    primaryTarget: { workstream: "channel", section: "standard", scene: "standard-natural-running" },
    secondaryLabel: "示例需求",
    secondaryTarget: { workstream: "channel", section: "standard", scene: "standard-natural-running" },
  });

  const summaryStrip = `
    <div class="summary-strip">
      ${renderNaturalConditionsPanel({
        title: "当前生效条件",
        helper: "你现在是从既有标准搜索现场切到自然语言模式。下一句自然语言会以这套条件为基底，除非你明确说出一条新的完整需求。",
        conditions: ["关键词：gaming", "地区：美国", "粉丝量：10万 - 100万"],
        meta: "关键词现场",
      })}
      ${renderNaturalHistoryTimeline({ items: [] })}
    </div>
  `;

  const resultsHtml = renderStandardResultsBoard({
    meta: "6.05万 条结果 · 当前关键词结果仍保留",
    cards: STANDARD_GAMING_RESULTS,
  });

  return renderAppShell({
    activeTop: "search",
    pageTitle: "频道搜索 · 标准搜索 / 自然语言",
    pageSummary: "切到自然语言后，输入框默认空白，但当前生效条件与当前标准结果现场都继续保留。",
    pageTabsHtml: renderChannelPageTabs({ active: "standard", showAi: false }),
    bodyHtml: standardSearchLayout({ activeInput: "natural", queryBox, summaryStrip, resultsHtml }),
  });
}

function renderStandardNaturalRunning() {
  const summaryStrip = `
    <div class="summary-strip">
      <div class="summary-copy">
        <span class="status-pill is-running">正在解析中</span>
        <p>系统正在结合当前生效条件，把这句自然语言映射成新的标准搜索参数。这个过程是轻量处理，不会跳出标准搜索。</p>
      </div>
      <div class="cta-row">
        <button class="cta-btn" type="button" ${navAttrs({ workstream: "channel", section: "standard", scene: "standard-natural-backfill" })}>Mock 回填完成</button>
        <button class="ghost-btn" type="button" ${navAttrs({ workstream: "channel", section: "standard", scene: "standard-natural-failure" })}>Mock 解析失败</button>
      </div>
    </div>
  `;

  const queryBox = renderNaturalInputBox({
    value: "帮我找美国做母婴玩具开箱、粉丝 10 万到 100 万、近 30 天还在持续更新的 YouTube 频道",
    helperText: "当前输入会被解析为新的标准搜索条件；真正执行搜索的仍是结构化 schema 参数。",
    primaryLabel: "解析中…",
    primaryTarget: { workstream: "channel", section: "standard", scene: "standard-natural-running" },
    compact: false,
  });

  const resultsHtml = `
    <section class="result-board">
      <div class="board-head">
        <h3>标准搜索结果</h3>
        <div class="board-meta">正在准备新的标准结果</div>
      </div>
      <div class="card-stack">
        <div class="skeleton-card">
          <div class="skeleton-row">
            <div class="skeleton-chip"></div>
            <div class="skeleton-chip"></div>
            <div class="skeleton-chip"></div>
          </div>
          <div class="skeleton-line" style="width: 48%"></div>
          <div class="skeleton-line" style="width: 78%"></div>
          <div class="skeleton-block"></div>
        </div>
      </div>
    </section>
  `;

  return renderAppShell({
    activeTop: "search",
    pageTitle: "频道搜索 · 自然语言轻处理中",
    pageSummary: "这里承认系统在解析自然语言，但整个过程仍属于标准搜索，不进入独立 AI 工作流。",
    pageTabsHtml: renderChannelPageTabs({ active: "standard", showAi: false }),
    bodyHtml: standardSearchLayout({ activeInput: "natural", queryBox, summaryStrip, resultsHtml }),
  });
}

function renderStandardNaturalBackfill() {
  const queryBox = renderNaturalInputBox({
    value: "再加上近 90 天互动率更高，不要纯动画儿歌频道。",
    helperText: "结果页里的自然语言输入框始终可用。你现在输入的新一句话，会基于当前生效条件继续重建或增量调整搜索。",
    primaryTarget: { workstream: "channel", section: "standard", scene: "standard-natural-running" },
    compact: true,
  });

  const summaryStrip = `
    <div class="summary-strip">
      ${renderNaturalConditionsPanel({
        title: "当前生效条件",
        helper: "这次自然语言已经成功把搜索条件重建为新的标准搜索现场。后续继续输入自然语言时，将以这套条件为基底。",
        conditions: ["关键词：toy unboxing", "地区：美国", "粉丝量：10万 - 100万", "活跃度：近 30 天更新"],
        meta: "自然语言已生效",
      })}
      ${renderNaturalHistoryTimeline({
        items: [
          {
            query: "帮我找美国做母婴玩具开箱、粉丝 10 万到 100 万、近 30 天还在持续更新的 YouTube 频道",
            summary: "重建当前搜索条件 · 结果 1,248 条",
            target: { workstream: "channel", section: "standard", scene: "standard-natural-input" },
          },
        ],
      })}
    </div>
  `;

  const resultsHtml = renderStandardResultsBoard({
    meta: "1,248 条结果 · 默认排序",
    cards: STANDARD_TOY_RESULTS,
  });

  return renderAppShell({
    activeTop: "search",
    pageTitle: "频道搜索 · 自然语言回填后的标准结果页",
    pageSummary: "成功回填后，页面仍是标准搜索结果页，但顶部已经变成可持续继续自然语言调参的工作台。",
    pageTabsHtml: renderChannelPageTabs({ active: "standard", showAi: false }),
    bodyHtml: standardSearchLayout({ activeInput: "natural", queryBox, summaryStrip, resultsHtml }),
  });
}

function renderStandardBridgeToAi() {
  const queryBox = renderNaturalInputBox({
    value: "给我来点更有感觉、更能打动妈妈群体的，不用太泛。",
    helperText: "你可以继续在这里输入下一句自然语言。若措辞足够明确，系统会继续基于当前生效条件做下一轮调整。",
    primaryTarget: { workstream: "channel", section: "standard", scene: "standard-natural-running" },
    compact: true,
  });

  const summaryStrip = `
    <div class="summary-strip">
      ${renderNaturalConditionsPanel({
        title: "当前生效条件",
        helper: "当前这套条件已经经过两轮自然语言整理。如果标准结果仍不理想，可直接把这份结果快照送入智能精选继续 deep research。",
        conditions: ["关键词：toy unboxing", "地区：美国", "粉丝量：10万 - 100万", "近 90 天互动率：更高", "排除：纯动画儿歌"],
        meta: "可桥接智能精选",
        aiAttrs: aiActionAttrs("start-bridged-ai"),
      })}
      ${renderNaturalHistoryTimeline({
        expanded: true,
        items: [
          {
            query: "帮我找美国做母婴玩具开箱、粉丝 10 万到 100 万、近 30 天还在持续更新的 YouTube 频道",
            summary: "重建当前搜索条件 · 结果 1,248 条",
            target: { workstream: "channel", section: "standard", scene: "standard-natural-input" },
          },
          {
            query: "再加上近 90 天互动率更高，不要纯动画儿歌频道。",
            summary: "继续细调当前条件 · 结果 324 条",
            target: { workstream: "channel", section: "standard", scene: "standard-natural-backfill" },
          },
        ],
      })}
    </div>
  `;

  const resultsHtml = renderStandardResultsBoard({
    meta: "324 条结果 · 默认排序",
    cards: STANDARD_REFINED_RESULTS,
  });

  return renderAppShell({
    activeTop: "search",
    pageTitle: "频道搜索 · 标准搜索到智能精选的桥接",
    pageSummary: "这条路径属于 v6.3.10：标准搜索先产出稳定结果，再把当前结果快照与来源条件桥接到智能精选继续处理。",
    pageTabsHtml: renderChannelPageTabs({ active: "standard", showAi: false }),
    bodyHtml: standardSearchLayout({ activeInput: "natural", queryBox, summaryStrip, resultsHtml }),
  });
}

function renderStandardNaturalFailure() {
  const queryBox = renderNaturalInputBox({
    value: "给我来点更有感觉、更能打动妈妈群体的，不用太泛。",
    helperText: "自然语言输入框会一直保留在结果页顶部，你可以直接改写后再次尝试。",
    errorText: "这句需求还不足以稳定映射成搜索条件。请尽量说清内容方向、地区、粉丝量或你想新增/修改的具体筛选项。",
    primaryLabel: "重新解析",
    primaryTarget: { workstream: "channel", section: "standard", scene: "standard-natural-running" },
    compact: true,
  });

  const summaryStrip = `
    <div class="summary-strip">
      ${renderNaturalConditionsPanel({
        title: "当前生效条件",
        helper: "本次新输入解析失败，所以当前搜索现场没有被改动。你看到的仍然是上一轮成功生效的标准搜索条件。",
        conditions: ["关键词：toy unboxing", "地区：美国", "粉丝量：10万 - 100万", "近 90 天互动率：更高", "排除：纯动画儿歌"],
        meta: "旧结果继续保留",
      })}
      ${renderNaturalHistoryTimeline({
        items: [
          {
            query: "帮我找美国做母婴玩具开箱、粉丝 10 万到 100 万、近 30 天还在持续更新的 YouTube 频道",
            summary: "重建当前搜索条件 · 结果 1,248 条",
            target: { workstream: "channel", section: "standard", scene: "standard-natural-input" },
          },
          {
            query: "再加上近 90 天互动率更高，不要纯动画儿歌频道。",
            summary: "继续细调当前条件 · 结果 324 条",
            target: { workstream: "channel", section: "standard", scene: "standard-natural-backfill" },
          },
        ],
      })}
    </div>
  `;

  const resultsHtml = renderStandardResultsBoard({
    meta: "324 条结果 · 当前仍显示上一轮成功结果",
    cards: STANDARD_REFINED_RESULTS,
  });

  return renderAppShell({
    activeTop: "search",
    pageTitle: "频道搜索 · 自然语言解析失败",
    pageSummary: "失败反馈以内联方式贴在输入框下方，旧结果和当前条件继续保留，避免一次失败就丢掉搜索现场。",
    pageTabsHtml: renderChannelPageTabs({ active: "standard", showAi: false }),
    bodyHtml: standardSearchLayout({ activeInput: "natural", queryBox, summaryStrip, resultsHtml }),
  });
}

function renderAiBlank() {
  const ai = getAiState();
  const contextStrip = renderAiPoolCard(ai);
  const searchBox = renderAiQueryBox(ai, {
    helperText: "智能精选需要先拿到一份结果快照，再围绕这份快照输入精选策略。它不是从全库重新发起搜索。",
    strategyMeta: `<span class="read-pill">等待输入：标准搜索结果快照</span>`,
    secondaryAction: `<button class="ghost-btn" type="button" ${aiActionAttrs("start-bridged-ai")}>模拟从标准搜索结果桥接进入</button>`,
  });
  const bucketBoard = renderAiSummaryBoard(ai);
  const resultsHtml = `
    <section class="result-board">
      <div class="empty-state">
        <div class="empty-illustration"></div>
        <p class="empty-title">等待一份输入快照</p>
        <p class="empty-copy">请先从标准搜索结果页桥接一份冻结列表快照，再在这份结果上继续做智能精选。</p>
      </div>
    </section>
  `;

  return renderAppShell({
    activeTop: "search",
    pageTitle: "频道搜索 · 智能精选",
    pageSummary: "智能精选是标准搜索之后的下一阶段：输入是一份结果快照，输出是一份更可信的 shortlist。",
    pageTabsHtml: renderAiModeTabs({ standardTarget: getAiStandardTarget(ai) }),
    bodyHtml: aiSearchLayout({ contextStrip, searchBox, bucketBoard, resultsHtml, standardTarget: getAiStandardTarget(ai) }),
  });
}

function renderAiSeeded() {
  const ai = getAiState();
  const contextStrip = renderAiPoolCard(ai);
  const searchBox = renderAiQueryBox(ai, {
    helperText: "这里带入的不是几条 seed 字段，而是一份已经冻结下来的标准搜索结果快照。你可以先补一句精选策略，再开始首轮精选。",
    strategyMeta: `<span class="seed-badge">基于：输入快照</span><span class="read-pill">下一条策略将作用于整份输入快照</span>`,
    primaryAction: `<button class="cta-btn" type="button" ${aiActionAttrs("start-ai", { poolSource: ai.poolSource })}>开始首轮精选</button>`,
    secondaryAction: `<button class="ghost-btn" type="button" ${navAttrs(getAiStandardTarget(ai))}>回标准结果页</button>`,
  });
  const bucketBoard = renderAiSummaryBoard(ai);
  const resultsHtml = `
    <section class="result-board">
      <div class="empty-state">
        <div class="empty-illustration"></div>
        <p class="empty-title">已带入标准搜索结果快照</p>
        <p class="empty-copy">当前智能精选会在这 324 个标准搜索候选里继续做 deep research 与精筛，而不是回到全库再搜一遍。</p>
      </div>
    </section>
  `;

  return renderAppShell({
    activeTop: "search",
    pageTitle: "频道搜索 · 智能精选桥接进入",
    pageSummary: "桥接会新建一个独立 session，并把标准搜索当前结果快照与来源条件一起带入智能精选工作台。",
    pageTabsHtml: renderAiModeTabs({ standardTarget: getAiStandardTarget(ai) }),
    bodyHtml: aiSearchLayout({
      contextStrip,
      searchBox,
      bucketBoard,
      resultsHtml,
      standardTarget: getAiStandardTarget(ai),
    }),
  });
}

function renderAiRunning() {
  const ai = getAiState();
  const contextStrip = renderAiPoolCard(ai);
  const searchBox = renderAiQueryBox(ai, {
    helperText: "已采纳会继续作为正向偏好参与后续轮次；已排除会在后续轮次里被硬过滤。",
    strategyMeta: `<span class="seed-badge">${
      ai.queryVariant === "reframed" ? "基于：本轮直接基底" : ai.queryVariant === "refined" ? "基于：当前列表" : "基于：输入快照"
    }</span><span class="read-pill">${ai.queryVariant === "reframed" ? "重新筛模式" : ai.queryVariant === "refined" ? "继续筛模式" : "首轮精选"}</span>`,
    statusPill: "智能精选执行中",
    statusCopy: ai.autoReason || `正在根据输入快照和当前策略生成${ai.batchTitle}。`,
    primaryAction: `<button class="cta-btn" type="button" ${aiActionAttrs("mock-complete")}>Mock 召回完成</button>`,
    secondaryAction: `<span class="list-chip">仅 demo：手动推进到结果返回</span>`,
  });
  const bucketBoard = renderAiSummaryBoard(ai);
  const resultsHtml = renderAiCandidateResults(ai, { scene: "running" });

  return renderAppShell({
    activeTop: "search",
    pageTitle: "频道搜索 · 智能精选执行中",
    pageSummary: "执行态需要清楚表达：系统正在当前 session 里基于输入快照和当前策略处理这一轮结果。",
    pageTabsHtml: renderAiModeTabs({ standardTarget: getAiStandardTarget(ai) }),
    bodyHtml: aiSearchLayout({ contextStrip, searchBox, bucketBoard, resultsHtml, standardTarget: getAiStandardTarget(ai) }),
  });
}

function renderAiBatchResults() {
  const ai = getAiState();
  const contextStrip = renderAiPoolCard(ai);
  const searchBox = renderAiQueryBox(ai, {
    helperText: "当前轮次只做采纳 / 排除。采纳和排除后条目会立即从当前列表消失；后续动作改为继续筛或重新筛。",
    strategyMeta: `<span class="seed-badge">基于：当前列表</span><span class="read-pill">下一条策略默认继续收窄当前结果</span>`,
    statusPill: `${ai.batchTitle} 已返回`,
    statusCopy: "采纳会作为正向偏好信号，排除会在后续轮次中被硬过滤。",
  });
  const bucketBoard = renderAiSummaryBoard(ai);
  const resultsHtml = renderAiCandidateResults(ai);

  return renderAppShell({
    activeTop: "search",
    pageTitle: "频道搜索 · 智能精选当前轮次结果",
    pageSummary: "当前轮次只保留采纳 / 排除两个显式动作；后续动作切换为继续筛或重新筛本轮。",
    pageTabsHtml: renderAiModeTabs({ standardTarget: getAiStandardTarget(ai) }),
    bodyHtml: aiSearchLayout({ contextStrip, searchBox, bucketBoard, resultsHtml, standardTarget: getAiStandardTarget(ai) }),
  });
}

function renderAiSummaryExpanded() {
  const ai = getAiState();
  const contextStrip = renderAiPoolCard(ai);
  const searchBox = renderAiQueryBox(ai, {
    helperText: "集合展开后可以回看已采纳 / 已排除，也可以用轻量改判菜单把结果改成回当前列表未处理。",
    strategyMeta: `<span class="seed-badge">基于：当前列表</span><span class="read-pill">当前仍停留在本轮结果回看态</span>`,
    statusPill: `${ai.batchTitle} 已返回`,
    statusCopy: "顶部摘要现在承担 session 集合查看与回修，结果区仍保留当前工作区。",
  });
  const bucketBoard = renderAiSummaryBoard(ai, { expanded: true });
  const resultsHtml = renderAiCandidateResults(ai);

  return renderAppShell({
    activeTop: "search",
    pageTitle: "频道搜索 · 智能精选集合回看与改判",
    pageSummary: "顶部摘要只保留已采纳 / 已排除；展开后既能回看，也能对当前 session 做轻量改判。",
    pageTabsHtml: renderAiModeTabs({ standardTarget: getAiStandardTarget(ai) }),
    bodyHtml: aiSearchLayout({ contextStrip, searchBox, bucketBoard, resultsHtml, standardTarget: getAiStandardTarget(ai) }),
  });
}

function renderAiNextBatch() {
  const ai = getAiState();
  const contextStrip = renderAiPoolCard(ai);
  const searchBox = renderAiQueryBox(ai, {
    helperText: "重新筛不是继续收窄当前结果，而是回到本轮直接基底，换一种策略重新生成这一轮。",
    strategyMeta: `<span class="seed-badge">基于：本轮直接基底</span><span class="read-pill">重新筛模式</span>`,
    statusPill: "重新筛模式",
    statusCopy: "你现在将放弃当前轮次方向，改为基于本轮直接基底重新生成一版结果。",
    primaryAction: `<button class="cta-btn" type="button" ${aiActionAttrs("run-rescreen")}>重新生成这一轮</button>`,
    secondaryAction: `<button class="ghost-btn" type="button" ${aiActionAttrs("close-rescreen")}>返回继续筛</button>`,
  });
  const bucketBoard = renderAiSummaryBoard(ai);
  const resultsHtml = renderAiCandidateResults(ai);

  return renderAppShell({
    activeTop: "search",
    pageTitle: "频道搜索 · 智能精选重新筛本轮",
    pageSummary: "重新筛是显式次级动作：当你不认同本轮方向时，回到本轮直接基底重新生成一版，而不是继续收窄当前结果。",
    pageTabsHtml: renderAiModeTabs({ standardTarget: getAiStandardTarget(ai) }),
    bodyHtml: aiSearchLayout({ contextStrip, searchBox, bucketBoard, resultsHtml, standardTarget: getAiStandardTarget(ai) }),
  });
}

function renderAiQueryAdjust() {
  const ai = getAiState();
  const contextStrip = renderAiPoolCard(ai);
  const searchBox = renderAiQueryBox(ai, {
    helperText: "继续筛默认基于当前结果列表，只是换一句新的精选策略继续收窄，不会新开 session。",
    strategyMeta: `<span class="seed-badge">基于：当前列表</span><span class="read-pill">下一条策略将继续收窄当前结果</span>`,
    statusPill: "继续筛模式",
    statusCopy: "系统会基于当前列表和新的精选策略生成下一轮结果，已采纳 / 已排除集合继续沿用。",
    primaryAction: `<button class="cta-btn" type="button" ${aiActionAttrs("regenerate-query")}>执行继续筛</button>`,
    secondaryAction: `<button class="ghost-btn" type="button" ${aiActionAttrs("open-summary")}>查看已采纳 / 已排除</button>`,
  });
  const bucketBoard = renderAiSummaryBoard(ai);
  const resultsHtml = renderAiCandidateResults(ai);

  return renderAppShell({
    activeTop: "search",
    pageTitle: "频道搜索 · 智能精选继续筛",
    pageSummary: "继续筛仍在同一个输入快照、同一个 session 内进行；左侧侧栏里的其他 session 不受影响。",
    pageTabsHtml: renderAiModeTabs({ standardTarget: getAiStandardTarget(ai) }),
    bodyHtml: aiSearchLayout({ contextStrip, searchBox, bucketBoard, resultsHtml, standardTarget: getAiStandardTarget(ai) }),
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
    pageSummary: "新默认相似网红结果保持普通列表形态，不走智能精选工作台流程。",
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
