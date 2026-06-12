# Channel Search Provider Comparison

- keyword: beauty
- platform: tiktok
- country: US
- left: nox@content-tone-llm-v1 (tmp/channel-search-review/20260611-nox-vs-xtb-4kw-allplatform-us-front10-content-tone-v1/tiktok/beauty/nox-tiktok)
- right: xtb@content-tone-llm-v1 (tmp/channel-search-review/20260611-nox-vs-xtb-4kw-allplatform-us-front10-content-tone-v1/tiktok/beauty/xtb-tiktok)
- left_rule_version: content-tone-llm-v1
- right_rule_version: content-tone-llm-v1
- left_prompt_hash: 1228e2ff575f
- right_prompt_hash: 1228e2ff575f

## Run Overview
| run | provider | rule_version | total | fit | adjacent | badcase | badcase率 | <0 | 0-9 | 10-19 | 20+ |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| nox@content-tone-llm-v1 | nox | content-tone-llm-v1 | 500 | 99 | 179 | 222 | 44.4% | 0 | 500 | 0 | 0 |
| xtb@content-tone-llm-v1 | xtb | content-tone-llm-v1 | 500 | 90 | 189 | 221 | 44.2% | 0 | 500 | 0 | 0 |

## Page-Level Badcase Rate
| page | nox@content-tone-llm-v1_total | nox@content-tone-llm-v1_badcase | nox@content-tone-llm-v1_badcase率 | xtb@content-tone-llm-v1_total | xtb@content-tone-llm-v1_badcase | xtb@content-tone-llm-v1_badcase率 | badcase率差 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 50 | 19 | 38.0% | 50 | 6 | 12.0% | 26.0% |
| 2 | 50 | 6 | 12.0% | 50 | 22 | 44.0% | -32.0% |
| 3 | 50 | 21 | 42.0% | 50 | 23 | 46.0% | -4.0% |
| 4 | 50 | 21 | 42.0% | 50 | 11 | 22.0% | 20.0% |
| 5 | 50 | 22 | 44.0% | 50 | 26 | 52.0% | -8.0% |
| 6 | 50 | 17 | 34.0% | 50 | 26 | 52.0% | -18.0% |
| 7 | 50 | 36 | 72.0% | 50 | 32 | 64.0% | 8.0% |
| 8 | 50 | 27 | 54.0% | 50 | 25 | 50.0% | 4.0% |
| 9 | 50 | 32 | 64.0% | 50 | 28 | 56.0% | 8.0% |
| 10 | 50 | 21 | 42.0% | 50 | 22 | 44.0% | -2.0% |

## Badcase Overlap
| metric | count |
| --- | --- |
| shared_badcase | 179 |
| nox@content-tone-llm-v1_only_badcase | 43 |
| xtb@content-tone-llm-v1_only_badcase | 42 |

## Badcase Cause Summary
| provider | category | count |
| --- | --- | --- |
| nox@content-tone-llm-v1 | 其他 | 138 |
| nox@content-tone-llm-v1 | 泛相关性偏离 | 31 |
| nox@content-tone-llm-v1 | 证据缺失或信号不足 | 21 |
| nox@content-tone-llm-v1 | 宠物/动物受众冲突 | 15 |
| nox@content-tone-llm-v1 | 娱乐/儿童/泛内容偏离 | 14 |
| nox@content-tone-llm-v1 | 科技/电子垂类偏离 | 3 |
| xtb@content-tone-llm-v1 | 其他 | 125 |
| xtb@content-tone-llm-v1 | 证据缺失或信号不足 | 32 |
| xtb@content-tone-llm-v1 | 泛相关性偏离 | 31 |
| xtb@content-tone-llm-v1 | 娱乐/儿童/泛内容偏离 | 17 |
| xtb@content-tone-llm-v1 | 宠物/动物受众冲突 | 13 |
| xtb@content-tone-llm-v1 | 科技/电子垂类偏离 | 3 |

## Shared Badcases
| channel | nox@content-tone-llm-v1 | xtb@content-tone-llm-v1 |
| --- | --- | --- |
| IShowSpeed | 直播、体育和带货为主，和美妆不匹配 | 内容以直播整活和体育娱乐为主，不适合美妆 |
| Lamine Yamal | 足球内容为主，和美妆商品受众不对口 | 核心是足球娱乐账号，和美妆受众不匹配 |
| Enejota | 足球和商业代言为主，不适合美妆承载 | 以足球、家庭和食品推广为主，不适合美妆 |
| mega | 主要是风景旅行内容，没有美妆承载 | 风景旅行频道，与美妆品类几乎无关 |
| FIFA World Cup | 纯体育赛事频道，与美妆推广受众完全不符 | 纯足球赛事内容，和美妆商品场景不匹配 |
| Netflix | 影视宣发账号，与美妆商品的内容场景不符 | 影视宣发号，和美妆商品的内容场景不匹配 |
| Overtime | 体育赛事剪辑为主，和美妆消费场景明显不搭 | 内容几乎全是NBA和搞笑剪辑，和美妆消费场景不匹配 |
| Barstool Sports | 体育梗和赛事评论为主，受众与美妆商品匹配度低 | 体育梗和赛事内容占主，和美妆受众距离远 |
| Ney | 足球号为主，和美妆品类受众重合度低 | 足球内容和金融广告为主，和beauty受众差距大 |
| WWE | 内容是摔角赛事高能切片，与美妆商品受众明显不匹配 | 摔角赛事内容，受众与美妆推广明显不符 |
| ESPN | 内容是体育赛事高光和比赛资讯，与美妆商品受众不匹配 | 体育资讯号，内容形态与美妆商品不适配 |
| Roblox | 游戏平台与创作内容为主，不适合美妆商品推广 | 游戏平台账号，和美妆商品受众错位 |
| Saturday Night Live | 纯综艺喜剧向，缺少美妆/消费决策承载 | 主体是喜剧短剧和段子，缺少美妆或护肤承载场景 |
| Kevin Chamberlin | 以百老汇/表演为主，几乎无美妆消费内容 | 百老汇和喜剧为主，几乎无美容护肤场景 |
| angry reacts | 纯反应/音乐/情绪内容，不适合美妆承接 | 反应类和音乐内容为主，和美妆调性不匹配 |
| Spencer Hunt | 政治吐槽/日常scream内容，与美妆受众明显不符 | 日常吐槽和政治梗为主，缺少商品推广承载 |
| DAVID DOBRIK | 恶搞vlog为主，和beauty类商品调性不匹配 | 恶搞vlog、汽车和电影为主，与美妆受众不重合 |
| Collins Key | 挑战/家庭娱乐向，缺少美妆或消费决策内容 | 游戏、食物、宠物和搬家内容为主，不是美妆场 |
| Lynja | 纯烹饪内容，不承接美妆商品语境 | 烹饪频道，内容与美妆商品明显不相关 |
| Robert Lewandowski | 足球运动员账号，和beauty商品受众完全不匹配 | 足球运动账号，与beauty商品受众冲突明显 |
| Spencer X | beatbox挑战为主，与美妆商品几乎无关 | beatbox和挑战内容为主，不适合美妆推广 |
| Kody Antle | 野生动物/动物园内容，和beauty品类明显不搭 | 动物园和野生动物内容，受众与美妆完全不匹配 |
| Ray William Johnson | 长期真罪案/犯罪叙事，和美妆消费场景无关 | 长期是真实犯罪故事，和美妆消费完全不匹配 |
| Minecraft | 纯游戏官方频道，和美妆商品目标受众不匹配 | 纯游戏内容，和美妆受众明显不匹配 |
| Zach Choi | ASMR美食频道，受众与美妆商品差异明显 | 核心是做饭ASMR，和美妆商品受众不符 |
| thesavbananas | 棒球娱乐和舞蹈内容为主，与美妆消费场景弱相关 | 核心是棒球娱乐和舞台表演，不适合美妆推广 |
| Brody Wellmaker | 恐怖喜剧/短片创作，和美妆商品受众不一致 | 恐怖短剧为主，内容气质与美妆不搭 |
| Lamila Petschart | 影视剧/家庭戏仿内容为主，不适合美妆商品推广 | 剧集短片号，非美妆消费场景 |
| ThatLittlePuff | 生活小技巧和宠物向内容，和美妆商品目标不匹配 | 偏儿童和宠物小技巧，不是美妆频道 |
| Seany | 魔术/挑战/搞笑内容，与美妆商品关联很弱 | 魔术与整蛊内容为主，不是美妆推广场景 |

## nox@content-tone-llm-v1-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 1 | MrBeast |  | 内容以挑战综艺和食品联名为主，缺少美妆承载 |
| 3 | Khabane lame |  | 核心是搞笑段子，不适合美妆推广场景 |
| 14 | Zach King |  | 特效魔术与品牌联动为主，缺少美妆语境 |
| 29 | Laro Benz |  | 核心是亲子搞笑，和美妆商品受众不匹配 |
| 32 | Brent Rivera |  | 以家庭恶搞和二创为主，缺少美容承载能力 |
| 36 | Lucas and Marcus |  | 兄弟挑战/婚恋/旅行为主，不适合美妆商品推广 |
| 37 | Surthycooks |  | 核心是美食烹饪，与 beauty 商品场景相去甚远 |
| 39 | Bella Poarch |  | 音乐与宠物/艺术为主，美容承接能力弱 |
| 40 | Taylor Swift |  | 以音乐发行和巡演为主，不是美妆推广频道 |
| 42 | V |  | 内容偏个人碎片和韩语日常，没有美妆调性 |
| 44 | Joe Mele |  | 家庭恶作剧账号，缺少美妆消费场景 |
| 45 | Kai Cenat |  | 直播娱乐和游戏为主，与 beauty 商品不匹配 |
| 47 | Brotherofcolor |  | 恶搞短视频账号，和美妆推广不相关 |
| 127 | marko |  | 以综艺/搞笑/活动内容为主，没有美妆承载 |
| 141 | Taylor Nation |  | 音乐宣发账号，核心是作品与周边，不是美妆 |
| 145 | The Weeknd |  | 音乐/电影/咖啡联名为主，缺少美妆消费语境 |
| 163 | Garett Nolan |  | 抽象情绪文案号，缺少商品推广和美妆语境 |
| 167 | Jynxzi |  | 游戏直播号，和美妆商品受众不匹配 |
| 176 | Jimmy Fallon |  | 娱乐脱口秀受众，非美妆消费场景 |
| 178 | Creating Wonders |  | 鸡汤抽奖号，和美妆受众不符 |
| 179 | Oliver Tree |  | 音乐人频道，和美妆购买场景弱 |
| 180 | Ness |  | 偏音乐暗黑风格，不是美妆频道 |
| 187 | Jake Paul |  | 格斗健身号，不是美妆场景 |
| 189 | João Ferreira |  | 舞蹈情侣娱乐号，非美妆受众 |
| 190 | Ben Azelart |  | 挑战整活号，和美妆决策链路不搭 |
| 196 | JAYLLNN |  | 情侣生活加汽车，非美妆垂类 |
| 238 | Snoop Dogg |  | 音乐和酒饮/品牌内容为主，没有美妆护肤内容 |
| 246 | ShaqDieselONeal |  | 篮球综艺、补剂和汽车广告为主，不像美妆渠道 |
| 247 | Kervo.dolo |  | 搞笑短剧和节日梗为主，没有美容护肤承载 |
| 306 | Sturniolo’s |  | 偏家庭混剪和品牌口播，不是美妆决策内容 |

## xtb@content-tone-llm-v1-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 53 | Will Smith |  | 旅行纪录片和朗姆酒内容为主，不具备美妆承接调性 |
| 56 | Chris Olsen |  | 偏旅行食评和日常娱乐，和美妆关键词相关度弱 |
| 58 | DRUSKI |  | 以短剧式整活和喜剧表演为主，不适合美妆推广 |
| 59 | Alex Warren |  | 主要是音乐宣发，没有美妆内容或召回证据 |
| 61 | Bruno Mars |  | 纯音乐和酒类内容为主，缺少美妆承载场景 |
| 69 | Feid |  | 主要是拉丁音乐和日常，不是美妆垂类 |
| 73 | Stokes Twins |  | 整蛊挑战和冒险内容为主，不适合美妆推广 |
| 74 | JOP |  | regional music和巡演内容为主，缺少美妆场景 |
| 76 | Charlie Puth |  | 音乐号，几乎全是演出/歌曲内容，和美妆转化不匹配 |
| 80 | ZHC |  | 整活/家庭/家居为主，和美妆品类不相干 |
| 84 | AugustoGimenez |  | 装修/旅行/整蛊为主，缺少美妆承载场景 |
| 85 | eugenioderbezoficial |  | 喜剧/家庭/足球内容，与美妆转化冲突 |
| 88 | Pudgywoke |  | 音乐/个人情绪内容为主，和美妆不相干 |
| 89 | Los_chicaneros |  | 家庭喜剧号，缺少美妆或形象消费场景 |
| 91 | Jay Wheeler |  | 拉丁音乐号，内容几乎全是歌曲宣发 |
| 100 | KEEMOKAZI |  | 家庭搞笑号，与美妆推广关联很弱 |
| 113 | Josh Richards |  | 关系、派对和vlog为主，未见美容内容或消费决策场景 |
| 115 | Joelle Siwa |  | 舞蹈、个人成长和音乐为主，几乎没有美妆承载 |
| 118 | يحيى الزعبي 🇯🇴 |  | 以恶搞喜剧为主，出现的化妆品仅像场景道具 |
| 122 | Camilla Araujo |  | 生活转场和社交内容为主，没有美妆主题或承载点 |
| 123 | Sebastien |  | 搞笑生活号为主，美妆只是偶发点缀 |
| 202 | jcandsondraa |  | 主做足球/朋友搞笑，几乎无美妆承载 |
| 208 | Bryce Hall |  | 娱乐搞笑内容，缺少美妆受众和语境 |
| 212 | otakoyakisoba |  | 家庭美食账号，基本无美妆场景 |
| 217 | YoungSwagon |  | 家庭搞笑短剧，缺少美妆承载 |
| 223 | Lala |  | 偏剧情日常表达，缺少美妆垂类 |
| 233 | Kev_Eudy |  | 吐槽段子号，和美容商品受众不匹配 |
| 236 | Карина |  | 偏情绪表达和生活杂谈，没有美妆承载 |
| 251 | Tini👩🏼‍🍳🔥 |  | 以美食烹饪为主，几乎无美妆/护肤承接能力 |
| 255 | Krystiana |  | 母婴家庭内容为主，没有美妆承载场景 |

## Notes
- Page-level rates use `page_size` from each run metadata.
- Cause categories are heuristic clusters from `why_short`; review representative rows before making product decisions.
