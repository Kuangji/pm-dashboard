# Channel Search Provider Comparison

- keyword: treadmill
- platform: youtube
- country: -
- left: nox@promotion-capacity-v1 (tmp/channel-search-review/20260528-nox-vs-xtb-10kw2-youtube-global-front10-promotion-capacity-v1/treadmill/nox-youtube)
- right: xtb@promotion-capacity-v1 (tmp/channel-search-review/20260528-nox-vs-xtb-10kw2-youtube-global-front10-promotion-capacity-v1/treadmill/xtb-youtube)
- left_rule_version: promotion-capacity-v1
- right_rule_version: promotion-capacity-v1
- left_prompt_hash: b87da85cf79a
- right_prompt_hash: b87da85cf79a

## Run Overview
| run | provider | rule_version | total | fit | adjacent | badcase | badcase率 | <0 | 0-9 | 10-19 | 20+ |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| nox@promotion-capacity-v1 | nox | promotion-capacity-v1 | 500 | 118 | 219 | 163 | 32.6% | 27 | 306 | 92 | 75 |
| xtb@promotion-capacity-v1 | xtb | promotion-capacity-v1 | 500 | 206 | 187 | 107 | 21.4% | 109 | 62 | 136 | 193 |

## Page-Level Badcase Rate
| page | nox@promotion-capacity-v1_total | nox@promotion-capacity-v1_badcase | nox@promotion-capacity-v1_badcase率 | xtb@promotion-capacity-v1_total | xtb@promotion-capacity-v1_badcase | xtb@promotion-capacity-v1_badcase率 | badcase率差 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 50 | 14 | 28.0% | 50 | 6 | 12.0% | 16.0% |
| 2 | 50 | 16 | 32.0% | 50 | 5 | 10.0% | 22.0% |
| 3 | 50 | 7 | 14.0% | 50 | 14 | 28.0% | -14.0% |
| 4 | 50 | 15 | 30.0% | 50 | 8 | 16.0% | 14.0% |
| 5 | 50 | 12 | 24.0% | 50 | 8 | 16.0% | 8.0% |
| 6 | 50 | 19 | 38.0% | 50 | 19 | 38.0% | 0.0% |
| 7 | 50 | 12 | 24.0% | 50 | 7 | 14.0% | 10.0% |
| 8 | 50 | 24 | 48.0% | 50 | 14 | 28.0% | 20.0% |
| 9 | 50 | 23 | 46.0% | 50 | 12 | 24.0% | 22.0% |
| 10 | 50 | 21 | 42.0% | 50 | 14 | 28.0% | 14.0% |

## Badcase Overlap
| metric | count |
| --- | --- |
| shared_badcase | 10 |
| nox@promotion-capacity-v1_only_badcase | 153 |
| xtb@promotion-capacity-v1_only_badcase | 97 |

## Badcase Cause Summary
| provider | category | count |
| --- | --- | --- |
| nox@promotion-capacity-v1 | 证据缺失或信号不足 | 66 |
| nox@promotion-capacity-v1 | 其他 | 43 |
| nox@promotion-capacity-v1 | 泛相关性偏离 | 27 |
| nox@promotion-capacity-v1 | 娱乐/儿童/泛内容偏离 | 15 |
| nox@promotion-capacity-v1 | 宠物/动物受众冲突 | 10 |
| nox@promotion-capacity-v1 | 科技/电子垂类偏离 | 2 |
| xtb@promotion-capacity-v1 | 其他 | 48 |
| xtb@promotion-capacity-v1 | 娱乐/儿童/泛内容偏离 | 24 |
| xtb@promotion-capacity-v1 | 泛相关性偏离 | 17 |
| xtb@promotion-capacity-v1 | 证据缺失或信号不足 | 9 |
| xtb@promotion-capacity-v1 | 宠物/动物受众冲突 | 9 |

## Shared Badcases
| channel | nox@promotion-capacity-v1 | xtb@promotion-capacity-v1 |
| --- | --- | --- |
| Andre dcrow | 音乐娱乐内容为主，跑步机不适合推广 | 纯音乐/健身歌单，缺少器材测评或购买意图 |
| Kiki Chanel | 时尚美妆为主，与跑步机受众不匹配。 | 时尚/争议/达人内容为主，和跑步机推广场景不匹配 |
| Amazing Scenic Drives | 旅行驾车内容为主，跑步机标签更像噪音。 | 景观驾车/环境音频道，属于强格式错配，不适合推广 |
| Strolling The City | 城市旅行内容为主，跑步机标签缺少推广上下文。 | 城市漫步频道，偏旅游散步内容，离跑步机推广较远 |
| Relaxing Walks | ASMR/慢电视定位与跑步机推广格式错配 | 慢TV/ASMR休闲取向，和跑步机推广的促销格式不符 |
| Hawaii People | 旅行观光频道，与跑步机无关 | 旅游步行导向频道，虽有treadmill标签但与跑步机推广场景明显不符 |
| Fuzzy Critter Pets | 宠物猫内容为主，跑步机指向宠物场景，不适合人用推广 | 宠物猫内容，属于动物侧场景，不适合人用跑步机 |
| Sharp Ridge Homestead | 农舍家居内容，只有泛化how to弱相关 | 家居/草本与癌症内容偏离跑步机推广 |
| Dare2C | 无标签无内容，无法判断为适合 | 旅行/风景/氛围向频道，和跑步机推广人群不重合 |
| Michelle Lee | 缺少可用标签或内容证据 | 生活感言和家庭内容，和跑步机推广不匹配 |

## nox@promotion-capacity-v1-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 6 | Outdoor Exercise | 8 | 偏虚拟走路/景色视频，跑步机推广转化弱 |
| 18 | MyTennesseeSky | 8 | 旅行步行/环境视频为主，投放适配弱 |
| 26 | Treadmill Guy | 0 | 无健身或跑步机相关证据，难以用于推广。 |
| 29 | M4NDY | -15 | 动画娱乐内容为主，不是产品推广频道。 |
| 36 | ClarasChannel | 0 | 泛生活娱乐，无可用健身或器材信号。 |
| 43 | Blue! 🎀 | 0 | 无标签，无相关证据。 |
| 44 | Wind Walk Travel Videos ʬ | -10 | 纯旅行频道，与跑步机推广无关。 |
| 47 | HowMuchTech | -5 | 泛科技生活频道，缺少跑步机/健身语境。 |
| 48 | Prowalk Tours | -10 | 步行旅行内容为主，不是器材推广场景。 |
| 50 | Emily Jones Chats | -5 | 访谈/播客型生活频道，与跑步机推广偏离。 |
| 54 | Park Pass TV | 0 | 迪士尼乐园内容，和跑步机推广无关 |
| 56 | SJ Invention | 0 | 仅泛兴趣标签，和跑步机推广几乎无关 |
| 60 | BUKO | 0 | 音乐账号，和跑步机推广无关 |
| 65 | iGadgets | 0 | Excel学习号，和跑步机推广无关 |
| 76 | The Phenomenal Family Live | 0 | 生活/嘻哈频道，无跑步机或健身器材相关信号 |
| 80 | Danreael | 0 | 宗教内容，与跑步机推广无关 |
| 83 | Fresh and Felicia | 0 | 电动车/自行车频道，与跑步机无关 |
| 84 | JustSayin | 1 | 吃播娱乐为主，健身词弱，推广价值低 |
| 89 | Maddie Green | 0 | 商务/旅行/音乐 vlog，和跑步机无关 |
| 90 | TOP HIT MUSIC | 0 | 纯音乐频道，缺少商品推广场景 |
| 91 | MartydudeVR | 0 | VR 游戏频道，和普通跑步机受众不匹配 |
| 92 | SharewithLove TV | -15 | ASMR 吃播与跑步机推广方式强冲突 |
| 94 | Familia Y Life with German Shepherds :) | -10 | 宠物频道，和人用跑步机目标人群不符 |
| 97 | ShakeMistake | 0 | 游戏化健身频道，但与跑步机关联弱 |
| 102 | TOOxCHILLY | 5 | 游戏频道为主，跑步机标签疑似噪声 |
| 107 | all day i eat like a shark | 0 | 烹饪频道，和跑步机推广相关性弱 |
| 116 | Estrella Fenandez | 0 | 音乐舞台号，和跑步机推广不相关 |
| 118 | The Lopez Life | 0 | 彩绘/解压娱乐号，和跑步机无关 |
| 142 | allie bennett | 0 | 无标签无内容证据，无法判断为相关 |
| 144 | Kẻ Ở Miền Tây | 0 | 政治/宗教/车辆内容，和跑步机推广无关 |

## xtb@promotion-capacity-v1-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 10 | King Reviews Curtos | Illlustres | -10 | 内容与跑步机无关，近期也几乎全偏题 |
| 11 | Runseek Running Music | 0 | 音乐/节拍导向，跑步机词不代表可推广 |
| 33 | DIVERSE MUSIC GROUP (DIVERSE MUSIC) | -13 | 音乐娱乐号，跑步机只是零散健身片段 |
| 46 | Life with The OLI'S | -7 | 家庭美食娱乐号，跑步机内容偏个人打卡 |
| 47 | Walk Hike Run | -5 | ASMR虚拟跑步频道，提到跑步机但不适合推广 |
| 48 | Missy | -8 | 美妆时尚娱乐号，跑步机内容零散且无购买导向 |
| 63 | ETTENNA | -6 | 近期内容偏娱乐/观点，与跑步机推广脱节 |
| 90 | TurboNerd Gaming | -5 | 主内容是游戏，跑步机标签像SEO，不适合投放 |
| 95 | Virtual Running TV | -2 | 虚拟跑步/景观内容，不是产品导购场景 |
| 98 | খবর পডকাস্ট 1M | 10 | 近期内容转向影视新闻，和跑步机推广不匹配 |
| 100 | Virtual Exercise Channel | -2 | 虚拟徒步和景观内容为主，不适合跑步机推广 |
| 102 | Lego Life | 13 | 家居改造相关，但缺少明确评测购买导向 |
| 104 | Treadmill TV | -4 | 虚拟跑风景为主，缺少产品推广导向 |
| 106 | MrNaveedking | 11 | 标签有器材，但近期几乎全是宗教/杂项 |
| 108 | Jnehring Shorts | -4 | ASMR/娱乐为主，跑步机仅作道具 |
| 111 | Circitz | -3 | VR游戏为主，跑步机只是道具 |
| 113 | Wellness for Pets | -4 | 宠物狗内容，不适合人用跑步机推广 |
| 118 | Brick World Channel | -5 | LEGO玩具娱乐，和跑步机卖货不匹配 |
| 123 | Janina Buckman | -3 | 时尚挑战/娱乐为主，跑步机是道具 |
| 126 | Leo Bangladesh | 10 | 娱乐音乐为主，虽有健身标签，但近期内容明显偏离 |
| 133 | Aviator’s Garage | 5 | 汽车号为主，跑步机标签与受众不匹配 |
| 138 | Aura Locker | -10 | 无跑步机相关标签，近期为娱乐短内容 |
| 144 | Benjo Romero | 10 | 职业/鞋类内容为主，跑步机受众偏离 |
| 145 | The Lazy Generation | -15 | 喜剧整蛊格式，跑步机只是节目道具 |
| 162 | The Average Runner | -25 | 事实短视频号，与跑步机推广场景不符 |
| 169 | Factty Sohel | -10 | 近10条均为科普短视频，缺少跑步机评测、购买或使用语境 |
| 178 | Wasif Riaz | 11 | 近期几乎全是音乐/生活vlog，跑步机只是标签点缀 |
| 179 | TROLLHALO EDITZ | 0 | 梗图剪辑为主，跑步机标签与近期内容基本无关 |
| 181 | Best Running Music | -5 | 音乐播放型频道，属于强格式不匹配，不适合跑步机推广 |
| 191 | Acquire Adventure | -5 | ASMR/4K场景型内容，跑步机更像场景标签，不是推广位 |

## Notes
- Page-level rates use `page_size` from each run metadata.
- Cause categories are heuristic clusters from `why_short`; review representative rows before making product decisions.
