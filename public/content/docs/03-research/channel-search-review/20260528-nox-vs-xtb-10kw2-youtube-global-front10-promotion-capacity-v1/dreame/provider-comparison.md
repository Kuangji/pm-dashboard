# Channel Search Provider Comparison

- keyword: Dreame
- platform: youtube
- country: -
- left: nox@promotion-capacity-v1 (tmp/channel-search-review/20260528-nox-vs-xtb-10kw2-youtube-global-front10-promotion-capacity-v1/dreame/nox-youtube)
- right: xtb@promotion-capacity-v1 (tmp/channel-search-review/20260528-nox-vs-xtb-10kw2-youtube-global-front10-promotion-capacity-v1/dreame/xtb-youtube)
- left_rule_version: promotion-capacity-v1
- right_rule_version: promotion-capacity-v1
- left_prompt_hash: b87da85cf79a
- right_prompt_hash: b87da85cf79a

## Run Overview
| run | provider | rule_version | total | fit | adjacent | badcase | badcase率 | <0 | 0-9 | 10-19 | 20+ |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| nox@promotion-capacity-v1 | nox | promotion-capacity-v1 | 500 | 8 | 143 | 349 | 69.8% | 264 | 222 | 6 | 8 |
| xtb@promotion-capacity-v1 | xtb | promotion-capacity-v1 | 500 | 215 | 151 | 134 | 26.8% | 159 | 106 | 131 | 104 |

## Page-Level Badcase Rate
| page | nox@promotion-capacity-v1_total | nox@promotion-capacity-v1_badcase | nox@promotion-capacity-v1_badcase率 | xtb@promotion-capacity-v1_total | xtb@promotion-capacity-v1_badcase | xtb@promotion-capacity-v1_badcase率 | badcase率差 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 50 | 28 | 56.0% | 50 | 4 | 8.0% | 48.0% |
| 2 | 50 | 33 | 66.0% | 50 | 6 | 12.0% | 54.0% |
| 3 | 50 | 37 | 74.0% | 50 | 11 | 22.0% | 52.0% |
| 4 | 50 | 37 | 74.0% | 50 | 14 | 28.0% | 46.0% |
| 5 | 50 | 37 | 74.0% | 50 | 18 | 36.0% | 38.0% |
| 6 | 50 | 40 | 80.0% | 50 | 19 | 38.0% | 42.0% |
| 7 | 50 | 32 | 64.0% | 50 | 14 | 28.0% | 36.0% |
| 8 | 50 | 33 | 66.0% | 50 | 19 | 38.0% | 28.0% |
| 9 | 50 | 35 | 70.0% | 50 | 15 | 30.0% | 40.0% |
| 10 | 50 | 37 | 74.0% | 50 | 14 | 28.0% | 46.0% |

## Badcase Overlap
| metric | count |
| --- | --- |
| shared_badcase | 3 |
| nox@promotion-capacity-v1_only_badcase | 346 |
| xtb@promotion-capacity-v1_only_badcase | 131 |

## Badcase Cause Summary
| provider | category | count |
| --- | --- | --- |
| nox@promotion-capacity-v1 | 其他 | 155 |
| nox@promotion-capacity-v1 | 娱乐/儿童/泛内容偏离 | 70 |
| nox@promotion-capacity-v1 | 证据缺失或信号不足 | 61 |
| nox@promotion-capacity-v1 | 泛相关性偏离 | 49 |
| nox@promotion-capacity-v1 | 宠物/动物受众冲突 | 12 |
| nox@promotion-capacity-v1 | 科技/电子垂类偏离 | 2 |
| xtb@promotion-capacity-v1 | 其他 | 46 |
| xtb@promotion-capacity-v1 | 娱乐/儿童/泛内容偏离 | 35 |
| xtb@promotion-capacity-v1 | 泛相关性偏离 | 30 |
| xtb@promotion-capacity-v1 | 证据缺失或信号不足 | 14 |
| xtb@promotion-capacity-v1 | 宠物/动物受众冲突 | 6 |
| xtb@promotion-capacity-v1 | 科技/电子垂类偏离 | 3 |

## Shared Badcases
| channel | nox@promotion-capacity-v1 | xtb@promotion-capacity-v1 |
| --- | --- | --- |
| Hiya | 无有效标签与内容信号 | 家庭日常号，缺少家电测评转化能力 |
| krefix | 游戏动画向，与Dreame产品无关 | 仅命中 Dream 游戏/动画语境，与 Dreame 无关 |
| GameGoal | Minecraft 游戏号，和产品推广目的不一致 | Minecraft游戏频道，与Dreame消费品推广无关 |

## nox@promotion-capacity-v1-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 7 | Kilad Johnson | 0 | 无有效标签与内容信号 |
| 11 | FaZe Rug | 0 | 纯娱乐生活向，与家电推广弱相关 |
| 12 | Dream | 0 | 仅是 dream 非 Dreame，且为游戏频道 |
| 13 | Technoblade | 0 | 游戏向频道，与 Dreame 无关 |
| 14 | YouTube | -10 | ASMR/娱乐向，不适合实体产品推广 |
| 15 | CRAZY GREAPA | 0 | 纯娱乐梗图向，缺少产品语境 |
| 17 | 7clouds | 0 | 音乐频道，缺少家电推广语境 |
| 18 | D Billions | 0 | 儿童音乐娱乐向，缺少产品语境 |
| 19 | DisneyMusicVEVO | 0 | 音乐频道，与家电推广不匹配 |
| 20 | Daquavis | 0 | 游戏/meme 向，与 Dreame 无关 |
| 21 | David Dobrik | 0 | 娱乐 vlog 为主，缺少清洁电器语境 |
| 22 | Animal HT | 0 | 动物内容为主，缺少家电/测评语境 |
| 23 | Isaac & Andrea | 0 | 恶搞/喜剧向，与产品推广不匹配 |
| 24 | SuperHero Kids | 0 | 儿童娱乐向，缺少家电推广语境 |
| 25 | ItsFunneh | 0 | 游戏向频道，与 Dreame 无关 |
| 26 | YouTube Presents | 0 | 纯娱乐短视频频道，和 Dreame 家电推广几乎无关 |
| 28 | Nintendo of America | 0 | 游戏频道，缺少家电或消费电子推广场景 |
| 30 | Superhero Couple | -15 | 超级英雄剧情娱乐，和家电推广明显冲突 |
| 35 | Banana D. | 0 | 游戏内容为主，与 Dreame 受众不匹配 |
| 37 | Netflix Family | 0 | 家庭影视内容，不是家电推广场景 |
| 39 | Okanutie | 0 | 泛娱乐搞笑号，和 Dreame 关联不足 |
| 43 | Atlantic Records | 0 | 音乐厂牌内容，与 Dreame 受众不匹配 |
| 45 | BETER BÖCÜK UNİVERSE | 0 | 泛娱乐搞笑频道，与 Dreame 关联不足 |
| 46 | Barbie | 0 | 玩具/影视娱乐导向，和 Dreame 关联不足 |
| 47 | Chotoonz TV - Funny Cartoons | 0 | 动画娱乐频道，不适合家电推广 |
| 48 | Bionic | 0 | Minecraft 游戏频道，缺少家电消费场景 |
| 49 | Cleetus McFarland | 0 | 汽车赛事向，与 Dreame 家电场景无关 |
| 51 | Ashton Hall | 0 | 健身垂类受众广，但与 Dreame 不直接相关 |
| 52 | Magnet World | -15 | ASMR/助眠格式，与产品推广场景强冲突 |
| 53 | Oddly Satisfying Slime ASMR | -15 | ASMR 解压内容，商品推广匹配差 |

## xtb@promotion-capacity-v1-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 21 | Yazar: Asmira | -15 | 娱乐短剧号，虽有 Dreame 标签但内容域明显不适合推广 |
| 43 | My Life My Experience | -8 | 育儿号，与Dreame产品推广无关，近期也无相关内容 |
| 47 | Dylan Saborio | -1 | 泛科技频道，近期内容与Dreame无关，召回价值低 |
| 48 | Iris Corner 💖 | -14 | 美妆ASMR号，Dreame内容存在明显形式不匹配 |
| 51 | Pomme2Tech | -10 | 苹果科技号，和 Dreame 家电推广无关 |
| 58 | Дарья Дождева | -10 | 只有日期，没有可用的推广相关内容 |
| 76 | DreamWhisper ASMR | -25 | ASMR睡眠内容，与 Dreame 清洁家电推广完全不匹配 |
| 94 | KaviRam At USA | -2 | 内容杂且近期大多无关，Dreame 证据太弱 |
| 96 | Kofi Harmony | -25 | 音乐娱乐频道，与 Dreame 产品推广不相关 |
| 99 | E TikTok | -25 | 娱乐短视频频道，不适合 Dreame 推广 |
| 103 | Not Noob | -20 | 娱乐短剧/动画内容，与 Dreame 产品推广无关 |
| 110 | Inspiring impossible Visions | -25 | ASMR/叙事为主，明显不适合 Dreame 产品推广 |
| 121 | amzVibes | -25 | 音乐化商品展示，形式偏娱乐，不适合直推 |
| 123 | JACKDONALD ASMR | -25 | ASMR/娱乐账号，内容形式与产品推广冲突 |
| 124 | Fashion World | -15 | 时尚娱乐向频道，与 Dreame 家电推广不匹配 |
| 127 | DoReMe vape Bob | -20 | 电子烟垂类，和Dreame家电/清洁类受众不匹配 |
| 131 | Алмазник дракон | -25 | 游戏娱乐频道，和Dreame家电推广场景不相干 |
| 136 | Rio | -25 | 娱乐特效号，不适合Dreame这类实物产品推广 |
| 143 | Darven | -25 | 游戏动画号，和Dreame实物推广场景不一致 |
| 144 | AlitechDream | -20 | 生活/健康话题为主，缺少产品测评与购买意图 |
| 148 | Weirdmine | -25 | 梦题材娱乐内容，不是Dreame品牌相关垂类 |
| 155 | Client lambda | -7 | 内容杂乱且无标签，和 Dreame 推广关联弱 |
| 168 | セガ トイ情報局 | -25 | 玩具/亲子娱乐频道，与 Dreame 明显不符 |
| 170 | BOOK MI HOME | -10 | 房地产/梦想房内容，和 Dreame 关联很弱 |
| 173 | Dreamy Forest | -20 | 音乐频道，且近10条全为梦幻音乐，和Dreame产品推广无关 |
| 178 | Sakib Play | -19 | 主内容是游戏，近10条几乎都与家电推广无关 |
| 180 | DJ Dream | -20 | 音乐混音+滑板内容，和Dreame推广场景不匹配 |
| 181 | DreamDoll | -20 | 音乐娱乐频道，名字相近但与Dreame无关 |
| 184 | MX-dream | -20 | 家具床垫工厂号，和Dreame家电推广不相干 |
| 186 | jvilla | -20 | 游戏/日常频道，缺少家电或测评受众 |

## Notes
- Page-level rates use `page_size` from each run metadata.
- Cause categories are heuristic clusters from `why_short`; review representative rows before making product decisions.
