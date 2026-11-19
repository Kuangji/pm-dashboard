# 社交分析产品的品牌组织机制：官方文档采集

采集日期：2026-11-13（Asia/Shanghai）。采集方式：实时搜索并打开官方帮助文档；未登录任一产品、未进行交互实测。本文描述文档声明的能力与操作路径，不为聚星选定实现。证据卡见 [social_cards.jsonl](../evidence/social_cards.jsonl)。

## 快速辨别

| 产品 | 已证实的组织机制 | 总—分表达 | 原生主品牌—子品牌关系 |
|---|---|---|---|
| Sprout Social | 重叠Groups、Profile Collections | Group整体汇总→profile逐项比较；另建总Group承接跨品牌集合 | 本轮未证实；跨Group analytics官方明确不可用 |
| Emplifi | Profile labels、内容标签、Saved views、widgets | label集合汇总/均值→多label对比或单profile与集合比较→内容明细 | 本轮未证实；Content label groups不等于profile label父子嵌套 |
| Hootsuite | Organization/team关联社媒账号、report与tile自定义来源 | 选多个team/accounts汇总或对比→特定指标/内容图型 | 本轮未证实；teams是组织/权限单位，不自动等于品牌关系 |

## 1. Sprout Social

### S1：Groups及跨Group边界（SA01、SA02）

来源：[How to create, manage and organize Groups and Social Profiles in Sprout Social?](https://support.sproutsocial.com/hc/en-us/articles/38267314140813-How-to-create-manage-and-organize-Groups-and-Social-Profiles-in-Sprout-Social)。官方帮助文档，已打开。

文档允许按品牌、客户、区域等建立Groups，同一profile能进入多个Group。其Global Brand＋各区域Group示例通过集合组织支持不同管理者。FAQ明确不支持cross-group analytics，建议再建包含所有目标profiles的Group。不存在“已有子Group自动汇总到父Group”的证据。移动profile要先加到新Group、再从旧Group移除；历史数据保留。查看需profile至少Read Only；同页创建权限有Manage Permissions/Manage Users称呼不一致，后续实测需核对。

### S2：Profile Collections（SA03、SA04）

来源：[How do I use Profile Collections and Profile Collection filters?](https://support.sproutsocial.com/hc/en-us/articles/27162013981581-How-do-I-use-Profile-Collections-and-Profile-Collection-filters)。官方帮助文档，已打开。

Collection是profiles批量选择器，可用于Reporting，补充Groups。需Advanced+及管理权限。用户只能看到已授权profiles。报表已选collection的成员不会随集合编辑自动刷新，须取消后重选；同页automation rules则自动跟随成员变化。两者不能混写，也不能据collection存在就认定跨Group报表限制已经取消。

### S3：整体与单账号对比（SA05）

来源：[How do I use the Profile Performance Report?](https://support.sproutsocial.com/hc/en-us/articles/213223226-How-do-I-use-the-Profile-Performance-Report)。官方帮助文档，已打开。

同一报告的Overview呈汇总指标，Profiles呈逐账号比较；Filter Menu控制纳入哪些profiles。不同社媒的指标可用性存在差异；数据时间口径包含所选期间发生的activity，不限于期间发布的新内容。本页未给多品牌共同内容、同一达人或跨平台受众的去重规则。

### S4：定制报告的Group边界（SA06）

来源：[My Reports](https://support.sproutsocial.com/hc/en-us/articles/24821431669773-My-Reports)。官方帮助文档，已打开。

My Reports可配置widgets、过滤、可视化和聚合，需Premium Analytics；创建/编辑需Account Owner或Manage Custom Reports。报表仅在创建它的Group可见，复制不会跨Group开放。单widget能设置独立日期，与其他跟随report日期的widget并存。

### 文档证实的流程

1. Settings → Groups & Social Profiles → Create a group；选择现有profiles或连接新profile，配置访问后保存。
2. 为总览另建“总Group”，把需要汇总的profiles加入；原有子品牌Group继续存在。此为官方workaround，不是实际父子绑定。
3. 在总Group打开Profile Performance Report，用Overview看汇总、Profiles看账号对比；需要的细节由filter选择。
4. Reports → My Reports创建特定管理者的报表，维护widgets/filter/date；Group范围不会因为定制而自动扩大。

### 边界及待核

- Group能否嵌套、是否存在其他Enterprise专属品牌树：本轮未证实，不写“不支持”。
- Cross-group analytics在当前文档明确不可用，与产品是否存在其他模块/API能力分开。
- 同profile多Group不多占profile限额，不能等同数据去重规则已获证实。
- 删除Group会影响其设置及仅属于该Group的profiles，不能把它当普通无副作用收藏夹。

## 2. Emplifi

### E1：标签定义（SA07）

来源：[Set Up Labels](https://docs.emplifi.io/platform/latest/home/how-to-set-up-labels)。官方帮助文档，已打开；搜索缓存存在旧UI描述，本文采用打开页当前的列表＋面板说明。

Profile labels关联profiles，Content labels关联内容，Content label groups组织content labels。可见性和编辑权限可配置。没有证据表明profile label支持父子嵌套；不能把content标签组误写成品牌关系模型。

### E2：集合之间及单体对集合（SA08）

来源：[Compare Profile Labels](https://docs.emplifi.io/platform/latest/home/compare-profile-labels)。官方帮助文档，已打开。

支持Profile vs. profile label和Profile label multicomparison：前者图表显示均值，后者可切均值/总量。文档明确用于自有brands/divisions，也可对public profiles benchmark。其粒度仍是“profile或profile集合”，未证明品牌业务实体树；total不能直接解释为去重受众。

### E3：保存定制范围（SA09）

来源：[Managing Saved Views](https://docs.emplifi.io/platform/latest/home/managing-saved-views)。官方帮助文档，已打开。

Saved views按board保存数据源、filters、aggregations、时间框架；可私有、全账户可见或分享指定用户/teams，旧治理模型为user groups。可见与编辑权限分开。官方还存在旧Create a Saved View页面，本文优先使用包含Teams/legacy双治理说明的管理页。

### E4：“全局筛选”并非全部widget同步（SA10）

来源：[Filter and Aggregate Data in Unified Analytics Boards](https://docs.emplifi.io/platform/latest/home/filter-and-aggregate-data-in-unified-analytics-boa)。官方帮助文档，已打开。

筛选只作用post-level widgets；profile-level widgets保持不变。只有部分boards支持筛选和时间聚合；选项随board、profiles、平台改变。因此不能把统一工具栏理解为所有数字都采用同一筛选口径。

### E5：widget配置和内容下钻（SA11、SA12）

来源：[Analyze Your Campaign with the Flexible Content Widget](https://docs.emplifi.io/platform/latest/home/customize-content-analysis-with-flexible-widget)、[Drill Into Interactive Widgets](https://docs.emplifi.io/platform/latest/home/drill-into-interactive-widgets)。两篇官方帮助文档，均已打开。

Flexible widget选一个或多个profiles/profile labels/content labels，另设filter、日期、breakdown、图型。互动图表可从bar/segment进入Content Hub查看对应内容，继承原board排序与aggregation。不是所有widget都具备同样下钻能力。

### E6：profile表格组织（SA13）

来源：[Create a Profiles Summary](https://docs.emplifi.io/platform/latest/home/create-a-profiles-summary)。官方帮助文档，已打开。

把owned/public或两类profiles放进同一KPI表，支持时间、排序、保存和定时报送。该表提供“分项概览”，不是品牌层级树。

### 文档证实的流程

1. Settings → Labels → Profile labels：创建并分配profiles，配置可见性。
2. Unified Analytics相应board选择profile labels；在Profile label multicomparison比多个集合、切换total/average，或在Profile vs. profile label对比单profile与集合。
3. 设置数据源、filters、时间和aggregation → Save as view；按管理者配置private/global/指定用户或teams可见。
4. 对支持互动的widget，hover具体bar/segment → View associated content → Content Hub查看贡献内容。
5. 需要跨渠道内容分析时，在Dashboard → Add → Widget → Flexible widget中配置来源、breakdown与图型。

### 边界及待核

- 本轮证实集合总量/均值和内容下钻，未证实品牌层级递归汇总、品牌实体的自动归属。
- Profile labels能否嵌套、相同profile在多个labels中如何去重：公开已读文档未明确。
- 聚合必须按指标和模块核实。时间aggregation不是主子品牌roll-up。
- 本文不把Listening的query去重规则迁移到Social profiles数据。

## 3. Hootsuite

### H1：报告与team范围（SA14）

来源：[Create a report in Analytics](https://help.hootsuite.com/s/article/create-analytics-report)。官方帮助文档，已打开，正文更新2026-06-19。

Analytics从模板或Custom report创建；可在organization列表选择一个或多个teams，自动选入关联social accounts。Custom report从metric library选指标。说明的是组织和账号集合，不是主品牌/子品牌实体。能力受套餐约束。

### H2：tile可以覆盖report范围（SA15）

来源：[Customize metric tile data](https://help.hootsuite.com/s/article/customize-metric-data)。官方帮助文档，已打开，正文更新2026-10-26。

Tile可选accounts、tags、campaigns、post types，展示汇总或对比。配置数据源/filters后出现橙点；该tile不再随report-level filters/sources变化，Reset data可恢复。统一看板允许混合scope，但必须识别覆盖状态。

### H3：共享权限（SA16）

来源：[Share an Analytics report](https://help.hootsuite.com/s/article/share-analytics-report)。官方帮助文档，已打开，正文更新2026-09-21。

同组织同team成员可获Read/Edit；Edit包含修改、分享及删除，修改实时反映给各访问者。向平台外共享另受套餐及流程约束，未实测。不应把报告访问授权推导为底层社媒数据授权已被绕过。

### H4：聚合与细项图型（SA17）

来源：[Explore ways to visualize your data](https://help.hootsuite.com/s/article/explore-visualizations)。官方帮助文档，已打开。

Number呈聚合值，Line/Area看时间，Table可看指定账号的内容指标。多值Pie/Number呈前三大值和other，List可看other明细。部分趋势点能查看某时刻详情；这不等于从集团钻至子品牌的业务层级。

### 文档证实的流程

1. Analytics → Create a report，选择模板或Custom report。
2. 若自定义，选metric library、network和metrics；在organization列表选择teams来圈定账号范围。
3. Configure tile → Data选来源/filters → Apply；Properties选图型。
4. tile出现橙点时，它采用自身数据配置；要跟随report则Reset data。
5. Share with teammates → 选择同team成员并赋Read/Edit。

### 边界及待核

- 本轮未证实品牌层级对象、team嵌套或父品牌自动继承子品牌账号。
- 相同内容、创作者、受众跨账号去重未获证据；aggregated numeric value不能等同unique reach。
- Hootsuite帮助页面头部有Salesforce反馈组件报错，但正文可读且已完整获取；没有因此声称产品页面失败。
- 未登录产品；未把文档截图当成实测截图。

## 4. 本轮证据适用范围

可确认：集合、比较、可保存范围、内容下钻和权限边界都存在成熟公开做法；同一产品不同对象/模块的行为不同。

不可确认：这三个产品是否都有或都没有原生品牌树、其Enterprise定制交付范围、同内容跨子品牌的计数规则，以及真实集团客户的维护成本。未知保留未知；本轮不据未检出推导“行业空白”。
