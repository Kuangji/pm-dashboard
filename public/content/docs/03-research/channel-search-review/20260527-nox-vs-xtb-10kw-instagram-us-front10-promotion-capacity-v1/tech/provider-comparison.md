# Channel Search Provider Comparison

- keyword: tech
- platform: instagram
- country: US
- left: nox@promotion-capacity-v1 (tmp/channel-search-review/20260527-nox-vs-xtb-10kw-instagram-us-front10-promotion-capacity-v1/tech/nox-instagram)
- right: xtb@promotion-capacity-v1 (tmp/channel-search-review/20260527-nox-vs-xtb-10kw-instagram-us-front10-promotion-capacity-v1/tech/xtb-instagram)
- left_rule_version: promotion-capacity-v1
- right_rule_version: promotion-capacity-v1
- left_prompt_hash: b87da85cf79a
- right_prompt_hash: b87da85cf79a

## Run Overview
| run | provider | rule_version | total | fit | adjacent | badcase | badcase率 | <0 | 0-9 | 10-19 | 20+ |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| nox@promotion-capacity-v1 | nox | promotion-capacity-v1 | 500 | 181 | 144 | 175 | 35.0% | 9 | 191 | 41 | 259 |
| xtb@promotion-capacity-v1 | xtb | promotion-capacity-v1 | 500 | 196 | 276 | 28 | 5.6% | 2 | 45 | 62 | 391 |

## Page-Level Badcase Rate
| page | nox@promotion-capacity-v1_total | nox@promotion-capacity-v1_badcase | nox@promotion-capacity-v1_badcase率 | xtb@promotion-capacity-v1_total | xtb@promotion-capacity-v1_badcase | xtb@promotion-capacity-v1_badcase率 | badcase率差 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 50 | 2 | 4.0% | 50 | 0 | 0.0% | 4.0% |
| 2 | 50 | 7 | 14.0% | 50 | 1 | 2.0% | 12.0% |
| 3 | 50 | 12 | 24.0% | 50 | 3 | 6.0% | 18.0% |
| 4 | 50 | 17 | 34.0% | 50 | 3 | 6.0% | 28.0% |
| 5 | 50 | 22 | 44.0% | 50 | 0 | 0.0% | 44.0% |
| 6 | 50 | 21 | 42.0% | 50 | 1 | 2.0% | 40.0% |
| 7 | 50 | 23 | 46.0% | 50 | 6 | 12.0% | 34.0% |
| 8 | 50 | 28 | 56.0% | 50 | 6 | 12.0% | 44.0% |
| 9 | 50 | 21 | 42.0% | 50 | 7 | 14.0% | 28.0% |
| 10 | 50 | 22 | 44.0% | 50 | 1 | 2.0% | 42.0% |

## Badcase Overlap
| metric | count |
| --- | --- |
| shared_badcase | 1 |
| nox@promotion-capacity-v1_only_badcase | 174 |
| xtb@promotion-capacity-v1_only_badcase | 27 |

## Badcase Cause Summary
| provider | category | count |
| --- | --- | --- |
| nox@promotion-capacity-v1 | 科技/电子垂类偏离 | 96 |
| nox@promotion-capacity-v1 | 证据缺失或信号不足 | 60 |
| nox@promotion-capacity-v1 | 娱乐/儿童/泛内容偏离 | 12 |
| nox@promotion-capacity-v1 | 其他 | 4 |
| nox@promotion-capacity-v1 | 宠物/动物受众冲突 | 3 |
| xtb@promotion-capacity-v1 | 娱乐/儿童/泛内容偏离 | 13 |
| xtb@promotion-capacity-v1 | 科技/电子垂类偏离 | 12 |
| xtb@promotion-capacity-v1 | 宠物/动物受众冲突 | 1 |
| xtb@promotion-capacity-v1 | 其他 | 1 |
| xtb@promotion-capacity-v1 | 证据缺失或信号不足 | 1 |

## Shared Badcases
| channel | nox@promotion-capacity-v1 | xtb@promotion-capacity-v1 |
| --- | --- | --- |
| CONSPIRED - Alternative Media Streaming | 媒体/影视/派对风格，非科技受众 | 阴谋娱乐向内容，科技标签不足以支撑推广 |

## nox@promotion-capacity-v1-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 25 | Jonjon | 5 | ASMR氛围向，属于强格式不匹配，不适合推广 |
| 35 | Kyle Krueger | 0 | 仅reels泛标签，无tech相关信号 |
| 60 | Sajjaad Khader | 0 | 无相关标签与内容信号 |
| 63 | Romina Gafur | 0 | 仅有 ad 标签，无技术相关信号 |
| 76 | No Tech for Apartheid | 20 | 倡议/政治号，非产品推广场景 |
| 78 | Kaitlynd McQueen | 0 | 无科技相关信号 |
| 79 | Voodies Interviews | 0 | 访谈号与科技无关 |
| 91 | Vince Do | 0 | 纯生活vlog，缺少科技受众 |
| 93 | Caden Wolf | 0 | 无科技相关信号 |
| 102 | Magan | Building in Public | 0 | 缺少科技相关标签与内容证据，召回价值低 |
| 103 | Brandon LaChappelle | 0 | 以生活vlog为主，和tech推广关联弱 |
| 112 | Alex Falcone | 0 | 娱乐向内容为主，和tech推广关联弱 |
| 116 | ryan | 0 | 缺少科技相关标签与内容证据，召回价值低 |
| 119 | Gohar Khan | 0 | 教育生活向为主，和tech推广关联弱 |
| 123 | kumora | 0 | 缺少科技相关标签与内容证据，召回价值低 |
| 129 | Wowville | 0 | 无标签，无相关信号 |
| 131 | madelyn | 0 | 无标签，无相关信号 |
| 138 | More Perfect Union | 0 | 工会/咖啡议题，与 tech 无关 |
| 144 | Ace | Cybersecurity💻 | 0 | 娱乐标签为主，缺少科技信号 |
| 146 | Jaxski | 0 | 无标签，无相关信号 |
| 147 | Sam Hlabangana | 0 | 无标签，无相关信号 |
| 151 | Derek She | 0 | 无标签与内容证据，无法支撑tech推广 |
| 156 | TRIGG WATSON | 10 | 科技直标但核心是魔术娱乐，渠道主题不匹配 |
| 157 | Aashna Doshi | 0 | 无标签与视频证据，相关性不足 |
| 159 | Alexander Moreo | 0 | 无标签与内容证据，相关性不足 |
| 161 | Robert Wensley | 0 | 无相关标签，难以承接tech推广 |
| 163 | Allieflowz 🪼🔮🦇🕸️🪻 | 10 | 舞蹈表演号带tech标记，推广相关性弱 |
| 165 | Leo Herrera | 0 | 无标签与内容证据，相关性不足 |
| 166 | Humble tech worker | 0 | 无标签且仅名字含tech，缺少可用信号 |
| 169 | Gökçe Ercan Seymour | 0 | 无标签与内容证据，相关性不足 |

## xtb@promotion-capacity-v1-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 119 | WorldWide Tweets | -10 | 偏娱乐内容，科技产品推广相关性弱，不适合 |
| 129 | NATE🔥 | 0 | 娱乐向，虽有AI但不适合科技产品推广 |
| 137 | Donald Burton | 0 | 偏AI/区块链，科技推广相关性太弱 |
| 187 | KP Parker | 0 | 泛娱乐/生活向，几乎无科技受众 |
| 191 | FELT Zine | 0 | NFT/艺术为主，和科技推广关联弱 |
| 196 | Internetcharts | 10 | 偏娱乐搞笑内容，科技标签不足且格式不匹配 |
| 259 | Anthony | 0 | 金融/交易向，几乎没有科技类召回信号 |
| 311 | dreamweaver0236 | -10 | 主要是宝宝娱乐内容，和科技产品推广目标不匹配 |
| 313 | AI MONEY | 5 | 主体是宠物内容，科技标签不足以支撑推广 |
| 343 | Jake Beau | 8 | ASMR/舒缓风格为主，科技带货匹配低 |
| 344 | Jarrett Rone | 0 | 无科技主线，受众不匹配 |
| 346 | Marque Cox | 0 | 娱乐梗内容为主，科技相关不足 |
| 347 | Nick Harrison | 0 | 以摔跤/音乐/娱乐为主，几乎无科技或产品推广信号 |
| 354 | Artur Balaian | 1 | 动画娱乐为主，科技信号太弱 |
| 361 | Thomas Middleditch | 1 | 喜剧娱乐为主，不适合科技推广 |
| 375 | Gianni Marchisello Broquard | 5 | 兴趣分散，科技仅零散出现 |
| 380 | Guwop 👑 | 0 | 以viral/旅行为主，和科技产品推广不匹配 |
| 387 | Sheridah Thomas🦊💋 | 0 | 时尚/美妆/喜剧为主，科技信号太弱 |
| 399 | Nick Jackson | 1 | 仅有AI弱相关，整体偏泛内容 |
| 404 | Joey Suarez | 1 | 娱乐舞蹈为主，AI仅弱相关，科技推广匹配度低 |
| 435 | KATELYN RHOADES | Social Media Agency | 0 | 无明显科技相关，偏社媒营销 |
| 436 | Digital Drew® SEM | 0 | 无科技主题，偏营销代运营 |
| 438 | Nazeer | 0 | 无科技相关，娱乐型内容 |
| 440 | Pinterest Marketing Education | 0 | 无科技相关，偏Pinterest教育 |
| 444 | Alexandre Kazuo Kubo | 1 | AI娱乐内容为主，科技相关弱 |
| 447 | psais | 0 | 无科技相关，偏穿搭审美 |
| 494 | Content Creation Tips 🧠 | Grow Your Social Media 📲 | 0 | 内容增长号，与科技产品推广缺少直接关联 |

## Notes
- Page-level rates use `page_size` from each run metadata.
- Cause categories are heuristic clusters from `why_short`; review representative rows before making product decisions.
