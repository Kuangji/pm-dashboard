# Channel Search Provider Comparison

- keyword: Dreame
- platform: instagram
- country: -
- left: nox@promotion-capacity-v1 (tmp/channel-search-review/20260528-nox-vs-xtb-10kw2-instagram-global-front10-promotion-capacity-v1/dreame/nox-instagram)
- right: xtb@promotion-capacity-v1 (tmp/channel-search-review/20260528-nox-vs-xtb-10kw2-instagram-global-front10-promotion-capacity-v1/dreame/xtb-instagram)
- left_rule_version: promotion-capacity-v1
- right_rule_version: promotion-capacity-v1
- left_prompt_hash: b87da85cf79a
- right_prompt_hash: b87da85cf79a

## Run Overview
| run | provider | rule_version | total | fit | adjacent | badcase | badcase率 | <0 | 0-9 | 10-19 | 20+ |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| nox@promotion-capacity-v1 | nox | promotion-capacity-v1 | 500 | 5 | 184 | 311 | 62.2% | 219 | 269 | 8 | 4 |
| xtb@promotion-capacity-v1 | xtb | promotion-capacity-v1 | 500 | 147 | 209 | 144 | 28.8% | 48 | 281 | 92 | 79 |

## Page-Level Badcase Rate
| page | nox@promotion-capacity-v1_total | nox@promotion-capacity-v1_badcase | nox@promotion-capacity-v1_badcase率 | xtb@promotion-capacity-v1_total | xtb@promotion-capacity-v1_badcase | xtb@promotion-capacity-v1_badcase率 | badcase率差 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 50 | 39 | 78.0% | 50 | 2 | 4.0% | 74.0% |
| 2 | 50 | 19 | 38.0% | 50 | 13 | 26.0% | 12.0% |
| 3 | 50 | 24 | 48.0% | 50 | 10 | 20.0% | 28.0% |
| 4 | 50 | 30 | 60.0% | 50 | 15 | 30.0% | 30.0% |
| 5 | 50 | 38 | 76.0% | 50 | 17 | 34.0% | 42.0% |
| 6 | 50 | 28 | 56.0% | 50 | 16 | 32.0% | 24.0% |
| 7 | 50 | 27 | 54.0% | 50 | 13 | 26.0% | 28.0% |
| 8 | 50 | 32 | 64.0% | 50 | 18 | 36.0% | 28.0% |
| 9 | 50 | 38 | 76.0% | 50 | 23 | 46.0% | 30.0% |
| 10 | 50 | 36 | 72.0% | 50 | 17 | 34.0% | 38.0% |

## Badcase Overlap
| metric | count |
| --- | --- |
| shared_badcase | 0 |
| nox@promotion-capacity-v1_only_badcase | 311 |
| xtb@promotion-capacity-v1_only_badcase | 143 |

## Badcase Cause Summary
| provider | category | count |
| --- | --- | --- |
| nox@promotion-capacity-v1 | 娱乐/儿童/泛内容偏离 | 117 |
| nox@promotion-capacity-v1 | 其他 | 86 |
| nox@promotion-capacity-v1 | 证据缺失或信号不足 | 80 |
| nox@promotion-capacity-v1 | 泛相关性偏离 | 21 |
| nox@promotion-capacity-v1 | 宠物/动物受众冲突 | 6 |
| nox@promotion-capacity-v1 | 科技/电子垂类偏离 | 1 |
| xtb@promotion-capacity-v1 | 其他 | 52 |
| xtb@promotion-capacity-v1 | 证据缺失或信号不足 | 47 |
| xtb@promotion-capacity-v1 | 宠物/动物受众冲突 | 24 |
| xtb@promotion-capacity-v1 | 娱乐/儿童/泛内容偏离 | 13 |
| xtb@promotion-capacity-v1 | 泛相关性偏离 | 8 |

## Shared Badcases
| channel | nox@promotion-capacity-v1 | xtb@promotion-capacity-v1 |
| --- | --- | --- |

## nox@promotion-capacity-v1-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 2 | Josh Quiñonez | 0 | 无标签与内容信号，无法判断相关性 |
| 4 | Kylie | 0 | 仅有合作标记，无相关品类信号 |
| 6 | Taylor Swift | -10 | 娱乐音乐型频道，与家电推广目标不符 |
| 7 | Selena Gomez | -3 | 娱乐为主，虽有美妆健康但缺少产品推广语境 |
| 8 | Instagram | 0 | 无标签无内容信号 |
| 9 | Kim Kardashian | -5 | 明星娱乐号，缺少家居清洁类受众 |
| 10 | Jane Knight | 0 | 无标签无内容信号 |
| 11 | Dwayne Johnson | -5 | 娱乐向明星号，不适合家电推广 |
| 12 | Miley Cyrus | -10 | 音乐娱乐频道，和家电推广错位明显 |
| 13 | Sabrina Carpenter | -5 | 明星音乐号，和 Dreame 目标不匹配 |
| 14 | Nike | 0 | 运动品牌内容为主，和 Dreame 类目不相关 |
| 15 | Gigi Hadid | -5 | 时尚娱乐型明星号，家电推广关联弱 |
| 16 | Kate S. | 11 | 有 Dreame 与清洁标签，但 ASMR 形式错配严重 |
| 17 | NASA | 0 | 航天科普，与家电推广不相关 |
| 18 | Vin Diesel | -5 | 娱乐电影号，和产品推广无关 |
| 20 | ⋆𐙚₊˚⊹♡ camila | -5 | 娱乐音乐号，产品推广相关性低 |
| 21 | Khloé Kardashian | -4 | 娱乐明星号，健康标签不足以支撑家电推广 |
| 23 | Wardell Curry | -5 | 体育娱乐号，与家电推广目标不符 |
| 24 | madisonbeer | -5 | 音乐娱乐型明星号，缺少相关品类证据 |
| 25 | Chris Bumstead | -5 | 健身娱乐号，不是家电类目标受众 |
| 26 | Addison | -5 | 服饰号，与Dreame家电/美妆产品推广无明显交集 |
| 27 | Kris Jenner | -10 | 娱乐时尚号，缺少家电/美妆产品推广信号 |
| 29 | Hilary Duff | -10 | 娱乐家庭号，非产品测评型内容 |
| 31 | Simonetta Lein | -10 | 娱乐+时尚号，和Dreame产品类目不匹配 |
| 32 | Nike Football | -15 | 体育运动号，与Dreame产品推广不符 |
| 33 | Becky G | -10 | 音乐娱乐号，缺少产品内容场景 |
| 34 | Reese Witherspoon | -10 | 影视娱乐号，非Dreame推广受众 |
| 37 | Cheavon Woods | 0 | 无标签无内容证据，无法判断匹配 |
| 38 | Ryan Reynolds | -10 | 娱乐家庭向，缺少产品推广场景 |
| 39 | LEGO | -15 | 玩具内容，与Dreame家电推广不符 |

## xtb@promotion-capacity-v1-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 45 | Amélie Neten | -15 | 娱乐时尚号，品牌词仅埋在扩展标签里，不适合 |
| 50 | Judah Shaw | -12 | 搞笑家庭号，缺少产品评测或购买场景，不适合 |
| 57 | Milana Alekber 🇦🇿 | 0 | 书籍推荐频道，和 Dreame 家电推广不在同一场景 |
| 62 | Jaz Guzman 🐆✨ | 0 | 时尚奢品号，和 Dreame 家电推广不匹配 |
| 64 | Dana Alchamister | 0 | 母婴梦想话题，和 Dreame 品牌推广关联弱 |
| 66 | maggievillegas27 | -2 | 清洁 ASMR 风格与家电推广不匹配 |
| 67 | Courtney Babic 🇦🇺 🇲🇰 | 0 | 家庭生活向但与 Dreame 缺少品类相关性 |
| 69 | Tiffany  🌸 | 0 | 时尚美妆生活号，缺少家电/测评/购买导向，不适合Dreame推广 |
| 71 | Slađana Ostić | 0 | 时尚生活号，和 Dreame 家电推广不匹配 |
| 75 | Nef | -8 | ASMR主导且无Dreame直相关，虽有清洁/测评容量但匹配弱 |
| 76 | dwei diaries | 0 | 无品牌或产品相关信号，难以支撑 Dreame 推广 |
| 77 | Хомбоо & Гомбоо | 0 | 无品牌或产品相关信号，难以支撑 Dreame 推广 |
| 85 | nadia | -2 | 开箱测评有价值，但 ASMR/无声格式偏强不匹配 |
| 92 | Allie, Marley, Pumpkin, and Bennie | 0 | 宠物日常号，缺少家电/测评/购物语境 |
| 96 | Mantas Vaitiekunas | 0 | 宠物/生活混合号，缺少家电推广证据 |
| 106 | Weronika Świerkosz | 0 | 风景内容，和 Dreame 推广无关 |
| 109 | ОПТОМ И В РОЗНИЦУ | 0 | 无标签无内容，无法判断相关性 |
| 111 | büşra | 0 | 时尚社区号，品类和 Dreame 错位 |
| 120 | Selli | 0 | 娱乐/美食向，和家电推广不符 |
| 121 | R.electromenager | 0 | 无标签无内容，缺少相关证据 |
| 124 | cehizlink | 0 | 无有效标签，无法判断可推广性 |
| 134 | dreamebeauty_it | 0 | 无标签和内容证据，难判断为可投放创作者 |
| 137 | DreameBeauty France | 0 | 无标签证据，无法判断相关性 |
| 139 | Katalina 王海鏵 | 0 | 摄影潮流内容为主，和 Dreame 产品不匹配 |
| 145 | nona_fortunaa | -15 | 剧情娱乐号，与产品推广格式强冲突 |
| 154 | Chouaki.électroménager | -15 | 马术/动物标签占主导，与 Dreame 家电推广错位 |
| 157 | Liu Yifei Fan Club Official 刘亦菲吧官方 | -5 | 粉丝娱乐向频道，和家电品牌推广关联很弱 |
| 159 | 🇦🇪🇹🇷🇪🇺 دوریا بـرنـدز/آنـلاین شاپ/اروپـا،تـرکـیه و امارات | -5 | 服饰网店场景与 Dreame 家电类推广不匹配 |
| 161 | myreviewinmyhome | 0 | 缺少可用标签和内容证据，无法判断相关性 |
| 167 | 🏠 Всё для комфортного дома | 0 | 仅有家居友好命名，没有标签与内容证据 |

## Notes
- Page-level rates use `page_size` from each run metadata.
- Cause categories are heuristic clusters from `why_short`; review representative rows before making product decisions.
