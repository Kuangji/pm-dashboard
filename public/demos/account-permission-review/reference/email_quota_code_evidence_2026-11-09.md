# 邮件发送与邮箱解锁｜扣量主体代码核对

> 日期：2026-11-09。用途：为当前 [统一 Input](./phase2_input_v0.md) 的兼容口径提供静态证据，不是线上实测或新 Spec。
> 用户已确认：邮件发送与邮箱解锁先沿用各入口现有扣量逻辑，不统一改为“谁操作扣谁”，也不统一改扣 Owner 或原始创建者。预检与落账主体不一致单列研发核对，本轮不修改生产实现。

## 1. 证据快照与边界

- 本地旧服务端 `KOLServer`：`master@706dc8ea0e`，工作树干净；核对 `README.md`、Maven 模块及下列代码路径。
- 本地新服务端 `kol_server_v2`：`master@234e9dad73`，工作树干净；检索同名服务、消息配额入口及 Scope 常量，未找到这些邮件链路的替代实现。未检出不等于已验证线上路由归属。
- 未连接线上环境、接口或数据库；代码字段值及其关系、部署版本、历史账号分布均未实测。以下 `task.uid`、轮次 `project.uid`、Campaign `creatorUid`、`operatorUid` 和发件邮箱身份不能视为天然相等。
- “预检使用谁”不等于“最终扣谁”。实际操作者用于审计/业务统计时另行记录，不把配额历史 UID 直接当作 actor。Owner 移交后旧字段如何映射、后续怎样核算，仍需研发确认，本文不作新裁决。

## 2. 路径矩阵

| 入口 | 配额/限制 | 本地预检主体 | 本地落账或计数主体 | 本版处理 |
| --- | --- | --- | --- | --- |
| 普通邮件项目发送 | Scope 21 邮件发送总额 | 调用 `sendEmail` 的 `uid`，即当前操作账号 | 通过轮次关联 `kol_email_task.uid` 写发送历史；不是取提交操作人 | 沿用现状；预检/落账差异交 RQ-MAIL-01 |
| 普通邮件发送时新解锁邮箱 | Scope 4 邮箱解锁 | `sendEmailCheck(uid, ...)` 查询操作账号额度 | 当前轮次 `kolEmailProject.uid`；不等于 `task.uid` | 沿用现状；差异交 RQ-MAIL-02 |
| Campaign 批量邀约 | Scope 21 邮件发送总额 | `scopeOperate` 由 Campaign `creatorUid` 调用 | 同一发送历史 SQL 主要按 `task.uid` 写入 | 只记录兼容事实，不扩展本轮智能营销适配范围 |
| Campaign 批量邀约新解锁邮箱 | Scope 4 邮箱解锁 | `scopeOperate` 使用 Campaign `creatorUid` | `batchInsertGetQuota` 将 `task.uid` 写为解锁历史 `creator_uid` | 沿用该入口现状，不套普通邮件轮次主体 |
| 消息中心继续已有对话 | Scope 21 邮件发送总额 | 按 `needSendQuota` 判断是否需新增 | 通常不新增；RW2 首次直接联系且无相关发送历史时可按 `context.resourceUid` 记 1 次 | 不写成“所有回复/跟进都收费”或“都免费” |
| 消息中心新解锁邮箱 | Scope 4 邮箱解锁 | `context.resourceUid` | 新解锁历史 `creator_uid=context.resourceUid`；资源上下文解析为 `operatorUid` | 保持既有解锁复用及去重条件 |
| Campaign 每日发送限制 | 独立日限，不是 Scope 21 总额 | 启动入口 `campaignSendStart(uid, ...)` 按调用操作账号检查 | 异步 `campaignSendSuccess` 使用轮次 `project.uid` 计数 | RQ-MAIL-03 仅核对，不在本轮修生产 |

普通邮件的自动多轮跟进与消息中心已有对话回复是两类链路：前者新建独立轮次 project/receiver，发送成功统一经 `recordSuccess` 幂等补齐发送配额，不能概括为“所有跟进不再消耗”；后者通常沿用已有发送历史，仅首次直联等条件可能产生新消费。轮次 `project.uid` 通常来自创建该轮的账号，也不能泛称项目的原始创建者或当前 Owner。

已有解锁复用、预扣与成功补扣、幂等、失败/退信返还、实际周期及每日限制分别沿用各自链路。组与成员配置不改变这套主体选择；新组上下文及历史字段适配须逐 Scope 补证，不用统一 actor 规则替换。

## 3. 代码锚点

路径均相对本地 `KOLServer` 仓库；行号固定于上述 HEAD，后续变动须重新核验。

| 文件 | 参考位置 | 证据含义 |
| --- | --- | --- |
| `ServiceInternal/src/main/java/com/nox/kol/service/EmailProjectService.java` | `2754、2770、2907、3670–3673` | 普通发送 Scope 21 与解锁 Scope 4 按入参 uid 预检 |
| 同上 | `2928–2929` | 普通发送调用 `batchInsertFromProject` 预扣发送历史 |
| `ServiceInternal/src/main/resources/com/nox/kol/mapper/KolEmailSendQuotaHistoryMapper.xml` | `43–56` | 发送历史主要取 `t.uid`；SQL 对缺失 task 的旧推广记录另有 `pp.creator_uid` 回退，不能因此概括为统一创建人主体 |
| `ServiceInternal/src/main/java/com/nox/kol/service/EmailProjectService.java` | `3702、3713、3724` | 普通邮件解锁历史使用轮次 `kolEmailProject.uid` |
| `Entity/src/main/java/com/nox/kol/entity/KolEmailProject.java` | `217–231` | `initFromFirstInvite` 将创建该轮的 uid 写入轮次 |
| `ServiceInternal/src/main/java/com/nox/kol/service/EmailProjectService.java` | `7221–7227` | 添加跟进轮次新建独立 project，不能等同已有对话回复 |
| `ServiceInternal/src/main/java/com/nox/kol/aop/AsyncEmailService.java` | `627–636` | 成功结果进入统一 `recordSuccess` |
| `ServiceInternal/src/main/java/com/nox/kol/service/EmailSendResultTransactionService.java` | `28–41、47–59` | 成功幂等补齐发送历史，失败同事务清理对应记录 |
| `ServiceInternal/src/main/java/com/nox/kol/service/EmailProjectService.java` | `10472–10477、10595、10607、10650–10654` | Campaign 创建人预检发送/解锁额度，随后走批量历史落账 |
| `ServiceInternal/src/main/resources/com/nox/kol/mapper/KolScopeHistoryMapper.xml` | `406–423` | Campaign 解锁历史 `creator_uid` 取 `t.uid` |
| `ServiceInternal/src/main/java/com/nox/kol/upgrade/service/message/MessageCenterService.java` | `2438–2476、2545–2553、2780–2786` | 消息中心按需新增发送/解锁记录，RW2 首次直接联系条件独立判断 |
| `Entity/src/main/java/com/nox/kol/upgrade/vo/message/MessageCenterOperationContext.java` | `44–45` | 发送资源主体返回 `operatorUid` |
| `ServiceInternal/src/main/java/com/nox/kol/service/EmailProjectService.java` | `2992–3008` | Campaign 启动日限取主账号权益、按调用 uid 检查 |
| `ServiceInternal/src/main/java/com/nox/kol/aop/AsyncEmailService.java` | `731–739` | Campaign 异步日计数用轮次 `project.uid`，独立于发送总额历史 |

## 4. 研发待确认

| 编号 | 核对问题 | 当前处理边界 |
| --- | --- | --- |
| RQ-MAIL-01 | 普通邮件 Scope 21 的操作账号预检与 task.uid 落账不一致，协作者操作时是否为既有意图；Owner 移交/字段适配后如何保持可解释的一致性 | 核对调用及存量字段、边界与测试，不据此改为 actor、Owner 或创建人统一扣量 |
| RQ-MAIL-02 | 普通邮件 Scope 4 的操作账号预检与轮次 project.uid 落账不一致；轮次与任务 UID 在协作/移交后如何映射 | 独立于 Scope 21 处理，保留解锁复用、去重和周期；未核对前不承诺个人剩余与预检完全一致 |
| RQ-MAIL-03 | Campaign 日限启动预检操作账号、异步按 project.uid 计数的差异，是否在不同启动/定时路径中成立 | 仅核对独立日限；不把它等同 Scope 21 总额度，不扩展智能营销功能、不修生产 |

本轮不推进 Spec，也不声称三项问题已获研发确认或已经修复。Demo 仅示意“配置哪一层额度”和“既有业务路径怎样核算”是两个问题，不用本地示例确定生产扣量主体。

## 5. 当前权限适配补充（2026-11-10）

用户已确认邮件项目与消息对话尽量保留现有业务逻辑，只增加组隔离及必要适配；本节不改写上文静态扣量证据。邮件名单管理员可继续授予名单管理能力，邮件无日常主动 Owner 转交，账号级生命周期交接另核任务/轮次与核算字段。源组绑定任务，各轮次继承，不从配额承担 UID 或当前操作者推导组。

消息保留精确对话委派及发件资源选择，不改变项目 Owner/正式协作者；站内真实 actor、实际发件邮箱、Reply-To 和配额核算分别解释。已有普通 YJ 对话回复不新增 Scope21，不等同于整个消息中心免费；RW2 首次直联及新邮箱 Scope4 解锁仍按上文条件。默认“沟通中”要求回复不代表“建联中/全部”不存在单方发信。组隔离须覆盖卡片聚合/未读/检索、发送与后台旁路及生命周期；管理能力再授予已收口，隐式组长与委派互斥/发件优先级和迁组失效恢复仍留 Spec/研发。详见 [Input §5.10](./phase2_input_v0.md) 与[邮件/消息权限证据](./email_message_permission_evidence_2026-11-10.md)。

`RQ-MAIL-01/02/03` 继续保留，权限兼容确认和本地 Demo 不代表预检/落账差异、真实部署或后续字段映射已经验证，不发生真实发送或扣量。
