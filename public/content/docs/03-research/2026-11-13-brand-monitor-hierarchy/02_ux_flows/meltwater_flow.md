# Meltwater Explore / Explore+：文档重建流程

日期：2026-11-13｜公开资料，未登录实测。

用户任务：保留各品牌搜索，再做统一结果范围或横向比较。

## 前置与入口

数据对象：Saved Search；Combined Search；Filter Set；Explore+文件夹。功能/数据/共享权限按对应来源；本轮未作付费租户验证。

## 核心操作

1. 保存品牌/业务Search，按需复用Filter Set。
2. Combined Search引用已保存Search，选择any/all/not等逻辑。
3. Compare单独用于比较；不把对比数据直接求和。
4. Explore+中通过nested folders组织Search；不假定folder自动聚合。
5. Explore结果可分享带可选密码的Dashboard；编辑Search影响后续关联结果。

## 完成态与边界

any/all/not组合已保存搜索；Compare独立于Combine；全链路下钻未验。复用查询/filters及分享Dashboard；Explore+有workspace范围。

取消、空数据、异常和无权限界面的具体反馈未观察，不补写为确定事实。并集不等于已验证全部指标去重；Explore/Explore+不混写。

## 设计意图假设

推测：将资产导航、逻辑范围和分析结果分别管理，适配多种用户问题。

来源：[EN10](../evidence/README.md#en10)；[EN11](../evidence/README.md#en11)；[EN12](../evidence/README.md#en12)；[EN13](../evidence/README.md#en13)。

## 2026-11-17后续取证

最新界面/操作与证据边界见[meltwater第二轮](../deep_dive_2026-11-17/meltwater.md)及[视觉导览](../deep_dive_2026-11-17/界面证据导览.md)。上文保留为11-13文档基线，不将新截图或导览改写为当时已测。
