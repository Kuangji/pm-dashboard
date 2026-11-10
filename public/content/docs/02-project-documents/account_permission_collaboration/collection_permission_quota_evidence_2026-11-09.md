# 收藏夹权限与配额｜现状证据及评审问题

> 日期：2026-11-09。对应当前 [统一 Input](./phase2_input_v0.md)；仍在 Input 阶段，不新增 Spec/Design，不改生产实现。
> 本文区分产品确认、本地静态代码和线上只读观察。没有执行线上填写、保存、删除、解锁、收藏或移动操作，不能把代码推导的写行为称为线上实测。

## 1. 已确认的产品配额与协作方案

- Scope 31 收藏夹数量按现有普通配额逻辑处理，不改造成新增次数消费规则。
- Scope 32 是全局统一的单夹容量上限，不向组或个人下分，不提供个人分配或次数消耗设计；实际夹内容量拦截继续保留。配置主体、统计单位与历史计量不能因名称含“配额”就套统一消费。
- 收藏夹内 Scope 4 邮箱及 Scope 59 WhatsApp 的新解锁按实际操作者，保留组织历史解锁去重与复用；这是收藏夹入口规则，不覆盖邮件发送等其他入口的核算主体。
- 已确认三模式为私有、本组公开、指定成员；本组公开替代旧团队公开，业务组是跨组硬边界。普通内容读写来源为 Owner、指定成员模式的有效同组 Collaborator、本组公开模式的有效组员，以及组织全局 `t2Collaborator` 开启时的同组有效 T2；不是只读授权。
- 组长隐式来源使用既有组织全局开关，默认关闭，不新增模块/组级开关；私有夹也允许此来源，界面明确告知“私有仍受组织组长默认协作策略影响”。来源动态计算、锁定展示，不批量写显式 ACL，关闭/降级/退组仅撤销该来源，其他独立来源按自身条件保留。
- 夹名、说明、范围、协作名单、主动转交、删除整夹均为 Owner 专属日常治理；收藏夹不接入可下放的 `can_manage_collaborators`，Owner 也不能向协作者授予。显式协作者、本组公开和隐式组长只能按业务规则增减修改夹内容，不取得夹治理权；既有迁组和生命周期移交不因普通内容权限扩大而放宽。
- 存量上线在默认组保留原模式选择及指定名单，旧团队公开映射为默认组内公开，首次切换权限范围保持，组长开关默认关闭。后续主动拆组、迁夹或开启策略会改变作用范围，须说明影响，不承诺永不变化。
- 上述是本轮批准的产品目标，不是对旧现网三模式的重新描述。下方五条参考与线上只读观察保留原始证据层级；RQ-COL-01/02/03 仍待研发核验。

## 2. 证据快照

| 来源 | 本轮基线与边界 |
| --- | --- |
| 旧服务端 | 本地 `KOLServer master@706dc8ea0e`，静态核对服务与 Mapper，不等于线上部署版本 |
| 新服务端 | 本地 `kol_server_v2 master@234e9dad73`，同时存在收藏与权限/配额路径；与旧服务差异须核路由，不假定已替代旧链路 |
| 前端 | 本地 `kol-next codex/752-brand-reputation-radar@82f1e1014a`，有无关脏修改；本次只读，相关代码不等同 `origin/master`，也不据此推断已上线 |
| 线上 | `cn/resource-folder/list` 的一次普通子账号只读观察；不保留真实账号、客户、夹名、对象 ID 或额度数值，不新增写请求验证 |

## 3. 五条现状参考

以下作为本版讨论和兼容核对参考，其中写操作结论来自本地代码；并非已在线上逐条操作验证。

| 参考事实 | 证据与限制 |
| --- | --- |
| 同一夹内相同 `platform + channel + group` 重复不增加容量，跨夹分别占容量 | `BusinessCollectionMapper.xml:288–310` 按同夹、频道及平台判重；容量读取夹内实体数，不是收藏动作次数 |
| 移除明细释放该夹容量；成功移动使来源减少、目标增加 | `CollectionService.java:753、829、873`；目标已有项会跳过，不能保证请求中的全部对象都完成移动，也不能将移动回执一律写成整批成功 |
| 删除收藏夹软删主表，释放活动夹数量，内部明细和成员仍保留 | `CollectionService.java:573、585` 与 `CollectionGroupMapper.xml:166`；释放的是活动夹计数，不是物理清空全部业务与历史 |
| 邮箱解锁历史在组织内复用；删除条目或夹不返还已解锁次数 | `CollectionService.java:1592–1627` 与 `KolEmailUnlockHistoryMapper.xml:84`；对象删除与解锁历史是两条链路，不因容量释放重复收费或退回解锁 |
| 收藏夹数量或容量用尽，不取消已有数据读取 | 线上只读观察到夹数用尽仍可进入共享夹；详情展示单夹剩余。代码读取范围与容量拦截分离。未通过线上增删操作核实释放/回补，不把“可读”扩展为“任何写入仍可执行” |

## 4. 线上只读观察

- 已登录账号为普通子账号，账号上下文 `hasParent=true`、`adminStatus=0`；打开一个 `scope=1`、`myself=false` 的共享夹。旧“团队公开”不是新业务组的“本组公开”。
- 收藏夹数量剩余用尽仍能读列表与详情；详情剩余表达为统一单夹容量值减当前夹内 count。页面存在添加、上传入口，但入口存在不代表实际写权限或容量校验通过。
- 悬浮打开编辑表单时，名称和说明 input 可输入，scope 和成员 select 禁用。本轮未填写任何字段、未保存，已取消并关闭；因此只能证明 UI 状态，不能证明非本人可以成功改名或改说明。
- 观察到只读请求 `/ws/v2/collection/v2/groupList`、`groupDetail`、`listFieldConfig`、`listGroupChannel` 及 `/ws/v2/quota`。路径中的 v2 不直接证明全部行为由新服务端实现；最终路由与部署仍待核对。
- 未执行线上删除夹/明细、移动/复制、解锁、收藏或上传，也未扫描数据库。未保存真实客户与业务标识或具体额度值。

## 5. 静态代码锚点

路径相对相应仓库，行号固定于上述 HEAD；后续代码变更须重验。

| 仓库 / 文件 | 参考位置 | 本地证据 |
| --- | --- | --- |
| `KOLServer` / `ServiceInternal/src/main/java/com/nox/kol/service/CollectionUtilService.java` | `2428–2453` | 活动夹校验；scope 0 本人、1 团队、2 有效指定成员；先校验团队关联 |
| 同上 | `2534–2547` | 设置更新权限限本人，并校验未软删 |
| `KOLServer` / `ServiceInternal/src/main/java/com/nox/kol/service/CollectionService.java` | `538–563` | `updateGroup` 在更新名称、说明、范围和成员等全部字段前使用本人更新校验 |
| 同上 | `573、585` | 删夹走主表软删除，保留内部明细与配置 |
| 同上 | `666–753` | 普通收藏与夹内 count 容量校验；部分入口的对象范围校验须另核 |
| 同上 | `829、873、977` | 删除明细、移动、复制包含范围校验，移动过滤目标已存在项；不能概括为整批必成 |
| 同上 | `1592、1602、1624` | 邮箱先复用组织解锁历史，新解锁按操作 uid 预检、记账 |
| 同上 | `1493、1519、1526` | WhatsApp 保留组织历史去重，新解锁按操作 uid 记账 |
| 同上 | `2723–2728` | 旧批量收藏通过 `getRealQuota` 取单夹容量和夹数余额，与普通入口需核一致性 |
| `KOLServer` / `ServiceInternal/src/main/resources/com/nox/kol/mapper/BusinessCollectionMapper.xml` | `288–310` | 同夹频道/平台 `NOT EXISTS` 插入判重 |
| `KOLServer` / `ServiceInternal/src/main/resources/com/nox/kol/mapper/CollectionGroupMapper.xml` | `166–178、181–186` | Scope 31 活动夹实体计数；移交链路可改写夹 uid，不能把它直接当不可变创建人 |
| `KOLServer` / `ServiceInternal/src/main/resources/com/nox/kol/mapper/KolEmailUnlockHistoryMapper.xml` | `84–95` | 按组织历史查询已解锁邮箱，不依赖收藏明细是否仍存在 |
| `kol_server_v2` / `main.server/src/main/java/com/nox/kol/main/server/modules/collection/service/CollectionPermissionService.java` | `28–44` | 只见团队关联校验，未同旧 helper 一样检查 scope 与软删；不能直接等价 |
| `kol_server_v2` / `main.server/src/main/java/com/nox/kol/main/server/modules/shared/service/AccountPermissionService.java` | `500–531` | Scope 31/32 未列专属实体计数，走通用历史；与旧活动夹数/单夹 count 不同 |
| `kol_server_v2` / `main.server/src/main/java/com/nox/kol/main/server/modules/collection/service/CollectionBatchCollectService.java` | `61–67` | 批量收藏从当前上下文解析单夹容量和夹数剩余，取值需与普通入口对齐 |

## 6. 研发评审讨论

| 编号 | 需核问题 | 处理边界 |
| --- | --- | --- |
| RQ-COL-01 | 线上前端允许非本人输入名称/说明，本地后端 `updateGroup` 却全字段限本人；实际保存请求、部署版本及接口路由是否一致 | 产品目标已定为 Owner 专属治理、不下放 canManage，但本轮未保存，前后端及实际部署仍未验，不能宣称越权成功或问题已关闭 |
| RQ-COL-02 | 部分收藏入口、新旧服务端的对象范围与软删校验不一致。旧 `collect:666 -> channelCollection:753` 未明确统一调用 scope helper，而删/移/复已有；新 helper 只查团队关联 | 按已确认组内授权来源核实际路由、鉴权与访问回归，不将缺失校验当作无有效授权也能访问私有/软删夹的规则；合法组长策略来源与校验缺失不同，不在本轮修生产 |
| RQ-COL-03 | Scope 32 普通入口取父级套餐，旧批量与新服务端上下文不同；Scope 31/32 新历史计量与旧实体计量是否一致，单位和取值如何统一 | 保留已确认的全局统一单夹容量拦截、不下分。核夹数实体计量及容量值，不新增个人容量/次数消费设计 |

三项均是评审讨论/研发核对，不因产品定案、Demo 有入口或样例通过而自动关闭，不增加 Dxx 产品决策或故事编号。Demo 将示意三模式切换、Owner 范围/名单治理、动态本组公开与锁定组长来源，以及轻量内容增删/备注编辑，不实现真实配额、导入或持久化，也不宣称新方案已上线。切出指定成员模式时提示清理原指定名单并确认，沿用旧 scope 切换清名单逻辑；具体控件仅为示意，不新增权限策略或改变上述已确认边界。
