# Channel Search Provider Comparison

- keyword: vacuum cleaner
- platform: youtube
- country: US
- left: nox@promotion-capacity-v1 (tmp/channel-search-review/20260526-nox-vs-xtb-10kw-youtube-us-front10-promotion-capacity-v1/vacuum-cleaner/nox-youtube)
- right: xtb@promotion-capacity-v1 (tmp/channel-search-review/20260526-nox-vs-xtb-10kw-youtube-us-front10-promotion-capacity-v1/vacuum-cleaner/xtb-youtube)
- left_rule_version: promotion-capacity-v1
- right_rule_version: promotion-capacity-v1
- left_prompt_hash: b87da85cf79a
- right_prompt_hash: b87da85cf79a

## Run Overview
| run | provider | rule_version | total | fit | adjacent | badcase | badcase率 | <0 | 0-9 | 10-19 | 20+ |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| nox@promotion-capacity-v1 | nox | promotion-capacity-v1 | 500 | 157 | 184 | 159 | 31.8% | 41 | 258 | 32 | 169 |
| xtb@promotion-capacity-v1 | xtb | promotion-capacity-v1 | 500 | 264 | 152 | 84 | 16.8% | 116 | 97 | 116 | 171 |

## Page-Level Badcase Rate
| page | nox@promotion-capacity-v1_total | nox@promotion-capacity-v1_badcase | nox@promotion-capacity-v1_badcase率 | xtb@promotion-capacity-v1_total | xtb@promotion-capacity-v1_badcase | xtb@promotion-capacity-v1_badcase率 | badcase率差 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 50 | 23 | 46.0% | 50 | 11 | 22.0% | 24.0% |
| 2 | 50 | 16 | 32.0% | 50 | 6 | 12.0% | 20.0% |
| 3 | 50 | 17 | 34.0% | 50 | 11 | 22.0% | 12.0% |
| 4 | 50 | 9 | 18.0% | 50 | 6 | 12.0% | 6.0% |
| 5 | 50 | 14 | 28.0% | 50 | 15 | 30.0% | -2.0% |
| 6 | 50 | 11 | 22.0% | 50 | 8 | 16.0% | 6.0% |
| 7 | 50 | 17 | 34.0% | 50 | 6 | 12.0% | 22.0% |
| 8 | 50 | 20 | 40.0% | 50 | 10 | 20.0% | 20.0% |
| 9 | 50 | 14 | 28.0% | 50 | 5 | 10.0% | 18.0% |
| 10 | 50 | 18 | 36.0% | 50 | 6 | 12.0% | 24.0% |

## Badcase Overlap
| metric | count |
| --- | --- |
| shared_badcase | 44 |
| nox@promotion-capacity-v1_only_badcase | 115 |
| xtb@promotion-capacity-v1_only_badcase | 40 |

## Badcase Cause Summary
| provider | category | count |
| --- | --- | --- |
| nox@promotion-capacity-v1 | 证据缺失或信号不足 | 61 |
| nox@promotion-capacity-v1 | 其他 | 49 |
| nox@promotion-capacity-v1 | 泛相关性偏离 | 24 |
| nox@promotion-capacity-v1 | 娱乐/儿童/泛内容偏离 | 21 |
| nox@promotion-capacity-v1 | 宠物/动物受众冲突 | 3 |
| nox@promotion-capacity-v1 | 科技/电子垂类偏离 | 1 |
| xtb@promotion-capacity-v1 | 其他 | 35 |
| xtb@promotion-capacity-v1 | 娱乐/儿童/泛内容偏离 | 23 |
| xtb@promotion-capacity-v1 | 泛相关性偏离 | 19 |
| xtb@promotion-capacity-v1 | 证据缺失或信号不足 | 5 |
| xtb@promotion-capacity-v1 | 宠物/动物受众冲突 | 2 |

## Shared Badcases
| channel | nox@promotion-capacity-v1 | xtb@promotion-capacity-v1 |
| --- | --- | --- |
| HPad | 吸尘器相关但以破坏为主，推广格式不匹配 | 以破坏娱乐为主，虽有吸尘器词但不适合推广 |
| Levsob | 泛娱乐生活号，缺少吸尘器相关性 | 娱乐剧情向为主，吸尘器词不构成推广适配 |
| Calming Ambience Sounds | 吸尘器ASMR/白噪音，明显是声音场景而非推广 | 白噪音/ASMR为主，产品词只是声景素材 |
| YourPeacefulSound | 白噪音助眠ASMR与吸尘器推广强不匹配 | 白噪音助眠格式，与吸尘器推广严重错位 |
| Cozy Sleep Sounds | 助眠ASMR频道与吸尘器推广格式强冲突 | 白噪音助眠频道，吸尘器只是在出声，不适合卖货 |
| nikkib ASMR | ASMR/声音向，虽命中 vacuum cleaner 仍不适合带货 | 吸尘器ASMR声向频道，核心是助眠解压，不是产品推广 |
| AI Palette-Cute Creatures | 治愈/萌宠内容为主，虽命中但明显不适合带货 | 治愈动画/ASMR频道，和吸尘器推广场景不符 |
| Just Vacuuming | 吸尘器标签直中，但满足感/ASMR 不适合推广 | 以ASMR吸尘为主，偏娱乐，不适合吸尘器推广 |
| Brushroll Lover ASMR | ASMR/声音向内容，非吸尘器推广场景 | 吸尘器爽感ASMR频道，核心是声音，不是产品推广 |
| Sleeping Easy | ASMR/睡眠白噪音频道，虽有真空词但推广格式严重不适配 | ASMR白噪音频道，虽有吸尘器词但明显不适合产品推广 |
| R.E.S.T. | 白噪音/助眠频道，产品推广格式严重冲突 | 白噪音助眠频道，吸尘器只是声音素材，不适合卖货 |
| Hoover | 清洁ASMR频道，真空词有但格式不适合产品推广 | ASMR清洁频道，格式不适合做产品推广 |
| Vacuum Sensation | ASMR/白噪音格式，明显不适合家电推广 | 吸尘ASMR/满足感内容为主，属明显格式不匹配 |
| BWX | 摩托车频道，清洁家电推广场景不符 | 标签有直达词，但频道主体是机车/电动自行车内容，近10条全不相关，推广价值低 |
| Ambience | 白噪音/放松音频为主，属强格式冲突 | ASMR白噪音频道，主打吸尘声而非卖点内容 |
| Techasonic | 影视娱乐频道，与清洁家电推广不符 | 娱乐影视标签占前五，和吸尘器推广明显不符 |
| DKCustomProducts | 摩托车改装频道，和吸尘器受众不匹配 | 虽有词条命中，但主内容是哈雷改装，和吸尘器受众不符。 |
| Cleaning service ASMR | ASMR清洁风格，虽有关键词但缺少测评/购买导向 | ASMR清洁内容，虽有词根但非促销测评场景，格式不符 |
| Mini toys | ASMR/玩具/放松向，和吸尘器推广场景不匹配 | ASMR玩具拆箱为主，词命中但真实投放场景不符 |
| Music 365 | 音乐助眠频道，和吸尘器推广格式强冲突 | 音乐/助眠频道，吸尘器仅是噪声标签，推广格式严重不匹配。 |
| Laughing Animals | 宠物娱乐号，关键词命中但与清洁器推广场景强冲突 | 动物娱乐频道，近期全是助眠/音乐内容，不适合推广吸尘器。 |
| LoudPlace | 汽车/生活杂内容，缺少清洁器相关能力信号 | 车辆/娱乐内容为主，吸尘器标签不足以支撑投放 |
| Relaxing White Noise for Babies | 白噪音婴儿频道，吸尘器词仅为声效，不适合带货 | 白噪音睡眠频道，虽含吸尘器词但与清洁器推广强冲突 |
| PRASA SIDE HUSTLE | 财经导向频道，与吸尘器推广无关 | 金融业务向频道，和吸尘器推广无关，近期内容也不匹配 |
| Zaynn's Adventure | 儿童内容为主，缺少产品测评/购买导向 | 儿童娱乐频道，受众错位，不适合推广家用吸尘器 |
| LogeliusD | 破坏类内容为主，明显不适合产品推广 | 破坏类娱乐频道，和吸尘器推广场景明显冲突 |
| Sumit dhiman | 娱乐喜剧为主，和吸尘器推广的购物语境明显不符 | 娱乐短视频为主，格式与家电产品推广明显错配 |
| Hahatoons - Nursery  Rhymes & Kids song's | 儿童儿歌娱乐频道，与吸尘器推广明显不匹配 | 儿童儿歌频道，与吸尘器推广完全不匹配 |
| Warm Glow Ambience | ASMR/停格娱乐强错配，虽有词条但不适合推广 | ASMR/定格动画娱乐号，属于强格式不匹配。 |
| Daija Husha | 无有效标签，无法判断为相关创作者 | ASMR格式强不匹配，虽有吸尘器标签但近期内容偏泛 |

## nox@promotion-capacity-v1-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 8 | Power Masheni | 0 | 无标签无内容证据，无法建立相关性 |
| 11 | Marshall studios  production98 | 0 | 无标签无视频，缺少吸尘器相关证据 |
| 12 | Matthew Gonzalez | 0 | 体育娱乐向，和吸尘器推广场景无关 |
| 15 | The Kirby Company | 0 | 仅生活方式标签，缺少吸尘器相关证据 |
| 16 | My Top 5 Choices | 0 | 无标签无视频，缺少可判断的相关性 |
| 18 | Dreame Tech | 5 | ASMR睡眠频道与吸尘器推广格式强冲突 |
| 22 | Blackheartvacs | 0 | 无标签无视频证据，相关性不足 |
| 25 | Must-Have Finds | 0 | 无标签与视频证据，无法判断为相关频道 |
| 28 | Today's Deals | 0 | 无产品品类与评测证据，相关性不足 |
| 31 | The Wonder Hub | 0 | 标签和视频都无相关证据，难以支撑 vacuum cleaner 推广 |
| 37 | Learn and Choose | 0 | 没有标签、标题或内容证据，相关性不足 |
| 43 | Technically Jeff | 0 | 汽车频道，与吸尘器推广无关 |
| 45 | DBProductReviews | 0 | 食品测评频道，与吸尘器无关 |
| 49 | MQ’s World | 0 | 食品内容为主，且有开箱也不构成相关 |
| 59 | Scary Talking Head | -15 | 游戏惊悚内容，与吸尘器推广场景明显不符 |
| 71 | TechGround in English | 0 | 无相关标签和视频证据 |
| 74 | Max Free | 2 | 以车辆内容为主，缺少吸尘器相关语境 |
| 82 | Neowin | 1 | 偏手机/游戏科技站，缺少清洁家电推广场景 |
| 86 | Izzy Spears | 0 | 无标签无内容信号，无法判断相关性 |
| 108 | Marcy Masha | 0 | 无标签无视频证据，相关性不足 |
| 112 | B Product Peek | 0 | 缺少标签与内容证据，无法判断为相关推广频道 |
| 121 | Love2Review | 0 | 无标签无视频证据，难判断为吸尘器推广频道 |
| 123 | Five Star | 0 | 无标签无内容，缺乏吸尘器推广相关性 |
| 125 | House Items | 0 | 无标签无视频，无法支持吸尘器推广判断 |
| 129 | kaiz231 | 0 | 无可用标签和内容证据，相关性不足 |
| 136 | Febrian Trii | 0 | 无相关内容证据 |
| 139 | Kate Brush | -15 | 娱乐短内容为主，和吸尘器推广不匹配 |
| 142 | Let's clean up | 8 | ASMR清洁氛围为主，产品推广格式不匹配 |
| 147 | ANDI | 0 | 标签为空，缺乏相关性证据 |
| 148 | RLJAJN | 0 | 标签为空，缺乏相关性证据 |

## xtb@promotion-capacity-v1-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 41 | Serba Serbi | -7 | 标签与吸尘器无关，近期多为理发/汽车内容 |
| 42 | SMILEatTheDEALS | -7 | 古董收藏为主，吸尘器只是偶发陈列 |
| 45 | Shanice At Home | -10 | 副业/出版为主，缺少家电评测语境 |
| 50 | Aura Roboclean | -8 | 娱乐短视频为主，仅有弱清洁语境 |
| 51 | CleanFlow ASMR | -25 | ASMR/白噪音频道，偏解压不偏推广，卖吸尘器不合适 |
| 63 | Genevieve Moore88 | -25 | 喜剧家庭内容，吸尘器只是笑点，不具备产品推广场景 |
| 75 | Dylan Saborio | -1 | 仅有智能办公内容，与吸尘器推广无关 |
| 100 | The Rock Bands | -8 | 爽感短视频偏娱乐，虽有车载吸尘器但促销适配差 |
| 102 | synthpro | 0 | 音乐修复频道，与吸尘器推广无关 |
| 104 | KidCaydenP | 0 | 儿童娱乐式玩具内容，不是购买导向 |
| 106 | Vacuum State | -15 | 娱乐整活式吸尘器内容，非推广场景 |
| 111 | Renewable ASTK | -10 | 无吸尘器相关标签或内容，近期全是其他小电器 |
| 128 | Dremel | -10 | DIY工具频道，与吸尘器推广关联弱，近期也无相关内容 |
| 135 | FITIGER | -10 | 游戏和安全设备频道，和吸尘器推广无关 |
| 138 | Jeremy Waller | -10 | 旅行美食生活号，和吸尘器推广无关 |
| 142 | BGGT Maker | -25 | 娱乐/meme 频道，且最新内容是抽真空实验，与推广不符 |
| 144 | Vacuum Vibe | -15 | ASMR 无声清洁频道，缺少评测或购买导向 |
| 146 | Ira Motherhood | -10 | 母婴日常频道，缺少吸尘器相关与推广能力 |
| 147 | Clean with Prime | -15 | 清洁 ASMR 为主，适合观看不等于适合卖吸尘器 |
| 174 | ClearLooks | 3 | 有吸尘器标签，但娱乐短视频风格偏离推广 |
| 200 | ArbokLover1618 | 0 | 吸尘器白噪音/直播味重，格式不适合做产品推广 |
| 213 | Michigan Heating Guy | 10 | HVAC维修频道，吸尘器只是顺带标签 |
| 220 | YUOK NEN -ន៉េន | 10 | 杂项知识频道，近10条与吸尘器推广无关 |
| 226 | Reeman Robot | -5 | 工业机器人频道，和家用吸尘器受众不一致 |
| 244 | Aiper Official | -5 | 池塘清洁品牌号，内容偏 pool cleaner，不适合人用吸尘器 |
| 258 | Inside The WILD | -20 | 野生动物娱乐内容，和吸尘器推广场景明显不符。 |
| 282 | Mycreamlover | 10 | 标签命中但近10条全是手机壳DIY，当前内容与吸尘器推广不符 |
| 296 | TechGuide | -5 | 内容主轴是动画对战，属于强格式错配，不适合推吸尘器 |
| 317 | Little Doctor | -5 | 只有零散标题提到吸尘器，整体是五金安装内容 |
| 335 | Niopets | -10 | 纯宠物频道，缺少吸尘器相关与购买导向 |

## Notes
- Page-level rates use `page_size` from each run metadata.
- Cause categories are heuristic clusters from `why_short`; review representative rows before making product decisions.
