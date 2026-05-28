# Channel Search Provider Comparison

- keyword: lifestyle
- platform: instagram
- country: US
- left: nox@promotion-capacity-v1 (tmp/channel-search-review/20260527-nox-vs-xtb-10kw-instagram-us-front10-promotion-capacity-v1/lifestyle/nox-instagram)
- right: xtb@promotion-capacity-v1 (tmp/channel-search-review/20260527-nox-vs-xtb-10kw-instagram-us-front10-promotion-capacity-v1/lifestyle/xtb-instagram)
- left_rule_version: promotion-capacity-v1
- right_rule_version: promotion-capacity-v1
- left_prompt_hash: b87da85cf79a
- right_prompt_hash: b87da85cf79a

## Run Overview
| run | provider | rule_version | total | fit | adjacent | badcase | badcase率 | <0 | 0-9 | 10-19 | 20+ |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| nox@promotion-capacity-v1 | nox | promotion-capacity-v1 | 500 | 414 | 74 | 12 | 2.4% | 1 | 23 | 6 | 470 |
| xtb@promotion-capacity-v1 | xtb | promotion-capacity-v1 | 500 | 402 | 97 | 1 | 0.2% | 0 | 0 | 2 | 498 |

## Page-Level Badcase Rate
| page | nox@promotion-capacity-v1_total | nox@promotion-capacity-v1_badcase | nox@promotion-capacity-v1_badcase率 | xtb@promotion-capacity-v1_total | xtb@promotion-capacity-v1_badcase | xtb@promotion-capacity-v1_badcase率 | badcase率差 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 50 | 0 | 0.0% | 50 | 0 | 0.0% | 0.0% |
| 2 | 50 | 0 | 0.0% | 50 | 0 | 0.0% | 0.0% |
| 3 | 50 | 1 | 2.0% | 50 | 0 | 0.0% | 2.0% |
| 4 | 50 | 3 | 6.0% | 50 | 0 | 0.0% | 6.0% |
| 5 | 50 | 1 | 2.0% | 50 | 1 | 2.0% | 0.0% |
| 6 | 50 | 3 | 6.0% | 50 | 0 | 0.0% | 6.0% |
| 7 | 50 | 1 | 2.0% | 50 | 0 | 0.0% | 2.0% |
| 8 | 50 | 2 | 4.0% | 50 | 0 | 0.0% | 4.0% |
| 9 | 50 | 1 | 2.0% | 50 | 0 | 0.0% | 2.0% |
| 10 | 50 | 0 | 0.0% | 50 | 0 | 0.0% | 0.0% |

## Badcase Overlap
| metric | count |
| --- | --- |
| shared_badcase | 0 |
| nox@promotion-capacity-v1_only_badcase | 12 |
| xtb@promotion-capacity-v1_only_badcase | 1 |

## Badcase Cause Summary
| provider | category | count |
| --- | --- | --- |
| nox@promotion-capacity-v1 | 证据缺失或信号不足 | 8 |
| nox@promotion-capacity-v1 | 娱乐/儿童/泛内容偏离 | 2 |
| nox@promotion-capacity-v1 | 宠物/动物受众冲突 | 1 |
| nox@promotion-capacity-v1 | 泛相关性偏离 | 1 |
| xtb@promotion-capacity-v1 | 娱乐/儿童/泛内容偏离 | 1 |

## Shared Badcases
| channel | nox@promotion-capacity-v1 | xtb@promotion-capacity-v1 |
| --- | --- | --- |

## nox@promotion-capacity-v1-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 141 | jryako | 0 | 无标签无证据，召回不足 |
| 161 | Levi The English Bulldog | 5 | 宠物犬账号，受众不符，生活方式推广不适配 |
| 163 | Anastasia | 0 | 派对装饰账号，与生活方式关键词无关 |
| 186 | Morgan Hanbery | -5 | 吃播娱乐为主，生活方式推广不匹配 |
| 212 | Landen Levine | 0 | 缺少标签和内容证据，无法判断为 lifestyle 频道 |
| 273 | Jarrett Campbell | 0 | 娱乐吐槽为主，和lifestyle不相关 |
| 278 | Sha’Tavia Levy | 0 | 无标签无内容信号，无法判断为相关创作者 |
| 289 | Daniel Ocampo | 0 | 无标签无内容信号，相关性不足 |
| 304 | Mateo Caputo | 0 | 无标签与内容证据，无法判断相关性 |
| 352 | Aleysha Garcia | 0 | 无标签且无任何 lifestyle 信号 |
| 354 | Mario Martínez | 0 | 地域文化账号，缺少 lifestyle 信号 |
| 441 | Brez | 0 | 无标签，无法判断 |

## xtb@promotion-capacity-v1-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 209 | 𝕭𝖆𝖉𝖎𝖍 𝕳𝖆𝖑𝖑𝖆𝖑 | 10 | Lifestyle仅为标签，主体是音乐娱乐 |

## Notes
- Page-level rates use `page_size` from each run metadata.
- Cause categories are heuristic clusters from `why_short`; review representative rows before making product decisions.
