# tech Instagram Provider Review

## 入口
- [provider-comparison.md](provider-comparison.md): nox vs xtb 横向对比。
- [nox-instagram/summary.md](nox-instagram/summary.md): nox 侧 Agent 评分结论。
- [xtb-instagram/summary.md](xtb-instagram/summary.md): xtb 侧 Agent 评分结论。

## 概览
| keyword | nox badcase率 | xtb badcase率 | 差值(nox-xtb) | nox labels | xtb labels | nox avg/channel | xtb avg/channel | 文档 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| tech | 35.0% | 5.6% | 29.4% | fit 181, adjacent 144, badcase 175 | fit 196, adjacent 276, badcase 28 | 6.5s | 7.8s | [provider-comparison.md](tech/provider-comparison.md) |

## Runtime
| keyword | provider | completed | failed | avg shard | avg channel | timed records | tasks | low confidence review |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| tech | nox | 500 | 0 | 163.2s | 6.5s | 500 | 20 | false |
| tech | xtb | 500 | 0 | 186.3s | 7.8s | 501 | 21 | false |

## 页码分布
| keyword | page | nox total | nox badcase | nox badcase率 | xtb total | xtb badcase | xtb badcase率 | 差值 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
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
