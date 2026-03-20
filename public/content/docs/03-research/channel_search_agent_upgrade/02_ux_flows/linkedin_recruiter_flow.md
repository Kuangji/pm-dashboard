# LinkedIn Recruiter · UX Flow

用户目标：用自然语言快速起搜候选人，并在同一搜索任务内持续 refine

入口触发：
- 入口位置：homepage / global search bar / project talent pool

核心操作步骤：
1. 用户在 prompt box 里写需求
   - UI 反馈：系统基于自然语言起一轮搜索
   - 成功路径：直接得到 candidate list
2. 用户继续 ask question 或使用 AI recommendations
   - UI 反馈：推荐项被加进 current filters
   - 成功路径：不断 refine 当前 search
3. 用户编辑 qualifications / show filters
   - UI 反馈：显式条件与 AI 搜索保持同一上下文
4. 用户看结果卡的 AI summary
   - UI 反馈：知道为什么这个结果匹配

完成态：
- 成功：形成更精准的人才候选集
- 取消：清空 search 或开新 search

设计意图假设：
- AI 不取代 filters，而是帮用户更快到达“可编辑的 search”

摩擦点：
- 左侧 AI pane 会转移视线

亮点：
- 自然语言、推荐条件、显式 filters、结果解释全在同一任务里
