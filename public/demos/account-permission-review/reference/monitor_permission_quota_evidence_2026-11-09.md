# 内容监控权限与配额｜现状证据及适配差异

> 核查日期：2026-11-09；产品确认：2026-11-10。对应 [当前统一 Input](./phase2_input_v0.md)。已确认保留内容监控现有配额口径和各项设置权限，不新增管理协作者委派，仅增量适配业务组边界与既定组长隐式协作；同步 Input、story 和示意 Demo，不推进 Spec、不修改生产代码。
> 原则：保留既有常规业务、计量单位、承担主体及生命周期语义；新业务组边界和已确认组长策略按增量适配处理。代码中的鉴权缺口、入口不一致不能当作必须保留的合法业务规则。

## 1. 核查范围与证据边界

| 来源 | 本轮基线与限制 |
| --- | --- |
| 旧服务端 | `KOLServer master@706dc8ea0ed5`；工作区干净，核 Controller、Service、Mapper 与实体。以下服务端结论均为此提交的静态事实，不等于线上部署 |
| 新服务端 | `kol_server_v2 master@234e9dad738f`；工作区干净，检索到监控 Scope 常量，未找到项目/任务/自动追踪的替代执行链路。不能据此判定线上所有 `/v2` 请求都由旧库或新库执行 |
| 前端 | `kol-next codex/752-brand-reputation-radar@82f1e1014a6a`；存在无关脏修改，本轮只读。核项目页、详情、添加监控、自动追踪与 API，不把该分支直接当线上版本 |
| 线上观察 | `cn.noxinfluencer.com/video-monitor/list` 与一个本人为显式协作者的项目。登录上下文 `adminStatus=0`；同时能读取自建及协作项目。不记录真实账号、项目名、ID、业务指标或额度值 |
| 浏览器边界 | 内置 Browser 连接超时，降级到连接浏览器的 Playwright MCP。仅查看列表、项目及空的添加监控表单并取消；未填写或提交新增、编辑、删除、归档、恢复、导出、AI 生成等业务动作。实际扣量和保存结果未实测 |

本轮重点为独立内容监控项目、监控项和自动追踪规则。旧推广任务监控只列兼容差异。没有检出独立监控分享/通知订阅/主动刷新收费链路，不等于证明其不存在。线上有 AI 项目日报入口，本轮未触发生成，不将其成本推定为 Scope24/56；若需覆盖其新任务和扣费，应另核实际执行服务。

## 2. 结论摘要

- **协作仍是负责人 + 协作者的常规读写，没有通用 Viewer/Editor 两档。** 但不能把“有写权限”扩大成所有设置都可改。
- **项目治理与内容维护分开。** 项目名、说明、名单、归档/恢复主要由项目责任人管理；协作者可维护监控项、修改业务负责人、调整时长及管理自动追踪规则。监控当前没有可证明的 `can_manage_collaborators` 委派能力。
- **配额至少分三类。** Scope24 是按时长折算的周期用量，Scope56 是按记录状态与到期条件计算的占用席位，Scope65 是套餐时长参数；25/33 是能力资格，不是按次扣量。
- **不是统一扣操作人。** Scope24 常规个人用量随当前项目 `creator` 归集；Scope56 随追踪网红记录 `creator_uid` 归集。`responsibleUid` 是监控项的业务负责人，不是项目 Owner，也不能据此决定额度承担人。
- **额外设置不能一起改成 Owner-only。** 自动追踪和监控内容设置仍保留协作者操作；组织共享标签字典、任务标签应用、个人展示配置和项目治理分别处理。

## 3. 配额与资源规则

| 项目 | 当前静态口径 | 兼容要求与限制 |
| --- | --- | --- |
| 空项目数量 | `saveVideoProject` 创建入口未见独立数量 Scope 或 Scope24 消耗 | 不应新增“创建一个项目扣一次监控额度”；未检出不等于承诺线上无限项目 [E1] |
| Scope24 视频监控 | `quota_num` 按时长折算：30天0.5、60天1、120天2，前端还列180/240/360天对应3/4/6 | 保留小数单位、现有会员周期及续监调整；不改成视频条数、点击次数或在用容量 [E2/E3] |
| Scope24 个人归属 | 新增及延长以当前操作账号预检；常规任务用量 SQL 按当前项目 `creator` 汇总；跨周期调整按流水 `owner_uid` | 预检与归集不一致须研发核对，不能直接改成操作人或不可变原始创建人；动作审计另记 actor [E2/E3] |
| Scope56 自动追踪网红 | 按未删除、未到期且状态不为4/5/8的网红记录计占用席位；组织按 parent，个人按记录 creator | 新增记录 creator 是操作人；恢复旧记录不重写 creator。状态6的暂停仍计席位；不是组织内同一频道全局去重，跨规则/项目记录可分别占席位 [E4] |
| Scope65 自动追踪天数 | 读取组织套餐参数，配置无效时兼容默认7天 | 不做可消费次数，也不自动纳入组员“分配余额” [E5] |
| 运行规则数 | 组织运行规则数受系统配置 `Max_Running_Rules` 限制 | 与56席位和24额度同时约束；未见独立可向成员下分的 Scope [E5] |
| INS 日新增 | 北京时间自然日，按有效账号体系内未删除 INS 任务统计 | 独立频控，不是24周期额度，不能用成员上限替换 [E6] |
| Scope25 评论情感、Scope33 报表 | 情感分析读取 parent 能力；报告入口使用 Scope 门禁 | 保留资格判断；不按情感查看/导出次数统一扣24。本轮不批准新增导出需求 [E2/E7] |

### 3.1 重复、删除、暂停和到期

- 同项目按既有 `utmContent` 与本批次去重，事务内复核后只对最终插入任务计算额度；不同项目不受该去重保护。批量返回可能有成功和失败，不能把预检通过写成全部已扣或全部成功。[E2]
- Scope24 **不是删除即全退，也不是全部永不退**。普通计量 SQL 不过滤软删除标记；有效任务通常软删仍计量。首段周期的无效/超时任务可物理删除；较长、多段周期存在未享用部分调整。保留原算法，不套收藏夹容量释放逻辑。[E3/E8]
- 监控到期不自动清空本会员周期已用。原窗口内恢复与过期后新开周期不同；跨会员周期的延长/缩短使用调整流水，缩短有可返还边界。[E3/E8]
- 用户主动暂停接口将网红记录置为8，释放相应56席位；取消监控/删除（5或软删）、到期也退出计数。**其他暂停状态6在未删除且未到期时仍计席位**，不能概括为所有暂停都释放。释放56也不会自动返还已产生视频的24用量。恢复同时检查席位、监控额度和规则数；检查“24至少够用”不等于创建规则时已实际扣1。此处细化研发附件“暂停释放”的概括，不改写其原始证据。[E4/E5]
- 自动发现视频的调度、落任务与24实际计量链路尚未在本轮两库闭环定位，不能承诺后台继续追踪不受额度或失权影响。[RQ-MON-05]

### 3.2 一个最容易混淆的例子

A 创建监控项目，B 作为协作者添加视频并指定 C 为内容负责人：新增时以 B 做配额预检；该视频常规 Scope24 用量按项目当前 creator（A）归集，C 的 `responsibleUid` 不决定此归属。若 B 创建自动追踪网红记录，其56席位则归记录 creator（B）。因此 UI 必须区分项目负责人、内容负责人、操作人及各项额度核算人，不能统一标成“当前账号消耗”。[E2/E3/E4/E10]

## 4. 协作与额外设置矩阵

| 动作 | 当前静态权限 | 与当前方案的关系 |
| --- | --- | --- |
| 读项目/常规监控内容 | 项目 creator 或有效显式成员；`isMaster` 表达当前人等于项目 creator，不是组织管理员 | 可映射 Owner/Collaborator；没有只读协作者或现成的组长隐式来源 [E1/E9] |
| 项目名称、说明、协作名单 | 既有项目保存先验证 creator；名单另验同一旧组织关系 | 已确认保留 Owner 日常治理，不因通用模型给协作者改名或名单管理委派；候选收敛为对象同组有效成员 [E1/E9] |
| 项目归档、恢复、整项目删除 | 批量链路校验全部 creator；UI 亦限制负责人。单项删除存在前置鉴权差异 | 不能从缺口推导协作者合法删项目。项目归档与业务组冻结归档不是同一动作 [E1/E11] |
| 新增/编辑/删除监控项、调整时长 | creator/member；另有任务状态、字段和配额约束 | 保留协作者能力，不因“删除”字样全部收归 Owner；普通写不绕过额度 [E2/E8/E10] |
| 内容负责人改派 | creator/member 可改 `responsibleUid` | 不是项目 Owner 转交；不产生新项目访问权，不改变24承担主体 [E10] |
| 将监控项移到另一项目 | 同时具有来源任务和目标项目权限；过滤目标重复项，返回成功/失败数量 | 不是迁整个项目或改 Owner；新方案应限制同一业务组，保留组内既有业务。额度归属变化另核 [E10/RQ-MON-02] |
| 自动追踪增删改、暂停 | creator/member，不要求是规则创建人 | 保留协作，不套收藏夹整夹治理 Owner-only；恢复入口鉴权另核 [E5] |
| 标签定义增删改、置顶 | 旧 parent 组织共享，校验组织归属和标签分类，不要求标签创建人或项目 Owner | 已确认“限制组员维护定义”开关是本版新增策略，默认关闭；不能称线上已实现。置顶是否受此开关限制仍需明确 [E12] |
| 在监控项应用/移除标签 | 项目/任务权限 + 标签属于同 parent；三类标签分别处理 | 与定义治理分开。标签 `groupId=1/2/3` 是视频标签/额外标签分类，不能迁成业务组 [E12] |
| 手工指标/预算/备注/短链 | 内容写权限外还有字段级校验；观看/点赞/分享人工补录受系统原始值为空或0等限制 | “协作者可写”不等于覆盖系统数据。预算是监控业务字段，不是支付资金池 [E10] |
| 自定义展示字段、顺序 | `updateTarget`：全局配置按 uid，非全局按 uniqueId+type | 不是修改指标值；不能一律改成 Owner-only 或一律宣称个人私有，对象配置鉴权另核 [E13] |
| 导出报表 | 对象可读范围 + Scope33 | 不凭“看得到下载按钮”批准新的导出范围；维持现有资格 [E7] |

`creator` 在清退移交中会被改写，因此当前值更接近可变项目责任账号，不是不可变原始创建人。新组织 Owner/Admin、项目 Owner、内容 `responsibleUid` 必须分开映射；没有定位到独立的监控项目日常主动 Owner 转交入口，不能把 `task/changeUser` 当作该功能已存在。[E10/E14]

## 5. 线上有限核对

- 列表同时加载自建和显式协作项目。样例协作项目 `isMaster=false`，没有项目编辑/归档入口；自建项目有。未尝试删除、绕过 UI 或构造未授权对象请求。
- 进入本人为有效协作者的项目：页面可读，`canOperateProject=true`、`canManageProjectActions=false`、`canUnarchiveProject=false`；有添加监控入口。这与“内容可协作，项目治理受限”一致，但不证明写入成功。
- 打开空添加监控抽屉，确认手动内容和自动追踪区域、配额读取存在；待提交集合为0，随后取消。未选择视频、填写表单、启动规则或生成 AI 日报。
- 观察到 `queryProjectList`、`queryProjectSummary`、`task/queryList`、workbench 汇总和 `/ws/v2/quota` 等读取路径；部分成员/规则列表亦带 `/ws/v2/monitor/...`。URL 的 v2 不足以证明对应执行来自新服务端。未保存真实返回数据或客户标识。

## 6. 已确认的适配边界（2026-11-10）

1. **保留模块动作权限，不做全动作统一。** 普通内容协作、内容负责人改派、时长和追踪规则维护保留，仍受状态、字段及配额约束；项目名/说明/名单/归档/恢复/整项目删除按 Owner 日常治理承接。监控不提供 `can_manage_collaborators` 委派，Owner 也不能向协作者下放；不能把监控项删除收为整项目删除权限。生命周期任务交接另循现有已确认流程，不给组长增加日常治理权。
2. **配额保留原语义与核算主体。** 24继续时长折算/周期调整，56继续按状态与到期条件计席位，65继续参数，25/33继续资格。叠加新组上限时须分别确定归组与责任字段，不自动套统一 actor 消耗。预检/计量差异先交研发核对，不把有意兼容和缺陷修复混在一起。
3. **仅增量加组边界和已确认组长策略。** 存量默认组保留原项目/名单、全局组长开关默认关；开启只增加普通内容协作来源，不增加项目治理或额外资格。组内项目间移动继续作为业务动作，跨组迁项目走既定显式迁移，不复用普通内容移动偷偷跨组。
4. **共享定义与对象应用继续分层。** 标签保持组织共享，不为每组复制字典；既定默认关闭的标签定义限制开关作为显式权限变化，不借其开放项目内容。显示字段区分个人偏好和对象级配置。
5. **界面承接。** 消耗/调整时说明对应 Scope 的计量单位和核算责任账号；项目设置与内容设置分区，内容负责人改派不要叫“项目 Owner 转交”。不新增大而全的设置中心，具体控件与步骤仍为 Input 阶段示意，留 Spec 细化。

Demo 按本轮确认收回协作者改项目名和名单管理委派；Owner 设置/名单与协作者内容操作分开。可编辑虚构内容备注及内容负责人，时长、自动追踪、额度核算和释放只展示流程与规则，不执行真实扣量、导入或完整规则状态机。全局组长来源默认关闭，开启后锁定显示、只给普通内容协作，不给项目治理或额外资格；关闭仅撤销该来源。标签置顶是否受既定定义限制开关控制仍待明确，不在此次确认中自动扩大限制。

## 7. 研发核对项

| 编号 | 需核事项 | 边界 |
| --- | --- | --- |
| RQ-MON-01 | 24新增/延长按 actor 预检却按项目 creator 归集；56恢复按 actor 预检但旧记录 creator 不变；新组/成员上限应跟哪条责任链一致 | 核实际部署、历史意图与一期交付字段，不能直接统一扣操作人 |
| RQ-MON-02 | 移动内容、主动 Owner 转交或离职交接后，常规24按当前项目 creator 动态归集，历史调整流水 owner_uid 却是当时快照；56记录归属是否随移交处理 | 核个人/组/组织对账、超额及异步任务，不静默改写原始操作人或全部历史 |
| RQ-MON-03 | 单项删项目在 creator 校验前分支，批量入口却全验；恢复追踪未见与其他规则操作相同的对象检查；部分详情/历史读取、非全局 updateTarget 的边界不足 | 仅静态路径差异，核实际路由和统一鉴权；未做线上越权试验，不定义成合法公开/只读/治理权限 |
| RQ-MON-04 | 单项归档提交 status=0，只更新项目；批量归档另调 pauseMonitor。解除归档只恢复项目状态，不恢复规则 | 核线上分支与后台对项目状态的处理，不直接宣布单项归档后仍抓取；不能迁移出两套不同的已批准规则 |
| RQ-MON-05 | 自动发现视频的实际落任务/24计量链路、后台失权/配额处理与部署路由；旧推广 MonitorService 的组织总额校验与新模块个人预检兼容 | 不把创建规则时预检当已经扣费；不把未找到的定时执行链路描述成已免扣或已回归 |

以上均为研发核对，不是新增 Dxx 产品决策，不因产品定案、本报告或 UI 可见自动关闭。保留 Owner 专属日常项目治理、不引入名单管理委派已确认；标签置顶的策略归属仍待明确。§1–§5 保留 11-09 证据快照，不把 11-10 产品目标改写成线上已经实现，也不把静态鉴权缺口当作合法业务权限。

## 8. 静态证据索引

以下路径相对相应仓库，行号固定于 §1 的提交；本次未运行真实写接口或扫描业务数据库。

| 锚点 | 仓库 / 文件及位置 |
| --- | --- |
| E1 项目治理 | `KOLServer/ServiceInternal/src/main/java/com/nox/kol/service/monitor/video/VideoMonitorIndependentModularityService.java:2084–2130、2143–2232、2301–2340、3476、5015` |
| E2 新增与预检 | 同服务 `:349–378、2919–2958、3071–3110`；`KOLServer/WebService/src/main/java/com/nox/kol/ws/monitor/MonitorIndependentModularityController.java:378`；`kol-next/components/videoMonitor/monitor/addAndAutoTrack/index.vue:207–215、369–406`；`assets/script/constant/videoMonitor/addAndAutoTrack.js:5–15` |
| E3 24计量 | `KOLServer/ServiceInternal/src/main/resources/com/nox/kol/mapper/VideoMonitorTaskIndepentMapper.xml:777–821`；`ServiceInternal/src/main/java/com/nox/kol/service/KolScopeService.java:146–147、235–236`；监控主服务 `:1350–1452` |
| E4 56计量 | `KOLServer/ServiceInternal/src/main/resources/com/nox/kol/mapper/VideoMonitorProjectStarsMapper.xml:221–240、337`；`Entity/src/main/java/com/nox/kol/entity/VideoMonitorProjectStars.java:51`；`ServiceInternal/src/main/java/com/nox/kol/service/monitor/video/VideoMonitorAutoTrackService.java:301–320、1300–1342、1638–1684` |
| E5 自动追踪 | 同自动追踪服务 `:148–166、623–700、753–772、1261–1342、1638–1684` |
| E6 INS日限 | `KOLServer/ServiceInternal/src/main/java/com/nox/kol/service/monitor/video/InstagramVideoMonitorDailyLimitService.java:63`；`ServiceInternal/src/main/resources/com/nox/kol/mapper/VideoMonitorTaskIndepentMapper.xml:2244` |
| E7 能力资格 | `KOLServer/WebService/src/main/java/com/nox/kol/ws/monitor/MonitorIndependentModularityController.java:500–516、574–584`；监控主服务 `:2943–2951、3513–3530、7956–7967`；研发附件 [Scope规则](./scope_quota_product_rules.md) |
| E8 删除/续期 | 监控主服务 `:1350–1512、7421–7525`；同目录 `VideoMonitorQuotaAdjustmentCalculator.java:22` |
| E9 协作身份 | `KOLServer/Entity/src/main/java/com/nox/kol/entity/VmpimMembers.java:12–32`；监控主服务 `:5416–5423、8062–8070`；`ServiceInternal/src/main/resources/com/nox/kol/mapper/VideoMonitorProjectIndependentModularityMapper.xml:667–673` |
| E10 内容与责任 | 监控主服务 `:1001–1055、1597–1607、5887–5892、7186–7224`；`KOLServer/Entity/src/main/java/com/nox/kol/entity/VideoMonitorTask.java:478`；`kol-next/components/videoMonitor/monitor/monitorDetailDrawer.vue:175–219、950–958` |
| E11 前端与归档差异 | `kol-next/pages/video-monitor/list.vue:226、695–751`；`components/videoMonitor/monitorDetail/index.vue:515–558、1640–1655`；`components/videoMonitor/projectList/projectCard.vue:95–159`；监控主服务 `:2086–2109、2153–2161、2218–2232` |
| E12 标签 | 监控主服务 `:1087–1165、1177–1218、3318–3319、8536–8577、8621–8629`；`KOLServer/Entity/src/main/java/com/nox/kol/entity/VideoMonitorLabel.java:27–40` |
| E13 展示与读取疑点 | 监控主服务 `:390–409、468–495、3379–3392`；Controller `:550–571` |
| E14 交接与旧推广路径 | `KOLServer/ServiceInternal/src/main/java/com/nox/kol/service/UserRelationService.java:703–708、1635–1644`；项目Mapper `:621–625`；`ServiceInternal/src/main/java/com/nox/kol/service/MonitorService.java:145` |
