# Channel Search Provider Comparison

- keyword: power bank
- platform: youtube
- country: us
- left: nox
- right: debugger@prompt:0c320fdab1e3
- left_rule_version: -
- right_rule_version: prompt:0c320fdab1e3
- left_prompt_hash: -
- right_prompt_hash: 0c320fdab1e3

## Run Overview
| run | provider | rule_version | total | fit | adjacent | badcase | badcase率 | <0 | 0-9 | 10-19 | 20+ |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| nox | nox | - | 1500 | 229 | 475 | 796 | 53.1% | 97 | 1081 | 232 | 90 |
| debugger@prompt:0c320fdab1e3 | debugger | prompt:0c320fdab1e3 | 1486 | 374 | 489 | 623 | 41.9% | 44 | 937 | 325 | 180 |

## Page-Level Badcase Rate
| page | nox_total | nox_badcase | nox_badcase率 | debugger@prompt:0c320fdab1e3_total | debugger@prompt:0c320fdab1e3_badcase | debugger@prompt:0c320fdab1e3_badcase率 | badcase率差 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 50 | 16 | 32.0% | 50 | 0 | 0.0% | 32.0% |
| 2 | 50 | 17 | 34.0% | 50 | 4 | 8.0% | 26.0% |
| 3 | 50 | 8 | 16.0% | 50 | 10 | 20.0% | -4.0% |
| 4 | 50 | 13 | 26.0% | 50 | 15 | 30.0% | -4.0% |
| 5 | 50 | 15 | 30.0% | 50 | 11 | 22.0% | 8.0% |
| 6 | 50 | 13 | 26.0% | 50 | 8 | 16.0% | 10.0% |
| 7 | 50 | 12 | 24.0% | 50 | 9 | 18.0% | 6.0% |
| 8 | 50 | 16 | 32.0% | 50 | 11 | 22.0% | 10.0% |
| 9 | 50 | 25 | 50.0% | 50 | 10 | 20.0% | 30.0% |
| 10 | 50 | 19 | 38.0% | 50 | 7 | 14.0% | 24.0% |
| 95 | 0 | 0 | 0.0% | 50 | 26 | 52.0% | -52.0% |
| 96 | 50 | 21 | 42.0% | 50 | 27 | 54.0% | -12.0% |
| 97 | 50 | 41 | 82.0% | 50 | 21 | 42.0% | 40.0% |
| 98 | 50 | 27 | 54.0% | 50 | 21 | 42.0% | 12.0% |
| 99 | 50 | 28 | 56.0% | 50 | 25 | 50.0% | 6.0% |
| 100 | 50 | 32 | 64.0% | 50 | 23 | 46.0% | 18.0% |
| 101 | 50 | 26 | 52.0% | 50 | 31 | 62.0% | -10.0% |
| 102 | 50 | 26 | 52.0% | 50 | 25 | 50.0% | 2.0% |
| 103 | 50 | 38 | 76.0% | 50 | 22 | 44.0% | 32.0% |
| 104 | 50 | 36 | 72.0% | 50 | 32 | 64.0% | 8.0% |
| 105 | 50 | 30 | 60.0% | 0 | 0 | 0.0% | 60.0% |
| 189 | 0 | 0 | 0.0% | 50 | 26 | 52.0% | -52.0% |
| 190 | 0 | 0 | 0.0% | 50 | 26 | 52.0% | -52.0% |
| 191 | 50 | 33 | 66.0% | 50 | 18 | 36.0% | 30.0% |
| 192 | 50 | 30 | 60.0% | 50 | 35 | 70.0% | -10.0% |
| 193 | 50 | 31 | 62.0% | 50 | 31 | 62.0% | 0.0% |
| 194 | 50 | 37 | 74.0% | 50 | 23 | 46.0% | 28.0% |
| 195 | 50 | 37 | 74.0% | 50 | 35 | 70.0% | 4.0% |
| 196 | 50 | 31 | 62.0% | 50 | 33 | 66.0% | -4.0% |
| 197 | 50 | 31 | 62.0% | 50 | 34 | 68.0% | -6.0% |
| 198 | 50 | 35 | 70.0% | 36 | 24 | 66.7% | 3.3% |
| 199 | 50 | 34 | 68.0% | 0 | 0 | 0.0% | 68.0% |
| 200 | 50 | 38 | 76.0% | 0 | 0 | 0.0% | 76.0% |

## Badcase Overlap
| metric | count |
| --- | --- |
| shared_badcase | 64 |
| nox_only_badcase | 732 |
| debugger@prompt:0c320fdab1e3_only_badcase | 556 |

## Badcase Cause Summary
| provider | category | count |
| --- | --- | --- |
| nox | 证据缺失或信号不足 | 466 |
| nox | 其他 | 191 |
| nox | 泛相关性偏离 | 64 |
| nox | 娱乐/儿童/泛内容偏离 | 53 |
| nox | 科技/电子垂类偏离 | 12 |
| nox | 宠物/动物受众冲突 | 10 |
| debugger@prompt:0c320fdab1e3 | 证据缺失或信号不足 | 326 |
| debugger@prompt:0c320fdab1e3 | 其他 | 201 |
| debugger@prompt:0c320fdab1e3 | 泛相关性偏离 | 43 |
| debugger@prompt:0c320fdab1e3 | 娱乐/儿童/泛内容偏离 | 36 |
| debugger@prompt:0c320fdab1e3 | 宠物/动物受众冲突 | 9 |
| debugger@prompt:0c320fdab1e3 | 科技/电子垂类偏离 | 8 |

## Shared Badcases
| channel | nox | debugger@prompt:0c320fdab1e3 |
| --- | --- | --- |
| Sumaho Friends | 动画喜剧频道，产品推广不适配 | 动画娱乐格式，带货场景严重不匹配 |
| Will U Push The Button | 娱乐问答/梗内容，和充电宝推广不匹配 | 以旅行/娱乐泛内容为主，相关性弱 |
| ON THE RADAR | 保健补剂频道，和充电宝完全无关 | 健康补充剂频道，与充电宝推广无关，缺少产品购买场景信号 |
| Headmaster | 无标签证据，相关性不足 | 无标签无内容证据，和充电宝无关 |
| qcharger | 无标签和内容证据，相关性不足 | 缺少相关标签与内容证据 |
| Anker Innovate & Educate | 无标签和内容证据，相关性不足 | 缺少相关标签与内容证据 |
| Kinscoter | 无有效标签，无法判断为相关频道 | 主打香薰/加湿/风扇，和充电宝不匹配 |
| Connect Homes | 无标签且无相关内容，难以判断相关性 | 无有效标签与内容信号 |
| xonotrix | 仅有 hobby，缺少充电宝相关信号 | 仅有hobby，相关性不足 |
| Today's Tech Bytes | 仅有技术名义，缺少标签和内容 | 无标签和内容证据，缺少充电宝推广相关性 |
| K R A L Y N 3D | 仅泛科技生活标签，导购支撑弱 | 缺少相关标签与内容证据 |
| Kristi.Kreative | 无标签无内容，证据不足 | 无相关电子类标签，难支持充电宝投放 |
| Antank | 无标签无内容，证据不足 | 无标签且名称不明，相关性不足 |
| Awesome Marketplace | 时尚/家居向，和充电宝偏离较大 | 时尚生活为主，相关信号很弱 |
| Nguyen DIY | DIY泛题，缺少充电宝相关性 | 无标签，缺少相关证据 |
| Popular content | ASMR偏音频放松格式，和充电宝推广冲突 | 罪案/ASMR/娱乐向，和产品推广冲突 |
| Top Trends | 泛趋势号，缺少购买/评测语境 | 无相关标签或内容，难支撑充电宝推广 |
| MasoudReparo | 维修向未见充电宝证据 | 无标签无内容，无法判断 |
| Najim Uddin | 无明确品类信号，相关性不足 | 无标签、无标题、无近期内容信号，缺乏推广相关性 |
| FarmToMarketGirl | 农贸生活题材，和充电宝不相关 | 无标签和视频证据，内容看不出与充电宝推广相关 |
| Chris Powell | 美纹身内容，和充电宝推广无关 | 纹身内容与充电宝推广场景无关 |
| Clear HD | 无可用相关信号 | 信息不足，缺少明确数码信号 |
| Alltechemy | 缺少标签和内容证据，无法支撑充电宝推广 | 无标签与内容证据 |
| ALIEXPRESS STORE | 无标签，无法确认有效相关性 | 店铺号无标签，缺少明确受众 |
| MainStreamGifts | 无标签无视频证据，缺少与充电宝推广相关性 | 缺少标签与视频证据，主题偏离充电宝推广 |
| woods roamer | 无标签与内容信号，和充电宝推广无关 | 无可用标签与内容信号 |
| Glocal Project | 无标签与内容信号 | 无标签无内容，无法判断 |
| Smart shop | 缺少标签与内容证据 | 仅有 Gadgets 泛类标签，购买意图不足 |
| GreatShield USA | 无标签和内容信号，难判断与充电宝推广相关 | 无相关标签，缺少充电宝测评或导购信号 |
| Driving Tesla | 无标签，主要是车辆主题，缺少投放依据 | 缺少标签与视频证据，主题偏离充电宝推广 |

## nox-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 10 | Modern Reviews | 2 | 偏生活技巧/DIY，缺少消费电子与供电场景 |
| 13 | GOODaaa Official | 0 | 无可用标签，缺少任何相关信号 |
| 18 | wwjoshdew | 2 | 仅有泛科技标签，相关性偏弱 |
| 20 | The Ghetographer | 0 | 无标签，无法判断相关性 |
| 21 | Tools and Gadgets | 0 | 游戏/泛视频标签为主，与 power bank 不符 |
| 25 | Murdic3k | 1 | 枪械/游戏等主题偏离，缺少移动电源受众 |
| 27 | Joseph Singer | 0 | 无有效标签和内容证据，无法判断为数码推广对象 |
| 31 | Today's Deals | 0 | 缺少标签和内容证据，无法确认充电宝推广相关 |
| 34 | Temu Reviews ES | 0 | 无标签和内容，基本无召回信号 |
| 35 | Ivan Meneses | 0 | 无标签和内容，基本无召回信号 |
| 40 | HW Mobiles | 0 | 无有效标签，无法判断为推广对象 |
| 41 | Techno Panda | 0 | GPU新闻吐槽向，和充电宝推广场景不匹配 |
| 43 | Shah Chisty | 0 | 无有效标签，无法判断为推广对象 |
| 44 | The Big Heavy | 0 | 车辆/生活泛内容，充电宝推广相关性弱 |
| 46 | NeoTechi | 0 | 教育内容，和充电宝推广场景不匹配 |
| 50 | entertainment gadget | 0 | 无有效标签，无法判断为推广对象 |
| 53 | Luis Enrique Lemus Acosta | 0 | 无标签无内容，无法支撑充电宝推广 |
| 55 | Power king | -15 | 娱乐影视短内容为主，和充电宝推广明显不匹配 |
| 63 | Ah Tech | 0 | 无标签无内容，无法支撑充电宝推广 |
| 64 | JJCoolStuff | 0 | 无标签无内容，无法支撑充电宝推广 |
| 69 | HOT DIGITAL | 0 | 无标签无内容，无法支撑充电宝推广 |
| 70 | Dan Reviews Stuff | 0 | 无标签无内容，无法支撑充电宝推广 |
| 71 | BOXscape | 0 | 无标签无内容，无法支撑充电宝推广 |
| 75 | AE Insider | 0 | 无标签无内容，无法支撑充电宝推广 |
| 77 | Purple Unicorns | -15 | 宠物频道，非人用充电宝受众 |
| 81 | ToolStacked | 0 | 缺少标签与内容证据 |
| 83 | eROCS | 0 | 缺少可判断的相关证据 |
| 86 | Best Reviews | 0 | 缺少标签与内容证据 |
| 92 | Insight Reviews | 0 | 缺少标签与内容证据 |
| 95 | Objectively Curious | 0 | 缺少标签与内容证据 |

## debugger@prompt:0c320fdab1e3-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 82 | 𝗠𝗢𝗭𝗧𝗘𝗖𝗛 𝗢𝗳𝗳𝗶𝗰𝗶𝗮𝗹 | 0 | 无有效标签，无法判断相关性 |
| 85 | Amy Yan | 0 | 无有效标签，无法判断相关性 |
| 96 | TwoFound Market | 0 | 无有效标签，无法判断相关性 |
| 97 | Video Play Sound | 1 | 仅有少量旅行场景关联，整体仍不适合投放 |
| 115 | Vionentus | 0 | 标签以钱包和时尚为主，与充电宝推广无直接相关 |
| 138 | NEBO | 0 | 照明工具频道，与移动电源推广目标不匹配 |
| 142 | Mridul Hasan | 0 | 偏无人机和机器人内容，缺少移动电源购买场景 |
| 143 | The Wizard of West LA | 2 | 偏技术编程号，只有手机泛相关，带货意图弱 |
| 145 | Jason Yoder | 0 | 旅行摄影内容为主，和移动电源只有弱场景关系 |
| 148 | Joshua Powell Amazon Reviews | 0 | 无有效标签，缺少相关性证据 |
| 149 | Gear Box | 0 | 无标签，无法判断为相关频道 |
| 150 | Invention Tools | 0 | DIY家居技巧号，和移动电源推广不相关 |
| 164 | CHINA LIKE | 0 | 主做手机清理教程，缺少充电产品场景 |
| 167 | Chase Brogan | 0 | 游戏主体过强，充电宝推广关联弱 |
| 178 | healthybody23 | 0 | 健康美妆向，和充电宝推广无关 |
| 179 | DIY DAD hub | 0 | DIY家居维修向，缺少电源类推广语境 |
| 181 | VirtualShift | 0 | 空标签，无法判断相关性 |
| 182 | Dave and Sissy | 0 | 购物礼物向过泛，缺少电源产品语境 |
| 185 | Pro Tech | 0 | 新闻政治向，和充电宝推广不匹配 |
| 187 | Techno Verdict | 0 | 泛科技评测，但缺少充电场景信号 |
| 188 | Tech with Qasim Aziz | 0 | 手机维修向，和充电宝推广不够贴合 |
| 191 | Fillcart Official 2 | -15 | Mukbang/ASMR 食品向，强格式不匹配 |
| 193 | Alpha Artisan | -10 | ASMR/摄影向，和充电宝推广不匹配 |
| 195 | Fishycomics | 0 | 车评和Vlog向，缺少充电宝购买信号 |
| 199 | How To by Lou - tips + Everything that Glitches | 0 | DIY/骑行泛题材，充电宝关联很弱 |
| 204 | The Dad Way | 0 | 亲子生活方式频道，和移动电源推广几乎无关 |
| 218 | WebCosplay | 0 | Cosplay/娱乐内容为主，和电源产品不搭 |
| 220 | Gear Elevation | 0 | 装饰娱乐向频道，和移动电源推广无关 |
| 227 | WarmStoryDY | 0 | 无标签无内容，缺乏推广相关信号 |
| 239 | mtandiz | 2 | 复古电视/广告向，和电源产品不贴合 |

## Notes
- Page-level rates use `page_size` from each run metadata.
- Cause categories are heuristic clusters from `why_short`; review representative rows before making product decisions.
