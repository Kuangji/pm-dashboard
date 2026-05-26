# 20260525 Nox vs XTB 10词 YouTube US 共同深度结论

本目录结论以 `COMMON_DEPTH_FINAL_SUMMARY.md` 为准。该口径先按每个关键词取两个 provider 的共同页深 `min(total_pages)`，再用相同绝对页码进入主对比；长 provider 多抓的页只作为 `extended_tail_not_compared` 诊断，不参与横向比较。

## 主要入口

- `COMMON_DEPTH_FINAL_SUMMARY.md`: 共同深度修正版总表。
- `common-depth-provider-overview.csv`: provider x keyword 总览。
- `common-depth-page-partition-aggregation.csv`: 页码分区聚合。
- `common-depth-page-level.csv`: 逐页聚合。
- `extended-tail-diagnostics.csv`: 长 provider 多抓页诊断。
- `common-depth-missing-after-supplement.csv`: 补跑后空页缺失检查；当前无缺失行。

## 子目录说明

每个 keyword 目录保留原始 `README.md`、`provider-comparison.md` 以及 nox / xtb 单 provider 的 `summary.md`、`summary.csv`、`badcases.csv`，用于查看该关键词下的子结论、badcase 明细和成因说明。最终横向结论仍以根目录共同深度口径为准；keyword 子目录里的 `provider-comparison.md` 是原始细粒度证据，不覆盖共同深度补跑后的根级结论。

## 页面聚合分组对比结论

### 总体趋势

在页数充足、使用 `前10页 / 中间10页 / 最后10页` 的 8 个关键词中，两边总体差距不大，但不同页段的表现形态不同：

| 页码分组 | nox badcase率 | xtb badcase率 | 结论 |
| --- | ---: | ---: | --- |
| 前10页 | 25.5% | 26.0% | 基本持平，XTB 略差 0.5pct。 |
| 中间10页 | 57.0% | 55.1% | XTB 略好 1.9pct。 |
| 最后10页 | 61.3% | 61.4% | 基本持平，XTB 略差 0.1pct。 |

两个页数不足 30 的关键词按 `前50%页 / 后50%页` 聚合，XTB 明显优于 nox：

| 页码分组 | nox badcase率 | xtb badcase率 | 结论 |
| --- | ---: | ---: | --- |
| 前50%页 | 80.0% | 45.3% | XTB 明显更好，主要由 `swim vest` 与 `baby supplement` 共同贡献。 |
| 后50%页 | 76.8% | 57.0% | XTB 仍明显更好，但两边后半段都偏差。 |

### 页面聚合分组 x Keyword 明细

| keyword | 页码分组 | page_range | nox badcase率 | xtb badcase率 | xtb-nox | 结论 |
| --- | --- | --- | ---: | ---: | ---: | --- |
| coffee machine | 前10页 | 1-10 | 38.8% | 60.8% | +22.0pct | XTB 明显更差 |
| coffee machine | 中间10页 | 46-55 | 68.4% | 81.0% | +12.6pct | XTB 明显更差 |
| coffee machine | 最后10页 | 92-101 | 70.2% | 91.0% | +20.8pct | XTB 明显更差 |
| lawn mower | 前10页 | 1-10 | 31.2% | 21.4% | -9.8pct | XTB 略好 |
| lawn mower | 中间10页 | 92-101 | 84.4% | 80.0% | -4.4pct | XTB 略好 |
| lawn mower | 最后10页 | 184-193 | 86.0% | 90.6% | +4.6pct | XTB 略差 |
| tech | 前10页 | 1-10 | 6.6% | 7.0% | +0.4pct | 基本持平 |
| tech | 中间10页 | 96-105 | 23.4% | 39.8% | +16.4pct | XTB 明显更差 |
| tech | 最后10页 | 191-200 | 42.4% | 26.6% | -15.8pct | XTB 明显更好 |
| fashion | 前10页 | 1-10 | 0.8% | 4.2% | +3.4pct | XTB 略差 |
| fashion | 中间10页 | 96-105 | 29.6% | 7.4% | -22.2pct | XTB 明显更好 |
| fashion | 最后10页 | 191-200 | 46.6% | 21.0% | -25.6pct | XTB 明显更好 |
| lifestyle | 前10页 | 1-10 | 0.2% | 1.0% | +0.8pct | 基本持平 |
| lifestyle | 中间10页 | 96-105 | 13.4% | 9.8% | -3.6pct | XTB 略好 |
| lifestyle | 最后10页 | 191-200 | 14.0% | 13.8% | -0.2pct | 基本持平 |
| power bank | 前10页 | 1-10 | 32.0% | 23.0% | -9.0pct | XTB 略好 |
| power bank | 中间10页 | 96-105 | 73.6% | 65.2% | -8.4pct | XTB 略好 |
| power bank | 最后10页 | 191-200 | 73.0% | 86.0% | +13.0pct | XTB 明显更差 |
| swim vest | 前50%页 | 1-1 | 84.0% | 58.0% | -26.0pct | XTB 明显更好 |
| swim vest | 后50%页 | 2-2 | 85.0% | 54.0% | -31.0pct | XTB 明显更好 |
| vacuum cleaner | 前10页 | 1-10 | 43.6% | 36.4% | -7.2pct | XTB 略好 |
| vacuum cleaner | 中间10页 | 96-105 | 88.4% | 82.2% | -6.2pct | XTB 略好 |
| vacuum cleaner | 最后10页 | 191-200 | 86.6% | 84.8% | -1.8pct | 基本持平 |
| baby supplement | 前50%页 | 1-2 | 78.0% | 39.0% | -39.0pct | XTB 明显更好 |
| baby supplement | 后50%页 | 3-3 | 72.2% | 60.0% | -12.2pct | XTB 明显更好 |
| pet food | 前10页 | 1-10 | 50.6% | 54.0% | +3.4pct | XTB 略差 |
| pet food | 中间10页 | 46-55 | 75.0% | 75.8% | +0.8pct | 基本持平 |
| pet food | 最后10页 | 91-100 | 73.5% | 77.0% | +3.5pct | XTB 略差 |

### 关键词级差异

- `coffee machine`: XTB 在三个页段都明显更差，前10页 +22.0pct、中间10页 +12.6pct、最后10页 +20.8pct；这是共同深度口径下最明确的 XTB 负向样本。
- `fashion`: XTB 在中后段明显更好，中间10页 -22.2pct、最后10页 -25.6pct；nox 的相关性随页深下降更明显。
- `tech`: 前10页接近持平，但中间10页 XTB 更差 +16.4pct，最后10页 XTB 更好 -15.8pct，说明两边排序尾部结构不同，不能只看总 badcase 率。
- `power bank`: XTB 前10页和中间10页更好，但最后10页更差 +13.0pct；尾部质量劣化更集中在 XTB。
- `lawn mower`: 前10页和中间10页 XTB 更好，但最后10页 XTB 更差 +4.6pct；整体差异小于 coffee machine / fashion。
- `vacuum cleaner`: XTB 三个页段都略好，前10页 -7.2pct、中间10页 -6.2pct、最后10页 -1.8pct。
- `lifestyle`: 两边都表现较好，差异很小；中间10页 XTB 略好 -3.6pct，最后10页基本持平。
- `pet food`: XTB 三个页段都略差，但差距不大，前10页 +3.4pct、中间10页 +0.8pct、最后10页 +3.5pct。
- `swim vest`: 页数不足时按前后50%看，XTB 前半段 -26.0pct、后半段 -31.0pct，明显好于 nox。
- `baby supplement`: XTB 前半段 -39.0pct、后半段 -12.2pct，明显好于 nox；但两边后半段仍然不理想。

### 采样解释

这次修正后，`coffee machine`、`lawn mower`、`pet food` 的 XTB 共同深度缺页已补跑完成；`swim vest` 与 `baby supplement` 的 XTB 深页被保留在 extended tail，但不纳入对比。结论中的页码分组只比较共同深度内的相同绝对页码，因此不会再把短 provider 的末页与长 provider 的第 191-200 页直接横比。
