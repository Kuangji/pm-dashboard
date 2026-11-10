# CRM 与标签权限｜代码事实及待讨论边界

> 核查日期：2026-11-10。用于补充 [当前统一 Input](./phase2_input_v0.md)、[功能梳理](./账号和权限功能设计梳理.md) 和 [业务故事 S20–S21](./use_case_stories_v0.md#S20) 的事实依据，不替代正式产品结论，不推进 Spec。
> 本轮仅核查本地代码，未连接数据库、未读取建表索引、未进行线上接口或保存实测。**静态实现、已确认目标、待讨论方案和研发验收事项分层记录；不能把“代码里有”写成“线上已部署”，也不能把鉴权缺口当作合法业务规则。**
> **同日最终产品覆盖**：记录结构 B、权限 A 已确认：同达人各组独立业务记录、共享基础资料；不新增记录协作者或组长隐式来源，原四项写、普通写可改派、空对接人管理员兼容分支继续生效，但不能跨记录组。原先讨论的全组读写、仅 Assignee/组长改派和新增记录 ACL 目标已被覆盖。下文 S 保留代码事实，P/R 已按最终规则更新；标签和看板仍待讨论。

## 1. 核查基线与证据等级

| 来源 | 本轮基线 | 边界 |
| --- | --- | --- |
| 旧服务端 | `KOLServer master@706dc8ea0ed51f8a5752a9e2f497427f95432faa`，工作区干净 | 核心 CRM 记录、自定义视图、共享备注标签和内容监控标签的 Controller/Service/Mapper/实体静态代码 |
| 新服务端 | `kol_server_v2 master@234e9dad738f088550c2d75ef96d457a9b315547`，工作区干净 | 检索到 CRM 条件过滤、导出记录等关联链路，未定位替代核心 CRM 记录 CRUD；不由目录名或 URL 的 v2 推断实际线上路由 |
| 前端 | `kol-next codex/752-brand-reputation-radar@82f1e1014a6ab0ea692c8157c9057792adbcbda4` | 存在无关未提交修改；本轮只读核查 CRM、标签组件和 API，未见所引 CRM 文件未提交修改，不把此分支直接视为线上版本 |
| 研发历史确认 | [2026-08-18 确认材料](./pm_confirmation_code_evidence_2026-08-18.md) | 保留其原始日期和分支；本稿重新定位当前代码，不能覆盖历史证据的环境边界 |

- **S：静态事实**，可由本轮指定代码与行号复核，不代表线上行为实测。
- **P：已确认产品目标**，以当前 Input、梳理和用户确认记录为准，不因旧实现缺失而倒退为待定。
- **D：待产品讨论**，尚未批准的选择，不是已确认功能或研发实现指令。
- **R：研发验收**，落实 P 所需的契约、迁移和实测，不由示意 Demo 裁决。

本轮不是线上规模查询，没有查询空 Assignee、跨旧组协作或标签引用的实际数量。

## 2. CRM 当前静态事实（S）

### 2.1 至少区分三类对象

| 对象 | 当前代码事实 | 不能外推的结论 |
| --- | --- | --- |
| 单条达人 CRM 主档/业务记录 | `CRMEntity.ownerUser` 注释明确为“对接人 uid”；另有最近触达人、回复人、更新人等字段。[E1] | 字段包含 Owner 不是必须建立项目 Owner 的理由；不能把最近触达人或创建人等同当前 Assignee |
| CRM 自定义视图 | 保存筛选条件，有创建人和 `viewAuthors`；视图编辑、删除使用视图治理规则。[E2] | 视图协作者不是记录协作者，不能据此编辑视图命中的全部 CRM 记录；CRMGroup 不是新账号业务组 |
| 渠道共享备注标签 | CRM 记录展示的标签来自 `StarInfoLabel`，消息中心和频道资料备注也复用它。[E8/E9] | 标签字典维护权不是 CRM 记录写权限，也不是项目 ACL |

本轮未在单条达人 CRM 记录实体、写鉴权和对应查询链路定位到显式 Collaborator 名单。已找到的 `viewAuthors` 属于自定义视图，不能用来宣称记录 ACL 已存在。**最新 Input 也不新增记录 Collaborator；已确认的多组独立业务记录及组边界仍需要数据/入口改造，不能按“只换名字或只加页面”估算。**

### 2.2 四项普通写权限是可叠加来源

以当前主账号体系为前提，`kol_data_management` 的 `businessType=crm`、`purviewId` 控制附加写来源；多项并集生效，非互斥角色等级。[E3/E4]

| 来源 | 对接人非空时 | 对接人为空时 |
| --- | --- | --- |
| 对接人本人 | 始终可写 | 无此来源 |
| `1` 管理员 | 解析到的实际管理员可写，代码取单个 `adminUid` | 实际管理员可写 |
| `2` 组长 | 对接人所属任一旧账号组的组长可写 | 实际管理员兜底 |
| `3` 同组成员 | 对接人所属任一旧账号组的成员可写，包括组长 | 实际管理员兜底 |
| `4` 全团队成员 | 同一主账号体系内全员可写 | 同一主账号体系内全员可写 |
| 无任何配置 | 仅对接人可写 | 实际管理员兜底 |

旧同组判断读取 `kol_user_group_relation`，以对接人的旧组关系查人，组长过滤是该关系表的 `admin_status=1`。不能与前端账号关系展示的 `adminStatus=2` 字面混同，也不能把旧“对接人的任一组”直接替换成新“记录固定归属组”后声称等价。[E3/E4]

### 2.3 读、改派和批量操作

- **记录读取**：CRM 列表先解析登录人的 `parentUid`，SQL 固定按 `crm.parent`；详情按 `parent + channelId + platform` 查询。所核链路未按当前人、记录对接人或组身份裁剪逐条读取，`ownerUser` 可作为筛选条件，不等于读取授权。[E5]
- **日常改派对接人**：单条更新先按数据库中旧 `ownerUser` 校验普通 CRM 写权限，再写入请求的新 `ownerUser`。目前没有独立的“仅 Assignee/组长可改派”权限门，因此有普通记录写权限的人也可能改派。前端候选来自 `allUserUid`，不是新业务组候选。[E6]
- **批量操作**：服务按分片重新加载数据库记录，并调用 `hasCrmEditPermission` 过滤，无权项计入跳过摘要；内部最终写入函数不重复鉴权，不意味着整个批量链路无鉴权。[E7]
- **直接标签入口**：`StarRemarkService.saveRemark/updateLabel` 不复用 CRM 四项普通写权限。不能把它与 CRM 批量标签操作描述成同一权限口径，也不能因此批准继续绕过目标鉴权。[E8]

### 2.4 当前记录定位与新增组维度

`checkChannelExists`、上传重复覆盖、详情与消息中心联动都以主账号体系下 `channelId + platform` 定位 CRM 记录；`getCRMInfo` 使用 `limit 1`，没有新业务 `groupId` 条件。[E5/E10]

**代码可证明的程度**：现有流程把同组织的同频道当作同一 CRM 主档来定位、复用或覆盖，其对接人、合作状态等不是现成的“每组一份”。

**代码不能证明的程度**：本轮未核数据库唯一索引与线上重复数据，不能断言数据库绝不允许重复记录，也不能凭 `limit 1` 宣称存在某个唯一约束。

该差异已经促成产品确认记录结构 B：同一达人可以在不同业务组独立维护 CRM 业务记录，基础资料共享。这是目标对象身份和业务状态边界，不是现有静态事实；不能仅靠当前组筛选或视图协作者完成适配。历史初始化和实际字段契约继续留 Spec/研发验收。

## 3. 标签当前静态事实（S）

### 3.1 应按实际标签域区分，不按每个页面重新造字典

| 标签域 | 实现与当前共享边界 | 对本版讨论的影响 |
| --- | --- | --- |
| 内容/视频监控标签 | 独立 `video_monitor_label`、`video_monitor_label_relation`；主数据有创建人 `uid` 和主账号 `parent`，按 `parent` 查询共享定义；`groupId` 是既有标签分类，不是业务组。[E11/E12] | 监控标签不能与渠道备注标签机械合库；已有分类字段不能挪作新业务组 |
| CRM / 消息中心 / 频道资料备注标签 | 共用 `kol_star_info_label` 及频道关系；CRM、消息中心都读同一 `StarInfoLabelMapper`，资料备注 API 负责定义和应用。[E8/E9] | 不宜默认拆成“CRM 标签”和“消息标签”两套独立字典或让两个页面策略对同一标签相互冲突 |

### 3.2 来源字段不能想当然复用

`StarInfoLabel` 及本轮核查的 Mapper 映射/写入字段为 `id / labelName / uid / flagDelete`，另有收藏状态与消息对话数等展示字段；创建定义时 `StarRemarkService` 写入 `uid=parentUid`。**此处 uid 表达组织归属，不是创建者。**[E8/E13]

本轮所核实体和持久化映射没有独立 `createdBy` 或 `createdGroupId`。若要落实“我创建的 / 创建时本组 / 全部”来源筛选，需要补来源记录及存量未知来源展示方案，不能从当前 `uid` 或创建者现在所在组反推历史来源。未核全库迁移和生产表结构，故不声称数据库绝无其他扩展列。

监控标签虽有创建者 `uid`，现有 `groupId` 仍是分类而非创建业务组。需要稳定创建业务组来源时，同样不能复用分类字段。[E11/E12]

### 3.3 定义治理与给业务对象打标签是两个动作

- 监控定义新增/修改/删除、置顶校验组织归属和标签分类；监控项应用/移除标签还校验项目/任务权限。定义权限不自动开放项目内容。[E12]
- 渠道标签定义删除会逻辑删除标签，并清理 CRM 自定义视图中的标签筛选关系；从一条记录上移除标签只改变关联，不是删除全组织定义。[E8]
- `StarInfoLabelMapper.selectByUid` 用当前登录账号计算收藏和可见消息对话数，同时按 `parentUid` 读取共享标签字典。不能把 `starCount` 当作全组织全部标签引用数或删除影响数。[E13]

## 4. 同日最终已确认目标（P）

以 [当前 Input](./phase2_input_v0.md)、[功能梳理 CRM 段](./账号和权限功能设计梳理.md) 和 [S20](./use_case_stories_v0.md#S20) 为准：

1. 记录结构采用 B：同达人不同业务组可分别维护记录、对接人和合作状态，达人基础资料共享。每条业务记录固定业务组，对接人可空，不因其入组/切组或转交而移动记录，也不强造项目容器。
2. 权限采用 A：尽量不改线上 CRM 已闭环规则，仅加记录组硬边界。有效同组成员可读；写沿对接人和原四项设置，保持现有配置默认值，不强制全开；任何来源不能越过记录组。组内成员不因此必然可写。
3. 普通写可指派/改派对接人的原规则继续沿用，不新增仅 Assignee/组长的分工权或 Owner-only 治理。空对接人沿现有管理员兼容分支并同样先校验记录组；此前“空时仅组长首指派”的结论由最终 A 覆盖。
4. CRM 无显式/隐式记录协作者、名单或 `can_manage_collaborators`，不受 `t2Collaborator` 控制。原权限 1 解析单个 adminUid（无则父账号），不能直接扩成新 Owner/Admin 全部；2/3 仍以对接人既有组关系解析来源，再受记录组限制。多 Admin、新旧组映射留 Spec。
5. 旧 CRM 分组设置暂定弃用，不作为新业务组，也不等于四项权限、自定义视图或标签字典一并删除。D09 核心已定；历史归组、入口和旧来源实施留 Spec，不是继续选择全组共享或新增 ACL。
6. D16 前两条整体接替仍由有权组织侧提交后系统移交对接责任，无 CRM ACL 可移交；其他对象有效显式关系仍按既定规则处理。各组长分别处理路径仍可给 CRM 单选接收人或最终置未分配，不自动把旧 CRM 管理员身份传给接替人。
7. 当前已确认的监控标签基线为组织共享定义，限制组员维护定义的组织策略默认关闭；定义管理、对象应用和个人展示偏好分开。CRM 标签定义删除是独立高风险动作，展示影响并二次确认，不因记录普通写而开放。
8. “组织管理、配额、资金、通用查询不属于项目”只用于排除本次协作者体系比较，不删除这些已确认的本版需求。

## 5. 本轮仍须产品讨论（D）

| 议题 | 为什么不是直接套用已确认规则 | 本稿处理 |
| --- | --- | --- |
| 标签是否全组织共享及组内定义维护策略 | 新增可切换共享范围会改变当前组织共享字典，并影响历史引用、跨页面复用、重名去重和组归档；不只是移动一个开关 | 先按监控标签域、渠道共享备注标签域分别讨论；“全局策略 + 组策略”尚不是批准实现 |
| 使用情况看板身份/指标矩阵 | 谁执行、谁负责项目、谁承担额度以及谁能看汇总是不同维度；协作者产出不能默认算 Owner 本人业绩，多组不能重复累计 | D10 继续讨论，普通成员/组长/组织管理员展示矩阵未由本稿定案 |

上述待定项不是本轮新增既定范围。尤其标签来源筛选不等于组隔离授权，看板汇总查看不等于授权打开汇总背后的业务记录。

## 6. Spec / 研发验收事项（R）

- CRM 四项写和配置默认值沿用；原解析 adminUid、对接人旧组来源和空值兼容分支，加记录组硬边界后逐项验收。新 Owner/Admin 全部、全部同组组长或组员不能自动替代原授权来源；跨组收敛不能伪称完全等价。
- 所有单条、批量、导入、消息中心和任务联动入口统一执行“记录组边界 + 原 CRM 普通写”，改派沿同一规则；不新增仅 Assignee/组长改派门，不借前端隐藏替代服务端限制。
- 空对接人所在组不含有效旧 CRM 管理员、且未启用 4 时，可能没有可编辑者。迁移/配置必须显式处理，不能静默给 T2 首指派权、使 Admin 越组编辑，或把旧管理员身份继承给接替账号。
- 不新建记录 ACL 存储或系统协作来源；自定义视图治理保留原义，不自动授权记录。旧 CRM 分组暂定弃用的具体入口和历史来源需辨明，不误删四项设置或视图。
- 同频道跨组独立记录的目标已确认；历史初始化后核对查询、去重/覆盖、导入、导出、合作状态和关联入口，基础资料与业务字段分开。需要数据库 DDL、样本和环境验证，不在本稿推断唯一索引或数量，也不向所有组自动复制旧记录。
- 渠道标签实际创建人和创建业务组来源、历史未知来源、跨页面引用、定义删除影响数与对象标签应用鉴权，分别补契约和验收；不把当前 `starCount` 当删除影响总量。
- 监控沿用已确认增量边界；定义置顶是否受维护限制、历史分类兼容及对象应用鉴权继续与原 `RQ-MON-01–05` 分开核实，不由本次新标签提议关闭。
- 本轮未完成线上实测、数据库结构/规模核验、一期交付验收或新记录 ACL 的可行性压测；也未通过示意 Demo 宣称这些能力已上线。

## 7. 代码证据索引

以下均为本地检出时的锚点；后续代码变化应重新定位，而不是把行号当稳定接口。

| 编号 | 证据 |
| --- | --- |
| E1 | [CRMEntity.java:64](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/KOLServer/Entity/src/main/java/com/nox/kol/upgrade/entity/crm/CRMEntity.java:64)，对接人字段；同实体另有最近触达/回复/更新身份 |
| E2 | [CRMGroupVo.java:32](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/KOLServer/Entity/src/main/java/com/nox/kol/upgrade/vo/crm/CRMGroupVo.java:32) 的 viewAuthors；[CRMUtilService.java:405](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/KOLServer/ServiceInternal/src/main/java/com/nox/kol/upgrade/service/crm/CRMUtilService.java:405) 视图权限；[CRMService.java:647](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/KOLServer/ServiceInternal/src/main/java/com/nox/kol/upgrade/service/crm/CRMService.java:647) 视图批量删除 |
| E3 | [CommonInfoService.java:470](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/KOLServer/ServiceInternal/src/main/java/com/nox/kol/upgrade/service/common/CommonInfoService.java:470) 读配置；[同文件:601](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/KOLServer/ServiceInternal/src/main/java/com/nox/kol/upgrade/service/common/CommonInfoService.java:601) 四项并集与空对接人分支 |
| E4 | [KolUserGroupRelationMapper.xml:41](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/KOLServer/ServiceInternal/src/main/resources/com/nox/kol/mapper/KolUserGroupRelationMapper.xml:41) 旧组成员；[subAccount.js:53](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/kol-next/assets/script/constant/subAccount.js:53) 四项配置；[data.vue:27](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/kol-next/pages/brand/sub-account/data.vue:27) 多选框 |
| E5 | [CRMService.java:398](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/KOLServer/ServiceInternal/src/main/java/com/nox/kol/upgrade/service/crm/CRMService.java:398) 列表组织上下文；[CRMMapper.xml:78](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/KOLServer/ServiceInternal/src/main/resources/com/nox/kol/mapper/CRMMapper.xml:78) 列表；[同文件:826](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/KOLServer/ServiceInternal/src/main/resources/com/nox/kol/mapper/CRMMapper.xml:826) 详情定位 |
| E6 | [CRMService.java:1856](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/KOLServer/ServiceInternal/src/main/java/com/nox/kol/upgrade/service/crm/CRMService.java:1856) 更新旧对接人鉴权与新值写入；[crmTable/index.vue:150](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/kol-next/components/crmDetail/crmList/crmTable/index.vue:150) 对接人选择；[同文件:917](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/kol-next/components/crmDetail/crmList/crmTable/index.vue:917) 提交 ownerUser |
| E7 | [CRMService.java:2183](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/KOLServer/ServiceInternal/src/main/java/com/nox/kol/upgrade/service/crm/CRMService.java:2183) 批量分片；[同文件:2214](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/KOLServer/ServiceInternal/src/main/java/com/nox/kol/upgrade/service/crm/CRMService.java:2214) 真实记录写权限过滤 |
| E8 | [StarRemarkService.java:319](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/KOLServer/ServiceInternal/src/main/java/com/nox/kol/upgrade/service/remark/StarRemarkService.java:319) 定义读取；[同文件:332](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/KOLServer/ServiceInternal/src/main/java/com/nox/kol/upgrade/service/remark/StarRemarkService.java:332) 定义增删改、parentUid 写入和视图引用清理；[同文件:446](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/KOLServer/ServiceInternal/src/main/java/com/nox/kol/upgrade/service/remark/StarRemarkService.java:446) 备注标签应用 |
| E9 | [CRMService.java:475](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/KOLServer/ServiceInternal/src/main/java/com/nox/kol/upgrade/service/crm/CRMService.java:475) CRM 读共享标签；[MessageCenterService.java:3696](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/KOLServer/ServiceInternal/src/main/java/com/nox/kol/upgrade/service/message/MessageCenterService.java:3696) 消息标签列表；[同文件:3800](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/KOLServer/ServiceInternal/src/main/java/com/nox/kol/upgrade/service/message/MessageCenterService.java:3800) 同频道标签；[influencerRemark.js:16](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/kol-next/api/influencerRemark.js:16) 资料备注 API |
| E10 | [CRMService.java:251](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/KOLServer/ServiceInternal/src/main/java/com/nox/kol/upgrade/service/crm/CRMService.java:251) 查重复；[同文件:1607](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/KOLServer/ServiceInternal/src/main/java/com/nox/kol/upgrade/service/crm/CRMService.java:1607) 上传覆盖；[MessageCenterService.java:3817](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/KOLServer/ServiceInternal/src/main/java/com/nox/kol/upgrade/service/message/MessageCenterService.java:3817) 复用 CRM 主档 |
| E11 | [VideoMonitorLabel.java:23](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/KOLServer/Entity/src/main/java/com/nox/kol/entity/VideoMonitorLabel.java:23) 创建人与组织；[VideoMonitorLabelMapper.xml:7](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/KOLServer/ServiceInternal/src/main/resources/com/nox/kol/mapper/VideoMonitorLabelMapper.xml:7) 独立字典与 parent 查询 |
| E12 | [VideoMonitorIndependentModularityService.java:1087](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/KOLServer/ServiceInternal/src/main/java/com/nox/kol/service/monitor/video/VideoMonitorIndependentModularityService.java:1087) 置顶；[同文件:1128](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/KOLServer/ServiceInternal/src/main/java/com/nox/kol/service/monitor/video/VideoMonitorIndependentModularityService.java:1128) 定义保存；[同文件:1177](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/KOLServer/ServiceInternal/src/main/java/com/nox/kol/service/monitor/video/VideoMonitorIndependentModularityService.java:1177) 任务应用；分类口径同时参考 [监控专项证据](./monitor_permission_quota_evidence_2026-11-09.md) |
| E13 | [StarInfoLabel.java:14](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/KOLServer/Entity/src/main/java/com/nox/kol/upgrade/entity/StarInfoLabel.java:14) 字段；[StarInfoLabelMapper.xml:7](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/KOLServer/ServiceInternal/src/main/resources/com/nox/kol/mapper/StarInfoLabelMapper.xml:7) 持久化映射；[同文件:80](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/KOLServer/ServiceInternal/src/main/resources/com/nox/kol/mapper/StarInfoLabelMapper.xml:80) parent 字典与当前账号消息计数 |
