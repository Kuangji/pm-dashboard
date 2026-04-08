# YouTube 频道搜索非默认排序阈值验收

## 项目定位

本目录用于沉淀 `YouTube > 频道搜索` 中“非默认排序阈值收紧”这一迭代的多轮验收结果，重点回答两个问题：

1. 当前阈值下，`按粉丝数排序` 与 `按预估曝光量排序` 的前部结果是否已经足够干净。
2. 在相关性改善和召回量下降之间，当前阈值更适合 `保持不变 / 继续收紧 / 适度放宽` 中的哪一种动作。

这里同步的是适合阅读和复核的版本，保留了多轮结论、单轮报告、执行摘要、过程记录和可复核 CSV，不包含原始抓包 JSON。

## 阅读顺序

1. [当前轮次执行摘要](./runs/20260408_170220/00_executive_summary/执行摘要.md)
2. [当前轮次主报告](./runs/20260408_170220/02_report/主报告.md)
3. [上一轮主报告](./runs/20260408_135910/02_report/主报告.md)
4. [多轮对比索引](#多轮索引)

## 当前结论

- 当前激活轮次：`20260408_170220`
- 当前关键词集：`consumer electronic, outfit, camping, AI, game, lifestyle`
- 当前建议：**继续收紧**
- 主要依据：`consumer electronic`、`camping`、`AI` 等泛词或大类词场景下，非默认排序前部仍混入大量低相关频道。

## 为什么这份报告可信

- badcase 不只给比例，也给“频道主题 + 最近视频 + 排序原因 + 默认排序对照”的证据链。
- 默认排序被保留为基线，用来判断非默认排序前部结果是否真的更合理。
- 单轮报告把 `fit / adjacent / clear badcase` 三档口径拆开，避免边界样本稀释 clear badcase 判断。
- 每轮都保留汇总表、明细表和过程记录，方便回查和复盘。

## 多轮索引

| run_id | 关键词 | 建议动作 | 最脏非默认组 | 单轮入口 |
| --- | --- | --- | --- | --- |
| 20260408_170220 | consumer electronic, outfit, camping, AI, game, lifestyle | 继续收紧 | consumer electronic × 按粉丝数排序 (69/100) | [README](./runs/20260408_170220/README.md) |
| 20260408_135910 | marathon, cosmetics, swim vest | 适度放宽 | marathon × 按粉丝数排序 (98/100) | [README](./runs/20260408_135910/README.md) |

## 目录说明

- `runs/<run_id>/README.md`：单轮结论速览
- `runs/<run_id>/00_executive_summary/`：一页式摘要
- `runs/<run_id>/01_raw_data/`：汇总表、对比表、Top100 明细
- `runs/<run_id>/02_report/`：面向数据组的正式报告
- `runs/<run_id>/03_process_log/`：执行记录、口径与异常说明
