# Hypothesis Map

| ID | Theme | Hypothesis | Decision impact | Uncertainty | Evidence needed | Status |
| --- | --- | --- | --- | --- | --- | --- |
| H-001 | Market | Creator marketing spend is moving toward measurable outcomes, commerce attribution, and reusable content assets rather than one-off sponsored posts. | high | medium | IAB/eMarketer/platform/commerce source updates; competitor positioning | supported by platform/competitor evidence |
| H-002 | User | 用户最缺的不是更多视频数据，而是“这个频道/视频/素材是否值得投、复投、避开或预警”的可解释判断。 | high | medium | 用户社区、评论、Nox 反馈、竞品评价 | supported, still needs customer interview validation |
| H-003 | Competitor | 竞品会把风险、监控、ROI、素材洞察拆成多个模块，但 Nox 可以用视频监控做统一承载。 | high | medium | CreatorIQ/GRIN/Modash/HypeAuditor/Brandwatch/Dash Hudson/Motion/MagicBrief 等 benchmark | supported |
| H-004 | Commercial | 创作者电商 ROI 归因中心有付费潜力，但 MVP 必须从可接数据源和弱归因开始，不能承诺全平台精准 ROI。 | high | high | Shopify/TikTok/Amazon/Meta 官方能力、用户痛点、数据接入边界 | supported, technical spike needed |
| H-005 | Distribution | 频道风险分析最适合嵌入搜索/候选名单/频道详情；视频分析和素材复投最适合嵌入内容监控。 | high | medium | Nox 内部链路、竞品信息架构、用户任务流 | supported |
| H-006 | Feasibility | AI 已足以做视频摘要、创意标签、风险证据、素材聚类和预警解释，但高置信评分仍需要规则/数据/人工校验。 | medium | medium | AI 视频分析产品、平台 API、内部数据字段、评测方案 | partially supported; data coverage unknown |
| H-007 | Risk | AI 产品演示视频生成虽然热门，但若不能连接商品、达人合作、素材投放和监控复盘，可能不是 Q3 主线。 | medium | high | 生成式视频竞品、用户 JTBD、Nox 渠道契合度 | supported as P2/observe |

## Priority Questions

1. 这 7 个 topic 应如何重组为 2-3 个可执行产品方向？
2. 哪个方向最适合作为 Q3 P0：频道风险质量、视频监控 AI 分析、ROI 报表，还是素材/爆款情报？
3. “动态发现机制”相比静态搜索到底解决什么用户问题，如何落到 Nox 产品形态？
4. AI 产品演示视频生成是主线、插件，还是暂缓观察？

## Kill Criteria

- 如果用户无法把某方向与“选人、投放、复投、归因、避险”中的明确决策联系起来，则不作为 P0。
- 如果 ROI 方向无法拿到最小可验证数据源，则降级为监控报告附属能力。
- 如果视频/素材分析只能输出泛泛总结，不能给出证据和下一步动作，则不进入 MVP。
- 如果 AI 视频生成无法嵌入 Nox 的商品/达人/营销计划链路，则暂缓。
