# v7.5.4 主子品牌视图化查询

> 创建：2026-11-13（Asia/Shanghai）｜版本号：v7.5.4｜范围基线：Input v2｜当前进行 Demo 评审。

[当前 Input](input_v2.md)记录主品牌物理数据源、子视图、对比成员配置、总分计算和版本范围。

[一期建议方案](子品牌视图一期建议方案_v1.md)汇总查询、快照、主子报告、入口及生命周期的推荐规则和验收场景，供 Input 评审。

[子品牌查询与快照讨论](子品牌查询与快照讨论_v0.md)整理规则创建、快照批次、报告指标与生命周期的候选。

[聚合规则与指标讨论稿](组合视图一期规则与指标规划_v0.md)保留后续聚合参考，以及可供本期使用的同池对比指标候选。

## 非正式评审稿与 Demo

- [Input v0](input_v0.md)记录本轮评审的问题和版本范围，承接现行 Input v2。
- [Spec v0](spec_v0.md)记录查询、快照、总分计算及权限规则。[Design v0](design_v0.md)记录报告结构、入口及状态表达。
- [打开独立 Demo](../../../demos/brand-monitor-portfolio-754/index.html#report) · [逐点评审](../../../demos/brand-monitor-portfolio-754/index.html#review) · [评审与文档回流约定](demo_review_contract_v0.md)

使用评审清单记录意见，按编号回流到 Sync Inbox，并同步修订受影响的条文、Demo 和验收路径。评审收口后再形成正式文档组合。

### 两项子系统评审

- [子视图查询方案](query_scheme_review_v0.md)梳理保存属性、条件表达、字段开放、预览和快照。
- [线上模块与子视图对比规则](comparison_rules_review_v0.md)逐项盘点四个报告板块，给出常驻、按需查看、下钻及延期的取舍。

两份方案通过已发布的同批快照衔接。对比读取命中集合与指标。字段和模块的生产开放范围以数据核验及后续评审为准。

## 已确认目标

在同一品牌范围内组织子品牌、产品线、事业群或主题等内容。用户从主报告掌握总量，选取子视图进行比较，并下钻核对分项明细。

本项目属于**品牌监控**，独立于品牌舆情项目及 v7.5.3「品牌商品展现优化」。`portfolio` 是项目检索名，不代表已经选择“品牌组合”作为产品实现。

## 已确认需求口径

1. **主品牌全量池**是主视图的物理数据源。主视图直接按该池计算，未被所选子视图覆盖的内容仍计入主品牌总量。
2. **子视图**从指定主品牌池内按条件生成快照，名称和可选标签用来标识子品牌、主题等用途。用户通过主品牌全局「子视图管理」入口维护定义。
3. **子视图对比**在主品牌标准报告内展示统计范围、同批指标及下钻入口。在「子视图管理」抽屉的「对比设置」中可选择所有启用且有可用同批快照的同品牌子视图。另存聚合留待后续。

数据包含性作为目标口径。现有独立报告的交集只作为现状参考。见[需求口径与 Anker、NIKKE 线上样本](../../03-research/2026-11-13-brand-monitor-hierarchy/decision/自顶向下与自底向上_竞品对应.md)和[前期候选比较](../../03-research/2026-11-13-brand-monitor-hierarchy/decision/主子品牌关系与计算展示_候选形式比较_v1.md)。

## 最新研究（2026-11-17）

- [四家产品界面与操作深挖](../../03-research/2026-11-13-brand-monitor-hierarchy/deep_dive_2026-11-17/界面与操作深挖报告_v1.md)
- [官方截图与实际点验导览](../../03-research/2026-11-13-brand-monitor-hierarchy/deep_dive_2026-11-17/界面证据导览.md)

## 当前入口

- [调研工作台](../../03-research/2026-11-13-brand-monitor-hierarchy/README.md)
- [调研简报](../../03-research/2026-11-13-brand-monitor-hierarchy/调研简报.md)
- [执行计划](../../03-research/2026-11-13-brand-monitor-hierarchy/_plan.md)
- [范围共识](../../03-research/2026-11-13-brand-monitor-hierarchy/brand_monitor_common_context_v1.md)
- [正式回流入口](../../03-research/2026-11-13-brand-monitor-hierarchy/_sync_inbox.md)

## 阶段边界

2026-11-23 范围收口见 [Input v2](input_v2.md)。跨主品牌和混合聚合留待后续版本，NIKKE 的独立地区报告作为后续聚合样本。[Input v1](input_v1.md)保留前期讨论。
