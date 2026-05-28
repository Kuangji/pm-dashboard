# Channel Search Provider Comparison

- keyword: vacuum cleaner
- platform: instagram
- country: US
- left: nox@promotion-capacity-v1 (tmp/channel-search-review/20260527-nox-vs-xtb-10kw-instagram-us-front10-promotion-capacity-v1/vacuum-cleaner/nox-instagram)
- right: xtb@promotion-capacity-v1 (tmp/channel-search-review/20260527-nox-vs-xtb-10kw-instagram-us-front10-promotion-capacity-v1/vacuum-cleaner/xtb-instagram)
- left_rule_version: promotion-capacity-v1
- right_rule_version: promotion-capacity-v1
- left_prompt_hash: b87da85cf79a
- right_prompt_hash: b87da85cf79a

## Run Overview
| run | provider | rule_version | total | fit | adjacent | badcase | badcase率 | <0 | 0-9 | 10-19 | 20+ |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| nox@promotion-capacity-v1 | nox | promotion-capacity-v1 | 500 | 110 | 232 | 158 | 31.6% | 24 | 344 | 44 | 88 |
| xtb@promotion-capacity-v1 | xtb | promotion-capacity-v1 | 500 | 100 | 275 | 125 | 25.0% | 29 | 337 | 91 | 43 |

## Page-Level Badcase Rate
| page | nox@promotion-capacity-v1_total | nox@promotion-capacity-v1_badcase | nox@promotion-capacity-v1_badcase率 | xtb@promotion-capacity-v1_total | xtb@promotion-capacity-v1_badcase | xtb@promotion-capacity-v1_badcase率 | badcase率差 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 50 | 16 | 32.0% | 50 | 14 | 28.0% | 4.0% |
| 2 | 50 | 13 | 26.0% | 50 | 8 | 16.0% | 10.0% |
| 3 | 50 | 17 | 34.0% | 50 | 5 | 10.0% | 24.0% |
| 4 | 50 | 9 | 18.0% | 50 | 12 | 24.0% | -6.0% |
| 5 | 50 | 15 | 30.0% | 50 | 15 | 30.0% | 0.0% |
| 6 | 50 | 14 | 28.0% | 50 | 16 | 32.0% | -4.0% |
| 7 | 50 | 17 | 34.0% | 50 | 13 | 26.0% | 8.0% |
| 8 | 50 | 21 | 42.0% | 50 | 9 | 18.0% | 24.0% |
| 9 | 50 | 19 | 38.0% | 50 | 18 | 36.0% | 2.0% |
| 10 | 50 | 17 | 34.0% | 50 | 15 | 30.0% | 4.0% |

## Badcase Overlap
| metric | count |
| --- | --- |
| shared_badcase | 68 |
| nox@promotion-capacity-v1_only_badcase | 90 |
| xtb@promotion-capacity-v1_only_badcase | 57 |

## Badcase Cause Summary
| provider | category | count |
| --- | --- | --- |
| nox@promotion-capacity-v1 | 其他 | 55 |
| nox@promotion-capacity-v1 | 证据缺失或信号不足 | 44 |
| nox@promotion-capacity-v1 | 泛相关性偏离 | 37 |
| nox@promotion-capacity-v1 | 宠物/动物受众冲突 | 11 |
| nox@promotion-capacity-v1 | 娱乐/儿童/泛内容偏离 | 10 |
| nox@promotion-capacity-v1 | 科技/电子垂类偏离 | 1 |
| xtb@promotion-capacity-v1 | 其他 | 41 |
| xtb@promotion-capacity-v1 | 证据缺失或信号不足 | 35 |
| xtb@promotion-capacity-v1 | 泛相关性偏离 | 25 |
| xtb@promotion-capacity-v1 | 宠物/动物受众冲突 | 14 |
| xtb@promotion-capacity-v1 | 娱乐/儿童/泛内容偏离 | 8 |
| xtb@promotion-capacity-v1 | 科技/电子垂类偏离 | 2 |

## Shared Badcases
| channel | nox@promotion-capacity-v1 | xtb@promotion-capacity-v1 |
| --- | --- | --- |
| Chris Kanan | 园艺割草域与吸尘器用途不符 | 主内容是 lawn care，vacuum 命中也不适合推广 |
| Trask Performance | 机车改装域，吸尘器标签明显不匹配 | 摩托性能账号，和 vacuum cleaner 清洁家电不相关 |
| Brenda | Lompoc , Ca | 美甲美妆为主，和吸尘器品类不匹配 | 美甲美妆账号，和 vacuum cleaner 不匹配 |
| Kate S. | ASMR/食物内容为主，物理产品推广格式不匹配 | 清洁题材但ASMR主导，偏展示不利于带货 |
| Polished Pinkies | Nail Supply & Education 💅🏼 | 美甲供货教育账号，和吸尘器品类不匹配 | 美甲教育账号，和 vacuum cleaner 完全不相关 |
| Oladele Tosin Mary | 娱乐向频道，吸尘器标签不改变整体不适配 | 娱乐/活动向账号，vacuum cleaner 词面命中也不适合推广 |
| Anastasia Markova | 时尚日常号，缺少清洁家电投放语境 | ASMR清洁向，偏体验内容，不适合家电推广 |
| Bobby Pierce | 旅行/神秘内容，和吸尘器无关 | 赛车/车务内容，和吸尘器推广不匹配 |
| Ethan Hartzell | 无有效标签，无法判断相关性 | 无有效标签和内容，无法判断相关性 |
| AUXITO | Auto LED Lighting🚗 | 汽车灯具垂类，与吸尘器不相关 | 汽车灯具号，和吸尘器投放场景不一致 |
| Floppycats™ | Cat Content | 猫内容垂类，缺少清洁家电语境 | 猫内容为主，受众偏宠物圈，不适合通用吸尘器 |
| Stauffer Garage | 汽车清洁加ASMR，格式不适合吸尘器 | 汽车清洁但ASMR偏展示，非吸尘器带货型 |
| Edyta♡ Cleaning & Home Finds | 清洁+ASMR混合，促销格式偏不匹配 | 清洁ASMR叠加，推广家电的格式冲突大 |
| April Moore | ASMR清洁号，偏内容体验而非带货 | 烹饪家庭内容，缺少清洁电器相关信号 |
| 𝗠𝗮𝗿𝘆 | 𝗰𝗹𝗲𝗮𝗻𝘄𝗶𝘁𝗵𝗺𝗮𝗴 | 清洁ASMR频道，缺少吸尘器评测/购买/使用内容，推广适配性差 | 清洁ASMR占主导，格式不适合家电推广 |
| spellboundsky | 水晶占卜店铺号，与吸尘器投放无关 | 水晶占星娱乐号，和吸尘器无关 |
| A Race Against Blindness | Nonprofit | 车辆冒险类内容与吸尘器推广无关 | 公益旅行内容，与吸尘器不相关 |
| mike turner | 无有效标签与内容证据 | 时尚摄影类，和吸尘器推广几乎无关 |
| Rj Sottile | 二手跑车销售与吸尘器推广无关 | 跑车售卖号，不适合清洁电器投放 |
| Gone to the Snow Dogs | 宠物狗内容，与人用吸尘器推广目标冲突 | 宠物频道为主，缺少吸尘器推广场景 |
| Shant | 缺少有效标签和视频证据 | 赛车改装频道，和吸尘器推广场景无关 |
| Angela Brown | 缺少有效标签和视频证据 | 无标签，无法判断为相关推广位 |
| goodwaytechnologies | 缺少内容证据，相关性不足 | 无有效标签，缺少家电推广证据 |
| Isaac Rodriguez | 无标签无视频，缺少判断依据 | 无有效标签和内容，无法判断相关性 |
| Chemist Fragrance | 电子数码账号，和清洁器无关 | 香水/手机号，和 vacuum 主题不匹配 |
| Bear Brothers Cleaning | 无标签无视频，相关性证据不足 | 无标签无内容证据，难判断为相关频道 |
| Allergy Affiliates | 无相关标签与内容 | 无有效标签和内容，无法判断相关性 |
| M I K I T A  &  D A H L I A | 宠物猫内容，和清洁器推广无直接对应 | 宠物内容为主，缺少清洁家电推广信号 |
| Flagship Carwash | 车洗服务号，场景偏汽车清洁，不适合家用吸尘器 | 车洗业务号，不适合家用吸尘器推广 |
| vincent j musi | 宠物摄影号，受众与家用吸尘器推广不匹配 | 宠物摄影号，目标受众不匹配 |

## nox@promotion-capacity-v1-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 1 | Nisa Mutlu | 0 | 无品类或带货证据，相关性低 |
| 2 | Esila’s World’s | 0 | 无品类或带货证据，相关性低 |
| 3 | Ash | 0 | 无品类或带货证据，相关性低 |
| 6 | LifewithfairyUsa | 0 | 无标签无内容证据，相关性不足 |
| 8 | Burcu Alayoglu | 0 | 无品类证据，难判断为可推广账号 |
| 12 | Natalya | 0 | 无品类证据，相关性低 |
| 17 | Nidhi Chauhan | 0 | 无品类证据，相关性低 |
| 21 | veoko | 0 | 仅泛生活标签，缺乏吸尘器证据 |
| 29 | Duygu Okus | 5 | 时尚账号为主，吸尘器词疑似蹭标，不适合推广 |
| 44 | Didem Guneren 🧿 | -12 | 美食频道，和吸尘器推广目标明显不相关 |
| 50 | Debora Oliver Benites | -8 | 时尚/Shein为主，吸尘器词疑似无关标签 |
| 51 | Seda Fidanci | Lifestyle & Content Creator | 0 | 生活号且以宝宝/社交标签为主，和吸尘器推广无关 |
| 53 | Binal Shah ✨ | 0 | 时尚旅行号，和吸尘器品类无关 |
| 67 | Aditi Agarwal | 1 | 美妆号仅有清洁字样，和吸尘器不匹配 |
| 73 | Serap Kaya | 0 | 城市生活号缺少与吸尘器相关的内容语境 |
| 80 | Funda  Lyon Yuksek🤍 | 0 | 时尚摄影号，和吸尘器投放几乎无关 |
| 84 | Bárbara Braga | 0 | 亲子时尚号，与吸尘器不相关 |
| 89 | 𝗖𝗮𝗿𝗹𝗮 𝗖𝗮𝗻𝗼♥︎ | Decor Home | Humor | 0 | 美食烹饪号，与吸尘器推广无关 |
| 92 | Karen Ray / Home Design & Decor | 0 | 纯家居装饰向，和吸尘器需求弱 |
| 98 | Christina Heinritz | 0 | 农场生活内容，与吸尘器投放无关 |
| 101 | Luiany Chipman | 0 | 服饰美妆垂类，和吸尘器无关 |
| 110 | Rowan Appliance | 0 | 无有效标签，相关证据不足 |
| 112 | Michael Rubino | 0 | 家居健康泛内容，缺少清洁产品信号 |
| 117 | Yonca Gungordu | 0 | 无标签与内容信号，无法判断相关性 |
| 118 | Britt | 0 | 无标签与内容信号，无法判断相关性 |
| 121 | MOVA USA | 0 | 无有效标签，相关证据不足 |
| 138 | Ayse Izol | 0 | 纯泛流量标签，和吸尘器无关 |
| 141 | 𝐴𝑘𝑠𝑎𝑛𝑎 | 0 | 泛娱乐/合作号，与吸尘器无关 |
| 145 | Kerra Ezgi | 0 | 摄影旅行号，与吸尘器投放无关 |
| 150 | Prolux | 0 | 无标签无内容信号，无法判断相关性 |

## xtb@promotion-capacity-v1-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 5 | Charlie Brown | -15 | 纯狗狗内容，与家用吸尘器推广场景不匹配。 |
| 9 | ConvenientFinds | 0 | 无标签、无相关内容信号。 |
| 21 | Golden Boys & Baby Sis | -15 | 宠物狗内容为主，缺少家清产品场景。 |
| 22 | Raquel cañizares | 0 | 食品/家庭泛内容，与吸尘器推广弱相关。 |
| 23 | Luca Andrisani | 0 | 家庭/旅行叙事为主，和吸尘器无直接关联。 |
| 28 | RACHEL SAMFORD | -11 | 清洁ASMR为主，偏感官内容，不适合吸尘器种草 |
| 30 | Sapphire (Sapphie) | 0 | 纯宠物搞笑号，和家电推广场景偏离 |
| 31 | Leo the Golden Retriever | 0 | 宠物内容为主，缺少家居清洁/测评信号 |
| 34 | Jax The Black Labrador Retriever | 0 | 宠物娱乐号，缺少清洁家电相关内容 |
| 38 | M O S T L Y ☁️ | 0 | 宠物搞笑娱乐号，缺少产品推广能力 |
| 42 | jlmelgg | 0 | 无可用标签，无法判断相关性 |
| 46 | Judah Shaw | 0 | 娱乐/关系向内容，和吸尘器推广无关 |
| 49 | Lovely_noelyyy | 0 | 无标签，无法建立相关性 |
| 55 | Karen Cress | 0 | 无有效标签，无法判断相关性 |
| 56 | nadia | -12 | ASMR无声格式，和真机推广明显不符 |
| 90 | Cat Features 👑 Pawsh Cat Club 🐈‍⬛ | -15 | 猫内容账号，和 vacuum cleaner 推广场景不符 |
| 145 | Michelle Cruz | Lifestyle | 0 | 时尚穿搭号，与吸尘器主题不匹配 |
| 172 | J Ferrell Custom Trucks LLC | 0 | 重卡改装号，和吸尘器推广关联弱 |
| 178 | boram | 0 | 母婴健康为主，和吸尘器推广不匹配 |
| 204 | Home Goodiys | 1 | 手作折扣号，和 vacuum 推广关联很弱 |
| 215 | Uproot Clean | -10 | ASMR 清洁向，偏氛围不适合推 vacuum |
| 225 | David Dilorenzo | 0 | 美甲内容，与 vacuum 推广无关 |
| 230 | BARGAIN OUTLET & MORE | 0 | 标签缺失，无法判断与吸尘器的明确相关性 |
| 257 | CAM | 0 | 美妆穿搭为主，与吸尘器推广不匹配 |
| 261 | Kristen Nowak 👸🏼🐶🐶|| Amazon & CLE | 0 | 时尚穿搭/亚马逊号，家电相关性弱 |
| 263 | Luke | 0 | 木工工具号，和吸尘器品类偏离 |
| 265 | NAIL ART HOUSE STORE® | 0 | 美甲供应链频道，受众与吸尘器不符 |
| 269 | Julia Greene | 0 | 纯家居装饰风格，缺少清洁家电内容 |
| 272 | Danielle  Taylor | 0 | 母婴美妆为主，与吸尘器推广不匹配 |
| 277 | Oz Robotics | 0 | 无标签与内容证据，无法判断吸尘器相关性 |

## Notes
- Page-level rates use `page_size` from each run metadata.
- Cause categories are heuristic clusters from `why_short`; review representative rows before making product decisions.
