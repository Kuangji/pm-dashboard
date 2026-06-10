# Nox vs XTB 频道召回机审报告

- 发布目录: `publish/documents/03-research/channel-search-review/20260610-nox-vs-xtb-4kw-allplatform-us-front10-content-tone-v1`
- 关键词: baby supplement, agricultural products, beauty, fashion
- 平台: youtube, tiktok, instagram
- provider: nox, xtb
- 国家: US
- 采样范围: 前 10 页，每页 50 条；YouTube / baby supplement 实际召回不足 500 条，按实际条数完成
- 复判: 否
- 判断规则: content-tone-llm-v1
- 判断依据: ES 发布内容列表（YouTube/TikTok 使用 videos，Instagram 使用 posts）+ 关键词召回相关内容列表；不依赖频道 tag；仅 LLM label + confidence，不做数值评分

## 总结

本轮 24 个 provider-run 全部完成，失败数为 0。整体 badcase 率上，nox 为 14.2%，xtb 为 13.1%，XTB 相对 nox 为 -1.1pp。

按「同平台 + 同关键词」的 12 个对比口径看，XTB 更低 badcase 率 7 组，更高 5 组，持平 0 组。XTB 的优势主要集中在 baby supplement、agricultural products 这类中高难度关键词；beauty / fashion 这类大盘泛词里，XTB 在 YouTube 和 Instagram 上略差，但差距多在 0.2pp 到 1.8pp。

前排页码走势：page 1-3 的平均 delta 为 -3.1pp（XTB badcase率 - nox badcase率），page 8-10 为 -2.4pp。也就是说，本轮没有看到“XTB 在越靠前页码明显更优”的强趋势；它更像是在部分关键词整体召回相关度更好，而非稳定地把高相关度结果更集中排到前排。

## 平台整体

| platform | nox badcase率 | xtb badcase率 | xtb-nox |
|---|---:|---:|---:|
| youtube | 14.1% | 14.4% | +0.3pp |
| tiktok | 16.5% | 15.5% | -1.0pp |
| instagram | 12.0% | 9.7% | -2.3pp |

## 关键词对比

| platform | keyword | nox badcase率 | xtb badcase率 | xtb-nox | 结论 |
|---|---|---:|---:|---:|---|
| youtube | baby supplement | 34.5% | 33.9% | -0.5pp | better |
| youtube | agricultural products | 26.8% | 25.2% | -1.6pp | better |
| youtube | beauty | 4.8% | 6.6% | +1.8pp | worse |
| youtube | fashion | 4.6% | 4.8% | +0.2pp | worse |
| tiktok | baby supplement | 32.4% | 29.8% | -2.6pp | better |
| tiktok | agricultural products | 26.4% | 24.0% | -2.4pp | better |
| tiktok | beauty | 5.0% | 7.0% | +2.0pp | worse |
| tiktok | fashion | 2.2% | 1.2% | -1.0pp | better |
| instagram | baby supplement | 28.8% | 22.4% | -6.4pp | better |
| instagram | agricultural products | 18.0% | 14.2% | -3.8pp | better |
| instagram | beauty | 0.8% | 1.4% | +0.6pp | worse |
| instagram | fashion | 0.4% | 0.8% | +0.4pp | worse |

## 召回量

| platform | keyword | nox 召回量 | xtb 召回量 | nox 采样 | xtb 采样 |
|---|---|---:|---:|---:|---:|
| youtube | baby supplement | 148 | 165 | 148 | 165 |
| youtube | agricultural products | 871 | 883 | 500 | 500 |
| youtube | beauty | 445000 | 441900 | 500 | 500 |
| youtube | fashion | 278300 | 274600 | 500 | 500 |
| tiktok | baby supplement | 7876 | 7871 | 500 | 500 |
| tiktok | agricultural products | 4177 | 4148 | 500 | 500 |
| tiktok | beauty | 3750700 | 3719400 | 500 | 500 |
| tiktok | fashion | 1526600 | 1498800 | 500 | 500 |
| instagram | baby supplement | 9425 | 9430 | 500 | 500 |
| instagram | agricultural products | 10900 | 10900 | 500 | 500 |
| instagram | beauty | 2022700 | 2017800 | 500 | 500 |
| instagram | fashion | 907600 | 893900 | 500 | 500 |

## 平均执行时间

| platform | keyword | nox 单频道均时 | xtb 单频道均时 | nox shard均时 | xtb shard均时 |
|---|---|---:|---:|---:|---:|
| youtube | baby supplement | 3.7s | 4.4s | 90.9s | 74.6s |
| youtube | agricultural products | 4.4s | 3.4s | 49.7s | 72.4s |
| youtube | beauty | 2.9s | 3.0s | 61.2s | 69.2s |
| youtube | fashion | 2.9s | 2.7s | 64.5s | 62.2s |
| tiktok | baby supplement | 4.7s | 4.0s | 53.7s | 80.9s |
| tiktok | agricultural products | 4.0s | 3.9s | 66.2s | 92.9s |
| tiktok | beauty | 3.1s | 2.9s | 42.2s | 38.8s |
| tiktok | fashion | 2.5s | 2.6s | 46.1s | 44.9s |
| instagram | baby supplement | 3.8s | 3.9s | 45.9s | 70.1s |
| instagram | agricultural products | 3.3s | 3.2s | 63.5s | 68.1s |
| instagram | beauty | 3.1s | 3.2s | 35.1s | 42.1s |
| instagram | fashion | 4.3s | 3.1s | 42.9s | 46.7s |

## 可继续查看

- Provider 对比明细: [summary.provider-comparison.csv](summary.provider-comparison.csv)
- Page 级走势明细: [summary.page-trend.csv](summary.page-trend.csv)
- 聚合 JSON: [aggregate-summary.json](aggregate-summary.json)
- 各平台入口: [youtube/README.md](youtube/README.md), [tiktok/README.md](tiktok/README.md), [instagram/README.md](instagram/README.md)
