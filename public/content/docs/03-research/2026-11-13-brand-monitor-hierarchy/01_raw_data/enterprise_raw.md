# 企业级数据组织：Brandwatch / Sprinklr / Meltwater

采集日期：2026-11-13（Asia/Shanghai）。本轮研究的是数据组织和分析视图，不研究情绪、舆情预警等能力。所有结论为公开官方文档核对，**未登录产品实测，也未调用真实付费 API**。查询组、品牌组、产品层级、文件夹四类对象不能互相替代。

## 证据索引

### EN01 — Brandwatch Consumer Research / Query Groups

- 来源：[Query Groups](https://developers.brandwatch.com/docs/query-groups)
- 类型：官方 API 文档；置信度：高；访问：2026-11-13。
- 事实转述：Query Group 是用户定义的 Queries 与 Channels 集合，用于分析集合内结果的聚合；Query Group 存在项目中，可作为明细过滤和图表数据源。
- 偏差/新鲜度：旧定义页长期未更新；另以近12个月更新的 Retrieving Query Groups 交叉核对。
- 未知边界：未证实嵌套组、原生品牌父子关系或跨查询同一内容的去重算法。

### EN02 — Brandwatch Consumer Research / Categories

- 来源：[Categories](https://developers.brandwatch.com/docs/categories)
- 类型：官方 API 文档；置信度：高；访问：2026-11-13。
- 事实转述：Category 是施加于 Mention 的用户定义元数据；支持 Category→Subcategory 层级，父分类至少有一个子分类。
- 偏差/新鲜度：官方定义，业务可用性仍需登录验证。
- 未知边界：这是内容分类层级，不等于品牌实体层级；未证实任意深度。

### EN03 — Brandwatch Consumer Research / Chart aggregates and dimensions

- 来源：[Chart aggregates and dimensions](https://developers.brandwatch.com/docs/chart-dimensions-and-aggregates)
- 类型：官方 API 文档；置信度：高；访问：2026-11-13。
- 事实转述：图表维度提供 queries、queryGroups、categories、parentCategories、mixedCategories；后者允许比较不同父分类下的子分类。
- 偏差/新鲜度：官方接口定义，未实调。
- 未知边界：维度存在不证明默认UI有品牌树或父节点自动汇总。

### EN04 — Brandwatch Consumer Research / Consumer Research features

- 来源：[Consumer Research features](https://www.brandwatch.com/products/consumer-research/features/)
- 类型：官方产品页；置信度：中；访问：2026-11-13。
- 事实转述：Rules 可将历史与未来数据分入业务分类；Dashboard 可从空白或模板建立并组合 Components。
- 偏差/新鲜度：营销页面能力陈述，未以登录产品验证。
- 未知边界：历史数据重分类不等于品牌组织变更有版本快照；权限、去重和指标汇总细则未知。

### EN05 — Sprinklr Benchmarking / What are Brand Groups?

- 来源：[What are Brand Groups?](https://www.sprinklr.com/help/articles/entities/what-are-brand-groups/645dae4fe66f2e36b4518f65)
- 类型：官方帮助文档；置信度：高；访问：2026-11-13。
- 事实转述：Brand Groups 是命名品牌集合，可用于 dashboard/section/widget 过滤；同一品牌可进入多个组，品牌数无上限；支持静态组与以 custom properties 驱动的动态组。
- 偏差/新鲜度：官方行为定义，未登录实测。
- 未知边界：未证实组可嵌套；多归属是品牌→多个集合，不是多父品牌关系；过滤组不证明组总量去重。

### EN06 — Sprinklr Benchmarking / Permissions required for Benchmarking

- 来源：[Permissions required for Benchmarking](https://www.sprinklr.com/help/articles/permissions-required-for-benchmarking-module/permissions-required-for-benchmarking/63e3961355780d70a15bda22)
- 类型：官方帮助文档；置信度：高；访问：2026-11-13。
- 事实转述：Dashboard、Brands、Brand Groups 的访问和修改由用户权限管理；Dashboard Share 可面向 Global、Workspace、User/User Group，Brand Group 有独立 Manage 权限。
- 偏差/新鲜度：官方权限说明，未做越权实测。
- 未知边界：不据此推断品牌组成员的行级权限、父子继承和聚合值防泄漏行为。

### EN07 — Sprinklr Product Insights / Product Insights mentions in Engagement Dashboard

- 来源：[Product Insights mentions in Engagement Dashboard](https://www.sprinklr.com/help/articles/advanced-concepts/product-insights-mentions-in-engagement-dashboard/64605e38e66f2e36b4519ae5)
- 类型：官方帮助文档；置信度：高；访问：2026-11-13。
- 事实转述：产品消息流的配置字段包括 Product（可多选）、Product Hierarchy、Product Hierarchy Paths 与 Custom Properties。
- 偏差/新鲜度：另一SKU/模块的文档，不能平移为Benchmarking能力。
- 未知边界：明确有产品层级路径，但未证实品牌-子品牌实体树、层数、节点聚合去重和事业群映射。

### EN08 — Sprinklr Reporting / Benchmarking / Use the Add to Custom Dashboard feature in reporting widgets

- 来源：[Use the Add to Custom Dashboard feature in reporting widgets](https://www.sprinklr.com/help/articles/add-to-custom-dashboard/use-the-add-to-custom-dashboard-feature-in-reporting-widgets/646773058ea3c9635cf3736d)
- 类型：官方帮助文档；置信度：高；访问：2026-11-13。
- 事实转述：可将标准或自定义看板组件加入另一自定义看板，并可将 Drill By 下钻所得保存为组件；复制时需处理源/目标看板过滤条件，且要求看板已共享给用户。
- 偏差/新鲜度：官方表格描述过滤条件组合，未实测所有组合。
- 未知边界：保存一个下钻结果不是品牌数据关系的建立；错误的过滤继承会改变组件口径。

### EN09 — Sprinklr Benchmarking / Standard dashboards in Benchmarking

- 来源：[Standard dashboards in Benchmarking](https://www.sprinklr.com/help/articles/benchmarking-dashboards/standard-dashboards-in-benchmarking/645dd1dfe66f2e36b4518f90)
- 类型：官方帮助文档；置信度：高；访问：2026-11-13。
- 事实转述：标准看板提供品牌概览及频道粉丝/互动明细；可加看板级过滤，但标准看板组件不可单独编辑过滤，需克隆为自定义看板。
- 偏差/新鲜度：官方流程，未登录实测。
- 未知边界：品牌概览是品牌跨账号/频道概览，不能当作集团对多个子品牌汇总的直接证明。

### EN10 — Meltwater Explore / Saved Searches / Managing Saved Searches

- 来源：[Managing Saved Searches](https://developer.meltwater.com/docs/meltwater-api/guides/manage-searches/)
- 类型：官方 API 文档；置信度：高；访问：2026-11-13。
- 事实转述：combined 查询用 any_searches/all_searches/not_searches 组合已保存搜索；展开类型后还可引用 FILTER_SET、CUSTOM_CATEGORY。
- 偏差/新鲜度：文档含迁移提醒，旧v3与Explore+新文档均保留combined，不能混同端点。
- 未知边界：逻辑结果集合不是品牌父子实体；未核实嵌套combined、循环限制、同文跨子搜索去重及影响历史的细则。

### EN11 — Meltwater Explore+ / Managing Searches

- 来源：[Managing Searches](https://developer.meltwater.com/guides/explore-plus/managing-searches/)
- 类型：官方 API 文档；置信度：高；访问：2026-11-13。
- 事实转述：搜索文件夹可以嵌套，响应 parent 字段表达文件夹关系；search 另有 folder_id；workspace_id 区分账号级与指定工作区资产。
- 偏差/新鲜度：Explore+ 独立文档；不把它自动归到Explore旧UI。
- 未知边界：嵌套文件夹只证明导航/资产组织，不证明打开文件夹即汇总所有搜索。

### EN12 — Meltwater Explore / Meltwater Explore — How to Use Explore

- 来源：[Meltwater Explore — How to Use Explore](https://community.meltwater.com/meltwater-product-answers-428/meltwater-explore-10974)
- 类型：官方员工帮助文章；置信度：中高；访问：2026-11-13。
- 事实转述：已保存搜索可供 Dashboard 复用，Filter Set 可复用过滤；结果可通过带可选密码的Shareable Dashboard外发；编辑搜索会改变以后关联告警/看板结果。
- 偏差/新鲜度：2026年官方员工文章，标为Answer Engine Optimization；授权计划仍需核对。
- 未知边界：未确认自定义看板全部组件及下钻行为，也未确认改品牌关系后的历史快照；不能用未来更新说明推断历史一定重算。

### EN13 — Meltwater Explore / Weekly Product Highlight: New & Improved Explore Homepage!

- 来源：[Weekly Product Highlight: New & Improved Explore Homepage!](https://community.meltwater.com/australia-community-73/weekly-product-highlight-new-improved-explore-homepage-2556)
- 类型：官方员工发布记录；置信度：中；访问：2026-11-13。
- 事实转述：2024官方界面更新说明将 Compare 与 Combine 明确分成两类操作：Comparisons tab可建对比，查询页Actions可建组合或对比。
- 偏差/新鲜度：2024年分批发布，当前入口只作历史佐证；2026官方Explore文章仍提到Combined/Compare。
- 未知边界：不保证2026所有租户按钮位置一致。

## 按产品记录的已证实操作链

### Brandwatch Consumer Research

用户任务：把关联主题搜索纳入一个分析范围，再按业务分类分解。

1. Query/Channel 是数据采集对象；在 Project 内将相关 Query 组织成 Query Group（EN01；另见 [Retrieving Query Groups](https://developers.brandwatch.com/docs/retrieving-query-groups)）。
2. Query Group ID 能作为明细过滤条件或图表输入。API返回组的queries与共享项，未出现嵌套组结构；这不等于产品一定禁止嵌套（EN01）。
3. 对 Mention 应用父分类与子分类，借规则处理历史和未来内容；图表可按父分类、子分类或跨父分类子项拆分（EN02–EN04）。
4. 用空白/模板看板与多个图表组织分析（EN04）。

可观察完成态：组层面结果分析＋分类层面拆分。**文档未证明是“点击主品牌→所有子品牌自动汇总→原路返回”的原生树状流程**。聚合后的同文去重、互斥/多选分类配置效果、品牌自身直接提及与子品牌提及的合并口径均待实测。

补充数据结构证据：[Retrieving Categories](https://developers.brandwatch.com/docs/retrieving-categories) 示例含 children、multiple、queryIds，可按分类ID过滤/拆分Mention。multiple字段仅作结构观察，本轮不据它推断具体多归属行为。

### Sprinklr Benchmarking + Product Insights

用户任务A：复用某个品牌组合，避免每张报表重复选品牌。

1. Benchmarking以Brand为分析对象；将Brand放入具名Brand Group。组可静态选取，也可按Custom Properties形成动态成员（EN05）。
2. 在Dashboard/Section/Widget层应用Brand Group过滤（EN05）。官方特意举“大企业按业务领域把品牌置于不同名称下”的场景；这是本轮最贴近事业群视角的直接文字证据。
3. 标准看板用概览和频道明细做品牌表现分析；想改标准组件过滤要克隆成自定义看板（EN09）。
4. 下钻图表后，可把所得分析保存至自定义看板。复制组件时检查源/目标过滤条件继承（EN08）。
5. Dashboard/Brand/Brand Group访问由角色权限控制；共享维度不等于品牌节点权限自动继承（EN06）。

用户任务B：按产品层级筛消息。

1. Engagement Dashboards → Add Column → Listening → Product Insights。
2. 配置Product(s)、Product Hierarchy和Product Hierarchy Paths，另按自定义属性等收窄。
3. 创建列后显示符合条件的消息流（EN07）。

**边界**：A是品牌集合，B是真实存在的产品层级路径，但二者属于不同模块，不能拼接成已证实的同一棵“集团→事业群→品牌→产品线”树。Brand Group明确支持同品牌多组归属，未证明组嵌套或多父品牌。组过滤后可按品牌比较，不等于能对任意指标生成正确去重的组合总量。

### Meltwater Explore / Explore+

用户任务：保留每条业务搜索，同时做总范围组合与横向比较。

1. 保存各品牌/业务搜索；Saved Search可被看板复用，Filter Set是可复用的过滤条件（EN10、EN12）。
2. Combined Search用any/all/not组合搜索，API也支持引用过滤集、自定义类别。这里合成的是一个可执行查询（EN10）。
3. Compare是另一个明确的分析操作。2024官方UI更新将Compare与Combine分开叙述，2026帮助文仍分别列出（EN12、EN13）。不能把对比图的总和当作Combined结果。
4. Explore+可把搜索放入嵌套文件夹，parent用于文件夹关系；导航文件夹和查询合并互相独立（EN11）。
5. Explore结果可生成外部分享看板，可选密码；编辑已有搜索会影响后续关联的Dashboard/Alert结果（EN12）。

**边界**：并集语义本身不充分证明所有展示指标都按内容ID去重；没有取得真实含重叠数据的样例。文件夹嵌套不代表文件夹有数据聚合能力；Explore+与Explore不能直接合并为同一租户可用范围。

## 交叉核对与缺口回查

| 检验问题 | 本轮回查结果 | 可用结论 |
|---|---|---|
| 品牌组是否仅账号分组的误称？ | Sprinklr官方把Brand Group定义为Brand集合；另有Account Group，属于不同实体 | 可确认有品牌级组合对象，但未确认品牌实体父子 |
| 组是否支持多归属？ | Sprinklr Brand Groups明确同品牌可进多个组 | 多对多集合已证实，嵌套和所有权关系未知 |
| 真层级是否只是一种图表？ | Brandwatch Category→Subcategory和Sprinklr Product Hierarchy Paths有文档与结构字段 | 确有分类/产品路径；不能升格为集团品牌树 |
| 文件夹是否天然汇总？ | Meltwater Explore+文件夹文档描述资产组织；combined另有查询类型 | 导航树与数据组合必须分开描述 |
| 总体与明细能否持久化？ | Sprinklr支持Drill By后保存组件，Brandwatch支持组过滤与分类维度 | 有分析闭环素材，但未登录验证端到端主子品牌体验 |
| 同一内容命中两个子品牌如何算？ | 本轮搜索未得可靠的组总量跨品牌去重说明；Meltwater旧帮助页搜摘提到“相似/精确”显示分组，但打开重定向总目录 | 未知，不能用显示折叠规则替代聚合去重规则 |
| 组织变更后历史如何处理？ | Brandwatch Rules声称可处理历史与未来分类；Meltwater只明确编辑搜索影响未来结果 | 分类回算与品牌关系历史快照是两个问题，后者未知 |

## 访问失败与未采纳材料

- Meltwater旧帮助站多条URL（包括常见问题/搜索性能最佳实践）搜索结果仍有正文，但本轮打开跳转到community知识库首页；不把这些搜摘单独用于强结论。
- 新community的“Getting started with dashboards in Analyze”本轮打开返回403，未补写该页面的组件数、下钻和权限行为。
- Sprinklr帮助站搜索结果被垃圾查询页污染，未引用带异常query参数的搜索结果页；实际采用可直接打开的官方单篇文章。
- Brandwatch Query Groups定义页显示约7年前更新，使用近12个月更新的Retrieving Query Groups/API维度文档交叉验证存在性，不声称当前UI与旧页完全一致。

## 本分支结论的使用边界

可以确认三种实现素材：**搜索集合与分类层、品牌多归属集合与可保存分析、搜索逻辑组合与独立导航文件夹**。本分支没有获得可证明上述三家都原生支持完整“主品牌-子品牌-事业群-产品线”业务树的证据。上述未知不代表不支持。仅供后续矩阵和问题清单，不是聚星方案决策。

