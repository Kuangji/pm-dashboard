# Channel Search Provider Comparison

- keyword: agricultural products
- platform: youtube
- country: US
- left: nox@content-tone-llm-v1 (tmp/channel-search-review/20260610-nox-vs-xtb-4kw-allplatform-us-front10-content-tone-v1/youtube/agricultural-products/nox-youtube)
- right: xtb@content-tone-llm-v1 (tmp/channel-search-review/20260610-nox-vs-xtb-4kw-allplatform-us-front10-content-tone-v1/youtube/agricultural-products/xtb-youtube)
- left_rule_version: content-tone-llm-v1
- right_rule_version: content-tone-llm-v1
- left_prompt_hash: 1228e2ff575f
- right_prompt_hash: 1228e2ff575f

## Run Overview
| run | provider | rule_version | total | fit | adjacent | badcase | badcase率 | <0 | 0-9 | 10-19 | 20+ |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| nox@content-tone-llm-v1 | nox | content-tone-llm-v1 | 500 | 186 | 180 | 134 | 26.8% | 0 | 500 | 0 | 0 |
| xtb@content-tone-llm-v1 | xtb | content-tone-llm-v1 | 500 | 190 | 184 | 126 | 25.2% | 0 | 500 | 0 | 0 |

## Page-Level Badcase Rate
| page | nox@content-tone-llm-v1_total | nox@content-tone-llm-v1_badcase | nox@content-tone-llm-v1_badcase率 | xtb@content-tone-llm-v1_total | xtb@content-tone-llm-v1_badcase | xtb@content-tone-llm-v1_badcase率 | badcase率差 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 50 | 10 | 20.0% | 50 | 7 | 14.0% | 6.0% |
| 2 | 50 | 5 | 10.0% | 50 | 10 | 20.0% | -10.0% |
| 3 | 50 | 14 | 28.0% | 50 | 9 | 18.0% | 10.0% |
| 4 | 50 | 14 | 28.0% | 50 | 9 | 18.0% | 10.0% |
| 5 | 50 | 17 | 34.0% | 50 | 11 | 22.0% | 12.0% |
| 6 | 50 | 9 | 18.0% | 50 | 16 | 32.0% | -14.0% |
| 7 | 50 | 14 | 28.0% | 50 | 16 | 32.0% | -4.0% |
| 8 | 50 | 16 | 32.0% | 50 | 14 | 28.0% | 4.0% |
| 9 | 50 | 16 | 32.0% | 50 | 18 | 36.0% | -4.0% |
| 10 | 50 | 19 | 38.0% | 50 | 16 | 32.0% | 6.0% |

## Badcase Overlap
| metric | count |
| --- | --- |
| shared_badcase | 86 |
| nox@content-tone-llm-v1_only_badcase | 48 |
| xtb@content-tone-llm-v1_only_badcase | 40 |

## Badcase Cause Summary
| provider | category | count |
| --- | --- | --- |
| nox@content-tone-llm-v1 | 其他 | 86 |
| nox@content-tone-llm-v1 | 泛相关性偏离 | 28 |
| nox@content-tone-llm-v1 | 娱乐/儿童/泛内容偏离 | 11 |
| nox@content-tone-llm-v1 | 证据缺失或信号不足 | 6 |
| nox@content-tone-llm-v1 | 科技/电子垂类偏离 | 2 |
| nox@content-tone-llm-v1 | 宠物/动物受众冲突 | 1 |
| xtb@content-tone-llm-v1 | 其他 | 65 |
| xtb@content-tone-llm-v1 | 泛相关性偏离 | 32 |
| xtb@content-tone-llm-v1 | 娱乐/儿童/泛内容偏离 | 18 |
| xtb@content-tone-llm-v1 | 证据缺失或信号不足 | 6 |
| xtb@content-tone-llm-v1 | 宠物/动物受众冲突 | 3 |
| xtb@content-tone-llm-v1 | 科技/电子垂类偏离 | 2 |

## Shared Badcases
| channel | nox@content-tone-llm-v1 | xtb@content-tone-llm-v1 |
| --- | --- | --- |
| 考古女孩 | 主要是考古寻宝和古物修复，和农产品无关。 | 考古、古物修复、寻宝类内容，与农业无关。 |
| Orphan Thủy An | 频道是异世界漫画，和农产品推广没有承载关系。 | 内容是异世界漫画，和农业商品受众完全不匹配。 |
| Aliyi Science Tube | 以生物考试和教程为主，和农产品推广受众完全不匹配 | 生物教学频道，不是农产品消费或推广场景。 |
| Daily Freedom | 异世界漫画短剧频道，内容形式与农产品推广明显冲突 | 内容几乎全是异世界漫画，与农业商品完全不相关。 |
| Lý Tiểu Lâm | 主体是蛇类惊险救援叙事，农产品只是偶发背景，不适合推广 | 主打蛇类惊险内容，和农产品推广明显不搭 |
| ThyNa Lifestyle | 主体是游戏、碰撞和杂项娱乐，农产品不是核心受众 | 主体是游戏、撞击模拟和娱乐内容，农业承载能力不足。 |
| Vân Building Life | 频道内容以各类电视节目切片为主，和农产品推广无关 | 主要是影视节目搬运，只有零星农产品视频。 |
| LÝ SÙNG | 少女漫画短剧频道，内容形态与农产品推广完全不符 | 少女漫画频道，与农产品推广完全不搭 |
| Oliver Sanfilippo | 主体是剧情、ASMR和搞笑娱乐，和农产品推广受众不匹配 | 以ASMR、剧情和娱乐为主，农产品不是主线 |
| christian haze | 主体是荒诞娱乐和动物梗，和农产品推广几乎无关 | 主体是荒诞娱乐和剧情，不适合农产品推广 |
| Lý tiểu Hoàng | 全是恋爱、王宫、转生漫画剧情，缺乏农业推广承载 | 漫画剧情频道，和农产品推广受众完全不一致 |
| Lý Thị Linh | 核心是蛋糕装饰和甜品制作，与农产品推广目标明显不匹配。 | 几乎全是蛋糕甜点制作，与农产品推广无关 |
| DMG Productions | 主体是医疗科技、AI、金融和健康传播，与农产品推广无关。 | 科技、医疗、宠物健康等内容为主，与农产品无关 |
| Central America Uncovered | 偏地理文化和旅游科普，几乎没有农产品推广承载。 | 内容是能源、历史、旅游与文化，不承接农产品推广 |
| Clean Up | 核心是恐怖清理、巨蟒和鬼屋剧情，与农产品完全不匹配。 | 清理惊悚剧情为主，和农产品推广受众几乎无关。 |
| National Studio | 健康科普、时政和励志评论为主，不适合农产品合作推广。 | 偏社会评论、健康恐吓和励志话题，与农产品无关 |
| Sunnatjan Nematov. Productions | 主要是音乐、足球和节庆娱乐，不具备农产品推广语境。 | 音乐、足球、日期记录和娱乐内容，不具农产品承载场景 |
| Arirang TV | 新闻、文化与综艺内容为主，与农产品推广目标不一致。 | 新闻、文化和旅游为主，和农产品合作推广不匹配 |
| Dao Farm Life | 发布内容几乎都是捡垃圾/找钱剧情，与农产品无关 | 标题多为拾荒捡钱剧情，和农产品推广几乎无关 |
| DRAMAGIRL | 核心是短剧/电影切片，农产品只是剧情设定，难承接推广 | 核心是电影短剧，和农产品推广场景不匹配 |
| TIRAK dora | 山村苦情剧情为主，几乎没有农产品展示或购买场景 | 山地求生短剧为主，叙事型内容难承接农产品推广 |
| Hominid History Hub | 以史前生存叙事为主，非商品评测/消费决策频道，承载推广能力弱 | 史前人类故事为主，与农产品推广无关 |
| B&W Tek | 以光谱仪和实验室分析教程为主，和农产品推广受众明显不匹配 | 仪器与药品分析内容，不适合农产品合作 |
| Tool Wizard | 频道长期做工具/木工工具推荐，与农业产品销售场景不匹配 | 工具导购偏木工和施工，不对应农产品商品 |
| News Tone | 叙事热点短视频为主，不适合农产品推广 | 剧情新闻娱乐为主，与农产品推广几乎不匹配 |
| Machine stage | 施工改造频道，和农产品完全不搭 | 核心是房屋/船/池等建造，不承接农产品推广 |
| Shuliy Charcoal Machine | 木炭和工业设备频道，与农产品本身错位 | 工业炭化机械为主，和农产品推广距离大 |
| BIZZ GUIDE | 主体是建材电料展示，农产品相关性很弱 | 以建材/电工/五金批发为主，农产品承载不足 |
| Vazean Lodola | 以搞笑、模仿和短剧为主，不具备农产品推广承载力 | 喜剧/演绎类账号，和农产品合作场景不匹配 |
| PreHistory | 史前叙事频道，不是现实农产品或农业消费场景 | 史前故事娱乐向，虽提到农业史但不适合真实农产品推广 |

## nox@content-tone-llm-v1-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 34 | small family |  | 核心是木屋建造和家庭生活，和农产品销售种植几乎无关 |
| 41 | Lý Tiểu Duyên |  | 以竹屋日常和家庭叙事为主，几乎没有农产品推广承载 |
| 73 | DIY Mini Life |  | 内容集中迷你农场和玩具施工，不是实际农产品推广频道 |
| 99 | Ella Daily Life |  | 以野外猎捕和生存表演为主，非农产品频道调性 |
| 144 | Bocheta |  | 内容是脑残梗/找不同玩法，和农产品推广承载不匹配 |
| 156 | Ariana News |  | 以新闻时政为主，缺少农产品推广承载 |
| 175 | Allan The Old gamer on the mountain |  | 政论书评时评频道，和农产品完全无关 |
| 185 | Single Life |  | 主打戏剧化生存故事，和农产品推广受众不匹配 |
| 195 | Free Forest Life |  | 以建筑工程和乡村建桥为主，不是农产品频道 |
| 197 | S&P Dow Jones Indices Channel |  | 纯金融指数频道，与农产品推广场景不匹配 |
| 198 | her phoenix |  | 主打工具和打包机械，和农产品内容关联很弱 |
| 204 | The Coca-Cola Co. |  | 企业公益和社区故事为主，几乎没有农产品内容 |
| 207 | Nana Daily Life |  | 以捕鱼为主，和农产品主题不完全一致 |
| 236 | Nick Rizzo |  | 健身播客和社交话题为主，和农产品受众基本无关 |
| 247 | Alibaba Group |  | 企业品牌和AI内容为主，和农产品合作没有自然承接 |
| 249 | 江西日报 JiangxiDaily |  | 地方新闻文化与活动报道为主，不是农产品推广频道 |
| 260 | Hyper TV |  | 主体是重型机械事故与运输，不适合农产品合作推广 |
| 268 | SURVIVAL KCAU |  | 核心是野外求生与猛兽对抗，不适合农产品推广 |
| 320 | NIDE Group |  | 工业电机自动化频道，和农产品销售展示完全不同类 |
| 326 | JK TV |  | 泰卢固电影八卦为主，与农产品推广受众明显不匹配 |
| 376 | Michael Anthony Videos |  | 底层是底特律城市景观、桥梁和新闻，和农产品无关 |
| 397 | DIY Farm Diorama |  | 主体是影视拼接与农场模型手工，不是农产品内容 |
| 407 | Inter-American Dialogue |  | 以政策和地区对话为主，不是农产品推广型频道 |
| 411 | National Laboratory of the Rockies |  | 科研能源频道，和农业商品受众明显不符 |
| 413 | Li Tieu Nhi |  | 戏剧化情感剧情为主，农业内容只是点缀 |
| 424 | Distinctive Voices |  | 科学讲座频道，农业相关内容很少 |
| 426 | Silk Way / Qazaqstan |  | 以政经新闻为主，缺少农产品消费或推广承载场景 |
| 427 | WakeEd Partnership |  | 教育人物访谈频道，和农产品推广几乎无关 |
| 428 | BT JACK |  | 纯问答时政内容，和农产品受众不匹配 |
| 430 | Toca targoo |  | Toca Boca娱乐内容，和农产品推广不相容 |

## xtb@content-tone-llm-v1-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 16 | Build Homes Vietnam |  | 几乎全是建房内容，没有农业或农产品题材。 |
| 62 | TTH - Machine |  | 工业机械和工厂流程为主，不是农产品频道 |
| 79 | Ethiopian Education |  | 主体是学校学科教育，不是农产品消费或推广场景 |
| 86 | Giang Thi Ca |  | 主体是捕鱼和狩猎式户外内容，与农产品推广不匹配 |
| 87 | Trinh Ho Tv |  | 以剧情化乡村故事为主，非稳定农业受众或商品承载场景 |
| 100 | Chẩu Thị Nhân |  | 剧情化乡村生活为主，内容形式不利于农产品推广 |
| 113 | Single life MC |  | 主体是求生建房和剧情，农业内容太弱 |
| 132 | Lý tâm ca |  | 以救援狗血剧情为主，农产品相关只是零散背景，不适合推广。 |
| 159 | T Tech HD |  | 核心是林地建房与木石施工，非农产品频道 |
| 163 | SACO TOYS TV |  | 儿童工程玩具故事为主，和农产品无关 |
| 167 | farmer's life |  | 主体是伐木和木材运输，不是农产品 |
| 168 | 🌞 Indie Morning |  | 以音乐播放列表为主，和农产品不相关 |
| 171 | Air Products |  | 工业气体与能源公司内容，和农产品无关 |
| 172 | TARAZ |  | 游牧家庭剧情和建屋故事，不是农产品频道 |
| 177 | AMN ENGLISH |  | 以新闻政治为主，缺少农产品展示、评测或交易承接能力 |
| 250 | VanEck |  | 金融投资频道，和农产品无关 |
| 253 | Tim Wealth Hacks |  | 内容是财经八卦和名人争议，完全不适合农产品推广 |
| 254 | Multi-Purpose Excavator |  | 主要是工程机械展示，不是农产品或农业消费场景 |
| 256 | LTT Machine |  | 主要是搞笑失败集和生存片段，不适合农产品推广 |
| 257 | Nguyễn Thị Hòa |  | 内容是异世界漫画连载，和农产品推广完全无关 |
| 260 | Primitive Bushcraft Life |  | 核心是荒野露营和生存搭建，不是农产品内容 |
| 262 | Machinex Vision |  | 主要是工业机械演示，不是农产品推广场景 |
| 273 | VOEURN CHANLY |  | 宠物和搞笑动物内容为主，不适合农产品推广 |
| 275 | Arirang Culture |  | 文化综艺与时政内容为主，和农产品推广无关 |
| 279 | Cattladge Steen |  | 以短剧、办公室和理发店剧情为主，和农产品无关 |
| 285 | Columbia Climate School |  | 以气候学院、招生和政策议题为主，不像农产品推广位 |
| 290 | Andy's Insights |  | 以国家建设和基础设施新闻为主，农业商品承载弱 |
| 292 | Cave-nomads |  | 洞穴游牧家庭叙事为主，与农产品推广明显不符 |
| 293 | V. Idea |  | DIY机械和娱乐短片为主，农业只属概念玩梗 |
| 295 | Vision Times Media |  | 以时政新闻和社会短视频为主，和农业商品不匹配 |

## Notes
- Page-level rates use `page_size` from each run metadata.
- Cause categories are heuristic clusters from `why_short`; review representative rows before making product decisions.
