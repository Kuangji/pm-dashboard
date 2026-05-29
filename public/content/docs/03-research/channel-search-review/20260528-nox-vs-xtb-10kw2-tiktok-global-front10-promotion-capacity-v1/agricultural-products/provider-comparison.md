# Channel Search Provider Comparison

- keyword: agricultural products
- platform: tiktok
- country: -
- left: nox@promotion-capacity-v1 (tmp/channel-search-review/20260528-nox-vs-xtb-10kw2-tiktok-global-front10-promotion-capacity-v1/agricultural-products/nox-tiktok)
- right: xtb@promotion-capacity-v1 (tmp/channel-search-review/20260528-nox-vs-xtb-10kw2-tiktok-global-front10-promotion-capacity-v1/agricultural-products/xtb-tiktok)
- left_rule_version: promotion-capacity-v1
- right_rule_version: promotion-capacity-v1
- left_prompt_hash: b87da85cf79a
- right_prompt_hash: b87da85cf79a

## Run Overview
| run | provider | rule_version | total | fit | adjacent | badcase | badcase率 | <0 | 0-9 | 10-19 | 20+ |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| nox@promotion-capacity-v1 | nox | promotion-capacity-v1 | 500 | 79 | 107 | 314 | 62.8% | 18 | 394 | 19 | 69 |
| xtb@promotion-capacity-v1 | xtb | promotion-capacity-v1 | 500 | 239 | 186 | 75 | 15.0% | 81 | 150 | 133 | 136 |

## Page-Level Badcase Rate
| page | nox@promotion-capacity-v1_total | nox@promotion-capacity-v1_badcase | nox@promotion-capacity-v1_badcase率 | xtb@promotion-capacity-v1_total | xtb@promotion-capacity-v1_badcase | xtb@promotion-capacity-v1_badcase率 | badcase率差 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 50 | 21 | 42.0% | 50 | 7 | 14.0% | 28.0% |
| 2 | 50 | 25 | 50.0% | 50 | 2 | 4.0% | 46.0% |
| 3 | 50 | 22 | 44.0% | 50 | 5 | 10.0% | 34.0% |
| 4 | 50 | 26 | 52.0% | 50 | 5 | 10.0% | 42.0% |
| 5 | 50 | 26 | 52.0% | 50 | 7 | 14.0% | 38.0% |
| 6 | 50 | 43 | 86.0% | 50 | 8 | 16.0% | 70.0% |
| 7 | 50 | 35 | 70.0% | 50 | 12 | 24.0% | 46.0% |
| 8 | 50 | 40 | 80.0% | 50 | 13 | 26.0% | 54.0% |
| 9 | 50 | 42 | 84.0% | 50 | 8 | 16.0% | 68.0% |
| 10 | 50 | 34 | 68.0% | 50 | 8 | 16.0% | 52.0% |

## Badcase Overlap
| metric | count |
| --- | --- |
| shared_badcase | 6 |
| nox@promotion-capacity-v1_only_badcase | 308 |
| xtb@promotion-capacity-v1_only_badcase | 64 |

## Badcase Cause Summary
| provider | category | count |
| --- | --- | --- |
| nox@promotion-capacity-v1 | 其他 | 140 |
| nox@promotion-capacity-v1 | 证据缺失或信号不足 | 109 |
| nox@promotion-capacity-v1 | 泛相关性偏离 | 35 |
| nox@promotion-capacity-v1 | 娱乐/儿童/泛内容偏离 | 25 |
| nox@promotion-capacity-v1 | 宠物/动物受众冲突 | 3 |
| nox@promotion-capacity-v1 | 科技/电子垂类偏离 | 2 |
| xtb@promotion-capacity-v1 | 其他 | 32 |
| xtb@promotion-capacity-v1 | 娱乐/儿童/泛内容偏离 | 19 |
| xtb@promotion-capacity-v1 | 泛相关性偏离 | 19 |
| xtb@promotion-capacity-v1 | 证据缺失或信号不足 | 3 |
| xtb@promotion-capacity-v1 | 科技/电子垂类偏离 | 2 |

## Shared Badcases
| channel | nox@promotion-capacity-v1 | xtb@promotion-capacity-v1 |
| --- | --- | --- |
| LANDIO | 房地产和狩猎向，缺少农业产品信号 | 土地房产频道，与农产品推广无关 |
| Stop Italian Sounding 🇮🇹 🎯 | 意大利美食科普向，和农业产品不匹配 | 意大利食品科普为主，与农业产品不匹配 |
| Ramato Dana Halaba | 无标签无内容信号，无法判断相关性 | 内容几乎全是杂谈时政，与农业产品无关 |
| Aly Moore | 无有效农业信号 | 虫类食物与农业产品推广关联很弱 |
| James Grace | 标签为空，缺少农产品相关证据 | 无人机/房产号，与农业产品无关 |
| Tiiga | 无农业相关信息 | 健康饮品号，与农业产品场景不匹配 |

## nox@promotion-capacity-v1-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 1 | Agriculture | 0 | 标签全是美妆健身，和农业产品无关 |
| 2 | Power Service Products | 0 | 偏柴油车辆服务，不是农业产品受众 |
| 9 | Notes on Iowa | 0 | 历史体育教育内容，缺少农业和产品信号 |
| 18 | TCPEL Indonesia | Mesin Pelet | 0 | 无标签无内容信号，无法判断相关性 |
| 20 | Ag News Daily | 0 | 无标签无内容信号，无法判断相关性 |
| 21 | Work Process | 0 | 无标签无内容信号，无法判断相关性 |
| 24 | Paul Schriner | 0 | 保健品促销向，不是农业产品场景 |
| 25 | Counselor Yasser Al-Bahadli | 0 | 无标签无内容信号，无法判断相关性 |
| 31 | Crownstone Equipment | -10 | 重型工程设备为主，与农产品推广不匹配 |
| 32 | labor protection gloves | 0 | 仅有手套类名称，缺少农业相关证据 |
| 36 | Bailey Slater | 0 | 信息不足，无法判断为农业相关频道 |
| 37 | highpointlandcompany | 0 | 缺少农业或产品推广证据 |
| 39 | superant_maxj | -15 | 娱乐玩具向，和农产品推广明显不符 |
| 45 | The Rike Stories | 0 | 故事叙事向，和产品推广场景不一致 |
| 46 | Michelle | 0 | 缺少任何农业或购物推广信号 |
| 49 | Ertl | 10 | 农玩具为主，真实农产品推广不匹配 |
| 50 | filterleadingfactory | 0 | 缺少可用的农业相关信号 |
| 51 | CONGOBON | 0 | 政治/地域内容，和农产品推广无关 |
| 52 | SaraH🎐 | 0 | 标签为空，缺少农产品相关证据 |
| 54 | IFSQUARE IDUSTRIAL CO..ltd | 0 | 工业制造类，和农产品推广不匹配 |
| 55 | Organic Rising | 0 | 仅有 organic 名称线索，证据不足 |
| 57 | RuhterBoyz | 0 | 无相关标签或内容证据 |
| 58 | LiHan | 0 | 无相关标签或内容证据 |
| 60 | Sediq Sound Studio | 0 | 音频工作室类，和农产品无关 |
| 61 | ddmeter.factory | 0 | 工厂型账号，缺少农产品相关信号 |
| 64 | EduardoSanchez | 0 | 无相关标签或内容证据 |
| 65 | wontide_forest | 0 | 森林/自然向，和农产品关联弱 |
| 66 | LUR GcB | 0 | 无相关标签或内容证据 |
| 67 | 🎖️ Shadow Gamer🎖️ | 0 | 宠物娱乐向，和农产品推广不匹配 |
| 69 | Real Tuff | 0 | 无相关标签或内容证据 |

## xtb@promotion-capacity-v1-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 2 | 𝐑𝐜 𝐀𝐜𝐭𝐢𝐨𝐧 𝐏𝐨𝐰𝐞𝐫 | 20 | 虽命中标签，但主体是玩具遥控拖拉机，农产品推广不匹配 |
| 3 | Miss chantalla | -8 | 内容以生活杂项和美食为主，近10条多数无关 |
| 9 | Saka 24 hours 🌠 | -6 | 有农业与评测标签，但近10条杂内容过多 |
| 21 | birendra🇳🇵🇪🇺 | -4 | 个人生活内容占比高，农业信号零散 |
| 22 | Chakie Kgomotso | -2 | 仅有零散农业话题词，缺少稳定农产品内容 |
| 29 | Agro_Papo | -11 | 娱乐型内容为主，虽提到农业但推广商品场景不匹配 |
| 30 | zineb 🫀 | -2 | 几乎无农业产品相关信号，内容也不稳定 |
| 68 | Em Tình | -20 | 以服饰杂货为主，农业相关性很弱 |
| 82 | jemy pr | -31 | 娱乐号为主，少量农产品提及不足以适配推广 |
| 107 | Sajib Ahmed Joy  | -25 | ASMR/开箱型内容，和农产品推广格式不匹配 |
| 117 | Youma stock❤️ | -6 | 创业杂谈为主，农产品露出太少 |
| 132 | boho1999s | -25 | ASMR/美妆为主，与农产品推广格式明显不匹配 |
| 141 | Alberts🐯 | -19 | 动漫娱乐为主，农业只占少量，受众不匹配 |
| 150 | Ali Bash Khan | -9 | 几乎没有稳定农业内容，近期也大多无关 |
| 152 | احمد سعود السعدون | -4 | 近期以家族/社交内容为主，农场信号弱且不稳定 |
| 165 | Bhabuk Alone | -18 | 泛娱乐/流量内容为主，农业仅是弱标签，错配明显 |
| 177 | Giselle Batista | -24 | 纯搞笑频道，和农产品推广场景明显不符 |
| 188 | nobitas9 | -25 | 以搞笑短视频为主，几乎无农产品推广场景 |
| 192 | . | -8 | 标签缺失且内容零散，农业定位不稳定 |
| 202 | noress9 | -15 | 娱乐/游戏主导，农产品推广场景不匹配 |
| 203 | jessang26999 | -5 | 标签偏园艺，但最新10条是马术内容，推广不稳 |
| 226 | Mai Chimuti Buhera (Original) | 0 | 以旅游娱乐为主，农产品推广相关性低 |
| 233 | Alexs | -17 | 泛流量娱乐号，农业相关性弱 |
| 234 | marbaaaryyy | -9 | 恋爱/日常号，农业内容极少 |
| 239 | Asad Bhatti | -8 | 频道偏个人化，近期多为无关内容，仅少量“AGRO”字样，农业产品推广相关性低 |
| 249 | চট্টগ্রামের বাঘিনী কন্যা🐯💘🌾 | -9 | 标签仅有草地表情，近10条多为无关内容，缺少农业产品推广信号 |
| 252 | s.melnyk.s | -9 | 娱乐杂内容为主，农业只偶尔出现 |
| 256 | 💸علی💸 | -9 | 内容多为娱乐杂谈，农业占比很低 |
| 269 | nuno agro | -6 | 直播打赏和杂内容偏多，农产品推广承接弱 |
| 270 | _jirka_kouba_ | -5 | ASMR/农机声为主，属于强格式不匹配 |

## Notes
- Page-level rates use `page_size` from each run metadata.
- Cause categories are heuristic clusters from `why_short`; review representative rows before making product decisions.
