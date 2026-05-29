# Channel Search Provider Comparison

- keyword: marathon
- platform: youtube
- country: -
- left: nox@promotion-capacity-v1 (tmp/channel-search-review/20260528-nox-vs-xtb-10kw2-youtube-global-front10-promotion-capacity-v1/marathon/nox-youtube)
- right: xtb@promotion-capacity-v1 (tmp/channel-search-review/20260528-nox-vs-xtb-10kw2-youtube-global-front10-promotion-capacity-v1/marathon/xtb-youtube)
- left_rule_version: promotion-capacity-v1
- right_rule_version: promotion-capacity-v1
- left_prompt_hash: b87da85cf79a
- right_prompt_hash: b87da85cf79a

## Run Overview
| run | provider | rule_version | total | fit | adjacent | badcase | badcase率 | <0 | 0-9 | 10-19 | 20+ |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| nox@promotion-capacity-v1 | nox | promotion-capacity-v1 | 500 | 161 | 83 | 256 | 51.2% | 22 | 261 | 36 | 181 |
| xtb@promotion-capacity-v1 | xtb | promotion-capacity-v1 | 500 | 383 | 99 | 18 | 3.6% | 10 | 8 | 130 | 352 |

## Page-Level Badcase Rate
| page | nox@promotion-capacity-v1_total | nox@promotion-capacity-v1_badcase | nox@promotion-capacity-v1_badcase率 | xtb@promotion-capacity-v1_total | xtb@promotion-capacity-v1_badcase | xtb@promotion-capacity-v1_badcase率 | badcase率差 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 50 | 9 | 18.0% | 50 | 1 | 2.0% | 16.0% |
| 2 | 50 | 22 | 44.0% | 50 | 1 | 2.0% | 42.0% |
| 3 | 50 | 29 | 58.0% | 50 | 0 | 0.0% | 58.0% |
| 4 | 50 | 29 | 58.0% | 50 | 0 | 0.0% | 58.0% |
| 5 | 50 | 29 | 58.0% | 50 | 3 | 6.0% | 52.0% |
| 6 | 50 | 29 | 58.0% | 50 | 4 | 8.0% | 50.0% |
| 7 | 50 | 27 | 54.0% | 50 | 5 | 10.0% | 44.0% |
| 8 | 50 | 26 | 52.0% | 50 | 0 | 0.0% | 52.0% |
| 9 | 50 | 31 | 62.0% | 50 | 2 | 4.0% | 58.0% |
| 10 | 50 | 25 | 50.0% | 50 | 2 | 4.0% | 46.0% |

## Badcase Overlap
| metric | count |
| --- | --- |
| shared_badcase | 1 |
| nox@promotion-capacity-v1_only_badcase | 255 |
| xtb@promotion-capacity-v1_only_badcase | 17 |

## Badcase Cause Summary
| provider | category | count |
| --- | --- | --- |
| nox@promotion-capacity-v1 | 其他 | 101 |
| nox@promotion-capacity-v1 | 证据缺失或信号不足 | 58 |
| nox@promotion-capacity-v1 | 泛相关性偏离 | 50 |
| nox@promotion-capacity-v1 | 娱乐/儿童/泛内容偏离 | 42 |
| nox@promotion-capacity-v1 | 科技/电子垂类偏离 | 3 |
| nox@promotion-capacity-v1 | 宠物/动物受众冲突 | 2 |
| xtb@promotion-capacity-v1 | 其他 | 10 |
| xtb@promotion-capacity-v1 | 娱乐/儿童/泛内容偏离 | 5 |
| xtb@promotion-capacity-v1 | 宠物/动物受众冲突 | 2 |
| xtb@promotion-capacity-v1 | 泛相关性偏离 | 1 |

## Shared Badcases
| channel | nox@promotion-capacity-v1 | xtb@promotion-capacity-v1 |
| --- | --- | --- |
| Brooke Monk | 娱乐喜剧向频道，与马拉松推广无关 | 娱乐和ASMR主导，马拉松仅标签命中 |

## nox@promotion-capacity-v1-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 17 | Shout! Studios | 5 | 影视频道里的“marathon”是片单马拉松 |
| 33 | Happy Doggo | -15 | 宠物犬频道，面向人类马拉松受众明显冲突 |
| 38 | Cody Trains | 0 | 仅生活方式标签，缺少跑步或赛事信号 |
| 40 | Shayne, No One Cares | 0 | 游戏频道与马拉松推广无关 |
| 41 | Alex Martin | 0 | 摩托/越野车内容，与马拉松无关 |
| 42 | iiizwerg | 0 | 游戏频道与马拉松无关 |
| 46 | Jake Ferrin | 0 | 远程工作/技术频道，无跑步赛事相关性 |
| 50 | John Titor, Timewalker. | 0 | 游戏频道与马拉松无关 |
| 54 | Hunter Leininger | 0 | 无标签与内容证据 |
| 57 | Maddie Green | 0 | 旅行/音乐向，与马拉松关联很弱 |
| 60 | Diffizzle | 0 | 游戏内容，与马拉松受众不匹配 |
| 64 | KingGodsu Sports and Gaming | 0 | 游戏主导，与马拉松无关 |
| 66 | GAIN 101 YT | 0 | 射击游戏向，与马拉松无关 |
| 71 | Supahs | 0 | 恐怖游戏内容，与马拉松无关 |
| 72 | Hallmark Mystery | 0 | 影视娱乐内容，与马拉松无关 |
| 73 | Ian Evolution | 0 | 游戏内容，与马拉松受众不匹配 |
| 75 | ZZ Kids TV | 0 | 儿童娱乐内容，不适合马拉松推广 |
| 77 | Antenna TV | 0 | 以娱乐影视音乐为主，与马拉松推广不匹配 |
| 79 | IGN | 0 | 游戏频道，和马拉松受众缺少关联 |
| 80 | Salauddin Vlog | 0 | 偏消费电子/生活内容，与马拉松无直接关联 |
| 81 | Caitlin Benson | 0 | 音乐反应型频道，跑步/运动受众不明确 |
| 82 | SML Movies | 0 | 缺少标签和视频证据，无法判断为马拉松相关 |
| 83 | PazarGamingGuides | 0 | 游戏教程频道，和马拉松推广目标不一致 |
| 84 | Pawn Stars Story | 0 | Roblox/角色扮演内容，与马拉松无关 |
| 85 | Griffin Hammond | 0 | 有 how to / 电子相关能力，但与马拉松主题不匹配 |
| 86 | The Pogcast | 0 | 塔科夫游戏播客，和马拉松受众不重合 |
| 96 | Steph Monti | 0 | 旅行美食生活向，跑步/马拉松证据不足 |
| 97 | The ninja on the mountains | 0 | 偏户外器材/冰浴内容，与马拉松缺少直接语境 |
| 98 | Sand Castle University | -15 | ASMR/满足感格式与马拉松推广强冲突 |
| 99 | Derrick Moy (Moysauce12) | 0 | 汽车/特斯拉向，和马拉松目标受众不重合 |

## xtb@promotion-capacity-v1-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 36 | DjClips | -5 | 游戏足球为主，马拉松标签与频道主题不匹配 |
| 232 | Kanni Dog fan vlog | -5 | 有 Marathon 标签，但近10条几乎全是动物内容 |
| 234 | Athar Hashmi | 2 | 宗教/研讨为主，马拉松只是零散出现 |
| 246 | 골드클래스 | -5 | 近况几乎全是狗和村庄内容，不适合 |
| 258 | France 3 Nouvelle-Aquitaine | 10 | 地方新闻频道，近10条全是时政民生，马拉松仅在标签里 |
| 284 | TriathlonTV Korea | 13 | 标签命中，但近期多为汽车内容，马拉松相关性明显不足 |
| 294 | DevOps by Krupin | 10 | 标签有马拉松，但近期完全是DevOps/编程，受众明显不匹配 |
| 295 | Matěj König | 10 | 马拉松仅是泛体育标签，近期以娱乐和其他体育为主，相关性弱 |
| 308 | Britclip | -5 | 娱乐、宠物和奇观内容占主轴，马拉松只是零散标签 |
| 325 | ARIES CONRAD JR OFFICIAL | -2 | 娱乐/音乐/美食为主，马拉松只是零散出现，不适合推广 |
| 333 | Hugo Tout Seul | 1 | 娱乐幽默为主，马拉松只是边缘话题 |
| 337 | AlotMoreMane | 0 | 音乐娱乐挑战号，跑马内容不构成主轴 |
| 344 | Dipen Singh | -2 | 播客历史类账号，跑马相关性很弱 |
| 426 | Racer Afrid | -5 | 以1600米军训短跑为主，和马拉松推广不匹配 |
| 428 | Balaji ground Unchagaon | -5 | 以音乐短视频为主，跑步只是弱标签，不适合推广马拉松 |
| 470 | Sweta Singh | -5 | 宗教短视频为主，近期与马拉松几乎无关 |
| 482 | Armando Videos007 | 10 | 近十条几乎全是活动和喜剧，马拉松只是挂标签。 |

## Notes
- Page-level rates use `page_size` from each run metadata.
- Cause categories are heuristic clusters from `why_short`; review representative rows before making product decisions.
