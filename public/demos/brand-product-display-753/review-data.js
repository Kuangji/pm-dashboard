window.ChannelReviewData = {
  releaseVersion: 'v7.5.3',
  releaseName: '品牌商品展现优化',
  version: 'v0.18 · 商品视频清单合并',
  baselineDate: '2026-11-13',
  groups: {brand:'品牌',product:'商品',shared:'共用口径'},
  points: [
    {id:'B01',group:'brand',title:'提及品牌数量',placement:'品牌表底部，分页所在行左侧',value:'在不增加标题或卡片信息负担的前提下，说明当前筛选的品牌总数。',current:'已按用户确认补充“共 N 个品牌”，左侧总数、右侧分页。',reuse:'复用当前筛选的去重品牌总数；分页和每页数量不改变总数。',question:'位置及形式已确认；该点为小改动、低优先级。',boundary:'总数跟随搜索和推广类型筛选；空结果为0，不数当前页；标题不加数量。',module:'brands'},
    {id:'P01',group:'product',title:'完整商品清单',placement:'推广商品子页集中展示；总页面骨架定位',value:'查看频道全部已收录推广商品，不局限于Top5。',current:'已按本轮要求直接叠加完整商品表，保留Top5、分类和品牌表；完整商品表支持品牌筛选及独立分页，合作详情可带品牌定位。',reuse:'复用商品明确所属品牌，在完整集合上过滤后分页；合作详情提供“查看推广商品”，商品行沿P04/P05。',question:'本轮先验证完整清单和跳转，页面长度、模块顺序与表格布局留设计阶段。',boundary:'已确认功能示意；12件虚构商品可跨页查看，Top5仍只展示5件，P02另补总观看量和互动率两列，均播不加。',module:'products'},
    {id:'P02',group:'product',title:'商品内容表现指标列',placement:'全部推广商品表的两项可排序指标列',value:'比较本频道不同商品关联视频的总观看量与互动率。',current:'已确认补本频道关联视频总观看量和互动率，支持表头降序/升序；均播不加。',reuse:'复用同频道、同商品、同关联集合的既有统计口径；固定模拟聚合示意，先筛/排序再分页。',question:'先验证两列及排序，真实频道商品聚合、互动率单位和关联窗口仍需接入核验。',boundary:'只补完整商品表两列；null显示--且始终排末尾，真实0保留；不增加均播；Top5复用总观看量固定降序，保留原界面。',module:'products'},
    {id:'P03',group:'product',title:'内容关联品牌与商品',placement:'品牌数据合作详情强展示；内容数据仅加标记与抽屉',value:'最高优先：从某条视频看清关联品牌和商品，分别评审两个TAB的展示强度。',current:'已按本轮要求做双TAB方案示意：品牌数据卡下直接展示，内容数据仅标记，点击进入关联抽屉。',reuse:'复用视频卡骨架、64px商品资料行、商品轮播及654px右侧抽屉；生产内容接口仍需补全关联返回。',question:'多品牌换行与多商品轮播是否合适？轻标记和抽屉的信息量是否够用？本轮看方案，不冻结生产交互。',boundary:'用户已授权演示双TAB差异化方案；多/单/仅品牌/未提供状态均为虚构样例。未接真实关系接口，不新增识别计算或业务故事。',module:'products'},
    {id:'P04',group:'product',title:'商品品牌与本频道视频数',placement:'频道品牌数据 → 推广商品列表',value:'看清商品所属品牌，以及当前频道关联了多少条该商品视频。',current:'本轮在既有商品行补品牌和本频道视频数；不平铺视频卡。仅标题进入商品详情，其余区域打开本频道该商品视频抽屉。',reuse:'复用productBrand/pkId/videoCount；缺失不作零。数字、图片和行空白均进入本频道关联视频抽屉。',question:'先看品牌和视频数是否够清楚；列表空间与行高交设计阶段调整。',boundary:'已确认本轮功能示意；频道商品完整清单由P01补齐；P02已补两项表现指标列。',module:'products'},
    {id:'P05',group:'product',title:'商品详情完整关联视频与频道筛选',placement:'商品详情 → 关联视频TAB',value:'从商品查看全部已收录关联视频，并按网红频道筛选。',current:'线上已有三类Top5榜单；本轮增加独立分页清单和可搜索、可清除的频道条件。',reuse:'复用商品/频道关系及分页查询基础；真实返回需对齐关联时间、权限和全量分页边界。',question:'从标题进入商品详情、从其他区域打开本频道视频抽屉是否易理解？切换频道、清除条件及翻页路径是否顺畅？',boundary:'近180天已收录关联范围内的完整模拟集合；非全网所有视频。实际launch_time与pub_time差异仍需接入核验。',module:'products'},
    {id:'V01',group:'brand',title:'原对比模块扩展发布数量视图',placement:'频道品牌TAB → 非推广 vs 推广 → 观看表现／发布数量',value:'原模块内切换观看表现和发布数量，筛品牌商品后按时间段查看视频，不再叠加独立频道趋势。',current:'一张图卡、两个视图，默认观看表现；发布数量保留日/周/月、品牌商品筛选和视频抽屉，共用品牌TAB时间。',reuse:'复用现有日期聚合/关系过滤基础，静态Demo共用视频分桶工具，不计算观看增长。',question:'本轮看双视图切换与原模块复用、发布筛选隔离和视频查看是否清楚。',boundary:'固定mock；生产入口/权限/日期契约待适配；同视频多关联只计一次，未知不当0。',module:'brands'},
    {id:'V04',group:'product',title:'商品关联内容发布趋势',placement:'商品详情关联视频TAB → 发布趋势与完整清单',value:'按发布时间看商品内容节奏，选择频道和时间段后定位对应视频。',current:'已确认共享频道筛选、日/周/月柱图与完整视频清单联动，可清除所选时间段。',reuse:'复用商品视频集合及日期聚合基础，与频道趋势共用图形工具。',question:'本轮看选桶、清除、换频道及完整列表分页是否顺畅。',boundary:'商品独立范围，不跟随品牌TAB时间；趋势保留全范围上下文，未知与空记录分开，非观看增长。',module:'products'},
    {id:'V06',group:'product',title:'商品总览联动与可排序完整视频清单',placement:'商品详情 → 关联视频TAB → 总览／占比图／完整清单',value:'限定频道看四项总览、两张占比图；三组榜单合并成唯一完整清单，按发布时间／播放量／点赞量／评论数排序。',current:'只限关联视频TAB；趋势点桶只筛清单，总览／占比／趋势保留整段范围；完整集合排序后分页。',reuse:'复用线上总览、环图及已有视频卡／分页，删除重复三榜；使用原始数值稳定排序，未知置后。',question:'本轮看四种排序、频道／时间段组合、完整分页及总览隔离是否清楚。',boundary:'固定mock完整集合，未接真实接口；推广分类不从AD或商品关系推断，空与未知分开。',module:'products'},
    {id:'S01',group:'shared',title:'品牌数据TAB统一时间范围',placement:'品牌TAB顶部局部时间选择器',value:'只在品牌数据TAB内统一控制品牌商品内容统计、列表和关联视频，不跨TAB。',current:'已确认新增品牌TAB选择器；Demo按固定虚构集合演示品牌/商品/分类/指标/视频抽屉同步切换。',reuse:'复用现有200×40下拉、白底浅灰边框/12px圆角与时间选项语言；仅基础汇总，不新增计算模型。',question:'本轮评审局部控件位置与品牌商品联动；默认近6月和选项可继续微调，真实接口待接入。',boundary:'不跨TAB、不影响独立商品页；报价和回复效率不从视频重算。生产范围/日期字段/权限仍需核验。',module:'products'}
  ].map(point => ({...point,scopeStatus:['B01','P01','P02','P04','P05','S01','V01','V04','V06'].includes(point.id)?'已确认':point.id==='P03'?'待评审':'待讨论',implementation:['B01','P01','P02','P03','P04','P05','S01','V01','V04','V06'].includes(point.id)?'已演示':'未实现',priority:['P01','P02','P04','P05','V01','V04','V06'].includes(point.id)?'本轮推进':point.id==='P03'?'最高优先级':point.id==='S01'?'本轮推进':point.group==='product'?'随后讨论':point.id==='B01'?'低优先级':'后续讨论'})).sort((a,b)=>['P02','P01','P04','V01','V04','V06','P05','P03','B01','S01'].indexOf(a.id)-['P02','P01','P04','V01','V04','V06','P05','P03','B01','S01'].indexOf(b.id)),
  brands:[
    {id:'brand-a',name:'曜石数码',domain:'obsidian.example',videoCount:12,views:1840000,avgViews:153333,rate:'3.2%',date:'2026-11-10',budget:18600,thumbnail:'./assets/video-1.jpg',promotionTypes:['paid','suspect'],promotionStats:{paid:{videoCount:8,views:1240000,avgViews:155000,rate:'3.1%',date:'2026-11-10',budget:12400},suspect:{videoCount:4,views:600000,avgViews:150000,rate:'3.4%',date:'2026-10-12',budget:6200}}},
    {id:'brand-b',name:'Mori Home',domain:'mori.example',videoCount:8,views:960000,avgViews:120000,rate:'4.1%',date:'2026-10-28',budget:10400,thumbnail:'./assets/video-2.jpg',promotionTypes:['mention'],promotionStats:{mention:{videoCount:8,views:960000,avgViews:120000,rate:'4.1%',date:'2026-10-28',budget:10400}}},
    {id:'brand-c',name:'North Audio',domain:'north.example',videoCount:5,views:710000,avgViews:142000,rate:'2.8%',date:'2026-09-16',budget:8300,thumbnail:'./assets/video-3.jpg',promotionTypes:['paid','mention'],promotionStats:{paid:{videoCount:3,views:420000,avgViews:140000,rate:'2.7%',date:'2026-09-16',budget:5000},mention:{videoCount:2,views:290000,avgViews:145000,rate:'3.0%',date:'2026-08-14',budget:3300}}}
  ],
  products:[
    {id:'p1',brandId:'brand-a',name:'6 盘位桌面网络存储 NAS',category:'Electronics > Data Storage > Network Attached Storage',price:'$1449.99',image:'./assets/product-1.jpg'},
    {id:'p2',brandId:'brand-a',name:'磁吸快充移动电源 10000mAh',category:'Cell Phones & Accessories > Portable Power Banks',price:'$149.99',image:'./assets/product-2.jpg'},
    {id:'p3',brandId:'brand-c',name:'AM5 无线主板 Micro-ATX',category:'Electronics > Computer Components > Motherboards',price:'$149.99',image:'./assets/product-3.jpg'},
    {id:'p4',brandId:'brand-b',name:'13 英寸平板电脑',category:'--',price:'--',image:'./assets/product-4.jpg'},
    {id:'p5',brandId:'brand-a',name:'轻薄笔记本电脑 16GB / 512GB',category:'Electronics > Computers & Tablets > Laptops',price:'$999.99',image:'./assets/product-5.jpg'},
    {id:'p6',brandId:'brand-c',name:'桌面有源音箱',category:'Electronics > Speakers',price:'$129.99',image:'./assets/product-placeholder.png'},
    {id:'p7',brandId:'brand-a',name:'27英寸4K显示器',category:'Electronics > Monitors',price:'$399.00',image:'./assets/product-placeholder.png'},
    {id:'p8',brandId:'brand-a',name:'无线人体工学鼠标',category:'Electronics > Computer Mice',price:'$79.99',image:'./assets/product-placeholder.png'},
    {id:'p9',brandId:'brand-b',name:'桌面氛围灯',category:'Home > Lighting',price:'$49.99',image:'./assets/product-placeholder.png'},
    {id:'p10',brandId:'brand-b',name:'可调节桌面收纳架',category:'Home > Storage',price:'$29.99',image:'./assets/product-placeholder.png'},
    {id:'p11',brandId:'brand-a',name:'双频无线网络路由器',category:'Electronics > Networking',price:'$159.99',image:'./assets/product-placeholder.png'},
    {id:'p12',brandId:'brand-c',name:'便携音频连接配件',category:'--',price:'--',image:'./assets/product-placeholder.png'}
  ],
  categories:[{name:'电子产品',count:8,percent:66.7},{name:'家居',count:2,percent:16.7},{name:'其他 / 分类缺失',count:2,percent:16.6}]
};
