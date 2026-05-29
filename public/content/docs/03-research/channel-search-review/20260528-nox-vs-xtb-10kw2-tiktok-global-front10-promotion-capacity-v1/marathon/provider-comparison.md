# Channel Search Provider Comparison

- keyword: marathon
- platform: tiktok
- country: -
- left: nox@promotion-capacity-v1 (tmp/channel-search-review/20260528-nox-vs-xtb-10kw2-tiktok-global-front10-promotion-capacity-v1/marathon/nox-tiktok)
- right: xtb@promotion-capacity-v1 (tmp/channel-search-review/20260528-nox-vs-xtb-10kw2-tiktok-global-front10-promotion-capacity-v1/marathon/xtb-tiktok)
- left_rule_version: promotion-capacity-v1
- right_rule_version: promotion-capacity-v1
- left_prompt_hash: b87da85cf79a
- right_prompt_hash: b87da85cf79a

## Run Overview
| run | provider | rule_version | total | fit | adjacent | badcase | badcase率 | <0 | 0-9 | 10-19 | 20+ |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| nox@promotion-capacity-v1 | nox | promotion-capacity-v1 | 500 | 204 | 74 | 222 | 44.4% | 22 | 251 | 23 | 204 |
| xtb@promotion-capacity-v1 | xtb | promotion-capacity-v1 | 500 | 336 | 136 | 28 | 5.6% | 2 | 22 | 247 | 229 |

## Page-Level Badcase Rate
| page | nox@promotion-capacity-v1_total | nox@promotion-capacity-v1_badcase | nox@promotion-capacity-v1_badcase率 | xtb@promotion-capacity-v1_total | xtb@promotion-capacity-v1_badcase | xtb@promotion-capacity-v1_badcase率 | badcase率差 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 50 | 4 | 8.0% | 50 | 3 | 6.0% | 2.0% |
| 2 | 50 | 7 | 14.0% | 50 | 2 | 4.0% | 10.0% |
| 3 | 50 | 15 | 30.0% | 50 | 2 | 4.0% | 26.0% |
| 4 | 50 | 20 | 40.0% | 50 | 4 | 8.0% | 32.0% |
| 5 | 50 | 25 | 50.0% | 50 | 4 | 8.0% | 42.0% |
| 6 | 50 | 22 | 44.0% | 50 | 2 | 4.0% | 40.0% |
| 7 | 50 | 31 | 62.0% | 50 | 4 | 8.0% | 54.0% |
| 8 | 50 | 34 | 68.0% | 50 | 3 | 6.0% | 62.0% |
| 9 | 50 | 32 | 64.0% | 50 | 0 | 0.0% | 64.0% |
| 10 | 50 | 32 | 64.0% | 50 | 4 | 8.0% | 56.0% |

## Badcase Overlap
| metric | count |
| --- | --- |
| shared_badcase | 7 |
| nox@promotion-capacity-v1_only_badcase | 215 |
| xtb@promotion-capacity-v1_only_badcase | 21 |

## Badcase Cause Summary
| provider | category | count |
| --- | --- | --- |
| nox@promotion-capacity-v1 | 证据缺失或信号不足 | 68 |
| nox@promotion-capacity-v1 | 泛相关性偏离 | 56 |
| nox@promotion-capacity-v1 | 其他 | 52 |
| nox@promotion-capacity-v1 | 娱乐/儿童/泛内容偏离 | 32 |
| nox@promotion-capacity-v1 | 宠物/动物受众冲突 | 13 |
| nox@promotion-capacity-v1 | 科技/电子垂类偏离 | 1 |
| xtb@promotion-capacity-v1 | 其他 | 16 |
| xtb@promotion-capacity-v1 | 娱乐/儿童/泛内容偏离 | 10 |
| xtb@promotion-capacity-v1 | 泛相关性偏离 | 1 |
| xtb@promotion-capacity-v1 | 宠物/动物受众冲突 | 1 |

## Shared Badcases
| channel | nox@promotion-capacity-v1 | xtb@promotion-capacity-v1 |
| --- | --- | --- |
| Ameya Okamoto | 无马拉松相关信号，偏美甲美容内容 | 美甲美妆为主，马拉松只是零散露出，近期几乎不相关 |
| sarahbfit | 纯健身举铁向，缺少跑步马拉松受众 | 标签有跑步，但近期内容几乎全是校园日常与清洁 |
| Rigo Mendoza | 情感 faith 频道，和马拉松无关 | 近期多为舞蹈情感内容，马拉松相关性很弱 |
| unit | 无马拉松或跑步相关信号 | 娱乐/书影音杂内容，马拉松信号太弱。 |
| Kell | 教育/教师频道，与马拉松推广无关 | 教育娱乐混合且近期几乎无跑步主线，不适合投放 |
| Chief Charlie Chance | 宠物犬垂类，和人类马拉松推广互斥 | 宠物号为主，马拉松只是少量个人内容，不适合投放 |
| Brooke Epps | 仅有泛内容标记，缺少运动线索 | 近期多为家庭/剧情内容，马拉松存在感弱 |

## nox@promotion-capacity-v1-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 32 | Ben Carpenter | 0 | 无马拉松相关语境，内容偏健康泛领域 |
| 34 | Isaiah | 0 | 与马拉松无关，偏汽车与故事内容 |
| 45 | Nēv Schulman | 2 | 跑步词弱命中，但主体偏娱乐/钓鱼 |
| 52 | Jay Torrez | 0 | 娱乐向且无跑步相关标签 |
| 54 | Get Adjusted Now | 0 | 理疗背痛向，与马拉松受众不符 |
| 60 | fonzian | 0 | 仅aesthetic，无跑步或马拉松标签 |
| 74 | taryn lamb | 0 | 生活方式服饰向，缺少跑步受众 |
| 77 | Bearsun | 0 | 新闻旅游向，缺少跑步或马拉松受众信号 |
| 79 | Sara 🤩 | 5 | 宠物受众为主，马拉松仅零散出现 |
| 93 | Katerina Finck | -15 | 宠物频道，和人类马拉松推广不匹配 |
| 103 | JACKIE🤠 | 0 | 咖啡娱乐频道，无跑步或马拉松相关受众 |
| 104 | Buenosdiasdiaz | 0 | 军旅娱乐杂项频道，和马拉松推广不匹配 |
| 113 | samualreecee | 0 | 娱乐游戏音乐频道，缺少马拉松相关受众 |
| 117 | vinny mui | 0 | 男装时尚频道，无跑步受众 |
| 121 | Isaac Rochell | 0 | 家庭婚礼娱乐向，和马拉松无关 |
| 131 | Memo González | 0 | 主题与马拉松无关 |
| 133 | Hannah | 0 | 缺少标签与主题信息，难判断相关性 |
| 135 | Travis Hottinger | 20 | 汽车/健身为主，马拉松词更像泛词 |
| 139 | Alex Carvalho | 0 | 旅行生活号，无马拉松相关信号 |
| 143 | Safa Bilal | 0 | 美妆穿搭频道，和马拉松无关 |
| 144 | Amy Woods | 0 | 缺少标签，相关性不足 |
| 145 | Heather Nixon ✨ | 0 | 摄影/商业频道，和马拉松无关 |
| 147 | Cierra | 0 | 美妆穿搭为主，和马拉松无关 |
| 155 | AyJay✨ | 0 | 纯迪士尼演员标签，与马拉松推广无关 |
| 156 | maura tompkins | 0 | 无跑步/马拉松相关内容 |
| 158 | Paula Rosero | Content Creator | 0 | 诗歌与生活向内容，不适合马拉松推广 |
| 159 | Avelyn | 0 | LGBT内容为主，缺少跑步/马拉松受众 |
| 161 | skylerstockie | 0 | 纯时尚号，与马拉松不相关 |
| 162 | Finn | 0 | 娱乐/影视向内容，缺少马拉松受众 |
| 163 | Angela Jordan | 0 | 婚礼宠物向内容，和马拉松无关 |

## xtb@promotion-capacity-v1-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 25 | Sean Hill | 13 | 近期几乎全是旅行日常，马拉松信号太弱 |
| 28 | JuanBertheau | -5 | 虽有马拉松标签，但主轴是娱乐时尚摩托，近期高度不相关 |
| 93 | bonakala_zoey | 12 | 标题多为生活和祷告，马拉松相关性弱 |
| 137 | mandyandmadi | 0 | 娱乐向账号，马拉松仅零散出现，近期多不相关。 |
| 157 | caden | 10 | 标签有Marathon，但近10条几乎全是挑战/美食/足球 |
| 169 | Thế anh - chạy bộ | 10 | 有跑步标签，但近期10条几乎全是旅行/路演内容 |
| 188 | Rahmad Setiabudi | 13 | 马拉松标签有，但近期内容多为抽象杂片段，稳定性差 |
| 197 | Salvatore Greco | 12 | 生活/语言学习/娱乐为主，跑步内容占比低 |
| 206 | Juan Pablo || Fisioterapeuta | 11 | 虽有马拉松标签，但近期几乎都是泛娱乐和热点内容 |
| 215 | Anthony and Gabby | 10 | 虽有马拉松标签，但近10条几乎全是旅行购物和生活内容 |
| 219 | Aliana King | 10 | 美发美妆为主，虽有马拉松标签但近期几乎无相关内容 |
| 241 | Xaiosphere | 9 | 娱乐搞笑为主，马拉松只是零散标题，格式不适合 |
| 265 | nefastinnn | 0 | 幽默与跑步混合，近期非跑步内容偏多 |
| 269 | Julie Vermeire | 0 | 舞蹈娱乐为主，近期无跑步内容，不适合马拉松推广 |
| 316 | THANH THANHHH | 0 | 情感娱乐向占主导，马拉松只是少量点缀且不稳定 |
| 362 | ✨ S A B 💚 | 10 | 虽有马拉松标签，但近期几乎全是娱乐/舞蹈/生活 |
| 389 | natflixandchill | 1 | 夜生活/音乐内容为主，马拉松只剩标签 |
| 391 | Maria Elisa🇵🇷🌺 | 10 | 美食/美妆为主，近10条几乎全偏题 |
| 458 | Victoria Myers 🤍 | 12 | 虽有马拉松标签，但近期多为美妆和生活内容 |
| 464 | marth | 11 | 马拉松只偶尔提及，近期多为马术生活内容 |
| 469 | safiaruns | 10 | 马拉松标签存在，但近期几乎无跑步相关内容 |

## Notes
- Page-level rates use `page_size` from each run metadata.
- Cause categories are heuristic clusters from `why_short`; review representative rows before making product decisions.
