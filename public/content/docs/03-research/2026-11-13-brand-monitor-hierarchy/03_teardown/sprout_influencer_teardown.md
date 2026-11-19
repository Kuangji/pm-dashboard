# Sprout Influencer Marketing：六维拆解

2026-11-13｜研究记录，不是聚星方案。

| 维度 | 记录 |
|---|---|
| 功能定义 | 围绕品牌提及或产品关键词，把分析范围合并或分项比较。 |
| 交互实现 | workspace；keyword groups；report datasets；Single Topic合并多关键词dataset；Industry Topic分组比较；品牌/产品词过滤。workspace内复用Keyword Group，可复制到其他workspace |
| 边界处理 | 工作区隔离＋查询语义；Product Line是过滤层；复制不等于共享；删除组可影响历史报告；去重未知。未观察空态/错误/取消态 |
| 业务信号 | 推测：把检索语义与报告呈现解耦，复用查询素材。这属于研究解释，不是厂商内部策略事实 |
| 设计令牌 | 本轮未采集色值、间距、圆角或动效；无登录态视觉验收，不从营销插图推导产品组件规范。后续聚星Design遵循kol2.0-design-specification |
| 学习与避坑 | 产品线词过滤适合检索分解，不能冒充可复用产品线实体；查询变动需观察引用与历史。 |

来源：[CM09](../evidence/README.md#cm09)；[CM10](../evidence/README.md#cm10)；[CM11](../evidence/README.md#cm11)；[CM12](../evidence/README.md#cm12)；[CM13](../evidence/README.md#cm13)；[CM14](../evidence/README.md#cm14)。

操作链见 [Sprout Influencer Marketing流程](../02_ux_flows/sprout_influencer_flow.md)。
