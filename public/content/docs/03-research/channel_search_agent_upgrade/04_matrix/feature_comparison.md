# 频道搜索 Agent 化改造 · Feature Comparison

## 调研概览

- 调研功能：频道搜索 Agent 化改造
- 覆盖产品：Modash、HypeAuditor、Upfluence、Klear、LinkedIn Recruiter
- 调研时间：2026-03-19
- 决策目标：定义 Nox 新一代频道搜索的功能边界、交互骨架与视觉策略

---

## 一、搜索主入口范式

| 功能维度 | Nox 现状 | Modash | HypeAuditor | Upfluence | Klear | LinkedIn Recruiter |
|---|---|---|---|---|---|---|
| AI 是搜索主入口本体 | ❌ | ✅ | ⚠️ 部分 | ❌ | ❌ | ✅ |
| 独立 AI 助手/Scout | ✅ 抽屉 | ❌ | ✅ | ✅ | ❌ | ⚠️ AI pane |
| 自然语言直搜 | ⚠️ 需开抽屉 | ✅ | ✅ | ⚠️ 更偏 copilot | ❌ 显性不足 | ✅ |
| 先出结果再 refine | ⚠️ 不稳定 | ✅ | ✅ Discovery / ❌ Scout | ⚠️ 更偏流程型 | ✅ | ✅ |
| AI recommendations 进入当前条件 | ❌ | ⚠️ 靠手动 filter refine | ⚠️ 部分 | ⚠️ | ❌ | ✅ |

---

## 二、追问与会话

| 功能维度 | Nox 现状 | Modash | HypeAuditor | Upfluence | Klear | LinkedIn Recruiter |
|---|---|---|---|---|---|---|
| 多轮追问 | ⚠️ 有但外挂 | ❌ 弱 | ✅ AI Scout 强 | ✅ | ❌ | ✅ |
| 追问留在同一主控件 | ❌ | ✅ 倾向同页 | ❌ AI Scout 独立 | ❌ | ✅ 无显性追问 | ❌ 左侧 pane |
| 历史会话 | ✅ 最多 10 个 | ❓ | ✅ | ❓ | ❌ | ✅ |
| 结果理由解释 | ❌ | ❌ | ✅ Scout 排名理由 | ✅ 协作式解释 | ⚠️ 隐性 | ✅ AI summary |

---

## 三、结构化条件与筛选器

| 功能维度 | Nox 现状 | Modash | HypeAuditor | Upfluence | Klear | LinkedIn Recruiter |
|---|---|---|---|---|---|---|
| 显式 filters 仍是关键能力 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| AI 与 filters 双向同步 | ❌ | ⚠️ 单向 refine | ⚠️ 分入口 | ⚠️ | ❌ | ✅ |
| 结果区外另起一套 AI 状态 | ✅ | ❌ | ✅ | ✅ | ❌ | ✅ |
| 条件透明度 | ⚠️ 有限 | ⚠️ | ✅ Discovery 强 | ⚠️ | ✅ | ✅ |

---

## 四、视觉与交互气质

| 维度 | Nox 现状 | Modash | HypeAuditor | Upfluence | Klear | LinkedIn Recruiter |
|---|---|---|---|---|---|---|
| 更像搜索工具 | ✅ | ✅ | ✅ Discovery | ❌ | ✅ | ✅ |
| 更像聊天产品 | ✅ 抽屉偏强 | ❌ | ✅ AI Scout | ✅ | ❌ | ⚠️ |
| AI 感来自材质/层次 | ❌ | ⚠️ | ⚠️ | ✅ | ❌ | ❌ |
| 局部异化而非全页改版 | ❌ | ✅ | ❌ | ❌ | ✅ | ⚠️ |

---

## 五、三类象限分析

### 5.1 聚集象限

- 自然语言能力不能替代显式 filters，二者需要共存
- 首轮结果尽快出现，比长时间前置澄清更符合搜索心智
- 结果可信度需要通过条件透明或结果解释来增强

### 5.2 分化象限

- `AI 在搜索里` 还是 `AI 独立 scout`
- `单 prompt + refine` 还是 `chat/brief -> shortlist`
- `专业工作台` 还是 `campaign copilot`
- `搜索框中心` 还是 `侧栏/独立助手中心`

### 5.3 空白象限

- 几乎没有竞品把“多轮追问”压回 `同一个搜索框容器` 内完成
- 也很少有竞品明确采用“搜索框外稳定、搜索框内局部 AI 化”的视觉策略
- 这是 Nox 可以形成辨识度的空白位
