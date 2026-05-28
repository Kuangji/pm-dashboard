# Channel Search Provider Comparison

- keyword: coffee machine
- platform: tiktok
- country: US
- left: nox@promotion-capacity-v1 (tmp/channel-search-review/20260527-nox-vs-xtb-10kw-tiktok-us-front10-promotion-capacity-v1/coffee-machine/nox-tiktok)
- right: xtb@promotion-capacity-v1 (tmp/channel-search-review/20260527-nox-vs-xtb-10kw-tiktok-us-front10-promotion-capacity-v1/coffee-machine/xtb-tiktok)
- left_rule_version: promotion-capacity-v1
- right_rule_version: promotion-capacity-v1
- left_prompt_hash: b87da85cf79a
- right_prompt_hash: b87da85cf79a

## Run Overview
| run | provider | rule_version | total | fit | adjacent | badcase | badcase率 | <0 | 0-9 | 10-19 | 20+ |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| nox@promotion-capacity-v1 | nox | promotion-capacity-v1 | 500 | 67 | 210 | 223 | 44.6% | 43 | 369 | 41 | 47 |
| xtb@promotion-capacity-v1 | xtb | promotion-capacity-v1 | 500 | 180 | 205 | 115 | 23.0% | 201 | 134 | 90 | 75 |

## Page-Level Badcase Rate
| page | nox@promotion-capacity-v1_total | nox@promotion-capacity-v1_badcase | nox@promotion-capacity-v1_badcase率 | xtb@promotion-capacity-v1_total | xtb@promotion-capacity-v1_badcase | xtb@promotion-capacity-v1_badcase率 | badcase率差 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 50 | 14 | 28.0% | 50 | 11 | 22.0% | 6.0% |
| 2 | 50 | 16 | 32.0% | 50 | 7 | 14.0% | 18.0% |
| 3 | 50 | 20 | 40.0% | 50 | 9 | 18.0% | 22.0% |
| 4 | 50 | 25 | 50.0% | 50 | 6 | 12.0% | 38.0% |
| 5 | 50 | 29 | 58.0% | 50 | 9 | 18.0% | 40.0% |
| 6 | 50 | 24 | 48.0% | 50 | 12 | 24.0% | 24.0% |
| 7 | 50 | 27 | 54.0% | 50 | 13 | 26.0% | 28.0% |
| 8 | 50 | 19 | 38.0% | 50 | 15 | 30.0% | 8.0% |
| 9 | 50 | 31 | 62.0% | 50 | 14 | 28.0% | 34.0% |
| 10 | 50 | 18 | 36.0% | 50 | 19 | 38.0% | -2.0% |

## Badcase Overlap
| metric | count |
| --- | --- |
| shared_badcase | 27 |
| nox@promotion-capacity-v1_only_badcase | 196 |
| xtb@promotion-capacity-v1_only_badcase | 87 |

## Badcase Cause Summary
| provider | category | count |
| --- | --- | --- |
| nox@promotion-capacity-v1 | 其他 | 82 |
| nox@promotion-capacity-v1 | 证据缺失或信号不足 | 68 |
| nox@promotion-capacity-v1 | 泛相关性偏离 | 42 |
| nox@promotion-capacity-v1 | 娱乐/儿童/泛内容偏离 | 22 |
| nox@promotion-capacity-v1 | 宠物/动物受众冲突 | 8 |
| nox@promotion-capacity-v1 | 科技/电子垂类偏离 | 1 |
| xtb@promotion-capacity-v1 | 其他 | 61 |
| xtb@promotion-capacity-v1 | 泛相关性偏离 | 22 |
| xtb@promotion-capacity-v1 | 证据缺失或信号不足 | 15 |
| xtb@promotion-capacity-v1 | 娱乐/儿童/泛内容偏离 | 12 |
| xtb@promotion-capacity-v1 | 宠物/动物受众冲突 | 5 |

## Shared Badcases
| channel | nox@promotion-capacity-v1 | xtb@promotion-capacity-v1 |
| --- | --- | --- |
| Noah Stern | ASMR格式冲突，虽有咖啡词但不适合卖咖啡机 | ASMR格式与咖啡机推广不匹配，缺少评测导购 |
| Vicky_RealFactory | 缺少咖啡机相关证据，无法判断为可投放频道 | 服装工厂为主，咖啡机只是标签，受众与场景错位 |
| Gab 🧿 | Intuitive Lifestyle | 有咖啡机词，但ASMR格式明显削弱推广适配 | 以咖啡ASMR/生活内容为主，缺少咖啡机评测购买信号，促销匹配差 |
| Nat | 宠物号，与人用咖啡机目标人群不匹配 | 旅行生活号，与咖啡机促销场景不符 |
| Theresa Krug | 美妆护肤号，与咖啡机无关 | 美妆开箱号，与咖啡机品类不相关 |
| Sofie Marie | ASMR格式与实体家电推广明显不匹配 | ASMR 为主，属于强格式错配，不适合咖啡机推广 |
| coffeebae97 | ASMR/娱乐格式，和咖啡机推广不匹配 | ASMR娱乐格式，咖啡机推广不匹配 |
| Ryan Gawlik | 娱乐搞笑为主，只有泛食物弱相关，咖啡机推广不适配 | 纯娱乐梗号，和咖啡机购买场景无关 |
| Jonathan Ferrer | 汽车垂类，与咖啡机目标客群不匹配 | 美妆购物号，咖啡机转化链路不成立 |
| Life with Lubna | 母婴向账号，咖啡机相关度很低 | 母婴日常号，和咖啡机品类缺少关联 |
| JACEALYN CLAUNCH | 泛生活 vlog，缺少家电推广语境 | 母婴和睡眠内容占主导，缺少咖啡机受众 |
| beccabrews | ASMR 形式与咖啡机推广明显冲突 | 咖啡ASMR为主，缺少咖啡机评测/购买指导 |
| francescagizzio | 娱乐舞蹈号，格式不适合投放 | 舞蹈娱乐和美妆为主，咖啡机相关性弱 |
| Heather✨ATL | 无标签无内容线索，无法判断为相关 | 无咖啡机或厨房器具相关，近10条也都不匹配 |
| yuni.beauty | 健身频道，与咖啡机购买场景不符 | 美妆运动号，咖啡机相关信号几乎没有 |
| Vencedor 707 | 标签过于泛化，缺少咖啡机相关信息 | 汽车零件与工具号，和咖啡机投放无关 |
| LYDIA SCOTT | 健身类频道，和咖啡机相关性低 | 健身饮食号，不适合咖啡机推广 |
| Travelismytherapy - Zizi - | 旅行/美妆/时尚号，和咖啡机无关 | 旅游号带一点测评能力，但咖啡机定位弱 |
| gabrielwhittakerr | 娱乐剧情/悬疑风，属于咖啡机投放错配 | ASMR娱乐号，和咖啡机带货场景强冲突 |
| Jessica Hauze | 无咖啡机相关标签或内容信号 | 居家穿搭号，和咖啡机推广关联很弱 |
| rachelpalajac | 无咖啡机相关标签或内容信号 | 养生减重号，和咖啡机投放无关 |
| Burk’s Garage | 汽车车库向，和咖啡机垂类不相关 | 汽车工具号，和咖啡机购买场景不符 |
| Stacy | first time mom | 手工教程向，和咖啡机无直接关联 | 手作育儿号偏DIY，咖啡机相关度低 |
| hailey de la torre | 美妆日常向，不匹配咖啡机推广 | 美妆日常为主，咖啡只是轻度点缀 |
| Meds | 趋势号，和咖啡机品类无关 | 内容在劝退咖啡机，偏冻干便携咖啡路线 |
| Mary 🐶🐱🎀 | 宠物号，和人用咖啡机不相关 | 宠物/家居混卖号，近10条与咖啡机无关 |
| Hailey Bower | 迪士尼娱乐号，完全不相关 | 迪士尼内容号，和咖啡机推广不相干 |

## nox@promotion-capacity-v1-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 5 | tylerk315 | 0 | 无相关标签或视频证据，缺少推广适配 |
| 9 | 🤎 LINK IN BIO 🤎 | 0 | 无可用内容信号，相关性不足 |
| 11 | Manifest with Jenni | 0 | 家庭搞笑内容为主，和咖啡机推广不匹配 |
| 20 | Mary(Caio) | 0 | 无相关标签和视频证据，相关性不足 |
| 25 | Coffeebyhailey | 5 | ASMR咖啡内容为主，产品词不代表推广适配 |
| 37 | elisa | 0 | 与咖啡机无关，内容偏校园影视氛围 |
| 38 | Ethan Rode | -15 | ASMR放松型格式不适合物理产品推广 |
| 46 | Thevaglefamily | -10 | 纯娱乐搞笑号，不适合家电推广 |
| 50 | Tyler Butterworth | 0 | 军事号与咖啡机推广无关 |
| 57 | Kelcey Jensen | 0 | 母婴家庭号，和咖啡机推广相关性弱 |
| 59 | Marvin Brooks | 0 | 日常生活号，缺少咖啡机或购物导向 |
| 60 | drew | 0 | 迷你vlog日常号，缺少产品推广信号 |
| 61 | @cocktails | 0 | 鸡尾酒内容与咖啡机品类偏离 |
| 63 | Restoration 01 | 0 | 缺少标签和内容证据，无法判断为相关 |
| 64 | Mrr Little | 0 | 男装时尚号，与咖啡机推广无关 |
| 71 | lillybear 🐻ིྀ | 0 | 纯穿搭时尚号，和咖啡机无关 |
| 79 | Sofia H. | Fifi’s Coffee Bar | -10 | 美妆时尚向，和咖啡机品类错位明显 |
| 86 | eatwithchlo | 0 | 无有效标签和内容信号，难判断为适配频道 |
| 88 | kalenaawhite | 0 | 无标签无内容，缺少推广匹配依据 |
| 92 | catalina | 0 | 仅有泛情感标签，无产品相关信号 |
| 95 | Lifesrad | -10 | 娱乐社交向，内容形态不适合咖啡机推广 |
| 98 | juliachafe | -10 | 珠宝时尚向，与咖啡机品类不匹配 |
| 102 | J E N N A🇦🇱 | 0 | 母婴生活号，缺少咖啡机相关消费场景 |
| 104 | Wood Work USA | 0 | 无标签无内容线索 |
| 106 | Andrea | -10 | ASMR格式不适合家电带货 |
| 109 | Kayla | TheEspressoRN | 0 | 无标签，无法确认相关性 |
| 110 | Marissa✨ | 0 | 无标签，无法判断 |
| 112 | sovanna | 0 | 娱乐/儿童向，和咖啡机推广不搭 |
| 113 | KatNia | 0 | 关系娱乐向，缺少家电消费场景 |
| 118 | Jordan Theodore | 0 | 娱乐表演向，和产品推广无关 |

## xtb@promotion-capacity-v1-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 9 | Yendy | -9 | 美容发型为主，咖啡仅零散提及，不适合咖啡机推广 |
| 11 | Work Boot Hub | -10 | 工作靴号，咖啡机仅蹭词，相关性极低 |
| 16 | Madina Archakova | -10 | 时尚穿搭频道，与咖啡机推广几乎无关，近10条也无相关内容 |
| 21 | ecozy Appliances | -10 | 冰机/ASMR账号，咖啡机内容偏感官化，缺少导购 |
| 24 | Charles Adair | 0 | 几乎无咖啡机相关信号，近期内容也未体现推广能力 |
| 30 | Limitless X | -9 | 补剂与脑力主题为主，咖啡只是借势，相关度低 |
| 34 | OH SHOW | -10 | 以吃播/杂项为主，咖啡机不是核心内容 |
| 35 | ANDRUS | -10 | 主要是美甲内容，咖啡仅作标题点缀 |
| 40 | Taylor Beach | -9 | 生活方式号偶发咖啡内容，机器推广支撑不足 |
| 53 | Альбиночка | -4 | 近10条大多无关，仅零星咖啡机提及，相关性弱 |
| 57 | Valeria Anay | -9 | 账号主体偏杂，最近内容大多与咖啡机无关 |
| 66 | Chris | -5 | 以咖啡制作和ASMR为主，缺少咖啡机评测/导购信号 |
| 77 | qiuhui2022 | -8 | 工业机械出口为主，和消费级咖啡机推广语境不匹配 |
| 87 | Victoria.torii | -9 | 内容几乎与咖啡机无关，近期也基本是社交/娱乐 |
| 92 | Bella Reed | -8 | BookTok为主，咖啡只属轻度标签，近期也不匹配 |
| 98 | tattoed_christmas_baby | 1 | 只有一条新咖啡机内容，其余大多是随机日常 |
| 103 | 灶为易 厂家批发 智能自动炒菜机 自動炒菜機~炒飯機~炒粉機 | -8 | 工业炒菜机厂家，主营设备与咖啡机消费场景不一致 |
| 111 | Mason | -16 | 主内容是猫宠和杂谈，咖啡机只是一条偶发提及，不适合投放 |
| 113 | Miranda Papiersky | -8 | 家居装饰账号，咖啡相关只是偶发开箱，投放相关性弱 |
| 122 | Gaby raudales.tiktok shop | -10 | 泛带货账号，近10条与咖啡机无关，缺少可验证关联 |
| 129 | 💐🥰ₘᵣₛ ⱼᵤₜₜ🌹🇺🇸 | -4 | 爱国杯和泛流量为主，咖啡机只是偶发词 |
| 139 | Vincenza (aka Vinni) | -11 | GRWM和日常为主，几乎没有咖啡机方向 |
| 140 | Chef Automatic cooking machine | -13 | 做的是炒菜机，不是咖啡机，品类和受众都不对 |
| 147 | Silent Cuts | -15 | 咖啡标签在，但近10条全是理发ASMR，格式严重不符 |
| 148 | Packing Brothers | -7 | 咖啡棒包装机不是咖啡机，工业包装方向不匹配 |
| 158 | Hailey Wilson | -17 | 美业频道，咖啡机只算零散提及，不适合主投 |
| 162 | meeeshell | -15 | 健身频道与咖啡机推广关联弱，近期咖啡内容不足 |
| 164 | 🎀Mamma Anastasia🎀 | -13 | 母婴家居频道，和咖啡机推广无明显相关 |
| 166 | Gymrat007 | -13 | 娱乐/体育向频道，咖啡机内容几乎没有，不适合 |
| 178 | CEE | SaiTheDoula🤱🏾 | -8 | 母婴产后号，和咖啡机推广不相关 |

## Notes
- Page-level rates use `page_size` from each run metadata.
- Cause categories are heuristic clusters from `why_short`; review representative rows before making product decisions.
