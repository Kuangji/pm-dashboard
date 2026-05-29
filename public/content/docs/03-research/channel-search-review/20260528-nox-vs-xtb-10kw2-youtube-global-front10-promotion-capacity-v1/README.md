# youtube nox vs xtb 前 10 页 Agent 评分

一句话结论：本轮支持“XTB 同页召回相关度整体优于 nox”，但对“XTB 是否明显把更高相关结果排到更靠前页”的证明只有部分成立。

## 任务范围

| 指标 | 结果 |
| --- | --- |
| provider | nox vs xtb |
| platform | youtube |
| country | 不限国家 / global |
| 采样 | 前 10 页，每页 50 条 |
| 关键词数 | 10 |
| 可比页数 | 91/100 页 XTB 优于 nox |
| 整体 badcase率差(XTB-nox) | -25.6pp |
| 头部1-3页差值 | -25.7pp |
| 尾部8-10页差值 | -27.7pp |
| 整体改善关键词 | 10/10 |

## 文档导航

- [xtb-vs-nox-sorting-effect-report.md](xtb-vs-nox-sorting-effect-report.md)：排序效果主报告，包含页码聚合、关键词聚合和逐关键词同页码对比。
- [provider-fine-grained-summary.md](provider-fine-grained-summary.md)：从 README 拆出的明细索引，包含 provider × keyword 直接证据表和入口。
- [xtb-vs-nox-sorting-effect-data.json](xtb-vs-nox-sorting-effect-data.json)：排序报告的结构化数据。
- [front10_run_manifest.json](front10_run_manifest.json)：本轮 provider 任务完成清单。

## 关键词入口

| keyword | 结论 | XTB优于nox页数 | 全页差值 | 头部1-3页 | 尾部8-10页 | keyword报告 |
| --- | --- | --- | --- | --- | --- | --- |
| agricultural products | 符合预期 | 10/10 | -35.4pp | -35.3pp | -33.3pp | [provider-comparison.md](agricultural-products/provider-comparison.md) |
| digital products | 符合预期 | 8/10 | -16.6pp | -22.7pp | -21.3pp | [provider-comparison.md](digital-products/provider-comparison.md) |
| Dreame | 符合预期 | 10/10 | -43.0pp | -51.3pp | -38.0pp | [provider-comparison.md](dreame/provider-comparison.md) |
| kitchen | 符合预期 | 10/10 | -21.6pp | -17.3pp | -19.3pp | [provider-comparison.md](kitchen/provider-comparison.md) |
| marathon | 符合预期 | 10/10 | -47.6pp | -38.7pp | -52.0pp | [provider-comparison.md](marathon/provider-comparison.md) |
| photography equipment | 符合预期 | 10/10 | -43.8pp | -44.7pp | -43.3pp | [provider-comparison.md](photography-equipment/provider-comparison.md) |
| resistance bands | 符合预期 | 7/10 | -7.8pp | -4.0pp | -7.3pp | [provider-comparison.md](resistance-bands/provider-comparison.md) |
| treadmill | 符合预期 | 8/10 | -11.2pp | -8.0pp | -18.7pp | [provider-comparison.md](treadmill/provider-comparison.md) |
| vape | 符合预期 | 9/10 | -22.0pp | -27.3pp | -35.3pp | [provider-comparison.md](vape/provider-comparison.md) |
| yoga mat | 符合预期 | 9/10 | -6.8pp | -8.0pp | -8.0pp | [provider-comparison.md](yoga-mat/provider-comparison.md) |

## 已知说明

- 本轮全部结果为 Agent 评分，未启用低置信度复判。
- 国家不限，Nox/XTB 查询参数中不传 `country`。
- Nox 侧复用了既有登录态，并通过本机代理访问。
- 本轮未生成插件包和 publish 产物；这两类产物需要另行手动指定。
