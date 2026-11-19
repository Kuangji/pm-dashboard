# Rival IQ：集合和可定制聚合

2026-11-13直接打开官方帮助文档；未登录实测。证据详见 [RI01–RI07](../evidence/README.md#ri01)。

| 对象 / 能力 | 已确认事实 | 边界 |
|---|---|---|
| Landscape（RI01） | 把公司/事业部/地区账号置于同一分析集合；同一company可复用 | 非品牌父子树 |
| Company Set（RI02、RI07） | 集合中的可复用子集，同company可有多个标签 | 不是子公司所有权 |
| Company Set summary rows（RI03） | 按集合一行，指标各选total/average | 2023旧说明；不是跨集合去重 |
| Private Data Aggregations（RI04） | 同渠道多账号数据可选sum/mean/median | 2021旧说明，套餐和现行UI待核 |
| 均值语义（RI05） | competitor/landscape平均是否含focus不同；post平均有权重 | 不能把品牌均值和内容均值混为一谈 |
| 明细（RI06） | 公司链接、部分可点行打开相关内容 | 未证实集合汇总行直接下钻 |

## 一处重要的范围差异

普通Company Set筛选会加上Focus Company；Company Set汇总行却不自动加入它（RI02、RI03）。这是两个文档描述的不同操作语义，并非据此认定产品自相矛盾。报告中“选了哪些品牌”要按组件核对。

## 可核实操作

新建Landscape并加入company → Manage Company Sets维护子集 → Custom Dashboard建Table、Dimension选Company Set → 每指标选Summary Calculation → 保存。下钻公司/内容按RI06的受支持入口进行，未补造集合树逐级展开动作。

## 未知

主子品牌实体关系、同文跨品牌去重、共享给只获部分品牌权限者时的总量行为、关系变更历史快照。旧文档仍可访问不能当作2026租户验收。
