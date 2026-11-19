# Brandwatch Consumer Research：文档重建流程

日期：2026-11-13｜公开资料，未登录实测。

用户任务：保留多个数据采集查询并按业务分类拆分统一范围。

## 前置与入口

数据对象：Queries/Channels；Query Groups；Category/Subcategory。功能/数据/共享权限按对应来源；本轮未作付费租户验证。

## 核心操作

1. 在Project内组织Queries/Channels，创建Query Group（具体UI未取证）。
2. 将Query Group作为分析或明细过滤范围。
3. 给Mention配置Category/Subcategory，并通过Rules分段。
4. Dashboard组件按查询组/分类维度分析；未证实原生品牌树导航。

## 完成态与边界

Query Group作为聚合分析范围；categories/parentCategories/mixedCategories维度。空白/模板Dashboard与Components；共享边界未详核。

取消、空数据、异常和无权限界面的具体反馈未观察，不补写为确定事实。同文跨Query去重未知；历史重分类不等于关系版本快照。

## 设计意图假设

推测：用查询与元数据分层，使分析分类不必等同采集查询。

来源：[EN01](../evidence/README.md#en01)；[EN02](../evidence/README.md#en02)；[EN03](../evidence/README.md#en03)；[EN04](../evidence/README.md#en04)。
