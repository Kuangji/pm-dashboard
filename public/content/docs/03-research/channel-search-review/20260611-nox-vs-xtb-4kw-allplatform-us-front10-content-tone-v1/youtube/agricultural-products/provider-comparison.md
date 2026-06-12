# Channel Search Provider Comparison

- keyword: agricultural products
- platform: youtube
- country: US
- left: nox@content-tone-llm-v1 (tmp/channel-search-review/20260611-nox-vs-xtb-4kw-allplatform-us-front10-content-tone-v1/youtube/agricultural-products/nox-youtube)
- right: xtb@content-tone-llm-v1 (tmp/channel-search-review/20260611-nox-vs-xtb-4kw-allplatform-us-front10-content-tone-v1/youtube/agricultural-products/xtb-youtube)
- left_rule_version: content-tone-llm-v1
- right_rule_version: content-tone-llm-v1
- left_prompt_hash: 1228e2ff575f
- right_prompt_hash: 1228e2ff575f

## Run Overview
| run | provider | rule_version | total | fit | adjacent | badcase | badcase率 | <0 | 0-9 | 10-19 | 20+ |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| nox@content-tone-llm-v1 | nox | content-tone-llm-v1 | 499 | 8 | 104 | 387 | 77.6% | 0 | 499 | 0 | 0 |
| xtb@content-tone-llm-v1 | xtb | content-tone-llm-v1 | 499 | 8 | 111 | 380 | 76.2% | 0 | 499 | 0 | 0 |

## Page-Level Badcase Rate
| page | nox@content-tone-llm-v1_total | nox@content-tone-llm-v1_badcase | nox@content-tone-llm-v1_badcase率 | xtb@content-tone-llm-v1_total | xtb@content-tone-llm-v1_badcase | xtb@content-tone-llm-v1_badcase率 | badcase率差 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 49 | 41 | 83.7% | 49 | 37 | 75.5% | 8.2% |
| 2 | 50 | 42 | 84.0% | 50 | 38 | 76.0% | 8.0% |
| 3 | 50 | 34 | 68.0% | 50 | 38 | 76.0% | -8.0% |
| 4 | 50 | 44 | 88.0% | 50 | 40 | 80.0% | 8.0% |
| 5 | 50 | 43 | 86.0% | 50 | 41 | 82.0% | 4.0% |
| 6 | 50 | 33 | 66.0% | 50 | 39 | 78.0% | -12.0% |
| 7 | 50 | 40 | 80.0% | 50 | 42 | 84.0% | -4.0% |
| 8 | 50 | 35 | 70.0% | 50 | 37 | 74.0% | -4.0% |
| 9 | 50 | 41 | 82.0% | 50 | 35 | 70.0% | 12.0% |
| 10 | 50 | 34 | 68.0% | 50 | 33 | 66.0% | 2.0% |

## Badcase Overlap
| metric | count |
| --- | --- |
| shared_badcase | 350 |
| nox@content-tone-llm-v1_only_badcase | 37 |
| xtb@content-tone-llm-v1_only_badcase | 30 |

## Badcase Cause Summary
| provider | category | count |
| --- | --- | --- |
| nox@content-tone-llm-v1 | 其他 | 231 |
| nox@content-tone-llm-v1 | 泛相关性偏离 | 65 |
| nox@content-tone-llm-v1 | 娱乐/儿童/泛内容偏离 | 45 |
| nox@content-tone-llm-v1 | 证据缺失或信号不足 | 38 |
| nox@content-tone-llm-v1 | 宠物/动物受众冲突 | 4 |
| nox@content-tone-llm-v1 | 科技/电子垂类偏离 | 4 |
| xtb@content-tone-llm-v1 | 其他 | 222 |
| xtb@content-tone-llm-v1 | 泛相关性偏离 | 61 |
| xtb@content-tone-llm-v1 | 娱乐/儿童/泛内容偏离 | 45 |
| xtb@content-tone-llm-v1 | 证据缺失或信号不足 | 41 |
| xtb@content-tone-llm-v1 | 科技/电子垂类偏离 | 8 |
| xtb@content-tone-llm-v1 | 宠物/动物受众冲突 | 3 |

## Shared Badcases
| channel | nox@content-tone-llm-v1 | xtb@content-tone-llm-v1 |
| --- | --- | --- |
| Stokes Twins | 恶搞挑战叙事为主，和农产品推广场景不匹配 | 恶搞短剧和挑战为主，和农业商品承接弱 |
| Alan's Universe | 舞蹈短剧情娱乐向，缺少农产品承载能力 | 粉丝向歌舞剧情号，几乎无农产品或消费内容 |
| Topper Guild | 极限整蛊挑战为主，不适合农产品合作推广 | 以整蛊、极限挑战和剧情冲突为主，不适合农产品 |
| A4 | 娱乐挑战和整活内容占主导，与农产品无关 | 儿童挑战和恶搞剧情号，和农业商品不相关 |
| Mark Rober | 科普工程向，不具农产品推广承载场景 | 工程实验和科普为主，没有农业/食品消费语境 |
| ✿ Kids Diana Show | 儿童剧情和玩乐内容为主，不适合农产品推广 | 主要是儿童剧情、玩具和家庭冒险，农业商品不搭 |
| IShowSpeed | 直播娱乐和体育向，和农产品推广不匹配 | 直播、体育和极端吃播为主，和农产品推广脱节 |
| MrBeast Gaming | 纯游戏挑战频道，和农产品推广无关 | 纯游戏频道，基本没有商品种草空间 |
| Jesser | 篮球技巧和挑战内容为主，与农产品无关 | 篮球体育频道，与农业商品几乎无关 |
| WWE | 摔角赛事内容为主，不适合农产品合作推广 | 摔角赛事受众偏体育娱乐，不适合农产品 |
| Ariana Grande | 音乐与巡演宣发频道，不具农产品推广场景 | 音乐内容，不具备农产品推广场景 |
| Dude Perfect | 技巧挑战和体育娱乐为主，与农产品无关 | 体育整活为主，农产品与受众不匹配 |
| Taylor Swift | 音乐人宣发频道，不适合农产品推广 | 音乐宣发频道，几乎没有商品类推广语境 |
| Toys and Colors | 儿童剧情玩乐为主，与农产品推广不匹配 | 儿童故事和角色扮演为主，农产品承接弱 |
| Markiplier | 游戏实况与恐怖游戏内容，不适合农产品推广 | 游戏解说和恐怖内容为主，不适合农产品 |
| EminemMusic | 音乐宣发内容，不具农产品合作承载能力 | 音乐发行频道，不适合农产品推广 |
| Baby Shark - Pinkfong Kids’ Songs & Stories | 儿童歌曲和故事内容，不适合农产品推广 | 幼儿儿歌频道，和农业商品受众不符 |
| Jordan Matter | 家庭挑战和情感向 vlog，不适合农产品推广 | 家庭剧情和挑战内容为主，缺少农产品场景 |
| skibidi | 动画短剧与农产品消费无关 | 发布内容全是 skibidi toilet 动画短剧，和农产品受众完全不符 |
| NichLmao | 整蛊挑战内容，不适合农产品推广 | 整频道是恶搞和挑战短视频，缺少农产品或消费决策场景 |
| Michael Jackson | 音乐纪念频道，缺少消费承接场景 | 音乐与纪念内容为主，和农产品推广几乎无交集 |
| Billie Eilish | 巡演表演为主，不适合农产品推广 | 巡演和现场表演内容为主，不具备农产品承载场景 |
| XXXTENTACION | 音乐作品频道，与农产品无关 | 全是音乐作品和纪录片，和农产品推广没有交集 |
| Drake | 纯音乐发布，和农产品无关 | 音乐 MV 和 lyric video 为主，无法承接农产品推广 |
| Brent Rivera | 整蛊剧情为主，缺少商品承载能力 | 整频道是家庭剧情和整蛊，和农产品品类几乎无关 |
| Zach King | 特效恶作剧为主，与农产品场景不符 | 魔术短片和品牌创意为主，缺少农产品或消费决策内容 |
| Marshmello | 音乐人频道，不对应农产品推广 | 音乐与巡演内容为主，和农产品受众不匹配 |
| Bruno Mars | 纯音乐巡演内容，受众不匹配 | 音乐发布为主，没有农产品相关内容或受众 |
| Beast Reacts | 反应娱乐频道，不适合农产品推广 | 反应和挑战内容为主，不是农产品消费决策频道 |
| ZHC | 艺术挑战为主，缺少农产品场景 | 艺术挑战和定制礼物为主，和农产品推广不相关 |

## nox@content-tone-llm-v1-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 1 | Cocomelon - Nursery Rhymes |  | 以儿歌启蒙为主，和农产品推广场景明显不搭 |
| 7 | Vlad and Niki |  | 亲子故事向，和农产品推广关联弱 |
| 8 | MrBeast 2 |  | 食物整活多于消费决策，农产品承载不足 |
| 12 | Like Nastya |  | 亲子娱乐占主导，农产品合作承接弱 |
| 13 | Zhong |  | 谜题整活和梗视频为主，不适合农产品推广 |
| 21 | Ben Azelart |  | 改造、整蛊和极限测试为主，不适合农产品 |
| 64 | _vector_ |  | 偏工具/玩具演示，但与农产品仍明显偏离 |
| 68 | Daniel LaBelle |  | 肢体喜剧和品牌合作为主，农产品承接力不足 |
| 84 | Danny Fitt |  | 短视频挑战和日常搞笑为主，缺少农产品承载 |
| 86 | Brianna |  | 家庭挑战和动物向内容，和农产品关联弱 |
| 91 | Vlad Samokatchik |  | 耐用品和挑战评测偏多，与农产品无关 |
| 133 | WB Kids |  | 儿童卡通频道，缺少农产品推广语境 |
| 147 | Pink Shirt Girl |  | 整蛊/挑战短视频，不适合农产品合作 |
| 150 | Hafu Go |  | 科学实验与小技巧频道，不是农产品垂类 |
| 175 | TED-Ed |  | 知识科普频道可以讲农业，但当前内容不指向农产品推广 |
| 181 | Chloe Ting |  | 健身教学号，和农产品购买场景不搭 |
| 188 | Speed McQueen |  | 偏搞笑生活短剧，农产品承接能力有限 |
| 198 | SIMJI |  | 生活分享偏婚礼和手作，不适合农产品推广 |
| 200 | Caylus |  | 游戏实况剧情号，不适合农产品合作 |
| 214 | Fabru Blacutt |  | 整活/Temu 测评，不是农产品品类 |
| 244 | The Anazala Family |  | 家庭vlog为主，但不具备农产品推广场景 |
| 290 | SMOL |  | 手工、食物梗和宠物短片为主，农业产品承接不足 |
| 339 | AsmrLinastar |  | 家庭育儿为主，虽有带货但与农产品不匹配 |
| 344 | ATHLEAN-X™ |  | 健身频道可接健康品，但与农产品主题仍偏离 |
| 345 | SOMOY TV |  | 新闻时政频道，缺少农产品推广的生活化语境 |
| 403 | 4plusone |  | 家庭日常/挑战类，不适合农产品推广 |
| 404 | FunnyMike |  | 恶搞家庭短视频为主，与农产品推广弱相关 |
| 410 | Dobre Brothers |  | 家庭整蛊娱乐频道，不适合农产品推广 |
| 412 | Alexa Rivera |  | 探险剧情向，非商品推广型频道 |
| 416 | ReelShort |  | 短剧内容，不适合农产品推广 |

## xtb@content-tone-llm-v1-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 35 | YouTube |  | 官方杂项内容，非垂类创作者号，农产品推广承载弱 |
| 41 | LooLoo Kids - Nursery Rhymes and Children's Songs |  | 儿童儿歌频道，目标受众与农产品推广不匹配 |
| 97 | Outdoor Boys |  | 频道以荒野求生、露营、狩猎为主，与农产品推广受众不匹配。 |
| 102 | The Tonight Show Starring Jimmy Fallon |  | 脱口秀访谈和喜剧综艺为主，缺少农业/食材/采购类承载场景 |
| 115 | Vsauce |  | 科普思辨频道偏知识内容，不是农产品种草或决策型频道 |
| 116 | Airrack |  | 极限整活和挑战内容，与农业产品推广不匹配 |
| 118 | penguinz0 |  | 评论型频道以热点吐槽为主，不适合农业产品合作推广 |
| 120 | Marques Brownlee |  | K-POP舞台内容与农业产品推广场景完全不同 |
| 145 | Rebecca Zamolo |  | 家庭挑战和恶作剧号，缺少农产品承接 |
| 146 | Peet Montzingo |  | 家庭恶作剧和自述内容，不适合农产品推广 |
| 167 | janin al chair |  | 整蛊手工生活内容，缺少农产品推广语境 |
| 252 | The ACE Family |  | 家庭生活娱乐为主，和农产品推广几乎无关 |
| 253 | 昕昕 |  | 以家庭短剧和整活为主，不适合农产品推广 |
| 271 | Disney Jr. |  | 儿童动画频道，和农产品推广场景不符 |
| 282 | Amp World |  | 挑战恶搞类频道，虽有少量食物内容但不适合农产品推广 |
| 293 | Jake Paul |  | 格斗/Vlog/名人生活内容为主，不适合农产品推广 |
| 298 | Dr Ryan |  | 实验道具和奇趣产品为主，不是农产品推广频道 |
| 299 | KEEMOKAZI |  | 家庭整蛊与奇葩测试内容，和农产品推广不匹配 |
| 303 | Blippi - Educational Videos for Kids |  | 儿童启蒙内容，虽有农场片段但不适合农业产品推广 |
| 308 | Влад и Никита |  | 儿童故事频道，和农业产品受众几乎无交集 |
| 316 | Like Nastya Show |  | 幼儿剧情频道，农业产品受众不匹配 |
| 317 | व्लाद और निकिता |  | 儿童故事与教育内容，不适合农业产品推广 |
| 321 | MoniLina |  | 儿童搞笑短剧频道，缺少农业产品推广场景 |
| 385 | Devon Rodriguez |  | 艺术访谈与街头绘画，不具农产品承载能力 |
| 392 | Camilla Araujo En Español |  | 豪车挑战和生活方式内容，不适合农产品推广 |
| 431 | Dental Digest |  | 口腔科科普频道，和农业商品无承接 |
| 435 | CrashCourse |  | 科普教育频道，不是农业消费频道 |
| 437 | Johny FamilyShow |  | 儿歌亲子频道，与农业产品无关 |
| 451 | Vlad and Niki ARA |  | 儿童家庭剧场，不适合农业商品 |
| 456 | Peachybbies |  | Slime 玩法号，和农业产品无自然关联 |

## Notes
- Page-level rates use `page_size` from each run metadata.
- Cause categories are heuristic clusters from `why_short`; review representative rows before making product decisions.
