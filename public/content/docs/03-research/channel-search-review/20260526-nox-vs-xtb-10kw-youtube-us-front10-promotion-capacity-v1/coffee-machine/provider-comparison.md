# Channel Search Provider Comparison

- keyword: coffee machine
- platform: youtube
- country: US
- left: nox@promotion-capacity-v1 (tmp/channel-search-review/20260526-nox-vs-xtb-10kw-youtube-us-front10-promotion-capacity-v1/coffee-machine/nox-youtube)
- right: xtb@promotion-capacity-v1 (tmp/channel-search-review/20260526-nox-vs-xtb-10kw-youtube-us-front10-promotion-capacity-v1/coffee-machine/xtb-youtube)
- left_rule_version: promotion-capacity-v1
- right_rule_version: promotion-capacity-v1
- left_prompt_hash: b87da85cf79a
- right_prompt_hash: b87da85cf79a

## Run Overview
| run | provider | rule_version | total | fit | adjacent | badcase | badcase率 | <0 | 0-9 | 10-19 | 20+ |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| nox@promotion-capacity-v1 | nox | promotion-capacity-v1 | 500 | 55 | 273 | 172 | 34.4% | 55 | 371 | 31 | 43 |
| xtb@promotion-capacity-v1 | xtb | promotion-capacity-v1 | 500 | 162 | 232 | 106 | 21.2% | 169 | 157 | 102 | 72 |

## Page-Level Badcase Rate
| page | nox@promotion-capacity-v1_total | nox@promotion-capacity-v1_badcase | nox@promotion-capacity-v1_badcase率 | xtb@promotion-capacity-v1_total | xtb@promotion-capacity-v1_badcase | xtb@promotion-capacity-v1_badcase率 | badcase率差 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 50 | 11 | 22.0% | 50 | 6 | 12.0% | 10.0% |
| 2 | 50 | 15 | 30.0% | 50 | 10 | 20.0% | 10.0% |
| 3 | 50 | 14 | 28.0% | 50 | 12 | 24.0% | 4.0% |
| 4 | 50 | 24 | 48.0% | 50 | 7 | 14.0% | 34.0% |
| 5 | 50 | 15 | 30.0% | 50 | 16 | 32.0% | -2.0% |
| 6 | 50 | 16 | 32.0% | 50 | 11 | 22.0% | 10.0% |
| 7 | 50 | 18 | 36.0% | 50 | 11 | 22.0% | 14.0% |
| 8 | 50 | 23 | 46.0% | 50 | 9 | 18.0% | 28.0% |
| 9 | 50 | 17 | 34.0% | 50 | 9 | 18.0% | 16.0% |
| 10 | 50 | 19 | 38.0% | 50 | 15 | 30.0% | 8.0% |

## Badcase Overlap
| metric | count |
| --- | --- |
| shared_badcase | 66 |
| nox@promotion-capacity-v1_only_badcase | 106 |
| xtb@promotion-capacity-v1_only_badcase | 40 |

## Badcase Cause Summary
| provider | category | count |
| --- | --- | --- |
| nox@promotion-capacity-v1 | 证据缺失或信号不足 | 64 |
| nox@promotion-capacity-v1 | 其他 | 53 |
| nox@promotion-capacity-v1 | 泛相关性偏离 | 30 |
| nox@promotion-capacity-v1 | 娱乐/儿童/泛内容偏离 | 21 |
| nox@promotion-capacity-v1 | 宠物/动物受众冲突 | 4 |
| xtb@promotion-capacity-v1 | 其他 | 56 |
| xtb@promotion-capacity-v1 | 泛相关性偏离 | 28 |
| xtb@promotion-capacity-v1 | 证据缺失或信号不足 | 9 |
| xtb@promotion-capacity-v1 | 娱乐/儿童/泛内容偏离 | 8 |
| xtb@promotion-capacity-v1 | 宠物/动物受众冲突 | 5 |

## Shared Badcases
| channel | nox@promotion-capacity-v1 | xtb@promotion-capacity-v1 |
| --- | --- | --- |
| Forgotten History Files | 无咖啡机相关信号，内容域不匹配 | 历史叙事频道，咖啡机只是标签残留，近期内容完全跑偏 |
| Mind Over Mess | ASMR清洁/补货格式不适合咖啡机推广 | 虽有咖啡机标签，但频道主轴是清洁ASMR收纳，近期全是清洁内容 |
| Jack Du | 无相关标签，和咖啡机推广不匹配 | 包装机械频道，近期是咖啡包装线，不是咖啡机 |
| ChillSnap | ASMR放松频道，内容形态与小家电推广明显错位 | ASMR放松内容，和咖啡机等实体产品推广强冲突 |
| Purity Sin Gaming | 游戏娱乐频道，和咖啡机推广场景不匹配 | 游戏娱乐频道，和咖啡机推广场景明显不符 |
| ChrisGTXvideos | 纯娱乐短视频，和咖啡机推广明显不符 | 搞笑短视频频道，和咖啡机推广场景明显不符 |
| Penglai Machines | 标签几乎无关，难判断为咖啡机受众 | 工业灌装包装频道，与咖啡机不匹配 |
| Penglai Machine | 标签过泛，未见咖啡机相关产品信号 | 工业包装机械频道，不适合咖啡机推广 |
| HYDRO DIPPING ARTIST | 工艺改色内容，与咖啡机推广无关 | 工艺DIY频道，与咖啡机促销不在同一场景 |
| Ruian Huajing Machinery Co., Ltd. | 工业成型机频道，与咖啡机品类不相干 | 咖啡杯盖热成型设备为主，不是咖啡机 |
| Girl's Toy Discovery | 无有效标签与内容信号，相关性不足 | 玩具ASMR/解压内容，属于强形式错配 |
| He. Andrew | 偏娱乐搞笑内容，和产品推广格式不匹配 | 娱乐短视频和haul为主，近10条与咖啡机无关 |
| HYDRO ART | 手工工艺频道，和咖啡机完全不相关 | 工厂定制内容，与咖啡机推广不匹配 |
| Stemon | 工业粉碎设备方向，和咖啡机偏离较大 | 工业粉碎/混料设备为主，和家用咖啡机推广场景不匹配 |
| PsyOn Gamer | 游戏恐怖向，和产品推广场景不符 | 恐怖游戏娱乐号，与家电/咖啡机推广明显不匹配 |
| The Buscemi Family | 宠物向频道，咖啡机推广受众错位 | 宠物家庭向频道，受众与家用咖啡机推广不匹配 |
| Landpack Packing Filling Machine | 工业包装设备，和咖啡机消费场景不符 | 工业包装灌装机频道，和咖啡机推广方向不对 |
| Zhongli Strpack | 工业灌装设备，和咖啡机推广不匹配 | 工业灌装/封口设备，与咖啡机推广场景互斥 |
| SHANGHAI FUBO PACKAGING MACHINERY | 工业包装机频道，和家用咖啡机用途明显错位 | 工业包装机械频道，与咖啡机投放目标不匹配 |
| Rachael Tatman | 技术研究向，缺少消费品推广场景 | AI/NLP频道，Coffee Chat 也不是咖啡机推广场景 |
| Random Video | 车宠娱乐混杂，和咖啡机推广不匹配 | 游戏/娱乐/宠物向，和咖啡机推广基本不匹配 |
| XUANHAI-MACHINE | 标签过少，缺少可判断的推广证据 | 工业包装机频道，与咖啡机消费推广不符 |
| L&L Family Vlogs | 家庭vlog加宠物娱乐，和咖啡机推广匹配度低 | 家庭Vlog+宠物娱乐为主，缺少商品测评带货场景 |
| chris watson | 标签和视频证据都缺，相关性不足 | 近期10条均为清洁/露营内容，和咖啡机推广无关 |
| ZONESUN | 工业包装设备频道，和咖啡机推广方向不符 | 工业灌装包装机频道，和咖啡机推广不匹配 |
| KiWAV.com | 车摩配件频道，和咖啡机推广方向不符 | 摩托车配件频道，和咖啡机基本无关 |
| disposable paper making machines | 工业纸品设备，和咖啡机品类不符 | 做纸杯/包装设备，不是咖啡机消费品频道 |
| ShuckaBuck | 电商业务号，非内容评测 | 印花电商频道，和咖啡机推广几乎无关 |
| Honetop Machine | 包装机械工业号，品类不符 | 工业包装机频道，与咖啡机推广目标明显不符 |
| PinasTasty | 美食号，非咖啡机导购向 | 美食料理频道，缺少咖啡机测评或导购场景 |

## nox@promotion-capacity-v1-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 11 | Pan Boroda | 0 | 车/生活向，和咖啡机推广不匹配 |
| 17 | George Fan | 0 | 无相关内容信号，难以用于推广 |
| 23 | Billy Aiken | 0 | 财经动机类，与咖啡机推广无关 |
| 30 | bzzim m | 0 | 无相关标签或视频，缺少可投放证据 |
| 34 | Morgan Eckroth | 0 | 无咖啡或家电标签，相关性不足 |
| 41 | Mrr Little | 0 | 无相关标签，和咖啡机推广不匹配 |
| 47 | Hoon's Coffee | 0 | 无咖啡相关标签，证据过弱 |
| 49 | Nealie Boschma | 0 | 短视频时尚号，无产品推广相关证据 |
| 63 | Imran Ahmed Khan | 0 | 无有效标签与内容证据，相关性不足 |
| 71 | Mirkojax | -10 | 娱乐向深度内容，和咖啡机推广不匹配 |
| 75 | Dulce pink🐺 | -10 | 时尚美妆娱乐号，和咖啡机受众不重合 |
| 79 | PromoCodePal | -15 | 娱乐梗频道，与咖啡机推广格式错配 |
| 85 | Espresso Doc. | -2 | 咖啡内容但偏ASMR，缺少购买导向 |
| 88 | Natalie Minassian | -4 | 咖啡生活+ASMR，推广格式不匹配 |
| 89 | Free Repair Guide | -4 | 车系维修向，与咖啡机几乎无关 |
| 96 | Karyna Cast | -3 | 母婴内容，与咖啡机目标不符 |
| 101 | BB Walker TV | -15 | 娱乐/音乐频道，和咖啡机推广场景明显不符 |
| 109 | Express Tech | 0 | 无标签无内容信号，相关性不足 |
| 120 | Caesar Critiques | -10 | 娱乐向频道，不适合咖啡机投放 |
| 127 | Parts Guru | 0 | 无标签无内容证据 |
| 142 | 2Cents | 0 | 缺少标签和内容证据 |
| 150 | The Repair Guy ASMR | -12 | ASMR格式与产品推广强冲突 |
| 167 | Paradise Home | 0 | 标签和视频证据都缺，相关性不足 |
| 170 | Review Kitchens | 0 | 只有泛评测名，无标签和视频证据 |
| 174 | Best Quality Reviews | 0 | 只有泛评测名，无标签和视频证据 |
| 176 | J W | 0 | 无相关信号 |
| 178 | Kyle Allen Music | -15 | 音乐娱乐号，与咖啡机推广不匹配 |
| 182 | Laura 🫶🏻 | 0 | 缺少有效信号 |
| 184 | Gadget Wav | 0 | 缺少有效信号 |
| 185 | Premium Picks | 0 | 泛生活频道，相关度弱 |

## xtb@promotion-capacity-v1-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 39 | BrewTube Cafe: Coffee Creations | -22 | ASMR/氛围音频道，不适合咖啡机推广 |
| 47 | SirCraze | -22 | ATV/骑行频道，和咖啡机受众不相干 |
| 51 | Car Sharing Jho | -4 | 有少量咖啡内容，但主体是汽车/车行，缺少咖啡机推广能力 |
| 52 | Weekly Coffee Dose | 0 | 无标签、无视频证据，无法证明与咖啡机推广相关 |
| 53 | Doug Wollman | -8 | ASMR/安静氛围型频道，虽有咖啡器具视频但推广格式明显不匹配 |
| 89 | Coffee and Tools | -10 | 工具与太阳能内容为主，和咖啡机类目关联弱 |
| 104 | VILLAS CHANNEL VLOGS | -14 | 旅行/摄影/美食为主，缺少咖啡机或家电推广能力 |
| 110 | Health & Life | -10 | 健康生活向为主，内容偏健康话题，咖啡机带货匹配度低 |
| 121 | Machineomatic | -15 | 以各类机器榜单和工具内容为主，和咖啡机推广不匹配 |
| 143 | Penglai Pack | -15 | 包装机械为主，咖啡机受众不匹配 |
| 152 | sen III Lin | -15 | 做纸杯/热成型机器，和咖啡机不是同类消费产品 |
| 161 | Big Deal HQ | -20 | 暖气/照明等产品频道，和咖啡机无明显相关 |
| 205 | Pure Billionaire Vibes | -6 | 送礼/财富内容为主，和咖啡机推广关联弱 |
| 207 | Memori masa kecil Channel | -12 | 偏健康药品话题，和咖啡机完全不相关 |
| 209 | Outdoor Gear Kit | -13 | 近期全是户外生存装备，咖啡机受众不合适 |
| 210 | eyeshadowshopper | -10 | 房产/美妆内容，与咖啡机推广不匹配 |
| 221 | Kerry-Packaging Machinery | -9 | 咖啡包装设备，不是咖啡机消费受众 |
| 234 | SHANGHAI CHENGXIANG MACHINERY | -15 | 工业灌装/贴标频道，和家用咖啡机推广场景不匹配 |
| 289 | Target Engineer | -10 | 近期几乎全是Roblox娱乐内容，与咖啡机推广场景不符 |
| 293 | Today Machine | -25 | 工业包装/搅拌设备频道，不适合家用咖啡机投放 |
| 315 | DataMesh | -9 | 工业训练/XR为主，咖啡机只是清洁演示，不像推广号 |
| 322 | Tracy | -15 | 工业包装设备频道，与咖啡机消费推广场景不匹配 |
| 344 | iForcePack | -20 | 工业灌装/封口/贴标频道，和咖啡机推广场景不匹配 |
| 354 | Nova Vending | Smart Vending Machine Innovations | -25 | 自助售卖机赛道，与咖啡机消费推广人群和场景不符 |
| 361 | Suzhou automation equipment technology co., LTD. | -14 | 工业设备频道，主要是咖啡耗材产线，不是咖啡机投放场景 |
| 366 | Maomao Lee | -10 | 偏食品机械制造，不是咖啡机消费推广场景 |
| 377 | Wolf Gadget | -15 | 汽车诊断垂直，咖啡机受众不匹配 |
| 379 | Coffee Art | -25 | 咖啡氛围音乐号，属于内容格式错配 |
| 386 | green dragonfly | -22 | ASMR/白噪音内容，和咖啡机推广场景强不匹配 |
| 402 | USA Goods | -8 | 标签和内容都偏杂货售卖，和咖啡机推广关联弱 |

## Notes
- Page-level rates use `page_size` from each run metadata.
- Cause categories are heuristic clusters from `why_short`; review representative rows before making product decisions.
