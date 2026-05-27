# Channel Search Provider Comparison

- keyword: fashion
- platform: youtube
- country: US
- left: nox@promotion-capacity-v1 (tmp/channel-search-review/20260526-nox-vs-xtb-10kw-youtube-us-front10-promotion-capacity-v1/fashion/nox-youtube)
- right: xtb@promotion-capacity-v1 (tmp/channel-search-review/20260526-nox-vs-xtb-10kw-youtube-us-front10-promotion-capacity-v1/fashion/xtb-youtube)
- left_rule_version: promotion-capacity-v1
- right_rule_version: promotion-capacity-v1
- left_prompt_hash: b87da85cf79a
- right_prompt_hash: b87da85cf79a

## Run Overview
| run | provider | rule_version | total | fit | adjacent | badcase | badcase率 | <0 | 0-9 | 10-19 | 20+ |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| nox@promotion-capacity-v1 | nox | promotion-capacity-v1 | 500 | 378 | 114 | 8 | 1.6% | 0 | 6 | 9 | 485 |
| xtb@promotion-capacity-v1 | xtb | promotion-capacity-v1 | 500 | 329 | 136 | 35 | 7.0% | 9 | 30 | 84 | 377 |

## Page-Level Badcase Rate
| page | nox@promotion-capacity-v1_total | nox@promotion-capacity-v1_badcase | nox@promotion-capacity-v1_badcase率 | xtb@promotion-capacity-v1_total | xtb@promotion-capacity-v1_badcase | xtb@promotion-capacity-v1_badcase率 | badcase率差 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 50 | 0 | 0.0% | 50 | 1 | 2.0% | -2.0% |
| 2 | 50 | 2 | 4.0% | 50 | 4 | 8.0% | -4.0% |
| 3 | 50 | 1 | 2.0% | 50 | 5 | 10.0% | -8.0% |
| 4 | 50 | 1 | 2.0% | 50 | 2 | 4.0% | -2.0% |
| 5 | 50 | 1 | 2.0% | 50 | 5 | 10.0% | -8.0% |
| 6 | 50 | 2 | 4.0% | 50 | 5 | 10.0% | -6.0% |
| 7 | 50 | 1 | 2.0% | 50 | 2 | 4.0% | -2.0% |
| 8 | 50 | 0 | 0.0% | 50 | 3 | 6.0% | -6.0% |
| 9 | 50 | 0 | 0.0% | 50 | 6 | 12.0% | -12.0% |
| 10 | 50 | 0 | 0.0% | 50 | 2 | 4.0% | -4.0% |

## Badcase Overlap
| metric | count |
| --- | --- |
| shared_badcase | 1 |
| nox@promotion-capacity-v1_only_badcase | 7 |
| xtb@promotion-capacity-v1_only_badcase | 34 |

## Badcase Cause Summary
| provider | category | count |
| --- | --- | --- |
| nox@promotion-capacity-v1 | 其他 | 4 |
| nox@promotion-capacity-v1 | 娱乐/儿童/泛内容偏离 | 3 |
| nox@promotion-capacity-v1 | 宠物/动物受众冲突 | 1 |
| xtb@promotion-capacity-v1 | 娱乐/儿童/泛内容偏离 | 20 |
| xtb@promotion-capacity-v1 | 其他 | 12 |
| xtb@promotion-capacity-v1 | 泛相关性偏离 | 2 |
| xtb@promotion-capacity-v1 | 宠物/动物受众冲突 | 1 |

## Shared Badcases
| channel | nox@promotion-capacity-v1 | xtb@promotion-capacity-v1 |
| --- | --- | --- |
| 123 GO! | 儿童搞笑内容为主，不适合时尚投放 | 虽有fashion标签，但主体是儿童娱乐/搞笑短片，格式不匹配 |

## nox@promotion-capacity-v1-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 54 | MyFroggyStuff | 5 | 玩具娃娃频道，和人类服饰推广不匹配 |
| 69 | Pidgin Doll | 10 | 玩偶手作频道，时尚标签偏玩偶服饰 |
| 154 | NewYorkFashionTimes | 8 | 直接命中fashion，但以runway/catwalk秀场为主，促销弱 |
| 204 | Sprunki Cubes DIY | 10 | ASMR/手工为主，时尚词仅弱命中，推广格式不匹配 |
| 261 | Milana Baby | 5 | 虽有 fashion 标签，但以娱乐/音乐内容为主，适配差 |
| 283 | AI Aniverse | 8 | AI时尚艺术偏创作，不是商品推广型频道 |
| 305 | Lyra Dolls | 5 | 纸娃娃玩具频道，非真人时尚受众 |

## xtb@promotion-capacity-v1-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 46 | A2zsyt | 10 | 标签有fashion但内容几乎全是理工科教育 |
| 65 | Illumitati | 3 | 近期多为娱乐和梗图，时尚只是零散露出，转化弱 |
| 69 | WIN EDIT | 10 | 音乐剪辑为主，时尚只是素材，不适合服饰推广 |
| 74 | Zayd Makhmud | 12 | 游戏/表情包为主，近10条多为日期占位，时尚弱 |
| 82 | eryten rggg034 | 1 | 虽有fashion标签，但主体是动漫/游戏/搞笑短视频，不适合时尚推广 |
| 103 | Elijah Monroe | 1 | 虽有fashion标签，但近10条以歌词视频为主，格式不匹配 |
| 124 | Dolphin | -5 | 虽有fashion标签，但最新10条全是音乐视频，属于明显错配 |
| 131 | Fun With Zartasha | 0 | 家庭短视频为主，时尚无产品推广语境，近10条都不匹配 |
| 143 | Monster Story | 1 | 动物娱乐内容混杂，时尚词不足以支撑推广 |
| 147 | Chicklet & Maleni | 0 | 播客八卦娱乐为主，不适合服饰转化 |
| 168 | Grey’s World | 10 | 娱乐家庭向内容占主导，时尚只是附属标签，推广不稳 |
| 197 | Fashion & Flow | -5 | 主轴是音乐配乐，和时尚推广的内容格式不符 |
| 206 | Curvy Lens | -1 | 虽有fashion标签，但主体是人物百科/模特资料，促销适配差 |
| 208 | perfectC | -1 | 以舞蹈娱乐为主，时尚只是标题噪音，带货适配很差 |
| 219 | Jennifer Ngo | 0 | 虽有fashion标签，但近期以ASMR/满足系娱乐为主 |
| 227 | Tokischa | 0 | 音乐娱乐为主，近10条几乎无时尚推广场景 |
| 243 | Fashion Wow | -5 | 命中时尚词但主体是动画变装娱乐，产品推广场景不合适 |
| 253 | AIllusions | 8 | AI时尚秀偏娱乐展示，不是商品推广型频道 |
| 265 | juicystar07 | 12 | 近期几乎全是storytime，时尚推广承接力弱 |
| 276 | Noa Tishby | 0 | 政治人权频道，fashion 只是边缘标签，近10条几乎全不相关 |
| 283 | Mahesh MG Gholve | 0 | 标签有fashion但近期全是体育新闻，主题与推广场景严重错位 |
| 298 | safiya shorts | 0 | 虽有fashion标签，但近期多宠物、蜡烛和娱乐内容，偏离明显 |
| 307 | SP Show | 4 | 娱乐短视频为主，时尚标签偏泛，推广不适合 |
| 343 | Seegi Makeup | -5 | 定格纸艺/ASMR风格，虽有fashion词但不适合真实服装推广 |
| 362 | Anwar Jibawi | 0 | 以搞笑娱乐为主，虽有Fashion标签但近期内容与穿搭推广不符 |
| 379 | French Montana | 0 | 频道主轴是音乐娱乐，时尚只是附带标签 |
| 392 | chronic fashion | -5 | 游戏穿搭，非时尚商品推广场景 |
| 404 | Style Scope | -5 | 近期几乎全是ASMR/助眠/故事，时尚推广场景严重不匹配 |
| 407 | Imbadkidjay | 0 | 游戏娱乐为主，时尚标签偏弱，近期内容不利于服饰推广 |
| 420 | Sweetheart Zoo | 0 | 动物/故事频道为主，时尚只是标签噪声，不适合投放 |

## Notes
- Page-level rates use `page_size` from each run metadata.
- Cause categories are heuristic clusters from `why_short`; review representative rows before making product decisions.
