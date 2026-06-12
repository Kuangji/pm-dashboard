# Nox vs XTB 频道召回相关度复测

## 范围

- 关键词：baby supplement、agricultural products、beauty、fashion
- 平台：YouTube、TikTok、Instagram
- Provider：nox、xtb
- 国家：US
- 采样：前 10 页，每页 50 条
- 规则：content-tone-llm-v1
- 复判：未启用低置信度复判
- 采集：使用 Playwright MCP 连接的现有浏览器上下文，同源 fetch nox/xtb 页面 API；未开启新 profile。

## 总体结论

- 总体 badcase 率：nox 60.0%，xtb 59.3%，xtb - nox = -0.7%。
- 12 个 platform × keyword 对比中，XTB 更低 8 组，Nox 更低 4 组。
- 判分完成度：24 个 provider-run 全部 completed，失败数 0。

## 平台汇总

| platform | nox badcase | xtb badcase | xtb-nox | XTB 更低 | Nox 更低 |
| --- | ---: | ---: | ---: | ---: | ---: |
| instagram | 54.3% | 52.0% | -2.3% | 3 | 1 |
| tiktok | 57.0% | 55.5% | -1.4% | 3 | 1 |
| youtube | 68.7% | 70.2% | 1.6% | 2 | 2 |

## 关键词明细

| platform | keyword | nox badcase | xtb badcase | xtb-nox | 较优 |
| --- | --- | ---: | ---: | ---: | --- |
| instagram | agricultural products | 80.4% | 75.6% | -4.8% | xtb |
| instagram | baby supplement | 68.6% | 64.4% | -4.2% | xtb |
| instagram | beauty | 39.8% | 38.2% | -1.6% | xtb |
| instagram | fashion | 28.4% | 29.8% | 1.4% | nox |
| tiktok | agricultural products | 77.6% | 76.8% | -0.8% | xtb |
| tiktok | baby supplement | 71.4% | 61.0% | -10.4% | xtb |
| tiktok | beauty | 44.4% | 44.2% | -0.2% | xtb |
| tiktok | fashion | 34.4% | 40.2% | 5.8% | nox |
| youtube | agricultural products | 77.6% | 76.2% | -1.4% | xtb |
| youtube | baby supplement | 68.3% | 68.7% | 0.4% | nox |
| youtube | beauty | 66.5% | 74.9% | 8.4% | nox |
| youtube | fashion | 62.3% | 61.1% | -1.2% | xtb |

## 产物导航

- [XTB vs Nox 排序效果报告](xtb-vs-nox-sorting-effect-report.md)
- [聚合明细 JSON](_aggregate-summary.json)
- [Provider 对比 CSV](summary.provider-comparison.csv)
- [YouTube 报告](youtube/README.md) / [YouTube 细粒度汇总](youtube/provider-fine-grained-summary.md)
- [TikTok 报告](tiktok/README.md) / [TikTok 细粒度汇总](tiktok/provider-fine-grained-summary.md)
- [Instagram 报告](instagram/README.md) / [Instagram 细粒度汇总](instagram/provider-fine-grained-summary.md)

## 注意事项

- 部分页面 `.result-count` 在页面渲染层出现 0 或与 API 总量不一致，本轮以同源 API 返回和实际采样记录数作为完成校验，同时保留 DOM 召回量原文在 browser input 中。
- YouTube 每个 provider-run 实际完成 499 条；TikTok/Instagram 每个 provider-run 完成 500 条。
