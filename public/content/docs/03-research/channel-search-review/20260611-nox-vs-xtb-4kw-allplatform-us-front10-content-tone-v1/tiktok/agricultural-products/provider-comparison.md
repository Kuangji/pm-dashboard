# Channel Search Provider Comparison

- keyword: agricultural products
- platform: tiktok
- country: US
- left: nox@content-tone-llm-v1 (tmp/channel-search-review/20260611-nox-vs-xtb-4kw-allplatform-us-front10-content-tone-v1/tiktok/agricultural-products/nox-tiktok)
- right: xtb@content-tone-llm-v1 (tmp/channel-search-review/20260611-nox-vs-xtb-4kw-allplatform-us-front10-content-tone-v1/tiktok/agricultural-products/xtb-tiktok)
- left_rule_version: content-tone-llm-v1
- right_rule_version: content-tone-llm-v1
- left_prompt_hash: 1228e2ff575f
- right_prompt_hash: 1228e2ff575f

## Run Overview
| run | provider | rule_version | total | fit | adjacent | badcase | badcase率 | <0 | 0-9 | 10-19 | 20+ |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| nox@content-tone-llm-v1 | nox | content-tone-llm-v1 | 500 | 11 | 101 | 388 | 77.6% | 0 | 500 | 0 | 0 |
| xtb@content-tone-llm-v1 | xtb | content-tone-llm-v1 | 500 | 7 | 109 | 384 | 76.8% | 0 | 500 | 0 | 0 |

## Page-Level Badcase Rate
| page | nox@content-tone-llm-v1_total | nox@content-tone-llm-v1_badcase | nox@content-tone-llm-v1_badcase率 | xtb@content-tone-llm-v1_total | xtb@content-tone-llm-v1_badcase | xtb@content-tone-llm-v1_badcase率 | badcase率差 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 50 | 32 | 64.0% | 50 | 36 | 72.0% | -8.0% |
| 2 | 50 | 45 | 90.0% | 50 | 42 | 84.0% | 6.0% |
| 3 | 50 | 36 | 72.0% | 50 | 34 | 68.0% | 4.0% |
| 4 | 50 | 35 | 70.0% | 50 | 43 | 86.0% | -16.0% |
| 5 | 50 | 37 | 74.0% | 50 | 36 | 72.0% | 2.0% |
| 6 | 50 | 38 | 76.0% | 50 | 42 | 84.0% | -8.0% |
| 7 | 50 | 41 | 82.0% | 50 | 36 | 72.0% | 10.0% |
| 8 | 50 | 38 | 76.0% | 50 | 25 | 50.0% | 26.0% |
| 9 | 50 | 47 | 94.0% | 50 | 47 | 94.0% | 0.0% |
| 10 | 50 | 39 | 78.0% | 50 | 43 | 86.0% | -8.0% |

## Badcase Overlap
| metric | count |
| --- | --- |
| shared_badcase | 347 |
| nox@content-tone-llm-v1_only_badcase | 41 |
| xtb@content-tone-llm-v1_only_badcase | 37 |

## Badcase Cause Summary
| provider | category | count |
| --- | --- | --- |
| nox@content-tone-llm-v1 | 其他 | 241 |
| nox@content-tone-llm-v1 | 泛相关性偏离 | 45 |
| nox@content-tone-llm-v1 | 证据缺失或信号不足 | 41 |
| nox@content-tone-llm-v1 | 娱乐/儿童/泛内容偏离 | 39 |
| nox@content-tone-llm-v1 | 宠物/动物受众冲突 | 20 |
| nox@content-tone-llm-v1 | 科技/电子垂类偏离 | 2 |
| xtb@content-tone-llm-v1 | 其他 | 243 |
| xtb@content-tone-llm-v1 | 泛相关性偏离 | 46 |
| xtb@content-tone-llm-v1 | 证据缺失或信号不足 | 45 |
| xtb@content-tone-llm-v1 | 娱乐/儿童/泛内容偏离 | 36 |
| xtb@content-tone-llm-v1 | 宠物/动物受众冲突 | 13 |
| xtb@content-tone-llm-v1 | 科技/电子垂类偏离 | 1 |

## Shared Badcases
| channel | nox@content-tone-llm-v1 | xtb@content-tone-llm-v1 |
| --- | --- | --- |
| charli d’amelio | 以舞蹈和时尚为主，缺少农业或消费决策场景 | 内容以舞蹈和个人表达为主，缺少农产品或食品消费场景 |
| BILLIE EILISH | 几乎全是音乐巡演和作品发布，不适合农业推广 | 纯音乐宣发为主，和农产品推广的消费场景明显不匹配 |
| IShowSpeed | 直播/体育/周边为主，农业商品承接场景弱 | 直播娱乐和个人IP为主，不具备农产品内容承接 |
| arianagrande | 以音乐宣发为主，缺少农业或购物内容 | 以音乐发布和巡演内容为主，缺少农产品相关受众与场景 |
| Lamine Yamal | 足球内容主导，商品推广语境与农业不匹配 | 以足球和个人梗内容为主，和农产品购买场景不匹配 |
| Doja Cat | 抽象娱乐内容为主，几乎无商品推广语境 | 内容偏随机娱乐和自我表达，缺少农产品或食品导向 |
| mega | 以风景旅行记录为主，缺少商品与受众场景 | 以风景和旅行画面为主，不具备农产品推广的明确承接点 |
| Nicolle Figueroa | 美妆、穿搭、家庭日常为主，和农业品类几乎无承接点。 | 以美妆、家庭日常和带货为主，不适合农产品推广 |
| Karol G | 音乐人内容与农业商品推广场景不匹配。 | 音乐人/品牌联名为主，与农产品消费场景不匹配 |
| Carlos Alberto Fuentes | 以搞笑、整蛊、生活日常为主，不适合农产品推广。 | 整体现实幽默和整蛊内容，缺少农产品承载场景 |
| Laro Benz | 亲子搞笑频道，和农业商品受众不重合。 | 亲子搞笑为主，和农产品购买决策关联很弱 |
| Addison | 唱跳演出和品牌合作为主，不承接农业产品推广。 | 歌手/时尚营销内容，不适合农产品推广调性 |
| FIFA World Cup | 世界杯体育内容与农业商品推广关联弱。 | 世界杯体育内容与农产品受众不自然衔接 |
| Brent Rivera | 家庭整蛊/短视频娱乐调性，不适合农产品营销。 | 家庭整蛊向内容，缺少农产品推广承载力 |
| Andrea Cuadros | 家居搞笑、美妆试用为主，和农业品类不匹配。 | 美妆穿搭和品牌合作多，和农产品主题偏离 |
| TikTok | 平台官方账号以内容分发和活动宣传为主，不做农产品承接。 | 官方平台号以平台内容宣推为主，不是农产品频道 |
| Lucas and Marcus | 兄弟整活和情侣内容为主，缺少农业推广场景。 | 兄弟整蛊和情侣娱乐内容，不适合农产品推广 |
| Kris HC | 偏吐槽、医疗致谢和家庭内容，与农业商品关联弱。 | 偏健康吐槽和生活表达，农产品推广语境不足 |
| Bella Poarch | 音乐创作与二次元内容为主，不适合农业产品推广。 | 音乐与二次元风格为主，不适合农产品推广 |
| Taylor Swift | 核心是音乐发行与巡演宣传，和农业商品完全错位。 | 顶级音乐人内容与农产品受众、场景都不匹配 |
| Netflix | 影视剧宣发账号，不具备农业商品推广承载力。 | 影视宣发账号，和农产品推广目标无关 |
| V | 个人日常和玩梗为主，和农业品类不相邻。 | 个人杂记和搞笑内容，几乎没有农产品承载点 |
| Mia K. | 时尚审美与城市生活为主，农业商品缺少自然承接。 | 时尚造型和美妆风格为主，和农产品不相干 |
| Joe Mele | 家庭整蛊和情侣内容为主，不适合农产品推广。 | 家庭整蛊号，缺少农产品推广语境 |
| Kai Cenat | 直播娱乐与挑战内容，不具备农业商品推广场景。 | 直播娱乐/说唱向内容，与农产品推广不搭 |
| KATSEYE | 女团音乐内容为主，与农业商品受众不重合。 | 偶像舞团内容，难自然承接农产品推广 |
| Brotherofcolor | 以搞笑短视频为主，和农业商品推广不相干。 | 纯喜剧短剧账号，和农产品商品调性冲突 |
| Skai Jackson 🥰 | 美妆、亲子、生活分享为主，不适合农产品推广。 | 美妆+亲子生活为主，农产品关联度不高 |
| Hailey Bieber | 核心是护肤美妆和生活方式，和农业产品缺少关联。 | 护肤美妆账号，和农产品推广场景不匹配 |
| La Rosalia | 音乐人和时尚联名内容，不适合农业商品合作。 | 音乐人内容偏演出与时尚，不适合农产品合作 |

## nox@content-tone-llm-v1-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 20 | Kimberly Loaiza |  | 内容以娱乐、生活、美妆带货为主，与农业产品受众和场景明显不符 |
| 35 | ELizabeth Esparza |  | 家庭生活、生日、跑通告内容，不是农业商品受众。 |
| 56 | Chris Olsen |  | 偏娱乐追星和轻食测评，但仍缺农业产品承接能力 |
| 59 | Alex Warren |  | 主体是音乐宣发，少量食品联动也不足以支撑农产品推广 |
| 60 | Cardi B |  | 以美妆时尚和香氛推广为主，和农产品受众不符 |
| 63 | Jordan_The_Stallion8 |  | 杂项梗图和宠物随机内容为主，难承接农产品 |
| 68 | Lele Pons |  | 家庭喜剧和美妆合作为主，农产品承载弱 |
| 72 | Savannah LaBrant |  | 家庭亲子和儿童品牌为主，不是农产品语境 |
| 101 | Serena Neel |  | 以DIY、美妆、派对为主，缺少农业/食品承接场景 |
| 105 | Liza Koshy |  | 以喜剧和美妆联名为主，农业产品承载力弱 |
| 112 | Lance Stewart |  | 以整蛊、家庭剧情和游戏推广为主，不是农业产品受众 |
| 113 | Josh Richards |  | 派对、恋爱和娱乐向内容为主，和农业产品不相关 |
| 116 | DAVID DOBRIK |  | vlog和整活为主，缺少农业或食品决策场景 |
| 122 | Camilla Araujo |  | 以社交生活和转场展示为主，农业产品承接力不足 |
| 232 | Tarayummy |  | 偏日常八卦和情绪表达，缺少可推广农产品的内容形态 |
| 234 | gianna |  | 家庭日常和宠物内容为主，和农产品推广关联弱 |
| 244 | brittikitty |  | 家庭育儿日常为主，没有农产品推广语境 |
| 286 | INSTASAMKA |  | 音乐/日常/品牌口播为主，农业商品相关性很弱 |
| 300 | Joshlilj |  | 公益街访/赠礼内容，不是农产品导购场景 |
| 307 | SIDELNIKOVVV |  | 以社会剧情/广告内容为主，和农业产品不匹配 |
| 313 | Mattie |  | 以个人日常和搬家为主，没有农业产品承载点 |
| 317 | trevor wallace |  | 喜剧演员内容偏脱口秀和段子，不适合农业产品 |
| 318 | Cam2r |  | 挑战和情侣内容为主，与农业产品无明显匹配 |
| 319 | JustinFlom |  | 魔术整蛊号，内容形态与农业产品不适配 |
| 320 | Natalie Reynolds |  | 主打prank/transition/美妆，和农业产品不匹配 |
| 323 | Jay and Nia |  | 情侣剧情和美发种草为主，不适合农业产品推广 |
| 328 | SB Mowing |  | 草坪清理相关，但不是农产品主题 |
| 353 | derkslurp |  | 生活vlog里有做饭和园艺感，但没有农业商品承载能力 |
| 354 | Avery Cyrus |  | 生活吃喝旅行内容为主，和农业商品主题距离较远 |
| 358 | kaeli mae |  | 偏母婴、清洁和Costco内容，和农业商品只有很弱间接关联 |

## xtb@content-tone-llm-v1-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 8 | Shakira |  | 音乐与体育话题为主，和农产品消费决策关联很弱 |
| 10 | Sabrina Carpenter |  | 核心是音乐和巡演宣发，不适合农产品推广承接 |
| 16 | Virginia |  | 主要是舞蹈、趋势和家庭日常，缺少农产品承接题材 |
| 17 | Olivia Rodrigo |  | 纯音乐内容占主导，和农产品推广调性明显不符 |
| 21 | LISA |  | 音乐和时尚表达为主，缺少农产品相关受众与场景 |
| 23 | Katteyes |  | 内容偏恋爱梗和舞蹈互动，不适合农产品推广 |
| 85 | eugenioderbezoficial |  | 喜剧影视账号，和农产品推广无明显交集 |
| 92 | laufey |  | 音乐艺术向账号，农产品承载力弱 |
| 100 | KEEMOKAZI |  | 家庭整蛊喜剧号，不适合农产品转化 |
| 144 | Leidys Sotolongo |  | 家庭 vlog 和美妆为主，缺少农业或食品内容 |
| 147 | sondra_blust |  | 家庭生活和美妆内容与农产品推广不直接相关 |
| 149 | Seany |  | 魔术整活和搞笑测评，与农产品品类不相邻 |
| 150 | Kristy Sarah |  | 生活方式内容为主，缺少农产品或食材承载场景 |
| 177 | BAYYY |  | 婚礼与生活记录为主，和农产品推广场景不匹配 |
| 181 | dixie |  | 时尚美妆与品牌穿搭为主，和农产品不在同一消费场景 |
| 185 | Lopeztips 📲 |  | 偏生活技巧和男士香水等消费品，和农产品关联不足 |
| 190 | Ben Azelart |  | 挑战娱乐型内容占主导，和农产品购买决策关系弱 |
| 192 | Jess Val |  | 戏剧喜剧与美妆为主，和农产品推广没有直接承接 |
| 193 | China |  | 演员生活与角色片段为主，不适合农产品推广 |
| 196 | JAYLLNN |  | 情侣日常和豪车挑战为主，缺少农产品消费语境 |
| 197 | LaFamiliaGomes❤️ |  | 家庭生活与儿童内容为主，农产品承接能力弱 |
| 233 | Kev_Eudy |  | 以吐槽、家庭碎念和观点输出为主，不是农产品垂类 |
| 247 | Kervo.dolo |  | 以喜剧短剧和夸张口播为主，不适合农产品推广 |
| 255 | Krystiana |  | 母婴日常为主，与农产品推广关联弱 |
| 262 | SJ Ellington |  | 美容母婴向内容，与农产品关联很弱 |
| 269 | Tabs |  | 农场宠物向但偏生活记录，商品承载不够直接 |
| 283 | Karleshion |  | 家庭生活与美妆发帖为主，和农产品关联弱 |
| 289 | nicole garcia |  | 舞蹈美妆生活内容为主，和农产品无直接承接 |
| 290 | Thoren Bradley |  | 树木切割与心脏健康内容，不是农产品推广场景 |
| 314 | Alex Stemplewski |  | 内容以影视特效、cosplay和品牌创意片为主，与农产品受众和场景不匹配 |

## Notes
- Page-level rates use `page_size` from each run metadata.
- Cause categories are heuristic clusters from `why_short`; review representative rows before making product decisions.
