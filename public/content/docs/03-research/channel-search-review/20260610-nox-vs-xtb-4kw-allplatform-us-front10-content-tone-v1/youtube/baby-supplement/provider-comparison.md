# Channel Search Provider Comparison

- keyword: baby supplement
- platform: youtube
- country: US
- left: nox@content-tone-llm-v1 (tmp/channel-search-review/20260610-nox-vs-xtb-4kw-allplatform-us-front10-content-tone-v1/youtube/baby-supplement/nox-youtube)
- right: xtb@content-tone-llm-v1 (tmp/channel-search-review/20260610-nox-vs-xtb-4kw-allplatform-us-front10-content-tone-v1/youtube/baby-supplement/xtb-youtube)
- left_rule_version: content-tone-llm-v1
- right_rule_version: content-tone-llm-v1
- left_prompt_hash: 1228e2ff575f
- right_prompt_hash: 1228e2ff575f

## Run Overview
| run | provider | rule_version | total | fit | adjacent | badcase | badcase率 | <0 | 0-9 | 10-19 | 20+ |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| nox@content-tone-llm-v1 | nox | content-tone-llm-v1 | 148 | 39 | 58 | 51 | 34.5% | 0 | 148 | 0 | 0 |
| xtb@content-tone-llm-v1 | xtb | content-tone-llm-v1 | 165 | 39 | 70 | 56 | 33.9% | 0 | 165 | 0 | 0 |

## Page-Level Badcase Rate
| page | nox@content-tone-llm-v1_total | nox@content-tone-llm-v1_badcase | nox@content-tone-llm-v1_badcase率 | xtb@content-tone-llm-v1_total | xtb@content-tone-llm-v1_badcase | xtb@content-tone-llm-v1_badcase率 | badcase率差 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 50 | 17 | 34.0% | 50 | 15 | 30.0% | 4.0% |
| 2 | 50 | 11 | 22.0% | 50 | 14 | 28.0% | -6.0% |
| 3 | 48 | 23 | 47.9% | 50 | 21 | 42.0% | 5.9% |
| 4 | 0 | 0 | 0.0% | 15 | 6 | 40.0% | -40.0% |

## Badcase Overlap
| metric | count |
| --- | --- |
| shared_badcase | 49 |
| nox@content-tone-llm-v1_only_badcase | 2 |
| xtb@content-tone-llm-v1_only_badcase | 7 |

## Badcase Cause Summary
| provider | category | count |
| --- | --- | --- |
| nox@content-tone-llm-v1 | 其他 | 18 |
| nox@content-tone-llm-v1 | 泛相关性偏离 | 14 |
| nox@content-tone-llm-v1 | 宠物/动物受众冲突 | 8 |
| nox@content-tone-llm-v1 | 证据缺失或信号不足 | 6 |
| nox@content-tone-llm-v1 | 娱乐/儿童/泛内容偏离 | 4 |
| nox@content-tone-llm-v1 | 科技/电子垂类偏离 | 1 |
| xtb@content-tone-llm-v1 | 其他 | 24 |
| xtb@content-tone-llm-v1 | 泛相关性偏离 | 10 |
| xtb@content-tone-llm-v1 | 宠物/动物受众冲突 | 9 |
| xtb@content-tone-llm-v1 | 证据缺失或信号不足 | 8 |
| xtb@content-tone-llm-v1 | 娱乐/儿童/泛内容偏离 | 4 |
| xtb@content-tone-llm-v1 | 科技/电子垂类偏离 | 1 |

## Shared Badcases
| channel | nox@content-tone-llm-v1 | xtb@content-tone-llm-v1 |
| --- | --- | --- |
| Wildlife Animals Daily | 动物宝宝内容，与人用婴儿补剂受众明显不符 | 野生动物幼崽频道，和人类婴儿补充剂没有可推广关系 |
| Red Eye Loft | 鸽子爱好频道，与婴儿补剂完全无关 | 信鸽/鸽子爱好频道，与婴儿补充剂完全不相关 |
| VigorousSteve | 类固醇和增肌话题，与婴儿补剂目标受众冲突 | 成人健身药物/增肌讨论频道，和婴童补充剂场景冲突 |
| Zion Creek Farm | 农场动物内容，与人用婴儿补剂不相关 | 山羊和农场自营内容为主，不适合人类婴儿补充剂推广 |
| Nick Ortego | 健身药物与男性增肌话题，和宝宝补剂受众冲突 | 成人健身与激素补剂频道，不适合婴儿补充剂推广 |
| FoundMyFitness Clips | 长寿/运动/激素科普，与婴儿补剂无直接关联 | 成人健康科普频道，缺少母婴受众和婴儿补充剂语境 |
| FitLife Fix | 纯科技线缆频道，和婴儿补剂完全不相关 | 纯科技硬件评测频道，与婴儿补充剂场景无关 |
| Muscular Development Magazine | 健美/类固醇/赛况频道，与婴儿补剂受众明显不符 | 成人健美和 PEDS 受众，和婴儿补剂场景明显冲突 |
| Shassy’s Walkabout. | 宠物/自然散步内容，和人用婴儿补剂受众不匹配 | 猫狗自然短片为主，和人用婴儿补剂无关 |
| Newborn Monkey Daily | 动物幼猴日常，和人类婴儿补剂受众不一致 | 猴子日常和喂奶故事，动物内容不适合人类婴儿补剂 |
| Khám Phá Ấn Độ | 持续是幼猴喝奶日常，缺少人类母婴消费场景 | 核心是幼猴喂奶日常，和人类婴儿补剂不匹配 |
| Malori Mayor | 军旅搬家/签证/家庭生活为主，婴儿补剂承载弱 | 军旅搬家生活为主，和母婴补剂推广几乎无关 |
| Sweet Justice | 悬疑/戏剧化家庭故事，不是可承接商品推广的育儿频道 | 剧情化家庭惊悚叙事，不是母婴消费或育儿建议频道 |
| Ivet Parris | 美妆护肤频道，和婴儿补剂受众明显不符 | 美妆护肤和奢侈品为主，和婴儿补剂受众不相干 |
| Haywire Homestead | 农场动物与种植内容，不适合婴儿补剂推广 | 农场动物内容为主，不是人类婴儿补剂受众 |
| My Dog Supplement | 犬类补剂频道，宠物受众与人类婴儿不匹配 | 宠物狗食品和狗补剂频道，不适配默认的人用婴儿补剂 |
| Monkey Baby Ni | 幼猴喂养内容，非人类婴儿母婴消费场景 | 猴子宠物内容，受众和人用婴童补充剂完全不匹配 |
| Doctor T | 娱乐八卦和剧情内容为主，和婴儿补充剂完全不搭 | 以娱乐/剧情/奇闻为主，几乎没有母婴或补剂购买承载 |
| Jaime James Intuitive | 灵性塔罗内容与婴儿补充剂无关，受众也不匹配 | 灵性塔罗号，受众与婴儿营养补剂完全不在同一消费场景 |
| CBNation.co: CBNation TV | 商业和领导力内容与婴儿补充剂基本无关 | 商业播客号，内容与宝宝补剂无直接关联 |
| Cotton Bean Goat Farms | 动物农场和宝宝山羊内容，默认人用婴儿补充剂不适配 | 内容是山羊幼崽与农场生活，不是人类婴儿补充剂场景 |
| Raine Dabneysd | 剧情短剧为主，与婴儿营养补充无关 | 以戏剧、爱情和体育内容为主，和婴儿补充剂无关 |
| MYMY FUN | 主要是锻造和宠物内容，与婴儿补充剂无关 | 核心是锻造/黑smith和狗内容，与婴儿补充剂受众完全不搭 |
| Bailey And Bella The Goldens | 狗狗日常频道，受众与婴儿补充剂完全不符 | 全是金毛狗日常，受众和商品场景都不适合 |
| LuckyCBDLife | 内容杂且偏推广投放，不适合婴儿补充剂 | 旅行/联盟营销/健康促销混杂，缺少婴儿或家庭喂养调性 |
| Mousetales | 野生动物救助频道，与婴儿补充剂无关 | 野生动物救助频道，动物向受众不适合婴儿补充剂推广 |
| Dahuazi Xiaoyanzi | 夫妻搞笑短剧频道，没有婴儿商品承载 | 夫妻搞笑短剧为主，和婴儿营养产品的购买语境不匹配 |
| Funny and Humorous Channel | 喜剧娱乐内容为主，与婴儿补剂消费场景不符 | 纯搞笑内容，受众和商品购买场景明显不匹配 |
| Angie Resells | 二手清仓直播与婴儿补剂场景不匹配 | 直播清仓卖衣服鞋包，和婴儿补充剂无关 |
| Chris and Gina, THE BULL SOURCE | 宠物犬舍频道，受众是犬类繁育，不适合人用婴儿补剂 | 斗牛犬繁育和赛事内容，宠物向受众不适合人用婴儿补充剂 |

## nox@content-tone-llm-v1-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 52 | Brittany Olga |  | 纯 homeschool 和书单内容，和婴儿补充剂几乎无承接 |
| 117 | Intimate Rose |  | 成人私密健康工具频道，与婴儿补剂目标人群不符 |

## xtb@content-tone-llm-v1-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 6 | Baby Velora |  | 以情绪化短句和泛母婴感叹为主，缺少可承载商品推广的内容结构 |
| 10 | 杨梅 |  | 频道主体杂乱且娱乐内容占比高，婴童补充剂相关性不足 |
| 84 | Annie Wang Tamaki |  | 美妆护肤频道，缺少宝宝或家长补剂场景 |
| 90 | Stefan Rivera Clack |  | 健身训练号，受众是训练人群，不适合婴儿补剂推广 |
| 106 | Philipp Karner |  | 长寿、肽、头发和成人健康为主，受众偏成人，与婴儿补充剂明显错位 |
| 118 | Jasmine Klein |  | 工作妈妈、理财、医美为主，几乎没有婴儿/育儿营养内容 |
| 158 | Adrian Gledhill |  | 减重/甲状腺内容为主，和婴儿补充剂目标人群不匹配 |

## Notes
- Page-level rates use `page_size` from each run metadata.
- Cause categories are heuristic clusters from `why_short`; review representative rows before making product decisions.
