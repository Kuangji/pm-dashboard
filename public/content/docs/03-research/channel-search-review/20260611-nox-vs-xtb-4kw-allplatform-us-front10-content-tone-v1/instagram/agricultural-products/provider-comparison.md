# Channel Search Provider Comparison

- keyword: agricultural products
- platform: instagram
- country: US
- left: nox@content-tone-llm-v1 (tmp/channel-search-review/20260611-nox-vs-xtb-4kw-allplatform-us-front10-content-tone-v1/instagram/agricultural-products/nox-instagram)
- right: xtb@content-tone-llm-v1 (tmp/channel-search-review/20260611-nox-vs-xtb-4kw-allplatform-us-front10-content-tone-v1/instagram/agricultural-products/xtb-instagram)
- left_rule_version: content-tone-llm-v1
- right_rule_version: content-tone-llm-v1
- left_prompt_hash: 1228e2ff575f
- right_prompt_hash: 1228e2ff575f

## Run Overview
| run | provider | rule_version | total | fit | adjacent | badcase | badcase率 | <0 | 0-9 | 10-19 | 20+ |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| nox@content-tone-llm-v1 | nox | content-tone-llm-v1 | 500 | 2 | 96 | 402 | 80.4% | 0 | 500 | 0 | 0 |
| xtb@content-tone-llm-v1 | xtb | content-tone-llm-v1 | 500 | 1 | 121 | 378 | 75.6% | 0 | 500 | 0 | 0 |

## Page-Level Badcase Rate
| page | nox@content-tone-llm-v1_total | nox@content-tone-llm-v1_badcase | nox@content-tone-llm-v1_badcase率 | xtb@content-tone-llm-v1_total | xtb@content-tone-llm-v1_badcase | xtb@content-tone-llm-v1_badcase率 | badcase率差 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 50 | 36 | 72.0% | 50 | 44 | 88.0% | -16.0% |
| 2 | 50 | 33 | 66.0% | 50 | 35 | 70.0% | -4.0% |
| 3 | 50 | 35 | 70.0% | 50 | 28 | 56.0% | 14.0% |
| 4 | 50 | 44 | 88.0% | 50 | 40 | 80.0% | 8.0% |
| 5 | 50 | 29 | 58.0% | 50 | 41 | 82.0% | -24.0% |
| 6 | 50 | 49 | 98.0% | 50 | 29 | 58.0% | 40.0% |
| 7 | 50 | 42 | 84.0% | 50 | 49 | 98.0% | -14.0% |
| 8 | 50 | 50 | 100.0% | 50 | 34 | 68.0% | 32.0% |
| 9 | 50 | 40 | 80.0% | 50 | 37 | 74.0% | 6.0% |
| 10 | 50 | 44 | 88.0% | 50 | 41 | 82.0% | 6.0% |

## Badcase Overlap
| metric | count |
| --- | --- |
| shared_badcase | 340 |
| nox@content-tone-llm-v1_only_badcase | 62 |
| xtb@content-tone-llm-v1_only_badcase | 38 |

## Badcase Cause Summary
| provider | category | count |
| --- | --- | --- |
| nox@content-tone-llm-v1 | 其他 | 266 |
| nox@content-tone-llm-v1 | 泛相关性偏离 | 52 |
| nox@content-tone-llm-v1 | 证据缺失或信号不足 | 43 |
| nox@content-tone-llm-v1 | 娱乐/儿童/泛内容偏离 | 35 |
| nox@content-tone-llm-v1 | 科技/电子垂类偏离 | 4 |
| nox@content-tone-llm-v1 | 宠物/动物受众冲突 | 2 |
| xtb@content-tone-llm-v1 | 其他 | 249 |
| xtb@content-tone-llm-v1 | 泛相关性偏离 | 59 |
| xtb@content-tone-llm-v1 | 证据缺失或信号不足 | 39 |
| xtb@content-tone-llm-v1 | 娱乐/儿童/泛内容偏离 | 22 |
| xtb@content-tone-llm-v1 | 科技/电子垂类偏离 | 5 |
| xtb@content-tone-llm-v1 | 宠物/动物受众冲突 | 4 |

## Shared Badcases
| channel | nox@content-tone-llm-v1 | xtb@content-tone-llm-v1 |
| --- | --- | --- |
| Taylor Swift | 音乐/巡演/专辑内容为主，和农产品不匹配 | 内容几乎全是音乐/影视宣发，与农产品无关 |
| Selena Gomez | 美妆、影视和日常为主，缺少食品/农产品内容 | 以美妆、影视和个人生活为主，不匹配农产品 |
| Kylie | 时尚美妆与生活方式为主，无农产品场景 | 时尚美妆和个人生活为主，和农产品不搭 |
| Justin Bieber | 音乐和个人品牌内容为主，不适合农产品推广 | 音乐人账号，主要是作品和生活更新，不适合 |
| Ariana Grande | 音乐宣发占主导，缺少农产品相关受众 | 音乐宣发占主导，缺少农产品承载场景 |
| Nike | 体育营销很强，但与农产品主题不直接相关 | 体育品牌官方号，非农产品传播场景 |
| BILLIE EILISH | 音乐与香水/美妆宣发为主，不贴农产品 | 偏音乐与美妆香氛，不适合农产品推广 |
| champagnepapi | 音乐、赛事和博彩内容为主，和农产品无关 | 音乐与博彩宣发为主，和农产品无关 |
| Kendall | 时尚、美妆和香氛为主，不是农产品调性 | 时尚美妆账号，缺少农产品消费场景 |
| Kim Kardashian | 时尚、公益和联名为主，缺少农产品承载 | 个人娱乐与时尚品牌内容为主，不适合 |
| Hailey Rhode Bieber | 护肤时尚为主，缺少食品/农产品内容 | 美妆护肤和生活方式为主，不匹配农产品 |
| badgalriri | 美妆时尚与香氛为主，不贴农产品 | 美妆时尚和品牌内容为主，与农产品不相关 |
| Miley Cyrus | 音乐、时尚与香氛合作为主，不适合农产品 | 音乐与时尚宣发为主，缺少农产品相关调性 |
| RM | 艺术、音乐和品牌广告为主，缺少农产品内容 | 艺术与音乐气质强，和农产品营销弱相关 |
| IShowSpeed | 挑战、旅游和极限体验为主，不适合农产品 | 高能娱乐和出海挑战为主，不适合农产品 |
| BROWN | R&B 音乐宣发为主，没有食品/农产品场景 | 音乐人账号，主要是专辑与巡演宣传 |
| Zendaya | 电影、时尚与品牌合作为主，不是农产品调性 | 影视时尚与代言为主，缺少农产品承载能力 |
| Olivia Rodrigo | 音乐与时尚宣发为主，和农产品不匹配 | 音乐宣发为主，没有农产品相关内容 |
| Beyoncé | 内容以音乐、巡演和个人品牌为主，不具农产品推广承载。 | 音乐/美妆/巡演内容为主，和农产品推广无关 |
| KAROL G | 主轴是音乐巡演与娱乐活动，缺少农业或食品消费场景。 | 以音乐、演出和个人表达为主，不适合农产品推广 |
| DOVE | 以影视音乐和个人动态为主，和农产品推广关系很弱。 | 影视/音乐/红毯内容居多，与农产品受众不匹配 |
| Jennifer Lopez | 核心是影视、红毯和美妆品牌，不适合农产品推广。 | 频道调性偏明星娱乐与美妆，不承接农产品推广 |
| flame | 说唱派对和巡演内容占主，和农产品场景明显不符。 | 说唱/派对/潮流内容为主，不承接农产品推广 |
| NASA | 科普宇宙与航天内容，和农产品推广几乎无关。 | 航天科普与天文内容，和农产品推广不相干 |
| Shawn Mendes | 以音乐巡演为主，虽有自然议题，但与农产品销售仍偏远。 | 巡演与音乐内容为主，和农产品推广不匹配 |
| Lady Gaga | 音乐、时尚和演出是主体，不是农产品适配频道。 | 音乐舞台与时尚内容为主，不适合农产品合作 |
| Demi Lovato | 音乐巡演导向明显，和农产品推广场景不匹配。 | 音乐巡演与情感表达为主，不适合农产品推广 |
| Sadie Sink | 戏剧和时尚活动为主，不适合农产品推广。 | 戏剧/时尚/品牌内容为主，和农产品无关 |
| Priyanka | 影视和品牌内容为主，和农产品推广关系不强。 | 影视/美妆/时尚与商业合作为主，不适合农产品 |
| Nike Football | 足球赛事与运动装备导向明显，不适合农产品合作。 | 足球赛事内容，和农产品推广场景明显不符 |

## nox@content-tone-llm-v1-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 12 | 👑 |  | 运动与代言内容居多，不接农产品主题 |
| 85 | Brent Rivera |  | 以搞笑短视频和情侣生活内容为主，不像农产品频道 |
| 119 | Zach King |  | 魔术短片娱乐号，缺少农产品使用语境 |
| 122 | Madelaine Petsch |  | 演员时尚美妆号，和农产品不匹配 |
| 125 | easymoneysniper |  | 篮球运动员账号，非农产品受众 |
| 130 | Mike Holston |  | 动物野外内容偏观赏，不是农产品购买决策 |
| 138 | camila mendes |  | 电影和时尚内容为主，不适合农产品推广 |
| 139 | CARMEN VILLALOBOS |  | 剧集红毯型内容，和农产品推广场景不符 |
| 147 | Becky G |  | 音乐美妆生活号，不是农产品核心受众 |
| 148 | A N A   D E   A R M A S |  | 电影动作片宣传型账号，不适合农产品推广 |
| 178 | Kate Hudson |  | 频道以影视、红毯、个人生活和美妆合作为主，和农业产品推广不匹配 |
| 182 | NATTI NATASHA |  | 内容以音乐、家庭、时尚活动为主，和农产品推广场景不匹配 |
| 186 | Alicia Keys |  | 频道以音乐演出和舞台内容为主，和农产品推广场景明显不匹配。 |
| 192 | lanacondor |  | 内容以影视宣发、时尚生活、社交日常为主，与农产品推广受众不匹配 |
| 193 | Drew Barrymore |  | 内容以名人生活、家居、美妆和品牌联名为主，与农产品推广受众不匹配 |
| 194 | Giannis Antetokounmpo |  | 体育明星日常与商业合作为主，缺少农业品类承载能力 |
| 250 | emilia |  | 流行音乐账号，主要承载新歌与巡演，不适合农产品 |
| 251 | Max Amini |  | 内容为脱口秀/社会评论，和农产品推广几乎无关 |
| 252 | Courteney Cox |  | 以影视明星日常和美妆护肤为主，不适合农产品推广 |
| 253 | Sunny Leone |  | 时尚娱乐型账号，和农产品消费场景不匹配 |
| 254 | 50 Cent |  | 音乐人/娱乐内容为主，缺少农产品承载场景 |
| 255 | bronny |  | 体育明星加品牌广告，不具农产品推广语境 |
| 256 | postmalone |  | 演出巡演型音乐账号，和农产品受众不重合 |
| 258 | Joey King |  | 演员时尚美妆号，和农产品不在同一消费场景 |
| 260 | maddie |  | 时尚影像与个人生活内容，不适合农产品推广 |
| 261 | Alex Cooper |  | 播客与生活方式账号，缺少农业/食品推广语境 |
| 262 | Sofia Vergara |  | 明星日常和时尚活动为主，不支持农产品转化 |
| 263 | Laro Benz |  | 搞笑短视频号，和农产品购买场景关联弱 |
| 264 | Ricky Martin |  | 音乐演出账号，与农产品目标受众明显不符 |
| 265 | Son HeungMin(손흥민)🇰🇷 |  | 足球明星内容可带货但不匹配农产品品类 |

## xtb@content-tone-llm-v1-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 23 | Sabrina Carpenter |  | 音乐与香水宣发为主，不适合农产品推广 |
| 31 | Result 31 |  | 偏音乐与艺术表达，缺少农产品推广承载能力 |
| 32 | Gigi Hadid |  | 时尚与品牌内容为主，不适合农产品合作推广 |
| 36 | Millie Bobby Brown |  | 美妆服饰与品牌带货为主，非农产品频道 |
| 39 | Antonela Roccuzzo |  | 以时尚、珠宝和品牌合作为主，不适合农产品 |
| 40 | Lele Pons |  | 母婴喜剧短视频为主，与农产品合作无直接关联 |
| 43 | ⋆𐙚₊˚⊹♡ camila |  | 音乐与生活记录为主，不承接农产品推广 |
| 46 | Jennifer Aniston |  | 生活方式/护发/影视内容为主，非农产品频道 |
| 49 | Bella 🦋 |  | 香氛美妆与生活方式内容为主，非农产品受众 |
| 80 | Adam Sandler |  | 纯娱乐/巡演内容，和农产品不对口 |
| 89 | Barack Obama |  | 政治公共事务号，和商品推广语境不匹配 |
| 92 | SZA |  | 音乐与美妆号，和农产品关联弱 |
| 101 | Ellen DeGeneres |  | 明星祝福与综艺回忆为主，和农产品推广无关 |
| 106 | Lili Reinhart |  | 美妆影视生活内容，难自然承接农产品推广 |
| 152 | Ryan Reynolds |  | 影视、体育和广告内容为主，不适合农产品推广 |
| 174 | Paul Wesley |  | 健康生活内容有一定相邻性，但仍偏离农产品 |
| 204 | Dylan Sprouse |  | 影视时尚与商业合作为主，和农产品弱相关 |
| 209 | Tom Felton |  | 演员与影视舞台内容为主，不适合农产品合作 |
| 210 | Dude Perfect |  | 娱乐运动挑战号，与农产品消费无关 |
| 214 | 刘美贤 |  | 时尚红毯与品牌合作号，不适合农产品推广 |
| 218 | Madelyn Cline |  | 影视时尚账号，和农产品推广几乎无关 |
| 224 | Jazz |  | 家居科技种草号，和农产品只有很弱间接关系 |
| 225 | Hannah Stocking |  | 喜剧演员内容以恋爱梗和影视合作为主 |
| 227 | Brooke Monk |  | 舞蹈/美妆/生活方式内容，不适合农产品推广 |
| 235 | Daniel LaBelle |  | 纯搞笑肢体表演号，不适合农产品合作推广 |
| 237 | Mark Tuan |  | 偶像音乐与时尚内容，不适合农产品推广 |
| 240 | Adriana Lima |  | 时尚美妆品牌合作为主，不适合农产品推广 |
| 241 | One Direction |  | 没有发布内容，无法支撑农产品推广判断 |
| 284 | Humans of New York |  | 虽有农场和食物议题，但主体是人文故事叙事，不是农产品推广号 |
| 304 | Jailyne Ojeda Ochoa |  | 偏个人生活与旅行，美妆属性强，和农产品不匹配 |

## Notes
- Page-level rates use `page_size` from each run metadata.
- Cause categories are heuristic clusters from `why_short`; review representative rows before making product decisions.
