# 频道搜索 Agent 化改造调研

## 项目定位

本目录服务于 NoxInfluencer 频道搜索模块的 Agent 化改造，目标是为 `01_Product_Specs/channel_search_agent_upgrade/` 下的 `input/spec/design/prd` 提供直接上游输入。

## 阅读顺序

1. `调研简报.md`
2. `05_insights/竞品洞察.md`
3. `04_matrix/feature_comparison.md`
4. `03_teardown/`
5. `02_ux_flows/`
6. `01_raw_data/`

## 结论先看

- 市场已经出现两条路线：
  - `搜索内 AI`：自然语言直搜，再用筛选器收口
  - `独立 AI Scout`：以 brief/chat 形式输出候选人列表
- Nox 现状更接近“外挂式 AI 抽屉”，不属于真正的搜索主流程升级。
- 本项目建议路线是第三条：
  - `搜索框本体升级`
  - `先搜后追问`
  - `追问留在搜索框内部`
  - `搜索框外保持原状`
  - `展开态内部局部 AI 化`

## 目录说明

- `01_raw_data/`：竞品事实、官方说法、原始观察
- `02_ux_flows/`：按竞品拆交互流程
- `03_teardown/`：按竞品拆设计模式、边界与启发
- `04_matrix/`：横向能力对比矩阵
- `05_insights/`：可直接喂给 VDR 的结论
