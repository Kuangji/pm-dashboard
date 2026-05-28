# Channel Search Provider Comparison

- keyword: tech
- platform: tiktok
- country: US
- left: nox@promotion-capacity-v1 (tmp/channel-search-review/20260527-nox-vs-xtb-10kw-tiktok-us-front10-promotion-capacity-v1/tech/nox-tiktok)
- right: xtb@promotion-capacity-v1 (tmp/channel-search-review/20260527-nox-vs-xtb-10kw-tiktok-us-front10-promotion-capacity-v1/tech/xtb-tiktok)
- left_rule_version: promotion-capacity-v1
- right_rule_version: promotion-capacity-v1
- left_prompt_hash: b87da85cf79a
- right_prompt_hash: b87da85cf79a

## Run Overview
| run | provider | rule_version | total | fit | adjacent | badcase | badcase率 | <0 | 0-9 | 10-19 | 20+ |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| nox@promotion-capacity-v1 | nox | promotion-capacity-v1 | 500 | 292 | 163 | 45 | 9.0% | 4 | 42 | 37 | 417 |
| xtb@promotion-capacity-v1 | xtb | promotion-capacity-v1 | 500 | 235 | 151 | 114 | 22.8% | 103 | 55 | 109 | 233 |

## Page-Level Badcase Rate
| page | nox@promotion-capacity-v1_total | nox@promotion-capacity-v1_badcase | nox@promotion-capacity-v1_badcase率 | xtb@promotion-capacity-v1_total | xtb@promotion-capacity-v1_badcase | xtb@promotion-capacity-v1_badcase率 | badcase率差 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 50 | 0 | 0.0% | 50 | 3 | 6.0% | -6.0% |
| 2 | 50 | 3 | 6.0% | 50 | 2 | 4.0% | 2.0% |
| 3 | 50 | 3 | 6.0% | 50 | 13 | 26.0% | -20.0% |
| 4 | 50 | 3 | 6.0% | 50 | 6 | 12.0% | -6.0% |
| 5 | 50 | 4 | 8.0% | 50 | 9 | 18.0% | -10.0% |
| 6 | 50 | 4 | 8.0% | 50 | 11 | 22.0% | -14.0% |
| 7 | 50 | 4 | 8.0% | 50 | 20 | 40.0% | -32.0% |
| 8 | 50 | 5 | 10.0% | 50 | 11 | 22.0% | -12.0% |
| 9 | 50 | 7 | 14.0% | 50 | 22 | 44.0% | -30.0% |
| 10 | 50 | 12 | 24.0% | 50 | 17 | 34.0% | -10.0% |

## Badcase Overlap
| metric | count |
| --- | --- |
| shared_badcase | 0 |
| nox@promotion-capacity-v1_only_badcase | 45 |
| xtb@promotion-capacity-v1_only_badcase | 114 |

## Badcase Cause Summary
| provider | category | count |
| --- | --- | --- |
| nox@promotion-capacity-v1 | 科技/电子垂类偏离 | 19 |
| nox@promotion-capacity-v1 | 娱乐/儿童/泛内容偏离 | 14 |
| nox@promotion-capacity-v1 | 证据缺失或信号不足 | 12 |
| xtb@promotion-capacity-v1 | 科技/电子垂类偏离 | 50 |
| xtb@promotion-capacity-v1 | 娱乐/儿童/泛内容偏离 | 42 |
| xtb@promotion-capacity-v1 | 证据缺失或信号不足 | 9 |
| xtb@promotion-capacity-v1 | 宠物/动物受众冲突 | 7 |
| xtb@promotion-capacity-v1 | 其他 | 5 |
| xtb@promotion-capacity-v1 | 泛相关性偏离 | 1 |

## Shared Badcases
| channel | nox@promotion-capacity-v1 | xtb@promotion-capacity-v1 |
| --- | --- | --- |

## nox@promotion-capacity-v1-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 62 | Mr Ali | 7 | 魔术/热点娱乐为主，tech只是附带标签 |
| 68 | @usaclips543 | 7 | 魔术/热点娱乐为主，tech只是附带标签 |
| 69 | socially inept | 10 | 喜剧娱乐为主，tech标签不足以支撑推广 |
| 105 | ShockForce | 10 | 恶搞/冲击式内容为主，科技推广适配差 |
| 116 | gavin | 5 | ASMR格式与常规科技产品推广冲突 |
| 149 | Techish | 20 | ASMR/娱乐格式偏离科技产品推广场景，带货适配差 |
| 188 | xlptrades | -10 | 无科技标签，家庭娱乐向，与科技推广不相关 |
| 190 | funny | 5 | 娱乐内容占主导，科技标签偏噪声，推广不匹配 |
| 198 | USA Funny | 5 | 魔术/流量娱乐为主，科技标签偏噪声，难转化 |
| 212 | techexplain | 0 | 无标签，缺少科技相关证据 |
| 223 | Ninjas Are Butterflies | -10 | 播客喜剧型频道，与科技推广明显不符 |
| 225 | kaitlynd! | 0 | 汽车/社会故事型内容，与科技推广无关 |
| 244 | englishedit | 8 | 魔术/热点娱乐占主，科技标签不适合种草 |
| 258 | mundomoneda | 8 | 古币收藏为主，tech 只是弱挂钩，推广相关性差 |
| 278 | .vinideals | 5 | 魔术/热梗为主，tech像蹭词，整体不适合科技推广 |
| 280 | jakeugc23 | 5 | 剧情/故事向为主，科技标签弱，推广相关性差 |
| 300 | Good | 5 | 魔术/热梗为主，tech像蹭词，整体不适合科技推广 |
| 318 | Sheehan Munim | 0 | 无tech相关标签，纯MC游戏频道 |
| 322 | Gohar Khan | 0 | 无tech相关标签，偏教育学习 |
| 337 | Gage wilson | -15 | 娱乐恶搞向，和科技推广目标明显不匹配 |
| 339 | Olesya Luraschi | 0 | 心理情感向，和科技产品推广不相关 |
| 363 | Faïkat M. | 0 | 无tech相关标签，内容偏生活/娱乐，不适合科技推广。 |
| 367 | Chad Epps 🦒 | 0 | 无tech相关标签，内容偏娱乐/音乐，不适合科技推广。 |
| 375 | Jaxski | 0 | 无tech相关标签，纯游戏内容，不适合科技推广。 |
| 383 | SinaGPT | 0 | 加密财经为主，与科技推广关联弱 |
| 384 | Brandon LaChappelle | 0 | 纯生活vlog，缺少科技受众 |
| 403 | Jey Davis | 0 | 无标签无内容证据 |
| 405 | ACE♠️ | Govtech 💻 | 0 | 标签与科技无关，缺少相关证据 |
| 412 | leonsilicon | 0 | 无标签无内容证据 |
| 417 | Merekeideasy | 0 | 故事/儿童向，和科技推广无关 |

## xtb@promotion-capacity-v1-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 13 | Spencer | -13 | 以喜剧短剧为主，AI/ChatGPT仅泛相关，近10条几乎无科技推广信号 |
| 14 | LoveOrLie | -10 | 技术标签有但内容以故事/娱乐为主，最近10条都不适合推广 |
| 49 | Daily Ai | -10 | 问答/故事娱乐为主，明显不适合科技推广。 |
| 65 | Bueller - Movies & Heists | -12 | 影视娱乐号，缺少科技产品推广语境，近期内容也几乎全是电影相关 |
| 89 | inchados | 1 | 生活vlog为主，科技信号弱，近期多数内容不相关。 |
| 104 | SoulSyn🔥💜💜💜🔥 | -15 | 娱乐叙事为主，AI只是包装，不适合科技投放 |
| 111 | INFLUENCER LYFSTYLE🩷✨ | -13 | 短视频娱乐号，AI只做噱头，推广场景不稳 |
| 112 | ai.mindmorph | -8 | AI梗图/娱乐内容为主，科技产品推广不匹配 |
| 116 | Colton | -13 | 娱乐和时政混合，科技相关度低 |
| 118 | Detroits Finest | 11 | 有科技标签，但近期内容偏情绪/生活向 |
| 121 | ai baby | -12 | AI梗娱乐号，缺少产品推广语境 |
| 123 | sadqtts | -18 | 随机事实/问答号，科技相关信号很弱 |
| 124 | Zxv._._ | -20 | 二次元娱乐号，AI只是内容元素，不适合 |
| 126 | pinkwhalepassion | -8 | 美食内容为主，仅有 AI/ChatGPT 弱相关，近10条几乎都不科技 |
| 129 | shy ™️ | -5 | 金融/军事/励志为主，科技受众弱且近期内容不匹配 |
| 135 | Curren | -23 | 氛围/玄学/故事型内容为主，不适合科技推广 |
| 140 | crypticchills | -18 | 故事/惊悚娱乐为主，科技推广转化弱 |
| 145 | inw1whhyg2 | -2 | 标签像科技号，但近10条全是社会新闻，科技转化不稳 |
| 156 | TourTheUSA | -10 | 内容是地区危险榜单，和科技推广几乎无关 |
| 172 | The_Architect | -2 | 以游戏/角色扮演为主，科技相关性弱 |
| 183 | Slicktok | -20 | 娱乐内容占主导，科技相关信号弱且最近内容多与科技无关 |
| 186 | Jared Frazier | 5 | 有产品评测标签，但内容主线是烹饪/游戏，科技推广匹配度低 |
| 196 | Mr Rattlebone | 0 | 幻想/故事化内容占主导，科技标签不足以支撑产品推广 |
| 199 | Приоритет | 4 | 有AI词，但近期内容多为季节/泛娱乐，科技推广相关性弱 |
| 205 | Sienna Hayes | 15 | 标签有科技/评测，但最近10条全是健身自我提升 |
| 208 | Anthony Psychosis Survivor | 2 | 内容核心是心理健康案例，AI仅是话题背景 |
| 209 | Mr. Ai Ai O | 1 | AI标签有，但近期多为娱乐/梗图，科技推广能力弱 |
| 211 | YeatLover_BS | -9 | 以游戏/情绪表达为主，几乎无科技受众 |
| 214 | JohnSmith2268 | 5 | 科技元素是包装，核心是历史悬疑叙事 |
| 218 | Liam Ryan | 1 | 主体是游戏和梗内容，科技推广匹配度低 |

## Notes
- Page-level rates use `page_size` from each run metadata.
- Cause categories are heuristic clusters from `why_short`; review representative rows before making product decisions.
