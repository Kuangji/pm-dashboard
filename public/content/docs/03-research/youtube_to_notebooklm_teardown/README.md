# YouTube to NotebookLM 拆解

## 结论速览

- 这不是一个“官方 NotebookLM API 集成”产品，而是把 `YouTube 前台枚举能力` 和 `NotebookLM 私有写入接口` 拼成一条一键流水线的浏览器自动化工具。
- 真正可复制的核心，不是 Chrome 插件外壳，而是：`批量拿到公开视频 URL -> 选择目标容器 -> 批量写入 -> 轮询完成 -> 打开可问答工作台`。
- 它宣传的“整个频道”并不等于真正全量归档。代码里存在明确的 `50 / 300` 上限，并且只覆盖公开视频列表，不覆盖 Shorts、Community、全部历史归档或私有内容。
- 对 NoxInfluencer 来说，最优解不是照搬一个“发往 NotebookLM”的插件，而是把现有频道/视频数据底座升级成 `站内 AI 研究工作台 / Creator Knowledge Base`。

## 阅读顺序

1. [调研简报](./调研简报.md)
2. [原始证据](./01_raw_data/YouTube_to_NotebookLM_raw.md)
3. [交互流程](./02_ux_flows/youtube_to_notebooklm_flow.md)
4. [功能拆解](./03_teardown/youtube_to_notebooklm_teardown.md)
5. [对比矩阵](./04_matrix/feature_comparison.md)
6. [竞品洞察](./05_insights/竞品洞察.md)

## 推荐一句话

Nox 应复制的是“整频道进入 AI 研究容器”的结果，不是“把 URL 扔进 NotebookLM”的路径。
