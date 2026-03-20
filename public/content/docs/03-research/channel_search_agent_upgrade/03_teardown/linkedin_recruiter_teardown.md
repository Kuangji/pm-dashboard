# LinkedIn Recruiter · Feature Teardown

## 功能定义

让招聘者通过自然语言起搜，再把 AI 推荐、显式条件与结果解释整合进同一 search task。

## 交互实现

- prompt box 起搜
- AI recommendations 直接转 current filters
- Qualifications / Show filters 同任务可编辑
- 结果卡给 AI summary

## 边界处理

- 有独立 AI pane
- 仍依赖复杂专业筛选体系

## 业务信号

- 人机协作搜索，而不是黑箱代理
- 强调“AI 帮你更快到达可编辑搜索”

## 设计令牌

- 专业工作台外观
- AI 可见但不游戏化
- 结果解释增强信任

## 学习与避坑

- 可复用：AI recommendations -> current filters
- 可复用：结果解释
- 需规避：独立 AI pane 会把 Nox 用户注意力拉出搜索框
