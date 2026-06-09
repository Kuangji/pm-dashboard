# Channel Search Provider Comparison

- keyword: lifestyle
- platform: youtube
- country: us
- left: nox@prompt:b87da85cf79a (tmp/channel-search-review/20260608-nox-vs-xtb-beauty-tech-lifestyle-3platform-us-front5/youtube/lifestyle/nox-youtube)
- right: xtb@prompt:b87da85cf79a (tmp/channel-search-review/20260608-nox-vs-xtb-beauty-tech-lifestyle-3platform-us-front5/youtube/lifestyle/xtb-youtube)
- left_rule_version: prompt:b87da85cf79a
- right_rule_version: prompt:b87da85cf79a
- left_prompt_hash: b87da85cf79a
- right_prompt_hash: b87da85cf79a

## Run Overview
| run | provider | rule_version | total | fit | adjacent | badcase | badcase率 | <0 | 0-9 | 10-19 | 20+ |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| nox@prompt:b87da85cf79a | nox | prompt:b87da85cf79a | 250 | 204 | 40 | 6 | 2.4% | 0 | 6 | 18 | 226 |
| xtb@prompt:b87da85cf79a | xtb | prompt:b87da85cf79a | 250 | 208 | 37 | 5 | 2.0% | 0 | 5 | 12 | 233 |

## Page-Level Badcase Rate
| page | nox@prompt:b87da85cf79a_total | nox@prompt:b87da85cf79a_badcase | nox@prompt:b87da85cf79a_badcase率 | xtb@prompt:b87da85cf79a_total | xtb@prompt:b87da85cf79a_badcase | xtb@prompt:b87da85cf79a_badcase率 | badcase率差 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 50 | 0 | 0.0% | 50 | 2 | 4.0% | -4.0% |
| 2 | 50 | 0 | 0.0% | 50 | 0 | 0.0% | 0.0% |
| 3 | 50 | 1 | 2.0% | 50 | 1 | 2.0% | 0.0% |
| 4 | 50 | 0 | 0.0% | 50 | 0 | 0.0% | 0.0% |
| 5 | 50 | 5 | 10.0% | 50 | 2 | 4.0% | 6.0% |

## Badcase Overlap
| metric | count |
| --- | --- |
| shared_badcase | 1 |
| nox@prompt:b87da85cf79a_only_badcase | 5 |
| xtb@prompt:b87da85cf79a_only_badcase | 4 |

## Badcase Cause Summary
| provider | category | count |
| --- | --- | --- |
| nox@prompt:b87da85cf79a | 其他 | 3 |
| nox@prompt:b87da85cf79a | 娱乐/儿童/泛内容偏离 | 2 |
| nox@prompt:b87da85cf79a | 宠物/动物受众冲突 | 1 |
| xtb@prompt:b87da85cf79a | 其他 | 3 |
| xtb@prompt:b87da85cf79a | 宠物/动物受众冲突 | 1 |
| xtb@prompt:b87da85cf79a | 娱乐/儿童/泛内容偏离 | 1 |

## Shared Badcases
| channel | nox@prompt:b87da85cf79a | xtb@prompt:b87da85cf79a |
| --- | --- | --- |
| Golden Retriever Luhu | 宠物频道为主，非人类生活方式创作者 | 宠物狗频道，做人类生活方式推广不合适 |

## nox@prompt:b87da85cf79a-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 208 | The Impulsive Duo | 5 | 成人关系娱乐向，不像生活方式创作者 |
| 220 | Oliver Tree | 5 | 音乐艺人主导，生活方式标签噪声较大 |
| 224 | Denny2tymes | 5 | 恶搞娱乐向，生活方式匹配弱 |
| 246 | Starchiana | 5 | ASMR+吃播型，不适合常规生活方式产品推广 |
| 250 | Samdotvlog | 5 | 吃播型内容为主，和常规产品投放格式不匹配 |

## xtb@prompt:b87da85cf79a-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 34 | brooklyn reidhead | 5 | ASMR/restock主导，生活方式推广格式不匹配 |
| 105 | TIGERX1 | 0 | 纯游戏内容，无 lifestyle 相关受众或场景 |
| 215 | kason | 5 | 虽有lifestyle标签，但核心是gacha娱乐 |
| 222 | Legacy Luxxee | 0 | 无有效标签，相关性证据不足 |

## Notes
- Page-level rates use `page_size` from each run metadata.
- Cause categories are heuristic clusters from `why_short`; review representative rows before making product decisions.
