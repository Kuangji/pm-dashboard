# 监控项负责人 responsibleUid 核查

> 核查日期：2026-11-12。独立评审材料，不修改当前 Input、story 或 Demo，不构成新增已批准规则，也未发布。
> 本轮重新读取当前本地源码；旧的 [监控权限与配额证据](./monitor_permission_quota_evidence_2026-11-09.md) 仅用于定位。以下是静态代码事实，不是线上部署、保存成功或真实扣量的证明。

## 1. 先说结论

1. **监控项负责人是内容级业务分工，不是项目 Owner。** `video_monitor_task.responsible_uid` 是每条监控内容的单值字段，可与项目 `creator`、任务实际创建人 `nick_name` 不同。
2. **它不授予项目访问或编辑权限，也不是监控配额承担人。** 已核查鉴权依赖项目 creator / 有效项目协作者；Scope24 常规用量依赖项目 creator，调整流水依赖 owner_uid；Scope56 依赖自动追踪网红记录 creator_uid。
3. **当前负责人候选不是“项目 Owner + 协作者”。** 新详情页从 `/ws/userRelation/getAllUids` 取得旧组织账号体系成员；详情弹窗直接使用这份列表。项目可见性和任务负责人赋值是两条链路。
4. **保存端没有等价的候选约束闭环。** `changeUser` 检查操作者对请求 projectId 的项目权限，但随后按 taskId 更新；该方法没有核验 taskId 属于该项目，也没有核验新 responsibleUid 的组织、项目或成员状态。Excel 负责人账号解析也有跨组织候选风险。这些是待研发核验的鉴权缺口，不是应保留的合法业务规则。
5. **建议本期保留并澄清，避免借账号重构移除既有业务字段。** 候选收口、失权后的责任字段处理、自动追踪默认值需要明确，但不能把“设为负责人”包装成自动加入协作者、配额转移或本人工作量归因。

## 2. 本轮环境与证据等级

| 仓库 | 当前本地基线 | 工作区与读取说明 |
| --- | --- | --- |
| kol-next | `codex/752-brand-reputation-radar@82f1e1014a6ab0ea692c8157c9057792adbcbda4` | 存在舆情雷达、server/const、.gitignore 等无关脏修改；未见本轮所核监控路径脏修改。只读，未切分支、未 fetch。读取根 AGENTS、CODEX、README、package.json；Vue2/Nuxt2/Element UI，规定 Node14 |
| KOLServer | `master@706dc8ea0ed51f8a5752a9e2f497427f95432faa` | `git status --short --branch` 无脏文件。未检出 AGENTS/CODEX；读取 README、根 pom，Maven 多模块。定位到本材料主要执行链 |
| kol_server_v2 | `master@234e9dad738f088550c2d75ef96d457a9b315547` | 工作区干净。未检出根 AGENTS/CODEX/README；读取根 pom，Java21/Spring Boot4 多模块。全库检索 responsibleUid / responsible_uid / VideoMonitorTask / task/changeUser 未命中，不据此证明线上路由一定不经过新服务端 |

- **本轮浏览器 / 接口实测：未执行。** 没有读取客户数据，没有提交改负责人、导入、自动追踪、移动或清退动作。
- 11-09 的有限线上观察仍只属于当日证据，不能升级为本轮 fresh 线上事实。
- 本轮核验了前端详情、候选 API、后端 Controller/Service/实体/Mapper、自动追踪与账号交接。未执行生产构建、写接口、真实扣量或数据库查询。
- 这是代码事实研究，不修改 kol-next 业务代码、配置或正式文档；不进入生产实现/TDD流程。

## 3. 四种身份不要混淆

| 字段 / 关系 | 已核语义 | 不代表什么 |
| --- | --- | --- |
| 监控项目 creator | 项目责任账号；项目治理和常规24计量使用；账号级交接可改写 | 不等于每条内容的 responsibleUid，也不保证是不可变原始创建人 |
| 监控项 responsible_uid | 当前业务负责人，单值，可改派；用于展示、筛选及列表/导出字段补齐 | 不授予 ACL、不转配额、不证明该人执行了新增或维护动作 |
| 监控项 nick_name | 任务真实创建账号；前端与负责人分别展示/筛选 | 不因改负责人自动改写 |
| vmpim_members | 项目协作者关系 | 被指定为内容负责人不会自动新增这条关系 |
| 自动追踪网红 creator_uid | 自动追踪网红记录创建人；56席位个人口径使用 | 不是内容 responsibleUid，也不是自动证明所有后续监控项的负责人 |

证据：`VideoMonitorTask.java:289/312/478-485`；`VideoMonitorTaskVo.java:73-81`；前端 `MonitorContentMonitor.vue:2291-2327` 分别计算负责人和真实创建人；`VideoMonitorTaskMapper.xml:847-858`、项目 Mapper `:667-673` 鉴权无 responsible_uid；计量见 §6。

## 4. 当前页面、候选与保存链

### 4.1 用户看到什么

- 内容表格存在 `principal` 列；详情抽屉有“负责人”及改派入口。
- 全局筛选有“负责人”和“真实创建人”两个独立条件：`selectCreator -> creators` 实际筛 `vmt.responsible_uid`，而 `realCreators` 筛 `vmt.nick_name`。字段名 creators 不能按字面理解成创建者。
- 详情改派发出 `{ taskId, responsibleUid, projectId }`；这不是“项目负责人转交”。前端该方法旧注释写“修改项目的负责人”，应视为误导性注释，不作为产品语义。
- 弹窗选择后保存，刷新详情与父列表；没有自动邀请、增加项目协作者或转移配额的前端动作。

### 4.2 候选从哪里来

`monitorDetail/index.vue:1345-1351` 的 `fetchCreatorList()` 调 `userApi.getAllUserUid()`，结果直接变为 `memberList`；`monitorDetailDrawer.vue:494-496` 将其传入 `changeChargeUser`。

`api/auth/index.js:19/225-235` -> `UserRelationController.java:284-288` -> `UserRelationService.getAllUsers():1708-1768`。服务先取旧账号体系 `getAllRelationId(uid)`，未传邮件任务参数时不按当前监控项目的 Owner/协作者过滤。弹窗 `changeChargeUser.vue:56-63` 仅禁用当前负责人，没有按项目权限再过滤。

因此当前静态实现允许“组织成员被标作内容负责人，但并无项目访问权限”。这可以是业务分工记录，但不能宣称选中后就能接手操作。新业务组尚未在这条旧链路成为已证明的条件。

### 4.3 后端实际校验了什么

| 入口 | 已核行为 | 未闭环的校验 |
| --- | --- | --- |
| task/changeUser | Controller `:302-304` 转 Service `:1597-1608`；先 checkTransAuthority(uid, vo.projectId)，再按 vo.taskId 写 responsibleUid | 未在该方法查 task 的真实 projectId；未验证新负责人存在、同组织/组、有效状态或项目 ACL。应以真实任务归属做权限判断，不信任客户端 projectId |
| JSON 批量新增 | `batchSaveTask:2911-2974` 检项目存在、操作者项目权限及 Scope；负责人非空沿请求值，否则操作人 | `normalizeBatchTaskResponsibleUid:7002-7007` 只默认值，不验证候选资格；不得把前端候选当服务端安全边界 |
| Excel / 上传校验 | `:6806-6822` 默认操作人；有 responsibleAccount 则按账号查 uid，找到即替换 | `KolBusinessUserEntityMapper.xml:500-506` 仅按邮箱/手机号查账号，未带组织条件；后续 checkTask `:2348-2404` 为短链/链接去重等检查，没有补负责人组织校验 |

以上为静态风险，未进行越权试验，不能断言生产环境可利用。也不能以兼容为由把缺口迁移为允许跨组赋值的已批准规则。新组体系的精确候选集合需产品确认，服务端必须按同一规则校验。

## 5. 新增、自动追踪、移动和交接

| 场景 | 当前已核事实 | 新方案适配关注点，不等于本轮批准 |
| --- | --- | --- |
| 手动/JSON 新增 | 任务构造器默认 `responsibleUid=操作人`；显式传值则保留；真实创建人另记 nick_name | 默认操作人在目标项目所属组有业务资格；若允许指定他人，使用已确认候选规则，不隐式授予项目权限 |
| 批量导入 | 前端保留 responsibleUid / responsibleAccount；后台默认/解析如 §4 | 名称/账号解析要限制目标组，无法匹配不得静默变成外组人员；默认回操作人还是行级失败需在实现评审明确 |
| 自动追踪规则 | `VideoMonitorAutoTrackService:623-691` 要求项目 creator/协作者；`:301-318` 新增网红记录 creatorUid=操作人。`VideoMonitorProjectStars` 没有 responsibleUid 字段 | 两库未定位到自动发现内容最终生成监控项及其 responsibleUid 赋值闭环。不能推定默认为项目Owner、规则创建人或人工操作者；需核实际调度/采集服务 |
| 监控内容移到另一项目 | `transToProject:1001-1053` 检目标项目和来源任务权限；Mapper `transProject:865-869` 只改 project_id/data_source，不改 responsible_uid | 已确认本期仅同业务组内容移动。保留负责人值本身可兼容“组成员作为负责人”；若候选收紧到项目 ACL，移动后可能成为无目标项目访问权的负责人，必须另定规则，不能自动加协作者 |
| 仅项目Owner发生账号级交接 | 项目 creator 和任务 responsible_uid 是独立字段；旧清退链分别执行两种更新 | 项目Owner换人不应无条件把所有内容负责人替换为新Owner；有其他组员负责的内容仍有独立分工 |
| 离职账号自己也是内容负责人 | `UserRelationService:1635-1644` 和异步步骤 `:586-592` 调 responsible_uid 迁移；Mapper `:871-883` 按 childUid + create_time > bindDate 批量更新，再另做项目 creator/成员变更 | 现有更新不是按项目/业务组收口；多组分批移交、不同接收人时不可原样复用全账号更新。内容负责人也应计入待接手业务清单，但不冒充项目Owner；归档免交接保留原值 |

旧迁移 SQL 的时间条件与项目 creator 迁移的 `>= bindDate` 条件不完全相同；新流程需核历史边界及幂等，不在本材料静默统一。自动追踪56记录 creatorUid 是否在账号交接中同步迁移，本轮未找到闭环，应单列研发核验。

## 6. 配额、统计和通知

- **Scope24 不按 responsibleUid。** `VideoMonitorTaskIndepentMapper.xml:777-821` 的普通用量 join 项目、按项目 creator 汇总，调整项按 `adjustment.owner_uid`。新增预检仍以请求操作账号走 quota（服务 `:2943` 附近），预检与最终归集的既有差异仍是研发待核项。
- **Scope56 不按 responsibleUid。** `VideoMonitorProjectStarsMapper.xml:232-240` 以网红记录 creator_uid + parent_uid 统计有效席位；自动追踪创建记录把 creatorUid 设为操作人。
- 改负责人只更新该字段，没有配额变更调用；不能在 Demo 或看板上展示为“配额转给新负责人”。
- 当前列表、筛选和期间变化输出携带当前负责人字段；`VideoMonitorDailyChangesMapper.xml:560` 同时输出 responsibleUid 和 creatorUid，`VideoMonitorDailyChangeService:1365` 还原此值。不能由此推导成该人在期间的实际操作量或把修改前的责任历史自动还原。
- 当前代码注释明确负责人展示名供页面和导出（`fillResponsibleNames:5267-5306`）。移除字段会影响列表、详情、筛选、导入和导出，而不只是删掉详情的一行。
- 本轮所核链路未发现“改派就向负责人发送接手通知”的调用，也未找到以 responsibleUid 作为权限或配额条件的代码。未检出不证明外部通知/调度服务不存在；不能新增承诺或把它当作已完成通知系统。

## 7. 保留、简化、移除的建议

| 选择 | 判断与成本 |
| --- | --- |
| **推荐：保留业务字段，澄清身份边界** | 最符合“既有模块逻辑尽量不改”。页面可称“内容负责人”，改派不影响项目Owner、ACL、创建人及额度。保留现有展示/筛选/导入导出；服务端补真实任务归属与负责人候选一致校验；清退按组处理该责任 |
| 简化为只允许项目Owner/协作者 | 不是当前事实。优点是被指派人天然有项目操作权；代价是额外收紧既有分工，处理存量非协作者负责人、撤协作、内容移动和组长隐式来源开关变化。没有使用证据前不建议因“更整齐”直接批准 |
| 移除负责人，统一归项目Owner | 代码上不是不可做，但会丢失同项目内逐条分工，并连带改变筛选/导入导出及交接。它既非权限源也非配额主体，移除收益有限，不应当成减少账号体系复杂度的必需动作 |

**候选范围建议，尚待确认：** 为最小增量，可从“旧组织所有账号”收口为“项目所属业务组的有效成员”，不要求都是项目协作者；对无项目访问权者只记录分工，不自动授权，并用清晰说明消除误解。若产品认为“负责人必须能实际处理”，再在“仅项目可操作账号”与“选人时显式另设协作”之间决策，不静默绑在一起。历史失效负责人应保留展示并标状态，清退流程另行接手，不默认改成Owner。

## 8. 研发评审必须补证

1. 当前线上 task/changeUser、批量新增/校验、task/updateTask 的实际部署与统一鉴权：真实 task -> project -> business group，不接受任意 projectId 代替任务归属。
2. 负责人候选目标规则及所有写入入口的一致校验；Excel 全局账号解析的边界、未知/外组账号返回方式与历史兼容。
3. 自动发现内容落任务的执行服务与默认负责人；规则创建人/负责人失权后的处理；不要用56记录创建人推定内容负责人。
4. 多组逐组移交中 responsible_uid 的扫描、接收与幂等；与项目Owner/协作者移交分别记录；归档组保留原值且不扩历史访问权。
5. Scope24 项目移动/账号交接后的计量及历史调整快照、Scope56记录 creatorUid 的交接口径。不得随内容负责人改派改变它们。
6. 线上列表、筛选、详情、Excel 导入/导出、仅负责人无ACL、改派后真实创建人不变的回归；后台默认与通知如不在这三库，明确外部服务负责人。

本材料只提供可追溯事实及建议。当前 Input/story/Demo 未随本次研究自动变更；候选限制、清退中的具体表单与外部调度默认值均不能据此视为已批准或已上线。
