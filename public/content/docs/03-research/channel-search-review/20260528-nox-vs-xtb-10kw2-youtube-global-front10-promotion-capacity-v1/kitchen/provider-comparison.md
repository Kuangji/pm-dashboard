# Channel Search Provider Comparison

- keyword: kitchen
- platform: youtube
- country: -
- left: nox@promotion-capacity-v1 (tmp/channel-search-review/20260528-nox-vs-xtb-10kw2-youtube-global-front10-promotion-capacity-v1/kitchen/nox-youtube)
- right: xtb@promotion-capacity-v1 (tmp/channel-search-review/20260528-nox-vs-xtb-10kw2-youtube-global-front10-promotion-capacity-v1/kitchen/xtb-youtube)
- left_rule_version: promotion-capacity-v1
- right_rule_version: promotion-capacity-v1
- left_prompt_hash: b87da85cf79a
- right_prompt_hash: b87da85cf79a

## Run Overview
| run | provider | rule_version | total | fit | adjacent | badcase | badcase率 | <0 | 0-9 | 10-19 | 20+ |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| nox@promotion-capacity-v1 | nox | promotion-capacity-v1 | 500 | 169 | 153 | 178 | 35.6% | 20 | 209 | 24 | 247 |
| xtb@promotion-capacity-v1 | xtb | promotion-capacity-v1 | 500 | 235 | 195 | 70 | 14.0% | 38 | 28 | 102 | 332 |

## Page-Level Badcase Rate
| page | nox@promotion-capacity-v1_total | nox@promotion-capacity-v1_badcase | nox@promotion-capacity-v1_badcase率 | xtb@promotion-capacity-v1_total | xtb@promotion-capacity-v1_badcase | xtb@promotion-capacity-v1_badcase率 | badcase率差 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 50 | 7 | 14.0% | 50 | 5 | 10.0% | 4.0% |
| 2 | 50 | 14 | 28.0% | 50 | 3 | 6.0% | 22.0% |
| 3 | 50 | 17 | 34.0% | 50 | 4 | 8.0% | 26.0% |
| 4 | 50 | 13 | 26.0% | 50 | 5 | 10.0% | 16.0% |
| 5 | 50 | 23 | 46.0% | 50 | 6 | 12.0% | 34.0% |
| 6 | 50 | 21 | 42.0% | 50 | 12 | 24.0% | 18.0% |
| 7 | 50 | 23 | 46.0% | 50 | 4 | 8.0% | 38.0% |
| 8 | 50 | 21 | 42.0% | 50 | 10 | 20.0% | 22.0% |
| 9 | 50 | 17 | 34.0% | 50 | 11 | 22.0% | 12.0% |
| 10 | 50 | 22 | 44.0% | 50 | 10 | 20.0% | 24.0% |

## Badcase Overlap
| metric | count |
| --- | --- |
| shared_badcase | 15 |
| nox@promotion-capacity-v1_only_badcase | 163 |
| xtb@promotion-capacity-v1_only_badcase | 55 |

## Badcase Cause Summary
| provider | category | count |
| --- | --- | --- |
| nox@promotion-capacity-v1 | 娱乐/儿童/泛内容偏离 | 83 |
| nox@promotion-capacity-v1 | 其他 | 45 |
| nox@promotion-capacity-v1 | 证据缺失或信号不足 | 27 |
| nox@promotion-capacity-v1 | 泛相关性偏离 | 15 |
| nox@promotion-capacity-v1 | 宠物/动物受众冲突 | 7 |
| nox@promotion-capacity-v1 | 科技/电子垂类偏离 | 1 |
| xtb@promotion-capacity-v1 | 其他 | 32 |
| xtb@promotion-capacity-v1 | 娱乐/儿童/泛内容偏离 | 28 |
| xtb@promotion-capacity-v1 | 宠物/动物受众冲突 | 5 |
| xtb@promotion-capacity-v1 | 泛相关性偏离 | 5 |

## Shared Badcases
| channel | nox@promotion-capacity-v1 | xtb@promotion-capacity-v1 |
| --- | --- | --- |
| Love toys | 玩具ASMR频道，厨房词命中但受众不符 | 玩具ASMR开箱，不适合真实厨房产品 |
| That Little Puff | 猫咪娱乐内容，和厨房产品推广无关 | 宠物娱乐号，厨房词只是梗，不适合厨房产品投放 |
| ToyToy Unboxing | 玩具ASMR为主，厨房产品受众不对 | ASMR玩具厨房为主，不适合真实厨房产品 |
| Emily Askin | ASMR生活号，缺少厨房主题且格式不匹配 | ASMR休闲格式明显，不适合厨房产品投放 |
| Vovchiki.funhouse | 娱乐短视频为主，与厨房推广不匹配 | 家庭恶搞娱乐号，厨房只是背景标签 |
| BaRaDa | 挑战恶搞内容，与厨房推广明显冲突 | 挑战整蛊频道，与厨房推广不匹配 |
| Cardboard World | 迷你手工/房间场景，厨房相关很弱 | 迷你手工厨房，不适合真实厨房产品推广 |
| TechMoodern | 电影解说娱乐，和厨房无关 | 电影解说为主，厨房/智能家电只是表面标签 |
| 4Teen Challenge | 挑战恶搞向，和厨房推广不符 | 挑战搞笑号，厨房是玩法不是推广场景 |
| The Hayeks | 宠物ASMR，和人用厨房不符 | 宠物ASMR为主，与厨房产品推广强冲突 |
| Jelly DO | 挑战/恶作剧为主，厨房推广格式不匹配 | 挑战/恶搞为主，厨房词不代表推广适配 |
| Kuehnhold Pavella | 娱乐短视频/电影向，和厨房推广目标明显不符 | 影视搞笑切片号，与厨房推广不匹配 |
| Mimi's Art | 娱乐向为主，厨房相关信号很弱 | 娱乐短视频为主，厨房仅标签噪声 |
| BaRaDa Gold | 整蛊挑战频道，不适合厨房产品推广 | 恶搞挑战为主，厨房产品推广不合适 |
| 7MM | 宗教励志频道，与厨房产品无关 | 宗教励志内容为主，厨房词不代表可推广场景 |

## nox@promotion-capacity-v1-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 17 | Alex Do Reaction | 5 | 新闻反应向，和厨房商品推广不匹配 |
| 24 | Tiny King | 5 | 玩具厨房和ASMR，非真实厨房受众 |
| 27 | Toys Drama | 5 | 玩具ASMR娱乐号，和厨房产品推广场景冲突 |
| 62 | CHINALY | 1 | 缺少厨房语义，相关性很弱 |
| 73 | Kami Larae | 10 | ASMR格式不利于实体产品推广 |
| 82 | Taste Maker Tok | 5 | ASMR清洁型，促销场景不匹配 |
| 85 | DRAMANIYA | 5 | 娱乐短视频，厨房只是泛标签 |
| 92 | Parvina_sharipova_sam | 5 | 舞蹈音乐娱乐，厨房受众不符 |
| 93 | Jeremy Clyde | 0 | 时尚生活向，厨房相关很弱 |
| 94 | NAA PERU SIRI | 0 | 泰卢固vlog向，厨房相关很弱 |
| 96 | Official short rells | 5 | 泛娱乐短内容，厨房只是辅助标签 |
| 112 | TrailVent 2.0 | 0 | 美妆发型频道，与厨房主题无关 |
| 114 | Alkan stone | 0 | 无有效标签，无法判断厨房相关性 |
| 127 | TKempDigital | 0 | 情感家庭向，与厨房产品无关 |
| 129 | Multi DO Joy | 0 | 挑战整蛊频道，与厨房产品不匹配 |
| 132 | ProAssembler | 0 | 装配类但无厨房场景，相关性不足 |
| 135 | BaRaDa Challenge | 0 | 挑战整蛊频道，不适合厨房产品推广 |
| 137 | Kolter Winton | 0 | 无可用标签，相关性无法判断为正向 |
| 139 | construction tips trick | 0 | 泛生活技巧频道，厨房相关证据不足 |
| 142 | RSRONYP | 0 | 博彩推广混杂，和厨房产品无关 |
| 146 | Whats Next | 8 | ASMR/满足感强，厨房词不等于可推广场景 |
| 148 | Nasibullo_Ismatullayev | 0 | 艺术时尚音乐向，与厨房产品无关 |
| 149 | Mouth Wide Open | 0 | 杂项娱乐频道，厨房相关性不足 |
| 155 | Chris Petrone | 0 | 缺少厨房或家居相关内容，相关性弱 |
| 160 | Lina Kitchen | -12 | ASMR/玩具开箱为主，和厨房产品推广不匹配 |
| 164 | ALL IN REAL ESTATE | 0 | 几乎无厨房相关信号，无法匹配 |
| 166 | PromoCodePal | 0 | 纯娱乐表情包向，与厨房产品无关 |
| 175 | Mini Yummy | 8 | 微缩厨房与ASMR格式，和常规厨房产品不对口 |
| 180 | CUTE TOYS | 5 | 玩具ASMR为主，厨房词不代表真实受众 |
| 181 | RaPaPa Challenge | -15 | 挑战娱乐为主，与厨房产品不匹配 |

## xtb@promotion-capacity-v1-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 20 | வண்ணமயில்-edits | -3 | 娱乐剪辑为主，厨房只作标题点缀，不适合投放 |
| 38 | Sri Ram | 0 | 娱乐搞笑为主，近期与厨房无关 |
| 43 | Muhsina Finds | 2 | 链接号式内容居多，厨房推广可信度低 |
| 52 | 토이몽 TV - ToyMong Tv | -5 | 玩具ASMR/开箱为主，厨房词只是玩具语境，不适合推广 |
| 79 | Julianna Claire | 0 | ASMR收纳风格强，偏氛围内容，不利厨房产品推广 |
| 88 | HalfFried | 7 | 泛生活vlog为主，厨房只在标签里，相关性弱 |
| 121 | Pradip Khatua | 0 | 娱乐短视频为主，厨房仅是标签，推广适配差 |
| 128 | 𝙎𝙩𝙧𝙖𝙣𝙜𝙚 𝙒𝙞𝙙𝙜𝙚𝙩𝙨 | -2 | Kitchen标签下是ASMR吃播，格式不符 |
| 135 | Cardboard Design | 10 | 只做微缩屋厨房，不是现实厨房受众 |
| 139 | Multi Do Korean | -2 | 挑战娱乐内容盖过厨房标签，不合适 |
| 170 | Our Home stories | 10 | 近期内容与厨房推广偏离明显 |
| 185 | Southh Movies Studios | -5 | 电影评论为主，厨房词只是混入 |
| 191 | JajaToys | -5 | ASMR玩具内容为主，不适合厨房用品 |
| 197 | HOPEFULLY CULTURE | -3 | 村落/野生动物叙事为主，不匹配 |
| 205 | JUGALBANDI Magical Stories | -5 | 剧情动画频道，厨房只是场景 |
| 225 | Neethu santhigiri vlogs | 11 | 园艺内容为主，厨房关联很弱 |
| 236 | Andrey Grechka | -5 | 娱乐恶作剧频道，厨房标签不足以抵消内容错配 |
| 247 | ValRak ASMR | -5 | ASMR饮品声效频道，厨房标签不代表可推广 |
| 252 | Ranwa Family | -10 | 娱乐家庭号，厨房仅在杂项标签，近期明显不匹配 |
| 263 | ZANKids Family | 2 | 娱乐/家庭内容为主，厨房标签被内容形态抵消 |
| 265 | mums great life | 4 | ASMR/清洁满足型，强推广格式不匹配 |
| 273 | Kenenus | 13 | 造炉灶但以ASMR表现，格式不适合产品推广 |
| 283 | daycmie | 10 | ASMR静默Vlog为主，厨房内容有但带货感弱 |
| 288 | MR Vs Army | -5 | ASMR/娱乐为主，厨房词只是内容背景 |
| 297 | Love toys world | -5 | 玩具厨房和ASMR为主，不适合真人厨房产品 |
| 300 | Ayshu with mom | 13 | 标签有厨房，但最近10条都偏家庭搞笑杂谈 |
| 331 | Ganesh Nayak | -2 | 娱乐音乐为主，厨房标签只是表层，不适合推广 |
| 342 | O HOMER | -2 | 动画娱乐为主，厨房标签不构成可推广受众 |
| 345 | BaRaDa Polish | -2 | 挑战娱乐频道，厨房词与内容主题不匹配 |
| 353 | Defacto | 0 | 动物事实+ASMR为主，厨房标签不足以抵消格式不匹配 |

## Notes
- Page-level rates use `page_size` from each run metadata.
- Cause categories are heuristic clusters from `why_short`; review representative rows before making product decisions.
