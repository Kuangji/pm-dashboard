# Channel Search Provider Comparison

- keyword: agricultural products
- platform: tiktok
- country: US
- left: nox@content-tone-llm-v1 (tmp/channel-search-review/20260610-nox-vs-xtb-4kw-allplatform-us-front10-content-tone-v1/tiktok/agricultural-products/nox-tiktok)
- right: xtb@content-tone-llm-v1 (tmp/channel-search-review/20260610-nox-vs-xtb-4kw-allplatform-us-front10-content-tone-v1/tiktok/agricultural-products/xtb-tiktok)
- left_rule_version: content-tone-llm-v1
- right_rule_version: content-tone-llm-v1
- left_prompt_hash: 1228e2ff575f
- right_prompt_hash: 1228e2ff575f

## Run Overview
| run | provider | rule_version | total | fit | adjacent | badcase | badcase率 | <0 | 0-9 | 10-19 | 20+ |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| nox@content-tone-llm-v1 | nox | content-tone-llm-v1 | 500 | 150 | 218 | 132 | 26.4% | 0 | 500 | 0 | 0 |
| xtb@content-tone-llm-v1 | xtb | content-tone-llm-v1 | 500 | 178 | 202 | 120 | 24.0% | 0 | 500 | 0 | 0 |

## Page-Level Badcase Rate
| page | nox@content-tone-llm-v1_total | nox@content-tone-llm-v1_badcase | nox@content-tone-llm-v1_badcase率 | xtb@content-tone-llm-v1_total | xtb@content-tone-llm-v1_badcase | xtb@content-tone-llm-v1_badcase率 | badcase率差 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 50 | 9 | 18.0% | 50 | 8 | 16.0% | 2.0% |
| 2 | 50 | 10 | 20.0% | 50 | 13 | 26.0% | -6.0% |
| 3 | 50 | 7 | 14.0% | 50 | 5 | 10.0% | 4.0% |
| 4 | 50 | 9 | 18.0% | 50 | 10 | 20.0% | -2.0% |
| 5 | 50 | 9 | 18.0% | 50 | 10 | 20.0% | -2.0% |
| 6 | 50 | 9 | 18.0% | 50 | 17 | 34.0% | -16.0% |
| 7 | 50 | 13 | 26.0% | 50 | 10 | 20.0% | 6.0% |
| 8 | 50 | 18 | 36.0% | 50 | 13 | 26.0% | 10.0% |
| 9 | 50 | 28 | 56.0% | 50 | 14 | 28.0% | 28.0% |
| 10 | 50 | 20 | 40.0% | 50 | 20 | 40.0% | 0.0% |

## Badcase Overlap
| metric | count |
| --- | --- |
| shared_badcase | 47 |
| nox@content-tone-llm-v1_only_badcase | 85 |
| xtb@content-tone-llm-v1_only_badcase | 73 |

## Badcase Cause Summary
| provider | category | count |
| --- | --- | --- |
| nox@content-tone-llm-v1 | 其他 | 71 |
| nox@content-tone-llm-v1 | 泛相关性偏离 | 37 |
| nox@content-tone-llm-v1 | 证据缺失或信号不足 | 9 |
| nox@content-tone-llm-v1 | 娱乐/儿童/泛内容偏离 | 8 |
| nox@content-tone-llm-v1 | 宠物/动物受众冲突 | 7 |
| xtb@content-tone-llm-v1 | 其他 | 68 |
| xtb@content-tone-llm-v1 | 泛相关性偏离 | 31 |
| xtb@content-tone-llm-v1 | 证据缺失或信号不足 | 10 |
| xtb@content-tone-llm-v1 | 娱乐/儿童/泛内容偏离 | 9 |
| xtb@content-tone-llm-v1 | 科技/电子垂类偏离 | 2 |

## Shared Badcases
| channel | nox@content-tone-llm-v1 | xtb@content-tone-llm-v1 |
| --- | --- | --- |
| Ramato Dana Halaba | 多是个人/社区动态和话题标签，几乎看不到农业内容 | 个人娱乐内容，和农业无关 |
| David Shapiro | 偏资本市场和投资资讯，和农业产品推广无关 | 主体是投融资和上市公司资讯，农业不是其主要内容 |
| Work Process | 回收、轮胎和金属加工为主，不是农业频道 | 工业回收视频为主，和农业商品调性不合 |
| Paul Schriner | 以保健补剂带货为主，和农产品受众不匹配 | 主要卖保健补剂，和农产品受众不匹配 |
| Michelle | 强烈反动物农业立场，和农业品类推广存在冲突 | 核心是反动物产品/纯素倡议，和农产品推广冲突 |
| Ertl | 内容主要是农场玩具/模型与收藏，不是农产品或农资消费场景。 | 主体是农场玩具与模型，受众不是农产品购买人群 |
| James Grace | 几乎全是航拍、地产、赛事和风景，与农业产品推广无关。 | 内容是航拍、地产、赛事与风景，农业产品承载力弱 |
| china new car or used car | 内容全是汽车出口、新车二手车交易，与农业产品完全无关。 | 全是汽车出口与车源信息，和农业产品无关 |
| LUR GcB | 纯科幻文明设定内容，与农业产品推广完全不搭。 | 宇宙哲学类内容，与农业商品完全不相干 |
| 🎖️ Shadow Gamer🎖️ | 纯游戏剪辑，和农业产品无关 | 纯游戏剪辑频道，与农业商品受众和承载场景明显不符 |
| TheSchoolTourChris | 校园音乐与STEAM活动，和农业产品无关 | 学校演出和音乐公益为主，与农业商品完全不匹配 |
| 😎 | 娱乐段子和杂乱搬运，农业属性缺失 | 主要是梗图和随笔，和农业商品毫无关系 |
| wetdiddyfart | 悬疑段子、流量内容和抽象梗，农业无关 | 恶搞、体育博彩和娱乐内容，不适合农产品推广 |
| AK Poku Law | 移民法律新闻与获客内容，和农业产品受众和消费场景明显不符 | 法律与移民资讯频道，与农业产品完全不匹配 |
| Niza Lifestyle | 核心是建筑、木工、家居搭建，和农业产品推广场景脱节 | 以建筑和家居施工为主，几乎无农业内容 |
| 𝓻𝓾𝓫𝔂𝔂𝔂💕 | 纯Kpop粉圈内容，与农业产品完全无关 | 核心是K-pop娱乐内容，和农业产品完全无关 |
| Daily Historian | 纯历史科普，受众与农业产品购买场景不匹配 | 纯历史内容，和农产品推广无关 |
| US History Today 🇺🇸 | 纯美国历史内容，与农业无关 | 纯历史叙事频道，与农业产品受众和内容都不匹配 |
| Dji Horror | 惊悚故事号，和农产品受众不匹配 | 恐怖故事和地方传说频道，与农产品受众完全不搭 |
| Unknownfacts | 鬼城/地理冷知识号，农业属性很弱 | 以鬼城、历史地理科普为主，和农产品无关 |
| Dr. Bertrhude Albert | 纯身份/文化/公益内容，与农业商品推广无关 | 海地文化、体育和社会新闻号，与农业产品无关。 |
| J | 纯知识科普/地理历史杂项，和农业商品推广无关 | 完全无关的百科和地理杂谈 |
| Crystal Heath | 以兽医争议和动物权利议题为主，和农产品推广受众明显冲突 | 以动物权倡议和反畜牧叙事为主，不利于农产品推广。 |
| povertysquatter🇬🇷🇨🇦 | 主体是健身/杂文/娱乐混杂，农业内容极弱且不成调性 | 内容基本是健身、杂谈和拼贴长文，和农产品无关。 |
| BNC Tech Iron Cast | 工业铸造/锻造账号，农业只是一小类应用，不适合农产品推广 | 主要是工业锻造机加工，几乎无农业受众 |
| charliesacres | 动物庇护所和反动物农业立场，明显不适合农产品合作 | 动物权益/素食倡议号，立场与动物类农业产品推广直接冲突。 |
| 🌎 THE GREAT HISTORY 🌎 | 历史/地缘新闻号，农业只是偶发话题，不具备农产品推广承载力 | 主要是国际政治历史解说，与农业商品毫无对应关系。 |
| Dekku | 纯素立场强烈，公开反对动物产品，不适合农产品推广 | 纯素食观点输出，和农业产品合作目标不一致 |
| Eco Friendly Everything | 纯环保转发号，缺少农业/农产品承载语境 | 以环保二创和泛流量内容为主，缺少农业或农产品承载 |
| L'Union Suite | 体育和海地时政文化为主，与农业产品不匹配 | 海地新闻与体育社区号，和农业产品受众明显不匹配。 |

## nox@content-tone-llm-v1-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 2 | Power Service Products |  | 内容是柴油添加剂和车队保养，与农业产品无关 |
| 10 | Notes on Iowa |  | 以爱荷华历史为主，农业相关只占极少部分 |
| 32 | labor protection gloves |  | 主业是手套工厂招募与出货，农业只是弱标签 |
| 46 | Aly Moore |  | 以食虫科普和争议倡议为主，和常规农产品推广不匹配 |
| 79 | Plasticizer DOP DOTP |  | 工业塑化剂与PVC话题，和农产品不符 |
| 92 | StreetRecords |  | 烹饪和娱乐混杂，缺少农业产品受众 |
| 204 | perforated plate |  | 核心是金属冲孔板工业推广，与农业产品无关 |
| 208 | Ruimin Hydraulic Co., Ltd. |  | 主要是液压泵和重工配件，与农产品不相关 |
| 292 | Drylet |  | 污水/粪污治理为主，农业属性不够直接 |
| 331 | Mary_pellet |  | 内容是木颗粒/秸秆颗粒机械，和农产品推广场景不匹配 |
| 332 | Jes282010🌊 |  | 娱乐、情绪和梗图为主，几乎无农业或商品承载能力 |
| 335 | AR_Vox |  | 政治评论和随机话题为主，与农产品推广无关 |
| 337 | Kaitlyn ✨ Photographer |  | 摄影、旅行和自然题材为主，不具农产品推广承载场景 |
| 338 | 1traderdrysdale |  | 交易、加密和投资为主，与农产品消费或采购完全不搭 |
| 342 | A Spice For Travel |  | 旅行餐饮为主，农业主题只偶尔点到，推广承载弱 |
| 344 | 🌞Cat-er-ina🌞 |  | 政论、社会议题和个人表达为主，几乎无农业商品场景 |
| 346 | katrina_in_washington |  | 房贷经纪与社交杂帖为主，农业内容只是行程点缀 |
| 347 | Brianna Tucker |  | 摄影、婚礼和翻房为主，和农产品受众不匹配 |
| 349 | peta2 | ur vegan bestie <3 |  | 主张反动物农业和纯素，不适合做农产品合作推广 |
| 353 | Adrienne Barker, MAS |  | 礼仪/职场/宣讲为主，与农业商品推广不搭 |
| 356 | 🃏🔥 Nightwing_Ascending 🔥🃏 |  | 灵修/音乐/AI杂感为主，几乎无农业承载 |
| 358 | Kasey Swanson |  | 宠物日常与情绪吐槽为主，无农业受众 |
| 359 | Louis Capet XXVI Records |  | 音乐/活动宣传账号，不是农业商品场景 |
| 368 | deadeye_outdoors™️ |  | 野外科普/狩猎历史号，不是农业产品推广场景 |
| 370 | Spring Forward Club |  | 健康/美妆/自我提升号，与农业商品无关 |
| 371 | Elerine De’Carrie McMurry LLC |  | 医疗科普与就医经历为主，不是农业场景 |
| 372 | Dr. Simón Alvarez |  | 历史/文化叙事为主，不具农业商品承载力 |
| 373 | Suglyboy |  | 内容以黑人历史、城市史和动漫梗为主，不具农业品推广承载力 |
| 377 | House of Nails 💅🏽 |  | 主体是美甲教学和产品推荐，与农业产品无关 |
| 378 | Kristi_ redefiningself |  | 历史/社会议题叙事，缺少农业或消费承接 |

## xtb@content-tone-llm-v1-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 6 | Guttywillfixyourc |  | 内容以泛娱乐、就业、情绪话题为主，几乎没有农业受众 |
| 9 | LANDIO |  | 核心是土地房产出售，不是农产品或农业消费内容 |
| 38 | NTPA |  | 赛车拖曳赛事为主，农业关联很弱 |
| 79 | monaduan1 |  | 化工硅油原料为主，和农业商品受众不匹配 |
| 81 | Juan Baumgardner |  | 个人杂乱长文，缺少稳定农业内容和商品承载 |
| 92 | Wanplas |  | 塑料机械内容为主，缺少农业或农产品语境 |
| 96 | rashawnstacey |  | 汽修、音乐、家庭混杂，农业商品受众不成立 |
| 97 | ansleycarson3 |  | 赠品、游戏和娱乐内容，缺少农业语境 |
| 98 | glendadora0 |  | 船、恶搞和碎片内容为主，农业属性很弱 |
| 171 | Lions Transport / Carlos Leon |  | 纯卡车运输和物流新闻，和农业产品无关 |
| 177 | Extra Acres Land Deals |  | 主营土地房源，不是农产品或农业消费内容 |
| 178 | Dennis | MO Realtor |  | 以农地交易和土地价值为主，非农产品频道 |
| 198 | BLACK HISTORY 365 |  | 历史人物和发明故事号，非农业频道 |
| 200 | CA-NV-Outdoor-Properties |  | 核心是牧场地产销售，不是农产品推广 |
| 202 | METAGENE MELANIN |  | 内容混杂仇恨、战争和阴谋叙事，与农产品推广明显不符。 |
| 222 | Wilbur-Ellis Careers |  | 主要是农业岗位招聘，不是产品内容。 |
| 236 | Mary Life |  | 乡村家庭剧情为主，缺少稳定的农产品或农业商业表达 |
| 237 | MITV |  | 泛娱乐/国际资讯频道，和农产品推广链路不匹配 |
| 254 | Michael Moeller | Kentucky |  | 历史叙事账号，内容与农业产品推广几乎无关。 |
| 266 | Armchair Engineer |  | 主要讲工程、桥梁、水坝与运输，不具备农业产品推广场景。 |
| 290 | Monarch Botanika |  | 主线是授粉昆虫保护和护肤品，不适合农产品合作 |
| 303 | JJ Hampton | Texas Real Estate |  | 主要是德州房产和穿搭生活，和农业商品推广关联很弱。 |
| 312 | Huaming Steven |  | 核心是塑料管材挤出设备，工业属性强，和农业商品不匹配。 |
| 346 | Emily Delgado |  | 以马术、选美和个人生活为主，缺少农产品承载 |
| 348 | ConsciousMuscle |  | 长期反对畜牧和动物产品，和农业推广明显冲突 |
| 350 | Morgan~FTM~Virtual Assistant |  | 主要是育儿和VA服务，几乎没有农业内容 |
| 356 | liz 🌱🥕🪱🤎 |  | 核心是素食旅行和动物议题，与农业商品推广不匹配 |
| 358 | africanheritagecity |  | 文化历史号，与农业商品和购买决策几乎无关 |
| 359 | Switch4Good |  | 反乳制品立场明显，和多数农业商品推广方向冲突 |
| 363 | Lynn Richardson |  | 理财和创收内容为主，与农业商品无直接关系 |

## Notes
- Page-level rates use `page_size` from each run metadata.
- Cause categories are heuristic clusters from `why_short`; review representative rows before making product decisions.
