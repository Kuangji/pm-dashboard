# 三平台 provider × keyword 细粒度证据

本文档承接 root README 拆出的明细表，避免根入口过长；结论口径以 [排序效果主报告](xtb-vs-nox-sorting-effect-report.md) 为准。

## Provider × Keyword 评分入口

| 平台 | 关键词 | provider | 评分量 | badcase率 | 单频道均时 | summary |
| --- | --- | --- | --- | --- | --- | --- |
| youtube | beauty | nox | 250 | 2.8% | 5788ms | [summary.md](youtube/beauty/nox-youtube/summary.md) |
| youtube | beauty | xtb | 250 | 9.2% | 5929ms | [summary.md](youtube/beauty/xtb-youtube/summary.md) |
| youtube | tech | nox | 250 | 4.8% | 7095ms | [summary.md](youtube/tech/nox-youtube/summary.md) |
| youtube | tech | xtb | 250 | 7.6% | 6135ms | [summary.md](youtube/tech/xtb-youtube/summary.md) |
| youtube | lifestyle | nox | 250 | 2.4% | 3522ms | [summary.md](youtube/lifestyle/nox-youtube/summary.md) |
| youtube | lifestyle | xtb | 250 | 2.0% | 3422ms | [summary.md](youtube/lifestyle/xtb-youtube/summary.md) |
| tiktok | beauty | nox | 250 | 3.2% | 8255ms | [summary.md](tiktok/beauty/nox-tiktok/summary.md) |
| tiktok | beauty | xtb | 250 | 10.4% | 5711ms | [summary.md](tiktok/beauty/xtb-tiktok/summary.md) |
| tiktok | tech | nox | 250 | 5.6% | 7087ms | [summary.md](tiktok/tech/nox-tiktok/summary.md) |
| tiktok | tech | xtb | 250 | 41.6% | 6517ms | [summary.md](tiktok/tech/xtb-tiktok/summary.md) |
| tiktok | lifestyle | nox | 250 | 1.6% | 4305ms | [summary.md](tiktok/lifestyle/nox-tiktok/summary.md) |
| tiktok | lifestyle | xtb | 250 | 31.6% | 5303ms | [summary.md](tiktok/lifestyle/xtb-tiktok/summary.md) |
| instagram | beauty | nox | 250 | 2.0% | 5586ms | [summary.md](instagram/beauty/nox-instagram/summary.md) |
| instagram | beauty | xtb | 250 | 3.2% | 5034ms | [summary.md](instagram/beauty/xtb-instagram/summary.md) |
| instagram | tech | nox | 250 | 22.0% | 6487ms | [summary.md](instagram/tech/nox-instagram/summary.md) |
| instagram | tech | xtb | 250 | 28.0% | 6886ms | [summary.md](instagram/tech/xtb-instagram/summary.md) |
| instagram | lifestyle | nox | 250 | 2.0% | 4082ms | [summary.md](instagram/lifestyle/nox-instagram/summary.md) |
| instagram | lifestyle | xtb | 250 | 21.6% | 5554ms | [summary.md](instagram/lifestyle/xtb-instagram/summary.md) |

## 平台 × Keyword 对比入口

| 平台 | 关键词 | 结论 | XTB优于nox页数 | 全页差值 | 头部1-2页 | 尾部4-5页 | keyword报告 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| youtube | beauty | XTB 弱于 nox | 1/5 | +6.4pp | +3.0pp | +7.0pp | [provider-comparison.md](youtube/beauty/provider-comparison.md) |
| youtube | tech | XTB 弱于 nox | 1/5 | +2.8pp | +2.0pp | +5.0pp | [provider-comparison.md](youtube/tech/provider-comparison.md) |
| youtube | lifestyle | 基本持平 | 1/5 | -0.4pp | +2.0pp | -3.0pp | [provider-comparison.md](youtube/lifestyle/provider-comparison.md) |
| tiktok | beauty | XTB 弱于 nox | 0/5 | +7.2pp | +8.0pp | +9.0pp | [provider-comparison.md](tiktok/beauty/provider-comparison.md) |
| tiktok | tech | XTB 弱于 nox | 0/5 | +36.0pp | +26.0pp | +41.0pp | [provider-comparison.md](tiktok/tech/provider-comparison.md) |
| tiktok | lifestyle | XTB 弱于 nox | 0/5 | +30.0pp | +22.0pp | +34.0pp | [provider-comparison.md](tiktok/lifestyle/provider-comparison.md) |
| instagram | beauty | 基本持平 | 2/5 | +1.2pp | -1.0pp | +1.0pp | [provider-comparison.md](instagram/beauty/provider-comparison.md) |
| instagram | tech | XTB 弱于 nox | 1/5 | +6.0pp | +11.0pp | +2.0pp | [provider-comparison.md](instagram/tech/provider-comparison.md) |
| instagram | lifestyle | XTB 弱于 nox | 0/5 | +19.6pp | +19.0pp | +18.0pp | [provider-comparison.md](instagram/lifestyle/provider-comparison.md) |

## 页码聚合与逐页证据

详见 [xtb-vs-nox-sorting-effect-report.md](xtb-vs-nox-sorting-effect-report.md) 的“按页码聚合”和 [xtb-vs-nox-sorting-effect-data.json](xtb-vs-nox-sorting-effect-data.json)。
