# Channel Search Provider Comparison

- keyword: pet food
- platform: youtube
- country: US
- left: nox@promotion-capacity-v1 (tmp/channel-search-review/20260526-nox-vs-xtb-10kw-youtube-us-front10-promotion-capacity-v1/pet-food/nox-youtube)
- right: xtb@promotion-capacity-v1 (tmp/channel-search-review/20260526-nox-vs-xtb-10kw-youtube-us-front10-promotion-capacity-v1/pet-food/xtb-youtube)
- left_rule_version: promotion-capacity-v1
- right_rule_version: promotion-capacity-v1
- left_prompt_hash: b87da85cf79a
- right_prompt_hash: b87da85cf79a

## Run Overview
| run | provider | rule_version | total | fit | adjacent | badcase | badcase率 | <0 | 0-9 | 10-19 | 20+ |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| nox@promotion-capacity-v1 | nox | promotion-capacity-v1 | 500 | 88 | 203 | 209 | 41.8% | 52 | 323 | 69 | 56 |
| xtb@promotion-capacity-v1 | xtb | promotion-capacity-v1 | 500 | 136 | 169 | 195 | 39.0% | 264 | 92 | 70 | 74 |

## Page-Level Badcase Rate
| page | nox@promotion-capacity-v1_total | nox@promotion-capacity-v1_badcase | nox@promotion-capacity-v1_badcase率 | xtb@promotion-capacity-v1_total | xtb@promotion-capacity-v1_badcase | xtb@promotion-capacity-v1_badcase率 | badcase率差 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 50 | 12 | 24.0% | 50 | 10 | 20.0% | 4.0% |
| 2 | 50 | 17 | 34.0% | 50 | 19 | 38.0% | -4.0% |
| 3 | 50 | 17 | 34.0% | 50 | 17 | 34.0% | 0.0% |
| 4 | 50 | 19 | 38.0% | 50 | 19 | 38.0% | 0.0% |
| 5 | 50 | 22 | 44.0% | 50 | 22 | 44.0% | 0.0% |
| 6 | 50 | 22 | 44.0% | 50 | 21 | 42.0% | 2.0% |
| 7 | 50 | 22 | 44.0% | 50 | 21 | 42.0% | 2.0% |
| 8 | 50 | 23 | 46.0% | 50 | 22 | 44.0% | 2.0% |
| 9 | 50 | 31 | 62.0% | 50 | 23 | 46.0% | 16.0% |
| 10 | 50 | 24 | 48.0% | 50 | 21 | 42.0% | 6.0% |

## Badcase Overlap
| metric | count |
| --- | --- |
| shared_badcase | 112 |
| nox@promotion-capacity-v1_only_badcase | 97 |
| xtb@promotion-capacity-v1_only_badcase | 83 |

## Badcase Cause Summary
| provider | category | count |
| --- | --- | --- |
| nox@promotion-capacity-v1 | 宠物/动物受众冲突 | 139 |
| nox@promotion-capacity-v1 | 其他 | 24 |
| nox@promotion-capacity-v1 | 证据缺失或信号不足 | 23 |
| nox@promotion-capacity-v1 | 泛相关性偏离 | 13 |
| nox@promotion-capacity-v1 | 娱乐/儿童/泛内容偏离 | 10 |
| xtb@promotion-capacity-v1 | 宠物/动物受众冲突 | 178 |
| xtb@promotion-capacity-v1 | 其他 | 10 |
| xtb@promotion-capacity-v1 | 娱乐/儿童/泛内容偏离 | 5 |
| xtb@promotion-capacity-v1 | 证据缺失或信号不足 | 1 |
| xtb@promotion-capacity-v1 | 泛相关性偏离 | 1 |

## Shared Badcases
| channel | nox@promotion-capacity-v1 | xtb@promotion-capacity-v1 |
| --- | --- | --- |
| ShoppingTv | 空标签空内容，缺少任何相关信号 | 有宠物食品标签，但最近全是ASMR货架走访，推广格式不匹配 |
| Gadget Fusion 5 | 无宠物食品相关标签或内容，基本不相关 | 标签有宠物食品，但最近内容是汽车踏板升级，受众完全偏离 |
| Kiki and Bonbon | 宠物吃播/ASMR，物理宠物食品推广场景不匹配 | ASMR吃播格式，属于强不匹配 |
| Wutelz | 游戏频道，与宠物食品推广完全不相关 | 纯游戏频道，和宠物食品推广无关 |
| Pet Reacts: LOL Edition! | 动画娱乐向，缺少宠粮推广场景 | 宠物娱乐反应号，缺少宠物食品购买/评测语境，近10条均不匹配 |
| Ideal Farming | ASMR农场向，和宠粮推广形式不匹配 | 农场ASMR/水果内容，和宠物食品推广不匹配 |
| Eating Dogs | 娱乐向内容，推广宠粮场景偏差大 | 以人类吃播/娱乐为主，和宠物食品推广场景不匹配 |
| Rocket The Iguana | ASMR娱乐为主，和宠粮推广格式冲突 | 爬宠+ASMR娱乐，缺少宠物食品推广场景 |
| Wild Hoshi | ASMR格式与宠物食品推广明显不匹配 | 偏ASMR/生存娱乐，和宠物食品推广场景不匹配 |
| Bicolana Sa America | 以翻找食物为主，与宠物食品推广不符 | 以垃圾箱探宝为主，缺少正常购买或评测宠物粮语境 |
| Li Mo | ASMR/舒缓型内容，与宠物食品推广场景不匹配 | ASMR/解压风格强，和宠物食品推广格式不匹配 |
| Bà Già Review | 偏家常做菜内容，缺少宠物受众和喂养场景 | 以人类美食/剧情为主，和宠物食品推广场景不匹配 |
| Zimal's Diary | 无标签无视频，缺乏可判断的相关性 | 无标签、无相关内容，近期基本都是无关短视频 |
| BETTER LIFE PHILLIPINES | 旅行灵异类内容，与宠粮推广不相关 | 主业是旅行/灵异，宠物词很少，近10条与宠粮无关 |
| Diablo Ruby & Bane | 美食号为主，与宠物食品受众不匹配 | 偏宠物食品加工设备B2B，不是消费推广频道 |
| sen sen | 生活娱乐向，缺少宠物食品相关信号 | 娱乐短视频为主，宠物标签弱，缺少宠物食品场景 |
| KABOOM! | 泛娱乐加生活窍门，和宠物食品关联弱 | 与宠物食品主题无关，近期内容也是娱乐和挑战 |
| More Media Production | 科技拍摄向，和宠物食品基本无关 | 科技教程与乐器/MV为主，和宠物食品无关 |
| UNIQUE CREATIVITY | 电影娱乐向，和宠物食品不匹配 | 娱乐向猫视频，和宠物粮推广格式不匹配 |
| Flurry Bureau | 无标签无视频，缺少可判断的宠物食品证据 | ASMR野生动物喂食风格，明显不是宠物食品推广场景 |
| JUNINZ FF | 游戏梗内容为主，与宠粮推广基本无关 | 游戏脑洞内容为主，和宠物食品推广距离大 |
| Sylvania News | 新闻/人类食品向，与宠粮推广场景不匹配 | 新闻/街拍频道，与宠物食品推广相关性很弱 |
| Nano Spark Ai | ASMR/搞笑食品号，和宠物食品推广场景不匹配 | ASMR/AI为主，仅有泛食品词，和宠物粮推广不匹配 |
| Jackie Bites | 无标签无内容证据，缺少可用受众信号 | 宠物娱乐短视频为主，缺少粮食/喂养购买语境 |
| Landpack Packing Filling Machine | 工业包装机械号，和宠物食品推广目标不符 | 机械包装频道，虽提到宠物食品线体，但不适合宠物粮推广 |
| Elaaf's Gallery | 宠物内容里夹ASMR/mukbang，商品推广格式不合适 | 狗吃播/ASMR占主导，和宠物食品推广格式不匹配 |
| SM 4Music | 娱乐音乐号，仅有泛食物/宠物词，推广相关性弱 | 以音乐娱乐为主，缺少宠物食品推广语境 |
| mrsmel269 | ASMR格式强冲突，和宠物食品推广不合 | 车/ASMR频道，几乎没有宠粮受众 |
| SHANGHAI FUBO PACKAGING MACHINERY | 工业包装机械号，和宠物食品推广不匹配 | 包装机械频道，非宠物食品消费/推广场景 |
| 🫶J.T.C🫶  Jerome The Creator | 无标签无视频证据，相关性不足 | 足球娱乐频道，和宠物食品推广几乎无关 |

## nox@promotion-capacity-v1-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 7 | My Cute Pomeranian | -15 | 故事/惊悚娱乐为主，与宠物食品推广明显不符 |
| 11 | BalchemANH | 0 | 泛科普与农业向，缺少宠物食品推广语境 |
| 16 | Poodle Family | 0 | 无标签无内容信号，无法判断相关性 |
| 20 | Gunbam Cutie | 5 | 直接命中但ASMR/睡眠格式冲突，适合度偏低 |
| 21 | Golden Retriever Duobao | 0 | 无标签与内容线索，缺少宠物食品推广相关性 |
| 58 | PKT UP | -15 | 娱乐答题频道，和宠粮推广不匹配 |
| 60 | Me Ai  Animation TV | 0 | 无标签无内容，缺少相关性证据 |
| 67 | SIMA TH 92 | 0 | 宠物词只在尾部露出，主题基本不相关 |
| 91 | KingOfAquariums | 0 | 反应娱乐向，和宠物食品无关 |
| 112 | Dog Mukbang ASMR | -12 | ASMR/mukbang格式与宠物食品推广不符 |
| 114 | Steven Wiseblood | 0 | 无标签无视频，缺乏任何相关信号 |
| 124 | Vườn xanh - Bếp vui của My | 0 | 无标签无内容证据，无法判断相关性 |
| 151 | Vannak-kh | 0 | 无宠粮相关信号 |
| 156 | DEWCO CREATIVE SOLUTIONS | 0 | 无宠粮相关信号 |
| 171 | Diane - The Canning Nana | 1 | 人用罐藏/食谱频道，和宠物食品投放不匹配 |
| 173 | Darin Food & Feed Treats MFG Tech 达润食品生产科技 | 0 | 偏食品生产技术，面向B2B而非宠物食品推广 |
| 180 | EL LIFESTYLE USA | 1 | 音乐娱乐频道，食品词只是泛标签，匹配差 |
| 184 | SGS North America | 0 | 无标签无视频，无法判断为宠物食品相关 |
| 187 | The Freeze Dried Business | 1 | 冻干食品生意向，但无宠物语境，品类偏离 |
| 199 | Herpin Hippie | -14 | 爬宠/野生动物受众过窄，与常规宠物食品推广不匹配 |
| 204 | Strobigo | 0 | 无宠物或宠粮相关信号 |
| 205 | TurtleJeepJen | 0 | 无相关标签与内容证据 |
| 215 | FabiJan | 0 | 信息过少，无法判断为宠物食品相关频道 |
| 217 | Li Susie | 0 | 缺少可用标签与视频证据，相关性无法成立 |
| 223 | Tom and Jerry 55 | 0 | 无标签无视频，和宠物食品推广无明显关联 |
| 231 | Real Alex Clark | 2 | 泛生活频道，缺少宠物受众和宠物食品意图 |
| 256 | Skibidi Shorts YT | 0 | 无有效标签和宠物相关信号 |
| 259 | Gubba Homestead | 0 | 家居烹饪向，缺少宠物受众 |
| 273 | Gotcha! | 0 | 育儿娱乐向，和宠物食品受众基本不相关 |
| 279 | LAURA N NEW YORK | 1 | 趋势杂内容，宠物食品相关信号太弱 |

## xtb@promotion-capacity-v1-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 2 | Freshpet | 8 | 品牌广告号为主，非独立创作者推广场景 |
| 9 | Haoren Special Effects | -5 | AI特效娱乐号，宠物食品标签不构成推广匹配 |
| 10 | Petify TV | 1 | 宠物吃播/娱乐为主，缺少真正的宠粮推广内容 |
| 14 | monkeyjourney36 | -7 | 主体是AI故事娱乐，虽偶有狗粮标题但不适合投放 |
| 24 | FxcTablaDholak | -4 | 娱乐化狗吃播/mukbang，产品推广场景不合适 |
| 33 | TasteOfOriental | -7 | 街头美食与狗肉娱乐为主，和宠物食品推广目标不符 |
| 38 | Jakshylyk | -8 | 泛娱乐账号，少量狗/食物标签不足以支撑宠物食品推广 |
| 51 | ZyroRushUSA | -8 | 主轴为宗教娱乐，宠物食品相关性弱 |
| 63 | Duan | -17 | 主要是搞笑短剧，少量狗抢食片段不足以支撑推广 |
| 66 | Murgigio | -25 | 狗狗娱乐和搞笑为主，明显缺少商品评测或购买引导 |
| 68 | Unique Fact Store | -20 | 宠物梗图娱乐属性很强，和宠粮推广目标不匹配 |
| 70 | Jamish the Wanderer | -14 | 人类美食/咖啡/ASMR频道，和宠物粮类目不匹配 |
| 75 | carefresh | -9 | 小宠垫料频道，和宠物食品关联很弱 |
| 76 | GOOD FOOD | -20 | 做菜卡通娱乐向，缺少宠物食品推广语境 |
| 77 | HelpPets KH | -20 | 围绕狗抢食的剧情，不是宠物食品推广 |
| 78 | Albe Know | -10 | 金融频道，仅有宠物吃食梗，无推广相关性 |
| 81 | CAM-LIVES | -10 | 吃播/杂食内容为主，缺少宠物食品受众和转化场景 |
| 87 | BanterHits | -25 | 娱乐剧情为主，宠物内容只是点缀，不适合宠物食品推广 |
| 90 | VidVulture | -25 | 拾荒寻宝频道与宠物食品推广目标明显偏离 |
| 92 | Ăn Dặm Cùng Con | -18 | 婴儿吃播娱乐号，和宠物食品投放不匹配 |
| 93 | Delvix Pet | -5 | 宠物狗频道，但主内容是催眠音乐，推广格式不匹配 |
| 96 | Roselin Ramos | -9 | 偏日常美食和杂项内容，缺少宠物食品投放线索 |
| 97 | Pets Grow | -10 | 动物娱乐号偏ASMR，不适合宠物食品推广 |
| 98 | Facts & Reality | -20 | 情感救助短视频号，和宠物食品推广场景不符 |
| 105 | FunnyPet | -19 | ASMR宠物娱乐号，虽有猫粮话题但格式与产品推广严重错位 |
| 109 | Emma Williams | -20 | ASMR/舒缓音频号，属于强格式错配，不适合宠物食品 |
| 110 | Nitean KKN | -17 | 音乐/娱乐为主，偶有动物内容，但与宠物食品推广不匹配 |
| 113 | AB12TV | -8 | 内容混杂且以宗教/泛娱乐为主，宠物食品相关性低 |
| 116 | ETaPURoth | -25 | ASMR吃食音效为主，明显不适合做宠物食品推广 |
| 119 | Primal Code | -25 | 吃播挑战娱乐为主，和宠物食品推广形式不符 |

## Notes
- Page-level rates use `page_size` from each run metadata.
- Cause categories are heuristic clusters from `why_short`; review representative rows before making product decisions.
