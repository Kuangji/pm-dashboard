# Channel Search Provider Comparison

- keyword: fashion
- platform: tiktok
- country: US
- left: nox@content-tone-llm-v1 (tmp/channel-search-review/20260611-nox-vs-xtb-4kw-allplatform-us-front10-content-tone-v1/tiktok/fashion/nox-tiktok)
- right: xtb@content-tone-llm-v1 (tmp/channel-search-review/20260611-nox-vs-xtb-4kw-allplatform-us-front10-content-tone-v1/tiktok/fashion/xtb-tiktok)
- left_rule_version: content-tone-llm-v1
- right_rule_version: content-tone-llm-v1
- left_prompt_hash: 1228e2ff575f
- right_prompt_hash: 1228e2ff575f

## Run Overview
| run | provider | rule_version | total | fit | adjacent | badcase | badcase率 | <0 | 0-9 | 10-19 | 20+ |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| nox@content-tone-llm-v1 | nox | content-tone-llm-v1 | 500 | 79 | 249 | 172 | 34.4% | 0 | 500 | 0 | 0 |
| xtb@content-tone-llm-v1 | xtb | content-tone-llm-v1 | 500 | 76 | 223 | 201 | 40.2% | 0 | 500 | 0 | 0 |

## Page-Level Badcase Rate
| page | nox@content-tone-llm-v1_total | nox@content-tone-llm-v1_badcase | nox@content-tone-llm-v1_badcase率 | xtb@content-tone-llm-v1_total | xtb@content-tone-llm-v1_badcase | xtb@content-tone-llm-v1_badcase率 | badcase率差 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 50 | 7 | 14.0% | 50 | 2 | 4.0% | 10.0% |
| 2 | 50 | 22 | 44.0% | 50 | 27 | 54.0% | -10.0% |
| 3 | 50 | 23 | 46.0% | 50 | 19 | 38.0% | 8.0% |
| 4 | 50 | 19 | 38.0% | 50 | 19 | 38.0% | 0.0% |
| 5 | 50 | 15 | 30.0% | 50 | 20 | 40.0% | -10.0% |
| 6 | 50 | 19 | 38.0% | 50 | 18 | 36.0% | 2.0% |
| 7 | 50 | 28 | 56.0% | 50 | 16 | 32.0% | 24.0% |
| 8 | 50 | 16 | 32.0% | 50 | 24 | 48.0% | -16.0% |
| 9 | 50 | 11 | 22.0% | 50 | 25 | 50.0% | -28.0% |
| 10 | 50 | 12 | 24.0% | 50 | 31 | 62.0% | -38.0% |

## Badcase Overlap
| metric | count |
| --- | --- |
| shared_badcase | 138 |
| nox@content-tone-llm-v1_only_badcase | 34 |
| xtb@content-tone-llm-v1_only_badcase | 63 |

## Badcase Cause Summary
| provider | category | count |
| --- | --- | --- |
| nox@content-tone-llm-v1 | 其他 | 111 |
| nox@content-tone-llm-v1 | 泛相关性偏离 | 23 |
| nox@content-tone-llm-v1 | 证据缺失或信号不足 | 16 |
| nox@content-tone-llm-v1 | 宠物/动物受众冲突 | 11 |
| nox@content-tone-llm-v1 | 娱乐/儿童/泛内容偏离 | 10 |
| nox@content-tone-llm-v1 | 科技/电子垂类偏离 | 1 |
| xtb@content-tone-llm-v1 | 其他 | 122 |
| xtb@content-tone-llm-v1 | 证据缺失或信号不足 | 32 |
| xtb@content-tone-llm-v1 | 泛相关性偏离 | 24 |
| xtb@content-tone-llm-v1 | 宠物/动物受众冲突 | 13 |
| xtb@content-tone-llm-v1 | 娱乐/儿童/泛内容偏离 | 8 |
| xtb@content-tone-llm-v1 | 科技/电子垂类偏离 | 2 |

## Shared Badcases
| channel | nox@content-tone-llm-v1 | xtb@content-tone-llm-v1 |
| --- | --- | --- |
| mega | 自然风景内容，和时尚商品几乎没有承接关系 | 几乎全是风景自然影像，没有时尚或商品承载内容 |
| FIFA World Cup | 纯体育赛事内容，与时尚推广明显不匹配 | 频道核心是足球赛事与世界杯资讯，和时尚商品受众明显不匹配 |
| Overtime | 以NBA赛事剪辑为主，与时尚商品推广明显无关 | NBA/搞笑剪辑为主，几乎无穿搭时尚承载 |
| Will Smith | 旅行影视内容为主，不具时尚商品承载场景 | 旅行纪录片和个人杂谈，不适合时尚推广 |
| Chris Olsen | 以追星、旅行和搞笑内容为主，缺少时尚语境 | 偏演唱会、旅行、食物内容，缺少时尚场景 |
| DRUSKI | 纯喜剧和整活内容，不适合时尚商品投放 | 纯喜剧短剧账号，和时尚商品不匹配 |
| Alex Warren | 音乐和食品植入为主，与时尚不匹配 | 音乐宣发为主，缺少时尚承载内容 |
| Bruno Mars | 音乐演出为主，几乎没有时尚推广场景 | 音乐和酒类品牌为主，不适合时尚商品推广 |
| Barstool Sports | 体育娱乐账号，和时尚商品受众不匹配 | 体育段子账号，时尚相关内容不足 |
| Jordan_The_Stallion8 | 内容杂且偏搞笑宠物，不支持时尚带货 | 随机话题和宠物食品，和时尚不相关 |
| German Garmendia | 以综艺式搞笑为主，时尚语境不足 | 以搞笑挑战和梗视频为主，非时尚调性 |
| Feid | 音乐和舞蹈为主，时尚商品关联弱 | 音乐表演和舞台内容为主，不是时尚频道 |
| Stokes Twins | 挑战搞笑频道，不适合时尚商品推广 | 挑战、整蛊和冒险内容为主，和时尚不匹配 |
| JOP | 拉丁音乐人内容，和时尚推广不匹配 | 地方音乐/演出内容为主，不适合时尚推广 |
| Ney | 足球/梗内容为主，缺少时尚品类语境 | 足球内容为主，和时尚商品受众不一致 |
| WWE | WWE以摔角赛事为主，和时尚推广调性冲突 | 核心是摔角赛事，不是时尚消费场景 |
| ZHC | 以艺术创作和家庭内容为主，缺少时尚承载 | 以艺术、家庭、整活为主，不是时尚频道 |
| Pudgywoke | 以音乐情绪和个人表达为主，不是时尚频道 | 频道内容偏个人音乐/情绪表达，不是时尚消费场景 |
| ESPN | 体育资讯频道，和时尚推广场景明显不匹配 | 体育资讯号，和时尚商品受众明显不匹配 |
| Roblox | 游戏平台账号，不是人用时尚推广频道 | 游戏平台内容，不是时尚商品推广场景 |
| KEEMOKAZI | 家庭整蛊和搞笑为主，和时尚推广不匹配 | 家庭搞笑和吃喝内容为主，不是时尚频道 |
| Saturday Night Live | 喜剧短剧频道，和时尚商品受众不匹配 | 以综艺短剧为主，缺少时尚消费内容承载 |
| Kevin Chamberlin | 百老汇/影视为主，缺少时尚商品承载语境 | 内容核心是舞台和行程，缺少时尚或穿搭语境 |
| angry reacts | 情绪吐槽和游戏向内容，不适合时尚推广 | 以情绪反应和音乐吐槽为主，与时尚商品调性不符 |
| Spencer Hunt | 吐槽/剧情化内容为主，没有时尚受众 | 日常吐槽短梗号，内容方向与时尚推广不匹配 |
| Lance Stewart | 恶搞和游戏为主，时尚相关内容太弱 | 主轴是整蛊、游戏和修复类内容，时尚承载弱 |
| يحيى الزعبي 🇯🇴 | 搞笑恶作剧频道，非时尚受众 | 搞笑整蛊和餐饮内容为主，与时尚消费场景脱节 |
| Lynja | 烹饪频道，不适合时尚类商品 | 纯烹饪频道，和时尚商品推广语境不匹配 |
| Sebastien | 美食喜剧为主，几乎没有服装时尚内容 | 美食和搞笑日常为主，时尚不是频道主轴 |
| Spencer X | beatbox挑战与时尚商品完全不搭 | 纯 beatbox 音乐挑战，缺少时尚消费承载 |

## nox@content-tone-llm-v1-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 11 | Lamine Yamal |  | 足球内容为主，和时尚商品推广调性明显不符 |
| 13 | Enejota |  | 足球/家庭/品牌杂谈为主，缺少时尚商品承载场景 |
| 14 | Zach King |  | 视觉魔术频道，和时尚类商品的受众场景不一致 |
| 29 | Laro Benz |  | 核心是家庭宝宝搞笑，缺少时尚受众和场景 |
| 37 | Surthycooks |  | 核心是烹饪内容，与时尚商品关联弱 |
| 76 | Charlie Puth |  | 以音乐内容为主，缺少时尚穿搭和购物语境 |
| 91 | Jay Wheeler |  | 歌手账号以情歌和新歌宣发为主，非时尚垂类 |
| 98 | Jacob Sartorius |  | 个人情感和日常互动为主，缺少时尚内容 |
| 116 | DAVID DOBRIK |  | vlog和整蛊为主，时尚承载能力弱 |
| 117 | Collins Key |  | 挑战、烹饪、家庭娱乐为主，与时尚无关 |
| 121 | Robert Lewandowski |  | 足球竞技为主，时尚受众不匹配 |
| 130 | Matt Rife |  | 核心是脱口秀/吐槽，和时尚推广没有自然连接 |
| 179 | Oliver Tree |  | 以巡演和音乐人为主，和时尚商品承接弱 |
| 180 | Ness |  | 纯音乐/舞台人格，和 fashion 商品不匹配 |
| 194 | dreamboy. |  | 以发歌宣发为主，缺少时尚场景 |
| 227 | Jake Fellman |  | Minecraft动画号，内容调性与服饰推广无关 |
| 229 | Melanie Martinez |  | 音乐宣发号，内容聚焦歌曲专辑，不适合时尚投放 |
| 290 | Thoren Bradley |  | 伐木/户外/公益主题，和fashion消费场景较远 |
| 292 | Case |  | 游戏反应频道，和时尚商品的受众与场景不匹配 |
| 300 | Joshlilj |  | 公益送温暖型内容，和时尚购物决策场景不对口 |
| 301 | Nick Kosir |  | 无关键词召回，内容以天气、舞蹈、搞笑为主，不承接时尚推广 |
| 305 | StinkyAsher |  | 主体是搞笑梗和情绪段子，缺少服饰审美与时尚承载能力 |
| 307 | SIDELNIKOVVV |  | 频道主要是俄语剧情/广告/校园梗，和时尚商品缺乏自然关联 |
| 315 | Marrkadams |  | 主要是家庭喜剧和宠物梗，和时尚商品的承载场景不匹配 |
| 318 | Cam2r |  | 核心是挑战和整蛊视频，不具备稳定的时尚内容语境 |
| 319 | JustinFlom |  | 魔术机关与家庭恶作剧为主，和时尚商品推广没有自然连接 |
| 321 | Kat |  | 偏家庭吐槽和厨务日常，和时尚商品的受众与场景不匹配 |
| 332 | Nickelodeon |  | 儿童娱乐/影视片段，不是时尚种草场景 |
| 337 | Logan Paul |  | 竞技、收藏、体育为主，不是时尚频道 |
| 338 | Willito |  | 随机生活/情绪梗为主，缺少时尚承载 |

## xtb@content-tone-llm-v1-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 55 | Miley Cyrus |  | 音乐与影视宣发为主，时尚相关度很低 |
| 71 | Michael Le |  | 以舞蹈挑战和偶像内容为主，时尚承载弱 |
| 72 | Savannah LaBrant |  | 家庭育儿内容为主，时尚属性弱 |
| 83 | Ross Smith |  | 家庭喜剧和挑战内容，不适合时尚商品推广 |
| 84 | AugustoGimenez |  | 家装旅行和整活为主，缺少时尚消费语境 |
| 85 | eugenioderbezoficial |  | 喜剧演员频道，和时尚类商品调性不一致 |
| 89 | Los_chicaneros |  | 家庭情景喜剧为主，缺少时尚种草能力 |
| 90 | Merrick |  | VFX/舞蹈/梗内容为主，不适合时尚商品推广 |
| 151 | NLE Choppa |  | 以音乐/直播/日常为主，几乎无穿搭或时尚商品承接。 |
| 152 | KingBach |  | 纯喜剧/脱口秀内容，和时尚商品推广无关。 |
| 157 | Daniel LaBelle |  | 夸张肢体喜剧频道，缺少时尚受众与场景。 |
| 212 | otakoyakisoba |  | 以美食和家庭叙事为主，不适合时尚推广 |
| 217 | YoungSwagon |  | 纯喜剧家庭短剧，缺少时尚承载能力 |
| 221 | King Science |  | 游戏/舞蹈/音乐内容为主，不适合时尚商品推广 |
| 234 | gianna |  | 家庭、宠物和毕业生活为主，时尚推广承载弱 |
| 244 | brittikitty |  | 亲子家庭内容占主导，不是时尚推广频道 |
| 245 | FaZe Rug |  | 娱乐整蛊与游戏广告为主，不像时尚频道 |
| 247 | Kervo.dolo |  | 喜剧整活为主，时尚商品缺少自然承接 |
| 252 | Q Park |  | 以搞笑舞蹈和趋势梗为主，缺少时尚消费内容承接。 |
| 266 | Justina Valentine |  | 娱乐/音乐/综艺杂项号，时尚承载能力弱。 |
| 324 | DermDoctor | Dr. Shah |  | 皮肤科科普频道，主题是护肤医疗，不是时尚。 |
| 355 | Jonas Brothers |  | 音乐巡演号，缺少服饰/穿搭承载 |
| 365 | natalie & the aguilars |  | 家庭搞笑与宠物内容为主，不像时尚频道 |
| 375 | Devon Rodriguez |  | 艺术访谈/绘画账号，不是时尚内容场 |
| 377 | Everett Noble |  | 喜剧整活为主，几乎无时尚或穿搭承载 |
| 378 | Frankie LaPenna |  | 极限整活和运动挑战为主，非时尚受众 |
| 381 | LGNDFRVR |  | 以搞笑短视频为主，和时尚商品无关 |
| 383 | scottkress |  | 主打梗图和口语化喜剧，没有时尚受众 |
| 391 | wigofellas |  | 以整蛊和家庭搞笑为主，不适合时尚推广 |
| 405 | OZUNA |  | 主要是音乐宣发和巡演，缺少服饰时尚内容 |

## Notes
- Page-level rates use `page_size` from each run metadata.
- Cause categories are heuristic clusters from `why_short`; review representative rows before making product decisions.
