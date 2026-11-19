# Sprinklr Benchmarking：六维拆解

2026-11-13｜研究记录，不是聚星方案。

| 维度 | 记录 |
|---|---|
| 功能定义 | 按企业业务领域复用品牌组合，减少每份报告重复选品牌。 |
| 交互实现 | Brand；静态/动态Brand Group；Dashboard；组可在dashboard/section/widget过滤；去重总量合同未知；品牌/频道分析；Drill By可保存到自定义看板。可共享/克隆Dashboard；Brand Group独立管理权限 |
| 边界处理 | 同brand可多group；组嵌套未知；Product Insights层级属于另一模块；过滤继承需核对。未观察空态/错误/取消态 |
| 业务信号 | 推测：将品牌组合做成独立资产，复用于多种分析视图与团队。这属于研究解释，不是厂商内部策略事实 |
| 设计令牌 | 本轮未采集色值、间距、圆角或动效；无登录态视觉验收，不从营销插图推导产品组件规范。后续聚星Design遵循kol2.0-design-specification |
| 学习与避坑 | 品牌集合可多归属，但不自动构成树；不能把跨模块产品路径补造成完整品牌层级。 |

来源：[EN05](../evidence/README.md#en05)；[EN06](../evidence/README.md#en06)；[EN07](../evidence/README.md#en07)；[EN08](../evidence/README.md#en08)；[EN09](../evidence/README.md#en09)。

操作链见 [Sprinklr Benchmarking流程](../02_ux_flows/sprinklr_flow.md)。

## 2026-11-17后续取证

最新界面/操作与证据边界见[sprinklr第二轮](../deep_dive_2026-11-17/sprinklr.md)及[视觉导览](../deep_dive_2026-11-17/界面证据导览.md)。上文保留为11-13文档基线，不将新截图或导览改写为当时已测。
