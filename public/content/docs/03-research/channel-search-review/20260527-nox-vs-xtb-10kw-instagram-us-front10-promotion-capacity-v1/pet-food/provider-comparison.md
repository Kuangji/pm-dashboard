# Channel Search Provider Comparison

- keyword: pet food
- platform: instagram
- country: US
- left: nox@promotion-capacity-v1 (tmp/channel-search-review/20260527-nox-vs-xtb-10kw-instagram-us-front10-promotion-capacity-v1/pet-food/nox-instagram)
- right: xtb@promotion-capacity-v1 (tmp/channel-search-review/20260527-nox-vs-xtb-10kw-instagram-us-front10-promotion-capacity-v1/pet-food/xtb-instagram)
- left_rule_version: promotion-capacity-v1
- right_rule_version: promotion-capacity-v1
- left_prompt_hash: b87da85cf79a
- right_prompt_hash: b87da85cf79a

## Run Overview
| run | provider | rule_version | total | fit | adjacent | badcase | badcase率 | <0 | 0-9 | 10-19 | 20+ |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| nox@promotion-capacity-v1 | nox | promotion-capacity-v1 | 500 | 155 | 215 | 130 | 26.0% | 10 | 279 | 109 | 102 |
| xtb@promotion-capacity-v1 | xtb | promotion-capacity-v1 | 500 | 212 | 207 | 81 | 16.2% | 13 | 262 | 72 | 153 |

## Page-Level Badcase Rate
| page | nox@promotion-capacity-v1_total | nox@promotion-capacity-v1_badcase | nox@promotion-capacity-v1_badcase率 | xtb@promotion-capacity-v1_total | xtb@promotion-capacity-v1_badcase | xtb@promotion-capacity-v1_badcase率 | badcase率差 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 50 | 6 | 12.0% | 50 | 1 | 2.0% | 10.0% |
| 2 | 50 | 6 | 12.0% | 50 | 10 | 20.0% | -8.0% |
| 3 | 50 | 10 | 20.0% | 50 | 7 | 14.0% | 6.0% |
| 4 | 50 | 13 | 26.0% | 50 | 9 | 18.0% | 8.0% |
| 5 | 50 | 18 | 36.0% | 50 | 8 | 16.0% | 20.0% |
| 6 | 50 | 18 | 36.0% | 50 | 1 | 2.0% | 34.0% |
| 7 | 50 | 16 | 32.0% | 50 | 4 | 8.0% | 24.0% |
| 8 | 50 | 12 | 24.0% | 50 | 11 | 22.0% | 2.0% |
| 9 | 50 | 14 | 28.0% | 50 | 13 | 26.0% | 2.0% |
| 10 | 50 | 17 | 34.0% | 50 | 17 | 34.0% | 0.0% |

## Badcase Overlap
| metric | count |
| --- | --- |
| shared_badcase | 12 |
| nox@promotion-capacity-v1_only_badcase | 118 |
| xtb@promotion-capacity-v1_only_badcase | 69 |

## Badcase Cause Summary
| provider | category | count |
| --- | --- | --- |
| nox@promotion-capacity-v1 | 宠物/动物受众冲突 | 96 |
| nox@promotion-capacity-v1 | 泛相关性偏离 | 16 |
| nox@promotion-capacity-v1 | 其他 | 12 |
| nox@promotion-capacity-v1 | 证据缺失或信号不足 | 5 |
| nox@promotion-capacity-v1 | 娱乐/儿童/泛内容偏离 | 1 |
| xtb@promotion-capacity-v1 | 宠物/动物受众冲突 | 54 |
| xtb@promotion-capacity-v1 | 其他 | 10 |
| xtb@promotion-capacity-v1 | 证据缺失或信号不足 | 8 |
| xtb@promotion-capacity-v1 | 泛相关性偏离 | 6 |
| xtb@promotion-capacity-v1 | 娱乐/儿童/泛内容偏离 | 3 |

## Shared Badcases
| channel | nox@promotion-capacity-v1 | xtb@promotion-capacity-v1 |
| --- | --- | --- |
| Bennett 🐾🐱 | ASMR宠物内容，推广形态不匹配 | ASMR娱乐格式与实物产品推广强冲突 |
| Simplehuman | 家居收纳为主，宠物食品标签疑似噪音 | 家居清洁品牌，和宠粮投放关系弱 |
| Frankie | 有宠粮标签，但ASMR形式压制转化 | ASMR格式与宠物食品推广强冲突 |
| ℝ𝕚𝕤𝕖𝕤𝕒𝕓𝕠𝕧𝕖𝕚𝕥𝕒𝕝𝕝- Functional + Holistic Medicine | 健康育儿向，和宠粮推广不相关 | 人类健康/排毒频道，与宠物食品明显错位 |
| Girls Who Eat | Non-Toxic Living | 生活方式饮食账号，缺少宠物受众 | 人类健康饮食号，缺少宠物受众 |
| Ben White IFBB PRO | 健身频道误标宠物食品，推广场景明显不匹配 | 健身账号，宠物食品推广场景弱 |
| Turtle Back Zoo | 动物园内容，与宠粮推广目标不匹配 | 动物园/野生动物内容，宠粮受众不匹配 |
| 904 Pop Up | 服装活动号，与宠粮推广不相关 | 本地活动与服饰为主，几乎无宠粮相关 |
| Nutrition World | 人类营养向，不是宠物食品受众 | 人类营养健康账号，与宠物食品品类错位 |
| Jaemor Farms | 人类食品与农场内容为主，不是宠物食品场景 | 市集账号，和宠物食品投放不匹配 |
| Colgate-Palmolive Company | 与宠物食品主题不符，偏日化/企业品牌 | 口腔护理品牌，与宠物食品受众不符 |
| Jersey City Night Market | 夜市/美食主题，与宠物食品无关 | 夜市与餐饮内容，非宠物受众 |

## nox@promotion-capacity-v1-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 28 | Mama Shawna | 0 | 无任何相关标签或内容信号 |
| 34 | Tate and Kenna and Fizz | 0 | 仅有泛食物标签，缺少宠物受众 |
| 36 | Taylor | 0 | 家电/广告向内容，不适合宠粮推广 |
| 45 | Acabonac Farms | 0 | 农场牛肉内容，和宠物食品受众不匹配 |
| 48 | Trooper & Vortec | 0 | 无任何相关标签或内容信号 |
| 50 | Animal Savvy LLC | 0 | 仅有公司名，缺少宠物食品相关信号 |
| 52 | Ren • campfires | adventures | 0 | 露营家庭内容，与宠物食品推广无关 |
| 54 | Toby & Blü | 0 | 无宠物食品相关信号 |
| 57 | Peanut | 0 | 无可用宠物食品相关证据 |
| 66 | Katey | 0 | 无宠物食品相关信号 |
| 81 | Notorious | 0 | 无标签无内容，相关信号缺失 |
| 111 | Cary Colón aka Cleantok Cary | 0 | 清洁生活方式频道，缺少宠物食品受众 |
| 115 | Christopher Gillette | -5 | 野生动物/爬宠内容，与宠物食品人群不符 |
| 116 | Gubba Homestead | 0 | 家居自给自足内容，缺少宠物食品受众 |
| 123 | Sonny Otieno | 0 | 无标签，无召回依据 |
| 135 | 𝗞𝗔𝗬𝗟𝗘𝗘 𝗠𝗔𝗥𝗜𝗘Ｉ𝑹𝒐𝒐𝒕 𝑪𝒂𝒖𝒔𝒆 𝑷𝒓𝒂𝒄𝒕𝒊𝒕𝒊𝒐𝒏𝒆𝒓 | 0 | 健康理疗向，和宠粮推广不匹配 |
| 142 | CultivateElevate | 0 | 生活方式与冥想向，和宠粮无关 |
| 145 | Noah Young | 0 | 农场泛动物内容，缺少宠粮投放意图 |
| 151 | Nick Kokenos & Erica Battle | Adventure Travel | 1 | 旅行美食号，只有泛 food 标签，宠粮推广相关性弱 |
| 153 | San Antonio, Texas | Amanda | 3 | 人类美食账号，缺少宠物与喂养场景 |
| 161 | Ivy, Opie, Koi & Dottie | -4 | 猫内容带 ASMR 偏娱乐，不适合宠粮推广 |
| 163 | Megan Nichols | NC Eat & Play | 1 | 本地美食旅游号，与宠粮推广不匹配 |
| 168 | Melissa Mal | Modern health Naturopath | 0 | 人类健康账号，与宠粮无关 |
| 170 | Allison Sadler | 0 | 医疗争议号，与宠粮推广无关 |
| 173 | Casey Cromwell | Gluten Free Celiac Foodie | 1 | 人类无麸质美食号，与宠粮无关 |
| 180 | PAWS Chicago | 0 | 标签几乎无宠物食品相关信号 |
| 181 | Angel Freitas | 0 | 家居DIY号，与宠物食品无关 |
| 190 | memes by bepis | 0 | 无宠物食品相关信号 |
| 197 | DALLASITES101 | 0 | 本地生活/食物号，与宠物食品无关 |
| 198 | Leah Seeling| East Coast Adventures | 0 | 旅行户外号，与宠物食品无关 |

## xtb@promotion-capacity-v1-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 43 | Jalen Noble | 0 | 泛生活/清洁向，宠物食品相关性弱 |
| 52 | Orion 🌎 | 0 | 无标签无内容，无法判断为宠物食品相关 |
| 56 | I M A (ee-mah) | 0 | 摄影旅行美食向，和宠物食品无关 |
| 58 | Dr. Lisa Christine Christiansen ® | 0 | 骑行生活向，宠物食品相关性不足 |
| 67 | Peach🍑 | 0 | 无标签无内容，无法建立相关性 |
| 72 | Steph Wilson | 0 | 旅行海滩向内容，与宠物食品不相关 |
| 81 | ThatWolfMother 🐺🖤🐺 | 0 | 无可用标签，缺少宠物食品信号 |
| 88 | Enzo | 0 | 无标签，缺少宠物食品信号 |
| 92 | Pet 'n Shape | 0 | 无标签，缺少宠物食品信号 |
| 95 | Hawley Awad | 0 | 动物内容但与宠物食品无关 |
| 98 | Mr. BeauxJangles, Maizie Mae & Maddie the Maligator | 0 | 无标签，缺少宠物食品信号 |
| 103 | Marty 🐾 | 1 | 体育为主，仅有宠物泛标签 |
| 104 | ASHLEY | UGC CREATOR | 0 | 与宠物食品无关，缺少相关受众 |
| 110 | Charity Hamilton | 0 | 无标签，无法判断相关性 |
| 123 | mia | 0 | 无标签，无法判断 |
| 143 | Medi-Crunch | 0 | 无有效标签，缺少可用相关性证据 |
| 150 | TickledPet | 0 | 无标签，无法判断为宠物食品相关 |
| 152 | 😺 Rosie • Cleo • Calvin 🐾 | 0 | 标签为空，缺少宠粮相关信号 |
| 155 | Ares York | -5 | ASMR与宠粮推广格式冲突 |
| 156 | Lauryn Pinkston | 0 | 农牧/牛肉向，不是宠粮消费场景 |
| 158 | Falco | 0 | 无有效标签，难判断 |
| 167 | Ruby | 1 | 宠物泛标签过弱，且偏摄影/公益语境 |
| 179 | Lyndsey Belle | -5 | 有产品评测意图，但ASMR格式冲突，卖货不适合 |
| 185 | Meowfecta 🐱Cat Songs🐱 | 0 | 纯猫歌内容，无宠物食品推广信号 |
| 198 | Ciaméra Jimenez 3️⃣0️⃣2️⃣🗽🇵🇷🎓 | 0 | 旅行夜生活号，与宠物食品无关 |
| 199 | Claire | 0 | 无有效宠物或食品证据 |
| 203 | sam grey | 0 | 美妆生活方式，宠物食品相关性很低 |
| 210 | Mouse | Chihuahua Puppy | 0 | 几乎无标签证据，相关性不足 |
| 212 | Serendipity By Kei Boutique | 0 | 时尚店铺向，宠物食品证据不足 |
| 222 | Jesús Moreno | 0 | 娱乐梗图向，宠物食品投放不匹配 |

## Notes
- Page-level rates use `page_size` from each run metadata.
- Cause categories are heuristic clusters from `why_short`; review representative rows before making product decisions.
