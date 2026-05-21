# Channel Search Provider Comparison

- keyword: pet food
- platform: youtube
- country: us
- left: nox
- right: debugger@prompt:0c320fdab1e3
- left_rule_version: -
- right_rule_version: prompt:0c320fdab1e3
- left_prompt_hash: -
- right_prompt_hash: 0c320fdab1e3

## Run Overview
| run | provider | rule_version | total | fit | adjacent | badcase | badcase率 | <0 | 0-9 | 10-19 | 20+ |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| nox | nox | - | 1452 | 145 | 386 | 921 | 63.4% | 229 | 1059 | 100 | 64 |
| debugger@prompt:0c320fdab1e3 | debugger | prompt:0c320fdab1e3 | 1452 | 180 | 417 | 855 | 58.9% | 158 | 1059 | 157 | 78 |

## Page-Level Badcase Rate
| page | nox_total | nox_badcase | nox_badcase率 | debugger@prompt:0c320fdab1e3_total | debugger@prompt:0c320fdab1e3_badcase | debugger@prompt:0c320fdab1e3_badcase率 | badcase率差 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 50 | 21 | 42.0% | 50 | 10 | 20.0% | 22.0% |
| 2 | 50 | 18 | 36.0% | 50 | 21 | 42.0% | -6.0% |
| 3 | 50 | 18 | 36.0% | 50 | 15 | 30.0% | 6.0% |
| 4 | 50 | 24 | 48.0% | 50 | 17 | 34.0% | 14.0% |
| 5 | 50 | 28 | 56.0% | 50 | 20 | 40.0% | 16.0% |
| 6 | 50 | 31 | 62.0% | 50 | 16 | 32.0% | 30.0% |
| 7 | 50 | 27 | 54.0% | 50 | 21 | 42.0% | 12.0% |
| 8 | 50 | 24 | 48.0% | 50 | 16 | 32.0% | 16.0% |
| 9 | 50 | 29 | 58.0% | 50 | 19 | 38.0% | 20.0% |
| 10 | 50 | 24 | 48.0% | 50 | 30 | 60.0% | -12.0% |
| 43 | 0 | 0 | 0.0% | 50 | 45 | 90.0% | -90.0% |
| 44 | 0 | 0 | 0.0% | 50 | 46 | 92.0% | -92.0% |
| 45 | 0 | 0 | 0.0% | 50 | 44 | 88.0% | -88.0% |
| 46 | 50 | 28 | 56.0% | 50 | 46 | 92.0% | -36.0% |
| 47 | 50 | 36 | 72.0% | 50 | 29 | 58.0% | 14.0% |
| 48 | 50 | 40 | 80.0% | 50 | 20 | 40.0% | 40.0% |
| 49 | 50 | 39 | 78.0% | 50 | 34 | 68.0% | 10.0% |
| 50 | 50 | 32 | 64.0% | 50 | 21 | 42.0% | 22.0% |
| 51 | 50 | 37 | 74.0% | 50 | 36 | 72.0% | 2.0% |
| 52 | 50 | 34 | 68.0% | 50 | 32 | 64.0% | 4.0% |
| 53 | 50 | 33 | 66.0% | 0 | 0 | 0.0% | 66.0% |
| 54 | 50 | 36 | 72.0% | 0 | 0 | 0.0% | 72.0% |
| 55 | 50 | 36 | 72.0% | 0 | 0 | 0.0% | 72.0% |
| 86 | 0 | 0 | 0.0% | 50 | 35 | 70.0% | -70.0% |
| 87 | 0 | 0 | 0.0% | 50 | 39 | 78.0% | -78.0% |
| 88 | 0 | 0 | 0.0% | 50 | 38 | 76.0% | -76.0% |
| 89 | 0 | 0 | 0.0% | 50 | 31 | 62.0% | -62.0% |
| 90 | 0 | 0 | 0.0% | 50 | 29 | 58.0% | -58.0% |
| 91 | 50 | 36 | 72.0% | 50 | 38 | 76.0% | -4.0% |
| 92 | 50 | 36 | 72.0% | 50 | 36 | 72.0% | 0.0% |
| 93 | 50 | 30 | 60.0% | 50 | 32 | 64.0% | -4.0% |
| 94 | 50 | 37 | 74.0% | 50 | 37 | 74.0% | 0.0% |
| 95 | 50 | 41 | 82.0% | 2 | 2 | 100.0% | -18.0% |
| 96 | 50 | 39 | 78.0% | 0 | 0 | 0.0% | 78.0% |
| 97 | 50 | 32 | 64.0% | 0 | 0 | 0.0% | 64.0% |
| 98 | 50 | 39 | 78.0% | 0 | 0 | 0.0% | 78.0% |
| 99 | 50 | 34 | 68.0% | 0 | 0 | 0.0% | 68.0% |
| 100 | 2 | 2 | 100.0% | 0 | 0 | 0.0% | 100.0% |

## Badcase Overlap
| metric | count |
| --- | --- |
| shared_badcase | 249 |
| nox_only_badcase | 672 |
| debugger@prompt:0c320fdab1e3_only_badcase | 605 |

## Badcase Cause Summary
| provider | category | count |
| --- | --- | --- |
| nox | 宠物/动物受众冲突 | 668 |
| nox | 证据缺失或信号不足 | 123 |
| nox | 其他 | 73 |
| nox | 娱乐/儿童/泛内容偏离 | 34 |
| nox | 泛相关性偏离 | 21 |
| nox | 科技/电子垂类偏离 | 2 |
| debugger@prompt:0c320fdab1e3 | 宠物/动物受众冲突 | 697 |
| debugger@prompt:0c320fdab1e3 | 其他 | 77 |
| debugger@prompt:0c320fdab1e3 | 证据缺失或信号不足 | 45 |
| debugger@prompt:0c320fdab1e3 | 泛相关性偏离 | 17 |
| debugger@prompt:0c320fdab1e3 | 娱乐/儿童/泛内容偏离 | 17 |
| debugger@prompt:0c320fdab1e3 | 科技/电子垂类偏离 | 2 |

## Shared Badcases
| channel | nox | debugger@prompt:0c320fdab1e3 |
| --- | --- | --- |
| Haoren Special Effects | 娱乐/时尚为主，和宠粮投放目的明显不符 | 娱乐/特效向内容为主，宠物食品推广不匹配 |
| China Saibainuo Machinery | 机械/技术频道偏B2B，宠粮推广相关性弱 | 做的是宠物食品机械，不是宠物食品受众 |
| ShoppingTv | 无标签无内容证据，判定为不相关 | 标签杂乱且偏泛商品，不像宠物食品受众 |
| Rocket The Iguana | ASMR娱乐型频道，宠物食品推广适配差 | 有爬宠/宠物词，但ASMR展示不利于宠粮投放 |
| PKT UP | 益智娱乐频道，与宠物食品无关 | 挑战/益智娱乐为主，只有狗和进食的弱重叠 |
| Me Ai  Animation TV | 无有效标签，无法支持宠物食品推广 | 无宠物食品相关标签或内容，动画频道与推广意图不符 |
| Bicolana Sa America | 与宠物食品推广无关，受众不匹配 | 仅有泛“food”词，频道主打翻垃圾找食物，与宠物粮推广关联弱 |
| Hen Farm | 无标签且农场家禽向，与宠粮推广关联很弱 | 无宠物食品相关标签，且内容域不相关 |
| Chihuahua Bites | 无标签，且渠道名无法确认宠物食品相关性 | 无标签和内容证据，无法确认适合宠物食品推广 |
| PAP CAT | 历史鬼怪娱乐号，和宠粮投放几乎无关 | 猫宠+灵异悬疑，和宠粮推广不匹配 |
| Penguin Berry | 企鹅娱乐内容不是宠物养护场景，宠粮关联弱 | 动物娱乐号，只有泛宠物词，缺少宠物食品购买意图 |
| Jackie Bites | 无标签，无法支持宠粮相关性判断 | 无标签无内容证据，无法支持宠物食品推广 |
| More Media Production | 科技摄影号，与宠粮投放无关 | 科技摄影教程频道，与宠物食品推广目标无关 |
| Flurry Bureau | 无有效标签，无法判断为宠粮相关 | ASMR野生动物频道，缺乏宠物食品推广意图，格式不匹配 |
| EL LIFESTYLE USA | 音乐娱乐频道，和宠物食品推广不匹配 | 仅有宠物/犬种泛相关标签，主体偏音乐娱乐，缺少宠物食品推广语境 |
| Sylvania News | 新闻食谱向，和宠物食品投放不相关 | 新闻/自然杂内容为主，宠粮相关性弱 |
| JUNINZ FF | 游戏梗视频频道，和宠粮完全无关 | ASMR/游戏娱乐为主，属于明显格式错配 |
| Dog Mukbang ASMR | ASMR/mukbang格式与宠粮推广强冲突 | 犬类ASMR吃播为主，偏娱乐口味，缺少宠物食品购买/评测语境 |
| Elaaf's Gallery | 宠物ASMR/mukbang，投放格式不匹配 | ASMR/吃播为主，属于格式不匹配，宠物食品推广不合适 |
| 🫶J.T.C🫶  Jerome The Creator | 无标签且无宠物语义 | 足球赛事频道，和宠粮受众完全不匹配 |
| Elephant | 无标签，无宠物相关信号 | 无标签无内容证据，和宠物食品推广无相关信号 |
| Furry Watch | 无明确宠粮或宠物内容信号 | 仅从名称看似宠物向，但缺少有效内容证据 |
| Amazing Chinese Gadgets | 吃播娱乐向，与宠粮投放无关 | 吃播娱乐向，和宠粮投放无关 |
| Jinan Arrow Machinery Co., Ltd | 机械公司号，与宠粮无关 | 工业设备频道，和宠物食品推广目标不符 |
| Small Kh | 野生/昆虫内容与宠粮推广受众不匹配 | 主体是昆虫和野生生物，和常规宠物食品受众不符 |
| Darin Food & Feed Treats MFG Tech 达润食品生产科技 | 工业制造向，不适合宠粮投放 | 无相关标签，偏食品制造技术B2B，不适合宠物食品推广 |
| Liked EXperiment | 普通食物/科技杂项，缺少宠物语境 | 仅有泛化 food 标签，缺少宠物喂养语境，不适合宠物食品推广 |
| Summer's Place | 宠物加娱乐杂谈，受众可沾边但偏弱 | 仅有宠物弱相关，主体仍是泛娱乐内容 |
| hourFunny | 娱乐搞笑为主，动物内容不足以支撑投放 | 动物搞笑合集为主，和宠粮投放相关性弱 |
| EatingFood Team | ASMR/搞笑格式与实物宠物食品推广明显不匹配 | ASMR+搞笑短视频为主，偏娱乐而非商品推广 |

## nox-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 6 | My Cute Pomeranian | -9 | 剧情恐怖类内容为主，宠物标签不足以支撑投放 |
| 11 | BalchemANH | 1 | 动物科学/农业播客偏B2B，非宠粮创作者 |
| 12 | Shaq The Pug | -15 | 家庭游戏娱乐号，和宠粮推广不匹配 |
| 13 | Trytn Aimin | 10 | 搞笑剧情为主，pet food标签像蹭词 |
| 15 | Poodle Family | 0 | 无有效标签，无法判断为宠粮相关频道 |
| 19 | M ajmal official | 10 | 直命中petfood，但娱乐/喜剧属性过强 |
| 20 | Gunbam Cutie | 5 | 直命中pet food，但ASMR/睡眠格式强不匹配 |
| 22 | Golden Retriever Duobao | 0 | 无标签无内容证据，判定为不相关 |
| 29 | Gadget Fusion 5 | 0 | 无宠物食品相关标签 |
| 32 | Kiki and Bonbon | -11 | ASMR/mukbang为主，宠物食品推广语境弱 |
| 33 | Funny Golden Dogs | -13 | 以宠物娱乐为主，缺少食品/购买意图 |
| 37 | The Pet Collective | -11 | 宠物娱乐为主，和宠物食品推广不匹配 |
| 38 | Wutelz | 0 | 无宠物食品相关信号 |
| 40 | Bonbon Culinary Expert | -13 | 以搞笑动物内容为主，食品推广性弱 |
| 43 | Pet Reacts: LOL Edition! | -20 | 动画/娱乐为主，不适合宠物食品推广 |
| 46 | Ideal Farming | -10 | ASMR农场内容为主，非宠物食品创作者 |
| 47 | Eating Dogs | -11 | 娱乐向动物内容为主，食品推广性弱 |
| 50 | Tye-Dyed Iguana | -11 | 爬宠/鱼类娱乐内容为主，宠物食品弱相关 |
| 64 | SIMA TH 92 | 0 | 频道主体偏杂，宠物标签不足以支撑投放 |
| 65 | Wild Hoshi | -8 | ASMR加混合生活内容，宠物食品适配差 |
| 76 | Li Mo | -9 | ASMR泛娱乐，只有泛食品标签，宠粮推广不匹配 |
| 77 | Bà Già Review | -5 | 人类烹饪美食号，与宠粮投放场景不符 |
| 91 | sen sen | 0 | 仅泛生活娱乐标签，缺少宠物或喂养场景 |
| 92 | Diablo Ruby & Bane | -15 | 人类美食内容为主，与宠粮推广场景不符 |
| 94 | KingOfAquariums | -15 | 纯反应梗图娱乐号，和宠粮购买场景几乎无关 |
| 95 | KABOOM! | 0 | 育儿生活小技巧号，缺少宠物食品语境 |
| 101 | UNIQUE CREATIVITY | -10 | 娱乐/电影向，和宠物食品推广无关 |
| 117 | Startup CPG | 0 | CPG商业向但非宠物品类，相关性不足 |
| 118 | Steven Wiseblood | 0 | 无标签，无宠粮相关信号 |
| 123 | Nano Spark Ai | -15 | ASMR/AI娱乐向，不适合宠粮推广 |

## debugger@prompt:0c320fdab1e3-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 28 | FxcTablaDholak | -25 | ASMR吃播为主，和宠物食品推广不匹配 |
| 36 | CuteKitten | -5 | 打铁手工频道，宠物食品受众不匹配 |
| 38 | Chihuahua Bites | 0 | 缺少标签与内容证据，无法判断为宠物食品相关 |
| 42 | Henry | 0 | 娱乐/美妆类频道，与宠物食品无关 |
| 47 | Zooologist | -15 | 野生动物和动物搏斗主题，和家宠食品推广冲突 |
| 48 | Unique Fact Store | 0 | 泛宠物热榜内容，缺少食品/营养意图 |
| 61 | Pet and Animal | 2 | 有宠物泛受众，但整体是短视频娱乐内容 |
| 62 | Someday Homestead | 2 | 有猫狗标签，但整体是农场/杂项混合内容 |
| 64 | AB12TV | 0 | 通用生活与工具内容，缺少宠物食品受众 |
| 66 | Kanha-cutie | 2 | 只有狗/宠物泛标签，主体却偏农业设备 |
| 70 | Nutrena | -10 | 家禽饲料频道，和宠物食品投放对象不一致 |
| 76 | Paw Family TV | 5 | 有dog food标签但主内容是娱乐吃播/挑战，投放匹配差 |
| 87 | PET NATURE TV | -8 | 宠物娱乐型频道，只有弱宠物受众信号，不适合做宠物食品推广 |
| 88 | li li ai | 0 | 无标签和视频证据，无法支持宠物食品推广 |
| 91 | Puerto Rican David Torres Jr | 0 | 前5标签与宠物食品无关，缺少养宠购买意图信号 |
| 100 | DOGTV | -10 | 以狗狗放松/陪伴内容为主，宠粮推广场景不匹配 |
| 108 | Dumpster Diving Rookie | -15 | 以捡漏/淘宝为主，与宠物食品推广无关 |
| 109 | All in One Garden and Kitchen | 1 | 以人类美食/旅行内容为主，缺少宠物喂养与选购意图，宠粮推广相关性弱 |
| 110 | DAVE | 1 | 娱乐游戏频道，缺少宠物喂养信号，仅有泛食品类弱相关 |
| 111 | Melt TheStress Out | 1 | 以搞笑整蛊为主，缺少宠物食品推广相关信号 |
| 118 | Ming Ming De Mi Ni Chu Fang | -14 | 以儿童玩具/迷你厨房为主，和宠物食品推广目标不符 |
| 133 | Curtis Bryant Jr. | -15 | 娱乐少儿向频道，与宠物食品推广目标不相关 |
| 137 | ANIMAL MIX CHANNEL2 | -8 | 人类吃播娱乐号，缺少宠物喂养/营养意图，不适合宠物食品推广 |
| 143 | Pickles & Pancake | 8 | 有宠物食品直击标签，但频道主内容偏宠物短视频/ASMR娱乐，推广转化不佳 |
| 144 | Fun_With_The_Fam | 1 | 仅有宠物泛标签，缺少宠粮/喂养/购买意图 |
| 145 | LokiTheFloof | 0 | 无标签与近期内容证据，无法判断适合宠物食品推广 |
| 154 | Kerry Chapman | 0 | 以家庭/娱乐为主，和宠物食品推广关联弱 |
| 160 | Pebble's TV | 1 | AI/企鹅/创意向内容为主，宠物食品转化弱 |
| 164 | Scoop the Reporter | 2 | 反应/喜剧内容为主，宠物食品转化场景不足 |
| 167 | Interesting Day | 0 | 野生动物/AI内容为主，和宠物食品不匹配 |

## Notes
- Page-level rates use `page_size` from each run metadata.
- Cause categories are heuristic clusters from `why_short`; review representative rows before making product decisions.
