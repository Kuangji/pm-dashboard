# Sprinklr 深入核对：品牌集合、总分阅读与定制看板

观察日期：2026-11-17（Asia/Shanghai）。范围限定 **Benchmarking** 及明确适用于它的通用报表机制。没有登录、租户实测、注册或联系销售；没有把 Product Insights 接进 Benchmarking。证据卡见 [sprinklr_cards.jsonl](evidence/sprinklr_cards.jsonl)。

## 本轮得到什么

**已从官方图片看见品牌组筛选、多字段看板创建、Benchmarking详情模板选择与详情叠层。尚未看见Brand Group创建表单，也未取得“选集团组→去重总量→所有子品牌贡献”的完整演示。** 通用下钻GIF只作交互机制旁证。

本轮实际审看5张官方静态图和1段GIF的6个采样帧。图片通过web打开取得直链，再以HTTP读入临时目录并用图像查看工具审看；没有操纵共享浏览器。GIF抽帧用于观察，没有把抽帧称为亲自点击产品。多张样例含2023年日期，属于旧教程示意，不应冒充2026现网截图。页面更新时间以相对值显示且多次读取不一致，source_date保留null，不反算发布日期。

## 1. 关系集合：静态/动态与入口

[Brand Groups官方定义](https://www.sprinklr.com/help/articles/entities/what-are-brand-groups/645dae4fe66f2e36b4518f65)明确静态与custom properties驱动的动态集合，并支持同品牌多集合、dashboard/section/widget三级过滤（S202）。[All Settings导航](https://www.sprinklr.com/help/articles/all-settings-home/all-settings-overview-and-navigation-guide/696a0b3a3b90964a40774821)确认Brand Groups配置入口及Manage权限（S210）。

**未观察**：Create Brand Group按钮、静态成员选择弹窗、动态属性条件构造器、预览成员、保存反馈、成员更新频率、嵌套和循环规则。搜索creation/static/dynamic/custom properties未得到可信的品牌组创建教程；Account Group是另一对象，不拿它的表单补齐。

## 2. 从集合圈范围：实际可见UI

来源S201：[官方截图](https://prod2-sprcdn-assets.sprinklr.com/50400/3466366d-5651-4970-8b1f-993b0cc91c08-1298104377/AddFilter_BrandGroup.png)。

已看见：Add Filter弹层左栏将Brand、Brand Category、Brand Group并列；Brand Group右栏是可搜索的复选列表、已选数量与正负选择按钮；底部Cancel/Apply Filters，上层Save。组名被模糊，未出现父子缩进。

可复核路径：进入过滤器 → 选Brand Group → 勾选现有集合 → Apply Filters。**最后一次应用后的指标变化没有截图证据**；Save也不充分证明保存了独立可分享视图。

## 3. 总体与品牌分项：能确认到哪一步

[Compare Brand Performance](https://www.sprinklr.com/help/articles/standard-dashboards-in-benchmarking/compare-brand-performance-dashboard/645fa373e66f2e36b4519949/)正文描述品牌组过滤和Overview品牌scorecard（S208）；这是分品牌比较证据，未看见“一键总计/品牌分项”切换。

[指标表](https://www.sprinklr.com/help/articles/benchmarking-glossary/benchmarking-metrics-dimensions-glossary/64a2d6a66a5ef62e9faa12c4)明确Active Brands Count表示过滤后的组内活跃品牌数，且Brand/Brand Group可作维度（S207）。因此不能说“组完全没有聚合”；但品牌数量、互动总量、独立内容/达人是不同计算问题。任意指标的跨品牌去重仍未知。

供继续验证的配置假设：同一看板用组圈范围，一个组件显示总体指标，另一个以Brand为分组维度。**这是根据文档拼出的待验证配置，不是本轮已操作成功的产品流程。**

## 4. 创建并保存看板

S203：[创建教程](https://www.sprinklr.com/help/articles/custom-benchmarking-dashboards/create-and-access-custom-dashboards-in-benchmarking/646354958ea3c9635cf36750)、[已审看Create Dashboard图](https://prod2-sprcdn-assets.sprinklr.com/50400/62abb79e-01b2-4d6a-b351-2418d0e1a2b0-1608909902/CreateBenchmarkingDashboard.png)。

文档流程：Benchmarking Dashboards → Create Dashboard → 填表 → Create → Add Widget。截图能辨认Dashboard Name、Folder、Starter Dashboard、Tags、Purpose，样例从Compare Brand Performance起步。是否空白起步由字段表说明；唯一名称约束与创建后的成功态仅为正文证据。

S209：[克隆教程](https://www.sprinklr.com/help/articles/custom-benchmarking-dashboards/how-to-clone-and-export-benchmarking-dashboard/64a30e606a9546738ea4b4ec)另外给出Options → Clone → 改名 → Clone。该页图片未审看；克隆不等于维护品牌关系或生成历史快照。

## 5. 从一点进入定制详情：Benchmarking Explore Lens

S204：[专属教程](https://www.sprinklr.com/help/articles/advanced-concepts/explore-lens-in-benchmarking/64a69cf2564e3e25f8040adf)；下列三图均已审看。

| 官方图 | 实际看见 | 不能推出 |
|---|---|---|
| [Explore创建表单](https://prod2-sprcdn-assets.sprinklr.com/50400/96bab494-f63d-49e5-92fa-a74c2f605da5-769234245/ExploreLens_Create.png) | Name、Description、Dashboard选择，Create/Cancel | 建立了品牌层级关系 |
| [Message Drilldown菜单](https://prod2-sprcdn-assets.sprinklr.com/50400/3ed10b44-5926-416b-9477-8adb4237143c-822758753/DrillBy_Explore.png) | 查询框输入explore，列表提供多个已配置lens；底层为Chelsea FC内容 | 多品牌组到子品牌的节点展开 |
| [Explore Overlay](https://prod2-sprcdn-assets.sprinklr.com/50400/335b1dec-2241-41f4-aaca-aecec624c44b-1792482755/ExploreLens_Overlay.png) | 详情覆盖层、日期、品牌表格与互动趋势两个组件，背景看板仍在 | 图中单品牌总量能证明集团去重汇总 |

正文配置链是Settings → Explore → Create New Explore，指定一个dashboard作为详情模板。应用时点看板数据点，在Drill By选lens。**它把详情的阅读方式做成可复用模板**；不是默认固定的品牌业务树。

## 6. 通用Drill By：旁证与边界

S205：[通用教程](https://www.sprinklr.com/help/articles/drill-down/drill-down-on-a-widget/6466533930f12540268fb238)、[已抽帧审看的官方GIF](https://prod2-sprcdn-assets.sprinklr.com/50400/5d181547-b6ec-4640-8b89-633f6f0e2c15-1107934558/download.gif)、[未审看的第二GIF](https://prod2-sprcdn-assets.sprinklr.com/50400/f8768efe-5327-4d47-9463-a88e0f0f9e8a-1816285566/download_%281%29.gif)。

采样帧看见趋势点提示、Mentions Drilldown菜单、City选项、原趋势图保留的Drill By叠层和Add to Dashboard。样例使用mentions/sentiment，不能单凭它认定Benchmarking品牌组已完整跑通；Benchmarking适用性另由上一节的专属教程证实。正文明确外部看板不支持数据点下钻。

## 7. 保存下钻结果与过滤继承

S206：[Add to Custom Dashboard教程](https://www.sprinklr.com/help/articles/add-to-custom-dashboard/use-the-add-to-custom-dashboard-feature-in-reporting-widgets/646773058ea3c9635cf3736d)。**此页本轮反复打开超时**；11-13曾直接阅读，本轮官方搜索回显再次返回全文。未提取或审看它的图片，置信度降为medium，不算本轮新增视觉证据。

文档链：组件Options → Add to Custom Dashboard → 选目标看板/section或新建 → Add。其表格描述两组已列明条件：

| Edit Widget的Ignore all Dashboard Filters | 添加组件时Apply Dashboard Filters | 文档所述结果 |
|---|---|---|
| 未选 | 未选 | 保留源看板过滤，不使用目标过滤 |
| 已选 | 已选 | 使用目标看板过滤，不保留源过滤 |

字段表将后一项写为Apply Dashboard & Section Filters，条件表简写为Apply Dashboard Filters；这里保留文档差异。另两种组合、当前UI默认值及section层覆盖没有实测，不能补成完整真值表。复制/保存以后，必须显示或核对每个组件的实际范围。

## 8. 官方演示入口与可继续观察的路径

S211：[Demo Center](https://www.sprinklr.com/demo-center/)已打开。页面有Video Demos、专家演示和部分产品tour入口；本轮未取得已播放的Brand Group专题视频。“Watch a Demo”经web解析命中的是封面图，不把它称为已看视频。没有注册大学课程或申请演示。

若后续有现成可用账号，优先验证：

1. 在All Settings找到Brand Groups，分别创建静态组与属性规则组；记录字段、预览和新增品牌后的成员变化。
2. 把A/B放入同一组，在同一日期范围并置组总体与Brand分项，验证点击分项能否继续到内容，并用重叠内容检查计量。
3. 通过Lens和Add to Custom Dashboard分别保存详情，检查目标看板筛选变化时哪些组件跟随。
4. 用只能看A的身份打开组视图，检查成员列表、总量、外链和下钻是否一致。

这些仍是取证清单。现有证据支持研究“可复用集合圈范围＋组件化分析＋可复用详情模板”，不替聚星确定关系模型、看板复杂度或汇总算法。

