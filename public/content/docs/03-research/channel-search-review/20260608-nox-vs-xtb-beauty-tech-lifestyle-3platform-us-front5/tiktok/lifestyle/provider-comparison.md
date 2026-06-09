# Channel Search Provider Comparison

- keyword: lifestyle
- platform: tiktok
- country: us
- left: nox@prompt:b87da85cf79a (tmp/channel-search-review/20260608-nox-vs-xtb-beauty-tech-lifestyle-3platform-us-front5/tiktok/lifestyle/nox-tiktok)
- right: xtb@prompt:b87da85cf79a (tmp/channel-search-review/20260608-nox-vs-xtb-beauty-tech-lifestyle-3platform-us-front5/tiktok/lifestyle/xtb-tiktok)
- left_rule_version: prompt:b87da85cf79a
- right_rule_version: prompt:b87da85cf79a
- left_prompt_hash: b87da85cf79a
- right_prompt_hash: b87da85cf79a

## Run Overview
| run | provider | rule_version | total | fit | adjacent | badcase | badcase率 | <0 | 0-9 | 10-19 | 20+ |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| nox@prompt:b87da85cf79a | nox | prompt:b87da85cf79a | 250 | 198 | 48 | 4 | 1.6% | 0 | 6 | 16 | 228 |
| xtb@prompt:b87da85cf79a | xtb | prompt:b87da85cf79a | 250 | 128 | 43 | 79 | 31.6% | 3 | 110 | 8 | 129 |

## Page-Level Badcase Rate
| page | nox@prompt:b87da85cf79a_total | nox@prompt:b87da85cf79a_badcase | nox@prompt:b87da85cf79a_badcase率 | xtb@prompt:b87da85cf79a_total | xtb@prompt:b87da85cf79a_badcase | xtb@prompt:b87da85cf79a_badcase率 | badcase率差 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 50 | 2 | 4.0% | 50 | 8 | 16.0% | -12.0% |
| 2 | 50 | 1 | 2.0% | 50 | 17 | 34.0% | -32.0% |
| 3 | 50 | 0 | 0.0% | 50 | 19 | 38.0% | -38.0% |
| 4 | 50 | 0 | 0.0% | 50 | 20 | 40.0% | -40.0% |
| 5 | 50 | 1 | 2.0% | 50 | 15 | 30.0% | -28.0% |

## Badcase Overlap
| metric | count |
| --- | --- |
| shared_badcase | 2 |
| nox@prompt:b87da85cf79a_only_badcase | 2 |
| xtb@prompt:b87da85cf79a_only_badcase | 77 |

## Badcase Cause Summary
| provider | category | count |
| --- | --- | --- |
| nox@prompt:b87da85cf79a | 宠物/动物受众冲突 | 1 |
| nox@prompt:b87da85cf79a | 其他 | 1 |
| nox@prompt:b87da85cf79a | 泛相关性偏离 | 1 |
| nox@prompt:b87da85cf79a | 证据缺失或信号不足 | 1 |
| xtb@prompt:b87da85cf79a | 证据缺失或信号不足 | 44 |
| xtb@prompt:b87da85cf79a | 其他 | 12 |
| xtb@prompt:b87da85cf79a | 娱乐/儿童/泛内容偏离 | 11 |
| xtb@prompt:b87da85cf79a | 泛相关性偏离 | 11 |
| xtb@prompt:b87da85cf79a | 宠物/动物受众冲突 | 1 |

## Shared Badcases
| channel | nox@prompt:b87da85cf79a | xtb@prompt:b87da85cf79a |
| --- | --- | --- |
| 𝐑𝐚𝐢𝐧𝐚 🧸 | 核心是Roblox角色扮演，和真实生活方式受众不符 | 标签命中但主体是Roblox角色扮演，格式不匹配 |
| Fordsixfo | 缺少 lifestyle 相关信号，主要是卡车车辆内容 | 汽车卡车类，和lifestyle推广不匹配 |

## nox@prompt:b87da85cf79a-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 32 | worldofpudge | 5 | 宠物犬账号，和人类 lifestyle 推广不符 |
| 50 | Professor Pineapple | 10 | 成人 swingers 主题，和普通 lifestyle 推广不匹配 |

## xtb@prompt:b87da85cf79a-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 6 | Mamba Clpz | 0 | 无标签无内容，缺少任何生活方式相关信号 |
| 13 | princesa,  chinita | 0 | 仅有recuerdos标签，缺少生活方式相关信号 |
| 20 | AsiSeHace | 0 | 无标签无内容，无法判断为生活方式相关 |
| 32 | Mario Guzmán | 0 | 无 lifestyle 相关信号，标签偏玩具/糖果/儿童娱乐 |
| 33 | ace | 0 | 无标签无内容信号，无法判断为 lifestyle 相关 |
| 41 | Bushy B | 0 | 无标签无内容信号，缺少 lifestyle 相关依据 |
| 43 | Nene | 0 | 无标签无内容信号，缺少 lifestyle 相关依据 |
| 50 | FastLifeNick | 0 | 标签偏汽车/搞笑，与 lifestyle 召回不匹配 |
| 51 | Prince BTA | 0 | 标签空白，缺少 lifestyle 相关内容 |
| 55 | Marybella Eckel | 0 | 标签空白，缺少 lifestyle 相关内容 |
| 56 | ️Minty | 0 | 仅有 viral/FYP 泛流量标签，缺少生活方式指向 |
| 57 | Fort Manny | 0 | 标签空白，缺少 lifestyle 相关内容 |
| 59 | VHM | 0 | 标签空白，缺少 lifestyle 相关内容 |
| 60 | elizabeth.hyz | 0 | 以摄影/幽默为主，和 lifestyle 关联弱 |
| 70 | kathleeAva | 0 | 标签空白，缺少 lifestyle 相关内容 |
| 73 | melaneyragoo | 0 | 标签空白，缺少 lifestyle 相关内容 |
| 74 | Wisdom Kaye | 0 | 标签偏剪辑/特效，缺少 lifestyle 相关内容 |
| 75 | ⭐️𝐋𝐔𝐂𝐘•𝐆𝐎𝐆𝐎⭐️ | 0 | 以地区/情侣泛内容为主，缺少 lifestyle 指向 |
| 78 | ЛИАНА🐸 | 0 | 仅有缝纫标签，与 lifestyle 目标无关 |
| 81 | Yarik World 🌐 | 0 | 无标签和内容信号，无法判断为 lifestyle 相关 |
| 83 | emmarosekenney | -10 | 宠物狗向，和人类 lifestyle 受众不匹配 |
| 84 | isaiah | 0 | 娱乐向为主，缺少 lifestyle 相关信号 |
| 88 | Little bee | 0 | 无标签与内容信号 |
| 90 | gatinha linda unteligente | 0 | 特效动画向，和 lifestyle 无关 |
| 92 | melissa_rebaza | 0 | 娱乐喜剧向，和 lifestyle 目标不一致 |
| 102 | xharwant | 0 | 无生活方式相关信号，内容偏知识向 |
| 103 | sophia | 0 | 仅有greenscreen标签，与生活方式无关 |
| 104 | apriilsdiaries | 0 | 无标签无内容，相关性不足 |
| 105 | Kobe | 0 | 偏挑战和泛流量标签，缺少生活方式信号 |
| 106 | Melissa Robles | 0 | 单一challenge标签，和lifestyle无关 |

## Notes
- Page-level rates use `page_size` from each run metadata.
- Cause categories are heuristic clusters from `why_short`; review representative rows before making product decisions.
