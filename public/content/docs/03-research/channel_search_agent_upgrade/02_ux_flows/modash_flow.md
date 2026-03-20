# Modash · UX Flow

用户目标：用自然语言快速找到视觉风格和内容气质匹配的 creator

入口触发：
- 入口位置：Discover 内 AI Search
- 前置条件：进入 Modash 平台

核心操作步骤：
1. 用户直接输入描述性需求
   - UI 反馈：系统直接进入搜索并给出结果
   - 成功路径：同屏看到 creators 与 matching content
   - 异常处理：未见强追问机制，更多依赖改 prompt 或手动 refine
2. 用户继续使用 filters 缩窄结果
   - UI 反馈：followers、engagement、location、gender、age、language 等继续生效
   - 成功路径：从模糊描述走向 shortlist
3. 用户浏览内容与 profile
   - UI 反馈：先看到内容感，再决定是否深看 profile

完成态：
- 成功：获得较高视觉匹配度结果
- 取消：回到普通 discover 流程

设计意图假设：
- 降低“先猜关键词/hashtags”的门槛
- 用内容匹配而非纯 profile 字段建立第一印象

摩擦点：
- 多轮澄清不强
- 平台覆盖仍有限

亮点：
- AI 仍是搜索，而不是独立聊天产品
- `先结果后 refinement` 路径清晰
