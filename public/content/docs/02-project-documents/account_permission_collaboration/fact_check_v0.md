# 账号权限、协作和配额管理实现事实核验 v0

> 状态：前端代码事实、服务端 Scope 产品口径及 CRM/支付/清退/审计静态代码真值已核验；运行环境、存量数据质量和目标迁移方案仍需后续验证。
> 核验日期：2026-07-23；对象协作层级复核：2026-08-14；服务端 Scope 配额口径复核：2026-08-17；研发静态代码确认：2026-08-18。
> 需求基线：`input_v0.md`。
> 实现基线：`../kol-next` `origin/master@44c7e221b`；服务端规则基线：`scope_quota_product_rules.md`（`last_verified_at: 2026-08-14`，`confidence: medium`）；研发确认基线：旧服务 `project/KOLServer` `dev-xs-xxl@c8f1ff327c`、新服务 `project/kol_server_v2` `dev-xs-xxl@4a42875b`，详见 `pm_confirmation_code_evidence_2026-08-18.md`。研发确认仅做静态代码和 Mapper 核对，未连接环境或执行接口实测。

## 1. 核验目的

本文件只回答两类问题：

1. 聚星当前已经有什么，可以直接增量复用。
2. 哪些行为仍无法从现有代码和线上证据证明，进入 spec 前必须补运行环境、数据扫描或目标方案。

本文件不重新讨论已经在 Input 中确认的目标规则。目标规则与现状不一致时，以 Input 为目标，以本文件记录迁移缺口。

## 2. 证据等级

| 等级 | 定义 | 使用方式 |
| --- | --- | --- |
| A | 线上页面与当前代码相互印证 | 可作为存量迁移和回归基线 |
| B | 当前前端代码、知识库或接口契约可直接证明 | 可进入 spec，但不能外推后端副作用 |
| C | 指定后端提交上的 Java 服务、Mapper 或鉴权代码可直接证明 | 可作为现行实现基线；不能外推部署分支、数据库数据质量或外部回调可用性 |
| D | 必须依赖运行环境、数据库扫描、接口实测或外部系统回调 | 仍是迁移或上线前验证项，不能由静态代码替代 |

## 3. 总结论

| 主题 | 已有基础 | 明确缺口 | 对 spec 的处理 |
| --- | --- | --- | --- |
| 账号与分组 | `adminStatus=0/1/2`、正式分组 CRUD、成员转组、组长、邀请和账号配额 | 角色判断跨模块不一致；当前成员仅有单组字段；邀请不能配置组内身份/配额；没有数据移交 | 复用账号关系和分组，拆分组织身份与多条 GroupMembership，新增邀请配置和移交任务 |
| CRM | 四项写权限组合真值已确认；当前记录在同一主账号体系内全员可读；`ownerUser` 天然可写 | 同组规则仍依赖现有单组关系；`ownerUser` 为空有兼容分支；标签应用和标签定义删除未接 CRM 写鉴权；没有记录级协作者 | 保留旧策略来源语义并新增对象授权；默认组迁移前必须解决旧分组语义和空 Owner，标签应用/定义动作需单独决策 |
| 邮件项目 | 创建人、协作者、`canManageMembers`、组织级强制管理员协作 | 没有协作者读写等级；配额归属不可证；角色只认 `adminStatus=1` | 以现有协作者关系为 Collaborator 迁移基础，`canManageMembers` 作为附加能力，统一角色解释和不可传递规则 |
| 资源夹 | 私有/公开/部分可见、`membersUid`、`myself` | 没有稳定 Owner 字段或协作者读写等级；公开范围与目标同组范围不等价；配额归属不可证 | 新增稳定 `ownerUid`；存量公开/部分可见按查看来源迁移，不能映射成批量协作者 |
| 内容监控 | 创建人、协作者、内容负责人、项目级接口 | `creator` 字段多形态；没有协作者读写等级；`isMaster` 语义不明；配额归属不可证 | 统一回填 `ownerUid`，既有协作者迁为 Collaborator；`responsibleUid` 保留为业务字段 |
| 跨境支付 | 正式支付单当前全组织可读且服务端写接口只校验同组织；草稿仅创建人可读写；创建正式单即冻结钱包 `pending`；历史收款账号按组织+频道隔离 | `editFlag` 只是前端信号；正式单与草稿可见范围不一致；缺失创建人无法由日志稳定回填；退款外部回调闭环不可证；没有组/账号支付额度 | 新增对象授权、执行权、组资金分配和账号上限；存量正式单/草稿不能用一个统一查看开关机械迁移，服务端写权限需按目标 ACL 收紧 |
| Scope 配额 | 已有组织/主账号 Entitlement 与部分子账号个人上限；服务端规则明确区分消耗、团队去重解锁、容量/席位、窗口、频率和门禁 | 当前没有目标 `groupId` 上限、`uid + groupId` 多组个人上限和统一的业务上下文归属；各 Scope 的可分配性尚未形成确认矩阵 | 先建立 Scope 类型/可分配性矩阵；仅可分配型新增组织/组/GroupMembership 三级上限，不可分配型随组织权益；支付金额继续独立建模 |
| 成员清退 | 当前删除成员会在同一事务中转移多个模块资产并删除关系 | 现有流程没有 `REMOVING`、接收人选择或异步移交；支付草稿不迁移；部分 SQL 改写创建人 | 新状态机必须替换现有 `status=2 -> evict` 的立即副作用，不能在进入 `REMOVING` 时复用旧删除分支 |
| 审计与通知 | 账号邀请记录、业务零散日志、系统通知列表和实时消息底座 | 已确认没有满足目标字段的跨模块通用审计；成员事件未接入通知 | 新增最小统一审计事件；不等同于本期建设完整用户侧活动中心；移交复用通知底座并新增消息类型和摘要页 |

对象协作层级的复核结论：当前已存在项目协作者的邮件、资源夹/收藏夹、内容监控模块均未发现通用 `Viewer / Editor` 两级；协作者关系提供对象访问和模块常规业务操作，创建人/Owner 保留部分治理动作，`canManageMembers` 等字段只表达额外能力。CRM 自定义视图的 `viewAuthors` 是视图分享，不是 CRM 记录 Viewer；CRM 记录和支付单当前没有可证明的对象协作者。因此目标方案采用 `Owner / Collaborator`，只读需求另建查看范围或显式查看授权，不从内部变量名或范围字段反推只读协作者。

## 4. 账号、角色与分组

### 4.1 已证事实

1. `adminStatus` 当前是枚举：`0=成员`、`1=管理员`、`2=组长`。证据：`../kol-next/assets/script/constant/subAccount.js:27`。
2. 跨模块解释不一致：
   - 成员页和配额页使用 `Boolean(adminStatus)`，会把 `1/2` 都视为管理态。证据：`../kol-next/pages/brand/sub-account/index.vue:466`、`pages/brand/sub-account/quota.vue:448`。
   - 邮件强制管理员协作只认 `adminStatus=1`。证据：`../kol-next/assets/script/utils/emailProjectCollaborator.js:6`。
3. 正式分组已有增删改、成员单组归属、转组和设置组长接口；成员侧字段主要使用 `teamId`，接口仍混用 `group` 命名。证据：`../kol-next/api/setting/subAccount.js:16`、`components/setting/subAccount/groupSelect.vue:327`。
4. 当前邀请弹窗只提交 `{ emails }`，不能同时设置分组、账号等级、模块权限或配额。证据：`../kol-next/components/setting/subAccount/dialog/addMember.vue:22`、`pages/brand/sub-account/index.vue:630`。
5. 当前清退仅提交成员关系变更，没有接收人、资产预检查或移交任务。证据：`../kol-next/pages/brand/sub-account/index.vue:608`。
6. `/ws/userRelation/getAccountLog` 是邀请/成员关系操作记录，不是通用业务审计。证据：`../kol-next/api/setting/subAccount.js:12`、`pages/brand/sub-account/index.vue:193`。
7. `/notifications`、NIM 在线消息和系统通知列表可复用，但当前未发现成员转组/清退数据移交消息类型。证据：`../kol-next/api/notifications.js:10`、`store/notifications.js:29`。

### 4.2 结论

- `adminStatus` 不能继续作为同时表达组织身份和组内身份的单值字段，也不能通过 `Boolean(adminStatus)` 分散判断。spec 必须定义统一的组织身份与 GroupMembership 字段，并逐模块替换旧判断。
- `adminStatus=1 -> Organization Admin`、`adminStatus=2 -> 默认组 T2`、`adminStatus=0 -> 默认组 T3` 可作为迁移候选，但唯一组织 Owner 仍需由账号关系字段单独识别，不能只靠 `adminStatus=1`。
- 真实默认组和多条 GroupMembership 是目标模型，不是当前前端已有实体；不能声称存量已经支持。迁移后不保留隐藏分组业务态。
- 成员数据移交是净新增 P0，不是补全一个已有弹窗。

### 4.3 服务端 Scope 配额事实

`scope_quota_product_rules.md` 是本轮服务端团队提供的跨模块规则基线，元信息为 `last_verified_at: 2026-08-14`、`confidence: medium`。当前工作区没有其所列 Java 服务端仓库，因此以下内容属于“服务端规则文档直接陈述”的 B 级证据，不等于已在本地重新核验代码实现。

1. Scope 是套餐和账号权益标识，不是统一的扣次余额。现有产品至少包含按结果消耗、团队去重的一次解锁、资源席位或容量、结果窗口、频率限制和纯功能门禁六类语义。
2. 组织/主账号权益是父级硬边界；子账号个人配置只能收窄已有权益，不能创造组织套餐没有的 Scope。团队共享或实际操作账号统计、周期、去重对象、返还和释放规则均由具体 Scope 决定。
3. 现行规则已经存在“部分 Scope 可为子账号设置个人上限”的能力；研发已确认目标模型中的组级上限、`uid + groupId` 多组个人上限、统一 `groupId/currentGroupId` 用量归属和三级原子消费均不存在，全部是净新增能力。
4. Scope 不授予项目访问或协作权限。对象 Owner/Collaborator、查看范围、附加能力和 GroupMembership 鉴权必须独立成立。
5. 搜索、榜单、详情等无项目对象动作也会产生 Scope 使用。目标模型必须由服务端验证 `currentGroupId`；对象型动作则取对象稳定 `groupId`，不能由前端自行选择扣到哪个组。
6. 跨境支付金额不属于普通 Scope 的统一数值契约，继续由组织钱包可用余额、组级追加分配账本、账号人工上限和资金占用台账约束；组/账号支付限制同样是净新增能力。

进入 spec 前仍需产品与研发把现有 Scope 逐项标记为“可向组/成员分配 / 仅组织继承”，并确认目标组上下文、原子校验、存量个人上限迁移及各类 Scope 的去重/周期/释放方案；研发回复已经证明这些不能直接复用现行 UID 两层逻辑。

## 5. CRM

### 5.1 A 级事实

线上 CRM 数据管理已展示四项写权限，截图：`crm_write_permissions_online.png`。

| 值 | 线上文案 | 当前前端字段 |
| ---: | --- | --- |
| 1 | 对接人和管理员可编辑 | `crm: number[]` |
| 2 | 对接人和同组组长可编辑 | `crm: number[]` |
| 3 | 对接人和同组成员可编辑 | `crm: number[]` |
| 4 | 所有人可编辑 | `crm: number[]` |

证据：`../kol-next/assets/script/constant/subAccount.js:53`、`pages/brand/sub-account/data.vue:27`。

四项是独立 checkbox，前端允许任意组合；读取和保存分别调用：

- `GET /ws/userRelation/getDataManage`
- `POST /ws/userRelation/updateDataManage`

前端只整包提交 `{ crm: [...], email: [...] }`，不计算互斥、覆盖或优先级。

### 5.2 B 级事实

1. CRM 列表 `POST /ws/crm/getList` 只提交 `id/pageNum/pageSize/filter` 和可选关键词；没有授权范围参数。证据：`../kol-next/components/crmDetail/crmList/crmTable/index.vue:574`。
2. `filter.ownerUser` 是用户主动筛选对接人，不是数据授权字段。
3. 详情接口只使用 `platform/channelId`；前端未发现按当前账号或角色执行的读门禁。
4. 前端写入口通常直接展示，失败依赖后端返回 `10034`；因此真实写权限也由服务端决定。
5. `ownerUser` 已支持单条和批量修改，可作为目标 `ownerUid` 的迁移来源。证据：`../kol-next/components/crmDetail/crmList/crmTable/index.vue:710`、`crmTable/tableOption.vue:333`。
6. CRM 创建入口不提交 `ownerUser`，默认对接人由后端决定。
7. `viewAuthors` 只用于自定义视图共享，不能迁成 CRM 记录 Viewer。证据：`../kol-next/components/crmDetail/common/dialog/createEditView.vue:213`。

### 5.3 C 级服务端确认

研发已按 `project/KOLServer@c8f1ff327c` 核对，完整矩阵见 `pm_confirmation_code_evidence_2026-08-18.md`：

1. `ownerUser` 非空时，Owner 始终可写；权限 `1/2/3/4` 分别增加团队实际管理员、Owner 同组组长、Owner 同组成员、当前主账号体系全体成员的普通写权限。多个选项取并集，没有负向覆盖。
2. `ownerUser` 为空时走兼容分支：配置 `[]/1/2/3` 均只有团队实际管理员可写，配置 `4` 才允许团队全体成员写。不能把非空 Owner 的组合表外推到这类历史记录。
3. `/ws/crm/getList`、`getChannelDetail`、`getCRMRecord` 均只按登录账号解析出的 `parentUid` 做租户隔离，不按登录人、Owner、角色或组进行记录级裁剪；当前 CRM 记录在同一主账号体系内全员可读。
4. 普通字段更新、归档以及 CRM 批量标签应用/删除使用 CRM 写权限，其中批量操作逐条跳过无权记录；直接标签应用 `/ws/remark/saveRemark` 和标签定义删除 `/ws/remark/updateLabel` 没有复用 CRM 写权限。

### 5.4 D 级迁移阻塞项

- 扫描存量 CRM `ownerUser` 为空的数量、组织分布和可回填来源；静态代码无法给这类记录生成稳定唯一 Owner。
- 现有权限 `1` 面向团队实际管理员，不要求管理员属于记录组；目标模型若要求 Admin 同时是记录组成员才可写，会收窄存量管理员权限，必须与权限 `4` 的跨组收窄一起显式决策。
- 现有 CRM “同组”读取 `kol_user_group_relation`。若把原有多个组全部压入一个默认组，权限 `2/3` 会扩大，不能继续声称机械等价；必须先确定保留旧组映射、增加迁移授权来源或接受权限变化中的一种。
- 决定 CRM 直接标签应用是否继续保持全组织可操作，还是收敛到记录普通写/对象 ACL；若收敛，属于明确的权限收紧并需新增服务端鉴权。
- Owner 转交后的数据范围、历史记录和并发语义仍需在目标 spec 中定义。

## 6. 邮件、资源夹与内容监控

### 6.1 邮件项目

已证：

- 项目列表项 `uid` 表示创建人候选；协作者使用 `membersUids`。
- `creatorFlag=1` 或 `canManageMembers=1` 的当前用户可以管理协作者。
- 创建/编辑提交 `members[{memberUid, canManageMembers}]`，现有模型已具备“协作者附加管理能力”的雏形。
- 协作者记录没有 Viewer/Editor 或只读/可写等级字段；`canManageMembers` 只增加协作者管理能力，不是基础读写等级。
- 发送请求只传项目 `id`、定时字段和 `contentType`，不传 actor、Owner 或扣额账号。
- 发信和邮箱解锁额度查询只传 scope，不传用户归属字段。

证据：`../kol-next/components/email/project/list.vue:163`、`pages/email/project-list.vue:267`、`components/email/dialogs/createEdit.vue:674`、`pages/email/detail-edit.vue:484`。

待后端确认：邮件发送按实际操作人、项目创建人、组织主账号还是邮箱授权记录所有人扣额。

### 6.2 网红资源夹/收藏夹

已证：

- `scope=0/1/2` 表示私有、公开、部分可见；部分可见账号保存在 `membersUid`。
- `myself` 控制删除和权限/协作者编辑，是 Owner-like 返回字段；页面展示的创建人主要是邮箱。
- 当前没有 Viewer/Editor 协作者等级；`scope` 首先表达资源夹可见范围，`myself` 表达治理主体，不能直接把公开或部分可见成员解释为不同协作者角色。
- 新建/编辑不提交稳定 Owner UID。
- 资源夹数量和夹内网红数量分别使用 scope `31/32`，额度查询不传扣额账号。

证据：`../kol-next/components/resource/resource_dialog/edit_dialog.vue:54`、`components/resource/resourceList/resourceItem.vue:29`、`pages/resource-folder/group.vue:37`。

待后端确认：`myself` 的精确定义，以及共享资源夹由协作者操作时的配额归属。

### 6.3 内容监控

已证：

- 当前同时存在项目创建人 `creator/creatorInfo`、项目协作者 `members/membersUid` 和单条内容负责人 `responsibleUid`。
- 创建人控制部分项目编辑/归档；`isMaster` 另行控制删除和批量操作。
- 创建/编辑项目提交 `projectName/description/membersUid/status/id`；批量协作者接口提交 `projectIds/membersUid/flagAddOrRemove`。
- 协作者关系没有 Viewer/Editor 等级字段；常规监控业务动作与创建人/`isMaster` 控制的治理动作需要在目标动作矩阵中分开承接。
- 新增监控 scope 为 `24`，自动追踪 scope 为 `56`；业务请求没有扣额账号字段。

证据：`../kol-next/pages/video-monitor/list.vue:210`、`components/videoMonitor/projectList/projectCard.vue:14`、`components/videoMonitor/monitor/addAndAutoTrack/index.vue:207`。

待后端确认：`isMaster` 的精确语义、协作者新增监控时的扣额账号、`responsibleUid` 是否影响额度。

## 7. 跨境支付

### 7.1 B 级事实

1. 支付单首屏明确发送 `flagForMe=false`；筛选文案语义是“自己创建的支付单”。证据：`../kol-next/pages/payment/list/list.js:103`、`:276`。
2. 草稿首屏只传 `pageNum/pageSize`，筛选后才传 `flagForMe`，与支付单存在入参差异。证据：`../kol-next/components/payment/draftSection.vue:90`、`pages/payment/list/list.js:632`。
3. 前端没有 Owner、组范围或 ACL 判断；主要依赖后端 `editFlag` 决定支付单能否编辑。
4. 新建/草稿提交走 `addBusinessPayment`，编辑走 `updateBusinessPayment`；预约、转立即支付、手动放行是独立接口。
5. 支付单没有删除接口，只有取消/作废；草稿使用 `deleteDraft({orderId})`。
6. 钱包字段为 `balance/paid/pending/loss`；初始化支付单还返回 `minPayAmount/minWalletAmount`。这些是组织钱包和支付约束，不是账号数据配额。
7. 历史收款账号查询仅传 `channelId + platform`，前端无法证明其租户范围。证据：`../kol-next/api/payment.js:64`、`components/payment/paymentDialog.vue:1860`。

### 7.2 C 级服务端确认

研发已按 `project/KOLServer@c8f1ff327c` 核对：

1. 正式支付单 `flagForMe` 缺省/`false` 返回当前主账号体系全部记录，`true` 只返回当前登录人创建的记录；列表 `editFlag` 仅表示 `creatorUid == 当前 uid`。
2. 正式支付单更新、取消、改预约、转立即和手动发起等服务端写接口不要求创建人，只校验订单 `parentUid` 与当前登录人解析出的 `parentUid` 相同并继续校验状态。因此同组织任一成员当前都可能操作非本人订单，`editFlag=false` 不能作为服务端拒绝依据。
3. 草稿没有有效的 `flagForMe` 过滤语义，列表、详情、更新和删除均按草稿 `uid` 限制为当前创建人。
4. 正式单已有 `creatorUid + parentUid`，草稿已有 `uid`；若历史字段缺失，现有支付日志没有操作人，不能仅依靠代码稳定回填。
5. 预约单和立即支付单都在创建正式支付单时锁定主账号钱包并把预估金额从 `balance` 转入 `pending`；取消、审核拒绝和三方建单失败会释放。退款/召回存在修复逻辑，但外部通知控制器被整体注释，不能证明线上退款回补闭环。
6. 历史收款账号按付款单 `parent_uid + channel_id + platform` 隔离，已确认是组织内同频道共享，不按创建人或项目隔离。

### 7.3 D 级迁移阻塞项

- 正式支付单全组织可读、草稿仅创建人可读，无法用一个同时作用于草稿和正式单的“同组成员可查看支付单”开关无损迁移；必须定义生命周期阶段差异或独立迁移授权来源。
- 线上 UI 以 `editFlag` 隐藏非创建人编辑，但服务端实际放行全组织写。目标 ACL 收紧属于必要的安全修复，应单列回归和兼容说明，不能将当前服务端宽权限迁成 Collaborator。
- 扫描 `creator_uid/uid` 缺失记录并确定 Owner 兜底；无法稳定回填的对象不能直接进入“唯一 Owner”模型。
- 新增组级追加分配、账号上限、`fundingGroupId/fundingUid` 占用、受控冲正和退款回补时，必须补充支付域原子账本与幂等契约；本次旧问题包没有覆盖这些新增实现。

## 8. 研发确认问题包与回填状态

原问题要求研发以“代码位置或接口实测结果”回答，不接受仅回复“应该是”。

2026-08-18 已收到 `pm_confirmation_code_evidence_2026-08-18.md`。其证据边界为指定后端提交上的静态代码和 Mapper，不是环境实测。回填状态如下：

| Blocker | 事实状态 | 剩余工作 |
| --- | --- | --- |
| 01 CRM 写权限 | 16 种组合及普通字段动作已关闭 | 标签直接应用/定义删除未接鉴权；空 Owner 与旧组迁移待决策 |
| 02 CRM 读范围 | 已关闭：当前同组织全员可读 | 目标拆组后的读范围收敛与迁移验收待设计 |
| 03 Scope 组归属与原子校验 | 已关闭现状判断：目标组/多组/原子能力全部净新增 | 产品 Scope 可分配矩阵、迁移和新原子契约待设计 |
| 04 支付身份与可见范围 | 当前正式单/草稿范围、写鉴权、钱包占用和收款账号隔离已关闭 | 生命周期迁移、缺失 Owner、退款闭环及新增支付额度账本待解决 |
| 05 成员清退副作用 | 已关闭：当前会同步迁移资产并删除关系 | 新 `REMOVING` 状态机必须替换旧立即清退分支 |
| 06 审计能力 | 已关闭：没有可复用的跨模块模型 | 本期新增最小审计事件契约 |

<details>
<summary>已回包的原始问题（留档，不再作为待回复项）</summary>

### BLOCKER-01 CRM 写权限真值

请给出 `crm=[]` 的全部 16 种组合，分别对以下主体是否可执行普通 CRM 写操作：

- 记录 `ownerUser`
- `adminStatus=1`
- 同组 `adminStatus=2`
- 同组 `adminStatus=0`
- 不同组普通成员

同时明确四项权限覆盖的动作：对接人、合作状态、网红名称、网红链接、归档、标签应用、标签定义删除是否一致。

### BLOCKER-02 CRM 读范围

请说明 `/ws/crm/getList`、`/ws/crm/getChannelDetail`、`/ws/crm/getCRMRecord` 当前如何按 `uid/parentUid/teamId/adminStatus/ownerUser` 裁剪，并给出无权访问的错误码。

### BLOCKER-03 可分配型 Scope 的组归属与原子校验

请基于 `scope_quota_product_rules.md` 输出本版本 Scope 矩阵，至少逐项说明：

- 产品类型、是否允许向组和 GroupMembership 分配上限
- 团队共享或实际操作账号统计、周期、去重对象、返还/释放规则
- 现有子账号个人上限字段、读取/保存接口和存量值迁移方式
- 对象型动作如何从对象取得稳定 `groupId`；搜索、榜单、详情等无对象动作如何验证 `currentGroupId`
- 团队去重 Scope 首次使用如何原子归属 `actorUid + groupId`，后续复用如何避免重复计入
- 组织、组和 GroupMembership 上限如何与真正消费接口在同一事务或等价原子边界内校验

请同时说明 `/ws/quota` 当前如何解析组织和子账号上限，以及真正消费接口是否重新校验同一 Scope 口径。组级上限和 `uid + groupId` 多组个人上限若尚不存在，应明确标为净新增，不得按现行能力估算。

### BLOCKER-04 支付身份与可见范围

请提供：

1. 支付单 `flagForMe=false/true` 与草稿字段缺省/false/true 的真实返回范围。
2. `editFlag` 计算条件和各写接口的服务端鉴权条件。
3. 支付单/草稿当前创建人字段；若没有，是否可按历史数据稳定回填。
4. 预约提交何时占用组织余额，取消、失败、退款何时释放或冲正。
5. `getReceiveInfoByChannel` 当前租户隔离键。

### BLOCKER-05 成员清退副作用

请确认当前 `/ws/userRelation/setAdmin` 的删除成员分支是否会自动修改 CRM `ownerUser`、项目创建人、协作者、支付单或其他资产；若会，列出模块、规则和事务边界。若不会，明确回答“只解除成员关系”。

### BLOCKER-06 审计能力

请确认是否已有可复用的跨模块审计表/服务，能记录并查询：

- `actorUid`
- `ownerUid`
- `targetUid/objectType/objectId`
- `action`
- `before/after`
- `result/errorCode`
- `occurredAt`

若没有，本版本需按最小字段新建；`getAccountLog` 不能替代。

</details>

## 9. 已锁定的 spec 处理原则

以下结论已锁定，不因原问题包关闭而改变：

1. 账号等级使用明确枚举，不再把 `adminStatus` 当布尔值。
2. 实际操作人只从登录态取得，业务请求不得信任前端提交的 `actorUid`。
3. 已接入对象统一拥有稳定 `ownerUid`；创建人另存为不可变历史字段。
4. 对象身份只设置唯一 Owner 与 Collaborator；Collaborator 默认承接模块常规业务读写，不新增通用 Viewer/Editor 或 `can_edit`。
5. 只读需求使用查看范围或显式查看授权，不进入协作者列表，也不产生写权限；资源夹公开范围、CRM 视图分享等存量范围必须按真实语义迁移。
6. 显式协作者、显式查看授权和附加能力按对象实例保存，不能用模块级名单替代；只有组织的组长默认协作开关开启时，才单独计算并保留 T2 系统协作者来源。
7. 套餐 Entitlement、账号停用、组织关系或 GroupMembership 失效是硬拦截，Owner、对象授权和组织管理身份均不能绕过。
8. 只有 Scope 矩阵确认的可分配型 Scope 才新增组和 GroupMembership 上限；不可分配 Scope 直接继承组织 Entitlement，不建立成员级数值禁用。新使用事件记录实际 `actorUid`，对象型动作取对象 `groupId`，无对象动作取服务端验证的 `currentGroupId`；团队/账号统计、去重、周期和返还仍按具体 Scope 规则，不能统一推断为“实际操作人扣一次”。
9. 支付资金责任使用形成资金承诺时的 Owner 快照；执行人另记审计，不改变责任主体。
10. CRM 四项存量配置值不清空、不重置，也不默认为新策略；但组织管理员、旧 CRM 分组和“所有人”范围均无法直接等价映射为严格组隔离，具体迁移来源仍待产品确认。“组长默认成为组内所有项目协作者”对新、存量组织均默认关闭，因此上线不新增 T2 权限；组织后续主动开启时，T2 Collaborator 是单独的新增权限来源，必须做影响预览和审计。

## 10. 线上核验说明

- 已有 A 级证据：`crm_write_permissions_online.png` 与当前四项 CRM 配置代码一致。
- 2026-07-23 再次打开线上页面时，本机翻译扩展注入了第二个 `<body>`，导致 Playwright 自动快照 strict-mode 失败，随后浏览器上下文关闭。本次失败属于本地取证工具冲突，不作为产品缺陷，也不改变已有 CRM 线上证据。
- Scope 的跨模块产品类型和现行主子账号约束已有服务端规则文档基线；研发静态代码已关闭 CRM、支付、清退和审计的主要现状真值。目标组级/多组配额归属、原子校验、支付额度账本、存量数据质量及外部退款闭环仍需专项设计或运行环境验证。
