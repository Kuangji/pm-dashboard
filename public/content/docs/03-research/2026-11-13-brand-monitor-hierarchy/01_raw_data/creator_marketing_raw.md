# 红人营销产品：多品牌数据组织原始采集记录

采集日期：2026-11-13（Asia/Shanghai）。模式：自动，公开官网/官方帮助中心。未使用登录态，未对真实租户进行配置或操作；所有路径是文档复述。范围覆盖 CreatorIQ、Lefty、Traackr、Sprout Influencer Marketing（原 Tagger 所在产品线）。品牌舆情/情绪能力不纳入本组。

## 证据边界

- “多品牌总览”不自动等于可配置主子品牌实体树。
- “group/brand/region/division分层报表”不自动证明父子关系继承、任意深度、同品牌多归属、或历史归属快照。
- 本组没有查到四个产品公开的跨品牌内容/creator去重合同；未知不写成不支持。
- 以下是原始事实的中文转述。解释和待确认分别标注，英文只保留短引文；证据卡为 `../evidence/creator_cards.jsonl`。

## CreatorIQ

### 来源与采集

1. [Multi-Brand Organizations](https://www.creatoriq.com/intelligence-layer) — 官方产品页，CM01。
2. [Governance](https://www.creatoriq.com/influencer-marketing-solution/governance) — 官方产品页，CM02。
3. [MeasureIQ](https://www.creatoriq.com/influencer-marketing-solution/measureiq) — 官方产品页，CM03。

### 确认事实

- 产品对多品牌portfolio提供统一查看creator关系、成本及结果的承诺，各品牌保留独立标准（CM01）。
- 治理页面直接出现sub-brand structure，shared CRM/reporting/history覆盖子事业单位、子品牌和地区办公室（CM02）。
- MeasureIQ可从模板或空白报告起步，做pivots/filters，保存并共享给division或组织；提供按业务维度拆分的BI路径（CM03）。

### 可复核流程（官方说明，不是实测）

组织先按团队/职责/sub-brand结构组织工作与角色 → 在MeasureIQ模板/空白报告中配置维度和过滤 → 保存、共享给division/组织 → 分析campaign/creator/content细节。官网没有给出主品牌节点创建和挂接子品牌的具体按钮流程，不能补写。

### 初步标注

- 亮点：业务单位可独立治理，同时存在组织级统一分析定位。
- 待确认：到底是数据实体parent-child、division/team层级，还是自定义字段；跨品牌去重、品牌独立标准与集团指标的一致性。
- 证据判断：**有真实“子品牌组织治理”官方证据；没有可验证的“品牌实体树配置/汇总计算”合同。**

## Lefty

### 来源与采集

1. [For Executives](https://lefty.io/solutions/executives) — 官方产品页，CM04。
2. [For Brands](https://lefty.io/solutions/brands) — 官方产品页FAQ，CM05。
3. [Dashboard Reporting](https://lefty.io/features/influencer-reporting) — 官方产品页，CM06。

### 确认事实

- consolidated report提供group、region、market、brand层的program分析；KPI演进还出现division维度（CM04）。
- workspace按品牌、地区或部门建立独立工作流、标签及数据环境，再由有权限者通过monitoring dashboard查看一个或多个team（CM05）。
- 报告汇集brand/division/market表现，展示品牌合作内容；支持导出和无需登录的live dashboard link（CM06）。

### 可复核流程（官方说明，不是实测）

为品牌/地区/部门安排workspace → 各团队管理其数据与活动 → 有权限的组织用户查看跨team monitoring dashboard → 在统一报告查看brand/division/market表现和高表现内容 → 导出/分享live link。创建workspace的逐按钮流程及层级下钻控件未公开。

### 初步标注

- 亮点：四个产品中，与“各业务单元分开运作、管理者看总分数据”最直接对应的公开措辞。
- 待确认：group到brand是固定树还是分析维度；“跨team汇总”是否可以自由选择组合；同内容涉及多个品牌时如何计数；共享链接的访问边界。
- 证据判断：**明确多层业务分析与汇总；原生可配置主子品牌树未知。**

## Traackr

### 来源与采集

1. [Leveraging Data to Future-Proof Influencer Marketing](https://www.traackr.com/influencer-marketing-blog/leveraging-data-to-future-proof-influencer-marketing) — 官方博客/案例，CM07。
2. [Creator Marketing Performance Leaderboard FAQ](https://www.traackr.com/influencer-marketing-blog/leaderboard-faq) — 官方FAQ，CM08。

### 确认事实

- Data Lake提供细粒度数据导出和整合；官网案例叙述按region/competitor/division筛选，跨国家、品牌、品类聚合campaign spend（CM07）。
- Brand Leaderboard按独立brand比较；订阅benchmark支持历史趋势及下钻到各tier贡献红人（CM08）。

### 可复核流程（官方说明，不是实测）

品牌benchmark查看品牌及竞争者 → 回看趋势、下钻creator；另一条路径为Data Lake整合数据 → 按国家/品牌/品类/事业部门做分析。没有证据表明两条路径中的brand与division被维护为原生父子关系。

### 初步标注

- 亮点：用统一数据层与元数据切片支持跨品牌经营分析。
- 待确认：平台内建报表与接入外部BI的责任边界；指标与币种统一、metadata缺失时行为、品牌多归属。
- 证据判断：**证据支持平面benchmark和数据层聚合；不支持断言其有主子品牌树。**

## Sprout Influencer Marketing

### 来源与采集

1. [Create and use Workspaces](https://influencersupport.sproutsocial.com/hc/en-us/articles/38401834145549-Influencer-Marketing-How-do-I-create-and-use-Workspaces) — 官方帮助，CM09。
2. [Report Templates](https://influencersupport.sproutsocial.com/hc/en-us/articles/48676918025869-Report-Templates) — 官方帮助，CM10、CM11。
3. [Keyword Groups](https://influencersupport.sproutsocial.com/hc/en-us/articles/47536160651917-Utilizing-Keyword-Groups-in-Influencer-Marketing) — 官方帮助，CM12、CM13。
4. [Custom Reports Guide](https://influencersupport.sproutsocial.com/hc/en-us/articles/48743558488717-Influencer-Marketing-Custom-Reports-Guide) — 官方帮助，CM14。

### 确认事实

- 一个workspace关联一个Profile，品牌、地区或业务活动可以各自建立workspace。报告和campaign等按空间隔离（CM09）。
- 模板将多个词合并成单一dataset（Single Topic）或拆组比较（Industry Topic）；Product Line是在品牌提及之上增加产品关键词筛选（CM10、CM11）。
- Keyword Group在workspace中复用，可复制到其他workspace；修改、删除影响引用它的地方，可能影响历史报告（CM12、CM13）。
- 自定义报告可组合keywords/profiles/mentions；品牌自己发的内容与creator提及该品牌是两种数据集（CM14）。

### 可复核流程（官方说明，不是实测）

1. 左上当前workspace → Add a workspace → 命名并选brand Profile → Add。
2. Reports → New Report → 选Single Topic/Industry Topic/Product Line等模板。
3. Settings → Workspace → Keyword Groups → Add Keyword Group → 命名、填terms/handles和AND行 → Save。
4. 在报告组件/Parameters中引用组并配置日期、平台等过滤。
5. 需要跨空间时复制Keyword Group；未查明组织级一张报表自动合并所有workspace的流程。

### 初步标注

- 亮点：用同一检索素材创建“合”和“分”两种分析视图，有清楚的产品线过滤方式。
- 边界：workspace隔离负责数据组织；keyword groups负责检索语义；模板负责呈现。三者不能被混称为主子品牌实体关系。
- 待确认：重叠关键词组去重、workspace间报表汇总、查询组变更后的历史统计、是否有稳定的品牌实体映射。
- 证据判断：**公开证据更接近“独立workspace＋可复用检索组＋报告模板”，不是品牌父子树。**

## 缺口与反证循环

已追加搜索 parent/sub-brand/hierarchy、workspace、keyword groups、deduplicated，避免只看多品牌营销宣传。新增结果修正了“多品牌平台应都有树状模型”的初始直觉：Sprout帮助文档能直接解释为workspace和查询组；Traackr能解释为Data Lake多维分析。CreatorIQ明确支持sub-brand组织结构，Lefty明确业务层级报表，但均缺公开实体关系配置和总分去重规则。

后续若做官方演示取证，应要求同一个场景：集团G下A/B两个子品牌，A下产品线A1；同一视频同时提到A1和B，同一creator跨两个品牌合作；建立G总览，下钻A/A1，再跨切地区。现场查“总计是否按内容/creator去重、金额分摊、视图保存、权限、关系变更历史”。这是采集问题，不是聚星实现建议。

用户反馈缺口：本组没有找到足够具体、可归因到上述主子品牌机制的独立用户反馈，未用通用G2满意度或厂商案例成功率代替验证。
