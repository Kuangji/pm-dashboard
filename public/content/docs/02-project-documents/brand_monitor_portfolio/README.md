# v7.5.4 主子品牌视图化查询

> 创建：2026-11-13（Asia/Shanghai）｜版本号：v7.5.4｜范围基线：Input v2｜当前评审：Demo v0.29（2026-11-26）。

评审时对照 [Input v0](input_v0.md)、[Spec v0](spec_v0.md)、[Design v0](design_v0.md) 和[评审约定](demo_review_contract_v0.md)。这些文件名中的 v0 表示非正式文档修订号。下文的 v0.18 等编号记录各交互首次进入 Demo 的轮次。

当前有两项快照行为仍有差异：v0.29 可回看上一批子报告，编辑失败后重开会载入未生效查询。已确认规则要求成功发布后全量覆盖，编辑最终失败后重开读取生效规则。[维护约定](子视图编辑维护讨论.md)

> 本轮确认的检查时机、批量处理和发布规则见[主品牌变动处理流程](子视图编辑维护讨论.md#主品牌变动处理流程)。v0.18 可评审[一键处理全部示例](../../../demos/brand-monitor-portfolio-754/index.html#anker-bulk)和[主配置变动提示](../../../demos/brand-monitor-portfolio-754/index.html#anker-impact)；生产侧主品牌变更通知、单一快照覆盖及编辑失败后的查询保留策略以维护约定为准。

[当前 Input](input_v2.md)记录主品牌物理数据源、子视图、对比成员配置、总分计算和版本范围。

[一期建议方案](子品牌视图一期建议方案_v1.md)汇总查询、快照、主子报告、入口及生命周期的推荐规则和验收场景，供 Input 评审。

[子品牌查询与快照讨论](子品牌查询与快照讨论_v0.md)整理规则创建、快照批次、报告指标与生命周期的候选。

[聚合规则与指标讨论稿](组合视图一期规则与指标规划_v0.md)保留后续聚合参考，以及可供本期使用的同池对比指标候选。

## 非正式评审稿与 Demo

[资产库一期修改点](营销资产库一期修改点.md)汇总两库的入口、归属筛选、下钻说明、固定表头与验收样例。

[试用名单直接下钻](../../../demos/brand-monitor-portfolio-754/index.html#full-comparison)。点击趋势点、指标或管理诊断的名单入口，即在新标签页打开内容库或网红库。矩阵选格后可在原报告读双向覆盖，并打开共同名单。

[打开营销资产，评审内容库和网红库](../../../demos/brand-monitor-portfolio-754/index.html#assets&scene=full)。两库都支持多选子视图归属；共同作品和共同达人按图表给出的精确 ID 名单进入。[两库一期口径](营销资产库下钻接入调研.md#一期接入范围)

[营销资产库下钻接入调研](营销资产库下钻接入调研.md)记录 Anker 四库实测、可恢复的链接参数，以及同批作品和账号名单进入资产库的最小方案。

[打开子视图重合度矩阵](../../../demos/brand-monitor-portfolio-754/index.html#overlap)。同一张矩阵可切换内容或参与网红，点击交叉格可查看两侧覆盖比例及共同明细。

[打开满载月报：主品牌与 5 个子视图](../../../demos/brand-monitor-portfolio-754/index.html#full-comparison)。v0.24 用岩途十月大样本检查指标表、六行图表及下钻。原有双成员样例可继续对照。

[评审参与达人、互动率与推广类型](../../../demos/brand-monitor-portfolio-754/index.html#comparison)。Demo v0.23 在「子视图对比」的指标表增加参与网红数、总互动量。三张图分别比较一个视图内有多少达人多次发布、同平台内容的互动表现、各推广类型的内容构成。

[品牌负责人月报的子视图对比指标](月报子视图对比指标复核.md)逐项对应线上栏目、适用图形、分母及数据前提，三组优先指标已进入 Demo v0.23。

[查看观看量与视频数占比](../../../demos/brand-monitor-portfolio-754/index.html#comparison)。Demo v0.22 在月报指标表下按观看量占比排列子视图。

[试用 7 个子视图中选 5 个](../../../demos/brand-monitor-portfolio-754/index.html#compare-select)。Demo v0.21 从管理主列表选择参与月报对比的成员。选满后先撤选一项，即可换入另一项并保存。

[打开月报版子视图对比](../../../demos/brand-monitor-portfolio-754/index.html#comparison)。v0.20 使用同一主品牌池中的私有子视图作月报分析。默认示例读取岩途 2026 年 10 月发布的视频；观看值统一取该快照的数据截至时点。可切换完整自然月或最近 7／30 天。

- [Input v0](input_v0.md)记录本轮评审的问题和版本范围，承接现行 Input v2。
- [Spec v0](spec_v0.md)记录查询、快照、总分计算及权限规则。[Design v0](design_v0.md)记录报告结构、入口及状态表达。
- [打开独立 Demo](../../../demos/brand-monitor-portfolio-754/index.html#report) · [逐点评审](../../../demos/brand-monitor-portfolio-754/index.html#review) · [评审与文档回流约定](demo_review_contract_v0.md)

使用评审清单记录意见，按编号回流到 Sync Inbox，并同步修订受影响的条文、Demo 和验收路径。评审收口后再形成正式文档组合。

### 两项子系统评审

- [子视图查询方案 v1](query_scheme_review_v1.md)对照 Anker 主查询，讨论可继承配置、池内细筛以及人工和模型分工。[前一轮字段评估](query_scheme_review_v0.md)保留平台字段与代码证据。
- [线上模块与子视图对比规则](comparison_rules_review_v0.md)逐项盘点四个报告板块，给出常驻、按需查看、下钻及延期的取舍。

[直接编辑 Anker SOLIX 户外与收纳条件组](../../../demos/brand-monitor-portfolio-754/index.html#anker-query)会打开 Demo v0.18 的未保存示例，也可从 [Anker 子视图管理](../../../demos/brand-monitor-portfolio-754/index.html#anker) 空白创建。各包含组可独立选择或调整主配置，手填条件支持内容文本和内容标签。发布账号从本品牌的社媒配置选取。组内点「添加条件」补充备选线索，组间点「添加条件组」追加约束。每个子视图最多 5 个包含组。组内固定满足任一项，各组之间固定「并且」。排除条件按需展开。预览后可保存同批快照、回读报告或重新编辑。配置值摘自上次只读核对的 MIS 表单，视频、命中和指标使用本地样例。岩途场景可继续核对[子视图对比与趋势下钻](../../../demos/brand-monitor-portfolio-754/index.html#point=R03)。

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

[主品牌补词流程讨论](主品牌补词流程讨论.md)作为独立议题，记录从视频库补收内容的提议、试算和生效方式。

2026-11-23 范围收口见 [Input v2](input_v2.md)。跨主品牌和混合聚合留待后续版本，NIKKE 的独立地区报告作为后续聚合样本。[Input v1](input_v1.md)保留前期讨论。
