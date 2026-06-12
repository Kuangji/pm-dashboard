# Channel Search Provider Comparison

- keyword: baby supplement
- platform: tiktok
- country: US
- left: nox@content-tone-llm-v1 (tmp/channel-search-review/20260611-nox-vs-xtb-4kw-allplatform-us-front10-content-tone-v1/tiktok/baby-supplement/nox-tiktok)
- right: xtb@content-tone-llm-v1 (tmp/channel-search-review/20260611-nox-vs-xtb-4kw-allplatform-us-front10-content-tone-v1/tiktok/baby-supplement/xtb-tiktok)
- left_rule_version: content-tone-llm-v1
- right_rule_version: content-tone-llm-v1
- left_prompt_hash: 1228e2ff575f
- right_prompt_hash: 1228e2ff575f

## Run Overview
| run | provider | rule_version | total | fit | adjacent | badcase | badcase率 | <0 | 0-9 | 10-19 | 20+ |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| nox@content-tone-llm-v1 | nox | content-tone-llm-v1 | 500 | 26 | 117 | 357 | 71.4% | 0 | 500 | 0 | 0 |
| xtb@content-tone-llm-v1 | xtb | content-tone-llm-v1 | 500 | 28 | 167 | 305 | 61.0% | 0 | 500 | 0 | 0 |

## Page-Level Badcase Rate
| page | nox@content-tone-llm-v1_total | nox@content-tone-llm-v1_badcase | nox@content-tone-llm-v1_badcase率 | xtb@content-tone-llm-v1_total | xtb@content-tone-llm-v1_badcase | xtb@content-tone-llm-v1_badcase率 | badcase率差 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 50 | 33 | 66.0% | 50 | 34 | 68.0% | -2.0% |
| 2 | 50 | 41 | 82.0% | 50 | 27 | 54.0% | 28.0% |
| 3 | 50 | 46 | 92.0% | 50 | 29 | 58.0% | 34.0% |
| 4 | 50 | 29 | 58.0% | 50 | 23 | 46.0% | 12.0% |
| 5 | 50 | 33 | 66.0% | 50 | 16 | 32.0% | 34.0% |
| 6 | 50 | 37 | 74.0% | 50 | 34 | 68.0% | 6.0% |
| 7 | 50 | 35 | 70.0% | 50 | 35 | 70.0% | 0.0% |
| 8 | 50 | 30 | 60.0% | 50 | 32 | 64.0% | -4.0% |
| 9 | 50 | 37 | 74.0% | 50 | 38 | 76.0% | -2.0% |
| 10 | 50 | 36 | 72.0% | 50 | 37 | 74.0% | -2.0% |

## Badcase Overlap
| metric | count |
| --- | --- |
| shared_badcase | 273 |
| nox@content-tone-llm-v1_only_badcase | 84 |
| xtb@content-tone-llm-v1_only_badcase | 32 |

## Badcase Cause Summary
| provider | category | count |
| --- | --- | --- |
| nox@content-tone-llm-v1 | 其他 | 210 |
| nox@content-tone-llm-v1 | 证据缺失或信号不足 | 47 |
| nox@content-tone-llm-v1 | 泛相关性偏离 | 42 |
| nox@content-tone-llm-v1 | 娱乐/儿童/泛内容偏离 | 39 |
| nox@content-tone-llm-v1 | 宠物/动物受众冲突 | 16 |
| nox@content-tone-llm-v1 | 科技/电子垂类偏离 | 3 |
| xtb@content-tone-llm-v1 | 其他 | 160 |
| xtb@content-tone-llm-v1 | 泛相关性偏离 | 49 |
| xtb@content-tone-llm-v1 | 证据缺失或信号不足 | 44 |
| xtb@content-tone-llm-v1 | 娱乐/儿童/泛内容偏离 | 35 |
| xtb@content-tone-llm-v1 | 宠物/动物受众冲突 | 14 |
| xtb@content-tone-llm-v1 | 科技/电子垂类偏离 | 3 |

## Shared Badcases
| channel | nox@content-tone-llm-v1 | xtb@content-tone-llm-v1 |
| --- | --- | --- |
| Khabane lame | 无声喜剧/整活账号，和婴儿补充剂受众明显脱节。 | 纯喜剧短剧，不适配亲子补剂 |
| BILLIE EILISH | 音乐巡演为主，不适合母婴营养品推广。 | 音乐宣发为主，不承接育儿商品 |
| IShowSpeed | 直播娱乐和体育梗内容，和母婴商品完全不搭。 | 直播娱乐向，与婴童补剂不搭 |
| arianagrande | 音乐影视为主，缺少家长或婴童受众。 | 音乐娱乐为主，受众不指向育儿 |
| Sabrina Carpenter | 音乐巡演和快消联动为主，和婴儿补充剂不匹配。 | 音乐娱乐向，离婴童场景较远 |
| Lamine Yamal | 足球球员账号，明显不是母婴受众。 | 足球粉丝向，不适合婴童补剂 |
| Doja Cat | 音乐/梗图账号，缺少母婴消费承载。 | 内容是娱乐/个人碎片，不具备婴儿营养品推广承载 |
| Olivia Rodrigo | 音乐推广型账号，不适合母婴商品。 | 音乐受众与婴童补剂不匹配 |
| mega | 自然风景账号，无商品或育儿承载。 | 风景类账号，商品承载弱 |
| LISA | K-pop 时尚为主，不适合婴儿补充剂。 | 潮流音乐向，不是亲子受众 |
| JENNIE | K-pop/时尚娱乐账号，非母婴场景。 | 时尚音乐向，偏年轻潮流 |
| larray | 搞笑社交和约会内容，和母婴商品受众脱节。 | 娱乐搞笑为主，不对应育儿 |
| Karol G | 以音乐、舞台和品牌联名为主，没有母婴或育儿内容 | 音乐艺人频道，和婴儿补充剂受众不符 |
| Carlos Alberto Fuentes | 内容以搞笑、整蛊、情侣和车辆梗为主，不适合母婴商品推广 | 以整蛊搞笑为主，不适合婴儿补充剂推广 |
| Addison | 以唱歌、演出和时尚美妆联名为主，没有母婴场景 | 舞台时尚音乐向，不适合婴儿补充剂推广 |
| FIFA World Cup | 世界杯官方体育内容，与婴儿补充剂受众和场景明显不符 | 世界杯体育频道，与婴儿补充剂无关 |
| Brent Rivera | 以兄妹整活、挑战和搞笑为主，没有母婴受众基础 | 家庭喜剧频道，缺少婴儿补充剂承接场景 |
| TikTok | 平台官方内容，偏社区/娱乐推广，不是母婴垂类 | 平台官方内容，非婴儿补充剂投放对象 |
| Lucas and Marcus | 以兄弟挑战、婚恋和搞笑为主，与母婴商品不匹配 | 兄弟搞笑和旅行内容，不适合婴儿补充剂 |
| Bella Poarch | 以音乐、动漫和宠物玩梗为主，不适合婴儿补充剂推广 | 音乐与宠物内容为主，不适合婴儿补充剂 |
| Taylor Swift | 纯音乐人内容，核心受众不是母婴人群 | 音乐宣发频道，和婴儿补充剂无关 |
| Netflix | Netflix官方娱乐内容，与母婴商品无关 | 影视内容频道，不适合婴儿补充剂推广 |
| V | 零散个人视频和梗图，不构成母婴推广场景 | 个人碎片内容，和婴儿补充剂不匹配 |
| Mia K. | 时尚、造型和城市生活内容为主，没有母婴受众 | 时尚美妆调性，不适合婴儿补充剂 |
| Joe Mele | 以家庭整蛊和搞笑为主，没有婴儿或母婴内容 | 恶搞家庭号，缺少婴儿补充剂承接能力 |
| Kai Cenat | 直播/游戏/娱乐内容为主，不适合婴儿补充剂推广 | 直播娱乐频道，与婴儿补充剂不相关 |
| KATSEYE | K-pop女团内容，受众与母婴商品明显不匹配 | 偶像团体频道，不适合婴儿补充剂推广 |
| Brotherofcolor | 以搞笑段子和朋友互动为主，没有母婴方向 | 纯搞笑短视频号，缺少母婴推广场景 |
| Hailey Bieber | 以护肤美妆为主，没有宝宝或育儿证据 | 美妆生活方式频道，不适合婴儿补充剂 |
| La Rosalia | 音乐人内容为主，核心场景与母婴无关 | 音乐时尚向频道，不适合婴儿补充剂推广 |

## nox@content-tone-llm-v1-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 1 | MrBeast |  | 挑战抽奖和品牌联动为主，缺少育儿受众与婴童场景。 |
| 8 | Shakira |  | 音乐加足球推广为主，不是母婴内容频道。 |
| 20 | Kimberly Loaiza |  | 内容以美妆、时尚、生活娱乐为主，缺少婴幼儿/育儿场景 |
| 52 | Selena Gomez |  | 以美妆和音乐为主，和婴儿补充剂受众不匹配。 |
| 53 | Will Smith |  | 旅行纪录和综艺宣发为主，缺少母婴消费场景。 |
| 54 | Loren Gray |  | 时尚穿搭和生活记录为主，不适合婴儿补充剂推广。 |
| 55 | Miley Cyrus |  | 核心是音乐宣发，和母婴产品没有自然连接。 |
| 56 | Chris Olsen |  | 综艺/演出和旅行内容为主，缺少母婴承载能力。 |
| 57 | JLO |  | 美妆与影视宣传为主，和婴儿补充剂关联弱。 |
| 59 | Alex Warren |  | 音乐宣发为主，缺少婴儿/家庭场景。 |
| 60 | Cardi B |  | 时尚、美妆和巡演推广为主，不贴近婴儿补充剂。 |
| 61 | Bruno Mars |  | 音乐和酒类联名为主，与母婴产品明显不搭。 |
| 63 | Jordan_The_Stallion8 |  | 宠物和美食向内容，默认人用婴儿补充剂不适配。 |
| 65 | Nichole🎀 |  | 偏护肤美妆，和婴儿补充剂的目标场景不一致。 |
| 66 | James Charles |  | 美妆和试吃内容为主，不具备母婴人群承接。 |
| 67 | avani |  | 美妆、时尚和旅行向，不是母婴频道。 |
| 69 | Feid |  | 拉丁音乐和健身日常为主，和婴儿补充剂不匹配。 |
| 70 | TYLA |  | 音乐人内容为主，没有母婴或亲子消费场景。 |
| 71 | Michael Le |  | 舞蹈挑战和泛娱乐内容，不适合婴儿补充剂。 |
| 73 | Stokes Twins |  | 挑战和整蛊视频为主，和母婴产品明显不搭。 |
| 74 | JOP |  | 区域音乐人内容为主，不具备母婴推广场景。 |
| 112 | Lance Stewart |  | 以恶作剧、家庭喜剧和游戏合作为主，不适合婴儿补充剂。 |
| 127 | marko |  | 以综艺式聊天和娱乐内容为主，不具备母婴推广场景 |
| 128 | 🎀Piper Rockelle🎀 |  | 青少年娱乐和趋势内容为主，和婴儿补充品受众不对口 |
| 130 | Matt Rife |  | 喜剧脱口秀频道，受众和商品场景都不支持母婴推广 |
| 131 | Tony Lopez |  | 舞蹈生活方式账号，缺少婴儿或育儿消费承载 |
| 132 | Zach Choi |  | 食品ASMR频道，品类和婴儿补充品没有自然关联 |
| 133 | FallonTonight |  | 晚间秀娱乐频道，虽可带货但不指向婴幼儿人群 |
| 134 | thesavbananas |  | 棒球娱乐和舞蹈表演为主，与婴儿补充品场景不搭 |
| 135 | Terry Crews |  | 泛娱乐名人号虽品牌友好，但缺少母婴受众证据 |

## xtb@content-tone-llm-v1-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 2 | charli d’amelio |  | 年轻舞蹈向，缺少育儿场景 |
| 13 | Enejota |  | 足球内容主导，缺少亲子承接 |
| 14 | Zach King |  | 特效娱乐不承接亲子商品 |
| 23 | Katteyes |  | 搞笑恋爱向，缺少亲子场景 |
| 79 | Becky G |  | 音乐人生活与品牌合作为主，不是母婴消费场景 |
| 83 | Ross Smith |  | 家庭搞笑与体育杂糅，缺少母婴相关受众与内容 |
| 84 | AugustoGimenez |  | 家庭日常和装修内容为主，与婴儿补充剂关联弱 |
| 85 | eugenioderbezoficial |  | 喜剧/影视切片调性，不适合母婴补充剂推广 |
| 158 | Amaury Guichon |  | 甜品艺术频道与婴儿营养补充关联很弱 |
| 187 | Jake Paul |  | 拳击/炫富/成人生活为主，和婴童补充品目标受众不符。 |
| 190 | Ben Azelart |  | 挑战/整蛊/特效类内容偏青少年，不像亲子消费场景。 |
| 253 | Disney Parks |  | 迪士尼乐园资讯内容，和 baby supplement 的目标受众不符 |
| 258 | VicBlends |  | 主线是理发和社区故事，和婴儿补充剂受众差距大 |
| 269 | Tabs |  | 生活方式和农场内容较杂，母婴信号弱，难以精准推婴儿补充剂 |
| 314 | Alex Stemplewski |  | 特效/角色扮演内容，和母婴补剂受众不搭 |
| 318 | Cam2r |  | 挑战/情侣内容不对应母婴消费场景 |
| 333 | Eliana Kalogeras |  | 青少年时尚生活内容，非母婴受众 |
| 351 | Jooj Natu |  | 搞笑梗图和动漫为主，缺少婴儿或育儿受众。 |
| 353 | derkslurp |  | 生活vlog和时尚内容为主，与婴儿补剂无关。 |
| 354 | Avery Cyrus |  | 旅行、美食和个人生活为主，缺少母婴承接场景。 |
| 360 | Bella Hadid |  | 美妆香氛为主，和婴儿补剂受众不匹配。 |
| 361 | Fernanda |  | 美妆穿搭和宠物日常为主，没有母婴线索。 |
| 366 | nevaaadaa |  | 情侣和日常生活号，没有婴儿或亲子内容。 |
| 367 | Beautybyalicedimplz |  | 美发和家庭记录为主，和婴儿补剂不直接相关。 |
| 370 | Jasmine Chiswell |  | 美妆发型复古测评，和婴儿补剂不相关。 |
| 400 | nurse.johnn |  | 内容是护士脱口秀/巡演宣传，和婴儿补充剂受众与场景不匹配 |
| 436 | Dude Perfect |  | 体育挑战和搞笑短片，不适合母婴商品推广 |
| 446 | kallmewhateveryouwant |  | 吐槽梗图账号，和母婴商品受众不符 |
| 450 | hudabubbaaa |  | 音乐/舞台/美妆内容，不是母婴受众 |
| 467 | Casey Simpson✨ |  | 偏表演与怀孕梗内容，整体仍是娱乐号 |

## Notes
- Page-level rates use `page_size` from each run metadata.
- Cause categories are heuristic clusters from `why_short`; review representative rows before making product decisions.
