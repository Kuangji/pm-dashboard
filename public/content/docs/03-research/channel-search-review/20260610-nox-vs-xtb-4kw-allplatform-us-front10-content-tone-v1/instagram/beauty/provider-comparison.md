# Channel Search Provider Comparison

- keyword: beauty
- platform: instagram
- country: US
- left: nox@content-tone-llm-v1 (tmp/channel-search-review/20260610-nox-vs-xtb-4kw-allplatform-us-front10-content-tone-v1/instagram/beauty/nox-instagram)
- right: xtb@content-tone-llm-v1 (tmp/channel-search-review/20260610-nox-vs-xtb-4kw-allplatform-us-front10-content-tone-v1/instagram/beauty/xtb-instagram)
- left_rule_version: content-tone-llm-v1
- right_rule_version: content-tone-llm-v1
- left_prompt_hash: 1228e2ff575f
- right_prompt_hash: 1228e2ff575f

## Run Overview
| run | provider | rule_version | total | fit | adjacent | badcase | badcase率 | <0 | 0-9 | 10-19 | 20+ |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| nox@content-tone-llm-v1 | nox | content-tone-llm-v1 | 500 | 389 | 107 | 4 | 0.8% | 0 | 500 | 0 | 0 |
| xtb@content-tone-llm-v1 | xtb | content-tone-llm-v1 | 500 | 405 | 88 | 7 | 1.4% | 0 | 500 | 0 | 0 |

## Page-Level Badcase Rate
| page | nox@content-tone-llm-v1_total | nox@content-tone-llm-v1_badcase | nox@content-tone-llm-v1_badcase率 | xtb@content-tone-llm-v1_total | xtb@content-tone-llm-v1_badcase | xtb@content-tone-llm-v1_badcase率 | badcase率差 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 50 | 1 | 2.0% | 50 | 1 | 2.0% | 0.0% |
| 2 | 50 | 1 | 2.0% | 50 | 1 | 2.0% | 0.0% |
| 3 | 50 | 0 | 0.0% | 50 | 0 | 0.0% | 0.0% |
| 4 | 50 | 1 | 2.0% | 50 | 0 | 0.0% | 2.0% |
| 5 | 50 | 0 | 0.0% | 50 | 0 | 0.0% | 0.0% |
| 6 | 50 | 0 | 0.0% | 50 | 1 | 2.0% | -2.0% |
| 7 | 50 | 0 | 0.0% | 50 | 2 | 4.0% | -4.0% |
| 8 | 50 | 1 | 2.0% | 50 | 1 | 2.0% | 0.0% |
| 9 | 50 | 0 | 0.0% | 50 | 1 | 2.0% | -2.0% |
| 10 | 50 | 0 | 0.0% | 50 | 0 | 0.0% | 0.0% |

## Badcase Overlap
| metric | count |
| --- | --- |
| shared_badcase | 1 |
| nox@content-tone-llm-v1_only_badcase | 3 |
| xtb@content-tone-llm-v1_only_badcase | 6 |

## Badcase Cause Summary
| provider | category | count |
| --- | --- | --- |
| nox@content-tone-llm-v1 | 其他 | 3 |
| nox@content-tone-llm-v1 | 娱乐/儿童/泛内容偏离 | 1 |
| xtb@content-tone-llm-v1 | 其他 | 7 |

## Shared Badcases
| channel | nox@content-tone-llm-v1 | xtb@content-tone-llm-v1 |
| --- | --- | --- |
| 𝚗𝚎𝚞𝚝𝚌𝚑 𝚗𝚊𝚝𝚒𝚘𝚗🤍 | 主体是Teyana Taylor粉丝页，偏追星内容，不适合卖beauty商品 | 主要是明星饭圈与表演内容，不适合 beauty 推广 |

## nox@content-tone-llm-v1-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 26 | Sadaf Beauty |  | 主体是政治动员内容，少量美妆广告不足以支撑合作 |
| 63 | Misty Jean |  | 主要是音乐/抒情/个人形象输出，几乎没有可承接美妆推广的内容 |
| 192 | Black_beautifulclassy |  | 主体是泛娱乐和亲子内容，美妆承接能力弱 |

## xtb@content-tone-llm-v1-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 50 | Samantha & Keila 🇲🇭 |  | 主体是亲子搞笑内容，和beauty推广不匹配 |
| 96 | Memes favorites |  | 主体是梗图和泛内容，beauty 只做零散广告 |
| 271 | Badgalriri⚓️ |  | 核心是 Rihanna 粉丝号，不是可稳定承接美妆推广的内容形态。 |
| 337 | Fabien Laurencio de la Concepcion |  | 主体是喜剧和剧集内容，几乎不具备美妆承载 |
| 342 | Jazzey Rosę |  | 主要是穿搭夜生活内容，不是美妆消费场景 |
| 397 | Victoria Rizzuti |  | 核心是沟通表达与课程，和美妆商品受众不匹配 |

## Notes
- Page-level rates use `page_size` from each run metadata.
- Cause categories are heuristic clusters from `why_short`; review representative rows before making product decisions.
