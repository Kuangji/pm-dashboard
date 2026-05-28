# YouTube US Channel Search Front10 Review

## 本轮范围
- 平台/国家：YouTube / US。
- Provider：nox vs xtb。
- 采样：10 keywords / 前 10 页 / 每页 50 条；`swim vest`、`baby supplement` 因实际召回不足，按实际返回条数评分。
- 评分：`promotion-capacity-v1`，主评分模型 `gpt-5.4-mini`。
- 低置信度复判未启用，仅保留 `low_confidence_review.enabled=false` 状态块。
- Nox 侧部分输入使用 browser-context 采集；normalized 记录未逐条保留 `raw_meta.page_number`，逐页分析以 rank 推导页码。

## 关键结论
- 整体 badcase率：nox 25.6%，xtb 19.2%，XTB 比 nox 低 6.4pp。
- 同页排序对比：XTB 在 52/85 个可比页优于 nox，8/10 个关键词整体改善。
- 头部页：1-3 页 XTB 比 nox 低 7.7pp；尾部 8-10 页低 8.6pp。
- 主要正向关键词：baby supplement、coffee machine、lawn mower、power bank、swim vest、vacuum cleaner。
- 主要偏离关键词：fashion、lifestyle 整体变差；fashion、lifestyle、tech 的头部 1-3 页未达预期。
- 完整性：20/20 个 provider run 均有评分结果，合计 8471/8471 条 completed，failed 0。

## 怎么看这批产物
- [provider-fine-grained-summary.md](provider-fine-grained-summary.md): provider × keyword 的总览、汇总计数、runtime 与数据注意事项，承接 README 拆出的完整明细。
- [xtb-vs-nox-sorting-effect-report.md](xtb-vs-nox-sorting-effect-report.md): 专门回答“XTB 是否在同页、头部页、页码梯度上优于 nox”。
- [xtb-vs-nox-sorting-effect-data.json](xtb-vs-nox-sorting-effect-data.json): 排序效果报告的结构化证据数据。
- [review-package.jsonl.gz](review-package.jsonl.gz): 插件导入用 root 级压缩数据包，包含 20 个 run、8471 条记录。
- 各 keyword 目录：保留 keyword README、provider-comparison、provider summary/badcases/scores 等直接证据。

## Keyword 入口
- coffee machine: [README.md](coffee-machine/README.md), [provider-comparison.md](coffee-machine/provider-comparison.md)
- lawn mower: [README.md](lawn-mower/README.md), [provider-comparison.md](lawn-mower/provider-comparison.md)
- tech: [README.md](tech/README.md), [provider-comparison.md](tech/provider-comparison.md)
- fashion: [README.md](fashion/README.md), [provider-comparison.md](fashion/provider-comparison.md)
- lifestyle: [README.md](lifestyle/README.md), [provider-comparison.md](lifestyle/provider-comparison.md)
- power bank: [README.md](power-bank/README.md), [provider-comparison.md](power-bank/provider-comparison.md)
- swim vest: [README.md](swim-vest/README.md), [provider-comparison.md](swim-vest/provider-comparison.md)
- vacuum cleaner: [README.md](vacuum-cleaner/README.md), [provider-comparison.md](vacuum-cleaner/provider-comparison.md)
- baby supplement: [README.md](baby-supplement/README.md), [provider-comparison.md](baby-supplement/provider-comparison.md)
- pet food: [README.md](pet-food/README.md), [provider-comparison.md](pet-food/provider-comparison.md)
