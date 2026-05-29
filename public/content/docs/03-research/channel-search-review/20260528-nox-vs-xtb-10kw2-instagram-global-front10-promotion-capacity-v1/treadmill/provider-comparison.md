# Channel Search Provider Comparison

- keyword: treadmill
- platform: instagram
- country: -
- left: nox@promotion-capacity-v1 (tmp/channel-search-review/20260528-nox-vs-xtb-10kw2-instagram-global-front10-promotion-capacity-v1/treadmill/nox-instagram)
- right: xtb@promotion-capacity-v1 (tmp/channel-search-review/20260528-nox-vs-xtb-10kw2-instagram-global-front10-promotion-capacity-v1/treadmill/xtb-instagram)
- left_rule_version: promotion-capacity-v1
- right_rule_version: promotion-capacity-v1
- left_prompt_hash: b87da85cf79a
- right_prompt_hash: b87da85cf79a

## Run Overview
| run | provider | rule_version | total | fit | adjacent | badcase | badcase率 | <0 | 0-9 | 10-19 | 20+ |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| nox@promotion-capacity-v1 | nox | promotion-capacity-v1 | 500 | 131 | 270 | 99 | 19.8% | 16 | 206 | 208 | 70 |
| xtb@promotion-capacity-v1 | xtb | promotion-capacity-v1 | 500 | 248 | 186 | 66 | 13.2% | 11 | 144 | 76 | 269 |

## Page-Level Badcase Rate
| page | nox@promotion-capacity-v1_total | nox@promotion-capacity-v1_badcase | nox@promotion-capacity-v1_badcase率 | xtb@promotion-capacity-v1_total | xtb@promotion-capacity-v1_badcase | xtb@promotion-capacity-v1_badcase率 | badcase率差 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 50 | 6 | 12.0% | 50 | 9 | 18.0% | -6.0% |
| 2 | 50 | 8 | 16.0% | 50 | 15 | 30.0% | -14.0% |
| 3 | 50 | 13 | 26.0% | 50 | 12 | 24.0% | 2.0% |
| 4 | 50 | 10 | 20.0% | 50 | 1 | 2.0% | 18.0% |
| 5 | 50 | 6 | 12.0% | 50 | 3 | 6.0% | 6.0% |
| 6 | 50 | 13 | 26.0% | 50 | 6 | 12.0% | 14.0% |
| 7 | 50 | 15 | 30.0% | 50 | 4 | 8.0% | 22.0% |
| 8 | 50 | 8 | 16.0% | 50 | 6 | 12.0% | 4.0% |
| 9 | 50 | 11 | 22.0% | 50 | 5 | 10.0% | 12.0% |
| 10 | 50 | 9 | 18.0% | 50 | 5 | 10.0% | 8.0% |

## Badcase Overlap
| metric | count |
| --- | --- |
| shared_badcase | 4 |
| nox@promotion-capacity-v1_only_badcase | 95 |
| xtb@promotion-capacity-v1_only_badcase | 62 |

## Badcase Cause Summary
| provider | category | count |
| --- | --- | --- |
| nox@promotion-capacity-v1 | 泛相关性偏离 | 32 |
| nox@promotion-capacity-v1 | 其他 | 23 |
| nox@promotion-capacity-v1 | 证据缺失或信号不足 | 23 |
| nox@promotion-capacity-v1 | 娱乐/儿童/泛内容偏离 | 13 |
| nox@promotion-capacity-v1 | 宠物/动物受众冲突 | 6 |
| nox@promotion-capacity-v1 | 科技/电子垂类偏离 | 2 |
| xtb@promotion-capacity-v1 | 其他 | 20 |
| xtb@promotion-capacity-v1 | 娱乐/儿童/泛内容偏离 | 16 |
| xtb@promotion-capacity-v1 | 泛相关性偏离 | 13 |
| xtb@promotion-capacity-v1 | 证据缺失或信号不足 | 9 |
| xtb@promotion-capacity-v1 | 宠物/动物受众冲突 | 8 |

## Shared Badcases
| channel | nox@promotion-capacity-v1 | xtb@promotion-capacity-v1 |
| --- | --- | --- |
| Rodney Lee | 娱乐挑战型内容，跑步机推广意图弱 | 娱乐跳舞向，跑步机只是内容道具 |
| Gwen and Oliver | 宠物犬内容，跑步机更像宠物向，不适合人用推广 | 犬类宠物频道，和人用跑步机推广目标明显不符 |
| Treadmill Guy | 虽含 treadmill，但赛车/游戏娱乐向，非器材推广 | 赛车娱乐向，和跑步机推广场景不符 |
| Quentin Greco | 马戏/艺术为主，运动关联很弱 | 直命中但马戏/特技娱乐为主，不适合 |

## nox@promotion-capacity-v1-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 33 | Janine Delaney | 0 | 偏时尚美妆饮品，和跑步机相关性很弱 |
| 37 | Massy Arias | 0 | 亲子宗教标签偏多，缺少跑步机相关受众 |
| 46 | Dimitri / Dimi | -15 | 娱乐向账号，和跑步机推广明显不符 |
| 47 | Jason Rodelo | -10 | 搞笑娱乐向，缺少运动器械购买场景 |
| 58 | Mikebisping | 0 | 格斗播客向，和跑步机差距大 |
| 65 | JJ Howland | 0 | 恢复+格斗为主，缺少跑步机受众 |
| 71 | Pasha Grozdov | -15 | 娱乐笑料号，和产品推广不搭 |
| 79 | Good Sh*t Radio | 0 | 音乐娱乐向，与 treadmill 推广无关 |
| 80 | Christina Heinritz | 0 | 农场家居生活向，缺少健身器材相关语境 |
| 81 | Madison Prewett Troutt | 0 | 娱乐婚礼美容向，不适合 treadmill 推广 |
| 95 | Xandy Sutherland Nickel | 0 | 美食食谱向，与 treadmill 推广无关 |
| 103 | Emily Pack | 0 | 旅行情侣内容，和跑步机推广无关 |
| 104 | Athena Peros | -5 | 娱乐舞蹈向，和运动器材推广错位 |
| 111 | Chupey | -15 | 宠物账号，和人用跑步机明显不匹配 |
| 116 | Julia Arndt Shelton | Life-Aligned Career™ | 0 | 职场/效率内容，与跑步机无关 |
| 117 | Mr. Kitty | -15 | 猫宠物账号，属于明显错配 |
| 121 | Rolling Blue | -15 | 搞笑音乐娱乐号，和跑步机推广错位 |
| 127 | Craig McCloskey | 2 | 饮食/动物内容为主，和跑步机推广关联很弱 |
| 136 | Claire Ashley | Women Over 30 | Mom Hacks | Save Time | 0 | 母婴/美妆/穿搭为主，与跑步机推广不匹配 |
| 142 | Francesca LoChirco - Toddler mom | Lifestyle | Wellness | 1 | 日常/母婴生活为主，跑步机相关性很弱 |
| 144 | 📸❤️📍CALIFORNIA/ FLORIDA🌎LUXURY TRAVEL🚝 RV LIFE 🇺🇸 LA  • SF • MIA | 0 | 旅游杂项内容，几乎无跑步机相关性 |
| 145 | Nagehan Bicil | 0 | 家居穿搭美妆为主，与跑步机推广无关 |
| 146 | Meg Kilcup, PharmD, IHP | 1 | 母婴健康向，但缺少运动器材场景和购买导向 |
| 149 | Artificial Intelligence (Ai) •Technology • Robotics | 0 | AI/机器人内容与跑步机推广无关 |
| 159 | Kaitlyn | fat girl ✨just existing✨ | 0 | 服饰美妆号，与跑步机无关 |
| 168 | American Heart Association | 1 | 公共健康机构号，不是器材推广向 |
| 174 | Gülçe Şınık | 0 | 家居美妆亲子号，与跑步机无关 |
| 175 | memes by bepis | 0 | 无标签无内容，无法判断为相关 |
| 182 | Nick Pappas, MD | 0 | 医疗账号，与跑步机推广无关 |
| 184 | Space.Agency | 0 | 太空科技内容，与跑步机无关 |

## xtb@promotion-capacity-v1-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 3 | Sentral Fitnes | 0 | 无相关标签，缺乏跑步机受众或商品信号 |
| 9 | Javier Rojas | -10 | 舞蹈娱乐频道，与跑步机推广场景不符 |
| 13 | Raudah Fisika | 0 | 餐饮/育儿向内容，和跑步机转化链路不符 |
| 30 | Mark Raz | 0 | 内容与跑步机推广无关 |
| 31 | TiTi | 0 | 偏投资旅行时尚，与器械推广无关 |
| 33 | Devita | daily IRT 🌤 | 0 | 零食/电商号，和跑步机无关 |
| 35 | Наталья Третьяк | энергия | фитнес | туры | жизнь в кайф | 0 | 旅行时尚生活号，与跑步机无关 |
| 36 | Nicolette | 0 | 无标签，缺乏判断依据 |
| 43 | Studio Alta Performance | 0 | 无标签且无内容线索 |
| 53 | Markie markland | 0 | 旅行时尚号，和跑步机推广几乎无关 |
| 57 | 2gym.ir | 0 | 无标签无内容，无法判断为相关 |
| 58 | KAWARGI ® | 1 | 时尚服饰为主，和跑步机推广不匹配 |
| 60 | Evgeniia Segeda | 0 | 旅行时尚美妆号，与器材推广无关 |
| 63 | Gimnasios · Caminadoras · Spinning · Máquinas mantenimiento | 0 | 仅有泛标题，无跑步机相关标签 |
| 66 | Mohammad Mohammadi | 0 | 无标签无内容，相关性不足 |
| 72 | onlinegermanshop | 0 | 无标签无内容，无法支撑投放判断 |
| 76 | Rexfair Furniture | Home Furniture & Home Decor in Lagos | 0 | 家具家居号，缺少健身器材与跑步机信号 |
| 77 | Anamaria Ionescu | 1 | 家居生活向，只有弱相关 home |
| 81 | QazaQ Post | Курьер по КЗ | Карго Турция и Китай | 0 | 物流快递号，与跑步机品类无关 |
| 82 | JESUS MD | 0 | 泛个人号，缺少任何跑步机相关信号 |
| 86 | Sahil Soni | 0 | 美妆时尚号，和跑步机品类不匹配 |
| 91 | Dr. Nilton Pinheiro Guerra | 0 | 医疗测试号，和跑步机推广无关 |
| 94 | Ira Silvia | 0 | 美妆号，与跑步机品类不相关 |
| 95 | BERKAT_RU | 0 | 泛账号，无明确跑步机相关信号 |
| 102 | GYM, FITNESS, LOUNGE WEARS AND ACCESSORIES WHOLESALE SHOP | 0 | 仅健身服饰批发，和跑步机推广不匹配 |
| 103 | kettler.tn | 0 | 品牌名像器械商，但标签与内容证据不足 |
| 106 | 𝙴𝚋𝚋𝚢 🦋 | 0 | 家庭娱乐向账号，与跑步机推广无关 |
| 107 | dom w żagwinach 👩‍💼🧒🏼🧒🏼👨🏼‍💼🏠 | 0 | 家居装饰园艺账号，非运动器材场景 |
| 112 | sporsss | 0 | 无相关标签与内容证据 |
| 113 | Igwe James(Giacomo) | 0 | 时尚摄影账号，与跑步机不相关 |

## Notes
- Page-level rates use `page_size` from each run metadata.
- Cause categories are heuristic clusters from `why_short`; review representative rows before making product decisions.
