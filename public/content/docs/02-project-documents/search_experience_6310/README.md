# 搜索体验 v6.3.10

> `current_release`: `v6.3.10`  
> `depends_on`: `v6.3.9`  
> 文档流：`input -> spec -> design -> demo -> prd`

## 版本定位

`v6.3.10` 聚焦 `智能精选`。

本版本不再把智能精选定义为“另一个 AI 搜索助手”，而是定义为：

> 对一份已有频道列表快照做 deep research、全景数据筛选和 shortlist 收敛的后处理工作台。

换句话说：

- 经典搜索负责产出候选频道列表。
- 智能精选负责在这份列表上继续精筛。
- 输入核心是 `冻结的列表快照 / 引用 + 来源搜索条件集`。
- 输出是一份更小、更可信、更适合后续消费的精选结果。

## 版本边界

本期包含：

- 标准搜索结果页进入智能精选。
- 输入列表快照卡。
- 精选策略指令。
- 基底选择器。
- `继续筛 / 重新筛` 两类策略动作。
- session 持久化与独立化。
- 当前精选结果与来源快照的轻量关系说明。

本期不包含：

- 从 0 开始的全库 AI 搜索入口。
- 其它列表入口到智能精选的桥接。
- 完整策略编辑器。
- 树状历史或全量轮次 lineage 图。
- 重型 diff 对照视图。
- PRD 阶段才应收口的后端接口字段细节。

## 文档结构

- [`intelligent_curation/input_v1.md`](./intelligent_curation/input_v1.md)
- [`intelligent_curation/spec_v1.md`](./intelligent_curation/spec_v1.md)
- [`intelligent_curation/design_v1.md`](./intelligent_curation/design_v1.md)
- [`intelligent_curation/internal_reference_teardown.md`](./intelligent_curation/internal_reference_teardown.md)

## Demo 方向

后续 demo 需要改成真实产品页面，而不是场景说明工作台。

参考 `v7.6.1` 内容监控 demo 的方式：

- 以真实业务页面承载交互。
- 使用接近线上产品的导航、列表、筛选、抽屉和工作台布局。
- 不再把“状态解释”作为页面主体。

第一版 demo 建议覆盖：

- 标准搜索结果页。
- 从结果页创建智能精选 session。
- 智能精选工作台。
- 继续筛。
- 重新筛。
- session 列表与恢复。

