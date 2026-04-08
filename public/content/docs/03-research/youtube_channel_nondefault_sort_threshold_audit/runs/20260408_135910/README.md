# 单轮验收 README

- 轮次目录：`20260408_135910`
- 生成时间：`2026-04-08T09:03:18.534Z`
- 轮次来源：`RUN_ID`
- 是否显式新建轮次：`no`
- 关键词集：`marathon, cosmetics, swim vest`
- 本轮建议：**适度放宽**
- 建议依据：至少有一组非默认排序的结果数相对默认排序被压缩到 5% 以下，召回牺牲过大；建议先小幅放宽阈值，再观察 badcase 是否明显反弹。

## 本轮结论速览

- 最脏的非默认组：`marathon × 按粉丝数排序`，clear badcase 98/100
- 召回压缩最明显的组：`swim vest × 按粉丝数排序`，结果数从 195 下降到 1

## 样本摘要

| keyword | 排序方式 | 结果总数 | clear badcase | clear badcase rate |
| --- | --- | ---: | ---: | ---: |
| marathon | 默认排序 | 1640217 | 5 | 5.0% |
| marathon | 按粉丝数排序 | 88942 | 98 | 98.0% |
| marathon | 按预估曝光量排序 | 88942 | 85 | 85.0% |
| cosmetics | 默认排序 | 153743 | 5 | 5.0% |
| cosmetics | 按粉丝数排序 | 16343 | 24 | 24.0% |
| cosmetics | 按预估曝光量排序 | 16343 | 28 | 28.0% |
| swim vest | 默认排序 | 195 | 87 | 87.0% |
| swim vest | 按粉丝数排序 | 1 | 0 | 0.0% |
| swim vest | 按预估曝光量排序 | 1 | 0 | 0.0% |

## 本轮文件

- `00_executive_summary/执行摘要.md`
- `01_raw_data/sample_summary.csv`
- `01_raw_data/default_vs_nondefault_comparison.csv`
- `01_raw_data/top100_detail.csv`
- `02_report/主报告.md`
- `03_process_log/执行记录.md`
- `run_meta.json`

