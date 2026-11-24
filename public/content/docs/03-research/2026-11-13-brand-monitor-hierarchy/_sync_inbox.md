# 品牌监控关联品牌视图 · Sync Inbox

> 正式回流入口｜创建：2026-11-13｜当前阶段：v7.5.4 Input v2 范围基线，Demo 评审。

## 2026-11-23 · 子视图查询与对比分开评审

- [查询方案](../../02-project-documents/brand_monitor_portfolio/query_scheme_review_v0.md)建议沿用池内快照，补充组内同时满足、组间任选的查询规则。平台字段可用性和全量读取需要独立核验。
- [对比盘点和展示规则](../../02-project-documents/brand_monitor_portfolio/comparison_rules_review_v0.md)以 Anker 的四个线上报告 Tab 及静态代码为依据，提出概览常驻、相关模块按需展示、资产下钻。现网点验覆盖界面结构，数据版本和指标口径另行核验。
- 当前为两项评审输入。现行 Demo v0.7 继续作为既有交互参考。

## 2026-11-23 · Demo v0.7 对齐品牌概览指标与示意范围

- 核对线上 Anker 品牌概览和前端 master `a00cc966b` 的 overview 组件。现有概览包含核心 KPI、合作网红概览、内容和互动分析、符合条件时展示的商品数据、推广活动趋势及互动分析。核心 KPI 包含「总内容数」「总网红数」，观看量已有趋势展示。[Anker 标准报告](https://cn.noxinfluencer.com/brand/brand-analysis?pkId=17220&from=brand_search&word=anker)
- Demo 页首「提及视频数」「相关频道数」示意总内容和网红规模，本轮显示名称对齐为「总内容数」「总网红数」。观看量仍在页首示意展示。「平台内容分布」「标准报告板块」原为 Demo 示意卡，已从主品牌和子视图的品牌概览移出。
- 新增评审聚焦子视图同批对比、两项覆盖率、未覆盖数及下钻。标准报告沿用线上模块。[Design](../../02-project-documents/brand_monitor_portfolio/design_v0.md#3-子视图对比与下钻)
- 源码和本地评审副本均通过六个浏览器场景。已核对现有指标名称、主子概览的占位移除，以及原有对比分母与下钻。

## 2026-11-23 · Demo v0.6 收起同批统计范围横条

- 用户澄清要收起的是表格上方的「同批主品牌基准」横条。日期、平台、数据截至时间及批次移到标题旁的问号。表内保留主品牌基准数据行，表下恢复分项重叠说明。
- 已同步 [Design](../../02-project-documents/brand_monitor_portfolio/design_v0.md) 和 [R01 评审步骤](../../02-project-documents/brand_monitor_portfolio/demo_review_contract_v0.md#2-逐点核对)。
- 源码与本地评审副本均通过六个浏览器场景，已核对横条默认收起、提示展开时表格位置保持一致，以及基准数据行与表下说明仍可见。

## 2026-11-23 · Demo v0.5 收起对比指标口径说明

- 根据用户反馈，移除对比表下方常显的解释文案，将同批分母、分项重叠和未覆盖数的定义放入「子视图对比」标题旁的问号提示。提示默认收起，表下保留未覆盖指标。规则沿用当前 Spec。
- 已同步 [Design](../../02-project-documents/brand_monitor_portfolio/design_v0.md) 和 [R01 评审步骤](../../02-project-documents/brand_monitor_portfolio/demo_review_contract_v0.md#2-逐点核对)。
- Demo 源码和本地评审副本均通过六个离线浏览器场景。核对提示默认收起，展开不会移动表格，支持点击、触屏、键盘和 Esc，390 像素窄屏下内容完整可见。

## 2026-11-23 · Demo v0.4 对比设置集中到子视图管理

- 从主品牌页首打开「子视图管理」，在抽屉内的「对比设置」配置成员、调整临时日期和平台、切换显示分项或统一刷新。刷新任务及结果状态在抽屉中呈现。只读用户可调整自己的临时范围和分项显示，保存成员和刷新须有管理权限。
- 报告对比区展示绝对日期、平台、数据截至及批次、同批基准及分项指标、未覆盖内容、口径提示和下钻入口。未覆盖内容仍按已配置成员的命中并集计算，临时隐藏只影响展示。
- 影响 S01、R01、R02、L01。已回写 [Input v2](../../02-project-documents/brand_monitor_portfolio/input_v2.md)、[Input v0](../../02-project-documents/brand_monitor_portfolio/input_v0.md)、[Spec](../../02-project-documents/brand_monitor_portfolio/spec_v0.md)、[Design](../../02-project-documents/brand_monitor_portfolio/design_v0.md) 和 [评审约定](../../02-project-documents/brand_monitor_portfolio/demo_review_contract_v0.md)。
- 源码与本地评审副本的六个离线浏览器场景均通过，验证 390、768、1024、1440 像素视口。已核对报告无对比设置控件及刷新状态，加入「新品体验内容」后分母仍为 100、未覆盖为 8，日期与平台沿同批传到明细。刷新失败时报告保留旧批次，抽屉显示提示；只读用户仍可调整日期和显示分项。

## 2026-11-23 · Demo v0.3 统一子视图与对比配置

- 来源为用户在 Explore 对照后的反馈。子视图采用同一定义，子品牌、主题、活动等用途通过名称和可选的自定义视图标签标识。视图标签用于展示，内容标签参与查询匹配。
- 主品牌的「子视图对比」可由管理者配置成员。同品牌下已启用且有成功同批快照的子视图均可选。配置保存于 Demo 会话，使用当前批次计算。停用从候选和配置中即时移除，重新启用并成功发布后可再次选择。
- 主池分母沿用同批同范围基准，未覆盖内容按已配置视图的命中并集去重。「显示分项」只影响当次阅读。配置为空时提示先选择。对比配置随主报告使用，另存聚合报告留待后续。
- 影响 Q01、S01、R01、R02、L01、F01。已回写 [Input v2](../../02-project-documents/brand_monitor_portfolio/input_v2.md)、[Input v0](../../02-project-documents/brand_monitor_portfolio/input_v0.md)、[Spec](../../02-project-documents/brand_monitor_portfolio/spec_v0.md)、[Design](../../02-project-documents/brand_monitor_portfolio/design_v0.md) 和 [评审约定](../../02-project-documents/brand_monitor_portfolio/demo_review_contract_v0.md)。
- 源码与本地评审副本的六个离线浏览器场景均通过。加入「新品体验内容」后，分母仍为 100，未覆盖数从 10 变成 8。切换报告标签或暂时隐藏该行后仍为 8。新增视图发布后可被选择，包括零命中结果。已回归停用恢复、标签编辑失败保留旧标签、空配置及导出对比成员。

## 2026-11-23 · Demo v0.2 对照 Meltwater Explore 系列

用户要求核对当时的 Demo 与 Meltwater 的对应关系。标准 Explore 可对应查询预览、保存、并列比较和查看内容。Explore+ 的私有索引、Optimized Search 与 Custom Fields 对应先收录后分类的思路。公开资料尚未证实原生主子品牌对象、子品牌类型参与未归入计算、或跨报告冻结同批数据及下钻。保留 v0.2 时点的调研补证。[Meltwater 对照记录](deep_dive_2026-11-17/meltwater.md#2026-11-23-补充--对照聚星-demo-v02)

## 2026-11-23 · Demo v0.2 子视图管理与视图类型

- 来源为用户复看 Demo 后的反馈。影响评审点为 Q01、R01、R02、L01，涉及管理入口、对象定义、对比分项和类型的生效时点。
- 子视图管理移至主品牌页首全局入口，以右侧抽屉承载。品牌概览保留分析对比。关闭抽屉后保留报告标签、筛选与阅读位置。
- 创建对象统一为「子视图」，类型先设「子品牌」「查询视图」。两种类型共用池内查询和快照。本轮 Demo 按已发布类型决定对比成员和未归入数，仅子品牌参与；编辑类型与新快照一同发布。真实历史数据的迁移和完整类型表待生产接入时评审。
- 已回写 [Input v2](../../02-project-documents/brand_monitor_portfolio/input_v2.md)、[非正式 Input](../../02-project-documents/brand_monitor_portfolio/input_v0.md)、[Spec](../../02-project-documents/brand_monitor_portfolio/spec_v0.md)、[Design](../../02-project-documents/brand_monitor_portfolio/design_v0.md) 和 [评审约定](../../02-project-documents/brand_monitor_portfolio/demo_review_contract_v0.md)。[打开管理抽屉](../../../demos/brand-monitor-portfolio-754/index.html#manage)
- 回归通过。源码和本地评审副本均在 390、768、1024、1440 像素的离线浏览器里通过六个评审场景。验证了从营销资产开关抽屉后保留标签和筛选，管理任务留在抽屉，以及命中全池的查询视图仍保留原未归入数。把该视图改为子品牌，失败时沿用旧类型，成功重试后才进入对比并调整未归入数。旧批次仍保留当时生效的类型。

## 2026-11-23 · 独立 Demo 评审基线

- 本轮评审使用 [Input v0](../../02-project-documents/brand_monitor_portfolio/input_v0.md)、[Spec v0](../../02-project-documents/brand_monitor_portfolio/spec_v0.md)、[Design v0](../../02-project-documents/brand_monitor_portfolio/design_v0.md) 和 [独立 Demo](../../../demos/brand-monitor-portfolio-754/index.html#review)。现行范围以 [Input v2](../../02-project-documents/brand_monitor_portfolio/input_v2.md) 为准。方案和样例仍处于非正式评审阶段。
- 评审点为 Q01 查询和预览、S01 快照和对比、R01 主报告、R02 子报告、L01 生命周期和权限、F01 反馈。详见 [评审与文档回流约定](../../02-project-documents/brand_monitor_portfolio/demo_review_contract_v0.md)。
- 处理新反馈时，在此追加评审点、Demo 版本、来源、身份和场景、复现步骤、实际和预期、结论、影响的文件、修订状态及回归证据。范围回写 Input，计算及任务规则回写 Spec，入口及状态表达回写 Design。评审行为变化同时更新 Demo、评审约定及对应验收路径。正式文档组合在评审收口后整理。
- 本条建立评审基线。后续逐条记录用户意见及处理结果。

### 首轮复核

| 评审点 | 核对结果 |
|---|---|
| Q01 | 纳入 `trail` 并排除 `home` 时预览、生成及子报均为 35 条。真实零条可以发布，平台字段不可用时给出原因。 |
| S01 / R01 | 分别核对主报告的 106 条和同批对比基准的 100 条。隐藏分项后，未归入数仍为 10。人为模拟失败和数据不完整均保留旧批次，成功后基准及分项一起更新。 |
| R02 / L01 | 下钻绑定批次、日期和平台，返回恢复对比位置。核对旧链接、过期、首次失败、更新失败、重试、停用重启，以及只读和撤权状态。 |
| F01 | 查验六个直接入口、会话内保留意见和 JSON 导出，导出内容包含评审点、版本、场景、身份及批次。 |

浏览器用离线 `file://` 验证，排查了横向溢出和运行异常。首轮复核补齐了预览的平台提示、取数不完整提示、下钻返回定位，以及频道明细去重。生产待核事项为主池全量读取、各平台字段与快照物化能力、标准板块依赖及准确的权限接入方式。详见 [Spec v0](../../02-project-documents/brand_monitor_portfolio/spec_v0.md)。

## 当前任务覆盖（2026-11-17用户补充）

聚焦主子品牌关系维护、总体/分项计算与展示，比较候选而不选型。定制视图服务这条主线。当前[候选讨论稿](decision/主子品牌关系与计算展示_候选形式比较_v1.md)不构成正式Input/Spec/Design；新增服务端证据仅为静态核对，未作环境验证。

## 当前覆盖

- 属于品牌监控；与品牌舆情雷达及舆情二期独立。
- 现行范围为主品牌物理数据源、统一的池内子视图及同池对比配置。跨主池及混合聚合留待后续。[Input v2](../../02-project-documents/brand_monitor_portfolio/input_v2.md)
- 子视图采用快照。主品牌沿用线上标准报告并增加对比，子视图报告以标准板块为基础。下方保留前期确认过程及历史资料。[Input 讨论稿](../../02-project-documents/brand_monitor_portfolio/子品牌查询与快照讨论_v0.md)
- 已整理并完成一轮独立 review 的[一期建议方案](../../02-project-documents/brand_monitor_portfolio/子品牌视图一期建议方案_v1.md)。默认做法、建议必交与延期项记录在方案中，仍待 Input 评审确认。
- 2026-11-19 用户确认主品牌作为全量数据池，子品牌以池内查询视图呈现。现有独立报告的包含性只作现状参考。见[确认口径](decision/自顶向下与自底向上_竞品对应.md#已确认的自顶向下需求口径)。
- 用户进一步确认主视图和子视图可跨主品牌组合成新的视图，主视图、子视图和组合视图同层使用。见[组合范围](decision/自顶向下与自底向上_竞品对应.md#已确认的组合视图与同层使用)。
- 用户明确主视图只能对应主品牌全量数据池，不能由子视图组合定义。
- 用户于 2026-11-19 确认版本为 v7.5.4「主子品牌视图化查询」。[Input v1](../../02-project-documents/brand_monitor_portfolio/input_v1.md)已整理，组合运算和二次组合待定。
- 2026-11-20 用户补充 NIKKE 地区报告场景。没有主品牌数据池时，多个独立报告可直接组合，已纳入 Input。见 [NIKKE 线上样本](decision/自顶向下与自底向上_竞品对应.md#线上样本-nikke-按运营范围独立报告)。
- 本轮确认目标与证据进入调研文件，不能据竞品结论自动扩展实施范围。

## 待处理增量

暂无待处理的 Demo 评审意见。后续新增客户样例、产品口径、代码事实与实测差异时按日期追加，注明来源与影响。

## 2026-11-17 · 研究追加：四家界面与操作

用户要求继续深入Lefty、Sprinklr、Emplifi并补看Meltwater。本轮42卡与视觉证据记录在[独立目录](deep_dive_2026-11-17/README.md)，公开导览/共享报告不等同编辑端实测。当前没有实现回流，也不据此推进Spec/Design；后续若进入Input，先吸收本轮保存对象、筛选传播和证据断点。
