# PM 研发确认问题包：当前代码证据

> 用途：回答 PM 的事实核查问题，不作为正式产品规则发布。
> 核对基线：旧服务 `project/KOLServer` 的 `dev-xs-xxl` / `c8f1ff327c`；新服务 `project/kol_server_v2` 的 `dev-xs-xxl` / `4a42875b`。
> 结论依据：静态代码及 Mapper 核对；本次未连接环境，未做接口实测。

## BLOCKER-01：CRM 写权限真值

### 判定规则

CRM 单条写权限由 `CommonInfoService.checkCrmEditPermission`（旧服务 `ServiceInternal/.../common/CommonInfoService.java:470`）判定，数据配置来自主账号的 `kol_data_management` 中业务类型 `crm` 的 `purviewId`。代码实际读取的规则为：

| 权限编号 | 代码含义 |
| --- | --- |
| `1` | 团队实际管理员可写。 |
| `2` | 记录 `ownerUser` 所在任一组的组长可写。 |
| `3` | 与 `ownerUser` 同组的成员可写，组长也包含在内。 |
| `4` | 当前主账号体系内所有成员可写。 |

`ownerUser` 自己始终可写。下表以记录的 `ownerUser` 非空、且各主体不是该记录 owner 为前提；`crm=[]` 代表没有配置任何上述权限。代码的同组判断读取 `kol_user_group_relation`：组长过滤值是该表的 `admin_status=1`。账户关系中展示的 `adminStatus=2` 不被该 CRM 权限函数直接读取，以下“同组组长”按 PM 所指的该产品角色解释。

| `crm` 配置 | 记录 owner | 团队管理员 `adminStatus=1` | 同组组长 `adminStatus=2` | 同组普通成员 `adminStatus=0` | 不同组普通成员 |
| --- | --- | --- | --- | --- | --- |
| `[]` | 是 | 否 | 否 | 否 | 否 |
| `[1]` | 是 | 是 | 否 | 否 | 否 |
| `[2]` | 是 | 否 | 是 | 否 | 否 |
| `[3]` | 是 | 否 | 是 | 是 | 否 |
| `[4]` | 是 | 是 | 是 | 是 | 是 |
| `[1,2]` | 是 | 是 | 是 | 否 | 否 |
| `[1,3]` | 是 | 是 | 是 | 是 | 否 |
| `[1,4]` | 是 | 是 | 是 | 是 | 是 |
| `[2,3]` | 是 | 否 | 是 | 是 | 否 |
| `[2,4]` | 是 | 是 | 是 | 是 | 是 |
| `[3,4]` | 是 | 是 | 是 | 是 | 是 |
| `[1,2,3]` | 是 | 是 | 是 | 是 | 否 |
| `[1,2,4]` | 是 | 是 | 是 | 是 | 是 |
| `[1,3,4]` | 是 | 是 | 是 | 是 | 是 |
| `[2,3,4]` | 是 | 是 | 是 | 是 | 是 |
| `[1,2,3,4]` | 是 | 是 | 是 | 是 | 是 |

`ownerUser` 为空是另一条兼容分支：无 CRM 配置时仅团队实际管理员可写；配置 `1` 时仅团队实际管理员可写；配置 `2` 或 `3` 时也仍仅团队实际管理员可写；配置 `4` 时团队所有成员可写。不能把上表直接外推到无 owner 的历史记录。

### 动作覆盖范围

| 动作 | 实际权限口径 | 代码证据 |
| --- | --- | --- |
| 对接人、合作状态、网红名称、网红链接 | 与上表一致。 | `CRMService.updateChannelInfo:1814` 先以数据库记录的 `ownerUser` 调用 `updateChannelPermission`。 |
| 归档 | 与上表一致。 | `CRMService.deleteChannel:1881` 使用同一校验。 |
| CRM 批量应用或删除标签 | 与上表一致，逐条校验；无权对象被跳过而不是统一返回 `10034`。 | `CRMService.batchUpdateChannel:1990`。 |
| 标签应用 `/ws/remark/saveRemark` | **不一致**：当前代码没有 CRM 写权限校验。 | `StarRemarkService.saveRemark` 直接以主账号维度维护标签关系。 |
| 标签定义删除 `/ws/remark/updateLabel` 的删除状态 | **不一致**：当前代码没有 CRM 写权限校验。 | `StarRemarkService.updateLabel` 直接更新或逻辑删除标签定义。 |

因此，不能将“标签应用、标签定义删除”与 CRM 普通写权限表描述为完全一致。

## BLOCKER-02：CRM 读范围

| 接口 | 当前裁剪逻辑 | 无权响应 |
| --- | --- | --- |
| `/ws/crm/getList` | 由登录 `uid` 先解析为 `parentUid`，Mapper 固定按 `crm.parent=#{parent}` 查询。请求中的 `ownerUser` 仅是列表筛选条件；未再按登录人、团队角色或组成员关系裁剪。没有 `teamId` 参与查询。 | 不存在逐记录“无权”错误码；跨团队不会命中该主账号的记录。 |
| `/ws/crm/getChannelDetail` | 由登录 `uid` 解析 `parentUid`，按 `parentUid + channelId + platform` 查一条；没有 `ownerUser`、`adminStatus` 或组成员判断。 | 未命中返回空数据，不抛 CRM 无权错误。 |
| `/ws/crm/getCRMRecord` | 由登录 `uid` 解析 `parentUid` 后查询操作记录；请求参数可参与渠道、平台、类型、操作人、时间等筛选，但没有基于登录人/记录 owner/组角色的二次裁剪。 | 未定义逐记录“无权”错误码；跨团队无法以不同 `parentUid` 查到记录。 |

路由位置为旧服务 `WebService/.../crm/CRMController.java:47、197、212`，服务位置为 `CRMService.java:396、1907、1956`，列表 SQL 为 `CRMMapper.xml:getCRMList`。`10034` 出现在普通 CRM 写权限校验失败场景，不是上述三个读接口的无权码。

## BLOCKER-03：可分配型 Scope 的组归属与原子校验

### 现行能力矩阵

`scope_quota_product_rules.md` 中各 Scope 的产品分类（结果消耗、一次解锁、容量/席位、频率限制和功能门禁）可以继续作为业务分类参考；但所有“可分配额度”的账号模型只有主账号与单个操作账号两层，当前没有组或 `GroupMembership` 这一层。

| 维度 | 当前旧服务 | 当前新服务 | 结论 |
| --- | --- | --- | --- |
| 团队总额度 | 按 `parentUid + scopeId` 读取角色权益、汇总历史用量。 | `AccountPermissionService.resolveScopeContext` 按 `parentUid + scopeId` 汇总。 | 已有。 |
| 子账号个人上限 | `kol_user_scope_allocate(uid, scope_id, quota_default)`；`GET /ws/quota` 读取，团队管理员通过 `POST /ws/quotaChange` 保存。 | `KolUserScopeAllocateMapper.getWithUidAndScopeId(uid, scopeId)` 读取同一 UID 维度记录。 | 已有，仅单 UID。 |
| 向组分配上限 | 无 `groupId` 参数、字段或查询条件。 | 无 `groupId` 参数、字段或查询条件。 | **净新增。** |
| 向 `GroupMembership` 分配上限 | 无模型、无保存接口、无读取逻辑。 | 无模型、无保存接口、无读取逻辑。 | **净新增。** |
| 一人多组的个人上限 | 无 `uid + groupId + scopeId` 存储或优先级规则。 | 无该存储或规则。 | **净新增。** |
| 对象动作取得稳定 `groupId` | 各 Scope 消费对象没有统一配额组归属字段或解析器。 | 同样没有。 | **净新增。** |
| 搜索、榜单、详情等无对象动作的 `currentGroupId` | 请求与配额上下文均没有该字段。 | 请求与 `AccountScopeContext` 均没有该字段。 | **净新增。** |
| 团队去重 Scope 的首次 `actorUid + groupId` 归属 | 历史记录只有主账号、操作人和业务对象等既有字段，未记录配额组；不存在首次归属写入。 | 通用历史读取按 `uid/parentUid/scopeId`，无配额组字段。 | **净新增。** |
| 组织、组、成员上限与消费的同一原子边界 | `/ws/quota`、拦截器校验和具体业务消费分散实现，未发现组织/组/成员三层的统一事务或等价原子扣减器。 | 新服务只提供上下文解析，没有组级消费原子器。 | 组级能力为 **净新增**；现有消费不能直接视为已满足该原子要求。 |

旧服务入口为 `VipOverviewController.java:64、82` 与 `KolRoleService.quota:522`、`quotaChange:128`、`getRealQuota:593`；请求拦截预校验在 `RequiredScopeInterceptor.handleQuota`。新服务入口为 `AccountPermissionService.resolveScopeContext:66`，个人上限读取在 `resolveSubAccountQuotaLimit:437`。两边均未命中 `groupId`、`currentGroupId` 或 `GroupMembership` 的 Scope 分配和消费实现。

### 统计、周期、去重与释放

这些规则取决于每个 Scope 的业务产品类型，而不是分配维度：例如 `34`、`4`、`59`、`84` 是团队维度的对象去重解锁；`87` 是周期内按结果数的团队用量；`17`、`31`、`32`、`56`、`71` 是容量或席位；`15`、`18` 等只是功能门禁。个人分配存在时，现行系统再以操作 UID 的历史使用量限制该人，但不会把用量绑定到一个组。

释放或返还也仍由模块业务实现，而不是 Scope 分配层统一处理。例如取消或暂停的席位类能力可能释放，占期用量或一次解锁类一般不返还。新增组级能力时，必须为每一类明确“组内去重对象、周期、释放事件和跨组迁移规则”，不能由当前 UID 规则推断。

### Scope 78 的现行实现

旧服务 `KolScopeService.java:188、277` 为 Scope `78` 统计 `KolScopeHistoryTtsDetail`。新服务 `project/kol_server_v2@4a42875b` 已实现同一能力：`TtsDetailQuotaService` 以 `parentUid + type + detailId` 判断团队是否已解锁，商品、店铺、直播共用 Scope 78；首次解锁在主账号 Scope 78 分布式锁内重新校验额度并以 `insert ignore` 写入历史。`AccountPermissionService` 按当前周期统计该历史表，个人上限仍按操作 UID 生效。

正式文档 [scope_quota_product_rules.md](./scope_quota_product_rules.md) 已按该分支修正 Scope 78 的代码锚点，并保留其团队去重解锁的产品规则。

## BLOCKER-04：支付身份与可见范围

| 问题 | 当前结论 | 代码证据 |
| --- | --- | --- |
| 付款单 `flagForMe` 缺省/`false` | 均查询当前主账号体系的全部付款单。 | `BusinessPaymentListParam.flagForMe` 默认 `false`；`PaymentService.businessPaymentList:509` 仅在 `true` 时传入 `creatorUid`。 |
| 付款单 `flagForMe=true` | 仅查询当前登录人创建、且属于当前主账号体系的付款单。 | 同上；`BusinessPaymentMapper.xml:searchBusinessPaymentVo` 固定 `parent_uid`，可选 `creator_uid`。 |
| 草稿 `flagForMe` 缺省/`false`/`true` | 草稿列表参数模型没有该字段，三种请求均不改变查询；草稿始终仅返回当前登录人的草稿。 | `DraftListParam` 无 `flagForMe`；`PaymentService.getDraftList:2361` 调用 `selectByUid(uid, ...)`。 |
| `editFlag` | 列表 `editFlag` 只等于 `creatorUid == 当前 uid`。 | `PaymentService.businessPaymentList:509` 的 `setEditPermission`。 |
| 订单写接口服务端鉴权 | 不要求创建人；先锁定订单，再只验证订单 `parentUid` 等于当前用户解析的 `parentUid`，随后再校验订单状态。团队任一成员可操作同团队的非本人订单。 | `PaymentService.permissionCheck`，由更新、取消、改预约、转立即支付、手动发起等接口调用。 |
| 草稿写接口服务端鉴权 | 已有草稿仅其 `uid` 相等者可读、更新、删除。 | `PaymentService` 草稿保存、详情、删除分支。 |
| 创建人字段 | 付款单有 `creatorUid`、`parentUid`；草稿有 `uid`。新建或复制草稿时均由当前登录人写入。 | `BusinessPayment`、`BusinessPaymentDraft` 与 `PaymentService.addBusinessPayment/saveDraft/copy`。 |
| 历史回填 | 当前代码没有回填逻辑。若历史 `creator_uid` 或草稿 `uid` 缺失，现有订单日志不记录操作人，不能仅依靠代码稳定还原原创建人。 | `BusinessPaymentLog` 只有订单、状态、时间、备注等字段；未发现迁移。 |
| 余额何时占用 | 预约单与立即支付单均在创建付款单时，以主账号钱包锁行，把预估金额从 `balance` 转入 `pending`；不是预约实际发起时。 | `PaymentService.addBusinessPayment:223`、`payForCreate:300`。 |
| 取消或审核拒绝 | 取消、审核拒绝均把冻结预估金额从 `pending` 返回 `balance`。 | `payForCancel:885`、`refusePayment:1503`。 |
| 三方建单失败 | 异步三方建单没有返回订单时，恢复预估冻结，订单置退款成功并写钱包变更日志。 | `createAirPay:1388`。 |
| 三方退款/召回 | `thirdRecallRepairStart` 和 `thirdRecallRepairEnd` 有已退款后补扣第三方手续费的逻辑。当前 `PaymentNotifyController` 已整体注释，不能据此确认一个有效的外部退款回调闭环。 | `PaymentService:2125、2172`；`WebService/.../PaymentNotifyController.java`。 |
| `getReceiveInfoByChannel` 租户隔离 | 使用付款单的 `parent_uid` 加 `channel_id + platform` 作为隔离条件，不按创建人或项目隔离。 | `PaymentService.getReceiveInfoByChannel:2238`、`ReceivesInfoMapper.xml:selectByChannel`。 |

这里存在一个产品与服务端不一致点：`editFlag=false` 只是列表展示信号，当前不能作为“服务端不可编辑”的依据。

## BLOCKER-05：成员清退副作用

`POST /ws/userRelation/setAdmin` 在 `status=2` 的删除成员分支会调用 `UserRelationService.evict`，**不是只解除成员关系**。`setAdmin:888` 与 `evict:438` 均有 `@Transactional`；同步调用的资产迁移、成员关系删除及事务事件处理处于该外层事务中，任何异常会抛出并回滚。`status=0/1` 是角色/分组调整路径，不进入这套清退迁移。

| 模块 | 清退规则 |
| --- | --- |
| CRM | 绑定日后的 CRM `ownerUser`、最近对接人、最近回复人转给团队管理员；CRM 分组、属性和分组成员关系同步迁移或清理。 |
| 推广任务 | 绑定日后创建的项目创建人转给团队管理员；成员关系去重后替换。 |
| 邮件项目与任务 | 项目/任务创建人转给团队管理员；成员关系去重、替换或删除。 |
| 支付单 | 绑定日后由被清退账号创建的付款单 `creator_uid` 转给团队管理员。未发现草稿转移。 |
| 收藏夹、资源池、消息、视频监控、联盟营销、Campaign | 分别转移对象责任人/创建人，并清理或替换成员关系；消息中心还由同步事务事件重建个人分配投影。 |
| 账号能力与队列 | 作废 Skill API Key；清理发件队列、按规则暂停 Campaign；迁移若干配额和历史归属。 |

关键代码位置：`UserRelationService.transFormCrm:558`、`transFormOfferForEvict:1281`、`transFormEmailProjectForEvict:1303`、`transFormBusinessPayment:1398`，以及各 Mapper 的同名 `transForm...` SQL。支付草稿没有同名迁移 SQL，不能表述为已自动转移。

## BLOCKER-06：审计能力

在旧服务与当前新服务中，未发现可复用的跨模块审计表或通用审计服务，能够同时记录并查询 `actorUid`、`ownerUid`、`targetUid/objectType/objectId`、`action`、`before/after`、`result/errorCode`、`occurredAt`。

现有记录不能替代：

| 现有记录 | 缺失内容 |
| --- | --- |
| `/ws/userRelation/getAccountLog` | 实际查询邀请码关系日志，只覆盖邀请关系；没有通用对象、前后值、执行结果与错误码。 |
| CRM 操作记录 | 有部分操作人、对象和操作内容，但不是跨模块模型，且没有统一的前后快照和结果/错误字段。 |
| 支付单日志 | 有订单状态变化和备注，但没有完整操作人、对象所有人和结构化前后值。 |

本版本若要求满足审计，应新增最小可复用模型：`parentUid`（租户隔离）、`actorUid`、`ownerUid`、`targetUid`（可空）、`objectType`、`objectId`、`action`、`beforeJson`、`afterJson`、`result`、`errorCode`、`occurredAt`。`getAccountLog` 不能替代。

## 需要产品或研发负责人确认的冲突

1. CRM 标签定义和直接标签应用没有复用 CRM 写权限；若产品期望它们受 `crm=[]` 矩阵约束，需要独立补齐服务端鉴权，不能仅修改产品说明。
