# Channel Search Provider Comparison

- keyword: fashion
- platform: youtube
- country: US
- left: nox@content-tone-llm-v1 (tmp/channel-search-review/20260610-nox-vs-xtb-4kw-allplatform-us-front10-content-tone-v1/youtube/fashion/nox-youtube)
- right: xtb@content-tone-llm-v1 (tmp/channel-search-review/20260610-nox-vs-xtb-4kw-allplatform-us-front10-content-tone-v1/youtube/fashion/xtb-youtube)
- left_rule_version: content-tone-llm-v1
- right_rule_version: content-tone-llm-v1
- left_prompt_hash: 1228e2ff575f
- right_prompt_hash: 1228e2ff575f

## Run Overview
| run | provider | rule_version | total | fit | adjacent | badcase | badcase率 | <0 | 0-9 | 10-19 | 20+ |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| nox@content-tone-llm-v1 | nox | content-tone-llm-v1 | 500 | 347 | 130 | 23 | 4.6% | 0 | 500 | 0 | 0 |
| xtb@content-tone-llm-v1 | xtb | content-tone-llm-v1 | 500 | 347 | 129 | 24 | 4.8% | 0 | 500 | 0 | 0 |

## Page-Level Badcase Rate
| page | nox@content-tone-llm-v1_total | nox@content-tone-llm-v1_badcase | nox@content-tone-llm-v1_badcase率 | xtb@content-tone-llm-v1_total | xtb@content-tone-llm-v1_badcase | xtb@content-tone-llm-v1_badcase率 | badcase率差 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 50 | 1 | 2.0% | 50 | 1 | 2.0% | 0.0% |
| 2 | 50 | 3 | 6.0% | 50 | 2 | 4.0% | 2.0% |
| 3 | 50 | 2 | 4.0% | 50 | 2 | 4.0% | 0.0% |
| 4 | 50 | 3 | 6.0% | 50 | 5 | 10.0% | -4.0% |
| 5 | 50 | 2 | 4.0% | 50 | 2 | 4.0% | 0.0% |
| 6 | 50 | 0 | 0.0% | 50 | 0 | 0.0% | 0.0% |
| 7 | 50 | 2 | 4.0% | 50 | 3 | 6.0% | -2.0% |
| 8 | 50 | 3 | 6.0% | 50 | 1 | 2.0% | 4.0% |
| 9 | 50 | 3 | 6.0% | 50 | 3 | 6.0% | 0.0% |
| 10 | 50 | 4 | 8.0% | 50 | 5 | 10.0% | -2.0% |

## Badcase Overlap
| metric | count |
| --- | --- |
| shared_badcase | 13 |
| nox@content-tone-llm-v1_only_badcase | 10 |
| xtb@content-tone-llm-v1_only_badcase | 11 |

## Badcase Cause Summary
| provider | category | count |
| --- | --- | --- |
| nox@content-tone-llm-v1 | 其他 | 14 |
| nox@content-tone-llm-v1 | 证据缺失或信号不足 | 3 |
| nox@content-tone-llm-v1 | 娱乐/儿童/泛内容偏离 | 2 |
| nox@content-tone-llm-v1 | 泛相关性偏离 | 2 |
| nox@content-tone-llm-v1 | 宠物/动物受众冲突 | 1 |
| nox@content-tone-llm-v1 | 科技/电子垂类偏离 | 1 |
| xtb@content-tone-llm-v1 | 其他 | 15 |
| xtb@content-tone-llm-v1 | 泛相关性偏离 | 5 |
| xtb@content-tone-llm-v1 | 证据缺失或信号不足 | 3 |
| xtb@content-tone-llm-v1 | 娱乐/儿童/泛内容偏离 | 1 |

## Shared Badcases
| channel | nox@content-tone-llm-v1 | xtb@content-tone-llm-v1 |
| --- | --- | --- |
| Fun With Zartasha | 内容主要是家庭、搬家、公益与人物故事，几乎没有时尚承载 | 主要是家庭/公益/争议叙事，与时尚商品推广明显不相关 |
| MyFroggyStuff | 主要是娃娃手作与迷你物，不是人类时尚受众 | 核心是芭比与娃娃手作，不是人用时尚消费场景 |
| Dama Xe | 主体是生活技巧和健康点击内容，缺少稳定时尚受众 | 主体是生活小技巧和健康提示，和时尚推广不匹配 |
| CartoonHome | 主体是动画和游戏内容，几乎没有时尚受众或商品承载场景 | 主体是动画和游戏挑战，与时尚商品推广受众不匹配 |
| Miss Freddie | 主体是心理鸡汤和人际疗愈，与时尚商品受众明显不匹配 | 主体是心理关系与自我成长，和时尚商品推广几乎无关 |
| Noa Tishby | 政治教育与公共议题为主，没有时尚商品承载场景 | 政治教育内容为主，没有可承接时尚推广的受众和形式 |
| French Montana | 主内容是说唱和音乐发布，与时尚商品推广受众明显不符 | 主体是音乐与说唱内容，和时尚商品推广明显不匹配 |
| Bikini Ifrit | 内容以日常、游戏和杂项为主，几乎没有时尚调性 | 内容杂乱且偏日常记录，没有稳定时尚消费场景 |
| Ethan & Jason 💙 | 主体是儿童家庭娱乐，和时尚商品受众明显不匹配 | 主体是亲子玩耍和运动内容，几乎没有时尚消费语境 |
| Business Insider | 内容是商业新闻与科技财经，和时尚商品推广明显不符 | 新闻商业频道，不具备时尚受众和服饰推广语境 |
| FunDash | 以恶搞、人物传记和泛娱乐为主，缺少时尚承载场景 | 主体是恶搞和模特百科内容，缺少真实时尚受众与承接场景 |
| Cookie Plays Hopscotch​ | 以电影剪辑和剧情短片为主，时尚不构成主调 | 主要是娱乐短剧，缺少真实时尚推广场景 |
| Mike&Judith | 主体是求生/家务/情绪记录，几乎不具备服饰推广承载能力。 | 生活困境和家务健康为主，几乎无服饰承载 |

## nox@content-tone-llm-v1-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 168 | 123 GO! |  | 儿童益智、搞笑和 DIY 为主，不是时尚消费场景 |
| 169 | Sprunki Cubes DIY |  | 纸艺换装和卡通 DIY 为主，不适合真实服饰推广 |
| 196 | Little Baby Ada |  | 主体是宠物内容，时尚内容只是零散插入 |
| 408 | NICTA BEAUTY |  | 标题主要是人物名单和体型标签，时尚消费语境不足 |
| 418 | LookBook Gallery |  | 内容杂乱且偏直播/日常，与时尚商品推广不匹配 |
| 425 | CinemaDisorder |  | 电影解说频道，与时尚商品受众和承载方式都不匹配 |
| 457 | KiKi Carr |  | 内容主要是护肤美妆，不支撑服饰时尚推广。 |
| 459 | online_do'kon |  | 主体是鱼类、保健品和杂货，和时尚无关。 |
| 485 | American Music Awards |  | 纯颁奖礼/演出集锦，几乎无服饰消费或穿搭承接 |
| 491 | ARDIIN ANIA GIGI |  | 个人生活/家庭/健康叙事为主，缺少服装推广场景 |

## xtb@content-tone-llm-v1-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 21 | Ruck Bodgers |  | 核心是裸照和内衣写真，和常规时尚推广冲突 |
| 89 | ForgotToBlink19 |  | 主体是喜剧/短剧式排行榜，fashion只作剧情标签，不像时尚受众。 |
| 127 | Lylayourfriend |  | 主打虚拟角色和Roblox装扮，不适合真人时尚推广 |
| 148 | BRONWIN AURORA |  | 主要是日常生活内容，时尚承载不足 |
| 158 | AN X GAMING |  | 主体是游戏与梗图内容，和时尚商品推广基本不相关 |
| 172 | Fact Frontier |  | 纯科学知识频道，与fashion商品推广无关 |
| 331 | Eira Doll |  | 内容是纸娃娃/角色换装，和真人时尚商品推广受众不一致 |
| 365 | Hines Management Group |  | 主体是 AI 故事和励志内容，缺少真实服饰种草承接力 |
| 441 | Lyra Dolls |  | 核心是纸娃娃/换装娱乐，不是现实服饰消费受众 |
| 489 | Eli and Mike |  | 以搞笑剧情为主，时尚只是偶发题材 |
| 497 | Lisa Or Lena |  | 主要是儿童选择/玩梗内容，时尚不是主场景 |

## Notes
- Page-level rates use `page_size` from each run metadata.
- Cause categories are heuristic clusters from `why_short`; review representative rows before making product decisions.
