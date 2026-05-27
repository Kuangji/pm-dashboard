# Channel Search Provider Comparison

- keyword: power bank
- platform: youtube
- country: US
- left: nox@promotion-capacity-v1 (tmp/channel-search-review/20260526-nox-vs-xtb-10kw-youtube-us-front10-promotion-capacity-v1/power-bank/nox-youtube)
- right: xtb@promotion-capacity-v1 (tmp/channel-search-review/20260526-nox-vs-xtb-10kw-youtube-us-front10-promotion-capacity-v1/power-bank/xtb-youtube)
- left_rule_version: promotion-capacity-v1
- right_rule_version: promotion-capacity-v1
- left_prompt_hash: b87da85cf79a
- right_prompt_hash: b87da85cf79a

## Run Overview
| run | provider | rule_version | total | fit | adjacent | badcase | badcase率 | <0 | 0-9 | 10-19 | 20+ |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| nox@promotion-capacity-v1 | nox | promotion-capacity-v1 | 500 | 120 | 264 | 116 | 23.2% | 11 | 282 | 121 | 86 |
| xtb@promotion-capacity-v1 | xtb | promotion-capacity-v1 | 500 | 237 | 209 | 54 | 10.8% | 78 | 121 | 146 | 155 |

## Page-Level Badcase Rate
| page | nox@promotion-capacity-v1_total | nox@promotion-capacity-v1_badcase | nox@promotion-capacity-v1_badcase率 | xtb@promotion-capacity-v1_total | xtb@promotion-capacity-v1_badcase | xtb@promotion-capacity-v1_badcase率 | badcase率差 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 50 | 10 | 20.0% | 50 | 3 | 6.0% | 14.0% |
| 2 | 50 | 16 | 32.0% | 50 | 3 | 6.0% | 26.0% |
| 3 | 50 | 8 | 16.0% | 50 | 3 | 6.0% | 10.0% |
| 4 | 50 | 9 | 18.0% | 50 | 5 | 10.0% | 8.0% |
| 5 | 50 | 12 | 24.0% | 50 | 7 | 14.0% | 10.0% |
| 6 | 50 | 9 | 18.0% | 50 | 6 | 12.0% | 6.0% |
| 7 | 50 | 6 | 12.0% | 50 | 6 | 12.0% | 0.0% |
| 8 | 50 | 10 | 20.0% | 50 | 7 | 14.0% | 6.0% |
| 9 | 50 | 16 | 32.0% | 50 | 7 | 14.0% | 18.0% |
| 10 | 50 | 20 | 40.0% | 50 | 7 | 14.0% | 26.0% |

## Badcase Overlap
| metric | count |
| --- | --- |
| shared_badcase | 25 |
| nox@promotion-capacity-v1_only_badcase | 91 |
| xtb@promotion-capacity-v1_only_badcase | 29 |

## Badcase Cause Summary
| provider | category | count |
| --- | --- | --- |
| nox@promotion-capacity-v1 | 证据缺失或信号不足 | 63 |
| nox@promotion-capacity-v1 | 其他 | 29 |
| nox@promotion-capacity-v1 | 泛相关性偏离 | 16 |
| nox@promotion-capacity-v1 | 娱乐/儿童/泛内容偏离 | 6 |
| nox@promotion-capacity-v1 | 宠物/动物受众冲突 | 1 |
| nox@promotion-capacity-v1 | 科技/电子垂类偏离 | 1 |
| xtb@promotion-capacity-v1 | 其他 | 19 |
| xtb@promotion-capacity-v1 | 泛相关性偏离 | 16 |
| xtb@promotion-capacity-v1 | 娱乐/儿童/泛内容偏离 | 9 |
| xtb@promotion-capacity-v1 | 证据缺失或信号不足 | 5 |
| xtb@promotion-capacity-v1 | 科技/电子垂类偏离 | 4 |
| xtb@promotion-capacity-v1 | 宠物/动物受众冲突 | 1 |

## Shared Badcases
| channel | nox@promotion-capacity-v1 | xtb@promotion-capacity-v1 |
| --- | --- | --- |
| Power king | 娱乐短视频频道，和充电宝推广场景不匹配 | 娱乐短视频为主，和充电宝推广格式强错配 |
| Sumaho Friends | 动画娱乐为主，属于物品推广格式不匹配 | 动画娱乐短片为主，属强格式错配，不适合产品推广 |
| Purple Unicorns | 宠物频道与充电宝推广无关，缺少消费电子证据 | 宠物频道为主，和人用充电宝推广受众不匹配 |
| The Life of Bob | 缺少标签和内容证据，相关性极弱 | 频道以做饭和故事为主，充电宝只偶尔出现 |
| Will U Push The Button | 娱乐游戏频道，缺少充电宝相关产品推广能力 | 娱乐问答号，题材与实体产品投放场景明显不匹配 |
| Darius Wallis - PrayersHelp | 宗教/泛社会频道，与充电宝推广无关 | 宗教祈祷内容，和充电宝推广场景明显无关 |
| Evilcrossover | 游戏内容，和充电宝推广场景无关 | 游戏内容为主，虽有测评但与移动电源推广弱相关 |
| Mr. & Mrs. Tesla | 汽车号，和充电宝推广关联很弱 | 特斯拉搞笑短视频为主，产品推广场景不匹配 |
| Fixperiment king Lab | DIY实验频道，缺少移动电源推广信号 | DIY实验号，近期几乎全是水泵/工具类，和power bank用途不符 |
| Generator Source | 工业发电机频道，与消费级移动电源不匹配 | 工业发电机内容，与便携充电宝受众和场景不匹配 |
| Hidden Camera and Media Listening Devices | 隐藏摄像设备垂类，和充电宝场景不搭 | 隐蔽摄像头内容为主，和充电宝推广明显错位 |
| LALA PITCH TOP | 食品内容，和充电宝推广无关 | 美食/本地促销号，和充电宝受众不匹配 |
| Earn Dada | 有 power bank 标签，但频道主线是金融/游戏，适配差 | 标题多为赚钱应用/矿工游戏，‘power bank’只是词面碰撞，不适合 |
| Fish's Joy | 娱乐+动物向内容，与移动电源推广明显不符 | 娱乐动物向频道，和充电宝推广场景明显不匹配 |
| DK Earner | 加密挖矿频道，和充电宝推广无关 | 以挖矿/赚钱内容为主，和充电宝推广明显不匹配 |
| BLOXBRAIN | 政军资讯/短视频内容，与充电宝推广不符 | 新闻军事向，受众和充电宝促销明显不匹配 |
| Life Hacker | 娱乐搞笑内容为主，缺少产品推广场景 | 娱乐短视频为主，内容形态与电源类商品推广明显不匹配 |
| 2Cents | 无标签，缺少任何相关或推广能力信号 | 杂项内容为主，近期无数码充电类推广信号 |
| Robert Le | 财经外汇频道，与充电宝推广无关 | 博彩/外汇频道，近期10条几乎全不相关 |
| xonotrix | 仅有 hobby 泛标签，和充电宝关联很弱 | 近10条几乎全是AI/旅行/书摘，和充电宝无关 |
| Ethio_2JAR | 无标签无内容，缺少相关性 | 泛商品带货频道，缺少充电宝相关证据 |
| Cleo🎀 | 无标签无内容，无法判断适配 | 近期全部为系统安装/相机等无关内容，明显不适合 |
| TheComputerGuyDR | 无标签无内容证据 | 偏科技新闻和游戏，缺少充电宝推广与测评语境 |
| Electro world | 无标签无内容证据 | 纯游戏实况，和移动电源推广场景不匹配 |
| Awesome Marketplace | 时尚向频道，与充电类产品场景不匹配 | 时尚卖场型账号，近期以服装和补充剂为主，偏离充电类产品 |

## nox@promotion-capacity-v1-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 14 | GOODaaa Official | 0 | 无标签无内容信号，相关性不足 |
| 20 | The Ghetographer | 0 | 无标签无内容信号，相关性不足 |
| 21 | Tools and Gadgets | 0 | 标签全是游戏/平台词，缺少电子产品推广语境 |
| 29 | Joseph Singer | 0 | 无标签无内容，缺少任何相关信号 |
| 31 | Today's Deals | 0 | 无标签无视频，相关性不足 |
| 35 | Ivan Meneses | 0 | 无相关信号 |
| 41 | HW Mobiles | 0 | 无标签无视频证据，难判断为可推广充电宝频道 |
| 43 | Shah Chisty | 0 | 信息缺失，无法判断为充电宝推广相关频道 |
| 46 | NeoTechi | 0 | 教育内容与充电宝推广场景不匹配 |
| 49 | entertainment gadget | 0 | 娱乐向信息不足，缺少产品推广适配信号 |
| 54 | Luis Enrique Lemus Acosta | 0 | 无有效标签和内容信号，难判断为相关频道 |
| 63 | Ah Tech | 0 | 无标签无内容，缺少可判断的充电宝推广信号 |
| 64 | JJCoolStuff | 0 | 无标签无内容，缺少可判断的充电宝推广信号 |
| 69 | HOT DIGITAL | 0 | 无标签无内容，缺少可判断的充电宝推广信号 |
| 70 | BOXscape | 0 | 无标签无内容，缺少可判断的充电宝推广信号 |
| 72 | Dan Reviews Stuff | 0 | 标签与视频证据都缺失，无法判断充电宝推广相关性 |
| 79 | AE Insider | 0 | 证据不足，无法看出充电宝推广受众或内容能力 |
| 82 | eROCS | 0 | 无标签无视频证据，无法判断为电源类推广频道 |
| 83 | ToolStacked | 0 | 无标签无视频证据，相关性不足 |
| 86 | Best Reviews | 0 | 缺少标签和视频证据，只有泛化名称，判断偏弱 |
| 92 | Insight Reviews | 0 | 缺少标签和视频证据，难判断具备推广承接能力 |
| 95 | Objectively Curious | 0 | 缺少标签和视频证据，相关性不足 |
| 97 | Smart Gadget Haven | 0 | 缺少标签和视频证据，相关性不足 |
| 111 | Denise Blackburn | 0 | 无标签、无内容，无法支持充电宝推广。 |
| 118 | Licious | 0 | 无标签无内容，无法判断相关性。 |
| 131 | NDA Hack | 0 | 无相关标签与内容，和power bank推广不匹配 |
| 133 | Mind Over Machine | 0 | 无标签无视频证据，无法支持power bank推广 |
| 136 | TopReviewPro | 0 | 缺少标签与内容证据，难判断为power bank相关 |
| 159 | Top News ET - ቶፕ ኒውስ ኢት | 8 | 新闻娱乐频道命中关键词，但推广场景不稳定 |
| 183 | Supercar Street Racing | 1 | 赛车内容为主，和充电宝推广场景不够贴合 |

## xtb@promotion-capacity-v1-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 38 | YURA VIKA TESLA⚡️ | -5 | 汽车技巧频道，充电宝标签疑似蹭词，近期全不相关 |
| 43 | Xiaofu Power-Ivy Lian | -15 | 电动车充电器领域，和移动电源受众不匹配 |
| 44 | Video Play Sound | -9 | 旅行铁路娱乐向，缺少数码评测/购买意图 |
| 58 | Shurchi Savdo Nodirshox | -6 | 仅有泛科技词，近期内容多是教程杂项 |
| 63 | First Power Technology | -22 | 工业叉车充电主题，和消费级移动电源不匹配 |
| 142 | Celebrity Mirror | -5 | 最近10条全是名人八卦/人生故事，明显不是产品推广场景 |
| 165 | Andrew Fraser | 10 | 纪实/野外人文频道，和充电宝购买推广几乎不相干 |
| 194 | The Rock Bands | -2 | 短视频爽感清洁内容为主，强格式不适配产品推广 |
| 195 | Valera Mironenko | 0 | 地域交通历史为主，和充电宝推广场景关联很弱 |
| 201 | Black Nicholas | -9 | 科技/游戏混合号，近10条全是GTA，和充电宝推广错位 |
| 208 | ALABAYCHIC | -6 | DIY电池教程为主，偏动手实验，不像消费品推广号 |
| 229 | Flipphead | -10 | 几乎全是海滩/冲浪内容，和移动电源推广无关 |
| 262 | ALEXANDRIA PRODUCT | -10 | 手表选品号，和充电宝品类无关，近期内容也完全错位 |
| 285 | We Go To Festivals | -10 | 节庆安全内容与充电宝推广场景不匹配 |
| 326 | Ackeem Sterling | -4 | 近10条几乎全是旅行/风景内容，缺少产品推广能力 |
| 328 | TEST COMPARISONS | -6 | 标签偏科技评测，但近期内容是网络技巧/免费流量，和充电宝不匹配 |
| 336 | Chann Savin | -10 | 黄金珠宝内容为主，与充电宝推广几乎无关 |
| 344 | Ocoopa | -9 | 主做暖手宝和加热垫，与移动电源品类不匹配 |
| 372 | Digital Nomad Success Guide | -10 | 自由职业内容，和充电宝促销几乎无关 |
| 389 | Computer Tech Point | -8 | 以科普短视频为主，缺少选购、测评或带货信号 |
| 393 | Diy Electronics Bro | -10 | 近期内容几乎全是日常叙事，和充电宝推广不匹配 |
| 431 | Aliexpress Bahrain | -10 | 全是无关商品铺货，近期10条也未见充电宝相关 |
| 448 | Sam Maney | -10 | 生活/音乐频道，近期内容几乎全不相关 |
| 454 | Golden Flow Melodies | -25 | ASMR/疗愈音乐频道，与实体产品推广格式强冲突 |
| 471 | Motor Mastery | -8 | 车修内容为主，科技相关仅弱相关，近期也不匹配 |
| 474 | Funny Never Expected 496 | -23 | 剧情娱乐/ASMR为主，和充电宝推广格式冲突 |
| 480 | Creative Idea Buzz | -8 | DIY电机/发电项目为主，和充电宝推广场景不符 |
| 493 | RisoFan | 0 | 消费电子标签存在，但最新内容转向玩具收藏，失配严重 |
| 494 | Best Couple Gift | -10 | 睡衣内衣试穿号，和充电宝推广场景不符 |

## Notes
- Page-level rates use `page_size` from each run metadata.
- Cause categories are heuristic clusters from `why_short`; review representative rows before making product decisions.
