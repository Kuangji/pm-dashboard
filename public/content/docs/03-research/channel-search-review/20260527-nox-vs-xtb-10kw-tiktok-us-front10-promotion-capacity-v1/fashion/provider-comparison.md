# Channel Search Provider Comparison

- keyword: fashion
- platform: tiktok
- country: US
- left: nox@promotion-capacity-v1 (tmp/channel-search-review/20260527-nox-vs-xtb-10kw-tiktok-us-front10-promotion-capacity-v1/fashion/nox-tiktok)
- right: xtb@promotion-capacity-v1 (tmp/channel-search-review/20260527-nox-vs-xtb-10kw-tiktok-us-front10-promotion-capacity-v1/fashion/xtb-tiktok)
- left_rule_version: promotion-capacity-v1
- right_rule_version: promotion-capacity-v1
- left_prompt_hash: b87da85cf79a
- right_prompt_hash: b87da85cf79a

## Run Overview
| run | provider | rule_version | total | fit | adjacent | badcase | badcase率 | <0 | 0-9 | 10-19 | 20+ |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| nox@promotion-capacity-v1 | nox | promotion-capacity-v1 | 500 | 442 | 55 | 3 | 0.6% | 0 | 3 | 20 | 477 |
| xtb@promotion-capacity-v1 | xtb | promotion-capacity-v1 | 500 | 356 | 129 | 15 | 3.0% | 1 | 9 | 129 | 361 |

## Page-Level Badcase Rate
| page | nox@promotion-capacity-v1_total | nox@promotion-capacity-v1_badcase | nox@promotion-capacity-v1_badcase率 | xtb@promotion-capacity-v1_total | xtb@promotion-capacity-v1_badcase | xtb@promotion-capacity-v1_badcase率 | badcase率差 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 50 | 1 | 2.0% | 50 | 2 | 4.0% | -2.0% |
| 2 | 50 | 1 | 2.0% | 50 | 2 | 4.0% | -2.0% |
| 3 | 50 | 0 | 0.0% | 50 | 1 | 2.0% | -2.0% |
| 4 | 50 | 0 | 0.0% | 50 | 0 | 0.0% | 0.0% |
| 5 | 50 | 0 | 0.0% | 50 | 1 | 2.0% | -2.0% |
| 6 | 50 | 0 | 0.0% | 50 | 3 | 6.0% | -6.0% |
| 7 | 50 | 0 | 0.0% | 50 | 0 | 0.0% | 0.0% |
| 8 | 50 | 0 | 0.0% | 50 | 4 | 8.0% | -8.0% |
| 9 | 50 | 0 | 0.0% | 50 | 1 | 2.0% | -2.0% |
| 10 | 50 | 1 | 2.0% | 50 | 1 | 2.0% | 0.0% |

## Badcase Overlap
| metric | count |
| --- | --- |
| shared_badcase | 0 |
| nox@promotion-capacity-v1_only_badcase | 3 |
| xtb@promotion-capacity-v1_only_badcase | 15 |

## Badcase Cause Summary
| provider | category | count |
| --- | --- | --- |
| nox@promotion-capacity-v1 | 泛相关性偏离 | 1 |
| nox@promotion-capacity-v1 | 其他 | 1 |
| nox@promotion-capacity-v1 | 证据缺失或信号不足 | 1 |
| xtb@promotion-capacity-v1 | 其他 | 7 |
| xtb@promotion-capacity-v1 | 娱乐/儿童/泛内容偏离 | 6 |
| xtb@promotion-capacity-v1 | 泛相关性偏离 | 2 |

## Shared Badcases
| channel | nox@promotion-capacity-v1 | xtb@promotion-capacity-v1 |
| --- | --- | --- |

## nox@promotion-capacity-v1-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 46 | DamienBroderick 🇮🇪 | 5 | ASMR格式与时尚推广冲突，直接判坏例 |
| 68 | Whitney | 10 | ASMR格式与服饰推广明显不匹配 |
| 453 | Triel_b | 0 | 无标签、无视频证据，缺少时尚相关性 |

## xtb@promotion-capacity-v1-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 22 | Ney Sánchez | 10 | 近期几乎全是无关内容，时尚标签支撑不足 |
| 32 | Joshua Doss | 0 | 娱乐号为主，时尚仅零星露出，近10条几乎都非服饰内容 |
| 75 | charli d’amelio | 10 | 近期以舞蹈娱乐为主，时尚标签不构成主赛道 |
| 100 | emo | 2 | 标签命中但近10条多为无关怪内容 |
| 113 | k.onth | 15 | 近10条多为杂内容，时尚信号弱，适配低 |
| 238 | Danthejuice | 0 | 主要是喜剧内容，时尚仅是标签，格式严重不匹配 |
| 255 | * | 12 | 仅有泛时尚标签，近期内容杂乱，转化承接弱 |
| 266 | Adrian🐈‍⬛ | 11 | 虽带时尚标签，但近期几乎是泛娱乐内容 |
| 272 | sondra_blust | 11 | 情侣娱乐内容为主，时尚只是弱标签，不适合 |
| 361 | Tana Mongeau | 10 | 虽有时尚标签，但近10条几乎全非时尚内容，适配弱 |
| 376 | Sofie Dossi | 10 | 有Fashion标签，但近10条以体操/日常为主，时尚推广相关性弱 |
| 383 | lena | 10 | 标签有时尚，但近10条几乎全是 vlog，推广意图弱 |
| 393 | andreaespadatv | 10 | 主轴偏家庭娱乐和美妆，时尚只剩标签 |
| 406 | CallMeMike | -5 | 剪辑娱乐号，非服饰推广型内容 |
| 493 | 🌟 | 5 | 以游戏蒙太奇为主，时尚仅是表层标签，不适合服饰推广 |

## Notes
- Page-level rates use `page_size` from each run metadata.
- Cause categories are heuristic clusters from `why_short`; review representative rows before making product decisions.
