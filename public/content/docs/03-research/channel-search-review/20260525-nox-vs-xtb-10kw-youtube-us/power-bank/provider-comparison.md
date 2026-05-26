# Channel Search Provider Comparison

- keyword: power bank
- platform: youtube
- country: US
- left: nox@prompt:0c320fdab1e3 (tmp/channel-search-review/20260525-nox-vs-xtb-10kw-youtube-us/power-bank/nox-youtube)
- right: xtb@prompt:0c320fdab1e3 (tmp/channel-search-review/20260525-nox-vs-xtb-10kw-youtube-us/power-bank/xtb-youtube)
- left_rule_version: prompt:0c320fdab1e3
- right_rule_version: prompt:0c320fdab1e3
- left_prompt_hash: 0c320fdab1e3
- right_prompt_hash: 0c320fdab1e3

## Run Overview
| run | provider | rule_version | total | fit | adjacent | badcase | badcase率 | <0 | 0-9 | 10-19 | 20+ |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| nox@prompt:0c320fdab1e3 | nox | prompt:0c320fdab1e3 | 1500 | 168 | 439 | 893 | 59.5% | 136 | 1025 | 248 | 91 |
| xtb@prompt:0c320fdab1e3 | xtb | prompt:0c320fdab1e3 | 1500 | 319 | 310 | 871 | 58.1% | 906 | 318 | 220 | 56 |

## Page-Level Badcase Rate
| page | nox@prompt:0c320fdab1e3_total | nox@prompt:0c320fdab1e3_badcase | nox@prompt:0c320fdab1e3_badcase率 | xtb@prompt:0c320fdab1e3_total | xtb@prompt:0c320fdab1e3_badcase | xtb@prompt:0c320fdab1e3_badcase率 | badcase率差 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 50 | 13 | 26.0% | 50 | 3 | 6.0% | 20.0% |
| 2 | 50 | 15 | 30.0% | 50 | 11 | 22.0% | 8.0% |
| 3 | 50 | 10 | 20.0% | 50 | 9 | 18.0% | 2.0% |
| 4 | 50 | 10 | 20.0% | 50 | 16 | 32.0% | -12.0% |
| 5 | 50 | 14 | 28.0% | 50 | 11 | 22.0% | 6.0% |
| 6 | 50 | 11 | 22.0% | 50 | 15 | 30.0% | -8.0% |
| 7 | 50 | 12 | 24.0% | 50 | 7 | 14.0% | 10.0% |
| 8 | 50 | 16 | 32.0% | 50 | 17 | 34.0% | -2.0% |
| 9 | 50 | 24 | 48.0% | 50 | 16 | 32.0% | 16.0% |
| 10 | 50 | 35 | 70.0% | 50 | 10 | 20.0% | 50.0% |
| 96 | 50 | 41 | 82.0% | 50 | 39 | 78.0% | 4.0% |
| 97 | 50 | 34 | 68.0% | 50 | 37 | 74.0% | -6.0% |
| 98 | 50 | 38 | 76.0% | 50 | 28 | 56.0% | 20.0% |
| 99 | 50 | 32 | 64.0% | 50 | 34 | 68.0% | -4.0% |
| 100 | 50 | 38 | 76.0% | 50 | 29 | 58.0% | 18.0% |
| 101 | 50 | 43 | 86.0% | 50 | 34 | 68.0% | 18.0% |
| 102 | 50 | 28 | 56.0% | 50 | 31 | 62.0% | -6.0% |
| 103 | 50 | 37 | 74.0% | 50 | 31 | 62.0% | 12.0% |
| 104 | 50 | 36 | 72.0% | 50 | 31 | 62.0% | 10.0% |
| 105 | 50 | 41 | 82.0% | 50 | 32 | 64.0% | 18.0% |
| 191 | 50 | 39 | 78.0% | 50 | 48 | 96.0% | -18.0% |
| 192 | 50 | 37 | 74.0% | 50 | 41 | 82.0% | -8.0% |
| 193 | 50 | 31 | 62.0% | 50 | 43 | 86.0% | -24.0% |
| 194 | 50 | 38 | 76.0% | 50 | 42 | 84.0% | -8.0% |
| 195 | 50 | 39 | 78.0% | 50 | 45 | 90.0% | -12.0% |
| 196 | 50 | 36 | 72.0% | 50 | 44 | 88.0% | -16.0% |
| 197 | 50 | 34 | 68.0% | 50 | 43 | 86.0% | -18.0% |
| 198 | 50 | 34 | 68.0% | 50 | 38 | 76.0% | -8.0% |
| 199 | 50 | 39 | 78.0% | 50 | 44 | 88.0% | -10.0% |
| 200 | 50 | 38 | 76.0% | 50 | 42 | 84.0% | -8.0% |

## Badcase Overlap
| metric | count |
| --- | --- |
| shared_badcase | 6 |
| nox@prompt:0c320fdab1e3_only_badcase | 887 |
| xtb@prompt:0c320fdab1e3_only_badcase | 664 |

## Badcase Cause Summary
| provider | category | count |
| --- | --- | --- |
| nox@prompt:0c320fdab1e3 | 证据缺失或信号不足 | 601 |
| nox@prompt:0c320fdab1e3 | 其他 | 134 |
| nox@prompt:0c320fdab1e3 | 泛相关性偏离 | 60 |
| nox@prompt:0c320fdab1e3 | 娱乐/儿童/泛内容偏离 | 59 |
| nox@prompt:0c320fdab1e3 | 科技/电子垂类偏离 | 27 |
| nox@prompt:0c320fdab1e3 | 宠物/动物受众冲突 | 12 |
| xtb@prompt:0c320fdab1e3 | 其他 | 349 |
| xtb@prompt:0c320fdab1e3 | 泛相关性偏离 | 175 |
| xtb@prompt:0c320fdab1e3 | 证据缺失或信号不足 | 171 |
| xtb@prompt:0c320fdab1e3 | 娱乐/儿童/泛内容偏离 | 108 |
| xtb@prompt:0c320fdab1e3 | 科技/电子垂类偏离 | 50 |
| xtb@prompt:0c320fdab1e3 | 宠物/动物受众冲突 | 18 |

## Shared Badcases
| channel | nox@prompt:0c320fdab1e3 | xtb@prompt:0c320fdab1e3 |
| --- | --- | --- |
| Chase Brogan | 偏游戏主频道，只有泛电子标签，充电宝相关性弱 | 游戏频道为主，最新内容几乎无充电宝推广场景 |
| Technical Shahzada | 泛DIY教程，缺少充电宝推广语境 | 电池相关标签有，但近期内容几乎全是体育节目，题材错位 |
| ON THE RADAR | 海藻健康补充剂频道，与充电宝推广无关 | 健康补剂号，主题与充电宝不符，仅少量数码带货痕迹 |
| Kinscoter | 无标签、标题或近期内容证据支持充电宝推广相关性 | 近期均为风扇内容，与充电宝推广场景不符 |
| Steven Lam | 无标签与内容证据，和充电宝推广无明显相关性 | 以相机配件/开箱为主，缺少充电宝或供电购买语境 |
| AstroAI | 无相关标签和内容证据，不适合充电宝推广 | 汽车工具品牌频道，虽有启动电源相邻但非充电宝推广场景 |

## nox@prompt:0c320fdab1e3-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 11 | Modern Reviews | 0 | 生活/DIY标签泛化，缺少充电宝相关信号 |
| 14 | GOODaaa Official | 0 | 无标签无内容，无法判断相关性 |
| 20 | The Ghetographer | 0 | 无标签无内容线索，无法判断为充电宝相关频道 |
| 21 | Tools and Gadgets | 0 | 标签全是泛流量/平台词，与充电宝推广无明确相关 |
| 29 | Joseph Singer | 0 | 无标签无内容，无法判断为相关频道 |
| 31 | Today's Deals | 0 | 无标签、视频或近期内容证据支持充电宝推广相关性 |
| 34 | Temu Reviews ES | 0 | 无标签、视频或近期内容证据支持充电宝推广相关性 |
| 35 | Ivan Meneses | 0 | 无标签和内容信号，难判断为可投放频道 |
| 40 | Techno Panda | -8 | 近期10条几乎全是显卡新闻，和充电宝推广严重不符 |
| 41 | HW Mobiles | 0 | 无标签无内容，缺少任何充电宝相关信号 |
| 43 | Shah Chisty | 0 | 无标签无内容，无法判断为充电宝相关频道 |
| 45 | The Big Heavy | 1 | 仅有泛科技弱相关，无产品评测或购买意图证据 |
| 46 | NeoTechi | 0 | 教育类频道，无充电宝相关或购买场景，缺乏推广匹配度 |
| 53 | Luis Enrique Lemus Acosta | 0 | 无标签无内容信号，无法支撑充电宝推广相关性 |
| 57 | Power king | -10 | 娱乐影视内容为主，不适合充电宝推广 |
| 63 | Ah Tech | 0 | 无标签、无标题、无内容证据，无法判断与充电宝推广相关 |
| 64 | JJCoolStuff | 0 | 无标签与内容证据，无法判断与充电宝推广相关性 |
| 69 | HOT DIGITAL | 0 | 无标签、相关视频或近期内容，缺少移动电源推广相关性证据 |
| 70 | BOXscape | 0 | 无标签、无相关视频、无近期内容，缺少充电宝推广相关证据 |
| 72 | Dan Reviews Stuff | 0 | 无标签无内容，缺少任何相关证据 |
| 75 | AE Insider | 0 | 无标签无内容，无法判断为相关频道 |
| 78 | Purple Unicorns | -15 | 宠物狗频道，与人用充电宝推广目标明显不符 |
| 81 | eROCS | 0 | 无标签和内容信号，缺少充电宝推广相关性证据 |
| 82 | ToolStacked | 0 | 无标签和内容信号，缺少与充电宝推广的相关性 |
| 86 | Best Reviews | 0 | 无充电宝标签命中，近期也无相关内容 |
| 92 | Insight Reviews | 0 | 无标签、无内容证据，无法判断与充电宝推广相关 |
| 95 | Objectively Curious | 0 | 无标签与内容证据，和充电宝推广无可判定关联 |
| 97 | Smart Gadget Haven | 0 | 无标签、无内容证据，无法支撑充电宝推广 |
| 102 | The Life of Bob | 0 | 无标签与内容线索，难判断为电源产品推广渠道 |
| 111 | Denise Blackburn | 0 | 无标签无内容，缺少充电宝推广相关性 |

## xtb@prompt:0c320fdab1e3-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 24 | Febatt -Oscar | 0 | 虽有充电宝标签，但内容主轴是工业电池/DIY电池，消费级推广不匹配 |
| 34 | Preview Vlog | -9 | 泛生活/DIY号，充电宝相关性弱，近期内容也不匹配 |
| 42 | HOME AID Electronics & Mobile | -8 | 仅有泛电子弱相关，近期多为家电与招聘/访谈内容，偏离明显 |
| 60 | Xiaofu Power-Ivy Lian | -10 | 频道主轴是 EV charger，和 power bank 不是同类产品，近期也无相关内容 |
| 61 | Video Play Sound | -7 | 仅有旅行弱相关，近10条多为无关商品，难支撑充电宝投放 |
| 69 | EV Tesstudio | -10 | 特斯拉配件频道，近期内容几乎全不相关，充电宝推广不合适 |
| 71 | FarmToMarketGirl | -10 | 泛产品广告号，近10条无充电宝/数码相关，适配度低 |
| 75 | Shurchi Savdo Nodirshox | -5 | 有充电器标签但内容杂乱，近10条多为无关题材，难投放 |
| 80 | First Power Technology | -25 | 工业叉车充电设备，和消费级 power bank 受众明显不符 |
| 84 | karrie𝜗𝜚 | -9 | 近10条仅1条相关，其余以美妆/饰品短视频为主，推广相关性弱 |
| 90 | The Review Vault | 0 | 通用测评号但近期多为健康/家居用品，和充电宝不匹配 |
| 94 | KapePoTs | -8 | 仅一条开箱相关，最新内容大多是生活记录 |
| 95 | Video introduce the latest products | -9 | 泛产品频道但近期内容几乎都不指向充电宝 |
| 111 | Milad Khoshknab MD Amazon new release goods | -3 | 有产品评测意图，但主体是手表，近10条多为无关内容 |
| 114 | 5 phút chế tạo | -10 | 纯DIY工具制作，近10条全部偏离充电宝推广 |
| 115 | Mridul Hasan | -6 | 偏无人机和机器人内容，只有泛电子属性，充电宝不匹配 |
| 116 | GREEN CORPORATION | -7 | 电源电路/元件频道，和充电宝推广不对口 |
| 119 | KevShorted | -1 | 偏科技资讯/教程，缺少充电宝购买语境 |
| 121 | Case Club | -10 | 收纳壳频道为主，缺少充电宝推广语境 |
| 125 | Jason Yoder | -8 | 旅行摄影为主，只有弱场景关联，缺少充电宝语境 |
| 130 | Invention Tools | -8 | 以DIY技巧和杂项内容为主，缺少充电宝购买或评测意图。 |
| 154 | In The Garden Sue: Reviews for Home and Garden | -10 | 园艺家居频道，近10条几乎都是园艺工具，充电宝不匹配 |
| 156 | PowerUrus | -5 | 电池类为主，偏车载/RV，近10条与充电宝推广场景不符 |
| 164 | healthybody23 | -9 | 标签无相关，最新10条仅1条电源类，其余多为美妆/餐厨内容 |
| 165 | DIY DAD hub | -6 | 仅有DIY/家居/汽车弱相关，近10条内容几乎都不匹配 |
| 166 | Bivi | -8 | 杂项商品展示为主，缺少充电宝相关证据 |
| 168 | VirtualShift | -8 | 以音乐/趋势/日常为主，只有单条移动电源内容 |
| 173 | Pro Tech | -22 | 前5标签以新闻为主，近期虽有电池内容但非购买/评测场景 |
| 175 | Aly Lorenzo | -7 | 生活方式/购物为主，仅少量充电相关内容，近10期大多不匹配 |
| 176 | Girls cartoon | -8 | 无标签命中，内容偏手机杂项，缺少充电宝推广意图 |

## Notes
- Page-level rates use `page_size` from each run metadata.
- Cause categories are heuristic clusters from `why_short`; review representative rows before making product decisions.
