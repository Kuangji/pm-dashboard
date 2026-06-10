# Channel Search Provider Comparison

- keyword: fashion
- platform: instagram
- country: US
- left: nox@content-tone-llm-v1 (tmp/channel-search-review/20260610-nox-vs-xtb-4kw-allplatform-us-front10-content-tone-v1/instagram/fashion/nox-instagram)
- right: xtb@content-tone-llm-v1 (tmp/channel-search-review/20260610-nox-vs-xtb-4kw-allplatform-us-front10-content-tone-v1/instagram/fashion/xtb-instagram)
- left_rule_version: content-tone-llm-v1
- right_rule_version: content-tone-llm-v1
- left_prompt_hash: 1228e2ff575f
- right_prompt_hash: 1228e2ff575f

## Run Overview
| run | provider | rule_version | total | fit | adjacent | badcase | badcase率 | <0 | 0-9 | 10-19 | 20+ |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| nox@content-tone-llm-v1 | nox | content-tone-llm-v1 | 500 | 367 | 131 | 2 | 0.4% | 0 | 500 | 0 | 0 |
| xtb@content-tone-llm-v1 | xtb | content-tone-llm-v1 | 500 | 378 | 118 | 4 | 0.8% | 0 | 500 | 0 | 0 |

## Page-Level Badcase Rate
| page | nox@content-tone-llm-v1_total | nox@content-tone-llm-v1_badcase | nox@content-tone-llm-v1_badcase率 | xtb@content-tone-llm-v1_total | xtb@content-tone-llm-v1_badcase | xtb@content-tone-llm-v1_badcase率 | badcase率差 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 50 | 0 | 0.0% | 50 | 0 | 0.0% | 0.0% |
| 2 | 50 | 0 | 0.0% | 50 | 1 | 2.0% | -2.0% |
| 3 | 50 | 2 | 4.0% | 50 | 1 | 2.0% | 2.0% |
| 4 | 50 | 0 | 0.0% | 50 | 1 | 2.0% | -2.0% |
| 5 | 50 | 0 | 0.0% | 50 | 0 | 0.0% | 0.0% |
| 6 | 50 | 0 | 0.0% | 50 | 1 | 2.0% | -2.0% |
| 7 | 50 | 0 | 0.0% | 50 | 0 | 0.0% | 0.0% |
| 8 | 50 | 0 | 0.0% | 50 | 0 | 0.0% | 0.0% |
| 9 | 50 | 0 | 0.0% | 50 | 0 | 0.0% | 0.0% |
| 10 | 50 | 0 | 0.0% | 50 | 0 | 0.0% | 0.0% |

## Badcase Overlap
| metric | count |
| --- | --- |
| shared_badcase | 2 |
| nox@content-tone-llm-v1_only_badcase | 0 |
| xtb@content-tone-llm-v1_only_badcase | 2 |

## Badcase Cause Summary
| provider | category | count |
| --- | --- | --- |
| nox@content-tone-llm-v1 | 其他 | 1 |
| nox@content-tone-llm-v1 | 宠物/动物受众冲突 | 1 |
| xtb@content-tone-llm-v1 | 其他 | 3 |
| xtb@content-tone-llm-v1 | 宠物/动物受众冲突 | 1 |

## Shared Badcases
| channel | nox@content-tone-llm-v1 | xtb@content-tone-llm-v1 |
| --- | --- | --- |
| Montez Wilson | 主轴是搞笑和数码/家居带货，不是时尚 | 主体是家庭喜剧和家居产品，和时尚推广不匹配 |
| BUNNYDAYOFF & MISS EWENS | 主体是宠物和萌物内容，缺少服饰审美与推广承载 | 主体是宠物/AI 搞笑，不具备服饰时尚受众承接力 |

## nox@content-tone-llm-v1-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |

## xtb@content-tone-llm-v1-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 98 | Ada Dindi Is My Gem |  | 几乎全是励志口播和日常，不是时尚频道 |
| 269 | Anamika 🧿 |  | 频道主体是社会议题/女性议题讨论，几乎不做时尚内容，不适合推 fashion |

## Notes
- Page-level rates use `page_size` from each run metadata.
- Cause categories are heuristic clusters from `why_short`; review representative rows before making product decisions.
