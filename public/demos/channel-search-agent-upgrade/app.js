const scenarios = {
  "keyword-empty": {
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
      tags: [],
      openMenu: false,
    },
  },
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
  "keyword-edit": {
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
  "keyword-anchor-seed": {
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
      draft: "outdoor gear",
      tags: [
        { text: "swim vest", scope: "标签" },
        { text: "@HollylandTech", scope: "频道" },
        { text: "water sports", scope: "标签" },
      ],
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
      text: "正在识别链接类型与目标频道。如果能直接锁定目标，将进入锚点搜索并召回相似频道。",
    },
    session: null,
    question: null,
    conditions: null,
  },
  "url-exact": {
    mode: "classic",
    inputTitle: "",
    inputHint: "",
    miniAction: null,
    primaryAction: null,
    status: {
      state: "锚点搜索已就绪",
      stateClass: "ok",
      spinner: false,
      text: "已锁定参考频道 @HollylandTech。结果列表中锚点频道置顶，其余结果默认按相似程度召回。",
    },
    session: {
      label: "task_summary",
      summary: "当前按 @HollylandTech 作为锚点频道，正在召回相似频道。",
      meta: ["锚点频道置顶", "相似频道召回", "默认按相似程度排序"],
    },
    question: null,
    conditions: {
      anchor: "锚点频道：@HollylandTech",
      hard: [],
      soft: ["相似频道默认按相似程度排序"],
      hint: "锚点频道不混入普通相似结果排序流。",
    },
    keywordFlow: {
      draft: "",
      tags: [{ text: "@HollylandTech", scope: "频道" }],
      openMenu: false,
    },
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
      slot: "repair_options",
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
      slot: "repair_options",
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
      slot: "repair_options",
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
    inputTitle: "",
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
    keywordFlow: {
      draft: "",
      tags: [],
      openMenu: false,
      followup: true,
      placeholder: "继续补充筛选要求",
    },
  },
  "natural-clarifying": {
    mode: "expanded",
    inputTitle: "",
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
      slot: "question",
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
    keywordFlow: {
      draft: "",
      tags: [],
      openMenu: false,
      followup: true,
      placeholder: "也可以直接补一句说明",
    },
  },
  "natural-followup-draft": {
    mode: "expanded",
    inputTitle: "",
    inputHint: "",
    miniAction: null,
    primaryAction: "搜索",
    status: {
      state: "正在记录补充",
      stateClass: "",
      spinner: false,
      text: "系统已保留之前的理解，现在你正在输入一条新的补充要求。",
    },
    session: {
      label: "当前任务",
      summary: "首轮结果已返回，当前准备接收一条新的自然语言补充。",
      meta: ["follow-up input", "不会回到原始 query 编辑"],
    },
    question: null,
    conditions: {
      anchor: null,
      hard: ["美国", "YouTube", "汽配 / 工具测评", "5k-20k 粉丝", "近 30 天活跃"],
      soft: [],
      hint: "原始 query 已被吸收到条件层。",
    },
    keywordFlow: {
      draft: "不要太大的号",
      tags: [],
      openMenu: false,
      followup: true,
      placeholder: "继续补充筛选要求",
    },
  },
  "natural-followup-refining": {
    mode: "expanded",
    inputTitle: "",
    inputHint: "",
    miniAction: null,
    primaryAction: "搜索",
    status: {
      state: "正在应用补充要求",
      stateClass: "",
      spinner: true,
      text: "系统正在把你刚补充的自然语言增量并入当前任务，并刷新结果。",
    },
    session: {
      label: "task_summary",
      summary: "原有任务保持不变，新的 follow-up 正在作为增量条件进入 refine。",
      meta: ["增量 refine", "不会回到首轮 retrieving", "可能回到结果 / 追问 / 修正"],
    },
    question: null,
    conditions: {
      anchor: null,
      hard: ["美国", "YouTube", "汽配 / 工具测评", "5k-20k 粉丝", "近 30 天活跃"],
      soft: ["不要太大的号"],
      hint: "follow-up 会先作为新增条件进入 refine。",
    },
    keywordFlow: {
      draft: "",
      tags: [],
      openMenu: false,
      followup: true,
      placeholder: "正在刷新，请稍候",
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
    inputTitle: "",
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
    keywordFlow: {
      draft: "",
      tags: [{ text: "@HollylandTech", scope: "频道" }],
      openMenu: false,
      followup: true,
      placeholder: "继续补充你真正想要的方向",
    },
  },
  "mixed-clarifying": {
    mode: "expanded",
    inputTitle: "",
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
      slot: "question",
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
    keywordFlow: {
      draft: "",
      tags: [{ text: "@HollylandTech", scope: "频道" }],
      openMenu: false,
      followup: true,
      placeholder: "继续补一句，或者直接回答问题",
    },
  },
  "mixed-followup-draft": {
    mode: "expanded",
    inputTitle: "",
    inputHint: "",
    miniAction: null,
    primaryAction: "搜索",
    status: {
      state: "正在记录补充",
      stateClass: "",
      spinner: false,
      text: "你正在补充新的自然语言要求，系统会把它作为增量而不是改写原始 query。",
    },
    session: {
      label: "task_summary",
      summary: "当前已存在 URL 锚点与结构化条件，正在接收一条新的 follow-up。",
      meta: ["anchor 保留", "follow-up input"],
    },
    question: null,
    conditions: {
      anchor: "URL 锚点：@HollylandTech",
      hard: ["美国", "1w-10w 粉丝", "近 30 天活跃"],
      soft: ["类似调性"],
      hint: "新的补充不会覆盖 URL 锚点。",
    },
    keywordFlow: {
      draft: "更偏教程类，不要开箱",
      tags: [{ text: "@HollylandTech", scope: "频道" }],
      openMenu: false,
      followup: true,
      placeholder: "继续补充你真正想要的方向",
    },
  },
  "mixed-followup-refining": {
    mode: "expanded",
    inputTitle: "",
    inputHint: "",
    miniAction: null,
    primaryAction: "搜索",
    status: {
      state: "正在应用补充要求",
      stateClass: "",
      spinner: true,
      text: "系统正在保留 URL 锚点的前提下，重新解释并应用你刚补充的要求。",
    },
    session: {
      label: "task_summary",
      summary: "URL 锚点保留，新的 follow-up 正在进入 refine。",
      meta: ["anchor 保留", "增量 refine", "不会覆盖原锚点"],
    },
    question: null,
    conditions: {
      anchor: "URL 锚点：@HollylandTech",
      hard: ["美国", "1w-10w 粉丝", "近 30 天活跃"],
      soft: ["类似调性", "更偏教程类", "不要开箱"],
      hint: "新的 follow-up 会先影响偏好解释，再决定是否上升为硬条件。",
    },
    keywordFlow: {
      draft: "",
      tags: [{ text: "@HollylandTech", scope: "频道" }],
      openMenu: false,
      followup: true,
      placeholder: "正在刷新，请稍候",
    },
  },
  "repair-invalid": {
    mode: "expanded",
    inputTitle: "",
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
      slot: "repair_options",
      title: "你想怎么继续修正？",
      choices: ["重新粘贴链接", "直接输入频道名", "改为自然语言搜索"],
      caption: "这里只处理 URL 修正。",
    },
    conditions: null,
    keywordFlow: {
      draft: "",
      tags: [],
      openMenu: false,
      followup: true,
      placeholder: "你也可以直接补一句新的搜索要求",
    },
  },
  "repair-mismatch": {
    mode: "expanded",
    inputTitle: "",
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
      slot: "repair_options",
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
    keywordFlow: {
      draft: "",
      tags: [],
      openMenu: false,
      followup: true,
      placeholder: "或直接输入你想找的 YouTube 频道要求",
    },
  },
  "repair-unsupported": {
    mode: "expanded",
    inputTitle: "",
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
      slot: "repair_options",
      title: "你要换成什么方式继续搜索？",
      choices: ["改为频道链接", "删掉链接输关键词", "直接描述想找什么"],
      caption: "这里只处理输入类型修正。",
    },
    conditions: null,
    keywordFlow: {
      draft: "",
      tags: [],
      openMenu: false,
      followup: true,
      placeholder: "直接描述你想找什么也可以",
    },
  },
  "repair-empty": {
    mode: "expanded",
    inputTitle: "",
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
      slot: "repair_options",
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
    keywordFlow: {
      draft: "",
      tags: [],
      openMenu: false,
      followup: true,
      placeholder: "补一句放宽条件的要求",
    },
  },
  "repair-followup-draft": {
    mode: "expanded",
    inputTitle: "",
    inputHint: "",
    miniAction: null,
    primaryAction: "搜索",
    status: {
      state: "正在记录修正要求",
      stateClass: "",
      spinner: false,
      text: "当前卡点已被识别，你正在补一句修正要求，系统会据此重新组织搜索。",
    },
    session: {
      label: "task_summary",
      summary: "系统正在从修正态接收一个新的 follow-up 输入。",
      meta: ["repair input", "不会恢复原始 query 全文"],
    },
    question: {
      slot: "repair_options",
      title: "你也可以直接描述想怎么修正。",
      choices: ["删掉链接继续搜", "直接说想找什么", "改为关键词搜索"],
      caption: "修正态支持点选，也支持主动补一句。",
    },
    conditions: null,
    keywordFlow: {
      draft: "那就直接帮我找美国 YouTube 户外博主",
      tags: [],
      openMenu: false,
      followup: true,
      placeholder: "直接补一句你想怎么修正",
    },
  },
  "repair-followup-refining": {
    mode: "expanded",
    inputTitle: "",
    inputHint: "",
    miniAction: null,
    primaryAction: "搜索",
    status: {
      state: "正在应用修正要求",
      stateClass: "",
      spinner: true,
      text: "系统正在把你补充的修正要求转成新的可执行搜索条件。",
    },
    session: {
      label: "task_summary",
      summary: "修正态输入已提交，当前正在尝试恢复结果。",
      meta: ["repair refine", "可能恢复结果", "也可能继续停留在修正态"],
    },
    question: null,
    conditions: null,
    keywordFlow: {
      draft: "",
      tags: [],
      openMenu: false,
      followup: true,
      placeholder: "正在刷新，请稍候",
    },
  },
  "repair-recovered-results": {
    mode: "expanded",
    inputTitle: "",
    inputHint: "",
    miniAction: null,
    primaryAction: "搜索",
    status: {
      state: "已恢复结果",
      stateClass: "ok",
      spinner: false,
      text: "修正后的条件已经重新召回到结果，当前已回到稳定可浏览状态。",
    },
    session: {
      label: "task_summary",
      summary: "原修正问题已被化解，当前结果来自修正后的新条件。",
      meta: ["从 repair 恢复", "当前结果已稳定", "可继续 refine"],
    },
    question: null,
    conditions: {
      anchor: null,
      hard: ["美国", "YouTube", "户外博主"],
      soft: [],
      hint: "这是修正后的新结果，不再是原始失败条件的直出。",
    },
    keywordFlow: {
      draft: "",
      tags: [],
      openMenu: false,
      followup: true,
      placeholder: "继续补一句，进一步 refine",
    },
  },
  "upgrade-keyword-trigger": {
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
      draft: "帮我找美国妈妈博主",
      tags: [{ text: "swim vest", scope: "标签" }],
      openMenu: false,
    },
  },
  "upgrade-keyword-transition": {
    mode: "expanded",
    inputTitle: "",
    inputHint: "",
    miniAction: null,
    primaryAction: "搜索",
    status: {
      state: "正在升级为 Agent 态",
      stateClass: "",
      spinner: true,
      text: "已保留原有关键词 tag，系统正在把新增自然语言转成任务解释与条件。",
    },
    session: {
      label: "task_summary",
      summary: "经典搜索已升级：关键词保持不变，新增自然语言将作为任务增量处理。",
      meta: ["保留关键词 tag", "解析新增自然语言", "进入 expanded_agent"],
    },
    question: null,
    conditions: {
      anchor: null,
      hard: ["swim vest（标签）"],
      soft: ["美国妈妈博主"],
      hint: "升级中，新增自然语言暂作为待解析意图。",
    },
  },
  "upgrade-keyword-stable": {
    mode: "expanded",
    inputTitle: "",
    inputHint: "",
    miniAction: null,
    primaryAction: "搜索",
    status: {
      state: "已升级完成",
      stateClass: "ok",
      spinner: false,
      text: "关键词 tag 已保留为显式条件，新增自然语言已转成任务摘要与结构化条件。",
    },
    session: {
      label: "task_summary",
      summary: "正在搜索：swim vest 相关频道 · 美国 · 妈妈博主",
      meta: ["关键词保留", "自然语言已吸收", "可继续 refine"],
    },
    question: null,
    conditions: {
      anchor: null,
      hard: ["swim vest（标签）", "美国"],
      soft: ["妈妈博主"],
      hint: "经典关键词已变成 Agent 态中的前置显式条件。",
    },
  },
  "upgrade-url-trigger": {
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
      draft: "找和它类似的美国频道",
      tags: [{ text: "@HollylandTech", scope: "频道" }],
      openMenu: false,
    },
  },
  "upgrade-url-transition": {
    mode: "expanded",
    inputTitle: "",
    inputHint: "",
    miniAction: null,
    primaryAction: "搜索",
    status: {
      state: "正在解释 URL 与自然语言的关系",
      stateClass: "",
      spinner: true,
      text: "系统正在判断 URL 是否继续作为精确锚点，以及新增自然语言应被当作 refine 还是新的搜索任务。",
    },
    session: {
      label: "task_summary",
      summary: "已识别 URL 锚点：@HollylandTech，正在解释“找和它类似的美国频道”这句新要求。",
      meta: ["URL 锚点优先", "解释新增自然语言", "避免静默改写意图"],
    },
    question: null,
    conditions: {
      anchor: "URL 锚点：@HollylandTech",
      hard: [],
      soft: ["找类似频道", "美国"],
      hint: "升级中，系统还未决定是继续看该频道还是转为找类似频道。",
    },
  },
  "upgrade-url-stable": {
    mode: "expanded",
    inputTitle: "",
    inputHint: "",
    miniAction: null,
    primaryAction: "搜索",
    status: {
      state: "锚点升级完成",
      stateClass: "ok",
      spinner: false,
      text: "URL 作为 anchor 被保留，新增自然语言已被解释为 refine 要求，而不是静默覆盖原有精确语义。",
    },
    session: {
      label: "task_summary",
      summary: "当前按 @HollylandTech 作为锚点，并开始搜索“类似调性 + 美国”的频道。",
      meta: ["URL 保留为 anchor", "新增要求已解释", "必要时可继续追问"],
    },
    question: {
      slot: "question",
      title: "你是想继续看这个频道，还是想以它为参考找新的频道？",
      choices: ["继续看这个频道", "找新的类似频道"],
      caption: "URL 起手升级时，必须先处理锚点语义。",
    },
    conditions: {
      anchor: "URL 锚点：@HollylandTech",
      hard: ["美国"],
      soft: ["类似调性"],
      hint: "URL 精确语义优先于软偏好。",
    },
  },
};

let currentScenario = "keyword-empty";
let currentScene = "keyword";
let currentVariant = "glass";

const sceneMap = {
  keyword: [
    { id: "keyword-empty", label: "初始空白态" },
    { id: "keyword-input", label: "输入态" },
    { id: "keyword-tag", label: "完成态" },
    { id: "keyword-edit", label: "编辑已有关键词" },
    { id: "keyword-multi", label: "多关键词" },
    { id: "keyword-anchor-seed", label: "关键词+URL种子" },
    { id: "keyword-menu", label: "匹配目标" },
  ],
  url: [
    { id: "url-resolving", label: "识别中" },
    { id: "url-exact", label: "锚点搜索就绪" },
    { id: "url-mismatch", label: "平台不匹配" },
    { id: "url-unsupported", label: "类型不支持" },
    { id: "url-invalid", label: "无法识别" },
  ],
  natural: [
    { id: "natural-init", label: "刚展开" },
    { id: "natural-retrieving", label: "首轮搜索中" },
    { id: "natural-results", label: "首轮结果已返回" },
    { id: "natural-clarifying", label: "追问态" },
    { id: "natural-followup-draft", label: "主动补充输入中" },
    { id: "natural-followup-refining", label: "补充后刷新中" },
  ],
  mixed: [
    { id: "mixed-parse", label: "解析摘要态" },
    { id: "mixed-anchor", label: "锚点优先态" },
    { id: "mixed-soft", label: "软条件待澄清态" },
    { id: "mixed-clarifying", label: "追问态" },
    { id: "mixed-followup-draft", label: "主动补充输入中" },
    { id: "mixed-followup-refining", label: "补充后刷新中" },
  ],
  repair: [
    { id: "repair-invalid", label: "URL 无法识别" },
    { id: "repair-mismatch", label: "平台不匹配" },
    { id: "repair-unsupported", label: "类型不支持" },
    { id: "repair-empty", label: "有条件无结果" },
    { id: "repair-followup-draft", label: "主动补充输入中" },
    { id: "repair-followup-refining", label: "修正后刷新中" },
    { id: "repair-recovered-results", label: "修正后已恢复结果" },
  ],
  upgrade: [
    { id: "upgrade-keyword-trigger", label: "关键词起手-触发前" },
    { id: "upgrade-keyword-transition", label: "关键词起手-升级中" },
    { id: "upgrade-keyword-stable", label: "关键词起手-升级稳定" },
    { id: "upgrade-url-trigger", label: "URL 起手-触发前" },
    { id: "upgrade-url-transition", label: "URL 起手-升级中" },
    { id: "upgrade-url-stable", label: "URL 起手-升级稳定" },
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
  "keyword-empty": ["empty_input", "compact_classic", "idle"],
  "keyword-input": ["draft_keyword", "compact_classic", "idle"],
  "keyword-tag": ["committed_keyword", "compact_classic", "idle"],
  "keyword-edit": ["draft_keyword", "committed_keyword", "compact_classic", "idle"],
  "keyword-multi": ["committed_keyword", "compact_classic", "idle"],
  "keyword-anchor-seed": ["draft_keyword", "committed_keyword", "committed_anchor", "compact_classic", "idle"],
  "keyword-menu": ["tag_scope_menu_open", "excluded_keyword", "compact_classic", "idle"],
  "url-resolving": ["compact_resolving"],
  "url-exact": ["committed_anchor", "return-state"],
  "url-mismatch": ["expanded_repair"],
  "url-unsupported": ["expanded_repair"],
  "url-invalid": ["expanded_repair"],
  "natural-init": ["expanded_agent"],
  "natural-retrieving": ["expanded_agent", "retrieving"],
  "natural-results": ["results_ready", "followup_waiting"],
  "natural-clarifying": ["expanded_clarifying", "clarifying", "followup_waiting"],
  "natural-followup-draft": ["expanded_agent", "results_ready", "draft_followup"],
  "natural-followup-refining": ["expanded_agent", "refining", "followup_waiting"],
  "mixed-parse": ["expanded_agent"],
  "mixed-anchor": ["expanded_agent", "committed_anchor", "followup_waiting"],
  "mixed-soft": ["expanded_agent", "committed_anchor", "followup_waiting"],
  "mixed-clarifying": ["expanded_agent", "committed_anchor", "clarifying", "followup_waiting"],
  "mixed-followup-draft": ["expanded_agent", "committed_anchor", "results_ready", "draft_followup"],
  "mixed-followup-refining": ["expanded_agent", "committed_anchor", "refining", "followup_waiting"],
  "repair-invalid": ["expanded_repair", "followup_waiting"],
  "repair-mismatch": ["expanded_repair", "followup_waiting"],
  "repair-unsupported": ["expanded_repair", "followup_waiting"],
  "repair-empty": ["empty_repair", "followup_waiting"],
  "repair-followup-draft": ["expanded_repair", "empty_repair", "draft_followup"],
  "repair-followup-refining": ["expanded_repair", "refining", "followup_waiting"],
  "repair-recovered-results": ["expanded_agent", "results_ready", "followup_waiting"],
  "upgrade-keyword-trigger": ["draft_keyword", "compact_classic", "idle"],
  "upgrade-keyword-transition": ["expanded_agent", "retrieving", "committed_keyword"],
  "upgrade-keyword-stable": ["expanded_agent", "results_ready", "committed_keyword", "followup_waiting"],
  "upgrade-url-trigger": ["compact_classic", "committed_anchor"],
  "upgrade-url-transition": ["expanded_agent", "retrieving", "committed_anchor"],
  "upgrade-url-stable": ["expanded_agent", "clarifying", "committed_anchor", "followup_waiting"],
};

const stateTriples = {
  "keyword-empty": { input: "empty_input", container: "compact_classic", session: "idle" },
  "keyword-input": { input: "draft_keyword", container: "compact_classic", session: "idle" },
  "keyword-tag": { input: "committed_keyword", container: "compact_classic", session: "idle" },
  "keyword-edit": { input: "editing_keyword", container: "compact_classic", session: "idle" },
  "keyword-multi": { input: "draft_keyword + committed_keyword", container: "compact_classic", session: "idle" },
  "keyword-anchor-seed": { input: "committed_keyword + committed_anchor + committed_keyword + draft_keyword", container: "compact_classic", session: "idle" },
  "keyword-menu": { input: "tag_scope_menu_open", container: "compact_classic", session: "idle" },
  "url-resolving": { input: "draft_keyword", container: "compact_resolving", session: "retrieving" },
  "url-exact": { input: "committed_anchor", container: "compact_classic", session: "results_ready" },
  "url-mismatch": { input: "followup_waiting", container: "expanded_repair", session: "empty_repair" },
  "url-unsupported": { input: "followup_waiting", container: "expanded_repair", session: "unsupported" },
  "url-invalid": { input: "followup_waiting", container: "expanded_repair", session: "empty_repair" },
  "natural-init": { input: "draft_keyword", container: "expanded_agent", session: "idle" },
  "natural-retrieving": { input: "draft_keyword", container: "expanded_agent", session: "retrieving" },
  "natural-results": { input: "followup_waiting", container: "expanded_agent", session: "results_ready" },
  "natural-clarifying": { input: "followup_waiting", container: "expanded_clarifying", session: "clarifying" },
  "natural-followup-draft": { input: "draft_followup", container: "expanded_agent", session: "results_ready" },
  "natural-followup-refining": { input: "followup_waiting", container: "expanded_agent", session: "refining" },
  "mixed-parse": { input: "draft_keyword + committed_anchor", container: "expanded_agent", session: "retrieving" },
  "mixed-anchor": { input: "committed_anchor + followup_waiting", container: "expanded_agent", session: "results_ready" },
  "mixed-soft": { input: "committed_anchor + followup_waiting", container: "expanded_agent", session: "results_ready" },
  "mixed-clarifying": { input: "committed_anchor + followup_waiting", container: "expanded_clarifying", session: "clarifying" },
  "mixed-followup-draft": { input: "committed_anchor + draft_followup", container: "expanded_agent", session: "results_ready" },
  "mixed-followup-refining": { input: "committed_anchor + followup_waiting", container: "expanded_agent", session: "refining" },
  "repair-invalid": { input: "followup_waiting", container: "expanded_repair", session: "empty_repair" },
  "repair-mismatch": { input: "followup_waiting", container: "expanded_repair", session: "empty_repair" },
  "repair-unsupported": { input: "followup_waiting", container: "expanded_repair", session: "unsupported" },
  "repair-empty": { input: "followup_waiting", container: "expanded_repair", session: "empty_repair" },
  "repair-followup-draft": { input: "draft_followup", container: "expanded_repair", session: "empty_repair" },
  "repair-followup-refining": { input: "followup_waiting", container: "expanded_repair", session: "refining" },
  "repair-recovered-results": { input: "followup_waiting", container: "expanded_agent", session: "results_ready" },
  "upgrade-keyword-trigger": { input: "draft_keyword + committed_keyword", container: "compact_classic", session: "idle" },
  "upgrade-keyword-transition": { input: "draft_keyword + committed_keyword", container: "expanded_agent", session: "retrieving" },
  "upgrade-keyword-stable": { input: "committed_keyword + followup_waiting", container: "expanded_agent", session: "results_ready" },
  "upgrade-url-trigger": { input: "committed_anchor + draft_keyword", container: "compact_classic", session: "results_ready" },
  "upgrade-url-transition": { input: "committed_anchor + draft_keyword", container: "expanded_agent", session: "retrieving" },
  "upgrade-url-stable": { input: "committed_anchor + followup_waiting", container: "expanded_clarifying", session: "clarifying" },
};

const stateActions = {
  "keyword-empty": [
    { label: "开始输入关键词", target: "keyword-input" },
    { label: "直接粘贴 URL", target: "url-resolving" },
    { label: "直接描述需求，进入自然语言场景", target: "natural-init" },
  ],
  "keyword-input": [
    { label: "按回车固化为关键词 tag", target: "keyword-tag" },
    { label: "清空输入，回到初始空白态", target: "keyword-empty" },
    { label: "继续补自然语言，升级为 Agent 态", target: "upgrade-keyword-trigger" },
  ],
  "keyword-tag": [
    { label: "编辑当前关键词", target: "keyword-edit" },
    { label: "删除最后一个关键词", target: "keyword-empty" },
    { label: "继续输入第二个关键词", target: "keyword-multi" },
    { label: "打开匹配目标菜单", target: "keyword-menu" },
    { label: "追加自然语言并升级", target: "upgrade-keyword-trigger" },
  ],
  "keyword-edit": [
    { label: "提交编辑结果", target: "keyword-tag" },
    { label: "取消编辑，恢复原关键词", target: "keyword-tag" },
    { label: "清空并删除该关键词", target: "keyword-empty" },
  ],
  "keyword-multi": [
    { label: "清空当前输入，回到单关键词态", target: "keyword-tag" },
    { label: "固化当前第二个关键词", target: "keyword-menu" },
    { label: "插入一个 URL 锚点并继续输入", target: "keyword-anchor-seed" },
    { label: "补充自然语言并升级", target: "upgrade-keyword-trigger" },
  ],
  "keyword-anchor-seed": [
    { label: "继续输入下一个关键词", target: "keyword-anchor-seed" },
    { label: "删除 URL 锚点，回到多关键词态", target: "keyword-multi" },
    { label: "补充自然语言并升级", target: "upgrade-url-trigger" },
  ],
  "keyword-menu": [
    { label: "关闭菜单", target: "keyword-tag" },
    { label: "切换匹配目标", target: "keyword-tag" },
    { label: "转为排除关键词", target: "keyword-menu" },
    { label: "升级为 Agent 态", target: "upgrade-keyword-trigger" },
  ],
  "url-resolving": [
    { label: "识别成功", target: "url-exact" },
    { label: "平台不匹配", target: "url-mismatch" },
    { label: "类型不支持", target: "url-unsupported" },
    { label: "无法识别", target: "url-invalid" },
  ],
  "url-exact": [
    { label: "继续浏览相似频道结果", target: "url-exact" },
    { label: "只查看锚点频道", target: "url-exact" },
    { label: "删除频道锚点，回到初始空白态", target: "keyword-empty" },
    { label: "补充自然语言，升级为 Agent 态", target: "upgrade-url-trigger" },
  ],
  "url-mismatch": [
    { label: "删除链接，回到关键词态", target: "keyword-input" },
    { label: "重新贴可用 URL", target: "url-resolving" },
  ],
  "url-unsupported": [
    { label: "改为关键词", target: "keyword-input" },
    { label: "改为自然语言", target: "natural-init" },
  ],
  "url-invalid": [
    { label: "重新粘贴链接", target: "url-resolving" },
    { label: "改为频道名", target: "keyword-input" },
  ],
  "natural-init": [
    { label: "开始首轮搜索", target: "natural-retrieving" },
  ],
  "natural-retrieving": [
    { label: "首轮结果返回", target: "natural-results" },
    { label: "仍无结果，进入修正态", target: "repair-empty" },
  ],
  "natural-results": [
    { label: "提出一个高价值追问", target: "natural-clarifying" },
    { label: "继续稳定浏览", target: "natural-results" },
    { label: "用自然语言主动补充", target: "natural-followup-draft" },
  ],
  "natural-clarifying": [
    { label: "回答追问并刷新", target: "natural-results" },
    { label: "回答后仍无结果", target: "repair-empty" },
    { label: "跳过点选，直接补一句", target: "natural-followup-draft" },
  ],
  "natural-followup-draft": [
    { label: "提交补充并刷新", target: "natural-followup-refining" },
    { label: "放弃补充，回到稳定结果", target: "natural-results" },
  ],
  "natural-followup-refining": [
    { label: "刷新后结果稳定", target: "natural-results" },
    { label: "刷新后需要一个追问", target: "natural-clarifying" },
    { label: "刷新后仍无结果", target: "repair-empty" },
  ],
  "mixed-parse": [
    { label: "按锚点优先解释", target: "mixed-anchor" },
    { label: "先降级软条件", target: "mixed-soft" },
  ],
  "mixed-anchor": [
    { label: "继续按锚点优先返回结果", target: "mixed-anchor" },
    { label: "补一个澄清问题", target: "mixed-clarifying" },
  ],
  "mixed-soft": [
    { label: "保留软条件为参考偏好", target: "mixed-soft" },
    { label: "要求进一步澄清", target: "mixed-clarifying" },
    { label: "用自然语言主动补充", target: "mixed-followup-draft" },
  ],
  "mixed-clarifying": [
    { label: "回答追问并继续 refine", target: "mixed-anchor" },
    { label: "回答后进入修正态", target: "repair-empty" },
    { label: "跳过点选，直接补一句", target: "mixed-followup-draft" },
  ],
  "mixed-followup-draft": [
    { label: "提交补充并刷新", target: "mixed-followup-refining" },
    { label: "放弃补充，回到软条件待澄清态", target: "mixed-soft" },
  ],
  "mixed-followup-refining": [
    { label: "刷新后回到锚点优先结果", target: "mixed-anchor" },
    { label: "刷新后仍需澄清", target: "mixed-clarifying" },
    { label: "刷新后仍无结果", target: "repair-empty" },
  ],
  "repair-invalid": [
    { label: "重新粘贴链接", target: "url-resolving" },
    { label: "改为关键词搜索", target: "keyword-input" },
    { label: "直接描述修正要求", target: "repair-followup-draft" },
  ],
  "repair-mismatch": [
    { label: "删掉链接继续搜当前平台", target: "keyword-input" },
    { label: "换平台后重新开始", target: "url-resolving" },
    { label: "直接补一句修正要求", target: "repair-followup-draft" },
  ],
  "repair-unsupported": [
    { label: "改为关键词", target: "keyword-input" },
    { label: "改为自然语言", target: "natural-init" },
    { label: "直接补一句修正要求", target: "repair-followup-draft" },
  ],
  "repair-empty": [
    { label: "放宽条件后重搜", target: "natural-retrieving" },
    { label: "退回经典关键词态", target: "keyword-tag" },
    { label: "直接补一句放宽要求", target: "repair-followup-draft" },
  ],
  "repair-followup-draft": [
    { label: "提交修正要求并刷新", target: "repair-followup-refining" },
    { label: "改为关键词搜索", target: "keyword-input" },
    { label: "改为自然语言搜索", target: "natural-init" },
  ],
  "repair-followup-refining": [
    { label: "修正成功并恢复结果", target: "repair-recovered-results" },
    { label: "修正后仍无结果", target: "repair-empty" },
    { label: "修正后仍不支持", target: "repair-unsupported" },
  ],
  "repair-recovered-results": [
    { label: "继续浏览恢复后的结果", target: "repair-recovered-results" },
    { label: "继续补一句 refine", target: "repair-followup-draft" },
    { label: "回到一般稳定结果态", target: "natural-results" },
  ],
  "upgrade-keyword-trigger": [
    { label: "系统开始解释新增自然语言", target: "upgrade-keyword-transition" },
  ],
  "upgrade-keyword-transition": [
    { label: "升级完成，进入稳定 Agent 态", target: "upgrade-keyword-stable" },
  ],
  "upgrade-keyword-stable": [
    { label: "继续 refine", target: "natural-clarifying" },
    { label: "保持当前稳定结果", target: "natural-results" },
  ],
  "upgrade-url-trigger": [
    { label: "开始解释 URL 与自然语言关系", target: "upgrade-url-transition" },
  ],
  "upgrade-url-transition": [
    { label: "升级完成，等待锚点确认", target: "upgrade-url-stable" },
  ],
  "upgrade-url-stable": [
    { label: "继续看这个频道", target: "url-exact" },
    { label: "转为找类似频道", target: "mixed-clarifying" },
  ],
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
            <span class="slot-chip">actions</span>
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
  if (flow.followup) {
    const tags = (flow.tags || [])
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

    const content = flow.draft
      ? flow.draft
      : `<span class="followup-placeholder">${flow.placeholder || "继续补充..."}</span>`;

    return `
      <div class="query-line followup-line">
        ${tags}
        <span class="followup-fragment with-caret">${content}</span>
      </div>
    `;
  }

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
        <span>status</span>
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
        <span>task_summary</span>
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
  const slotLabel = question.slot || "question";
  const badge = slotLabel === "repair_options" ? "repair" : "one question only";

  return `
    <section class="question-card">
      <div class="card-label">
        <span>${slotLabel}</span>
        <span class="state-badge">${badge}</span>
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
        <span>conditions</span>
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
  document.querySelectorAll(".svg-transition-target").forEach((edge) => {
    edge.classList.toggle("is-selected", edge.dataset.target === currentScenario);
  });
}

function enhanceTransitionTargets() {
  document.querySelectorAll(".svg-transition-target").forEach((group) => {
    if (group.querySelector(".svg-edge-hit")) return;
    const edge = group.querySelector(".svg-edge");
    if (!edge) return;
    const hit = edge.cloneNode(false);
    hit.removeAttribute("marker-end");
    hit.classList.remove("main", "branch");
    hit.classList.add("svg-edge-hit");
    group.insertBefore(hit, group.firstChild);
  });
}

function setTransitionVisualState(group, state) {
  const edge = group.querySelector(".svg-edge.main, .svg-edge.branch");
  const label = group.querySelector(".svg-edge-label");
  if (!edge || !label) return;
  const isBranch = edge.classList.contains("branch");

  if (state === "hover") {
    edge.style.stroke = isBranch ? "#ef8a2e" : "#2d7ff9";
    edge.style.strokeWidth = "4.5px";
    edge.style.filter = isBranch
      ? "drop-shadow(0 0 8px rgba(239, 138, 46, 0.22))"
      : "drop-shadow(0 0 8px rgba(45, 127, 249, 0.28))";
    label.style.fill = isBranch ? "#a55e1f" : "#1f252e";
    label.style.fontWeight = "800";
    return;
  }

  edge.style.stroke = "";
  edge.style.strokeWidth = "";
  edge.style.filter = "";
  label.style.fill = "";
  label.style.fontWeight = "";
}

function clearSvgFocus(svg) {
  if (!svg) return;
  svg.classList.remove("is-focusing");
  svg.querySelectorAll(".svg-state-target").forEach((node) => {
    node.classList.remove("is-dim", "is-highlight", "is-context");
  });
  svg.querySelectorAll(".svg-transition-target").forEach((group) => {
    group.classList.remove("is-dim", "is-highlight", "is-context");
    setTransitionVisualState(group, "base");
  });
}

function focusTransition(group) {
  const svg = group.closest("svg");
  if (!svg) return;
  clearSvgFocus(svg);
  svg.classList.add("is-focusing");

  const from = group.dataset.from;
  const to = group.dataset.to;

  svg.querySelectorAll(".svg-state-target").forEach((node) => node.classList.add("is-dim"));
  svg.querySelectorAll(".svg-transition-target").forEach((edge) => edge.classList.add("is-dim"));

  group.classList.remove("is-dim");
  group.classList.add("is-highlight");
  setTransitionVisualState(group, "hover");

  svg.querySelectorAll(".svg-state-target").forEach((node) => {
    if (node.dataset.node === from || node.dataset.node === to) {
      node.classList.remove("is-dim");
      node.classList.add("is-highlight");
    }
  });

  svg.querySelectorAll(".svg-transition-target").forEach((edge) => {
    if (edge === group) return;
    if ([from, to].includes(edge.dataset.from) || [from, to].includes(edge.dataset.to)) {
      edge.classList.remove("is-dim");
      edge.classList.add("is-context");
    }
  });

  svg.querySelectorAll(".svg-state-target").forEach((node) => {
    if (node.classList.contains("is-highlight")) return;
    const nodeId = node.dataset.node;
    const isContext = [...svg.querySelectorAll(".svg-transition-target.is-context")].some((edge) =>
      edge.dataset.from === nodeId || edge.dataset.to === nodeId,
    );
    if (isContext) {
      node.classList.remove("is-dim");
      node.classList.add("is-context");
    }
  });
}

function focusState(node) {
  const svg = node.closest("svg");
  if (!svg) return;
  clearSvgFocus(svg);
  svg.classList.add("is-focusing");

  const nodeId = node.dataset.node;
  svg.querySelectorAll(".svg-state-target").forEach((item) => item.classList.add("is-dim"));
  svg.querySelectorAll(".svg-transition-target").forEach((edge) => edge.classList.add("is-dim"));

  node.classList.remove("is-dim");
  node.classList.add("is-highlight");

  svg.querySelectorAll(".svg-transition-target").forEach((edge) => {
    if (edge.dataset.from === nodeId || edge.dataset.to === nodeId) {
      edge.classList.remove("is-dim");
      edge.classList.add("is-context");
    }
  });

  svg.querySelectorAll(".svg-state-target").forEach((item) => {
    if (item === node) return;
    const itemId = item.dataset.node;
    const isContext = [...svg.querySelectorAll(".svg-transition-target.is-context")].some((edge) =>
      edge.dataset.from === itemId || edge.dataset.to === itemId,
    );
    if (isContext) {
      item.classList.remove("is-dim");
      item.classList.add("is-context");
    }
  });
}

function renderStateDock() {
  const triple = stateTriples[currentScenario];
  const actions = stateActions[currentScenario] || [];
  document.getElementById("state-triplet").innerHTML = `
    <span class="triple-chip"><strong>input_state</strong><em>${triple?.input || "—"}</em></span>
    <span class="triple-chip"><strong>container_state</strong><em>${triple?.container || "—"}</em></span>
    <span class="triple-chip"><strong>session_state</strong><em>${triple?.session || "—"}</em></span>
    <span class="triple-chip subtle"><strong>scene</strong><em>${currentScene}</em></span>
    <span class="triple-chip subtle"><strong>substate</strong><em>${currentScenario}</em></span>
    <span class="triple-chip subtle"><strong>variant</strong><em>${currentVariant}</em></span>
  `;
  document.getElementById("state-actions").innerHTML = actions
    .map((action) => `<button class="dock-action" data-target="${action.target}">${action.label}</button>`)
    .join("");
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
  renderStateDock();
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
  renderStateDock();
});

document.getElementById("variant-picker").addEventListener("click", (event) => {
  const button = event.target.closest("button[data-variant]");
  if (!button) return;
  document
    .querySelectorAll("#variant-picker button")
    .forEach((node) => node.classList.toggle("is-active", node === button));

  currentVariant = button.dataset.variant;
  applyVariantVisibility();
  renderStateDock();
});

document.querySelector(".state-machine-panel").addEventListener("click", (event) => {
  const transition = event.target.closest(".svg-transition-target");
  if (transition?.dataset.target) {
    const targetScenario = transition.dataset.target;
    const sceneEntry = Object.entries(sceneMap).find(([, list]) => list.some((item) => item.id === targetScenario));
    if (!sceneEntry) return;
    currentScene = sceneEntry[0];
    currentScenario = targetScenario;
    document
      .querySelectorAll("#scene-picker button")
      .forEach((node) => node.classList.toggle("is-active", node.dataset.scene === currentScene));
    renderSubstatePicker();
    applyStateMachineSelection();
    rerenderAll();
    renderStateDock();
    return;
  }
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
  renderStateDock();
});

document.querySelector(".state-machine-panel").addEventListener("mouseover", (event) => {
  const transition = event.target.closest(".svg-transition-target");
  if (transition) {
    focusTransition(transition);
    return;
  }

  const state = event.target.closest(".svg-state-target");
  if (state) {
    focusState(state);
  }
});

document.querySelectorAll(".machine-svg").forEach((svg) => {
  svg.addEventListener("mouseleave", () => clearSvgFocus(svg));
});

document.getElementById("state-actions").addEventListener("click", (event) => {
  const button = event.target.closest(".dock-action");
  if (!button) return;
  const target = button.dataset.target;
  const sceneEntry = Object.entries(sceneMap).find(([, list]) => list.some((item) => item.id === target));
  if (!sceneEntry) return;
  currentScene = sceneEntry[0];
  currentScenario = target;
  document
    .querySelectorAll("#scene-picker button")
    .forEach((node) => node.classList.toggle("is-active", node.dataset.scene === currentScene));
  renderSubstatePicker();
  applyStateMachineSelection();
  rerenderAll();
  renderStateDock();
});

document.getElementById("compare-toggle").addEventListener("click", () => {
  const section = document.getElementById("compare-section");
  const button = document.getElementById("compare-toggle");
  const expanded = section.classList.toggle("is-expanded");
  section.classList.toggle("is-collapsed", !expanded);
  button.setAttribute("aria-expanded", String(expanded));
  button.textContent = expanded ? "收起" : "展开";
});

rerenderAll();
applyVariantVisibility();
renderSubstatePicker();
enhanceTransitionTargets();
applyStateMachineSelection();
renderStateDock();
