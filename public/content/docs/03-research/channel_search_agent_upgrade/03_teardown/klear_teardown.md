# Klear · Feature Teardown

## 功能定义

通过 topic-classified search index、受众画像与 performance metrics，提供高可控的专业化 discovery。

## 交互实现

- AI 在底层做 topic classification 与排序
- 前台仍以 filters、hashtags、demographics 为主
- Discovery 与 vetting 紧密相连

## 边界处理

- 没有把 AI 显性做成自然语言入口
- 更适合熟悉搜索逻辑的专业用户

## 业务信号

- 主打数据可信、工具专业，而非 AI 新奇感

## 设计令牌

- 简洁
- 数据工具感
- AI 隐身于系统之中

## 学习与避坑

- 可复用：让 AI 作为可信能力层，而非全程显眼主角
- 需规避：如果完全不显性表达 AI，新用户不会知道搜索能力升级了
