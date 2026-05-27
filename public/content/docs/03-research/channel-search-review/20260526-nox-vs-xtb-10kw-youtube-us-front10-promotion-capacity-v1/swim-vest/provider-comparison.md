# Channel Search Provider Comparison

- keyword: swim vest
- platform: youtube
- country: US
- left: nox@promotion-capacity-v1 (tmp/channel-search-review/20260526-nox-vs-xtb-10kw-youtube-us-front10-promotion-capacity-v1/swim-vest/nox-youtube)
- right: xtb@promotion-capacity-v1 (tmp/channel-search-review/20260526-nox-vs-xtb-10kw-youtube-us-front10-promotion-capacity-v1/swim-vest/xtb-youtube)
- left_rule_version: promotion-capacity-v1
- right_rule_version: promotion-capacity-v1
- left_prompt_hash: b87da85cf79a
- right_prompt_hash: b87da85cf79a

## Run Overview
| run | provider | rule_version | total | fit | adjacent | badcase | badcase率 | <0 | 0-9 | 10-19 | 20+ |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| nox@promotion-capacity-v1 | nox | promotion-capacity-v1 | 71 | 1 | 37 | 33 | 46.5% | 8 | 61 | 2 | 0 |
| xtb@promotion-capacity-v1 | xtb | promotion-capacity-v1 | 78 | 8 | 46 | 24 | 30.8% | 42 | 26 | 9 | 1 |

## Page-Level Badcase Rate
| page | nox@promotion-capacity-v1_total | nox@promotion-capacity-v1_badcase | nox@promotion-capacity-v1_badcase率 | xtb@promotion-capacity-v1_total | xtb@promotion-capacity-v1_badcase | xtb@promotion-capacity-v1_badcase率 | badcase率差 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 50 | 24 | 48.0% | 50 | 15 | 30.0% | 18.0% |
| 2 | 21 | 9 | 42.9% | 28 | 9 | 32.1% | 10.7% |

## Badcase Overlap
| metric | count |
| --- | --- |
| shared_badcase | 15 |
| nox@promotion-capacity-v1_only_badcase | 18 |
| xtb@promotion-capacity-v1_only_badcase | 9 |

## Badcase Cause Summary
| provider | category | count |
| --- | --- | --- |
| nox@promotion-capacity-v1 | 证据缺失或信号不足 | 21 |
| nox@promotion-capacity-v1 | 宠物/动物受众冲突 | 7 |
| nox@promotion-capacity-v1 | 其他 | 2 |
| nox@promotion-capacity-v1 | 泛相关性偏离 | 1 |
| nox@promotion-capacity-v1 | 科技/电子垂类偏离 | 1 |
| nox@promotion-capacity-v1 | 娱乐/儿童/泛内容偏离 | 1 |
| xtb@promotion-capacity-v1 | 宠物/动物受众冲突 | 10 |
| xtb@promotion-capacity-v1 | 其他 | 6 |
| xtb@promotion-capacity-v1 | 娱乐/儿童/泛内容偏离 | 4 |
| xtb@promotion-capacity-v1 | 证据缺失或信号不足 | 3 |
| xtb@promotion-capacity-v1 | 泛相关性偏离 | 1 |

## Shared Badcases
| channel | nox@promotion-capacity-v1 | xtb@promotion-capacity-v1 |
| --- | --- | --- |
| Calikorean | 无标签、无视频证据，相关性不足 | 宠物狗内容，和人用 swim vest 推广完全不符 |
| Chicken Goodies | 名称偏禽类/食品方向，缺少相关证据 | 动物剧情/娱乐号，和 swim vest 促销不匹配 |
| BubbleGum | 娱乐向频道，缺少产品推广证据 | 有 swimming 相关词，但主体是娱乐/ASMR，格式不匹配 |
| Dog & Cat Supplies online store | 宠物用品店与人用游泳背心推广互斥 | 宠物用品店，目标是猫狗用品，与人用 swim vest 互斥 |
| Do Not Pet | 宠物狗垂类，与人用泳背心互斥 | 犬类内容占主导，和人用 swim vest 受众互斥 |
| Andrew Stock Media | 影视图片素材号，和产品推广无关 | 库存素材/人物镜头为主，明显不是产品推广频道 |
| OlapMahakan | 无标签无视频，缺少与泳衣背心的推广证据 | 近期是宠物救生衣/商品目录，面向宠物场景，与人用泳衣背心相斥 |
| VELEZ FAMILY CHANNEL | 无标签无视频，缺少与泳衣背心的推广证据 | 家庭/宠物日常频道，缺少商品测评或导购能力 |
| The Malamute Pack | 犬类宠物频道，与人用泳衣背心推广受众互斥 | 纯宠物马拉缪特 vlog，宠物人群与人用泳衣背心不兼容 |
| Meow Moments | 无标签无视频，缺少与泳衣背心的推广证据 | AI 猫家庭剧情号，叙事娱乐向，不适合做人用泳衣背心推广 |
| Sara Hughes | 无标签无视频，缺少与泳衣背心的推广证据 | 生活记录+狗狗内容，缺少水上用品/测评/购物导向 |
| WebEye News | 科技新闻向，和泳衣背心类目不相关 | 科技资讯号，近期话题与水上装备无关，缺少商品测评/购物语境 |
| Sweetie Pie Pets | 宠物犬频道，与人用 swim vest 受众互斥 | 纯犬类频道，宠物救生衣语境与人用泳衣背心互斥 |
| Birddok | 无标签无视频证据，相关性不足 | 近期出现狗用游泳背心，属于宠物场景，与人用泳背心不符 |
| Sai and Family | 短视频+ASMR偏娱乐，和泳衣推广格式明显不匹配 | ASMR/娱乐短视频号，和游泳背心推广格式强冲突 |

## nox@promotion-capacity-v1-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 1 | Mommy Churvs | -10 | 宠物/猫内容与人用游泳背心推广互斥 |
| 10 | N'Joy | 0 | 无标签、无视频证据，相关性不足 |
| 13 | vanguard k9 dog trainings | -15 | 宠物训犬频道，与人用swim vest人群冲突 |
| 14 | Sarah Burford | 0 | 无标签和视频证据，相关性不足 |
| 15 | ERICK and The Ourbacks | 0 | 无标签和视频证据，相关性不足 |
| 16 | DeTechTive "Max" | 0 | 无标签和视频证据，相关性不足 |
| 20 | Nyle Lynn | -5 | 宠物娱乐频道，宠物向与人用产品冲突 |
| 22 | Bradley David Good | 0 | 生活方式泛频道，缺少泳装/运动装备语境 |
| 25 | Tech Moments | 0 | 科普资讯号，缺少商品测评或购买语境 |
| 42 | Caitlin Best | 0 | 无标签无视频，缺少与泳衣背心的推广证据 |
| 46 | Thewellbeing4All | 0 | 无标签无视频，缺少与泳衣背心的推广证据 |
| 47 | Toytik Show | 0 | 家庭娱乐向，缺少商品评测或购买转化信号 |
| 54 | Mrs. Goalchaser | 0 | 美妆生活向，缺少水上运动或消费导购证据 |
| 61 | Mutre Cobynahe | 0 | 无标签无视频证据，与泳衣/救生背心推广关联不足 |
| 62 | Right Ideas | 0 | 无可用标签和标题信息，无法支持泳衣推广判断 |
| 64 | Juju Gurgel | 0 | 缺少任何与泳衣相关的内容或受众线索 |
| 65 | The Resto Maestro | 0 | 餐饮向频道，与泳衣推广场景不匹配 |
| 69 | Prep In China | 0 | 缺少标签与视频证据，暂不适合泳衣推广 |

## xtb@promotion-capacity-v1-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 2 | Big R Outdoors | -10 | 狩猎/钓鱼频道，缺少水上安全或装备推广场景 |
| 4 | TideWe | -10 | 以狩猎装备为主，近10条也都是狩猎/盲棚内容 |
| 6 | 5.11 | -10 | 战术健身号，近内容偏 weight vest，不是水上泳装/救生装备 |
| 15 | St | -10 | 泳池/水下场景内容，非商品推广型频道，不适合卖货 |
| 41 | The Traveling Shus | -10 | 迪士尼旅行/短视频号，近10条全是游园内容，和泳衣推广不相关 |
| 43 | AutismMom and Travel | -8 | 亲子自闭症内容为主，缺少商品评测和购买导向，泳衣关联弱 |
| 45 | The Carchedi Family | -8 | 家庭日常号，近10条几乎全是生活/节日内容，不适合泳衣推广 |
| 65 | American Academy of Pediatrics | -14 | 儿科健康资讯频道，非商品推广型，和泳背心促销契合度低 |
| 76 | 喜樂羊好朋友太陽姊姊 Making Little Disciples | -20 | 儿童故事/教育向，娱乐属性重，不适合 swim vest 推广 |

## Notes
- Page-level rates use `page_size` from each run metadata.
- Cause categories are heuristic clusters from `why_short`; review representative rows before making product decisions.
