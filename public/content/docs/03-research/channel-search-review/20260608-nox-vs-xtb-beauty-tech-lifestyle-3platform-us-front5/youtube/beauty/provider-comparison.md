# Channel Search Provider Comparison

- keyword: beauty
- platform: youtube
- country: us
- left: nox@prompt:b87da85cf79a (tmp/channel-search-review/20260608-nox-vs-xtb-beauty-tech-lifestyle-3platform-us-front5/youtube/beauty/nox-youtube)
- right: xtb@prompt:b87da85cf79a (tmp/channel-search-review/20260608-nox-vs-xtb-beauty-tech-lifestyle-3platform-us-front5/youtube/beauty/xtb-youtube)
- left_rule_version: prompt:b87da85cf79a
- right_rule_version: prompt:b87da85cf79a
- left_prompt_hash: b87da85cf79a
- right_prompt_hash: b87da85cf79a

## Run Overview
| run | provider | rule_version | total | fit | adjacent | badcase | badcase率 | <0 | 0-9 | 10-19 | 20+ |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| nox@prompt:b87da85cf79a | nox | prompt:b87da85cf79a | 250 | 182 | 61 | 7 | 2.8% | 0 | 7 | 14 | 229 |
| xtb@prompt:b87da85cf79a | xtb | prompt:b87da85cf79a | 250 | 191 | 36 | 23 | 9.2% | 2 | 20 | 10 | 218 |

## Page-Level Badcase Rate
| page | nox@prompt:b87da85cf79a_total | nox@prompt:b87da85cf79a_badcase | nox@prompt:b87da85cf79a_badcase率 | xtb@prompt:b87da85cf79a_total | xtb@prompt:b87da85cf79a_badcase | xtb@prompt:b87da85cf79a_badcase率 | badcase率差 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 50 | 1 | 2.0% | 50 | 5 | 10.0% | -8.0% |
| 2 | 50 | 4 | 8.0% | 50 | 3 | 6.0% | 2.0% |
| 3 | 50 | 0 | 0.0% | 50 | 6 | 12.0% | -12.0% |
| 4 | 50 | 1 | 2.0% | 50 | 5 | 10.0% | -8.0% |
| 5 | 50 | 1 | 2.0% | 50 | 4 | 8.0% | -6.0% |

## Badcase Overlap
| metric | count |
| --- | --- |
| shared_badcase | 5 |
| nox@prompt:b87da85cf79a_only_badcase | 2 |
| xtb@prompt:b87da85cf79a_only_badcase | 18 |

## Badcase Cause Summary
| provider | category | count |
| --- | --- | --- |
| nox@prompt:b87da85cf79a | 其他 | 5 |
| nox@prompt:b87da85cf79a | 娱乐/儿童/泛内容偏离 | 2 |
| xtb@prompt:b87da85cf79a | 其他 | 10 |
| xtb@prompt:b87da85cf79a | 娱乐/儿童/泛内容偏离 | 7 |
| xtb@prompt:b87da85cf79a | 泛相关性偏离 | 4 |
| xtb@prompt:b87da85cf79a | 证据缺失或信号不足 | 1 |
| xtb@prompt:b87da85cf79a | 宠物/动物受众冲突 | 1 |

## Shared Badcases
| channel | nox@prompt:b87da85cf79a | xtb@prompt:b87da85cf79a |
| --- | --- | --- |
| Beauty 뷰티 ASMR | ASMR音频/氛围向，和美妆产品推广格式明显不匹配 | ASMR+歌曲混搭，与美妆推广错位 |
| La La Life Emoji | 主内容偏娱乐挑战，美妆标签不构成可推广定位 | 娱乐挑战占主导，美妆标签不足以支撑推广 |
| INSTAGRAM YULDUZLARI | 主内容偏餐饮烹饪，与美妆推广不匹配 | 美食烹饪为主，beauty仅弱相关 |
| REXSY Romantic Piano Symphonics Ecstasy | 主内容偏音乐演奏，与美妆推广不匹配 | 音乐娱乐为主，beauty仅附带词，投放场景不匹配 |
| Aura Vibe | beauty命中，但ASMR+娱乐占主导，强格式不匹配 | ASMR+娱乐为主，不适合美妆推广 |

## nox@prompt:b87da85cf79a-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 60 | BRONWIN AURORA | 0 | 主内容偏博彩和音乐，和美妆推广不匹配 |
| 176 | Nadina Ioana Shorts | 5 | ASMR/吃播为主，虽有美妆词但投放场景明显不匹配 |

## xtb@prompt:b87da85cf79a-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 6 | ailee ౨ৎ | 8 | 以显化/潜意识内容为主，不是美妆推广频道 |
| 8 | TeenBeat | 8 | 娱乐恶搞为主，不适合美妆推广 |
| 15 | La La Life Planet | 8 | 娱乐恶搞为主，不适合美妆推广 |
| 50 | JadeyWadey 180 | 12 | 以ASMR/放松为主，不适合美妆推广 |
| 60 | RAINY VIBES | 0 | 与美妆无关，偏subliminal/健康/食谱 |
| 83 | VOGUE POP | 5 | 偏明星剪辑娱乐向，不适合美妆推广 |
| 94 | Jessi Lee Davis | 5 | storytime/恐怖叙事占主，推广场景不合适 |
| 107 | Madison Ryann Ward | 0 | 纯音乐频道，与美妆推广无关 |
| 136 | Witty Bitty | 10 | 娱乐挑战为主，美妆仅弱相关，转化场景弱 |
| 140 | Julia Tiffany | 5 | ASMR格式为主，beauty仅弱提及，推广错配 |
| 155 | MuniSanchez | 0 | 无美妆相关标签，偏旅行日常 vlog |
| 181 | ʚ loveybuns ɞ | 0 | 无标签，无法建立与beauty的相关证据 |
| 184 | R-Teens | -15 | 宠物和娱乐为主，与beauty推广明显冲突 |
| 195 | IslaASMR | 5 | ASMR为主，属于强格式错配 |
| 218 | Maddyreviews ASMR | 8 | 命中 beauty，但频道以ASMR为主，推广形态不匹配 |
| 233 | million dollar woman | 0 | 偏音乐/灵性内容，与美妆无关 |
| 236 | radmiru | -15 | ASMR吃播，与商品推广格式强冲突 |
| 250 | Demi💋 | 0 | 无美妆主题，偏手工生活内容 |

## Notes
- Page-level rates use `page_size` from each run metadata.
- Cause categories are heuristic clusters from `why_short`; review representative rows before making product decisions.
