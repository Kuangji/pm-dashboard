# Channel Search Provider Comparison

- keyword: agricultural products
- platform: instagram
- country: -
- left: nox@promotion-capacity-v1 (tmp/channel-search-review/20260528-nox-vs-xtb-10kw2-instagram-global-front10-promotion-capacity-v1/agricultural-products/nox-instagram)
- right: xtb@promotion-capacity-v1 (tmp/channel-search-review/20260528-nox-vs-xtb-10kw2-instagram-global-front10-promotion-capacity-v1/agricultural-products/xtb-instagram)
- left_rule_version: promotion-capacity-v1
- right_rule_version: promotion-capacity-v1
- left_prompt_hash: b87da85cf79a
- right_prompt_hash: b87da85cf79a

## Run Overview
| run | provider | rule_version | total | fit | adjacent | badcase | badcase率 | <0 | 0-9 | 10-19 | 20+ |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| nox@promotion-capacity-v1 | nox | promotion-capacity-v1 | 500 | 186 | 186 | 128 | 25.6% | 25 | 219 | 97 | 159 |
| xtb@promotion-capacity-v1 | xtb | promotion-capacity-v1 | 500 | 190 | 180 | 130 | 26.0% | 11 | 222 | 101 | 166 |

## Page-Level Badcase Rate
| page | nox@promotion-capacity-v1_total | nox@promotion-capacity-v1_badcase | nox@promotion-capacity-v1_badcase率 | xtb@promotion-capacity-v1_total | xtb@promotion-capacity-v1_badcase | xtb@promotion-capacity-v1_badcase率 | badcase率差 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 50 | 13 | 26.0% | 50 | 10 | 20.0% | 6.0% |
| 2 | 50 | 11 | 22.0% | 50 | 7 | 14.0% | 8.0% |
| 3 | 50 | 9 | 18.0% | 50 | 14 | 28.0% | -10.0% |
| 4 | 50 | 11 | 22.0% | 50 | 13 | 26.0% | -4.0% |
| 5 | 50 | 19 | 38.0% | 50 | 13 | 26.0% | 12.0% |
| 6 | 50 | 14 | 28.0% | 50 | 13 | 26.0% | 2.0% |
| 7 | 50 | 7 | 14.0% | 50 | 13 | 26.0% | -12.0% |
| 8 | 50 | 16 | 32.0% | 50 | 14 | 28.0% | 4.0% |
| 9 | 50 | 16 | 32.0% | 50 | 15 | 30.0% | 2.0% |
| 10 | 50 | 12 | 24.0% | 50 | 18 | 36.0% | -12.0% |

## Badcase Overlap
| metric | count |
| --- | --- |
| shared_badcase | 12 |
| nox@promotion-capacity-v1_only_badcase | 116 |
| xtb@promotion-capacity-v1_only_badcase | 118 |

## Badcase Cause Summary
| provider | category | count |
| --- | --- | --- |
| nox@promotion-capacity-v1 | 其他 | 52 |
| nox@promotion-capacity-v1 | 泛相关性偏离 | 43 |
| nox@promotion-capacity-v1 | 证据缺失或信号不足 | 21 |
| nox@promotion-capacity-v1 | 娱乐/儿童/泛内容偏离 | 10 |
| nox@promotion-capacity-v1 | 科技/电子垂类偏离 | 2 |
| xtb@promotion-capacity-v1 | 证据缺失或信号不足 | 60 |
| xtb@promotion-capacity-v1 | 其他 | 41 |
| xtb@promotion-capacity-v1 | 泛相关性偏离 | 21 |
| xtb@promotion-capacity-v1 | 娱乐/儿童/泛内容偏离 | 6 |
| xtb@promotion-capacity-v1 | 科技/电子垂类偏离 | 1 |
| xtb@promotion-capacity-v1 | 宠物/动物受众冲突 | 1 |

## Shared Badcases
| channel | nox@promotion-capacity-v1 | xtb@promotion-capacity-v1 |
| --- | --- | --- |
| Re:wild | 偏野生动物保护，与农业产品推广场景不符 | 野生动物与保育主轴，和农产品推广明显不符 |
| Freshwaters Illustrated | 偏自然保护与影片内容，不适合农业产品推广 | 自然纪录片/水生态内容，相关性低 |
| BNSF Railway | 铁路职业向，与农业产品无关 | 铁路物流号，和农产品受众不匹配 |
| Fay Ranches | 牧场地产内容，偏土地交易而非农产品 | 野生动物/纪录片方向，与农产品推广不符 |
| Sheri Winter Parker | North Fork Real Estate | Corcoran | 房产账号，与农业产品推广无关 | 地产账号，与农产品推广场景无关 |
| Director of Field Operations | 执法安全向，与农业产品无关 | 执法与边检内容为主，不适合农产品推广。 |
| Marbleseed | 无有效标签与内容证据，相关性不足 | 无标签无内容证据，相关性不足 |
| Mirr Ranch Group | 无标签、无内容证据，相关性不足 | 缺少农业产品相关证据 |
| Stealth Machine Tools inc | 无农业语义，且更像工业机加工品牌，不适合 | 机械工具制造，缺少农产品受众 |
| 1st Products Inc | 仅有公司名，无农业主题证据 | 仅有公司名，缺少农业相关证据 |
| Free From Harm | 以 vegan 立场为主，和农产品推广明显冲突 | 以素食和动物权益倡议为主，和多数农产品推广方向冲突 |
| Damian Mason | 无农业相关信号 | 无农业标签或内容证据 |

## nox@promotion-capacity-v1-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 2 | Scooby | -15 | 娱乐游戏向，和农业产品推广几乎无关 |
| 10 | David Shapiro | 2 | 仅有泛化产品词，缺少农业语境 |
| 11 | Ertl | 8 | 农场玩具品牌，和真实农业产品推广不完全一致 |
| 13 | Power Of Africa | -10 | 故事娱乐向，和农业产品推广不相关 |
| 14 | World Bank Group | 1 | 有食物话题，但偏发展/政策，不是农业产品推广 |
| 15 | Ace ♤ | -10 | 医疗健康向，与农业产品不相关 |
| 19 | Carmen Pratt | 0 | 素食生活与健康话题，农业产品相关性弱 |
| 23 | DANI  •  KLASS | 0 | 日常励志向，与农业产品无关 |
| 25 | US Customs & Border Protection | 0 | 执法机构账号，与农业产品无关 |
| 46 | Ganjapreneur | -8 | 聚焦大麻行业新闻，和泛农业产品投放不匹配 |
| 60 | Hall and Hall | 0 | 牧场地产内容，偏土地交易而非农产品 |
| 61 | Historic Propertunities | 0 | 历史/社区内容为主，农业无关 |
| 73 | Animal Outlook | Undercover Investigations | 5 | 素食调查立场与农业推广冲突明显 |
| 74 | Lynn Richardson | 0 | 生活/商务泛内容，和农业无关 |
| 75 | Dr.Banana | 0 | 无有效标签，无法判断相关性 |
| 79 | Wrestling Club at FAMU | -15 | 摔跤社团，和农业产品推广完全不相关 |
| 92 | Trillionaire Estates ⚜️ | -15 | 豪宅房产账号，与农业产品无关 |
| 93 | BID | 0 | 拉美科技泛议题账号，农业产品相关性弱 |
| 98 | Backslash | 0 | 科技商业话题，缺少农业产品受众 |
| 110 | Parsons Healthy Materials Lab | 0 | 设计建筑向，与农业产品无关 |
| 129 | The Seeds Of Vandana Shiva | 5 | 农业相关但电影表达占主导，推广型弱 |
| 136 | Rowdy Girl Sanctuary, Inc. | 5 | 素食/动物保护立场与农产品推广冲突 |
| 141 | The Regenaissance | 0 | 无标签、无内容证据，相关性不足 |
| 142 | UCDavisPlants | 0 | 无标签，只有名称线索，证据不足 |
| 143 | Chula Beauregard Fine Art | -15 | 纯艺术频道，与农产品推广不相干 |
| 156 | ITPC Los Angeles | 0 | 贸易机构账号，农业产品相关性弱 |
| 157 | 420 WASTED | 0 | 标签为空且语义偏娱乐/泛内容，农业相关性不足 |
| 159 | Pratt GA/LA/UD | 0 | 设计教育类账号，与农业产品无关 |
| 167 | Cowspiracy | -5 | 以 vegan/反动物农业为主，和农产品推广目标冲突 |
| 170 | Aga Khan Development Network | 0 | 发展机构内容与农业产品推广不匹配 |

## xtb@promotion-capacity-v1-Only Badcases
| rank | channel | score | reason |
| --- | --- | --- | --- |
| 18 | HMJ AGRO PVT. LTD. | 0 | 无有效标签，农业相关证据缺失 |
| 20 | 👩🏻‍🌾دختر مزرعه🌱 | 0 | 标签缺失，农业产品相关证据不足 |
| 24 | jalil_ahmadi__1964 | 0 | 无标签与内容证据，难判为相关 |
| 34 | Dharamjeet_Singh_Chahal | 0 | 无标签无内容证据 |
| 36 | Miloš Spasojević | 0 | 无标签无内容证据 |
| 37 | شرکت نگین سبز ساوه | 0 | 信息不足，无法判断农产品相关性 |
| 38 | Rinku | 0 | 健身内容与农产品推广无关 |
| 42 | КАПСУЛЫ ДЛЯ ПОХУДЕНИЯ💊АСТАНА АҚТӨБЕ АЛМАТЫ | 0 | 减肥胶囊与农产品类目不相关 |
| 43 | I DON’T WANT TO DROP OUT 🥹😩 | -15 | 娱乐短视频为主，和农产品推广场景不符 |
| 48 | Claudio Neri Tarciso Lima | 0 | 无标签无内容证据 |
| 61 | AMYZ | 0 | 无有效农业信息，无法判断相关性 |
| 65 | For The Nature | 0 | 自然风景号，缺少农产品推广场景 |
| 69 | Anvar Haqberdiyev | 0 | 无标签无视频，相关性不足 |
| 74 | João_Paulo | 0 | 无有效标签，相关性不足 |
| 78 | Vanlalchhanchhuahi Ralte | 0 | 仅摄影标签，与农产品推广无关 |
| 82 | Agro Jabotoma- Lucelia Aparecida da Costa | 0 | 无标签，无相关证据 |
| 98 | agro _br | 0 | 仅编辑标签，无农业相关性 |
| 102 | Gislaine Marques | 0 | 无标签，无法判断相关性 |
| 109 | Соғым Талдыкорган Доставка | 0 | 无标签，缺少农业语义 |
| 116 | pradip | 5 | 有农业标签，但主内容偏娱乐 |
| 117 | Самал Ишангалиева | 0 | 无标签，缺少农业语义 |
| 118 | Shivani Ji Diwakar | 0 | 无标签，缺少农业语义 |
| 119 | Valdir Misnerovicz | 1 | 仅有 food 泛标签，缺少农产品语义 |
| 122 | krishi yantra | 0 | 偏泛流量与工程向，和农业产品不匹配 |
| 130 | Santi Arnaudo | 0 | 无有效标签，无法判断相关性 |
| 131 | Murilo Groth | -15 | 娱乐和游戏占主导，不适合农产品推广 |
| 134 | Jose A Perez | 0 | 无有效标签，无法判断相关性 |
| 136 | GILIANA  MORO | 0 | 无有效标签，无法判断相关性 |
| 141 | Seis Tierras | 0 | 无有效标签，无法判断相关性 |
| 144 | Marcelo Pina | 0 | 无有效标签，无法判断相关性 |

## Notes
- Page-level rates use `page_size` from each run metadata.
- Cause categories are heuristic clusters from `why_short`; review representative rows before making product decisions.
