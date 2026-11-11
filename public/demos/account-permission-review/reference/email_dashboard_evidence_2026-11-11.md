# 团队邮件数据与 Dashboard 邮件指标｜现状证据及适配边界

> 核查日期：2026-11-11。对应 [当前 Input §5.10、§6](./phase2_input_v0.md) 与 [S15、S31–S33](../../../documents/02-project-documents/account_permission_collaboration/use_case_stories_v0.md#S31)。本轮区分已登录只读观察、指定分支静态实现、已确认产品适配及研发待核，不推进 Spec/Design。
> 不保存客户账号、邮件内容或实际指标值；未点击线上强制刷新或导出，未执行真实发送、配额消费、数据库查询或生产修改。已有接口返回成功不证明新业务组过滤、所有部署 SQL 或历史归因已通过。
> 最新覆盖：本稿保留原抽屉/旧UID归属的历史静态事实，旧个人获准项目整体目标已被 [实际动作规则](./dashboard_actor_workload_rules_2026-11-11.md)覆盖。个人/选单人需真实actor来源，不能将task.uid/pm.uid换名；原抽屉唯一修改和底层Mapper观察不回写为新actor已上线。

## 1. 核查基线

| 来源 | 基线与证据边界 |
| --- | --- |
| 线上只读 | 已登录 `https://cn.noxinfluencer.com/email/project-list` 的“团队邮件数据”抽屉；只读打开及查看现有筛选/展开 |
| 前端静态代码 | `kol-next codex/752-brand-reputation-radar@82f1e1014a6ab0ea692c8157c9057792adbcbda4`；有 13 处无关未提交修改，所查邮件文件未改动，不将分支等同线上部署 |
| 新服务端静态代码 | `kol_server_v2 origin/dev-xs-xxl@6478a2134d3d3b3189cdc368109d28f109d705c5`，通过 `git show` 检查；当前 master 未含此模块，不切分支、不修改工作区 |
| 旧服务兼容参考 | `KOLServer master@706dc8ea0ed5` 的旧 `/ws/...` 统计使用轮次 UID 等旧口径，不作为当前新接口的唯一实现依据 |

## 2. 线上只读观察

- 汇总、成员列表、账号任务展开分别命中三个 `POST /main/api/email-project/team-data/{summary,list,tasks}`，响应均为 200。
- 现有抽屉包含 11 项汇总、日期/邮件项目/账号筛选、账号列表及账号下展开任务八项指标。线上还展示刷新入口、更新时间，调用行为含 `getDashData(true)`；本轮未主动强刷。
- 三率仅作布尔核对：送达数/发送数、打开数/发送数、回复数/发送数与相应返回比例吻合；不记录实际数值，不据此证明全部状态和异常处理。
- 未进行真实导出；导出内容的证据来自前后端静态契约，不写成线上文件实测。

## 3. 11 项指标与时间、归属边界

| 显示项 | 原字段 | 所核口径与限制 |
| --- | --- | --- |
| 邀约红人数 | `channelCount` | 选期内发送记录关联达人去重，优先 `channel_id`，空时回退邮箱；团队去重不能按成员人数相加 |
| 邮件发送数 | `sentCount` | 按邮件 `send_time` 选数据；所查新服务仅状态 1/2/4/5，且轮次已完成未删除、任务未删除且 `task_type=3` |
| 送达数 | `deliveryCount` | 同一发送时间范围内，状态 1/2/5 的记录数量 |
| 送达率 | `deliveryRate` | `deliveryCount / sentCount`，不是只以其他有效状态为分母 |
| 邮件打开数 | `openCount` | 同一发送时间范围内状态 2 的记录数量，不是选期内所有打开事件 |
| 打开率 | `openRate` | `openCount / sentCount` |
| 红人回复数 | `replayCount` | 同一发送时间范围内记录的 `flag_replay` 汇总，字段沿既有拼写；不等于选期内发生的所有来信条数 |
| 回复率 | `replayRate` | `replayCount / sentCount` |
| 建联红人数 | `replyChannelCount` | 沟通口径按消息发生时间筛选，红人来信的频道去重；不与邀约红人数混同 |
| 红人消息数 | `channelMessageCount` | 沟通口径按消息发生时间筛选，红人来信条数 |
| 跟进消息数 | `followCount` | 所查汇总 SQL 为业务方消息条数减业务方消息频道去重数，与当前提示“广告主发送消息总量”不同，保留待核，不由前端修正 |

邮件发送效果的准确说法是“按邮件发送时间选取数据，查看截至本次更新时间的效果”；界面不新增“发送批次”实体或批次筛选。沟通三项另按 `private_message.send_time`，不能为统一日期控件而改成按邮件发送时间。

所查 SQL 时间条件为严格 `> startTime`、`< endTime`；前端按日期归一到日起止，边界记录和时区仍须研发验收，不把日期选择器标签当已核准的全链路时间契约。

邮件计数按 `kol_email_task.uid` 表达账号业务归属，并非可靠的实际发信 actor。组织/组管理账号明细与个人获准项目整体结果分别查询，后者可以含同事协作结果，但不能重复计为每位协作者的个人绩效。

## 4. 已确认适配范围

1. **原团队邮件数据抽屉唯一产品改动**：账号选择范围限制为当前业务组。保留现有 11 项、日期/项目筛选、账号列表与任务展开、刷新、更新时间及导出行为，不新造一套抽屉交互。
2. 新组范围必须由服务端验证，覆盖候选、汇总、账号查询、任务展开和导出；只改前端候选不能代替隔离验收。原抽屉保持当前组上下文，不扩大为跨组组织看板。
3. Dashboard 复用 11 指标覆盖及已说明的日期/账号/项目筛选、账号→任务明细和刷新/导出解释，但保留组织/组管理归属与个人获准项目整体结果的区别；全局日期范围切视角、切领域时保留。
4. 导出沿现有 Summary 11 项 + 账号明细八项，不新增任务维度导出；任务展开八项不意味着能导出任务明细。刷新和导出沿既有服务与权限，示意操作不证明真实数据重算或异步任务已交付。

## 5. 独立研发核对

| 编号 | 观察与需核事项 |
| --- | --- |
| RQ-DASH-01 | 新服务准入只见主账号体系当前有效成员及账号/任务参数校验，尚未证明新记录组/管理角色裁剪。当前组候选、伪造账号/任务 ID、summary/list/tasks/export 同源过滤须服务端验证，不增加原抽屉 UI |
| RQ-DASH-02 | 消息汇总以 `task.uid` 归属，成员消息兼容查询以 `pm.uid` 且没有相同任务类型限制；`followCount` SQL 又是业务方消息条数减频道去重数，与“发送消息总量”提示不同。归因、公式及提示需核，不以强行对齐汇总/列表或把 UID 当 actor 处理 |
| RQ-DASH-03 | 发送指标按邮件 `send_time`，沟通三项按消息时间；严格边界、时区和跨账号/跨组人数去重须验收。旧轮次 UID、新任务 UID、移交后的当前归属及历史组/actor 快照分别核验，不用今天关系回填历史或伪造个人绩效 |
| RQ-DASH-04 | 线上有刷新/`lastRefreshTime` 和 `getDashData(true)`，本地 ref 缺相应完整实现，不能认定线上所有 SQL 相同。强刷/缓存/SLA、真实导出字段及服务、`task_type=3` 邀约与 Campaign 完整覆盖须在目标部署核验；本轮未强刷或导出 |

以上为实现/证据核验，不新增 Dxx 产品决策卡；11 指标纳入及原抽屉仅收账号范围已定，不因核验未闭而退回整套功能是否做的讨论。

## 6. 代码锚点

- 前端 `kol-next`：`pages/email/project-list.vue:37` 为入口；`assets/script/constant/email/projectList.js:94` 为 11 项；`components/email/drawer/teamDashboardDrawer.vue:24、231、383、477` 为筛选、日期、共同参数和导出；`components/email/drawer/teamTaskDataTable.vue:18、96、163` 为账号下任务八项；`docs/知识库/功能模块/消息与触达/组件/email/drawer/teamDashboardDrawer.md:76、112、135` 保留当前接口/导出和去重契约。
- 新服务 `origin/dev-xs-xxl@6478a2134d3d3b3189cdc368109d28f109d705c5`：`main.server/src/main/java/com/nox/kol/main/server/modules/email/teamdata/controller/TeamEmailDataController.java:40–85`；同模块 `service/TeamEmailDataAccessService.java:46–78、85–134、177–210`；`main.server/src/main/resources/com/nox/kol/main/server/mapper/email/TeamEmailDataMapper.xml:8–35、75–103、105–145、149–183、185–289`；`main.server/src/main/java/com/nox/kol/main/server/modules/export/email/teamdata/TeamEmailDataExportHandler.java:110–139、177–190、230–260`。
- 本索引的未检出文件通过指定 ref 读取，不伪造本地当前 master 的可点击文件链接；后续分支更新须重新定位，不将行号当稳定接口。
