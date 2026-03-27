# 频道搜索 Agent 化改造 · 状态机 v1

> 文档阶段：State Machine  
> 状态：Draft v1  
> 创建日期：2026-03-20  
> 作用：本项目交互状态的唯一基准

---

## 一、文档职责

本文件是 `channel_search_agent_upgrade` 的交互状态机唯一基准。

后续所有涉及以下内容的修改，必须遵循这个顺序：

1. 先修改本状态机文档
2. 再同步修改 `spec_v1.md`
3. 再同步修改 `design_v1.md`
4. 再同步修改 Demo
5. 最后检查 `prd_v1.md` 和发布目录是否需要跟随更新

如果 Demo、Spec、Design、PRD、Agent Response Contract、XState 实现 与本文件冲突，一律以本文件为准。

补充规则：

- 当前阶段的所有 Demo 迭代，默认视为“状态机驱动的可视化表达”，不是独立设计探索。
- 因此任何 Demo 改动，只要改变了状态定义、状态边界、状态触发、状态表现或状态映射，就必须先或同步修改本文件。
- `state_machine_v1.md` 不是“优先级最高的参考文档”，而是唯一状态真相源。
- `spec_v1.md`、`design_v1.md`、`agent_response_contract_v1.md` 只负责解释、约束或展开本状态机，不得各自新增平行状态定义。
- Demo 与 XState machine 只负责实现和可视化本状态机，不得先于本文件发明新状态、新路径或新的默认语义。

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

### 2.3 EFSM 约束：状态与 Context 同时定义语义

本项目不是纯离散 FSM，而是 **EFSM（Extended Finite State Machine）**：

- `state` 用于表达用户可感知的阶段变化
- `context` 用于表达当前阶段下的参数、来源、局部 UI 附着与动作分派条件

判断原则：

- 如果差异会改变：
  - 用户感知阶段
  - 搜索框整体骨架
  - 可用动作集合的一级分叉
  则优先建模为 `state`
- 如果差异只改变：
  - 某个 tag 的属性
  - 某个局部菜单是否打开
  - 某条修正路径的来源
  - 文案、动作排序或某动作是否显示
  则优先建模为 `context`

当前明确允许进入 context 的字段包括但不限于：

- `repair_reason`
- `query_shape`
- `source_stage`
- `keyword_tags[]`
- `active_tag_id`
- `active_tag_menu`

因此：

- 不允许为了单个 tag 的局部属性变化而无限新增全局输入状态
- 不允许为了同一修正骨架的来源差异而无限新增平行修正状态

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

### 3.1A 关键词 tag 上下文

关键词 tag 的局部属性不再单独建模为全局输入状态，而通过 context 表达。

推荐字段：

- `keyword_tags[]`
  - `text`
  - `scope`
  - `is_excluded`
- `active_tag_id`
- `active_tag_menu`

约束：

- `is_excluded` 仅影响对应 tag，不影响其他 tag
- `active_tag_menu` 必须附着在某个具体 tag 上，不能漂成全局设置面板
- 切换排除、切换匹配目标、打开/关闭 tag 菜单，默认都属于 `committed_keyword` 状态下的 context 变化

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
| `committed_keyword` | 打开 / 关闭某个 tag 菜单 | `committed_keyword`（context 更新） |
| `committed_keyword` | 切换匹配目标 | `committed_keyword`（context 更新） |
| `committed_keyword` | 打开 / 关闭排除 | `committed_keyword`（context 更新） |
| `committed_keyword` | 删除 tag 且仍有其他 tag | `committed_keyword` |
| `committed_keyword` | 删除最后一个 tag | `empty_input` |

### 3.3 输入层约束

- 经典关键词态下，搜索框末尾始终保留一个可输入的 `draft_keyword`
- 当搜索框完全为空时，输入层处于 `empty_input`
- 当 URL 已被精确识别成功后，输入层应切换为 `committed_anchor`
- 当原始自然语言已被系统成功吸收进 `task_summary / conditions` 后，输入层应切换为 `followup_waiting`
- Agent 中间稳定态下，不再强制保留 `draft_keyword`
- `committed_keyword` 必须保留其匹配目标配置
- `committed_anchor` 代表一个已锁定的精确锚点，不得与普通关键词 tag 混为同一语义
- `keyword tag` 的 `scope / is_excluded / active menu` 默认视为 context，不再各自膨胀为输入层全局状态
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
- `empty_repair` 只承载“完全无结果 / 无有效召回”的修正路径
- `low_recall`（结果极少/可用性不足）不应直接改写会话状态，而应在 `results_ready` 上附加修正提示能力
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
| `repair-followup-draft` | `repair-followup-refining` | `results_ready (source_stage=post_repair)` / `repair-empty` / `repair-unsupported` |

补充约束：

- 修正态恢复成功后，会话层仍是 `results_ready`，但必须附加：
  - `source_stage = post_repair`
- “这是修正后恢复的结果”通过 context 保留，不再单独膨胀为 `repair-recovered-results` 会话状态
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
- 在 URL 成功识别后，允许继续追加关键词形成 `URL+关键词种子`，该状态与 `关键词+URL种子` 共享同一输入语义
- 当纯 URL 的相似召回结果极少（`low_recall`）时：
  - 结果仍继续展示
  - 会话保持 `results_ready`
  - 容器保持当前态，不得自动切到 `expanded_repair`
  - 搜索框内出现轻提示入口，等待用户手动展开修正

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
- 当 `anchor + keyword` 同时出现时：
  - `anchor` 作为参考锚点
  - `keyword` 作为显式条件
  - V1 不做前置冲突判别
  - 默认 as-is 进入首轮搜索
  - `关键词+URL种子` 与 `URL+关键词种子` 只表示不同起手方式下的提交前编辑态
  - 两者一旦触发搜索，必须收敛到共享的搜索后路径：
    - `mixed-parse`
    - `mixed-anchor`
  - 首轮搜索的结果语义应为：
    - 先锁定 `anchor`
    - 召回相似频道候选
    - `keyword` 在用户首屏可见的相似频道结果中已经生效
  - `anchor` 作为 pinned reference 保留置顶可见
  - `keyword` 作用于相似频道结果集，不影响 `anchor` 本身的可见性
- 当 `anchor + keyword` 的可见结果极少（`low_recall`）时：
  - 结果仍继续展示
  - 会话保持 `results_ready`
  - 容器保持当前态，不得自动切到 `expanded_repair`
  - 修正原因标注为 `low_recall`
  - 通过搜索框内部轻提示入口，等待用户手动展开修正

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
- 追问态与中间态 follow-up 中，除自然语言外还允许：
  - 新的关键词 tag
  - 单一 anchor 的替换性 URL 输入

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

- URL 锚点语义优先于软偏好
- URL-only 的默认基线语义已经是 `锚点搜索`：
  - 锚点频道置顶
  - 其余结果为相似频道召回
- 在 URL 起手升级为 Agent 态后，不得丢失锚点语义，也不得把 URL 降格为普通关键词
- 新增自然语言必须被解释为 refine / 附加约束 / 新任务说明之一，而不是静默覆盖既有锚点

### 6.7 Agent -> 经典态回退

- Agent 态允许回退到经典态，但不是随时都能回退
- 只有在以下条件同时满足时才允许：
  - 当前不存在未完成的追问
  - 当前不存在 repair 进行中的卡点
  - 当前输入只剩显式关键词 tag 和/或单一 anchor
- 回退后：
  - 容器回到 `compact_classic`
  - 输入层保留显式 tag / anchor
  - Agent 派生解释层被移除

### 6.8 `anchor + keyword` 例外路径：URL 无法生成 anchor

当用户输入同时包含 URL 与 keyword，但 URL 在识别阶段无法形成有效 anchor 时：

- 不得把整条输入直接判死
- keyword 必须被保留
- 只把 URL 这部分判定为失败并进入修正态

推荐转移：

1. 提交 `anchor + keyword`
2. URL 识别失败（invalid / mismatch / unsupported）
3. 进入 `expanded_repair + empty_repair`
4. 用户通过修正动作继续

修正动作基线（与 8.5 Action Registry 对齐）：

- `A_REPAIR_FIX_URL`
  - 语义：修正 URL 后重试解析
  - 转移：`expanded_repair -> compact_resolving`
- `A_REPAIR_REMOVE_ANCHOR_KEEP_KEYWORDS`
  - 语义：删除 URL，仅保留 keyword
  - 转移：`expanded_repair -> compact_classic`
- `A_REPAIR_SWITCH_TO_NL`
  - 语义：改为自然语言描述需求
  - 转移：`expanded_repair -> expanded_agent`

约束：

- `A_REPAIR_REMOVE_ANCHOR_KEEP_KEYWORDS` 触发后，keyword 不得丢失
- `A_REPAIR_SWITCH_TO_NL` 触发后，原有 keyword 仍作为显式条件保留
- 本路径中不允许前置冲突判别拦截；失败原因仅限 URL 解析侧

### 6.9 统一低召回修正路径（`low_recall`）

以下两类场景统一进入同一修正分支：

- `anchor-only`：锚点已生成，但相似频道结果极少或质量不足
- `anchor + keyword`：锚点已生成，但 keyword 生效后可见结果极少或过窄

统一处理：

1. 首轮结果仍作为 `results_ready` 展示
2. 附加：
   - `repair_reason = low_recall`
   - `repair_hint_visible = true`
3. 容器保持当前态，不自动切到 `expanded_repair`
4. 用户点击轻提示入口后，才进入 `expanded_repair`
5. 输入保持可编辑（`followup_waiting` 或显式 tag/anchor）

统一动作语义：

- `A_HINT_OPEN_REPAIR_LOW_RECALL`
  - 打开低召回修正区
- `A_HINT_DISMISS_LOW_RECALL`
  - 暂时关闭轻提示，继续浏览结果

- `A_REPAIR_REPLACE_ANCHOR`
  - 更换锚点频道后重试召回
- `A_REPAIR_EXPAND_RECALL_SCOPE`
  - 放宽关键词或扩大召回范围再搜索
- `A_REPAIR_REMOVE_ANCHOR_KEEP_KEYWORDS`
  - 删除锚点，仅保留 keyword 搜索
- `A_REPAIR_SWITCH_TO_NL`
  - 改为自然语言描述需求并进入解析

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

### 8.1 场景与子状态映射基线

| 场景 | 子状态 |
|---|---|
| 关键词搜索 | 初始空白态 / 输入态 / 完成态 / 编辑已有关键词 / 多关键词 / 关键词+URL种子 / 匹配目标 |
| URL 输入 | 识别中 / 锚点搜索就绪 / URL+关键词种子 / 低召回提示态 / 平台不匹配 / 类型不支持 / 无法识别 |
| 自然语言 | 刚展开 / 首轮搜索中 / 首轮结果已返回 / 追问态 / 主动补充输入中 / 补充后刷新中 |
| 混合输入 | 解析摘要态 / 锚点优先态 / 软条件待澄清态 / 追问态 / 主动补充输入中 / 补充后刷新中 |
| 修正态 | URL 无法识别 / 平台不匹配 / 类型不支持 / 有条件无结果 / 低召回修正展开态 / 主动补充输入中 / 修正后刷新中 |
| 升级路径 | 关键词起手-触发前 / 关键词起手-升级中 / 关键词起手-升级稳定 / URL 起手-触发前 / URL 起手-升级中 / URL 起手-升级稳定 |

补充约束：

- 本表是 Demo、XState fixture catalog、状态图高亮映射的唯一基线。
- Demo 若新增子状态，必须先回写本表；未回写前，该 Demo 改动视为未完成。
- 如果 Demo 为了演示方便临时合并多个状态，必须在本文件中显式标注“展示合并”，不能静默省略。

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

### 8.5 Action Registry（动作注册表）

为保证“所有动作可枚举、可追溯”，本项目采用 `actionId` 作为跨文档与跨实现层的稳定键。

#### 8.5.1 约束

- 每一条状态转移动作都必须有 `actionId`
- `actionId` 由状态机定义，Demo/XState/后端实现只消费，不得自行发明平行编号体系
- 文案可改、UI 可改、实现技术可改，但 `actionId` 与语义转移关系必须保持稳定
- 追溯记录最少应包含：
  - `from_state`
  - `action_id`
  - `to_state`
  - `timestamp`

#### 8.5.2 命名建议

- 推荐格式：`A_<FROM>__<EVENT>__<TO>__<INDEX>`
- 若属于导航辅助动作，可用前缀：
  - `A_NAV_*`（场景/子状态选择）
  - `A_PATH_*`（状态图路径点击）

#### 8.5.3 修正态三动作基线（anchor 生成失败场景）

| actionId | 触发语义 | from | to |
|---|---|---|---|
| `A_REPAIR_FIX_URL` | 修正 URL 后重试解析 | `expanded_repair` | `compact_resolving` |
| `A_REPAIR_REMOVE_ANCHOR_KEEP_KEYWORDS` | 删除 URL，仅保留 keyword 搜索 | `expanded_repair` | `compact_classic` |
| `A_REPAIR_SWITCH_TO_NL` | 改为自然语言描述并进入解析 | `expanded_repair` | `expanded_agent` |

补充说明：

- 这三条是语义基线，Demo 当前可用不同文案承载，但不得改变其转移语义
- 后续 design 阶段只细化触发形式，不改 `actionId` 与状态转移关系

#### 8.5.4 低召回修正动作基线（`low_recall` 场景）

| actionId | 触发语义 | from | to |
|---|---|---|---|
| `A_HINT_OPEN_REPAIR_LOW_RECALL` | 手动展开低召回修正区 | `results_ready` | `expanded_repair` |
| `A_HINT_DISMISS_LOW_RECALL` | 暂时关闭低召回轻提示 | `results_ready` | `results_ready` |
| `A_REPAIR_REPLACE_ANCHOR` | 更换锚点后重试召回 | `expanded_repair` | `compact_resolving` |
| `A_REPAIR_EXPAND_RECALL_SCOPE` | 放宽关键词或扩大召回范围 | `expanded_repair` | `retrieving` |
| `A_REPAIR_REMOVE_ANCHOR_KEEP_KEYWORDS` | 删除锚点，仅保留 keyword 搜索 | `expanded_repair` | `compact_classic` |
| `A_REPAIR_SWITCH_TO_NL` | 改为自然语言描述并进入解析 | `expanded_repair` | `expanded_agent` |

补充说明：

- 该动作组同时适用于 `anchor-only` 与 `anchor + keyword` 的低召回路径
- 两类场景共用动作编号，但具体文案允许按上下文差异化
