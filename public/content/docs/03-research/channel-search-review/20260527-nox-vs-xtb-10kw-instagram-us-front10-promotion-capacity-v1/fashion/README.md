# fashion Instagram Provider Review

## 入口
- [provider-comparison.md](provider-comparison.md): nox vs xtb 横向对比。
- [nox-instagram/summary.md](nox-instagram/summary.md): nox 侧 Agent 评分结论。
- [xtb-instagram/summary.md](xtb-instagram/summary.md): xtb 侧 Agent 评分结论。

## 概览
| keyword | nox badcase率 | xtb badcase率 | 差值(nox-xtb) | nox labels | xtb labels | nox avg/channel | xtb avg/channel | 文档 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| fashion | 0.0% | 1.0% | -1.0% | fit 401, adjacent 99, badcase 0 | fit 361, adjacent 134, badcase 5 | 4.8s | 4.9s | [provider-comparison.md](fashion/provider-comparison.md) |

## Runtime
| keyword | provider | completed | failed | avg shard | avg channel | timed records | tasks | low confidence review |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| fashion | nox | 500 | 0 | 120.1s | 4.8s | 500 | 20 | false |
| fashion | xtb | 500 | 0 | 121.7s | 4.9s | 500 | 20 | false |

## 页码分布
| keyword | page | nox total | nox badcase | nox badcase率 | xtb total | xtb badcase | xtb badcase率 | 差值 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
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
