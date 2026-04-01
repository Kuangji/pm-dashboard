# 搜索体验 MVP 重写

> 阶段：MVP 方案重写 / 轻量交付  
> 范围：频道搜索模式升级（需求 1 + 2） + 相似网红替换（需求 3）

## 项目目标

这次不是继续推进 `channel_search_agent_upgrade` 那条“搜索框本体 Agent 化”的完整大改线，而是先做一套更接近真实可落地 MVP 的搜索体验重写：

1. 在频道搜索里，把自然语言输入做成 `标准搜索` 内的显式输入形态切换
2. 单独建立 `AI搜索（智能精选）` 的探索式批次搜索模式
3. 同步替换 `相似网红` 的默认入口逻辑：从收藏夹输入改为单频道输入 + 多模态向量召回

## 项目拆分

本项目按一个总项目、两条工作流组织：

### 工作流 A：频道搜索模式升级

目录：[`channel_search_modes/`](./channel_search_modes/)

覆盖两条能力：

- `标准搜索`
  - 保留现有搜索 API 与结果页
  - 新增 `关键词 / 自然语言` 输入形态切换
  - 自然语言只负责构建与调整标准 schema 参数
- `AI搜索（智能精选）`
  - 独立探索式模式
  - 批次返回结果
  - 用户通过 `采纳 / 排除 / 待定` 消费结果，并手动触发下一批

### 工作流 B：相似网红替换

目录：[`similar_search_replacement/`](./similar_search_replacement/)

核心改动：

- 保留 `相似网红` 独立入口
- 默认主流程切为 `单频道输入 -> 多模态向量召回`
- 旧的 `收藏夹输入 + 标签重合度` 方案保留为次级 Tab

## 与旧项目的关系

### 与 `channel_search_agent_upgrade` 的关系

- 那个项目关注的是“完整 Agent 搜索框工作台”
- 本项目关注的是“先把真实可落地的 MVP 做出来”
- 两者共享部分背景，但不共享完整状态机与交互复杂度

### 与营销计划页 `智能精选` 的关系

- 营销计划页旧 `智能精选` 仅作为参考来源
- 它被 `campaignId` 上下文强绑定，不能直接复制到频道搜索
- 本项目只复用其中的若干感知特征：
  - 自然语言输入
  - 独立模式心智
  - 结果消费式工作流雏形

## 推荐阅读顺序

1. [`channel_search_modes/internal_reference_teardown.md`](./channel_search_modes/internal_reference_teardown.md)
2. [`channel_search_modes/input_v1.md`](./channel_search_modes/input_v1.md)
3. [`channel_search_modes/spec_v1.md`](./channel_search_modes/spec_v1.md)
4. [`channel_search_modes/design_v1.md`](./channel_search_modes/design_v1.md)
5. [`similar_search_replacement/current_flow_teardown.md`](./similar_search_replacement/current_flow_teardown.md)
6. [`similar_search_replacement/input_v1.md`](./similar_search_replacement/input_v1.md)
7. [`similar_search_replacement/spec_v1.md`](./similar_search_replacement/spec_v1.md)
8. [`similar_search_replacement/design_v1.md`](./similar_search_replacement/design_v1.md)

## Demo 规划

源码目录：

- `06_Prototypes/search_experience_mvp_upgrade_demo/`

发布目录：

- `publish/demos/search-experience-mvp-upgrade/`

统一 demo 内部切两条工作流：

- `频道搜索模式升级`
- `相似网红替换`

## 当前冻结决策

- 频道搜索页一级只分 `标准搜索 | AI搜索`
- `自然语言搜索` 不单列为第三个主模式，而是 `标准搜索` 内的输入形态切换
- `AI搜索（智能精选）` 与 `标准搜索` 各自保留各自 session，不自动双向同步
- `AI搜索` 支持 `从 0 开始` 与 `带当前标准搜索范围起手` 两种新建方式
- `AI搜索` 的 session 需要持久化，刷新后默认恢复最近活动的未归档 session
- `AI搜索` 页面改为 `左侧 session 历史侧栏 + 右侧当前工作台`
- `标准搜索` 结果页需要提供显式桥接动作，把当前条件带到 `AI搜索`
- `AI搜索` 默认按 `10` 条批次结果设计
- `AI搜索` 不做解释层与逐条匹配理由
- `相似网红` 继续独立存在，不并入频道搜索或 AI搜索
- 新相似网红默认主流程使用 `单频道输入 + 多模态向量召回`
- 新相似网红支持 `URL 携带平台 + 频道ID` 直达并自动触发搜索
- 旧相似网红流程作为页内次级 Tab 保留
