# Channel Search Provider Comparison

- keyword: tech
- platform: youtube
- country: US
- left: nox@promotion-capacity-v1 (tmp/channel-search-review/20260526-nox-vs-xtb-10kw-youtube-us-front10-promotion-capacity-v1/tech/nox-youtube)
- right: xtb@promotion-capacity-v1 (tmp/channel-search-review/20260526-nox-vs-xtb-10kw-youtube-us-front10-promotion-capacity-v1/tech/xtb-youtube)
- left_rule_version: promotion-capacity-v1
- right_rule_version: promotion-capacity-v1
- left_prompt_hash: b87da85cf79a
- right_prompt_hash: b87da85cf79a

## Run Overview
| run | provider | rule_version | total | fit | adjacent | badcase | badcase率 | <0 | 0-9 | 10-19 | 20+ |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| nox@promotion-capacity-v1 | nox | promotion-capacity-v1 | 500 | 285 | 172 | 43 | 8.6% | 6 | 36 | 25 | 433 |
| xtb@promotion-capacity-v1 | xtb | promotion-capacity-v1 | 500 | 218 | 242 | 40 | 8.0% | 29 | 36 | 78 | 357 |

## Page-Level Badcase Rate
| page | nox@promotion-capacity-v1_total | nox@promotion-capacity-v1_badcase | nox@promotion-capacity-v1_badcase率 | xtb@promotion-capacity-v1_total | xtb@promotion-capacity-v1_badcase | xtb@promotion-capacity-v1_badcase率 | badcase率差 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 50 | 2 | 4.0% | 50 | 1 | 2.0% | 2.0% |
| 2 | 50 | 2 | 4.0% | 50 | 4 | 8.0% | -4.0% |
| 3 | 50 | 0 | 0.0% | 50 | 4 | 8.0% | -8.0% |
| 4 | 50 | 2 | 4.0% | 50 | 4 | 8.0% | -4.0% |
| 5 | 50 | 2 | 4.0% | 50 | 6 | 12.0% | -8.0% |
| 6 | 50 | 8 | 16.0% | 50 | 2 | 4.0% | 12.0% |
| 7 | 50 | 7 | 14.0% | 50 | 4 | 8.0% | 6.0% |
| 8 | 50 | 8 | 16.0% | 50 | 5 | 10.0% | 6.0% |
| 9 | 50 | 6 | 12.0% | 50 | 3 | 6.0% | 6.0% |
| 10 | 50 | 6 | 12.0% | 50 | 7 | 14.0% | -2.0% |

## Badcase Overlap
| metric | count |
| --- | --- |
| shared_badcase | 0 |
| nox@promotion-capacity-v1_only_badcase | 43 |
| xtb@promotion-capacity-v1_only_badcase | 40 |

## Badcase Cause Summary
| provider | category | count |
| --- | --- | --- |
| nox@promotion-capacity-v1 | 科技/电子垂类偏离 | 24 |
| nox@promotion-capacity-v1 | 娱乐/儿童/泛内容偏离 | 11 |
| nox@promotion-capacity-v1 | 证据缺失或信号不足 | 7 |
| nox@promotion-capacity-v1 | 其他 | 1 |
| xtb@promotion-capacity-v1 | 娱乐/儿童/泛内容偏离 | 20 |
| xtb@promotion-capacity-v1 | 科技/电子垂类偏离 | 14 |
| xtb@promotion-capacity-v1 | 宠物/动物受众冲突 | 3 |
| xtb@promotion-capacity-v1 | 证据缺失或信号不足 | 2 |
| xtb@promotion-capacity-v1 | 其他 | 1 |

## Shared Badcases
| channel | nox@promotion-capacity-v1 | xtb@promotion-capacity-v1 |
| --- | --- | --- |

## nox@promotion-capacity-v1-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 10 | DarkPlayzz | 5 | 宗教诵读主频道，与科技推广不符 |
| 40 | Plainrock124 | 5 | 破坏式娱乐内容，不适合做科技产品推广 |
| 84 | ABEiiiKU | 10 | 虽有开箱，但ASMR导向强，产品推广适配差 |
| 89 | MOIN BLAZE | 5 | 宗教主内容为主，科技仅弱标签，明显不适合 |
| 165 | Rad | 8 | ASMR/氛围型，不适合做科技产品推广 |
| 174 | Hamster Kombat | 0 | 加密金融频道，与科技推广主题不匹配 |
| 215 | Digital Express Universe | 8 | 有tech但ASMR/游戏混杂，格式不匹配 |
| 237 | VOZOL RUSSIA | 10 | ASMR+品牌向内容，tech词不改成可投放的推广位 |
| 259 | Becca Farsace | 0 | 缺少科技产品语义，偏生活方式频道，不适合 |
| 262 | Christian Perez | 0 | 纯游戏娱乐向，和科技产品推广关联弱 |
| 273 | TECH Tire Repairs | 2 | 汽车轮胎维修向，tech标签疑似泛化 |
| 276 | WSJ Podcasts | 0 | 新闻播客，缺少科技或产品信号 |
| 278 | TechLead | 0 | 财经加加密为主，tech标签缺位 |
| 280 | Kelson01 | 0 | 游戏内容，和科技产品推广关联弱 |
| 289 | MudiwAura👑 | -15 | 音乐舞蹈娱乐向，和科技产品推广场景不匹配 |
| 298 | Elastic Dimension Records | 5 | 音乐/techno频道，tech为风格词，不适合科技产品推广 |
| 302 | Socially Inept | 0 | 娱乐电影幽默号，与 tech 推广无关 |
| 306 | Our Future | 10 | story/shorts 叙事向，tech 仅弱挂钩 |
| 312 | NatureBased | 8 | 科幻娱乐为主，tech仅陪衬，产品推广适配弱 |
| 315 | ALCHIMIST-ZIO | 7 | 娱乐搞笑为主，tech仅陪衬，不适合产品推广 |
| 318 | panda tech | 5 | ASMR/放松音效为主，和科技产品推广格式强冲突 |
| 325 | Bloomberg Television | 0 | 新闻财经频道，和tech产品推广目标不匹配 |
| 327 | The Investor Channel | 0 | 仅股票相关，缺少tech主题与产品推广场景 |
| 352 | Tech Design | 0 | 纯娱乐故事向，缺少科技产品推广能力 |
| 362 | Hobby Explorer | 0 | 移民生活类频道，与 tech 产品推广无关 |
| 368 | Gary Woo | 0 | 生活/美食/时尚向，与 tech 产品推广无关 |
| 369 | Rolex Facts | -15 | 娱乐卡通向，和 tech 产品推广不匹配 |
| 370 | @annalifeunedited | 13 | ASMR/日常向，虽有 tech 标签但产品推广匹配度差 |
| 378 | TK TAMILAN | -15 | 娱乐/动漫/搞笑为主，与科技推广明显不符 |
| 389 | The Klyshe Code | 10 | ASMR/娱乐主导，虽有unboxing但不适合产品推广 |

## xtb@promotion-capacity-v1-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 44 | gptars | 10 | 娱乐短视频为主，偏玩梗非评测，不适合科技推广 |
| 63 | InterLink Labs | -10 | 娱乐/宠物主导，科技相关信号太弱，不适合推广科技产品 |
| 66 | CRYPTO VANGUARD | -5 | 娱乐和加密投机为主，虽有AI/区块链但不适合科技产品推广 |
| 71 | Kahani Markaz | -20 | 故事娱乐为主，科技仅挂标签，近期内容完全不匹配 |
| 94 | Xecurity Pulse | 2 | 科技标签强，但近10条多为移民/人生内容 |
| 104 | DXFILMS | -5 | AI娱乐短视频为主，偏八卦梗，不适合科技推广 |
| 105 | Maye Muses | -19 | 故事/娱乐导向，科技信号弱，产品推广不匹配 |
| 119 | Trevor ai | 0 | 娱乐梗图为主，虽有科技标签但不适合产品推广 |
| 124 | Kristofer Prophet | -34 | 娱乐音乐为主，和tech产品推广场景明显不符 |
| 154 | Chad Rocky | -25 | 娱乐梗图频道，科技推广匹配度很低 |
| 184 | Tim Truth | -5 | 内容以政治阴谋为主，和科技产品推广场景明显不符 |
| 188 | Lifeline Animal Rescue | -2 | 动物救援与娱乐内容为主，科技标签偏泛，推广不合适 |
| 197 | AiStory2050 | -15 | 娱乐短剧/表情包号，非科技产品推广场景 |
| 204 | CRYPTO VECTOR | -18 | 以多米诺娱乐和加密推广为主，和tech产品推广偏离 |
| 221 | CoinFluence | -15 | 以加密/ASMR为主，近期多交易内容，不适合科技产品推广 |
| 223 | e-man | -8 | 娱乐/故事向内容为主，AI标签不足以支撑科技推广 |
| 228 | Crypto Nitro | -10 | 加密代币频道为主，科技相关证据弱且近期不匹配 |
| 239 | LSP开车 | -13 | 娱乐/成人向为主，和科技推广格式冲突 |
| 248 | ariinbeijing | -8 | 以语言/街访为主，近期几乎无技术内容 |
| 252 | NEXTGEN ROBOTICS | -5 | 音乐娱乐频道，科技标签不足以抵消明显的内容格式错配 |
| 256 | GESARA news | -5 | AI/区块链只出现在阴谋论语境，整体不适合科技推广 |
| 319 | AI Adventure | 2 | 娱乐短内容为主，科技词存在但不适合产品推广 |
| 327 | SURVIVAL DISPATCH NEWS | -13 | 政治生存新闻占主导，内容形态与 tech 推广明显不匹配 |
| 333 | The Atlas Project | 1 | 近期内容大量偏生活化，和科技推广明显偏离 |
| 349 | DeFiVerse | 0 | 娱乐化交易梗号，科技主题弱，近10条基本不适合科技推广 |
| 369 | Yggdendro | 13 | 有科技标签但内容混杂游戏/生活，近期偏离较多 |
| 376 | Constancy | -5 | 科技标签虽有，但黑客/作弊内容占主导，近期全不适合推广 |
| 392 | Good Schitt! | 2 | 内容偏杂乱娱乐，近期多为吃播/梗图/风景类 |
| 395 | AI or NOTHING | 2 | 短视频新闻/娱乐占主，推广科技产品匹配度低 |
| 400 | Fin Tek | 6 | 以股票投顾为主，和科技产品推广场景关联弱 |

## Notes
- Page-level rates use `page_size` from each run metadata.
- Cause categories are heuristic clusters from `why_short`; review representative rows before making product decisions.
