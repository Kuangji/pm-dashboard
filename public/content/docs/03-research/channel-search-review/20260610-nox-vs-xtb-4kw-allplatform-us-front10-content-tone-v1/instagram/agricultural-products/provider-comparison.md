# Channel Search Provider Comparison

- keyword: agricultural products
- platform: instagram
- country: US
- left: nox@content-tone-llm-v1 (tmp/channel-search-review/20260610-nox-vs-xtb-4kw-allplatform-us-front10-content-tone-v1/instagram/agricultural-products/nox-instagram)
- right: xtb@content-tone-llm-v1 (tmp/channel-search-review/20260610-nox-vs-xtb-4kw-allplatform-us-front10-content-tone-v1/instagram/agricultural-products/xtb-instagram)
- left_rule_version: content-tone-llm-v1
- right_rule_version: content-tone-llm-v1
- left_prompt_hash: 1228e2ff575f
- right_prompt_hash: 1228e2ff575f

## Run Overview
| run | provider | rule_version | total | fit | adjacent | badcase | badcase率 | <0 | 0-9 | 10-19 | 20+ |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| nox@content-tone-llm-v1 | nox | content-tone-llm-v1 | 500 | 218 | 192 | 90 | 18.0% | 0 | 500 | 0 | 0 |
| xtb@content-tone-llm-v1 | xtb | content-tone-llm-v1 | 500 | 226 | 203 | 71 | 14.2% | 0 | 500 | 0 | 0 |

## Page-Level Badcase Rate
| page | nox@content-tone-llm-v1_total | nox@content-tone-llm-v1_badcase | nox@content-tone-llm-v1_badcase率 | xtb@content-tone-llm-v1_total | xtb@content-tone-llm-v1_badcase | xtb@content-tone-llm-v1_badcase率 | badcase率差 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 50 | 14 | 28.0% | 50 | 6 | 12.0% | 16.0% |
| 2 | 50 | 11 | 22.0% | 50 | 6 | 12.0% | 10.0% |
| 3 | 50 | 6 | 12.0% | 50 | 6 | 12.0% | 0.0% |
| 4 | 50 | 10 | 20.0% | 50 | 7 | 14.0% | 6.0% |
| 5 | 50 | 3 | 6.0% | 50 | 8 | 16.0% | -10.0% |
| 6 | 50 | 5 | 10.0% | 50 | 5 | 10.0% | 0.0% |
| 7 | 50 | 7 | 14.0% | 50 | 7 | 14.0% | 0.0% |
| 8 | 50 | 9 | 18.0% | 50 | 7 | 14.0% | 4.0% |
| 9 | 50 | 13 | 26.0% | 50 | 6 | 12.0% | 14.0% |
| 10 | 50 | 12 | 24.0% | 50 | 13 | 26.0% | -2.0% |

## Badcase Overlap
| metric | count |
| --- | --- |
| shared_badcase | 45 |
| nox@content-tone-llm-v1_only_badcase | 45 |
| xtb@content-tone-llm-v1_only_badcase | 26 |

## Badcase Cause Summary
| provider | category | count |
| --- | --- | --- |
| nox@content-tone-llm-v1 | 其他 | 47 |
| nox@content-tone-llm-v1 | 泛相关性偏离 | 32 |
| nox@content-tone-llm-v1 | 娱乐/儿童/泛内容偏离 | 5 |
| nox@content-tone-llm-v1 | 证据缺失或信号不足 | 3 |
| nox@content-tone-llm-v1 | 宠物/动物受众冲突 | 2 |
| nox@content-tone-llm-v1 | 科技/电子垂类偏离 | 1 |
| xtb@content-tone-llm-v1 | 其他 | 36 |
| xtb@content-tone-llm-v1 | 泛相关性偏离 | 24 |
| xtb@content-tone-llm-v1 | 娱乐/儿童/泛内容偏离 | 5 |
| xtb@content-tone-llm-v1 | 证据缺失或信号不足 | 4 |
| xtb@content-tone-llm-v1 | 宠物/动物受众冲突 | 2 |

## Shared Badcases
| channel | nox@content-tone-llm-v1 | xtb@content-tone-llm-v1 |
| --- | --- | --- |
| Scooby | 内容是泛知识和梗图，几乎没有农业或农产品承载能力 | 纯娱乐杂谈，和农业商品受众明显不匹配 |
| aipagedaily | 主体是AI科技新闻，与农业产品受众和调性明显不符 | AI工具资讯号，主题与农业产品完全不相干 |
| Farm Sanctuary | 以动物保护和素食倡议为主，和农产品推广方向明显冲突 | 动物保护与反畜牧立场明确，不适合农产品商业合作 |
| RankingRoyals | 主要是宏观统计和排名，缺少农业产品的内容与受众匹配 | 主要是国家排名、经济、护照和统计类内容，与农业产品无关 |
| David Shapiro | 金融、投资和AI并购内容为主，与农业产品完全不在一条线 | 内容集中在投资路演/公司宣传，和农业商品无关 |
| Power Of Africa | 主体是非洲体育和时政资讯，与农产品推广受众不匹配 | 体育与非洲时政资讯为主，和农业产品推广几乎无关 |
| Ace ♤ | 重口医疗内容账号，和农业产品受众与调性完全不匹配 | 医疗伤病猎奇内容，与农业商品受众和承载场景明显不符 |
| US Customs & Border Protection | 边检执法和安全宣传账号，与农业产品不相关 | 边境执法内容，与农业商品推广完全不相干 |
| Carmen Pratt | 海洋环保和生活方式内容为主，和农产品不在同一受众层 | 海洋环保个人内容，和农产品推广几乎无关 |
| BNSF Railway | 主要是铁路物流与企业新闻，受众和农产品推广场景偏离 | 铁路货运与物流为主，缺少农业产品消费或种植场景承接 |
| Freshwaters Illustrated | 水域纪录片与保护内容，和农产品推广几乎无关 | 主体是淡水生态纪录片与教育，不适合农业产品推广 |
| Animal Outlook | Undercover Investigations | 核心是揭露畜牧业虐待，和农业产品推广明显冲突 | 反畜牧与动物权利立场强烈，和农产品合作推广方向冲突 |
| African Development Bank Group | 宏观金融与发展项目为主，不是农产品推广场域 | 开发银行与政策发布为主，不是面向农业产品消费或采购的频道 |
| Satisfying How-Tos | 内容是Minecraft/ASMR/解压视频，与农业商品无关 | 主体是Minecraft和ASMR解压内容，与农业产品受众完全不符 |
| Switch4Good | 主要是反奶制品倡议，不适合推广农业产品 | 核心立场反乳制品，和多数农产品推广方向冲突 |
| Center for Food Safety | 反农药/反工业农业立场，和商品推广方向冲突 | 核心是反农药、反工业农业的倡议账号，不适合卖农业产品 |
| Historic Propertunities | 历史城市讲述账号，与农产品合作推广几乎无关 | 城市/历史介绍频道，与农业商品推广没有自然关联 |
| Lynn Richardson | 内容是金融、就业和个人成长，与农产品毫无关联 | 主要是财务、创业和个人激励内容，与农产品无关 |
| Wrestling Club at FAMU | 体育招生号，和农产品推广受众不匹配 | 校园摔跤社团账号，内容与农产品推广完全无关 |
| Trillionaire Estates ⚜️ | 豪宅号，与农产品推广明显不搭 | 全是豪宅、酒店和建筑概念，和农产品受众与场景明显不匹配 |
| Backslash | 文化趋势号，无农产品承载场景 | 内容是文化评论与趋势解读，几乎没有农业或农产品承接 |
| Director of Field Operations | 内容是海关执法与边检，虽提到农产品检查，但调性明显不适合 | 主体是海关执法与边境安检，不是农产品受众或推广场景 |
| Free From Harm | 内容立场明显反动物农业，偏倡议和对抗，不适合农产品合作推广。 | 核心立场反对动物农业，与农产品商业推广方向明显冲突 |
| Rowdy Girl Sanctuary, Inc. | 核心立场反农牧业，和农产品推广方向明显冲突 | 核心立场是动物解放与素食，和农产品尤其畜产品推广明显冲突 |
| Reed Booth | 内容是清除杀蜂/入侵蜂的娱乐化梗，不适合农产品推广 | 内容主要是杀蜂/灭蜂叙事，不适合泛农业产品推广。 |
| Cowspiracy | 以反动物农业和气候倡议为主，与多数农产品推广冲突 | 核心是反畜牧/素食运动与纪录片宣传，和农产品合作方向冲突 |
| Stealth Machine Tools inc | 工业机床与金属加工内容，和农业产品推广无关 | 工业机加工设备为主，与农业产品推广不匹配 |
| Pratt GA/LA/UD | 建筑学院与设计展内容，不适合农产品推广 | 主体是建筑与景观教育，不是农业产品推广场景 |
| Ed Kashi | 以纪实摄影和社会议题为主，缺少农产品或农业消费承载 | 纪实摄影与人文议题为主，不具备农产品推广语境。 |
| Matt Starr Fine Art | 核心是绘画和艺术品销售，虽有农场意象但不具农产品推广场景。 | 纯艺术创作账号，只有偶尔的动物题材，不适合农产品推广 |

## nox@content-tone-llm-v1-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 49 | California Outdoor Properties |  | 卖牧场地产不是卖农产品，合作承载点弱 |
| 58 | Covey Rise Properties |  | 主轴是农庄/豪宅地产销售，不是农产品推广 |
| 64 | POR-15 |  | 汽车防锈涂料频道，与农业商品无明显关联 |
| 70 | Grist |  | 气候新闻媒体，和农产品推广没有直接承接 |
| 81 | Fay Ranches |  | 核心是牧场地产和土地交易，和农产品合作推广关系很弱 |
| 91 | Hall and Hall |  | 核心是牧场地产、拍卖和投资，不是农产品内容 |
| 97 | Chula Beauregard Fine Art |  | 主要是西部题材美术作品，和农产品合作场景不匹配 |
| 140 | Washington Post climate coverage |  | 气候新闻账号，主题与农业产品推广明显不相干 |
| 145 | Noble Road |  | 内容偏健康争议和个人品牌，农业产品主题不稳定，合作承载弱 |
| 181 | Land Broker, TT Ranch Group |  | 主要是牧场地产销售，不是农产品或消费推广场景 |
| 185 | Sacramento History Museum |  | 内容是历史博物馆和印刷文化，与农产品无关 |
| 190 | Hortenstine Ranch Company, LLC |  | 主轴是牧场地产和狩猎娱乐，不是农产品消费推广 |
| 197 | 420 WASTED |  | 新闻搬运偏娱乐和药物议题，与农产品无关 |
| 243 | Daily Historian |  | 内容是历史叙事与影史解读，和农业产品受众及场景基本无关。 |
| 272 | Dr. Bronner's |  | 核心是清洁皂与社会议题，和农产品推广不匹配。 |
| 307 | Woodstock Farm Sanctuary |  | 动物救助与反动物农业立场明显，和农业产品推广冲突 |
| 311 | Brittany Brown - Arbiter of Local Culture |  | 旅行探店和本地文化账号，几乎没有农业产品受众 |
| 318 | Iconic Motorbikes |  | 摩托车拍卖频道，与农业产品完全不相关 |
| 325 | Science 🧬 |  | 科学杂谈号，和农业产品推广几乎无关 |
| 326 | History Cool Kids |  | 内容几乎全是历史科普，与农产品受众和承载场景不匹配 |
| 335 | Arthur Rothstein Legacy Project |  | 主轴是历史影像与美国故事，不是农产品或消费内容 |
| 339 | St. James Sporting Properties |  | 主体是狩猎地产和娱乐型内容，不是农产品消费场景 |
| 371 | Design Emergency |  | 设计艺术和地缘政治频道，与农业商品受众几乎无关 |
| 373 | Robert Bender |  | 铁路摄影频道，和农业产品合作场景几乎没有重叠 |
| 380 | Baai 🌎 |  | 娱乐混剪频道，缺少农业受众和商品承接能力 |
| 390 | SunnySkiesProduce.com |  | 以招聘和职位发布为主，不是农产品消费频道 |
| 396 | Charlie's Acres |  | 反动物农业立场明确，与农产品推广方向冲突 |
| 409 | OverseasDreamHome |  | 核心是海外房产内容，和农产品推广场景不符 |
| 420 | National Fish and Wildlife Foundation |  | 以野生动物保护为主，和农产品推广关联弱 |
| 423 | Michelle Bianca |  | 反动物农业立场明确，和多数农产品推广冲突 |

## xtb@content-tone-llm-v1-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 19 | Re:wild |  | 主线是生态保护，与农产品推广方向冲突 |
| 35 | Ertl |  | 核心是农机玩具，不是农业产品推广语境 |
| 37 | GMO Free USA |  | 反GMO和反农药立场强，和多数农业产品推广冲突 |
| 158 | LANDIO |  | 核心是土地房产销售，不是农业产品内容，商品推广场景不匹配 |
| 161 | LandProz |  | 核心是土地买卖与拍卖，难以自然承接农业商品推广 |
| 241 | Heritage Iron Magazine |  | 核心是农机历史与收藏，不是农产品场景 |
| 261 | The Saddle Shoppe |  | 主体是文具、育儿和个人生活，农业元素很弱，不适合农产品推广 |
| 281 | DRONE NERDS | UAV solutions that elevate your operations |  | 主体是无人机与公共安全技术，不是农产品或消费决策内容 |
| 298 | BID |  | 主体是区域发展与招聘，和农产品推广没有直接匹配关系 |
| 306 | Jim Hickey Real Estate Advisor |  | 主体是房产经纪与豪宅/牧场地产，不是农产品场景 |
| 338 | Drug Emporium / Vitamins Plus Waco |  | 零售药妆补充为主，农产品只是很小一部分 |
| 344 | Wandering Maverick |  | 农教主题周边服饰号，卖的是周边不是农产品 |
| 346 | Dr.Banana |  | 科普动画偏娱乐，不是产品或消费决策频道 |
| 349 | Progressive Tractor and Implement (PTI) |  | 主卖拖拉机和农机，不是农业产品本体 |
| 389 | ACES Study Abroad |  | 内容是留学与学生项目，和农产品推广场景基本不匹配。 |
| 413 | Toffu | Architecture |  | 纯建筑内容，和农业商品完全无关 |
| 415 | Taylor B |  | 个人生活与车帖为主，农业相关弱且分散 |
| 419 | Classic Tractor Fever TV |  | 主打复古拖拉机和农机故事，不是农产品消费场景 |
| 436 | Our Hen House |  | 核心是动物权益与纯素立场，和多数农业产品推广冲突 |
| 473 | Follywood Productions 🤘 |  | 政治活动与酒吧活动为主，与农产品无关 |
| 481 | Impact Gel |  | 核心是马具与骑乘生活方式，不是农产品或农业消费场景 |
| 483 | Oficina Martinez Zellner LLC |  | 主体是建筑设计与自建住宅，只有零星农业概念，不适合推广农产品 |
| 488 | Stories for Action |  | 公益纪录片与社区叙事为主，缺少农产品推广承载能力 |
| 493 | 𝗨𝗹𝘁𝗿𝗮𝟭𝗣𝗹𝘂𝘀™️ |  | 核心是汽车/发动机油液，与农产品无关 |
| 497 | Slaughter Free Network |  | 反屠宰与反动物农业立场，和农产品推广方向冲突明显 |
| 498 | The Land Group |  | 核心是土地、林地和房产交易，不是农产品渠道 |

## Notes
- Page-level rates use `page_size` from each run metadata.
- Cause categories are heuristic clusters from `why_short`; review representative rows before making product decisions.
