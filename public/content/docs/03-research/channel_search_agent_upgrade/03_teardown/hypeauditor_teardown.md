# HypeAuditor · Feature Teardown

## 功能定义

同时提供专业 Discovery 搜索与基于 brief 的 AI Scout，覆盖“自己筛”和“直接给名单”两类需求。

## 交互实现

- Discovery：AI Search + keyword + 27+ filters
- AI Scout：chat/brief -> shortlist -> history -> downstream actions
- 结果可进入 network、media plan、campaign

## 边界处理

- 两套入口并行，产品心智较重
- Discovery 偏专业，AI Scout 偏助手，分流明显

## 业务信号

- 不只争 discovery，也争 workflow 中枢
- 用 AI 覆盖从 discovery 到 campaign 的多节点

## 设计令牌

- Discovery 是传统专业工作台
- AI Scout 则明显更像聊天式助手

## 学习与避坑

- 可复用：AI Search 与 filters 共存
- 可复用：结果理由解释、history、shortlist 衔接
- 需规避：把默认搜索主流程做成独立 chat 工具，会让 Nox 偏离“搜索框中心”
