# Channel Search Provider Comparison

- keyword: treadmill
- platform: tiktok
- country: -
- left: nox@promotion-capacity-v1 (tmp/channel-search-review/20260528-nox-vs-xtb-10kw2-tiktok-global-front10-promotion-capacity-v1/treadmill/nox-tiktok)
- right: xtb@promotion-capacity-v1 (tmp/channel-search-review/20260528-nox-vs-xtb-10kw2-tiktok-global-front10-promotion-capacity-v1/treadmill/xtb-tiktok)
- left_rule_version: promotion-capacity-v1
- right_rule_version: promotion-capacity-v1
- left_prompt_hash: b87da85cf79a
- right_prompt_hash: b87da85cf79a

## Run Overview
| run | provider | rule_version | total | fit | adjacent | badcase | badcase率 | <0 | 0-9 | 10-19 | 20+ |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| nox@promotion-capacity-v1 | nox | promotion-capacity-v1 | 500 | 124 | 180 | 196 | 39.2% | 54 | 235 | 142 | 69 |
| xtb@promotion-capacity-v1 | xtb | promotion-capacity-v1 | 500 | 219 | 190 | 91 | 18.2% | 100 | 96 | 158 | 146 |

## Page-Level Badcase Rate
| page | nox@promotion-capacity-v1_total | nox@promotion-capacity-v1_badcase | nox@promotion-capacity-v1_badcase率 | xtb@promotion-capacity-v1_total | xtb@promotion-capacity-v1_badcase | xtb@promotion-capacity-v1_badcase率 | badcase率差 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 50 | 12 | 24.0% | 50 | 10 | 20.0% | 4.0% |
| 2 | 50 | 16 | 32.0% | 50 | 6 | 12.0% | 20.0% |
| 3 | 50 | 22 | 44.0% | 50 | 2 | 4.0% | 40.0% |
| 4 | 50 | 12 | 24.0% | 50 | 6 | 12.0% | 12.0% |
| 5 | 50 | 21 | 42.0% | 50 | 12 | 24.0% | 18.0% |
| 6 | 50 | 29 | 58.0% | 50 | 11 | 22.0% | 36.0% |
| 7 | 50 | 25 | 50.0% | 50 | 8 | 16.0% | 34.0% |
| 8 | 50 | 18 | 36.0% | 50 | 10 | 20.0% | 16.0% |
| 9 | 50 | 25 | 50.0% | 50 | 15 | 30.0% | 20.0% |
| 10 | 50 | 16 | 32.0% | 50 | 11 | 22.0% | 10.0% |

## Badcase Overlap
| metric | count |
| --- | --- |
| shared_badcase | 1 |
| nox@promotion-capacity-v1_only_badcase | 195 |
| xtb@promotion-capacity-v1_only_badcase | 90 |

## Badcase Cause Summary
| provider | category | count |
| --- | --- | --- |
| nox@promotion-capacity-v1 | 证据缺失或信号不足 | 61 |
| nox@promotion-capacity-v1 | 娱乐/儿童/泛内容偏离 | 45 |
| nox@promotion-capacity-v1 | 其他 | 40 |
| nox@promotion-capacity-v1 | 泛相关性偏离 | 34 |
| nox@promotion-capacity-v1 | 宠物/动物受众冲突 | 16 |
| xtb@promotion-capacity-v1 | 其他 | 32 |
| xtb@promotion-capacity-v1 | 娱乐/儿童/泛内容偏离 | 20 |
| xtb@promotion-capacity-v1 | 泛相关性偏离 | 16 |
| xtb@promotion-capacity-v1 | 宠物/动物受众冲突 | 13 |
| xtb@promotion-capacity-v1 | 证据缺失或信号不足 | 10 |

## Shared Badcases
| channel | nox@promotion-capacity-v1 | xtb@promotion-capacity-v1 |
| --- | --- | --- |
| carolinemooore | 时尚舞蹈混合，相关性弱 | 喜剧娱乐号，跑步机词不适合带货 |

## nox@promotion-capacity-v1-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 2 | Morgan 🗝️ | 0 | 服饰时尚为主，与跑步机推广关联弱 |
| 3 | Manna Flow 🪽 | 0 | 闪光灯/美妆为主，和跑步机不相关 |
| 4 | griselda | 0 | 无标签与视频证据，相关性不足 |
| 5 | Annie Tran | 0 | 婚礼/教育/家庭向，缺少健身器材语境 |
| 6 | Keshornashantell | 0 | 地产批发金融向，与跑步机推广不匹配 |
| 8 | Kaylin Ricci | 0 | 无标签与内容证据，难判断相关性 |
| 35 | Cheddar | -15 | 新闻娱乐频道，跑步机与受众/内容域不匹配 |
| 36 | Dimi | -15 | 纯娱乐影视频道，与跑步机推广不匹配 |
| 37 | cleolonglegs | -15 | 宠物狗频道，和人用跑步机属错位受众 |
| 39 | mk | 0 | 时尚测色频道，跑步机标签像泛投，推广不稳 |
| 46 | Dan Sur | -15 | 纯娱乐频道，缺少器材推广语境 |
| 48 | ATHENA PARIS | -12 | 娱乐恋爱内容，与跑步机推广不相关 |
| 57 | Sekeithia | 1 | 生活杂项为主，缺少跑步机场景 |
| 58 | Jewelz 💎🎶 | 1 | 泛励志/泛购物，相关性过弱 |
| 60 | stephaniee | 0 | 纯喜剧家庭内容，和跑步机无关 |
| 62 | Sammy Jo | 7 | 时尚娱乐为主，跑步机只是点缀 |
| 64 | Ana Luisa | 0 | 纯娱乐/喜剧，相关性极低 |
| 67 | Better You Better Society | 0 | 自我成长号，缺少运动器材关联 |
| 81 | Matt Barnes | 0 | 篮球体育故事号，与跑步机不匹配 |
| 82 | Erin Confortini | 0 | 财经号，和跑步机推广无关 |
| 84 | Consumer Reports | 0 | 清洁生活资讯号，缺少跑步机相关性 |
| 86 | CrystaldPistol | 0 | 体育娱乐向，跑步机相关性弱 |
| 87 | The Motherhood Journey | 0 | 母婴育儿号，和跑步机无关 |
| 93 | Summer FPV | 0 | 吃播娱乐号，和跑步机无关 |
| 95 | Your Online Coach | 0 | 娱乐人设向，不适合跑步机 |
| 97 | liv | 0 | 无标签，无相关依据 |
| 99 | SADAQAT | 0 | 无标签，无相关依据 |
| 102 | Sandra & Ryder | -15 | 宠物狗频道，和人用跑步机目标受众冲突 |
| 103 | ACTEUR DAVE | -15 | 纯娱乐频道，缺少运动器材推广场景 |
| 107 | Skye | -15 | 宠物狗内容，属人用跑步机的互斥受众 |

## xtb@promotion-capacity-v1-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 5 | CTNORZAITUN🦈🦛🕸️ | -8 | 家居收纳与杂货为主，跑步机相关信号很弱 |
| 10 | 𝔾𝕠𝕕’𝕤 𝔽𝕒𝕧𝕠𝕦𝕣 | -10 | 近期多为杂品广告，缺少跑步机或运动器材相关内容 |
| 26 | Cel Shop 23 | -10 | 杂货/宠物/服饰混杂，近10条与跑步机无关，带货相关性弱 |
| 27 | Usman Bhatti 🔥 | -6 | 泛流量账号，只有1条跑步机提及，缺少稳定受众和承接能力 |
| 31 | 简单生活笔记 | -7 | 以居家好物/家居香氛为主，跑步机内容不足，相关度偏低 |
| 32 | sansanstore.id | -5 | 主卖家电/小家电，跑步机仅偶发提及，健身承接较弱 |
| 35 | Lady Sledge | -10 | 纯娱乐杂号，和跑步机推广场景不匹配 |
| 36 | Muzhda Safi🇦🇫🇩🇪 | -10 | 美妆护肤为主，缺少健身器材或跑步机推广承接 |
| 39 | SW2512 | -6 | 以骑行/穿搭为主，跑步机仅偶发提及，相关性较弱 |
| 43 | SRIDEV1206 | -10 | 娱乐/搞笑账号，和跑步机推广场景完全不匹配 |
| 52 | Rose and her Mom | -10 | 以家庭杂货和儿童用品为主，与跑步机无关 |
| 54 | ᖇᗩᖴᎥ🐺 | -20 | 娱乐口播为主，健身词仅零星出现，不适合带货 |
| 62 | Marifel🌻 | -10 | 泛品类产品号，近期与跑步机无关 |
| 63 | Che✨🌸 | -10 | 宠物和美妆内容为主，与跑步机不相关 |
| 69 | BOSS GARNEL | -8 | 标签与跑步机无直接相关，近期多为工具内容，仅少量提及 |
| 91 | Zay | -12 | 娱乐篮球号，跑步机只是梗，不适合卖货 |
| 104 | Syazalio(〃＾▽＾〃)o | -17 | 娱乐儿童向为主，跑步机只是口号式提及 |
| 118 | Vicki💙🤡 | -19 | 娱乐号，跑步机推广相关性很弱 |
| 161 | Moonmanhy | -1 | 娱乐/卡拉OK号，不适合跑步机带货 |
| 176 | Hami diah | -4 | 娱乐号为主，商品杂但无跑步机/健身器材定位 |
| 184 | Sophiiiaxx | Recipes & Vibes💫 | -6 | 美食生活号，缺少健身器材推广场景 |
| 189 | DunnersTTS | -4 | 宠物+游戏为主，跑步机标签疑似混入 |
| 197 | Ibaf Fabi | -5 | 旅游/parkour号，内容域与跑步机推广不匹配 |
| 203 | 💫 Ainsworth Ann | 0 | 偏生活故事娱乐，和跑步机推广不匹配 |
| 213 | AKI | 0 | 宗教/穿搭内容为主，产品推广不对口 |
| 222 | zioziazyan | 2 | 直播碎片内容为主，推广转化弱 |
| 224 | NANA REYHANA | 0 | 娱乐/穿搭/lipsync为主，不适合 |
| 225 | 𝙍𝙞𝙡𝙚𝙮🛠️ | 1 | 恶搞直播号，和跑步机推广不符 |
| 226 | swiftiecatlady13 | -5 | 猫垂类为主，跑步机标签疑似误挂，近期全是宠物内容 |
| 227 | Nicole Loviee | -9 | 无跑步机或运动相关证据，近期内容也非健身带货 |

## Notes
- Page-level rates use `page_size` from each run metadata.
- Cause categories are heuristic clusters from `why_short`; review representative rows before making product decisions.
