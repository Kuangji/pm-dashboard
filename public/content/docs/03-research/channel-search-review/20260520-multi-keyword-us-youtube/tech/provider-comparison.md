# Channel Search Provider Comparison

- keyword: tech
- platform: youtube
- country: us
- left: nox
- right: debugger
- left_rule_version: -
- right_rule_version: -
- left_prompt_hash: -
- right_prompt_hash: -

## Run Overview
| run | provider | rule_version | total | fit | adjacent | badcase | badcase率 | <0 | 0-9 | 10-19 | 20+ |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| nox | nox | - | 1500 | 708 | 410 | 382 | 25.5% | 54 | 339 | 167 | 940 |
| debugger | debugger | - | 1500 | 820 | 400 | 280 | 18.7% | 34 | 269 | 183 | 1014 |

## Page-Level Badcase Rate
| page | nox_total | nox_badcase | nox_badcase率 | debugger_total | debugger_badcase | debugger_badcase率 | badcase率差 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 50 | 2 | 4.0% | 50 | 0 | 0.0% | 4.0% |
| 2 | 50 | 2 | 4.0% | 50 | 4 | 8.0% | -4.0% |
| 3 | 50 | 1 | 2.0% | 50 | 1 | 2.0% | 0.0% |
| 4 | 50 | 3 | 6.0% | 50 | 1 | 2.0% | 4.0% |
| 5 | 50 | 2 | 4.0% | 50 | 1 | 2.0% | 2.0% |
| 6 | 50 | 7 | 14.0% | 50 | 0 | 0.0% | 14.0% |
| 7 | 50 | 8 | 16.0% | 50 | 5 | 10.0% | 6.0% |
| 8 | 50 | 4 | 8.0% | 50 | 1 | 2.0% | 6.0% |
| 9 | 50 | 8 | 16.0% | 50 | 1 | 2.0% | 14.0% |
| 10 | 50 | 10 | 20.0% | 50 | 2 | 4.0% | 16.0% |
| 96 | 50 | 13 | 26.0% | 50 | 6 | 12.0% | 14.0% |
| 97 | 50 | 15 | 30.0% | 50 | 8 | 16.0% | 14.0% |
| 98 | 50 | 20 | 40.0% | 50 | 7 | 14.0% | 26.0% |
| 99 | 50 | 13 | 26.0% | 50 | 10 | 20.0% | 6.0% |
| 100 | 50 | 13 | 26.0% | 50 | 13 | 26.0% | 0.0% |
| 101 | 50 | 8 | 16.0% | 50 | 7 | 14.0% | 2.0% |
| 102 | 50 | 16 | 32.0% | 50 | 11 | 22.0% | 10.0% |
| 103 | 50 | 12 | 24.0% | 50 | 15 | 30.0% | -6.0% |
| 104 | 50 | 9 | 18.0% | 50 | 8 | 16.0% | 2.0% |
| 105 | 50 | 16 | 32.0% | 50 | 14 | 28.0% | 4.0% |
| 191 | 50 | 16 | 32.0% | 50 | 17 | 34.0% | -2.0% |
| 192 | 50 | 19 | 38.0% | 50 | 16 | 32.0% | 6.0% |
| 193 | 50 | 25 | 50.0% | 50 | 21 | 42.0% | 8.0% |
| 194 | 50 | 22 | 44.0% | 50 | 18 | 36.0% | 8.0% |
| 195 | 50 | 18 | 36.0% | 50 | 10 | 20.0% | 16.0% |
| 196 | 50 | 17 | 34.0% | 50 | 17 | 34.0% | 0.0% |
| 197 | 50 | 19 | 38.0% | 50 | 15 | 30.0% | 8.0% |
| 198 | 50 | 17 | 34.0% | 50 | 17 | 34.0% | 0.0% |
| 199 | 50 | 26 | 52.0% | 50 | 17 | 34.0% | 18.0% |
| 200 | 50 | 21 | 42.0% | 50 | 17 | 34.0% | 8.0% |

## Badcase Overlap
| metric | count |
| --- | --- |
| shared_badcase | 8 |
| nox_only_badcase | 374 |
| debugger_only_badcase | 272 |

## Badcase Cause Summary
| provider | category | count |
| --- | --- | --- |
| nox | 科技/电子垂类偏离 | 211 |
| nox | 娱乐/儿童/泛内容偏离 | 82 |
| nox | 证据缺失或信号不足 | 76 |
| nox | 宠物/动物受众冲突 | 7 |
| nox | 其他 | 5 |
| nox | 泛相关性偏离 | 1 |
| debugger | 科技/电子垂类偏离 | 161 |
| debugger | 证据缺失或信号不足 | 70 |
| debugger | 娱乐/儿童/泛内容偏离 | 38 |
| debugger | 其他 | 8 |
| debugger | 宠物/动物受众冲突 | 3 |

## Shared Badcases
| channel | nox | debugger |
| --- | --- | --- |
| MudiwAura👑 | 音乐娱乐频道，和科技推广目标不符 | 娱乐舞蹈为主，科技标签只是辅 |
| Socially Inept | 纯娱乐笑话频道，和科技推广不符 | 喜剧娱乐为主，科技标签不足以支撑产品推广 |
| Bloomberg Television | 财经新闻为主，缺少科技产品推广信号 | 主频道是财经新闻，科技只是边缘话题 |
| The Investor Channel | 股票财经频道，和科技产品推广相关性很弱 | 投资财经号，科技只是标的讨论 |
| Tech Design | 纯娱乐故事向，缺少科技产品推广场景 | 娱乐梗图故事向，科技只是话题装饰 |
| PC BUILD-ASMR | PC相关但ASMR是强格式错配 | ASMR建机为主，促销场景不合适 |
| Darlin mesaje | 无科技相关标签，偏资讯社区 | 娱乐短内容为主，tech仅弱露出 |
| MoToBike | 摩托车销售内容，缺少 tech 推广语境 | 摩托车内容为主，科技推广不匹配 |

## nox-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 11 | DarkPlayzz | 5 | 宗教诵读为主，科技只是边缘标签，不适合推广 |
| 38 | Plainrock124 | 5 | 破坏式娱乐频道，虽有 tech 标签但不适合推广 |
| 67 | MOIN BLAZE | 5 | 宗教内容为主，科技标签不足以代表受众 |
| 85 | ABEiiiKU | 10 | 直击tech但ASMR格式强不匹配，缺少评测购买语境 |
| 141 | Hafu Go | 3 | 仅有测试/DIY 弱相关，主体偏娱乐短视频 |
| 162 | Rad | 8 | ASMR/氛围向，和实物科技推广格式不匹配 |
| 187 | Hamster Kombat | 0 | 加密/金融游戏为主，和科技产品推广无关 |
| 198 | Digital Express Universe | 5 | ASMR/游戏短视频为主，存在明显格式不匹配 |
| 237 | VOZOL RUSSIA | 10 | ASMR为主且带音频展示属性，属于明显推广格式不匹配 |
| 241 | Christian Perez | 0 | 缺少tech相关标签，内容以游戏恐怖玩法为主，不适合科技推广 |
| 257 | Becca Farsace | 0 | 无科技标签，生活方式 vlog 为主，相关性弱 |
| 268 | TechLead | 0 | 缺少 tech 标签，金融/加密为主，不适合科技推广 |
| 288 | Elastic Dimension Records | 5 | 音乐风格频道，tech 只是曲风标签 |
| 291 | WSJ Podcasts | -15 | 新闻政治播客，科技产品推广不合适 |
| 298 | Our Future | 5 | 短视频故事型频道，科技推广转化弱 |
| 311 | panda tech | 5 | ASMR/舒缓音频导向，和科技推广格式不匹配 |
| 319 | NatureBased | 6 | 科幻娱乐为主，科技仅是主题点缀 |
| 325 | Uk Ashraf Reactions | 7 | 娱乐反应向为主，科技只是点缀，不适合投放 |
| 347 | Hobby Explorer | 0 | 泛生活/地域频道，科技推广相关信号不足 |
| 350 | The Klyshe Code | 15 | 有科技开箱信号，但ASMR/娱乐格式不适合推广 |
| 364 | TK TAMILAN | -5 | 娱乐/搞笑/动漫向频道，缺少科技推广相关受众与场景 |
| 373 | Gary Woo | 0 | 个人vlog/食物/时尚向，缺少tech产品推广信号 |
| 382 | julia k crist | 2 | 生活vlog为主，仅有少量电子产品线索 |
| 385 | HackHerApp | -15 | 娱乐政治内容，和科技推广不匹配 |
| 407 | Kickstarter | 0 | 仅生活类标签，缺少科技推广语境 |
| 412 | Social X Files | 0 | 娱乐短视频为主，缺少科技推广场景 |
| 414 | Nexus Dim | 0 | 宗教诵读频道，和科技推广无关 |
| 415 | Phono Tech | -15 | ASMR/助眠放松型，明显不适合科技推广 |
| 419 | Ali Huseyn Mobileshop | -10 | 喜剧娱乐频道，和科技推广不匹配 |
| 421 | MR SRV | 0 | 豪车奢侈生活向，科技推广关联很弱 |

## debugger-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 155 | Just smile | 5 | 剧情情绪娱乐为主，tech仅弱露出，不适合推广 |
| 316 | ALCHIMIST-ZIO | 5 | 喜剧短剧频道，科技词不代表推广适配 |
| 325 | Gopu sahu | 10 | 病毒式实验短片为主，不像产品推广号 |
| 342 | Austin Nasso | 5 | 喜剧主导，科技只是表层标签，不适合产品推广 |
| 344 | Banana Movies | 5 | 影视娱乐占主导，科技标签不支撑投放 |
| 361 | Purvora | 5 | 娱乐/恶搞/故事化内容占主导，科技标签不足以支撑推广 |
| 402 | Mr Unkit | 8 | ASMR开箱/音效为主，明显偏格式娱乐，不适合科技推广 |
| 477 | snaptocks | 10 | 以故事动画为主，科技标签偏附带 |
| 493 | NH Solution | 10 | 食物短视频为主，科技标签不构成场景 |
| 4754 | Spencertified | 0 | 电子内容相关，但ASMR形式不利于产品推广 |
| 4768 | Danni Lou Reviews | 2 | 只有泛购物评测，科技定向不足 |
| 4774 | RF Tech Reviews | 0 | 无标签和内容证据，难以判断为相关 |
| 4788 | Jimy Bytes | -15 | 娱乐表情包主导，科技推广场景明显不适合 |
| 4790 | krishashok | 0 | 主内容是美食健康，科技推广相关性很弱 |
| 4794 | N Exp | 0 | 车模/汽车为主，和科技推广关联不足 |
| 4808 | CyberWebFX | 0 | 偏素材分发，缺少科技产品推广语境 |
| 4811 | Trevor Zheng | High Ticket Dropshipping | 0 | 高票电商/金融为主，科技相关弱 |
| 4815 | The Street Wonder | -15 | 音乐频道，Tech House 只是曲风 |
| 4823 | Wispr Flow AI | 0 | 无有效标签，无法判断科技相关性 |
| 4824 | ZyqloClips | 0 | 超级英雄/游戏混杂，科技推广不适合 |
| 4826 | Real Deal Reviews | -15 | 时尚服饰评测，与科技产品推广场景不匹配 |
| 4833 | Dr. Sam Swapn (Strategism_Inc) | 0 | 无相关标签，无法判断科技推广相关性 |
| 4835 | Ricoma TV | 0 | 工业缝纫和刺绣设备，不是科技推广主场 |
| 4868 | This And That And Everything In Between | 0 | 标签偏财经/成长，缺少科技产品推广相关信号 |
| 4877 | Infinite Wonders | 0 | 无标签无内容信号，无法判断 |
| 4885 | Tekrah muzik | -15 | 音乐氛围内容，和科技推广格式不匹配 |
| 4889 | China Shop - Logistics | 0 | 无有效标签，缺少相关信号 |
| 4893 | CEOdotcom | 0 | 商业人物向，缺少科技相关信号 |
| 4899 | Cell Signaling Technology, Inc. | 0 | 生命科学技术品牌，但非通用科技推广 |
| 4900 | New York Times Events | 0 | 新闻活动向，科技相关信号不足 |

## Notes
- Page-level rates use `page_size` from each run metadata.
- Cause categories are heuristic clusters from `why_short`; review representative rows before making product decisions.
