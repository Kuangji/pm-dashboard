# channel_search_agent_upgrade

## 文档清单

- `agent_response_contract_v1.md`
- `state_machine_v1.md`
- `input_v1.md`
- `spec_v1.md`
- `design_v1.md`
- `prd_v1.md`

## 阅读顺序

1. `input_v1.md`
2. `state_machine_v1.md`
3. `agent_response_contract_v1.md`
4. `spec_v1.md`
5. `design_v1.md`
6. `prd_v1.md`

## 一句话定义

把 NoxInfluencer 的频道搜索从“关键词 + URL + 筛选器 + 外挂式 AI 助手”升级为“`搜索框本体升级` 的 Agent 搜索工作台”，并坚持：

- 自然语言输入与后续追问都在搜索框内部完成
- 搜索框外保持原状
- 展开后的搜索框内部组件局部 AI 化
- 所有后续交互修改先改状态机，再同步 Demo 与其余文档

## 维护规则

- 当前阶段的讨论主战场是 Demo，但 **Demo 不是状态真相源**。
- `state_machine_v1.md` 是本项目交互状态与状态映射的唯一基准。
- 任何 Demo 改动都必须同步回：
  - `state_machine_v1.md`
  - `spec_v1.md`
  - `design_v1.md`
  - 必要时 `prd_v1.md`
- 若 Demo 与文档不一致，先以 `state_machine_v1.md` 修正，再同步其他文档与 Demo。
