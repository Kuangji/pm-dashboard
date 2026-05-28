# Channel Search Provider Comparison

- keyword: vacuum cleaner
- platform: tiktok
- country: US
- left: nox@promotion-capacity-v1 (tmp/channel-search-review/20260527-nox-vs-xtb-10kw-tiktok-us-front10-promotion-capacity-v1/vacuum-cleaner/nox-tiktok)
- right: xtb@promotion-capacity-v1 (tmp/channel-search-review/20260527-nox-vs-xtb-10kw-tiktok-us-front10-promotion-capacity-v1/vacuum-cleaner/xtb-tiktok)
- left_rule_version: promotion-capacity-v1
- right_rule_version: promotion-capacity-v1
- left_prompt_hash: b87da85cf79a
- right_prompt_hash: b87da85cf79a

## Run Overview
| run | provider | rule_version | total | fit | adjacent | badcase | badcase率 | <0 | 0-9 | 10-19 | 20+ |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| nox@promotion-capacity-v1 | nox | promotion-capacity-v1 | 500 | 237 | 103 | 160 | 32.0% | 29 | 169 | 32 | 270 |
| xtb@promotion-capacity-v1 | xtb | promotion-capacity-v1 | 500 | 226 | 171 | 103 | 20.6% | 132 | 128 | 109 | 131 |

## Page-Level Badcase Rate
| page | nox@promotion-capacity-v1_total | nox@promotion-capacity-v1_badcase | nox@promotion-capacity-v1_badcase率 | xtb@promotion-capacity-v1_total | xtb@promotion-capacity-v1_badcase | xtb@promotion-capacity-v1_badcase率 | badcase率差 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 50 | 33 | 66.0% | 50 | 4 | 8.0% | 58.0% |
| 2 | 50 | 28 | 56.0% | 50 | 9 | 18.0% | 38.0% |
| 3 | 50 | 25 | 50.0% | 50 | 12 | 24.0% | 26.0% |
| 4 | 50 | 8 | 16.0% | 50 | 14 | 28.0% | -12.0% |
| 5 | 50 | 11 | 22.0% | 50 | 12 | 24.0% | -2.0% |
| 6 | 50 | 5 | 10.0% | 50 | 13 | 26.0% | -16.0% |
| 7 | 50 | 7 | 14.0% | 50 | 3 | 6.0% | 8.0% |
| 8 | 50 | 10 | 20.0% | 50 | 13 | 26.0% | -6.0% |
| 9 | 50 | 14 | 28.0% | 50 | 10 | 20.0% | 8.0% |
| 10 | 50 | 19 | 38.0% | 50 | 13 | 26.0% | 12.0% |

## Badcase Overlap
| metric | count |
| --- | --- |
| shared_badcase | 9 |
| nox@promotion-capacity-v1_only_badcase | 151 |
| xtb@promotion-capacity-v1_only_badcase | 90 |

## Badcase Cause Summary
| provider | category | count |
| --- | --- | --- |
| nox@promotion-capacity-v1 | 证据缺失或信号不足 | 60 |
| nox@promotion-capacity-v1 | 其他 | 45 |
| nox@promotion-capacity-v1 | 娱乐/儿童/泛内容偏离 | 25 |
| nox@promotion-capacity-v1 | 泛相关性偏离 | 25 |
| nox@promotion-capacity-v1 | 宠物/动物受众冲突 | 5 |
| xtb@promotion-capacity-v1 | 其他 | 47 |
| xtb@promotion-capacity-v1 | 娱乐/儿童/泛内容偏离 | 26 |
| xtb@promotion-capacity-v1 | 泛相关性偏离 | 16 |
| xtb@promotion-capacity-v1 | 宠物/动物受众冲突 | 8 |
| xtb@promotion-capacity-v1 | 证据缺失或信号不足 | 6 |

## Shared Badcases
| channel | nox@promotion-capacity-v1 | xtb@promotion-capacity-v1 |
| --- | --- | --- |
| Jed | 游戏短视频账号，受众与吸尘器推广偏离 | 游戏玩具号带吸尘器标签，近期几乎全是玩具 |
| baobei520168 | 课堂/舞蹈号，和吸尘器推广无关 | 故事演绎内容占主导，清洁带货只是零星插入 |
| zzkkll0202 | Reddit故事搬运，偏叙事娱乐，不适合商品推广 | 有 vacuum cleaner 标签，但 story/skit 叙事内容不适合带货 |
| mobdaowas | 无标签与内容证据 | 喜剧动漫号，吸尘器只偶尔出现，主体不适合 |
| asd20293949 | 无相关证据 | 卡拉OK号为主，吸尘器只是零散带入，不适合稳定投放 |
| Kenia Nails | 纯美甲垂类，和吸尘器推广无关 | 标签里有vacuum cleaner，但账号核心是美甲美妆，受众不对 |
| sweepdreams25 | ASMR向内容，偏听觉展示而非推广 | ASMR吸尘内容偏氛围，不是产品推广型频道 |
| JustVacuuming | ASMR静音氛围型，和吸尘器促销格式冲突 | ASMR/解压型 vacuum 内容，非产品推广频道 |
| mytherapistisavacuum | ASMR/满足感清洁为主，促销形式不匹配 | ASMR吸尘器为主，偏声音娱乐，不适合卖货 |

## nox@promotion-capacity-v1-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 5 | hjq1001zkl | -15 | 纯电影剪辑娱乐号，和吸尘器推广无关 |
| 7 | ookkzkl03 | 0 | 无标签无内容证据，无法判断相关性 |
| 10 | Amanda | 0 | 无标签无内容证据，无法判断相关性 |
| 12 | ookkzkl02 | 0 | 泛流量趋势号，缺少产品推广指向 |
| 13 | yangfgj1357 | 0 | 无标签无内容证据，无法判断相关性 |
| 14 | hhhhy225 | 0 | 车辆/机车频道，与家用吸尘器关联弱 |
| 15 | kirakosaring_u | -10 | 娱乐梗内容为主，和清洁类产品不匹配 |
| 16 | hhhcc888888 | 0 | 无标签无内容证据，无法判断相关性 |
| 17 | coopdatrila32 | -12 | 播客/泛娱乐号，缺少家电投放场景 |
| 18 | santanamjh | -15 | 纯娱乐与流量号，和吸尘器推广不适配 |
| 19 | Harper | 0 | 无标签无内容证据，无法判断相关性 |
| 22 | cutebutd86 | -12 | 漫画/故事类内容，非家电推广场景 |
| 23 | geonesate | 0 | 无标签无内容证据，无法判断相关性 |
| 25 | zkl0003 | -15 | 动画表情包频道，缺少清洁产品推广场景 |
| 26 | hegduk6668845 | 0 | 标签空白，缺少任何与清洁家电相关的证据 |
| 30 | ggggyk88 | 0 | 无标签无内容证据，无法判断相关性 |
| 31 | Belifehome | 0 | 无标签无内容证据，无法判断相关性 |
| 34 | zzkkllooll03 | 0 | 无标签无内容证据，无法判断相关性 |
| 36 | VICEASE | 0 | 无标签无内容证据，无法判断相关性 |
| 38 | Lucero | 0 | 无标签无内容证据，无法判断相关性 |
| 39 | baog6688 | -15 | 故事动画/卡通类，和清洁家电强错配 |
| 40 | drontosaurus | 0 | 蛋糕美食向，与清洁家电相关性很弱 |
| 41 | shopconliza | -5 | 娱乐偶像向，缺少产品推广场景 |
| 43 | KKKKK | 0 | 无标签无内容证据，无法判断相关性 |
| 44 | Dezkly | 0 | 无标签无内容证据，无法判断相关性 |
| 45 | orange9998880 | 0 | 无标签无内容证据，无法判断相关性 |
| 46 | NexusNexusNY | 0 | 无标签无内容证据，无法判断相关性 |
| 47 | tianiobobobb | -5 | 娱乐梗图向，不适合清洁家电推广 |
| 49 | hhhcc686868 | 0 | 无标签无内容证据，无法判断相关性 |
| 50 | Alina | 0 | 无标签无内容证据，无法判断相关性 |

## xtb@promotion-capacity-v1-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 61 | tengbavacuumcleaner | -14 | 以ASMR和搞笑演示为主，缺少评测购买导向 |
| 62 | HPad | 3 | 有清洁器直接标签，但以搞笑/ASMR为主，促销场景不匹配 |
| 65 | WrapTheWorld_Official | 1 | 近期以睡眠/白噪音内容为主，和清洁带货格式冲突 |
| 67 | dsjowwb72 | -18 | 近期与vacuum无关，主要是链锯和空调等品类 |
| 83 | xingyazhu02 | 9 | 剧情/搞笑为主，虽有吸尘器标签，但格式不适合带货 |
| 86 | Beautiful-life | 15 | 吸尘器ASMR/听感内容为主，格式不适合卖货 |
| 96 | Movie_city | 2 | 影视向账号，只有零散吸尘器内容，相关性弱 |
| 97 | HoHo11 | 14 | 吸尘器和清洁标签强，但近期以ASMR清扫为主 |
| 98 | Rodhhd1387 | -6 | 喜剧/玩梗和玩具为主，吸尘器内容太少 |
| 105 | ilovepartyy_ | -6 | 内容以个人生活为主，仅少量吸尘器内容 |
| 107 | kakammjr343 | -2 | 仅少量吸尘器标题，其余与产品推广无关 |
| 112 | Brittney | -2 | 内容是吸尘清洁ASMR，更像观感视频不是带货 |
| 114 | chaeltt8 | -6 | 几乎全是无关帮扶/生活内容，仅1条吸尘器 |
| 117 | caramelsolace123 | -6 | 账号主体是励志/闲聊，吸尘器只出现一次 |
| 118 | louismqvzha | -2 | 宗教内容为主，吸尘器只是夹杂的广告标题 |
| 125 | jed_hao | -6 | 主要是泡泡机/玩具内容，吸尘器只出现一次 |
| 126 | Leah | -17 | 剧情/Reddit叙事号，近期多故事内容，不适合推广吸尘器 |
| 127 | Erick503🇸🇻🇲🇽 | -10 | 娱乐向账号，近期内容与吸尘器几乎无关 |
| 130 | popolll1313 | -6 | 玩具/水枪娱乐号，和吸尘器推广场景不匹配 |
| 151 | mcgeeandboys | 1 | 仅有零星吸尘器内容，整体偏宠物/娱乐，不稳定 |
| 154 | Julie Lee | -1 | 偶发吸尘器内容，主线偏游戏，投放稳定性差 |
| 156 | hhxmxm | 1 | 只少量吸尘器视频，其余偏泛娱乐，相关性弱 |
| 160 | 🍒Ale🍒 | -6 | 生活杂谈为主，偶尔提到吸尘器，不适合稳定投放 |
| 161 | Thatwqs0216 | -6 | 杂号里只偶尔出现吸尘器，相关性不足 |
| 163 | Roy | -6 | 只偶尔提到吸尘器，近期多数是玩具和杂品 |
| 169 | Rogjorkel | -16 | 喜剧音乐号为主，清洁器具内容占比太低 |
| 171 | @hhh2715 | -5 | 个人杂号，偶发吸尘器内容，缺少稳定相关性 |
| 173 | Tswizzle | 13 | 动漫娱乐号主导，吸尘器词命中也不适合投放 |
| 179 | KARO🌺 | -8 | 标签与吸尘器无关，近期大多是娱乐和杂项内容 |
| 188 | Sebastiane Browning | -7 | 只有零星吸尘器标题，整体仍是礼物和杂项内容 |

## Notes
- Page-level rates use `page_size` from each run metadata.
- Cause categories are heuristic clusters from `why_short`; review representative rows before making product decisions.
