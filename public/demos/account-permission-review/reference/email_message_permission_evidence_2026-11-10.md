# 邮件项目与消息对话｜权限、转交及组隔离核查

> 日期：2026-11-10。对应 [当前 Input §5.10](./phase2_input_v0.md) 的增量适配，补充 [邮件扣量证据](./email_quota_code_evidence_2026-11-09.md)。本稿区分静态事实、用户已确认目标和研发待核，不是新 Spec，不表示生产实现已经修改或部署。
> 用户最终确认：邮件项目与消息对话尽量保留原业务逻辑，只增加组隔离及必要适配。邮件名单管理员可继续授予名单管理能力，不额外收紧为不可传递；此为邮件例外，不放宽其他模块附加能力。邮件没有日常“转交负责人”，只有账号级交接；消息转交是精确对话代办，不改变项目负责人或正式协作者，本期人员范围限源项目所属组。Input、梳理与 story 按此同步，Demo 按局部流程示意验收，不用来证明下述生产链路已完成。

## 1. 基线与验证边界

| 仓库 | 当前本地检出 | 说明 |
| --- | --- | --- |
| kol-next | `codex/752-brand-reputation-radar@82f1e1014a6ab0ea692c8157c9057792adbcbda4` | 有其他模块未提交改动，所查邮件/消息文件未修改；已读本地协作说明、README 和 package |
| KOLServer | `master@706dc8ea0ed51f8a5752a9e2f497427f95432faa` | 工作树干净；已读 README、根及相关模块构建文件，核心邮件/消息/转交链路在此 |
| kol_server_v2 | `master@234e9dad738f088550c2d75ef96d457a9b315547` | 工作树干净；已核根及相关模块构建文件，新服务有独立导入、已读等旁路，不能仅按新旧仓库名判断归属 |

本轮只读代码，没有查询数据库、操作线上页面、真实发送或收取邮件，也未验证部署分支、最终邮件头和通知投递。未检出某入口不代表所有环境绝对不存在；下列锚点均以本次检出为准。

## 2. 用户描述逐条核对

| 描述 | 核对结论 | 必须保留的限定 |
| --- | --- | --- |
| 邮件项目沿现有权限加组隔离 | 方向成立 | 组应绑定任务 `kol_email_task`，不是某轮 `kol_email_project.uid`；列表、详情、成员保存、导入和后台发送均需接入 |
| 邮件项目无日常负责人转交 | 与所查 UI/API/服务一致 | 账号清退中的 uid 替换是生命周期路径，不开放为项目动作 |
| 对话 Owner/协作者与所属邮件项目一致 | 普通 YJ 会话成立，但不是全部访问来源 | 精确单会话转交另有独立 assignment 来源，不要求成为项目协作者 |
| 对方回复后才成为对话 | 限定默认“沟通中”成立，不能泛指整个消息中心 | 单方面成功发信会写消息中心，可在“建联中/全部”出现；多轮发信不因此自动成为“沟通中” |
| 已有邮件对话回复不扣邮件发送次数 | 普通已有 YJ 对话成立 | RW2 首次直接联系可能扣 Scope21；新解锁收件邮箱可能扣 Scope4，不能概括为所有资源都不消耗 |
| 对话转交不改项目 Owner/协作者 | 成立 | 当前只能由任务创建人维护，允许清空，最多 50 人；创建者本人及正式项目协作者不能被设为转交人 |
| 有转交人时 Owner 不提醒但仍能发 | 对普通未读投影和 NIM 推送成立 | 其他项目协作者仍保留提醒；未定位独立回复提醒邮件闭环，不能泛化为所有通知渠道 |
| 全部移除后回 Owner 跟进 | 后续消息路由成立 | 不等于恢复历史未读，保存关系会清零并重建相关投影 |
| 协作者以 Owner 身份发，转交人以自己身份发 | 默认发件资源大体成立，完整身份描述需要修正 | 普通协作者可显式选自己的邮箱；站内头像昵称按实际操作者，外发邮箱/显示名快照、Reply-To 分别判断 |

本稿的 YJ 指普通邮件项目，不把旧 RW、RW2/Campaign 或 TikTokShop 对话都强行归为同一规则。

## 3. 邮件项目现有动作边界

产品里的邮件项目主要对应 `kol_email_task`，其 `uid` 为负责人；正式协作者在 `kol_email_task_members`，`canManageMembers` 是名单管理附加能力，没有 Viewer/Editor 两级。

| 动作 | 所查后端权限 |
| --- | --- |
| 读项目、编辑邮件内容/收件人、发送 | 负责人或有效正式协作者，另受状态/配额约束 |
| 改项目名称 | 仅任务负责人；名单管理员也不能因此改名 |
| 维护正式协作者名单 | 负责人或 `canManageMembers=1` 的有效成员 |
| 删除整个任务 | 仅负责人，并有已发送/发送中等状态限制 |
| 日常主动转交负责人 | 未发现对应业务入口；普通任务更新 SQL 不修改 uid |
| 独立项目说明 | 未定位独立说明字段，不凭通用项目模型新增治理项 |

前端协作者能看见编辑图标、能输入名称，不证明服务端接受改名。跟进新轮次可记录添加轮次账号，但仍由 `email_task_id` 关联原任务，不能由轮次 uid 或操作者当前组反推业务组。

**差异已收口，沿用线上**：当前代码允许已有名单管理员继续提交他人的 `canManageMembers=1`，未见只准负责人授予此能力的服务端拦截。用户核对后明确保留该行为，不新增不可传递限制；先前通用“非 Owner 不能继续授予”目标在邮件模块被本次确认覆盖。此例外不推广到支付 `can_execute_payment` 或其他模块，不改变收藏夹/监控 Owner 专属名单治理。普通协作和隐式组长来源不自动产生邮件名单管理能力。

现有 `email[12]` 的管理员默认/锁定协作与本版默认关闭的组长隐式协作也不同。后者是已确认的新增来源，不是旧管理员设置自然改名。

## 4. 对话转交：独立代办，不是项目转交

- 原负责人、正式项目协作者、精确会话转交人是三种访问来源。转交关系按任务负责人、业务类型/项目、达人和平台定位，不能只按达人或组织绑定。
- 仅任务创建人可增删转交人；`canManageMembers` 或组织管理身份不因此获得维护转交名单的资格。当前允许保存 `0..50` 人，空名单即全部撤销。
- 候选人要在同一账号组织体系，且不得为创建者本人或正式项目协作者；现代码尚无本版业务组校验。本期同组限制须在候选、保存及实际使用时同时落实。
- 保存只处理 assignment、个人草稿/投影及摘要，不改项目负责人或正式协作者名单。转交人不因此获得整个邮件项目权限，负责人仍保有对话发送资格。
- 新消息普通未读投影与 NIM 路由：有有效转交人时移除 Owner 的被动提醒、加入全部有效转交人，其他项目协作者仍保留；全部撤销后未来消息恢复 Owner 路由。不承诺历史未读恢复，也不由此推断其他提醒邮件的行为。
- 当前通知过滤主要核同组织；新增“只退组、仍留组织”后，失效转交人不能继续收到消息或持续压住 Owner 提醒，需要有效组身份判定。
- 现有账号清退包含创建者侧/转交人侧关系撤销和投影清理，但不等于已经覆盖本版退组、整体接替和新任务生命周期。

## 5. 发件身份与扣量不能合并推断

| 维度 | 所查实现 |
| --- | --- |
| 普通 YJ 默认发件资源 | 读取轮次后查询任务，并注入 `task.uid`，因此默认走任务负责人的发件资源 |
| 普通成员显式选择邮箱 | 允许操作人本人邮箱，或当前项目发件人的邮箱；不能写死协作者始终沿用 Owner 邮箱 |
| 转交人发件 | 要显式选择自己的授权配置，强制用操作人资源，不在缺失时静默回退 Owner |
| 站内头像和昵称 | 新消息按真实操作人资料展示；旧消息缺快照时有兼容回退，不能据旧显示断言新规则 |
| 发件地址/显示名 | 记录实际选中邮箱和显示名快照；远程 Gmail/Outlook/SMTP 请求沿选中配置发送，未做真实投递验证 |
| Reply-To | 独立沿用默认回复地址和组织 `configType=4` 等规则；转交不代表自动改为转交人的回复地址 |
| 邮件发送次数 | 已有 YJ 对话回复不新增 Scope21；RW2 首次直联有独立条件 |
| 新邮箱解锁 | 仍可能消费 Scope4，新消费按该入口的资源操作账号；不泛化为普通邮件项目统一扣操作人 |

## 6. “外包一层组”的最低实施边界

1. **项目层**：稳定组挂邮件任务，各轮次继承。保留原动作权限，再校验该组有效身份；邮件本期不新增日常负责人转交。
2. **精确会话层**：从业务类型/项目解析源组，正文、草稿、附件、回复、定时及批量发送、转交增删、正式协作同步均使用同一组契约。不能只在前端过滤选人。
3. **达人卡片/聚合层**：当前 `message_center` 以 `uid + channelId + platform` 聚合，不含项目或组；`message_center_task` 才含业务项目。摘要、最后消息、未读及检索不能混入其他组内容，置顶/星标/归档和批量动作也须明确对应组范围。具体采用补组键或按组重建投影留 Spec，不在 Input 指定 DDL。
4. **通知与生命周期**：有效转交人要同时具备源组资格；退组、组织清退、账号交接、项目迁组及迟到任务不能继续向失权者投递。保留原委派和普通协作的不同发送身份，不把接替当作改邮箱。
5. **旁路与关联模块**：新服务 TTShop 到邮件项目导入、旧后台发送及导出都有独立路径；消息中的 CRM 联动也要按已定“同达人各组独立业务记录”定位，不能继续只凭组织+达人读业务状态。鉴权缺口是研发待核，不作为要继承的业务规则。

结论是“沿用现有业务机制，加统一组边界”可行，但不是“只改一个协作者弹窗”或“只给正文查询加 groupId”。消息卡片跨项目聚合是本次必须单列的适配成本。

## 7. 已确认回流与实施待核

- **已确认的审阅修正**：邮件不提供日常主动 Owner 转交，普通内容写和名单管理也不授予任务改名/整任务删除；S19 改用收藏夹/监控。消息用精确对话转交、来信路由及发件身份预览示意，不真实发送/扣量，不要求完整异步状态机。文档和 story 同步这些目标，Demo 实际按钮与结果需按当前审阅标准另验，不将生产核验偷换成样例成功。
- **名单管理产品差异已关闭**：邮件有效名单管理员可以继续授予名单管理能力，沿用现状，不再作为待产品决定。只对邮件覆盖旧通用不可传递目标，其他模块按各自已确认边界。
- **与新增组长来源的兼容核验**：组长隐式协作如何参与既有“正式协作者不可同时转交”校验及发件身份优先级，要单列验证；不能直接把所有隐式组长写入旧正式名单，改变可转交对象。
- **生命周期待核验**：组关系失效、组织清退、账号级接替、项目迁组后的委派停用/是否恢复、Owner 提醒回退和迟到任务须逐项明确，不直接套显式项目 ACL 的自动恢复。已有清退清理实现是核查起点，不代表新多组路径自动完备。
- **实施待核验**：真实部署、通知渠道、历史消息缺快照、组聚合投影迁移、旧组/成员来源、后台与新服务旁路及账号级交接全链路不在本轮实测范围。原 `RQ-MAIL-01/02/03` 未关闭，也不新增“所有回复免费”的统一规则。

## 8. 关键代码锚点

| 主题 | 代码 |
| --- | --- |
| 任务访问与动作 | [EmailProjectService.java:3879](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/KOLServer/ServiceInternal/src/main/java/com/nox/kol/service/EmailProjectService.java:3879)，`:6569` 更新名单/名称，`:6879` 整任务删除 |
| 无日常 uid 更新 | [KolEmailTaskMapper.xml:106](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/KOLServer/ServiceInternal/src/main/resources/com/nox/kol/mapper/KolEmailTaskMapper.xml:106)，`:249` 是账号移交替换；[UserRelationService.java:1579](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/KOLServer/ServiceInternal/src/main/java/com/nox/kol/service/UserRelationService.java:1579) 为清退邮件移交 |
| 名单管理、转交冲突 | [EmailTaskCommonService.java:84](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/KOLServer/ServiceInternal/src/main/java/com/nox/kol/upgrade/service/common/EmailTaskCommonService.java:84)，`:114` 保存能力；[createEdit.vue:423](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/kol-next/components/email/dialogs/createEdit.vue:423) 的前端授权设置 |
| 跟进轮次 | [EmailProjectService.java:7191](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/KOLServer/ServiceInternal/src/main/java/com/nox/kol/service/EmailProjectService.java:7191)，[KolEmailProject.java:217](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/KOLServer/Entity/src/main/java/com/nox/kol/entity/KolEmailProject.java:217) |
| 消息来源权限/转交 | [MessageCenterAssignmentService.java:978](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/KOLServer/ServiceInternal/src/main/java/com/nox/kol/upgrade/service/message/MessageCenterAssignmentService.java:978) 上下文，`:98` 人数上限，`:424` 保存，`:1193` 候选，`:1941` 仅创建人 |
| 进入消息中心、初始分类 | [AsyncEmailService.java:627](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/KOLServer/ServiceInternal/src/main/java/com/nox/kol/aop/AsyncEmailService.java:627)，[MessageService.java:219](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/KOLServer/ServiceInternal/src/main/java/com/nox/kol/service/MessageService.java:219)，`:472` 初始建联状态；[MessageCenterMapper.xml:293](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/KOLServer/ServiceInternal/src/main/resources/com/nox/kol/mapper/MessageCenterMapper.xml:293) 分类 |
| 默认沟通中 | [influencerList/index.vue:351](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/kol-next/components/messageCenter/influencerList/index.vue:351) |
| 发送/解锁额度 | [MessageCenterService.java:2545](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/KOLServer/ServiceInternal/src/main/java/com/nox/kol/upgrade/service/message/MessageCenterService.java:2545)，`:2555` 解锁条件；[MessageCenterOperationContext.java:44](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/KOLServer/Entity/src/main/java/com/nox/kol/upgrade/vo/message/MessageCenterOperationContext.java:44) 资源主体 |
| 卡片与精确任务键 | [MessageCenterMapper.xml:146](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/KOLServer/ServiceInternal/src/main/resources/com/nox/kol/mapper/MessageCenterMapper.xml:146)，[MessageCenterTaskMapper.xml:460](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/KOLServer/ServiceInternal/src/main/resources/com/nox/kol/mapper/MessageCenterTaskMapper.xml:460) |
| 通知路由与撤销 | [MessageService.java:312](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/KOLServer/ServiceInternal/src/main/java/com/nox/kol/service/MessageService.java:312)，[MessageCenterUtilService.java:224](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/KOLServer/ServiceInternal/src/main/java/com/nox/kol/upgrade/service/message/MessageCenterUtilService.java:224)，[MessageCenterAssignmentService.java:535](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/KOLServer/ServiceInternal/src/main/java/com/nox/kol/upgrade/service/message/MessageCenterAssignmentService.java:535) |
| 默认发件资源/邮箱选择 | [MessageService.java:1662](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/KOLServer/ServiceInternal/src/main/java/com/nox/kol/service/MessageService.java:1662)，`:1141` 可选邮箱归属，`:970` 强制操作人资源与快照；[MessageCenterService.java:2942](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/KOLServer/ServiceInternal/src/main/java/com/nox/kol/upgrade/service/message/MessageCenterService.java:2942) 转交发件配置 |
| 站内身份、实际外发与Reply-To | [MessageCenterSenderDisplayService.java:113](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/KOLServer/ServiceInternal/src/main/java/com/nox/kol/upgrade/service/message/MessageCenterSenderDisplayService.java:113)，[MessageService.java:1705](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/KOLServer/ServiceInternal/src/main/java/com/nox/kol/service/MessageService.java:1705)，`:1747` Reply-To |
| 新服务导入旁路 | [TikTokShopEmailProjectImportMapper.xml:15](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/kol_server_v2/main.server/src/main/resources/com/nox/kol/main/server/mapper/tiktokshop/TikTokShopEmailProjectImportMapper.xml:15) |
