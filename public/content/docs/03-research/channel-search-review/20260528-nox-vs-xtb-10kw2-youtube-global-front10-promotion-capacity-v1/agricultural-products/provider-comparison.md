# Channel Search Provider Comparison

- keyword: agricultural products
- platform: youtube
- country: -
- left: nox@promotion-capacity-v1 (tmp/channel-search-review/20260528-nox-vs-xtb-10kw2-youtube-global-front10-promotion-capacity-v1/agricultural-products/nox-youtube)
- right: xtb@promotion-capacity-v1 (tmp/channel-search-review/20260528-nox-vs-xtb-10kw2-youtube-global-front10-promotion-capacity-v1/agricultural-products/xtb-youtube)
- left_rule_version: promotion-capacity-v1
- right_rule_version: promotion-capacity-v1
- left_prompt_hash: b87da85cf79a
- right_prompt_hash: b87da85cf79a

## Run Overview
| run | provider | rule_version | total | fit | adjacent | badcase | badcase率 | <0 | 0-9 | 10-19 | 20+ |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| nox@promotion-capacity-v1 | nox | promotion-capacity-v1 | 500 | 105 | 115 | 280 | 56.0% | 29 | 333 | 87 | 51 |
| xtb@promotion-capacity-v1 | xtb | promotion-capacity-v1 | 500 | 223 | 174 | 103 | 20.6% | 115 | 114 | 196 | 75 |

## Page-Level Badcase Rate
| page | nox@promotion-capacity-v1_total | nox@promotion-capacity-v1_badcase | nox@promotion-capacity-v1_badcase率 | xtb@promotion-capacity-v1_total | xtb@promotion-capacity-v1_badcase | xtb@promotion-capacity-v1_badcase率 | badcase率差 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 50 | 17 | 34.0% | 50 | 6 | 12.0% | 22.0% |
| 2 | 50 | 19 | 38.0% | 50 | 2 | 4.0% | 34.0% |
| 3 | 50 | 30 | 60.0% | 50 | 5 | 10.0% | 50.0% |
| 4 | 50 | 29 | 58.0% | 50 | 5 | 10.0% | 48.0% |
| 5 | 50 | 31 | 62.0% | 50 | 9 | 18.0% | 44.0% |
| 6 | 50 | 23 | 46.0% | 50 | 9 | 18.0% | 28.0% |
| 7 | 50 | 29 | 58.0% | 50 | 15 | 30.0% | 28.0% |
| 8 | 50 | 31 | 62.0% | 50 | 15 | 30.0% | 32.0% |
| 9 | 50 | 35 | 70.0% | 50 | 22 | 44.0% | 26.0% |
| 10 | 50 | 36 | 72.0% | 50 | 15 | 30.0% | 42.0% |

## Badcase Overlap
| metric | count |
| --- | --- |
| shared_badcase | 13 |
| nox@promotion-capacity-v1_only_badcase | 267 |
| xtb@promotion-capacity-v1_only_badcase | 90 |

## Badcase Cause Summary
| provider | category | count |
| --- | --- | --- |
| nox@promotion-capacity-v1 | 其他 | 102 |
| nox@promotion-capacity-v1 | 证据缺失或信号不足 | 93 |
| nox@promotion-capacity-v1 | 泛相关性偏离 | 46 |
| nox@promotion-capacity-v1 | 娱乐/儿童/泛内容偏离 | 27 |
| nox@promotion-capacity-v1 | 科技/电子垂类偏离 | 7 |
| nox@promotion-capacity-v1 | 宠物/动物受众冲突 | 5 |
| xtb@promotion-capacity-v1 | 其他 | 47 |
| xtb@promotion-capacity-v1 | 泛相关性偏离 | 28 |
| xtb@promotion-capacity-v1 | 娱乐/儿童/泛内容偏离 | 20 |
| xtb@promotion-capacity-v1 | 证据缺失或信号不足 | 6 |
| xtb@promotion-capacity-v1 | 宠物/动物受众冲突 | 2 |

## Shared Badcases
| channel | nox@promotion-capacity-v1 | xtb@promotion-capacity-v1 |
| --- | --- | --- |
| 考古女孩 | 徒步露营建造类，和农产品推广无关 | 标签有农产品，但近期全是考古寻宝，受众和场景不匹配 |
| Feifei Loves Eat Drink | 娱乐/电影偏多，不适合农产品推广 | 娱乐美食号，农产品标签是噪声 |
| Poor girl | 乡村生活标签过泛，农业产品信号不足 | 生活叙事频道，农业产品相关性弱 |
| small family | 木屋建造和木工内容，和农业产品不匹配 | 家装建房频道，与农产品推广无关 |
| ThyNa Lifestyle | 零食/儿童生活内容，与农业产品不相干 | 休闲娱乐向，和农产品推广不适配 |
| 美食DODO | 美食与手作内容，农业产品关联弱 | 美食为主，农业相关仅泛化标签 |
| Ethiopian Education | 仅有知识标签，和农业产品无关 | 教育学科号，农业产品无关 |
| Oliver Sanfilippo | 无标签无视频证据，无法判断为农业产品相关 | ASMR和故事型内容，不适合农产品推广 |
| christian haze | 无标签无视频证据，无法判断为农业产品相关 | 娱乐荒诞内容为主，属于明显格式不匹配 |
| T Studio | ASMR解压内容，和农业产品推广场景不符 | ASMR和剧情型为主，推广格式不匹配 |
| Trinh Ho Tv | 烹饪日常为主，农业产品相关度弱 | 叙事短剧/生活剧情为主，和农业产品推广形式不匹配 |
| Lý thị hạnh | 家庭日常标签，缺少农业主题 | 生活类家庭频道，与农业产品推广无关，近10条也无相关内容 |
| TÁO TV | 娱乐影视属性强，与农产品推广明显不匹配 | 娱乐剧情频道，农业标题不代表可推广农产品 |

## nox@promotion-capacity-v1-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 3 | Krishi Bioscope | 0 | 只有社会/生活/食物，缺少农业或产品推广语境 |
| 5 | xrw5 | 0 | 无标签信息，无法判断为相关频道 |
| 6 | Marcus Stories | -5 | 政治/电影类内容，和农产品推广明显不符 |
| 17 | Prepare Bricks | 0 | 贴砖教学频道，与农产品无关 |
| 19 | Thắng Hoa Mountain life | 0 | 单身生活向，缺少农业产品相关信号 |
| 25 | Ly Dinh Quang - The Wandering Boy | 0 | 生活叙事为主，缺少农产品推广信号 |
| 29 | Hoàng Thị Bình - live with nature | 0 | 以建房/生活为主，农业产品信号不足 |
| 30 | Linh's Life | 0 | 生活/求生/建造为主，与农业产品关联弱 |
| 43 | Easy Grafting | 0 | 仅 hobby/lifestyle，农业产品信号缺失 |
| 44 | Marie Fonda06 | 0 | 美妆烹饪为主，不适合农业产品推广 |
| 50 | TTH - Machine | 0 | 机器/车辆主题偏泛，不是农产品受众 |
| 52 | Muscente Montalvan | 0 | 无标签无视频证据，无法判断为农业产品相关 |
| 53 | Mọc Mọc | 0 | 无标签无视频证据，无法判断为农业产品相关 |
| 55 | Single | 0 | 无标签无视频证据，无法判断为农业产品相关 |
| 64 | Dr.Banana | -15 | 娱乐/动画/搞笑为主，与农业产品推广不匹配 |
| 70 | NaLac Technique | 0 | 科技/制造向，和农业产品无关 |
| 71 | Bon Garden | 0 | 无标签无视频证据，无法判断为农业产品相关 |
| 73 | DIY Mini Life | -15 | 娱乐故事与音乐向，基本不适合推广 |
| 86 | Orphans Boys Daily Life | 0 | 孤儿生存叙事，和农业产品推广无关 |
| 90 | Discovering Skills | 0 | 技术/机加工为主，非农业推广场景 |
| 92 | Botany PhD Diaries | -15 | 娱乐短视频为主，非产品推广频道 |
| 94 | Synowiec Babyak | 0 | 缺少可用标签，无法判断为相关 |
| 95 | MyFarmLife | 0 | 农场名但无标签证据，相关性不足 |
| 98 | Mountain people | 0 | 孤儿/流浪叙事为主，不适合农业推广 |
| 101 | Ponlok BMC | 0 | 娱乐/健身/游戏向，和农产品推广无关 |
| 103 | Survival And Life | 0 | 缺少任何农业相关信号 |
| 106 | seo couple build a life | 0 | 夫妻生活/生活方式向，缺少农业场景 |
| 109 | Single life MC | 0 | 剧情娱乐向，缺少农产品场景 |
| 112 | LinJun4124 | 0 | 缺少农业相关信号 |
| 113 | CoreLoop | 0 | 缺少农业相关信号 |

## xtb@promotion-capacity-v1-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 7 | Build Homes Vietnam | -5 | 标签虽有农产品，但近10条全是建房内容，推广偏离明显 |
| 22 | Ideal Crops | -15 | ASMR拆袋内容与农产品推广格式冲突，且题材偏美妆时尚 |
| 28 | DemonXshortS | -25 | 游戏整蛊频道，和农产品推广不匹配 |
| 37 | One Minute Done | -22 | 旅行/ASMR/技巧向，和农产品推广不搭 |
| 40 | Jumia Côte d'Ivoire | -10 | 电商促销为主，农产品相关性弱 |
| 79 | MP Fresh | -2 | 有农田内容但核心是ASMR/睡眠音频，产品推广格式不匹配 |
| 112 | Yam Zones | -18 | 以考试题和学习为主，不适合农产品推广 |
| 115 | விவசாயின் மகள் தங்கம் | -11 | 娱乐情绪内容占主导，农业只是陪衬 |
| 118 | VTS Village family... | -15 | 家庭娱乐与口播为主，农业信号很弱 |
| 124 | Ak Munda Pind da | -16 | 娱乐视频为主，农业只是标签噪声 |
| 138 | Blato CBD | 0 | 主体是CBD/健康议题，农业内容只做外围延伸 |
| 157 | Me Priyanka Lifestyle 45 | -25 | 娱乐喜剧为主，农业字样不改变频道属性 |
| 174 | Ideal Crafts | -10 | ASMR农场流程为主，强推广格式不匹配 |
| 187 | Suji Mugi fun | -12 | 娱乐/电影/音乐为主，农业只是陪衬 |
| 192 | Rana Bhai 50🦇 | -24 | 以狩猎/野生动物为主，与农产品推广明显错位 |
| 209 | Harvest Relax | -5 | ASMR放松型内容，和农产品推广形式不匹配 |
| 217 | டைம் பாஸ் | -12 | 无明确农业标签，内容偏杂且娱乐化，相关性弱 |
| 223 | Tiny Yum Cakes | -22 | 几乎全是蛋糕内容，和农业产品推广不匹配 |
| 227 | SHAKIB BHATI OFFICIAL | -3 | 宗教短状态为主，农业内容零散且不稳定 |
| 236 | AGRECOL | -2 | 园艺肥料相关，但ASMR形式不适合推广 |
| 238 | Shanthi Gramathu Virunthu | -2 | 虽有农作内容，但ASMR/食物音频属性太强 |
| 240 | Rohacahyachannel | -11 | 农林标签有，但近期以猫宠和娱乐内容为主 |
| 249 | muththamizh  arangam | -9 | 音乐娱乐为主，农业信息只是符号化点缀 |
| 250 | Rana Hunts Vlog | -13 | 野生动物/狩猎为主，和农产品推广不匹配 |
| 262 | Telugu Ganesha Facts | -10 | 娱乐事实类频道，几乎无农业商品相关性 |
| 278 | English Learn English | -10 | 英语学习频道，近期内容与农产品推广无关 |
| 289 | Saurabh 2M | -10 | 近期几乎全是宗教短视频，与农产品推广不符 |
| 290 | Girish Chand AWPL | -10 | 直销健康品频道，和农产品类目不匹配 |
| 291 | Zhongshan Technology Lighting Starry Sky Ceiling | -23 | 家装灯光频道，农产品词只是噪音，不适合推广 |
| 295 | Single mom life | -10 | 母婴生活频道，农产品推广相关性弱 |

## Notes
- Page-level rates use `page_size` from each run metadata.
- Cause categories are heuristic clusters from `why_short`; review representative rows before making product decisions.
