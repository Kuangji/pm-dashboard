# Experiment Plan

| ID | Assumption | Experiment | Method | Success metric | Minimum sample | Duration | Decision rule |
| --- | --- | --- | --- | --- | --- | --- | --- |
| X-001 | 用户愿意让 AI 消费已有 brief/plan 理解结果生成 shortlist | 用历史智能营销计划离线生成搜索策略和 shortlist，与人工名单和普通搜索结果对比 | prototype / concierge | AI shortlist 保留率高于普通搜索 20%+，且用户认为推荐理由可信 | 5 个历史智能营销计划, 50-100 creators | 2 weeks | 达标则进入 6311 交互原型；不达标则先做搜索策略助手 |
| X-002 | 风险摘要能减少人工审核成本 | 对 30-50 个 creator 生成质量/风险摘要，与人工标签对比 | offline eval / expert review | 人工审核时间下降 30%+，高风险漏判率可接受 | 30-50 creators | 3 weeks | 漏判严重则暂不做自动评分，只做证据聚合 |
| X-003 | Commerce ROI Hub 有可接入的最小闭环 | 接入短链/UTM + Shopify 或 TikTok Shop 的一个真实客户样本 | technical spike / pilot | 可按 creator/content/product 输出 GMV/commission/ROI 报告 | 1-2 customers | 4 weeks | 若只能拿到 vanity metrics，降级为监控报告附属能力 |
| X-004 | Sales/CS 能讲清 P0 价值 | 用一页概念稿访谈 sales/CS 和 5 个客户/潜客 | concept test | 70%+ 受访者能复述价值并指出愿付费场景 | 8-10 interviews | 2 weeks | 如果被理解成普通搜索增强，重写定位 |
| X-005 | Human-approved agent 能降低执行风险 | 设计邮件/brief/合同草稿 + 审批流原型 | prototype | 用户愿意让系统生成草稿但保留人工批准 | 5 operators | 2 weeks | 若用户仍担心品牌风险，先做 checklist/提醒，不做发送动作 |
