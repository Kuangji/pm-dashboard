# Channel Search Provider Comparison

- keyword: beauty
- platform: youtube
- country: us
- left: nox@prompt:b87da85cf79a (/Users/yukuangji/Work/NoxInfluencer/pm-workspace/drafts/tmp/channel-search-review/20260609-nox-vs-xtb-21kw-3platform-us-front5-promotion-capacity-v1/youtube/beauty/nox-youtube)
- right: xtb@prompt:b87da85cf79a (/Users/yukuangji/Work/NoxInfluencer/pm-workspace/drafts/tmp/channel-search-review/20260609-nox-vs-xtb-21kw-3platform-us-front5-promotion-capacity-v1/youtube/beauty/xtb-youtube)
- left_rule_version: prompt:b87da85cf79a
- right_rule_version: prompt:b87da85cf79a
- left_prompt_hash: b87da85cf79a
- right_prompt_hash: b87da85cf79a

## Run Overview
| run | provider | rule_version | total | fit | adjacent | badcase | badcase率 | <0 | 0-9 | 10-19 | 20+ |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| nox@prompt:b87da85cf79a | nox | prompt:b87da85cf79a | 250 | 183 | 59 | 8 | 3.2% | 0 | 4 | 10 | 236 |
| xtb@prompt:b87da85cf79a | xtb | prompt:b87da85cf79a | 250 | 169 | 41 | 40 | 16.0% | 7 | 53 | 10 | 180 |

## Page-Level Badcase Rate
| page | nox@prompt:b87da85cf79a_total | nox@prompt:b87da85cf79a_badcase | nox@prompt:b87da85cf79a_badcase率 | xtb@prompt:b87da85cf79a_total | xtb@prompt:b87da85cf79a_badcase | xtb@prompt:b87da85cf79a_badcase率 | badcase率差 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 50 | 1 | 2.0% | 50 | 8 | 16.0% | -14.0% |
| 2 | 50 | 5 | 10.0% | 50 | 4 | 8.0% | 2.0% |
| 3 | 50 | 0 | 0.0% | 50 | 10 | 20.0% | -20.0% |
| 4 | 50 | 1 | 2.0% | 50 | 10 | 20.0% | -18.0% |
| 5 | 50 | 1 | 2.0% | 50 | 8 | 16.0% | -14.0% |

## Badcase Overlap
| metric | count |
| --- | --- |
| shared_badcase | 4 |
| nox@prompt:b87da85cf79a_only_badcase | 4 |
| xtb@prompt:b87da85cf79a_only_badcase | 36 |

## Badcase Cause Summary
| provider | category | count |
| --- | --- | --- |
| nox@prompt:b87da85cf79a | 其他 | 4 |
| nox@prompt:b87da85cf79a | 娱乐/儿童/泛内容偏离 | 3 |
| nox@prompt:b87da85cf79a | 证据缺失或信号不足 | 1 |
| xtb@prompt:b87da85cf79a | 证据缺失或信号不足 | 18 |
| xtb@prompt:b87da85cf79a | 其他 | 9 |
| xtb@prompt:b87da85cf79a | 娱乐/儿童/泛内容偏离 | 8 |
| xtb@prompt:b87da85cf79a | 泛相关性偏离 | 4 |
| xtb@prompt:b87da85cf79a | 宠物/动物受众冲突 | 1 |

## Shared Badcases
| channel | nox@prompt:b87da85cf79a | xtb@prompt:b87da85cf79a |
| --- | --- | --- |
| Beauty 뷰티 ASMR | ASMR音频娱乐为主，不适合美妆产品推广 | ASMR主导，虽有美妆词但推广格式不合适 |
| Julia Tiffany | 带ASMR属性，偏声音氛围，不适合美妆投放 | ASMR主导，虽有美妆词但不适合推广 |
| REXSY Romantic Piano Symphonics Ecstasy | 以音乐表演为主，和美妆产品推广场景不匹配 | 主域是音乐，beauty仅弱标签，不适合美妆投放 |
| Aura Vibe | 娱乐/ASMR导向，和美妆投放不匹配 | ASMR/娱乐主导，不适合美妆投放 |

## nox@prompt:b87da85cf79a-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 58 | La La Life Emoji | 10 | 内容以娱乐挑战为主，beauty 只是附带标签 |
| 59 | BRONWIN AURORA | 8 | 博彩/音乐导向，和美妆投放场景不匹配 |
| 82 | ailee ౨ৎ | 10 | 以manifestation为主，缺少产品推广场景 |
| 176 | Nadina Ioana Shorts | 8 | 美妆命中但ASMR/助眠/吃播导向强，不适合产品推广 |

## xtb@prompt:b87da85cf79a-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 12 | Madison Ryann Ward | 0 | 纯音乐频道，与美妆无关 |
| 25 | MuniSanchez | 0 | 旅行日常频道，与美妆无关 |
| 27 | ʚ loveybuns ɞ | 0 | 无标签、无内容证据，无法判断为美妆相关 |
| 31 | بندر الحربى | 0 | 无可用标签和内容证据 |
| 32 | million dollar woman | 0 | 生活方式/音乐向，缺少美妆推广信号 |
| 33 | radmiru | -15 | ASMR/mukbang 格式与美妆推广强不匹配 |
| 48 | brvlcon | -15 | 军政新闻向，与美妆推广明显不符 |
| 57 | Luisa Piou | 0 | 缺少 beauty 相关内容，偏泛时尚生活 |
| 65 | Priscilla Ono | 0 | 仅 lifestyle，缺少 beauty 相关证据 |
| 76 | JennyMcCarthyTV | 0 | 娱乐影视向，无美妆相关证据 |
| 83 | IslaASMR | 8 | ASMR刷发格式与美妆推广不匹配 |
| 105 | Eli Gomez | 0 | 无可用标签，无法判断为beauty相关 |
| 118 | Kylie Volkers | 0 | 只有lifestyle，缺少beauty相关证据 |
| 122 | Sara Hesri | 0 | 娱乐/情侣喜剧为主，与beauty投放不匹配 |
| 123 | CB Shorts | 0 | 车辆/农机内容，和beauty完全无关 |
| 129 | Skai Jackson | 0 | 仅生活方式标签，和美妆推广关联很弱 |
| 135 | Alibaba Utilities | 0 | 兴趣杂项频道，与美妆投放不匹配 |
| 138 | Abigail Lutz | 0 | 娱乐生活向频道，与美妆推广关联很弱 |
| 140 | Ember West | 0 | 娱乐音乐向频道，不适合美妆产品推广 |
| 145 | CaPriel Annissa | 0 | 无有效标签，无法判断为美妆相关 |
| 164 | DreamLook_Jg | 0 | 无标签无内容证据，无法判断为美妆相关 |
| 165 | Maddyreviews ASMR | 8 | ASMR为主，和美妆推广场景明显不匹配 |
| 175 | La La Life | 5 | 以娱乐恶搞为主，不适合美妆推广 |
| 188 | Skyami | 0 | 缺少美妆相关信号，相关性弱 |
| 191 | Caitlin Thexton | 0 | 缺少美妆相关信号，相关性弱 |
| 195 | Gawee | 0 | 缺少美妆相关信号，相关性弱 |
| 196 | Angela Chalet | 0 | 缺少美妆相关信号，相关性弱 |
| 200 | Ana Beauty | 0 | 缺少美妆相关信号，相关性弱 |
| 202 | Jermaine Williams | 0 | 无标签无内容证据，无法判断与beauty相关 |
| 205 | Bretman Rock | 0 | 偏娱乐搞笑，缺少beauty或美妆推广证据 |

## Notes
- Page-level rates use `page_size` from each run metadata.
- Cause categories are heuristic clusters from `why_short`; review representative rows before making product decisions.
