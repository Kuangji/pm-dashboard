# Channel Search Provider Comparison

- keyword: lifestyle
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
| nox | nox | - | 1500 | 807 | 449 | 244 | 16.3% | 4 | 202 | 130 | 1164 |
| debugger | debugger | - | 1500 | 1014 | 351 | 135 | 9.0% | 40 | 272 | 180 | 1008 |

## Page-Level Badcase Rate
| page | nox_total | nox_badcase | nox_badcase率 | debugger_total | debugger_badcase | debugger_badcase率 | badcase率差 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 50 | 2 | 4.0% | 50 | 0 | 0.0% | 4.0% |
| 2 | 50 | 2 | 4.0% | 50 | 4 | 8.0% | -4.0% |
| 3 | 50 | 0 | 0.0% | 50 | 1 | 2.0% | -2.0% |
| 4 | 50 | 3 | 6.0% | 50 | 2 | 4.0% | 2.0% |
| 5 | 50 | 3 | 6.0% | 50 | 1 | 2.0% | 4.0% |
| 6 | 50 | 0 | 0.0% | 50 | 1 | 2.0% | -2.0% |
| 7 | 50 | 7 | 14.0% | 50 | 2 | 4.0% | 10.0% |
| 8 | 50 | 0 | 0.0% | 50 | 2 | 4.0% | -4.0% |
| 9 | 50 | 5 | 10.0% | 50 | 2 | 4.0% | 6.0% |
| 10 | 50 | 1 | 2.0% | 50 | 0 | 0.0% | 2.0% |
| 96 | 50 | 10 | 20.0% | 50 | 1 | 2.0% | 18.0% |
| 97 | 50 | 5 | 10.0% | 50 | 4 | 8.0% | 2.0% |
| 98 | 50 | 11 | 22.0% | 50 | 4 | 8.0% | 14.0% |
| 99 | 50 | 5 | 10.0% | 50 | 5 | 10.0% | 0.0% |
| 100 | 50 | 20 | 40.0% | 50 | 4 | 8.0% | 32.0% |
| 101 | 50 | 17 | 34.0% | 50 | 4 | 8.0% | 26.0% |
| 102 | 50 | 16 | 32.0% | 50 | 6 | 12.0% | 20.0% |
| 103 | 50 | 14 | 28.0% | 50 | 6 | 12.0% | 16.0% |
| 104 | 50 | 10 | 20.0% | 50 | 4 | 8.0% | 12.0% |
| 105 | 50 | 15 | 30.0% | 50 | 4 | 8.0% | 22.0% |
| 191 | 50 | 9 | 18.0% | 50 | 12 | 24.0% | -6.0% |
| 192 | 50 | 22 | 44.0% | 50 | 5 | 10.0% | 34.0% |
| 193 | 50 | 9 | 18.0% | 50 | 10 | 20.0% | -2.0% |
| 194 | 50 | 6 | 12.0% | 50 | 9 | 18.0% | -6.0% |
| 195 | 50 | 2 | 4.0% | 50 | 8 | 16.0% | -12.0% |
| 196 | 50 | 14 | 28.0% | 50 | 10 | 20.0% | 8.0% |
| 197 | 50 | 5 | 10.0% | 50 | 6 | 12.0% | -2.0% |
| 198 | 50 | 9 | 18.0% | 50 | 8 | 16.0% | 2.0% |
| 199 | 50 | 11 | 22.0% | 50 | 4 | 8.0% | 14.0% |
| 200 | 50 | 11 | 22.0% | 50 | 6 | 12.0% | 10.0% |

## Badcase Overlap
| metric | count |
| --- | --- |
| shared_badcase | 3 |
| nox_only_badcase | 241 |
| debugger_only_badcase | 132 |

## Badcase Cause Summary
| provider | category | count |
| --- | --- | --- |
| nox | 娱乐/儿童/泛内容偏离 | 90 |
| nox | 其他 | 78 |
| nox | 证据缺失或信号不足 | 34 |
| nox | 宠物/动物受众冲突 | 30 |
| nox | 泛相关性偏离 | 12 |
| debugger | 其他 | 49 |
| debugger | 娱乐/儿童/泛内容偏离 | 39 |
| debugger | 证据缺失或信号不足 | 27 |
| debugger | 泛相关性偏离 | 15 |
| debugger | 宠物/动物受众冲突 | 5 |

## Shared Badcases
| channel | nox | debugger |
| --- | --- | --- |
| laoyanga | 生活方式虽命中，但ASMR/mukbang主导，推广不合适 | ASMR吃播主导，属于格式错配，不适合生活方式推广 |
| Golden Retriever Luhu | 宠物频道，受众与人类生活方式推广不匹配 | 宠物狗垂类，生活方式仅是泛标签，推广人群不匹配 |
| Denny2tymes | 标签命中但主内容是 prank/娱乐，推广场景明显不合适 | 恶搞娱乐为主，lifestyle 只是泛标签 |

## nox-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 32 | Kalel | 5 | 生活方式虽命中，但宠物向内容主导，不适合 |
| 97 | Beautiful Program | 5 | 娱乐/电视节目为主，生活方式推广相关性弱 |
| 177 | autumn grace | 5 | 宠物内容为主，lifestyle仅是弱标签 |
| 197 | Oliver Tree | 5 | 音乐艺人频道为主，lifestyle标签不足以支撑推广 |
| 198 | Amolipi | 5 | 摔角/动作片主导，生活方式标签覆盖很弱 |
| 211 | Starchiana | 5 | 标签命中但 ASMR/mukbang 为主，格式不适合产品推广 |
| 224 | Samdotvlog | 5 | 标签命中但 mukbang/吃播主导，推广场景不合适 |
| 302 | Tell ME | 8 | 直播/ASMR 为主，lifestyle 只是附带标签 |
| 303 | Celebrity Facts Check | 8 | 名人八卦/体育向，lifestyle 关联很弱 |
| 305 | Geck | 5 | 娱乐+动物噱头主导，不适合 lifestyle 推广 |
| 312 | Newzmagazine.com | 5 | 新闻政治主导，与 lifestyle 创作者不匹配 |
| 317 | 💥 Дом 22 💥 | 5 | 娱乐/嘻哈主导，生活方式标签不构成有效匹配 |
| 332 | Ah Zha | 5 | ASMR/mukbang为主，格式与推广场景不符 |
| 350 | Genesisxxc | 5 | stripper vlogs 为主，生活方式推广不合适 |
| 403 | DontBeASadPanda | 15 | story 叙事娱乐为主，lifestyle 仅弱命中 |
| 409 | brooklyn reidhead | 5 | ASMR/整理音频为主，属于明显格式错配 |
| 436 | YOJ LOL | 5 | 拉订阅和娱乐词为主，生活方式相关性弱 |
| 439 | Swinger University™ | 5 | 成人小众播客，和泛生活方式推广不匹配 |
| 441 | Chelsea Arnott | 10 | ASMR 格式偏氛围，推广承接一般 |
| 491 | Aqsa | 10 | ASMR/mukbang格式强，生活方式推广不合适 |
| 4758 | Geeks + Gamers Clips | 10 | 游戏剪辑和娱乐为主，lifestyle只是泛标签 |
| 4762 | Carson Clark | 0 | 无标签且无相关内容信号 |
| 4763 | Rankberry | 10 | 宠物+短视频娱乐为主，和生活方式推广弱相关 |
| 4781 | Dezzyloops | 0 | 无标签与内容证据，无法判断相关性 |
| 4782 | Jessica Chanel | 0 | 无标签与内容证据，无法判断相关性 |
| 4784 | Lindsey Kuzmin | 5 | 有 lifestyle 直标，但内容几乎全是猫宠物垂类 |
| 4785 | DONA Việt Nam | 10 | 有 lifestyle 直标，但 ASMR/mukbang 形式不适合 |
| 4795 | The Hoof GP Clips | 5 | 有 lifestyle 直标，但主体是牛蹄护理内容 |
| 4796 | AWESMR pop | 10 | 有 lifestyle 直标，但 ASMR 格式明显不匹配 |
| 4799 | Twin Paranormal | 5 | 有 lifestyle 直标，但主轴是灵异惊悚娱乐 |

## debugger-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 78 | Yung Bl4ck | 5 | 犯罪/纪录片向为主，生活方式标签不足以支撑推广 |
| 92 | Jason & Lucia | 5 | 喜剧/恶搞为主，生活方式只是弱标签 |
| 115 | btsofvlone | 5 | 挑战和娱乐主导，生活类推广不合适 |
| 165 | Kdrama House | 5 | 生活方式仅是泛标签，核心是韩剧/剧集解说娱乐 |
| 185 | Bvic LIFESTYLE | 10 | 喜剧短视频为主，生活方式标签难支撑产品推广 |
| 214 | Angry Grandma | 5 | 恶搞幽默恐怖为主，和生活方式推广匹配低 |
| 273 | FREAKBAiT | 5 | 娱乐搞笑主导，生活方式投放不匹配 |
| 328 | PIX11 News | 10 | 新闻政治为主，lifestyle 只是栏目标签 |
| 359 | Chingy | 5 | 歌手音乐号，虽有lifestyle但主领域不适合找生活类创作者 |
| 370 | Ronny J | 5 | 音乐人频道，生活方式标签不足以覆盖主娱乐定位 |
| 430 | Lifestyle Icon | 5 | 剧情/连续剧为主，和生活方式推广不匹配 |
| 446 | Ned's Declassified Podcast Survival Guide | 10 | 怀旧娱乐播客为主，不适合生活方式推广 |
| 4760 | Ghibli village life | -15 | 以娱乐短视频为主，和生活方式推广不匹配 |
| 4802 | UKDiariesBD | -15 | 钓鱼和 ASMR 为主，和 lifestyle 召回不匹配 |
| 4804 | Tamoo Animation | -15 | 情感故事短视频为主，不适合 lifestyle 召回 |
| 4841 | Heather Blankenship | 0 | 无 lifestyle 相关标签，内容偏房地产金融，不适合 |
| 4846 | Swiss Paradise | 0 | 无 lifestyle 相关标签，工程施工类内容偏离场景 |
| 4866 | Teen Scene | -7 | 整蛊娱乐为主，生活方式相关性弱 |
| 4891 | Jack Bulowski | -12 | 直播闲聊/娱乐格式，与 lifestyle 推广不匹配 |
| 4893 | Only Budget Stories | -15 | 故事梗/meme 频道，和 lifestyle 推广明显不符 |
| 4898 | Idaman Pria | 0 | 无有效标签，缺少可判定的 lifestyle 信号 |
| 4903 | VILLAGE ROUTINE | 0 | 动物/玩梗娱乐向，和lifestyle推广不匹配 |
| 4904 | Lexi Chanel McCollum | 2 | 有momlife线索，但主体是反应/故事向 |
| 4929 | LaMont Cheatham | 0 | 无标签和内容证据，难以支持 lifestyle 推广相关性 |
| 4930 | Alina_Flycloud in English | 0 | 无标签和内容证据，无法证明与lifestyle推广相关 |
| 4948 | ExoDaily Dose | -2 | 生活方式泛泛，但以娱乐挑战为主，缺少推广场景相关性 |
| 4951 | ZONE15BABY | 10 | 娱乐短视频为主，lifestyle 只是弱装饰标签 |
| 4964 | Pam & Chris | 10 | 娱乐和宠物内容占主导，lifestyle 只是附带 |
| 4969 | Why Not | 10 | 偏哲学、知识与励志，不是典型 lifestyle 频道 |
| 4995 | Ali’sMoneyBooks | 0 | 财务/商业频道与生活方式推广关联弱，缺少相关内容与近期信号 |

## Notes
- Page-level rates use `page_size` from each run metadata.
- Cause categories are heuristic clusters from `why_short`; review representative rows before making product decisions.
