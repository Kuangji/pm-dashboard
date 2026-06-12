# Channel Search Provider Comparison

- keyword: baby supplement
- platform: youtube
- country: US
- left: nox@content-tone-llm-v1 (tmp/channel-search-review/20260611-nox-vs-xtb-4kw-allplatform-us-front10-content-tone-v1/youtube/baby-supplement/nox-youtube)
- right: xtb@content-tone-llm-v1 (tmp/channel-search-review/20260611-nox-vs-xtb-4kw-allplatform-us-front10-content-tone-v1/youtube/baby-supplement/xtb-youtube)
- left_rule_version: content-tone-llm-v1
- right_rule_version: content-tone-llm-v1
- left_prompt_hash: 1228e2ff575f
- right_prompt_hash: 1228e2ff575f

## Run Overview
| run | provider | rule_version | total | fit | adjacent | badcase | badcase率 | <0 | 0-9 | 10-19 | 20+ |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| nox@content-tone-llm-v1 | nox | content-tone-llm-v1 | 499 | 8 | 150 | 341 | 68.3% | 0 | 499 | 0 | 0 |
| xtb@content-tone-llm-v1 | xtb | content-tone-llm-v1 | 499 | 7 | 149 | 343 | 68.7% | 0 | 499 | 0 | 0 |

## Page-Level Badcase Rate
| page | nox@content-tone-llm-v1_total | nox@content-tone-llm-v1_badcase | nox@content-tone-llm-v1_badcase率 | xtb@content-tone-llm-v1_total | xtb@content-tone-llm-v1_badcase | xtb@content-tone-llm-v1_badcase率 | badcase率差 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 49 | 30 | 61.2% | 49 | 36 | 73.5% | -12.2% |
| 2 | 50 | 33 | 66.0% | 50 | 37 | 74.0% | -8.0% |
| 3 | 50 | 28 | 56.0% | 50 | 29 | 58.0% | -2.0% |
| 4 | 50 | 34 | 68.0% | 50 | 33 | 66.0% | 2.0% |
| 5 | 50 | 42 | 84.0% | 50 | 38 | 76.0% | 8.0% |
| 6 | 50 | 31 | 62.0% | 50 | 33 | 66.0% | -4.0% |
| 7 | 50 | 38 | 76.0% | 50 | 40 | 80.0% | -4.0% |
| 8 | 50 | 34 | 68.0% | 50 | 38 | 76.0% | -8.0% |
| 9 | 50 | 35 | 70.0% | 50 | 27 | 54.0% | 16.0% |
| 10 | 50 | 36 | 72.0% | 50 | 32 | 64.0% | 8.0% |

## Badcase Overlap
| metric | count |
| --- | --- |
| shared_badcase | 303 |
| nox@content-tone-llm-v1_only_badcase | 38 |
| xtb@content-tone-llm-v1_only_badcase | 40 |

## Badcase Cause Summary
| provider | category | count |
| --- | --- | --- |
| nox@content-tone-llm-v1 | 其他 | 179 |
| nox@content-tone-llm-v1 | 泛相关性偏离 | 69 |
| nox@content-tone-llm-v1 | 娱乐/儿童/泛内容偏离 | 46 |
| nox@content-tone-llm-v1 | 证据缺失或信号不足 | 38 |
| nox@content-tone-llm-v1 | 科技/电子垂类偏离 | 5 |
| nox@content-tone-llm-v1 | 宠物/动物受众冲突 | 4 |
| xtb@content-tone-llm-v1 | 其他 | 191 |
| xtb@content-tone-llm-v1 | 泛相关性偏离 | 63 |
| xtb@content-tone-llm-v1 | 娱乐/儿童/泛内容偏离 | 39 |
| xtb@content-tone-llm-v1 | 证据缺失或信号不足 | 35 |
| xtb@content-tone-llm-v1 | 科技/电子垂类偏离 | 8 |
| xtb@content-tone-llm-v1 | 宠物/动物受众冲突 | 7 |

## Shared Badcases
| channel | nox@content-tone-llm-v1 | xtb@content-tone-llm-v1 |
| --- | --- | --- |
| Stokes Twins | 恶搞挑战向，受众与婴儿营养品不匹配 | 恶搞挑战频道，不适合婴儿营养类推广 |
| Alan's Universe | 舞蹈娱乐号，缺少母婴消费承接 | 娱乐短剧/舞蹈向，缺少育儿或健康语境 |
| Topper Guild | 挑战整蛊号，和母婴补剂受众冲突 | 高刺激挑战和恶搞内容，不适合婴儿补剂 |
| A4 | 夸张挑战与恶搞内容，不适合母婴品 | 儿童冒险挑战为主，非育儿健康内容 |
| MrBeast 2 | 泛娱乐高流量，但不贴母婴决策 | 食品挑战频道，不是婴儿营养决策场景 |
| IShowSpeed | 强娱乐直播，受众与母婴不符 | 直播娱乐和体育梗内容，和婴儿补剂无关 |
| MrBeast Gaming | 游戏挑战向，不适合婴儿补剂 | 游戏频道，几乎没有婴儿或育儿承载能力 |
| Zhong | 整活挑战号，缺少母婴消费场景 | 挑战搞笑频道，和婴儿补剂受众不符 |
| Jesser | 体育挑战向，非母婴受众 | 篮球/体育挑战内容，不适合婴儿补剂推广 |
| WWE | 格斗赛事内容，不适合母婴商品 | 摔跤赛事内容，与婴儿补剂场景冲突 |
| Ariana Grande | 音乐艺人频道，缺少商品承载 | 音乐人账号，和婴儿营养产品不匹配 |
| Dude Perfect | 体育娱乐号，和母婴补剂不对口 | 运动挑战娱乐频道，不适合婴儿补剂推广 |
| Taylor Swift | 音乐内容与婴儿补剂受众完全脱节 | 音乐宣发账号，几乎没有商品承载语境 |
| Ben Azelart | 极限挑战整活，不像母婴频道 | 极限改造和挑战内容，和婴儿补剂无关 |
| Markiplier | 游戏恐怖娱乐，和母婴不符 | 游戏/恐怖实况频道，不适合婴儿补剂推广 |
| EminemMusic | 音乐说唱频道，不承载母婴补剂 | 音乐频道，和婴儿补剂推广几乎无关 |
| skibidi | 全是《Skibidi Toilet》动画剧情，和婴儿营养品受众完全不搭 | 长期纯Skibidi动画剧情，和婴儿营养/用品受众不符。 |
| NichLmao | 整频道是整蛊和挑战短视频，没有母婴或健康决策内容 | 整蛊、猜题和搞笑短视频为主，不是母婴消费场景。 |
| Michael Jackson | 歌手纪念和音乐内容为主，不具备婴儿营养品推广语境 | 全是Michael Jackson音乐/演出内容，非婴儿消费场景。 |
| Billie Eilish | 音乐巡演与现场表演内容，受众不匹配婴儿营养品 | 以巡演和音乐宣发为主，不适合婴儿补充剂推广。 |
| XXXTENTACION | 音乐人官方音频内容，和母婴消费场景无关 | 全是说唱歌曲和纪录片预告，和母婴用品无关。 |
| Drake | 纯音乐人频道，几乎没有商品评测或育儿受众 | 全是Drake音乐发布与歌词视频，非婴儿受众。 |
| That Little Puff | 猫咪厨房整活频道，内容与婴儿补剂受众不一致 | 以猫咪整蛊和料理为主，不是母婴场景。 |
| Zach King | 魔术特效和恶搞短片，不适合婴儿营养品推广 | 特效魔术和恶作剧短片为主，不贴婴儿补充剂。 |
| Marshmello | 纯音乐人内容，没有母婴商品承载能力 | 全是音乐作品与合作单曲，和母婴消费无关。 |
| Bruno Mars | 音乐人官方发行内容，与婴儿补剂毫无关联 | 全是Bruno Mars音乐和演出内容，不适合婴儿商品。 |
| Movieclips | 电影片段剪辑频道，内容形态不适合推广婴儿补剂 | 全是电影片段剪辑，无母婴推广场景。 |
| Alan Becker | 动画和Minecraft短片为主，不具备母婴商品推广语境 | 动画和Minecraft短片为主，受众不匹配。 |
| SonyMusicIndiaVEVO | 纯音乐版权内容，无法自然承接婴儿营养品推广 | 全是电影歌曲Lyrical内容，不适合婴儿商品。 |
| Katy Perry | 音乐人内容为主，与婴幼儿补充剂受众明显不符。 | 音乐艺人频道，内容与婴儿营养品推广场景完全不对口 |

## nox@content-tone-llm-v1-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 46 | Аришнев |  | 恶搞挑战和隐藏摄像机内容，和母婴补剂完全不搭 |
| 52 | Justin Flom |  | 以魔术整蛊和家装挑战为主，几乎无婴幼儿受众。 |
| 69 | Preston |  | 偏儿童游戏挑战，和婴幼儿补充剂不直接匹配。 |
| 72 | Lucas and Marcus |  | 以恶搞、情侣和惊险剧情为主，缺少母婴受众。 |
| 94 | Little Baby Bum - Nursery Rhymes & Kids Songs |  | 儿童儿歌频道，内容与婴儿营养补充品推广场景明显不匹配 |
| 133 | WB Kids |  | 纯儿童动画频道，受众是孩子而非购买婴儿用品的父母 |
| 139 | ★ Kids Roma Show |  | 儿童剧情短剧为主，和婴儿营养补充剂不匹配 |
| 183 | Cooking With Lynja |  | 纯烹饪内容，缺少育儿或婴儿健康承载能力 |
| 189 | Ethan Funny Family |  | 家庭美食挑战偏儿童娱乐，不是婴儿营养品承载频道 |
| 191 | CNN |  | 新闻频道，主题是时政和社会事件，不适合母婴商品推广 |
| 193 | TED |  | 知识演讲频道，虽有健康话题但不是母婴消费场景 |
| 194 | Ninja Kidz TV |  | 儿童动作娱乐频道，受众偏孩子，不是婴儿营养品决策人群 |
| 198 | SIMJI |  | 婚礼与生活方式频道，缺少婴儿补充剂对应的人群场景 |
| 202 | Diana Belitskay |  | 内容以恶搞挑战为主，和母婴补充剂场景不匹配 |
| 222 | Netflix Jr. |  | 儿童娱乐频道，受众并非母婴补充剂购买者 |
| 226 | Nasty Naz |  | 家庭整蛊和零食内容偏娱乐，不足以承接母婴商品 |
| 241 | YouTube Creators |  | 官方创作者工具频道，与婴儿补充剂毫无关系 |
| 249 | Psych2Go |  | 心理科普频道与婴儿补充剂没有直接购买关联 |
| 251 | Browney |  | 健身挑战频道，和婴儿补充剂完全不是同一消费语境 |
| 257 | National Geographic |  | 纪录片旅游自然类，难承接婴儿营养品推广 |
| 263 | Vogue |  | 时尚美妆生活方式频道，不适合婴儿补充剂推广 |
| 288 | Cardi B |  | 音乐人宣发为主，和婴儿补剂目标受众不匹配 |
| 348 | Joe Albanese |  | 兄妹舞蹈和挑战内容，缺少家长或婴儿承接 |
| 368 | Mykoreandic |  | 偏做菜和ASMR，缺少母婴与婴儿营养场景 |
| 398 | Fabiosa Best Lifehacks |  | 剧情、动物、ASMR 混合，非母婴垂类 |
| 412 | Alexa Rivera |  | 年轻人挑战/vlog频道，和婴儿补充剂受众不匹配。 |
| 417 | HahOwen En Español |  | 整活、情侣和豪车内容为主，与婴儿补充剂不匹配。 |
| 422 | Ayatee |  | 旅行试吃整活号，和婴儿补充剂受众不一致。 |
| 423 | Jenny Hoyos |  | 青少年娱乐/烹饪短内容，不适合婴儿补充剂。 |
| 425 | Nathan Kessel |  | 挑战型生活内容为主，与婴儿补充剂受众不匹配。 |

## xtb@content-tone-llm-v1-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 1 | MrBeast |  | 挑战和整蛊内容，和婴儿补剂受众不匹配 |
| 6 | Mark Rober |  | 工程实验频道，和婴儿补剂人群不对口 |
| 17 | Nick DiGiovanni |  | 美食厨艺频道，和婴儿补剂决策场景不强 |
| 25 | Jordan Matter |  | 家庭真人秀偏青少年，不是婴儿补剂场景 |
| 33 | Brent Rivera |  | 整蛊、挑战和搞笑短剧为主，缺少母婴承载。 |
| 35 | YouTube |  | 内容分散且偏创作者推荐，缺少稳定母婴受众。 |
| 42 | Beast Reacts |  | 反应和盘点类内容为主，没有母婴相关受众。 |
| 51 | SSSniperWolf |  | 反应盘点类短视频为主，没有母婴受众。 |
| 53 | Masha and The Bear |  | 纯儿童动画娱乐，和婴儿补充剂的购买受众明显不匹配 |
| 57 | Stay Wild |  | 挑战娱乐频道，受众和内容都不贴合婴儿补充剂 |
| 62 | J House jr. |  | 儿童歌唱/学习内容，主要受众是孩子，不适合婴儿补充剂 |
| 64 | _vector_ |  | 工具评测偏硬核成人消费，不像婴儿补充剂的自然投放场景 |
| 73 | Vlad và Niki |  | 儿童冒险故事频道，观看者是孩子，不适合婴儿补充剂 |
| 79 | Dhar Mann Studios |  | 剧情短片，缺少母婴商品承载 |
| 89 | TEDx Talks |  | 知识演讲频道，不适合母婴投放 |
| 115 | Vsauce |  | 知识向频道偏抽象，缺少母婴产品承接能力 |
| 127 | im_siowei |  | 内容是学校/家庭脑洞短剧，不是育儿或母婴消费场景。 |
| 150 | Hafu Go |  | 科学实验和生活黑科技，不是母婴补充剂内容。 |
| 155 | Adam W |  | 短剧式整活内容，和婴儿营养补充剂的决策场景不匹配 |
| 157 | FGTeeV |  | 游戏直播/整活频道，和婴儿营养补充剂受众几乎不重合 |
| 162 | LukeDidThat |  | 重口味食物挑战频道，面向儿童家长的婴儿补充剂不契合 |
| 168 | elmaxz_ |  | 剧情游戏实况为主，和婴儿营养补充剂明显不适配 |
| 172 | Maizen |  | Minecraft 动画频道，和婴儿营养补充剂无自然关联 |
| 247 | jeffreestar |  | 美妆和品牌开箱为主，受众偏成人审美，不适合婴儿补充品 |
| 280 | marrkadams |  | 家庭喜剧为主，但缺少母婴决策语境 |
| 282 | Amp World |  | 泛娱乐整蛊挑战，受众与婴儿补充剂不匹配 |
| 284 | BigSchool |  | 儿童向剧情动画，但偏虚构娱乐，不是育儿场景 |
| 286 | Unspeakable |  | 儿童冒险挑战内容多，缺少真实母婴场景 |
| 289 | Emmy Combs |  | 美妆旅行账号，和婴儿补充剂不匹配 |
| 290 | SMOL |  | DIY和动物梗为主，没有母婴内容承载 |

## Notes
- Page-level rates use `page_size` from each run metadata.
- Cause categories are heuristic clusters from `why_short`; review representative rows before making product decisions.
