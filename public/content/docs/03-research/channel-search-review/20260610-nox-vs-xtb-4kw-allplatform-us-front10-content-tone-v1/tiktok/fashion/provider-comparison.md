# Channel Search Provider Comparison

- keyword: fashion
- platform: tiktok
- country: US
- left: nox@content-tone-llm-v1 (tmp/channel-search-review/20260610-nox-vs-xtb-4kw-allplatform-us-front10-content-tone-v1/tiktok/fashion/nox-tiktok)
- right: xtb@content-tone-llm-v1 (tmp/channel-search-review/20260610-nox-vs-xtb-4kw-allplatform-us-front10-content-tone-v1/tiktok/fashion/xtb-tiktok)
- left_rule_version: content-tone-llm-v1
- right_rule_version: content-tone-llm-v1
- left_prompt_hash: 1228e2ff575f
- right_prompt_hash: 1228e2ff575f

## Run Overview
| run | provider | rule_version | total | fit | adjacent | badcase | badcase率 | <0 | 0-9 | 10-19 | 20+ |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| nox@content-tone-llm-v1 | nox | content-tone-llm-v1 | 500 | 381 | 108 | 11 | 2.2% | 0 | 500 | 0 | 0 |
| xtb@content-tone-llm-v1 | xtb | content-tone-llm-v1 | 500 | 391 | 103 | 6 | 1.2% | 0 | 500 | 0 | 0 |

## Page-Level Badcase Rate
| page | nox@content-tone-llm-v1_total | nox@content-tone-llm-v1_badcase | nox@content-tone-llm-v1_badcase率 | xtb@content-tone-llm-v1_total | xtb@content-tone-llm-v1_badcase | xtb@content-tone-llm-v1_badcase率 | badcase率差 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 50 | 0 | 0.0% | 50 | 0 | 0.0% | 0.0% |
| 2 | 50 | 2 | 4.0% | 50 | 0 | 0.0% | 4.0% |
| 3 | 50 | 1 | 2.0% | 50 | 0 | 0.0% | 2.0% |
| 4 | 50 | 1 | 2.0% | 50 | 0 | 0.0% | 2.0% |
| 5 | 50 | 3 | 6.0% | 50 | 0 | 0.0% | 6.0% |
| 6 | 50 | 1 | 2.0% | 50 | 0 | 0.0% | 2.0% |
| 7 | 50 | 0 | 0.0% | 50 | 1 | 2.0% | -2.0% |
| 8 | 50 | 0 | 0.0% | 50 | 4 | 8.0% | -8.0% |
| 9 | 50 | 0 | 0.0% | 50 | 1 | 2.0% | -2.0% |
| 10 | 50 | 3 | 6.0% | 50 | 0 | 0.0% | 6.0% |

## Badcase Overlap
| metric | count |
| --- | --- |
| shared_badcase | 5 |
| nox@content-tone-llm-v1_only_badcase | 6 |
| xtb@content-tone-llm-v1_only_badcase | 1 |

## Badcase Cause Summary
| provider | category | count |
| --- | --- | --- |
| nox@content-tone-llm-v1 | 证据缺失或信号不足 | 4 |
| nox@content-tone-llm-v1 | 其他 | 4 |
| nox@content-tone-llm-v1 | 宠物/动物受众冲突 | 2 |
| nox@content-tone-llm-v1 | 娱乐/儿童/泛内容偏离 | 1 |
| xtb@content-tone-llm-v1 | 其他 | 5 |
| xtb@content-tone-llm-v1 | 证据缺失或信号不足 | 1 |

## Shared Badcases
| channel | nox@content-tone-llm-v1 | xtb@content-tone-llm-v1 |
| --- | --- | --- |
| Jade Diva Myanmar | 主体是家庭短剧/情景喜剧，时尚只是零散背景，不适合服饰推广 | 主体是家庭短剧与日常喜剧，不像时尚频道 |
| Just Blondie | 主体是喜剧/人设内容，缺少时尚承载 | 主体是喜剧短梗，几乎没有稳定的时尚承载。 |
| Jackie Gansky | 主内容是喜剧即兴和角色表演，几乎不承载时尚推广 | 主体是喜剧短剧，不是穿搭消费内容 |
| 2k 💫 | 内容几乎是家庭日常、信仰和吃喝，缺少时尚承载力 | 家庭日常和感悟为主，几乎没有时尚承载 |
| trendygabriel | 主要是搞笑实验、游戏和杂项，几乎无服饰承载 | 主要是整蛊、游戏、应用和奇趣内容，缺少服饰语境 |

## nox@content-tone-llm-v1-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 67 | mo |  | 整体是生活/搞笑/宠物内容，几乎没有时尚承载 |
| 68 | Dimpey |  | 内容偏抽象娱乐和AI梗，没有时尚消费语境 |
| 139 | 𝑀🍸 |  | 主要是名人/moodboard符号堆叠，缺少真实时尚承载与消费内容 |
| 459 | Duchess😊😍 |  | 内容以泛娱乐、唱歌和情绪表达为主，缺少时尚承载 |
| 463 | Austin Mollno |  | 主体是汽车、宠物和DIY，几乎不做时尚内容 |
| 499 | bbellasclothez |  | 内容几乎全是美护和家居，无服饰场景 |

## xtb@content-tone-llm-v1-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 400 | 𝙕𝙣𝙧𝙤𝙫🕺 |  | 主体是整活评论教程，服饰商品像临时贴片 |

## Notes
- Page-level rates use `page_size` from each run metadata.
- Cause categories are heuristic clusters from `why_short`; review representative rows before making product decisions.
