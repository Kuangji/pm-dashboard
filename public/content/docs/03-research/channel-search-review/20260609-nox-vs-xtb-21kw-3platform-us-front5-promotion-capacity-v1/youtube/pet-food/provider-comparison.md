# Channel Search Provider Comparison

- keyword: pet food
- platform: youtube
- country: us
- left: nox@prompt:b87da85cf79a (/Users/yukuangji/Work/NoxInfluencer/pm-workspace/drafts/tmp/channel-search-review/20260609-nox-vs-xtb-21kw-3platform-us-front5-promotion-capacity-v1/youtube/pet-food/nox-youtube)
- right: xtb@prompt:b87da85cf79a (/Users/yukuangji/Work/NoxInfluencer/pm-workspace/drafts/tmp/channel-search-review/20260609-nox-vs-xtb-21kw-3platform-us-front5-promotion-capacity-v1/youtube/pet-food/xtb-youtube)
- left_rule_version: prompt:b87da85cf79a
- right_rule_version: prompt:b87da85cf79a
- left_prompt_hash: b87da85cf79a
- right_prompt_hash: b87da85cf79a

## Run Overview
| run | provider | rule_version | total | fit | adjacent | badcase | badcase率 | <0 | 0-9 | 10-19 | 20+ |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| nox@prompt:b87da85cf79a | nox | prompt:b87da85cf79a | 250 | 59 | 90 | 101 | 40.4% | 42 | 138 | 29 | 41 |
| xtb@prompt:b87da85cf79a | xtb | prompt:b87da85cf79a | 250 | 62 | 88 | 100 | 40.0% | 25 | 154 | 33 | 38 |

## Page-Level Badcase Rate
| page | nox@prompt:b87da85cf79a_total | nox@prompt:b87da85cf79a_badcase | nox@prompt:b87da85cf79a_badcase率 | xtb@prompt:b87da85cf79a_total | xtb@prompt:b87da85cf79a_badcase | xtb@prompt:b87da85cf79a_badcase率 | badcase率差 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 50 | 21 | 42.0% | 50 | 20 | 40.0% | 2.0% |
| 2 | 50 | 14 | 28.0% | 50 | 24 | 48.0% | -20.0% |
| 3 | 50 | 21 | 42.0% | 50 | 14 | 28.0% | 14.0% |
| 4 | 50 | 20 | 40.0% | 50 | 22 | 44.0% | -4.0% |
| 5 | 50 | 25 | 50.0% | 50 | 20 | 40.0% | 10.0% |

## Badcase Overlap
| metric | count |
| --- | --- |
| shared_badcase | 56 |
| nox@prompt:b87da85cf79a_only_badcase | 45 |
| xtb@prompt:b87da85cf79a_only_badcase | 44 |

## Badcase Cause Summary
| provider | category | count |
| --- | --- | --- |
| nox@prompt:b87da85cf79a | 宠物/动物受众冲突 | 65 |
| nox@prompt:b87da85cf79a | 证据缺失或信号不足 | 19 |
| nox@prompt:b87da85cf79a | 其他 | 12 |
| nox@prompt:b87da85cf79a | 娱乐/儿童/泛内容偏离 | 3 |
| nox@prompt:b87da85cf79a | 泛相关性偏离 | 2 |
| xtb@prompt:b87da85cf79a | 宠物/动物受众冲突 | 60 |
| xtb@prompt:b87da85cf79a | 其他 | 16 |
| xtb@prompt:b87da85cf79a | 证据缺失或信号不足 | 15 |
| xtb@prompt:b87da85cf79a | 娱乐/儿童/泛内容偏离 | 7 |
| xtb@prompt:b87da85cf79a | 泛相关性偏离 | 2 |

## Shared Badcases
| channel | nox@prompt:b87da85cf79a | xtb@prompt:b87da85cf79a |
| --- | --- | --- |
| BalchemANH | 偏农业/科学讨论，非宠物食品投放场景 | 偏动物科学与农业，不是宠物食品受众 |
| Haoren Special Effects | 泛娱乐/生活方式为主，和宠粮推广不匹配 | 娱乐/影视向，缺少宠物食品购买场景 |
| Shaq The Pug | 家庭娱乐向，缺少宠物食品消费语境 | 娱乐/游戏向，宠粮推广意图弱 |
| China Saibainuo Machinery | 机械/技术向，和宠物食品投放关联弱 | 有food和pets，但机械/工业定位不匹配 |
| Kiki and Bonbon | ASMR/mukbang 宠物吃播，偏娱乐不偏商品推广 | 宠物向但以ASMR/mukbang为主，不适合商品推广 |
| Wutelz | 游戏频道，与宠物食品无关 | 游戏频道，标签全是手游竞技，和宠物食品推广完全不相关 |
| Bonbon Culinary Expert | 动物吃播搞笑向，缺少宠物食品购买语境 | 动物娱乐向，缺少宠物食品推广语境 |
| Ideal Farming | ASMR 农场放松向，和宠物食品推广格式不匹配 | 农业内容，与宠物食品推广不匹配 |
| Me Ai  Animation TV | 无有效标签，无法判断为宠物食品相关 | 动画频道，与宠物食品无关 |
| SIMA TH 92 | 无有效宠物或食品标签，相关性不足 | 生活化杂内容，宠物标签太弱，不像宠粮渠道 |
| Wild Hoshi | ASMR+生活方式混杂，且不是宠物食品导向 | ASMR/生活化内容与宠粮投放强冲突 |
| Bicolana Sa America | 捡食/垃圾寻食内容，和宠物食品投放不匹配 | 倒垃圾/捡食内容，和宠粮推广相关性很弱 |
| Li Mo | ASMR听感型频道，属于强格式不匹配 | ASMR格式和实体宠物食品推广明显错位 |
| Penguin Berry | 企鹅/娱乐型频道，缺少宠物粮受众 | 企鹅娱乐内容，和宠物食品购买场景不匹配 |
| Happy Heart_Home Sanctuary | 马驴马驹向频道，和宠物粮受众不符 | 马驴牧养向，和宠物食品投放人群明显错位 |
| Zimal's Diary | 无有效宠物食品信号，相关性不足 | 缺少标签和内容线索，宠物食品相关性不足 |
| Diablo Ruby & Bane | 人类食物频道，和宠物食品投放不匹配 | 泛食物内容，缺少宠物相关证据 |
| BETTER LIFE PHILLIPINES | 历史旅游猎奇向，和宠物食品投放无关 | 旅行历史鬼怪向，与宠物食品无关 |
| More Media Production | 科技/摄像频道，与宠物食品无关 | 科技频道，与宠物食品无关 |
| Flurry Bureau | 无标签与内容证据，难判断为相关频道 | 无相关标签，内容意图不明 |
| PKT UP | 问答娱乐频道，与宠物食品无关 | 与宠物食品无明显相关 |
| Sylvania News | 泛食品新闻/菜谱频道，与宠物食品不匹配 | 新闻号，不是宠物食品创作者场景 |
| Steven Wiseblood | 无标签和内容证据，相关性不足 | 无标签、无相关视频，缺少宠物食品推广信号 |
| Vườn xanh - Bếp vui của My | 无标签与内容证据，相关性不足 | 无宠物或营养相关证据 |
| Dog Mukbang ASMR | ASMR吃播格式与宠物食品推广明显不匹配 | ASMR/mukbang形态与商品推广严重不匹配 |
| Nano Spark Ai | ASMR娱乐内容，不适合宠物食品推广 | ASMR/娱乐向为主，且缺少宠物食品语境 |
| Landpack Packing Filling Machine | 包装机械账号，与宠物食品推广目标基本无关 | 包装机械向，和宠粮消费受众错位 |
| SM 4Music | 搞笑娱乐号，只有泛宠物/食物标签，投放转化弱 | 娱乐/吃播向，只有泛宠物标签 |
| Jackie Bites | 无标签无内容，证据不足 | 无标签，无法确认宠粮相关性 |
| SHANGHAI FUBO PACKAGING MACHINERY | 包装设备号，主内容是机器和封口包装，不适合宠物食品推广 | 包装机械向，和宠粮投放受众错位 |

## nox@prompt:b87da85cf79a-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 8 | My Cute Pomeranian | -12 | 恐怖故事/短视频向，和宠物食品推广不符 |
| 14 | Trytn Aimin | 5 | 虽有宠粮词，但剧情娱乐属性太重 |
| 17 | Poodle Family | 0 | 无可用标签与内容证据 |
| 20 | ShoppingTv | 0 | 无标签与内容证据，无法判断 |
| 21 | M ajmal official | 4 | 有宠粮词，但娱乐搞笑属性压过转化 |
| 23 | Golden Retriever Duobao | 0 | 无标签与内容证据 |
| 27 | Meal Buddy | 8 | 主轴是人类餐食配送，pet food 更像噪声标签 |
| 29 | Gunbam Cutie | 8 | ASMR 宠物吃播，偏体验内容，不是食品推广场景 |
| 33 | Gadget Fusion 5 | 0 | 无相关标签或内容信号 |
| 38 | Timmy mc | -8 | 野生动物/狩猎/娱乐向，和宠物食品受众不匹配 |
| 39 | Lovely colors | 9 | 狗吃播短视频，格式偏娱乐，不是食品推广场景 |
| 40 | RAW FARM | 7 | 主轴是 raw milk/raw food，人宠食品语境不清 |
| 49 | Pet Reacts: LOL Edition! | -6 | 动画娱乐频道，缺少宠物食品相关性 |
| 50 | Cancer Relief Fund ♋️ 🦀 | 1 | 猫相关但主题是募资/健康，不是宠物食品 |
| 81 | Bà Già Review | -6 | 人类美食频道，和宠物食品投放不匹配 |
| 95 | sen sen | 0 | 泛生活频道，缺少宠物食品相关信号 |
| 100 | KingOfAquariums | -6 | 娱乐反应类频道，缺少宠物食品信号 |
| 102 | KABOOM! | 0 | 搞笑生活技巧频道，缺少宠物食品相关性 |
| 104 | UNIQUE CREATIVITY | 0 | 娱乐电影频道，与宠物食品无关 |
| 105 | Chihuahua Bites | 0 | 无标签和视频证据，相关性不足 |
| 108 | JUNINZ FF | 0 | 游戏脑洞频道，宠物食品相关性很弱 |
| 130 | mrsmel269 | -12 | ASMR+生存内容，和宠物食品推广格式不匹配 |
| 135 | CloverPurse | -5 | 捡垃圾/囤货内容，与宠物食品推广关联很弱 |
| 146 | Rebecca’s Beautiful ASMR Addiction | -15 | 纯ASMR放松号，和宠物食品推广明显不匹配 |
| 154 | Shift Happens©™️ | 0 | 娱乐搞笑向，缺少宠物食品相关受众 |
| 162 | Amazing Chinese Gadgets | 0 | 内容与宠物食品无关 |
| 177 | Bruker | 0 | 科研仪器频道，与宠物食品受众不符 |
| 181 | Diane - The Canning Nana | 0 | 罐藏/食谱/储粮人类食品向 |
| 186 | Darin Food & Feed Treats MFG Tech 达润食品生产科技 | 0 | 饲料制造技术B2B向，不是宠物食品创作者 |
| 189 | Herpin Hippie | -10 | 爬宠野生向，非宠物食品主受众 |

## xtb@prompt:b87da85cf79a-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 12 | monkeyjourney36 | -5 | AI短故事/娱乐为主，不适合宠粮推广 |
| 14 | Mars, Incorporated | 0 | 企业号偏商业，缺少宠粮内容 |
| 18 | simply petastic | 0 | 无标签无内容证据 |
| 24 | Moozoda | -5 | 泛娱乐/旅行内容，宠粮相关信号弱 |
| 27 | CuteKitten | 0 | 刀具手工内容，与宠物食品无关 |
| 28 | The Lee Williams Show | 1 | 娱乐访谈类，仅有泛词food |
| 29 | Chihuahua Bites | 0 | 缺少宠物食品相关标签 |
| 31 | The Buck Stop | 0 | 房车旅行内容，无宠粮信号 |
| 32 | Petflix Chef | 0 | 无标签，无法确认宠粮相关性 |
| 33 | Furry Friend's Zone | 0 | 无标签，无法确认宠物食品相关性 |
| 34 | ZyroRushUSA | 0 | 娱乐/宗教类，无宠粮信号 |
| 37 | Pablodanie096 | 0 | 娱乐音乐类，与宠物食品无关 |
| 38 | Henry | 0 | 美发/教育类，无宠粮信号 |
| 43 | Sigaga Namy | 0 | 生日烘焙类，与宠物食品无关 |
| 44 | Duan | 0 | 无标签，无法确认宠粮相关性 |
| 46 | Badlands Ranch by Katherine Heigl | 0 | 无标签，无法确认宠粮相关性 |
| 48 | Unique Fact Store | 0 | 无标签，无法确认宠粮相关性 |
| 53 | carefresh | 0 | 无标签和视频证据，无法判断为宠物食品相关 |
| 54 | GOOD FOOD | 0 | 人类烹饪美食号，与宠物食品受众不匹配 |
| 56 | HAIDER حيدر | 0 | 游戏/人类美食混合，和宠物食品无关 |
| 58 | Albe Know | 0 | 金融频道，和宠物食品推广基本无关 |
| 59 | Exercise with Extra Fries | 0 | 时尚带货号，但缺少宠物受众与宠粮语境 |
| 61 | BanterHits | -15 | 影视娱乐/游戏导向，和宠粮推广明显不搭 |
| 65 | Facts & Reality | 0 | 短视频聚合/科技向，和宠物食品无关 |
| 67 | Nicholas McCuen | 0 | 娱乐健身号，和宠物食品受众不匹配 |
| 69 | CeVille | 0 | 音乐娱乐号，缺少宠物受众 |
| 71 | FunnyPet | -5 | 猫/宠物标签有，但ASMR和娱乐导向明显 |
| 74 | CRAZY FAMILY TUBE | 0 | 家庭捡食/食物浪费内容，和宠粮无关 |
| 75 | Nitean KKN | 0 | 音乐婚礼号，和宠物食品推广无关 |
| 76 | WILD WORLD OF FARLEY | 1 | 仅有pets弱相关，主线是钓鱼与家庭vlog |

## Notes
- Page-level rates use `page_size` from each run metadata.
- Cause categories are heuristic clusters from `why_short`; review representative rows before making product decisions.
