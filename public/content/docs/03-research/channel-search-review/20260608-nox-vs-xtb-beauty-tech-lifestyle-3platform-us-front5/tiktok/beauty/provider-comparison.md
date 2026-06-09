# Channel Search Provider Comparison

- keyword: beauty
- platform: tiktok
- country: us
- left: nox@prompt:b87da85cf79a (tmp/channel-search-review/20260608-nox-vs-xtb-beauty-tech-lifestyle-3platform-us-front5/tiktok/beauty/nox-tiktok)
- right: xtb@prompt:b87da85cf79a (tmp/channel-search-review/20260608-nox-vs-xtb-beauty-tech-lifestyle-3platform-us-front5/tiktok/beauty/xtb-tiktok)
- left_rule_version: prompt:b87da85cf79a
- right_rule_version: prompt:b87da85cf79a
- left_prompt_hash: b87da85cf79a
- right_prompt_hash: b87da85cf79a

## Run Overview
| run | provider | rule_version | total | fit | adjacent | badcase | badcase率 | <0 | 0-9 | 10-19 | 20+ |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| nox@prompt:b87da85cf79a | nox | prompt:b87da85cf79a | 250 | 210 | 32 | 8 | 3.2% | 0 | 6 | 5 | 239 |
| xtb@prompt:b87da85cf79a | xtb | prompt:b87da85cf79a | 250 | 186 | 38 | 26 | 10.4% | 4 | 27 | 12 | 207 |

## Page-Level Badcase Rate
| page | nox@prompt:b87da85cf79a_total | nox@prompt:b87da85cf79a_badcase | nox@prompt:b87da85cf79a_badcase率 | xtb@prompt:b87da85cf79a_total | xtb@prompt:b87da85cf79a_badcase | xtb@prompt:b87da85cf79a_badcase率 | badcase率差 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 50 | 1 | 2.0% | 50 | 5 | 10.0% | -8.0% |
| 2 | 50 | 0 | 0.0% | 50 | 4 | 8.0% | -8.0% |
| 3 | 50 | 3 | 6.0% | 50 | 4 | 8.0% | -2.0% |
| 4 | 50 | 4 | 8.0% | 50 | 6 | 12.0% | -4.0% |
| 5 | 50 | 0 | 0.0% | 50 | 7 | 14.0% | -14.0% |

## Badcase Overlap
| metric | count |
| --- | --- |
| shared_badcase | 1 |
| nox@prompt:b87da85cf79a_only_badcase | 7 |
| xtb@prompt:b87da85cf79a_only_badcase | 25 |

## Badcase Cause Summary
| provider | category | count |
| --- | --- | --- |
| nox@prompt:b87da85cf79a | 其他 | 4 |
| nox@prompt:b87da85cf79a | 宠物/动物受众冲突 | 2 |
| nox@prompt:b87da85cf79a | 证据缺失或信号不足 | 1 |
| nox@prompt:b87da85cf79a | 泛相关性偏离 | 1 |
| xtb@prompt:b87da85cf79a | 证据缺失或信号不足 | 9 |
| xtb@prompt:b87da85cf79a | 其他 | 6 |
| xtb@prompt:b87da85cf79a | 娱乐/儿童/泛内容偏离 | 5 |
| xtb@prompt:b87da85cf79a | 泛相关性偏离 | 4 |
| xtb@prompt:b87da85cf79a | 宠物/动物受众冲突 | 2 |

## Shared Badcases
| channel | nox@prompt:b87da85cf79a | xtb@prompt:b87da85cf79a |
| --- | --- | --- |
| beautyview | 宠物/故事频道，非美妆受众 | 以故事/宠物为主，beauty词命中不足以支撑推广 |

## nox@prompt:b87da85cf79a-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 19 | richardzoumalan.md | 10 | 以医美手术为主，和美妆护肤投放不匹配 |
| 145 | Qmdsht999 | 5 | 随机娱乐号，缺少美妆语境 |
| 150 | nolanx.ai | 5 | 猫宠物号，非美妆受众 |
| 152 | Brianna Ancheta | 10 | ASMR为主，虽有美妆词但投放格式明显不匹配 |
| 160 | Xiongjunjie | 8 | 风景/旅行向，美妆语义弱且不匹配 |
| 165 | Aideon-ASMR | 5 | 手表/ASMR取向，和美妆投放不符 |
| 200 | noelle asmr | 8 | ASMR音效为主，和美妆投放格式明显不匹配 |

## xtb@prompt:b87da85cf79a-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 13 | mia96183zxk | 10 | 偏 entertainment 与身材展示，美妆产品促销不匹配 |
| 21 | raffray01 | 10 | ASMR 形式明显，虽有护肤词但促销适配差 |
| 30 | Lyra | 0 | 无标签无内容，证据不足 |
| 37 | DiazDaysi3232 | 0 | 纯娱乐挑战号，和美妆无关 |
| 41 | cosmeticart.bymehik | 0 | 标签为空，证据不足 |
| 59 | OY | 0 | 无标签无内容信号，相关性不足 |
| 73 | Zinnia | 0 | 无标签无内容信号，无法判断 |
| 74 | Aida wally 🇸🇳🇱🇷🇮🇪🇨🇳 | 0 | 与美妆无关，偏黄金/奢侈品内容 |
| 76 | tatianakaer | -10 | 纯娱乐号，无beauty相关 |
| 104 | Healthy ☘️ | -15 | 宠物狗类内容，与人用美妆推广目标互斥 |
| 108 | Jayla | 0 | 跑步健身号，与美妆推广不相关 |
| 136 | Bella Hadid | 0 | 仅娱乐标签，无美妆召回依据 |
| 143 | 𝒜✩ | 0 | 无标签无内容，缺少召回依据 |
| 155 | Hailey Bieber | 0 | 音乐态标签，缺少 beauty 相关信号 |
| 161 | AYAN BEAUTY USA | -15 | 反毒/警务标签，与 beauty 促销冲突 |
| 171 | Arzoo Usman official | 0 | 健身/运动向，和 beauty 促销相关性弱 |
| 173 | Lily | 0 | 无标签，无法判断与 beauty 的相关性 |
| 180 | katieangeltv | 0 | 无美妆相关标签，偏娱乐内容 |
| 193 | Hi, I’m ting ting | 0 | 无标签无美妆信号，无法判断相关性 |
| 203 | Kika Kim | 0 | 偏乐园/精灵主题，和beauty投放几乎无关 |
| 206 | quenblackwell | -10 | 纯绿幕内容，缺少美妆语义且格式不匹配 |
| 210 | charisma | 0 | 主体是校园/宗教/旅行，美容关联很弱 |
| 233 | gia | 0 | 无美妆或消费品相关标签 |
| 238 | 🅞🅛🅖🅐 | 0 | 无标签，无相关受众信号 |
| 244 | Chanté💕 | 0 | 纯娱乐向账号，无美妆推广信号 |

## Notes
- Page-level rates use `page_size` from each run metadata.
- Cause categories are heuristic clusters from `why_short`; review representative rows before making product decisions.
