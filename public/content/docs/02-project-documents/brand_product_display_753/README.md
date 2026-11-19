# v7.5.3 品牌商品展现优化

> 2026-11-19 确认版本编号与名称。当前处于首版 Spec 评审阶段。

本版优先让用户在视频上看清关联品牌和商品，同时补齐品牌、商品反查视频与比较商品内容表现的路径。产品范围见 [Input](input_v0.md)。业务规则、验收场景及待核生产口径见 [Spec v0](spec_v0.md)。

- [改动列表](input_v0.md#改动列表)与[Spec 待确认项](spec_v0.md#5-现状证据与-spec-待确认)
- [静态评审 Demo](../../../demos/brand-product-display-753/index.html)、[频道总页面骨架](../../../demos/brand-product-display-753/index.html#channel-layout)、[商品详情示意](../../../demos/brand-product-display-753/index.html#product-detail)
- [Demo 合同](demo_review_contract_v0.md)、[回流与逐轮验收](_sync_inbox.md)、[渐进式 Input 归档](archive/INDEX.md)
- [调研入口](../../../../02_Research_Analysis/channel_brand_product_pending/README.md)与[通用上下文](../../../../02_Research_Analysis/channel_brand_product_pending/channel_brand_product_common_context_v1.md)
- [Dashboard 静态评审包](../../../demos/brand-product-display-753/index.html)

Demo v0.18 用虚构样例评审功能和交互，生产数据的一致性和完整性按 Spec 验证。P03 的关联目标和两 TAB 展示方向已确认，具体呈现待评审。现行范围以 Input 和 Spec 为准。

## 研发评审清单

按功能所在页面分组，优先评审 P03。各项章节号对应 [Spec v0](spec_v0.md)。

### 频道详情 · 视频关联

- [ ] **P03 视频关联品牌与商品（§1）**。在「内容数据」点击视频卡上的数量标记打开抽屉，在「品牌数据」合作详情的视频卡下直接查看关联。用同一条多关联视频核对两处展示的品牌和商品是否一致。[双 TAB 视频卡](../../../demos/brand-product-display-753/index.html#point=P03)

### 频道详情 · 品牌数据

- [ ] **S01 统一统计时间（§2.1）**。切换「品牌数据」的时间范围，核对品牌和商品相关统计、图表、列表与视频抽屉是否同步。独立商品详情使用自己的时间。[品牌 TAB 时间](../../../demos/brand-product-display-753/index.html#point=S01)
- [ ] **B01 品牌总数（§2.2）**。在表格左下角、分页同一行显示「共 N 个品牌」。核对总数随时间、品牌搜索和推广类型变化，翻页或调整每页数量时保持一致。[品牌提及表](../../../demos/brand-product-display-753/index.html#point=B01)
- [ ] **P01 全部推广商品（§2.2）**。保留 Top5 和分类，新增完整商品分页表及所属品牌筛选。核对合作详情的「查看推广商品」是否带入当前品牌和时间。[全部推广商品](../../../demos/brand-product-display-753/index.html#point=P01) · [品牌合作详情入口](../../../demos/brand-product-display-753/index.html#brands)
- [ ] **P02 商品表现指标与排序（§2.2）**。完整表增加本频道关联视频总观看量和互动率。核对品牌筛选后支持全量升降序排序，再分页。Top5 保持原样式，独立按所选时间内总观看量取前五。[商品表现与排序](../../../demos/brand-product-display-753/index.html#point=P02)
- [ ] **P04 商品行与关联视频抽屉（§2.2）**。Top5 和完整表都显示商品品牌与本频道关联视频数。核对标题进入商品详情，图片等其他可交互区域打开本频道视频抽屉，行内视频数与抽屉总数一致。[商品行与视频抽屉](../../../demos/brand-product-display-753/index.html#point=P04)
- [ ] **V01 频道发布数量（§2.3）**。在原「非推广 vs 推广」模块切换「观看表现」和「发布数量」。核对发布数量视图的品牌、商品和日／周／月筛选，以及点击非零柱后打开对应视频抽屉的行为。[频道对比图](../../../demos/brand-product-display-753/index.html#point=V01)

### 商品详情 · 关联视频

- [ ] **P05 完整视频清单与频道筛选（§3）**。从商品标题进入时默认展示全部频道。核对频道搜索、选择、清除及清单分页。[完整关联视频与频道筛选](../../../demos/brand-product-display-753/index.html#point=P05)
- [ ] **V04 商品发布趋势（§3）**。核对趋势随频道筛选更新，并支持日／周／月切换。点击非零柱时只筛完整清单，清单总数应与柱值一致，清除选段后恢复整段。[商品发布趋势](../../../demos/brand-product-display-753/index.html#point=V04)
- [ ] **V06 总览联动与视频排序（§3）**。核对四项总览（播放、内容量、评论、点赞）和两张占比图随「关联视频」内的频道筛选更新。原三组视频榜单合入完整清单，默认按发布时间最新优先，可按播放、点赞或评论降序。选段和排序只影响清单。[商品总览联动与清单排序](../../../demos/brand-product-display-753/index.html#point=V06)

Demo 用虚构数据演示交互。商品详情时间固定为近 180 天样例，Spec 要求复用现有商品页时间选择器。P03 的多关联排布留到设计评审，生产时间口径、权限及全量查询见 [Spec 待确认项](spec_v0.md#5-现状证据与-spec-待确认)。
