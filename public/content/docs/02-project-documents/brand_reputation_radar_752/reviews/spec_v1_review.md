# v7.5.2 - 品牌舆情雷达 · Spec v1 证据与一致性审查

日期：2026-09-08。评审对象：[spec_v1.md](../spec_v1.md)。本记录不构成另一份产品定义；正文业务规则与未决项以 Spec 为准。

## 1. 本轮范围与版本

- 需求：结合正式 Input 和 kol-next Demo 编写供后续 PRD 使用的完整 Spec，覆盖旧 VOC 保留、修改、降级、删除、新增及后续增量逻辑。
- 文档仓库 worktree：`/Users/yukuangji/Work/NoxInfluencer/pm-workspace/drafts/.worktrees/brand-radar-voc-integration-demo`；分支 `codex/brand-radar-voc-integration-demo`。正式目录 `01_Product_Specs/brand_reputation_radar_752/`。
- 代码仓库：`/Users/yukuangji/Work/NoxInfluencer/pm-workspace/kol-next`；分支 `codex/752-brand-reputation-radar`；HEAD `64b19fb349d3eb2e135f1989858a435839765bab`。
- i18n HEAD：`866072151f599fca56b842638c9a1a0af15991ff`。本轮开始仅 `.gitignore` 有已有未提交修改；未修改它、业务代码或子模块。
- 正式 Input 读取前 SHA-256：`b90ce61e9903b9c072f4c1494da59ac80179996262f63a04b6aeca68282f1104`。本轮仅补正式文档分工、历史时态和迁移后链接，不改变上游业务边界；不再要求与来源 handoff 字节完全一致。
- Research handoff 顶部增加来源快照说明，原文保留；正式 Input 与 Spec 在正式目录继续演进。README 和 Research VDR索引同步，现有 `_sync_inbox.md` 继续作为唯一回流入口。

## 2. 核对方法与覆盖

已完整读取 Input（源正文774行），逐项检查第5～13节目标及第17节实现状态；旧 common context/计划/早期Input不覆盖本轮。代码核对以当前路由实际挂载组件与 Stage B 数据流为准，不根据复制文件存在推断能力。

采用两个独立只读核对：旧 VOC/新 Demo 全能力清单、两个服务端身份与数据/权益边界。主作者独立读取 Stage B provider、当前页面与关键交互源码，结合内置浏览器实页完成综合稿；两个核对方再分别对稿件作反向审查。没有把审查任务当作向团队成员发送消息。

| 上游 | Spec承接 | 审查结果 |
| --- | --- | --- |
| Input §1～3 目的/身份/产品边界 | Spec §1～2 | 独立Brand产品与付费、Assets基础证据边界保留 |
| Input §4 页面头部和Tab | Spec §2、4 | 默认全景、窗口、状态、两个Tab保留 |
| Input §5 全景15项 | Spec §5、8、12.1 | 15项逐项标保留/降级/删除，无受众/发布模块恢复 |
| Input §6 动态9项 | Spec §6、12.2 | 9项全部有去向，Dashboard不拆，旧TopTable不伪称保留 |
| Input §7 基础证据/Assets | Spec BR-05、EVD-01 | 证据与完整资产权限分开，ID非假外链 |
| Input §8 数据合同 | Spec §2～3、11、14 | 内容/评论集合、时间、分母、Mock与生产映射分开 |
| Input §9 组件复用 | Spec API-03、DSN-01 | 独立命名空间/副本；共享图表opt-in兼容 |
| Input §10 Stage A/B/C/D | Spec §1、4～10、12～15 | B既有逻辑为基线，C后续且参数待决，D不过度宣称通过 |
| Input §11 状态 | Spec §9 | 非空不等于样本足够，模块级门槛差异保留 |
| Input §12 文案 | Spec §1、4、6、11 | 终端文案与采样弱提示；不新增解释墙 |
| Input §13 验收 | Spec §15 | AC-01～18与业务编号可映射，静态/生产分开 |
| Input §14 差异回流 | Spec §13 + 既有_sync_inbox | DIFF-01～13明确登记，不静默改代码 |
| Input §15 排除 | Spec BR-02、§12 | 未恢复旧范围或引入导出/工作流/移动端 |
| Input §16 设计规范 | Spec DSN-01、§16 | 使用具体设计规范文件，Design文档待补 |
| Input §17～18 历史实现/议题 | Spec §10、13～15 | 当前HEAD已含代码，旧未跟踪描述保留为历史，生产P项保留 |

## 3. 前端关键证据

本表路径相对 `pm-workspace/kol-next/`，行号绑定上述HEAD。本次仅业务源码核对，不是每行代码已做浏览器覆盖的声明。

| 源码位置 | 证据 |
| --- | --- |
| `pages/brand/reputation-radar/_tab.vue:31`、`:42`、`:69`、`:89` | tab校验、读取pkId/platform、头部当前snapshot映射、query保留 |
| `components/brandAI/pageComponent/brandBasic.vue:277` | Brand入口带pkId/platform/return，不触发解锁 |
| `components/brandReputationRadar/components/header.vue:62` | 观察截至读取lastUpdateTime，不等于用户选窗endTime |
| `components/brandReputationRadar/overview.vue:33`、`:55`、`:161`、`:208` | 四组结构与双域实例，无其它组 |
| `components/brandReputationRadar/overview.vue:315`、`:340`、`:365`、`:488`、`:520`、`:529` | 核心指标、标签/曝光、内容表默认顺序/过滤、应用筛选、主题表局部条件 |
| `components/brandReputationRadar/realtime.vue:21`、`:98`、`:149`、`:175`、`:512`、`:553`、`:565` | 整体Dashboard、来源条件、实际内容表、评论主题非空条件、清全景隐藏筛选、主题/地区互斥 |
| `components/brandReputationRadar/realtime.vue:456`、`:480` | 评论主题/语言小趋势采用published_at，与核心sampled_at不同 |
| `components/brandReputationRadar/section/filterDrawer.vue:183`、`:220`、`:244` | 统一字段、日期快捷、草稿隔离与apply/clear |
| `components/brandReputationRadar/section/contentTableSection.vue:100`、`:127`、`:145`、`:228`、`:275` | views排序、示例小趋势、采样情感、分页、标题过滤组合 |
| `components/brandReputationRadar/section/commentTableSection.vue` | 默认发布时间排序、即时正文搜索、外部集合重置、表内主题证据范围；评论点赞字段已移除 |
| `components/brandReputationRadar/section/emotionSection.vue:230`、`:238`、`:271` | 主题候选重复风险、无正负趋势处理、按域主题抽屉 |
| `components/brandReputationRadar/section/themeDrawer.vue:2`、`:24` | 单抽屉、证据数/内部滚动，无内部分页或真实外链 |
| `components/brandReputationRadar/section/creatorImpactSection.vue:123`、`:143`、`:181` | 主18/次8条形、主n=contentCount/次n=commentedContentCount、−100～100尺度 |
| `api/brand/reputationRadarStageB.js:10`、`:153`、`:214`、`:240`、`:281`、`:320`、`:428`、`:465` | 轮转规模权重、头部模拟选择、窗口/分桶、主题×情感、演示算法、双域筛选、已知评论分母 |
| `assets/demo/brandReputationRadar.js:26` | 多内容共用viewsTrend，不能证明逐内容历史一致性 |
| `store/brandReputationRadar/stageB.js:31` | requestId保护、失败清快照 |
| `components/voc/overview.vue:77`、`:138`、`:152`；`components/voc/realtime.vue:427` | 旧分布/创作者/受众/发布模块及旧钻取跳页，与新范围区分 |
| `components/voc/section/topNumberSection.vue:10`、`:79` | #1固定标记与前5排行，与选中项摘要存在差异 |
| `components/voc/section/topTableSection.vue:1`；`components/voc/section/filterDrawer.vue:35` | 旧热门表多列及views/comments Tab、旧地区语言/内容主题/hashtag高级字段；当前不全部挂载 |

## 4. 服务端证据及验证边界

两库工作区均干净；先检查实际本地说明与pom/README，再检索相关模块。只读静态代码，没有远端API请求或采集/解锁操作。

| 仓库 | 分支 / HEAD | 本地约束与范围 |
| --- | --- | --- |
| kol_server_v2 | master / `234e9dad738f088550c2d75ef96d457a9b315547` | 未找到AGENTS/CODEX/根README；读取pom；检索四模块Java/XML |
| KOLServer | master / `706dc8ea0ed51f8a5752a9e2f497427f95432faa` | 未找到AGENTS/CODEX/CLAUDE；读取README、pom；检索VOC/Brand/Elasticsearch服务 |

路径相对相应仓库：

- KOLServer `WebService/src/main/java/com/nox/kol/ws/upgrade/voc/VocController.java:24` 定义 `/ws/voc`；`:37/48/59/64/87/99/143/148/158` 等分别承接聚合、主题、热门内容、摘要、标签、明细、品牌、筛选候选。
- `Common/src/main/java/com/nox/kol/upgrade/vo/VocParamDto.java:29` 的vocBrandId/industryId与Brand pkId不同；`ServiceInternal/src/main/java/com/nox/kol/upgrade/service/voc/VocService.java:61` 使用固定行业与VOC品牌对象，`:69/74/77` 分别记录旧起止与刷新来源。
- `Entity/src/main/java/com/nox/kol/entity/KolScope.java:97/112/117` 分别是45 Brand Monitor V2、47品牌分析基本信息、49品牌分析全部信息。不能转成新Radar权益。
- `ServiceInternal/src/main/java/com/nox/kol/service/brandMonitor/BrandMonitorV2Service.java:319/334` 旧基础/高级解锁带事务，`:324/339` 更新配额。`WebService/src/main/java/com/nox/kol/ws/upgrade/brand/BrandMonitorControllerV2.java:193/206` 即使是GET仍是写操作。
- `ServiceInternal/src/main/java/com/nox/kol/upgrade/service/voc/VocCommentService.java:169/183/191/219` 包含多情感/数量排序/多主题/证据查询；不能将主题各行求和当唯一评论数。
- `Elasticsearch/src/main/java/com/nox/kol/elasticsearch/upgrade/service/EsVocCommentsSearchService.java:118/124/148` 按VOC身份、published_at、平台索引查询，未证明新产品头部评论采样策略。
- kol_server_v2 `data.api/src/main/java/com/nox/kol/data/api/brand/api/BrandInteractiveSearchApi.java:8/17` 是Brand内部互动适配；全文检索 `vocBrandId|voc_brand|ws/voc|queryAllVocBrand` 未发现VOC全链迁移实现。未找到不等于断言所有远端服务不存在。

以上仅证明本地源码能力。新Radar生产接口、采样策略、品牌身份映射、权限与状态仍需Spec的P项关闭，不以旧服务存在直接标生产就绪。

## 5. 本轮执行验证

工作目录为kol-next，应用规定Node14.21.2；本次不写新测试、不修改业务代码。

```sh
/Users/yukuangji/.nvm/versions/node/v14.21.2/bin/node scripts/brand-reputation-radar-stage-b.test.js
/Users/yukuangji/.nvm/versions/node/v14.21.2/bin/node scripts/brand-reputation-radar-demo.test.js
```

| 验证 | 本次结果 | 证明范围 |
| --- | --- | --- |
| Stage B Node脚本 | 13/13，exit0 | 双域集合、过滤、时间、未知、算法算例、覆盖场景、异步保护 |
| Demo acceptance Node脚本 | 37/37，exit0 | 页面接入、字段适配、部分方法逻辑与隔离，不等于37项端到端交互 |
| 内置浏览器Overview | 页面可读，38内容/180采样评论；core/content/comment/impact，双域情感、来源摘要、Creator图 | 当前未登录壳层下固定示例；非任意品牌/付费权限证明 |
| Overview高级筛选 | 打开可见两域完整字段；点击取消关闭，页面仍38/180 | 验证打开/取消，本次未声称全组合apply/clear浏览器验收 |
| 内置浏览器Realtime | 最终显示8内容/34采样评论、72小时摘要、整体Dashboard与内容/评论组，无高级按钮 | 导航等待一度超时，随后读取同tab实际已到目标页；不能把首次超时当失败页面或未到达 |
| 历史主浏览器53/53、补充交互39/39、共享SFC4/4 | 本次未全量重跑 | 只引用历史记录，不能代替当前全部AC通过 |
| 新旧服务端 | 仅静态检索 | 无线上授权、数据健康、刷新SLA验证 |

浏览器表面：Codex In-app Browser，读取既有tabs；目标分别为 `http://127.0.0.1:3322/brand/reputation-radar/overview?pkId=17135&platform=1` 和同前缀 `realtime?pkId=17135&platform=1`。没有切生产账号、绕过白名单、调用购买/解锁接口。浏览器页面可见登录入口，因此其示例可读只证明Demo开放行为，不能确认生产匿名访问权限。

本次未重新捕获请求全量日志/截图或跑生产构建；不复制历史截图当本轮截图。历史验收属于工作区追溯记录，必须保留当时版本与验收边界。

## 6. 独立复审发现与回写

| 发现 | 处理结果 |
| --- | --- |
| 评论主题样本不足降级遗漏 | 已补RT-04/ST-03、P-04、AC-14及DIFF-12；当前仅非空渲染不是合格门槛 |
| Creator内部覆盖率门槛被绝对样本门槛掩盖 | 已补IMP-02、P-01、DIFF-13；生产分母与阈值待定义，UI不显示覆盖率 |
| 所有比例都排除未知的措辞过宽 | 已限制为正负情感占比，未知比例/覆盖率另用专属分母 |
| 观察截至误写endTime | 已改fixture.lastUpdateTime与snapshot.window.endTime独立，生产语义仍待定义 |
| C-03来源交集可能恒真 | 已保留方向但不冻结计算，P-10要求独立来源实体定义与非平凡算例；未定义不生成 |
| scope47/49名称泛写成报告权限 | 已纠正为Brand分析基本/全部信息，保持与Radar独立权益分离 |

复审没有把候选业务决策变成已接受算法，也没有要求重新复制VOC。DIFF和P项已同步回既有_sync_inbox；它们是后续工作，不是本次已修代码。

## 7. 审查结论与下游门槛

本地文档检查：正式目录与Research导航/回流入口的相对链接无断链；Spec矩阵包含全景15项、动态9项、13项差异、10项待决合同、18个验收场景。路径存在检查与条目计数仅证明文档结构完整，语义结论来自上述Input/代码复核和独立审查。受本轮影响文档的git diff whitespace检查通过；kol-next业务代码与HEAD一致，既有.gitignore改动保留。

稿件覆盖审查通过：旧15/9模块与跨模块行为均有明确去向；目前挂载的双域聚合、筛选、搜索、排序、分页、抽屉、地图、Creator及状态业务已展开；Stage C和生产待决项单列，可作为产品审阅及后续PRD编写输入。

此结论不等于产品审阅通过、所有生产合同已冻结、所有Demo差异已修复或生产就绪。Spec保留13项差异（文档引用已修正，其余主要为实现待修/待定义）和P-01～10。旧VOC整页、完整五语及所有浏览器验收场景未由本次重新关闭。正式Design仍需编制，PRD不得省略这些状态。
