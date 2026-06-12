# Channel Search Provider Comparison

- keyword: beauty
- platform: youtube
- country: US
- left: nox@content-tone-llm-v1 (tmp/channel-search-review/20260611-nox-vs-xtb-4kw-allplatform-us-front10-content-tone-v1/youtube/beauty/nox-youtube)
- right: xtb@content-tone-llm-v1 (tmp/channel-search-review/20260611-nox-vs-xtb-4kw-allplatform-us-front10-content-tone-v1/youtube/beauty/xtb-youtube)
- left_rule_version: content-tone-llm-v1
- right_rule_version: content-tone-llm-v1
- left_prompt_hash: 1228e2ff575f
- right_prompt_hash: 1228e2ff575f

## Run Overview
| run | provider | rule_version | total | fit | adjacent | badcase | badcase率 | <0 | 0-9 | 10-19 | 20+ |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| nox@content-tone-llm-v1 | nox | content-tone-llm-v1 | 499 | 22 | 145 | 332 | 66.5% | 0 | 499 | 0 | 0 |
| xtb@content-tone-llm-v1 | xtb | content-tone-llm-v1 | 499 | 21 | 104 | 374 | 74.9% | 0 | 499 | 0 | 0 |

## Page-Level Badcase Rate
| page | nox@content-tone-llm-v1_total | nox@content-tone-llm-v1_badcase | nox@content-tone-llm-v1_badcase率 | xtb@content-tone-llm-v1_total | xtb@content-tone-llm-v1_badcase | xtb@content-tone-llm-v1_badcase率 | badcase率差 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 49 | 42 | 85.7% | 49 | 43 | 87.8% | -2.0% |
| 2 | 50 | 22 | 44.0% | 50 | 32 | 64.0% | -20.0% |
| 3 | 50 | 28 | 56.0% | 50 | 39 | 78.0% | -22.0% |
| 4 | 50 | 43 | 86.0% | 50 | 46 | 92.0% | -6.0% |
| 5 | 50 | 36 | 72.0% | 50 | 35 | 70.0% | 2.0% |
| 6 | 50 | 23 | 46.0% | 50 | 29 | 58.0% | -12.0% |
| 7 | 50 | 39 | 78.0% | 50 | 39 | 78.0% | 0.0% |
| 8 | 50 | 34 | 68.0% | 50 | 33 | 66.0% | 2.0% |
| 9 | 50 | 36 | 72.0% | 50 | 36 | 72.0% | 0.0% |
| 10 | 50 | 29 | 58.0% | 50 | 42 | 84.0% | -26.0% |

## Badcase Overlap
| metric | count |
| --- | --- |
| shared_badcase | 306 |
| nox@content-tone-llm-v1_only_badcase | 26 |
| xtb@content-tone-llm-v1_only_badcase | 68 |

## Badcase Cause Summary
| provider | category | count |
| --- | --- | --- |
| nox@content-tone-llm-v1 | 其他 | 204 |
| nox@content-tone-llm-v1 | 证据缺失或信号不足 | 41 |
| nox@content-tone-llm-v1 | 娱乐/儿童/泛内容偏离 | 40 |
| nox@content-tone-llm-v1 | 泛相关性偏离 | 39 |
| nox@content-tone-llm-v1 | 科技/电子垂类偏离 | 5 |
| nox@content-tone-llm-v1 | 宠物/动物受众冲突 | 3 |
| xtb@content-tone-llm-v1 | 其他 | 235 |
| xtb@content-tone-llm-v1 | 泛相关性偏离 | 50 |
| xtb@content-tone-llm-v1 | 证据缺失或信号不足 | 43 |
| xtb@content-tone-llm-v1 | 娱乐/儿童/泛内容偏离 | 35 |
| xtb@content-tone-llm-v1 | 科技/电子垂类偏离 | 7 |
| xtb@content-tone-llm-v1 | 宠物/动物受众冲突 | 4 |

## Shared Badcases
| channel | nox@content-tone-llm-v1 | xtb@content-tone-llm-v1 |
| --- | --- | --- |
| Stokes Twins | 以整蛊和夸张挑战为主，缺少美妆或消费决策承载场景 | 以恶搞、逃脱、学校挑战为主，不是美妆受众 |
| Alan's Universe | 频道核心是剧情短片和粉丝互动，和美妆推广关联很弱 | 音乐剧情与粉丝向内容为主，缺少美妆决策语境 |
| Topper Guild | 极限挑战和整蛊内容为主，不适合承接美妆商品推广 | 整蛊挑战频道，和美妆商品推广明显不相干 |
| A4 | 典型搞笑挑战频道，受众和美妆品类没有自然连接 | 剧情挑战和角色扮演为主，不适合美妆推广 |
| Mark Rober | 科学工程实验型频道，不是美妆或生活方式消费场景 | 科普工程向内容，和美妆品类相关性很弱 |
| Vlad and Niki | 亲子剧情和玩具冒险为主，难以自然承接美妆商品推广 | 儿童剧情玩乐向，受众与美妆商品不匹配 |
| MrBeast 2 | 强娱乐和食品向内容，和美妆品类受众不一致 | 挑战吃播和品牌游戏化内容，不是美妆受众 |
| ✿ Kids Diana Show | 儿童冒险和玩乐剧情为主，不适合美妆类商品转化 | 儿童冒险玩具频道，和美妆商品受众偏离很大 |
| IShowSpeed | 直播、赛事和极限旅行内容占主导，与美妆推广不匹配 | 以体育直播和整活为主，缺少美妆承接能力 |
| MrBeast Gaming | 游戏挑战频道，核心受众与美妆商品推广场景不一致 | 游戏竞技频道，和美妆购买场景不相关 |
| Zhong | 以挑战、谜题和整蛊为主，缺少美妆承载能力 | 解谜整活频道，与美妆商品推广不匹配 |
| Jesser | 运动技巧和搞笑实验为主，不适合美妆商品推广 | 体育技巧和挑战内容，缺少美妆消费决策人群 |
| WWE | 职业摔角赛事频道，与美妆品类受众和场景不匹配 | 摔角赛事频道，与美妆推广受众明显不一致 |
| Ariana Grande | 明星音乐频道为主，缺少美妆内容形态与转化场景 | 音乐发行频道，和美妆产品推广关联很弱 |
| Nick DiGiovanni | 美食烹饪频道，和美妆商品没有自然关联 | 美食烹饪频道，和美妆商品目标受众不一致 |
| Dude Perfect | 体育娱乐和特技挑战为主，不是美妆推广场景 | 运动娱乐挑战为主，不是美妆消费场景 |
| Taylor Swift | 音乐发布型频道，和美妆品类缺少内容和受众连接 | 音乐发行内容为主，缺少美妆受众与语境 |
| Toys and Colors | 儿童故事和角色扮演为主，不具备美妆消费承载力 | 亲子玩乐频道，与成人美妆商品不匹配 |
| Ben Azelart | 极限改造和挑战内容为主，与美妆推广不一致 | 极限改造和整活内容，不属于美妆决策频道 |
| Markiplier | 游戏实况和恐怖冒险频道，不适合美妆商品合作 | 恐怖游戏实况频道，和美妆商品目标人群不一致 |
| EminemMusic | 说唱/音乐频道与美妆品类缺少直接承接关系 | 音乐人频道，和美妆商品承接场景不匹配 |
| Baby Shark - Pinkfong Kids’ Songs & Stories | 儿童歌曲与动画频道，和美妆商品合作场景不匹配 | 幼儿动画频道，与美妆商品受众完全错位 |
| skibidi | 动画娱乐频道，与美妆商品受众和承载场景都不匹配 | 动画短剧频道，与美妆消费受众明显不符 |
| NichLmao | 整蛊短视频为主，不具备美妆推广语境 | 恶搞挑战短视频，不具美妆承载能力 |
| Michael Jackson | 音乐人官方频道，内容与美妆商品不相干 | 音乐纪念/演出频道，和美妆推广无关 |
| Billie Eilish | 音乐巡演内容为主，不适合美妆品合作推广 | 巡演和现场表演为主，不适合美妆转化 |
| XXXTENTACION | 嘻哈音乐频道，受众和内容调性都不匹配美妆 | 说唱音乐频道，受众与美妆商品不匹配 |
| Drake | 音乐内容为主，缺少美妆承载语境 | 音乐人频道，不具美妆推广场景 |
| Brent Rivera | 偏整蛊和剧情短视频，不是美妆消费内容 | 整蛊剧情频道，缺少美妆受众和决策内容 |
| That Little Puff | 宠物烹饪向内容，与人用美妆商品明显不符 | 猫咪美食内容，与美妆完全不同类 |

## nox@content-tone-llm-v1-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 1 | Cocomelon - Nursery Rhymes |  | 长期内容是儿歌、启蒙和儿童玩乐，和美妆/美容消费场景不匹配 |
| 35 | YouTube |  | 平台官方混合内容号，缺少稳定美妆推广场景 |
| 72 | Lucas and Marcus |  | 恶搞剧情和情侣梗为主，和美妆商品不匹配 |
| 128 | Daily Dose Of Internet |  | 泛娱乐短视频，内容猎奇搞笑，不承接美妆商品决策。 |
| 152 | Emmie's Wonder Wardrobe |  | 儿童歌舞与公主变装内容，非美妆护肤受众 |
| 225 | Kai Cenat Live |  | 直播娱乐和好友整活为主，不是美妆决策内容 |
| 236 | Doctor Mike |  | 医学科普为主，美妆推广链路弱 |
| 244 | The Anazala Family |  | 家庭生活号，缺少美妆内容承载 |
| 250 | ANYA KOVA |  | 舞蹈和动画二创号，美妆承载不足 |
| 278 | JaidenAnimations |  | 动画吐槽向，和beauty商品受众不匹配 |
| 280 | marrkadams |  | 以家庭喜剧短剧为主，缺少商品承载点 |
| 282 | Amp World |  | 挑战整蛊号，不是美妆消费场景 |
| 285 | David Dobrik |  | 偏生活整活，缺少明确美妆内容 |
| 299 | KEEMOKAZI |  | 整蛊家庭号，缺少美妆消费语境 |
| 301 | mmmjoemele |  | 家庭/游戏/整蛊内容，和beauty商品无关 |
| 346 | BullyJuice |  | 家庭运动日常频道，和美妆推广关联弱 |
| 382 | ItsFunneh |  | 游戏实况频道，缺少美妆受众与种草语境 |
| 384 | PDK Films |  | NERF对战和破坏类内容，和美妆商品受众不匹配 |
| 389 | GuiGe |  | 短剧搞笑账号，和美妆种草关系弱 |
| 390 | chefkoudy |  | 全是食物制作和吃播情节，不适合美妆商品 |
| 395 | Dylan Anderson |  | 情绪故事向短内容，缺少美妆购买决策语境 |
| 400 | WigoFellas |  | 恶搞整蛊频道，和美妆商品调性不搭 |
| 427 | Miley Cyrus |  | 纯音乐发行为主，几乎无美妆/个护承载内容 |
| 428 | Doja Cat |  | 以音乐宣发为主，beauty相关仅是氛围词 |
| 429 | Mariah Carey |  | 歌手频道，内容不围绕美妆个护消费 |
| 433 | Lindsey Stirling |  | 音乐与巡演内容为主，和beauty商品不直连 |

## xtb@content-tone-llm-v1-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 1 | MrBeast |  | 挑战整蛊向，和美妆消费决策场景不匹配 |
| 12 | Like Nastya |  | 儿童教育娱乐为主，不是美妆商品的目标受众 |
| 48 | The Royalty Family |  | 家庭剧情频道，缺少美妆消费语境 |
| 52 | Justin Flom |  | 魔术整活和家居机关为主，和美妆商品受众不匹配 |
| 68 | Daniel LaBelle |  | 肢体喜剧与生活段子为主，不适合美妆承接 |
| 79 | Dhar Mann Studios |  | 短剧叙事为主，和美妆产品推广场景不贴合 |
| 80 | Zach Choi |  | 核心是吃播料理，缺少美妆相关受众与场景 |
| 81 | Prime Video India |  | 影视宣发频道，不具备美妆种草场景 |
| 83 | VanossGaming |  | 游戏整活频道，和美妆购买决策几乎无关 |
| 84 | Danny Fitt |  | 体育挑战和家庭日常为主，缺少美妆调性 |
| 89 | TEDx Talks |  | 演讲内容偏知识传播，不是美妆种草频道 |
| 90 | Marta and Rustam |  | 食物整蛊和吃法内容，与美妆受众不一致 |
| 93 | Maroon 5 |  | 乐队音乐频道，缺少美妆消费内容与承载方式 |
| 96 | Дима Масленников |  | 探险挑战和生存整活为主，与美妆场景不相干 |
| 102 | The Tonight Show Starring Jimmy Fallon |  | 晚间访谈娱乐为主，缺少美妆/美丽类承接场景 |
| 104 | Clean Girl |  | 内容是清洁整活，不是美妆消费场景 |
| 108 | Amaury Guichon |  | 巧克力雕塑创作频道，非美妆品类受众 |
| 114 | SSundee |  | 游戏频道，和美妆商品受众基本无关 |
| 115 | Vsauce |  | 科普频道偏知识表达，不是美妆内容池 |
| 116 | Airrack |  | 挑战整活频道，与美妆品类关联很弱 |
| 118 | penguinz0 |  | 吐槽评论频道，无美妆承载能力 |
| 119 | PopularMMOs |  | 游戏与个人经历混合，和美妆不相干 |
| 120 | Marques Brownlee |  | 科技评测强，但与美妆商品品类不匹配 |
| 123 | Mnet K-POP |  | K-POP舞台频道，和美妆商品受众不稳定匹配 |
| 124 | Elsa Arca |  | 短视频搞笑梗频道，没有美妆主题 |
| 125 | surthany hejeij |  | 美食/Vlog频道，不是美妆品类场景 |
| 163 | Apple |  | 科技发布与设备教程为主，不是美妆品类受众 |
| 170 | SlivkiShow |  | 实验、改造、测评型内容偏科技和动物，缺少美妆承载点 |
| 178 | Like Nastya ESP |  | 儿童故事向，和成人美妆推广不匹配 |
| 187 | Olivia Rodrigo |  | 音乐推广为主，缺少美妆内容证据 |

## Notes
- Page-level rates use `page_size` from each run metadata.
- Cause categories are heuristic clusters from `why_short`; review representative rows before making product decisions.
