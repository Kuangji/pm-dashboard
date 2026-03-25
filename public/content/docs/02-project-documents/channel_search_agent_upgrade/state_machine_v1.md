# 频道搜索 Agent 化改造 · 状态机 v1

> 文档阶段：State Machine  
> 状态：Draft v1  
> 创建日期：2026-03-20  
> 作用：本项目交互状态的权威来源

---

## 一、文档职责

本文件是 `channel_search_agent_upgrade` 的交互状态机权威源。

后续所有涉及以下内容的修改，必须遵循这个顺序：

1. 先修改本状态机文档
2. 再同步修改 `spec_v1.md`
3. 再同步修改 `design_v1.md`
4. 再同步修改 Demo
5. 最后检查 `prd_v1.md` 和发布目录是否需要跟随更新

如果 Demo、Spec、Design 与本文件冲突，以本文件为准。

补充规则：

- 当前阶段的所有 Demo 迭代，默认视为“状态机驱动的可视化表达”，不是独立设计探索。
- 因此任何 Demo 改动，只要改变了状态定义、状态边界、状态触发、状态表现或状态映射，就必须先或同步修改本文件。

---

## 二、状态机分层

本项目的状态机拆为三层：

1. `输入状态机`
   - 关注搜索框内部“输入如何被编辑、固化、解释”
2. `容器状态机`
   - 关注搜索框是经典态、识别态、展开态还是修正态
3. `会话状态机`
   - 关注搜索任务是 retrieving、clarifying、refining 还是 empty_repair

三层并行，但要避免混淆。

### 2.1 Demo 图形化绘制约定

为避免状态图在 Demo 中失真，图形化版本固定遵循以下规则：

- 同一行的状态，优先使用左右侧端点连接
- 不同行的状态，优先使用顶部 / 底部端点连接
- 只有在顶部 / 底部端点已被占用且会造成明显冲突时，才允许改用未占用的侧边端点
- 不允许使用看不出来源和去向的斜穿长线
- 每条路径必须能被一眼读成“从哪个状态出发，落到哪个状态”

### 2.2 Demo 动作解释规则

当前 Demo 底部状态栏中的 `actions`，不是单独某一层状态机的动作。

它表示的是：

- 以当前 `scene + substate` 为起点
- 触发一次复合状态转移
- 从而让三元组一起变化

因此：

- `actions` 的粒度是当前 Demo 子状态级，不是输入层 / 容器层 / 会话层的单层动作
- 状态图中的路径点击，应与状态栏里的动作共用同一套目标状态映射
- 对用户而言，点击路径线和点击状态栏动作，本质上都是“跳到这条转移的目标子状态”

---

## 三、输入状态机

### 3.1 关键词输入状态

| 状态 | 含义 |
|---|---|
| `empty_input` | 搜索框中还没有任何已输入内容 |
| `draft_keyword` | 当前正在输入、尚未固化的关键词文本 |
| `editing_keyword` | 用户正在编辑一个已存在的关键词 tag |
| `committed_anchor` | 已被精确识别并收起展示的 URL / 频道锚点 badge |
| `followup_waiting` | 原始 query 已被系统吸收，输入框正等待用户补充下一轮自然语言 |
| `draft_followup` | 用户正在输入新的自然语言补充 |
| `committed_keyword` | 已被确认并固化的关键词 tag |
| `excluded_keyword` | 已开启排除的关键词 tag |
| `tag_scope_menu_open` | 当前关键词 tag 的匹配目标菜单已展开 |

### 3.2 输入状态转移

| 当前状态 | 触发条件 | 下一状态 |
|---|---|---|
| `empty_input` | 用户开始输入 | `draft_keyword` |
| `draft_keyword` | 清空输入 / 失焦且为空 | `empty_input` |
| `draft_keyword` | `Enter` | `committed_keyword` |
| `draft_keyword` | 失去焦点且非空 | `committed_keyword` |
| `draft_keyword` | 点击搜索且非空 | `committed_keyword` |
| `committed_keyword` | 点击编辑当前 tag | `editing_keyword` |
| `editing_keyword` | 提交编辑结果 | `committed_keyword` |
| `editing_keyword` | 取消编辑 | `committed_keyword` |
| `editing_keyword` | 清空当前编辑内容且确认删除 | `committed_keyword` 或 `empty_input` |
| `committed_anchor` | 删除锚点 badge | `empty_input` 或 `draft_keyword` |
| `followup_waiting` | 用户开始补充自然语言 | `draft_followup` |
| `draft_followup` | 清空补充内容 / 取消补充 | `followup_waiting` |
| `draft_followup` | 用户提交补充内容 | 交由容器态 / 会话态继续流转 |
| `committed_keyword` | 点击匹配目标区域 | `tag_scope_menu_open` |
| `tag_scope_menu_open` | 选择新的匹配目标 | `committed_keyword` |
| `tag_scope_menu_open` | 关闭菜单 | `committed_keyword` |
| `tag_scope_menu_open` | 打开排除开关 | `excluded_keyword` |
| `excluded_keyword` | 点击编辑当前 tag | `editing_keyword` |
| `excluded_keyword` | 点击匹配目标区域 | `tag_scope_menu_open` |
| `excluded_keyword` | 关闭排除开关 | `committed_keyword` |
| `committed_keyword` / `excluded_keyword` | 删除 tag 且仍有其他 tag | `committed_keyword` |
| `committed_keyword` / `excluded_keyword` | 删除最后一个 tag | `empty_input` |

### 3.3 输入层约束

- 经典关键词态下，搜索框末尾始终保留一个可输入的 `draft_keyword`
- 当搜索框完全为空时，输入层处于 `empty_input`
- 当 URL 已被精确识别成功后，输入层应切换为 `committed_anchor`
- 当原始自然语言已被系统成功吸收进 `task_summary / conditions` 后，输入层应切换为 `followup_waiting`
- Agent 中间稳定态下，不再强制保留 `draft_keyword`
- `committed_keyword` 必须保留其匹配目标配置
- `committed_anchor` 代表一个已锁定的精确锚点，不得与普通关键词 tag 混为同一语义
- `excluded_keyword` 仅改变该关键词自身语义，不影响其他关键词
- `tag_scope_menu_open` 必须附着在当前 tag 上，不能漂成独立设置面板
- 输入状态机是编辑器状态机，允许局部循环；它不应被设计成单向无环流程
- 经典态允许形成一个“复合查询种子”：
  - `0..n` 个 `committed_keyword`
  - `0..1` 个 `committed_anchor`
  - `1` 个尾部 `draft_keyword`
- `committed_anchor` 在经典态中最多只能存在一个；超过一个会导致精确锚点语义失稳
- 该复合查询种子仍属于 `compact_classic`，不自动升级为 Agent 态

---

## 四、容器状态机

### 4.1 容器状态

| 状态 | 含义 |
|---|---|
| `compact_classic` | 经典收起态，服务纯关键词与大多数纯 URL 路径 |
| `compact_resolving` | URL 识别中的轻量状态 |
| `expanded_agent` | 已进入完整 Agent 搜索框展开态 |
| `expanded_clarifying` | 展开态下，搜索框内部正在追问 |
| `expanded_repair` | 展开态下，正在进行零结果修正或 URL 修正 |

### 4.2 容器状态转移

| 当前状态 | 触发条件 | 下一状态 |
|---|---|---|
| `compact_classic` | 提交纯关键词 | `compact_classic` |
| `compact_classic` | 提交纯 URL | `compact_resolving` |
| `compact_classic` | 提交纯自然语言 | `expanded_agent` |
| `compact_classic` | 提交混合输入 | `expanded_agent` |
| `compact_classic` | 用户主动转为智能搜索 | `expanded_agent` |
| `compact_resolving` | URL 识别成功并可精确搜索 | `compact_classic` |
| `compact_resolving` | URL 识别失败 / 平台不匹配 / 类型不支持 | `expanded_repair` |
| `expanded_agent` | 首轮结果后需追问 | `expanded_clarifying` |
| `expanded_agent` | 有条件无结果 | `expanded_repair` |
| `expanded_clarifying` | 用户回答后继续搜索 | `expanded_agent` |
| `expanded_repair` | 用户修正后重新搜索 | `expanded_agent` 或 `compact_classic` |
| 任意展开态 | 用户主动清空并新建经典搜索 | `compact_classic` |

### 4.3 容器层约束

- 纯关键词不得自动进入展开态
- 纯 URL 若可按原有路径成功识别，不得自动升级为完整 Agent 态
- 纯 URL 成功识别后的默认结果语义是 `锚点搜索`
- 展开态不会因为结果返回而自动收起
- 经典态必须保持“查询编辑器”感，不能被展开态的卡片语义污染

---

## 五、会话状态机

### 5.1 会话状态

| 状态 | 含义 |
|---|---|
| `idle` | 尚未形成有效搜索任务 |
| `retrieving` | 正在执行首轮或后续搜索 |
| `results_ready` | 已有结果可浏览 |
| `clarifying` | 当前存在需要回答的高价值问题 |
| `refining` | 回答追问或改条件后，系统正在刷新 |
| `empty_repair` | 有条件但无召回，进入修正引导 |
| `unsupported` | 当前需求不支持或受限 |

### 5.2 会话状态转移

| 当前状态 | 触发条件 | 下一状态 |
|---|---|---|
| `idle` | 形成有效输入并发起搜索 | `retrieving` |
| `retrieving` | 返回有效结果 | `results_ready` |
| `retrieving` | 有条件但无结果 | `empty_repair` |
| `retrieving` | 需求受限 | `unsupported` |
| `results_ready` | 发现高影响歧义需追问 | `clarifying` |
| `clarifying` | 用户回答追问 | `refining` |
| `refining` | 刷新完成且有结果 | `results_ready` |
| `refining` | 刷新完成且无结果 | `empty_repair` |
| `empty_repair` | 用户接受修正并重新搜索 | `retrieving` |
| `unsupported` | 用户重写输入 | `idle` 或 `retrieving` |

### 5.3 会话层约束

- 默认策略固定为 `先搜后追问`
- 每次只允许一个高价值追问
- `empty_repair` 必须留在搜索框内部完成
- 结果解释、条件解释都服务于当前会话，不另起独立对话线程
- loading 动画只允许出现在真正进行中的状态：
  - `retrieving`
  - `refining`
  - `compact_resolving`
  - 其他明确的解析中态
- 稳定态不得继续显示 loading：
  - `results_ready`
  - `clarifying`
  - `empty_repair`
  - URL 已识别成功或已判定失败的修正态

### 5.4 Follow-up 出口闭环

`draft_followup` 不是终点，必须有明确出口。

共同规则：

- 用户提交一条 follow-up 后，不回到首轮 `retrieving`
- 而是进入一轮增量 `refining`
- `refining` 完成后，必须落回一个明确稳定态或修正态

具体路径：

| 来源子状态 | 提交后进入 | 可能结果 |
|---|---|---|
| `natural-followup-draft` | `natural-followup-refining` | `natural-results` / `natural-clarifying` / `repair-empty` |
| `mixed-followup-draft` | `mixed-followup-refining` | `mixed-anchor` / `mixed-clarifying` / `repair-empty` |
| `repair-followup-draft` | `repair-followup-refining` | `repair-recovered-results` / `repair-empty` / `repair-unsupported` |

补充约束：

- `repair-recovered-results` 是从修正态恢复成功后的稳定结果态
- 它不应被硬塞回原始 `natural-results` 或 `mixed-anchor`，否则会丢失“这是修正后恢复”的语义
- Demo 中必须把 `draft -> refining -> 稳定态/修正态` 这一段显式画出来，不能只画 follow-up 的入口

---

## 六、复合场景处理规则

### 6.1 纯关键词

- 初始空白页应从 `empty_input + compact_classic + idle` 开始
- 输入层主导
- 容器保持 `compact_classic`
- 会话在 `idle -> retrieving -> results_ready` 间循环

### 6.2 纯 URL

- 输入层主导
- 容器先进入 `compact_resolving`
- 若成功识别，尽快回到 `compact_classic`
- 若失败，进入 `expanded_repair`
- 成功识别后的默认结果表达为：
  - `committed_anchor`
  - `锚点频道` 置顶
  - 其余结果为相似频道召回

### 6.3 纯自然语言

- 容器直接进入 `expanded_agent`
- 会话先 `retrieving`，后决定是否 `clarifying`
- 稳定中间态下，输入框应切换为 `followup_waiting`

### 6.4 混合输入

- 容器直接进入 `expanded_agent`
- 先展示解析摘要
- 若存在精确 URL 锚点，优先保护锚点语义
- 软条件不得伪装成已严格生效条件
- 稳定中间态下，输入框应切换为 `followup_waiting`

### 6.4A 中间态主动补充路径

以下状态允许用户主动补充一条新的自然语言：

- `results_ready`
- `clarifying`
- `empty_repair`
- `mixed-soft`

共同规则：

- 原始 query 不再继续停留在输入框里
- 输入框切换为 `followup_waiting`
- 用户开始输入后转为 `draft_followup`
- 提交后进入对应的 `*-followup-refining`
- 不能停留在只有 draft 没有出口的半状态

### 6.5 经典关键词起手 -> 升级为 Agent 态

这是必须显式维护的升级路径。

#### 触发场景

- 用户已在经典态提交一个或多个关键词 tag
- 然后继续补充自然语言要求

#### 预期路径

1. 经典态：
   - 已有关键词 tag 保留
   - 当前仍是 `compact_classic`
2. 升级触发：
   - 用户追加自然语言并提交
3. 升级过渡：
   - 关键词 tag 被保留为 `Explicit Conditions`
   - 新自然语言不再停留为普通 tag
   - 系统开始生成 `task_summary`
4. 升级稳定：
   - 容器进入 `expanded_agent`
   - 会话进入 `retrieving` 或 `results_ready`
   - 搜索框内部同时看到：
     - 已提交关键词片段
     - 系统任务摘要
     - 结构化条件

#### 约束

- 不得丢失已有关键词 tag
- 不得把已有关键词重新改写成系统派生条件
- 主输入框升级后必须保留新的可输入位

### 6.6 经典 URL 起手 -> 升级为 Agent 态

这也是必须显式维护的升级路径。

#### 触发场景

- 用户已输入并成功识别精确 URL
- 然后继续补充自然语言要求

#### 预期路径

1. 经典 URL 成功态：
   - URL 已形成精确锚点
   - 当前仍保持经典/轻量态
2. 升级触发：
   - 用户追加自然语言并提交
3. 升级过渡：
   - URL 保留为 `anchor`
   - 新自然语言被解释为 refine 要求
   - 系统必须先说明当前按什么优先级理解输入
4. 升级稳定：
   - 容器进入 `expanded_agent`
   - 搜索框内部同时看到：
     - URL 锚点
     - 硬条件
     - 软偏好
     - 必要时的追问

#### 约束

- URL 精确语义优先于软偏好
- 不得静默把 URL 解释成“找类似频道”
- 若要从“看这个频道”变成“找类似频道”，必须显式说明或追问

---

## 七、维护规则

未来凡是新增以下内容，都必须先改本文件：

- 新状态
- 新触发条件
- 新的自动展开 / 自动收起规则
- 新的关键词 tag 语义
- 新的 URL 识别分支
- 新的混合输入优先级

没有先修改本文件的交互改动，视为未完成。

---

## 八、Demo 展示规则

为了避免“一个场景里同时混着多个子状态”造成理解混乱，Demo 展示必须遵循：

1. 先选 `场景`
2. 再选该场景下的 `子状态`
3. 页面一次只展示一个确定状态

### 8.1 场景与子状态建议映射

| 场景 | 子状态 |
|---|---|
| 关键词搜索 | 初始空白态 / 输入态 / 完成态 / 多关键词 / 匹配目标态 |
| URL 输入 | 识别中 / 精确识别成功 / 平台不匹配 / 类型不支持 / 无法识别 |
| 自然语言 | 刚展开 / 首轮搜索中 / 首轮结果已返回 / 追问态 / 主动补充输入中 |
| 混合输入 | 解析摘要态 / 锚点优先态 / 软条件待澄清态 / 追问态 / 主动补充输入中 |
| 修正态 | URL 无法识别 / 平台不匹配 / 类型不支持 / 有条件无结果 / 主动补充输入中 |
| 升级路径 | 关键词起手-触发前 / 关键词起手-升级中 / 关键词起手-升级稳定 / URL 起手-触发前 / URL 起手-升级中 / URL 起手-升级稳定 |

### 8.2 展示约束

- Demo 不允许在同一视图里同时混放多个子状态
- 若一个场景只有一个展示态，说明状态拆分还不完整
- 子状态选择器的命名应尽量贴近用户能理解的语言，而不是只暴露内部枚举名
- 因为当前主要围绕 Demo 讨论，后续每轮 Demo 改动完成后，必须立即检查本文件是否需要同步更新
- Demo 中的视觉方案区允许作为“讨论辅助区”被收起/展开，但收起不会改变当前状态机状态

### 8.3 底部只读状态栏

Demo 需要提供一个只读的底部状态栏，用于展示当前状态三元组：

- `input_state`
- `container_state`
- `session_state`

同时可附加展示：

- `scene`
- `substate`
- `variant`

### 8.4 动作列表

状态栏中需要展示：

- `当前状态下可以做的动作`

这些动作是事件驱动的状态流转入口，不是自由文本说明。

点击动作后：

1. 切换到目标场景
2. 切换到目标子状态
3. 保持当前视觉方向不变
4. 同步刷新状态图高亮与 Demo 主体
