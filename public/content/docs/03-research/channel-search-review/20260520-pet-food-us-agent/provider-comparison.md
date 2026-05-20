# Channel Search Provider Comparison

- keyword: pet food
- platform: youtube
- country: us
- left: nox (tmp/channel-search-review/20260520-pet-food-us-agent/nox-youtube)
- right: debugger (tmp/channel-search-review/20260520-pet-food-us-agent/debugger-youtube)

## Provider Overview
| provider | total | fit | adjacent | badcase | badcase率 | <0 | 0-9 | 10-19 | 20+ |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| nox | 350 | 94 | 146 | 110 | 31.4% | 25 | 234 | 43 | 48 |
| debugger | 350 | 92 | 171 | 87 | 24.9% | 42 | 199 | 72 | 37 |

## Page-Level Badcase Rate
| page | nox_total | nox_badcase | nox_badcase率 | debugger_total | debugger_badcase | debugger_badcase率 | badcase率差 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 50 | 7 | 14.0% | 50 | 6 | 12.0% | 2.0% |
| 2 | 50 | 11 | 22.0% | 50 | 13 | 26.0% | -4.0% |
| 3 | 50 | 14 | 28.0% | 50 | 11 | 22.0% | 6.0% |
| 4 | 50 | 15 | 30.0% | 50 | 11 | 22.0% | 8.0% |
| 5 | 50 | 20 | 40.0% | 50 | 8 | 16.0% | 24.0% |
| 10 | 50 | 21 | 42.0% | 50 | 15 | 30.0% | 12.0% |
| 20 | 50 | 22 | 44.0% | 50 | 23 | 46.0% | -2.0% |

## Badcase Overlap
| metric | count |
| --- | --- |
| shared_badcase | 6 |
| nox_only_badcase | 104 |
| debugger_only_badcase | 81 |

## Badcase Cause Summary
| provider | category | count |
| --- | --- | --- |
| nox | 宠物/动物受众冲突 | 95 |
| nox | 证据缺失或信号不足 | 8 |
| nox | 其他 | 4 |
| nox | 娱乐/儿童/泛内容偏离 | 2 |
| nox | 泛相关性偏离 | 1 |
| debugger | 宠物/动物受众冲突 | 65 |
| debugger | 证据缺失或信号不足 | 8 |
| debugger | 娱乐/儿童/泛内容偏离 | 8 |
| debugger | 其他 | 3 |
| debugger | 泛相关性偏离 | 3 |

## Shared Badcases
| channel | nox | debugger |
| --- | --- | --- |
| PKT UP | 纯娱乐谜题频道，与宠物食品推广不相关 | 挑战/测验型娱乐频道，和宠粮购买转化关联弱 |
| Bicolana Sa America | 以捡食垃圾为主，与宠物粮推广明显不匹配 | 频道核心是捡食和垃圾寻食，和宠物食品推广不匹配 |
| Hen Farm | 频道主题偏农场禽类，不适合宠粮投放 | 频道为养鸡/农场向，缺少宠粮相关信号，推广相关性低 |
| JUNINZ FF | 游戏娱乐频道，和宠物食品推广目标明显不符 | 主体是游戏梗内容，和宠物食品推广明显不匹配 |
| Jinan Arrow Machinery Co., Ltd | 无标签，无宠物或食品相关信号 | 工业挤出机频道，与宠物食品推广场景明显不匹配 |
| Koplo pedia | 频道名偏音乐娱乐，与宠物食品无关 | 无标签无内容，和宠物食品推广缺少相关性 |

## nox-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 6 | My Cute Pomeranian | -9 | 恐怖故事/游戏为主，宠物食品受众明显不匹配 |
| 10 | Haoren Special Effects | -3 | 娱乐型泛内容，宠物食品转化弱 |
| 12 | Shaq The Pug | 0 | 前五标签偏游戏娱乐，和宠物食品投放关联弱 |
| 29 | Gadget Fusion 5 | 0 | 无相关标签和内容，频道更偏数码，和宠物食品推广不匹配 |
| 38 | Wutelz | -15 | 频道为游戏内容，与宠物食品推广场景明显不符 |
| 43 | Pet Reacts: LOL Edition! | -15 | 以动画娱乐为主，宠物食品推广场景不匹配 |
| 46 | Ideal Farming | 0 | 农耕内容为主，与宠物食品推广关联很弱 |
| 61 | Me Ai  Animation TV | 0 | 无宠物食品相关信号 |
| 76 | Li Mo | 2 | 泛食品/ASMR内容，缺少宠物受众 |
| 77 | Bà Già Review | 1 | 人类美食频道，不适合宠物粮推广 |
| 89 | PAP CAT | -15 | 历史旅游鬼屋向，和宠粮投放明显错位 |
| 91 | sen sen | 0 | 生活娱乐向，无宠物或食品信号 |
| 94 | KingOfAquariums | -15 | 娱乐反应号，明显不适合宠物食品推广 |
| 98 | Jackie Bites | 0 | 无标签无内容，无法判断为相关频道 |
| 99 | More Media Production | 0 | 科技教程向，与宠物食品无关 |
| 101 | UNIQUE CREATIVITY | -10 | 娱乐电影向，缺少宠物食品推广相关信号 |
| 103 | Flurry Bureau | 0 | 无标签无近期内容，无法支撑投放判断 |
| 106 | EL LIFESTYLE USA | -15 | 音乐娱乐向，明显不适合宠物食品推广 |
| 118 | Steven Wiseblood | 0 | 缺少宠粮相关标签与内容，暂无推广相关证据 |
| 123 | Nano Spark Ai | 1 | AI娱乐向，只有泛食品词，缺少宠物消费场景 |
| 127 | Landpack Packing Filling Machine | -14 | 工业包装设备频道，不适合宠物食品推广 |
| 131 | Hong Seakmeng | -3 | 娱乐搞笑频道，只有泛宠物/食物标签，缺少宠物食品推广意图 |
| 132 | mrsmel269 | 0 | 标签与宠物食品无关，缺乏推广相关性 |
| 133 | Vườn xanh - Bếp vui của My | 0 | 频道偏烹饪/园艺向，未见宠物食品或宠物受众信号 |
| 135 | SHANGHAI FUBO PACKAGING MACHINERY | 1 | 以包装机械为主，和宠物食品推广目标不匹配 |
| 139 | 🫶J.T.C🫶  Jerome The Creator | 0 | 无宠物食品相关标签或内容，频道定位泛创作者，推广相关性弱 |
| 146 | Elephant | 0 | 无宠粮相关标签或内容，缺少推广相关性证据 |
| 149 | Rebecca’s Beautiful ASMR Addiction | -15 | 频道是ASMR助眠内容，和宠物食品推广受众不相关 |
| 152 | Vannak-kh | 0 | 无标签无内容，无法判断宠物食品相关性 |
| 156 | Furry Watch | 0 | 无标签无内容，无法判断宠物食品相关性 |

## debugger-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 13 | ShoppingTv | 20 | 标签杂乱，宠物粮像噪声，不适合投放 |
| 35 | Bounce The Pit Bull | -10 | ASMR吃播导向，偏娱乐不适合卖宠物食品 |
| 36 | CuteKitten | 2 | 锻造/刀具为主，仅有猫标签，宠物食品相关性弱 |
| 38 | Chihuahua Bites | 0 | 无标签无内容证据，无法判断宠物食品相关性 |
| 42 | Henry | 0 | 发型喜剧频道，缺少宠物食品相关受众 |
| 47 | Zooologist | -15 | 野生动物对抗内容，和宠物食品推广场景不匹配 |
| 64 | AB12TV | 0 | 宗教/趋势为主，和宠物食品投放无关 |
| 70 | Nutrena | -10 | 前5标签主打家禽饲料，不适合宠物食品投放 |
| 78 | Winter Munoz | -15 | 二次元/娱乐向，和宠物食品推广基本无关 |
| 84 | Miqaju Chilobe | -15 | 纯娱乐短视频，和宠粮推广目标明显不符 |
| 85 | Penguin Berry | -5 | 以企鹅等动物娱乐为主，不适合宠物食品推广 |
| 88 | li li ai | 0 | 无有效标签与内容证据，无法判断为宠粮相关 |
| 89 | Ana's Personal Vlog | 0 | 生活记录为主，宠物食品推广相关性弱 |
| 91 | Puerto Rican David Torres Jr | 0 | 旅行游戏为主，宠物词分散且无宠粮意图 |
| 95 | Daily Savage Fun | 0 | 无标签，且名称偏娱乐，难支撑宠粮推广 |
| 99 | Dr. Pol Presents | -3 | 兽医娱乐节目属性强，非宠粮转化场景 |
| 104 | Crazy Pig | -3 | 以猪内容为主，和宠粮投放受众不匹配 |
| 108 | Dumpster Diving Rookie | 0 | 以捡漏搬运为主，缺少宠粮相关受众 |
| 109 | All in One Garden and Kitchen | 2 | 偏人类餐饮与旅行内容，和宠粮投放不对口 |
| 110 | DAVE | -14 | 娱乐游戏向明显，宠粮转化场景很弱 |
| 118 | Ming Ming De Mi Ni Chu Fang | -15 | 主体是儿童玩具和迷你厨房，与宠物食品推广明显不符 |
| 125 | Auranest | 0 | 家居健康类频道，与宠物食品推广不匹配 |
| 127 | VLGM | 3 | 动物故事/AI内容偏娱乐，不适合食品推广 |
| 133 | Curtis Bryant Jr. | -15 | 娱乐动画频道，缺少宠物食品推广语境，明显不匹配 |
| 135 | Nizage Gojoqu | 0 | 无标签和视频证据，无法支持宠物食品推广相关性 |
| 137 | ANIMAL MIX CHANNEL2 | -13 | 娱乐吃播为主，缺少宠物饲料/宠物照护信号，不适合投放宠物食品 |
| 154 | Kerry Chapman | 0 | 以家庭搞笑为主，和宠物食品推广关联弱 |
| 156 | Carlos Alberto | 0 | 热门杂项短视频号，与宠物食品无关 |
| 170 | Pete B: East Texas Homesteading | -15 | 人类健康饮食频道，和宠粮推广对象不匹配 |
| 175 | My frugal life | -15 | 以农场/囤货/短缺为主，和宠物食品推广明显不符 |

## Notes
- Page-level rates use `page_size` from each run metadata.
- Cause categories are heuristic clusters from `why_short`; review representative rows before making product decisions.
