# Emplifi：关联品牌集合、总分报表与定制视图的公开界面深挖

日期：2026-11-17（Asia/Shanghai）。仅核对公开官方文档、其中的实际UI图片及演示入口；未登录、未注册、未联系销售，未操作生产产品。证据卡：[emplifi_cards.jsonl](evidence/emplifi_cards.jsonl)。保留第一轮历史文件不变。

## 本轮能够确认的形式

**Emplifi的公开实证是“账号标签集合＋集合比较＋可保存分析范围＋自定义图表画布”，仍未证明原生主品牌—子品牌树。** 官方明确把集合分析用于自有brands/divisions，但产品对象是profiles及其labels。要区分三件事：账号集合的总量、集合之间的分项比较、从指标钻至贡献内容。它们不是同一种“总—分”。

## 可供复核的用户操作链

| 环节 | 文档给出的操作与结果 | 本轮实际看到了什么 | 证据 |
|---|---|---|---|
| 组织关联账号 | 设置中创建账号标签；给已有标签分配所监控的owned/public profiles；按可见性分享 | 侧栏有账号标签入口；通用标签列表＋右抽屉图片实际是内容标签页面。未见账号标签创建弹窗 | E201 |
| 看集合分项及规模 | 在多标签比较页选择多个集合，分别按粉丝或内容看均值/总量 | 多选标签条、每集合一根柱及两个独立的均值/总量分段控件；截图均值选中 | E202 |
| 看单体与集合背景 | 在单账号对集合页面选一个profile和一个label | 左右并列KPI与趋势图，均值标题清楚；不是左总量右子品牌贡献 | E203 |
| 看逐账号明细 | 账号汇总页选账号，指定时间与排序指标 | 单账号逐行KPI表；媒体账号样例，平台侧栏，无品牌树 | E204 |
| 解释某项数据来源 | 对可交互图表悬停某bar/segment，点击关联内容入口；或查看整个widget底层内容 | 实际hover浮层和整widget跳转图标；未见跳转后结果 | E205 |
| 固化管理者视图 | 保存当前来源、筛选、聚合、时间配置；可更新原视图或另存 | 首页视图表，含所属board、创建者及可见性；未实际保存 | E206 |
| 定制画布 | 创建board并选择/生成widgets，也可手工构建；保存视图后分享 | 添加widget模态、当前/其他board选择器及平铺board列表 | E207、E208 |

## 1. 集合怎样建立与维护

[E201 官方文档](https://docs.emplifi.io/platform/latest/home/how-to-set-up-labels)当前路径为 Settings → Labels → Profile labels；新增使用 Create profile label。已有标签在 Profiles 页签用 Assign profiles 维护，可按平台筛选、搜索、全选，提交后列表显示成员。默认仅自己可见，也可全局或指定人员；标签可重命名、复制（含分配）及删除。

**图片边界：** 实际已看两张图均以内容标签为当前页，分别展示列表与右抽屉；仅侧栏可见账号标签入口。不能拿内容标签组的截图当主子品牌设置图。当前文字说明账号标签详情有设置与成员两个页签，没有父标签字段或嵌套步骤。

## 2. 总量与分项怎样呈现

[E202/E203 官方文档](https://docs.emplifi.io/platform/latest/home/compare-profile-labels)的两个Tab为 Profile label multicomparison 与 Profile vs. profile label。前者的图片有多个标签的选择条，各集合逐项绘柱；每个指标区有 Average / Total 开关，图片当前显示前者。后者把一个profile与label集合左右并列，所有图表按均值展示。故可证实“集合总量可切”和“集合分项比较”，不能声称看见“集团总量→子品牌贡献”界面。

[E204 官方文档](https://docs.emplifi.io/platform/latest/home/create-a-profiles-summary)另一种“分”是逐账号KPI表。截图可见账号多选、时间、排序指标下拉、升降序及保存/更新按钮。图片里保留旧平台指标例子，不能将其数值或字段当当前API承诺。

## 3. 数据怎样钻到内容

[E205 官方文档](https://docs.emplifi.io/platform/latest/home/drill-into-interactive-widgets)截图里，堆积柱的悬停层包含日期、媒体类型、数量和 View associated content；另图在widget右上角呈 View in Content Hub 图标，并标明可交互及帖子级数据。文字说跳转后只显示对应内容，沿用board排序与聚合。本轮没有点击或看到实际结果列表。

## 4. 视图怎样保存、回访及定制

[E206 官方文档](https://docs.emplifi.io/platform/latest/home/managing-saved-views)通过 Save as view 保存来源、筛选、聚合和时间框架；已有视图可 Update view 或 Save as new view。首页表能看到视图名、所属board、最后编辑时间、创建者及可见性，支持编辑、删除和按创建者/可见性筛选。按board保存不等于创建品牌实体；共享能见与能改仍受角色和分享模式控制。

[E207 官方文档](https://docs.emplifi.io/platform/latest/home/create-a-dynamic-board-in-unified-analytics)把动态board描述为自选widgets的工作画布，并仍标early access。图中的 Add to current board 下拉可选已有board或另建；提示添加至其他board后，必须在目标board重新选择数据源。左侧board清单平铺，未见集团/子品牌层级。生成入口的视觉示例能证明有AI生成图表的入口，不能证明任意问题都能正确生成。

[E208 官方文档](https://docs.emplifi.io/platform/latest/home/create-your-own-widget-from-scratch)手动入口为 Add widget → Build your own widget，接着选择指标、来源、图型、聚合、breakdown与筛选后创建。custom widgets只支持自己的boards；筛选只影响该widget。已看图片的更多菜单包含 Copy to board、Edit、Duplicate等，配置画布本身未在本页图片观察到。部分live paid指标不支持内容标签，已有不兼容配置会显示错误，需删标签条件或换指标。

## 5. 统一范围的关键限制

[E209 官方文档](https://docs.emplifi.io/platform/latest/home/filter-and-aggregate-data-in-unified-analytics-boa)明确：board filters只作用帖子级widgets，账号级widgets不随之变化；全为账号级时不能过滤。因此不能凭顶部有统一筛选栏，就认定所有KPI使用同一范围。账号层级、内容层级、指标聚合方式需要分别核对。

## 6. 可进一步亲自体验的官方入口

- **交互演示入口已定位（分支未运行，主任务后续已走完）：** [Unified Analytics产品页](https://emplifi.io/product/social-media-analytics/)直接嵌入 [Unified Analytics Overview / Navattic](https://capture.navattic.com/cmi556q9e000004kz6euo8dz0)。web打开演示返回零行，属于需要浏览器渲染的空壳；未观察界面。由主任务的独占浏览器进一步验证。E210仅证明官方嵌入入口。
- **视频线索尚不可直接观看：** [20分钟官方Product Tour](https://emplifi.io/webinar/product-tour-streamline-social-reporting-with-unified-analytics/)介绍统一报表和动态dashboard，页面有登记入口；未登记、未获取视频。页面写3月16日但无可靠年份，不推断新旧。HTML中的静态感谢文字不代表已提交。E211。

## 已实际审看的官方图片索引

以下均为从已打开官方文档提取的原图直链，caption照录文件或alt名称。下载只用于临时本机审看；报告不依赖临时路径。红色框是官方素材原有标注。

- [Profile Label Multicomparison.png](https://docs.emplifi.io/__attachments/a_be7b639bcc4386aec71b4346aefd9fab275a01bb86d256d56dd505bce98f6b27/Profile%20Label%20Multicomparison.png?cb=16ba6cb070216ff62ab6e5efea4bf422) — 已实际审看官方文档原图；不是本次操作截图。
- [Profile vs Profile Label.png](https://docs.emplifi.io/__attachments/a_915edd0a283eebec9a52a871c51279902856f49b1d578bf5c0b8a9bc41dabb82/Profile%20vs%20Profile%20Label.png?cb=013c47f84bff04ff5c7350312200701c) — 已实际审看官方文档原图；不是本次操作截图。
- [Profiles Summary.png](https://docs.emplifi.io/__attachments/a_27ebb823c95beadcce18a864e67a2ab1f6e1465e9245b38fbc6dac965e3b2b4f/Profiles%20Summary.png?cb=0cffbf0786fd349b2b5aeb897d3fe219) — 已实际审看官方文档原图；不是本次操作截图。
- [Unified Analytics Interactive Widget samples.png](https://docs.emplifi.io/__attachments/a_a832d2377a8b23cf470ca73f7126a1db32f28c58b40c2e374b0fbd8a11072e55/Unified%20Analytics%20Interactive%20Widget%20samples.png?cb=0b071f63a26345523604bb35cc332db9) — 已实际审看官方文档原图；不是本次操作截图。
- [Display Content Hub Content.png](https://docs.emplifi.io/__attachments/a_57e82536e9e42c4358fb73417168c78ce8cdb7a8e60df13025c33195e8affe7c/Display%20Content%20Hub%20Content.png?cb=22db3aa653929cfebf445476758eae0f) — 已实际审看官方文档原图；不是本次操作截图。
- [Savedviews.png](https://docs.emplifi.io/__attachments/a_5b29e7e036a6dd4203edec9afea4e3463dec4600afda33d1392c1f47100bba70/Savedviews.png?cb=83c4d07028b2c3c83587e97053bcb229) — 已实际审看官方文档原图；不是本次操作截图。
- [Add widget to a board.png](https://docs.emplifi.io/__attachments/a_ec9a08a8ede6dc1743594332264abc134c1be110aba17d06f4e30132b87f21bb/Add%20widget%20to%20a%20board.png?cb=1ff31e9a630a6315a987324ec4af1f73) — 已实际审看官方文档原图；不是本次操作截图。
- [Settings sidebar with the Labels menu expanded](https://docs.emplifi.io/__attachments/a_3c36337ca0f57e73a502a5a3c3454831a3577d203ea5b8f4ebeb850dbf158432/Screenshot%202026-10-20%20at%2016.36.02.png?cb=3b08f98491805547350af7e8bfb4bdfb) — 已实际审看官方文档原图；不是本次操作截图。
- [Label details panel with its tabs](https://docs.emplifi.io/__attachments/a_09385bccf1c954814819f26fa195bae5474e1c3eaeb2079b026fa483cb4d1da0/Screenshot%202026-10-22%20at%2012.58.18.png?cb=dce4983532cb2d7b5ca1d86cc576cb5c) — 已实际审看官方文档原图；不是本次操作截图。
- [image-20250720-103429.png](https://docs.emplifi.io/__attachments/a_cfc0c8ed31c4258d200860f2e1d2637ef2cf014aa998c828ef2f7648f4b52509/image-20250720-103429.png?cb=971b01860709a5bf26d63fe614d43812) — 已实际审看官方文档原图；不是本次操作截图。

## 仍需验证的空缺

1. 原生主子品牌字段、多层继承、节点挪动、产品线/事业群多归属：本轮未找到实证，不能推导不存在。
2. 同profile跨labels重叠后的总量去重、内容/达人跨品牌去重、贡献占比的分母：未明确。
3. label成员更改后，saved view是动态引用还是保存成员快照；历史报告是否随重归属重算：未知。
4. 单集合总量与各分项是否能同屏且保持同口径：现有图片只证明多集合分项及切换控件；没有点击结果。
5. 所有截图是文档样例，版本时间混合。文件名可暗示2024/2025/2026素材日期，不能当页面更新日或线上现行版证据。

本轮新增11张证据卡。没有修改第一轮结论；没有将“品牌/事业群可用账号标签分析”提升为原生品牌层级承诺。

## 主任务追加：公开导览已复核

主研究者随后通过浏览器走完6步公开导览，观察到首页Saved views表及Content performance的内容下钻入口；终点为联系表单，未填写。此为预设捕获式导览，未真实保存或进入Content Hub结果。详见[browser_walkthrough.md](browser_walkthrough.md)及UIE201，不改写E210分支当时“仅定位入口”的记录。
