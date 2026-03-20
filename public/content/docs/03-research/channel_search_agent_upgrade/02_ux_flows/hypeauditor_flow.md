# HypeAuditor · UX Flow

用户目标：高精度找 influencer，并在需要时切换到 AI Scout 走 brief 驱动的 shortlist

入口触发：
- 入口位置 1：Influencer Discovery
- 入口位置 2：AI Scout

核心操作步骤：
1. 走 Discovery
   - UI 反馈：用户可用 AI Search、keyword、27+ filters
   - 成功路径：边筛边找，适合专业用户
   - 异常处理：结果差时继续调 filters 或改 query
2. 走 AI Scout
   - UI 反馈：通过 chat field/brief 说明 campaign 需求
   - 成功路径：快速得到约 50 个 shortlist
   - 异常处理：修改 brief，保留 chat history
3. 结果后处理
   - UI 反馈：可加到 My Network、Media Plan、Campaign

完成态：
- 成功：得到 shortlist 并进入 campaign/workflow
- 取消：回到 Discovery 或退出 AI Scout

设计意图假设：
- Discovery 服务专业筛选
- AI Scout 服务“直接给我一批候选人”

摩擦点：
- 两条能力线并存，入口心智成本较高
- AI Scout 容易让注意力离开核心搜索页

亮点：
- 同产品内清晰展示两种 AI 搜索范式
- 结果与后链路衔接强
