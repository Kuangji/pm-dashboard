# Modash 全景竞研计划

## 项目背景与目标

**背景**：需要建立一个可分发的 Modash 平台级竞研包，覆盖官方定位、社区口碑、功能结构、以及与 NoxInfluencer 和头部平台的竞争位置。

**目标**：输出一套可直接阅读、复用、继续迭代的竞研文档，而不是只搭空目录。

**固定研究问题**：

1. Modash 在官方叙事里卖的到底是什么能力组合？
2. 用户买它的真实原因是否与官方叙事一致？
3. Modash 与 Nox 的差异主要是能力差异，还是 packaging / ICP 差异？
4. 如果把 Modash 放进头部平台格局，它更像哪一类玩家？

---

## 执行状态

| 阶段 | 状态 | 说明 |
|------|------|------|
| Phase 1：官方定位 + 定价 + 功能地图 | [x] 完成 | 基于官网、功能页、历史资料完成 |
| Phase 2：社区口碑 + 评论归因 | [x] 完成 | 以 G2 + Reddit 为主，Capterra 留有缺口说明 |
| Phase 3：竞争矩阵 + 洞察摘要 | [x] 完成 | 已产出 6 家平台总表与 Nox 深对比 |

---

## 当前目录结构

```text
modash_竞研/
├── README.md
├── _plan.md
├── 00_executive_summary/
│   ├── 执行摘要.md
│   └── 一页版速览.md
├── 01_official_positioning/
│   ├── modash_官方定位与产品叙事.md
│   └── modash_定价与商业模式.md
├── 02_community_voice/
│   ├── 社区口碑汇总.md
│   ├── G2_Capterra_评论摘要.md
│   └── Reddit_用户声音.md
├── 03_feature_teardown/
│   ├── modash_功能地图.md
│   ├── modash_能力拆解.md
│   └── modash_侧重点判断.md
├── 04_competitive_matrix/
│   ├── 平台对比总表.md
│   ├── vs_nox_detailed_matrix.md
│   └── 头部平台定位图.md
├── 05_insights/
│   ├── 核心发现.md
│   ├── 竞争优势与短板.md
│   └── 机会点与风险.md
└── 06_raw_sources/
    ├── official_sources.md
    ├── review_sources.md
    └── community_sources.md
```

---

## 来源覆盖率

| 来源类型 | 覆盖情况 | 备注 |
|------|------|------|
| Modash 官网 | 已覆盖 | 首页、Discover、功能导航、对比文章 |
| Modash 帮助/产品说明 | 部分覆盖 | 以功能页为主，未做登录后深测 |
| G2 | 已覆盖 | 可获取到近 2024-2025 年多条长评 |
| Capterra | 部分覆盖 | 本轮未检索到稳定的 Modash 产品页，保留为信息缺口 |
| Reddit | 已覆盖 | 以经验贴与替代品讨论为主，信号强于事实 |
| Nox 内部资料 | 已覆盖 | 主要使用 `__main__.md` 版本记录和既有竞品研究资料 |
| 其他头部平台 | 已覆盖基础定位 | 主要用于横向矩阵，不在本轮展开单平台深拆 |

---

## 可信度备注

- **高置信**：Modash 的产品模块、官方 ICP、平台覆盖、是否提供 trial、是否强调 workflow
- **中置信**：G2 用户普遍好评/差评模式，因为样本偏已购买用户
- **中低置信**：Reddit 对价格和数据库口径的吐槽，因为讨论经常混入竞品自荐与非付费用户想象
- **中置信**：Nox vs Modash 的能力判断，因为 Nox 部分信息来自内部版本记录与既有工作区文档，而非统一产品手册

---

## 已回答 / 未回答

### 已回答

- Modash 不是 creator marketplace，而是品牌/代理侧的 creator workflow platform
- 它的突出卖点是“更轻的一体化执行闭环”，不是最重的企业套件
- 它对 DTC / gifting / affiliate / Shopify 场景明显友好
- 社区认可其搜索、易用性、支持响应和工作流连接能力

### 未完全回答

- Capterra 对 Modash 的最新评论与评分分布
- Modash 登录后部分 track/pay/reporting 边界能力
- 6 家平台在 2026 年最新定价页是否有细节变化

> 这些未回答项不会阻塞当前首版文档，但适合后续补充成 v1.1。

---

## 验收清单

- [x] `README.md` 提供 5 分钟 / 15 分钟 / 完整阅读路径
- [x] `执行摘要.md` 回答“是什么 / 为什么有人买 / 强在哪 / 相对位置”四个问题
- [x] `平台对比总表.md` 覆盖 8+ 统一维度，6 家平台全部落表
- [x] `vs_nox_detailed_matrix.md` 输出“我方领先 / 我方落后 / 认知错位 / 暂不建议跟进”
- [x] `社区口碑汇总.md` 中每条判断能回溯到 G2 / Reddit / 官方来源
- [x] 本文件记录来源覆盖率、未覆盖点与可信度备注

---

*计划更新时间：2026-03-26*
