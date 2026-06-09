# 20260608 Nox vs XTB 三平台 Front5 召回评分

## 结论速览

- 范围：YouTube / TikTok / Instagram；关键词：beauty、tech、lifestyle；国家：US。
- 采样：每个 provider × 平台 × 关键词只采前 5 页，每页 50 条，共 250 条。
- Provider：nox 与 xtb；数据采集使用 Playwright MCP 现有浏览器上下文，同源 fetch 生成 `*-mcp-input.json` 后离线评分。
- 完成度：4500/4500，failed=0。
- 加权平均单频道评分耗时：5705ms。

## 平台汇总

| 平台 | nox badcase率 | xtb badcase率 | 差值(xtb-nox) | 平台报告 | 细表 |
| --- | --- | --- | --- | --- | --- |
| youtube | 3.3% | 6.3% | 2.9% | [README.md](youtube/README.md) | [细表](youtube/provider-fine-grained-summary.md) |
| tiktok | 3.5% | 27.9% | 24.4% | [README.md](tiktok/README.md) | [细表](tiktok/provider-fine-grained-summary.md) |
| instagram | 8.7% | 17.6% | 8.9% | [README.md](instagram/README.md) | [细表](instagram/provider-fine-grained-summary.md) |

## 平台 × 关键词明细

| 平台 | 关键词 | nox badcase率 | xtb badcase率 | 差值(xtb-nox) | nox均耗时/频道 | xtb均耗时/频道 |
| --- | --- | --- | --- | --- | --- | --- |
| youtube | beauty | 2.8% | 9.2% | 6.4% | 5788ms | 5929ms |
| youtube | tech | 4.8% | 7.6% | 2.8% | 7095ms | 6135ms |
| youtube | lifestyle | 2.4% | 2.0% | -0.4% | 3522ms | 3422ms |
| tiktok | beauty | 3.2% | 10.4% | 7.2% | 8255ms | 5711ms |
| tiktok | tech | 5.6% | 41.6% | 36.0% | 7087ms | 6517ms |
| tiktok | lifestyle | 1.6% | 31.6% | 30.0% | 4305ms | 5303ms |
| instagram | beauty | 2.0% | 3.2% | 1.2% | 5586ms | 5034ms |
| instagram | tech | 22.0% | 28.0% | 6.0% | 6487ms | 6886ms |
| instagram | lifestyle | 2.0% | 21.6% | 19.6% | 4082ms | 5554ms |

## 入口文档

- [YouTube 报告](youtube/README.md)
- [TikTok 报告](tiktok/README.md)
- [Instagram 报告](instagram/README.md)
- [MCP 采集汇总](mcp_capture_summary.json)

## 注意事项

- 本轮没有使用 direct Node fetch 采集，因为 nox/xtb 的有效登录态与代理在 Playwright MCP 已连接浏览器实例中。
- `.result-count` 的页面 DOM 在直接导航搜索页时不稳定，本轮输入文件中的召回量以同源接口返回的 `totalSize/retData` 为主，并保留 `raw.recall_count` 字段。
- 本轮没有开启低置信度复判。
