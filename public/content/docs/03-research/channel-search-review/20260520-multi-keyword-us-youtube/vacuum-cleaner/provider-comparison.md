# Channel Search Provider Comparison

- keyword: vacuum cleaner
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
| nox | nox | - | 1500 | 217 | 400 | 883 | 58.9% | 245 | 966 | 114 | 175 |
| debugger@prompt:0c320fdab1e3 | debugger | prompt:0c320fdab1e3 | 1460 | 376 | 429 | 655 | 44.9% | 115 | 852 | 309 | 184 |

## Page-Level Badcase Rate
| page | nox_total | nox_badcase | nox_badcase率 | debugger@prompt:0c320fdab1e3_total | debugger@prompt:0c320fdab1e3_badcase | debugger@prompt:0c320fdab1e3_badcase率 | badcase率差 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 50 | 31 | 62.0% | 50 | 5 | 10.0% | 52.0% |
| 2 | 50 | 19 | 38.0% | 50 | 8 | 16.0% | 22.0% |
| 3 | 50 | 19 | 38.0% | 50 | 10 | 20.0% | 18.0% |
| 4 | 50 | 19 | 38.0% | 50 | 4 | 8.0% | 30.0% |
| 5 | 50 | 13 | 26.0% | 50 | 9 | 18.0% | 8.0% |
| 6 | 50 | 16 | 32.0% | 50 | 17 | 34.0% | -2.0% |
| 7 | 50 | 19 | 38.0% | 50 | 15 | 30.0% | 8.0% |
| 8 | 50 | 21 | 42.0% | 50 | 8 | 16.0% | 26.0% |
| 9 | 50 | 26 | 52.0% | 50 | 8 | 16.0% | 36.0% |
| 10 | 50 | 19 | 38.0% | 50 | 14 | 28.0% | 10.0% |
| 93 | 0 | 0 | 0.0% | 50 | 23 | 46.0% | -46.0% |
| 94 | 0 | 0 | 0.0% | 50 | 19 | 38.0% | -38.0% |
| 95 | 0 | 0 | 0.0% | 50 | 25 | 50.0% | -50.0% |
| 96 | 50 | 31 | 62.0% | 50 | 24 | 48.0% | 14.0% |
| 97 | 50 | 28 | 56.0% | 50 | 26 | 52.0% | 4.0% |
| 98 | 50 | 32 | 64.0% | 50 | 28 | 56.0% | 8.0% |
| 99 | 50 | 35 | 70.0% | 50 | 28 | 56.0% | 14.0% |
| 100 | 50 | 40 | 80.0% | 50 | 28 | 56.0% | 24.0% |
| 101 | 50 | 44 | 88.0% | 50 | 31 | 62.0% | 26.0% |
| 102 | 50 | 38 | 76.0% | 50 | 27 | 54.0% | 22.0% |
| 103 | 50 | 36 | 72.0% | 0 | 0 | 0.0% | 72.0% |
| 104 | 50 | 30 | 60.0% | 0 | 0 | 0.0% | 60.0% |
| 105 | 50 | 41 | 82.0% | 0 | 0 | 0.0% | 82.0% |
| 185 | 0 | 0 | 0.0% | 50 | 35 | 70.0% | -70.0% |
| 186 | 0 | 0 | 0.0% | 50 | 38 | 76.0% | -76.0% |
| 187 | 0 | 0 | 0.0% | 50 | 27 | 54.0% | -54.0% |
| 188 | 0 | 0 | 0.0% | 50 | 27 | 54.0% | -54.0% |
| 189 | 0 | 0 | 0.0% | 50 | 34 | 68.0% | -68.0% |
| 190 | 0 | 0 | 0.0% | 50 | 37 | 74.0% | -74.0% |
| 191 | 50 | 30 | 60.0% | 50 | 36 | 72.0% | -12.0% |
| 192 | 50 | 30 | 60.0% | 50 | 30 | 60.0% | 0.0% |
| 193 | 50 | 34 | 68.0% | 50 | 29 | 58.0% | 10.0% |
| 194 | 50 | 32 | 64.0% | 10 | 5 | 50.0% | 14.0% |
| 195 | 50 | 32 | 64.0% | 0 | 0 | 0.0% | 64.0% |
| 196 | 50 | 37 | 74.0% | 0 | 0 | 0.0% | 74.0% |
| 197 | 50 | 36 | 72.0% | 0 | 0 | 0.0% | 72.0% |
| 198 | 50 | 33 | 66.0% | 0 | 0 | 0.0% | 66.0% |
| 199 | 50 | 31 | 62.0% | 0 | 0 | 0.0% | 62.0% |
| 200 | 50 | 31 | 62.0% | 0 | 0 | 0.0% | 62.0% |

## Badcase Overlap
| metric | count |
| --- | --- |
| shared_badcase | 57 |
| nox_only_badcase | 826 |
| debugger@prompt:0c320fdab1e3_only_badcase | 598 |

## Badcase Cause Summary
| provider | category | count |
| --- | --- | --- |
| nox | 证据缺失或信号不足 | 369 |
| nox | 其他 | 226 |
| nox | 娱乐/儿童/泛内容偏离 | 131 |
| nox | 泛相关性偏离 | 83 |
| nox | 宠物/动物受众冲突 | 60 |
| nox | 科技/电子垂类偏离 | 14 |
| debugger@prompt:0c320fdab1e3 | 证据缺失或信号不足 | 285 |
| debugger@prompt:0c320fdab1e3 | 其他 | 250 |
| debugger@prompt:0c320fdab1e3 | 娱乐/儿童/泛内容偏离 | 57 |
| debugger@prompt:0c320fdab1e3 | 泛相关性偏离 | 34 |
| debugger@prompt:0c320fdab1e3 | 宠物/动物受众冲突 | 23 |
| debugger@prompt:0c320fdab1e3 | 科技/电子垂类偏离 | 6 |

## Shared Badcases
| channel | nox | debugger@prompt:0c320fdab1e3 |
| --- | --- | --- |
| HPad | 破坏/毁坏内容，不适合卖吸尘器 | 破坏类内容，不适合做产品推广 |
| Levsob | 娱乐生活向，无吸尘器相关信号 | 娱乐向频道，产品词不代表推广能力 |
| Calming Ambience Sounds | 白噪音/助眠型，属于强格式错配 | 白噪音助眠号，格式严重不匹配 |
| YourPeacefulSound | 助眠白噪音型，和产品投放明显错配 | 白噪音/ASMR频道，与吸尘器推广强错配 |
| Sleeping Easy | ASMR/助眠白噪音频道，格式与产品推广强错配 | 白噪音/ASMR声景频道，不适合吸尘器产品投放 |
| Vacuum Sensation | ASMR吸尘音效频道，推广格式明显错配 | 吸尘器ASMR频道，偏娱乐声效，不适合卖货 |
| Ambience | ASMR/白噪音氛围号，卖点是声音不是产品 | 声景放松频道，不适合吸尘器产品推广 |
| LoudPlace | 频道偏汽车车辆领域，与吸尘器推广场景明显不符 | 娱乐内容为主，清洁器只属蹭词不适合推广 |
| PRASA SIDE HUSTLE | 金融交易频道，和吸尘器推广主题明显不符 | 主内容偏AI/设计/交易，缺少清洁器推广场景 |
| Darrencarfan78 | 公路旅行内容，和吸尘器推广弱相关 | 动画化车流/风扇收藏内容，和吸尘器投放不匹配 |
| Handmade Creative Channel | 仅有DIY/how to弱关联，和吸尘器距离大 | 手工木工频道，非家电导购场景 |
| Power Masheni | 无可用相关信号 | 无标签与内容证据，无法判断为相关频道 |
| Velvet Relax ASMR | ASMR放松型频道，与吸尘器推广格式强冲突 | ASMR频道与吸尘器推广强错配 |
| AutistiVision | 清洁/家电相关，但ASMR满意视频不适合 | ASMR/满意音效类，与吸尘器推广场景强冲突 |
| ASMR. MagicBoop | 白噪音/ASMR频道，与吸尘器推广强冲突 | ASMR白噪音格式，与吸尘器推广强不匹配 |
| SMILEatTheDEALS | 仅泛科技标签，缺少测评或购买语境 | 复古收藏垂类，缺少吸尘器相关信号 |
| NexNest Picks | 无标签与内容证据 | 无标签无内容，缺少相关证据 |
| Travel Secret Talks | 旅行话题与家电推广无关 | 无可用标签，无法判断相关性 |
| Leviticus45 | 无标签无内容，相关性不足 | 无标签与内容证据 |
| DailyZondeals | 无标签无内容，缺少投放依据 | 无可用标签与内容信号 |
| Your Team Logo | 无标签无内容信息，无法支持吸尘器投放判断 | 无相关内容线索 |
| Maloj Peacher | 旅行娱乐向为主，和吸尘器投放弱相关 | 内容偏旅行娱乐，和扫地机无关 |
| Zoo-m In | 无标签与内容线索，无法判断相关 | 无相关标签，主题不匹配扫地机 |
| Introvert With Opinions | 无标签无内容信号，难以支持吸尘器推广 | 无相关内容线索 |
| Tinkering With Tiny Humans | 内容看似亲子/儿童向，缺少家电相关证据 | 缺少相关标签和内容证据，暂不适合推广 |
| dianah wastut | 无标签且无内容线索 | 无标签无内容，缺少任何相关信号 |
| The Battle Family | 家庭运动内容为主，和吸尘器推广关联弱 | 家庭生活频道，仅DIY有弱相关 |
| ssiusplau | 无相关标签与内容证据 | 美妆护肤向，和吸尘器推广无关 |
| Kruno Eti | 车类/泛生活向，和清洁器推广不匹配 | 杂项/被动收入内容，和吸尘器推广无关 |
| Alex Rubi | 无标签、无内容信号，无法判断清洁器推广相关性 | 缺少相关标签和内容证据，暂不适合推广 |

## nox-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 9 | Creative & Duck | 3 | 仅泛科技弱相关，缺少吸尘器投放语境 |
| 10 | Marshall studios  production98 | 0 | 无有效标签，无法判断相关性 |
| 11 | Matthew Gonzalez | 0 | 体育娱乐向，无吸尘器推广信号 |
| 14 | The Kirby Company | 0 | 仅生活向标签，缺少吸尘器相关性 |
| 15 | My Top 5 Choices | 0 | 无标签可判定，相关性不足 |
| 18 | Cozy Sleep Sounds | -10 | 睡眠音效频道，属于强格式错配 |
| 19 | MarcosCeDi | 1 | 仅有极弱科技泛相关，不足以投放 |
| 20 | Blackheartvacs | 0 | 无标签，缺少可用相关性信号 |
| 21 | AI reels | 1 | 泛科技向，和吸尘器推广关联很弱 |
| 23 | nikkib ASMR | -10 | ASMR声效频道，和产品推广明显错配 |
| 24 | Must-Have Finds | 0 | 无标签可判定，相关性不足 |
| 26 | AI Palette-Cute Creatures | 20 | 标签命中，但主体是AI萌宠，缺少清洁家电语境 |
| 28 | IMPORTED VACUUM CLEANER | 10 | 命中吸尘器，但ASMR/满足感风格偏展示音频 |
| 29 | The Wonder Hub | 0 | 无标签与内容信号 |
| 30 | Shopping Points | 0 | 无标签与内容信号 |
| 31 | Today's Deals | 0 | 无标签与内容信号 |
| 33 | Valentine Lewis | 20 | 美妆时尚为主，吸尘器标签像零散蹭词 |
| 34 | lubluelu official | 0 | 无标签与内容信号，难判为可投放创作者 |
| 35 | Umair's Workshop | 2 | DIY杂项频道，缺少家电推广语境 |
| 37 | Learn and Choose | 0 | 无标签和内容证据，无法支撑吸尘器推广相关性 |
| 39 | Michigan Heating Guy | 20 | 暖通维修为主，吸尘器标签不代表匹配 |
| 42 | Technically Jeff | -15 | 汽车频道，与吸尘器推广完全不相关 |
| 45 | DBProductReviews | -15 | 美食频道，与吸尘器推广场景不匹配 |
| 46 | Just Vacuuming | 5 | 命中吸尘器，但核心是ASMR清洁音频，转化弱 |
| 47 | Brushroll Lover ASMR | 5 | 命中吸尘器，但核心是ASMR清洁音频，转化弱 |
| 48 | ArbokLover1618 | 10 | 命中吸尘器，但明显偏声音/满足感展示 |
| 49 | MQ’s World | -15 | 美食短内容，与吸尘器推广场景不匹配 |
| 51 | Product Picks | 0 | 无标签无内容证据，难判断为吸尘器推广相关 |
| 54 | It's me Yushi TV | 0 | 以生活娱乐为主，与吸尘器推广相关性弱 |
| 57 | Scary Talking Head | -15 | 恐怖游戏娱乐频道，与吸尘器推广明显不匹配 |

## debugger@prompt:0c320fdab1e3-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 79 | IDogFan41 | -10 | 玩具/动画主域，不适合卖吸尘器 |
| 109 | Vac Shop USA | 0 | 无有效标签和内容信号，难判断为吸尘器推广频道 |
| 112 | Pool Cleaning Hacks | 0 | 缺少吸尘器相关标签，只有泛清洁线索 |
| 118 | JIGOO | 0 | 无标签信息，无法支持吸尘器相关性 |
| 129 | The Review Rewind | 0 | 缺少标签和内容信息，无法判断可投放相关性 |
| 133 | The Rock Bands | -5 | 满意度/娱乐短视频为主，不像产品推广频道 |
| 135 | Vacuum State | 10 | 娱乐/满意类内容占主导，不适合吸尘器投放 |
| 136 | Yaber Home | 0 | 投影娱乐内容，与吸尘器品类无关 |
| 143 | 5X Finds | 0 | 无标签无内容，缺乏相关性证据 |
| 147 | Sami Luo Tech | 0 | 手机科技频道，与吸尘器无直接相关 |
| 158 | Clean with Prime | -13 | ASMR清洁为主，格式与产品推广不匹配 |
| 169 | Chuckles&Cheers | -15 | 娱乐短视频为主，不适合卖吸尘器 |
| 181 | Something 2LookAt | -12 | 工具向但以Satisfying/ASMR展示为主，带货适配差 |
| 197 | Chic Clean Freak | -15 | 清洁ASMR/陪伴式内容，强格式不适合带货 |
| 205 | Holiday Beach | 0 | 无相关标签，无法判断为吸尘器受众 |
| 214 | Lisa_PrimePicks | 0 | 无标签信息，无法判断相关性 |
| 232 | FAKTA GOKIL | -15 | 动物科普内容，与吸尘器推广不匹配 |
| 234 | Gear Elevation | 0 | 装饰/娱乐向内容，与吸尘器推广无关 |
| 237 | Kuko Talks | -15 | 娱乐短视频内容，不适合家电推广 |
| 241 | Leisi Crazy | -15 | 娱乐内容为主，不适合吸尘器推广 |
| 244 | KaviRam At USA | 0 | 标签为空，缺少相关信号 |
| 245 | Vertak Garden Tools | 0 | 园艺工具频道，与吸尘器推广不匹配 |
| 250 | Thames & Kosmos | 0 | STEM/机器人教育频道，与吸尘器推广不匹配 |
| 261 | Matteo | 0 | 无标签无内容，无法建立吸尘器相关性 |
| 265 | KelyLands | 0 | 车载冷藏/露营冷柜方向，与吸尘器无关 |
| 266 | Clear Water Chronicles | 0 | 泳池清洁器赛道，和家用吸尘器不匹配 |
| 268 | TechTubeHub | 0 | 仅泛科技/生活标签，缺少家电相关信号 |
| 269 | Shine Gadget | 0 | 车载改装和相机内容为主，不适合吸尘器推广 |
| 273 | OcRefrigeration,Hvac,Electrical & other Video's. | 0 | HVAC/制冷领域，和吸尘器品类不匹配 |
| 276 | Elite Consumer | 0 | 标签多为泛家居/泛兴趣，和吸尘器推广无关 |

## Notes
- Page-level rates use `page_size` from each run metadata.
- Cause categories are heuristic clusters from `why_short`; review representative rows before making product decisions.
