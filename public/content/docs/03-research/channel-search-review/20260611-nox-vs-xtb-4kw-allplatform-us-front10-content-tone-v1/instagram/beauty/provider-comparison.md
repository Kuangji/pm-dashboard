# Channel Search Provider Comparison

- keyword: beauty
- platform: instagram
- country: US
- left: nox@content-tone-llm-v1 (tmp/channel-search-review/20260611-nox-vs-xtb-4kw-allplatform-us-front10-content-tone-v1/instagram/beauty/nox-instagram)
- right: xtb@content-tone-llm-v1 (tmp/channel-search-review/20260611-nox-vs-xtb-4kw-allplatform-us-front10-content-tone-v1/instagram/beauty/xtb-instagram)
- left_rule_version: content-tone-llm-v1
- right_rule_version: content-tone-llm-v1
- left_prompt_hash: 1228e2ff575f
- right_prompt_hash: 1228e2ff575f

## Run Overview
| run | provider | rule_version | total | fit | adjacent | badcase | badcase率 | <0 | 0-9 | 10-19 | 20+ |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| nox@content-tone-llm-v1 | nox | content-tone-llm-v1 | 500 | 100 | 201 | 199 | 39.8% | 0 | 500 | 0 | 0 |
| xtb@content-tone-llm-v1 | xtb | content-tone-llm-v1 | 500 | 86 | 223 | 191 | 38.2% | 0 | 500 | 0 | 0 |

## Page-Level Badcase Rate
| page | nox@content-tone-llm-v1_total | nox@content-tone-llm-v1_badcase | nox@content-tone-llm-v1_badcase率 | xtb@content-tone-llm-v1_total | xtb@content-tone-llm-v1_badcase | xtb@content-tone-llm-v1_badcase率 | badcase率差 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 50 | 11 | 22.0% | 50 | 13 | 26.0% | -4.0% |
| 2 | 50 | 23 | 46.0% | 50 | 20 | 40.0% | 6.0% |
| 3 | 50 | 10 | 20.0% | 50 | 13 | 26.0% | -6.0% |
| 4 | 50 | 20 | 40.0% | 50 | 17 | 34.0% | 6.0% |
| 5 | 50 | 16 | 32.0% | 50 | 24 | 48.0% | -16.0% |
| 6 | 50 | 28 | 56.0% | 50 | 11 | 22.0% | 34.0% |
| 7 | 50 | 29 | 58.0% | 50 | 30 | 60.0% | -2.0% |
| 8 | 50 | 25 | 50.0% | 50 | 24 | 48.0% | 2.0% |
| 9 | 50 | 22 | 44.0% | 50 | 22 | 44.0% | 0.0% |
| 10 | 50 | 15 | 30.0% | 50 | 17 | 34.0% | -4.0% |

## Badcase Overlap
| metric | count |
| --- | --- |
| shared_badcase | 151 |
| nox@content-tone-llm-v1_only_badcase | 48 |
| xtb@content-tone-llm-v1_only_badcase | 40 |

## Badcase Cause Summary
| provider | category | count |
| --- | --- | --- |
| nox@content-tone-llm-v1 | 其他 | 138 |
| nox@content-tone-llm-v1 | 证据缺失或信号不足 | 25 |
| nox@content-tone-llm-v1 | 泛相关性偏离 | 22 |
| nox@content-tone-llm-v1 | 娱乐/儿童/泛内容偏离 | 7 |
| nox@content-tone-llm-v1 | 科技/电子垂类偏离 | 4 |
| nox@content-tone-llm-v1 | 宠物/动物受众冲突 | 3 |
| xtb@content-tone-llm-v1 | 其他 | 123 |
| xtb@content-tone-llm-v1 | 泛相关性偏离 | 34 |
| xtb@content-tone-llm-v1 | 证据缺失或信号不足 | 19 |
| xtb@content-tone-llm-v1 | 娱乐/儿童/泛内容偏离 | 12 |
| xtb@content-tone-llm-v1 | 宠物/动物受众冲突 | 2 |
| xtb@content-tone-llm-v1 | 科技/电子垂类偏离 | 1 |

## Shared Badcases
| channel | nox@content-tone-llm-v1 | xtb@content-tone-llm-v1 |
| --- | --- | --- |
| Nike | 运动品牌账号，和美妆商品的受众场景不匹配 | 体育与运动品牌内容为主，不适合美容推广 |
| MrBeast | 娱乐挑战内容为主，缺少美妆受众 | 挑战整活型内容，不适合美容商品调性 |
| IShowSpeed | 极限挑战与游戏内容为主，不适合美妆 | 高强度整活与运动内容，缺少美容承载能力 |
| NASA | 科技科普频道，内容与美妆消费完全不在同一受众 | 纯科普/航天频道，与beauty商品场景冲突 |
| Nike Football | 足球赛事频道，内容受众和美妆商品几乎无交集 | 纯足球赛事频道，与beauty商品场景冲突 |
| Kevin Hart | 喜剧/体育型账号，缺少美妆消费与形象管理语境 | 喜剧/家庭/体育为主，几乎没有美容承载 |
| Tyga | 夜店说唱内容为主，与美妆商品承接弱 | 夜店/说唱/派对内容为主，不适合beauty投放 |
| Vin Diesel | 动作电影账号，内容与美妆消费没有自然承接 | 电影宣发与家庭感内容为主，和beauty不匹配 |
| Хабиб Нурмагомедов | 核心是格斗、宗教、地产和投资，不适合美妆推广 | 内容以格斗、体育、商业合作为主，与美妆推广受众不匹配 |
| adidas | 运动品牌号，内容与美妆商品目标受众不一致 | 频道内容几乎全是运动/赛事/品牌体育营销，与beauty受众和场景明显不符 |
| Marvel Entertainment | 超级英雄娱乐号，与美妆商品推广场景不符 | 影视娱乐账号，与美妆商品推广受众和内容场景明显不匹配 |
| Abel | 音乐巡演号，内容调性与美妆不匹配 | 内容全是巡演/音乐现场，与美妆受众和商品承载场景不匹配 |
| DILJIT DOSANJH | 演唱会与电影宣发为主，不适合美妆推广 | 内容是演唱会与电影宣传，和美妆推广场景明显不匹配 |
| French Montana | 说唱演出号，和美妆商品关联弱 | 内容以说唱、巡演、体育联动为主，和美妆消费场景不匹配 |
| House of Highlights | 体育集锦号，用户心智不在美妆消费 | 频道几乎全是体育赛事剪辑，与beauty商品受众和内容场景明显不匹配 |
| hustlemantherapper | 说唱炫富与音乐内容为主，不适合美妆推广 | 内容是说唱炫富和音乐发布，和美妆商品调性不相关 |
| Conor McGregor Official | 格斗训练/赛事为主，和美妆护肤受众错位 | 以格斗训练和赛事为主，和美妆/护肤承接度很低。 |
| Kai Cenat | 直播整活/游戏化内容，和美妆需求不匹配 | 直播娱乐内容为主，不是美妆消费决策场景。 |
| 21savage | 说唱宣发为主，缺少美妆承载语境 | 内容偏说唱情绪和音乐宣发，缺少美妆承载。 |
| Barack Obama | 政治/公共议题账号，不适合美妆合作 | 政治公共议题频道，和美妆商品推广明显不匹配。 |
| adidas Football | 足球品牌号，主语境是球衣赛事而非美妆 | 足球装备品牌内容，不适合美妆推广。 |
| Dan Bilzerian | 重口味生活方式与争议话题，和美妆调性冲突 | 内容调性偏争议娱乐与男性享乐，不适合美妆。 |
| La Doble P | 拉美音乐巡演宣发，和美妆种草关联弱 | 内容是音乐巡演/演出动态，与美妆商品推广不匹配 |
| Amaury Guichon | 甜品雕塑内容，和美妆商品场景不一致 | 内容是巧克力甜点艺术，与美妆商品受众和消费场景明显不匹配 |
| Marvel Studios | 影视动作宣发号，与美妆受众不匹配 | 内容是影视宣发，不具备美妆商品推广承载场景 |
| SportsCenter | 频道以体育赛事内容为主，和beauty商品受众错位 | 纯体育资讯频道，与美妆商品受众不符 |
| NBA | 纯体育赛事内容，与beauty商品明显不符 | 纯赛事内容，与美妆商品受众明显不符 |
| LEGO | 玩具积木垂类，和beauty受众不匹配 | 玩具品牌内容，与美妆商品明显不相干 |
| Mike Holston | 核心是野生动物和健身，和美妆消费无关 | 动物野外内容为主，和beauty受众明显不匹配 |
| hakki akdeniz | 餐饮公益内容为主，不适合美妆推广 | 餐饮公益号，内容形态不支持美容推广 |

## nox@content-tone-llm-v1-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 9 | champagnepapi |  | 音乐和博彩话题为主，不适合美妆推广 |
| 12 | 👑 |  | 体育、商业内容为主，和美妆不相关 |
| 19 | Tom Holland |  | 影视和饮品服饰为主，不适合美妆 |
| 58 | Anwar Jibawi |  | 主要是搞笑短剧，不具备美妆商品承载 |
| 63 | Robert Downey Jr. |  | 影视与超级英雄内容为主，缺少美妆消费场景 |
| 70 | Jordan Howlett |  | 以美食/梗内容为主，没有美妆转化环境 |
| 74 | Younes Zarou |  | 特效挑战和整活内容，和美妆不匹配 |
| 77 | Future PLUTO Hendrix |  | 音乐人宣发为主，缺少美妆或消费决策内容 |
| 87 | Chris Bumstead |  | 健身增肌内容为主，与美妆受众弱相关 |
| 124 | Disney |  | 家庭娱乐IP号，和beauty商品不对口 |
| 160 | Marshall Mathers |  | 以音乐、周边和个人叙事为主，不是美妆承载型频道。 |
| 169 | King Bach |  | 主打搞笑短剧，和美妆商品的决策场景不匹配。 |
| 170 | “REAL HASTA LA MUERTE” |  | 核心是 reggaeton/trap 音乐宣发，不是美妆受众。 |
| 181 | Romeo Santos |  | 核心是演唱会与音乐发片，不适合美妆推广 |
| 184 | Jay Wheeler |  | 音乐宣发和播客为主，缺少美妆承载能力 |
| 185 | BEAUTIFUL DESTINATIONS |  | 旅行景观频道，和美妆商品目标受众不一致 |
| 255 | bronny |  | 体育和品牌联动为主，没有美妆消费内容 |
| 256 | postmalone |  | 音乐巡演与酒类内容为主，不适合美妆推广 |
| 263 | Laro Benz |  | 以搞笑日常和健身内容为主，没有美妆承接 |
| 265 | Son HeungMin(손흥민)🇰🇷 |  | 足球运动员账号，内容与美妆受众明显不重合 |
| 266 | Fuerza Regida |  | 音乐巡演和周边为主，缺少美妆内容承接 |
| 268 | Arnold Schwarzenegger |  | 健康健身与补剂导向，和美妆商品不匹配 |
| 278 | Hugh Jackman |  | 以影视、舞台和活动宣传为主，缺少美妆承载场景 |
| 279 | Anna Kendrick |  | 主要是影视宣发和品牌轻投放，没有美妆调性 |
| 280 | Doğuş |  | 以音乐与家庭日常为主，不具备美妆推广语境 |
| 281 | Ice Cube |  | 音乐、演出和体育票务导向，和beauty明显不搭 |
| 283 | Humans of New York |  | 人文故事号，内容调性与商品推广几乎无关 |
| 284 | Jack Black |  | 喜剧影视与演出为主，没有美妆受众或内容场景 |
| 285 | Mark Wahlberg |  | 健身、信仰和品牌内容为主，不是美妆场景 |
| 290 | SIMONE BILES |  | 体育个人号，内容与美妆购买决策不相干 |

## xtb@content-tone-llm-v1-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 30 | flame |  | 以音乐、街头文化和服饰为主，缺少美容承接 |
| 31 | Result 31 |  | 抽象音乐/艺术取向强，缺少美妆消费场景 |
| 34 | Shawn Mendes |  | 以巡演与音乐为主，和beauty商品调性明显不搭 |
| 45 | Bruno Mars |  | 以音乐与舞台形象为主，缺少美容/护肤内容 |
| 48 | Zayn Malik |  | 音乐巡演账号，缺少妆发护肤和消费决策内容 |
| 66 | Result 66 |  | 内容几乎全是巡演/专辑宣传，和beauty商品推广不匹配 |
| 73 | Ye |  | 频道以音乐、个人动态和品牌发言为主，几乎无美妆内容承载 |
| 82 | Jimmy Fallon |  | 以综艺访谈、音乐、体育和明星互动为主，缺少美妆承载场景 |
| 141 | FEID PRO MAX |  | 音乐巡演号，缺少美容或护肤语境 |
| 142 | Michael Jackson |  | 纯音乐纪念内容，和美容消费场景不匹配 |
| 144 | Luan Santana |  | 巡演宣发为主，不适合美容商品推广 |
| 145 | Niall Horan |  | 演出和专辑内容为主，美容承载很弱 |
| 172 | The School Of Hard Knocks |  | 商业访谈号偏财富与创业，和美妆受众错位 |
| 173 | Shohei Ohtani  |  大谷翔平 |  | 棒球运动员账号，内容与美妆消费场景不相容 |
| 205 | NATANAEL CANO |  | 频道以音乐发布和巡演宣传为主，和美妆商品调性不匹配 |
| 215 | C A M I L O |  | 家庭/音乐/节日生活为主，缺少美妆承载能力 |
| 222 | The Voice |  | 内容以说唱/音乐发布为主，缺少美妆相关承载 |
| 228 | Joshua Platillero |  | 内容以旅行风景和户外拍摄为主，不承接美妆推广。 |
| 230 | Justin Timberlake |  | 巡演和个人生活为主，和美妆消费场景弱相关。 |
| 233 | Juan De Dios Pantoja |  | 家庭娱乐和品牌口播为主，未见美妆/护肤内容。 |
| 234 | Larissa Oliveira |  | 夫妻搞笑和生活记录为主，不是美妆受众。 |
| 235 | Daniel LaBelle |  | 肢体喜剧和家庭清洁梗，和美妆推广几乎无关。 |
| 243 | cazzu |  | 音乐巡演和专辑宣传为主，不适合美妆商品推广。 |
| 302 | SHENYENG |  | 几乎全是音乐发行和演出，和美妆商品受众不匹配 |
| 340 | J O E J O N A S |  | 音乐娱乐号，和美妆商品关系弱 |
| 343 | Timothée Chalamet |  | 演员时尚号，缺少美妆消费语境 |
| 350 | Jay Shetty |  | 心理成长/播客号，与美妆商品不对口 |
| 352 | REMA |  | 以音乐单曲、秀场和时尚打卡为主，缺少美妆承载 |
| 375 | 𝚙𝚔 |  | 独立音乐和电影宣发为主，和 beauty 不匹配 |
| 376 | KAZI |  | 发布多为家庭搞笑、旅行和整活视频，非美妆受众 |

## Notes
- Page-level rates use `page_size` from each run metadata.
- Cause categories are heuristic clusters from `why_short`; review representative rows before making product decisions.
