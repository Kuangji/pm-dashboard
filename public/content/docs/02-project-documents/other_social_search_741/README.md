# other_social_search_741

## Topic 定义

**其他社媒搜索** —— NoxInfluencer 在 YouTube / TikTok / Instagram 之外，对 Facebook、X（Twitter）等平台的搜索与频道能力建设。

---

## v7.4 系列版本概览

| 版本 | 简称 | 描述 | 状态 |
|------|------|------|------|
| v7.4.0 | 740 | 其他社媒搜索初版（Facebook + X 搜索） | ✅ 已上线（2025.12） |
| v7.4.1 | 741 | Twitter 真实搜索 + 站内频道详情页 | 🔵 进行中 |

---

## 当前阶段说明

`741` 当前已经进入 **Spec → Design** 阶段。

这意味着：

- 现有 `input_v3.md` 是当前可信输入稿，不再沿用旧的半 Spec 化结构。
- `spec_v1.md` 已完成第一轮收口，可作为 Design 阶段的规则基线。
- `design_v1.md` 正在把参考截图、页面结构、交互与状态规范落成设计文档。

---

## 741 当前共识

### 搜索侧

- 沿用 `740`「其他社媒搜索」旧框架
- 只改 Twitter，Facebook 不动
- Twitter 搜索对象切换为真实 Twitter 账号
- 结果卡主信息：头像、名称 / 别名、类别、地区、粉丝数、内容总数、平均互动率、预估曝光量
- 搜索框附近主筛选：频道类别、频道地区、粉丝量
- 抽屉保留频道组与受众组；其中受众组本期以整组置灰 + 占位曝光承接
- 搜索结果默认按综合排序理解

### 详情侧

- 从 0 建立站内 Twitter 频道详情页
- 优先参考 Instagram / TikTok 频道详情页
- 沿用现有频道详情页四分区骨架
- 第一版优先级：数据总览 > 内容数据 > 受众数据（占位） > 品牌数据（占位）
- 页头必做指标：粉丝量、最近发布时间、平均曝光量、平均互动率
- 支持多入口直达访问详情页；URL 结构与解析主键保留 TODO，不阻塞 Design
- 受众数据与品牌数据第一版均为明确占位，不伪装成完整能力

### 闭环

- 本期主闭环：发现 → 进入详情 → 看懂并判断
- 收藏、联系网红属于必要动作锚点，但能力承接放后续版本

---

## 文档导航

| 文件 | 阶段 | 状态 |
|------|------|------|
| [`v740_background.md`](./v740_background.md) | v7.4.0 背景录入 | ✅ 已完成 |
| [`other_social_search_common_context_v1.md`](./other_social_search_common_context_v1.md) | v7.4.1 公共上下文 | ✅ 已完成 |
| [`input_v2.md`](./input_v2.md) | v7.4.1 Input v2（旧版） | ⬜ 已归档（参考用） |
| [`input_v3.md`](./input_v3.md) | v7.4.1 Input v4（当前） | ✅ 已完成（已与当前 session 结论对齐） |
| [`spec_v1.md`](./spec_v1.md) | v7.4.1 Spec | ✅ 已完成（待按最新结论做一致性复核） |
| [`design_v1.md`](./design_v1.md) | v7.4.1 Design | 🟡 起草中（待基于最新结论收口） |
| [`reference_screenshots/`](./reference_screenshots/) | 设计参考截图 | ✅ 已归档 |
| `prototype_v1.pen` | Pencil 原型 | ⬜ 未开始 |
| `prd_v1.md` | v7.4.1 PRD | ⬜ 未开始 |

---

## 阅读建议

1. 先读 [`v740_background.md`](./v740_background.md) 了解 `740` 历史决策和遗留问题。
2. 再读 [`input_v3.md`](./input_v3.md) 理解当前已确认事实、产品意图与待确认项。
3. 如需进入 Design，先读 [`spec_v1.md`](./spec_v1.md) 与 [`other_social_search_common_context_v1.md`](./other_social_search_common_context_v1.md)。
4. 查看 [`_plan.md`](./_plan.md) 跟踪当前推进阶段。
