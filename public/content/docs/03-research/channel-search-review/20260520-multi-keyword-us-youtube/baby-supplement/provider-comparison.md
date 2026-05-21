# Channel Search Provider Comparison

- keyword: baby supplement
- platform: youtube
- country: us
- left: nox
- right: debugger
- left_rule_version: -
- right_rule_version: -
- left_prompt_hash: -
- right_prompt_hash: -

## Run Overview
| run | provider | rule_version | total | fit | adjacent | badcase | badcase率 | <0 | 0-9 | 10-19 | 20+ |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| nox | nox | - | 134 | 10 | 31 | 93 | 69.4% | 21 | 100 | 13 | 0 |
| debugger | debugger | - | 133 | 15 | 42 | 76 | 57.1% | 22 | 91 | 20 | 0 |

## Page-Level Badcase Rate
| page | nox_total | nox_badcase | nox_badcase率 | debugger_total | debugger_badcase | debugger_badcase率 | badcase率差 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 50 | 34 | 68.0% | 50 | 14 | 28.0% | 40.0% |
| 2 | 50 | 33 | 66.0% | 50 | 38 | 76.0% | -10.0% |
| 3 | 34 | 26 | 76.5% | 33 | 24 | 72.7% | 3.7% |

## Badcase Overlap
| metric | count |
| --- | --- |
| shared_badcase | 73 |
| nox_only_badcase | 20 |
| debugger_only_badcase | 3 |

## Badcase Cause Summary
| provider | category | count |
| --- | --- | --- |
| nox | 证据缺失或信号不足 | 50 |
| nox | 其他 | 22 |
| nox | 宠物/动物受众冲突 | 11 |
| nox | 娱乐/儿童/泛内容偏离 | 8 |
| nox | 泛相关性偏离 | 2 |
| debugger | 其他 | 26 |
| debugger | 证据缺失或信号不足 | 24 |
| debugger | 泛相关性偏离 | 11 |
| debugger | 宠物/动物受众冲突 | 9 |
| debugger | 娱乐/儿童/泛内容偏离 | 5 |
| debugger | 科技/电子垂类偏离 | 1 |

## Shared Badcases
| channel | nox | debugger |
| --- | --- | --- |
| Wildlife Animals Daily | 动物娱乐内容，和人类婴儿补充剂明显冲突 | 动物/猴子内容与人类婴儿补充剂受众冲突 |
| Red Eye Loft | 宠物向频道，和人类婴儿补充剂不匹配 | 鸽子/宠物垂直内容，与婴儿补充剂互斥 |
| VigorousSteve | 增肌/类固醇内容，和婴儿补充剂受众完全不同 | 类固醇健身向，与婴儿补剂目标冲突 |
| Capra Trynowski | 无标签无内容，缺少召回依据 | 无可用主题信号，无法判断相关 |
| Hefferon Hosfeld | 无标签无内容，缺少召回依据 | 无母婴补剂相关信号 |
| paloma | 无标签无内容，缺少召回依据 | 无可用主题信号，无法判断相关 |
| FitLife Fix | 无标签无内容，缺少召回依据 | 电子产品/游戏向，与婴儿补充剂明显不相关 |
| The Amazing Johnsons | 泛生活旅游内容，缺少母婴相关信号 | 家庭 vlog 但缺少母婴护理或营养信号 |
| Muscular Development Magazine | 健美健身号仅有泛健康词，与婴儿补充剂购买场景弱相关 | 健美健身成人向，与婴儿补充剂不匹配 |
| Shassy’s Walkabout. | 无标签无内容，缺少可判断的婴儿补充剂相关信号 | 动物内容，和婴儿补剂受众不匹配 |
| CONCEIVE PLUS | 偏受孕品牌名，未见婴儿营养或护理语义 | 无母婴补剂相关信号 |
| Newborn Monkey Daily | 猴类内容，属于动物赛道，和人类婴儿补充剂冲突 | 猴子育儿内容，明显非人类婴儿受众 |
| Khám Phá Ấn Độ | 无标签无内容，无法支撑婴儿补充剂推广 | 无可用主题信号，无法判断相关 |
| Dabaiming Evaluation | 无标签无内容，无法支撑婴儿补充剂推广 | 无可用主题信号，无法判断相关 |
| Hillary Sadler | 无标签无内容，缺少婴儿补充剂相关信号 | 无标签/无内容证据，无法支持相关性 |
| Kathey Pancholi | 无标签无内容，缺少婴儿补充剂相关信号 | 无标签/无内容证据，无法支持相关性 |
| Emmalee Anne | 无标签无内容，缺少婴儿补充剂相关信号 | 无母婴补剂相关信号 |
| NextGen Zone | 无标签和内容证据，难判断为婴儿补充剂推广相关 | 无可用主题信号，无法判断相关 |
| Sweet Justice | 故事/Reddit娱乐向，和婴儿补充剂推广不适配 | 剧情故事向，属于明显不相干内容 |
| Ivet Parris | 美妆/时尚为主，缺少婴儿补充剂相关语义 | 美妆时尚向，与婴儿补剂不匹配 |
| Rachel Donovan | 美妆为主，虽有 baby 词但不是婴儿补充剂受众 | 以美妆生活为主，婴儿补充剂相关性弱 |
| Haywire Homestead | 农场/宠物/种植向，与婴儿补充剂无关 | 畜牧内容，与婴儿补剂受众不符 |
| My Dog Supplement | 狗狗补充剂频道，明显是宠物赛道 | 宠物补充剂频道，与人类婴儿补充剂不匹配 |
| Monkey Baby Ni | 猴类娱乐内容，属于动物赛道，不适合婴儿补充剂 | 动物向内容，和人类婴儿补剂冲突 |
| Nanning First Sister | 仅有 baby 泛标签，娱乐/日常为主，推广价值弱 | 儿童娱乐号，和补剂推广不匹配 |
| Ly Thi Ly - Daily Vlog | 无婴儿或营养相关信号 | 农家日常/做饭向，缺少母婴营养意图 |
| Doctor T | 宗教/车辆内容，无婴儿营养相关性 | 宗教/车辆杂项频道，相关性很弱 |
| Brooklyn Larsen | 美妆生活频道，和婴儿补充剂只有弱泛关联 | 生活方式/穿搭向，母婴补充剂相关性弱 |
| Annie Wang Tamaki | 美妆护肤为主，只有泛健康关联 | 护肤美妆号，和婴儿补剂无关 |
| Jaime James Intuitive | 无可用标签信号 | 灵性塔罗内容，与母婴补充剂无关 |

## nox-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 6 | Taylor L | 1 | 泛健康/美容内容，缺少婴儿或营养场景 |
| 13 | Nordic Naturals | 0 | 泛健康内容，缺少婴儿受众信号 |
| 17 | Nick Ortego | 0 | 通用健康生活方式内容，婴儿场景弱 |
| 18 | FoundMyFitness Clips | 0 | 成人营养科普为主，缺少婴儿受众 |
| 22 | Ben Says Things | 0 | 旅游娱乐和数码杂谈，和婴儿补充剂无关 |
| 33 | Richa Mundhra | 0 | 生活方式与娱乐向，缺少婴儿或营养语义 |
| 36 | Malori Mayor | 1 | 家居/购物分享为主，仅有泛健康词，婴儿补充剂关联弱 |
| 39 | Online Product Store | 2 | 泛品类店铺号，缺少婴儿营养/护理语义 |
| 40 | Mosie Baby | 3 | 备孕/受孕主题为主，不是婴儿补充剂场景 |
| 46 | TisKaVo | 0 | 无标签无内容，缺少可判断信号 |
| 65 | Lydia | Know Your Cycle | 0 | 无标签且无婴儿相关内容证据 |
| 80 | Philipp Karner | 1 | 仅成人健康泛相关，不适合婴儿补充剂 |
| 81 | Tiny Humans 101 | 0 | 缺少母婴或补充剂相关信号 |
| 86 | GOOD FAMILY | 1 | 泛娱乐健康向，缺少婴儿喂养意图 |
| 89 | The Mommy Care Kit | 0 | 无可用标签，无法确认母婴相关性 |
| 94 | Jasmine Klein | 0 | 缺少母婴或补充剂相关信号 |
| 95 | Lindsey Elmore | 1 | 仅健康播客泛相关，缺少婴儿场景 |
| 98 | Feelin' Fab With Kayla | 2 | 健康饮食向，缺少婴儿补充剂意图 |
| 101 | Grapefruit's Daily Life | 2 | 婴儿娱乐向，缺少营养/护理/购买意图 |
| 117 | DAE HWANG | 0 | 无标签无内容，相关性不足 |

## debugger-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 86 | Zia Mann | 0 | 无母婴补剂相关信号 |
| 90 | Mom TV | -5 | 猴子内容为主，非人类婴儿受众 |
| 117 | BaBy Cute | 0 | 童装/服饰向，不是营养护理场景 |

## Notes
- Page-level rates use `page_size` from each run metadata.
- Cause categories are heuristic clusters from `why_short`; review representative rows before making product decisions.
