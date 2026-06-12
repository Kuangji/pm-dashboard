# Channel Search Provider Comparison

- keyword: fashion
- platform: youtube
- country: US
- left: nox@content-tone-llm-v1 (tmp/channel-search-review/20260611-nox-vs-xtb-4kw-allplatform-us-front10-content-tone-v1/youtube/fashion/nox-youtube)
- right: xtb@content-tone-llm-v1 (tmp/channel-search-review/20260611-nox-vs-xtb-4kw-allplatform-us-front10-content-tone-v1/youtube/fashion/xtb-youtube)
- left_rule_version: content-tone-llm-v1
- right_rule_version: content-tone-llm-v1
- left_prompt_hash: 1228e2ff575f
- right_prompt_hash: 1228e2ff575f

## Run Overview
| run | provider | rule_version | total | fit | adjacent | badcase | badcase率 | <0 | 0-9 | 10-19 | 20+ |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| nox@content-tone-llm-v1 | nox | content-tone-llm-v1 | 499 | 19 | 169 | 311 | 62.3% | 0 | 499 | 0 | 0 |
| xtb@content-tone-llm-v1 | xtb | content-tone-llm-v1 | 499 | 17 | 177 | 305 | 61.1% | 0 | 499 | 0 | 0 |

## Page-Level Badcase Rate
| page | nox@content-tone-llm-v1_total | nox@content-tone-llm-v1_badcase | nox@content-tone-llm-v1_badcase率 | xtb@content-tone-llm-v1_total | xtb@content-tone-llm-v1_badcase | xtb@content-tone-llm-v1_badcase率 | badcase率差 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 49 | 22 | 44.9% | 49 | 32 | 65.3% | -20.4% |
| 2 | 50 | 28 | 56.0% | 50 | 28 | 56.0% | 0.0% |
| 3 | 50 | 29 | 58.0% | 50 | 24 | 48.0% | 10.0% |
| 4 | 50 | 34 | 68.0% | 50 | 31 | 62.0% | 6.0% |
| 5 | 50 | 37 | 74.0% | 50 | 34 | 68.0% | 6.0% |
| 6 | 50 | 27 | 54.0% | 50 | 28 | 56.0% | -2.0% |
| 7 | 50 | 34 | 68.0% | 50 | 30 | 60.0% | 8.0% |
| 8 | 50 | 30 | 60.0% | 50 | 36 | 72.0% | -12.0% |
| 9 | 50 | 32 | 64.0% | 50 | 32 | 64.0% | 0.0% |
| 10 | 50 | 38 | 76.0% | 50 | 30 | 60.0% | 16.0% |

## Badcase Overlap
| metric | count |
| --- | --- |
| shared_badcase | 263 |
| nox@content-tone-llm-v1_only_badcase | 48 |
| xtb@content-tone-llm-v1_only_badcase | 42 |

## Badcase Cause Summary
| provider | category | count |
| --- | --- | --- |
| nox@content-tone-llm-v1 | 其他 | 178 |
| nox@content-tone-llm-v1 | 证据缺失或信号不足 | 48 |
| nox@content-tone-llm-v1 | 泛相关性偏离 | 44 |
| nox@content-tone-llm-v1 | 娱乐/儿童/泛内容偏离 | 31 |
| nox@content-tone-llm-v1 | 宠物/动物受众冲突 | 5 |
| nox@content-tone-llm-v1 | 科技/电子垂类偏离 | 5 |
| xtb@content-tone-llm-v1 | 其他 | 187 |
| xtb@content-tone-llm-v1 | 泛相关性偏离 | 46 |
| xtb@content-tone-llm-v1 | 证据缺失或信号不足 | 35 |
| xtb@content-tone-llm-v1 | 娱乐/儿童/泛内容偏离 | 28 |
| xtb@content-tone-llm-v1 | 科技/电子垂类偏离 | 5 |
| xtb@content-tone-llm-v1 | 宠物/动物受众冲突 | 4 |

## Shared Badcases
| channel | nox@content-tone-llm-v1 | xtb@content-tone-llm-v1 |
| --- | --- | --- |
| Mark Rober | 工程科普和时尚消费场景距离大，缺少审美语境。 | 工程科普频道，与时尚推广明显不符 |
| Vlad and Niki | 儿童故事与玩乐内容，不具备时尚商品推广语境。 | 儿童玩乐叙事为主，非时尚类承载场景 |
| ✿ Kids Diana Show | 幼儿向家庭剧情，和时尚购买决策场景不匹配。 | 儿童剧情频道，和时尚推广受众不一致 |
| MrBeast Gaming | 游戏频道与时尚品类缺少天然关联，承载力弱。 | 纯游戏内容，几乎没有时尚推广场景 |
| Nick DiGiovanni | 烹饪内容更适合食品和厨房品类，和时尚关系弱。 | 美食料理频道，不适合时尚商品承载 |
| Toys and Colors | 儿童教育故事频道，和时尚商品推广场景明显不符。 | 儿童故事动画为主，非时尚推广场景 |
| Markiplier | 游戏/恐怖内容与时尚品类关联度低，推广自然度差。 | 游戏/恐怖实况，不适合时尚合作 |
| Baby Shark - Pinkfong Kids’ Songs & Stories | 儿童动画/儿歌频道，受众与时尚消费人群不一致。 | 儿童歌曲动画频道，与时尚商品不匹配 |
| skibidi | 公开视频全是Skibidi Toilet剧情、预告和分集合集，和时尚无关 | 频道长期是 Skibidi 剧情动画，和时尚商品完全无关 |
| Michael Jackson | 全是Michael Jackson音乐、演出和纪念内容，不是时尚种草频道 | 音乐/纪念内容频道，缺少时尚消费场景 |
| Billie Eilish | 以Billie Eilish巡演、现场表演为主，没有服饰评测或穿搭内容 | 演唱会与音乐内容为主，不适合时尚商品推广 |
| XXXTENTACION | 公开视频几乎全是官方音频、纪录片和预告，非商品推广场景 | 嘻哈音乐频道，和时尚商品推广场景不匹配 |
| Drake | 标题几乎都是Drake歌曲、MV和巡演片段，缺少时尚消费内容 | 以音乐发布和连载叙事为主，不适合时尚商品投放 |
| That Little Puff | 猫咪料理和恶作剧为主，受众与人用时尚商品不匹配 | 猫咪烹饪与宠物内容，和时尚商品受众不一致 |
| Marshmello | 全部是音乐发布与现场演出，属于纯音乐受众，不适合时尚推广 | 电音/流行音乐账号，缺少时尚消费决策内容 |
| Bruno Mars | Bruno Mars官方歌单、MV、现场演出为主，缺少时尚相关内容 | 音乐发布为主，没有时尚商品的受众语境 |
| LooLoo Kids - Nursery Rhymes and Children's Songs | 儿童儿歌和早教内容为主，受众与时尚商品明显不匹配 | 儿童儿歌频道，和时尚商品推广对象不一致 |
| Movieclips | 主要是电影和剧集片段剪辑，非购物决策或时尚内容 | 影视剪辑频道，不适合时尚商品合作推广 |
| Alan Becker | 动画短片和Minecraft系列为主，受众与时尚商品无关 | 动画/游戏内容频道，和时尚消费场景不匹配 |
| SonyMusicIndiaVEVO | 全是印度音乐MV与抒情视频，纯音乐垂类，不适合时尚推广 | 音乐影视原声频道，不适合时尚商品推广 |
| Justin Flom | 魔术整蛊和家庭机关内容，缺少时尚/穿搭受众。 | 魔术整活和家居机关为主，缺少时尚/穿搭受众 |
| Masha and The Bear | 儿童动画频道，和成人时尚商品受众不匹配。 | 儿童动画内容，和时尚商品受众基本不重合 |
| albert_cancook | 纯烹饪频道，和 fashion 商品调性不相关。 | 美食频道，商品推广承载点不在穿搭时尚 |
| Beast Philanthropy | 公益纪实频道，与时尚商品推广场景不符。 | 公益慈善频道，商业时尚推广自然承接弱 |
| Technoblade | 核心是 Minecraft 游戏内容，不适合时尚商品。 | 核心是 Minecraft 游戏内容，和时尚商品不匹配 |
| J House jr. | 儿童歌曲和启蒙内容，和时尚商品受众不匹配。 | 儿童歌唱学习内容，和时尚商品受众不匹配 |
| Dream | 游戏攻略频道，缺少时尚消费场景。 | 游戏频道，时尚推广承接能力弱 |
| CoryxKenshin | 恐怖游戏频道，和时尚商品调性不相干。 | 游戏实况偏娱乐惊吓，不适合时尚商品 |
| Law By Mike | 法律科普和案件讨论，不适合时尚商品。 | 法律解说频道，和时尚商品受众不重合 |
| Preston | 游戏挑战和少儿向内容，不适合时尚推广。 | 挑战游戏频道，和时尚商品调性不符 |

## nox@content-tone-llm-v1-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 1 | Cocomelon - Nursery Rhymes |  | 儿童儿歌与穿搭消费无关，受众也不匹配。 |
| 12 | Like Nastya |  | 儿童内容为主，缺少时尚审美或穿搭消费语境。 |
| 55 | Netflix |  | 影视宣发频道，非时尚消费决策内容。 |
| 76 | BRIGHT SIDE |  | 科普榜单频道，缺少时尚调性和承接能力。 |
| 84 | Danny Fitt |  | 家庭挑战和体育向，和时尚类商品关联弱 |
| 103 | MSA |  | 剧情娱乐号，缺少时尚消费承载 |
| 104 | Clean Girl |  | 清洁整活号，和时尚类商品不对口 |
| 105 | CRAZY GREAPA |  | 梗图短剧频道，与时尚推广无关 |
| 109 | LeoNata Family |  | 家庭搞笑短视频，缺少时尚承载场景 |
| 111 | Chris Brown |  | 音乐人账号，时尚不是内容主线 |
| 112 | Linh Chi |  | 校园剧情+手工号，与时尚关系弱 |
| 115 | Vsauce |  | 科普频道，缺少时尚推广语境 |
| 116 | Airrack |  | 整活挑战号，非时尚种草场景 |
| 118 | penguinz0 |  | 评论吐槽频道，难承接时尚转化 |
| 125 | surthany hejeij |  | 美食生活号，不适合时尚推广 |
| 156 | DisneyMusicVEVO |  | 纯音乐内容为主，缺少服饰类承载场景 |
| 164 | Enrique Iglesias |  | 音乐艺人内容为主，缺少服饰消费语境 |
| 165 | Kendrick Lamar |  | 音乐发行与演出内容为主，不适合时尚商品推广 |
| 166 | UFC |  | 竞技体育频道，与时尚商品的受众和场景不匹配 |
| 171 | NBA |  | 篮球赛事频道，与时尚商品匹配度低 |
| 175 | TED-Ed |  | 教育科普频道，不适合时尚商品推广 |
| 204 | Logan Paul |  | 以拳击、豪车、播客式娱乐为主，不是时尚受众 |
| 225 | Kai Cenat Live |  | 直播娱乐与挑战内容，不是时尚消费频道 |
| 231 | Marusya Outdoors |  | 户外求生与露营内容，不适合时尚推广 |
| 232 | REACT |  | 反应娱乐和音乐挑战为主，缺少时尚消费语境 |
| 266 | Ray William Johnson |  | 猎奇评论频道偏社会/犯罪话题，不适合时尚推广 |
| 269 | Sambucha |  | 泛知识/实验号，内容不围绕审美穿搭或消费决策 |
| 282 | Amp World |  | 偏家庭挑战和整活，不是时尚调性 |
| 290 | SMOL |  | DIY、家居和宠物向内容，不是时尚受众 |
| 305 | Zuni Zuni |  | 情感鸡汤短剧为主，缺少时尚商品承载能力 |

## xtb@content-tone-llm-v1-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 1 | MrBeast |  | 挑战抽奖内容为主，缺少穿搭/时尚承载 |
| 2 | Stokes Twins |  | 恶作剧和挑战为主，和时尚受众不匹配 |
| 4 | Topper Guild |  | 整蛊挑战频道，不具备时尚商品承载力 |
| 8 | MrBeast 2 |  | 食品整活频道，不适合时尚商品推广 |
| 10 | IShowSpeed |  | 体育/IRL直播为主，和时尚类商品弱相关 |
| 13 | Zhong |  | 挑战和梗图内容为主，与时尚无关 |
| 18 | Dude Perfect |  | 运动娱乐频道，和时尚商品匹配度低 |
| 36 | Zach King |  | 魔术/特效短片为主，没有时尚商品承接场景 |
| 38 | MaviGadget |  | 家居/工具/医疗小商品频道，不是时尚垂类 |
| 42 | Beast Reacts |  | 搞笑反应/挑战频道，缺少时尚商品承载能力 |
| 46 | Аришнев |  | 俄语整蛊挑战频道，和时尚商品调性不符 |
| 47 | Cool Items Official |  | 家电百货展示号，和时尚商品并非同类场景 |
| 57 | Stay Wild |  | 挑战玩乐频道，和时尚商品调性不符 |
| 81 | Prime Video India |  | 影视宣发频道，时尚商品承载弱 |
| 89 | TEDx Talks |  | 演讲知识频道，几乎无消费种草场景 |
| 128 | Daily Dose Of Internet |  | 互联网趣味集锦频道，内容与时尚商品推广场景不匹配 |
| 132 | Jesús Restrepo |  | 绘画创作频道，和时尚商品推广的内容调性不一致 |
| 134 | Linkin Park |  | 纯音乐乐队频道，非时尚消费内容，承接弱 |
| 141 | ImagineDragons |  | 摇滚乐队频道与时尚商品推广关联弱 |
| 150 | Hafu Go |  | 科学实验频道与时尚消费决策无直接关系 |
| 154 | Ryan's World |  | 儿童玩具挑战为主，没有服饰、穿搭或审美消费场景 |
| 170 | SlivkiShow |  | 实验测评和改造内容偏硬核，不是时尚消费频道 |
| 178 | Like Nastya ESP |  | 儿童故事频道，内容重玩乐与角色扮演，不承接时尚推广 |
| 244 | The Anazala Family |  | 家庭 vlog 与生活记录为主，缺少时尚推广语境 |
| 253 | 昕昕 |  | 搞笑亲子短剧，几乎没有时尚承载 |
| 258 | Family Games Media |  | 家庭游戏挑战，缺少穿搭和美妆语境 |
| 261 | يوميات واحد عراقي | One Iraqi Diary |  | 日常整蛊和街头内容，不适合时尚推广 |
| 267 | The McCartys |  | 家庭闹剧短片，不是时尚消费场 |
| 299 | KEEMOKAZI |  | 整蛊家庭号，时尚承载能力弱 |
| 301 | mmmjoemele |  | 家庭整蛊与游戏内容为主，时尚不匹配 |

## Notes
- Page-level rates use `page_size` from each run metadata.
- Cause categories are heuristic clusters from `why_short`; review representative rows before making product decisions.
