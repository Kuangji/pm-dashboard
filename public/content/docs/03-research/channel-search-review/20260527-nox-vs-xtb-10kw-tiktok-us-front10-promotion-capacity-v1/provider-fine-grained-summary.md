# Tiktok US Channel Search Front10 Review

## 文档定位

本文档承接 root README 中拆出的细粒度数据，重点保留 provider × keyword × page 的横向聚合表、runtime 表和明细入口；root README 仅保留范围、关键结论和导航。


## Scope
- 本轮范围：Tiktok / US / nox vs xtb / 10 keywords / 前 10 页 / 每页 50 条 / Agent 评分。
- Nox 侧使用 Playwright MCP 真实浏览器上下文采集输入文件，原因是本地 headless/Node 未走代理会触发 Nox 403；评分仍全部走同一 Agent prompt 与模型。
- 低置信度复判未启用；各 `scores.json.low_confidence_review.enabled=false`，仅保留低置信度标注状态块。
- `swim vest / xtb` 首轮采集遇到 XTB API 500，稍后直接重试恢复并补跑完成；原失败记录留存在 `task_failures.resolved.json`。
- 本轮最终 20 个 provider run 均为 500/500、failed=0。

## Provider Overview By Keyword
| keyword | nox badcase率 | xtb badcase率 | 差值(nox-xtb) | nox labels | xtb labels | nox avg/channel | xtb avg/channel | 文档 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| coffee machine | 44.6% | 23.0% | 21.6% | fit 67, adjacent 210, badcase 223 | fit 180, adjacent 205, badcase 115 | 6.6s | 11.6s | [provider-comparison.md](coffee-machine/provider-comparison.md) |
| lawn mower | 44.6% | 23.6% | 21.0% | fit 148, adjacent 129, badcase 223 | fit 185, adjacent 197, badcase 118 | 6.6s | 13.4s | [provider-comparison.md](lawn-mower/provider-comparison.md) |
| tech | 9.0% | 22.8% | -13.8% | fit 292, adjacent 163, badcase 45 | fit 235, adjacent 151, badcase 114 | 6.2s | 14.4s | [provider-comparison.md](tech/provider-comparison.md) |
| fashion | 0.6% | 3.0% | -2.4% | fit 442, adjacent 55, badcase 3 | fit 356, adjacent 129, badcase 15 | 4.4s | 7.6s | [provider-comparison.md](fashion/provider-comparison.md) |
| lifestyle | 4.2% | 1.8% | 2.4% | fit 419, adjacent 60, badcase 21 | fit 353, adjacent 138, badcase 9 | 4.5s | 7.2s | [provider-comparison.md](lifestyle/provider-comparison.md) |
| power bank | 42.4% | 12.6% | 29.8% | fit 192, adjacent 96, badcase 212 | fit 262, adjacent 175, badcase 63 | 7.1s | 11.6s | [provider-comparison.md](power-bank/provider-comparison.md) |
| swim vest | 65.0% | 39.4% | 25.6% | fit 3, adjacent 172, badcase 325 | fit 49, adjacent 254, badcase 197 | 6.5s | 9.6s | [provider-comparison.md](swim-vest/provider-comparison.md) |
| vacuum cleaner | 32.0% | 20.6% | 11.4% | fit 237, adjacent 103, badcase 160 | fit 226, adjacent 171, badcase 103 | 7.0s | 10.5s | [provider-comparison.md](vacuum-cleaner/provider-comparison.md) |
| baby supplement | 58.6% | 18.0% | 40.6% | fit 21, adjacent 186, badcase 293 | fit 105, adjacent 305, badcase 90 | 6.0s | 11.5s | [provider-comparison.md](baby-supplement/provider-comparison.md) |
| pet food | 37.6% | 19.2% | 18.4% | fit 124, adjacent 188, badcase 188 | fit 241, adjacent 163, badcase 96 | 7.1s | 12.2s | [provider-comparison.md](pet-food/provider-comparison.md) |

## Runtime Overview
| keyword | provider | completed | failed | avg shard | avg channel | timed records | tasks | low confidence review |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| coffee machine | nox | 500 | 0 | 157.0s | 6.6s | 501 | 21 | false |
| coffee machine | xtb | 500 | 0 | 118.9s | 11.6s | 532 | 52 | false |
| lawn mower | nox | 500 | 0 | 164.2s | 6.6s | 500 | 20 | false |
| lawn mower | xtb | 500 | 0 | 110.8s | 13.4s | 546 | 66 | false |
| tech | nox | 500 | 0 | 146.9s | 6.2s | 501 | 21 | false |
| tech | xtb | 500 | 0 | 100.8s | 14.4s | 560 | 80 | false |
| fashion | nox | 500 | 0 | 109.2s | 4.4s | 500 | 20 | false |
| fashion | xtb | 500 | 0 | 159.3s | 7.6s | 504 | 24 | false |
| lifestyle | nox | 500 | 0 | 108.4s | 4.5s | 501 | 21 | false |
| lifestyle | xtb | 500 | 0 | 151.3s | 7.2s | 504 | 24 | false |
| power bank | nox | 500 | 0 | 168.7s | 7.1s | 501 | 21 | false |
| power bank | xtb | 500 | 0 | 130.6s | 11.6s | 527 | 47 | false |
| swim vest | nox | 500 | 0 | 161.9s | 6.5s | 500 | 20 | false |
| swim vest | xtb | 500 | 0 | 134.4s | 9.6s | 517 | 37 | false |
| vacuum cleaner | nox | 500 | 0 | 176.0s | 7.0s | 500 | 20 | false |
| vacuum cleaner | xtb | 500 | 0 | 136.4s | 10.5s | 520 | 40 | false |
| baby supplement | nox | 500 | 0 | 149.0s | 6.0s | 500 | 20 | false |
| baby supplement | xtb | 500 | 0 | 134.2s | 11.5s | 525 | 45 | false |
| pet food | nox | 500 | 0 | 168.4s | 7.1s | 501 | 21 | false |
| pet food | xtb | 500 | 0 | 155.5s | 12.2s | 521 | 41 | false |

## Page-Level Badcase Rate
| keyword | page | nox total | nox badcase | nox badcase率 | xtb total | xtb badcase | xtb badcase率 | 差值 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| coffee machine | 1 | 50 | 14 | 28.0% | 50 | 11 | 22.0% | 6.0% |
| coffee machine | 2 | 50 | 16 | 32.0% | 50 | 7 | 14.0% | 18.0% |
| coffee machine | 3 | 50 | 20 | 40.0% | 50 | 9 | 18.0% | 22.0% |
| coffee machine | 4 | 50 | 25 | 50.0% | 50 | 6 | 12.0% | 38.0% |
| coffee machine | 5 | 50 | 29 | 58.0% | 50 | 9 | 18.0% | 40.0% |
| coffee machine | 6 | 50 | 24 | 48.0% | 50 | 12 | 24.0% | 24.0% |
| coffee machine | 7 | 50 | 27 | 54.0% | 50 | 13 | 26.0% | 28.0% |
| coffee machine | 8 | 50 | 19 | 38.0% | 50 | 15 | 30.0% | 8.0% |
| coffee machine | 9 | 50 | 31 | 62.0% | 50 | 14 | 28.0% | 34.0% |
| coffee machine | 10 | 50 | 18 | 36.0% | 50 | 19 | 38.0% | -2.0% |
| lawn mower | 1 | 50 | 15 | 30.0% | 50 | 14 | 28.0% | 2.0% |
| lawn mower | 2 | 50 | 9 | 18.0% | 50 | 13 | 26.0% | -8.0% |
| lawn mower | 3 | 50 | 8 | 16.0% | 50 | 9 | 18.0% | -2.0% |
| lawn mower | 4 | 50 | 16 | 32.0% | 50 | 15 | 30.0% | 2.0% |
| lawn mower | 5 | 50 | 38 | 76.0% | 50 | 12 | 24.0% | 52.0% |
| lawn mower | 6 | 50 | 27 | 54.0% | 50 | 10 | 20.0% | 34.0% |
| lawn mower | 7 | 50 | 22 | 44.0% | 50 | 14 | 28.0% | 16.0% |
| lawn mower | 8 | 50 | 27 | 54.0% | 50 | 10 | 20.0% | 34.0% |
| lawn mower | 9 | 50 | 33 | 66.0% | 50 | 14 | 28.0% | 38.0% |
| lawn mower | 10 | 50 | 28 | 56.0% | 50 | 7 | 14.0% | 42.0% |
| tech | 1 | 50 | 0 | 0.0% | 50 | 3 | 6.0% | -6.0% |
| tech | 2 | 50 | 3 | 6.0% | 50 | 2 | 4.0% | 2.0% |
| tech | 3 | 50 | 3 | 6.0% | 50 | 13 | 26.0% | -20.0% |
| tech | 4 | 50 | 3 | 6.0% | 50 | 6 | 12.0% | -6.0% |
| tech | 5 | 50 | 4 | 8.0% | 50 | 9 | 18.0% | -10.0% |
| tech | 6 | 50 | 4 | 8.0% | 50 | 11 | 22.0% | -14.0% |
| tech | 7 | 50 | 4 | 8.0% | 50 | 20 | 40.0% | -32.0% |
| tech | 8 | 50 | 5 | 10.0% | 50 | 11 | 22.0% | -12.0% |
| tech | 9 | 50 | 7 | 14.0% | 50 | 22 | 44.0% | -30.0% |
| tech | 10 | 50 | 12 | 24.0% | 50 | 17 | 34.0% | -10.0% |
| fashion | 1 | 50 | 1 | 2.0% | 50 | 2 | 4.0% | -2.0% |
| fashion | 2 | 50 | 1 | 2.0% | 50 | 2 | 4.0% | -2.0% |
| fashion | 3 | 50 | 0 | 0.0% | 50 | 1 | 2.0% | -2.0% |
| fashion | 4 | 50 | 0 | 0.0% | 50 | 0 | 0.0% | 0.0% |
| fashion | 5 | 50 | 0 | 0.0% | 50 | 1 | 2.0% | -2.0% |
| fashion | 6 | 50 | 0 | 0.0% | 50 | 3 | 6.0% | -6.0% |
| fashion | 7 | 50 | 0 | 0.0% | 50 | 0 | 0.0% | 0.0% |
| fashion | 8 | 50 | 0 | 0.0% | 50 | 4 | 8.0% | -8.0% |
| fashion | 9 | 50 | 0 | 0.0% | 50 | 1 | 2.0% | -2.0% |
| fashion | 10 | 50 | 1 | 2.0% | 50 | 1 | 2.0% | 0.0% |
| lifestyle | 1 | 50 | 0 | 0.0% | 50 | 1 | 2.0% | -2.0% |
| lifestyle | 2 | 50 | 2 | 4.0% | 50 | 3 | 6.0% | -2.0% |
| lifestyle | 3 | 50 | 2 | 4.0% | 50 | 0 | 0.0% | 4.0% |
| lifestyle | 4 | 50 | 1 | 2.0% | 50 | 1 | 2.0% | 0.0% |
| lifestyle | 5 | 50 | 2 | 4.0% | 50 | 0 | 0.0% | 4.0% |
| lifestyle | 6 | 50 | 2 | 4.0% | 50 | 1 | 2.0% | 2.0% |
| lifestyle | 7 | 50 | 3 | 6.0% | 50 | 1 | 2.0% | 4.0% |
| lifestyle | 8 | 50 | 1 | 2.0% | 50 | 0 | 0.0% | 2.0% |
| lifestyle | 9 | 50 | 2 | 4.0% | 50 | 0 | 0.0% | 4.0% |
| lifestyle | 10 | 50 | 6 | 12.0% | 50 | 2 | 4.0% | 8.0% |
| power bank | 1 | 50 | 19 | 38.0% | 50 | 3 | 6.0% | 32.0% |
| power bank | 2 | 50 | 27 | 54.0% | 50 | 8 | 16.0% | 38.0% |
| power bank | 3 | 50 | 34 | 68.0% | 50 | 7 | 14.0% | 54.0% |
| power bank | 4 | 50 | 32 | 64.0% | 50 | 5 | 10.0% | 54.0% |
| power bank | 5 | 50 | 38 | 76.0% | 50 | 2 | 4.0% | 72.0% |
| power bank | 6 | 50 | 27 | 54.0% | 50 | 9 | 18.0% | 36.0% |
| power bank | 7 | 50 | 18 | 36.0% | 50 | 3 | 6.0% | 30.0% |
| power bank | 8 | 50 | 9 | 18.0% | 50 | 12 | 24.0% | -6.0% |
| power bank | 9 | 50 | 8 | 16.0% | 50 | 7 | 14.0% | 2.0% |
| power bank | 10 | 50 | 0 | 0.0% | 50 | 7 | 14.0% | -14.0% |
| swim vest | 1 | 50 | 21 | 42.0% | 50 | 17 | 34.0% | 8.0% |
| swim vest | 2 | 50 | 31 | 62.0% | 50 | 13 | 26.0% | 36.0% |
| swim vest | 3 | 50 | 36 | 72.0% | 50 | 13 | 26.0% | 46.0% |
| swim vest | 4 | 50 | 34 | 68.0% | 50 | 17 | 34.0% | 34.0% |
| swim vest | 5 | 50 | 30 | 60.0% | 50 | 17 | 34.0% | 26.0% |
| swim vest | 6 | 50 | 30 | 60.0% | 50 | 24 | 48.0% | 12.0% |
| swim vest | 7 | 50 | 36 | 72.0% | 50 | 28 | 56.0% | 16.0% |
| swim vest | 8 | 50 | 32 | 64.0% | 50 | 23 | 46.0% | 18.0% |
| swim vest | 9 | 50 | 42 | 84.0% | 50 | 25 | 50.0% | 34.0% |
| swim vest | 10 | 50 | 33 | 66.0% | 50 | 20 | 40.0% | 26.0% |
| vacuum cleaner | 1 | 50 | 33 | 66.0% | 50 | 4 | 8.0% | 58.0% |
| vacuum cleaner | 2 | 50 | 28 | 56.0% | 50 | 9 | 18.0% | 38.0% |
| vacuum cleaner | 3 | 50 | 25 | 50.0% | 50 | 12 | 24.0% | 26.0% |
| vacuum cleaner | 4 | 50 | 8 | 16.0% | 50 | 14 | 28.0% | -12.0% |
| vacuum cleaner | 5 | 50 | 11 | 22.0% | 50 | 12 | 24.0% | -2.0% |
| vacuum cleaner | 6 | 50 | 5 | 10.0% | 50 | 13 | 26.0% | -16.0% |
| vacuum cleaner | 7 | 50 | 7 | 14.0% | 50 | 3 | 6.0% | 8.0% |
| vacuum cleaner | 8 | 50 | 10 | 20.0% | 50 | 13 | 26.0% | -6.0% |
| vacuum cleaner | 9 | 50 | 14 | 28.0% | 50 | 10 | 20.0% | 8.0% |
| vacuum cleaner | 10 | 50 | 19 | 38.0% | 50 | 13 | 26.0% | 12.0% |
| baby supplement | 1 | 50 | 21 | 42.0% | 50 | 13 | 26.0% | 16.0% |
| baby supplement | 2 | 50 | 20 | 40.0% | 50 | 9 | 18.0% | 22.0% |
| baby supplement | 3 | 50 | 26 | 52.0% | 50 | 8 | 16.0% | 36.0% |
| baby supplement | 4 | 50 | 27 | 54.0% | 50 | 6 | 12.0% | 42.0% |
| baby supplement | 5 | 50 | 30 | 60.0% | 50 | 10 | 20.0% | 40.0% |
| baby supplement | 6 | 50 | 33 | 66.0% | 50 | 10 | 20.0% | 46.0% |
| baby supplement | 7 | 50 | 33 | 66.0% | 50 | 7 | 14.0% | 52.0% |
| baby supplement | 8 | 50 | 35 | 70.0% | 50 | 11 | 22.0% | 48.0% |
| baby supplement | 9 | 50 | 32 | 64.0% | 50 | 7 | 14.0% | 50.0% |
| baby supplement | 10 | 50 | 36 | 72.0% | 50 | 9 | 18.0% | 54.0% |
| pet food | 1 | 50 | 23 | 46.0% | 50 | 4 | 8.0% | 38.0% |
| pet food | 2 | 50 | 11 | 22.0% | 50 | 6 | 12.0% | 10.0% |
| pet food | 3 | 50 | 14 | 28.0% | 50 | 13 | 26.0% | 2.0% |
| pet food | 4 | 50 | 15 | 30.0% | 50 | 8 | 16.0% | 14.0% |
| pet food | 5 | 50 | 16 | 32.0% | 50 | 11 | 22.0% | 10.0% |
| pet food | 6 | 50 | 22 | 44.0% | 50 | 13 | 26.0% | 18.0% |
| pet food | 7 | 50 | 23 | 46.0% | 50 | 9 | 18.0% | 28.0% |
| pet food | 8 | 50 | 15 | 30.0% | 50 | 8 | 16.0% | 14.0% |
| pet food | 9 | 50 | 23 | 46.0% | 50 | 12 | 24.0% | 22.0% |
| pet food | 10 | 50 | 26 | 52.0% | 50 | 12 | 24.0% | 28.0% |

## Root Artifacts
- [xtb-vs-nox-sorting-effect-report.md](xtb-vs-nox-sorting-effect-report.md): 全局排序/页面聚合辅助报告。
- [task_failures.resolved.json](task_failures.resolved.json): 已补成功的历史失败记录。

## Keyword Reports
- coffee machine: [coffee-machine/provider-comparison.md](coffee-machine/provider-comparison.md), [coffee-machine/README.md](coffee-machine/README.md)
- lawn mower: [lawn-mower/provider-comparison.md](lawn-mower/provider-comparison.md), [lawn-mower/README.md](lawn-mower/README.md)
- tech: [tech/provider-comparison.md](tech/provider-comparison.md), [tech/README.md](tech/README.md)
- fashion: [fashion/provider-comparison.md](fashion/provider-comparison.md), [fashion/README.md](fashion/README.md)
- lifestyle: [lifestyle/provider-comparison.md](lifestyle/provider-comparison.md), [lifestyle/README.md](lifestyle/README.md)
- power bank: [power-bank/provider-comparison.md](power-bank/provider-comparison.md), [power-bank/README.md](power-bank/README.md)
- swim vest: [swim-vest/provider-comparison.md](swim-vest/provider-comparison.md), [swim-vest/README.md](swim-vest/README.md)
- vacuum cleaner: [vacuum-cleaner/provider-comparison.md](vacuum-cleaner/provider-comparison.md), [vacuum-cleaner/README.md](vacuum-cleaner/README.md)
- baby supplement: [baby-supplement/provider-comparison.md](baby-supplement/provider-comparison.md), [baby-supplement/README.md](baby-supplement/README.md)
- pet food: [pet-food/provider-comparison.md](pet-food/provider-comparison.md), [pet-food/README.md](pet-food/README.md)
