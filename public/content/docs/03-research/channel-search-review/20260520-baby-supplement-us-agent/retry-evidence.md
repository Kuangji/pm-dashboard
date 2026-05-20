# Retry Evidence

一句话结论：本轮两个 provider 最终均全量完成；失败主要表现为批量 Agent 输出漏单或整批无可解析结果，单条 retry 全部恢复。

## Page Availability

Nox 线上 `baby supplement` 在指定页集合中只返回 134 条，后续页为空；Debugger 返回 133 条，说明该关键词有效召回量本身不足 350。

### Nox Browser-Context Collection

| page | returned_items | reported_total |
|---:|---:|---:|
| 1 | 50 | 0 |
| 2 | 50 | 0 |
| 3 | 34 | 0 |
| 4 | 0 | 0 |
| 5 | 0 | 0 |
| 10 | 0 | 0 |
| 20 | 0 | 0 |

## nox

- score total: 134
- batch tasks needing retry: 4
- retry input count: 31
- retry completed outputs: 31

| task | expected | completed | failed | evidence_path |
|---|---:|---:|---:|---|
| task-0002 | 10 | 9 | 1 | nox-youtube/tasks/task-0002.output.json |
| task-0003 | 10 | 0 | 10 | nox-youtube/tasks/task-0003.output.json |
| task-0006 | 10 | 0 | 10 | nox-youtube/tasks/task-0006.output.json |
| task-0008 | 10 | 0 | 10 | nox-youtube/tasks/task-0008.output.json |

## debugger

- score total: 133
- batch tasks needing retry: 1
- retry input count: 10
- retry completed outputs: 10

| task | expected | completed | failed | evidence_path |
|---|---:|---:|---:|---|
| task-0004 | 10 | 0 | 10 | debugger-youtube/tasks/task-0004.output.json |

## Optimization Notes

- 批量 shard 的主要风险不是超时，而是模型输出 JSON 中缺少部分 channel，或输出结构无法被 worker 解析。
- 本轮 Nox 主批 31 条进入 retry；Debugger 主批 10 条进入 retry。
- 单条 retry 成功率为 100%，说明后续优化可以优先放在 batch prompt 的输出约束、records-per-task 自适应缩小、以及 worker 对半结构化输出的容错解析。
