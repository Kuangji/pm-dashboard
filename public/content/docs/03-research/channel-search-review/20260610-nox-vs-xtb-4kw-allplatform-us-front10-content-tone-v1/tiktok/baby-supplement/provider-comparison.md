# Channel Search Provider Comparison

- keyword: baby supplement
- platform: tiktok
- country: US
- left: nox@content-tone-llm-v1 (tmp/channel-search-review/20260610-nox-vs-xtb-4kw-allplatform-us-front10-content-tone-v1/tiktok/baby-supplement/nox-tiktok)
- right: xtb@content-tone-llm-v1 (tmp/channel-search-review/20260610-nox-vs-xtb-4kw-allplatform-us-front10-content-tone-v1/tiktok/baby-supplement/xtb-tiktok)
- left_rule_version: content-tone-llm-v1
- right_rule_version: content-tone-llm-v1
- left_prompt_hash: 1228e2ff575f
- right_prompt_hash: 1228e2ff575f

## Run Overview
| run | provider | rule_version | total | fit | adjacent | badcase | badcase率 | <0 | 0-9 | 10-19 | 20+ |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| nox@content-tone-llm-v1 | nox | content-tone-llm-v1 | 500 | 107 | 231 | 162 | 32.4% | 0 | 500 | 0 | 0 |
| xtb@content-tone-llm-v1 | xtb | content-tone-llm-v1 | 500 | 98 | 253 | 149 | 29.8% | 0 | 500 | 0 | 0 |

## Page-Level Badcase Rate
| page | nox@content-tone-llm-v1_total | nox@content-tone-llm-v1_badcase | nox@content-tone-llm-v1_badcase率 | xtb@content-tone-llm-v1_total | xtb@content-tone-llm-v1_badcase | xtb@content-tone-llm-v1_badcase率 | badcase率差 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 50 | 21 | 42.0% | 50 | 8 | 16.0% | 26.0% |
| 2 | 50 | 15 | 30.0% | 50 | 15 | 30.0% | 0.0% |
| 3 | 50 | 20 | 40.0% | 50 | 13 | 26.0% | 14.0% |
| 4 | 50 | 12 | 24.0% | 50 | 17 | 34.0% | -10.0% |
| 5 | 50 | 11 | 22.0% | 50 | 20 | 40.0% | -18.0% |
| 6 | 50 | 13 | 26.0% | 50 | 16 | 32.0% | -6.0% |
| 7 | 50 | 19 | 38.0% | 50 | 13 | 26.0% | 12.0% |
| 8 | 50 | 23 | 46.0% | 50 | 16 | 32.0% | 14.0% |
| 9 | 50 | 18 | 36.0% | 50 | 17 | 34.0% | 2.0% |
| 10 | 50 | 10 | 20.0% | 50 | 14 | 28.0% | -8.0% |

## Badcase Overlap
| metric | count |
| --- | --- |
| shared_badcase | 63 |
| nox@content-tone-llm-v1_only_badcase | 99 |
| xtb@content-tone-llm-v1_only_badcase | 86 |

## Badcase Cause Summary
| provider | category | count |
| --- | --- | --- |
| nox@content-tone-llm-v1 | 其他 | 83 |
| nox@content-tone-llm-v1 | 宠物/动物受众冲突 | 32 |
| nox@content-tone-llm-v1 | 泛相关性偏离 | 23 |
| nox@content-tone-llm-v1 | 证据缺失或信号不足 | 18 |
| nox@content-tone-llm-v1 | 娱乐/儿童/泛内容偏离 | 6 |
| xtb@content-tone-llm-v1 | 其他 | 67 |
| xtb@content-tone-llm-v1 | 宠物/动物受众冲突 | 41 |
| xtb@content-tone-llm-v1 | 泛相关性偏离 | 27 |
| xtb@content-tone-llm-v1 | 证据缺失或信号不足 | 11 |
| xtb@content-tone-llm-v1 | 娱乐/儿童/泛内容偏离 | 3 |

## Shared Badcases
| channel | nox@content-tone-llm-v1 | xtb@content-tone-llm-v1 |
| --- | --- | --- |
| Brooke, Fat Loss Coach | 内容是成人减脂教练，和宝宝补剂目标受众不符 | 纯女性减脂账号，没有母婴或婴儿喂养场景 |
| Coach.Andrea.Ellis | 青少年体育与运动员补剂场景，不适合宝宝补剂 | 内容聚焦青少年运动员和体育心态，与婴儿补剂人群明显不符 |
| S𝑡𝑒𝑝𝘩𝑎𝑛𝑖𝑒 D𝑒𝑐𝑎𝑡𝑜r | 中年减脂/围绝经内容，和宝宝补剂错配 | 成人减重和更年期补充剂为主，和婴儿无关 |
| Arianna | 成人健康种草号，缺少母婴场景 | 成人健身/养生补充剂内容，与婴儿补充剂受众不符 |
| Trap9 | 杂货与宠物带货，和宝宝补剂无关 | 科技、宠物、家居泛选品号，和婴儿补剂几乎不相关 |
| Dre | 杂谈阴谋与成人保健，无法承接宝宝补剂 | 内容以阴谋论、政治吐槽和成人补剂为主，缺少母婴/婴儿语境 |
| Hakunathebeardeddragon | 专做爬宠喂养，不适合人类宝宝补剂 | 爬宠喂养频道，受众是蜥蜴不是人类婴儿。 |
| ↩️Insulin Resistance w/Kirsten | 代谢减脂号，和宝宝补剂目标用户不一致 | 中年代谢和胰岛素抵抗内容，受众与婴儿补充不匹配。 |
| Ziggy’s Refuge | 动物救助账号，与宝宝补剂完全错位 | 动物救助频道，与婴儿补剂受众完全不匹配 |
| Gentlegiantselephant | 动物公益账号，和人用婴儿补充完全不搭 | 动物救援内容，与母婴/宝宝补剂无关 |
| EDDIE F | 成人健康产品导购，缺少婴儿或母婴受众 | 主要卖成人保健品和工具，和婴儿补充完全不搭。 |
| Waltzy Styczykowski Becky | 宠物繁育账号，受众是犬类，不适合人用婴儿补充 | 纯宠物犬舍内容，和人用婴儿补充剂明显不符 |
| mrscourtneygrutza | 成人减脂、激素修复、瘦身Peptides，和婴儿补剂明显冲突 | 核心是产后减脂和激素产品，不是婴儿营养。 |
| Barkfinity | 全是宠物护理、老年犬健康，和人用婴儿补剂不相干 | 宠物狗内容，和人类婴儿补充剂受众不匹配。 |
| Patty Staley | 泛商品导购号，内容偏成人保健和女性热潮，缺少婴儿定位 | 以热闪商品和中年女性用品为主，没有婴儿内容。 |
| Sonita Life | 乡村捕鱼、卖菜、和孩子生活记录，和婴儿补剂无关 | 乡村捕鱼做饭为主，几乎无婴儿营养或商品推广承载场景 |
| HerPillow | 身体枕/孕期睡眠为主，和婴儿补剂不相关 | 全是成人身体枕和睡眠用品，与婴儿补充毫无关系。 |
| TT Eds Apparel & Stuff | 以服饰和节日礼品为主，几乎无婴儿/营养场景 | 纯服装带货，和婴儿补充没有任何内容交集。 |
| Eastern Box Turtle | 宠物爬宠内容，与人类婴儿补剂受众明显不符 | 爬宠和异宠内容，与人类婴儿补充剂无关。 |
| Jordan- Cortisol + Weight Loss | 内容集中在成人女性减脂/皮质醇补剂，和婴儿补充剂场景不匹配 | 成人减脂和皮质醇补剂号，不适合婴儿补充剂。 |
| Courtney Hunt, MD | 内容以怪异健康/宇宙玄学为主，缺少婴儿营养与喂养场景 | 成人生育和玄学健康号，和婴儿补充剂不匹配。 |
| catchyouheart | 旅行、单身社交、健身为主，和婴儿补剂受众冲突 | 旅行社交和单身生活为主，与宝宝补剂冲突 |
| Nelly.dogtips | 内容几乎全是狗狗健康与宠物补剂，不适合人类婴儿补充剂推广。 | 宠物爬宠内容，和人类婴儿补充剂完全无关。 |
| Thee Caregiver Brand | 照护者与成人护理账号，不是母婴受众 | 偏照护者和成人健康，不是母婴喂养场景。 |
| CallyMarieSimpson | 内容以娱乐、酒精和日常吐槽为主，与婴儿补充剂不匹配 | 内容是鸡汤/生活/饮酒/宠物杂谈，缺少婴儿养育或营养场景 |
| HerpTime | 全是爬宠饲养与繁殖，不对应人类婴儿补充剂受众 | 爬宠饲养频道，内容对象是蜥蜴和壁虎，不适合人类婴儿补剂 |
| BloomingBodyContour | 主做成人增重和身材塑形，和婴儿补充剂人群不一致 | 核心是增重补剂和身材管理，明显是成人向 |
| k i l e y 🪩🫧💭 | 主线是减脂、健身和身材管理，与婴儿补充剂受众冲突 | 以减脂健身和身材叙事为主，没有婴儿/喂养内容 |
| ✝️AskDrLaRu🌸NCCN🌿 | 内容是信仰/创作者社群，不提供母婴或婴儿营养承载 | 以基督教文案和创作者招募为主，不是母婴消费场景 |
| Melissa Gonzalez | 成人GLP-1减重号，和婴儿补充剂完全错位 | GLP-1减重号，和婴儿补充剂受众不对口。 |

## nox@content-tone-llm-v1-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 7 | Michelle Marie Fit |  | 核心是孕期健身减脂，不是宝宝/婴儿补剂 |
| 8 | Babylove 🍼 |  | 主要卖文具水瓶等儿童小物，不是宝宝营养补剂 |
| 9 | Aly ♡ Texas |  | 成人健康补剂号，和宝宝补剂受众错位 |
| 22 | conceivable-fertility |  | 备孕受众，不是婴儿补剂受众 |
| 23 | Cait, Hormone Health Coach |  | 同为备孕/生育教练，不适合宝宝补剂 |
| 29 | Shy Bristow |  | 以折扣购物、家庭杂谈为主，缺少婴儿喂养或营养语境 |
| 33 | Dr Jodi - FTF System |  | 聚焦备孕/不孕修复，与婴儿补充场景明显错位 |
| 34 | pinkdragonpsychrn |  | 内容杂乱，母婴和补剂承接能力都弱 |
| 39 | Reps 2 Redemption |  | 成人健身和脑健康产品为主，不是婴儿补充受众 |
| 51 | Nancy: Cortisol Cocktail Coach |  | 主打成人减脂/情绪/能量补剂，和婴儿补充剂受众不匹配 |
| 75 | Megan🖤 |  | 成人减脂和高皮质醇修复内容，与婴儿补剂明显不搭 |
| 91 | Boomer UGC Creator|Amazon Infl |  | 教育副业/退休收入内容，和婴儿补剂无关 |
| 106 | Rosanne Austin |  | 内容聚焦备孕与生育心态，不是婴儿喂养或婴儿营养 |
| 127 | Tess in the PNW 💚 |  | 以旅行和生活记录为主，只有少量亲子元素，难承接宝宝营养品 |
| 132 | Heather🦋GardenLife |  | 美容、宠物、户外测评混杂，和宝宝补充剂无关 |
| 138 | Julia Loggins/Gut Health |  | 主打肠道健康和成人天然补剂，和宝宝补充剂无关 |
| 196 | janae.cortisol_coach |  | 成人压力/减重补剂号，明显不是婴儿补充剂场景 |
| 200 | mrhype84 |  | 交易和成人保健补剂为主，和婴儿补充剂无关 |
| 221 | DoseOfWell |  | 剧情故事号，非母婴或商品决策内容 |
| 260 | ThrivingInMy60s |  | 更像更年期女性健康号，与 baby supplement 受众相反 |
| 264 | iLaria 🇮🇹🇺🇸 |  | 以穿搭美妆生活为主，和婴儿补剂关联弱 |
| 267 | Alisa Dean |  | 内容主轴非母婴/育儿，缺少婴儿补充剂受众和场景 |
| 269 | ✨ andreaa ✨ |  | 内容几乎全是宠物、家居和美妆，和婴儿补充剂受众不符 |
| 272 | Mandy | Southern Cross Ranch |  | 内容以农场、山羊、园艺和家庭日常为主，缺少婴儿喂养或育儿消费场景 |
| 276 | Jasper 🔥🌴 |  | 内容以Kpop娱乐剪辑为主，与母婴补充剂受众不匹配 |
| 279 | Alma |  | 主体是宠物/狗内容，不适合默认人用baby supplement |
| 280 | Perfectly Imperfect Nichole ❌️ |  | 励志信仰内容为主，缺少母婴或商品决策场景 |
| 285 | Graceila |  | 以生活、情感和宠物内容为主，缺少母婴商品承接 |
| 289 | MrsFunsize |  | 猫、婚礼、护肤和购物为主，与婴儿补充剂不符 |
| 295 | Shelby Potter |  | 健身训练账号，核心受众与婴儿补充剂不一致 |

## xtb@content-tone-llm-v1-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 5 | Mr.Jeffdunham |  | 主体是脱口秀喜剧，和婴儿补充剂推广受众完全不匹配 |
| 29 | Rhaelynn Dreymore |  | 成人健康补充剂为主，缺少婴儿和家长受众 |
| 33 | Dataheathy |  | 成人健康与糖代谢内容为主，不适合婴儿补充剂 |
| 39 | Eco Plant Fusion |  | 成人养生和塔罗混合，和婴儿补充剂无关 |
| 44 | Monica🦩Fertility Health Coach |  | 聚焦备孕和生育，不是婴儿补充剂受众 |
| 74 | Mads 🌻 |  | 内容杂乱偏赚钱和情绪生活，没有稳定母婴定位 |
| 83 | epideals |  | 以成人热卖商品和各种补剂带货为主，缺少婴儿受众。 |
| 84 | SueBeautyVibes |  | 主轴是更年期、代谢和产后恢复，不是婴儿补充。 |
| 92 | TheRealMomShift |  | 以妈妈日常、孕期和吃播为主，缺少补充剂承载能力。 |
| 178 | Lindsay Oehmen |  | 围绕成人甲状腺和细胞修复保健，不适合婴儿补充剂 |
| 184 | Crystal SAHM |  | 主要卖穿搭和服饰，与婴儿补充剂没有受众连接 |
| 195 | Mary_42111 🍒 |  | 以护肤、美妆和成人维生素为主，不是婴儿向频道 |
| 203 | julyaayy01 |  | 核心是榨汁机，和婴儿补充剂场景不符 |
| 210 | Claudia 💕 | SAHM🧩💕 |  | 主线是育儿日常和娱乐，无补剂承载 |
| 214 | Tiffany |  | 杂项购物内容，和婴儿补充剂关联弱 |
| 218 | The Rubin’s |  | 身心疗愈号，缺少母婴或产品推广场景 |
| 231 | Heart & Soil Supplements |  | 主打成人营养补剂和健康饮食，不是婴儿/母婴场景 |
| 233 | ✨ Jess | WFHM | 📚🎭🛍️✨ |  | 以穿搭、美妆和日常为主，婴儿健康与补剂承接弱 |
| 237 | Amber | blue collared wife ⚡️ |  | 成人减脂和情绪/生活方式内容为主，婴儿补剂不匹配 |
| 268 | its.meganmichelle |  | 家居清洁和副业内容为主，和婴儿补剂几乎无关 |
| 272 | What Emily Loves |  | 成人美容/保健种草为主，没有婴儿补剂受众 |
| 273 | by.rosie |  | 成人健身和抗老补剂号，和婴儿补剂明显错位 |
| 274 | 𝐌aLinda ListenTo𝐌e Linda! 🫠 |  | GLP-1、清洁和省钱好物为主，婴儿补剂不匹配 |
| 289 | Signaturevaultco |  | 收藏品/手办号，受众与宝宝补剂完全不对口 |
| 292 | zaraquimby02011 |  | 宠物健康补剂号，目标对象是狗，不是宝宝 |
| 297 | Lauren |  | 狗补剂和狗过敏护理号，不适合人类宝宝补剂 |
| 298 | Nicolette Anderson |  | 成人中年健康和收入内容，和宝宝补剂不相干 |
| 309 | jenschasingdreams |  | 瑜伽灵性/宠物/生活号，和婴儿补充剂基本无关 |
| 317 | mindfulbeautybymichele |  | 中年美发美妆号，与婴儿补充剂无关 |
| 320 | Anthony Confessore |  | 健身狗狗号，基本没有母婴场景 |

## Notes
- Page-level rates use `page_size` from each run metadata.
- Cause categories are heuristic clusters from `why_short`; review representative rows before making product decisions.
