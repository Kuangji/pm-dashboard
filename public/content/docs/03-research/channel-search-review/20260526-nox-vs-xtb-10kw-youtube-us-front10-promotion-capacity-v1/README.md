# 20260526 Nox vs XTB 10KW YouTube US Front10 Promotion Capacity V1

本轮覆盖 10 个关键词、2 个 provider（nox / xtb）、YouTube、US，采样范围为每个 provider 的前 10 页。评分规则版本为 `promotion-capacity-v1`，主评分模型为 `gpt-5.4-mini`。

## 完整性状态

- provider run: 20/20 均有评分结果，合计 8471/8471 条 completed，failed 0。
- 每个 keyword 目录均已补齐 `README.md` 和 `provider-comparison.md`。
- 每个 provider 目录均包含 `README.md`、`summary.md`、`summary.csv`、`badcases.csv`、`scores.json`、`records.raw.json`、`records.normalized.json`、`run_meta.json` 和 `tasks/`。
- `review-package.jsonl.gz` 已按需生成：root 单文件压缩插件包，包含 20 个 run、8471 条记录。
- 低置信度复判未运行：本轮 `scores.json.low_confidence_review.enabled=false`，这是默认行为；需要复判时应显式指定。

## 总览

| keyword | nox total | nox badcase率 | xtb total | xtb badcase率 | 差值 nox-xtb | 报告 |
| --- | ---: | ---: | ---: | ---: | ---: | --- |
| coffee machine | 500 | 34.4% | 500 | 21.2% | 13.2% | [provider-comparison.md](coffee-machine/provider-comparison.md) |
| lawn mower | 500 | 23.6% | 500 | 12.8% | 10.8% | [provider-comparison.md](lawn-mower/provider-comparison.md) |
| tech | 500 | 8.6% | 500 | 8.0% | 0.6% | [provider-comparison.md](tech/provider-comparison.md) |
| fashion | 500 | 1.6% | 500 | 7.0% | -5.4% | [provider-comparison.md](fashion/provider-comparison.md) |
| lifestyle | 500 | 1.2% | 500 | 5.4% | -4.2% | [provider-comparison.md](lifestyle/provider-comparison.md) |
| power bank | 500 | 23.2% | 500 | 10.8% | 12.4% | [provider-comparison.md](power-bank/provider-comparison.md) |
| swim vest | 71 | 46.5% | 78 | 30.8% | 15.7% | [provider-comparison.md](swim-vest/provider-comparison.md) |
| vacuum cleaner | 500 | 31.8% | 500 | 16.8% | 15.0% | [provider-comparison.md](vacuum-cleaner/provider-comparison.md) |
| baby supplement | 135 | 53.3% | 187 | 34.8% | 18.6% | [provider-comparison.md](baby-supplement/provider-comparison.md) |
| pet food | 500 | 41.8% | 500 | 39.0% | 2.8% | [provider-comparison.md](pet-food/provider-comparison.md) |

## 汇总计数

- total: 8471
- fit: 3749
- adjacent: 3092
- badcase: 1630（19.2%）
- failed: 0

## 运行时间

- provider shard 计数合计: 872
- provider shard duration 合计: 105606.7s
- 加权平均单频道执行时间: 12.1s

| keyword | provider | avg shard | avg/channel | timed shards |
| --- | --- | ---: | ---: | ---: |
| coffee machine | nox | 106.6s | 9.5s | 47 |
| coffee machine | xtb | 191.3s | 15.1s | 47 |
| lawn mower | nox | 116.9s | 12.1s | 52 |
| lawn mower | xtb | 148.0s | 16.4s | 56 |
| tech | nox | 92.7s | 9.4s | 51 |
| tech | xtb | 135.4s | 13.5s | 50 |
| fashion | nox | 86.9s | 7.5s | 53 |
| fashion | xtb | 126.4s | 13.1s | 52 |
| lifestyle | nox | 64.9s | 6.5s | 50 |
| lifestyle | xtb | 115.0s | 11.5s | 50 |
| power bank | nox | 109.4s | 10.9s | 50 |
| power bank | xtb | 134.9s | 14.5s | 54 |
| swim vest | nox | 106.8s | 12.0s | 8 |
| swim vest | xtb | 121.5s | 13.8s | 9 |
| vacuum cleaner | nox | 101.6s | 10.3s | 51 |
| vacuum cleaner | xtb | 137.2s | 16.1s | 60 |
| baby supplement | nox | 183.4s | 8.2s | 6 |
| baby supplement | xtb | 235.8s | 12.5s | 10 |
| pet food | nox | 111.2s | 11.1s | 50 |
| pet food | xtb | 127.7s | 16.3s | 66 |

## 注意事项

- nox browser-context 采集的 normalized 记录未逐条保留 `raw_meta.page_number`，但 `records.raw.json.pages` 保留了本轮请求页码 `1-10`；逐页分析以 rank 推导页码。
- `task_failures.json` 保留的是中途采集失败历史，不代表最终 scores 状态；最终状态以各 provider `scores.json` 为准。
- swim vest / nox: 前10页实际返回 71 条（raw 页码仍为 1,2,3,4,5,6,7,8,9,10）
- swim vest / xtb: 前10页实际返回 78 条（raw 页码仍为 1,2,3,4,5,6,7,8,9,10）
- baby supplement / nox: 前10页实际返回 135 条（raw 页码仍为 1,2,3,4,5,6,7,8,9,10）
- baby supplement / xtb: 前10页实际返回 187 条（raw 页码仍为 1,2,3,4,5,6,7,8,9,10）

## Keyword 入口

- [coffee machine](coffee-machine/README.md)
- [lawn mower](lawn-mower/README.md)
- [tech](tech/README.md)
- [fashion](fashion/README.md)
- [lifestyle](lifestyle/README.md)
- [power bank](power-bank/README.md)
- [swim vest](swim-vest/README.md)
- [vacuum cleaner](vacuum-cleaner/README.md)
- [baby supplement](baby-supplement/README.md)
- [pet food](pet-food/README.md)
