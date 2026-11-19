# 功能对比矩阵

2026-11-13；采用文字范围而非勾叉评分。**“未知”不等于“不支持”；营销页宣称不等于租户实测。** 10家厂商、11个产品/分析单元，Sprinklr Product Insights仅作旁证。

## 关系和数据范围

| 产品 | 数据/组织对象 | 关系机制与边界 | 证据 |
|---|---|---|---|
| Lefty | 品牌/地区/部门workspaces；跨团队monitoring dashboard | 组织级多业务维度；原生品牌树未知 | [CM04](../evidence/README.md#cm04)、[CM05](../evidence/README.md#cm05) |
| CreatorIQ | 团队/sub-brand治理；portfolio报告；MeasureIQ | 明确子品牌组织结构；品牌实体树配置未知 | [CM01](../evidence/README.md#cm01)、[CM02](../evidence/README.md#cm02) |
| Traackr | brand benchmark；Data Lake多维整合 | 品牌比较/国家品牌品类切片；树未知 | [CM07](../evidence/README.md#cm07)、[CM08](../evidence/README.md#cm08) |
| Sprout Influencer Marketing | workspace；keyword groups；report datasets | 工作区隔离＋查询语义；Product Line是过滤层 | [CM09](../evidence/README.md#cm09)、[CM10](../evidence/README.md#cm10) |
| Sprout Social | Groups；Profile Collections；Profile Performance | 同profile多Group；跨Group analytics明确不可用 | [SA01](../evidence/README.md#sa01)、[SA02](../evidence/README.md#sa02) |
| Emplifi | profile labels；content labels；saved views | 账号集合可表示brands/divisions；品牌树未知 | [SA07](../evidence/README.md#sa07)、[SA08](../evidence/README.md#sa08) |
| Hootsuite Analytics | organization/teams/accounts；report/tile | 团队账号集合＋报表配置；品牌树未知 | [SA14](../evidence/README.md#sa14)、[SA15](../evidence/README.md#sa15) |
| Rival IQ | Landscape；Company Sets；Custom Dashboard | 平面集合＋可复用子集；company可多标签 | [RI01](../evidence/README.md#ri01)、[RI02](../evidence/README.md#ri02) |
| Brandwatch Consumer Research | Queries/Channels；Query Groups；Category/Subcategory | 查询集合＋Mention层级分类；非品牌实体树 | [EN01](../evidence/README.md#en01)、[EN02](../evidence/README.md#en02) |
| Sprinklr Benchmarking | Brand；静态/动态Brand Group；Dashboard | 同brand可多group；组嵌套未知 | [EN05](../evidence/README.md#en05)、[EN06](../evidence/README.md#en06) |
| Meltwater Explore / Explore+ | Saved Search；Combined Search；Filter Set；Explore+文件夹 | 逻辑查询组合；嵌套folder为独立导航组织 | [EN10](../evidence/README.md#en10)、[EN11](../evidence/README.md#en11) |

## 总—分与定制视图

| 产品 | 总体 | 分项/下钻 | 保存/共享 | 主要限制 |
|---|---|---|---|---|
| [Lefty](../03_teardown/lefty_teardown.md) | 官方宣称group/division/brand/market统一报告 | 品牌/市场表现与合作内容；逐节点下钻控件未知 | 报告导出、live link；自定义范围保存细则未知 | 营销页证据；跨品牌内容/creator去重未知 |
| [CreatorIQ](../03_teardown/creatoriq_teardown.md) | portfolio跨品牌可见性；计算合同未知 | 按campaign/creator/region等维度切分 | 模板/空白报告，保存与division/组织共享 | 产品页证据；各品牌衡量标准可能不同 |
| [Traackr](../03_teardown/traackr_teardown.md) | 案例宣称跨国家/品牌/品类聚合campaign spend | benchmark从brand到creator tiers与贡献红人 | Data Lake数据导出与外部整合；平台内保存细则未知 | 数据集成与内建UI边界；币种/去重未知 |
| [Sprout Influencer Marketing](../03_teardown/sprout_influencer_teardown.md) | Single Topic合并多关键词dataset | Industry Topic分组比较；品牌/产品词过滤 | workspace内复用Keyword Group，可复制到其他workspace | 复制不等于共享；删除组可影响历史报告；去重未知 |
| [Sprout Social](../03_teardown/sprout_social_teardown.md) | 另建含全部目标profiles的总Group作为workaround | Overview汇总；Profiles逐账号比较 | My Reports受创建Group限制；Collections可批量选取 | 集合变更后已选report filter需重选；报表权限受Group约束 |
| [Emplifi](../03_teardown/emplifi_teardown.md) | 多label比较可切total/average | profile或label对比；部分widget进入Content Hub | 按board保存source/filter/aggregation/time及可见范围 | profile vs label图表为均值；board过滤只影响post级widget |
| [Hootsuite Analytics](../03_teardown/hootsuite_teardown.md) | tile可展示aggregated数据 | comparative图型与内容指标；非品牌层级下钻证据 | 模板/自定义report，Read/Edit共享 | 自定义tile脱离report filters/sources；橙点提示 |
| [Rival IQ](../03_teardown/rival_iq_teardown.md) | 集合汇总行按指标total/average；旧文档 | Company Profile/部分行到关联帖子；集合行下钻未知 | Custom Dashboard；集合自动保存；报表导出/定期发送 | Focus Company范围例外；指标权重不同；旧功能需现行确认 |
| [Brandwatch Consumer Research](../03_teardown/brandwatch_teardown.md) | Query Group作为聚合分析范围 | categories/parentCategories/mixedCategories维度 | 空白/模板Dashboard与Components；共享边界未详核 | 同文跨Query去重未知；历史重分类不等于关系版本快照 |
| [Sprinklr Benchmarking](../03_teardown/sprinklr_teardown.md) | 组可在dashboard/section/widget过滤；去重总量合同未知 | 品牌/频道分析；Drill By可保存到自定义看板 | 可共享/克隆Dashboard；Brand Group独立管理权限 | Product Insights层级属于另一模块；过滤继承需核对 |
| [Meltwater Explore / Explore+](../03_teardown/meltwater_teardown.md) | any/all/not组合已保存搜索 | Compare独立于Combine；全链路下钻未验 | 复用查询/filters及分享Dashboard；Explore+有workspace范围 | 并集不等于已验证全部指标去重；Explore/Explore+不混写 |

## 聚星列

本轮未检查聚星代码/接口/真实页面，不给“支持/缺失”评分。当前只确认用户目标和主线历史事项；现有能力列待后续核验后补入。

## 三类象限

- **聚集：本轮多个产品反复出现的素材。** 可复用数据范围、按业务维度分项、报告保存/分享；这说明组织手段有参考价值，不证明各产品能力完全一致，也不能直接叫聚星必选范围。证据CM03、CM05、SA09、EN05、EN10。
- **分化：需要后续按任务比较的决策点。** 组织工作区、品牌多归属集合、账号标签集合、逻辑搜索、内容分类、组件自由范围；各自适用对象不同。证据CM09、SA07、EN02、EN05、EN11。
- **空白：本轮证据空白，不是市场空白。** 没有充分核实完整业务品牌树、跨品牌内容/达人去重、受限权限下总量、关系版本历史。不能据此声称竞品都不做或聚星拥有独家机会。

## 跨产品限制

所有产品的“同文跨子品牌去重”本轮均未取得足够合同证据；Rival IQ总粉丝数也不是独立受众去重。公开账号表现与全网品牌提及分开解释。详见[缺口清单](../synthesis/research_gaps.md)。

## 2026-11-17更新入口

四家最新界面与保存机制见[第二轮报告](../deep_dive_2026-11-17/界面与操作深挖报告_v1.md)；上表保留首轮比较口径。特别注意Sprinklr有组内品牌数聚合、Lefty有个人/活动布局保存，本轮仍未验证完整品牌树与跨品牌去重。
