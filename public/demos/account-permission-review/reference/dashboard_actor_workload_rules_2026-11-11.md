# Dashboard 实际动作与整体统计｜当前生效规则和静态可行性

> 更新：2026-11-11。本轮用户确认覆盖此前“个人看获准项目整体、管理单人按责任UID归属”的看板目标。以 [当前Input §6](./phase2_input_v0.md) 为准；历史已验收记录和静态代码事实保留，不改写为新目标已上线。
> 本稿不是绩效归因或生产实现方案，不推进Spec/Design。Demo使用独立、显式的操作事件样例，不从Owner、Assignee或旧统计UID改名生成actor。

## 1. 先分实际动作、整体结果和资源核算

- **实际动作**：个人页面和管理者选中单个账号后，只统计该账号实际执行、来源可验证的动作。项目选择仅过滤本人的动作，不变成项目整体结果。
- **整体结果**：组织/组汇总和有效组长的所辖组项目整体，按对应授权查看业务结果。项目整体不能复制给全部协作者或当前负责人当个人工作量。
- **资源核算**：个人配额与资源仍按各入口原计量主体、周期、复用和返还，不因新增actor统计改成谁操作扣谁；承担资源、使用发件邮箱和实际执行人是不同身份。
- 自动任务、自动跟进、自动追踪等单列，不算当期手工动作；配置者或任务Owner不等于每次后台执行的人工actor。历史actor缺失标未知/未覆盖，不由当前Owner、交接后的UID、昵称或责任人反推。
- 工作量只描述有证据的动作，不自动承诺绩效、因果或完整效果分摊。成功/失败/跳过、重试去重及逐入口覆盖须核实，不把有日志就当成功动作。

## 2. 同一页面按实际资格合并入口

| 身份/统计范围 | 已确认能看什么 | 不能据此得到什么 |
| --- | --- | --- |
| 普通账号的个人范围 | 本人实际动作，可选项目过滤本人动作；本人资源沿原计量口径 | 不因Owner/协作者或选了项目就把项目总量当本人工作量 |
| 组织Owner/Admin | 全组织、分组汇总及选单人；单人切为该人的实际动作 | 组织管理身份本身不授予项目整体统计、正文或写ACL |
| 有效组长 | 所辖组整合结果、组内成员实际动作、所辖组项目整体统计 | 不开放其他组，不将个人范围变成组汇总；不依赖隐式协作开关 |
| Admin同时是组长 | 同页合并组织汇总与其所辖组项目统计等可用入口，无须切换身份 | 合并不等于全组织项目整体；仍可切统计范围，逐目标核资格 |

组长或Admin查看自己的个人范围时也按普通成员的实际动作口径，不因管理身份复制组或项目结果。统计授权不等于业务正文访问或读写授权，不能反向修改项目ACL。

组织/组人数和精确对话须在目标范围重新去重，不能直接相加成员去重值；自动/未知不强塞给某个人，也不能用成员动作合计硬凑整体结果。

## 3. 各领域如何适配

| 领域 | 个人/管理单人的实际动作 | 整体结果和必须保留的边界 |
| --- | --- | --- |
| 邮件/消息 | 以明确操作事件核人工发送、实际沟通动作；项目只作动作过滤 | 原11项/账号任务八项、四位七值、发送日期效果线、原值漏斗及独立对话可保留在合法整体范围。来信、首次回复、打开/回复效果不天然是某人动作，不能硬套完整11项或假定因果分摊已确认 |
| CRM | 本人人工新增、改状态、改备注等可核动作；不等于当前Assignee名下全部记录 | CRM没有项目，不强造项目/项目筛选。原创建范围内当前状态仍属组/组织整体结果，不冒充个人期间完成；updateTime不生成跟进/完成事件 |
| 内容监控 | 本人手工建项目、手工添加条目等有actor的动作 | 观看/互动增长是业务效果，不是个人工作量；自动追踪新增单列，配置者不冒充每条人工新增。合法整体仍沿daily观察期及实际截止 |
| 资源使用 | 依原计量主体展示本人资源，不重算成actor消费 | 23/22项清单、期间发生量与当前状态、单位/周期/返还与资格边界不变 |

具体动作名称、成功状态与完整覆盖按来源逐项核验，未确认完整效果分摊不能因为Demo有样例就承诺。个人样例应明确“手工动作/自动/历史未覆盖”，与整体效果分区或切换，不能将原整体值仅改标题后复用。

## 4. 日期、筛选、导出及呈现

- 全局日期、日/周/月粒度、跨模块总览与下方邮件项目过滤隔离继续保留；个人动作按真实动作发生时间，自动单列。整体邮件仍按发送日期观察截至更新时间效果，不能把两种日期混用。
- 总览随当前统计模式取值：个人/选单人是动作，组织/组整合或组长项目整体是相应结果；同一分区不能在个人模式继续显示观看增长或他人协作总量为本人产出。
- 核心四位七值、额外四项、账号任务八项及原完整字段在合法整体范围保留；个人不适用或actor未覆盖的字段明确说明，不填0、不复制项目结果凑齐布局。
- 业务按钮仍为“导出当前模块”，附统计模式、范围、日期/粒度、项目条件、自动/未知状态；个人导出只含本人动作，Admin不能靠导出取得项目整体。资源原导出不变，不新增跨模块合并报表。
- 沿设计规范 `playbook/components/chart.md`、`table.md`、`semantic-tokens.md` 使用既有图表、表格和状态语言；同页可用入口合并不是让用户换角色后才看统计，也不是禁止切组织/组/单人范围。

## 5. 静态可行性与缺口

本轮来源为旧服 `master@706dc8ea`、新服 `master@234e9dad` 及新服team-data远程ref `6478a213` 的只读代码。未查数据库、未验证线上部署或执行真实发送/写入。以下只证明局部字段/路径，不代表actor统计全量可交付。

| 路径 | 静态事实 | 对新目标的限制 |
| --- | --- | --- |
| 普通批量发送 | [Controller:254](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/KOLServer/WebService/src/main/java/com/nox/kol/ws/email/KolEmailProjectController.java:254) → [Service:2959](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/KOLServer/ServiceInternal/src/main/java/com/nox/kol/service/EmailProjectService.java:2959) → [Async:493](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/KOLServer/ServiceInternal/src/main/java/com/nox/kol/aop/AsyncEmailService.java:493)传operateUid | [Async:608](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/KOLServer/ServiceInternal/src/main/java/com/nox/kol/aop/AsyncEmailService.java:608) receiver未持久actor；不能只靠传参当历史已记录 |
| 普通消息写入 | [Async:946](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/KOLServer/ServiceInternal/src/main/java/com/nox/kol/aop/AsyncEmailService.java:946) → [MessageService:204](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/KOLServer/ServiceInternal/src/main/java/com/nox/kol/service/MessageService.java:204)；[PrivateMessageMapper](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/KOLServer/ServiceInternal/src/main/resources/com/nox/kol/mapper/PrivateMessageMapper.xml)未持久operateUid | 普通sendMessage没有统一sender snapshot，不得由pm.uid/任务uid改名猜actor |
| 聊天发送快照 | [SnapshotService:35](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/KOLServer/ServiceInternal/src/main/java/com/nox/kol/upgrade/service/message/PrivateMessageSenderSnapshotService.java:35)，[MessageService:1095](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/KOLServer/ServiceInternal/src/main/java/com/nox/kol/service/MessageService.java:1095)、[1310](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/KOLServer/ServiceInternal/src/main/java/com/nox/kol/service/MessageService.java:1310)、[1485](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/KOLServer/ServiceInternal/src/main/java/com/nox/kol/service/MessageService.java:1485)有operator快照 | 失败/skip也可能写快照且异常吞掉，须核成功状态、缺失与覆盖，不能快照行数直接当成功发送 |
| CRM人工日志 | [CRMUtil:117](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/KOLServer/ServiceInternal/src/main/java/com/nox/kol/upgrade/service/crm/CRMUtilService.java:117)区分新增uid与ownerUser；[475](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/KOLServer/ServiceInternal/src/main/java/com/nox/kol/upgrade/service/crm/CRMUtilService.java:475)、[573](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/KOLServer/ServiceInternal/src/main/java/com/nox/kol/upgrade/service/crm/CRMUtilService.java:573)记录人工修改/状态 | 可作局部动作来源；[Async:638](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/KOLServer/ServiceInternal/src/main/java/com/nox/kol/aop/AsyncEmailService.java:638)的sendEmail日志uid是资源账号，不能混为人工actor |
| 监控身份 | [Task实体构造:478](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/KOLServer/Entity/src/main/java/com/nox/kol/entity/VideoMonitorTask.java:478)写当前uid进nickName、responsibleUid独立；[项目移交Mapper:621](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/KOLServer/ServiceInternal/src/main/resources/com/nox/kol/mapper/VideoMonitorProjectIndependentModularityMapper.xml:621)会改creator；[自动追踪:316](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/KOLServer/ServiceInternal/src/main/java/com/nox/kol/service/monitor/video/VideoMonitorAutoTrackService.java:316)creatorUid是配置者 | 仅字段/构造局部事实，不证明全部入口历史；当前creator/责任人不等于不可变动作人，自动配置者不能认领每条人工量，保存/日志覆盖继续核验 |
| 新服team-data | [已核远程ref与Mapper证据](./email_dashboard_evidence_2026-11-11.md)仍按task.uid等统计业务归属 | 旧汇总/账号数据不是actor统计现成接口，不能将UID字段换个名字宣称适配完成 |

## 6. 独立研发核验

| 编号 | 待核事项 |
| --- | --- |
| RQ-ACTOR-01 | 各入口真实操作人持久字段/事件键、身份不可变性；资源/责任/发件身份与actor分离，前端不提交可信actor |
| RQ-ACTOR-02 | 邮件/聊天/CRM/监控逐入口人工/自动分类及覆盖、有效成功/失败/skip/重试去重，配置者与后台执行分离；效果分摊未核不承诺因果 |
| RQ-ACTOR-03 | 历史起算、快照缺失与未知，组迁移/交接不得改写历史actor及发生组；不从当前责任人补猜历史 |
| RQ-ACTOR-04 | 组织/组整体、实际actor单人及组长项目整体三类权限、Admin兼组长同页入口、人数/会话去重、查询/导出同范围及SLA |

不新增D产品决策卡；已定方向不整体恢复待定，具体字段/覆盖/历史和工程成本继续核。旧RQ-DASH/TIME/CONV及模块核算问题不因本轮转向而关闭。
