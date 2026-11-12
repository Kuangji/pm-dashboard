# 真实页面映射审阅｜邮件项目

> 日期：2026-11-11。当前阶段：统一版本 Input 下的页面/任务映射审阅，不是正式 Design 或真实前端实现。
> 真值来源：[Input §5.10](./phase2_input_v0.md)、[S15–S17](./use_case_stories_v0.md#S15)、[邮件/消息权限证据](./email_message_permission_evidence_2026-11-10.md)和[核算证据](./email_quota_code_evidence_2026-11-09.md)。本稿不改变已确认权限或配额规则；“建议位置”不等于新 UI 已获批或已经上线。

> 后续确认：2026-11-11用户批准复用任务卡编辑弹窗并按负责人/名单管理员/普通协作者呈现可用操作。负责人名称与名单可编辑，名单管理员名称只读，普通/仅隐式协作者项目设置只读但内容协作不变。该条已同步Input、S16及独立Demo；其余组切换/自动保存、旧Admin来源和旁路适配仍待逐项收口，真实前端未改。下文§2/§7保留首轮仅审计时的验证边界，不将当时未改Demo的记录误作后续状态。

## 1. 本轮结论

邮件项目可以沿现有“管理列表 → 任务 → 发送轮次 → 编辑/收件人”的结构增量适配，不需要把 Demo 的扁平对象页搬成另一套生产页面。

- Demo 的邮件对象应映射到稳定的邮件任务 `kol_email_task`；右侧各发送/草稿轮次是 `kol_email_project`，继承任务所属组和协作边界。
- 协作者、名单管理能力及改名落在现有任务卡“编辑”弹窗；不能把 Demo 的独立按钮理解成必须新建独立协作者页面。
- 内容、收件人、保存草稿、发送/定时、再次跟进继续使用原业务页面与状态规则。协作写权限不是任意发件资源配置权，也不改变额度承担主体。
- 组长默认协作属于组织全局策略；邮件内只展示其动态来源，不能混入显式名单保存。现有“邮件设置”的发件、签名、自动回复不改作权限设置中心。
- 入口总体有承接位置，但新组上下文、编辑弹窗分权、存量管理员来源及多入口一致性仍需适配/验收；本轮不能判为真实链路已闭环。

## 2. 实勘基线与证据边界

| 来源 | 本轮核对 | 边界 |
| --- | --- | --- |
| 线上 | 已登录简体中文 `https://cn.noxinfluencer.com/email/project-list`；看见本人任务列表、任务卡编辑/协作者候选、新建表单、邮件设置菜单、团队邮件数据抽屉 | 当前页面未展示新业务组上下文；没有切换真实账号验证他人权限，没有保存、创建、删除、发送、解锁、导入、刷新统计或下载 |
| 浏览器 | 内置 Browser 连续两次连接超时，改用可用的 Playwright MCP 连接 Chrome；任务列表/详情只读接口响应200 | 不认为 Chrome 与内置浏览器共享实时状态；不提取 Cookie/Token，不将客户名单、项目内容或统计数值写入审阅稿/publish；浏览器工具自动诊断快照不作为发布材料 |
| 前端 | `kol-next`，`codex/752-brand-reputation-radar@82f1e1014a6ab0ea692c8157c9057792adbcbda4`；无关未提交修改保留，邮件相关文件未改 | 本地代码不证明生产部署版本；已读该库 AGENTS/CODEX/README、构建文件及相关页面知识库，引用以源码为准 |
| 旧服务 | `KOLServer`，`master@706dc8ea0ed51f8a5752a9e2f497427f95432faa`，工作树干净；已读README及根/模块Maven配置 | 核任务访问、名单更新、删除限制和消息投影同步；未执行接口写入或查询数据库 |
| 新服务 | `kol_server_v2`，`master@234e9dad738f088550c2d75ef96d457a9b315547`，工作树干净；无根README/AGENTS，已核实际存在的Maven模块配置 | 当前检出有邮件导出、TTShop导入旁路；原团队统计的另一ref见既有证据，不把当前master未检出当作线上不存在 |
| Demo | 独立静态审阅Demo，使用库内Playwright本地runner检查；连接浏览器阻止file协议，未绕过该浏览器限制 | 7项定向检查通过，无JS错误/外部请求；只证明示意路径，不替代真实创建/发送/权限/配额验收 |

不进入真实草稿编辑页的原因：本地代码存在初始化/定时自动保存，见§6。当前线上操作记录未出现 `saveEmail`、`updateEmail`、`deleteEmail`、`sendEmail` 或 `saveProject` 请求；只读验证不代表所有后台活动均可由此排除。

## 3. 功能逐项放在哪里

| 项目 | Demo中的表达 | 真实页面建议落点 | 能否承接预期任务 / 需要补什么 |
| --- | --- | --- | --- |
| M01 当前组、可见任务、无权限/空态 | 顶部业务组 + 邮件项目列表 | 站点全局组上下文；邮件管理列表和各详情解析任务所属组 | 需增量接入。按当前组取本人有效Owner/显式/隐式来源；无对象与无业务组身份分开，不因组织Admin开放全部项目 |
| M02 新建并确定所属组 | S15描述创建；当前Demo主要从预置对象开始 | `/email/project-list` 顶部“群发邮件” → 创建弹窗 → 原编辑页 | 原表单已含名称、发件人、协作者。新任务归当前有效组，创建成功进入对应轮次；不另造一张项目页。Demo缺完整创建链只是示意边界，不据此取消本期创建适配 |
| M03 增减显式协作者 | 对象详情“协作者”弹窗 | 左侧任务卡悬停“编辑” → 原表单中的“协作者”选择器 | 可复用。候选限任务组有效成员，校验搜索、保存和失效关系；Owner与有名单管理权者可维护，不增加Viewer/Editor选项 |
| M04 授予/收回名单管理能力 | 协作人行 `canManage` | 同一选择器已有 `canManageMembers` 控件及提交字段 | 可复用邮件可继续转授的规则，不新增审批。不把普通协作或组长隐式身份当成名单管理能力 |
| M05 组长隐式协作及多来源 | 不可取消的锁定来源、显式能力分开 | 仍在原协作选择器/名单展示区标注来源；开关放组织全局策略 | 需增加动态来源展示，不能把隐式人员写入 `membersUids`。同人显式与隐式可并存，关闭策略不清显式记录；旧强制Admin来源独立核迁移 |
| M06 改名、整任务删除 | 两个对象按钮 | 任务卡“编辑”中的名称；任务卡删除图标 | 仅任务Owner且保留原状态限制。非Owner名单管理员进入同一表单时名称应只读，删除入口不得因其可写而放开；轮次删除不是整任务删除 |
| M07 内容、收件人与发送 | 示例收件人表 +“发送流程示意” | `/email/detail-edit?id=<轮次id>` → 内容/收件人/原保存、发送、定时流程 | 原链可承接，但Demo不代表已经实现编辑器。每步按轮次回溯任务组，保留原发件配置/状态校验及Scope核算，后台自动保存也须受约束 |
| M08 复制、再次跟进 | Demo不展开完整原业务 | 原任务卡复制、右侧“再次跟进”及原编辑页 | 保留既有业务。复制新任务与在原任务下新增轮次分别处理归组；跟进轮次继承原任务，不按操作人换组，不泛称多轮跟进免费 |
| M09 联系方式解锁、额度与不足反馈 | 扣量规则、发送流程、查看发送额度 | 原收件人弹窗剩余/预检及发送检查；配置仍到组织组额度/获委派组长个人额度页 | 不在邮件页新增统一扣量器或调额中心。Scope21/4入口主体与复用沿原逻辑，预检/落账差异继续RQ-MAIL核验 |
| M10 团队邮件数据 | 原抽屉说明/待核对入口 | 邮件管理顶部“团队邮件数据”抽屉 | 唯一产品改动仍为账号候选限当前组；汇总/展开/导出服务端同范围约束是配套隔离，不重做UI，不塞入新Dashboard个人动作模式 |
| M11 邮件模块内设置 | Demo页签中“项目级协作”说明 | 不新增对应生产页签；原“邮件设置”仍是发件、签名、自动回复 | Demo是规则解释，不是新设置功能。项目ACL回任务卡编辑，组织策略回全局策略，邮箱/发件配置保留原位置与权限 |
| M12 交接、迁组及消息/导出衔接 | 其他管理页的生命周期流程，S24/S33–S37 | 交接/迁组发起入口留组织/当前组管理；邮件只承接任务及全部轮次的新责任/有效ACL；收件结果抽屉沿原消息/导出入口 | 不新增日常“转交邮件项目负责人”。结果、链接、新窗口须解析任务组；消息对话转交不替换邮件Owner，原16项导出仍按各项Spec细化 |

## 4. 按任务走一遍

| 流程 | 操作顺序 | 预期终点与分支 |
| --- | --- | --- |
| F01 在本组启动邮件工作 | 选有效业务组 → 群发邮件 → 名称/发件配置/可选协作者 → 创建任务与首轮 → 原编辑页 → 收件人/内容 → 原保存或发送 | 任务固定归组，轮次继承。发件配置或额度不足按原流程反馈；不靠临时当前组/操作者推断已有任务归属。真实提交未实测 |
| F02 让同事加入及继续管理名单 | Owner → 任务卡编辑 → 选同组协作者 → 可授名单管理 → 保存；该协作者再进入同一入口维护名单/能力 | 普通读写与名单治理分开。名单管理员可继续授/收管理能力，但不能改任务名、整删或维护精确对话转交人。名称只读等呈现仍需细化 |
| F03 组长加入而非逐项目勾选 | 组织有权者在全局策略开启组长协作 → 组长进本组邮件 → 看到普通读写来源 → 关闭策略后复查 | 隐式来源锁定，非显式ACL，不默认授名单治理。另有显式记录则保留；Admin单凭组织身份不取得项目正文。旧Admin来源迁移另核 |
| F04 协作者编辑并发送/继续跟进 | 打开任务下某轮 → 原正文/收件人 → 原预检 → 保存/发送/定时；再次跟进继续生成原任务轮次 | 沿状态、发件资源和原扣量主体；操作人不直接成为新Owner/核算人。退组/失权后人工和后台入口都需拒绝后续业务，不能仅隐藏首页卡片 |
| F05 从其他模块带达人进邮件 | 搜索/收藏夹/CRM等原“加入邮件项目” → 本组获准草稿或新建 → 原收件人导入 → 新窗口编辑 | 本组候选、来源访问、目标草稿和服务端保存均须校验。真实入口与主列表共用归属规则；不能新窗口使用浏览器后来切换的组误写归属 |
| F06 核对团队表现与后续工作 | 当前业务组 → 团队邮件数据 → 原日期/项目/账号筛选、展开；已发送收件结果 → 原消息或导出入口 | 原业务统计口径不改成actor。无权账号不可提交查询/导出；消息保留来源任务与组上下文，Dashboard统计权不授正文ACL。真实导出、发送未实测 |

以上任务有明确承接位置，尚不是新权限体系的生产验收。组切换、深链接、后台执行和历史数据应在Spec中逐入口落入测试，不能仅验证上述按钮存在。

## 5. 已发现的差异与需要收口的点

1. **协作者与名称共用表单：同弹窗分权已获确认。** 真实表单当前名称输入没有按Owner禁用，名单选择器则有独立权限条件。保留卡片编辑入口：负责人可改名称和名单/能力；名单管理员名称只读、仅编辑名单/能力；普通或仅隐式协作者项目设置只读，内容协作不变。取消不保存，不单建协作者页面。Demo已按此示意，真实前端仍须适配；最终视觉和提交契约不由本稿替代。
2. **非Owner改名还涉及消息投影，需研发核对。** 当前旧服 `updateEmailTask` 仅Owner更新任务名，但 `needSyncMessageCenterTaskName` 由提交名称预先计算，随后可能把该提交名同步到消息投影。需核未授权异名是否被拒绝/忽略及其投影一致性；本轮没有提交异名，不断言线上已发生。不能以“主任务未改名”就认为整个请求无副作用。
3. **新组长来源与旧管理员来源不可偷换。** 线上创建表单可见旧管理员预选；代码还有 `email[12]` / `adminStatus` / 默认管理能力逻辑。按Input保留迁移真值核验，不能直接删除旧来源或将它等同新组长开关；隐式组长要独立动态计算。
4. **主列表适配不覆盖全链路。** 本地邮件SearchVo及主前端链尚未见新业务组参数；出现的收藏夹ID、CRM旧组字段不能当业务组。还须覆盖全局“加入邮件项目”、CRM关联、TTShop新服务导入、发送/定时/自动保存、导出及消息聚合；服务端不能只信UI候选过滤。
5. **组切换与自动保存必须放在一起设计。** 已有编辑页不能被当作无副作用预览。建议既有任务的组从任务解析并固定，切组/打开外链时明确目标组与未保存状态；不能让自动保存读取后来切换的全局组。具体提示、终止旧编辑会话及失权反馈留Spec，不在本轮选定新状态机。
6. **Demo抽象边界需保留。** 目前没有完整邮件创建、编辑器、真实收件人操作和原发送状态；整任务删除仅模拟Owner门槛。真实删除还受已发收件人、发送/撤回中等限制；不能把Demo删除成功当成取消这些限制。无需为映射审阅补完整生产状态机。
7. **额度提示不能提前承诺准确承担人。** 原收件人剩余额度/发送预检存在入口上下文与实际落账主体差异；沿用现状已定，但“本次扣谁/还剩多少”须与RQ-MAIL结果一致，不能用Demo统一actor口径补齐。

第1项已确认并以独立Demo示意；随后继续收口3、5的来源与上下文，其余进入研发/Spec验证。不新增产品D卡，也不以映射或示意完成关闭既有研发问题。

## 6. 代码锚点与安全限制

以下为本次检出的绝对路径，静态证据不等于线上提交结果：

| 链路 | 代码位置 |
| --- | --- |
| 管理页/创建编辑/团队抽屉入口 | [project-list.vue:37](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/kol-next/pages/email/project-list.vue:37)、[创建:364](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/kol-next/pages/email/project-list.vue:364)、[名单权限:271](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/kol-next/pages/email/project-list.vue:271)、[打开编辑:375](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/kol-next/pages/email/project-list.vue:375) |
| 任务卡编辑/删除 | [list.vue:30](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/kol-next/components/email/project/list.vue:30)、[编辑:163](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/kol-next/components/email/project/list.vue:163)、[删除:188](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/kol-next/components/email/project/list.vue:188) |
| 名称、协作选择器及管理能力 | [createEdit.vue:21](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/kol-next/components/email/dialogs/createEdit.vue:21)、[270](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/kol-next/components/email/dialogs/createEdit.vue:270)、[803](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/kol-next/components/email/dialogs/createEdit.vue:803) |
| 旧Admin来源 | [emailProjectCollaborator.js:6](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/kol-next/assets/script/utils/emailProjectCollaborator.js:6)、[114](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/kol-next/assets/script/utils/emailProjectCollaborator.js:114) |
| 正文发送/收件人/发件资源 | [detail-edit.vue:425](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/kol-next/pages/email/detail-edit.vue:425)、[detailHeader.vue:233](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/kol-next/components/email/detail/detailHeader.vue:233)、[发件资格:404](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/kol-next/components/email/detail/detailHeader.vue:404)、[recipient.vue:54](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/kol-next/components/email/dialogs/recipient.vue:54)、[预检:869](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/kol-next/components/email/dialogs/recipient.vue:869) |
| 初始化/定时保存 | [emailContent.vue:510](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/kol-next/components/email/detail/emailContent.vue:510)拿到内容即启动计时；[826](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/kol-next/components/email/detail/emailContent.vue:826)每3分钟保存；[837](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/kol-next/components/email/detail/emailContent.vue:837)不检查dirty。另[contentType watcher:532](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/kol-next/components/email/detail/emailContent.vue:532)配合[页面初始化:342](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/kol-next/pages/email/detail-edit.vue:342)可能更早触发保存，不能靠三分钟内退出规避 |
| 原再次跟进、收件结果/消息/导出 | [detail.vue:217](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/kol-next/components/email/project/detail.vue:217)、[275](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/kol-next/components/email/project/detail.vue:275)、[289](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/kol-next/components/email/project/detail.vue:289)；[influencerListDrawer.vue:190](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/kol-next/components/email/drawer/influencerListDrawer.vue:190)、[428](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/kol-next/components/email/drawer/influencerListDrawer.vue:428) |
| 全局加入邮件旁路 | [emailProjectPop.vue:209](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/kol-next/components/common/globalTools/dropdown/emailProjectPop.vue:209)、[222](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/kol-next/components/common/globalTools/dropdown/emailProjectPop.vue:222)、[260](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/kol-next/components/common/globalTools/dropdown/emailProjectPop.vue:260) |
| 团队抽屉账号来源 | [teamDashboardDrawer.vue:330](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/kol-next/components/email/drawer/teamDashboardDrawer.vue:330)；原统计接口/远程ref边界仍见[既有证据](./email_dashboard_evidence_2026-11-11.md) |
| 服务端任务访问/名单更新 | [EmailProjectService.java:3878](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/KOLServer/ServiceInternal/src/main/java/com/nox/kol/service/EmailProjectService.java:3878)、[6569](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/KOLServer/ServiceInternal/src/main/java/com/nox/kol/service/EmailProjectService.java:6569)、[7023](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/KOLServer/ServiceInternal/src/main/java/com/nox/kol/service/EmailProjectService.java:7023) |
| 名称消息投影/整任务删除限制 | [EmailProjectService.java:6609](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/KOLServer/ServiceInternal/src/main/java/com/nox/kol/service/EmailProjectService.java:6609)、[6638](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/KOLServer/ServiceInternal/src/main/java/com/nox/kol/service/EmailProjectService.java:6638)、[6879](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/KOLServer/ServiceInternal/src/main/java/com/nox/kol/service/EmailProjectService.java:6879) |
| 主列表参数/新服导入旁路 | [KolEmailTaskSearchVo.java:13](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/KOLServer/Entity/src/main/java/com/nox/kol/vo/KolEmailTaskSearchVo.java:13)；[TikTokShopEmailProjectImportService.java:97](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/kol_server_v2/main.server/src/main/java/com/nox/kol/main/server/modules/tiktokshop/service/TikTokShopEmailProjectImportService.java:97)、[Mapper:15](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/kol_server_v2/main.server/src/main/resources/com/nox/kol/main/server/mapper/tiktokshop/TikTokShopEmailProjectImportMapper.xml:15) |

安全校正：本轮未在所查编辑页/组件检出 `beforeRouteLeave/beforeRouteUpdate/beforeunload` 保存钩子；销毁时清理计时器不等于离开保存。风险结论来自初始化/内容类型watch、菜单切换及定时保存，不扩大为所有离开动作都会保存。

## 7. 本轮交付及后续

- 已完成：邮件模块入口/任务映射、线上无写入入口核对、双服务端边界复核、Demo七项定向检查、差异回流；不作正式设计还原或新权限生产验收。
- 未修改：Dashboard布局、Demo运行文件/统计模型、真实前后端源码、账号权限、邮件/配额/数据库。未为本轮重新执行全部Demo发布测试，沿用现有运行版本并另做定向检查。
- 阅读呈现建议参考设计规范 `../kol2.0-design-specification/README.md`、`playbook/components/form.md`、`modal.md`和`element-ui-alignment.md`；复用原表单、只读状态和锁定来源，具体视觉留Design，不照搬Demo抽象布局。
- 协作者编辑入口及三类分权已在本稿顶部后续确认中收口；下一步继续旧来源及组切换/自动保存边界，再逐模块开展收藏夹/监控、CRM、消息及支付映射。其他建议不自动批准，不把其他模块映射标记完成。
