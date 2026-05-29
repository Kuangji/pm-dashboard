# Channel Search Provider Comparison

- keyword: vape
- platform: tiktok
- country: -
- left: nox@promotion-capacity-v1 (tmp/channel-search-review/20260528-nox-vs-xtb-10kw2-tiktok-global-front10-promotion-capacity-v1/vape/nox-tiktok)
- right: xtb@promotion-capacity-v1 (tmp/channel-search-review/20260528-nox-vs-xtb-10kw2-tiktok-global-front10-promotion-capacity-v1/vape/xtb-tiktok)
- left_rule_version: promotion-capacity-v1
- right_rule_version: promotion-capacity-v1
- left_prompt_hash: b87da85cf79a
- right_prompt_hash: b87da85cf79a

## Run Overview
| run | provider | rule_version | total | fit | adjacent | badcase | badcase率 | <0 | 0-9 | 10-19 | 20+ |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| nox@promotion-capacity-v1 | nox | promotion-capacity-v1 | 500 | 120 | 90 | 290 | 58.0% | 20 | 263 | 43 | 174 |
| xtb@promotion-capacity-v1 | xtb | promotion-capacity-v1 | 500 | 93 | 136 | 271 | 54.2% | 284 | 51 | 109 | 56 |

## Page-Level Badcase Rate
| page | nox@promotion-capacity-v1_total | nox@promotion-capacity-v1_badcase | nox@promotion-capacity-v1_badcase率 | xtb@promotion-capacity-v1_total | xtb@promotion-capacity-v1_badcase | xtb@promotion-capacity-v1_badcase率 | badcase率差 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 50 | 27 | 54.0% | 50 | 17 | 34.0% | 20.0% |
| 2 | 50 | 37 | 74.0% | 50 | 15 | 30.0% | 44.0% |
| 3 | 50 | 41 | 82.0% | 50 | 18 | 36.0% | 46.0% |
| 4 | 50 | 38 | 76.0% | 50 | 32 | 64.0% | 12.0% |
| 5 | 50 | 24 | 48.0% | 50 | 35 | 70.0% | -22.0% |
| 6 | 50 | 23 | 46.0% | 50 | 28 | 56.0% | -10.0% |
| 7 | 50 | 23 | 46.0% | 50 | 37 | 74.0% | -28.0% |
| 8 | 50 | 18 | 36.0% | 50 | 24 | 48.0% | -12.0% |
| 9 | 50 | 26 | 52.0% | 50 | 35 | 70.0% | -18.0% |
| 10 | 50 | 33 | 66.0% | 50 | 30 | 60.0% | 6.0% |

## Badcase Overlap
| metric | count |
| --- | --- |
| shared_badcase | 15 |
| nox@promotion-capacity-v1_only_badcase | 275 |
| xtb@promotion-capacity-v1_only_badcase | 251 |

## Badcase Cause Summary
| provider | category | count |
| --- | --- | --- |
| nox@promotion-capacity-v1 | 其他 | 103 |
| nox@promotion-capacity-v1 | 证据缺失或信号不足 | 88 |
| nox@promotion-capacity-v1 | 娱乐/儿童/泛内容偏离 | 56 |
| nox@promotion-capacity-v1 | 泛相关性偏离 | 41 |
| nox@promotion-capacity-v1 | 宠物/动物受众冲突 | 2 |
| xtb@promotion-capacity-v1 | 其他 | 155 |
| xtb@promotion-capacity-v1 | 娱乐/儿童/泛内容偏离 | 53 |
| xtb@promotion-capacity-v1 | 泛相关性偏离 | 36 |
| xtb@promotion-capacity-v1 | 证据缺失或信号不足 | 21 |
| xtb@promotion-capacity-v1 | 宠物/动物受众冲突 | 4 |
| xtb@promotion-capacity-v1 | 科技/电子垂类偏离 | 2 |

## Shared Badcases
| channel | nox@promotion-capacity-v1 | xtb@promotion-capacity-v1 |
| --- | --- | --- |
| iamryanprice | 无相关产品或消费信号 | 街访辩论为主，近期多为戒vape内容 |
| Ravi Knows All | 无相关产品或消费信号 | 泛生活内容，缺少vape产品语境 |
| KJWOCK | 纯音乐娱乐，与 vape 推广无关 | 音乐娱乐号，缺少vape导购场景 |
| simplisick | 信息过少，且无 vape 信号 | 戒烟/反烟内容为主，和推广 vape 目标相反 |
| Tay | 舞蹈/娱乐号，与 vape 无关 | 无 vape 相关信号，近期全是舞蹈/生活内容 |
| Arkansaed | 体育/测验号，与 vape 无关 | 篮球问答向，与 vape 推广基本无关 |
| Michellekate88 | 喜剧娱乐向，和 vape 推广几乎无关 | 娱乐/同好向，和 vape 带货场景冲突 |
| Jessica💖 | 仅有基础视频标签，缺少产品信号 | ASMR+食物为主，vape仅在附加标签里，近10条也不相关 |
| tankerteddytwin | 明确反 vape 取向，不适合推广 | 反 vape/戒 vape 立场明确，内容与推广 vape 直接冲突 |
| biigpimpin | 无标签信息，缺少相关性信号 | 戒vape自述和个人成长内容，不是产品推广场 |
| mimi ♡ | 泛流量标签，和 vape 无关 | 审美日常号，vape只是零星点缀，推广承接弱 |
| Nursejrants | 医疗健康视角偏戒烟，不适合推广 | 医疗健康抗 vape，内容与推广目的相反 |
| MYMYDE.1 | 肺健康倾向更强，不适合 vape 推广 | 戒烟/肺健康号，方向和 vape 推广相反 |
| David Geipel | 娱乐向标签占位，缺少 vape 推广语境 | 有 vape 标签，但核心是戒烟/戒 vape，方向相反 |
| Blip World | 无 vape 相关信号，零废弃/洗浴向不匹配 | 戒 vape/尼古丁替代取向，和 vape 产品推广目标相反 |

## nox@promotion-capacity-v1-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 10 | Trippydripp | 0 | 无 vape 相关信号 |
| 16 | lyfe4ever | 0 | 绿色屏/挑战类内容，和 vape 无关 |
| 17 | jade emperor | 0 | 美妆发型娱乐向，与 vape 无关 |
| 19 | Cazwell | 0 | 娱乐账号，无 vape 推广语境 |
| 21 | huntergrazianoo | 0 | 街访访谈类，无 vape 相关信号 |
| 23 | RUBY DELILAH | 0 | 美妆草稿号，与 vape 无关 |
| 25 | Outre | 0 | 宗教学习/健康话题，与 vape 推广不匹配 |
| 26 | HolyGxd ( HolyGod ) | 0 | 娱乐号，无 vape 相关信号 |
| 27 | owenhunley | 0 | 无标签，无相关依据 |
| 31 | Weeaboo | 0 | 内容无 vape 关联 |
| 33 | Vicki | 0 | 泛娱乐/身份号，无相关信号 |
| 34 | Ria | 0 | 绿幕娱乐号，无 vape 关联 |
| 37 | K I N G | 0 | 无标签，无判断依据 |
| 38 | docfrankhere | -15 | 戒烟语境，和 vape 推广对立 |
| 42 | SiIas | 0 | 绿幕/动机号，无 vape 关联 |
| 43 | Charlotte Briar D’Alessio | 0 | 播客/剪贴号，无相关信号 |
| 44 | joshdabarber | 0 | 仅有 twin 标签，无相关性 |
| 46 | phatty matty | 0 | 娱乐/生活号，无 vape 关联 |
| 47 | Thetokshoplug | 0 | 睡眠/运动号，与 vape 无关 |
| 49 | rachel | 0 | 娱乐绿幕号，无相关信号 |
| 50 | Jakes.media_ | 0 | 视图/绿幕号，无 vape 关联 |
| 54 | Nivenchy | 0 | 娱乐舞蹈向，无 vape 相关信号 |
| 55 | Bradleyevantintok | 0 | 仅有 trending 标签，缺少产品相关性 |
| 56 | A⭐️ | 0 | 偏日常/娱乐内容，和 vape 推广不匹配 |
| 57 | _whateverleelee2.0 | 0 | 无标签无内容信号，无法判断相关性 |
| 58 | cristian | 0 | 游戏向频道，缺少 vape 推广场景 |
| 59 | WWYD? - John Quiñones | 0 | 无可用标签，相关性不足 |
| 61 | Brittany Skaggs | 0 | 美妆/乡村风内容，缺少 vape 相关性 |
| 62 | ILLBILL— | 0 | meme/娱乐向，和 vape 推广不相关 |
| 63 | Joker | 0 | 无标签，无法建立相关性 |

## xtb@promotion-capacity-v1-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 2 | ripple+ | -2 | 命中 vape，但核心是戒烟/替代品与街访，反向受众 |
| 3 | Container USA | 5 | 仅有标签命中，主体是拍卖/集装箱混杂内容 |
| 4 | Danni💨 | 4 | 命中 vape，但以ASMR/特效技巧为主，推广适配差 |
| 5 | Fakten Statt Hype | 0 | 命中 vape，但近期全是健康劝退向内容 |
| 6 | Vinnie Brigance | -5 | 命中 vape，但主轴是戒烟催眠，和推广方向冲突 |
| 9 | EstefaDuqueA | UGC | -1 | 命中 vape，但以娱乐UGC和戒烟叙事为主 |
| 11 | Armand🐻 | 3 | 命中 vape，但近期多为泛娱乐随机内容 |
| 16 | pulatici | 2 | 命中 vape，但近期内容与频道主体明显不一致 |
| 25 | : \ | 5 | 命中 vape，但近期几乎无相关内容 |
| 26 | Vape-Stories | -5 | 故事/犯罪内容为主，虽有Vape标签但推广格式明显错位 |
| 39 | The Doll House Collection | -2 | 服饰卖货为主，vape标签不改变主赛道 |
| 41 | doctorzahiri | -5 | 牙科健康科普偏戒烟，不适合推vape |
| 42 | Mas Goang | 0 | 喜剧聊天号，产品推广承接力弱 |
| 45 | RatColi | 10 | 标签太少且内容几乎无产品语境，证据太弱 |
| 53 | Melissa Mendez | 1 | 娱乐变装主导，vape只是零星点缀 |
| 58 | marianaaa!! | 0 | 游戏生活号，vape标签不构成转化 |
| 60 | ❤❤❤🌟🌟🌟 | 0 | 主做母婴家居，vape指驱蚊器，不是人用 |
| 61 | VEGS | 3 | 体育生活混合，vape曝光少且无购买场景 |
| 62 | _Markisasunkist | 0 | 更像Vespa机车号，vape标签疑似噪声 |
| 66 | FAQIh | 0 | meme动漫为主，vape标签不构成转化 |
| 67 | ˚ ༘🍥 meyೀ🌸⋆｡˚˚ | 0 | 多是驱蚊和美妆内容，非人用vape场景 |
| 69 | AUM | 0 | 看起来是Vespa机车内容，和vape无关 |
| 73 | Vape | 0 | vape tricks娱乐号，不适合做产品推广 |
| 74 | ALİHOCA | 0 | 舞蹈健身美甲为主，和vape不匹配 |
| 75 | hqd.factory | 0 | 工厂型虽相关，但内容偏满足感展示 |
| 92 | Nancy | -9 | 无标签，近期仅少量 vape/购物帖，证据很弱 |
| 102 | adelyamalya | -10 | 无 vape 标签，近期也看不出相关商品内容 |
| 107 | _crljyrzgn on ig | -9 | 主做 manhwa，vape 仅零星露出，相关度低 |
| 113 | SMOKE FREE WITH EASE | -15 | 戒烟反 vape 号，近期内容也全是禁烟导向 |
| 118 | Tiktokiiishhhhh | -10 | 主做剧情娱乐，vape 证据弱且不在前排标签 |

## Notes
- Page-level rates use `page_size` from each run metadata.
- Cause categories are heuristic clusters from `why_short`; review representative rows before making product decisions.
