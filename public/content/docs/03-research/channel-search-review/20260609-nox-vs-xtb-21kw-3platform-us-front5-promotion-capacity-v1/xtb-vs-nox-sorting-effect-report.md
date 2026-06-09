# XTB vs Nox 召回排序效果报告（前5页）

## 结论

本轮不符合“XTB 相比 nox 在越靠前页码 badcase 率越低”的预期。整体 badcase 率 nox 为 28.9%，XTB 为 40.8%，XTB 高出 +11.9pp。

从页码趋势看，XTB 在第 1-5 页每一页的 badcase 率都高于 nox；但差距从第 1 页 +13.7pp 收窄到第 5 页 +9.5pp。这说明“XTB 头部更干净”的假设没有成立，甚至头部差距更明显。

平台上，TikTok 是主要负向来源：XTB badcase 率 56.0%，nox 35.2%，差值 +20.9pp。YouTube 与 Instagram 也未体现改善，但差距小于 TikTok。

## 范围与验收

- 关键词：21 个。
- 国家：US。
- 平台：YouTube / TikTok / Instagram。
- Provider：nox / xtb。
- 采样：前 5 页，每页 50 条。部分 YouTube 关键词实际召回不足 250 条，按可召回数量评分。
- 评分：使用最新 promotion-capacity prompt，一轮机审，不触发低置信度升级模型复核。
- 完成度：126/126 provider-run 完整，63/63 provider-comparison 完整，评分记录 30995 条，失败记录 0。
- 平均单频道评分耗时：6.5s（nox） / 6.6s（xtb）；全体 run 简单平均约 6.5s。

## 总体同页对比

| 页码 | nox样本 | nox badcase | xtb样本 | xtb badcase | XTB-Nox |
| --- | --- | --- | --- | --- | --- |
| 1 | 3150 | 24.9% | 3150 | 38.5% | +13.7pp |
| 2 | 3128 | 28.5% | 3132 | 40.7% | +12.2pp |
| 3 | 3098 | 29.5% | 3100 | 41.8% | +12.3pp |
| 4 | 3050 | 30.5% | 3087 | 42.4% | +11.9pp |
| 5 | 3050 | 31.2% | 3050 | 40.8% | +9.5pp |

## 平台汇总

| 平台 | nox样本 | nox badcase | xtb样本 | xtb badcase | XTB-Nox |
| --- | --- | --- | --- | --- | --- |
| youtube | 4976 | 28.4% | 5019 | 33.5% | +5.1pp |
| tiktok | 5250 | 35.2% | 5250 | 56.0% | +20.9pp |
| instagram | 5250 | 23.1% | 5250 | 32.7% | +9.6pp |

## 平台 × 页码

| 平台 | 页码 | nox badcase | xtb badcase | XTB-Nox | xtb/nox样本 |
| --- | --- | --- | --- | --- | --- |
| youtube | 1 | 23.8% | 30.0% | +6.2pp | 1050/1050 |
| youtube | 2 | 30.8% | 34.6% | +3.8pp | 1032/1028 |
| youtube | 3 | 29.6% | 35.1% | +5.5pp | 1000/998 |
| youtube | 4 | 27.8% | 35.8% | +8.0pp | 987/950 |
| youtube | 5 | 30.2% | 31.9% | +1.7pp | 950/950 |
| tiktok | 1 | 31.6% | 52.2% | +20.6pp | 1050/1050 |
| tiktok | 2 | 31.8% | 55.9% | +24.1pp | 1050/1050 |
| tiktok | 3 | 36.0% | 56.7% | +20.7pp | 1050/1050 |
| tiktok | 4 | 37.8% | 57.9% | +20.1pp | 1050/1050 |
| tiktok | 5 | 38.7% | 57.5% | +18.9pp | 1050/1050 |
| instagram | 1 | 19.2% | 33.4% | +14.2pp | 1050/1050 |
| instagram | 2 | 23.0% | 31.4% | +8.5pp | 1050/1050 |
| instagram | 3 | 22.9% | 33.3% | +10.5pp | 1050/1050 |
| instagram | 4 | 25.7% | 33.1% | +7.4pp | 1050/1050 |
| instagram | 5 | 24.8% | 32.0% | +7.2pp | 1050/1050 |

## XTB 偏差最大的组合

| 平台 | 关键词 | nox badcase | xtb badcase | 平均差值 | XTB低于nox页数 | 结论 |
| --- | --- | --- | --- | --- | --- | --- |
| tiktok | lifestyle | 3.2% | 51.2% | +48.0pp | 0/5 | XTB偏差更高 |
| instagram | lifestyle | 1.6% | 43.2% | +41.6pp | 0/5 | XTB偏差更高 |
| tiktok | beauty | 2.4% | 40.0% | +37.6pp | 0/5 | XTB偏差更高 |
| tiktok | tech | 5.2% | 42.0% | +36.8pp | 0/5 | XTB偏差更高 |
| tiktok | pet food | 26.4% | 62.0% | +35.6pp | 1/5 | XTB偏差更高 |
| tiktok | fashion | 0.4% | 35.2% | +34.8pp | 0/5 | XTB偏差更高 |
| tiktok | kitchen | 16.8% | 50.0% | +33.2pp | 0/5 | XTB偏差更高 |
| tiktok | vacuum cleaner | 41.6% | 73.6% | +32.0pp | 0/5 | XTB偏差更高 |
| tiktok | marathon | 26.8% | 53.2% | +26.4pp | 0/5 | XTB偏差更高 |
| instagram | fashion | 0.8% | 27.2% | +26.4pp | 0/5 | XTB偏差更高 |
| tiktok | lawn mower | 30.8% | 56.8% | +26.0pp | 0/5 | XTB偏差更高 |
| instagram | beauty | 1.2% | 26.0% | +24.8pp | 0/5 | XTB偏差更高 |
| tiktok | baby supplement | 46.0% | 70.4% | +24.4pp | 0/5 | XTB偏差更高 |
| instagram | digital products | 18.8% | 42.0% | +23.2pp | 0/5 | XTB偏差更高 |
| tiktok | treadmill | 35.2% | 56.0% | +20.8pp | 0/5 | XTB偏差更高 |

## XTB 相对较好的组合

| 平台 | 关键词 | nox badcase | xtb badcase | 平均差值 | XTB低于nox页数 | 结论 |
| --- | --- | --- | --- | --- | --- | --- |
| youtube | agricultural products | 46.4% | 34.8% | -11.6pp | 5/5 | XTB改善 |
| youtube | marathon | 42.4% | 31.6% | -10.8pp | 3/5 | XTB改善 |
| youtube | baby supplement | 56.1% | 49.7% | -9.3pp | 3/5 | XTB改善 |
| tiktok | swim vest | 61.2% | 52.4% | -8.8pp | 3/5 | XTB改善 |
| youtube | swim vest | 50.0% | 43.9% | -6.1pp | 2/5 | XTB改善 |
| instagram | swim vest | 60.0% | 54.0% | -6.0pp | 4/5 | XTB改善 |
| instagram | lawn mower | 23.2% | 18.4% | -4.8pp | 3/5 | XTB改善 |
| youtube | photography equipment | 46.4% | 42.8% | -3.6pp | 4/5 | XTB改善 |
| tiktok | photography equipment | 58.4% | 56.4% | -2.0pp | 2/5 | 接近 |
| instagram | agricultural products | 22.8% | 21.2% | -1.6pp | 2/5 | 接近 |
| youtube | pet food | 40.4% | 40.0% | -0.4pp | 3/5 | 接近 |
| youtube | yoga mat | 38.4% | 39.2% | +0.8pp | 2/5 | 接近 |
| instagram | vacuum cleaner | 28.8% | 29.6% | +0.8pp | 3/5 | 接近 |
| tiktok | agricultural products | 51.2% | 52.0% | +0.8pp | 3/5 | 接近 |
| instagram | vape | 22.8% | 24.4% | +1.6pp | 2/5 | 接近 |

## 低召回或不足 250 样本

| 平台 | 关键词 | provider | 实际样本 | API召回量 | 总页数 |
| --- | --- | --- | --- | --- | --- |
| youtube | swim vest | nox | 78 | 78 | 2 |
| youtube | swim vest | xtb | 82 | 82 | 2 |
| youtube | baby supplement | nox | 148 | 148 | 3 |
| youtube | baby supplement | xtb | 187 | 187 | 4 |

## 采集口径说明

本轮通过 Playwright MCP 连接现有浏览器上下文，并在 nox / xtb 对应域名内执行 same-origin fetch。这样可以复用现有代理与登录态。

由于 MCP 采集时主要调用 API，raw 中记录到的 `.result-count` DOM 文本没有逐关键词逐平台导航刷新，存在陈旧值风险。因此本报告的召回量、总页数和样本量以 API 返回的 `total_size / retData / totalPage` 为准；`.result-count` 仅作为采集字段保留，不作为结论依据。

## 文件导航

- 机器可读聚合数据：[xtb-vs-nox-sorting-effect-data.json](xtb-vs-nox-sorting-effect-data.json)
- 细粒度明细：[provider-fine-grained-summary.md](provider-fine-grained-summary.md)
- 运行 manifest：[front5_run_manifest.json](front5_run_manifest.json)
