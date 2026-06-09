# Channel Search Provider Comparison

- keyword: Dreame
- platform: youtube
- country: us
- left: nox@prompt:b87da85cf79a (/Users/yukuangji/Work/NoxInfluencer/pm-workspace/drafts/tmp/channel-search-review/20260609-nox-vs-xtb-21kw-3platform-us-front5-promotion-capacity-v1/youtube/dreame/nox-youtube)
- right: xtb@prompt:b87da85cf79a (/Users/yukuangji/Work/NoxInfluencer/pm-workspace/drafts/tmp/channel-search-review/20260609-nox-vs-xtb-21kw-3platform-us-front5-promotion-capacity-v1/youtube/dreame/xtb-youtube)
- left_rule_version: prompt:b87da85cf79a
- right_rule_version: prompt:b87da85cf79a
- left_prompt_hash: b87da85cf79a
- right_prompt_hash: b87da85cf79a

## Run Overview
| run | provider | rule_version | total | fit | adjacent | badcase | badcase率 | <0 | 0-9 | 10-19 | 20+ |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| nox@prompt:b87da85cf79a | nox | prompt:b87da85cf79a | 250 | 7 | 66 | 177 | 70.8% | 159 | 83 | 1 | 7 |
| xtb@prompt:b87da85cf79a | xtb | prompt:b87da85cf79a | 250 | 5 | 51 | 194 | 77.6% | 81 | 163 | 3 | 3 |

## Page-Level Badcase Rate
| page | nox@prompt:b87da85cf79a_total | nox@prompt:b87da85cf79a_badcase | nox@prompt:b87da85cf79a_badcase率 | xtb@prompt:b87da85cf79a_total | xtb@prompt:b87da85cf79a_badcase | xtb@prompt:b87da85cf79a_badcase率 | badcase率差 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 50 | 34 | 68.0% | 50 | 27 | 54.0% | 14.0% |
| 2 | 50 | 39 | 78.0% | 50 | 46 | 92.0% | -14.0% |
| 3 | 50 | 38 | 76.0% | 50 | 45 | 90.0% | -14.0% |
| 4 | 50 | 35 | 70.0% | 50 | 35 | 70.0% | 0.0% |
| 5 | 50 | 31 | 62.0% | 50 | 41 | 82.0% | -20.0% |

## Badcase Overlap
| metric | count |
| --- | --- |
| shared_badcase | 3 |
| nox@prompt:b87da85cf79a_only_badcase | 174 |
| xtb@prompt:b87da85cf79a_only_badcase | 191 |

## Badcase Cause Summary
| provider | category | count |
| --- | --- | --- |
| nox@prompt:b87da85cf79a | 其他 | 72 |
| nox@prompt:b87da85cf79a | 证据缺失或信号不足 | 33 |
| nox@prompt:b87da85cf79a | 娱乐/儿童/泛内容偏离 | 33 |
| nox@prompt:b87da85cf79a | 泛相关性偏离 | 27 |
| nox@prompt:b87da85cf79a | 宠物/动物受众冲突 | 11 |
| nox@prompt:b87da85cf79a | 科技/电子垂类偏离 | 1 |
| xtb@prompt:b87da85cf79a | 证据缺失或信号不足 | 77 |
| xtb@prompt:b87da85cf79a | 其他 | 61 |
| xtb@prompt:b87da85cf79a | 泛相关性偏离 | 27 |
| xtb@prompt:b87da85cf79a | 娱乐/儿童/泛内容偏离 | 27 |
| xtb@prompt:b87da85cf79a | 科技/电子垂类偏离 | 1 |
| xtb@prompt:b87da85cf79a | 宠物/动物受众冲突 | 1 |

## Shared Badcases
| channel | nox@prompt:b87da85cf79a | xtb@prompt:b87da85cf79a |
| --- | --- | --- |
| Hiya | 无标签，无相关内容 | 无标签无视频，缺少与Dreame相关的有效信号 |
| Kilad Johnson | 无标签，无相关内容 | 无标签无视频，缺少Dreame相关证据 |
| Stary Writing | 写作/小说垂类与产品推广域不一致 | 命中 dreame，但频道是故事/小说写作，和产品推广场景明显不符 |

## nox@prompt:b87da85cf79a-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 3 | VacLab | 0 | 无任何 Dreame 或清洁家电相关信号 |
| 11 | YouTube | -15 | 娱乐向且带 ASMR，属于明显格式错配 |
| 12 | The Royalty Family | 0 | 家庭挑战向，缺少产品推广与家电相关信号 |
| 13 | FaZe Rug | 0 | 娱乐搞笑向，与清洁家电推广不匹配 |
| 14 | Dream | 0 | Minecraft 游戏频道，与 Dreame 品牌无关 |
| 15 | Technoblade | 0 | 纯游戏频道，与 Dreame 品牌无关 |
| 16 | The Dodo | -15 | 宠物动物内容，和人用清洁家电推广互斥 |
| 17 | CRAZY GREAPA | 0 | 纯搞笑/meme 向，无相关信号 |
| 18 | 7clouds | 0 | 音乐频道，无清洁家电相关信号 |
| 19 | Daquavis | 0 | 游戏娱乐向，无相关信号 |
| 20 | DisneyMusicVEVO | 0 | 音乐频道，无相关信号 |
| 21 | KATSEYE | 0 | 娱乐/音乐向，无相关信号 |
| 22 | D Billions | 0 | 儿童音乐向，无相关信号 |
| 23 | David Dobrik | 0 | vlog comedy 向，无相关信号 |
| 24 | Animal HT | -15 | 动物/宠物内容，与人用产品互斥 |
| 25 | Isaac & Andrea | 0 | prank/娱乐向，与清洁家电推广不匹配 |
| 26 | ItsFunneh | -5 | 游戏内容为主，与 Dreame 家电推广错配 |
| 27 | Superhero Couple | -5 | 超级英雄娱乐向，缺少家电受众 |
| 28 | YouTube Presents | -10 | 娱乐+游戏+短内容为主，不适合家电推广 |
| 30 | Nintendo of America | -5 | 游戏品牌频道，和 Dreame 家电推广不匹配 |
| 31 | SuperHero Kids | -10 | 儿童娱乐向，非家电推广场景 |
| 33 | Barbie | -10 | 娱乐影视向，和清洁家电目标受众不一致 |
| 35 | Jack Doherty | -10 | 强娱乐 vlog，家电推广相关性弱 |
| 37 | Ducky Bhai | -5 | vlog 记录为主，缺少家电种草能力 |
| 38 | ESPN | -5 | 体育频道，和 Dreame 清洁家电不匹配 |
| 39 | Piper Rockelle | -10 | 挑战类娱乐内容，非家电推广场景 |
| 40 | Atlantic Records | -10 | 音乐内容为主，与家电推广错位 |
| 42 | Banana D. | -5 | 游戏内容为主，和家电推广无关 |
| 46 | BETER BÖCÜK UNİVERSE | -10 | 纯娱乐/搞笑内容，家电推广相关性低 |
| 48 | Netflix Family | -10 | 儿童影视内容，和 Dreame 家电推广不匹配 |

## xtb@prompt:b87da85cf79a-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 2 | Dylan Saborio | 0 | 无标签无视频，缺少任何相关证据 |
| 4 | House of Brands | 0 | 无标签无视频，证据缺失 |
| 6 | KaviRam At USA | 0 | 无标签无视频，证据缺失 |
| 7 | REMspace | 0 | 灵修/清明梦内容，与产品推广场景不符 |
| 8 | Inspiring impossible Visions | 0 | 无标签无视频，证据缺失 |
| 10 | DoReMe vape Bob | 0 | vape垂类与家电推广无关 |
| 12 | Rio | -10 | 娱乐/特效向，和实物产品推广场景不匹配 |
| 13 | shada alnaas | 0 | 美妆垂类，与扫地机品牌推广关联弱 |
| 18 | DJ Dream | 0 | 无标签无视频，证据缺失 |
| 19 | NAA PERU SIRI | 0 | 无标签无视频，证据缺失 |
| 21 | Maya Finds | 0 | 健康生活向，与扫地机品牌不相关 |
| 22 | Blue Dream Gaming | 0 | 游戏娱乐向，和家电推广关联弱 |
| 24 | MagicSpark | 0 | 无标签无视频，证据缺失 |
| 26 | hay | -15 | 游戏/睡眠/音乐内容，与Dreame家电推广明显不匹配 |
| 27 | Sushush | -15 | 动画娱乐向，和Dreame产品推广场景冲突 |
| 28 | Funnieeeemix | 0 | 无标签无视频，缺乏可判断的Dreame相关证据 |
| 29 | Dilamiraco 🫧 | 0 | 无标签无视频，缺少与Dreame相关的有效信号 |
| 30 | D. Humann | 0 | 无标签无视频，缺少与Dreame相关的有效信号 |
| 32 | CTOOM Creative | 0 | 木工手作与Dreame清洁家电关联弱 |
| 33 | Teendow_life | 0 | 无标签无视频，暂无法判断与Dreame的相关性 |
| 35 | Abir Ahmed | 0 | 无标签无视频，缺少与Dreame相关的有效信号 |
| 38 | Airthereal US | 0 | 无标签无视频，无法证明与Dreame推广相关 |
| 40 | riley ☆ !! | -15 | 娱乐音乐向，与Dreame产品推广明显不匹配 |
| 41 | DRAZE | -15 | 电子音乐频道，与Dreame家电推广场景不相符 |
| 42 | WNGs | 0 | 无标签无视频，缺少可用的Dreame相关判断依据 |
| 52 | ProMuleTrainer | 0 | 无相关标签，无法判断为 Dreame 的有效推广频道 |
| 53 | Bluey Cosmos | 0 | 无相关标签，和 Dreame 产品推广没有可见关联 |
| 54 | Music 4K | -15 | 音乐娱乐频道，和 Dreame 这类产品推广不匹配 |
| 55 | Sebraca Beats | -15 | 纯音乐频道，缺少产品评测或购买导向内容 |
| 56 | Dreamwalker Journeys | -15 | 宗教灵性内容，和 Dreame 产品推广场景不一致 |

## Notes
- Page-level rates use `page_size` from each run metadata.
- Cause categories are heuristic clusters from `why_short`; review representative rows before making product decisions.
