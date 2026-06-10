# Channel Search Provider Comparison

- keyword: beauty
- platform: youtube
- country: US
- left: nox@content-tone-llm-v1 (tmp/channel-search-review/20260610-nox-vs-xtb-4kw-allplatform-us-front10-content-tone-v1/youtube/beauty/nox-youtube)
- right: xtb@content-tone-llm-v1 (tmp/channel-search-review/20260610-nox-vs-xtb-4kw-allplatform-us-front10-content-tone-v1/youtube/beauty/xtb-youtube)
- left_rule_version: content-tone-llm-v1
- right_rule_version: content-tone-llm-v1
- left_prompt_hash: 1228e2ff575f
- right_prompt_hash: 1228e2ff575f

## Run Overview
| run | provider | rule_version | total | fit | adjacent | badcase | badcase率 | <0 | 0-9 | 10-19 | 20+ |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| nox@content-tone-llm-v1 | nox | content-tone-llm-v1 | 500 | 355 | 121 | 24 | 4.8% | 0 | 500 | 0 | 0 |
| xtb@content-tone-llm-v1 | xtb | content-tone-llm-v1 | 500 | 348 | 119 | 33 | 6.6% | 0 | 500 | 0 | 0 |

## Page-Level Badcase Rate
| page | nox@content-tone-llm-v1_total | nox@content-tone-llm-v1_badcase | nox@content-tone-llm-v1_badcase率 | xtb@content-tone-llm-v1_total | xtb@content-tone-llm-v1_badcase | xtb@content-tone-llm-v1_badcase率 | badcase率差 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 50 | 1 | 2.0% | 50 | 0 | 0.0% | 2.0% |
| 2 | 50 | 5 | 10.0% | 50 | 3 | 6.0% | 4.0% |
| 3 | 50 | 3 | 6.0% | 50 | 1 | 2.0% | 4.0% |
| 4 | 50 | 1 | 2.0% | 50 | 5 | 10.0% | -8.0% |
| 5 | 50 | 4 | 8.0% | 50 | 8 | 16.0% | -8.0% |
| 6 | 50 | 3 | 6.0% | 50 | 4 | 8.0% | -2.0% |
| 7 | 50 | 1 | 2.0% | 50 | 4 | 8.0% | -6.0% |
| 8 | 50 | 0 | 0.0% | 50 | 2 | 4.0% | -4.0% |
| 9 | 50 | 3 | 6.0% | 50 | 2 | 4.0% | 2.0% |
| 10 | 50 | 3 | 6.0% | 50 | 4 | 8.0% | -2.0% |

## Badcase Overlap
| metric | count |
| --- | --- |
| shared_badcase | 15 |
| nox@content-tone-llm-v1_only_badcase | 9 |
| xtb@content-tone-llm-v1_only_badcase | 18 |

## Badcase Cause Summary
| provider | category | count |
| --- | --- | --- |
| nox@content-tone-llm-v1 | 其他 | 14 |
| nox@content-tone-llm-v1 | 泛相关性偏离 | 4 |
| nox@content-tone-llm-v1 | 证据缺失或信号不足 | 3 |
| nox@content-tone-llm-v1 | 娱乐/儿童/泛内容偏离 | 3 |
| xtb@content-tone-llm-v1 | 其他 | 24 |
| xtb@content-tone-llm-v1 | 娱乐/儿童/泛内容偏离 | 5 |
| xtb@content-tone-llm-v1 | 泛相关性偏离 | 2 |
| xtb@content-tone-llm-v1 | 证据缺失或信号不足 | 2 |

## Shared Badcases
| channel | nox@content-tone-llm-v1 | xtb@content-tone-llm-v1 |
| --- | --- | --- |
| BRONWIN AURORA | 频道主体不在beauty，缺少商品承接场景 | 以暧昧日常和生活碎片为主，没有稳定美妆或消费内容承接 |
| INSTAGRAM YULDUZLARI | 主体是做饭、清洁和乡村日常，几乎没有美妆承载 | 主体是做饭/清洁短视频，和 beauty 受众明显不符 |
| REXSY Romantic Piano Symphonics Ecstasy | 纯音乐频道，标题含 beauty 但没有美容受众或商品承载 | 本质是纯音乐频道，和 beauty 商品完全不匹配 |
| madeline, oliver and oakley🐒 | 主体是猴子日常和搞笑内容，beauty只是零星装饰，不适合推广 | 主体是猴子搞笑内容，和美妆消费受众明显不符 |
| Poppy | 主体是音乐作品和演出内容，与beauty商品推广几乎无关 | 主内容是音乐发布，与美妆商品推广受众完全不对口 |
| Erika Angel | 主体是恐怖故事与灵异内容，和beauty商品受众明显不匹配 | 恐怖故事频道，主要受众与美妆消费决策无关 |
| Holly Madison | 主要是故事、关系与社会话题，不是美妆内容 | 主要是八卦、关系和社会话题，缺少美妆推广场景 |
| BrushBuzzer | 内容主体与beauty无关，几乎没有美容承载 | 以搞笑/ASMR/失败集锦为主，和美妆商品推广不匹配 |
| LookBook Gallery | 标题多为直播、hot vlog和cooking vlog，几乎无美妆内容 | 内容主要是直播/日常碎片，没有稳定美妆或商品承载能力 |
| Alexandra🌸 | 内容只是反复赞美名人眼睛，非美妆教程或消费决策场景 | 主要围绕明星眼睛审美，不是美妆消费内容，不适合 beauty 推广 |
| GlitterForever17 | 主体是猎奇/成人化杂谈，不适合 beauty 推广 | 主体是成人梗和娱乐内容，不是美妆场景 |
| Celebrity Data | 以明星颜值榜单为主，没有美妆或护肤的消费承载 | 内容是明星颜值榜单，不是美妆消费内容 |
| Comedy Stand Up Network! | 主体是恐怖/喜剧/动画合集，几乎没有美妆商品承载场景 | 主体是恐怖合集和杂项短视频，不是美妆内容 |
| Bla Bla Jam! | 儿童向动画、恶搞和手工内容为主，不适合美妆商品推广 | 主体是儿童/娱乐/ASMR和挑战，不是美妆消费决策场景 |
| KalogerasRuby | 主要是姐妹日常和搞笑梗，没有美容内容承载 | 内容主要是姐妹日常和搞笑短片，不适合美妆推广 |

## nox@content-tone-llm-v1-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 120 | Fashion studio |  | 标题主要是服饰/人物名，缺少美妆内容承载 |
| 171 | La La Vibe |  | 主体是儿童娱乐和剧情改造，不是美妆消费内容 |
| 225 | Makeup Artist Robert Minasyan / Роберт Минасян |  | 多数标题是新闻八卦和人生故事，缺少稳定美妆内容 |
| 408 | K A R E L Y |  | 主要是家庭旅行和日常记录，和美妆调性不符 |
| 432 | brvlcon |  | 军事和情绪化内容为主，与美妆商品受众不符 |
| 446 | stepmomcourts |  | 标题多为家庭搞笑日常，缺乏美妆消费承载 |
| 464 | Ruli Still |  | 频道主体是悲伤R&B歌单，与美妆商品推广完全不匹配 |
| 473 | junejourney619 |  | 虽然谈beauty，但主体是审视和批判美容文化，不适合常规美妆推广 |
| 480 | THE TATES |  | 主要是情侣整蛊和喜剧内容，和美妆商品受众几乎不匹配 |

## xtb@content-tone-llm-v1-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 61 | Curvy Models |  | 以模特/身材/风格展示为主，不是美妆消费决策 |
| 64 | The Retail Genius |  | 讲美容供货/开店，不是消费者美妆内容 |
| 80 | entertain mentrush7 |  | 以动漫/搞笑/剪辑为主，几乎没有美容商品承载 |
| 113 | 𝐂𝐡𝐞𝐫𝐫𝐲_𝐃𝐚𝐫𝐥𝐢𝐧𝐠 |  | 主要是K-pop剪辑和娱乐内容，beauty只是零散标签 |
| 156 | ALL About J. Lashae |  | 主体是喜剧短梗，只有零星假发相关，不像美妆频道。 |
| 178 | Beauty Street Fashion |  | 主要是街拍和女性美图展示，不是美妆消费或教程内容 |
| 195 | Fact Frontier |  | 频道内容是科普宇宙与地球事实，与美妆商品受众和承载形式不匹配 |
| 200 | HONEY DIP |  | 主要是模特美图、时尚审美和人物展示，不是美妆商品推广场景 |
| 206 | Julia Tiffany |  | 主轴是食物/猎奇科普，非 beauty 决策型频道 |
| 209 | 𝓈𝓌𝑒𝑒𝓉-𝓅𝑒𝒶‧₊˚ ౨ৎ |  | 偏自我暗示/氛围内容，不是实际美妆消费频道 |
| 214 | Anna Kursakina |  | 内容偏猎奇反应和杂项，非稳定 beauty 消费频道 |
| 222 | La La Life Emoji |  | 偏儿童/动画娱乐，非真实 beauty 决策场景 |
| 246 | ailee ౨ৎ |  | 内容是显化/脸部改造幻想，不是可承接美妆商品的频道 |
| 271 | Madison Ryann Ward |  | 频道主体是音乐，少量美妆内容不足以支撑稳定合作 |
| 314 | Queen Naija |  | 音乐人/日常vlog为主，缺少可承载美妆推广的内容 |
| 320 | Kiarra Says |  | 关系/旅行/家庭 vlog 为主，几乎不具备美妆承载 |
| 321 | Science of Aesthetics |  | 内容是 looksmaxxing/面相分析，不是美妆消费决策场 |
| 468 | divine baby 888 |  | 以subliminal和吸引力幻想为主，不是实际美妆内容 |

## Notes
- Page-level rates use `page_size` from each run metadata.
- Cause categories are heuristic clusters from `why_short`; review representative rows before making product decisions.
