# 组织与组账目映射核查

> 核查日期：2026-11-12。本文是 fresh 静态代码核查与改动影响分析，不是新增产品决策或接口已部署声明。未访问真实页面、未调用环境接口、未查数据库、未运行生产服务或测试。本轮不修改现行 Input、Story、Demo 或真实前后端代码。

## 1. 证据范围

| 仓库 | 本次读取分支 / HEAD | 状态与边界 |
|---|---|---|
| `../kol-next` | `codex/752-brand-reputation-radar` / `82f1e1014a6ab0ea692c8157c9057792adbcbda4` | 存在品牌舆情、`.gitignore`、`server/const/const.default.js` 等未提交修改；未触碰。所读支付文件的静态存在，不证明当前生产已部署。 |
| `../KOLServer` | `master` / `706dc8ea0ed51f8a5752a9e2f497427f95432faa` | 工作区干净。当前账目 Controller、Service、Mapper 链路在此仓。 |
| `../kol_server_v2` | `master` / `234e9dad738f088550c2d75ef96d457a9b315547` | 工作区干净。本次对 Java/XML 检索未命中旧账目端点及 WalletChange 实现；不能据此排除其他研发分支或未交付实现。 |
| 本项目 Demo | `06_Prototypes/account_permission_review_demo/` | 读取本次修订前现存资金模型、账目展示及测试。主 Agent 正进行的新设计不作为既有实现事实。 |

已读取前端 `AGENTS.md`、`CODEX.md`、`README.md`、`package.json`；旧服务端 `README.md` 和父 `pom.xml`；新服务端父 `pom.xml`。两个服务端根目录本次未检出 `AGENTS.md` / `CODEX.md`，新服务端根目录未检出 `README.md`。前端仍为 Vue 2 / Nuxt 2 / Element UI；旧服务端为多模块 Maven 工程；新服务端父工程为 Java 21 / Spring Boot 4.0.5。

## 2. 当前真实代码中的账目入口

```text
/payment/list 钱包概览
  -> /payment/history 独立收支明细页面
       -> 列表 + 顶部统计 + 分页 + 导出
       -> 非充值记录点击订单号
            -> PaymentDrawer 支付单详情抽屉（不是组账目抽屉）
```

- 页面：`../kol-next/pages/payment/history/index.vue`、`history.js`、`history.scss`。
- 页面入口来自 `pages/payment/list/index.vue:20` 的 `/payment/history` 链接。
- 账目页不是可直接传入组范围的现成抽屉组件。它包含页面标题、返回支付列表入口、页面挂载初始化和签约状态 middleware。
- middleware 调用 `getSignStatus`，仅状态 1 或 3 留在账目页，否则回 `/payment/list`。组织管理侧历史账目的可达性不能未经审查直接继承这项签约入口限制。
- 当前 `components/payment/paymentDrawer.vue` 是 640px 支付单详情抽屉；接收 `visible`、`orderId`，打开时通过全局 store 请求支付详情。它展示金额、收款币种、手续费、备注、合同分享链接等，不是组收支列表。
- 账目页的静态知识库镜像 `docs/知识库/功能模块/支付与计费/页面/payment/history/index.md` 未完整描述当前 store/API 依赖；本文以 fresh 源码为准。

### 2.1 可复用的现有展示能力

| 能力 | 当前实现 |
|---|---|
| 检索 | 订单 ID、营销任务 `campaignId`、变动类型多选、日期范围 |
| 日期口径 | `CREATE_TIME` / `PAY_TIME`；初始化最近 365 天；支付时间另列 |
| 汇总 | 已支付、支付中、退款中、退款、退款损耗、充值、额外手续费 |
| 明细 | 创建时间、支付时间、订单 ID、变动类型、达人/营销任务、支付状态、金额、余额快照 |
| 分页 | 10 / 20 / 50 条；服务端最大单页 50 |
| 导出 | `.xlsx`，筛选快照与列表共享参数构造，下载不携带分页 |
| 订单追踪 | 非充值行可打开支付单详情抽屉；充值行订单号不打开抽屉 |

其中 `campaignId` / `projectId` 是既有营销任务，不是新业务组，不能拿来代替 `groupId`。现有真实页面以 USD 展示，Demo 的 CNY 只是假数据口径，不能将其当生产币种契约。

### 2.2 当前接口与数据流

| 层 | 代码事实 |
|---|---|
| 前端 API | `api/payment.js:53`：`GET /ws/payment/walletChangeDetails`；下载为 `/ws/payment/downloadChangeDetails`；钱包概览为 `/ws/wallet/getInfo`。 |
| store | `store/payment.js:174` 的 `getHistoryList` 同时提交列表和统计，有递增 requestId 避免旧响应覆盖。`historyListData`、`historyData` 为全局单份状态。 |
| 前端参数白名单 | `utils/paymentHistoryDateFilter.js` 只保留 `orderId`、`campaignId`、`status`、`startTime`、`endTime`、分页和 `dateType`；没有组织/组范围。 |
| Controller | `KOLServer/WebService/.../upgrade/payment/BusinessPaymentController.java:240`、`:280`；读取 `uid`，`param.init()` 后转 Service。 |
| Service | `KOLServer/ServiceInternal/.../upgrade/service/payment/PaymentService.java:1760`、`:1880`；通过 `userRelationService.getParentUid(uid)` 找唯一钱包，再做列表、汇总及下载。 |
| 参数对象 | `KOLServer/Entity/.../upgrade/vo/payment/SearchWalletLogParam.java`；没有 `groupId`、`organizationId` 或资金范围枚举。 |
| Mapper | `KOLServer/ServiceInternal/src/main/resources/com/nox/kol/mapper/WalletChangeLogMapper.xml` 的 `historyChangeBase`、`selectChangeDetails`、`aggWalletChangeLog`、`selectExportChangeDetails`。 |
| 钱包/流水 | `Wallet` 按 `parentUid` 关联；`WalletChangeLog` 关联 `walletId` 和订单，没有新业务组或资金来源快照字段。 |

当前链路据父账号钱包做查询，本次所读方法中未看到新 Owner/Admin 角色或业务组范围鉴权。不能把“能查询同一父钱包”解释为已实现本期的组织总账权限。

## 3. 不能仅靠前端筛选解决的差异

1. **没有组范围事实字段。** 查询、统计、下载的参数、VO 和所读账本实体都没有新业务组维度。只在前端分页结果中过滤，会产生漏项、统计不一致和越权风险。
2. **账目事件不完整对应。** 当前 `WalletChangeLog.changeType` 为充值、支出、退款、召回手续费（另有失效），模块类型为钱包、代付、联盟营销；没有本期组划入、收回、归档回收的独立事件及内部转移关系。
3. **列表查询并不是所有钱包模块的无差别总账。** `historyChangeBase` 当前组合代付 `kol_order_type=1` 与充值 `kol_order_type=0`；不能仅凭 `WalletChangeLog` 支持联盟营销类型，就宣称该页面已覆盖所有模块。
4. **现有余额快照不是组余额。** Mapper 用 `pending_snapshot + balance_snapshot` 生成当前明细的余额展示，不能重命名成“组余额”使用。
5. **时间口径需保留而非混用。** `PAY_TIME` 通过首次进入开始转账状态的日志取时间；SQL 对无实际开始转账时间的记录回退创建时间并后置排序。新内部划拨没有支付单和支付时间，需明确按记账事件时间展示，不伪造转账日期。
6. **组织总账不能重复累计内部划拨。** 组划入/收回改变内部资金归属，不应被当作组织充值/对外支出再次计总收入或总支出。应保留组织变动、组变动和占用变动的独立列或等价表达。
7. **组织账目可见不等于支付正文可见。** 组织管理者获得总账后，订单详情、合同链接与敏感字段仍应按本次最终权限矩阵处理。不能因复用了 `PaymentDrawer` 自动获得业务详情。

## 4. 复用方式与新增能力边界

### 4.1 可以复用

- 提取账目页的筛选、统计、表格、分页和导出展示内核，分别供组织账目及固定组账目抽屉使用。
- 继续使用现有状态/变动类型呈现模式、创建/支付日期切换及同一筛选快照请求机制。
- 有有效单据访问权时继续复用支付详情抽屉；没有访问权时不开放其入口，具体字段可见性由主线矩阵确定。

### 4.2 必须适配或新增，不能宣称已有

- 新增受服务端校验的范围契约：组织全账、组织未分配/共享账、固定业务组账。组抽屉的组 ID 是锁定上下文，非任意前端筛选。
- 列表、汇总、导出、营销任务候选、详情跳转都使用同一获准范围；跨组织或越组参数应拒绝，不由前端兜底。
- 真实组流水及内部划拨/收回事件、历史归属字段、资金承担快照、退款/释放路由、幂等和对账关联属于后端增量工作。
- 前端参数白名单、后端参数对象、Mapper 条件、VO、导出行字段必须一起适配；仅改列表会造成导出或汇总漏过滤。
- 原 Vuex 是全局单份账目状态。组织页与组抽屉复用时应隔离实例状态/请求或保证关闭后按原上下文重取，避免后请求覆盖另一范围的列表和统计。
- 原页面 middleware、mounted 初始化、页面标题/返回链接应与可复用展示层分离，不能把整页原样嵌入后依赖隐式路由上下文。

以上是成本/边界判断，不意味着应新造一套视觉表格；也不证明组接口已在任何环境部署。

## 5. Demo 当前结构与影响图

```text
组织资金 fundsPage
  -> 组织钱包及各组资金表
  -> fundsLedger：同页事件表 + fund-ledger-scope（all/unallocated/groupId）
  -> groupLedger：只切同页范围并滚到账目，不是抽屉
                    |
                    v
engine.recordFunds -> s.fundEvents
  walletDelta / unallocatedDelta / groupDelta / pendingDelta
                    |
                    v
qa.cjs / engine.test.cjs / story.test.cjs 的资金路由与入口断言
```

| 层 | 当前入口 / 数据 | 本轮组织总账 + 组抽屉的影响 |
|---|---|---|
| `app.js` | `fundsPage`、`fundsLedger`、`fundAction('groupLedger')`、`#fund-ledger-scope`、`[data-fund-group]` | 组织总账只读入口、固定组上下文抽屉、关闭/返回后不切顶部业务组；避免把账目入口包装成业务授权。 |
| `engine.js` | `recordFunds`、`balances`、`fundEvents` | 可复用现有带组归属的假事件，不为组织/组展示复制两笔实际事件；组织/组筛选及汇总从同一事件派生。 |
| `qa.cjs` | 当前 `groupLedger` 后断言同页 `#fund-ledger-scope=g-growth`；四视口资金页；禁用后整页 placeholder | 应改为抽屉范围锁定、组织/组明细对账、打开关闭不切业务组、非获权身份不能看组织账；禁用支付的新语义另做正负回归。 |
| `engine.test.cjs` | 资金守恒、关停回收、重开周期、退款路由 | 账目展示不改账本；若新版本同时调整关闭语义，相关关停/重开测试必须按新结论重写，不能只更新文字。 |
| `story.test.cjs` | 支付未开通整页占位的静态断言 | 若关闭仅禁新建，旧整页隐藏断言应删除/替换，不能继续把新旧规则同时锁定。 |

## 6. “关闭只禁新建，不改余额”的检查清单

本节列当前耦合点，供主 Agent 落实最新决策；不是在本文自行确认“新建”是否包含草稿正式提交。

| 检查点 | 当前静态行为 | 新语义下必须核对 |
|---|---|---|
| `setGroupPaymentAccess(false)` | 生成 `close_return`，可用组余额归零。 | 若仅禁新建，应只改准入状态；不得隐式回收余额、清占用或生成虚假资金变动。保留旧历史流水，不回写历史。 |
| `setGroupPaymentAccess(true)` | 可同时首笔分配，`fundCycle += 1`。 | 普通关闭/重开不应凭空切断原资金周期。开通快捷分配如保留，应仍是独立资金事件。 |
| `balances` | `paymentEnabled=false` 时组可用强制为0。 | 区分资金余额与新建资格。不能因准入关闭把保留余额展示成0，或使允许继续的旧业务错误失败。 |
| `acceptsFundingReturn` | 仅 ACTIVE + enabled + 同周期才返回组；否则释放/退款回组织未分配。 | 关闭若不改变资金归属，应去除普通开关对旧单回款路由的影响；仍保留永久归档等独立边界。否则取消旧单也会悄悄收回组资金。 |
| `createProject(module=payment)` | 显式要求已开通，创建新草稿。 | 这是当前真正的新建入口，服务端模型与按钮两层拦截应保留。 |
| `savePayment` | 未开通时连既有草稿也不能保存。 | 若“只禁新建”允许继续已有草稿，应移除这层开通状态拦截，继续保留对象写权限/状态/金额校验。 |
| `submitPayment` / 预约提交 | 未开通不允许将既有草稿正式提交；正式提交首次占款。 | 必须明确现有草稿转正式是否算新建支付。若允许，不能留旧 enabled 拦截；如不允许，要以已确认的正式提交边界表述，不泛称只禁新建。 |
| `releasePayment` / `reviewPayment` / `cancelPayment` | 当前不直接检查开通，仍依赖原对象执行权、状态和资金承诺。 | 已提交单推进、审核、作废不能被新建开关误封；不绕过原审核、预约和原执行权。 |
| `refundPayment` | 退款金额恢复原个人已用，实际去向依赖 `acceptsFundingReturn`。 | 同时回归关闭后退款、关闭后释放、重开后旧单退款；不能改记新执行人或当前 Owner。 |
| `allocateFunds` / `returnFunds` | 两者都要求组 enabled。 | 保留余额后，至少需要明确组织如何主动收回；否则关闭会把资金操作入口一起锁死。是否继续允许向关闭组分配，由主线确认。 |
| `archiveGroup` | 单独 `archive_return` 回收未占用余额；资金人工阶段阻塞；归档免交接。 | 永久归档不是关闭新建。不得因解耦普通关闭，误删归档资金路由或归档阻塞。 |
| `app.modulePage(payment)` | 未开通整个页面只显示 placeholder。 | 若历史/已有单仍可用，应保留列表、历史和允许的动作，只禁相应新建命令。 |
| `pageActions` / `rulePanel` | 未开通隐藏全部模块动作和权限探针。 | 新建禁用与历史操作显示分开；不能继续整个工具区域隐藏。 |
| `paymentContent.canSubmit` | 同时要求执行权和 enabled。 | 与上述“现有草稿转正式”决策一致；不能只改引擎而按钮仍永久不可点。 |
| `fundsPage` / `fundAction` | 关闭提示全回收；关闭组行只有开通/看账，无分配/收回；开通可初始分配。 | 调整资金文案、余额显示、独立收回入口；保留只读账目。 |
| `rechargeNotice` / `allocateFromRecharge` | 候选组只含 ACTIVE、enabled、非共享组。 | 与关闭组是否仍可接收资金的决策一致；不让快捷入口与常规入口使用两套资格。 |

### 6.1 已存在、需要相应调整的回归断言

- `engine.test.cjs:221`：disabled 拒绝新草稿和保存旧草稿。
- `engine.test.cjs:1405`：关闭归零、`close_return`、重开新周期、旧占用释放回组织。
- `engine.test.cjs:1422` 附近：关闭后结算、再重开/归档后退款；应区分关闭与永久归档。
- `qa.cjs:953` 起：默认组关停后整页占位；增长组余额归零、旧草稿保存失败；重开后旧单退款回组织。
- `qa.cjs` 后部四视口：`#payment-unavailable` 唯一页、无 Tab/项目列表/草稿按钮。
- `story.test.cjs:169`、`:174`：故事文案和 `modulePage` 整页 placeholder 的源码断言。

## 7. 环境与研发待核

- 当前生产分支/部署版本，以及上述日期口径、签约检查、钱包查询是否与本次 checkout 一致。
- 研发一期已交付的组织/业务组数据模型、组账本接口与迁移字段；本次不能拿 master 未检出替代研发确认。
- 真实组织/组账权限、订单详情与合同链接可见字段，尤其组织管理身份不参与业务的边界。
- 组流水、内部划拨、双边账/组织合计、历史币种与手续费、外部回调幂等、对账与历史补齐方案。
- 列表/汇总/导出/候选项同范围验证；请求失败、乱序、空值与0、跨组参数、退出/归档后读历史等环境证据。
- “关闭仅禁新建”的草稿转正式边界、关闭组独立分配/收回资格和旧单回款路由，由主线最终定案。

本轮结论：**可以复用现有账目页的呈现与交互内核，但组织/组范围与组账本不是现有接口的免费筛选项；Demo 关闭支付开关也不是一个可单点替换的页面文案。**

## 8. 直接代码证据

- [真实账目页面](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/kol-next/pages/payment/history/index.vue:1)、[筛选/导出/详情逻辑](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/kol-next/pages/payment/history/history.js:176)、[参数白名单](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/kol-next/utils/paymentHistoryDateFilter.js:1)。
- [真实 API](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/kol-next/api/payment.js:52)、[账目 store](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/kol-next/store/payment.js:174)、[支付单详情抽屉](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/kol-next/components/payment/paymentDrawer.vue:174)。
- [旧服务端查询/导出 Controller](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/KOLServer/WebService/src/main/java/com/nox/kol/ws/upgrade/payment/BusinessPaymentController.java:240)、[查询参数](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/KOLServer/Entity/src/main/java/com/nox/kol/upgrade/vo/payment/SearchWalletLogParam.java:13)。
- [钱包范围和查询汇总](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/KOLServer/ServiceInternal/src/main/java/com/nox/kol/upgrade/service/payment/PaymentService.java:1760)、[导出](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/KOLServer/ServiceInternal/src/main/java/com/nox/kol/upgrade/service/payment/PaymentService.java:1880)、[SQL 共同数据集](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/KOLServer/ServiceInternal/src/main/resources/com/nox/kol/mapper/WalletChangeLogMapper.xml:201)。
- [钱包与充值](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/KOLServer/ServiceInternal/src/main/java/com/nox/kol/upgrade/service/payment/WalletService.java:69)、[现存流水实体](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/KOLServer/Entity/src/main/java/com/nox/kol/entity/WalletChangeLog.java:10)。
- [Demo 余额/账本/回款资格](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/drafts/06_Prototypes/account_permission_review_demo/engine.js:296)、[当前开关和资金调整动作](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/drafts/06_Prototypes/account_permission_review_demo/engine.js:784)、[Demo 账目展示](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/drafts/06_Prototypes/account_permission_review_demo/app.js:509)。
