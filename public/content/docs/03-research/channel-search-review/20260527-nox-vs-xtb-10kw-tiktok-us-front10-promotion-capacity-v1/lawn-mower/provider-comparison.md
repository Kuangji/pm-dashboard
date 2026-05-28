# Channel Search Provider Comparison

- keyword: lawn mower
- platform: tiktok
- country: US
- left: nox@promotion-capacity-v1 (tmp/channel-search-review/20260527-nox-vs-xtb-10kw-tiktok-us-front10-promotion-capacity-v1/lawn-mower/nox-tiktok)
- right: xtb@promotion-capacity-v1 (tmp/channel-search-review/20260527-nox-vs-xtb-10kw-tiktok-us-front10-promotion-capacity-v1/lawn-mower/xtb-tiktok)
- left_rule_version: promotion-capacity-v1
- right_rule_version: promotion-capacity-v1
- left_prompt_hash: b87da85cf79a
- right_prompt_hash: b87da85cf79a

## Run Overview
| run | provider | rule_version | total | fit | adjacent | badcase | badcase率 | <0 | 0-9 | 10-19 | 20+ |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| nox@promotion-capacity-v1 | nox | promotion-capacity-v1 | 500 | 148 | 129 | 223 | 44.6% | 15 | 298 | 47 | 140 |
| xtb@promotion-capacity-v1 | xtb | promotion-capacity-v1 | 500 | 185 | 197 | 118 | 23.6% | 137 | 133 | 121 | 109 |

## Page-Level Badcase Rate
| page | nox@promotion-capacity-v1_total | nox@promotion-capacity-v1_badcase | nox@promotion-capacity-v1_badcase率 | xtb@promotion-capacity-v1_total | xtb@promotion-capacity-v1_badcase | xtb@promotion-capacity-v1_badcase率 | badcase率差 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 50 | 15 | 30.0% | 50 | 14 | 28.0% | 2.0% |
| 2 | 50 | 9 | 18.0% | 50 | 13 | 26.0% | -8.0% |
| 3 | 50 | 8 | 16.0% | 50 | 9 | 18.0% | -2.0% |
| 4 | 50 | 16 | 32.0% | 50 | 15 | 30.0% | 2.0% |
| 5 | 50 | 38 | 76.0% | 50 | 12 | 24.0% | 52.0% |
| 6 | 50 | 27 | 54.0% | 50 | 10 | 20.0% | 34.0% |
| 7 | 50 | 22 | 44.0% | 50 | 14 | 28.0% | 16.0% |
| 8 | 50 | 27 | 54.0% | 50 | 10 | 20.0% | 34.0% |
| 9 | 50 | 33 | 66.0% | 50 | 14 | 28.0% | 38.0% |
| 10 | 50 | 28 | 56.0% | 50 | 7 | 14.0% | 42.0% |

## Badcase Overlap
| metric | count |
| --- | --- |
| shared_badcase | 27 |
| nox@promotion-capacity-v1_only_badcase | 196 |
| xtb@promotion-capacity-v1_only_badcase | 91 |

## Badcase Cause Summary
| provider | category | count |
| --- | --- | --- |
| nox@promotion-capacity-v1 | 其他 | 117 |
| nox@promotion-capacity-v1 | 证据缺失或信号不足 | 51 |
| nox@promotion-capacity-v1 | 泛相关性偏离 | 33 |
| nox@promotion-capacity-v1 | 娱乐/儿童/泛内容偏离 | 15 |
| nox@promotion-capacity-v1 | 宠物/动物受众冲突 | 4 |
| nox@promotion-capacity-v1 | 科技/电子垂类偏离 | 3 |
| xtb@promotion-capacity-v1 | 其他 | 57 |
| xtb@promotion-capacity-v1 | 娱乐/儿童/泛内容偏离 | 34 |
| xtb@promotion-capacity-v1 | 泛相关性偏离 | 15 |
| xtb@promotion-capacity-v1 | 宠物/动物受众冲突 | 7 |
| xtb@promotion-capacity-v1 | 证据缺失或信号不足 | 5 |

## Shared Badcases
| channel | nox@promotion-capacity-v1 | xtb@promotion-capacity-v1 |
| --- | --- | --- |
| Cleaning ASMR 88 | ASMR频道，虽命中割草机词但促销场景错配 | ASMR清洁型，产品词在但不适合带货 |
| sam | 狗狗内容，和割草机推广无关 | 近10条全是喜剧内容，割草机标签像噪声 |
| Hunqeditz | 无相关标签，无法支撑割草机推广 | 娱乐短剧号，割草机标签像噪声 |
| El Garage de Vic | 汽车/礼物向账号，和割草机品类不匹配 | 标签有割草机，但近期内容几乎不相关 |
| pepMC | ASMR格式不适合物理产品推广 | ASMR满足感风格，推广格式错配明显 |
| Camryn Bryant | 动物/农场生活为主，和割草机不匹配 | 有农场语境和促销能力，但近10条多为穿搭美妆等无关内容 |
| howtriedme686 | 无标签无内容证据 | 故事号主打 HOA/救人剧情，不适合卖 mower。 |
| 𝔻𝕦𝕓𝕒𝕚 ℙ𝕣𝕚𝕟𝕔𝕖 👑 | 无相关标签和内容证据 | 割草加 CopCam 故事流，和产品推广不匹配 |
| Mechenlin Boys | 无标签无内容，相关性证据缺失 | 短剧叙事号，近10条对割草机推广基本无效 |
| Cesar | 无标签和内容线索，无法判断为相关频道 | 故事叙事型内容为主，非割草机评测导购，推广适配性低 |
| ARDWelderArt | 焊接内容，与 lawn mower 推广无关 | 焊接号与割草机品类弱相关，近10条也不够匹配 |
| U.S.A Drama | 无相关标签与内容证据 | 剧情号，虽有lawnmower字样但无产品推广能力 |
| Rug Cleaning ASMR 01 | ASMR清洁号，格式与商品推广冲突 | ASMR清洁向，虽有割草机标签但不适合做产品推广 |
| Papa Clean 88 | 无标签无内容，缺少与割草机相关信号 | 标签沾 lawncare，但近10条转成家清/hoarder 故事，格式不适合 |
| Blue Cam | 无相关标签或视频信号 | 剧情式 lawn 号，和割草机带货场景不匹配。 |
| makeloveUS | 无相关标签和内容信号 | ASMR/helping-hand 格式强错配，不适合卖 lawn mower |
| nellielawson26 | 无相关标签和内容信号 | 赛车引擎/死亡机器路线，偏娱乐改装而非家用割草机 |
| CopperCreekCuts1 | 有割草场景，但 ASMR/舒缓格式不适合推广 | ASMR+satisfying 格式强错配，虽有 mowing 也不适合 |
| wzymei94 | 无相关垂类信号 | 法律/整蛊/篮球杂内容，割草机相关性低。 |
| Tou | 祛痘娱乐内容，与割草机完全错位 | 皮肤清理号与割草机受众冲突，标签污染明显 |
| wzymei1106 | 无相关信息，无法判断为割草机受众 | 体育号为主，lawncare 只是偶发内容 |
| Story Drama | 剧情娱乐向，和割草机推广明显不匹配 | 短剧娱乐向账号，带割草标签也不改变属性 |
| nzalliwc8cz Officials | 无标签无内容，和割草机推广不相关 | 直命中 lawnmower，但叙事清洁故事体裁不适合 |
| hytmei2 | 无相关标签和视频证据 | 故事冲突号，标签和近10条内容都不适合割草机推广 |
| wxlmei10 | 无相关标签和视频证据 | 剧情投诉类内容为主，和割草机推广目标不符 |
| vt198598vtr | 无可识别的相关领域信号 | 故事连载号，割草机只是话题标签 |
| Clean | ASMR/清洁向，属于强格式错配 | 清洁ASMR号，mower 只是被当作爽感素材，不是推广位 |

## nox@promotion-capacity-v1-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 5 | mjaa_fashion | 20 | 时尚号仅挂单个割草机词，像蹭词 |
| 8 | DirtyBuilt | 5 | 泥地越野改装向，非普通园林割草机主场 |
| 18 | Corbin | 5 | ATV/越野泥地改装向，偏离普通割草机推广 |
| 20 | Rug Cleaning ASMR | 5 | 清洁助眠ASMR，和割草机促销强冲突 |
| 24 | the555 | 0 | 无相关信息，不能判断为割草机频道 |
| 28 | Jerry Reviews | 0 | 内容与割草机无关，缺少任何相关受众信号 |
| 33 | The Gearhead Court | 0 | 汽车性能内容为主，与割草机无关 |
| 38 | Animals Core | 5 | 动画/meme为主，和割草机受众不匹配 |
| 44 | Tool displayer | 0 | 工具卖货泛化，缺少割草机相关性 |
| 47 | Windward shoe Repair | 0 | 仅有品牌/链锯标签，缺少割草机信号 |
| 54 | Miniature Carpet Cleaning ASMR | 7 | ASMR/睡眠型内容，和割草机推广格式强冲突 |
| 60 | Benny Lalios | 0 | 服饰穿搭号，无割草机相关信号 |
| 65 | Dailydays | 8 | 警察和 karen 娱乐内容，和割草机推广不匹配 |
| 66 | saratjor9ps | 0 | 无有效标签或内容信号 |
| 79 | Alyssa & Kickball Dad | 20 | 生活/体育为主，lawn mower 只是弱挂靠 |
| 81 | Hassan🥶 | 0 | 与 lawn mower 无关，缺少相关标签 |
| 83 | TarwaterServices | 5 | ASMR/声音向强错配，不适合实体产品推广 |
| 84 | brandiejean_momof2 | 20 | 家庭生活为主，lawn mower 仅是弱挂靠 |
| 92 | karen.com.us.usa | 20 | 警察/梗图向内容，与 lawn mower 无关 |
| 105 | Spiritual Dive | 8 | ASMR/故事格式错配，产品推广不合适 |
| 127 | Inspiring Designs | 0 | 室内设计频道，与割草机无关 |
| 129 | Ad | 5 | 宠物狗内容占主导，割草机标签为宠物向冲突 |
| 138 | Jack Schneider | 0 | 科技航空向，与割草机无关 |
| 140 | The Barn Brothers | 0 | 车辆/卡丁车为主，缺少草坪机械语境 |
| 144 | filipyjon | -5 | 叙事/真故事内容，和产品推广格式冲突 |
| 149 | SICK Cars and Trucks | 0 | 车和卡车内容，与割草机无关 |
| 156 | Cleaning | -15 | 纯搞笑娱乐号，和草坪机推广不匹配 |
| 158 | cowmowgrass | 0 | 无标签无视频证据，相关性不足 |
| 163 | car.repair91 | -15 | 警务娱乐号，和草坪机推广场景不匹配 |
| 172 | John Seaman | 0 | 只有泛车辆标签，和割草机相关性弱 |

## xtb@promotion-capacity-v1-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 25 | Clean Up Mowing | -5 | ASMR清理号，强相关词也抵不过格式错配 |
| 28 | fcaiji yeyeye | -18 | 故事/娱乐号，割草机只是标题标签 |
| 30 | Flaharty 87 | -16 | 清洁ASMR为主，近10条多为家清而非割草机 |
| 32 | dclunvzni1r | 5 | 故事号，割草机只是标签，商业转化不稳 |
| 45 | ASMR Cleaning | -23 | 纯 ASMR 清洁号，和割草机推广场景冲突 |
| 46 | Clean Space | -8 | 有割草内容，但清洁/ASMR 属性太强，不稳 |
| 56 | Story mowing | -2 | ASMR/relaxing 叙事型，偏娱乐不适合卖货 |
| 59 | David Kreigh Lawn Mowing Guru | -5 | 偏 funny 娱乐号，卖 lawn mower 的适配度低 |
| 62 | Allan.Dong 董盼盼 | -7 | chainsaw/修枝机为主，和 lawn mower 关联弱 |
| 64 | toad | -10 | 农机/畜牧向，和家用 lawn mower 受众不匹配 |
| 65 | Andrew | -8 | 农机/拖拉机为主，和 lawn mower 受众不匹配 |
| 66 | Fill's Lawn Care | -2 | lawncare 直相关，但 ASMR 形式偏强错配 |
| 73 | mower247 | -15 | 娱乐/搞笑号为主，近期 lawncare 也难改定位 |
| 95 | yajovani | -6 | 只有少量 mowing 话题，其余多为无关短剧/辩论内容 |
| 98 | The Russ Russell | -9 | 近10条以家庭内容为主，缺少割草机评测或购买意图 |
| 107 | Luis Salcido | -6 | 只有一条割草机内容，整体还是卡车柴油号 |
| 109 | @robo | -17 | 宠物和节日内容为主，割草机只是偶发标题 |
| 118 | Free Lawn Care USA 🇺🇲 | 0 | ASMR治愈向割草，不是产品推广型频道 |
| 119 | LawnCareDrama | -2 | 剧情冲突内容主导，割草只是故事背景 |
| 122 | CBOYS | -18 | 车辆挑战娱乐频道，割草机只是一次 stunt |
| 132 | Comedy video 🤣 | -18 | 频道偏搞笑娱乐，只有零星割草机带货，格式不匹配 |
| 136 | Private Selection | -10 | 内容主轴是鞋服和篮球，几乎没有割草机相关证据 |
| 150 | lawnmaxxing | -8 | 娱乐/故事向为主，recent里虽有割草内容但推广格式不合 |
| 151 | ARJAYS | -10 | 猫宠内容为主，最近虽碰到 lawncare 话题但与割草机推广无关 |
| 152 | Cucu | -12 | ASMR/满足感内容为主，属于 lawn mower 的格式错配 |
| 156 | erdousin | -31 | pimple/ASMR 主导，少量 lawnmower 只是蹭话题 |
| 157 | Sarah Lou | Cottage Home | -10 | 家居改造/二手号，和 lawn mower 推广场景不匹配 |
| 160 | Show Us | -15 | 新闻/辩论号，最近 lawncare 也偏剧情，不适合卖 mower |
| 161 | L1FE | -9 | 整体是泛娱乐，只有一条 mower 段子，相关性很弱 |
| 163 | 🃏♠️B & G♠️🃏 | -9 | 捕鱼/户外杂项号，只有零星 mowing 相关内容 |

## Notes
- Page-level rates use `page_size` from each run metadata.
- Cause categories are heuristic clusters from `why_short`; review representative rows before making product decisions.
