# Decision Memo

## Recommendation

优先把 NoxInfluencer 的 AI 方向定位成：

> Creator marketing decision and operations copilot，围绕“选对人、控风险、可归因、可复盘”降低不确定性，而不是做一个无边界的全自动营销代理。

建议 P0 进入验证的三个机会：

1. Campaign Brief -> Creator Shortlist Agent
2. Creator Quality & Risk Copilot
3. Commerce ROI Attribution Hub

这三者共同形成一个更强的闭环：

> brief/目标 -> 搜索策略 -> shortlist -> 风险解释 -> 邀约/CRM -> 内容监控 -> GMV/ROI 复盘 -> 下一轮推荐

## Decision Context

- Decision question: NoxInfluencer should prioritize which SaaS or AI Agent opportunities in influencer marketing, especially needs that were previously infeasible but became viable in 2025-2026.
- Time horizon: 2026 H2 - 2027 H1
- Scope: influencer marketing SaaS、creator commerce、AI marketing agents、creator discovery/CRM/outreach/monitoring/ROI attribution
- Main constraints: 平台数据授权、AI 外部动作风险、FTC/平台合规、推荐可解释性、真实付费意愿

## Why Now

- 市场预算成熟：IAB、eMarketer、Influencer Marketing Hub 等来源都指向 creator/influencer spend 继续增长，且从试验性渠道转向核心预算项。
- 平台 rails 成熟：Shopify Collabs、TikTok Shop Affiliate、Amazon Creator Connections、Meta partnership ads 让 link/code/commission/commerce attribution 比过去更可做。
- AI 能力成熟：LLM、多模态和 agent workflow 足以处理 brief 解析、候选解释、内容摘要、邮件草稿和报告生成。
- 但风险也成熟：FTC disclosure、fake review rules、平台 API/授权限制和 agent governance 使“安全、可审计、人工批准”成为产品差异化。

## Options Considered

| Option | Summary | Upside | Downside | Evidence strength | Reversibility |
| --- | --- | --- | --- | --- | --- |
| Bigger creator database / more filters | 做更大的库和更多筛选项 | 容易理解，承接现有搜索 | 竞品拥挤，差异化弱 | Medium | High |
| Fully autonomous influencer marketing agent | 自动找人、触达、谈判、付款、复盘 | 叙事强，Demo 好看 | 高风险：错误触达、错误报价、付款/合规事故 | Weak to Medium | Medium |
| Brief -> Shortlist Agent | 从 brief 自动生成搜索策略和 shortlist | 直接解决搜索策略和筛选成本 | 需要可解释推荐 | Medium to High | High |
| Creator Quality & Risk Copilot | 判断假粉、内容匹配、争议和品牌安全 | 解决选错人/风险高的核心痛点 | 评分可信度要求高 | Medium to High | High |
| Commerce ROI Attribution Hub | 汇总 links/codes/commission/GMV/content 表现 | 对应预算化和老板复盘 | 数据接入边界复杂 | Medium to High | Medium |
| Outreach/contract copilot | 草拟邮件、brief、合同检查、提醒 | 节省运营时间 | spam/错误承诺/合规风险 | Medium | High |
| Creator portal / brand school | 创作者自助看 brief、提交交付、培训 | 长期关系管理 | 创作者侧 adoption 不确定 | Weak | Medium |

## Evidence Summary

| Claim | Evidence IDs | Strength | Notes |
| --- | --- | --- | --- |
| Creator/influencer spend 继续增长，预算化趋势明确 | E-001,E-002,E-003 | Medium-High | 行业报告有乐观偏差，但多源一致 |
| 竞品正从数据库工具转向 workflow/AI/ROI/governance | E-004,E-005,E-006,E-007,E-008,E-009 | Medium | 多为官网/press release，需要真实体验补证 |
| 用户痛点集中在 labor intensive、选人、报价、交付、ROI、假粉风险 | E-010,E-011,E-012 | Medium | 一线证据有样本偏差，但方向清晰 |
| Shopify/Amazon/Meta 等平台让 creator commerce 与归因更可做 | E-013,E-014,E-015,E-016 | High | 官方平台资料，仍需验证 API/区域/账号限制 |
| Agentic AI 有窗口，但治理和价值证明是核心风险 | E-017,E-018,E-019 | Medium-High | 非 influencer-specific，但适合约束产品边界 |
| 合规必须进入工作流，而非事后提醒 | E-020 | High | FTC 证据强，但需补不同市场规则 |

## Key Risks and Counterarguments

- 平台官方工具会吃掉 creator commerce 的部分空间，Nox 不能做平台 dashboard wrapper。
- 竞品都在讲 AI，Nox 需要靠数据/工作流/跨境场景/可解释性差异化。
- 用户可能要的是代理服务，不是 SaaS；必须验证是否愿意自助使用。
- ROI 归因容易过度承诺，应先做弱归因和可解释复盘。
- 自动化触达/谈判/付款必须先过权限、审批、合规、审计。

## Assumptions to Validate

| Assumption | Validation method | Owner | Deadline | Kill criteria |
| --- | --- | --- | --- | --- |
| 用户愿意让 AI 从 brief 生成 shortlist | 5 个历史 campaign brief 离线对照 | PM/AI | 2 周 | AI shortlist 保留率不高于普通搜索 |
| 风险摘要能减少人工审核时间且可被信任 | 30-50 个 creator 人审标签对照 | PM/数据 | 3 周 | 误判高或解释不可用 |
| 至少一个 commerce 数据源可形成复盘闭环 | 选 Shopify/TikTok Shop 客户做数据接入预研 | PM/后端 | 4 周 | 数据不可接或只剩 vanity metrics |
| 销售能讲清楚 P0 价值并形成付费理由 | Sales/CS 概念测试 | PM/业务 | 2 周 | 客户听完仍认为只是“搜索增强” |

## Next Experiments

1. 选 5 个历史 campaign brief，离线生成 shortlist，与真实人工名单对比。
2. 选 30-50 个 creator，做人审风险标签，评估 AI 风险摘要准确性。
3. 找一个 Shopify/TikTok Shop 用户，跑 links/codes/commission/内容监控的最小闭环。
4. 对销售/CS 做概念测试：这三个 P0 机会是否能讲清楚、是否有付费理由。

## Appendix

- Evidence database: `evidence/evidence_cards.jsonl`
- Competitor matrix: `competitors/matrix.csv`
- 10-round log: `10_round_research_log.md`
- Opportunity scoring: `synthesis/opportunity_scoring.md`
- Research gaps: `synthesis/research_gaps.md`
