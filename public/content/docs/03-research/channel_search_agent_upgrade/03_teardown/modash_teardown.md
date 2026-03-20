# Modash · Feature Teardown

## 功能定义

用自然语言或图片直接找 creator/content 匹配，减少关键词和 hashtag 试错。

## 交互实现

- 搜索入口就是 AI Search 本体
- 首轮直接给结果
- creators 与 matching content 同屏
- filters 作为二次收口工具

## 边界处理

- 多轮追问弱
- 平台范围当前偏窄
- 更像 single-prompt search，而不是持续对话

## 业务信号

- 抢占“AI 在 discovery 主入口里”的心智
- 重点打视觉类目和 brand-fit 搜索

## 设计令牌

- 文案非常轻
- 视觉强调内容而非聊天气泡
- AI 感来自简化搜索与内容匹配，而非强拟人助手

## 学习与避坑

- 可复用：`先结果，后 refine`
- 可复用：AI 融进搜索，不拆独立工具
- 需规避：如果没有足够多轮澄清，复杂需求仍会落回手动改词
