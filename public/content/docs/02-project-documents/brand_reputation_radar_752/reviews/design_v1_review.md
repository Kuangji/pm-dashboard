# Design v1 · Demo同步与验证记录

日期：2026-09-08。当前有效交互定义为 [Design v1](../design_v1.md)，业务定义为 [Spec v1](../spec_v1.md)，上游边界为 [Input](../input_v1.md)。本记录是本轮实测，Spec初稿评审和接管记录仍是历史快照。

## 1. 版本与工作区

| 对象 | 实测状态 |
| --- | --- |
| 文档 | drafts `.worktrees/brand-radar-voc-integration-demo`；分支 `codex/brand-radar-voc-integration-demo`；HEAD `d7ea123539153bec40b05172c80ab8001faef699` |
| 代码 | `/Users/yukuangji/Work/NoxInfluencer/pm-workspace/kol-next`；分支 `codex/752-brand-reputation-radar`；HEAD `64b19fb349d3eb2e135f1989858a435839765bab` 加本轮未提交增量 |
| i18n子模块 | `866072151f599fca56b842638c9a1a0af15991ff`，未修改；新文案在品牌局部消息注册 |
| Node | `/Users/yukuangji/.nvm/versions/node/v14.21.2/bin/node` |
| 浏览器 | Playwright CLI，复用 `radar-stageb` Chromium会话，直接访问3322真实Nuxt开发页 |
| Git边界 | 本轮未stage、commit、push或切分支；已有`.gitignore`修改保留，未纳入本轮；旧静态Demo等文档工作树既有修改保留 |

本轮代码不能仅从HEAD重建，需同时保留以下工作区修改。正式产品目录也是文档工作树中的未提交文件，不宣称已经Git提交归档。

## 2. 修改文件与简化

代码根为上述kol-next；以下是本轮修改/新增，不含既有`.gitignore`：

| 文件 | 目的 |
| --- | --- |
| `api/brand/reputationRadarStageB.js` | 屏蔽共有伪曝光曲线，新增有效样本n，全空时不生成时间桶 |
| `components/brandReputationRadar/overview.vue` | 重置局部排序、空态、重试、Creator分域证据 |
| `components/brandReputationRadar/realtime.vue` | 评论小趋势采样时间，实际榜单名次，品牌TopNumber adapter |
| `components/brandReputationRadar/section/topNumberSection.vue`（新增） | 旧模板硬编码#1且无插槽；只覆盖模板，继承旧props/子组件/计算/事件及SCSS |
| `components/brandReputationRadar/section/contentTableSection.vue` | Enter搜索trim，无可靠历史时隐藏趋势列 |
| `components/brandReputationRadar/section/emotionSection.vue` | 候选主题去重，主题×情感行保留 |
| `components/brandReputationRadar/section/creatorImpactSection.vue` | 主条、tooltip、读屏采用有效内容样本n |
| `components/brandReputationRadar/section/themeDrawer.vue` | 同抽屉可选evidenceGroups，原单域comments合同保留 |
| `components/brandReputationRadar/stageBMessages.js` | 有效n、内容证据、证据总数的五语词条 |
| `scripts/brand-reputation-radar-demo.test.js` | 实际排名/不相同发布与采样时间回归，主n断言 |
| `scripts/brand-reputation-radar-design-controls.test.js`（新增） | 首次全景五语、trim、排序、去重、证据域及条件列6项 |
| `scripts/brand-reputation-radar-design-data.test.js`（新增） | 历史可用性、空集合、未知排除、n和分域兼容5项 |
| `scripts/brand-reputation-radar-design.browser.js`（新增） | 本轮实页交互、空态、重试、截图与桌面宽度验收 |
| `docs/知识库/功能模块/搜索与洞察/页面/brand/reputation-radar.md` | 同步当前路由/字段/模块与交互事实 |
| `docs/测试用例/2026-09-08-品牌舆情雷达Design同步测试用例.md`（新增） | P1～P3用例与边界 |

本地任务记录与测试结果按仓库规则放在ignored的`docs/任务记录/`、`docs/测试结果/`；截图在`output/playwright/design-v1-sync/`。产品文档新增Design及本记录，并同步Spec、Input下游说明、README、Research VDR索引和Sync Inbox。

简化：删除假曲线的用户展示、消除重复主题候选和混合证据口径，未新增模块、卡片体系或抽屉工作流。没有修改`components/voc`、`api/voc`、`store/voc`与旧customer-voice路由。

## 3. 本次命令与结果

Node脚本统一使用上述Node14绝对路径，工作目录为kol-next。

| 命令尾部 / 验证 | 本次结果 |
| --- | --- |
| `scripts/brand-reputation-radar-stage-b.test.js` | 13/13 PASS |
| `scripts/brand-reputation-radar-demo.test.js` | 38/38 PASS |
| `scripts/brand-reputation-radar-design-controls.test.js` | 6/6 PASS；独立审查复跑通过 |
| `scripts/brand-reputation-radar-design-data.test.js` | 5/5 PASS；独立审查复跑通过 |
| `scripts/brand-reputation-radar-stage-b.browser.js` | 53/53 PASS；运行时pageerror为0 |
| `scripts/brand-reputation-radar-design.browser.js` | 14/14 PASS；运行时pageerror为0 |
| Node14 ESLint，覆盖全部本轮JS/Vue代码与测试文件 | 0 errors；controls测试输出有3条no-console warning |
| `git diff --check` | PASS |
| `git diff --name-only -- components/voc api/voc store/voc pages/customer-voice` | 空，受检旧VOC路径没有改动 |
| `git diff --cached --name-only` | 空，未暂存 |

浏览器脚本是函数表达式，不按Node脚本运行。实际执行方式（分别将路径替换为Stage B及Design脚本）：

```sh
perl -0pe 's/\z/\0/' scripts/brand-reputation-radar-design.browser.js | xargs -0 /Users/yukuangji/.codex/skills/playwright/scripts/playwright_cli.sh -s=radar-stageb run-code
```

逻辑回归先复现失败，再修改：主任务排名测试先得到undefined而非2；controls原5项、data5项分别复现差异。联调发现`realtimeMessages`为locale map而非mixin，补首次进入全景的真实VueI18n五语回归后修正。补充浏览器首轮因内容主题表/内容明细表共用class而产生严格定位失败；修正runner定位后14项全通过，此失败不是产品逻辑故障。

未运行全站生产build或旧VOC授权整页；当前真实开发页已编译并经过浏览器验收，不能等价为生产发布验收。

## 4. 设计-代码-真实环境校验

设计依据：`kol2.0-design-specification/README.md`与`playbook/design-principles.md`、`element-ui-alignment.md`、`accessibility.md`，具体尺寸及来源见Design第2～3节。本轮没有MasterGo DSL输入，不宣称MasterGo像素还原。

| 核对项 | 本次证据 |
| --- | --- |
| 全景骨架 | core/content/comment/impact四组；高级筛选仍可打开/应用/清除；无other或锚点 |
| 动态骨架 | 集成地图+摘要+72小时趋势；内容/评论连续；无高级抽屉、重复content-trend或自动定位 |
| VOC卡片 | 来源/地区配对宽668px且同顶；Creator白底、20px圆角、4px标题边、18/8px主次条 |
| 地图局部筛选 | US点选只过滤内容表，保留品牌路由；采样评论仍34，scrollY保持；负向主题亦不滚动 |
| 搜索/排序 | 输入`  denim  `再Enter得到2条；全景应用高级条件后排序状态和表头箭头同时清空 |
| Creator证据 | 同一抽屉显示“内容证据8”“头部内容评论采样24”，顶部为证据共32条，不叫评论32条 |
| 主n | 使用validContentCount；新增未知情感样例证明全部组内容不进入计算n，图、tooltip与读屏一致 |
| 重试 | 直接进入全景，注入本地Store失败后出现“重新加载”，点击恢复Mock快照，无服务端失败注入 |
| 空快照 | trend.time为空，标签为空，两个新增短空态存在；原其它图表保留自身成熟空态 |
| 时间与名次 | published_at≠sampled_at时评论小趋势按后者；选择第二标签实页显示#2 |
| 1440px | 两页document/radar宽1440px，无横向溢出 |
| 1280px | 两页document/radar宽1424px，继承全站最小宽度，无新增雷达溢出；并非1280绝对无横滚 |
| 五语 | 新词条及直接进入全景重试五语测试通过；不代表完整五语全页/长文本视觉验收 |

修改前后截图用相同1440×1000视口，补充1280×1000。地图截图等待world注册与geo option可用；早期加载中截图已重拍，不用spinner证明地图完成。ECharts地图呼吸点/词云颜色会随动画和布局变化，不当作容器差异。

visual-verdict：96/100 PASS（阈值90）。保留原栅格、间距、标题和Dashboard；必要变化仅趋势列隐藏、证据分段标题及空态。状态记录在drafts主目录`.omx/state/brand-radar-design-v1/ralph-progress.json`。

## 5. 截图与预览

- [Overview 1440截图](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/kol-next/output/playwright/design-v1-sync/after-overview-1440.png)
- [Realtime 1440截图](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/kol-next/output/playwright/design-v1-sync/after-realtime-1440.png)
- [Overview 1280截图](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/kol-next/output/playwright/design-v1-sync/after-overview-1280.png)
- [Realtime 1280截图](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/kol-next/output/playwright/design-v1-sync/after-realtime-1280.png)
- [Creator分域证据截图](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/kol-next/output/playwright/design-v1-sync/creator-evidence.png)
- [空结果截图](/Users/yukuangji/Work/NoxInfluencer/pm-workspace/kol-next/output/playwright/design-v1-sync/empty-overview.png)
- [全景预览](http://127.0.0.1:3322/brand/reputation-radar/overview?pkId=17135&platform=1) / [动态预览](http://127.0.0.1:3322/brand/reputation-radar/realtime?pkId=17135&platform=1)

关键校验摘要SHA256（对应本记录版本）：

| 文件 | SHA256 |
| --- | --- |
| overview.vue | `672b6939c7a6a8b4043aeaee65c46bddd1211de4bcaa6405a07e1bed0c256329` |
| realtime.vue | `7228182fff0c02557f71913d81c595a8c3c800231d0c0dadd72b605b50463f37` |
| reputationRadarStageB.js | `6b6d949876c57c8a60820fa064f51ffa9be56e64951e510e9dd9cf26f7e70bb2` |
| after-overview-1440.png | `56938bc9ed55a81342b90e84da7417c3a0c2a604a569c7c6f93970e510319415` |
| after-realtime-1440.png | `19105686eb4b2bd85b71f36408205b56a26654857a23299b84985d9b444b86f9` |

## 6. 请求边界、独立审查和剩余工作

Stage B浏览器监听XHR/fetch并区分宿主壳层已知请求：未发现雷达业务API或VOC请求、采集、扣费、导出或业务写入。实际仍有全站公共通知GET、Twitter settings GET、Google Analytics collect POST、Stripe遥测POST，以及开发HMR；这是实际kol-next壳层，不宣称整个页面零网络或零POST。未发现未知新增业务请求；没有扩充请求白名单来掩盖失败。

浏览器pageerror为0，但开发环境有局部vue-i18n向root词条回退的warning，以及既有Nuxt组件自动导入提示；不是零告警环境。新增雷达词条没有在页面显示原始key。

独立只读审查未发现新增critical/important代码问题；已修正两个文档minor：来源榜为只读，语言小趋势不再沿用发布时间。审查单独复跑controls6/data5并核实旧VOC目录无diff。

静态Demo：PASS。生产：HOLD。DIFF-01/03/04/05/06/07/09本轮完成并验证；DIFF-02关闭同名采样趋势差异，但P-06生产窗口仍待定；DIFF-08关闭可执行空态/重试，完整覆盖元数据仍待定；DIFF-12/13资格与覆盖门槛不能用Mock非空和演示阈值替代。

后续PRD必须承接Spec P-01～10与Design D编号。Stage C提及类型、主题关联、近期观察仍未开发；正式品牌身份/市场/语言/返回、权限、算法/阈值、采样与刷新、生产接口未因本轮定案。完整五语长文、键盘全路径和旧VOC授权整页仍待专项核验；当前保留旧Element行为不等于完整可访问性认证。
