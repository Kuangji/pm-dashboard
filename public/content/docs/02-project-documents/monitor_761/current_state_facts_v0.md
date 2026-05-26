# Current State Facts v0 · 内容监控现状

> 状态：pre-input 基础事实。  
> 范围：综合 `kol_brain` 与 `kol-next` 后得到的当前功能现状。  
> 约束：本文不是 761 需求方案，不定义本期范围，不提前生成正式 VDR。

## 0. 证据来源

本文综合本地知识库、前端代码库与一次只读线上实勘。

知识库来源：

- `kol_brain/wiki/overviews/NoxInfluencer M08 效果监控与内容监控工作台.md`
- `kol_brain/wiki/source-summaries/Source Summary - NoxInfluencer M08 效果监控首版.md`
- `kol_brain/wiki/source-summaries/Source Summary - NoxInfluencer M08 内容监控 2.0 v7.6.0 迭代文档.md`

前端代码/文档来源：

- `kol-next/docs/知识库/功能模块/数据与工具/页面/video-monitor/list.md`
- `kol-next/docs/知识库/功能模块/数据与工具/页面/video-monitor/monitor.md`
- `kol-next/docs/知识库/功能模块/数据与工具/页面/video-monitor/monitor-list.md`
- `kol-next/docs/知识库/功能模块/数据与工具/组件/videoMonitor/monitor/addAndAutoTrack/autoTrackForm.md`
- `kol-next/docs/知识库/功能模块/数据与工具/组件/videoMonitor/monitor/addAndAutoTrack/autoTrackList.md`
- `kol-next/docs/知识库/功能模块/数据与工具/组件/videoMonitor/monitor/addAndAutoTrack/addMonitorList.md`
- `kol-next/api/videoMonitor/list.js`

线上实勘来源：

- 2026-05-06，账号当前登录态，只读访问 `cn.noxinfluencer.com`。
- 覆盖入口：`/video-monitor/list`、`/video-monitor/monitor?id=18296`、`/video-monitor/monitor-list`。
- 操作边界：只打开页面、读取可见信息、打开新建监控抽屉和任务详情抽屉；未提交创建、编辑、删除、导出、开始监控等动作。

## 1. 事实结论

内容监控在当前体系中归属 `M08_效果监控`，核心形态不是单条视频报告，而是以“监控项目”为组织单元的内容追踪工作台。

当前模块已经覆盖三层入口：

- 项目层：创建和管理内容监控项目。
- 项目详情层：在单个项目内查看 dashboard、筛选内容、添加监控、管理自动追踪。
- 全局任务层：跨项目查看和管理所有监控内容。

v7.6.0/7601 之前的主要能力已经从旧版“视频监控”升级为“内容监控 2.0”雏形：新建监控入口合并了手动添加与自动追踪，列表开始强调来源、状态、进度和异常提示，Twitter/X 内容被纳入监控适配范围。

## 2. 模块边界与入口

| 入口 | 当前定位 | 主要承载 |
| --- | --- | --- |
| `/video-monitor/list` | 内容监控项目列表 | 项目卡片、创建项目、批量编辑、进入项目详情 |
| `/video-monitor/monitor?id=...` | 单项目内容监控工作台 | 项目概览、dashboard、筛选、平台 Tab、内容列表、趋势图、新增监控、自动追踪 |
| `/video-monitor/monitor-list` | 全局监控内容列表 | 跨项目任务筛选、dashboard、任务列表、批量操作、详情抽屉 |
| `/short-link` | Nox 短链管理 | 短链创建与管理；与监控内容点击数据有关 |
| `/service/monitor-list` | 监控服务记录 | 套餐/配额/服务记录相关表现 |
| `/service/automatic-monitor-list` | 自动监控服务记录 | 自动追踪/自动监控服务记录相关表现 |

从知识库口径看，短链和服务记录是内容监控的关联能力，不是内容监控主流程本体；但在前端页面和任务详情中，短链点击与监控结果存在直接关联。

## 3. 核心业务对象

| 对象 | 当前含义 |
| --- | --- |
| `monitor_project` | 内容监控项目，承载项目名称、负责人/协作者、媒体类型、创建时间、预算消耗、内容数、观看量、项目状态等 |
| `monitor_task` | 单条被监控内容，承载平台、链接、发布时间、监控时长、互动数据、预算/成本输入、状态、来源、标签、备注等 |
| `manual_monitor_input` | 手动添加监控内容的输入暂存项，可批量输入链接并逐条配置 |
| `auto_track_rule` | 自动追踪规则，以项目为作用域，按创作者、关键词、短链等条件自动发现并生成监控任务 |
| `dashboard_metric` | 项目或列表 dashboard 指标，包括内容量、观看/互动、预算/成本衍生指标、进度、趋势等 |
| `short_link` | Nox 短链对象，用于点击追踪，并在监控详情中展示点击来源/分布 |
| `comment_insight` | 评论洞察展示对象，当前主要表现为情感分析和高频词区域 |

## 4. 页面现状

### 4.1 项目列表

`/video-monitor/list` 目前以项目卡片为主。卡片信息包括项目名称、负责人或创建者、协作者、创建时间、预算消耗、帖子/内容数、观看量、媒体类型和项目状态。页面提供创建项目、批量编辑、进入项目详情等入口。

前端文档对应 `kol-next/pages/video-monitor/list.vue`，主要组件包括 `monitorTab.vue`、`projectItem.vue`、分页组件、编辑弹窗、删除弹窗和导出弹窗。接口集中在 `@/api/videoMonitor/list` 与 `@/api/auth/limit`。

线上交叉验证：项目列表可见顶部 `项目 / 监控列表` 切换；项目卡片展示项目名、负责人、协作者数、创建日期、预算消耗、发布数、观看量、媒体类型和状态。当前账号下至少可见 3 个项目卡片。

### 4.2 项目详情工作台

`/video-monitor/monitor?id=...` 是当前内容监控最核心的工作台。页面包含项目头部信息、添加监控入口、来源筛选、日期筛选、地区筛选、平台 Tab、dashboard、监控内容列表、趋势图、自定义数据和详情抽屉。

前端文档对应 `kol-next/pages/video-monitor/monitor.vue`。主要组件包括 `monitorDetailDrawer.vue`、`platformTab`、`dashboard`、`viewTab`、`monitorViewCard/table`、`addMonitorDrawer`、`autoTrack`、`exportDialog`、`trendLine`、`dateRangeSelect`、`areaSelectToggle`。

线上交叉验证：项目详情页可见项目名称、项目备注、负责人、协作者、创建日期、`添加监控` 入口、状态筛选、多个条件筛选、排序、来源筛选、日期范围、平台 Tab、搜索框、dashboard、自定义数据、监控内容列表和监控内容趋势。实勘项目的 dashboard 指标包括观看量、点赞数、评论数、分享数、互动率、Nox 短链点击数、预算消耗、CPM、CTR。

### 4.3 全局监控列表

`/video-monitor/monitor-list` 面向跨项目查看。它保留 dashboard、筛选、表格、批量操作和详情抽屉，适合统一排查监控状态、来源和异常。

表格字段覆盖内容/平台、观看、点赞、评论、分享、收藏、点击、互动率、监控进度、预估视频价值、预算消耗、CPM、CPV、状态、地区、内容类型、标签、额外标签、备注、负责人、创作者、监控时长、发布时间和来源。

前端文档对应 `kol-next/pages/video-monitor/monitor-list.vue`。文档中特别标注搜索框需要与项目详情页 `filter-header` 对齐，说明当前两个列表入口存在复用与一致性要求。

线上交叉验证：全局监控列表可见 `项目 / 监控列表` 切换、dashboard、平台 Tab、表格和分页。表格列与前端文档基本一致，并在线上明确展示 `来源` 列；实勘样本中来源值为 `自动追踪`。进度以 `已监控天数/总天数 + 百分比` 展示，例如 `19/60天 31%`。

### 4.4 新建监控抽屉

760 后的新建监控入口把“监控已发布内容”和“自动追踪新内容”放在同一抽屉中处理。

手动添加侧重链接录入、批量校验、暂存列表、逐条配置监控时长/成本/地区/标签/短链/备注。自动追踪侧重规则名称、创作者选择、关键词、短链条件、保存规则和历史规则列表。

线上交叉验证：新建监控抽屉标题为 `新建监控任务`，包含 `监控已发布内容` 与 `自动追踪新内容` 两个 Tab。手动添加区包含 `手动添加 / 批量添加` 切换，字段包括发布链接、监控时长、预计花费、监控地区、视频标签、Nox link、视频备注；右侧为待监控列表；底部显示关联自动营销计划、剩余配额、本次消耗、取消和开始监控。

自动追踪 Tab 包含规则名、监控频道、手动添加/批量添加网红、Nox 短链、监控词、保存按钮和历史追踪规则列表。线上提示文案明确写到：保存后系统持续监控频道动态，发现符合关键词的新内容会自动创建监控任务；自动追踪仅生效 7 天，7 天内网红未发布任何内容需重新添加。

对应前端组件包括：

- `components/videoMonitor/monitor/addAndAutoTrack/addMonitorList.vue`
- `components/videoMonitor/monitor/addAndAutoTrack/autoTrackForm.vue`
- `components/videoMonitor/monitor/addAndAutoTrack/autoTrackList.vue`

### 4.5 任务详情抽屉

任务详情抽屉用于查看单条监控内容。当前承载基础信息、项目/负责人/监控时长/链接、标签、短链、备注、数据概览、趋势、Nox 短链点击分布、评论情感分析和评论高频词。

评论相关区域已经存在，但从知识库与历史实勘口径看，当前更像“分析展示入口”，不应直接推断为完整评论抓取与分析能力已经稳定成熟。

线上交叉验证：点击监控内容卡片可打开任务详情抽屉。抽屉可见内容标题、描述、创作者、发布时间、所属项目、负责人、监控时长、合作视频/贴文链接、视频标签、额外标签、Nox 短链、视频备注、数据总览、自定义数据、视频/贴文数据趋势、Nox 短链点击数据分布、评论情感分析、评论高频词。实勘样本中短链点击分布、评论情感分析和评论高频词均为 `暂无数据`。

## 5. 已确认的关键规则

### 5.0 预算/成本数据

预算、预计花费、预算消耗等成本类数据不是平台采集数据，而是用户在创建或维护监控任务时手动填写的输入数据。

默认状态是未填写。若用户未填写预算/预计花费，相关成本指标不应被理解为真实采集结果。

CPM、CPV 等效率指标依赖预算/成本输入和观看等采集数据共同计算；CTR 依赖短链点击等配置/采集条件。讨论 dashboard 或报告时，需要把这类指标与观看、点赞、评论、分享等平台采集指标区分开。

### 5.1 手动添加

手动添加支持批量输入、批量校验和暂存列表。批量校验允许部分成功：成功项进入待添加列表，失败项保留错误原因，用户可继续修正。

待添加列表中的每条内容可单独配置监控天数、成本、地区、标签、短链和备注。配置存在“继承公共配置、手动覆盖、锁定、恢复同步”的设计口径，用来避免公共配置变更误伤已单独调整的行。

### 5.2 自动追踪

自动追踪规则以项目为作用域。规则可配置名称、创作者、监控词、短链条件，并有历史规则列表。规则列表展示规则名称、监控创作者、监控词和状态；状态区域提供编辑、暂停/继续、删除等入口。

已知规则约束：

- 单个项目内最多 10 条启用中的自动追踪规则。
- 规则唯一性以项目、创作者和关键词组合为核心，知识库摘要中记录为 `(project_id, channel_id, keyword_hash)`。
- 自动追踪生成的任务带来源标识，便于与手动添加区分。
- 自动生成的新任务支持未读标记。
- 线上文案显示自动追踪仅生效 7 天；若 7 天内网红未发布任何内容，需要重新添加。

### 5.3 来源与状态

监控任务存在 `MANUAL` 与 `AUTO` 两类来源。列表和详情需要保留来源可解释性，否则自动追踪生成的内容会难以追溯。

监控状态不仅是“监控中/已结束”这类终态，还涉及进度、续期、异常、爆发或停滞等运行中表现。续期规则在 760 文档中记录为：

```text
MAX(now, original_end_time) + renewal_days
```

### 5.4 Twitter/X 适配

v7.6.0 的内容监控 2.0 明确纳入 Twitter/X 支持。链接识别覆盖 `twitter.com` 与 `x.com`。指标映射中，views 对应 impressions/阅读量，share 对应 retweet，并补充 bookmarks 等平台特有指标。

文本推文、线程、投票、引用推文等内容形态需要专门展示处理；这意味着 Twitter/X 不是简单复用视频卡片即可完整覆盖。

## 6. 前端实现定位

### 6.1 页面文件

| 文件 | 作用 |
| --- | --- |
| `kol-next/pages/video-monitor/list.vue` | 项目列表页 |
| `kol-next/pages/video-monitor/monitor.vue` | 单项目详情工作台 |
| `kol-next/pages/video-monitor/monitor-list.vue` | 全局监控任务列表 |

### 6.2 关键组件

| 组件 | 作用 |
| --- | --- |
| `monitorDetailDrawer.vue` | 单条任务详情抽屉 |
| `addMonitorDrawer` | 添加监控总入口 |
| `addMonitorList.vue` | 手动添加后的待添加列表 |
| `autoTrackForm.vue` | 自动追踪规则新增/编辑表单 |
| `autoTrackList.vue` | 自动追踪历史规则列表 |
| `dashboard` | 项目或列表指标摘要 |
| `monitorViewCard/table` | 内容卡片/表格视图 |
| `trendLine` | 趋势图 |

### 6.3 主要 API

前端 API 集中在 `kol-next/api/videoMonitor/list.js`。主要接口族包括：

- 项目：`queryProjectList`、`saveVideoProject`、`batchSaveVideoProject`、`queryProjectSummary`
- 任务列表：`task/queryList`、`tasksStatus`
- 项目图表：`queryProjectDataChart`
- 新增任务：`task/saveTask`、`task/batchSaveTask`、`task/batchCheckTask`
- 报告：`generateMonitorReport`、`task/generateTaskReport`
- 任务详情：`task/queryTaskById`、`task/queryTaskTimeDataTrend`、`task/queryTaskTimeDataTrendPage`
- 评论分析：`queryTaskWordFrequency`、`queryTaskAggregateEmotion`
- 自动追踪：`rule/list`、`rule/listSimple`、`rule/pauseMonitor`、`restoreMonitor`、`updateInfluencer`、`rule/delete`

## 7. 对 pre-input 讨论有用的事实边界

以下是后续讨论可以依赖的事实，不是 761 方案：

- 当前产品已经有项目级 dashboard 和单条任务详情抽屉，因此“更详细分析报告”需要先澄清是增强站内详情、项目看板，还是新增导出/分享型报告。
- 当前评论情感和高频词已经有展示位和接口痕迹，但“更多评论抓取”还不能直接等同于“已有完整评论数据能力，只差 UI”。
- 自动追踪已经是独立规则对象，不只是新增监控的一个开关；任何列表、dashboard、报告讨论都需要保留来源和规则贡献的解释。
- 全局列表与项目详情列表共享大量字段与组件，一致性问题会影响筛选、字段命名、状态表达和批量操作。
- Twitter/X 已进入内容监控范围，但内容形态和指标语义与视频平台不同，不能默认用 YouTube/TikTok/Instagram 的视频监控模型完全覆盖。

## 8. 仍需谨慎确认的盲区

- 当前线上账号下各入口的权限、配额、套餐提示是否与知识库和前端实现一致。
- 评论抓取的真实数据量、刷新频率、覆盖平台、失败态和套餐限制。
- 报告生成接口当前在线上的可用范围、触发限制、生成耗时、导出格式和失败态。
- 自动追踪规则暂停、继续、编辑后，对已生成任务和新任务的影响边界。
- 短链点击数据与监控任务、项目 dashboard、报告之间的汇总口径。
- 线上实勘 `/video-monitor/monitor-list` 时浏览器控制台出现 `Cannot read properties of null (reading 'uid')`，但页面主体仍加载出列表。该错误需要后续结合前端代码定位，不在本文中推断影响范围。
