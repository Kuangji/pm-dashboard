# Hootsuite Analytics：文档重建流程

日期：2026-11-13｜公开资料，未登录实测。

用户任务：汇集团队账号数据，为管理者配置所需报表。

## 前置与入口

数据对象：organization/teams/accounts；report/tile。功能/数据/共享权限按对应来源；本轮未作付费租户验证。

## 核心操作

1. Analytics → Create a report，选模板或Custom report。
2. 通过organization列表选择teams/account范围；选择metrics。
3. Configure tile → Data设置来源/filter，Apply；Properties选图型。
4. 橙点表示采用tile独立范围；Reset data恢复report范围。
5. 同team成员通过Read/Edit共享协作。

## 完成态与边界

tile可展示aggregated数据；comparative图型与内容指标；非品牌层级下钻证据。模板/自定义report，Read/Edit共享。

取消、空数据、异常和无权限界面的具体反馈未观察，不补写为确定事实。自定义tile脱离report filters/sources；橙点提示。

## 设计意图假设

推测：把多种分析需求放入report与tile配置，允许不同组件使用不同范围。

来源：[SA14](../evidence/README.md#sa14)；[SA15](../evidence/README.md#sa15)；[SA16](../evidence/README.md#sa16)；[SA17](../evidence/README.md#sa17)。
