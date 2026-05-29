# Channel Search Provider Comparison

- keyword: yoga mat
- platform: youtube
- country: -
- left: nox@promotion-capacity-v1 (tmp/channel-search-review/20260528-nox-vs-xtb-10kw2-youtube-global-front10-promotion-capacity-v1/yoga-mat/nox-youtube)
- right: xtb@promotion-capacity-v1 (tmp/channel-search-review/20260528-nox-vs-xtb-10kw2-youtube-global-front10-promotion-capacity-v1/yoga-mat/xtb-youtube)
- left_rule_version: promotion-capacity-v1
- right_rule_version: promotion-capacity-v1
- left_prompt_hash: b87da85cf79a
- right_prompt_hash: b87da85cf79a

## Run Overview
| run | provider | rule_version | total | fit | adjacent | badcase | badcase率 | <0 | 0-9 | 10-19 | 20+ |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| nox@promotion-capacity-v1 | nox | promotion-capacity-v1 | 500 | 98 | 203 | 199 | 39.8% | 55 | 341 | 91 | 13 |
| xtb@promotion-capacity-v1 | xtb | promotion-capacity-v1 | 500 | 130 | 205 | 165 | 33.0% | 183 | 148 | 127 | 42 |

## Page-Level Badcase Rate
| page | nox@promotion-capacity-v1_total | nox@promotion-capacity-v1_badcase | nox@promotion-capacity-v1_badcase率 | xtb@promotion-capacity-v1_total | xtb@promotion-capacity-v1_badcase | xtb@promotion-capacity-v1_badcase率 | badcase率差 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 50 | 14 | 28.0% | 50 | 11 | 22.0% | 6.0% |
| 2 | 50 | 23 | 46.0% | 50 | 15 | 30.0% | 16.0% |
| 3 | 50 | 19 | 38.0% | 50 | 18 | 36.0% | 2.0% |
| 4 | 50 | 20 | 40.0% | 50 | 18 | 36.0% | 4.0% |
| 5 | 50 | 18 | 36.0% | 50 | 16 | 32.0% | 4.0% |
| 6 | 50 | 16 | 32.0% | 50 | 14 | 28.0% | 4.0% |
| 7 | 50 | 24 | 48.0% | 50 | 20 | 40.0% | 8.0% |
| 8 | 50 | 23 | 46.0% | 50 | 16 | 32.0% | 14.0% |
| 9 | 50 | 23 | 46.0% | 50 | 16 | 32.0% | 14.0% |
| 10 | 50 | 19 | 38.0% | 50 | 21 | 42.0% | -4.0% |

## Badcase Overlap
| metric | count |
| --- | --- |
| shared_badcase | 21 |
| nox@promotion-capacity-v1_only_badcase | 178 |
| xtb@promotion-capacity-v1_only_badcase | 144 |

## Badcase Cause Summary
| provider | category | count |
| --- | --- | --- |
| nox@promotion-capacity-v1 | 证据缺失或信号不足 | 71 |
| nox@promotion-capacity-v1 | 其他 | 61 |
| nox@promotion-capacity-v1 | 娱乐/儿童/泛内容偏离 | 26 |
| nox@promotion-capacity-v1 | 泛相关性偏离 | 23 |
| nox@promotion-capacity-v1 | 宠物/动物受众冲突 | 15 |
| nox@promotion-capacity-v1 | 科技/电子垂类偏离 | 3 |
| xtb@promotion-capacity-v1 | 其他 | 72 |
| xtb@promotion-capacity-v1 | 泛相关性偏离 | 47 |
| xtb@promotion-capacity-v1 | 娱乐/儿童/泛内容偏离 | 21 |
| xtb@promotion-capacity-v1 | 证据缺失或信号不足 | 18 |
| xtb@promotion-capacity-v1 | 宠物/动物受众冲突 | 7 |

## Shared Badcases
| channel | nox@promotion-capacity-v1 | xtb@promotion-capacity-v1 |
| --- | --- | --- |
| Purple Unicorns | 宠物频道，和人用瑜伽垫目标不一致 | 宠物内容为主，和人用瑜伽垫受众不匹配 |
| Renown Health | 医疗健康机构，不是瑜伽垫投放场景 | 健康医疗内容为主，缺少瑜伽垫推广场景 |
| Alicia Arol Lives On... | 仅宠物/生活泛标签，和瑜伽垫不匹配 | 宠物与生活碎片内容，和瑜伽垫无关 |
| Relax Sound Space | 放松音景/ASMR型频道，与瑜伽垫推广场景不符 | ASMR/放松音频型频道，物品推广格式明显不匹配 |
| 🕵️‍♀️ KitKat’s Korner | 缺少与瑜伽垫相关的内容证据 | 以娱乐生活为主，缺少瑜伽垫相关性 |
| Rob Raffety | 缺少瑜伽/健身相关信号，无法判断适配 | 娱乐吐槽内容为主，瑜伽只是梗，不适合推广 |
| ILONA SELKE | 无相关标签，缺少投放依据 | 偏身心灵内容，缺少瑜伽垫投放场景 |
| THANKS LEE | 无相关信号，适配度不足 | 高尔夫和钓鱼垂类，和瑜伽垫不相关 |
| Lorena Espinoza Design | 设计频道，缺少瑜伽/健身相关 | 设计手作频道，和瑜伽垫无关 |
| StrangeAI | 新闻/娱乐向，和产品推广不匹配 | 娱乐型AI短视频频道，缺少瑜伽垫相关或消费评测场景 |
| Zsrnb | 混合泛标签，缺少瑜伽垫相关证据 | 网站设计与建站内容，和运动器材推广无关 |
| Care New England | 医疗账号仅有泛健康，推广场景不合适 | 医院宣传账号，不适合做瑜伽垫消费推广 |
| Rider of The Storm | 无相关证据 | 摩托维修内容，与瑜伽垫人群无关 |
| NUBIAN GODDESS ENTERPRISES | 无相关证据 | 服饰周边与礼品向，和瑜伽垫购买场景不符 |
| OddlyPawfect | 疑似宠物号，和人用瑜伽垫不匹配 | 野生动物娱乐内容，与人用瑜伽垫受众不符 |
| Caroling Geary | 无相关证据 | 内容偏抽象艺术/故事，不适合做产品推广 |
| DaneeyLiving | 生活方式号证据不足，相关性弱 | 沙发产品频道，和瑜伽垫类目关联很弱 |
| EO Wonder Podcast | 播客向，缺少商品导购与瑜伽相关证据 | 播客叙事为主，缺少可转化的产品推广场景 |
| DIY Pinto | ASMR/清洁向格式，产品推广适配差 | 有测评/拆箱能力，但频道主格式是ASMR，近10条与瑜伽垫无关 |
| SunflowerScreenings | 影视娱乐内容，和产品推广场景明显不匹配 | 影视娱乐号，与瑜伽垫推广方向完全不符 |
| SwimOutletGear | 泳装/竞技游泳受众，和瑜伽垫场景偏离 | 泳装频道，和瑜伽垫的消费场景不相关 |

## nox@promotion-capacity-v1-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 2 | Foxy's Domestic Side | 0 | 仅DIY泛标签，和瑜伽垫关联弱 |
| 19 | Opera Bound® | 0 | 无标签无内容证据，无法判断为相关 |
| 20 | IWMF - International Waldenstrom Foundation | 0 | 癌症健康机构，不适合瑜伽垫推广 |
| 22 | Yoloha Yoga | 0 | 无可用标签与视频证据，相关性不足 |
| 23 | Rachel Kavela Yoga | 0 | 无可用标签与视频证据，相关性不足 |
| 24 | Healthy Vegan Living | 0 | 烹饪/素食频道，与瑜伽垫不相关 |
| 38 | WILKYS | 0 | 缺少与瑜伽垫相关的内容证据 |
| 42 | Rooted yoga & Flex Feet Flow | -15 | 汽车类标签占主导，与瑜伽垫受众明显冲突 |
| 44 | The Best ABC | 0 | 科技频道，和瑜伽垫受众不匹配 |
| 53 | Everyday Fitness Hacks | 0 | 无足够标签/视频证据，难判断投放适配 |
| 66 | Home Workout Lab | 0 | 仅有名称暗示，缺少可用证据 |
| 71 | Health Info Tips | 0 | 仅有健康泛标签，证据不足 |
| 76 | Angelmay Bisaya-American | 0 | 宠物美食账号，与瑜伽垫推广场景不匹配 |
| 77 | More Info | 0 | 无标签无视频，缺少任何可用相关性证据 |
| 83 | Trending Style List | 0 | 无相关内容证据 |
| 84 | Mad About Cooking At Home | 0 | 烹饪号，与瑜伽垫无关 |
| 85 | Odina H. Palmer | 0 | 无相关证据 |
| 88 | NEW YOGA CITY | -10 | 音乐娱乐号，和物理产品推广形式冲突 |
| 93 | Naomi The G | 0 | 无相关证据 |
| 99 | Caldera Films | 0 | 影视频道，与瑜伽垫推广无关 |
| 106 | JillyN | 0 | 时尚美妆向，和瑜伽垫匹配弱 |
| 108 | Harper Lewis | 0 | 无相关标签，缺少匹配证据 |
| 109 | SuperNovaa36 Gaming | -15 | 游戏娱乐为主，受众明显不匹配 |
| 110 | Spirited Snoopy | -15 | 宠物狗内容为主，受众不适合 |
| 112 | HITEC  LASER | 0 | 无可用相关信号 |
| 115 | Nullix | 0 | 无标签无视频，相关性不足 |
| 116 | Yellow Toon Tales | 0 | 动画故事向，和瑜伽垫无关 |
| 117 | Owl Speaks Less | -15 | 游戏娱乐为主，和瑜伽垫不符 |
| 118 | Laurent LIEGEOIS | -15 | 宠物/动物内容占主导，受众不匹配 |
| 121 | Mashrafis Mom | -10 | 婴儿辅食号，成人瑜伽垫受众偏离 |

## xtb@promotion-capacity-v1-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 6 | Daria Zlobinski | -10 | 摄影频道，近10条与瑜伽垫无关 |
| 10 | Yoga小鱼儿 | -8 | 娱乐抽奖型短视频，和瑜伽垫推广不匹配 |
| 11 | Rhen Espinosa | -4 | 泛健身号，近期内容又多为无关题材 |
| 15 | Susann Alicia | -23 | 主轴是动漫解说/故事娱乐，和瑜伽垫完全错位 |
| 16 | Vital Running | -4 | 虽有健身标签，但近期多为梗图/动物内容，偏离太大 |
| 24 | Fitness_creator | Puja Rani | -7 | 标签杂乱且近期大量订阅/口号内容，转化价值低 |
| 40 | Leo Bangladesh | -5 | 娱乐音乐向，近期内容与瑜伽垫推广几乎无关 |
| 46 | lux asmr 💌 | -5 | 命中标签但ASMR助眠向，和产品推广场景冲突 |
| 47 | DIY BY NIMMI | -5 | 命中标签但主体是地垫手工制作，和瑜伽垫推广不一致 |
| 48 | Sonali Gupta Creations | -5 | 命中标签但主体是地垫/手工垫内容，偏离目标产品 |
| 54 | Home Creativity | 5 | 主线是地垫/门垫手工，瑜伽垫标签明显像误标 |
| 56 | RATHORE SOLUTION | -5 | 内容几乎全是冥想/专注音乐，属于音频放松型，不适合实物推广 |
| 57 | Arushi arts | 5 | 地垫手工与旧纱丽改造为主，和瑜伽垫推广目标冲突 |
| 58 | Seekho Sab Kuchh (Vlog) | 10 | 旧衣改造和地垫手工占主导，非瑜伽或运动用品受众 |
| 60 | Rama Chauhan | 5 | 门垫和旧布改造内容为主，瑜伽垫标签不可信 |
| 63 | Suryansh ki family | 10 | 近期几乎都是旧衣做地垫，和瑜伽垫不相关 |
| 64 | Incredible things | 10 | 地垫手工与旧布再造为主，不是瑜伽垫推广场景 |
| 67 | IRONIC ESPORTS | 0 | 以音乐/时尚和引流文案为主，不是瑜伽或运动用品频道 |
| 68 | 🧿Meena.j. Gaikwad🧿 | 10 | 手工包袋制作为主，近期内容与瑜伽垫无关 |
| 69 | Namita's Creative | 11 | 以包袋缝制和旧衣改造为主，受众不匹配 |
| 80 | catty corner | -10 | 宠物/车内容为主，与瑜伽垫推广无关 |
| 82 | Mahee Creation Fashion world's | -10 | 旧衣改造与地垫手作，和瑜伽垫推广不匹配 |
| 90 | Miss kanika rajput77 | -10 | 短视频娱乐号，主题与瑜伽垫无关 |
| 95 | 🧿Attractive Corner🧿 | -10 | 旧衣改造/地垫手作，与瑜伽垫推广不匹配 |
| 101 | fauji wife Neelam | -10 | 手工收纳为主，和瑜伽垫推广几乎无关 |
| 105 | intro place | -10 | 批发杂货和饰品为主，与瑜伽垫不匹配 |
| 110 | Dan Li | -21 | 近期几乎都不是相关主题，且频道主业不符 |
| 115 | Kuch naya Kre | -10 | DIY杂内容为主，与瑜伽垫推广不匹配 |
| 116 | amelia_ydv | -10 | 手工编织频道，和瑜伽垫完全不相关 |
| 119 | Pnp paydan vlog | -10 | doormat 频道，产品类别与瑜伽垫不同 |

## Notes
- Page-level rates use `page_size` from each run metadata.
- Cause categories are heuristic clusters from `why_short`; review representative rows before making product decisions.
