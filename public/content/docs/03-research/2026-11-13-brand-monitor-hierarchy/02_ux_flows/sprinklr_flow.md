# Sprinklr Benchmarking：文档重建流程

日期：2026-11-13｜公开资料，未登录实测。

用户任务：按企业业务领域复用品牌组合，减少每份报告重复选品牌。

## 前置与入口

数据对象：Brand；静态/动态Brand Group；Dashboard。功能/数据/共享权限按对应来源；本轮未作付费租户验证。

## 核心操作

1. 把Brands纳入具名Brand Group，静态选取或按custom properties动态组成。
2. 在Dashboard/Section/Widget级应用Brand Group。
3. 标准Dashboard看品牌/频道表现，修改组件需克隆到自定义Dashboard。
4. Drill By后可保存组件；检查源/目标过滤继承及分享权限。

## 完成态与边界

组可在dashboard/section/widget过滤；去重总量合同未知；品牌/频道分析；Drill By可保存到自定义看板。可共享/克隆Dashboard；Brand Group独立管理权限。

取消、空数据、异常和无权限界面的具体反馈未观察，不补写为确定事实。Product Insights层级属于另一模块；过滤继承需核对。

## 设计意图假设

推测：将品牌组合做成独立资产，复用于多种分析视图与团队。

来源：[EN05](../evidence/README.md#en05)；[EN06](../evidence/README.md#en06)；[EN07](../evidence/README.md#en07)；[EN08](../evidence/README.md#en08)；[EN09](../evidence/README.md#en09)。

## 2026-11-17后续取证

最新界面/操作与证据边界见[sprinklr第二轮](../deep_dive_2026-11-17/sprinklr.md)及[视觉导览](../deep_dive_2026-11-17/界面证据导览.md)。上文保留为11-13文档基线，不将新截图或导览改写为当时已测。
