# Channel Search Provider Comparison

- keyword: yoga mat
- platform: tiktok
- country: -
- left: nox@promotion-capacity-v1 (tmp/channel-search-review/20260528-nox-vs-xtb-10kw2-tiktok-global-front10-promotion-capacity-v1/yoga-mat/nox-tiktok)
- right: xtb@promotion-capacity-v1 (tmp/channel-search-review/20260528-nox-vs-xtb-10kw2-tiktok-global-front10-promotion-capacity-v1/yoga-mat/xtb-tiktok)
- left_rule_version: promotion-capacity-v1
- right_rule_version: promotion-capacity-v1
- left_prompt_hash: b87da85cf79a
- right_prompt_hash: b87da85cf79a

## Run Overview
| run | provider | rule_version | total | fit | adjacent | badcase | badcase率 | <0 | 0-9 | 10-19 | 20+ |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| nox@promotion-capacity-v1 | nox | promotion-capacity-v1 | 500 | 111 | 166 | 223 | 44.6% | 13 | 412 | 54 | 21 |
| xtb@promotion-capacity-v1 | xtb | promotion-capacity-v1 | 500 | 181 | 222 | 97 | 19.4% | 161 | 155 | 141 | 43 |

## Page-Level Badcase Rate
| page | nox@promotion-capacity-v1_total | nox@promotion-capacity-v1_badcase | nox@promotion-capacity-v1_badcase率 | xtb@promotion-capacity-v1_total | xtb@promotion-capacity-v1_badcase | xtb@promotion-capacity-v1_badcase率 | badcase率差 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 50 | 14 | 28.0% | 50 | 6 | 12.0% | 16.0% |
| 2 | 50 | 15 | 30.0% | 50 | 10 | 20.0% | 10.0% |
| 3 | 50 | 26 | 52.0% | 50 | 8 | 16.0% | 36.0% |
| 4 | 50 | 30 | 60.0% | 50 | 14 | 28.0% | 32.0% |
| 5 | 50 | 30 | 60.0% | 50 | 9 | 18.0% | 42.0% |
| 6 | 50 | 22 | 44.0% | 50 | 6 | 12.0% | 32.0% |
| 7 | 50 | 19 | 38.0% | 50 | 9 | 18.0% | 20.0% |
| 8 | 50 | 20 | 40.0% | 50 | 14 | 28.0% | 12.0% |
| 9 | 50 | 23 | 46.0% | 50 | 10 | 20.0% | 26.0% |
| 10 | 50 | 24 | 48.0% | 50 | 11 | 22.0% | 26.0% |

## Badcase Overlap
| metric | count |
| --- | --- |
| shared_badcase | 6 |
| nox@promotion-capacity-v1_only_badcase | 217 |
| xtb@promotion-capacity-v1_only_badcase | 91 |

## Badcase Cause Summary
| provider | category | count |
| --- | --- | --- |
| nox@promotion-capacity-v1 | 其他 | 94 |
| nox@promotion-capacity-v1 | 证据缺失或信号不足 | 77 |
| nox@promotion-capacity-v1 | 泛相关性偏离 | 35 |
| nox@promotion-capacity-v1 | 娱乐/儿童/泛内容偏离 | 13 |
| nox@promotion-capacity-v1 | 宠物/动物受众冲突 | 4 |
| xtb@promotion-capacity-v1 | 其他 | 42 |
| xtb@promotion-capacity-v1 | 娱乐/儿童/泛内容偏离 | 21 |
| xtb@promotion-capacity-v1 | 泛相关性偏离 | 19 |
| xtb@promotion-capacity-v1 | 证据缺失或信号不足 | 11 |
| xtb@promotion-capacity-v1 | 宠物/动物受众冲突 | 4 |

## Shared Badcases
| channel | nox@promotion-capacity-v1 | xtb@promotion-capacity-v1 |
| --- | --- | --- |
| Coastal Wilds | 动物科普受众，不适合人用瑜伽垫 | 野生动物内容，和瑜伽垫推广无关 |
| New York Bucket List | 无相关证据 | 城市生活资讯号，与瑜伽垫推广无关 |
| Mid-Life Renaissance | 无相关标签，缺少瑜伽场景信号 | 书影音杂谈为主，健身只是边缘话题 |
| Mahogany Morgan | 无相关标签或内容信号，和瑜伽垫推广不匹配 | 以旅行/生活内容为主，近10条无瑜伽或健身相关，推广瑜伽垫相关性弱 |
| nursingbuddyjules | 无相关标签或内容证据 | 关怀/疗愈活动号，和瑜伽垫基本不相关 |
| hair_buddha82 | 无标签、无视频信号，相关性不足 | 美发/穿搭/旅行号，和瑜伽垫受众不搭 |

## nox@promotion-capacity-v1-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 3 | Alythuh | 0 | 无瑜伽/健身相关证据 |
| 4 | TinyProtectors | 0 | 无标签无内容证据 |
| 5 | Gabby & Andy Life | 0 | 生活杂项号，与瑜伽垫受众不符 |
| 6 | Goodful | 0 | 食品/素食号，和瑜伽垫推广不相关 |
| 7 | tdhr57 | 0 | 无相关标签 |
| 27 | WeaponUp | 0 | 无相关标签，频道主题不适合瑜伽垫推广 |
| 29 | Joleen Emery | 0 | 手作/艺术频道，与瑜伽垫推广无关 |
| 31 | Chicago Bucket List | 0 | 本地美食约会频道，和瑜伽垫无关 |
| 37 | OldDirtyBoston | 0 | 内容是美食/喜剧，和瑜伽垫不相关 |
| 42 | MAGIC MARKET 🌛 | 0 | 无明确相关标签，缺少瑜伽垫推广场景 |
| 47 | Latina Social Wellness Club🖤 | 0 | 时尚童装导向，和瑜伽垫无关 |
| 48 | Downtown Fort Lauderdale | 0 | 本地地理频道，缺少产品推广相关性 |
| 51 | christina ꩜ | 0 | 无标签无内容，无法判断相关性 |
| 53 | Stonez The Organic | -5 | 娱乐内容为主，和垫子推广场景弱 |
| 57 | Nzingah | 0 | 美食旅行为主，与瑜伽垫无关 |
| 58 | marine_chpn | 0 | 无标签无内容，缺乏判断依据 |
| 59 | 𝓝𝓪𝓸𝓶𝓲 𝓤𝓵𝓪𝓷𝓲 | 0 | 娱乐自我成长向，缺少运动产品场景 |
| 61 | Nicole✈️📸✨ | 0 | 时尚生活向，和瑜伽垫关联弱 |
| 62 | Austin Jackson, LMT | 0 | 无标签，未见运动或产品推广信号 |
| 66 | GirlCode GCode | -10 | 娱乐音乐为主，不适合垫子推广 |
| 70 | Flowwithtiff | -15 | 游戏娱乐主导，和产品推广格式不匹配 |
| 73 | xoxKathleenElizabeth | 0 | 纯时尚穿搭向，缺少运动产品语境 |
| 84 | Juan Tavarez | 0 | 标签与瑜伽垫无关，缺少相关受众 |
| 88 | Lorraine C Ladish | 0 | 年龄/女性标签过泛，与瑜伽垫关联弱 |
| 89 | mama makayla 🧸🩵 | 0 | 缺少任何瑜伽或健身相关证据 |
| 93 | BAGSMART_Lifestyle | 0 | 包袋时尚号，与瑜伽垫不相关 |
| 98 | • kat at home • 🌷 | 0 | 美妆家庭号，与瑜伽垫关联不足 |
| 102 | ShoniceJeanay | 0 | 无相关标签，缺少瑜伽或运动信号 |
| 103 | Oyun Botanical Gardens | 0 | 农业/农场内容，与瑜伽垫推广无关 |
| 104 | UPR Tech | 0 | 无标签无内容信号，难判断相关性 |

## xtb@promotion-capacity-v1-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 8 | ret | -10 | 玩具收藏号，近期无瑜伽垫相关内容 |
| 13 | xiao💠 | -10 | 无相关标签或内容，近期也无瑜伽垫信号 |
| 14 | californiagirlx | -10 | 时尚生活号，缺少瑜伽垫推广证据 |
| 21 | Binita | -10 | 美妆健康号，近10条与瑜伽垫无关，缺少投放信号 |
| 26 | Jan1994 | -10 | 母婴护肤与度假内容，和瑜伽垫推广无关 |
| 47 | Tik Toker | -10 | 舞蹈泛娱乐号，与瑜伽垫推广不匹配 |
| 55 | sarah_khan130 | -19 | 音乐娱乐号，内容与瑜伽垫推广明显不符 |
| 56 | LoveNitaMarie | -7 | 有Yoga标签，但近期内容偏性感娱乐，商品推广弱 |
| 71 | writes.79 | -9 | 政治/情绪类账号，少量瑜伽内容不足以支撑推广 |
| 73 | матросик | -6 | 个人表达号，瑜伽仅零星提及，不适合推广 |
| 75 | Musimenta Aidah | -14 | 纯CapCut/娱乐号，缺少瑜伽垫推广相关性 |
| 77 | zelievgns | -9 | 节日娱乐号，近期内容大多无关瑜伽垫 |
| 83 | Dani124 | -23 | 娱乐/状态号，和瑜伽垫推广目标明显不符 |
| 86 | hlub kj lm xb | -10 | 无标签且近期内容杂乱，几乎看不到可投放信号 |
| 94 | komalmeer081 | -23 | 娱乐/美妆流量号，内容与瑜伽垫推广不匹配 |
| 96 | edinorozheek | -21 | 电影娱乐号，瑜伽只是噪声，推广相关性差 |
| 101 | Nadia Fumiko | -1 | 仅有零散瑜伽痕迹，缺少垫子或导购信号 |
| 118 | Z_Monique | -19 | 娱乐搞笑为主，瑜伽垫不适合 |
| 124 | Wilson Abagensa | -7 | 泛服饰娱乐号，和瑜伽垫不相关 |
| 140 | Mel🤍 | -3 | 仅一条提到瑜伽垫，其余内容太散，支撑不足 |
| 141 | stevy | -6 | 基本是泛娱乐/穿搭内容，和瑜伽垫推广不匹配 |
| 144 | Jamie Griffin | -8 | 以舞蹈/杂内容为主，只有零星瑜伽相关 |
| 146 | jesss | -7 | 内容几乎无关，只有一条‘hot mat’不足以支撑 |
| 148 | dafu413 | -7 | 主业是清洁工具，和瑜伽垫推广场景不匹配 |
| 154 | AIA SPORT | -10 | 近10条全是服装/上新，和瑜伽垫品类不匹配 |
| 156 | Nastasia°❀.ೃ࿔* | -9 | 时尚生活号，只有零星yoga词，不适合推垫子 |
| 159 | Yᴼᴳᴬ Qᵁᴱᴱᴺ🤸🏽‍♂️ | -4 | 瑜伽娱乐/转发号，内容不具备产品投放导向 |
| 163 | bimala poudel | -8 | 只有泛yoga标签，内容偏泛娱乐，不适合推垫子 |
| 168 | sania00108 | -6 | 只有海景和泛瑜伽内容，缺少垫子推广能力 |
| 172 | Des 🌞 | -3 | 生活方式频道，瑜伽只是弱信号，近10条多为旅行咖啡 |

## Notes
- Page-level rates use `page_size` from each run metadata.
- Cause categories are heuristic clusters from `why_short`; review representative rows before making product decisions.
