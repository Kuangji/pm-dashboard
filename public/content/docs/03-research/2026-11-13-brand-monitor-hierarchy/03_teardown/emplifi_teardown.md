# Emplifi：六维拆解

2026-11-13｜研究记录，不是聚星方案。

| 维度 | 记录 |
|---|---|
| 功能定义 | 按品牌/事业部分组账号，保存管理者视图并追到内容。 |
| 交互实现 | profile labels；content labels；saved views；多label比较可切total/average；profile或label对比；部分widget进入Content Hub。按board保存source/filter/aggregation/time及可见范围 |
| 边界处理 | 账号集合可表示brands/divisions；品牌树未知；profile vs label图表为均值；board过滤只影响post级widget。未观察空态/错误/取消态 |
| 业务信号 | 推测：以复用标签集合适配多种分析维度，避免每张表重选账号。这属于研究解释，不是厂商内部策略事实 |
| 设计令牌 | 本轮未采集色值、间距、圆角或动效；无登录态视觉验收，不从营销插图推导产品组件规范。后续聚星Design遵循kol2.0-design-specification |
| 学习与避坑 | 组织范围、总量/均值和下钻可组合；必须核实profile与post指标是否响应同一筛选。 |

来源：[SA07](../evidence/README.md#sa07)；[SA08](../evidence/README.md#sa08)；[SA09](../evidence/README.md#sa09)；[SA10](../evidence/README.md#sa10)；[SA11](../evidence/README.md#sa11)；[SA12](../evidence/README.md#sa12)；[SA13](../evidence/README.md#sa13)。

操作链见 [Emplifi流程](../02_ux_flows/emplifi_flow.md)。

## 2026-11-17后续取证

最新界面/操作与证据边界见[emplifi第二轮](../deep_dive_2026-11-17/emplifi.md)及[视觉导览](../deep_dive_2026-11-17/界面证据导览.md)。上文保留为11-13文档基线，不将新截图或导览改写为当时已测。
