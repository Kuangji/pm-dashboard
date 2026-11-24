# 品牌监控：关联品牌聚合与总—分定制视图

> 创建：2026-11-13｜最近研究：2026-11-20（Asia/Shanghai）｜对应版本：v7.5.4 主子品牌视图化查询｜状态：2026-11-23 范围收口，当前为 Input v2。

目标：将主品牌、子品牌、产品线、事业群等相关品牌数据组织起来，解决离散问题，探索总—分形式的定制化视图。本轮先研究市场做法，聚星实现形式保持开放。

## 当前轮：主子品牌关系、计算与展示候选

- [前期需求演进、线上样本及竞品对应](decision/自顶向下与自底向上_竞品对应.md)
- [三种候选形式比较](decision/主子品牌关系与计算展示_候选形式比较_v1.md)：两层关联包、多级品牌结构、结构＋独立统计分组。
- [聚星服务端静态基线](evidence/nox_brand_static_baseline_2026-11-17.md)：新旧库有限只读核对；不代表线上验收。
- [候选稿审阅与验证](reviews/candidate_options_review_2026-11-17.md)。

主品牌全量池是物理数据源，子品牌报告在池内按条件派生。跨主品牌和混合聚合留给后续版本。当前需求以 [v7.5.4 Input v2](../../02-project-documents/brand_monitor_portfolio/input_v2.md) 为准。

## 第二轮：四家界面与操作深挖

- [先看截图导览](deep_dive_2026-11-17/界面证据导览.md)
- [Lefty / Sprinklr / Emplifi / Meltwater深入报告](deep_dive_2026-11-17/界面与操作深挖报告_v1.md)
- [公开导览与共享报告实际点验](deep_dive_2026-11-17/browser_walkthrough.md)

新增42张证据卡。已走完两份公开导览，并实点Meltwater官方共享报告的内容明细；未登录编辑端、保存真实新视图或确定聚星方案。

## 首轮阅读顺序（2026-11-13）

1. [调研报告v1](调研报告_v1.md)：主要发现、各家怎么做、限制和下一轮输入。
2. [横向对比矩阵](04_matrix/feature_comparison.md)：关系/数据对象与总分/定制能力分开比较。
3. [竞品洞察与VDR映射](05_insights/竞品洞察.md)：可进入Input的素材与Spec/Design待验证问题。

## 证据与过程

- [调研简报](调研简报.md)、[范围共识](brand_monitor_common_context_v1.md)、[执行计划](_plan.md)、[正式回流入口](_sync_inbox.md)
- 原始记录：[红人营销](01_raw_data/creator_marketing_raw.md)、[社媒分析](01_raw_data/social_analytics_raw.md)、[企业级组织](01_raw_data/enterprise_raw.md)、[Rival IQ](01_raw_data/rival_iq_raw.md)、[用户声音](01_raw_data/user_voice_raw.md)
- [证据索引：52张卡 / 48个URL](evidence/README.md)、[合并JSONL](evidence/evidence_cards.jsonl)
- [逐产品文档流程](02_ux_flows/README.md)、[六维拆解](03_teardown/README.md)、[CSV矩阵](04_matrix/feature_comparison.csv)
- [假设与验证](01_hypotheses.md)、[来源计划](02_source_plan.md)、[反证/矛盾复查](synthesis/contradictions.md)、[判断](synthesis/hypothesis_verdicts.md)、[研究缺口](synthesis/research_gaps.md)、[反方审查](decision/red_team.md)、[本轮研究判断](decision/decision_memo.md)

## 当前发现与边界

公开样本出现工作区＋组织报告、品牌/账号集合、查询组合＋分类、可保存看板等方式。Lefty的业务层报告、Sprinklr Brand Groups、Emplifi Profile labels优先补证，不代表选为聚星方案。

首轮竞品结论来自公开资料，未登录实测；第二轮另记录公开导览与共享报告点验。营销页、旧版本说明和用户评论限制单列。原生品牌树、跨品牌内容/达人去重、关系变更历史仍未知。前两轮没有聚星代码/服务端验收；候选比较补充有限服务端静态核对，仍无接口与线上验收。

## 版本与后续

[独立项目入口](../../02-project-documents/brand_monitor_portfolio/README.md)。属于品牌监控，独立于品牌舆情项目及 v7.5.3「品牌商品展现优化」。

当前 Input 纳入主品牌数据池、子品牌查询视图及同池总分计算。聚合运算与二次组合随聚合场景保留为后续讨论。
