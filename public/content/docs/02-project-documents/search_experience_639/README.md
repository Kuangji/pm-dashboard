# 搜索体验 v6.3.9

> `current_release`: `v6.3.9`  
> `next_release`: `v6.3.10`

## 版本目标

`v6.3.9` 先交付两块已经相对收敛、可快速上线的能力：

1. `标准搜索接入自然语言输入`
2. `单频道相似网红多模态搜索`

本版本不包含：

- `AI搜索（智能精选）`
- `标准搜索 -> 智能精选` 的桥接
- 任何在产品 UI 中通往智能精选的入口或承诺

## 文档结构

- [`standard_search_natural_language/input_v1.md`](./standard_search_natural_language/input_v1.md)
- [`standard_search_natural_language/spec_v1.md`](./standard_search_natural_language/spec_v1.md)
- [`standard_search_natural_language/design_v1.md`](./standard_search_natural_language/design_v1.md)
- [`single_channel_similar_search/input_v1.md`](./single_channel_similar_search/input_v1.md)
- [`single_channel_similar_search/spec_v1.md`](./single_channel_similar_search/spec_v1.md)
- [`single_channel_similar_search/design_v1.md`](./single_channel_similar_search/design_v1.md)

## Demo

继续共用：

- `06_Prototypes/search_experience_mvp_upgrade_demo/`
- `publish/demos/search-experience-mvp-upgrade/`

但在 demo 中，只有打了 `v6.3.9` 标签的场景属于本版本交付范围。

## 冻结结论

- `标准搜索` 仍是频道搜索唯一正式搜索页
- `自然语言` 只是 `标准搜索` 内的一种输入形态
- `相似网红` 继续独立存在，但默认流程换成 `单频道输入 -> 多模态向量召回`
- `v6.3.9` 的产品 UI 中不出现智能精选入口

## 上线前补充口径

这几个点不改版本方向，但建议作为研发 / 设计补充说明一起带上：

### 1. 标准搜索自然语言解析上下文

- 自然语言解析时，只带 `当前搜索条件` 作为上下文
- 不带 `排序`、`分页`、`展示态`
- 当前最小上下文可理解为：关键词、地区、粉丝量、排除项等已生效条件

### 2. 相似网红 URL 直达契约

- 从搜索结果卡、频道详情页等入口点击 `找相似` 时，统一通过 `platform + channelId` 直达
- 直达后先进入执行中态，再进入结果页
- 不先回到空白输入态

### 3. 相似网红异常输入规则

- 搜索型输入命中多个候选时，必须先选中一个明确频道，不能直接提交
- URL / `@handle` 解析失败时，停留在输入态并给内联错误
- 未形成有效种子前，主按钮始终不可用

### 4. 更换频道时旧结果保留的提示

- 在结果页点击 `更换频道` 后，旧结果可以继续保留
- 但在新种子正式提交前，页面需要明确提示这些结果仍属于 `上一个种子`
- 不应让用户误以为结果已经切换到新种子
