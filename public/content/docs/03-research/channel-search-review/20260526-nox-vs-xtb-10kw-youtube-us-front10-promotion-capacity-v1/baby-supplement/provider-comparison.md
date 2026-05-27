# Channel Search Provider Comparison

- keyword: baby supplement
- platform: youtube
- country: US
- left: nox@promotion-capacity-v1 (tmp/channel-search-review/20260526-nox-vs-xtb-10kw-youtube-us-front10-promotion-capacity-v1/baby-supplement/nox-youtube)
- right: xtb@promotion-capacity-v1 (tmp/channel-search-review/20260526-nox-vs-xtb-10kw-youtube-us-front10-promotion-capacity-v1/baby-supplement/xtb-youtube)
- left_rule_version: promotion-capacity-v1
- right_rule_version: promotion-capacity-v1
- left_prompt_hash: b87da85cf79a
- right_prompt_hash: b87da85cf79a

## Run Overview
| run | provider | rule_version | total | fit | adjacent | badcase | badcase率 | <0 | 0-9 | 10-19 | 20+ |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| nox@promotion-capacity-v1 | nox | promotion-capacity-v1 | 135 | 7 | 56 | 72 | 53.3% | 19 | 108 | 8 | 0 |
| xtb@promotion-capacity-v1 | xtb | promotion-capacity-v1 | 187 | 38 | 84 | 65 | 34.8% | 81 | 71 | 32 | 3 |

## Page-Level Badcase Rate
| page | nox@promotion-capacity-v1_total | nox@promotion-capacity-v1_badcase | nox@promotion-capacity-v1_badcase率 | xtb@promotion-capacity-v1_total | xtb@promotion-capacity-v1_badcase | xtb@promotion-capacity-v1_badcase率 | badcase率差 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 50 | 24 | 48.0% | 50 | 6 | 12.0% | 36.0% |
| 2 | 50 | 27 | 54.0% | 50 | 20 | 40.0% | 14.0% |
| 3 | 35 | 21 | 60.0% | 50 | 21 | 42.0% | 18.0% |
| 4 | 0 | 0 | 0.0% | 37 | 18 | 48.6% | -48.6% |

## Badcase Overlap
| metric | count |
| --- | --- |
| shared_badcase | 45 |
| nox@promotion-capacity-v1_only_badcase | 27 |
| xtb@promotion-capacity-v1_only_badcase | 20 |

## Badcase Cause Summary
| provider | category | count |
| --- | --- | --- |
| nox@promotion-capacity-v1 | 证据缺失或信号不足 | 38 |
| nox@promotion-capacity-v1 | 其他 | 15 |
| nox@promotion-capacity-v1 | 宠物/动物受众冲突 | 11 |
| nox@promotion-capacity-v1 | 泛相关性偏离 | 6 |
| nox@promotion-capacity-v1 | 娱乐/儿童/泛内容偏离 | 2 |
| xtb@promotion-capacity-v1 | 其他 | 22 |
| xtb@promotion-capacity-v1 | 娱乐/儿童/泛内容偏离 | 15 |
| xtb@promotion-capacity-v1 | 证据缺失或信号不足 | 10 |
| xtb@promotion-capacity-v1 | 宠物/动物受众冲突 | 10 |
| xtb@promotion-capacity-v1 | 泛相关性偏离 | 8 |

## Shared Badcases
| channel | nox@promotion-capacity-v1 | xtb@promotion-capacity-v1 |
| --- | --- | --- |
| Wildlife Animals Daily | 动物娱乐频道，和人类婴儿补剂明显冲突 | 动物猴子娱乐内容，和人类婴儿补充剂无关 |
| Red Eye Loft | 宠物/杂项生活号，婴儿补剂相关性很弱 | 鸽子饲养频道，宠物受众与婴儿补充剂错位 |
| VigorousSteve | 成人健身/类固醇向，婴儿补剂不匹配 | 健身增肌频道，和婴儿补充剂人群完全不重合 |
| Nick Ortego | 成人健身号，和婴儿补剂受众不匹配 | 成人健身补剂内容，和婴儿补充品受众不匹配 |
| FitLife Fix | 无标签无证据，相关性不足 | 电子/美妆评测为主，缺少母婴受众 |
| Muscular Development Magazine | 健身健美受众偏离婴儿补剂 | 健美与成人补剂内容为主，目标受众不对 |
| Shassy’s Walkabout. | 无标签无内容，相关证据不足 | 动物/宠物内容，和人类婴儿补充品受众冲突 |
| Newborn Monkey Daily | 猴子宝宝动物向，和人类婴儿补剂冲突 | 猴子内容为主，属于动物受众，直接排除 |
| Khám Phá Ấn Độ | 旅行探索类，和母婴补剂无关 | 猴子日常内容，动物向，和人类婴儿补充品无关 |
| Kathey Pancholi | 无标签无内容，相关证据不足 | 剧情化日常为主，偶有母婴梗，但不适合补充剂投放 |
| Sweet Justice | 故事/Reddit内容偏娱乐，与补剂冲突 | 故事型 Reddit 频道，和婴儿补充品推广强冲突 |
| Haywire Homestead | 山居/宠物方向偏离婴儿补剂 | 农场/宠物向，和人类婴儿补充品不匹配 |
| My Dog Supplement | 狗用补剂，目标是宠物而非婴儿 | 狗狗补充品号，宠物受众与人类婴儿互斥 |
| Monkey Baby Ni | 猴子宝宝动物向，和人类婴儿补剂冲突 | 动物猴子频道，受众与人类婴儿补充剂完全错位 |
| Brittany Olga | homeschool母亲向，缺少婴儿营养/护理语义 | 家庭教育号，和婴儿补充品关联很弱 |
| Ly Thi Ly - Daily Vlog | 纯日常餐食/园艺，和婴儿补充剂无关 | 日常故事号，近期内容与母婴营养无关 |
| Doctor T | 宗教/车辆向，与婴儿补充剂无关 | 娱乐剪辑号，和婴儿补充品完全不相关 |
| Jaime James Intuitive | 无可用标签或视频证据 | 灵性塔罗号，和母婴补充品完全不相干 |
| CBNation.co: CBNation TV | 商业知识向，和婴儿补充剂受众不匹配 | 商业营销号，与婴儿补充品无关 |
| Cotton Bean Goat Farms | 宠物/农场动物向，与人类婴儿补充剂互斥 | 山羊宠物内容，动物受众与婴儿补充剂完全不相关 |
| Keseju Elchimo | 无可用标签或视频证据 | 育儿故事号偏娱乐叙事，缺少商品推广能力 |
| VMV Hypoallergenics | 无标签和内容信号，无法判断为母婴补剂相关 | 护肤品牌号，和婴儿补剂受众不匹配 |
| MYMY FUN | 无标签和内容信号，无法判断为母婴补剂相关 | 锻造工艺号，与婴幼儿补剂无关 |
| Bailey And Bella The Goldens | 宠物频道，和人类 baby supplement 互斥 | 宠物犬内容，与人类婴儿补剂互斥 |
| Kuang Grever | 无标签和内容信号，无法判断为母婴补剂相关 | 通用健康饮食号，缺少母婴投放语境 |
| Mousetales | 宠物+娱乐频道，和母婴补剂推广不匹配 | 野生动物娱乐向，且偏叙事，不适合做母婴补充剂推广 |
| Dahuazi Xiaoyanzi | 动物/宠物内容占主导，不适合人类婴童补剂 | 偏搞笑动物/日常频道，缺少婴儿营养或购买语境，不适合补剂推广 |
| Jasmine Klein | 生活方式泛化，缺少母婴或补剂相关信号 | 工作妈妈号，但无婴儿营养相关内容 |
| Funny and Humorous Channel | 无标签和内容信号，无法判断为母婴补剂相关 | 搞笑娱乐频道，和婴儿补充剂推广场景不匹配 |
| Chris and Gina, THE BULL SOURCE | 宠物犬频道，和人类婴童补剂互斥 | 宠物犬繁育内容，和人类婴儿补充剂互斥 |

## nox@promotion-capacity-v1-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 9 | Capra Trynowski | 0 | 无标签无视频证据，难判断为相关 |
| 11 | Hefferon Hosfeld | 0 | 无标签无证据，相关性不足 |
| 15 | paloma | 0 | 无标签无证据，相关性不足 |
| 21 | Misty Finds | 0 | 无标签无证据，相关性不足 |
| 26 | The Amazing Johnsons | 0 | 生活/食物泛内容，缺少母婴补剂信号 |
| 34 | Richa Mundhra | 0 | 时尚生活向，缺少婴儿补剂主题 |
| 35 | Hillary Sadler | 0 | 无内容证据，难判断相关性 |
| 39 | Emmalee Anne | 0 | 无标签无内容，相关证据不足 |
| 42 | NextGen Zone | 0 | 无标签无内容，相关证据不足 |
| 47 | TisKaVo | 0 | 无标签无内容，相关证据不足 |
| 58 | Brooklyn Larsen | 0 | 生活美妆向，缺少婴儿或补充剂语义 |
| 66 | Lydia | Know Your Cycle | 0 | 无可用标签或视频证据 |
| 70 | Meaghan McKinley | 0 | 无可用标签或视频证据 |
| 72 | Charlotte Mason Motherhood - Larissa Leigh | 0 | 标签偏homeschool，婴儿营养信号不足 |
| 76 | Shelby Meadows | 0 | 无标签和内容信号，无法判断为母婴补剂相关 |
| 79 | Graddy Henseler | 0 | 无标签和内容信号，无法判断为母婴补剂相关 |
| 82 | Tiny Humans 101 | 0 | 无标签和内容信号，无法判断为母婴补剂相关 |
| 84 | Apple Sorrels | 0 | 无标签和内容信号，无法判断为母婴补剂相关 |
| 89 | LuckyCBDLife | 0 | 无标签和内容信号，无法判断为母婴补剂相关 |
| 90 | The Mommy Care Kit | 0 | 无标签和内容信号，无法判断为母婴补剂相关 |
| 98 | Angie Resells | 0 | 偏二手/倒卖与 unboxing，和婴童补剂关联弱 |
| 109 | Lifestyle amenities | 0 | 无可用标签与内容证据 |
| 118 | DAE HWANG | 0 | 无标签和内容证据，相关性不足 |
| 124 | Gelle Haub | 0 | 无标签和内容证据，相关性不足 |
| 125 | NCVI | 0 | 无标签和内容证据，相关性不足 |
| 133 | Aasby Mcroy | 0 | 缺少标签和内容证据，无法判断有明确推广相关性 |
| 135 | ViewHub | 0 | 缺少标签和视频证据，相关性不足 |

## xtb@promotion-capacity-v1-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 15 | Raiqa Doll | -18 | 纯萌娃娱乐内容，缺少母婴产品或补充剂推广语境 |
| 18 | COPS Camera USA | -15 | 主体是搞笑剧集娱乐号，和婴儿补充剂推广语境明显不符 |
| 19 | Baby Velora | -12 | 只有情感型母婴短内容，没有产品、测评或购买引导 |
| 36 | Daily Life49 | -6 | 娱乐和鸡汤内容为主，补充剂转化不佳 |
| 44 | Life With Mia | -7 | 美妆假发频道，和婴儿补充剂受众错位 |
| 50 | Doc's Dollies | -25 | 玩具娃娃频道，不是人类婴儿营养场景 |
| 54 | π Infant Care | 0 | 缺少标签和内容证据，无法判断为母婴补充剂受众 |
| 55 | Baby Food | -15 | 日常娱乐向，最近内容多为家庭剧情，与婴儿补充剂不匹配 |
| 68 | Kun Ulan Youzi | -20 | 泛娱乐生活向，最近内容与婴儿补充剂关联很弱 |
| 82 | FoundMyFitness Clips | -10 | 成人健康补剂与营养科普为主，不适合婴儿补充品 |
| 96 | Dabaiming Evaluation | -10 | 儿童数学教育号，和婴儿补充品主题不符 |
| 98 | Malori Mayor | -7 | 家庭生活号但近期转向搬家签证，母婴相关很弱 |
| 101 | Mosie Baby | -10 | 母婴相关但偏受孕工具，和婴儿补充品场景不匹配 |
| 104 | Ivet Parris | -10 | 美妆测评号，缺少母婴和营养补充语境 |
| 110 | Nanning First Sister | -22 | 娱乐型育儿内容，不适合做补充品推广 |
| 118 | Annie Wang Tamaki | -20 | 美妆防晒测评，和婴儿补充品品类错位 |
| 131 | Hi! Little Doudou | -25 | 娱乐萌娃剧情号，格式不适合投放 |
| 140 | Mom TV | -25 | 猴类/动物向内容，属互斥受众 |
| 158 | Caujuan Mayo | -13 | 商业营销/谈业务为主，缺少母婴产品受众 |
| 178 | Guidecentral English | -10 | 通用教程频道，近期内容与婴儿补剂无关 |

## Notes
- Page-level rates use `page_size` from each run metadata.
- Cause categories are heuristic clusters from `why_short`; review representative rows before making product decisions.
