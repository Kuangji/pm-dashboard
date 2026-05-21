# Channel Search Provider Comparison

- keyword: fashion
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
| nox | nox | - | 1500 | 781 | 309 | 410 | 27.3% | 14 | 399 | 41 | 1046 |
| debugger | debugger | - | 1500 | 1067 | 364 | 69 | 4.6% | 0 | 48 | 47 | 1405 |

## Page-Level Badcase Rate
| page | nox_total | nox_badcase | nox_badcase率 | debugger_total | debugger_badcase | debugger_badcase率 | badcase率差 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 50 | 0 | 0.0% | 50 | 0 | 0.0% | 0.0% |
| 2 | 50 | 3 | 6.0% | 50 | 0 | 0.0% | 6.0% |
| 3 | 50 | 2 | 4.0% | 50 | 2 | 4.0% | 0.0% |
| 4 | 50 | 3 | 6.0% | 50 | 2 | 4.0% | 2.0% |
| 5 | 50 | 1 | 2.0% | 50 | 0 | 0.0% | 2.0% |
| 6 | 50 | 5 | 10.0% | 50 | 0 | 0.0% | 10.0% |
| 7 | 50 | 4 | 8.0% | 50 | 0 | 0.0% | 8.0% |
| 8 | 50 | 0 | 0.0% | 50 | 0 | 0.0% | 0.0% |
| 9 | 50 | 0 | 0.0% | 50 | 2 | 4.0% | -4.0% |
| 10 | 50 | 2 | 4.0% | 50 | 2 | 4.0% | 0.0% |
| 96 | 50 | 15 | 30.0% | 50 | 3 | 6.0% | 24.0% |
| 97 | 50 | 15 | 30.0% | 50 | 1 | 2.0% | 28.0% |
| 98 | 50 | 12 | 24.0% | 50 | 3 | 6.0% | 18.0% |
| 99 | 50 | 15 | 30.0% | 50 | 4 | 8.0% | 22.0% |
| 100 | 50 | 10 | 20.0% | 50 | 7 | 14.0% | 6.0% |
| 101 | 50 | 13 | 26.0% | 50 | 4 | 8.0% | 18.0% |
| 102 | 50 | 18 | 36.0% | 50 | 7 | 14.0% | 22.0% |
| 103 | 50 | 18 | 36.0% | 50 | 0 | 0.0% | 36.0% |
| 104 | 50 | 11 | 22.0% | 50 | 2 | 4.0% | 18.0% |
| 105 | 50 | 24 | 48.0% | 50 | 0 | 0.0% | 48.0% |
| 191 | 50 | 23 | 46.0% | 50 | 0 | 0.0% | 46.0% |
| 192 | 50 | 29 | 58.0% | 50 | 6 | 12.0% | 46.0% |
| 193 | 50 | 19 | 38.0% | 50 | 0 | 0.0% | 38.0% |
| 194 | 50 | 21 | 42.0% | 50 | 3 | 6.0% | 36.0% |
| 195 | 50 | 26 | 52.0% | 50 | 2 | 4.0% | 48.0% |
| 196 | 50 | 27 | 54.0% | 50 | 6 | 12.0% | 42.0% |
| 197 | 50 | 27 | 54.0% | 50 | 3 | 6.0% | 48.0% |
| 198 | 50 | 27 | 54.0% | 50 | 3 | 6.0% | 48.0% |
| 199 | 50 | 20 | 40.0% | 50 | 4 | 8.0% | 32.0% |
| 200 | 50 | 20 | 40.0% | 50 | 3 | 6.0% | 34.0% |

## Badcase Overlap
| metric | count |
| --- | --- |
| shared_badcase | 2 |
| nox_only_badcase | 408 |
| debugger_only_badcase | 67 |

## Badcase Cause Summary
| provider | category | count |
| --- | --- | --- |
| nox | 证据缺失或信号不足 | 234 |
| nox | 其他 | 113 |
| nox | 娱乐/儿童/泛内容偏离 | 39 |
| nox | 泛相关性偏离 | 16 |
| nox | 宠物/动物受众冲突 | 5 |
| nox | 科技/电子垂类偏离 | 3 |
| debugger | 娱乐/儿童/泛内容偏离 | 31 |
| debugger | 其他 | 30 |
| debugger | 宠物/动物受众冲突 | 6 |
| debugger | 泛相关性偏离 | 2 |

## Shared Badcases
| channel | nox | debugger |
| --- | --- | --- |
| Lyra Dolls | 玩具纸娃娃为主，不适合人类时尚推广 | 纸娃娃/玩具为主，不适合真人服饰推广 |
| Handsome by AI | AI艺术为主，fashion仅弱标签，不适合时尚推广 | AI图像为主，不是真人时尚创作者 |

## nox-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 55 | MyFroggyStuff | 5 | 主体是玩具娃娃，fashion多为娃娃服饰，不适合人类时尚推广 |
| 68 | Pidgin Doll | 15 | 主内容是娃娃创作，fashion多半是娃娃服饰线索 |
| 74 | Maya. 𓏲 | 10 | 娱乐/校园/偶像内容为主，fashion只是附带标签 |
| 137 | 123 GO! | 5 | 儿童娱乐短视频为主，时尚标签不足以支撑推广 |
| 141 | Jen Blanco | 5 | 短视频娱乐/舞蹈为主，缺少时尚带货场景 |
| 179 | Eira Doll | 5 | 纸模/玩具为主，非真实时尚消费场景 |
| 189 | Lavish Lifestyle | 5 | 名人/政治话题为主，时尚标签难改偏题 |
| 200 | Style Wow | 5 | 绘画/换装娱乐为主，非真实时尚推广场景 |
| 218 | Lilylights | 5 | 以娱乐情侣短视频为主，时尚标签偏弱，不适合 |
| 254 | Milana Baby | 5 | 娱乐/舞蹈为主，时尚只是挂载 |
| 256 | Eli and Mike | 5 | 播客娱乐型频道，非时尚主阵地 |
| 267 | X17onlineVideo | 5 | 八卦新闻为主，时尚不是主内容 |
| 281 | Hines Management Group | 20 | 玩具/芭比为主，时尚仅泛标签 |
| 316 | YouQaria Gallery | 10 | ASMR缝纫/手作为主，格式不适合服饰推广 |
| 317 | Twintwin17 | 10 | 明星粉丝向内容为主，时尚只是附带标签 |
| 320 | Lisa Or Lena | 10 | 选择题/娱乐类频道，时尚意图很弱 |
| 325 | Ethan & Jason 💙 | 10 | 娱乐/足球/玩笑内容为主，时尚标签很弱 |
| 480 | Tana Mongeau | 5 | 主域是娱乐喜剧，fashion标签不足以支撑投放 |
| 493 | Alexis Therese Castillo | 5 | 主域是手机科技，fashion标签不足以匹配推广 |
| 4751 | Clezo tv | 0 | 婚礼娱乐频道，缺少时尚穿搭受众 |
| 4753 | Honeyrose USA | -15 | 吸烟/戒烟内容，与时尚推广不相干 |
| 4755 | Catlover | 5 | 宠物频道为主，时尚标签不足以支撑推广 |
| 4763 | alicia zamora | 0 | 无有效标签，无法判断时尚相关性 |
| 4769 | Bubble-H77 | 0 | 校园剧情/POV频道，与时尚无关 |
| 4775 | Audree Kate Lopez | 0 | 无标签且缺少时尚线索 |
| 4780 | Kittydiva | 0 | 无fashion相关证据，且宗教/音乐为主 |
| 4781 | JESSICA RICH | 0 | 无标签与内容证据，无法判断时尚相关 |
| 4782 | Oye Toons | 0 | 无标签与内容证据，无法判断时尚相关 |
| 4784 | Auntie's Advice LifeStyle Podcast | 0 | 娱乐/播客/犯罪向，缺少时尚受众 |
| 4786 | Jessika kolosovas | 0 | 无标签与内容证据，无法判断时尚相关 |

## debugger-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 136 | Imbadkidjay | 20 | 主内容是游戏/搞笑短片，时尚仅弱标签 |
| 142 | chronic fashion | 20 | 核心是Roblox换装游戏，非真实时尚推广 |
| 194 | Dolly Amazing | 5 | 纸娃娃和儿童娱乐为主，不适合 |
| 411 | The Hillywood Show | 5 | 主内容偏恶搞娱乐，fashion 仅次要 |
| 424 | The Vangos | 5 | 播客/关系/美食为主，时尚只是次要 |
| 454 | Jay Greek | 5 | 主体是游戏，时尚仅是游戏名蹭词 |
| 498 | KoiCC | 5 | ASMR助眠格式与时尚推广明显不匹配 |
| 4763 | Express Dress | 5 | 玩偶和迷你模型内容为主，不适合真人时尚推广 |
| 4771 | Handsome Dog | 10 | 宠物狗内容为主，时尚标签不足以支撑投放 |
| 4772 | MiiRain | 5 | 娱乐梗图频道，时尚相关性弱，不适合服饰推广 |
| 4807 | Salwas kitchen | 5 | ASMR食物向，时尚标签不代表服饰推广 |
| 4856 | Storyboard AI | 5 | 影视娱乐为主，fashion仅是边缘标签，不适合 |
| 4858 | Creator Facts | 5 | 反应/搞笑向内容为主，时尚标签很弱 |
| 4899 | PaJust | 10 | 手工ASMR频道，偏制作非穿搭推广 |
| 4904 | Cheezburger | 5 | meme/娱乐主导，Fashion 只是附带标签 |
| 4916 | Ladies Hacks | 10 | 农事/捕鱼/街头食物为主，Fashion 不集中 |
| 4921 | Digital dreams card studio,let’s Explore Happiness | 5 | meme/搞笑/娱乐主导，Fashion 不构成主线 |
| 4923 | SpieLFreuDE | 5 | 游戏频道为主，Fashion 只是游戏服装话题 |
| 4952 | ComedyJunction​0206 | 10 | 喜剧短视频为主，时尚标签偏挂靠 |
| 4955 | Papz14 | 5 | 娱乐混合为主，时尚相关弱且不稳定 |
| 4977 | Dream Chill | 10 | 娱乐音乐新闻为主，fashion 只是附带标签 |
| 4982 | Bolly Tadka24 | 8 | 宝莱坞娱乐新闻为主，时尚只是附带标签 |
| 4994 | MK | 7 | 音乐娱乐为主，fashion 不足以支撑推广 |
| 4996 | Toni Toni Kitchen | 5 | 厨房饮食内容为主，时尚标签过于偏离 |
| 5000 | SAYYAM GONDAL | 6 | 歌曲演出为主，时尚标签无法支撑推广 |
| 5034 | Daniels Visions Presentations | 8 | 娱乐音乐动画为主，时尚只是边缘标签 |
| 5041 | MR Azizur Fact | 5 | 玩具儿童短视频为主，时尚仅挂边，不适合 |
| 5045 | Re:Post_whareveri1 | 8 | 猫/拼图为主，时尚只是附带词 |
| 5048 | The Quiz Arena | 8 | 测验挑战为主，时尚仅是主题装饰 |
| 5054 | MARY-ASMR | 5 | ASMR主导，服饰推广的观看与转化场景不匹配 |

## Notes
- Page-level rates use `page_size` from each run metadata.
- Cause categories are heuristic clusters from `why_short`; review representative rows before making product decisions.
