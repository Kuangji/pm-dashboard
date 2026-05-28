# Channel Search Provider Comparison

- keyword: pet food
- platform: tiktok
- country: US
- left: nox@promotion-capacity-v1 (tmp/channel-search-review/20260527-nox-vs-xtb-10kw-tiktok-us-front10-promotion-capacity-v1/pet-food/nox-tiktok)
- right: xtb@promotion-capacity-v1 (tmp/channel-search-review/20260527-nox-vs-xtb-10kw-tiktok-us-front10-promotion-capacity-v1/pet-food/xtb-tiktok)
- left_rule_version: promotion-capacity-v1
- right_rule_version: promotion-capacity-v1
- left_prompt_hash: b87da85cf79a
- right_prompt_hash: b87da85cf79a

## Run Overview
| run | provider | rule_version | total | fit | adjacent | badcase | badcase率 | <0 | 0-9 | 10-19 | 20+ |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| nox@promotion-capacity-v1 | nox | promotion-capacity-v1 | 500 | 124 | 188 | 188 | 37.6% | 27 | 327 | 85 | 61 |
| xtb@promotion-capacity-v1 | xtb | promotion-capacity-v1 | 500 | 241 | 163 | 96 | 19.2% | 136 | 131 | 148 | 85 |

## Page-Level Badcase Rate
| page | nox@promotion-capacity-v1_total | nox@promotion-capacity-v1_badcase | nox@promotion-capacity-v1_badcase率 | xtb@promotion-capacity-v1_total | xtb@promotion-capacity-v1_badcase | xtb@promotion-capacity-v1_badcase率 | badcase率差 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 50 | 23 | 46.0% | 50 | 4 | 8.0% | 38.0% |
| 2 | 50 | 11 | 22.0% | 50 | 6 | 12.0% | 10.0% |
| 3 | 50 | 14 | 28.0% | 50 | 13 | 26.0% | 2.0% |
| 4 | 50 | 15 | 30.0% | 50 | 8 | 16.0% | 14.0% |
| 5 | 50 | 16 | 32.0% | 50 | 11 | 22.0% | 10.0% |
| 6 | 50 | 22 | 44.0% | 50 | 13 | 26.0% | 18.0% |
| 7 | 50 | 23 | 46.0% | 50 | 9 | 18.0% | 28.0% |
| 8 | 50 | 15 | 30.0% | 50 | 8 | 16.0% | 14.0% |
| 9 | 50 | 23 | 46.0% | 50 | 12 | 24.0% | 22.0% |
| 10 | 50 | 26 | 52.0% | 50 | 12 | 24.0% | 28.0% |

## Badcase Overlap
| metric | count |
| --- | --- |
| shared_badcase | 3 |
| nox@promotion-capacity-v1_only_badcase | 185 |
| xtb@promotion-capacity-v1_only_badcase | 93 |

## Badcase Cause Summary
| provider | category | count |
| --- | --- | --- |
| nox@promotion-capacity-v1 | 宠物/动物受众冲突 | 115 |
| nox@promotion-capacity-v1 | 证据缺失或信号不足 | 37 |
| nox@promotion-capacity-v1 | 其他 | 22 |
| nox@promotion-capacity-v1 | 娱乐/儿童/泛内容偏离 | 7 |
| nox@promotion-capacity-v1 | 泛相关性偏离 | 6 |
| nox@promotion-capacity-v1 | 科技/电子垂类偏离 | 1 |
| xtb@promotion-capacity-v1 | 宠物/动物受众冲突 | 80 |
| xtb@promotion-capacity-v1 | 其他 | 7 |
| xtb@promotion-capacity-v1 | 娱乐/儿童/泛内容偏离 | 5 |
| xtb@promotion-capacity-v1 | 泛相关性偏离 | 2 |
| xtb@promotion-capacity-v1 | 证据缺失或信号不足 | 2 |

## Shared Badcases
| channel | nox@promotion-capacity-v1 | xtb@promotion-capacity-v1 |
| --- | --- | --- |
| Piper | Cats | Debt Free | 无标签和视频证据 | 宠粮内容极少，近期几乎全是理财/日常 |
| Gubba Homestead | 游戏内容与宠物食品推广目标明显不符 | 游戏号带Pet Food标签，但最近内容全跑偏 |
| FurryTales | 无有效宠物或食品信号 | ASMR 吃播型，和宠物食品推广格式冲突 |

## nox@promotion-capacity-v1-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 2 | Neji and Nami | 23 | 有宠物食品命中，但ASMR吃播不利于推广 |
| 3 | Kit and Sunday | 1 | 有kibble相关，但ASMR吃播格式与投放目标错位 |
| 7 | Ponyo and Luna | 18 | 直指宠物食品，但ASMR格式明显不适合推广 |
| 10 | KK pet | 0 | 无标签和视频证据 |
| 11 | salem & harry 🐈‍⬛🐈🤍 | 2 | 有猫粮相关，但ASMR格式与推广目标冲突 |
| 12 | The Honest Kitchen | 0 | 无可验证标签证据 |
| 14 | momo 🥟 & mochi 🍡 | 13 | 有宠物食品命中，但ASMR形式不适合商品推广 |
| 15 | Evan Cooper | 0 | 无标签和视频证据 |
| 18 | larissaWhite_ | 0 | 无相关受众证据 |
| 21 | Gizmo🐈‍⬛ & Scooby🐶 | 0 | 无标签和视频证据 |
| 22 | Katie, Bolton & Almond | 0 | 无标签和视频证据 |
| 23 | Ellie + Friends 🐕😺😺 | 0 | 无标签和视频证据 |
| 26 | Baby & Hugo | 0 | 无宠物食品相关标签或视频证据 |
| 27 | Skylar | 0 | 缺少任何与宠物食品相关的信号 |
| 32 | Allysa Breanne | -15 | 时尚旅行向账号，与宠物食品推广不匹配 |
| 37 | KatrinaInAZ | -15 | 穿搭/服饰账号，和宠物食品推广场景不一致 |
| 39 | Sebastian Garcia | 0 | 咖啡/本地美食内容，与宠物食品不匹配 |
| 42 | Loki | 0 | 无可用宠物食品信号 |
| 44 | HAZEL & POTATO ACE LAS VEGAS | 0 | 无可用宠物食品信号 |
| 46 | Bennett 🐱 | 5 | 命中 pet food，但 ASMR 形式不适合商品推广 |
| 48 | Moof + Everest | 0 | 无可用宠物食品信号 |
| 54 | Zed and Zen | 5 | ASMR喂食为主，偏娱乐，不适合宠物食品推广。 |
| 61 | thetannershop | 0 | 宗教/娱乐类账号，与宠物食品无关。 |
| 63 | BoyuePrinting | 8 | 包装供应链账号，偏B端包装，不像宠物食品推广创作者。 |
| 65 | Ivy & Opie | 10 | 有unboxing但ASMR占主导，推广格式不匹配。 |
| 71 | Jay Prehistoric | 0 | 爬宠/野生动物内容，与宠物食品推广无关。 |
| 74 | Kipper&GoGo | 5 | ASMR喂猫为主，偏娱乐不适合宠物食品推广。 |
| 79 | amy_atl_realtor | 8 | 虽有宠物食品标签，但ASMR格式不适合推广 |
| 81 | Christopher Gillette | -10 | 野生爬宠内容，和宠物食品投放目标不符 |
| 92 | 𓆏 | 0 | 蛙类/爬宠内容，宠物食品相关性很弱 |

## xtb@promotion-capacity-v1-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 25 | Chris House Of Cats | 0 | 主要是求互动/求帮助，不适合宠粮推广 |
| 41 | Toofythefloofy | -15 | ASMR/反应型为主，宠粮推广场景不理想 |
| 42 | freeman | -8 | 仅有一次狗粮提及，整体内容偏离太多 |
| 72 | cw13044fqr | -10 | 内容过于泛，最近10条也没有明确宠粮证据 |
| 78 | Ge Ge | -22 | ASMR狗吃饭为主，偏内容娱乐，缺少推广场景 |
| 93 | asherandirina | -20 | 以狗零食/开箱为主，但ASMR格式不适合推广 |
| 97 | curated-quality-goods | -25 | 宠物吃播/ASMR娱乐为主，商品推广场景不佳 |
| 98 | Gen❌️79_JeepGirl | -15 | 内容与宠粮无关，近期也基本是无关题材 |
| 106 | ASMR Dog | -21 | ASMR吃播为主，偏声音娱乐，不适合宠粮推广 |
| 109 | Uni_loco | -6 | 娱乐号为主，宠物食品信号弱，近期内容大多不相关 |
| 110 | Penguinpepperpia | -6 | 猫粮ASMR吃播，内容相关但推广格式明显不匹配 |
| 111 | Mukbang đogs 🇺🇸 | -23 | 狗吃播/mukbang为主，几乎没有宠粮推广能力 |
| 113 | Bagel&Luna | -5 | 做狗粮食谱和ASMR，但推广格式偏娱乐，不适合主推 |
| 118 | good food | -18 | 娱乐号且近期多无关内容，和宠粮推广几乎无关 |
| 124 | NEKO | -10 | 猫粮ASMR/mukbang为主，声音娱乐属性压过推广属性 |
| 131 | Karen_Cormier_Foulch ❌ | -4 | 杂号为主，狗食相关信息太少 |
| 132 | yuly food | -8 | 泛娱乐号，宠物零食只是偶发提及 |
| 134 | Yidiandian | -23 | mukbang+ASMR 娱乐型，明显不适合宠物食品推广 |
| 143 | blessedjoy2023 | -8 | 泛娱乐号，宠物零食只是偶发提及 |
| 149 | China Food | -25 | 狗肉内容与宠物食品推广完全不符 |
| 151 | Yorkshire | -22 | 近10条全是狗吃播/ASMR，缺少宠物食品推广导向 |
| 152 | xoxotira | -10 | 生活方式号，近10条无宠物/喂养内容 |
| 166 | вяιє | -9 | 内容杂乱，只有零散喂猫片段，不适合投放 |
| 170 | Redrct | -25 | reddit故事娱乐号，和宠物食品推广完全不符 |
| 179 | nataliaguerrero260 | -10 | 健康/反思类账号，与宠物食品无关，近期内容也几乎全不相关 |
| 184 | Michelle Gonzalez | -10 | 无宠物食品或宠物用品主线，近期内容也几乎都不相关 |
| 185 | jazm45363 | -7 | 仅有宠物益生菌零散提及，整体账号与宠物食品不匹配 |
| 187 | ur fave weirdo | -5 | 娱乐为主，仅零星宠粮相关，投放相关性不足 |
| 210 | dog eat cute | -7 | 偏狗吃播娱乐，缺少宠粮推广场景 |
| 212 | Ozanne | -14 | 时尚饰品号，宠粮内容只是零散带货，明显不匹配 |

## Notes
- Page-level rates use `page_size` from each run metadata.
- Cause categories are heuristic clusters from `why_short`; review representative rows before making product decisions.
