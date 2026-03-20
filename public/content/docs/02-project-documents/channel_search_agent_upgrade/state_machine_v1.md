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

---

## 三、输入状态机

### 3.1 关键词输入状态

| 状态 | 含义 |
|---|---|
| `draft_keyword` | 当前正在输入、尚未固化的关键词文本 |
| `committed_keyword` | 已被确认并固化的关键词 tag |
| `excluded_keyword` | 已开启排除的关键词 tag |
| `tag_scope_menu_open` | 当前关键词 tag 的匹配目标菜单已展开 |

### 3.2 输入状态转移

| 当前状态 | 触发条件 | 下一状态 |
|---|---|---|
| `draft_keyword` | `Enter` | `committed_keyword` |
| `draft_keyword` | 失去焦点且非空 | `committed_keyword` |
| `draft_keyword` | 点击搜索且非空 | `committed_keyword` |
| `committed_keyword` | 点击匹配目标区域 | `tag_scope_menu_open` |
| `tag_scope_menu_open` | 选择新的匹配目标 | `committed_keyword` |
| `tag_scope_menu_open` | 打开排除开关 | `excluded_keyword` |
| `excluded_keyword` | 关闭排除开关 | `committed_keyword` |
| `committed_keyword` / `excluded_keyword` | 删除 tag | 从关键词集合中移除 |

### 3.3 输入层约束

- 搜索框末尾始终保留一个可输入的 `draft_keyword`
- `committed_keyword` 必须保留其匹配目标配置
- `excluded_keyword` 仅改变该关键词自身语义，不影响其他关键词
- `tag_scope_menu_open` 必须附着在当前 tag 上，不能漂成独立设置面板

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

---

## 六、复合场景处理规则

### 6.1 纯关键词

- 输入层主导
- 容器保持 `compact_classic`
- 会话在 `idle -> retrieving -> results_ready` 间循环

### 6.2 纯 URL

- 输入层主导
- 容器先进入 `compact_resolving`
- 若成功识别，尽快回到 `compact_classic`
- 若失败，进入 `expanded_repair`

### 6.3 纯自然语言

- 容器直接进入 `expanded_agent`
- 会话先 `retrieving`，后决定是否 `clarifying`

### 6.4 混合输入

- 容器直接进入 `expanded_agent`
- 先展示解析摘要
- 若存在精确 URL 锚点，优先保护锚点语义
- 软条件不得伪装成已严格生效条件

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
