# Channel Search Provider Comparison

- keyword: lawn mower
- platform: instagram
- country: US
- left: nox@promotion-capacity-v1 (tmp/channel-search-review/20260527-nox-vs-xtb-10kw-instagram-us-front10-promotion-capacity-v1/lawn-mower/nox-instagram)
- right: xtb@promotion-capacity-v1 (tmp/channel-search-review/20260527-nox-vs-xtb-10kw-instagram-us-front10-promotion-capacity-v1/lawn-mower/xtb-instagram)
- left_rule_version: promotion-capacity-v1
- right_rule_version: promotion-capacity-v1
- left_prompt_hash: b87da85cf79a
- right_prompt_hash: b87da85cf79a

## Run Overview
| run | provider | rule_version | total | fit | adjacent | badcase | badcase率 | <0 | 0-9 | 10-19 | 20+ |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| nox@promotion-capacity-v1 | nox | promotion-capacity-v1 | 500 | 151 | 217 | 132 | 26.4% | 21 | 319 | 67 | 93 |
| xtb@promotion-capacity-v1 | xtb | promotion-capacity-v1 | 500 | 156 | 236 | 108 | 21.6% | 10 | 266 | 109 | 115 |

## Page-Level Badcase Rate
| page | nox@promotion-capacity-v1_total | nox@promotion-capacity-v1_badcase | nox@promotion-capacity-v1_badcase率 | xtb@promotion-capacity-v1_total | xtb@promotion-capacity-v1_badcase | xtb@promotion-capacity-v1_badcase率 | badcase率差 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 50 | 6 | 12.0% | 50 | 6 | 12.0% | 0.0% |
| 2 | 50 | 14 | 28.0% | 50 | 9 | 18.0% | 10.0% |
| 3 | 50 | 15 | 30.0% | 50 | 2 | 4.0% | 26.0% |
| 4 | 50 | 14 | 28.0% | 50 | 5 | 10.0% | 18.0% |
| 5 | 50 | 16 | 32.0% | 50 | 18 | 36.0% | -4.0% |
| 6 | 50 | 10 | 20.0% | 50 | 5 | 10.0% | 10.0% |
| 7 | 50 | 16 | 32.0% | 50 | 14 | 28.0% | 4.0% |
| 8 | 50 | 7 | 14.0% | 50 | 12 | 24.0% | -10.0% |
| 9 | 50 | 13 | 26.0% | 50 | 15 | 30.0% | -4.0% |
| 10 | 50 | 21 | 42.0% | 50 | 22 | 44.0% | -2.0% |

## Badcase Overlap
| metric | count |
| --- | --- |
| shared_badcase | 57 |
| nox@promotion-capacity-v1_only_badcase | 75 |
| xtb@promotion-capacity-v1_only_badcase | 51 |

## Badcase Cause Summary
| provider | category | count |
| --- | --- | --- |
| nox@promotion-capacity-v1 | 其他 | 47 |
| nox@promotion-capacity-v1 | 泛相关性偏离 | 46 |
| nox@promotion-capacity-v1 | 证据缺失或信号不足 | 26 |
| nox@promotion-capacity-v1 | 娱乐/儿童/泛内容偏离 | 10 |
| nox@promotion-capacity-v1 | 宠物/动物受众冲突 | 3 |
| xtb@promotion-capacity-v1 | 其他 | 48 |
| xtb@promotion-capacity-v1 | 证据缺失或信号不足 | 30 |
| xtb@promotion-capacity-v1 | 泛相关性偏离 | 20 |
| xtb@promotion-capacity-v1 | 娱乐/儿童/泛内容偏离 | 9 |
| xtb@promotion-capacity-v1 | 宠物/动物受众冲突 | 1 |

## Shared Badcases
| channel | nox@promotion-capacity-v1 | xtb@promotion-capacity-v1 |
| --- | --- | --- |
| Kickball Dad | 纯运动家庭号，与割草机推广无关 | 体育家庭向频道，和割草机推广不匹配 |
| MANSCAPED® | 男士护理品牌，与割草机不匹配 | 男士修剪护理号，和园林割草机场景不相关 |
| Michael Wittig | 健身号与割草机推广无关 | 健身营养账号，与割草机无关 |
| Camryn Bryant | 艺术绘画号，完全不相关 | 艺术绘画账号，缺少设备相关语义 |
| Rodney Smith Jr | 家庭公益向，和 lawn mower 主题无关 | 有 mowing 但主轴是公益故事，非产品推广 |
| CONSTRUCTION MEMES / VIDS ! 😄 | 娱乐梗图为主，缺少割草机推广导向 | 施工梗图娱乐号，和割草机推广场景不匹配 |
| ANTHBOT | 无标签无内容证据，无法判断与割草机相关 | 无可用相关证据 |
| Randy Lee Shear | 汽车车主号，与割草机推广无关 | 以汽车为主，无割草机相关信号 |
| Going Global Services Landscape/Moving/JunkRemoval | 标签为空且偏服务杂项，缺少割草机推广证据 | 无有效标签，相关度不足 |
| Taylor Daniska | 标签为空，缺少相关内容证据 | 缺少草坪机械相关信号，难支持推广判断 |
| The Ramp Rack | 无标签且缺少可判断的相关性 | 以车架/载具为主，和割草机无关 |
| Buy Local Bowling Green | 本地生活商务向，与割草机无关 | 餐饮本地生活账号与割草机推广不匹配 |
| Vince Vitrano | 休闲娱乐标签为主，不适合推广割草机 | 内容偏啦啦队和娱乐，和割草机推广不匹配 |
| Wilson Services of Central IL | 缺少标签和内容证据，无法判断相关性 | 泛服务号，和割草机推广关联弱 |
| Smith and Sons | 无内容线索，相关性不足 | 无相关标签，内容信息不足 |
| PJ Pitcher | 赛车改装受众与割草机推广完全错位 | 改装赛车主题，受众不相关 |
| Cowboy Headquarters | 牛仔/娱乐定位与割草机推广无关 | 以节庆/礼品/狩猎为主，与割草机无关 |
| Brave Little Ones • Bamboo Pjs | 母婴服饰内容与割草机推广不匹配 | 童装母婴内容，和割草机推广不相关 |
| Bridgette Moore Wildomar | 个人生活号且无相关品类信号 | 社区公益主题，与割草机无关 |
| Christopher Chang | 无相关标签或内容线索 | 无草坪割草相关证据 |
| Nick Eagle | 无相关行业信号 | 汽车改装向，和割草机不相关 |
| Pete | 无相关行业信号 | 无标签无内容，无法判断相关性 |
| SB Mowing | ASMR/爽感内容，推广转化场景不匹配 | ASMR割草内容，偏感官娱乐，不适合推广 |
| TWP MOTORSPORTS | 赛车内容，和割草机推广不匹配 | 赛车机车向，和割草机不相关 |
| Michael Galloway | 滑水/湖区内容，和割草机无关 | 水上极限运动，与草坪机不相关 |
| Ryan Anderson | 怪兽卡车向，和割草机受众不符 | 怪兽卡车内容，和割草机无关 |
| Superior Products Distributors, Inc. | 分销商泛称，缺少可判断的园艺设备线索 | 无相关证据 |
| The Stock Exchange Sales | 金融/交易语义明显，和割草机无关 | 无有效标签，相关度不足 |
| Team Smith Sells 225 | 地产售卖账号，与割草机推广无关 | 房产账号与割草机推广场景不匹配 |
| GOD 🅱️®️Ⓜ️ | 与草坪机械推广无关 | 音乐娱乐号，非工具或家用设备受众 |

## nox@promotion-capacity-v1-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 3 | SEVILAY CELIK | 0 | beauty/skincare 为主，与割草机推广不符 |
| 23 | Matt Therrien🤘🤘🤘 | 0 | 无标签、无视频证据，无法判断相关性 |
| 42 | 🌻 Francesca 🇵🇷 | 20 | 健身内容为主，草坪词疑似噪声 |
| 45 | Dad Advice From Bo | 0 | 纯生活建议号，和割草机无关 |
| 47 | DaveyStruggle | 0 | 家具改造号，和割草机场景不符 |
| 51 | Tyler Graham | 0 | 无相关标签与内容信号 |
| 61 | Casey&Rashad | 0 | 无标签无内容，无法判断相关 |
| 62 | Vince Grove | 1 | 仅有草坪弱词，证据太少 |
| 65 | Inspiring Designs | 0 | 偏设计种草，与割草机主题偏离 |
| 66 | Ben Schmanke | 0 | 电子数码号，缺少草坪机械相关信号 |
| 71 | John Inzerillo | 0 | 自行车汽车内容，与割草机无关 |
| 75 | ECHO USA | 0 | 标签过泛，缺少割草机证据 |
| 76 | Tyler Bouldin | 0 | 家装DIY为主，缺少草坪/割草相关信号 |
| 93 | Gearhead HQ | 0 | 汽车圈账号，和 lawn mower 无关 |
| 103 | Noah Ziegler | 0 | 无品类线索，和割草机推广无关 |
| 105 | Funda  Lyon Yuksek🤍 | 0 | 摄影时尚家庭号，与割草机推广不相关 |
| 109 | Half Off Wholesale | 1 | 批发清仓号，只有很弱的工具联想 |
| 138 | BLAISE FFRENCH | 0 | 生活杂项内容，和割草机推广无关 |
| 142 | John Seaman | 0 | 创业生活类为主，与割草机不匹配 |
| 144 | Ionic Batteries | 0 | 无有效标签，相关性不足 |
| 145 | Ayse Izol | 0 | 标签与割草机推广无关 |
| 147 | Walter T Africa landscaping | 0 | 名称像园林，但无标签支撑，证据不足 |
| 151 | AMSOIL INC. | 0 | 汽车户外内容，和割草机推广场景不匹配 |
| 156 | ProParts Direct | 0 | 无可用标签或视频证据 |
| 167 | Paul Avellino l The Garden Guinea | -10 | 明显偏向 grow food not lawns，与草坪主题冲突 |
| 174 | Precision Work, Inc. | 0 | 缺少标签和内容证据，相关性不足 |
| 178 | Dee Alan | -5 | 护肤美妆定位与割草机推广几乎无关 |
| 182 | NickDaPlumber | -10 | 水管工题材不适合割草机推广 |
| 199 | Eda Akcan Bektaşoğlu | 0 | 家庭生活号与割草机推广关联弱 |
| 208 | Kilo Motors | -10 | 机车竞速向，明显偏离园艺设备 |

## xtb@promotion-capacity-v1-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 9 | Randy Baldera | 0 | 无草坪或割草相关信号 |
| 10 | Long Live Dallas 🙏🏾👼🏽 | 0 | 无草坪或割草相关信号 |
| 12 | Chase Stetson | -10 | 清洁/ASMR型内容，不适合卖割草机 |
| 16 | Sherri French | 0 | 泛促账号，和割草机主题不相关 |
| 50 | 2k.lil😍🎵 | 0 | 纯泛娱乐号，几乎无产品推广场景 |
| 59 | Vince Sanders | 0 | 缺少任何草坪或园艺相关信号 |
| 60 | Hanna Ray | Golfer + Creator | 0 | 高尔夫/旅游内容，与 lawn mower 无关 |
| 65 | Owen N. | Everything But College | 0 | 无可用标签，无法判断相关性 |
| 67 | Chris Laflamme | 0 | 无草坪机械相关信号 |
| 77 | Tim Jackson | 0 | 越野车/卡车为主，与割草机推广无关。 |
| 85 | ryfulll | 10 | 车圈漂移为主，割草机标签不构成有效受众。 |
| 92 | L0wb0dy Media | 10 | 汽车展示为主，割草机标签像边缘噪声。 |
| 122 | VP Racing | 0 | 汽车赛事和油液类内容，与割草机无关 |
| 203 | Peach Outdoor | 0 | 户外泛类，缺少草坪机信号 |
| 211 | Lopatofsky Auction LLC | 0 | 拍卖频道，不适合割草机推广 |
| 216 | Palomo Property Solutions LLC | 0 | 属性过泛，缺少草坪机相关证据 |
| 231 | Amazing Green Services | 1 | 仅从名称看像园艺服务，证据太少 |
| 239 | Koenig Equipment | 0 | 无标签无内容，相关信号缺失 |
| 244 | On The Way Outdoor | 1 | 户外方向泛化，相关性较弱 |
| 262 | PRORUN Tech | 0 | 无草坪或园艺设备证据，相关性弱 |
| 265 | NuHaus Outdoors | 0 | 以棚屋和收纳为主，不匹配 |
| 317 | RadiantPasturesLLC | 0 | 牧场类，缺少草坪机推广证据 |
| 322 | Habitat for Humanity of Greater Sacramento ReStore | 0 | 回收商店场景不匹配 |
| 327 | The Last Frontier Tree Service | 0 | 树服务偏树木护理，和割草机推广不够直接 |
| 328 | ATS Outdoors | 0 | 户外泛类但缺少草坪/割草信号 |
| 337 | MOVA USA | 0 | 清洁机器人品牌，和割草机类目偏离 |
| 346 | Ralph's Rental | 0 | 租赁账号可能覆盖设备受众，但证据弱 |
| 380 | Simplicity | 0 | 无标签无视频，缺少可判断的相关性 |
| 403 | RTI Auctions | -15 | 重型机械拍卖，和家用割草机推广目标不符 |
| 409 | Jeff crisp | 0 | 汽车改装内容，和割草机受众不匹配 |

## Notes
- Page-level rates use `page_size` from each run metadata.
- Cause categories are heuristic clusters from `why_short`; review representative rows before making product decisions.
