# Research Pack: 2026-06-30-influencer-marketing-ai-agent-opportunities-2026


---

## 00_brief.md

# Research Brief

## Decision

- Decision question: NoxInfluencer should prioritize which SaaS or AI Agent opportunities in influencer marketing, especially needs that were previously infeasible but became viable in 2025-2026.
- Decision owner: 产品负责人 / NoxInfluencer roadmap owner
- Deadline: 2026-06-30 初版调研结论
- Intended audience: PM、业务负责人、AI/数据/前端协作团队
- Decision type: prioritize / position / build

## Scope

- Target users: 跨境电商品牌、DTC 品牌、代理商、MCN/达人运营团队、网红营销执行团队
- Geography: 以北美/全球英文市场为主，兼顾中国出海品牌的使用场景
- Product/category: influencer marketing SaaS、creator commerce、AI marketing agents、creator discovery/CRM/outreach/monitoring/ROI attribution
- Time horizon: 2026 H2 - 2027 H1 可验证/可落地机会
- Included competitors: CreatorIQ, GRIN, Upfluence, Modash, Traackr, Later/Mavrck, Captiv8, Shopify Collabs, TikTok Shop Affiliate, Amazon Creator Connections, ShopMy
- Excluded areas: 纯虚拟网红制作、泛社媒排程工具、纯广告投放平台、与 Nox 主链路无关的创作者个人变现工具

## Success Criteria

- What a good answer must decide: 哪些机会值得 Nox 优先做，为什么现在条件比过去成熟，第一步 MVP 应验证什么
- Minimum evidence bar: 每个 P0/P1 机会至少有 2 类来源支撑，包括行业数据、竞品动作、一线用户痛点或平台官方能力
- Required outputs: 调研计划、10 轮研究日志、每轮 red team、机会地图、用户诉求、竞品/平台信号、优先级与验证实验
- Constraints: 不把“AI 能做”直接等同于“用户会买”；区分自动化、半自动、辅助决策；尊重平台 API / 合规 / 授权边界

## Initial Assumptions

| ID | Assumption | Why it matters | Current confidence |
| --- | --- | --- | --- |
| A-001 | influencer marketing 已从试验性渠道变成可预算化的增长基础设施 | 决定 SaaS 是否还有扩张空间 | Medium |
| A-002 | 真实痛点不在单点找人，而在“选对人、降低执行成本、证明 ROI” | 决定产品机会应沿完整工作流设计 | High |
| A-003 | AI Agent 的窗口在“半自动编排 + 人类批准”，不是无监督全自动 | 决定是否能落地智能营销计划类能力 | Medium |
| A-004 | TikTok Shop、Shopify Collabs、Amazon Creator Connections 等 commerce rails 让归因和支付更可闭环 | 决定 Nox 是否应强化 affiliate / GMV / 商品协同 | Medium |
| A-005 | 合规、平台数据限制和创作者真实性会限制纯自动化 | 决定哪些需求应做治理层而非魔法按钮 | High |

## Stakeholder Questions

| Question | Owner | Must answer? |
| --- | --- | --- |
| 哪些机会与 Nox 现有“搜索 -> CRM/触达 -> 监控 -> 支付/治理”主链路最契合？ | PM | Yes |
| 哪些需求过去不可行，但因为 LLM、多模态、平台 commerce/affiliate 基础设施、数据集成成熟而变得可做？ | PM/AI | Yes |
| 哪些机会看起来热但应暂缓，因为证据弱、合规风险高或被平台内建能力挤压？ | PM/业务 | Yes |


---

## 01_hypotheses.md

# Hypothesis Map

| ID | Theme | Hypothesis | Decision impact | Uncertainty | Evidence needed | Status |
| --- | --- | --- | --- | --- | --- | --- |
| H-001 | Market | Creator/influencer marketing spend is still growing and becoming a core budget line. | high | medium | Market spend reports, ad industry data, platform signals | supported |
| H-002 | User | The most valuable unmet needs are workflow uncertainty reduction: selecting creators, avoiding risk, proving ROI. | high | medium | Community pains, reviews, customer interviews | supported_directionally |
| H-003 | Competitor | Leading platforms are converging on workflow, AI, measurement, and commerce rather than pure search. | medium | medium | Product pages, launches, pricing, demos | supported |
| H-004 | Commercial | Brands will pay more for ROI accountability and execution efficiency than for another generic database. | high | high | Pricing tests, sales calls, concept tests | open |
| H-005 | Distribution | Nox can win by extending its existing search -> CRM/outreach -> monitoring -> payment/governance chain. | high | medium | Internal product fit, user workflow mapping | supported_by_internal_context |
| H-006 | Feasibility | Bounded AI agents are feasible in brief parsing, shortlist generation, risk summaries, reports, and approved drafts. | medium | medium | Prototype tests, data availability, human review results | supported_with_caution |
| H-007 | Risk | Unbounded automation will create platform, compliance, trust, and brand safety risks. | high | medium | FTC/platform rules, AI governance reports, user trust tests | supported |

## Priority Questions

1. Which P0 opportunity creates measurable user value fastest: shortlist, risk, or ROI?
2. Which commerce data sources are actually accessible for Nox target customers?
3. What level of automation do users trust before requiring manual approval?

## Kill Criteria

- Users do not prefer AI-generated shortlist over normal search results in real campaign tasks.
- Creator risk summaries cannot be explained with evidence.
- Commerce attribution cannot connect to real platform/link/code/order data and becomes vanity reporting only.
- Users or sales perceive the product as “just AI search” rather than a broader operating workflow.


---

## 02_source_plan.md

# Source Plan

## Source Priorities

| Priority | Source | Source tier | Questions answered | Freshness target | Tool/path |
| --- | --- | --- | --- | --- | --- |
| 1 | Official product/pricing/docs | A | Competitor claims, packaging, positioning, platform capabilities | current | web |
| 2 | Platform docs: Shopify, Amazon, Meta, TikTok Shop | A | Commerce/affiliate rails, tracking, payment, API/permission constraints | current | web |
| 3 | Regulator docs: FTC, EU/UK guidance | A | Disclosure, fake reviews/testimonials, compliance boundaries | current | web |
| 4 | Forums / communities / social | B/C | Workarounds, language, emerging complaints, first-hand pain | last 24 months | web |
| 5 | Analyst/media/industry reports | B/C | Market context, spend trend, adoption trend | last 24 months | web |
| 6 | Nox internal workspace context | A internal | Fit with existing product chain and module boundaries | current local docs | local files |

## Search Queries Used

| Query | Purpose | Status |
| --- | --- | --- |
| 2025 influencer marketing benchmark report market size AI influencer marketing budget ROI challenges | Market sizing and AI adoption | done |
| IAB creator economy ad spend report 2025 influencer marketing | Budget trend triangulation | done |
| CreatorIQ AI creator marketing platform features pricing 2026 | Enterprise competitor positioning | done |
| GRIN influencer marketing platform Shopify ROI pricing | Ecommerce workflow benchmark | done |
| Upfluence Jaice AI automated influencer marketing ROI | Agentic competitor signal | done |
| Modash pricing influencer discovery fake followers Shopify | Mid-market discovery benchmark | done |
| reddit influencer marketing ROI attribution fake followers platform pain points | First-hand pain points | done |
| Shopify Collabs official affiliate links discount codes commission payouts | Commerce rail feasibility | done |
| Amazon Creator Connections official brands creators affiliate | Commerce rail feasibility | done |
| Meta Instagram creator marketplace partnership ads official | Paid amplification/platform-native collaboration | done |
| FTC social media influencers disclosure fake reviews testimonials official | Compliance constraints | done |
| McKinsey Salesforce Gartner agentic AI marketing report 2025 2026 | AI Agent maturity and risk | done |

## Data Collection Notes

- Primary source gaps: TikTok Shop official seller/affiliate API details require deeper account-context validation; public sources are enough for trend, not enough for implementation design.
- Sources requiring caution: competitor product pages and press releases likely overstate actual AI autonomy and ROI accuracy.
- Sources not used and why: generic SEO “best influencer tools” pages were treated as leads only, not decision-grade evidence.


---

## users/insight_cards.md

# 用户诉求 / JTBD Insight Cards

## Insight 1：我不是不会找达人，是不知道怎样把营销目标翻译成搜索条件

- 用户：DTC/跨境品牌 marketer、代理商执行
- 情境：新品、类目、地区、预算确定，但不知道该搜哪些关键词、标签、语言和竞品参考
- 当前 workaround：手搜、看竞品、问同事、复制历史名单、买平台名单
- 未满足诉求：从已有 campaign brief/plan 理解结果自动得到可解释的搜索策略和候选池
- 对应机会：Smart Marketing Plan -> Creator Candidate Agent
- 成熟条件：LLM 语义解析、多语言扩词、Nox 已有智能营销计划、搜索、6310 智能精选和待邀约池基础

## Insight 2：我最怕选错人，不是怕少一个筛选项

- 用户：品牌方、代理商、投放负责人
- 情境：creator 看起来数据好，但可能买粉、内容不稳定、商业合作过多、价格虚高、历史争议
- 当前 workaround：人工翻内容、看评论、用 fake follower 工具、问同行
- 未满足诉求：质量/风险判断要有证据链，不能只有黑盒分数
- 对应机会：Creator Quality & Risk Copilot
- 成熟条件：多模态内容理解、历史监控、争议网红/CRM 数据、异常互动检测

## Insight 3：我愿意投 creator，但老板要问钱花到哪里了

- 用户：营销负责人、老板、财务/增长团队
- 情境：creator campaign 越来越像正式预算项，需要和 paid ads / affiliate / social commerce 一起复盘
- 当前 workaround：Excel 拼链接、折扣码、平台后台截图、手工报告
- 未满足诉求：跨平台、跨内容、跨 creator 的 ROI/GMV/commission 解释层
- 对应机会：Commerce ROI Attribution Hub
- 成熟条件：Shopify Collabs、TikTok Shop、Amazon Creator Connections、Meta partnership ads 等平台内 commerce rails 成熟

## Insight 4：内容不止是交付物，也是可复用广告资产

- 用户：增长团队、内容团队、代理商
- 情境：UGC/creator post 可以二次投放、授权、复用，但不知道哪条内容值得放大
- 当前 workaround：看播放/互动、凭感觉挑素材、广告团队再测一轮
- 未满足诉求：监控内容表现，并给出可复投/可授权/可延展创意建议
- 对应机会：Content Monitoring -> Paid Amplification Recommender
- 成熟条件：creator content paid amplification 增长、多模态内容理解、Nox 内容监控/创意榜单基础

## Insight 5：我想自动化，但不敢让 AI 擅自代表品牌说话或付款

- 用户：品牌方、代理商、企业客户
- 情境：outreach、谈判、brief、合同、付款都很耗时，但错误承诺/违规披露/错误付款后果严重
- 当前 workaround：模板邮件、人工审批、法务 checklist、手动追踪
- 未满足诉求：AI 先准备、检查、提醒和草拟；关键外部动作必须人工批准
- 对应机会：Outreach / Negotiation / Contract Copilot + Compliance Guardrails
- 成熟条件：LLM 文案/检索能力成熟，监管与平台规则迫使系统化 guardrails


---

## synthesis/opportunity_tree.md

# Opportunity Solution Tree

## Desired Outcome

帮助跨境品牌和代理商在网红营销中更快、更可信地完成：

> 从已有 campaign brief/plan 理解结果到可邀约名单，再到风险判断、执行监控和 ROI 复盘。

## Opportunities

| ID | Opportunity | Segment | Evidence IDs | Confidence | Importance |
| --- | --- | --- | --- | --- | --- |
| O-001 | Smart Marketing Plan -> Creator Candidate Agent | DTC/跨境品牌、代理商执行 | E-004,E-009,E-010,E-017 | Medium-High | P0 |
| O-002 | Creator Quality & Risk Copilot | 品牌、代理商、企业客户 | E-010,E-012,E-020 | Medium-High | P0 |
| O-003 | Commerce ROI Attribution Hub | DTC、电商、增长团队 | E-002,E-003,E-013,E-014,E-015,E-016 | High | P0 |
| O-004 | Content Monitoring -> Paid Amplification Recommender | 增长团队、内容团队 | E-002,E-003,E-016 | Medium | P1 |
| O-005 | Outreach / Negotiation / Contract Copilot | 网红运营、代理商执行 | E-007,E-008,E-010,E-020 | Medium | P1 |
| O-006 | Affiliate Program Ops Layer | Shopify/TikTok/Amazon 商家 | E-011,E-013,E-014,E-015 | Medium | P1 |

## Solution Ideas

| Opportunity ID | Solution | Assumptions | Experiment | Effort |
| --- | --- | --- | --- | --- |
| O-001 | Consume existing campaign brief/plan context, generate search strategy, auto-search, auto-curate candidate shortlist with explanation | 用户愿意让系统把已有营销计划转成搜索与精选动作，而非手动填筛选项 | 5 个历史智能营销计划离线对照 | Medium |
| O-002 | Creator risk card with evidence snippets and review status | 风险证据比黑盒分数更可信 | 30-50 个 creator 人审对照 | Medium |
| O-003 | ROI hub combining short links, codes, commissions, content monitoring | 至少一个 commerce 数据源可稳定接入 | Shopify/TikTok Shop 最小闭环 spike | High |
| O-004 | Content performance summary + paid amplification recommendation | 用户会把 creator content 当可复用资产 | 选历史监控内容生成复投建议并人工评审 | Medium |
| O-005 | Outreach/brief/contract drafting with approval gates | 用户接受 AI 草稿但不接受自动外发 | 可点击原型 + operator interview | Low-Medium |
| O-006 | Affiliate link/code/commission exception monitor | 商家痛点在异常和跨平台汇总 | 用一个客户样本复盘 links/codes/commission | Medium |

## Risks

- ROI 归因容易过度承诺，MVP 必须明确直接归因、辅助影响和弱归因。
- AI shortlist 若不可解释，会被视作普通排序或黑盒榜单。
- 外部动作自动化必须受审批、权限和审计日志约束。
- 平台原生工具会吃掉一部分 workflow，Nox 需要证明跨平台和前置决策价值。


---

## synthesis/opportunity_scoring.md

# 机会评分

评分维度：市场/预算趋势 20%，用户痛点 25%，Nox 契合度 25%，近期成熟度 20%，竞争/风险反向 10%。5 分最高。

| Rank | 机会点 | 市场 | 痛点 | 契合 | 成熟 | 风险反向 | 加权分 | 建议 |
|---:|---|---:|---:|---:|---:|---:|---:|---|
| 1 | Smart Marketing Plan -> Creator Candidate Agent | 4 | 5 | 5 | 4 | 3 | 4.45 | P0 立刻验证 |
| 2 | Creator Quality & Risk Copilot | 4 | 5 | 5 | 4 | 3 | 4.45 | P0 立刻验证 |
| 3 | Commerce ROI Attribution Hub | 5 | 5 | 4 | 4 | 2 | 4.35 | P0 先做可接平台/弱归因 |
| 4 | Content Monitoring -> Paid Amplification Recommender | 5 | 4 | 5 | 3 | 2 | 4.05 | P1 与监控/创意榜单合并验证 |
| 5 | Outreach / Negotiation / Contract Copilot | 4 | 4 | 4 | 4 | 2 | 3.80 | P1 只做 human-approved copilot |
| 6 | Affiliate Program Ops Layer | 4 | 4 | 4 | 4 | 2 | 3.80 | P1 避免硬刚平台内建 |
| 7 | AI Report Builder for Marketing Reviews | 3 | 3 | 4 | 5 | 3 | 3.55 | P2 作为监控/归因附属能力 |
| 8 | Creator Portal / Brand School | 3 | 3 | 3 | 3 | 3 | 3.00 | P2 等 CRM/任务侧更成熟 |

## P0 机会的 MVP 形态

### 1. Smart Marketing Plan -> Creator Candidate Agent

输入：已有 Campaign brief/plan 上下文，包括商品、目标地区、语言、平台、内容要求、预算、目标人数、AI 营销计划中的 campaign summary、达人分层画像、创意策略、预算分配和时间线。

输出：
- 搜索策略：关键词、标签、语言、平台、筛选条件、排除词。
- 自动搜索结果快照。
- creator candidate shortlist：每个候选人的推荐理由、风险、价格/合作建议、适合内容形态。
- 可编辑的“加入待邀约池/CRM/邮件项目”动作，且必须由用户确认。

验证指标：
- 用户从已生成营销计划到首批可邀约名单的时间下降 50%+。
- 用户愿意保留/邀约的推荐比例高于普通搜索列表。
- 推荐解释被用户认为可信，而非只看分数。

### 2. Creator Quality & Risk Copilot

输入：候选 creator 主页、历史内容、受众/互动、争议记录、品牌安全规则、合作历史。

输出：
- 质量/风险摘要：受众匹配、互动异常、内容一致性、商业合作密度、争议风险。
- 证据链：哪些数据/内容支持判断。
- 决策建议：可邀约 / 需人工复核 / 不建议。

验证指标：
- 人工审核时间下降。
- 误杀/漏判在可接受范围内。
- 销售/客户成功能把风险解释给客户。

### 3. Commerce ROI Attribution Hub

输入：短链/UTM、Shopify Collabs、TikTok Shop、Amazon Creator Connections、Meta partnership ads、站内内容监控。

输出：
- creator/content/product 维度 ROI/GMV/commission/return rate。
- 弱归因说明：直接转化、辅助影响、内容曝光、异常归因。
- 下一步建议：加佣、复投、停投、复邀、扩展相似 creator。

验证指标：
- 用户能用它做预算复盘。
- 至少接入 1-2 个高频平台形成闭环。
- 报告可解释“为什么建议复投/停投”。


---

## synthesis/contradictions.md

# Contradictions

## C1：行业报告说 AI 自动化程度会很高，但 Gartner/McKinsey 强调 agent 治理和规模化困难

解释：AI 的成熟不等于无监督自动化成熟。对 Nox 的含义是先做 bounded, human-approved workflows，而不是全自动营销代理。

## C2：平台 commerce rails 成熟，同时也可能挤压第三方 SaaS 空间

解释：Shopify/TikTok/Amazon/Meta 能做平台内链接、佣金和交易闭环，但品牌仍有跨平台、前置选人、复盘和治理需求。Nox 机会在解释层和操作层，不在替代平台原生后台。

## C3：用户想省事，但又不愿让 AI 擅自触达、报价或付款

解释：真实需求不是“越自动越好”，而是“AI 准备得更快，人批准得更有把握”。这会影响智能营销计划、邮件、消息、支付等模块的权限设计。

## C4：竞品都讲 end-to-end，但用户仍抱怨 labor intensive

解释：一体化包装不等于一线工作流被真正打通。Nox 可以用现有搜索、CRM、邮件、监控、支付链路做更贴近执行的操作系统，但必须验证体验而不是只做模块堆叠。


---

## synthesis/research_gaps.md

# Research Gaps

## G1：真实 Nox 用户的 willingness-to-pay 未验证

当前证据能证明痛点存在，但还不能证明用户愿意为 Nox 的新模块或新套餐付费。下一步需要 sales/CS 概念测试和历史客户访谈。

## G2：平台数据接入边界未验证

Shopify Collabs、TikTok Shop、Amazon Creator Connections、Meta partnership ads 的官方能力说明了 commerce rails 成熟，但 Nox 能否稳定接入、在目标地区/账号类型下可用、是否允许归因汇总，仍需技术预研。

## G3：竞品真实体验缺少 hands-on benchmark

本轮主要使用官网、press release、公开定价与社区讨论。要判断差异化，需要后续注册/演示 CreatorIQ、GRIN、Upfluence、Modash 等产品，验证 AI/ROI/workflow 是否真闭环。

## G4：AI 推荐质量缺少离线评测

P0 机会依赖 shortlist/risk summary 的可信度。需要用历史智能营销计划、人工名单、真实 creator 样本做离线评测。

## G5：区域与合规差异未展开

本轮以北美/英文市场为主。若面向欧盟、英国、中国出海品牌、东南亚 TikTok Shop，需要补充当地 disclosure、隐私、平台政策与支付/税务边界。


---

## decision/options.md

# Options

| Option | Summary | Why consider it | Main weakness | Recommendation |
| --- | --- | --- | --- | --- |
| A. Bigger creator database / more filters | 继续扩大达人库和筛选项 | 承接现有搜索心智，易销售 | 竞品拥挤，不能解决 brief、风险、ROI 的完整问题 | 不作为主方向，只作为底层能力 |
| B. Fully autonomous influencer marketing agent | 自动找人、触达、谈判、付款、复盘 | AI 叙事强，Demo 容易吸引注意 | 品牌安全、合规、付款和承诺风险过高 | 暂缓，拆成 bounded copilot |
| C. Smart Marketing Plan -> Creator Candidate Agent | 从已有 brief/plan 理解结果生成搜索策略、搜索结果快照和候选名单 | 直接解决用户“不知道怎么搜/筛不动”的痛点，并连接智能营销计划上下游 | 推荐必须可解释、可编辑，且不能自动写入待邀约池 | P0 |
| D. Creator Quality & Risk Copilot | 解释 creator 是否靠谱、匹配、异常、争议 | 对应假粉、买互动、品牌安全和价格不确定性 | 数据不足时容易误判 | P0 |
| E. Commerce ROI Attribution Hub | 聚合 links/codes/commission/GMV/content 表现 | 平台 commerce rails 成熟，预算复盘需求强 | 数据接入边界复杂 | P0 先做最小闭环 |
| F. Outreach / Negotiation / Contract Copilot | 草拟邮件、brief、报价、合同检查和追踪提醒 | 运营工作量大，AI 可明显省时 | 自动外发/承诺风险高 | P1，human-approved |
| G. Creator Portal / Brand School | 给创作者自助查看 brief、交付、规范和付款 | 长期可提升关系管理 | 创作者侧 adoption 不确定 | P2 |

## 推荐组合

优先组合 C + D + E：先把“选谁、为什么、投后结果如何”闭环打通。F 作为执行层增强，不应抢在 C/D/E 之前变成全自动触达。


---

## decision/red_team.md

# Red Team Review

## Strongest Recommendation Under Attack

最强建议是优先做：
1. Smart Marketing Plan -> Creator Candidate Agent
2. Creator Quality & Risk Copilot
3. Commerce ROI Attribution Hub

## Failure Modes

| Failure mode | Why it could happen | Evidence gap | Mitigation |
| --- | --- | --- | --- |
| 用户不相信 AI 推荐 | shortlist 只是给分和排序，像另一个黑盒榜单 | 缺少真实用户对推荐解释的信任测试 | 每个推荐必须展示搜索策略、触发证据、风险证据、排除原因，并允许用户修改 brief/权重后重算 |
| ROI Hub 变成半残 dashboard | Shopify/TikTok/Amazon/Meta 的数据权限、区域差异、API 稳定性可能导致归因链路无法闭环 | 尚未验证 Nox 目标客户最常用平台的数据接入可行性 | 先做“可接数据源清单 + 弱归因声明”，MVP 不承诺全平台精准归因 |
| Agent 自动化制造品牌风险 | 自动发邮件、自动承诺报价、自动确认付款、自动修改 affiliate terms 都可能造成事故 | 缺少对外部动作的权限/审批设计 | P0 只做 human-approved copilot；外部动作必须有审批、审计日志、撤销/暂停机制 |
| 竞品很快复制 AI shortlist | CreatorIQ/Upfluence/GRIN 都已有 AI 叙事，功能层面容易被复制 | 差异化是否足够依赖 Nox 数据与工作流尚未验证 | 差异化放在跨平台数据、搜索/CRM/监控/支付链路、争议风险和跨境品牌语境 |
| 治理能力卡在 SMB 与企业之间 | 小客户嫌重，大客户嫌浅 | 缺少分层 packaging 验证 | SMB 打包为避坑 checklist；企业打包为 policy templates、approval workflow、audit trail、team permissions |

## Bias and Validity Checks

- Sample bias: Reddit 证据偏抱怨和早期用户，不代表所有大客户。
- Outdated source risk: 平台 API、TikTok Shop/Shopify/Amazon creator commerce 能力变化快，需要每次进入 spec 前刷新。
- Competitor blind spots: 官网与 press release 可能夸大 AI/ROI 能力，需后续用真实 demo/G2/客户案例补证。
- Market sizing risk: 行业报告有推动市场乐观叙事的激励，不能独立支撑投入。
- Willingness-to-pay risk: “痛”不等于“愿意为 Nox 新模块付费”。
- Distribution risk: 如果用户习惯留在 Shopify/TikTok/Amazon 原生后台，Nox 必须证明跨平台层价值。
- Implementation risk: 评分和归因若不可解释，会被用户当作噪音。

## What Would Change the Recommendation

提高信心：
- 现有 Nox 用户明确愿意为“已有营销计划到 shortlist”节省时间付费。
- 用户在真实任务中保留/邀约 AI shortlist 的比例显著高于普通搜索。
- 至少一个 commerce 数据源能稳定接入并生成可复盘 ROI 报告。

降低信心：
- 用户更愿意直接使用 Shopify/TikTok/Amazon 平台内工具，不需要跨平台层。
- 推荐结果解释成本高，反而拖慢决策。
- 平台 API/授权限制使核心数据长期不可得。


---

## decision/experiment_plan.md

# Experiment Plan

| ID | Assumption | Experiment | Method | Success metric | Minimum sample | Duration | Decision rule |
| --- | --- | --- | --- | --- | --- | --- | --- |
| X-001 | 用户愿意让 AI 消费已有 brief/plan 理解结果生成 shortlist | 用历史智能营销计划离线生成搜索策略和 shortlist，与人工名单和普通搜索结果对比 | prototype / concierge | AI shortlist 保留率高于普通搜索 20%+，且用户认为推荐理由可信 | 5 个历史智能营销计划, 50-100 creators | 2 weeks | 达标则进入 6311 交互原型；不达标则先做搜索策略助手 |
| X-002 | 风险摘要能减少人工审核成本 | 对 30-50 个 creator 生成质量/风险摘要，与人工标签对比 | offline eval / expert review | 人工审核时间下降 30%+，高风险漏判率可接受 | 30-50 creators | 3 weeks | 漏判严重则暂不做自动评分，只做证据聚合 |
| X-003 | Commerce ROI Hub 有可接入的最小闭环 | 接入短链/UTM + Shopify 或 TikTok Shop 的一个真实客户样本 | technical spike / pilot | 可按 creator/content/product 输出 GMV/commission/ROI 报告 | 1-2 customers | 4 weeks | 若只能拿到 vanity metrics，降级为监控报告附属能力 |
| X-004 | Sales/CS 能讲清 P0 价值 | 用一页概念稿访谈 sales/CS 和 5 个客户/潜客 | concept test | 70%+ 受访者能复述价值并指出愿付费场景 | 8-10 interviews | 2 weeks | 如果被理解成普通搜索增强，重写定位 |
| X-005 | Human-approved agent 能降低执行风险 | 设计邮件/brief/合同草稿 + 审批流原型 | prototype | 用户愿意让系统生成草稿但保留人工批准 | 5 operators | 2 weeks | 若用户仍担心品牌风险，先做 checklist/提醒，不做发送动作 |


---

## decision/decision_memo.md

# Decision Memo

## Recommendation

优先把 NoxInfluencer 的 AI 方向定位成：

> Creator marketing decision and operations copilot，围绕“选对人、控风险、可归因、可复盘”降低不确定性，而不是做一个无边界的全自动营销代理。

建议 P0 进入验证的三个机会：

1. Smart Marketing Plan -> Creator Candidate Agent
2. Creator Quality & Risk Copilot
3. Commerce ROI Attribution Hub

这三者共同形成一个更强的闭环：

> 已有 brief/plan 理解结果 -> 搜索策略 -> 自动搜索/精选 -> shortlist -> 风险解释 -> 邀约/CRM -> 内容监控 -> GMV/ROI 复盘 -> 下一轮推荐

## Decision Context

- Decision question: NoxInfluencer should prioritize which SaaS or AI Agent opportunities in influencer marketing, especially needs that were previously infeasible but became viable in 2025-2026.
- Time horizon: 2026 H2 - 2027 H1
- Scope: influencer marketing SaaS、creator commerce、AI marketing agents、creator discovery/CRM/outreach/monitoring/ROI attribution
- Main constraints: 平台数据授权、AI 外部动作风险、FTC/平台合规、推荐可解释性、真实付费意愿

## Why Now

- 市场预算成熟：IAB、eMarketer、Influencer Marketing Hub 等来源都指向 creator/influencer spend 继续增长，且从试验性渠道转向核心预算项。
- 平台 rails 成熟：Shopify Collabs、TikTok Shop Affiliate、Amazon Creator Connections、Meta partnership ads 让 link/code/commission/commerce attribution 比过去更可做。
- AI 能力成熟：LLM、多模态和 agent workflow 足以处理 brief/plan 消费、搜索策略生成、候选解释、内容摘要、邮件草稿和报告生成。
- 但风险也成熟：FTC disclosure、fake review rules、平台 API/授权限制和 agent governance 使“安全、可审计、人工批准”成为产品差异化。

## Options Considered

| Option | Summary | Upside | Downside | Evidence strength | Reversibility |
| --- | --- | --- | --- | --- | --- |
| Bigger creator database / more filters | 做更大的库和更多筛选项 | 容易理解，承接现有搜索 | 竞品拥挤，差异化弱 | Medium | High |
| Fully autonomous influencer marketing agent | 自动找人、触达、谈判、付款、复盘 | 叙事强，Demo 好看 | 高风险：错误触达、错误报价、付款/合规事故 | Weak to Medium | Medium |
| Smart Marketing Plan -> Creator Candidate Agent | 从已有 brief/plan 理解结果自动生成搜索策略、搜索结果快照和候选名单 | 直接解决搜索策略翻译和筛选成本 | 需要可解释推荐，且不能自动写入待邀约池 | Medium to High | High |
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
| 用户愿意让 AI 消费已有 brief/plan 理解结果生成 shortlist | 5 个历史智能营销计划离线对照 | PM/AI | 2 周 | AI shortlist 保留率不高于普通搜索 |
| 风险摘要能减少人工审核时间且可被信任 | 30-50 个 creator 人审标签对照 | PM/数据 | 3 周 | 误判高或解释不可用 |
| 至少一个 commerce 数据源可形成复盘闭环 | 选 Shopify/TikTok Shop 客户做数据接入预研 | PM/后端 | 4 周 | 数据不可接或只剩 vanity metrics |
| 销售能讲清楚 P0 价值并形成付费理由 | Sales/CS 概念测试 | PM/业务 | 2 周 | 客户听完仍认为只是“搜索增强” |

## Next Experiments

1. 选 5 个历史智能营销计划，基于 Campaign 与 AI 营销计划上下文离线生成 shortlist，与真实人工名单对比。
2. 选 30-50 个 creator，做人审风险标签，评估 AI 风险摘要准确性。
3. 找一个 Shopify/TikTok Shop 用户，跑 links/codes/commission/内容监控的最小闭环。
4. 对销售/CS 做概念测试：这三个 P0 机会是否能讲清楚、是否有付费理由。

## Appendix

- Evidence database: `evidence/evidence_cards.jsonl`
- Competitor matrix: `competitors/matrix.csv`
- 10-round log: `10_round_research_log.md`
- Opportunity scoring: `synthesis/opportunity_scoring.md`
- Research gaps: `synthesis/research_gaps.md`
- Nox 6311 evidence brief: `nox_6311_evidence_brief.md`


---

## nox_6311_evidence_brief.md

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
