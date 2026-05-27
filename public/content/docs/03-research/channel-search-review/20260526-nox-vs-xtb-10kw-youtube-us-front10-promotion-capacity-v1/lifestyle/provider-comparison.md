# Channel Search Provider Comparison

- keyword: lifestyle
- platform: youtube
- country: US
- left: nox@promotion-capacity-v1 (tmp/channel-search-review/20260526-nox-vs-xtb-10kw-youtube-us-front10-promotion-capacity-v1/lifestyle/nox-youtube)
- right: xtb@promotion-capacity-v1 (tmp/channel-search-review/20260526-nox-vs-xtb-10kw-youtube-us-front10-promotion-capacity-v1/lifestyle/xtb-youtube)
- left_rule_version: promotion-capacity-v1
- right_rule_version: promotion-capacity-v1
- left_prompt_hash: b87da85cf79a
- right_prompt_hash: b87da85cf79a

## Run Overview
| run | provider | rule_version | total | fit | adjacent | badcase | badcase率 | <0 | 0-9 | 10-19 | 20+ |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| nox@promotion-capacity-v1 | nox | promotion-capacity-v1 | 500 | 376 | 118 | 6 | 1.2% | 0 | 4 | 10 | 486 |
| xtb@promotion-capacity-v1 | xtb | promotion-capacity-v1 | 500 | 379 | 94 | 27 | 5.4% | 7 | 11 | 84 | 398 |

## Page-Level Badcase Rate
| page | nox@promotion-capacity-v1_total | nox@promotion-capacity-v1_badcase | nox@promotion-capacity-v1_badcase率 | xtb@promotion-capacity-v1_total | xtb@promotion-capacity-v1_badcase | xtb@promotion-capacity-v1_badcase率 | badcase率差 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 50 | 1 | 2.0% | 50 | 1 | 2.0% | 0.0% |
| 2 | 50 | 0 | 0.0% | 50 | 2 | 4.0% | -4.0% |
| 3 | 50 | 0 | 0.0% | 50 | 1 | 2.0% | -2.0% |
| 4 | 50 | 3 | 6.0% | 50 | 2 | 4.0% | 2.0% |
| 5 | 50 | 0 | 0.0% | 50 | 3 | 6.0% | -6.0% |
| 6 | 50 | 0 | 0.0% | 50 | 3 | 6.0% | -6.0% |
| 7 | 50 | 0 | 0.0% | 50 | 4 | 8.0% | -8.0% |
| 8 | 50 | 0 | 0.0% | 50 | 5 | 10.0% | -10.0% |
| 9 | 50 | 0 | 0.0% | 50 | 2 | 4.0% | -4.0% |
| 10 | 50 | 2 | 4.0% | 50 | 4 | 8.0% | -4.0% |

## Badcase Overlap
| metric | count |
| --- | --- |
| shared_badcase | 0 |
| nox@promotion-capacity-v1_only_badcase | 6 |
| xtb@promotion-capacity-v1_only_badcase | 27 |

## Badcase Cause Summary
| provider | category | count |
| --- | --- | --- |
| nox@promotion-capacity-v1 | 其他 | 3 |
| nox@promotion-capacity-v1 | 娱乐/儿童/泛内容偏离 | 2 |
| nox@promotion-capacity-v1 | 宠物/动物受众冲突 | 1 |
| xtb@promotion-capacity-v1 | 其他 | 14 |
| xtb@promotion-capacity-v1 | 娱乐/儿童/泛内容偏离 | 12 |
| xtb@promotion-capacity-v1 | 泛相关性偏离 | 1 |

## Shared Badcases
| channel | nox@promotion-capacity-v1 | xtb@promotion-capacity-v1 |
| --- | --- | --- |

## nox@promotion-capacity-v1-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 30 | laoyanga | 10 | ASMR和吃播主导，生活方式推广适配较弱 |
| 181 | autumn grace | 5 | 宠物豚鼠频道，生活方式产品推广受众不匹配 |
| 194 | The Impulsive Duo | 5 | 成人关系/娱乐成分重，主受众不适合生活方式推广 |
| 196 | Oliver Tree | 5 | 音乐娱乐主导，lifestyle标签偏外围，推广适配弱 |
| 459 | Swinger University™ | 10 | 成人 swinger 语境，常规生活方式推广不适合 |
| 499 | BEbyHER | 5 | 塔罗和占卜为主，和生活方式产品推广不匹配 |

## xtb@promotion-capacity-v1-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 18 | The Celeb Insider | 8 | 娱乐八卦式 celebrity lifestyle，推广型创作者属性弱 |
| 56 | Lwkdnwjxbiabd | 0 | 以lofi音乐为主，生活方式标签弱，创作者推广不匹配 |
| 98 | Grey’s World | 6 | 娱乐短视频为主，生活方式推广承接差 |
| 139 | ZaHo Insta Fashion | 12 | 虽有 lifestyle 标签，但近期几乎全是模特百科，和生活推广偏离 |
| 157 | Yung Bl4ck | -5 | 娱乐/犯罪/音乐为主，生活方式定位不成立 |
| 195 | Isiss Dior | 0 | 虽有生活方式标签，但以娱乐八卦/剧情互动为主，不适合 |
| 211 | NOOBDAG MIME | 0 | 有lifestyle标签，但近期以游戏/梗图为主，生活方式受众弱 |
| 216 | Mix celebrity World | 0 | 有lifestyle标签，但核心是名人/政治传记资讯 |
| 235 | Jason & Lucia | 10 | 以喜剧恶搞为主，生活方式受众不匹配 |
| 261 | Thank God Prayer | 10 | 标签有lifestyle但近10条多为家庭/健康戏剧，推广适配弱 |
| 274 | 🧿31 frames🪬 | 10 | 虽有Lifestyle标签，但近期几乎全是评论/直播内容 |
| 276 | WKRN News 2 | 10 | 新闻台以时政资讯为主，生活方式只是栏目标签 |
| 312 | Money Matters | -2 | 频道主轴是人物传记和网红故事，和生活方式推广不匹配 |
| 320 | Voice Of Jahid | -4 | 娱乐故事号为主，近期全是人物生平和传记类内容 |
| 329 | Kdrama House | 10 | 近10条全是名人/剧集资讯，生活方式推广承接弱 |
| 330 | KNOW YOUR CELEBRITIES | 10 | 近期全是名人讣闻/履历内容，非生活方式创作者 |
| 363 | ASTRO LIFE | 10 | 近10条几乎全是星座资讯，生活方式标签过泛 |
| 376 | Geck | -5 | 娱乐播客为主，生活方式标签偏泛，内容不匹配 |
| 380 | America Nu Network | -2 | 音乐访谈娱乐为主，生活方式相关性弱 |
| 394 | Eduard Martirosyan | 10 | 偏娱乐段子，lifestyle 标签不足以支撑推广 |
| 400 | CvltureNet | 11 | 娱乐体育资讯为主，生活方式相关性弱 |
| 418 | Shinmon | 10 | 虽有 lifestyle 标签，但近期全是游戏/动漫解说，明显不匹配 |
| 449 | Ramana Maharshi's Guidance [Tamil] | 5 | 宗教/灵修受众与生活方式产品推广目标不匹配 |
| 464 | BERHAN TUBE | 4 | 以 testimony/宗教故事为主，生活方式推广不匹配 |
| 470 | Let's Stella | 6 | ASMR 烹饪为主，格式不利于商品推广 |
| 488 | Celeb Digest | -5 | 拳击资讯占主导，近10条几乎全不匹配生活方式推广 |
| 491 | FREAKBAiT | -5 | 内容偏娱乐叙事，和生活方式推广场景不匹配 |

## Notes
- Page-level rates use `page_size` from each run metadata.
- Cause categories are heuristic clusters from `why_short`; review representative rows before making product decisions.
