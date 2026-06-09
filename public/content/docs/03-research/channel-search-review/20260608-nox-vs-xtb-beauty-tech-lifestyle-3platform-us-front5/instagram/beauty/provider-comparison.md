# Channel Search Provider Comparison

- keyword: beauty
- platform: instagram
- country: us
- left: nox@prompt:b87da85cf79a (tmp/channel-search-review/20260608-nox-vs-xtb-beauty-tech-lifestyle-3platform-us-front5/instagram/beauty/nox-instagram)
- right: xtb@prompt:b87da85cf79a (tmp/channel-search-review/20260608-nox-vs-xtb-beauty-tech-lifestyle-3platform-us-front5/instagram/beauty/xtb-instagram)
- left_rule_version: prompt:b87da85cf79a
- right_rule_version: prompt:b87da85cf79a
- left_prompt_hash: b87da85cf79a
- right_prompt_hash: b87da85cf79a

## Run Overview
| run | provider | rule_version | total | fit | adjacent | badcase | badcase率 | <0 | 0-9 | 10-19 | 20+ |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| nox@prompt:b87da85cf79a | nox | prompt:b87da85cf79a | 250 | 229 | 16 | 5 | 2.0% | 0 | 6 | 3 | 241 |
| xtb@prompt:b87da85cf79a | xtb | prompt:b87da85cf79a | 250 | 223 | 19 | 8 | 3.2% | 0 | 13 | 11 | 226 |

## Page-Level Badcase Rate
| page | nox@prompt:b87da85cf79a_total | nox@prompt:b87da85cf79a_badcase | nox@prompt:b87da85cf79a_badcase率 | xtb@prompt:b87da85cf79a_total | xtb@prompt:b87da85cf79a_badcase | xtb@prompt:b87da85cf79a_badcase率 | badcase率差 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 50 | 0 | 0.0% | 50 | 1 | 2.0% | -2.0% |
| 2 | 50 | 4 | 8.0% | 50 | 2 | 4.0% | 4.0% |
| 3 | 50 | 0 | 0.0% | 50 | 3 | 6.0% | -6.0% |
| 4 | 50 | 1 | 2.0% | 50 | 0 | 0.0% | 2.0% |
| 5 | 50 | 0 | 0.0% | 50 | 2 | 4.0% | -4.0% |

## Badcase Overlap
| metric | count |
| --- | --- |
| shared_badcase | 2 |
| nox@prompt:b87da85cf79a_only_badcase | 3 |
| xtb@prompt:b87da85cf79a_only_badcase | 6 |

## Badcase Cause Summary
| provider | category | count |
| --- | --- | --- |
| nox@prompt:b87da85cf79a | 娱乐/儿童/泛内容偏离 | 4 |
| nox@prompt:b87da85cf79a | 其他 | 1 |
| xtb@prompt:b87da85cf79a | 证据缺失或信号不足 | 5 |
| xtb@prompt:b87da85cf79a | 其他 | 3 |

## Shared Badcases
| channel | nox@prompt:b87da85cf79a | xtb@prompt:b87da85cf79a |
| --- | --- | --- |
| Wowee | 娱乐梗图为主，beauty 只是点缀 | 幽默梗内容，缺少美容相关信号 |
| Kristy Sarah | 以娱乐反应为主，美妆标签支撑不足 | 缺少美妆相关标签，偏娱乐反应向 |

## nox@prompt:b87da85cf79a-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 73 | Misty Jean | 8 | 音乐舞蹈娱乐向为主，beauty 露出弱 |
| 85 | 🌼Jenny: •Skincare •Beauty tips | 8 | ASMR/家居工具感强，和美妆推广不匹配 |
| 188 | Black_beautifulclassy | 8 | 内容偏孩子和娱乐，美容标签不足以支撑投放 |

## xtb@prompt:b87da85cf79a-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 37 | amber kosisky | 0 | 无标签相关信号，难判断匹配 |
| 53 | Acc0unt for S@le | 0 | 无美妆相关标签或内容信号 |
| 114 | Blake Lively | 0 | 仅娱乐标签，缺少美容相关证据 |
| 143 | hailee steinfeld | 0 | 娱乐号，缺少美妆相关受众 |
| 230 | Paulina Porizkova | 0 | 无美妆相关信号，和 beauty 推广不匹配 |
| 245 | Nia Long | 0 | 无 beauty 相关标签，和美妆推广不匹配 |

## Notes
- Page-level rates use `page_size` from each run metadata.
- Cause categories are heuristic clusters from `why_short`; review representative rows before making product decisions.
