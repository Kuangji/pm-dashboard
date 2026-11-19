# Meltwater：搜索组织、总分分析与定制看板深挖

观察日期：2026-11-17（Asia/Shanghai）。本轮只研究品牌监控的数据组织/报告交互；未注册、未联系销售、未创建真实搜索或对外分享。没有使用共享浏览器。本轮使用实时检索、直接读取官方教程/API、审看官方截图及视频公开storyboard，**不是已登录产品实测，也不是完整视频播放**。

## 先给结论

Meltwater呈现出四层分工：**先保存各品牌/业务单元的查询，再决定“组合成一个数据集”或“并列比较”，最后在Analyze配置持续复用的报告**。分类导航与统计聚合是两件事；Explore+的嵌套Folder也不能直接叫作主子品牌数据模型。

本轮真正看到的界面证据包括：Actions里的Combine/Compare双入口、Comparisons页签、Save as及新搜索命名、Analyze右侧Inputs/Filters配置与Share入口。另审看了2026官方视频storyboard中的模板创建、编辑与分享界面序列。没有看到厂商自动识别品牌家族、父品牌自动汇总所有子品牌、或跨品牌内容/creator去重合同。

## 1. 分类、组合、比较分开处理

| 用户动作 | 官方对象/入口 | 看到了什么 | 能证明的边界 |
|---|---|---|---|
| 找到相关search | Explore Labels | 官方正文说明按brand/topic/campaign分类；旧Google图没成功打开 | 组织查询，不保证自动统计总量（M205） |
| 多search组成新结果 | Create combined search | Actions菜单独立一项；API有any/all/not | 是组合query；不是品牌父子关系（M201、M202） |
| 各search并列分析 | Create comparison / Comparisons | 独立tab与新增按钮；2026更新有日期/类别分段及merge/separate | 分项对照，不能推断互斥贡献（M201、M203） |
| 管理复杂资产层级 | Explore+ Folder | API有parent与folder_id；没有看到本轮真实UI | 仅Explore+搜索文件夹层级（M206） |
| 长期定制报告 | Analyze dashboard | 模板、inputs、组件、配置侧栏、分享 | 报告画布与输入组合（M208、M209、M211） |

[2024官方入口更新](https://community.meltwater.com/singapore-community-106/weekly-product-highlight-new-improved-explore-homepage-2563)中的两张图已实际审看：

- [Comparisons页签与新增按钮](https://uploads-us-west-2.insided.com/meltwater-en/attachment/c2ef02c3-1735-4b05-8282-841d69ef471b.png)：顶部Searches、Comparisons、Filter sets、Author lists、Custom categories并列，新增comparison是明确动作。
- [Actions双入口](https://uploads-us-west-2.insided.com/meltwater-en/attachment/fa5d1521-fd7c-4a9e-8e86-83d78b817a52.png)：combined search描述为连接保存搜索获取新结果；comparison描述为比较多个search结果。**截图中的10个上限属于该历史界面，不当作所有当前套餐合同。**

2026年8月[官方更新摘要](https://www.meltwater.com/en/product-updates/page/3)确认Compare继续演进：支持类别/日期分段、时间对齐、Absolute与Trend Growth、merge/separate；Keyword Rank特别注明Explore+。新详情页web读取403，故新控件具体位置未验证（M203）。

## 2. “总量”与“分项”如何同时留下

2026-10-30[官方入门教程](https://www.meltwater.com/en/blog/media-monitoring-searches-to-set-up-first)的明确建议是：只看总体对话量可以把brand放进同一个search；若需逐公司清晰报告，应分别保存search（M204）。

其[Compare示意图](https://images.prismic.io/meltwater-refresh/oC-amGyRBZcTHPx1_SL-Explore.png)已审看：左上多个品牌chip，左侧SOV与分色柱状图，右侧Filtered Mentions和search selector。**这是经过设计的官方产品示意图**，不能据图认定点击后筛选如何继承。

技术旁证来自[Listening官方API教程](https://developer.meltwater.com/guides/listening/managing-searches/)：Combined是可保存的query，可引用search、filter set、custom category，以any/all/not表达包含、相交、排除（M202）。因此能够形成“总查询＋独立分查询”的组织方式；这只是机制解释，**不是聚星应采用的确定方案**。

尚未证实：组合结果的内容去重粒度、跨平台creator统一身份、重叠brand提及的分摊、总计能否等于各项相加。对Meltwater本身也不能写成已支持或已不支持。

## 3. Filters是否随下游保留

必须分三种状态，而不是统一叫“继承”：

1. **当前session的临时filter**：2026[Explore FAQ](https://community.meltwater.com/meltwater-product-answers-428/meltwater-explore-10974)说不会改变saved query；Filter Set则保存常用组合以便跨search复用（M207）。
2. **保存过的filtered search**：2024[用户问题＋官方员工答复](https://community.meltwater.com/meltwater-launch-125/best-ways-to-pull-data-in-meltwater-2762)展示Save as，把custom category一并保存，再作为dashboard input（M208）。
3. **report/widget本身的过滤**：Analyze有配置入口；本轮没完成“dashboard全局→tab→widget→内容drawer”逐层传播验证。API文档还要求更新saved search时保留filter_set；这证明需维护过滤状态，不证明任意UI天然继承（M202）。

已实际审看三张历史官方截图：

- [Save as下拉](https://uploads-us-west-2.insided.com/meltwater-en/attachment/5abae2cb-6a5e-418e-8468-0a1ae83bd8d4.png)：Explore导航、当前search、Save下拉及结果列表。
- [另命名搜索](https://uploads-us-west-2.insided.com/meltwater-en/attachment/45e6b165-3844-4e4b-919c-46cb1b5ae35b.png)：Custom categories(1)仍在过滤栏；保存为Education / Academia + Environment。
- [Analyze Inputs](https://uploads-us-west-2.insided.com/meltwater-en/attachment/b842d54a-08aa-40f6-97a8-01e53d6ec42f.png)：右侧Update settings分Inputs/Filters两页；Inputs勾选原search和filtered search，左侧SOV by Engagement为99%/1%。

最后一张尤其要谨慎：**原集合与过滤后的子集会重叠**；图表能显示二者，并不能证明它给出“互斥主子品牌贡献”。官方答复的例子适合观察配置方式，不能直接照搬其统计含义。

## 4. 定制Analyze dashboard创建、编辑、共享

[官方Reporting Playbook](https://community.meltwater.com/use-case-playbooks-132/reporting-sharing-insights-playbook-2949)将Analyze定位为持续报告，可配置layout、widgets、filters和不同受众视图（M212）。Academy公开课程目录也涵盖模板、custom dashboard、过滤、添加Explore insights、分享与管理，但**本轮只读到课程目录，没进入注册课程**。

下面是实际审看过公开storyboard的官方操作视频，不冒称已完整观看：

| 视频 | 资产日期依据 | 已看到的界面序列 | 限制 |
|---|---|---|---|
| [模板创建](https://fast.wistia.net/embed/iframe/dw44dloxpo) | Wistia media createdAt：2026-09-11 | Analyze入口→模板库→选择search inputs→生成多组件报告 | 缩略帧小字不作为按钮逐字证据；不是空白自定义报告全流程（M209） |
| [编辑Analyze](https://fast.wistia.net/embed/iframe/vj1xtsgxzn) | 2026-01-29 | 编辑画布、添加组件、图片/文本区域、右侧输入/设置面板 | 未验证保存后影响哪些共享视图（M209） |
| [分享Analyze](https://fast.wistia.net/embed/iframe/sq862hko89) | 2026-01-29 | 右上Share→侧栏设置→共享/导出界面 | 未生成真实链接（M211） |

原始storyboard图片直链：[创建](https://embed-ssl.wistia.com/deliveries/38d4738fb5fae91a45be0ee005594646c6cd27e9.bin)、[编辑](https://embed-ssl.wistia.com/deliveries/dd39e08753e535cce68da8e01ce0a2afec29b8bc.bin)、[分享](https://embed-ssl.wistia.com/deliveries/de0538774838ecad1b191b557e02f489665da4a9.bin)。每张是200帧缩略图拼图，只用于确认操作序列和页面结构；没有逐帧听音频或获得完整点击事件。

2026-08-12更新的[官方共享帮助](https://community.meltwater.com/meltwater-product-answers-428/how-do-i-share-a-dashboard-3531)另行确认：需在View模式使用Share；链接可设密码、更新频率和到期时间；定时PDF/PPT的接收者须有seat；多tab需逐tab导出。[View/Edit/Share入口截图](https://uploads-us-west-2.insided.com/meltwater-en/attachment/6941e716-406b-4d5d-b3c2-67a973f4afb2.png)已看，正文支持具体选项（M211）。

## 5. 从图表回到内容证据

[官方Explore分析视频](https://fast.wistia.net/embed/iframe/8sq1zg3ct4)公开storyboard已审看：左侧content stream与右侧指标、趋势、词云并列，后段有右侧内容列表叠层；[storyboard直链](https://embed-ssl.wistia.com/deliveries/bcb1edc9a51c01ad3bad7f24a64f0afb5215c206.bin)（M210）。

这能确认“分析视图与内容证据相邻、可进入更多内容”的界面模式。**精确到哪种data point可点击、点击后是否保留brand/date/source/region全部条件，目前仍缺实际交互验证。** 不借用Reputation Intelligence的专属分类/指标规则来填补品牌监控的合同。

## 6. Explore与Explore+不能混写

- **标准Explore本轮证据**：saved search、Labels、Combined、Compare、Filter Set以及导出/分享路径。
- **Explore+本轮强证据**：[官方资产API](https://developer.meltwater.com/guides/explore-plus/managing-searches/)明确Folder可嵌套、parent指父Folder、search.folder_id指归档位置，并区分account/workspace层。仅文档，未见界面；父Folder不自动变成母品牌总量（M206）。
- **跨两者仍有差异**：2026年8月Compare更新把Keyword Rank特别标作Explore+；2026年9月统一内容流更新仍指出自然语言AI排序仅Explore可用。它们共享一些界面语言不等于能力完全相同。

## 7. 新入口与仍未完成的部分

已直接阅读2026-10-27[年末更新集合](https://community.meltwater.com/year-end-release-2026-449/explore-explore-2026-year-end-release-updates-resources-12590)，日期早于观察日；其中[Adaptive Analytics公开Navattic](https://meltwater.navattic.com/rh6u057m?g=cmvkrx4y5002n02l78d31fyyx&s=0)被标为Early Access Beta相关tour。本子任务web只能拿到无正文页面，未运行tour；主任务可另外接续浏览器证据。

[官方Playbook聚合页](https://community.meltwater.com/p/use-case-playbooks)还出现Atrium Hospitality企业品牌及75+酒店的客户工作流，强调企业、单店和竞品分别建一致结构的query；但该动态页本段无明确发布日期，**source_date=null，不用它断言2026-11-17前已上线的新产品能力**。

读取失败已保留边界：新版Analyze创建/编辑部分社区文章403；旧Google托管compare图404；若无图则保持文档证据，不补造。下一步最值得实际点验的是“同一视频提到两个子品牌时总计与分项的变化”“Compare merge/separate”“过滤传播与保存后共享一致性”。

## 可交付证据

本轮12张卡见[evidence/meltwater_cards.jsonl](evidence/meltwater_cards.jsonl)，M201–M212。全部观察日期2026-11-17；已知来源日期均不晚于观察日，未知保持null；source_date若来自Wistia资产创建时间已明确说明。未改首轮文件，也未把本轮研究晋升为聚星Spec/Design。

## 主任务追加：导览与公开共享报告

主研究者已走完Adaptive Analytics 10步公开导览，并从官方Playbook公开入口实际打开共享报告，点击View all后成功加载Related Mentions明细。两者分别记录为UIM201与UIM202，详见[browser_walkthrough.md](browser_walkthrough.md)。共享例子属于口碑/竞品主题，只借组织与阅读机制，不补证明品牌父子关系、集团去重或编辑保存。
