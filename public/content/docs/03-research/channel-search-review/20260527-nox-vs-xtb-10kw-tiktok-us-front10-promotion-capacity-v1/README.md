# TikTok US Channel Search Front10 Review

## 本轮范围
- 平台/国家：TikTok / US。
- Provider：nox vs xtb。
- 采样：10 keywords / 前 10 页 / 每页 50 条。
- 评分：同一 Agent prompt 与模型基准，低置信度复判未启用，仅保留 `low_confidence_review.enabled=false` 状态块。
- Nox 侧使用 Playwright MCP 真实浏览器上下文采集输入文件，原因是本地 headless/Node 未走代理会触发 Nox 403。
- `swim vest / xtb` 首轮采集遇到 XTB API 500，稍后重试恢复；历史记录保留在 `task_failures.resolved.json`。

## 关键结论
- 整体 badcase率：nox 33.9%，xtb 18.4%，XTB 比 nox 低 15.5pp。
- 同页排序对比：XTB 在 69/100 个可比页优于 nox，8/10 个关键词整体改善。
- 头部页：1-3 页 XTB 比 nox 低 15.6pp；尾部 8-10 页低 13.2pp。
- 主要正向关键词：baby supplement、coffee machine、pet food、power bank、swim vest。
- 主要偏离关键词：fashion、tech 整体变差；fashion、lawn mower、tech 的头部 1-3 页未达预期。

## 怎么看这批产物
- [provider-fine-grained-summary.md](provider-fine-grained-summary.md): provider × keyword × page 的细粒度聚合表，承接 README 拆出的完整明细。
- [xtb-vs-nox-sorting-effect-report.md](xtb-vs-nox-sorting-effect-report.md): 专门回答“XTB 是否在同页、头部页、页码梯度上优于 nox”。
- [aggregate_summary.csv](aggregate_summary.csv): keyword 级聚合数据表。
- [review-package.jsonl.gz](review-package.jsonl.gz): 插件导入用 root 级压缩数据包。
- 各 keyword 目录：保留 keyword README、provider-comparison、provider summary/badcases/scores 等直接证据。

- [task_failures.resolved.json](task_failures.resolved.json): 已补成功的历史失败记录。

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
