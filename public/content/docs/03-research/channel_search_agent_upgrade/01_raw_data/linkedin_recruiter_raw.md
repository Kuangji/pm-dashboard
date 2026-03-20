# LinkedIn Recruiter · AI-Assisted Search 原始信息

采集时间：2026-03-19

## 来源

- Recruiter Help：<https://www.linkedin.com/help/recruiter/answer/a6509735>

## 核心事实

- LinkedIn 官方将 `AI-Assisted Search` 定义为 generative AI feature，允许用户 “stating what you need in your own words into a prompt box”
- 功能入口位于：
  - homepage
  - global search bar
  - project 中的 talent pool
- 官方流程说明包含：
  - 在 prompt box 中输入职位、地点、经验、技能、公司、行业等
  - 可以继续 ask question 来 refine or expand search
  - AI recommendations 会加入当前 search filters
  - 用户可点 `Qualifications` 编辑条件
  - 用户可点 `Show filters` 展开显式筛选器
  - 高级版本可基于 JD 或链接来 refine
  - 部分卡片会给 `AI summary` 解释为什么匹配

## 关键摘录

- LinkedIn 最关键的不是视觉，而是结构：
  - 自然语言入口
  - AI recommendations
  - current search filters
  - show filters
  - AI summary on cards
- 它把 AI 与手动 filters 设计成一个会话内协作关系，而不是两套系统

## 初步标注

- 🟢 亮点：最成熟的 `AI assisted search + manual filters` 并存范式
- 🟢 亮点：会把 AI recommendations 直接加进当前 filters
- 🟢 亮点：AI summary 解释结果匹配原因，降低黑箱感
- 🔴 问题：LinkedIn 存在左侧 AI pane，对 Nox 来说会分散搜索框注意力
- ❓ 待确认：用户在连续 refine 时，prompt box 与 filters 的优先级冲突如何处理

## 对 Nox 的启发

- 最值得借鉴的是状态统一和条件统一
- 不应照搬其独立 AI pane，应把同类能力压回搜索框容器内部
