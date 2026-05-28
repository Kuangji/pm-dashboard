# Channel Search Provider Comparison

- keyword: swim vest
- platform: instagram
- country: US
- left: nox@promotion-capacity-v1 (tmp/channel-search-review/20260527-nox-vs-xtb-10kw-instagram-us-front10-promotion-capacity-v1/swim-vest/nox-instagram)
- right: xtb@promotion-capacity-v1 (tmp/channel-search-review/20260527-nox-vs-xtb-10kw-instagram-us-front10-promotion-capacity-v1/swim-vest/xtb-instagram)
- left_rule_version: promotion-capacity-v1
- right_rule_version: promotion-capacity-v1
- left_prompt_hash: b87da85cf79a
- right_prompt_hash: b87da85cf79a

## Run Overview
| run | provider | rule_version | total | fit | adjacent | badcase | badcase率 | <0 | 0-9 | 10-19 | 20+ |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| nox@promotion-capacity-v1 | nox | promotion-capacity-v1 | 500 | 8 | 187 | 305 | 61.0% | 82 | 411 | 6 | 1 |
| xtb@promotion-capacity-v1 | xtb | promotion-capacity-v1 | 500 | 18 | 206 | 276 | 55.2% | 94 | 383 | 23 | 0 |

## Page-Level Badcase Rate
| page | nox@promotion-capacity-v1_total | nox@promotion-capacity-v1_badcase | nox@promotion-capacity-v1_badcase率 | xtb@promotion-capacity-v1_total | xtb@promotion-capacity-v1_badcase | xtb@promotion-capacity-v1_badcase率 | badcase率差 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 50 | 28 | 56.0% | 50 | 22 | 44.0% | 12.0% |
| 2 | 50 | 35 | 70.0% | 50 | 25 | 50.0% | 20.0% |
| 3 | 50 | 23 | 46.0% | 50 | 22 | 44.0% | 2.0% |
| 4 | 50 | 32 | 64.0% | 50 | 30 | 60.0% | 4.0% |
| 5 | 50 | 26 | 52.0% | 50 | 30 | 60.0% | -8.0% |
| 6 | 50 | 35 | 70.0% | 50 | 34 | 68.0% | 2.0% |
| 7 | 50 | 27 | 54.0% | 50 | 29 | 58.0% | -4.0% |
| 8 | 50 | 34 | 68.0% | 50 | 31 | 62.0% | 6.0% |
| 9 | 50 | 34 | 68.0% | 50 | 26 | 52.0% | 16.0% |
| 10 | 50 | 31 | 62.0% | 50 | 27 | 54.0% | 8.0% |

## Badcase Overlap
| metric | count |
| --- | --- |
| shared_badcase | 224 |
| nox@promotion-capacity-v1_only_badcase | 81 |
| xtb@promotion-capacity-v1_only_badcase | 50 |

## Badcase Cause Summary
| provider | category | count |
| --- | --- | --- |
| nox@promotion-capacity-v1 | 证据缺失或信号不足 | 116 |
| nox@promotion-capacity-v1 | 宠物/动物受众冲突 | 73 |
| nox@promotion-capacity-v1 | 其他 | 71 |
| nox@promotion-capacity-v1 | 泛相关性偏离 | 28 |
| nox@promotion-capacity-v1 | 娱乐/儿童/泛内容偏离 | 17 |
| xtb@promotion-capacity-v1 | 证据缺失或信号不足 | 86 |
| xtb@promotion-capacity-v1 | 宠物/动物受众冲突 | 80 |
| xtb@promotion-capacity-v1 | 其他 | 75 |
| xtb@promotion-capacity-v1 | 泛相关性偏离 | 27 |
| xtb@promotion-capacity-v1 | 娱乐/儿童/泛内容偏离 | 8 |

## Shared Badcases
| channel | nox@promotion-capacity-v1 | xtb@promotion-capacity-v1 |
| --- | --- | --- |
| Frenchie Complex™ | 宠物狗频道，与人用泳背心互斥 | 宠物狗频道，属于明确错位受众 |
| 🧡 Dante | 无标签无内容，缺乏相关证据 | 无标签无内容线索，无法支持推广 |
| Fido Pet Products, LLC | 宠物产品账号，不适合人用泳背心 | 宠物品牌，不适合人用产品推广 |
| NutritionFacts.org | 健康科普向，但非泳具推广场景 | 健康科普频道，与泳背心推广场景不匹配 |
| Goldfish - Fort Washington | 仅凭名称无法确认相关，证据不足 | 无标签无内容线索，相关性不足 |
| Terrain D.O.G. | 狗类宠物频道，与人用泳背心互斥 | 宠物向冒险装备频道，不适合人用产品 |
| Lil Rascals Dog Rescue | 宠物救助频道，与人用泳背心互斥 | 宠物救援频道，受众明显错位 |
| The LV Project | 无标签无内容，缺少相关证据 | 标签过少，无法判断为泳具相关频道 |
| Arnel | 无标签无内容，缺少相关证据 | 标签过少，无法判断为泳具相关频道 |
| Dior & Obi-Wan | 狗狗宠物频道，与人用泳背心互斥 | 宠物狗账号，和人用泳具目标不符 |
| RACHEL KAMINEK | 无标签无内容，缺少相关证据 | 无标签信息，无法判断相关性 |
| nathanecorbett | 娱乐影视向，非产品推广场景 | 仅有 wire 标签，和泳具无关 |
| Libby Silvia | 艺术设计向，和泳具推广关联弱 | 艺术家居号，与泳具无关 |
| Colleen Ann | MATRIARCH Midwife | 娱乐/故事向内容，和人用游泳背心推广不匹配 | 叙事/女性成长向，与泳具无关 |
| THE WARRIOR CALLING ELITE PERFORMANCE COACHING | 军事训练向，缺少游泳或消费品推广语境 | 军事体能号，和泳具推广场景不匹配 |
| Land of Paws • KC Pet Boutique 🐾 | 宠物受众，不适合人用游泳背心 | 宠物精品号，和人用泳具不符 |
| Island Life Animal Hospital | 动物医院账号，和人用游泳背心无关 | 动物医院号，非人用泳具推广场景 |
| Julie Hafen | Aviatrix | 个人航空账号，缺少相关消费场景 | 无相关标签，缺少可推广泳具的人群或场景 |
| Aaron Logan | 无标签，相关性不足 | 旅行景点号，缺少产品导购或水上装备内容 |
| Sandhya Murthy | 无标签，相关性不足 | 无标签无内容信号，无法判断为相关 |
| K9 Koncepts Boarding | 犬类训练账号，和人用产品受众不符 | 狗训犬号，宠物护具与人用 swim vest 受众相反 |
| Jess Rose McDowell | Run Club Lead & Coach | 跑团教练号，缺少游泳或装备语境 | 无相关标签，缺少可用的推广场景 |
| Homestead Designer Doodles | 宠物受众，和人用游泳背心不匹配 | 宠物受众与人用泳具互斥 |
| Alec Rovniak | 无标签，相关性不足 | 无标签无内容信号，相关性不足 |
| Hanny Thomas and Diesel 🇺🇸 | 宠物犬内容，与人用swim vest人群互斥 | 宠物狗向，和人用泳具目标完全不一致 |
| Humane Tomorrow | 无相关标签，内容偏动物保护主题 | 动物救助号，和人用泳具推广不匹配 |
| Hall County Fire Rescue | 消防救援账号，缺少游泳装备推广证据 | 消防救援号，非消费品推广场景 |
| Stevante Clark | 人物向账号，与产品推广无关 | 社会议题/故事向，不适合泳具推广 |
| Goldfish - Middletown | 无标签且看不出与产品相关的主题 | 无标签无内容信号，相关性不足 |
| Dr. Alyssa Lee | 犬类训练号，属于宠物互斥人群 | 宠物狗训练号，和人用泳具目标相反 |

## nox@promotion-capacity-v1-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 31 | San Joaquin County Sheriff’s Office | 0 | 警务社区号，和该类人用产品关联弱 |
| 33 | Archie, Rona, Joy & Quattro 🐾🇺🇸 | 0 | 宠物账号，和人用游泳背心不匹配 |
| 39 | Cassie Hepler | 0 | 生活号，缺少明确消费场景 |
| 43 | Autism Society of Florida | 0 | 公益教育号，和游泳背心推广关联弱 |
| 56 | Bradley Easter | 0 | 穿搭发型内容，和swim vest关联很弱 |
| 72 | Ms. Steele | 0 | 生活杂项账号，缺少泳具相关信号 |
| 91 | WesterlyUSA | Dena DePompa | 0 | 时尚包袋向，和 swim vest 关联弱 |
| 98 | Taylor • 6th Grade Teacher | 0 | 教育日常向，和 swim vest 关联不强 |
| 118 | Brooke 🧿 | 0 | 无标签，缺少判断依据 |
| 143 | Rockwood Preparatory Academy | 0 | 无可用标签和视频证据，相关性不足 |
| 148 | Lo Bou | 0 | 包袋时尚账号，和泳具推广关联较弱 |
| 198 | Visit Central Washington | 0 | 旅游城市账号，和泳背心关联很弱 |
| 213 | El Diablo | 0 | 偏巡演/旅行叙事，产品相关性弱 |
| 257 | Kelsey De Santis | 0 | 健身/BJJ 受众与水上安全装备关联弱 |
| 259 | Woman of Faith✨ | 0 | 房产/信仰内容与 swim vest 购买场景不相关 |
| 264 | Kathryn Royal | 0 | 时尚/婚礼定位，与 swim vest 需求不符 |
| 275 | Gina Aliotti | 0 | 娱乐化内容为主，缺少水上用品推广场景 |
| 280 | Angela | 0 | 摄影旅行向，与泳背心相关度弱 |
| 300 | Heav | 0 | 账号信息不足，相关性不足 |
| 306 | Jax Malcolm | -5 | 娱乐/梗内容为主，商品推广适配度低 |
| 321 | Naisha | 0 | 母婴标签太弱，缺少水上用品语境 |
| 355 | Dr. Janet Yiu, Pelvic Floor Physical Therapist | 0 | 孕产健康向，和泳背心推广关联很弱 |
| 360 | Dr. Kaytie Milliken | 0 | 只有 kids/home，相关性太弱 |
| 361 | Kaylee’s Kards | 0 | 手作艺术内容，不适合泳背心推广 |
| 362 | GlamNaturalLife | 0 | 无标签无内容信号，无法判断相关性 |
| 366 | rebekah peschel farley | 0 | 母婴/音乐混合号，泳背心关联不足 |
| 368 | Ku life | 0 | 家居装饰向，和泳背心推广不匹配 |
| 372 | deyj | 0 | 无标签无内容信号，无法判断相关性 |
| 373 | Belle Starr Antiques | 0 | 古董家居向，和泳背心推广不相关 |
| 382 | Sailor Mercury | 0 | 无标签无内容信号 |

## xtb@promotion-capacity-v1-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 6 | UKUSCAdoggie | -15 | 宠物用品频道，和人用 swim vest 不匹配 |
| 10 | Victoria's Secret Canada 🇨🇦 | -8 | 缺少频道标签与相关内容，难判断相关性 |
| 29 | 𝗡𝗶𝗰𝗼𝗹𝗲 𝗚𝗼𝘁𝘁𝗲𝘀𝗺𝗮𝗻𝗻 | 0 | 自闭症家庭内容，和泳背心推广场景关联弱 |
| 32 | Afros in Nature | 0 | 标签过少，无法判断为泳具相关频道 |
| 38 | Kid To Kid Jacksonville | 0 | 缺少标签信息，无法建立与泳背心的相关性 |
| 42 | LISA ARLENE | -10 | 犬只训练频道，受众与人用泳背心不符 |
| 44 | Dr. Carrie Pagliano, PT | 0 | 康复理疗频道，与泳背心投放场景不匹配 |
| 45 | Bombora | 0 | 无标签无内容证据，无法判断为相关频道 |
| 48 | Laura DeMaio Roy - Service Dog Trainer | -15 | 服务犬训练频道，和人用泳背心受众完全不符 |
| 49 | Flirty The Mini Service Horse | -15 | 动物/服务马内容，非人用泳背心受众 |
| 51 | simply petastic | 0 | 缺少标签与内容证据 |
| 52 | CosmikCart Shopper | 0 | 缺少标签与内容证据 |
| 58 | Parasail Siesta | 0 | 缺少标签与内容证据 |
| 92 | WOBBLY HANNAH | -5 | 犬类日常号，宠物受众不适合人用泳背心 |
| 96 | Ev CurlGurl | 0 | 无标签无内容，无法判断相关性 |
| 101 | Darren & Phillip | -15 | 宠物狗内容，与人用泳背心推广目标互斥 |
| 109 | cashmeresworld | -15 | 纯宠物狗账号，与人用泳背心受众互斥 |
| 112 | SWIMS - Loafers + Sneakers | -5 | 鞋服时尚号，与泳背心推广场景不匹配 |
| 113 | Humane Society of Western MT | -15 | 宠物保护组织账号，与人用泳背心受众不符 |
| 116 | Hester is Not a Cat | -15 | 纯猫宠物内容，与人用泳背心互斥 |
| 118 | Dadwear | -5 | 男装时尚号，缺少泳背心相关受众和场景 |
| 126 | Elayne Loy | 0 | 玩具收藏号，与泳具推广无关 |
| 129 | Sweetlabsofmine | -15 | 宠物狗账号，目标人群不符 |
| 130 | cltbucketlist | 0 | 美食本地号，与泳具无关 |
| 131 | Unlocked Closet | 0 | 公益/领养号，不适合泳具推广 |
| 133 | Aqua-Leisure | 1 | 仅有 summer 线索，证据太弱 |
| 134 | Spoiled Pets Haven | -15 | 宠物用品号，与人用泳具受众冲突 |
| 135 | Lena Boston | 0 | 节日手作号，与泳具不相关 |
| 136 | Flounder Cat | Talking Fish | -15 | 宠物娱乐号，不适合人用泳具 |
| 139 | Marissa | 0 | 手作缝纫号，与泳具推广无关 |

## Notes
- Page-level rates use `page_size` from each run metadata.
- Cause categories are heuristic clusters from `why_short`; review representative rows before making product decisions.
