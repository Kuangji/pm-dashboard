# Emplifi：文档重建流程

日期：2026-11-13｜公开资料，未登录实测。

用户任务：按品牌/事业部分组账号，保存管理者视图并追到内容。

## 前置与入口

数据对象：profile labels；content labels；saved views。功能/数据/共享权限按对应来源；本轮未作付费租户验证。

## 核心操作

1. Settings → Labels维护Profile labels并分配profiles/可见范围。
2. 相应board选profile labels；多label比较可切total/average。
3. 设置sources/filters/time/aggregation后保存view并配置可见范围。
4. 在支持互动的widget选择bar/segment → View associated content → Content Hub。

## 完成态与边界

多label比较可切total/average；profile或label对比；部分widget进入Content Hub。按board保存source/filter/aggregation/time及可见范围。

取消、空数据、异常和无权限界面的具体反馈未观察，不补写为确定事实。profile vs label图表为均值；board过滤只影响post级widget。

## 设计意图假设

推测：以复用标签集合适配多种分析维度，避免每张表重选账号。

来源：[SA07](../evidence/README.md#sa07)；[SA08](../evidence/README.md#sa08)；[SA09](../evidence/README.md#sa09)；[SA10](../evidence/README.md#sa10)；[SA11](../evidence/README.md#sa11)；[SA12](../evidence/README.md#sa12)；[SA13](../evidence/README.md#sa13)。

## 2026-11-17后续取证

最新界面/操作与证据边界见[emplifi第二轮](../deep_dive_2026-11-17/emplifi.md)及[视觉导览](../deep_dive_2026-11-17/界面证据导览.md)。上文保留为11-13文档基线，不将新截图或导览改写为当时已测。
