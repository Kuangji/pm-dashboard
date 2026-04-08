# 搜索体验 v6.3.10

> `current_release`: `v6.3.10`  
> `depends_on`: `v6.3.9`

## 版本目标

`v6.3.10` 聚焦一件事：

- `智能精选`

以及它与 `标准搜索` 之间唯一先锁定的桥接：

- `标准搜索结果页 -> 智能精选`

这里的 `智能精选` 已不再定义为“另一个 AI 搜索助手”，而是：

- 对一份已有的频道列表快照做进一步 `deep research + 精筛`
- 输入核心是 `冻结的列表快照 / 引用 + 来源搜索条件`
- 输出是一份更小、更可信、可继续消费的 shortlist

本版本不重复定义：

- 标准搜索自然语言主体
- 单频道相似网红主体

这两者都默认视作 `v6.3.9` 已上线前置能力。

## 文档结构

- [`intelligent_curation/internal_reference_teardown.md`](./intelligent_curation/internal_reference_teardown.md)
- [`intelligent_curation/input_v1.md`](./intelligent_curation/input_v1.md)
- [`intelligent_curation/spec_v1.md`](./intelligent_curation/spec_v1.md)
- [`intelligent_curation/design_v1.md`](./intelligent_curation/design_v1.md)

## Demo

继续共用：

- `06_Prototypes/search_experience_mvp_upgrade_demo/`
- `publish/demos/search-experience-mvp-upgrade/`

但在 demo 中，只有打了 `v6.3.10` 标签的场景属于本版本。

## 冻结结论

- `v6.3.10` 只处理 `标准搜索 -> 智能精选`
- 其它入口到智能精选的桥接先不纳入本轮
- 智能精选默认建立在 `v6.3.9` 已上线基础上继续打磨
- 智能精选的直接输入对象是 `可追溯的列表快照 / 引用`，不是全库自由搜索
