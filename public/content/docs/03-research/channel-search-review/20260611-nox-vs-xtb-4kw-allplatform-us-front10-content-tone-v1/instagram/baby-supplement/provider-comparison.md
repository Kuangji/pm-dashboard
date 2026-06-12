# Channel Search Provider Comparison

- keyword: baby supplement
- platform: instagram
- country: US
- left: nox@content-tone-llm-v1 (tmp/channel-search-review/20260611-nox-vs-xtb-4kw-allplatform-us-front10-content-tone-v1/instagram/baby-supplement/nox-instagram)
- right: xtb@content-tone-llm-v1 (tmp/channel-search-review/20260611-nox-vs-xtb-4kw-allplatform-us-front10-content-tone-v1/instagram/baby-supplement/xtb-instagram)
- left_rule_version: content-tone-llm-v1
- right_rule_version: content-tone-llm-v1
- left_prompt_hash: 1228e2ff575f
- right_prompt_hash: 1228e2ff575f

## Run Overview
| run | provider | rule_version | total | fit | adjacent | badcase | badcase率 | <0 | 0-9 | 10-19 | 20+ |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| nox@content-tone-llm-v1 | nox | content-tone-llm-v1 | 500 | 17 | 140 | 343 | 68.6% | 0 | 500 | 0 | 0 |
| xtb@content-tone-llm-v1 | xtb | content-tone-llm-v1 | 500 | 24 | 154 | 322 | 64.4% | 0 | 500 | 0 | 0 |

## Page-Level Badcase Rate
| page | nox@content-tone-llm-v1_total | nox@content-tone-llm-v1_badcase | nox@content-tone-llm-v1_badcase率 | xtb@content-tone-llm-v1_total | xtb@content-tone-llm-v1_badcase | xtb@content-tone-llm-v1_badcase率 | badcase率差 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 50 | 41 | 82.0% | 50 | 34 | 68.0% | 14.0% |
| 2 | 50 | 28 | 56.0% | 50 | 37 | 74.0% | -18.0% |
| 3 | 50 | 31 | 62.0% | 50 | 21 | 42.0% | 20.0% |
| 4 | 50 | 37 | 74.0% | 50 | 34 | 68.0% | 6.0% |
| 5 | 50 | 26 | 52.0% | 50 | 23 | 46.0% | 6.0% |
| 6 | 50 | 36 | 72.0% | 50 | 27 | 54.0% | 18.0% |
| 7 | 50 | 33 | 66.0% | 50 | 46 | 92.0% | -26.0% |
| 8 | 50 | 41 | 82.0% | 50 | 29 | 58.0% | 24.0% |
| 9 | 50 | 38 | 76.0% | 50 | 31 | 62.0% | 14.0% |
| 10 | 50 | 32 | 64.0% | 50 | 40 | 80.0% | -16.0% |

## Badcase Overlap
| metric | count |
| --- | --- |
| shared_badcase | 278 |
| nox@content-tone-llm-v1_only_badcase | 65 |
| xtb@content-tone-llm-v1_only_badcase | 44 |

## Badcase Cause Summary
| provider | category | count |
| --- | --- | --- |
| nox@content-tone-llm-v1 | 其他 | 213 |
| nox@content-tone-llm-v1 | 证据缺失或信号不足 | 63 |
| nox@content-tone-llm-v1 | 泛相关性偏离 | 43 |
| nox@content-tone-llm-v1 | 娱乐/儿童/泛内容偏离 | 16 |
| nox@content-tone-llm-v1 | 宠物/动物受众冲突 | 4 |
| nox@content-tone-llm-v1 | 科技/电子垂类偏离 | 4 |
| xtb@content-tone-llm-v1 | 其他 | 200 |
| xtb@content-tone-llm-v1 | 泛相关性偏离 | 52 |
| xtb@content-tone-llm-v1 | 证据缺失或信号不足 | 42 |
| xtb@content-tone-llm-v1 | 娱乐/儿童/泛内容偏离 | 22 |
| xtb@content-tone-llm-v1 | 宠物/动物受众冲突 | 3 |
| xtb@content-tone-llm-v1 | 科技/电子垂类偏离 | 3 |

## Shared Badcases
| channel | nox@content-tone-llm-v1 | xtb@content-tone-llm-v1 |
| --- | --- | --- |
| Taylor Swift | 发布几乎全是音乐/巡演/电影宣传，和婴儿营养品受众完全不匹配。 | 音乐/巡演/电影宣发为主，与婴儿营养品受众不匹配 |
| Justin Bieber | 核心是音乐和个人品牌，几乎没有亲子内容，不适合婴儿补充品。 | 音乐与个人品牌内容为主，缺少家长/婴儿受众 |
| Ariana Grande | 音乐/香水/专辑宣发为主，缺少家庭育儿线索，不像婴儿用品频道。 | 音乐宣发为主，未见婴儿/家庭相关承接 |
| Nike | 体育品牌内容与婴儿补充品目标人群差异大，缺少育儿消费场景。 | 运动品牌调性强，但与婴儿补充剂使用场景不符 |
| BILLIE EILISH | 以音乐和香氛发行为主，受众偏粉丝娱乐，不是育儿或母婴场景。 | 音乐+香氛推广，受众偏青少年，不适合婴儿补剂 |
| champagnepapi | 音乐、博彩和运动话题为主，和婴儿补充品的家庭购买场景不匹配。 | 音乐/博彩/个人叙事为主，与婴儿补剂不匹配 |
| Jin of BTS | 以音乐、旅行和品牌广告为主，没有婴儿/育儿场景，不太适合。 | 音乐偶像+奢侈品合作，非婴儿/家长场景 |
| Miley Cyrus | 核心是音乐/时尚/影视宣发，缺少育儿线索，不适合婴儿补充品。 | 音乐与时尚宣发为主，和婴儿补剂受众明显不符 |
| RM | 艺术、旅行、音乐和品牌合作为主，没有母婴或育儿语境。 | 艺术/音乐/奢侈品内容为主，不适合婴儿补剂 |
| Tom Holland | 以影视/品牌合作/生活方式内容为主，和婴儿营养补充剂受众不匹配 | 电影/酒精饮料/运动服饰，非婴儿消费场景 |
| IShowSpeed | 内容以极限整活、旅行和体育为主，和婴幼儿补充剂受众不匹配 | 强娱乐/挑战型内容，受众和婴儿补剂严重错位 |
| BROWN | 内容是R&B音乐宣传，和婴儿营养补充剂受众与场景明显不符 | R&B 音乐宣发为主，与婴儿补剂无明显关联 |
| Sabrina Carpenter | 内容以音乐、巡演、时尚宣传为主，和婴儿补充剂受众不匹配 | 音乐/巡演/香水推广为主，不是婴儿垂直 |
| Zendaya | 影视和时尚宣发主导，缺少家庭育儿场景，不适合母婴商品。 | 影视/时尚/运动品牌为主，与婴儿补剂不匹配 |
| Olivia Rodrigo | 音乐与巡演内容为主，受众偏年轻粉丝，不是婴儿补充品场景。 | 音乐与时尚内容为主，缺少婴儿家庭场景 |
| Beyoncé | 音乐/个人纪念与品牌宣发为主，缺少育儿或婴幼儿消费场景 | 音乐人/巡演/美妆为主，与婴儿补充剂受众不匹配 |
| KAROL G | 以巡演、音乐作品和情绪表达为主，不具备婴幼儿商品承载场景 | 以音乐、演出和个人表达为主，不适合婴儿补充剂推广 |
| DOVE | 影视/音乐/红毯内容为主，与婴幼儿补充剂受众不匹配 | 演员歌手型内容，主要是作品宣发与时尚曝光 |
| Jennifer Lopez | 明星宣传与美妆为主，没有婴幼儿喂养或育儿内容 | 娱乐明星与美妆宣传为主，不具备母婴内容承载 |
| flame | 说唱/派对/巡演调性强，和婴幼儿补充剂人群明显冲突 | 说唱/派对/巡演调性，和婴儿补充剂完全不对口 |
| harrystyles | 音乐与巡演内容为主，缺少婴幼儿或家庭育儿受众 | 偏音乐作品与抽象表达，缺少母婴商品承载能力 |
| NASA | 科普宇宙内容，与婴幼儿补充剂完全不相干 | 科普机构账号，与婴儿补充剂消费场景明显不符 |
| Shawn Mendes | 巡演/情感/个人成长内容为主，不适合婴幼儿商品推广 | 音乐巡演与公益表达为主，不适合婴儿补充剂推广 |
| Lady Gaga | 舞台、时尚、音乐作品调性强，与母婴商品受众不一致 | 音乐/时尚/舞台型账号，和婴儿补充剂不匹配 |
| Millie Bobby Brown | 青少年/美妆/时尚内容为主，没有婴幼儿养育场景 | 主轴是美妆、时尚与品牌，自身不是母婴账号 |
| Demi Lovato | 音乐巡演和成人情感内容为主，和 baby supplement 不匹配 | 音乐巡演内容为主，受众与婴儿补充剂不一致 |
| Sadie Sink | 戏剧/时尚/品牌合作为主，缺少母婴或育儿内容 | 演员时尚向账号，缺少母婴商品承载场景 |
| Nike Football | 足球/体育赛事频道，和婴幼儿补充剂受众明显不符 | 足球赛事与运动文化号，不适合婴儿补充剂推广 |
| ⋆𐙚₊˚⊹♡ camila | 音乐创作与巡演内容为主，没有婴幼儿场景 | 音乐创作与巡演生活为主，和婴儿补充剂场景冲突 |
| Kevin Hart | 喜剧/父亲视角内容不等于母婴推广，且无宝宝营养证据 | 喜剧与体育日常为主，不具备婴儿补充剂承载场景 |

## nox@content-tone-llm-v1-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 8 | Instagram |  | 内容是创作者故事和艺术展示，非母婴或育儿主题，不适合该商品。 |
| 20 | MrBeast |  | 频道以挑战娱乐、综艺式内容为主，与婴儿营养补充剂受众和承载场景不匹配 |
| 32 | Gigi Hadid |  | 时尚/品牌/生活方式为主，不是母婴或育儿频道 |
| 39 | Antonela Roccuzzo |  | 奢侈品、时尚和家庭生活为主，不足以支撑婴幼儿补充剂推广 |
| 41 | Priyanka |  | 影视和时尚活动为主，未见母婴或宝宝营养主题 |
| 46 | Jennifer Aniston |  | 内容以明星日常、护发和活动推广为主，缺少婴儿/育儿相关承接 |
| 49 | Bella 🦋 |  | 内容以时尚、美妆、香水和个人生活为主，不适合婴儿补充剂推广 |
| 91 | SZA |  | 音乐+美妆内容很强，但仍不是母婴受众 |
| 102 | Jensen Ackles |  | 影视演员宣发为主，和母婴产品无关 |
| 103 | J Balvin |  | 音乐舞台与婴儿补充剂受众不匹配 |
| 104 | Lily Collins |  | 时尚影视向，缺少母婴承载场景 |
| 111 | Big mama |  | 音乐人流行文化内容为主，和婴儿补充剂不搭 |
| 125 | easymoneysniper |  | 篮球潮流代言为主，母婴语境缺失 |
| 126 | Channing Tatum |  | 影视/活动内容为主，缺少育儿或婴童消费场景 |
| 135 | Bretman Rock |  | 美妆和宠物梗为主，和婴童商品场景不一致 |
| 136 | Mark Zuckerberg |  | 科技、AI和商务社交为主，不适合婴童补充品 |
| 138 | camila mendes |  | 影视宣传与红毯时尚为主，不适合婴童品推广 |
| 139 | CARMEN VILLALOBOS |  | 电视剧与红毯风格为主，缺少育儿受众和场景 |
| 147 | Becky G |  | 音乐与时尚主导，婴童补充品承载能力弱 |
| 159 | Logan Paul |  | 流量、收藏和运动娱乐内容占主导，和婴儿补充剂不匹配 |
| 171 | The School Of Hard Knocks |  | 商业访谈和创业内容，和婴儿补充剂受众不直接相关 |
| 172 | Shohei Ohtani  |  大谷翔平 |  | 棒球运动员内容为主，与婴儿补充剂场景不匹配 |
| 173 | Paul Wesley |  | 健康管理偏成人 longevity，不是婴儿或育儿场景 |
| 174 | Odell Beckham Jr |  | 以运动、家庭感悟和个人表达为主，缺少母婴消费承接 |
| 200 | SHEIN.COM |  | 主打快时尚和家居，不是母婴营养品的自然场景 |
| 210 | PUMA |  | 运动品牌和赛事内容为主，不是婴儿补剂的自然承接场景 |
| 239 | Adriana Lima |  | 时尚美妆和奢牌活动为主，非家庭育儿内容，不适合母婴品 |
| 240 | One Direction |  | 没有公开视频可判断，也缺少任何母婴或育儿承载证据 |
| 242 | cazzu |  | 巡演、演出和音乐发行信息为主，缺少家庭或母婴内容 |
| 250 | emilia |  | 音乐、时尚和旅行内容为主，未见育儿或母婴相关表达 |

## xtb@content-tone-llm-v1-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 51 | David Beckham |  | 内容偏足球/联名/农场生活，缺少婴幼儿或育儿受众 |
| 59 | Megan Thee Stallion |  | 潮流、音乐、泳装与美妆为主，不是母婴内容场 |
| 60 | Barbara Palvin |  | 时尚模特型内容为主，缺少育儿与母婴消费语境 |
| 66 | Result 66 |  | 音乐巡演型账号，缺少育儿或家庭消费场景 |
| 69 | Ashton Hall |  | 健身自律人设明显，但不是母婴或育儿受众 |
| 70 | Jordan Howlett |  | 美食搞笑账号，缺少母婴商品的自然承接场景 |
| 73 | Ye |  | 音乐/时尚/个人表达为主，与母婴补充品无关 |
| 74 | Younes Zarou |  | 魔术/整活型内容，缺少母婴或育儿消费语境 |
| 86 | Brent Rivera |  | 恶搞恋爱向短视频为主，受众年轻，不是母婴品类。 |
| 88 | Chris Bumstead |  | 健身补剂能见度高，但受众是成人健身圈，不是婴幼儿家长。 |
| 106 | Lili Reinhart |  | 个人护理/演艺为主，不具婴童补充剂承载场景 |
| 113 | ABHISHEK MALHAN |  | 综艺/搞笑/挑战向，和母婴商品受众不搭 |
| 186 | Jay Wheeler |  | 以音乐发行和演出为主，没有母婴受众基础 |
| 189 | Adam W |  | 以搞笑短视频和广告梗为主，不是母婴垂类 |
| 226 | Ryan & Jen Hamilton (HAMMY TV) |  | 夫妻恶搞内容为主，几乎无育儿或母婴受众 |
| 228 | Joshua Platillero |  | 旅行风景摄影号，和婴儿营养品受众错位 |
| 254 | Sunny Leone |  | 以时尚/综艺/品牌展示为主，缺少母婴受众 |
| 296 | BIG SEAN |  | 内容以说唱/音乐工业为主，不是亲子消费人群 |
| 309 | Jimmy Neutch |  | 时尚派对与个人叙事为主，缺少母婴承接 |
| 321 | Martin Lawrence |  | 脱口秀/喜剧账号，不适合婴儿补充剂推广 |
| 324 | taraji p henson |  | 时尚表演型账号，缺少母婴承接能力 |
| 329 | Vogue |  | 时尚媒体调性偏内容消费，不是母婴营养品的自然推广场 |
| 333 | Nicole Kidman |  | 影视明星内容偏作品宣传与生活记录，不适合婴儿补充品 |
| 334 | Tom Brady |  | 体育明星内容以比赛和运动装备为主，和婴儿营养品不匹配 |
| 336 | Mariah Carey |  | 歌手账号偏音乐与家庭节庆，不足以支撑婴儿营养品推广 |
| 337 | Justus Reid |  | 家居改造/搬家日记号，和婴儿营养补充品没有直接关联 |
| 338 | Hoyeon |  | 时尚奢侈品牌号，内容不适合婴儿营养补充品推广 |
| 340 | J O E J O N A S |  | 音乐娱乐号，虽然有品牌合作但不具备母婴推广语境 |
| 342 | Madison Bailey |  | 年轻演员生活号，和婴儿营养补充品受众不对位 |
| 347 | Pokémon |  | 游戏IP/玩具号，不是人类婴儿营养补充品的适合频道 |

## Notes
- Page-level rates use `page_size` from each run metadata.
- Cause categories are heuristic clusters from `why_short`; review representative rows before making product decisions.
