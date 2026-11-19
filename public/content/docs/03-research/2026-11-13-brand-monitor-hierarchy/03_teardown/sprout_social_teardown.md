# Sprout Social：六维拆解

2026-11-13｜研究记录，不是聚星方案。

| 维度 | 记录 |
|---|---|
| 功能定义 | 让同一批社媒账号按品牌或区域分别和整体查看。 |
| 交互实现 | Groups；Profile Collections；Profile Performance；另建含全部目标profiles的总Group作为workaround；Overview汇总；Profiles逐账号比较。My Reports受创建Group限制；Collections可批量选取 |
| 边界处理 | 同profile多Group；跨Group analytics明确不可用；集合变更后已选report filter需重选；报表权限受Group约束。未观察空态/错误/取消态 |
| 业务信号 | 推测：复用profile的集合提供灵活组织，但组织范围成为报表边界。这属于研究解释，不是厂商内部策略事实 |
| 设计令牌 | 本轮未采集色值、间距、圆角或动效；无登录态视觉验收，不从营销插图推导产品组件规范。后续聚星Design遵循kol2.0-design-specification |
| 学习与避坑 | 官方workaround证明可维护重叠集合，但不能假设其有父子继承或零维护成本。 |

来源：[SA01](../evidence/README.md#sa01)；[SA02](../evidence/README.md#sa02)；[SA03](../evidence/README.md#sa03)；[SA04](../evidence/README.md#sa04)；[SA05](../evidence/README.md#sa05)；[SA06](../evidence/README.md#sa06)。

操作链见 [Sprout Social流程](../02_ux_flows/sprout_social_flow.md)。
