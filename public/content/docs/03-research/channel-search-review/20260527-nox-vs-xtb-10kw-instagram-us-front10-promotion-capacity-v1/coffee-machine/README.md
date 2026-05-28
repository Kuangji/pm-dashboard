# coffee machine Instagram Provider Review

## 入口
- [provider-comparison.md](provider-comparison.md): nox vs xtb 横向对比。
- [nox-instagram/summary.md](nox-instagram/summary.md): nox 侧 Agent 评分结论。
- [xtb-instagram/summary.md](xtb-instagram/summary.md): xtb 侧 Agent 评分结论。

## 概览
| keyword | nox badcase率 | xtb badcase率 | 差值(nox-xtb) | nox labels | xtb labels | nox avg/channel | xtb avg/channel | 文档 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| coffee machine | 33.6% | 32.2% | 1.4% | fit 91, adjacent 241, badcase 168 | fit 89, adjacent 250, badcase 161 | 7.5s | 7.1s | [provider-comparison.md](coffee-machine/provider-comparison.md) |

## Runtime
| keyword | provider | completed | failed | avg shard | avg channel | timed records | tasks | low confidence review |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| coffee machine | nox | 500 | 0 | 178.4s | 7.5s | 501 | 21 | false |
| coffee machine | xtb | 500 | 0 | 177.9s | 7.1s | 500 | 20 | false |

## 页码分布
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
