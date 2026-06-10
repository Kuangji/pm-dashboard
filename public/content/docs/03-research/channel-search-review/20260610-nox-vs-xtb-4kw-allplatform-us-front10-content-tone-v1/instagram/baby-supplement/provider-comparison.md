# Channel Search Provider Comparison

- keyword: baby supplement
- platform: instagram
- country: US
- left: nox@content-tone-llm-v1 (tmp/channel-search-review/20260610-nox-vs-xtb-4kw-allplatform-us-front10-content-tone-v1/instagram/baby-supplement/nox-instagram)
- right: xtb@content-tone-llm-v1 (tmp/channel-search-review/20260610-nox-vs-xtb-4kw-allplatform-us-front10-content-tone-v1/instagram/baby-supplement/xtb-instagram)
- left_rule_version: content-tone-llm-v1
- right_rule_version: content-tone-llm-v1
- left_prompt_hash: 1228e2ff575f
- right_prompt_hash: 1228e2ff575f

## Run Overview
| run | provider | rule_version | total | fit | adjacent | badcase | badcase率 | <0 | 0-9 | 10-19 | 20+ |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| nox@content-tone-llm-v1 | nox | content-tone-llm-v1 | 500 | 97 | 259 | 144 | 28.8% | 0 | 500 | 0 | 0 |
| xtb@content-tone-llm-v1 | xtb | content-tone-llm-v1 | 500 | 119 | 269 | 112 | 22.4% | 0 | 500 | 0 | 0 |

## Page-Level Badcase Rate
| page | nox@content-tone-llm-v1_total | nox@content-tone-llm-v1_badcase | nox@content-tone-llm-v1_badcase率 | xtb@content-tone-llm-v1_total | xtb@content-tone-llm-v1_badcase | xtb@content-tone-llm-v1_badcase率 | badcase率差 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 50 | 18 | 36.0% | 50 | 12 | 24.0% | 12.0% |
| 2 | 50 | 17 | 34.0% | 50 | 11 | 22.0% | 12.0% |
| 3 | 50 | 11 | 22.0% | 50 | 11 | 22.0% | 0.0% |
| 4 | 50 | 14 | 28.0% | 50 | 13 | 26.0% | 2.0% |
| 5 | 50 | 18 | 36.0% | 50 | 9 | 18.0% | 18.0% |
| 6 | 50 | 7 | 14.0% | 50 | 12 | 24.0% | -10.0% |
| 7 | 50 | 14 | 28.0% | 50 | 13 | 26.0% | 2.0% |
| 8 | 50 | 12 | 24.0% | 50 | 11 | 22.0% | 2.0% |
| 9 | 50 | 15 | 30.0% | 50 | 10 | 20.0% | 10.0% |
| 10 | 50 | 18 | 36.0% | 50 | 10 | 20.0% | 16.0% |

## Badcase Overlap
| metric | count |
| --- | --- |
| shared_badcase | 83 |
| nox@content-tone-llm-v1_only_badcase | 61 |
| xtb@content-tone-llm-v1_only_badcase | 29 |

## Badcase Cause Summary
| provider | category | count |
| --- | --- | --- |
| nox@content-tone-llm-v1 | 其他 | 92 |
| nox@content-tone-llm-v1 | 泛相关性偏离 | 33 |
| nox@content-tone-llm-v1 | 证据缺失或信号不足 | 11 |
| nox@content-tone-llm-v1 | 宠物/动物受众冲突 | 7 |
| nox@content-tone-llm-v1 | 娱乐/儿童/泛内容偏离 | 1 |
| xtb@content-tone-llm-v1 | 其他 | 63 |
| xtb@content-tone-llm-v1 | 泛相关性偏离 | 29 |
| xtb@content-tone-llm-v1 | 证据缺失或信号不足 | 10 |
| xtb@content-tone-llm-v1 | 宠物/动物受众冲突 | 9 |
| xtb@content-tone-llm-v1 | 娱乐/儿童/泛内容偏离 | 1 |

## Shared Badcases
| channel | nox@content-tone-llm-v1 | xtb@content-tone-llm-v1 |
| --- | --- | --- |
| Derek Lunsford | 内容是健身打卡和成人补剂推广，与婴儿补剂受众冲突 | 健美训练与成人补剂为主，和婴儿补剂受众与场景明显冲突 |
| Robert Wilmote | 纯健身赛事与成人补剂带货，几乎无母婴语境 | 健身增肌与成人蛋白推广为主，和婴儿补充剂受众明显不符 |
| Katriona Aromin | 以减脂、身材和成人补剂为主，不适合婴儿补剂合作 | 健身减脂与成人补剂为主，和婴儿补充剂明显不搭 |
| Ashly Locklin | Weight Loss, Beauty, & Business | 成人减重和GLP-1营销为主，和婴儿补剂完全不匹配 | 减重、美业、创业和GLP-1为主，不是母婴补剂受众 |
| Cortney Campbell | anti-cancer living 🌱 | 抗癌与成人养生内容，不是婴儿或母婴营养场景 | 反医疗、玄学/意识形态内容强，不适合婴儿补充剂转化 |
| Cole Munoz | Online Fitness Coach | 纯健身塑形与成人减脂内容，无法承载婴儿补剂 | 纯健身增肌账号，与婴儿补充剂无关 |
| Meg | 以观点、信仰和家庭旅行为主，缺少婴儿营养承载 | 政治宗教个人表达为主，和婴儿补充剂无关 |
| Outdoorsy CEO grounded in nature & movement. | 内容主轴是女性自我成长和健身创业，非婴儿喂养/育儿场景 | 以创业、自我重塑和运动思维为主，没有婴儿/母婴消费语境 |
| STEPHANIE DECATOR | 主打成人减重补剂和私域引流，几乎无婴幼儿内容 | 主卖成人减重产品，和婴儿补剂人群与内容几乎不匹配 |
| Helping Hands Healing Sanctuary 501c3 | 马匹救助与疗愈账号，和婴儿补剂完全不相关 | 马匹救助与疗愈内容，和人类婴儿商品无关 |
| Gina | Impactful Marketing & Consultancy | 商业营销长文账号，受众和婴儿补剂无关 | 内容是营销/赚钱话题，与婴儿补充剂无关 |
| Olayinka Aiyelabowo | 成人保健品+强政治立场内容，和婴儿补剂不搭 | 主轴是成人维生素销售和族群议题，缺少婴儿场景 |
| Ali Olson | 政治导向和私域购物内容，和婴儿补剂不相关 | 政治和私域购物内容为主，与婴儿补充剂无关 |
| Yolande Norris-Clark | 反医学/意识形态长文为主，和婴儿补剂不匹配 | 反医疗化与更年期主题为主，和婴儿补充剂合作场景不匹配 |
| Jordan Harpst RN, BSN | Cortisol + Natural Weight Loss | 成人减脂和皮质醇补剂账号，和婴儿补剂无关 | 内容是减脂和皮质醇管理，不是婴儿补充受众 |
| Fera Pets | 宠物补剂频道，和人类 baby supplement 受众冲突 | 宠物补剂账号，目标受众是宠物而非人类婴儿 |
| Jessica Cahoy, RN | Fitness & Weightloss Coach | 成人减脂健身账号，和婴儿补剂受众不符 | 内容集中在女性健身、减脂和peptide推广，与婴儿补充剂场景不符 |
| Lindsay Dudley | Cortisol + Metabolism Coach | 减脂/皮质醇/健身号，不适合婴儿补剂 | 偏军官健身与自我管理，婴儿补充剂不匹配 |
| Birdie | Holy 𓄼 + lead | 内容偏政治、宗教和个人事业，不适合婴儿商品推广 | 信仰+家庭+商业为主，婴儿营养承接力不足 |
| Josh & Jeanne | Fix Your Nervous System | 核心是激素、自律神经和代谢，不是母婴喂养场景 | 以荷尔蒙/甲状腺/神经系统为主，和婴儿补剂场景明显不搭 |
| The Estrogen Free®Lifestyle | 内容是强功能性激素/反植物雌激素观点，和婴儿商品无关 | 核心是激素/更年期内容，与婴儿补充剂受众不符 |
| Dr Shannyn Pearce | 围绕慢性病、EBV和补剂，不是婴儿/母婴喂养场景 | 慢性病/EBV/免疫补剂账号，受众和婴儿补充剂不匹配 |
| Krystin Kirkendall | 主轴是成人排毒补剂，不是婴儿场景 | 成人解毒/抗炎补剂为主，缺少婴儿或母婴喂养场景 |
| Laura Kummerle, PT, DPT, OCS | 内容几乎全是成人健身/技能训练，与婴儿补剂受众不符 | 纯训练和技能挑战频道，与婴儿补剂完全错位 |
| Harriet Harper | 健身和个人生活为主，没有婴儿受众 | 纯健身人设，内容和婴儿补充剂场景明显不匹配 |
| Puget Sound Goat Rescue | 是山羊救援，不是人类母婴场景 | 动物救援频道，受众与人类婴儿补充剂不匹配 |
| 🌮24 Toyota Tacoma TRD Sport 4x4 | 汽车改装/越野内容，与婴儿补充完全不搭 | 汽车改装频道，与婴儿补充剂完全不匹配 |
| Root & Rise | Daily Health Tips | 主打抗衰/减脂/肽类，不是婴儿人群 | 泛健康加研究肽与抗衰内容，和婴儿补充剂冲突较大 |
| Protect Animals Worldwide | 动物救助账号，与人类婴儿补充无关 | 动物救助频道，主体受众与人类婴儿补剂完全不相干 |
| Jeffrey Kyle Younker | 健身补剂零售内容，与婴儿补充完全不搭 | 成人健身补剂店号，强销售导向但完全不是婴儿向 |

## nox@content-tone-llm-v1-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 2 | Women’s Health Coach | Pre & Postpartum Fitness |  | 核心是女性产后训练，不是婴儿喂养或营养补剂 |
| 6 | PCOS Weight Loss + Fertility I Cory Ruth |  | 内容聚焦PCOS/备孕/减重与成人补剂，不适合婴儿补充剂推广 |
| 7 | Samantha Barlow Fitness |  | 核心是健身减脂和母职励志，不是婴儿喂养或营养 |
| 58 | Dr. Kalea Wattles | Fertility | TTC |  | 主要是生育治疗，不是婴儿/育儿场景 |
| 66 | Bree Kuhle | How to Make Money Online |  | 纯搞钱/生活流，无婴儿营养承载能力 |
| 68 | Dr. Natalie Underberg, DC | PREGNANCY PREP AND FERTILITY |  | 备孕/生育内容，不是婴儿补剂场景 |
| 72 | Rebecca Rumsey |  | 备孕/高龄生育，不是婴儿产品受众 |
| 75 | sᴀsᴋɪᴀ ʀöᴇʟʟ/ Celebrity Fertility Coach |  | 备孕/试管话题，和婴儿补剂受众不匹配 |
| 81 | Sophia Pavia |  | 主要是备孕/孕前补剂和生育话题，和婴儿补充剂阶段不匹配 |
| 86 | stacia scott | mom | postpartum provider | root cause expert |  | 主要讲产后激素和功能医学，不是婴儿喂养/补充受众 |
| 94 | WeNatal |  | 主线是备孕和孕前营养，离婴儿补充剂人群太远 |
| 97 | Functional Fertility Strategist • Olivia |  | 核心是备孕/生育策略和功能性 fertility 服务，不是婴儿商品 |
| 99 | Kelly LeVeque, CCN |  | 偏成人饮食、健身和营养，缺少婴儿补充剂的直接受众 |
| 136 | {Autoimmune Guru + Functional Medicine} |  | 自免/毒素/围绝经为主，不是婴儿补充人群 |
| 148 | Breastmilk + Keepsake Jewelry |  | 纪念珠宝账号，与婴儿补充无关 |
| 182 | Lindsey Lusson, MS, RD | Fertility Dietitian for Active Women |  | 主要是月经恢复和备孕，和婴儿补剂不对口 |
| 183 | Krista | health coach + biz mentor |  | 减脂和事业内容为主，母婴补剂承载弱 |
| 185 | Emily | Running, Strength & Hormone Health |  | 跑步健身与激素健康为主，婴儿补剂受众不符 |
| 186 | Kristen Deangelis, RD, IFNCP, RYT | Functional Fertility |  | 功能医学备孕号，缺少婴儿补剂场景 |
| 187 | Gabbi Robinson | Inspiring YOU to transform YOU✨ |  | 健身和蛋白补剂为主，婴儿补剂关联弱 |
| 216 | ATL Personal Trainer & Nutrition Coach |  | 健身减脂账号，和婴儿补充品不匹配 |
| 233 | Emily Ritzer | Nervous System Healing |  | 核心是离婚/神经系统疗愈，与婴儿补剂受众明显不符 |
| 245 | Ekua Asante |  | 以文化写真、旅行和家庭生活为主，缺少母婴补剂承载场景 |
| 250 | Lexie Marie |  | 主要是孕妈穿搭和美发美妆，和婴儿补剂关联很弱 |
| 252 | Evan "T-Rex" Singleton 🇺🇸 |  | 内容以强人训练、力量比赛和装备赞助为主，和婴儿补剂受众不符 |
| 313 | Eve Scaba|Culinary Nutrition Chef| Hormone + Gut Practitioner |  | 内容集中在女性减脂、激素与肠道，不是婴幼儿或母婴补剂场景 |
| 320 | KATIE DUNLOP |  | 内容长期聚焦女性减脂、蛋白和健身，与婴幼儿补充剂受众明显不符 |
| 321 | Jennifer Mercier |  | 内容是受孕/生殖医学，不是婴儿补剂或婴幼儿营养 |
| 327 | Caitria Thiele L.Ac.| Fertility & TTC After Miscarriage |  | 备孕/TTC内容为主，与婴儿补充剂受众不符 |
| 330 | Laura Lyons, FNTP RHP |  | 纯成人减脂健身调性，缺少婴儿受众与场景 |

## xtb@content-tone-llm-v1-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 2 | Complete Nutrition Brands® |  | 以健身增肌和减脂补剂为主，和婴儿补充品受众冲突 |
| 3 | FLEXUP |  | 时尚活跃和成人保健/蛋白内容为主，没有婴儿场景 |
| 5 | 🌸MELITA TORRES🌸 |  | 内容以生活方式、美妆、宠物和泛家人日常为主 |
| 8 | VIGOR ANGEL |  | 泛成人/家庭口号型补剂账号，缺少婴儿补充品语境 |
| 16 | Em Hening | homeschool, homestead mama + WFH mentor |  | 家居/事业/GLP-1/生活方式混杂，和婴儿补剂不符 |
| 102 | Cassidy McWherter / Orlando Realtor |  | 房产经纪内容，与婴儿补充剂完全不在一个受众 |
| 152 | Emily Roberts |  | 主线是成人减脂/直销补剂和健身，缺少婴儿营养承载场景 |
| 160 | SarahRuth | Hashimotos & Thyroid Expert |  | 主轴是甲状腺/桥本和成人健康，和婴儿补充剂场景明显不合 |
| 179 | Amanda |  | 以健身减脂为主，缺少婴儿补充剂承载场景 |
| 185 | FERTILITY ACTIVATION METHOD™️|HEIDI BROCKMYRE MS LAc |  | 聚焦备孕和生育疗程，不是婴儿补充剂推广场景 |
| 190 | Whitney Gingerich, MA, RDN - Fertility Dietitian and Coach |  | 聚焦备孕与男性生育，不是婴儿补充剂 |
| 260 | Tina Su - Autism Healing Mentor |  | 核心是自闭症儿童疗愈，不是婴儿补剂推广 |
| 273 | Brie🌾 | Urban Homesteading |  | 城市自给自足和烘焙号，无婴儿补剂场景 |
| 275 | Breanna Mueller || Faith, Farming & Holsitic Living |  | 农场与生活方式内容为主，和婴儿补剂无关 |
| 280 | Mandy | Freedom Loving Mama Bear |  | 偏政治/网赚/日常杂谈，和婴儿营养品无直接承接 |
| 292 | Chiropractic + Acupuncture + Massage + Laser Therapy |  | 强人群是力量举/强人训练，与婴儿营养完全不搭 |
| 315 | Shayda Torabi Howell |  | 以家庭生活、穿搭和农场日常为主，不适合婴儿补充剂 |
| 330 | Kristen Simmons |  | 核心是健身教练与女性塑形，和婴儿补充剂目标人群不一致 |
| 337 | Chelsea Dasinger |  | 居家建房/网络营销/人生状态号，与婴儿补充剂无关 |
| 338 | Olivia Haas | Gallbladder + Fatty Liver Nutritionist |  | 主轴是胆囊/脂肪肝成人营养，不适合婴儿补充剂 |
| 340 | ★BRITTANY★ | 𝚑𝚎𝚊𝚕𝚝𝚑𝚢 𝚖𝚘𝚖 𝚕𝚒𝚏𝚎 |  | 健身减脂母亲号，更多面向成人塑形，不是婴儿补充剂受众 |
| 341 | Heart & Soil |  | 成人动物营养/内脏补剂号，和婴儿补充剂人群错位 |
| 351 | Kelley Nemiro |  | 以女性激素/甲状腺/减脂为主，几乎无婴儿或育儿场景 |
| 393 | Result 393 |  | 主要是减重系统和身材展示，和宝宝场景不符 |
| 409 | gabbi's |  | 宠物精品店，核心是猫狗产品与宠物健康，不适合人类婴儿补充剂 |
| 410 | Dr. Christine Maren | Functional Medicine & Hormone Optimization |  | 更年期、肠道和激素优化为主，受众是中年女性而非婴儿家庭 |
| 432 | Olivia Tox Filler Sculptra Injector | chicago |  | 核心是医美注射与美学内容，和婴儿补剂受众明显不匹配。 |
| 448 | 𝐑𝐚𝐜𝐡𝐞𝐥 𝐀𝐝𝐚𝐦𝐬 𝐋𝐞𝐞 | 𝐓𝐨𝐩 1000 𝐑𝐞𝐚𝐥𝐭𝐨𝐫 & 𝐁𝐮𝐬𝐢𝐧𝐞𝐬𝐬 𝐂𝐨𝐚𝐜𝐡 |  | 房产与商业教练定位太偏成人职业，不适合婴儿补剂推广。 |
| 472 | Rosanne Austin | Fearlessly Fertile |  | 备孕心态号，不适合婴儿补剂 |

## Notes
- Page-level rates use `page_size` from each run metadata.
- Cause categories are heuristic clusters from `why_short`; review representative rows before making product decisions.
