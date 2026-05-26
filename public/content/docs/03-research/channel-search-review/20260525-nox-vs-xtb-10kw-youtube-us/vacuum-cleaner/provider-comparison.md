# Channel Search Provider Comparison

- keyword: vacuum cleaner
- platform: youtube
- country: US
- left: nox@prompt:0c320fdab1e3 (tmp/channel-search-review/20260525-nox-vs-xtb-10kw-youtube-us/vacuum-cleaner/nox-youtube)
- right: xtb@prompt:0c320fdab1e3 (tmp/channel-search-review/20260525-nox-vs-xtb-10kw-youtube-us/vacuum-cleaner/xtb-youtube)
- left_rule_version: prompt:0c320fdab1e3
- right_rule_version: prompt:0c320fdab1e3
- left_prompt_hash: 0c320fdab1e3
- right_prompt_hash: 0c320fdab1e3

## Run Overview
| run | provider | rule_version | total | fit | adjacent | badcase | badcase率 | <0 | 0-9 | 10-19 | 20+ |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| nox@prompt:0c320fdab1e3 | nox | prompt:0c320fdab1e3 | 1500 | 177 | 230 | 1093 | 72.9% | 293 | 938 | 92 | 177 |
| xtb@prompt:0c320fdab1e3 | xtb | prompt:0c320fdab1e3 | 1500 | 262 | 221 | 1017 | 67.8% | 1050 | 222 | 166 | 62 |

## Page-Level Badcase Rate
| page | nox@prompt:0c320fdab1e3_total | nox@prompt:0c320fdab1e3_badcase | nox@prompt:0c320fdab1e3_badcase率 | xtb@prompt:0c320fdab1e3_total | xtb@prompt:0c320fdab1e3_badcase | xtb@prompt:0c320fdab1e3_badcase率 | badcase率差 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 50 | 28 | 56.0% | 50 | 10 | 20.0% | 36.0% |
| 2 | 50 | 19 | 38.0% | 50 | 10 | 20.0% | 18.0% |
| 3 | 50 | 20 | 40.0% | 50 | 16 | 32.0% | 8.0% |
| 4 | 50 | 17 | 34.0% | 50 | 19 | 38.0% | -4.0% |
| 5 | 50 | 15 | 30.0% | 50 | 12 | 24.0% | 6.0% |
| 6 | 50 | 19 | 38.0% | 50 | 22 | 44.0% | -6.0% |
| 7 | 50 | 22 | 44.0% | 50 | 21 | 42.0% | 2.0% |
| 8 | 50 | 27 | 54.0% | 50 | 24 | 48.0% | 6.0% |
| 9 | 50 | 23 | 46.0% | 50 | 23 | 46.0% | 0.0% |
| 10 | 50 | 28 | 56.0% | 50 | 25 | 50.0% | 6.0% |
| 96 | 50 | 44 | 88.0% | 50 | 41 | 82.0% | 6.0% |
| 97 | 50 | 42 | 84.0% | 50 | 44 | 88.0% | -4.0% |
| 98 | 50 | 41 | 82.0% | 50 | 39 | 78.0% | 4.0% |
| 99 | 50 | 48 | 96.0% | 50 | 39 | 78.0% | 18.0% |
| 100 | 50 | 42 | 84.0% | 50 | 38 | 76.0% | 8.0% |
| 101 | 50 | 47 | 94.0% | 50 | 43 | 86.0% | 8.0% |
| 102 | 50 | 45 | 90.0% | 50 | 43 | 86.0% | 4.0% |
| 103 | 50 | 44 | 88.0% | 50 | 40 | 80.0% | 8.0% |
| 104 | 50 | 43 | 86.0% | 50 | 42 | 84.0% | 2.0% |
| 105 | 50 | 46 | 92.0% | 50 | 42 | 84.0% | 8.0% |
| 191 | 50 | 47 | 94.0% | 50 | 39 | 78.0% | 16.0% |
| 192 | 50 | 40 | 80.0% | 50 | 40 | 80.0% | 0.0% |
| 193 | 50 | 44 | 88.0% | 50 | 41 | 82.0% | 6.0% |
| 194 | 50 | 44 | 88.0% | 50 | 44 | 88.0% | 0.0% |
| 195 | 50 | 43 | 86.0% | 50 | 46 | 92.0% | -6.0% |
| 196 | 50 | 41 | 82.0% | 50 | 40 | 80.0% | 2.0% |
| 197 | 50 | 44 | 88.0% | 50 | 41 | 82.0% | 6.0% |
| 198 | 50 | 42 | 84.0% | 50 | 45 | 90.0% | -6.0% |
| 199 | 50 | 45 | 90.0% | 50 | 46 | 92.0% | -2.0% |
| 200 | 50 | 43 | 86.0% | 50 | 42 | 84.0% | 2.0% |

## Badcase Overlap
| metric | count |
| --- | --- |
| shared_badcase | 17 |
| nox@prompt:0c320fdab1e3_only_badcase | 1076 |
| xtb@prompt:0c320fdab1e3_only_badcase | 857 |

## Badcase Cause Summary
| provider | category | count |
| --- | --- | --- |
| nox@prompt:0c320fdab1e3 | 证据缺失或信号不足 | 599 |
| nox@prompt:0c320fdab1e3 | 其他 | 192 |
| nox@prompt:0c320fdab1e3 | 娱乐/儿童/泛内容偏离 | 132 |
| nox@prompt:0c320fdab1e3 | 泛相关性偏离 | 77 |
| nox@prompt:0c320fdab1e3 | 宠物/动物受众冲突 | 61 |
| nox@prompt:0c320fdab1e3 | 科技/电子垂类偏离 | 32 |
| xtb@prompt:0c320fdab1e3 | 其他 | 396 |
| xtb@prompt:0c320fdab1e3 | 泛相关性偏离 | 249 |
| xtb@prompt:0c320fdab1e3 | 娱乐/儿童/泛内容偏离 | 174 |
| xtb@prompt:0c320fdab1e3 | 证据缺失或信号不足 | 141 |
| xtb@prompt:0c320fdab1e3 | 科技/电子垂类偏离 | 31 |
| xtb@prompt:0c320fdab1e3 | 宠物/动物受众冲突 | 26 |

## Shared Badcases
| channel | nox@prompt:0c320fdab1e3 | xtb@prompt:0c320fdab1e3 |
| --- | --- | --- |
| HPad | 虽有“vacuum cleaner”直击标签，但频道核心是破坏类内容，不适合家电推广 | 虽有吸尘器标签，但主要是破坏娱乐内容，促销场景不匹配。 |
| Levsob | 仅有生活方式弱相关，娱乐占比高，缺少吸尘器或家居清洁意图 | 虽有吸尘器标签，但频道主内容是娱乐短剧情，明显不适合推广。 |
| Calming Ambience Sounds | 有直给词但主标签是ASMR/白噪音/睡眠放松，偏氛围内容，不适合推广真空吸尘器 | 标签直中但频道是助眠白噪音，强格式错配，不适合推广吸尘器 |
| YourPeacefulSound | 吸尘器词命中但以睡眠白噪音为主，推广格式不匹配 | 虽有 vacuum cleaner 直命中，但内容是白噪音/睡眠声，不适合产品推广 |
| AI reels | 仅有泛科技标签，缺少吸尘器购买/评测/使用意图，相关性很弱 | 有吸尘器词但主体是AI短视频，促销格式严重不符 |
| Sleeping Easy | ASMR睡眠音频为主，虽有vacuum词但推广格式明显不符 | ASMR吸尘器白噪音频道，偏音频娱乐而非产品推广，近10条也均失配 |
| Vacuum Sensation | 虽有直中标签，但ASMR/吸尘声是明显格式不匹配 | 有直达词，但ASMR吸尘声内容是强格式错配，不适合做推广 |
| Ambience | ASMR/白噪音型频道，虽有产品词但更像声音内容，不适合投放 | ASMR吸尘器音效为主，偏放松聆听，不是产品推广场景 |
| Handmade Creative Channel | 手工DIY频道，与吸尘器推广场景无关 | DIY工具和木工内容为主，缺少清洁品类与购买意图 |
| Vacuum Sleep Sounds | ASMR助眠向，属明显格式不匹配，非吸尘器推广频道 | 白噪音/助眠频道，虽含 vacuum 但明显是音频氛围内容，不适合推广产品 |
| Velvet Relax ASMR | ASMR音景为主，属物品推广格式错配 | ASMR主导且近期多为放松清洁音频，和吸尘器推广错配 |
| Brandon Jackson | RC车模内容为主，和吸尘器推广几乎无关 | 偏DIY/泳池及泛带货，缺少吸尘器评测或购买场景 |
| AutistiVision | 有清洁/家电泛相关，但ASMR解压格式与吸尘器推广明显错位 | ASMR清洁/洗衣机内容为主，吸尘器仅边缘相关且格式不适配 |
| SMILEatTheDEALS | 仅有泛生活/科技弱相关，无吸尘器评测或家电推广证据 | 频道偏古董收藏，吸尘器多为旧货展示，不适合新品推广 |
| Zebby's Little Audios | ASMR/娱乐型内容与吸尘器推广场景明显不匹配 | ASMR角色扮演音频，和吸尘器推广场景不符 |
| Kruno Eti | 仅有泛科技标签，缺少清洁/家电/购买场景 | 有开箱测评痕迹，但内容杂且近期与吸尘器相关度低 |
| NDQ 🦋 | 节日/生活方式泛内容，缺少家电购买或测评意图 | 偏oddly satisfying和清洁展示，缺少购买/测评意图，格式不适配 |

## nox@prompt:0c320fdab1e3-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 8 | Power Masheni | 0 | 无标签、无相关视频，缺乏真相关性信号 |
| 11 | Marshall studios  production98 | 0 | 无标签无内容，缺少任何相关信号 |
| 12 | Matthew Gonzalez | -15 | 体育娱乐频道，和吸尘器推广目标明显不符 |
| 16 | My Top 5 Choices | 0 | 无标签无内容，缺少吸尘器相关证据 |
| 19 | Cozy Sleep Sounds | -10 | 吸尘器词命中但核心是睡眠音频，明显不适合推广 |
| 20 | MarcosCeDi | -8 | 仅有泛生活/科技弱相关，车辆和时尚主题不适合吸尘器推广 |
| 21 | Blackheartvacs | 0 | 无标签、视频或近期内容证据，无法判断适合吸尘器推广 |
| 24 | nikkib ASMR | 5 | 有直接词但主打ASMR/声音内容，和扫地机推广形式明显错配 |
| 25 | Must-Have Finds | 0 | 缺少任何与吸尘器相关的标签或内容，无法支持推广 |
| 28 | Today's Deals | 0 | 无标签、无内容证据，无法判断为适合推广的创作者 |
| 29 | AI Palette-Cute Creatures | -5 | 虽有标签命中，但频道偏可爱治愈娱乐，不适合吸尘器推广 |
| 30 | IMPORTED VACUUM CLEANER | 5 | 关键词命中，但ASMR/满足感格式与产品推广明显冲突 |
| 31 | The Wonder Hub | 0 | 无标签、无相关视频、无近期内容证据支持吸尘器推广 |
| 32 | Shopping Points | 0 | 无标签、无视频内容信号，与吸尘器推广关联不足 |
| 35 | lubluelu official | 0 | 无标签、无视频证据，无法确认与吸尘器推广相关 |
| 37 | Learn and Choose | 0 | 缺少标签和内容信号，无法判断为相关投放位 |
| 40 | Product Picks | 0 | 无标签无内容，缺少可判定的投放信号 |
| 43 | Technically Jeff | 0 | 汽车频道，与吸尘器推广目标无关 |
| 44 | DBProductReviews | 0 | 美食测评频道，和吸尘器商品推广无关 |
| 47 | Just Vacuuming | 5 | 以ASMR/满足感刷吸尘为主，偏内容玩法而非种草 |
| 48 | ArbokLover1618 | 5 | 含吸尘器声音向标签，偏音效内容，缺少购买/评测意图 |
| 49 | MQ’s World | -10 | 食谱频道，与吸尘器产品推广场景基本无关 |
| 50 | Brushroll Lover ASMR | 5 | ASMR吸尘声频道，强烈偏音效，不适合产品推广 |
| 52 | Smart Kitchen | 0 | 厨房和消费电子泛相关，但无吸尘器或清洁场景证据 |
| 54 | It's me Yushi TV | 1 | 仅有泛化开箱标签，无清洁家电或评测购买语境 |
| 56 | Mitisha P | 2 | 仅有泛科技标签，偏苹果内容，和吸尘器推广关联很弱 |
| 58 | Scary Talking Head | -15 | 游戏恐怖解谜频道，与吸尘器推广目标明显不符 |
| 66 | R.E.S.T. | 5 | 白噪音/睡眠ASMR频道，吸尘器词仅是噪点，推广格式强不匹配 |
| 70 | TechGround in English | 0 | 无标签无内容信号，无法判断与吸尘器推广相关 |
| 74 | Max Free | 0 | 车类主域为主，与家用吸尘器推广不符 |

## xtb@prompt:0c320fdab1e3-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 29 | Her Cozy Rituals | -13 | 近期多是吸尘清洁ASMR，标签偏健身生活，投放格式不匹配 |
| 49 | Serba Serbi | -7 | 标签不相关，近期虽有吸尘器短视频，但整体内容杂乱 |
| 53 | Shanice At Home | -10 | 生活带货/出版类频道，无吸尘器相关标签，近10条全不匹配 |
| 59 | CleanFlow ASMR | -22 | 白噪音/ASMR清洁流，属于强格式错配，不适合吸尘器推广 |
| 70 | Gadget Flow | -6 | 仅泛科技弱相关，近期十条几乎全无真空清洁器内容 |
| 71 | Genevieve Moore88 | -20 | 喜剧恶搞频道，近期内容均不支持吸尘器推广 |
| 82 | Pool Cleaning Hacks | -10 | 内容几乎全是泳池清洁，不适合家用吸尘器推广 |
| 83 | Dylan Saborio | -1 | 无相关标签，最近内容也与吸尘器无关 |
| 106 | The Review Rewind | -10 | 频道是泛产品评测，近10条与吸尘器无关，缺少清洁家电信号 |
| 110 | synthpro | -20 | 频道以合成器音乐/维修为主，和吸尘器推广场景明显不符 |
| 111 | Boxium Reviews | -7 | 工具评测频道，近10条无吸尘器相关内容，只有泛家居弱相关 |
| 114 | Vacuum State | -5 | 内容是娱乐向“Vacuum vs X”，缺少清洁器评测/购买意图 |
| 116 | Yaber Home | -26 | 频道主标签偏投影娱乐，虽有吸尘器近作但整体召回主题不匹配 |
| 119 | Renewable ASTK | -10 | 无相关标签，近期内容为随机小家电和配件，和吸尘器投放不匹配 |
| 123 | 5X Finds | -10 | 无吸尘器相关标签，近期也没有吸尘器内容 |
| 125 | Techno Vision HD | -24 | 游戏内容为主，吸尘器只是偶发评测，受众和场景不匹配 |
| 127 | chelsea palmer | -9 | 时尚生活频道，清洁相关信号太弱，近期内容几乎全不相关 |
| 131 | Meagan Rose | -7 | 清洁场景相关，但缺少吸尘器产品与购买意图，近况多为泛清洁内容 |
| 132 | Sami Luo Tech | -9 | 科技测评向，和吸尘器品类关联弱，近期内容几乎全是其他电子产品 |
| 133 | ROBOCLEAN AURA UZBEKISTAN RASMIY | 0 | 直连吸尘器词，但内容偏ASMR和剧情式促销，格式不适合投放 |
| 134 | Griff | -10 | 户外落叶清理为主，叶吸类工具与家用吸尘器不是同一购买场景 |
| 136 | Dremel | -9 | DIY工具频道，最近内容与吸尘器推广偏离较大 |
| 143 | FITIGER | -9 | 主题为防夹喉急救设备，近10条均不相关，非吸尘器推广场景 |
| 146 | Jeremy Waller | -10 | 标签与吸尘器无关，近10条内容多为旅行/理财/美食，适合度低 |
| 153 | BGGT Maker | -25 | 娱乐梗/实验号，和吸尘器推广无关 |
| 154 | Smart Easy Home | -12 | 家居清洁+ASMR，偏氛围展示，不是吸尘器购买推广 |
| 155 | Vacuum Vibe | -25 | ASMR 吸尘清洁频道，格式不适合做吸尘器推广 |
| 157 | Ira Motherhood | -10 | 母婴生活内容，近10条无清洁/吸尘器相关，推广相关性弱 |
| 158 | Clean with Prime | -15 | 清洁ASMR为主，缺少测评购买意图，近期10条均偏娱乐内容 |
| 161 | Colton Crump DIY | -8 | 家装DIY频道，只有泛家居标签，近10期全是空气冷却器内容 |

## Notes
- Page-level rates use `page_size` from each run metadata.
- Cause categories are heuristic clusters from `why_short`; review representative rows before making product decisions.
