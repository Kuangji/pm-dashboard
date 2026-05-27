# Channel Search Provider Comparison

- keyword: lawn mower
- platform: youtube
- country: US
- left: nox@promotion-capacity-v1 (tmp/channel-search-review/20260526-nox-vs-xtb-10kw-youtube-us-front10-promotion-capacity-v1/lawn-mower/nox-youtube)
- right: xtb@promotion-capacity-v1 (tmp/channel-search-review/20260526-nox-vs-xtb-10kw-youtube-us-front10-promotion-capacity-v1/lawn-mower/xtb-youtube)
- left_rule_version: promotion-capacity-v1
- right_rule_version: promotion-capacity-v1
- left_prompt_hash: b87da85cf79a
- right_prompt_hash: b87da85cf79a

## Run Overview
| run | provider | rule_version | total | fit | adjacent | badcase | badcase率 | <0 | 0-9 | 10-19 | 20+ |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| nox@promotion-capacity-v1 | nox | promotion-capacity-v1 | 500 | 221 | 161 | 118 | 23.6% | 21 | 191 | 61 | 227 |
| xtb@promotion-capacity-v1 | xtb | promotion-capacity-v1 | 500 | 290 | 146 | 64 | 12.8% | 61 | 68 | 142 | 229 |

## Page-Level Badcase Rate
| page | nox@promotion-capacity-v1_total | nox@promotion-capacity-v1_badcase | nox@promotion-capacity-v1_badcase率 | xtb@promotion-capacity-v1_total | xtb@promotion-capacity-v1_badcase | xtb@promotion-capacity-v1_badcase率 | badcase率差 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 50 | 11 | 22.0% | 50 | 4 | 8.0% | 14.0% |
| 2 | 50 | 12 | 24.0% | 50 | 1 | 2.0% | 22.0% |
| 3 | 50 | 4 | 8.0% | 50 | 6 | 12.0% | -4.0% |
| 4 | 50 | 8 | 16.0% | 50 | 8 | 16.0% | 0.0% |
| 5 | 50 | 9 | 18.0% | 50 | 7 | 14.0% | 4.0% |
| 6 | 50 | 13 | 26.0% | 50 | 10 | 20.0% | 6.0% |
| 7 | 50 | 13 | 26.0% | 50 | 4 | 8.0% | 18.0% |
| 8 | 50 | 17 | 34.0% | 50 | 7 | 14.0% | 20.0% |
| 9 | 50 | 16 | 32.0% | 50 | 6 | 12.0% | 20.0% |
| 10 | 50 | 15 | 30.0% | 50 | 11 | 22.0% | 8.0% |

## Badcase Overlap
| metric | count |
| --- | --- |
| shared_badcase | 19 |
| nox@promotion-capacity-v1_only_badcase | 99 |
| xtb@promotion-capacity-v1_only_badcase | 45 |

## Badcase Cause Summary
| provider | category | count |
| --- | --- | --- |
| nox@promotion-capacity-v1 | 证据缺失或信号不足 | 38 |
| nox@promotion-capacity-v1 | 其他 | 38 |
| nox@promotion-capacity-v1 | 娱乐/儿童/泛内容偏离 | 21 |
| nox@promotion-capacity-v1 | 泛相关性偏离 | 12 |
| nox@promotion-capacity-v1 | 宠物/动物受众冲突 | 6 |
| nox@promotion-capacity-v1 | 科技/电子垂类偏离 | 3 |
| xtb@promotion-capacity-v1 | 其他 | 33 |
| xtb@promotion-capacity-v1 | 娱乐/儿童/泛内容偏离 | 16 |
| xtb@promotion-capacity-v1 | 泛相关性偏离 | 10 |
| xtb@promotion-capacity-v1 | 证据缺失或信号不足 | 3 |
| xtb@promotion-capacity-v1 | 科技/电子垂类偏离 | 1 |
| xtb@promotion-capacity-v1 | 宠物/动物受众冲突 | 1 |

## Shared Badcases
| channel | nox@promotion-capacity-v1 | xtb@promotion-capacity-v1 |
| --- | --- | --- |
| Super Krew | 儿童玩乐频道，草坪机推广场景不匹配 | 儿童娱乐频道，虽有产品词但不适合做割草机推广 |
| He. Andrew | 娱乐/搞笑/慢镜头为主，和产品推广场景不匹配 | 虽有割草机标签和开箱评测能力，但频道以娱乐短视频为主，推广格式不匹配 |
| Steve Jessup | 喜剧播客取向强，割草机词更像人设而非推广场景 | 喜剧频道，割草机词更像梗；近10条以段子/演出为主，不适合推广 |
| Hillbilly Blueprints | 游戏和越野资讯为主，不适合割草机推广 | 泥地越野改装为主，不适合常规割草机推广 |
| Square2448 | 游戏模拟语境，不适合卖割草机 | 农场模拟游戏频道，真实割草机投放不合适 |
| Mow It Wells | ASMR割草内容，明显是声音/观赏向 | 以 ASMR 割草为主，属于物理产品推广格式不匹配 |
| Kid Crew | 儿童向内容，成人割草机推广匹配差 | 儿童教育与玩具向，成人割草机推广不匹配 |
| Hudson's Playground Gaming | 游戏频道，mower 仅是题材词，推广不匹配 | 游戏频道，和真实割草机推广场景不匹配 |
| Mow It Wells Plus | 虽有直达标签，但ASMR属明显格式不匹配 | ASMR/沉浸式风格与产品推广形式强冲突 |
| Life With Brian Lofty | ASMR格式是强不匹配，不适合割草机推广 | ASMR/满意类割草内容，产品推广格式明显不匹配 |
| Something Else2LookAt | ASMR解压频道，虽含 mower 标签，但内容格式与产品推广强冲突 | ASMR/舒缓型内容，和割草机推广存在强格式不匹配 |
| Suburb Chartre | 无标签无内容，缺少任何相关性证据 | 偏故事化清理/翻新内容，缺少可推广割草机的产品语境 |
| dramanew | 无有效标签和内容信号，无法判断为相关频道 | 剧情/故事型频道，近10条几乎全不适合卖割草机 |
| Beer, Booze & B.S. | 娱乐播客/故事频道，词面命中不代表可推广 | 播客娱乐向，虽有 lawn mower 标签但受众和形式都不适合 |
| Satisfying Lawn Care Videos | 标签全是游戏内容，与割草机推广场景明显不符 | 标签是游戏，近期又是ASMR草坪短片，和割草机推广场景不匹配 |
| The HOA Insider | 无相关标签和内容，缺少产品推广能力 | 故事/HOA频道，零散提词不构成产品受众 |
| HomeToy TV | 玩具/手作向频道，虽有同名标签但不适合真实割草机 | 玩具/儿童向频道，夹杂ASMR和玩具内容，不适合人用割草机 |
| Killer Fuzz | 纯钓鱼频道，与割草机推广无关 | 有草坪护理内容，但频道混合鱼类/ASMR，推广适配偏弱 |
| Shanti Regan | 标签集中在木工/娱乐，与割草机推广无关 | 木工/杂项为主，仅少量草坪词，推广割草机不匹配 |

## nox@promotion-capacity-v1-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 3 | Smart Agricultural Equipment | 0 | 标签过少，缺少割草机相关证据 |
| 9 | Schneider & Son | 0 | 无标签无内容证据 |
| 13 | CarsandCameras | 0 | 汽车/卡丁车内容，缺少草坪机证据 |
| 20 | Best Lawn Mowers | -10 | 体育足球娱乐标签主导，与草坪机推广不符 |
| 23 | Boonslick Equipment | 0 | 标签几乎无相关线索，证据过弱 |
| 26 | Vintage Moments | -15 | 娱乐+老广告内容，和产品推广场景不匹配 |
| 27 | Lazy Grandpa's Garage | 0 | 标签为空，缺少可判断的相关证据 |
| 52 | Air Ratchet Garage | 0 | 车库工具向，缺少割草机相关证据 |
| 56 | Average Maintenance | 0 | 泛生活/科技向，缺少 lawn mower 相关性 |
| 58 | BTECK | 0 | 无标签/视频证据，相关性不足 |
| 71 | Geo Programmer | 0 | 无割草机或园艺推广相关信号 |
| 74 | D.R.C. Productions | 0 | 无标签、无内容证据，无法判断相关 |
| 84 | Visack72 | 0 | 标签泛娱乐，和割草机无关 |
| 86 | Arts3D | 0 | 无标签与内容证据，难以相关 |
| 89 | Something 2LookAt | 5 | ASMR/满足感格式冲突，不适合产品推广 |
| 101 | Nunki Rider | 0 | 宠物骑行频道，与割草机推广无关 |
| 114 | Jack of All Trades | 0 | 无相关标签和内容信号 |
| 144 | WholeToolBox | 0 | 无标签无视频证据，无法支持割草机推广 |
| 153 | BS Electronics | 0 | 无标签、无内容，无法判断为相关频道 |
| 157 | VielDan | 5 | RC遥控车频道，与割草机推广场景明显不匹配 |
| 163 | Let's clean up | 5 | ASMR清理向，和割草机推广格式明显不匹配 |
| 172 | kaiz231 | 0 | 无标签、无内容，缺少相关性证据 |
| 179 | Lo qué callamos los albañiles en la USA | 0 | 搞笑工地内容，娱乐属性强，促销不适配 |
| 180 | Cleaning service ASMR | 5 | ASMR清洁内容，格式与产品促销强冲突 |
| 196 | George Fan | 0 | 无标签无内容证据 |
| 197 | Grind Hard Plumbing Co | 0 | 偏车辆/越野内容，和割草机推广不匹配 |
| 207 | Sakla TV | -15 | 游戏娱乐频道，与割草机推广不相容 |
| 210 | The LawnFellas | 8 | ASMR形态不适合卖货，虽有草坪词但不宜推广 |
| 221 | Handyman Hal | 0 | 儿童教育向频道，与割草机推广目的不匹配 |
| 226 | Tucker Doss | 10 | 娱乐向频道，割草机标签不足以支撑投放 |

## xtb@promotion-capacity-v1-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 69 | Chris Rollins | -5 | 标题虽含割草机，但核心是慢动作/娱乐整活，不适合 |
| 105 | Satisfying-Lawn | -20 | 短剧/故事向内容为主，不适合推广 lawn mower |
| 118 | RetroMowers | -17 | 以时尚娱乐为主，割草相关只是戏仿，不适合推广 |
| 138 | MakeShiftGarage | -9 | 汽车修理/车展为主，与 lawn mower 关联弱且近期不符 |
| 139 | Dohc Holiday customs | -10 | 自定义 moped/scooter 内容为主，lawn mower 仅是零星 hashtag |
| 147 | 777 Auction Company | -10 | 车辆拍卖频道，和割草机推广无关 |
| 162 | Samko Trad Bow | -25 | 狩猎/弓箭频道，和割草机消费场景不匹配 |
| 163 | MeeP | -23 | 游戏频道为主，近期多为无关娱乐内容 |
| 177 | Mow It Wells Shorts | 3 | 虽有mowing标签，但ASMR/oddly satisfying格式与产品推广不匹配 |
| 180 | CRACKED HOUSING FAB | -9 | 近期多为改装/漂移内容，非草坪机购买或评测场景 |
| 186 | Tool Up Handyman | -10 | 汽车维修向，和 lawn mower 主题基本无关 |
| 197 | Minh Huy LQ | -15 | 稻谷收割机内容，与家用割草机推广场景不符 |
| 204 | TN - Creative Project | -15 | 手作/木工频道与割草机推广关联很弱 |
| 209 | GDaYARDman | -5 | ASMR/舒缓型格式与产品推广强冲突 |
| 222 | MVN Motorsports | -20 | 赛车对战型内容，卖割草机的适配性差 |
| 229 | Restorations Tools | -15 | 修复类内容与割草机促销不匹配 |
| 230 | Minh Qui Vlogs | -15 | 农机收割向，不是草坪割草机赛道 |
| 246 | Mujahid Shohel | -8 | 近10条多数与割草机无关，缺少明确推广场景 |
| 255 | WorldKnow | -20 | 无标签且近期全是剧情冲突叙事，不适合卖割草机 |
| 256 | Lawnster Mowing | -20 | ASMR割草内容偏感官娱乐，和产品推广格式冲突 |
| 263 | RC JAY | -15 | 链锯砍树内容为主，和割草机推广场景不匹配 |
| 269 | Ideas for Our Time | -20 | 以AI梗图和泛户外内容为主，割草机只是偶发提及 |
| 274 | Johnny Hutson | -17 | 娱乐搞笑为主，割草机只是顺带提及 |
| 277 | Dashing in the D | -21 | 短视频搞笑搬运，产品词只是插入式提及 |
| 286 | Open Circuit RC & Tech | -10 | RC和电子评测为主，和 lawn mower 关联太弱 |
| 293 | Diy Lord Farm | -15 | 以迷你农机科学项目和ASMR为主，不是消费级割草机受众 |
| 294 | Trash or Treasure? | -16 | 剧情短视频为主，园艺/割草多是标题点缀，不适合卖货 |
| 300 | Muddy Driveway Productions | -9 | DIY摩托/越野为主，只有零星草地工具内容 |
| 346 | HEROS IN CAPES | 0 | 政治娱乐短视频为主，标签虽命中但近10条完全不在割草机场景 |
| 365 | Woodturning with Tim Yoder | 10 | 木工频道，lawn mower 只是噪声标签，主体不相关 |

## Notes
- Page-level rates use `page_size` from each run metadata.
- Cause categories are heuristic clusters from `why_short`; review representative rows before making product decisions.
