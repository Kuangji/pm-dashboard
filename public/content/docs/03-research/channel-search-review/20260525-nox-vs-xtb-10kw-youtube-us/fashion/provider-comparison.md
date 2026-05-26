# Channel Search Provider Comparison

- keyword: fashion
- platform: youtube
- country: US
- left: nox@prompt:0c320fdab1e3 (tmp/channel-search-review/20260525-nox-vs-xtb-10kw-youtube-us/fashion/nox-youtube)
- right: xtb@prompt:0c320fdab1e3 (tmp/channel-search-review/20260525-nox-vs-xtb-10kw-youtube-us/fashion/xtb-youtube)
- left_rule_version: prompt:0c320fdab1e3
- right_rule_version: prompt:0c320fdab1e3
- left_prompt_hash: 0c320fdab1e3
- right_prompt_hash: 0c320fdab1e3

## Run Overview
| run | provider | rule_version | total | fit | adjacent | badcase | badcase率 | <0 | 0-9 | 10-19 | 20+ |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| nox@prompt:0c320fdab1e3 | nox | prompt:0c320fdab1e3 | 1500 | 983 | 132 | 385 | 25.7% | 28 | 375 | 15 | 1082 |
| xtb@prompt:0c320fdab1e3 | xtb | prompt:0c320fdab1e3 | 1500 | 1079 | 258 | 163 | 10.9% | 126 | 53 | 668 | 653 |

## Page-Level Badcase Rate
| page | nox@prompt:0c320fdab1e3_total | nox@prompt:0c320fdab1e3_badcase | nox@prompt:0c320fdab1e3_badcase率 | xtb@prompt:0c320fdab1e3_total | xtb@prompt:0c320fdab1e3_badcase | xtb@prompt:0c320fdab1e3_badcase率 | badcase率差 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 50 | 0 | 0.0% | 50 | 0 | 0.0% | 0.0% |
| 2 | 50 | 0 | 0.0% | 50 | 2 | 4.0% | -4.0% |
| 3 | 50 | 0 | 0.0% | 50 | 2 | 4.0% | -4.0% |
| 4 | 50 | 1 | 2.0% | 50 | 0 | 0.0% | 2.0% |
| 5 | 50 | 1 | 2.0% | 50 | 3 | 6.0% | -4.0% |
| 6 | 50 | 1 | 2.0% | 50 | 1 | 2.0% | 0.0% |
| 7 | 50 | 1 | 2.0% | 50 | 2 | 4.0% | -2.0% |
| 8 | 50 | 0 | 0.0% | 50 | 3 | 6.0% | -6.0% |
| 9 | 50 | 0 | 0.0% | 50 | 4 | 8.0% | -8.0% |
| 10 | 50 | 0 | 0.0% | 50 | 4 | 8.0% | -8.0% |
| 96 | 50 | 12 | 24.0% | 50 | 3 | 6.0% | 18.0% |
| 97 | 50 | 12 | 24.0% | 50 | 4 | 8.0% | 16.0% |
| 98 | 50 | 22 | 44.0% | 50 | 5 | 10.0% | 34.0% |
| 99 | 50 | 13 | 26.0% | 50 | 5 | 10.0% | 16.0% |
| 100 | 50 | 6 | 12.0% | 50 | 6 | 12.0% | 0.0% |
| 101 | 50 | 16 | 32.0% | 50 | 2 | 4.0% | 28.0% |
| 102 | 50 | 11 | 22.0% | 50 | 3 | 6.0% | 16.0% |
| 103 | 50 | 20 | 40.0% | 50 | 5 | 10.0% | 30.0% |
| 104 | 50 | 19 | 38.0% | 50 | 1 | 2.0% | 36.0% |
| 105 | 50 | 17 | 34.0% | 50 | 3 | 6.0% | 28.0% |
| 191 | 50 | 23 | 46.0% | 50 | 14 | 28.0% | 18.0% |
| 192 | 50 | 22 | 44.0% | 50 | 13 | 26.0% | 18.0% |
| 193 | 50 | 23 | 46.0% | 50 | 8 | 16.0% | 30.0% |
| 194 | 50 | 23 | 46.0% | 50 | 6 | 12.0% | 34.0% |
| 195 | 50 | 25 | 50.0% | 50 | 10 | 20.0% | 30.0% |
| 196 | 50 | 23 | 46.0% | 50 | 8 | 16.0% | 30.0% |
| 197 | 50 | 25 | 50.0% | 50 | 13 | 26.0% | 24.0% |
| 198 | 50 | 27 | 54.0% | 50 | 9 | 18.0% | 36.0% |
| 199 | 50 | 23 | 46.0% | 50 | 12 | 24.0% | 22.0% |
| 200 | 50 | 19 | 38.0% | 50 | 12 | 24.0% | 14.0% |

## Badcase Overlap
| metric | count |
| --- | --- |
| shared_badcase | 5 |
| nox@prompt:0c320fdab1e3_only_badcase | 380 |
| xtb@prompt:0c320fdab1e3_only_badcase | 139 |

## Badcase Cause Summary
| provider | category | count |
| --- | --- | --- |
| nox@prompt:0c320fdab1e3 | 证据缺失或信号不足 | 271 |
| nox@prompt:0c320fdab1e3 | 其他 | 65 |
| nox@prompt:0c320fdab1e3 | 娱乐/儿童/泛内容偏离 | 32 |
| nox@prompt:0c320fdab1e3 | 泛相关性偏离 | 12 |
| nox@prompt:0c320fdab1e3 | 宠物/动物受众冲突 | 4 |
| nox@prompt:0c320fdab1e3 | 科技/电子垂类偏离 | 1 |
| xtb@prompt:0c320fdab1e3 | 其他 | 81 |
| xtb@prompt:0c320fdab1e3 | 娱乐/儿童/泛内容偏离 | 52 |
| xtb@prompt:0c320fdab1e3 | 泛相关性偏离 | 14 |
| xtb@prompt:0c320fdab1e3 | 证据缺失或信号不足 | 13 |
| xtb@prompt:0c320fdab1e3 | 宠物/动物受众冲突 | 3 |

## Shared Badcases
| channel | nox@prompt:0c320fdab1e3 | xtb@prompt:0c320fdab1e3 |
| --- | --- | --- |
| Sprunki Cubes DIY | ASMR/DIY为主，时尚仅弱露出，推广格式不匹配 | ASMR纸片人DIY为主，虽有时尚字样但受众与形式都不匹配 |
| Popped by Cherry | 频道以storytime叙事娱乐为主，时尚推广相关性弱 | 有时尚标签，但近期以storytime和日常叙事为主，转化不稳 |
| Insider | 频道以影视娱乐为主，无时尚导购或穿搭相关信号 | 频道以新闻/犯罪/娱乐为主，近10条均无时尚推广相关 |
| Elsword | 频道是游戏动漫向，与fashion产品推广缺乏直接受众和场景关联 | 游戏频道里卖的是游戏内服饰，非真人时尚推广场景。 |
| Pretty Girls Visuals | 无标签无内容证据，无法判断与fashion推广相关 | 有fashion标签，但近期以剧情娱乐为主，时尚推广承接差 |

## nox@prompt:0c320fdab1e3-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 174 | 123 GO! | 5 | 娱乐向频道为主，时尚仅是泛标签，促销匹配弱 |
| 275 | Hines Management Group | 5 | 虽有fashion标签，但主体是玩具/娃娃/AI艺术，受众不匹配 |
| 304 | Lyra Dolls | 5 | 纸娃娃/玩具为主，真实时尚产品推广不匹配 |
| 4757 | My Kawaii Dolls by KA! | 0 | 玩具娱乐频道，缺少时尚与穿搭受众，不适合推广 |
| 4759 | MIA's Fashion | 0 | 仅频道名含Fashion，缺少标签和内容证据，无法确认推广相关性 |
| 4762 | Harli Kane | 0 | 无标签无内容，缺少任何时尚相关证据 |
| 4765 | Fashionsisi | 0 | 无标签，仅名称含 fashion，证据不足 |
| 4767 | Speak English Mindset | -15 | 有声书/小说频道，内容域与时尚推广明显不符 |
| 4771 | OldPCGamesGalore | 0 | 标签偏娱乐/游戏，缺少服饰或时尚受众，推广相关性很弱 |
| 4773 | GRAMZUNKUT aka KELO | 0 | 频道以音乐/嘻哈为主，缺少时尚推广相关信号 |
| 4780 | Koko bayuk | 0 | 无可用标签与内容信号，不适合时尚推广 |
| 4781 | Honeyrose USA | -15 | 频道聚焦戒烟/假烟，与时尚推广人群明显不符 |
| 4788 | Tamela Clarke | 0 | 无标签无内容证据，无法判断与 fashion 推广相关 |
| 4789 | Gabriella Triple Charm | 10 | 主内容是音乐舞蹈娱乐，fashion 仅是挂标，不适合服饰推广 |
| 4794 | alicia zamora | 0 | 无标签、无相关视频或近期内容，缺少时尚推广相关证据 |
| 4802 | Audree Kate Lopez | 0 | 无标签无内容证据，与时尚推广相关性不足 |
| 4810 | JESSICA RICH | 0 | 无标签无内容信号，无法判断与fashion推广相关 |
| 4811 | Oye Toons | 0 | 无标签与内容证据，难支持时尚推广 |
| 4813 | Auntie's Advice LifeStyle Podcast | 1 | 播客娱乐为主，时尚只是弱泛化相关 |
| 4816 | Jessika kolosovas | 0 | 无时尚相关标签或内容证据，召回价值低 |
| 4817 | Summer Marshall | 1 | 仅有lifestyle泛相关，缺少时尚推广意图 |
| 4820 | KA FAshion tv | 0 | 无标签、无视频证据，无法确认时尚推广相关性 |
| 4830 | Slay with Fatima | 0 | 无标签和内容证据，无法支持时尚推广 |
| 4832 | Trending Now | 0 | 泛娱乐/美食频道，缺少时尚受众与内容相关信号 |
| 4836 | A2zsyt | 0 | 无标签与内容信号，和 fashion 无关 |
| 4843 | The Word of Maude | 0 | 无标签无内容线索，无法判断与fashion相关 |
| 4846 | Kooper | -15 | 偏娱乐短视频，无时尚相关信号，难以承接穿搭推广 |
| 4853 | Bengali Fashion House | 0 | 仅频道名含fashion，无标签或视频证据支持推广相关性 |
| 4859 | Friskmegood | 0 | 无标签、标题或近期内容证据支持时尚推广相关性 |
| 4860 | Exardy | 0 | 体育训练向，缺少服饰/时尚内容信号 |

## xtb@prompt:0c320fdab1e3-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 65 | CartoonHome | -5 | 有时尚标签，但近10条全是动画短剧，推广格式严重不匹配 |
| 77 | Alicia Romero | 10 | 虽有时尚标签，但近期10条几乎都是娱乐八卦，推广不匹配 |
| 117 | Eira Doll | -5 | 虽有fashion标签，但核心是纸娃娃/玩具娱乐，非真实时尚种草 |
| 219 | Illumitati | 13 | 虽有fashion标签，但近期多为娱乐/meme，时尚内容稀疏 |
| 224 | Chichoe TV | 8 | 主频道是搞笑娱乐，时尚词存在但不适合投放 |
| 249 | Molly Paper | -5 | 虽有Fashion标签，但主内容是纸娃娃手工娱乐，不适合真人时尚推广 |
| 280 | eryten rggg034 | 7 | 有Fashion标签，但内容偏动漫游戏病毒短视频，推广适配差 |
| 314 | Fashion Shorts | 12 | 标签命中但近10条多为名人短视频，时尚推广承接弱 |
| 332 | Elijah Monroe | 2 | 虽有fashion标签，但近期以歌词/音乐视频为主，时尚只是零散点缀 |
| 373 | audaamar | 10 | 标签虽有fashion，但近期几乎全是车/音乐/舞蹈，和时尚推广不匹配 |
| 382 | Dolphin | 10 | 标签命中但近期全是音乐MV，时尚只是包装标签 |
| 411 | Life in 60s | 11 | 虽有Fashion标签，但内容以影视剧情为主，近10条多不符推广场景 |
| 418 | Myria Fashion | 4 | 虽有fashion标签，但内容偏数字绘画/角色换装，导购属性弱 |
| 442 | DD Archive | 10 | 虽有fashion标签，但近期十条几乎全是泛娱乐/日常短片，不利投放 |
| 461 | Chicklet & Maleni | -5 | 虽有fashion标签，但核心是喜剧播客/娱乐八卦，推广格式不匹配 |
| 454 | Brent Atwater | -2 | 主轴是宠物灵媒，时尚仅零散出现，近期大多不相关 |
| 468 | Salomé Muñoz | 10 | 二次元/搞笑短视频为主，时尚仅是边缘标签 |
| 476 | Mik Morrone Fans | 10 | 粉丝向娱乐频道，近期内容几乎全是明星生活，时尚不成主线 |
| 4754 | Choose One | 10 | 虽然有fashion标签，但近期几乎全是生日/吃喝挑战，失配明显。 |
| 4801 | Zuvixo Quiz | -5 | 虽有fashion标签，但内容是问答挑战与礼物玩法，和服饰推广不匹配 |
| 4799 | Meaghan Lindsey | 11 | 直中fashion标签，但近期多为生活、健身、发型，时尚内容很少。 |
| 4831 | Bright Spark Kids | 10 | 时尚标签在，但近期全是儿童绘画内容，推广相关性弱 |
| 4837 | Dr. Monique Rodgers | 10 | 仅标签沾边，近期全是书籍/信仰内容，时尚推广不合适 |
| 4849 | Thoughts & Fashion | 11 | 虽有 fashion 标签，但主体是反应/信仰短视频，时尚占比很低 |
| 4865 | Salwas kitchen | 1 | 虽有Fashion标签，但频道主轴为食物/ASMR，近期时尚内容少 |
| 4867 | Learner Bytes | -10 | 内容为历史/武器/自然科普，与时尚推广无关，近10条均不匹配 |
| 4874 | tv dewra | -2 | 标签有时尚但近期全是歌曲/歌词视频，推广服饰不合适 |
| 4911 | LEIMAI💎🌾LM_THEONE | 10 | 虽有fashion标签，但近期全是饭圈娱乐内容，投放不匹配 |
| 4917 | Hazel17XX | -5 | 虽有Fashion标签，但近期全是喜剧/恶搞内容，时尚推广不匹配 |
| 4904 | Best Sexy | 0 | 虽有fashion标签，但近期多为AI励志/女性主题，推广不匹配 |

## Notes
- Page-level rates use `page_size` from each run metadata.
- Cause categories are heuristic clusters from `why_short`; review representative rows before making product decisions.
