# Channel Search Provider Comparison

- keyword: power bank
- platform: tiktok
- country: US
- left: nox@promotion-capacity-v1 (tmp/channel-search-review/20260527-nox-vs-xtb-10kw-tiktok-us-front10-promotion-capacity-v1/power-bank/nox-tiktok)
- right: xtb@promotion-capacity-v1 (tmp/channel-search-review/20260527-nox-vs-xtb-10kw-tiktok-us-front10-promotion-capacity-v1/power-bank/xtb-tiktok)
- left_rule_version: promotion-capacity-v1
- right_rule_version: promotion-capacity-v1
- left_prompt_hash: b87da85cf79a
- right_prompt_hash: b87da85cf79a

## Run Overview
| run | provider | rule_version | total | fit | adjacent | badcase | badcase率 | <0 | 0-9 | 10-19 | 20+ |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| nox@promotion-capacity-v1 | nox | promotion-capacity-v1 | 500 | 192 | 96 | 212 | 42.4% | 25 | 240 | 11 | 224 |
| xtb@promotion-capacity-v1 | xtb | promotion-capacity-v1 | 500 | 262 | 175 | 63 | 12.6% | 88 | 150 | 118 | 144 |

## Page-Level Badcase Rate
| page | nox@promotion-capacity-v1_total | nox@promotion-capacity-v1_badcase | nox@promotion-capacity-v1_badcase率 | xtb@promotion-capacity-v1_total | xtb@promotion-capacity-v1_badcase | xtb@promotion-capacity-v1_badcase率 | badcase率差 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 50 | 19 | 38.0% | 50 | 3 | 6.0% | 32.0% |
| 2 | 50 | 27 | 54.0% | 50 | 8 | 16.0% | 38.0% |
| 3 | 50 | 34 | 68.0% | 50 | 7 | 14.0% | 54.0% |
| 4 | 50 | 32 | 64.0% | 50 | 5 | 10.0% | 54.0% |
| 5 | 50 | 38 | 76.0% | 50 | 2 | 4.0% | 72.0% |
| 6 | 50 | 27 | 54.0% | 50 | 9 | 18.0% | 36.0% |
| 7 | 50 | 18 | 36.0% | 50 | 3 | 6.0% | 30.0% |
| 8 | 50 | 9 | 18.0% | 50 | 12 | 24.0% | -6.0% |
| 9 | 50 | 8 | 16.0% | 50 | 7 | 14.0% | 2.0% |
| 10 | 50 | 0 | 0.0% | 50 | 7 | 14.0% | -14.0% |

## Badcase Overlap
| metric | count |
| --- | --- |
| shared_badcase | 10 |
| nox@promotion-capacity-v1_only_badcase | 202 |
| xtb@promotion-capacity-v1_only_badcase | 52 |

## Badcase Cause Summary
| provider | category | count |
| --- | --- | --- |
| nox@promotion-capacity-v1 | 证据缺失或信号不足 | 115 |
| nox@promotion-capacity-v1 | 其他 | 47 |
| nox@promotion-capacity-v1 | 娱乐/儿童/泛内容偏离 | 24 |
| nox@promotion-capacity-v1 | 泛相关性偏离 | 20 |
| nox@promotion-capacity-v1 | 宠物/动物受众冲突 | 6 |
| xtb@promotion-capacity-v1 | 其他 | 36 |
| xtb@promotion-capacity-v1 | 娱乐/儿童/泛内容偏离 | 16 |
| xtb@promotion-capacity-v1 | 泛相关性偏离 | 5 |
| xtb@promotion-capacity-v1 | 证据缺失或信号不足 | 3 |
| xtb@promotion-capacity-v1 | 宠物/动物受众冲突 | 3 |

## Shared Badcases
| channel | nox@promotion-capacity-v1 | xtb@promotion-capacity-v1 |
| --- | --- | --- |
| Cat | 卡通娱乐号，和充电宝带货不匹配 | 动画娱乐号，虽带Power Bank词但主体不适合推广 |
| Daily Wow | 儿童卡通号，和充电宝带货不匹配 | 儿童动漫受众，充电宝带货不合适 |
| 👑 WALI KING 👑 | 泛娱乐号，和充电宝推广关系弱 | 娱乐直播为主，近10条几乎无充电宝相关 |
| Elodie | 无产品向证据，和充电宝无关 | 搞笑/礼物混杂，近期内容与充电宝不匹配 |
| aurasagrada | 影视故事号，属于明显格式错配 | 影视故事号，缺乏充电宝带货语境 |
| Poppy Jim | Gen❌ | 家庭喜剧向，和商品推广目的不匹配 | 喜剧娱乐号，充电宝标签不代表带货能力 |
| GREEN utilities shop | 泛娱乐标签，和充电宝推广无关 | 搞笑挑战为主，充电宝不在主赛道 |
| Shine | 纯娱乐剧情向，和充电宝推广不匹配 | 娱乐剧情号，虽有Power Bank词但主体不适合推广 |
| permis express français | 娱乐/玩具向，和充电宝这类消费电子弱相关 | 娱乐/教学混杂，充电宝仅零星出现，不适合推广 |
| Leakzz | 无标签与内容证据，无法支持推广判断 | 游戏娱乐频道，充电宝只是标签噪音 |

## nox@promotion-capacity-v1-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 10 | Yiyongtai | 0 | 儿童内容，和充电宝带货关联弱 |
| 12 | ToyTokLabs | 5 | ASMR娱乐为主，不适合推充电宝 |
| 17 | Universe | 5 | 塔罗娱乐号，和充电宝推广不匹配 |
| 27 | Delilah | 0 | 宗教内容，和充电宝推广场景无关 |
| 28 | MKDailyDealz | 0 | 挑战/泛娱乐内容，缺少消费电子投放证据 |
| 31 | Sophia68 | 0 | 绿幕通用内容，与充电宝推广无关 |
| 32 | neleus007 | 0 | 无标签无视频证据，无法判断相关性 |
| 33 | tonytechtok | -10 | 娱乐向标签占主导，属于明显格式错配 |
| 36 | American Hillbilly | 0 | 无产品向证据，和充电宝无关 |
| 40 | ⛩️®️Sorrentino⛩️ | 0 | 无标签无视频证据，无法判断相关性 |
| 48 | discovershops | -10 | 魔术表演号，非商品推广场景 |
| 49 | DarwinRTX | 0 | 无标签无视频证据，无法判断相关性 |
| 52 | BezosMax | 0 | 无标签无内容，证据不足，暂判不相关 |
| 55 | Opee | 0 | 无标签无内容，证据不足，暂判不相关 |
| 56 | Rained | 0 | 无标签无内容，证据不足，暂判不相关 |
| 59 | tkshopuscc | -15 | 剧情故事向，和充电宝带货场景明显不符 |
| 60 | rvctz918 | 0 | 无标签无内容，证据不足，暂判不相关 |
| 61 | expressdealsshop | 0 | 无相关标签与内容，缺少推广能力信号 |
| 63 | hogh4597sg7 | 5 | 搞笑恶搞内容为主，充电宝推广场景不稳 |
| 65 | Cute girl 💕💕 | 0 | 无标签无内容，证据不足，暂判不相关 |
| 68 | ruine46735 | 0 | 无标签无内容，证据不足，暂判不相关 |
| 70 | misskuyy8 | 0 | 无标签无内容，证据不足，暂判不相关 |
| 71 | cehgk114 | 0 | 无标签无内容，证据不足，暂判不相关 |
| 75 | mimo mo | 0 | 无标签无内容，证据不足，暂判不相关 |
| 78 | genxjames79 | 0 | 无可用标签和视频信号，相关性不足 |
| 79 | Simon | 0 | 无可用标签和视频信号，相关性不足 |
| 80 | bravens shop | 0 | 无可用标签和视频信号，相关性不足 |
| 81 | Mind Blowers | 0 | 无可用标签和视频信号，相关性不足 |
| 84 | Womp womp womp | 0 | 无可用标签和视频信号，相关性不足 |
| 85 | Benjamin Zuniga | 0 | 无可用标签和视频信号，相关性不足 |

## xtb@promotion-capacity-v1-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 83 | cjf1144uh | -25 | 故事类娱乐号，近期无电源产品推广能力，#powerbank仅标题噪声 |
| 104 | askerfood | -8 | 几乎无充电宝相关标签，近期内容也缺少可投放信号 |
| 108 | Daylenis Verdecia🌸 | -10 | 近期主打美妆、纹身和婴儿用品，与充电宝明显不符 |
| 109 | yabmadymkbw | -8 | 近期以猫和日常杂内容为主，充电宝信号很弱 |
| 121 | That Girl | -7 | 近期多为牙膏/健康/杂项，充电宝只是偶发带货 |
| 122 | Logan Dana | -6 | 内容以充电宝与翻译耳机混杂，稳定性不足 |
| 132 | m3l4r | -18 | 以舞蹈娱乐为主，power bank 仅偶尔点到 |
| 134 | Khushbu | -17 | 娱乐/情绪向频道，近期 power bank 只是零散提及 |
| 153 | Bella188 | -8 | 生活自拍为主，充电宝只有偶发提及 |
| 171 | 🥀Ghanam Rang🥀 | -20 | 音乐娱乐号为主，充电宝只是顺带 |
| 176 | 89ythjh | -6 | 内容杂乱，充电宝定向信号很弱 |
| 193 | yadi_martinez3 | -10 | 女鞋和生活内容为主，与充电宝不相关 |
| 196 | Editor's Choice | -8 | 电池工厂技术号，非消费级推广场景 |
| 208 | stfsvhufj | -17 | 游戏/小说娱乐为主，充电宝推广匹配度低 |
| 226 | Dharmendar161 | -3 | 仅1条充电宝相关，主要是生活技巧/杂项，近内容多不匹配 |
| 252 | ucboviivsja | -21 | 娱乐和赛马内容为主，充电宝词只是偶发蹭词 |
| 258 | polyhjsigev | -21 | Pov和搞笑为主，产品购买意图弱，不适合充电宝推广 |
| 259 | radiant_shojiro883 | -19 | 儿童/训练类频道，充电宝只是零星带货，相关性弱 |
| 267 | Momo13 | -16 | 美妆生活号为主，缺少数码购买语境，充电宝相关性弱 |
| 273 | My closet | -12 | 体育账号为主，夹杂充电宝广告，整体不适合投放 |
| 277 | 🐼 Ladis Queen 🌻👑🐝🌛🌞💕 | -8 | 生活信仰号为主，仅一条充电宝内容，相关性很弱 |
| 280 | mamiidimesfdxth | -4 | 有带货式内容，但标签缺失、近期大多是耳机等其他品类 |
| 289 | yyysfmnj | 5 | 仅见一条充电宝内容，证据太少 |
| 300 | trendydeals97 | -9 | 主推电源插座/防浪涌，和充电宝不算同类核心 |
| 309 | Gilberto | -16 | 娱乐梗图为主，近期仅少量power bank，偏不匹配 |
| 318 | Lucky5558 | -15 | storytime/娱乐向为主，power bank只是偶发提及 |
| 329 | Patsy_campos💖CM👑 | -6 | 美妆服饰频道，只有1条充电宝，近期大多不相关。 |
| 355 | meinv78 | 4 | 内容杂乱，充电宝只占少量，相关性弱 |
| 356 | vintage.elephant66 | -1 | 电源/充电内容很少，其他题材占主导 |
| 360 | user55846694884728 | -1 | 只有零星充电宝内容，且大量无关混发 |

## Notes
- Page-level rates use `page_size` from each run metadata.
- Cause categories are heuristic clusters from `why_short`; review representative rows before making product decisions.
