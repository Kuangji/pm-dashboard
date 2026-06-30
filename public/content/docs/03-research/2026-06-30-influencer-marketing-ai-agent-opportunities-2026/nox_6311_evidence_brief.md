# Nox 6311 营销简报到候选名单证据简报

> 更新时间：2026-06-30  
> 结论用途：修正本次调研中“营销简报到达人候选名单智能体”的 Nox 内部落地口径。

## 结论

“营销简报到达人候选名单智能体”对 Nox 来说不是一个从 0 到 1 的新机会，而是已经有落地路径、且正在通过 `v6.3.11` 补齐连接层的能力。

更准确的内部口径是：

> **智能营销计划候选达人生成 Agent**：消费创建 Campaign 与 AI 营销计划生成阶段已经沉淀的 brief/plan 理解结果，自动生成搜索策略，执行搜索与智能精选，产出可解释、可编辑、可提交到待邀约池的候选达人名单。

因此，`v6.3.11` 不应重新做“brief 获取和理解”，而应把已有 `campaignId` 上下文接入搜索/智能精选：

```text
创建 Campaign
-> 生成 AI 营销计划
-> 读取 brief/plan 上下文
-> 自动生成搜索策略
-> 自动搜索与智能精选
-> 候选名单暂存
-> 用户确认加入待邀约池
-> 邮件邀约 / 谈判 / 合作 / 分析
```

## 关键边界

| 问题 | 判断 |
|---|---|
| 是否属于 `v6.3.10`？ | 不是。`v6.3.10` 只覆盖独立频道搜索页的智能精选。 |
| 是否属于 `v6.3.11`？ | 是。`v6.3.11` 负责把 6310 的搜索/智能精选心智适配进智能营销计划。 |
| 是否从零解析 brief？ | 不应从零开始。创建 Campaign 与 AI 营销计划生成已经承担 brief 获取和理解。 |
| 6311 的核心动作是什么？ | 消费已有 brief/plan 结果，自动生成搜索策略并执行搜索/精选。 |
| 候选名单是否直接变成资产？ | 不是。搜索和精选仍是暂存态；用户点击加入待邀约池后才是持久化决策。 |
| 终点在哪里？ | 候选达人暂存名单和“加入待邀约池”动作，不包含自动发送邀约。 |

## 证据摘要

### 1. 创建 Campaign 已经收集 brief 原料

`components/campaign/create/index.vue` 的创建流程先走 `BaseForm`、再走 `DetailForm`，最后调用 `createComplete` 并跳转到 Campaign 管理页。

`BaseForm` 收集任务名称、商品链接、品牌、商品名称、服务类型、价格、标签、商品描述、商品图片等产品 brief 原料。

`DetailForm` 收集目标地区、目标语言、平台、内容形式要求、样品要求、目标合作人数、粉丝量级、平均播放量、预算和预计曝光等投放约束。

### 2. AI 营销计划已经承担 brief/plan 理解

`components/campaign/manage/ai/aiMissionDialog.vue` 通过 `/api/v2/ai-common` 发送：

```json
{
  "aiCommonAction": "campaignPlan",
  "campaignId": "<campaignId>",
  "subSite": "<subDomain>"
}
```

服务端白名单把 `campaignPlan` 映射到 `/ws/campaign2/ai/plan`。

前端解析的结构化节点包括：

- `campaign_summary`
- `effects`
- `tier_strategy`
- `creative`
- `allocation`
- `timeline`

这说明系统已经有一段基于 `campaignId` 的营销计划理解结果，而不是只有搜索页输入。

### 3. 管理页结构证明搜索位于计划理解之后

`pages/campaign/manage/_campaignId.vue` 中，管理页加载 `projectBasicInfo`、`inviteBasicInfo` 和 AI 谈判状态；页面主 tab 包含：

- `SearchTab`
- `InviteTab`
- `InviteDetailTab`
- `CooperationTab`
- `AnalysisTab`

`AiMissionDialog` 也挂在同一个 Campaign 管理页下。也就是说搜索不是链路起点，而是已创建 Campaign 之后的执行环节。

### 4. 当前搜索已经消费 Campaign 上下文

`commonSearch.vue` 与 `aiSearch.vue` 都会把项目目标同步进搜索筛选条件，例如：

- `targetCountry -> country`
- `targetLanguage -> language`
- `estFollowersMin/Max -> followerGte/Lte`
- `estAvgViewsPerKolMin/Max -> avgViewGte/Lte`

这说明智能营销计划内的搜索已经不是独立搜索，而是 campaign context 下的搜索。

### 5. 6310 和 6311 的边界已经明确

`search_experience_6310/README.md` 与 `kol_brain` 的 M01 知识页都明确：

- `v6.3.10` 只覆盖独立频道搜索页。
- 智能营销计划内的频道搜索入口、候选池和上下游状态，进入 `v6.3.11` 单独适配。

因此，6311 的合理落点是把 6310 的“结果快照 + 智能精选 + 临时 session”心智接入智能营销计划，而不是复刻一个独立搜索页。

### 6. 待邀约池是持久化边界

搜索/精选结果加入待邀约池时，会通过 `insertRecipienFromSource` 写入 `emailProjectId` 关联的收件人列表。待邀约列表获取时固定 `status: 11`，对应未发送收件人。

这说明：

- 搜索和精选是临时决策前状态。
- 加入待邀约池才是用户确认后的持久化决策。
- 6311 需要保留这个边界，不能把 AI 候选名单直接自动写入待邀约池。

## 对本次调研结论的修正

原调研中的机会名“营销简报到达人候选名单智能体”仍成立，但在 Nox 内部应改为“已启动能力的闭环化”，不是“全新机会”。

建议在 Roadmap / PRD 中使用以下表述：

> `v6.3.11` 的目标是将智能营销计划已有的 brief/plan 理解结果，连接到自动搜索与智能精选能力，生成可解释、可编辑、可提交的候选达人名单。它的价值不是重新理解 brief，而是把已经生成的营销计划转化为可执行的选人动作。

## 产品含义

| 产品问题 | 建议处理 |
|---|---|
| 是否保留“自动”？ | 保留，但限定为自动生成搜索策略、自动搜索、自动精选。 |
| 是否自动加入待邀约池？ | 不自动。必须用户确认。 |
| 是否要求用户再填一遍 brief？ | 不要求。默认读取 Campaign 与 AI 营销计划上下文，只允许用户微调策略。 |
| 是否沿用 6310 结果页心智？ | 是，但要接入 Campaign 状态、候选暂存和待邀约池。 |
| 是否作为 P0 机会继续验证？ | 是，但验证重点从“用户愿不愿从 brief 开始”改为“已有 plan 上下文自动搜索/精选是否比手动搜索更高效、更可信”。 |

