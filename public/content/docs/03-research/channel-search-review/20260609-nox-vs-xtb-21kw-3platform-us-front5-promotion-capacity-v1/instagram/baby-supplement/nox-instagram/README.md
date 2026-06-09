# nox instagram baby supplement

一句话结论：nox / instagram / baby supplement: 250 条已评分，badcase率 26.0%，fit 59、adjacent 126、badcase 65。
平均 shard 执行时间：154.5s；平均单频道执行时间：6.8s。

## 主要文档

- [summary.md](summary.md): 单 provider 汇总、分桶 badcase率、badcase 明细。
- [badcases.csv](badcases.csv): 可表格化处理的 badcase 明细。
- [scores.json](scores.json): agent 评分原始结果与 task reports。
- [records.normalized.json](records.normalized.json): 标准化后的召回证据。
- [records.raw.json](records.raw.json): provider 原始采集结果。
- [run_meta.json](run_meta.json): 本次任务参数、页码、模型与并行配置。
- [tasks/](tasks/): 子 Agent shard 输入输出，排查失败和重试时优先看这里。
