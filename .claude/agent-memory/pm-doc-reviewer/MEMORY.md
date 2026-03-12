# PM Doc Reviewer · 持久记忆（pm-dashboard 侧）

> 此文件与 drafts/.claude/agent-memory/pm-doc-reviewer/MEMORY.md 保持同步。
> 详见 drafts 侧的完整记录。

## 产品域上下文

- **平台**：NoxInfluencer，网红营销 SaaS，面向广告主
- **核心模块**：支付管理（支出单创建 → 合同签署 → 审核 → 转账）
- **对接支付通道**：空中云汇（境外银行转账）

## PM 工作风格

- 文档结构扎实，三件套：状态机图 + 权限矩阵 + 组件状态清单
- 接口契约（API 契约、ID 传递链）偏少，研发细节留白较多
- Review 迭代效率高，响应快，修复质量好

## 金融/支付 PRD 高频盲点

1. 并发竞态（多设备操作同一记录）
2. 草稿 API 联动（draft_id 传递、删除时机）
3. 状态 flag 重置时机与乐观更新回滚
4. 定时任务 SLA 未量化
5. 边界时间前端最终校验逻辑
