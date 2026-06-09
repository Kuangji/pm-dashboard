# 20260609 nox vs xtb 21词三平台 US 前5页评估

## 一句话结论

本轮不支持“XTB 召回相关度优于 nox，且头部页更干净”的预期。整体 badcase 率：nox 28.9%，XTB 40.8%，XTB 高出 +11.9pp；三个平台上 XTB 均高于 nox，其中 TikTok 差距最大。

## 验收状态

- Provider-run：126/126 完整。
- Provider comparison：63/63 完整。
- 评分记录：30995 条，失败记录 0。
- 低置信度升级模型复核：未启用。
- 平均单频道评分耗时：约 6.5s。

## 核心文档

- [XTB vs Nox 召回排序效果报告](xtb-vs-nox-sorting-effect-report.md)
- [Provider 细粒度汇总](provider-fine-grained-summary.md)
- [机器可读聚合数据](xtb-vs-nox-sorting-effect-data.json)
- [front5_run_manifest.json](front5_run_manifest.json)

## 重要口径

本轮采集通过 Playwright MCP existing browser context 复用现有登录态和代理，并以 same-origin fetch 获取 provider API 数据。raw 中保留了 `.result-count` 字段，但由于采集未逐关键词导航刷新页面，该 DOM 文本可能是陈旧值；报告中的召回量以 API `total_size / retData / totalPage` 为准。
