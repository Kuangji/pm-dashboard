# Instagram US Channel Search Front10 Review

## Scope
- 本轮范围：Instagram / US / nox vs xtb / 10 keywords / 前 10 页 / 每页 50 条 / Agent 评分。
- Nox 侧使用 Playwright MCP 真实浏览器上下文采集输入文件，原因是本地 headless/Node 未走代理会触发 Nox 403；评分仍全部走同一 Agent prompt 与模型。
- 低置信度复判未启用；各 `scores.json.low_confidence_review.enabled=false`，仅保留低置信度标注状态块。
- 本轮中若单个 agent shard 输出缺项，runner 已按缺失 record 自动 retry；最终 20 个 provider run 均为 500/500、failed=0。

## Provider Overview By Keyword
| keyword | nox badcase率 | xtb badcase率 | 差值(nox-xtb) | nox labels | xtb labels | nox avg/channel | xtb avg/channel | 文档 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| coffee machine | 33.6% | 32.2% | 1.4% | fit 91, adjacent 241, badcase 168 | fit 89, adjacent 250, badcase 161 | 7.5s | 7.1s | [provider-comparison.md](coffee-machine/provider-comparison.md) |
| lawn mower | 26.4% | 21.6% | 4.8% | fit 151, adjacent 217, badcase 132 | fit 156, adjacent 236, badcase 108 | 5.8s | 7.3s | [provider-comparison.md](lawn-mower/provider-comparison.md) |
| tech | 35.0% | 5.6% | 29.4% | fit 181, adjacent 144, badcase 175 | fit 196, adjacent 276, badcase 28 | 6.5s | 7.8s | [provider-comparison.md](tech/provider-comparison.md) |
| fashion | 0.0% | 1.0% | -1.0% | fit 401, adjacent 99, badcase 0 | fit 361, adjacent 134, badcase 5 | 4.8s | 4.9s | [provider-comparison.md](fashion/provider-comparison.md) |
| lifestyle | 2.4% | 0.2% | 2.2% | fit 414, adjacent 74, badcase 12 | fit 402, adjacent 97, badcase 1 | 5.4s | 4.3s | [provider-comparison.md](lifestyle/provider-comparison.md) |
| power bank | 63.2% | 61.8% | 1.4% | fit 47, adjacent 137, badcase 316 | fit 67, adjacent 124, badcase 309 | 5.8s | 6.7s | [provider-comparison.md](power-bank/provider-comparison.md) |
| swim vest | 61.0% | 55.2% | 5.8% | fit 8, adjacent 187, badcase 305 | fit 18, adjacent 206, badcase 276 | 5.2s | 5.8s | [provider-comparison.md](swim-vest/provider-comparison.md) |
| vacuum cleaner | 31.6% | 25.0% | 6.6% | fit 110, adjacent 232, badcase 158 | fit 100, adjacent 275, badcase 125 | 6.0s | 6.8s | [provider-comparison.md](vacuum-cleaner/provider-comparison.md) |
| baby supplement | 24.4% | 24.2% | 0.2% | fit 117, adjacent 261, badcase 122 | fit 117, adjacent 262, badcase 121 | 6.0s | 7.0s | [provider-comparison.md](baby-supplement/provider-comparison.md) |
| pet food | 26.0% | 16.2% | 9.8% | fit 155, adjacent 215, badcase 130 | fit 212, adjacent 207, badcase 81 | 6.1s | 7.4s | [provider-comparison.md](pet-food/provider-comparison.md) |

## Runtime Overview
| keyword | provider | completed | failed | avg shard | avg channel | timed records | tasks | low confidence review |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| coffee machine | nox | 500 | 0 | 178.4s | 7.5s | 501 | 21 | false |
| coffee machine | xtb | 500 | 0 | 177.9s | 7.1s | 500 | 20 | false |
| lawn mower | nox | 500 | 0 | 143.9s | 5.8s | 500 | 20 | false |
| lawn mower | xtb | 500 | 0 | 142.6s | 7.3s | 506 | 26 | false |
| tech | nox | 500 | 0 | 163.2s | 6.5s | 500 | 20 | false |
| tech | xtb | 500 | 0 | 186.3s | 7.8s | 501 | 21 | false |
| fashion | nox | 500 | 0 | 120.1s | 4.8s | 500 | 20 | false |
| fashion | xtb | 500 | 0 | 121.7s | 4.9s | 500 | 20 | false |
| lifestyle | nox | 500 | 0 | 63.5s | 5.4s | 525 | 45 | false |
| lifestyle | xtb | 500 | 0 | 102.9s | 4.3s | 501 | 21 | false |
| power bank | nox | 500 | 0 | 145.6s | 5.8s | 500 | 20 | false |
| power bank | xtb | 500 | 0 | 160.6s | 6.7s | 501 | 21 | false |
| swim vest | nox | 500 | 0 | 131.2s | 5.2s | 500 | 20 | false |
| swim vest | xtb | 500 | 0 | 139.2s | 5.8s | 501 | 21 | false |
| vacuum cleaner | nox | 500 | 0 | 142.6s | 6.0s | 501 | 21 | false |
| vacuum cleaner | xtb | 500 | 0 | 132.4s | 6.8s | 506 | 26 | false |
| baby supplement | nox | 500 | 0 | 151.1s | 6.0s | 500 | 20 | false |
| baby supplement | xtb | 500 | 0 | 166.7s | 7.0s | 501 | 21 | false |
| pet food | nox | 500 | 0 | 151.4s | 6.1s | 500 | 20 | false |
| pet food | xtb | 500 | 0 | 169.1s | 7.4s | 502 | 22 | false |

## Page-Level Badcase Rate
| keyword | page | nox total | nox badcase | nox badcase率 | xtb total | xtb badcase | xtb badcase率 | 差值 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| coffee machine | 1 | 50 | 18 | 36.0% | 50 | 7 | 14.0% | 22.0% |
| coffee machine | 2 | 50 | 18 | 36.0% | 50 | 16 | 32.0% | 4.0% |
| coffee machine | 3 | 50 | 16 | 32.0% | 50 | 20 | 40.0% | -8.0% |
| coffee machine | 4 | 50 | 21 | 42.0% | 50 | 18 | 36.0% | 6.0% |
| coffee machine | 5 | 50 | 17 | 34.0% | 50 | 17 | 34.0% | 0.0% |
| coffee machine | 6 | 50 | 15 | 30.0% | 50 | 11 | 22.0% | 8.0% |
| coffee machine | 7 | 50 | 7 | 14.0% | 50 | 17 | 34.0% | -20.0% |
| coffee machine | 8 | 50 | 22 | 44.0% | 50 | 23 | 46.0% | -2.0% |
| coffee machine | 9 | 50 | 16 | 32.0% | 50 | 14 | 28.0% | 4.0% |
| coffee machine | 10 | 50 | 18 | 36.0% | 50 | 18 | 36.0% | 0.0% |
| lawn mower | 1 | 50 | 6 | 12.0% | 50 | 6 | 12.0% | 0.0% |
| lawn mower | 2 | 50 | 14 | 28.0% | 50 | 9 | 18.0% | 10.0% |
| lawn mower | 3 | 50 | 15 | 30.0% | 50 | 2 | 4.0% | 26.0% |
| lawn mower | 4 | 50 | 14 | 28.0% | 50 | 5 | 10.0% | 18.0% |
| lawn mower | 5 | 50 | 16 | 32.0% | 50 | 18 | 36.0% | -4.0% |
| lawn mower | 6 | 50 | 10 | 20.0% | 50 | 5 | 10.0% | 10.0% |
| lawn mower | 7 | 50 | 16 | 32.0% | 50 | 14 | 28.0% | 4.0% |
| lawn mower | 8 | 50 | 7 | 14.0% | 50 | 12 | 24.0% | -10.0% |
| lawn mower | 9 | 50 | 13 | 26.0% | 50 | 15 | 30.0% | -4.0% |
| lawn mower | 10 | 50 | 21 | 42.0% | 50 | 22 | 44.0% | -2.0% |
| tech | 1 | 50 | 2 | 4.0% | 50 | 0 | 0.0% | 4.0% |
| tech | 2 | 50 | 7 | 14.0% | 50 | 1 | 2.0% | 12.0% |
| tech | 3 | 50 | 12 | 24.0% | 50 | 3 | 6.0% | 18.0% |
| tech | 4 | 50 | 17 | 34.0% | 50 | 3 | 6.0% | 28.0% |
| tech | 5 | 50 | 22 | 44.0% | 50 | 0 | 0.0% | 44.0% |
| tech | 6 | 50 | 21 | 42.0% | 50 | 1 | 2.0% | 40.0% |
| tech | 7 | 50 | 23 | 46.0% | 50 | 6 | 12.0% | 34.0% |
| tech | 8 | 50 | 28 | 56.0% | 50 | 6 | 12.0% | 44.0% |
| tech | 9 | 50 | 21 | 42.0% | 50 | 7 | 14.0% | 28.0% |
| tech | 10 | 50 | 22 | 44.0% | 50 | 1 | 2.0% | 42.0% |
| fashion | 1 | 50 | 0 | 0.0% | 50 | 0 | 0.0% | 0.0% |
| fashion | 2 | 50 | 0 | 0.0% | 50 | 2 | 4.0% | -4.0% |
| fashion | 3 | 50 | 0 | 0.0% | 50 | 0 | 0.0% | 0.0% |
| fashion | 4 | 50 | 0 | 0.0% | 50 | 0 | 0.0% | 0.0% |
| fashion | 5 | 50 | 0 | 0.0% | 50 | 0 | 0.0% | 0.0% |
| fashion | 6 | 50 | 0 | 0.0% | 50 | 1 | 2.0% | -2.0% |
| fashion | 7 | 50 | 0 | 0.0% | 50 | 1 | 2.0% | -2.0% |
| fashion | 8 | 50 | 0 | 0.0% | 50 | 0 | 0.0% | 0.0% |
| fashion | 9 | 50 | 0 | 0.0% | 50 | 0 | 0.0% | 0.0% |
| fashion | 10 | 50 | 0 | 0.0% | 50 | 1 | 2.0% | -2.0% |
| lifestyle | 1 | 50 | 0 | 0.0% | 50 | 0 | 0.0% | 0.0% |
| lifestyle | 2 | 50 | 0 | 0.0% | 50 | 0 | 0.0% | 0.0% |
| lifestyle | 3 | 50 | 1 | 2.0% | 50 | 0 | 0.0% | 2.0% |
| lifestyle | 4 | 50 | 3 | 6.0% | 50 | 0 | 0.0% | 6.0% |
| lifestyle | 5 | 50 | 1 | 2.0% | 50 | 1 | 2.0% | 0.0% |
| lifestyle | 6 | 50 | 3 | 6.0% | 50 | 0 | 0.0% | 6.0% |
| lifestyle | 7 | 50 | 1 | 2.0% | 50 | 0 | 0.0% | 2.0% |
| lifestyle | 8 | 50 | 2 | 4.0% | 50 | 0 | 0.0% | 4.0% |
| lifestyle | 9 | 50 | 1 | 2.0% | 50 | 0 | 0.0% | 2.0% |
| lifestyle | 10 | 50 | 0 | 0.0% | 50 | 0 | 0.0% | 0.0% |
| power bank | 1 | 50 | 17 | 34.0% | 50 | 4 | 8.0% | 26.0% |
| power bank | 2 | 50 | 34 | 68.0% | 50 | 34 | 68.0% | 0.0% |
| power bank | 3 | 50 | 35 | 70.0% | 50 | 41 | 82.0% | -12.0% |
| power bank | 4 | 50 | 27 | 54.0% | 50 | 33 | 66.0% | -12.0% |
| power bank | 5 | 50 | 30 | 60.0% | 50 | 37 | 74.0% | -14.0% |
| power bank | 6 | 50 | 34 | 68.0% | 50 | 23 | 46.0% | 22.0% |
| power bank | 7 | 50 | 36 | 72.0% | 50 | 33 | 66.0% | 6.0% |
| power bank | 8 | 50 | 33 | 66.0% | 50 | 35 | 70.0% | -4.0% |
| power bank | 9 | 50 | 31 | 62.0% | 50 | 32 | 64.0% | -2.0% |
| power bank | 10 | 50 | 39 | 78.0% | 50 | 37 | 74.0% | 4.0% |
| swim vest | 1 | 50 | 28 | 56.0% | 50 | 22 | 44.0% | 12.0% |
| swim vest | 2 | 50 | 35 | 70.0% | 50 | 25 | 50.0% | 20.0% |
| swim vest | 3 | 50 | 23 | 46.0% | 50 | 22 | 44.0% | 2.0% |
| swim vest | 4 | 50 | 32 | 64.0% | 50 | 30 | 60.0% | 4.0% |
| swim vest | 5 | 50 | 26 | 52.0% | 50 | 30 | 60.0% | -8.0% |
| swim vest | 6 | 50 | 35 | 70.0% | 50 | 34 | 68.0% | 2.0% |
| swim vest | 7 | 50 | 27 | 54.0% | 50 | 29 | 58.0% | -4.0% |
| swim vest | 8 | 50 | 34 | 68.0% | 50 | 31 | 62.0% | 6.0% |
| swim vest | 9 | 50 | 34 | 68.0% | 50 | 26 | 52.0% | 16.0% |
| swim vest | 10 | 50 | 31 | 62.0% | 50 | 27 | 54.0% | 8.0% |
| vacuum cleaner | 1 | 50 | 16 | 32.0% | 50 | 14 | 28.0% | 4.0% |
| vacuum cleaner | 2 | 50 | 13 | 26.0% | 50 | 8 | 16.0% | 10.0% |
| vacuum cleaner | 3 | 50 | 17 | 34.0% | 50 | 5 | 10.0% | 24.0% |
| vacuum cleaner | 4 | 50 | 9 | 18.0% | 50 | 12 | 24.0% | -6.0% |
| vacuum cleaner | 5 | 50 | 15 | 30.0% | 50 | 15 | 30.0% | 0.0% |
| vacuum cleaner | 6 | 50 | 14 | 28.0% | 50 | 16 | 32.0% | -4.0% |
| vacuum cleaner | 7 | 50 | 17 | 34.0% | 50 | 13 | 26.0% | 8.0% |
| vacuum cleaner | 8 | 50 | 21 | 42.0% | 50 | 9 | 18.0% | 24.0% |
| vacuum cleaner | 9 | 50 | 19 | 38.0% | 50 | 18 | 36.0% | 2.0% |
| vacuum cleaner | 10 | 50 | 17 | 34.0% | 50 | 15 | 30.0% | 4.0% |
| baby supplement | 1 | 50 | 14 | 28.0% | 50 | 17 | 34.0% | -6.0% |
| baby supplement | 2 | 50 | 9 | 18.0% | 50 | 14 | 28.0% | -10.0% |
| baby supplement | 3 | 50 | 8 | 16.0% | 50 | 9 | 18.0% | -2.0% |
| baby supplement | 4 | 50 | 14 | 28.0% | 50 | 5 | 10.0% | 18.0% |
| baby supplement | 5 | 50 | 6 | 12.0% | 50 | 9 | 18.0% | -6.0% |
| baby supplement | 6 | 50 | 11 | 22.0% | 50 | 14 | 28.0% | -6.0% |
| baby supplement | 7 | 50 | 19 | 38.0% | 50 | 12 | 24.0% | 14.0% |
| baby supplement | 8 | 50 | 14 | 28.0% | 50 | 15 | 30.0% | -2.0% |
| baby supplement | 9 | 50 | 18 | 36.0% | 50 | 14 | 28.0% | 8.0% |
| baby supplement | 10 | 50 | 9 | 18.0% | 50 | 12 | 24.0% | -6.0% |
| pet food | 1 | 50 | 6 | 12.0% | 50 | 1 | 2.0% | 10.0% |
| pet food | 2 | 50 | 6 | 12.0% | 50 | 10 | 20.0% | -8.0% |
| pet food | 3 | 50 | 10 | 20.0% | 50 | 7 | 14.0% | 6.0% |
| pet food | 4 | 50 | 13 | 26.0% | 50 | 9 | 18.0% | 8.0% |
| pet food | 5 | 50 | 18 | 36.0% | 50 | 8 | 16.0% | 20.0% |
| pet food | 6 | 50 | 18 | 36.0% | 50 | 1 | 2.0% | 34.0% |
| pet food | 7 | 50 | 16 | 32.0% | 50 | 4 | 8.0% | 24.0% |
| pet food | 8 | 50 | 12 | 24.0% | 50 | 11 | 22.0% | 2.0% |
| pet food | 9 | 50 | 14 | 28.0% | 50 | 13 | 26.0% | 2.0% |
| pet food | 10 | 50 | 17 | 34.0% | 50 | 17 | 34.0% | 0.0% |

## Root Artifacts
- [xtb-vs-nox-sorting-effect-report.md](xtb-vs-nox-sorting-effect-report.md): 全局排序/页面聚合辅助报告。

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
