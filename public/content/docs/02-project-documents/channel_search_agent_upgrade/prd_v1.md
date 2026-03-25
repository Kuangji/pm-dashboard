# 频道搜索 Agent 化改造 · PRD v1

| 属性 | 内容 |
|---|---|
| 项目名称 | channel_search_agent_upgrade |
| 文档阶段 | PRD |
| 状态 | Draft v1 |
| 关联文档 | input_v1.md · spec_v1.md · design_v1.md |
| 创建日期 | 2026-03-19 |

---

## 1. Executive Summary

### Problem Statement

NoxInfluencer 当前频道搜索仍主要依赖关键词、URL 与显式筛选器，现有 AI 助手以外挂式抽屉存在，无法真正降低非专业用户的搜索门槛，也无法与主搜索状态形成统一体验。

### Proposed Solution

将频道搜索升级为 `搜索框本体升级` 的 Agent 搜索工作台：用户可直接输入自然语言，系统先返回首轮结果，再在搜索框内部持续追问和 refine，并把结构化条件持续透明地同步给用户。

### Success Criteria

- 自然语言输入占总搜索会话的渗透率显著提升
- 自然语言会话首轮召回可用率达到可接受阈值
- refine 后结果改善率高于当前 AI 助手方案
- 老用户关键词 / URL 搜索完成率不下降
- AI 助手入口切换成本下降，外挂式使用率转向搜索框内主流程

---

## 2. User Experience & Functionality

### 2.1 User Personas

- **新手广告主 / 投放运营**
  - 不熟悉筛选体系，倾向直接描述业务需求
- **熟练运营 / BD**
  - 熟悉关键词与 filters，要求效率与可控性
- **混合型用户**
  - 先说业务目标，再用显式条件收紧

### 2.2 Core User Stories

#### Story A

As a 新手用户, I want to directly describe the kind of creator I need so that I don't have to guess keywords or platform filters.

**Acceptance Criteria**

- 支持自然语言直接起搜
- 系统先返回结果，而不是先进行冗长问答
- 系统把已识别条件展示给我看

#### Story B

As a 需要高精度结果的用户, I want the system to ask only the most important follow-up question so that I can refine results without leaving the search box.

**Acceptance Criteria**

- 追问只在高影响歧义时触发
- 追问在搜索框内部出现
- 回答追问后结果立即刷新

#### Story C

As an experienced user, I want AI conditions and manual filters to stay in sync so that I always know what the system is searching with.

**Acceptance Criteria**

- 显式 filters 与搜索框内条件层双向同步
- 改 chip、改筛选器、加一句自然语言都落在同一个 Search Session
- 条件来源可区分

#### Story D

As a returning user, I want to reopen a recent search context so that I can continue refining without rebuilding everything.

**Acceptance Criteria**

- 可恢复历史 session
- 恢复时保留条件、搜索框展开状态与当前摘要

#### Story E

As a legacy search user, I want keyword and URL search to keep working as before so that the new Agent upgrade does not slow down my existing workflow.

**Acceptance Criteria**

- 纯关键词搜索默认保持经典搜索框心智
- 纯 URL 搜索优先走原有 URL 识别路径
- 只有自然语言、混合输入或用户主动升级时才进入完整展开态

#### Story F

As a user who pastes a complex mixed query, I want the system to tell me what part is acting as the anchor and what part is only a preference so that I understand why the results look the way they do.

**Acceptance Criteria**

- 混合输入时系统先展示解析摘要
- 若存在 URL 或精确频道锚点，需显式提示其优先级
- 软条件不得伪装成已严格生效的硬过滤器

#### Story G

As a keyword-search user, I want each committed keyword phrase to become a configurable tag so that I can control where it matches without losing the speed of classic search.

**Acceptance Criteria**

- 用户正在输入的关键词与已完成关键词在视觉上可区分
- 回车、失焦或搜索提交可将当前关键词固化为 tag
- 多个关键词 tag 可并列存在
- 每个 tag 可单独配置匹配目标
- 每个 tag 可单独切换为排除关键词
- 经典态不因这些能力而变成“带说明的面板”
- 匹配目标菜单必须被感知为当前 tag 的附属菜单

### 2.3 Non-Goals

- 不做视频搜索 Agent 化
- 不做跨平台混搜结果池
- 不做 campaign copilot
- 不做收藏/联系等后链路 Agent 工作流
- 不做底层索引与排序引擎重构
- 不做全页视觉换代

---

## 3. AI System Requirements

### 3.1 Tool Requirements

- 自然语言解析能力
- 条件映射与派生规则层
- 当前搜索接口与筛选接口
- 会话上下文存储
- 受限响应与敏感需求判定

### 3.2 Evaluation Strategy

核心评估维度：

- 自然语言到 Condition Graph 的解析准确度
- 首轮召回可用率
- refine 后结果改善率
- 条件透明度与可解释性
- 对老用户路径的负面影响

建议基准集：

- 使用现有 `AI_Search_User_Study` 样本构造 benchmark
- 覆盖：
  - 地区 + 类目 + 粉丝量
  - 活跃度 / 调性 / 排除条件
  - 混合输入
  - 敏感需求
  - URL 成功识别 / 平台不匹配 / 无法识别 / URL+自然语言混合
  - 关键词输入态 / 完成态 / 多关键词 / 匹配目标切换 / 排除态

---

## 4. Technical Specifications

### 4.1 Architecture Overview

输入与状态流：

1. 用户在搜索框输入自然语言 / 关键词 / URL / 混合输入
2. 系统解析为 `Input Intent`
3. 系统生成 `Condition Graph`
4. 执行首轮搜索
5. 返回结果并进入 `results_ready`
6. 如必要，进入 `clarifying`
7. 用户回答追问或改条件后进入 `refining`

### 4.2 Integration Points

- 各平台频道搜索页
  - YouTube
  - Instagram
  - TikTok
  - X
- 现有搜索接口
- 现有筛选器状态管理
- 历史搜索 / 会话恢复能力

### 4.3 Security & Privacy

- 不记录超出搜索任务范围的长期个人记忆
- 对敏感行业需求给受限响应
- 历史 session 仅保留搜索任务上下文，不扩展为个人画像记忆

---

## 5. Visual Strategy

### 5.1 Why Local AI-ification

如果整页一起 AI 化，会破坏现有搜索页的专业工具心智；如果完全不 AI 化，用户又无法感知搜索能力已经升级。

因此采用：

- 搜索框外部保持原状
- 搜索框内部展开时进入智能模式

### 5.2 Expected Experience

- 首页看起来仍是 Nox 搜索页
- 输入一句自然语言后，搜索框在原位展开
- 展开后的内部组件更独立、更 AI 风格
- 用户觉得“这里突然变聪明了”，但页面其余部分仍然稳
- 如果用户只是输入关键词或 URL，则仍然保留原有搜索效率与轻量感

---

## 6. Risks & Mitigations

| 风险 | 描述 | 缓解 |
|---|---|---|
| 黑箱感 | 用户不知道系统到底怎么搜的 | 条件层持续可见，结果理由可解释 |
| 条件漂移 | AI 条件和手动筛选不同步 | 单一 Search Session 与双向同步规则 |
| 首轮结果质量不稳 | 自然语言起搜误判 | 先搜后追问 + benchmark 验证 |
| 搜索框内部信息过载 | 展开后太像复杂控制台 | 四层结构分级 + 一次只追问一个问题 |
| 与外部页面割裂过度 | 搜索框内部太“科幻”，外部太旧 | 控制局部材质差异，不改外部骨架 |
| 老用户效率下降 | 强行走 AI 流程 | 保持关键词 / URL / filters 路径不劣化 |
| URL 与自然语言混合歧义 | 用户不知当前按 URL 还是按描述在搜 | 明确优先级规则，并在搜索框内显式提示 |
| 软条件误导 | 用户误以为“高级感/性价比高”已被严格过滤 | 将软条件单独分组并标注为参考或待澄清 |

---

## 7. Phased Rollout

### MVP / v1

- 单平台页内统一交互模块可接入
- 自然语言首输
- 先搜后追问
- 条件层透明展示
- 零结果修正态
- 基础历史 session 恢复
- 关键词 / URL / 自然语言 / 混合输入四类兼容规则
- 搜索框展开 / 收起状态机

### v1.1

- 更丰富的派生规则
- 更好的结果解释
- 更精细的条件冲突处理

### v2.0

- 评估是否扩展到视频搜索
- 评估是否扩展到跨平台混搜
- 评估是否串联更后续的工作流动作
