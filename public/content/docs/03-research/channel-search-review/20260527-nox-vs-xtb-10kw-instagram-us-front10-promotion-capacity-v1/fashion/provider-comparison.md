# Channel Search Provider Comparison

- keyword: fashion
- platform: instagram
- country: US
- left: nox@promotion-capacity-v1 (tmp/channel-search-review/20260527-nox-vs-xtb-10kw-instagram-us-front10-promotion-capacity-v1/fashion/nox-instagram)
- right: xtb@promotion-capacity-v1 (tmp/channel-search-review/20260527-nox-vs-xtb-10kw-instagram-us-front10-promotion-capacity-v1/fashion/xtb-instagram)
- left_rule_version: promotion-capacity-v1
- right_rule_version: promotion-capacity-v1
- left_prompt_hash: b87da85cf79a
- right_prompt_hash: b87da85cf79a

## Run Overview
| run | provider | rule_version | total | fit | adjacent | badcase | badcase率 | <0 | 0-9 | 10-19 | 20+ |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| nox@promotion-capacity-v1 | nox | promotion-capacity-v1 | 500 | 401 | 99 | 0 | 0.0% | 0 | 0 | 7 | 493 |
| xtb@promotion-capacity-v1 | xtb | promotion-capacity-v1 | 500 | 361 | 134 | 5 | 1.0% | 0 | 1 | 4 | 495 |

## Page-Level Badcase Rate
| page | nox@promotion-capacity-v1_total | nox@promotion-capacity-v1_badcase | nox@promotion-capacity-v1_badcase率 | xtb@promotion-capacity-v1_total | xtb@promotion-capacity-v1_badcase | xtb@promotion-capacity-v1_badcase率 | badcase率差 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 50 | 0 | 0.0% | 50 | 0 | 0.0% | 0.0% |
| 2 | 50 | 0 | 0.0% | 50 | 2 | 4.0% | -4.0% |
| 3 | 50 | 0 | 0.0% | 50 | 0 | 0.0% | 0.0% |
| 4 | 50 | 0 | 0.0% | 50 | 0 | 0.0% | 0.0% |
| 5 | 50 | 0 | 0.0% | 50 | 0 | 0.0% | 0.0% |
| 6 | 50 | 0 | 0.0% | 50 | 1 | 2.0% | -2.0% |
| 7 | 50 | 0 | 0.0% | 50 | 1 | 2.0% | -2.0% |
| 8 | 50 | 0 | 0.0% | 50 | 0 | 0.0% | 0.0% |
| 9 | 50 | 0 | 0.0% | 50 | 0 | 0.0% | 0.0% |
| 10 | 50 | 0 | 0.0% | 50 | 1 | 2.0% | -2.0% |

## Badcase Overlap
| metric | count |
| --- | --- |
| shared_badcase | 0 |
| nox@promotion-capacity-v1_only_badcase | 0 |
| xtb@promotion-capacity-v1_only_badcase | 5 |

## Badcase Cause Summary
| provider | category | count |
| --- | --- | --- |
| xtb@promotion-capacity-v1 | 娱乐/儿童/泛内容偏离 | 3 |
| xtb@promotion-capacity-v1 | 其他 | 2 |

## Shared Badcases
| channel | nox@promotion-capacity-v1 | xtb@promotion-capacity-v1 |
| --- | --- | --- |

## nox@promotion-capacity-v1-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |

## xtb@promotion-capacity-v1-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 60 | Memes 🔞 | 10 | 表情包娱乐为主，时尚商业属性弱 |
| 73 | Anisa Khraiwish | 10 | 游戏内容占主导，时尚标签转化弱 |
| 283 | Memes 🔞 | 5 | 梗图娱乐为主，时尚标签不支撑投放 |
| 343 | Adrian & RJ | 11 | ASMR/搞笑/做饭为主，fashion只是弱标签 |
| 456 | MEMES | 10 | 仅有表层时尚词，主体是表情包娱乐，格式不匹配 |

## Notes
- Page-level rates use `page_size` from each run metadata.
- Cause categories are heuristic clusters from `why_short`; review representative rows before making product decisions.
