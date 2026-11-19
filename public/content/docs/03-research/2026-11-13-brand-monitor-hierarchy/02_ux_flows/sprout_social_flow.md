# Sprout Social：文档重建流程

日期：2026-11-13｜公开资料，未登录实测。

用户任务：让同一批社媒账号按品牌或区域分别和整体查看。

## 前置与入口

数据对象：Groups；Profile Collections；Profile Performance。功能/数据/共享权限按对应来源；本轮未作付费租户验证。

## 核心操作

1. Settings → Groups & Social Profiles → Create a group；加入profiles并配访问权限。
2. 为跨品牌整体表现另建总Group，加入全部目标profiles。
3. Profile Performance Report：Overview看汇总，Profiles看单账号比较。
4. My Reports维护特定报表；已选Collection改成员后取消并重选以刷新范围。

## 完成态与边界

另建含全部目标profiles的总Group作为workaround；Overview汇总；Profiles逐账号比较。My Reports受创建Group限制；Collections可批量选取。

取消、空数据、异常和无权限界面的具体反馈未观察，不补写为确定事实。集合变更后已选report filter需重选；报表权限受Group约束。

## 设计意图假设

推测：复用profile的集合提供灵活组织，但组织范围成为报表边界。

来源：[SA01](../evidence/README.md#sa01)；[SA02](../evidence/README.md#sa02)；[SA03](../evidence/README.md#sa03)；[SA04](../evidence/README.md#sa04)；[SA05](../evidence/README.md#sa05)；[SA06](../evidence/README.md#sa06)。
