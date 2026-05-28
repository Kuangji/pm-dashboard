# fashion Tiktok Provider Review

## 入口
- [provider-comparison.md](provider-comparison.md): nox vs xtb 横向对比。
- [nox-tiktok/summary.md](nox-tiktok/summary.md): nox 侧 Agent 评分结论。
- [xtb-tiktok/summary.md](xtb-tiktok/summary.md): xtb 侧 Agent 评分结论。

## 概览
| keyword | nox badcase率 | xtb badcase率 | 差值(nox-xtb) | nox labels | xtb labels | nox avg/channel | xtb avg/channel | 文档 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| fashion | 0.6% | 3.0% | -2.4% | fit 442, adjacent 55, badcase 3 | fit 356, adjacent 129, badcase 15 | 4.4s | 7.6s | [provider-comparison.md](fashion/provider-comparison.md) |

## Runtime
| keyword | provider | completed | failed | avg shard | avg channel | timed records | tasks | low confidence review |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| fashion | nox | 500 | 0 | 109.2s | 4.4s | 500 | 20 | false |
| fashion | xtb | 500 | 0 | 159.3s | 7.6s | 504 | 24 | false |

## 页码分布
| keyword | page | nox total | nox badcase | nox badcase率 | xtb total | xtb badcase | xtb badcase率 | 差值 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
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
