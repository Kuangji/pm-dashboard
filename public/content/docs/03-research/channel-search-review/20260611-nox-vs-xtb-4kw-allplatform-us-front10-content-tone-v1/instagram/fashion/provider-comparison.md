# Channel Search Provider Comparison

- keyword: fashion
- platform: instagram
- country: US
- left: nox@content-tone-llm-v1 (tmp/channel-search-review/20260611-nox-vs-xtb-4kw-allplatform-us-front10-content-tone-v1/instagram/fashion/nox-instagram)
- right: xtb@content-tone-llm-v1 (tmp/channel-search-review/20260611-nox-vs-xtb-4kw-allplatform-us-front10-content-tone-v1/instagram/fashion/xtb-instagram)
- left_rule_version: content-tone-llm-v1
- right_rule_version: content-tone-llm-v1
- left_prompt_hash: 1228e2ff575f
- right_prompt_hash: 1228e2ff575f

## Run Overview
| run | provider | rule_version | total | fit | adjacent | badcase | badcase率 | <0 | 0-9 | 10-19 | 20+ |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| nox@content-tone-llm-v1 | nox | content-tone-llm-v1 | 500 | 129 | 229 | 142 | 28.4% | 0 | 500 | 0 | 0 |
| xtb@content-tone-llm-v1 | xtb | content-tone-llm-v1 | 500 | 141 | 210 | 149 | 29.8% | 0 | 500 | 0 | 0 |

## Page-Level Badcase Rate
| page | nox@content-tone-llm-v1_total | nox@content-tone-llm-v1_badcase | nox@content-tone-llm-v1_badcase率 | xtb@content-tone-llm-v1_total | xtb@content-tone-llm-v1_badcase | xtb@content-tone-llm-v1_badcase率 | badcase率差 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 50 | 7 | 14.0% | 50 | 5 | 10.0% | 4.0% |
| 2 | 50 | 13 | 26.0% | 50 | 14 | 28.0% | -2.0% |
| 3 | 50 | 21 | 42.0% | 50 | 17 | 34.0% | 8.0% |
| 4 | 50 | 12 | 24.0% | 50 | 12 | 24.0% | 0.0% |
| 5 | 50 | 8 | 16.0% | 50 | 11 | 22.0% | -6.0% |
| 6 | 50 | 18 | 36.0% | 50 | 12 | 24.0% | 12.0% |
| 7 | 50 | 12 | 24.0% | 50 | 20 | 40.0% | -16.0% |
| 8 | 50 | 22 | 44.0% | 50 | 25 | 50.0% | -6.0% |
| 9 | 50 | 12 | 24.0% | 50 | 16 | 32.0% | -8.0% |
| 10 | 50 | 17 | 34.0% | 50 | 17 | 34.0% | 0.0% |

## Badcase Overlap
| metric | count |
| --- | --- |
| shared_badcase | 115 |
| nox@content-tone-llm-v1_only_badcase | 27 |
| xtb@content-tone-llm-v1_only_badcase | 34 |

## Badcase Cause Summary
| provider | category | count |
| --- | --- | --- |
| nox@content-tone-llm-v1 | 其他 | 97 |
| nox@content-tone-llm-v1 | 泛相关性偏离 | 15 |
| nox@content-tone-llm-v1 | 证据缺失或信号不足 | 14 |
| nox@content-tone-llm-v1 | 娱乐/儿童/泛内容偏离 | 11 |
| nox@content-tone-llm-v1 | 宠物/动物受众冲突 | 3 |
| nox@content-tone-llm-v1 | 科技/电子垂类偏离 | 2 |
| xtb@content-tone-llm-v1 | 其他 | 98 |
| xtb@content-tone-llm-v1 | 泛相关性偏离 | 20 |
| xtb@content-tone-llm-v1 | 证据缺失或信号不足 | 18 |
| xtb@content-tone-llm-v1 | 娱乐/儿童/泛内容偏离 | 6 |
| xtb@content-tone-llm-v1 | 宠物/动物受众冲突 | 4 |
| xtb@content-tone-llm-v1 | 科技/电子垂类偏离 | 3 |

## Shared Badcases
| channel | nox@content-tone-llm-v1 | xtb@content-tone-llm-v1 |
| --- | --- | --- |
| IShowSpeed | 狂欢挑战型内容为主，和时尚审美场景不匹配 | 以直播挑战和体育内容为主，不具时尚转化场景 |
| NASA | 主体是航天科普，和时尚商品受众完全不匹配 | 主体是航天科普与任务进展，和时尚商品调性明显不符 |
| Kevin Hart | 喜剧和体育内容主导，与时尚消费场景不匹配 | 核心是喜剧、家庭和运动，和时尚推广目标不匹配 |
| Vin Diesel | 动作电影与家庭叙事为主，不具备时尚商品承载能力 | 电影与家庭叙事为主，缺少时尚消费场景 |
| Хабиб Нурмагомедов | 以格斗、宗教、地产和运动为主，几乎无时尚承载 | 拳击/宗教/地产/投资为主，与时尚推广受众不匹配 |
| Marvel Entertainment | 超级英雄娱乐账号，和时尚商品受众不对口 | 超级英雄影视官方号，内容与时尚消费几乎无关 |
| Jordan Howlett | 美食和喜剧内容为主，不适合时尚推广 | 以食物/影视搞笑为主，和时尚消费场景偏离 |
| House of Highlights | 体育集锦账号，和时尚商品受众明显不符 | 体育集锦号，核心是比赛高光，不适合时尚推广 |
| Younes Zarou | 整蛊特效和挑战内容为主，缺少时尚承载 | 以视觉魔术和整蛊创作为主，非时尚消费场景 |
| Conor McGregor Official | 以格斗训练和赛事为主，几乎无时尚内容承接 | 以格斗训练和赛事为主，几乎无时尚承载。 |
| Future PLUTO Hendrix | 音乐宣发为主，与时尚商品推广关联弱 | 说唱专辑宣发为主，缺少时尚调性。 |
| Kai Cenat | 直播整活为主，和时尚消费场景不匹配 | 直播整活为主，和时尚受众不匹配。 |
| 21savage | 音乐个人表达为主，没有时尚内容承接 | 说唱碎片表达为主，缺少时尚承载。 |
| Barack Obama | 政治与公共议题账号，和时尚推广场景不匹配 | 政治公共议题账号，不适合时尚推广。 |
| Amaury Guichon | 甜点工艺号，受众与时尚商品几乎无交集 | 甜点艺术账号，与时尚商品受众不符。 |
| Marvel Studios | 影视宣发账号，与时尚商品目标受众不一致 | 影视宣发为主，不是时尚合作场景。 |
| SportsCenter | 体育资讯号，受众偏赛事，不适合推时尚商品 | 纯体育赛事内容，与时尚推广场景明显不匹配 |
| Jensen Ackles | 影视演员宣传号，内容偏剧集电影，不是时尚向 | 以影视剧宣传为主，不适合做时尚商品推广 |
| NBA | 纯体育联盟号，内容与时尚商品受众不匹配 | 纯体育媒体账号，和时尚品类受众冲突 |
| Chris Hemsworth | 影视+运动生活号，主要是冲浪和电影宣传 | 以电影、冲浪、家庭生活为主，不是时尚频道 |
| DRUSKI | 喜剧整活号，内容形式与时尚转化弱 | 搞笑短内容账号，缺少时尚商品推广语境 |
| ABHISHEK MALHAN | 综艺/创作者号偏娱乐和挑战，不适合时尚商品 | 内容偏综艺、挑战和品牌硬广，不是时尚调性 |
| Tom Cruise | 电影宣传号，内容几乎全是动作片资讯 | 电影宣传账号，与时尚商品推广关系弱 |
| Zach King | 魔术特效号偏创意娱乐，不适合时尚推广 | 魔术/趣味内容为主，与时尚推广不匹配 |
| LEGO | 玩具品牌号，品类与时尚完全不相关 | 玩具品牌账号，不适合人用时尚商品推广 |
| Disney | 迪士尼娱乐号，内容面向影视乐园，不适合时尚 | 迪士尼娱乐/IP内容为主，不是时尚频道 |
| Mike Holston | 主体是野生动物、训练和科普，没有时尚消费场景 | 动物/野外/健身内容为主，和时尚商品受众不匹配 |
| hakki akdeniz | 餐饮公益与个人经历为主，几乎没有时尚内容 | 餐饮公益内容为主，和时尚推广缺少自然受众 |
| Mark Zuckerberg | 科技、AI、格斗和产品发布为主，时尚关联很弱 | 科技/拳击/产品发布为主，不具备时尚内容场景 |
| Michael Jackson | 核心是音乐纪念和演出内容，不是服饰时尚频道 | 音乐档案号，核心是作品与演出，不是时尚投放场景 |

## nox@content-tone-llm-v1-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 30 | flame |  | 内容几乎全是说唱、派对、巡演，不支持时尚推广 |
| 40 | Lele Pons |  | 主体是搞笑/家庭/育儿内容，时尚不是主承载场景 |
| 47 | Tyga |  | 夜店和说唱内容为主，缺少时尚选品或消费决策场景 |
| 58 | Anwar Jibawi |  | 主要是搞笑短剧，和时尚商品受众不匹配 |
| 113 | FUCKJERRY |  | 梗图搞笑号，受众与时尚商品购买意图不匹配 |
| 125 | easymoneysniper |  | 篮球巨星号以体育和商业合作为主，不是时尚频道 |
| 134 | Khamzat Chimaev |  | 训练、比赛和战斗生活为主，与时尚场景明显不符 |
| 143 | Luan Santana |  | 演唱会和歌迷互动为主，缺少稳定时尚内容场 |
| 144 | Niall Horan |  | 音乐发行与巡演为主，缺少穿搭或时尚消费内容 |
| 181 | Romeo Santos |  | 巡演和情歌内容为主，缺少时尚承载场景 |
| 184 | Jay Wheeler |  | 音乐/直播/舞台内容为主，时尚证据不足 |
| 194 | Giannis Antetokounmpo |  | 篮球体育日常，与时尚商品明显不匹配 |
| 225 | Ryan & Jen Hamilton (HAMMY TV) |  | 以夫妻恶搞短剧为主，不适合时尚推广 |
| 275 | Lay Zhang |  | 音乐和文化表达为主，缺少时尚消费语境 |
| 280 | Doğuş |  | 音乐和家庭日常为主，没有明显时尚内容承接 |
| 281 | Ice Cube |  | 巡演、篮球和票务为主，和时尚推广关联很弱 |
| 283 | Humans of New York |  | 人文故事和社会议题为主，不具备时尚推广调性 |
| 295 | BIG SEAN |  | 音乐和个人动态为主，没有时尚主题沉淀 |
| 296 | Devin Sran |  | 几乎都是抽象生活感想，看不出时尚受众 |
| 299 | playboicarti |  | 仅音乐宣发，没有时尚承接信息 |
| 331 | PARTYNEXTDOOR |  | 主要是音乐与巡演内容，时尚信号弱 |
| 350 | King 👑 |  | R&B演出和音乐宣发为主，时尚承载不足 |
| 364 | NFL |  | 纯体育媒体，和时尚商品受众明显不一致 |
| 400 | DON TOLIVER |  | 音乐巡演和专辑宣传为主，非时尚频道 |
| 415 | Enzo Zelocchi |  | 内容几乎全是鸡汤和旅行感言，缺少时尚受众与承载能力 |
| 491 | LINKIN PARK |  | 乐队宣发为主，虽然有联名但整体仍是音乐向 |
| 499 | Krystiana |  | 母婴家庭内容为主，缺少时尚消费承载场景 |

## xtb@content-tone-llm-v1-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 20 | MrBeast |  | 挑战视频和抽奖为主，几乎没有时尚语境 |
| 80 | Adam Sandler |  | 喜剧和巡演碎片为主，没有时尚调性。 |
| 91 | Dan Bilzerian |  | 争议生活方式和烟油为主，非时尚场景。 |
| 101 | Ellen DeGeneres |  | 内容是脱口秀/名人日常，几乎无时尚承载内容 |
| 172 | The School Of Hard Knocks |  | 商业访谈号受众偏创业，不适合时尚商品 |
| 173 | Shohei Ohtani  |  大谷翔平 |  | 体育竞技主导，和时尚商品的受众错位明显 |
| 203 | Sung Kang |  | 内容聚焦赛车和汽车文化，与时尚商品受众不符 |
| 206 | WASTED |  | 以影视解说和新闻文字帖为主，缺少时尚消费场景 |
| 207 | UFC |  | 纯格斗赛事内容，和时尚商品受众明显不匹配 |
| 235 | Daniel LaBelle |  | 肢体喜剧和夸张情景，没有时尚承载能力 |
| 241 | One Direction |  | 没有公开视频内容，无法证明有时尚承载力 |
| 273 | Chris Gayle 👑 |  | 以板球和个人生活为主，不适合时尚推广 |
| 303 | El OZO |  | 内容以音乐发行为主，几乎没有服饰或造型承载 |
| 305 | Cvrbon Vrmor |  | 核心是音乐与赛车文化，缺少时尚消费决策内容 |
| 311 | WWE |  | 主体是摔角赛事，和时尚商品推广受众不匹配 |
| 314 | 🏝️👦🏾🐢 |  | 内容几乎全是音乐发行和演出，不适合时尚投放 |
| 318 | Result 318 |  | 内容以说唱音乐为主，缺少时尚商品承接场景 |
| 321 | Martin Lawrence |  | 以喜剧巡演和个人生活为主，时尚承载能力弱 |
| 323 | Kendrick Lamar |  | 频道几乎全是音乐作品与巡演，不适合时尚推广 |
| 325 | Los Angeles Lakers |  | 主要是篮球赛事内容，和时尚商品受众关联弱 |
| 326 | forrest frank |  | 以福音音乐为主，缺少时尚/穿搭承载场景 |
| 348 | euphoria |  | 影视剧官方号，缺少商品推广承载场景 |
| 364 | WE THE URBAN |  | 心理疗愈内容，不具备时尚商品承载能力 |
| 372 | Shadmehr Aghili |  | 音乐和演唱会账号，缺少时尚消费内容 |
| 374 | Marko > Comedia Viral |  | 综艺喜剧/真人秀内容，不适合时尚转化 |
| 375 | 𝚙𝚔 |  | 独立音乐人内容，只有零散品牌露出 |
| 376 | KAZI |  | 以家庭搞笑和日常整活为主，缺少穿搭/时尚承载 |
| 403 | Harry Styles HQ |  | 频道主轴是音乐/巡演宣发，缺少时尚商品内容承载能力 |
| 425 | Pump 🇨🇴 |  | 频道以说唱/个人动态为主，与fashion商品推广承载弱且无相关召回 |
| 426 | China |  | 内容是影视/生日/娱乐，几乎没有服饰审美或穿搭承载 |

## Notes
- Page-level rates use `page_size` from each run metadata.
- Cause categories are heuristic clusters from `why_short`; review representative rows before making product decisions.
