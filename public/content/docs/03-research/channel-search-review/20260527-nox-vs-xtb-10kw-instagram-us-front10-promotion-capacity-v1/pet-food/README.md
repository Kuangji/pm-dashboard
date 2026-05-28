# pet food Instagram Provider Review

## 入口
- [provider-comparison.md](provider-comparison.md): nox vs xtb 横向对比。
- [nox-instagram/summary.md](nox-instagram/summary.md): nox 侧 Agent 评分结论。
- [xtb-instagram/summary.md](xtb-instagram/summary.md): xtb 侧 Agent 评分结论。

## 概览
| keyword | nox badcase率 | xtb badcase率 | 差值(nox-xtb) | nox labels | xtb labels | nox avg/channel | xtb avg/channel | 文档 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| pet food | 26.0% | 16.2% | 9.8% | fit 155, adjacent 215, badcase 130 | fit 212, adjacent 207, badcase 81 | 6.1s | 7.4s | [provider-comparison.md](pet-food/provider-comparison.md) |

## Runtime
| keyword | provider | completed | failed | avg shard | avg channel | timed records | tasks | low confidence review |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| pet food | nox | 500 | 0 | 151.4s | 6.1s | 500 | 20 | false |
| pet food | xtb | 500 | 0 | 169.1s | 7.4s | 502 | 22 | false |

## 页码分布
| keyword | page | nox total | nox badcase | nox badcase率 | xtb total | xtb badcase | xtb badcase率 | 差值 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
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
