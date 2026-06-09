# XTB vs nox 三平台 Front5 召回排序效果报告

一句话结论：本轮不支持“XTB 同页召回相关度整体优于 nox”，XTB 在三平台聚合口径下 badcase 率高于 nox。并且头部页码也没有体现出 XTB badcase 率更低的预期。

## 任务范围

| 指标 | 结果 |
| --- | --- |
| provider | nox vs xtb |
| platform | YouTube / TikTok / Instagram |
| country | US |
| 采样 | 前 5 页，每页 50 条 |
| 关键词 | beauty / tech / lifestyle |
| 完成度 | 4500/4500，failed=0 |
| 可比页格 | 6/45 页格 XTB 优于 nox |
| 整体 badcase率差(XTB-nox) | +12.1pp |
| 头部1-2页平均差值 | +10.2pp |
| 尾部4-5页平均差值 | +12.7pp |
| 整体改善的平台×关键词 | 1/9 |
| 加权平均单频道评分耗时 | 5705ms |

## 如何解读

本报告使用同页码对比：同一平台、同一关键词、同一页码下，比较 XTB 与 nox 的 badcase 率差值。差值为负代表 XTB badcase 率更低，符合“XTB 召回相关度更好”的预期。

排序效果的重点不是只看总体 badcase 率，而是看前排页码是否更干净。因此本轮额外比较头部 1-2 页与尾部 4-5 页的差值。如果 XTB 真正把更相关结果排到更靠前位置，理想形态是头部差值更负，尾部差值可以收敛或变差。

## 平台结论

| 平台 | 结论 | XTB优于nox页格 | 整体差值 | 头部1-2页 | 尾部4-5页 | 改善关键词 | 平台报告 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| youtube | XTB 弱于 nox | 3/15 | +2.9pp | +2.3pp | +3.0pp | 1/3 | [README.md](youtube/README.md) |
| tiktok | XTB 弱于 nox | 0/15 | +24.4pp | +18.7pp | +28.0pp | 0/3 | [README.md](tiktok/README.md) |
| instagram | XTB 弱于 nox | 3/15 | +8.9pp | +9.7pp | +7.0pp | 0/3 | [README.md](instagram/README.md) |

## 平台 × 关键词结论

| 平台 | 关键词 | 结论 | XTB优于nox页数 | 全页差值 | 头部1-2页 | 尾部4-5页 | 趋势 | keyword报告 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| youtube | beauty | XTB 弱于 nox | 1/5 | +6.4pp | +3.0pp | +7.0pp | 越往后越偏离 | [provider-comparison.md](youtube/beauty/provider-comparison.md) |
| youtube | tech | XTB 弱于 nox | 1/5 | +2.8pp | +2.0pp | +5.0pp | 越往后越偏离 | [provider-comparison.md](youtube/tech/provider-comparison.md) |
| youtube | lifestyle | 基本持平 | 1/5 | -0.4pp | +2.0pp | -3.0pp | 后段有所收敛 | [provider-comparison.md](youtube/lifestyle/provider-comparison.md) |
| tiktok | beauty | XTB 弱于 nox | 0/5 | +7.2pp | +8.0pp | +9.0pp | 页间差异不明显 | [provider-comparison.md](tiktok/beauty/provider-comparison.md) |
| tiktok | tech | XTB 弱于 nox | 0/5 | +36.0pp | +26.0pp | +41.0pp | 越往后越偏离 | [provider-comparison.md](tiktok/tech/provider-comparison.md) |
| tiktok | lifestyle | XTB 弱于 nox | 0/5 | +30.0pp | +22.0pp | +34.0pp | 越往后越偏离 | [provider-comparison.md](tiktok/lifestyle/provider-comparison.md) |
| instagram | beauty | 基本持平 | 2/5 | +1.2pp | -1.0pp | +1.0pp | 头部更有优势 | [provider-comparison.md](instagram/beauty/provider-comparison.md) |
| instagram | tech | XTB 弱于 nox | 1/5 | +6.0pp | +11.0pp | +2.0pp | 后段有所收敛 | [provider-comparison.md](instagram/tech/provider-comparison.md) |
| instagram | lifestyle | XTB 弱于 nox | 0/5 | +19.6pp | +19.0pp | +18.0pp | 页间差异不明显 | [provider-comparison.md](instagram/lifestyle/provider-comparison.md) |

## 按页码聚合

| 平台 | 页码 | 平均差值(XTB-nox) | XTB优于nox关键词数 |
| --- | --- | --- | --- |
| youtube | 1 | +3.3pp | 1/3 |
| youtube | 2 | +1.3pp | 1/3 |
| youtube | 3 | +4.0pp | 0/3 |
| youtube | 4 | +3.3pp | 0/3 |
| youtube | 5 | +2.7pp | 1/3 |
| tiktok | 1 | +10.0pp | 0/3 |
| tiktok | 2 | +27.3pp | 0/3 |
| tiktok | 3 | +28.7pp | 0/3 |
| tiktok | 4 | +30.0pp | 0/3 |
| tiktok | 5 | +26.0pp | 0/3 |
| instagram | 1 | +8.0pp | 0/3 |
| instagram | 2 | +11.3pp | 1/3 |
| instagram | 3 | +11.3pp | 0/3 |
| instagram | 4 | +9.3pp | 1/3 |
| instagram | 5 | +4.7pp | 1/3 |

## 观察

- YouTube：整体接近持平但略弱于 nox，只有 lifestyle 在全页口径 XTB 略优；beauty 和 tech 的 XTB badcase 率更高。
- TikTok：偏离最明显，tech 与 lifestyle 的 XTB badcase 率显著高于 nox，是本轮三平台聚合结论的主要拖累项。
- Instagram：beauty 接近持平，tech/lifestyle 偏弱；tech 在 nox 侧本身 badcase 较高，但 XTB 仍未体现改善。
- 排序预期：本轮前 5 页内，XTB 没有呈现“越靠前页码 badcase 率越低于 nox”的稳定形态。即便个别页格有改善，也不足以支撑三平台整体改善结论。

## 已知说明

- 本轮使用最新 promotion-capacity 判断标准，未触发低置信度复判。
- 数据采集使用 Playwright MCP 连接现有浏览器上下文，未新开 profile。
- 本轮只看 US、前 5 页、每页 50 条；结论不外推到更深页码或其他国家。
- 结构化数据见 [xtb-vs-nox-sorting-effect-data.json](xtb-vs-nox-sorting-effect-data.json)。
