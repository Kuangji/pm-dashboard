# Channel Search Provider Comparison

- keyword: beauty
- platform: tiktok
- country: US
- left: nox@content-tone-llm-v1 (tmp/channel-search-review/20260610-nox-vs-xtb-4kw-allplatform-us-front10-content-tone-v1/tiktok/beauty/nox-tiktok)
- right: xtb@content-tone-llm-v1 (tmp/channel-search-review/20260610-nox-vs-xtb-4kw-allplatform-us-front10-content-tone-v1/tiktok/beauty/xtb-tiktok)
- left_rule_version: content-tone-llm-v1
- right_rule_version: content-tone-llm-v1
- left_prompt_hash: 1228e2ff575f
- right_prompt_hash: 1228e2ff575f

## Run Overview
| run | provider | rule_version | total | fit | adjacent | badcase | badcase率 | <0 | 0-9 | 10-19 | 20+ |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| nox@content-tone-llm-v1 | nox | content-tone-llm-v1 | 500 | 370 | 105 | 25 | 5.0% | 0 | 500 | 0 | 0 |
| xtb@content-tone-llm-v1 | xtb | content-tone-llm-v1 | 500 | 354 | 111 | 35 | 7.0% | 0 | 500 | 0 | 0 |

## Page-Level Badcase Rate
| page | nox@content-tone-llm-v1_total | nox@content-tone-llm-v1_badcase | nox@content-tone-llm-v1_badcase率 | xtb@content-tone-llm-v1_total | xtb@content-tone-llm-v1_badcase | xtb@content-tone-llm-v1_badcase率 | badcase率差 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 50 | 1 | 2.0% | 50 | 7 | 14.0% | -12.0% |
| 2 | 50 | 1 | 2.0% | 50 | 3 | 6.0% | -4.0% |
| 3 | 50 | 4 | 8.0% | 50 | 0 | 0.0% | 8.0% |
| 4 | 50 | 4 | 8.0% | 50 | 4 | 8.0% | 0.0% |
| 5 | 50 | 3 | 6.0% | 50 | 6 | 12.0% | -6.0% |
| 6 | 50 | 1 | 2.0% | 50 | 3 | 6.0% | -4.0% |
| 7 | 50 | 5 | 10.0% | 50 | 1 | 2.0% | 8.0% |
| 8 | 50 | 0 | 0.0% | 50 | 6 | 12.0% | -12.0% |
| 9 | 50 | 4 | 8.0% | 50 | 0 | 0.0% | 8.0% |
| 10 | 50 | 2 | 4.0% | 50 | 5 | 10.0% | -6.0% |

## Badcase Overlap
| metric | count |
| --- | --- |
| shared_badcase | 20 |
| nox@content-tone-llm-v1_only_badcase | 5 |
| xtb@content-tone-llm-v1_only_badcase | 15 |

## Badcase Cause Summary
| provider | category | count |
| --- | --- | --- |
| nox@content-tone-llm-v1 | 其他 | 11 |
| nox@content-tone-llm-v1 | 证据缺失或信号不足 | 6 |
| nox@content-tone-llm-v1 | 娱乐/儿童/泛内容偏离 | 3 |
| nox@content-tone-llm-v1 | 泛相关性偏离 | 3 |
| nox@content-tone-llm-v1 | 宠物/动物受众冲突 | 2 |
| xtb@content-tone-llm-v1 | 其他 | 16 |
| xtb@content-tone-llm-v1 | 证据缺失或信号不足 | 12 |
| xtb@content-tone-llm-v1 | 泛相关性偏离 | 3 |
| xtb@content-tone-llm-v1 | 娱乐/儿童/泛内容偏离 | 3 |
| xtb@content-tone-llm-v1 | 宠物/动物受众冲突 | 1 |

## Shared Badcases
| channel | nox@content-tone-llm-v1 | xtb@content-tone-llm-v1 |
| --- | --- | --- |
| Maria | 发布内容几乎全是故事/家庭/旅行，不适合美妆合作 | 主体是故事/家庭/旅行记录，几乎没有美妆承载能力 |
| beautyview | 内容主体是鸟类与自然，不是美妆或消费决策场景。 | 主体是鸟类内容，与人用beauty商品完全不相关 |
| Qmdsht999 | 内容是风景、自然和杂类视频，beauty 只是在描述景色，不是美妆受众。 | 主体是风景/奇观/旅行内容，与美妆商品推广明显不匹配。 |
| nolanx.ai | 主体是 AI 短剧和宠物/动物内容，和美容商品推广明显不匹配。 | 主体是 AI 短剧和猫宠内容，与人用美妆商品推广不相关。 |
| Sofia Elizabeth | 主体是情绪化个人表达，缺少稳定美妆承载内容 | 主要是日常吐槽和娱乐话题，缺少稳定美妆内容。 |
| Xiongjunjie | 风景旅行频道，不具备美妆商品推广场景 | 内容是风景/旅行/夜景记录，与美妆推广没有直接关系。 |
| Aideon-ASMR | 内容重心在手表与泛社交表达，不像美妆频道 | 主体是watch和泛聊，几乎看不到可承接beauty商品的内容形态 |
| Curvyzelma | 主体是综艺投票和人物互动，缺少美妆承载场景 | 主要是综艺/投票/娱乐内容，不是美妆消费场景 |
| Kat | 主体是杂乱的直播/情绪/成人视频风格内容，缺乏真实美妆承载能力 | 标题多为空泛标签式内容，缺少真实美妆调性 |
| 💕 | 主要是明星剪辑和情绪内容，不是美妆消费场景 | 主要是名人编辑/饭圈内容，几乎不承接美妆商品 |
| Taekwondo Julie🥋 | 主体是跆拳道/武术内容，与美妆合作明显不符 | 主体是跆拳道格斗，不是美妆场景 |
| 𝐂𝐎𝐔𝐓𝐔𝐑𝐄 𝐃𝐄𝐒𝐈𝐆𝐍𝐒 | 内容几乎全是高定秀场和时装名录，缺少美妆护肤承接 | 主体是高定时装内容，与 beauty 商品推广不匹配 |
| CClara1225🍀 | 标题多为泛自拍和情绪短句，缺少实质美妆护肤内容 | 主要是泛娱乐和跳舞镜头，beauty 只是弱标签 |
| Duchess😊😍 | 主体是泛娱乐/情绪内容，几乎没有稳定美妆承载能力 | 以泛流行与情绪内容为主，缺少稳定美妆承载 |
| Selly 💜 | 主体是 Selena 粉丝剪辑，不是美妆内容，几乎无商品承接 | 核心是 Selena 粉丝剪辑，非美妆内容账号 |
| Yolanda bellydance teacher | 主体是肚皮舞教学，和beauty商品推广不匹配 | 主体是肚皮舞教学，和美妆商品推广明显不匹配 |
| Wallace | 木工和手工内容，与beauty商品无关 | 主体是木工和手工，和美妆推广基本无关 |
| Love Fashion💋 | 内容是泛化街拍图文，缺少真实美容推广承载力 | 街拍审美号，缺少真实美妆/护肤消费内容 |
| kungfuchina28 | 主打太极/功夫，beauty只是标题修饰，不是美妆消费内容 | 主体是太极武术表演，不适合美妆推广 |
| mia96183zxk | 标题几乎只有#Beauty/#sexy/#goddess，缺少妆护肤或消费决策内容 | 仅凭外貌标签打点，缺少商品承载 |

## nox@content-tone-llm-v1-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 93 | gianna |  | 主要是日常碎片、宠物和无关内容，缺少美妆承载 |
| 134 | Reina |  | 主体是日常流量内容和家居工具，几乎不支持美妆推广。 |
| 217 | Star Abelar |  | 主体是音乐/娱乐内容，几乎不具备美妆商品推广语境 |
| 346 | Amelie Zilber |  | 主体是政治、影视和生活内容，美容内容占比极低 |
| 457 | AIgamerdailybasis |  | 频道长期为功夫武打内容，与美妆消费场景明显不相关 |

## xtb@content-tone-llm-v1-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 5 | 小云云 |  | 只有外貌标签，缺少真实美妆内容 |
| 6 | happyoneday |  | 主要是性感展示和身材内容，不适合美妆投放 |
| 12 | 小光头 |  | 性感自拍与健身风格，和美妆推广不匹配 |
| 13 | Sophie |  | 核心是反beauty标准讨论，和投放方向冲突 |
| 15 | 藍心 |  | 古风/AI形象为主，缺少真实美妆消费场景 |
| 38 | Towingyi |  | 主要是剧情/搞笑片段，美妆只做背景道具 |
| 74 | mercifulmyral |  | 主要是男演员审美打分和编辑内容，不是美妆消费场景 |
| 90 | Beautifulone🤍🤍 |  | 标题多为泛泛的模型/时尚/趋势表达，缺少真实美妆承载内容 |
| 164 | Beauty by Stylechannel |  | 主体是社交活动和生活记录，几乎没有稳定beauty承载 |
| 169 | Olive |  | 内容几乎是泛标签和低信息量发布，缺少真实美妆调性 |
| 188 | AAA ZXDD |  | 标题虽带beauty，但内容缺少真实美妆承载，不适合推广 |
| 205 | Vishal Jangwal |  | 内容主要是账号提及和碎片日常，缺少真实美妆调性与商品承载力。 |
| 352 | sarkvibe |  | 主体是诗歌和情绪内容，几乎没有真实美妆承载 |
| 390 | Asya |  | 只有泛化的 beauty 标签，缺少真实美妆内容承载 |
| 462 | Blackpink |  | 以审美人像和风格展示为主，不是美妆消费内容 |

## Notes
- Page-level rates use `page_size` from each run metadata.
- Cause categories are heuristic clusters from `why_short`; review representative rows before making product decisions.
