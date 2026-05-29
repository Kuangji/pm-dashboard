# Channel Search Provider Comparison

- keyword: kitchen
- platform: tiktok
- country: -
- left: nox@promotion-capacity-v1 (tmp/channel-search-review/20260528-nox-vs-xtb-10kw2-tiktok-global-front10-promotion-capacity-v1/kitchen/nox-tiktok)
- right: xtb@promotion-capacity-v1 (tmp/channel-search-review/20260528-nox-vs-xtb-10kw2-tiktok-global-front10-promotion-capacity-v1/kitchen/xtb-tiktok)
- left_rule_version: promotion-capacity-v1
- right_rule_version: promotion-capacity-v1
- left_prompt_hash: b87da85cf79a
- right_prompt_hash: b87da85cf79a

## Run Overview
| run | provider | rule_version | total | fit | adjacent | badcase | badcase率 | <0 | 0-9 | 10-19 | 20+ |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| nox@promotion-capacity-v1 | nox | promotion-capacity-v1 | 500 | 212 | 158 | 130 | 26.0% | 13 | 121 | 44 | 322 |
| xtb@promotion-capacity-v1 | xtb | promotion-capacity-v1 | 500 | 255 | 183 | 62 | 12.4% | 19 | 39 | 110 | 332 |

## Page-Level Badcase Rate
| page | nox@promotion-capacity-v1_total | nox@promotion-capacity-v1_badcase | nox@promotion-capacity-v1_badcase率 | xtb@promotion-capacity-v1_total | xtb@promotion-capacity-v1_badcase | xtb@promotion-capacity-v1_badcase率 | badcase率差 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 50 | 9 | 18.0% | 50 | 4 | 8.0% | 10.0% |
| 2 | 50 | 8 | 16.0% | 50 | 3 | 6.0% | 10.0% |
| 3 | 50 | 6 | 12.0% | 50 | 11 | 22.0% | -10.0% |
| 4 | 50 | 12 | 24.0% | 50 | 6 | 12.0% | 12.0% |
| 5 | 50 | 8 | 16.0% | 50 | 8 | 16.0% | 0.0% |
| 6 | 50 | 12 | 24.0% | 50 | 5 | 10.0% | 14.0% |
| 7 | 50 | 9 | 18.0% | 50 | 6 | 12.0% | 6.0% |
| 8 | 50 | 19 | 38.0% | 50 | 10 | 20.0% | 18.0% |
| 9 | 50 | 24 | 48.0% | 50 | 4 | 8.0% | 40.0% |
| 10 | 50 | 23 | 46.0% | 50 | 5 | 10.0% | 36.0% |

## Badcase Overlap
| metric | count |
| --- | --- |
| shared_badcase | 16 |
| nox@promotion-capacity-v1_only_badcase | 114 |
| xtb@promotion-capacity-v1_only_badcase | 46 |

## Badcase Cause Summary
| provider | category | count |
| --- | --- | --- |
| nox@promotion-capacity-v1 | 证据缺失或信号不足 | 47 |
| nox@promotion-capacity-v1 | 其他 | 35 |
| nox@promotion-capacity-v1 | 泛相关性偏离 | 23 |
| nox@promotion-capacity-v1 | 娱乐/儿童/泛内容偏离 | 16 |
| nox@promotion-capacity-v1 | 宠物/动物受众冲突 | 9 |
| xtb@promotion-capacity-v1 | 其他 | 35 |
| xtb@promotion-capacity-v1 | 娱乐/儿童/泛内容偏离 | 21 |
| xtb@promotion-capacity-v1 | 宠物/动物受众冲突 | 4 |
| xtb@promotion-capacity-v1 | 泛相关性偏离 | 2 |

## Shared Badcases
| channel | nox@promotion-capacity-v1 | xtb@promotion-capacity-v1 |
| --- | --- | --- |
| 2M ASMR Compilation | ASMR编排与厨房产品推广冲突，虽有kitchen但不适合种草 | 厨房补货为主但ASMR强，做厨房产品推广不合适 |
| 𝐾𝑎𝑚𝑖 𝐿𝑎𝑟𝑎𝑒 | ASMR清洁类与产品推广不匹配，厨房仅是场景词 | ASMR收纳清洁为主，厨房推广适配度低 |
| Meecat | 迷你手作ASMR频道，场景不适合厨房产品推广 | 微缩玩具和ASMR内容，和真实厨房用品不匹配 |
| 5M ASMR Compilation | ASMR编排与厨房产品推广冲突，虽有kitchen但不适合种草 | ASMR整理为主，厨房词命中但推广格式明显不适合 |
| 5M ASMR Compilation | ASMR占主导，厨房仅是背景词，不适合产品推广 | ASMR重度休闲内容，不适合真实厨房产品推广 |
| Aenamism | ASMR占主导，虽有厨房技巧词但推广场景仍不合适 | ASMR/治愈音频占主导，和厨房商品推广格式不匹配 |
| 🥤🍕The Kitchen Kid 🍜🍨 | 玩具假食物/儿童厨房，和成人厨房产品不符 | 玩具假食物内容，和真实厨房用品推广不匹配 |
| sv_finds | ASMR和声音向内容主导，不适合厨房产品推广 | ASMR加美妆宠物混杂，厨房推广相关性弱 |
| Life in 3D | 纯唱歌娱乐，和厨房产品推广无关 | 唱歌娱乐为主，厨房只是蹭词，不适合厨房推广 |
| Bellz Lulu | 无有效标签，无法判断厨房相关性 | 餐饮经营号，厨房词在但不适合做商品推广 |
| Tap-Hula-Queen | 舞蹈健身号，与厨房产品无关 | 舞蹈娱乐号，厨房推广格式不匹配 |
| wishyou26 | 舞蹈泛娱乐号，与厨房产品无关 | 有Kitchen标签，但近10条几乎全是体育影视资讯内容 |
| Zach King | 娱乐向为主，和厨房产品推广场景不匹配 | 娱乐魔术号，厨房词不代表带货 |
| kukiasg9999 | 宠物号为主，与厨房产品推广无关 | 泛娱乐混剪为主，厨房相关弱且近期不匹配 |
| Anna DIY | 娱乐刷量型内容，没有厨房或购物语境 | 有Kitchen标签和ProductReview，但近10条多为珠宝打包ASMR，厨房推广不适配 |
| gio | 娱乐/剧情向，和厨房产品受众不匹配 | 娱乐叙事内容为主，厨房受众不足 |

## nox@promotion-capacity-v1-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 43 | Waleria Watson | 5 | ASMR/收纳沉浸内容，重氛围不重商品 |
| 44 | Noah Klein | 5 | ASMR烹饪型，适合度低 |
| 56 | emilyyv13 | 10 | ASMR清洁收纳风明显，不适合厨房商品推广 |
| 58 | sweet.smile185 | 5 | 娱乐/歌曲导向强，厨房词不代表商品推广能力 |
| 68 | Everyday Home Design | 10 | ASMR家居内容占比高，厨房词只是背景场景 |
| 77 | Monica Brady | 8 | ASMR/满意感内容为主，厨房商品推广格式错位明显 |
| 79 | waleria watson | 6 | ASMR+restock 为主，厨房商品推广的格式错位较强 |
| 87 | Makeover Momma | 7 | ASMR+清洁装饰为主，厨房商品推广格式不佳 |
| 95 | Houda | 0 | 无标签无内容信号，无法判断为厨房相关创作者 |
| 114 | Grandma Gets Real | 5 | 微缩玩具内容为主，和厨房产品推广不符 |
| 123 | eatwithchlo | 0 | 无标签无内容证据，无法判断为厨房推广号 |
| 124 | feliciahittGENX❤️ | 10 | 美甲和猫内容占主导，厨房标签不足以支撑投放 |
| 132 | Sadii | Home | Organizing | 10 | ASMR格式冲突，厨房产品不适合 |
| 149 | ModernPrairie | 0 | 无标签无内容，无法判断 |
| 153 | pattipagewhite | 8 | 宗教向为主，厨房仅表面命中，和厨房产品推广不匹配 |
| 157 | PassionForPurpose | 8 | 宗教内容为主，厨房标签只是表面相关 |
| 159 | Pop-3c-Gaming | 5 | 剑类/游戏向，厨房标签与主内容冲突明显 |
| 165 | Liz | 13 | ASMR为主且偏休闲，和厨房产品推广格式不匹配 |
| 167 | Livin the scrub life | 12 | 清洁ASMR为主，适合度低，偏感官内容而非导购 |
| 170 | Say The World On Beat | 8 | 艺术/放松向，厨房仅表面命中，适配度低 |
| 174 | sportpartner07 | 5 | 玩具/迷你/宠物向，明显不是人用厨房产品场景 |
| 180 | Now You Know Daily | 0 | 无标签无视频证据，无法判断厨房相关性 |
| 181 | Aleadhomeus | 0 | 无标签无视频证据，无法判断厨房相关性 |
| 186 | Boelon_Official | 0 | 植物园艺内容，和厨房产品无关 |
| 188 | Kelsey | 0 | 旅行/自拍类，和厨房推广无关 |
| 195 | klaceehanson | -25 | ASMR/解压类，属于强推广形式不匹配 |
| 224 | OnlyLikePuppy | 5 | 宠物+游戏娱乐号，厨房标签不构成适配 |
| 231 | Melissa Grace | 0 | 无标签无内容，无法判断相关性 |
| 235 | amazonstuff_buys | -10 | 娱乐梗号，和厨房商品明显不匹配 |
| 240 | Moss | 0 | 母婴家居向，厨房相关信号不足 |

## xtb@promotion-capacity-v1-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 30 | Caun Nicoleta | 9 | 虽有厨房和维修标签，但近期多为个人杂内容 |
| 38 | Riche | 2 | 主要是迈克尔杰克逊内容，厨房只是偶发 |
| 42 | Sajmir | 11 | 个人生活内容为主，厨房只是少量出现 |
| 70 | I N D R A | -2 | 明显偏娱乐/声音流，标题带厨房词也不适合投放 |
| 72 | AYOO TRACEY | 8 | 清洁ASMR/家务向，厨房词有但促销格式不佳 |
| 98 | user6061804143141 | 2 | 剧情短剧为主，厨房仅偶发标题，推广不合适 |
| 106 | bian | 11 | 宠物与杂谈占主导，厨房相关太弱 |
| 113 | CYSGrides | 2 | 骑行娱乐占主导，厨房关联弱 |
| 117 | Alan_official 💫 | 2 | ASMR清洁风格，不适合厨房带货 |
| 119 | Gina | -1 | 个人杂谈为主，厨房内容很少 |
| 124 | AidenShack | -4 | 喜剧角色号，厨房带货适配差 |
| 138 | Call me Nour 🦋 | 11 | 生活随拍为主，厨房信号弱且近期偏离较多 |
| 153 | Movie Action | 14 | 有厨房标签和购物信号，但近期内容杂乱且偏博彩推广 |
| 154 | Keep it organised | 9 | 补货整理内容多，但ASMR形式不利于厨房产品推广 |
| 167 | Enderson Cordeiro | 2 | 标题带厨房但本质是八卦娱乐，不适合厨房推广 |
| 174 | Makeup 3 | 15 | 美妆杂号夹带厨房词，厨房推广相关性弱 |
| 188 | Monkey Lily | 0 | 动物娱乐号，和厨房商品推广场景冲突 |
| 213 | Cookinwithjai | 11 | 近期几乎全是时尚内容，厨房主题已明显跑偏 |
| 229 | 💎kris4en💎 | 0 | 个人娱乐号，厨房标签像泛词噪音，转化弱 |
| 235 | Sidity Des | 0 | 娱乐/日常为主，厨房标签不构成有效投放场景 |
| 240 | casal estrela Dalva. | 0 | 音乐挑战号，厨房只是蹭词，基本不适合投放 |
| 241 | Niko’s kitchen 🔪 | 4 | 心理/日常杂内容为主，厨房相关性很弱 |
| 263 | Rezk Mahmoud🇪🇬🇰🇪🇸🇦🇯🇴 | 0 | 近期多为杂项和梗图，厨房推广场景弱 |
| 268 | Eric | 0 | 故事/戏剧内容为主，不适合厨房带货 |
| 281 | SaucyExplains | -14 | 娱乐/健康内容为主，厨房仅是弱标签，最近10条几乎不相关 |
| 283 | The Fight Game | 10 | 近期全是格斗叙事，厨房标签不代表可推广厨房品 |
| 291 | obsessionforoldermen | -15 | 剧情/追星内容为主，厨房与清洁只是挂名标签 |
| 310 | user41189889964 | -5 | 厨房词命中但核心是节目切片，非产品推广场景 |
| 311 | fqlybpz346 | -5 | 新闻/谋杀/监狱类切片，厨房只是蹭词，不适合投放 |
| 312 | @ghediamousa | -3 | ASMR/吃声娱乐号，属于明显格式不匹配 |

## Notes
- Page-level rates use `page_size` from each run metadata.
- Cause categories are heuristic clusters from `why_short`; review representative rows before making product decisions.
