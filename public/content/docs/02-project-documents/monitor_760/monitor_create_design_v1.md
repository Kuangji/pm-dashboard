# NoxUI 交互方案：内容监控 - 创建监控任务 (7.6.0 v1)

## Context for AI (Stitch Context)
> **Project Background**: NoxInfluencer 2.0 (v7.6.0). The "Content Monitor" module allows brands to track real-time performance metrics (views, likes, engagement) of specific social media posts.
> **Refactor Goal**: To support enterprise-level usage by merging the fragmented "Manual Monitor" (for existing URLs) and "Auto-track" (for future content) workflows into a unified, high-efficiency creation modal.
>
> **⚠️ IMPORTANT INSTRUCTION TO AI**: Please analyze this context to understand the domain and user goals. **DO NOT generate any UI screens yet.** Simply reply with "Context Received" to acknowledge that you have understood the background and are ready for specific design tasks.

## 1. 需求分析 (Requirement Analysis)
- **目标**: 统一“内容监控”与“自动追踪”的入口，解决批量录入效率低、追踪规则无管理的问题。
- **核心逻辑**: 
    - **双模态**: 同一个 Modal 内承载“手动录入”和“自动追踪”两种业务。
    - **暂存机制**: 纯前端的批量录入表格，支持“配置继承”与“手动锁定”。
    - **闭环管理**: 在创建界面内直接管理历史规则。

## 2. 交互方案 (Interaction Design)

### 2.1 入口与框架 (Desktop Web)
- **Container**: Large Modal (1000px)，支持遮罩层点击关闭。
- **Tabs**: 
    1.  **监控已发布内容**
    2.  **自动追踪新内容** (带 New 徽章)

### 2.2 Tab 1: 暂存编辑区 (Staging Area)
- **通用配置栏 (Global Bar)**: 紧贴 Modal 顶部，采用浅灰色背景隔离。
- **锁定保护 (Lock Mechanism)**:
    - 当用户修改表格行中的特定配置时，单元格右侧出现蓝色小锁图标 (`🔒`)。
    - Hover 锁定图标时，显示 Tooltip `恢复同步`。
- **提交反馈**:
    - 点击“开始监控”，展示局部 Loading。
    - **失败状态**: 报错行背景变为淡红色，输入框下方显示红字错误文案（如：`视频已私密` 或 `配额不足`）。

### 2.3 Tab 2: 自动追踪规则管理 (Jump-link Highlight)
- **表单变更**: 移除“标题”输入框，增加“备注 (选填)”文本域。
- **配额提示**: 在新建规则表单上方或按钮旁显示 `当前运行中规则: X/10`。当 X=10 时，表单处于不可提交状态。
- **状态表现**: 
    - **运行中**: 绿色状态点，操作列显示“停止”按钮。
    - **已失效**: 灰色状态点，操作列无动作或显示“已停止”置灰文本。
- **定位高亮**: 当从监控列表点击来源标签跳转而来时，目标规则行会进行 `闪烁高亮 (Flash Animation)` 2 秒。

## 3. Stitch 原型生成指令集 (Stitch Commands)

> **全局视觉预设 (Global Preset)**: 
> "Design System: Material Design 3. Primary Color: #2E5BFF. Visual Tokens: Border Radius: Modal 12px, Button 8px, Card 10px; Button Height: 36px; Spacing: 16px; Density: Compact. **Device Type: DESKTOP WEB**. Language: Simplified Chinese."

### 场景 A: [新建流程] 暂存表格填充与锁定态
... (保持不变)

### 场景 B: [管理流程] 规则列表与操作限制
> "设计新建监控弹窗的 Tab 2。
> 1. 左侧是‘新建规则’表单：包含频道选择器、关键词输入框、备注（TextArea）。**注意：没有标题字段**。
> 2. 右侧是‘规则列表’。其中第一行规则状态为‘运行中’，操作列有一个红色的‘停止’按钮。
> 3. 第二行规则状态为‘已失效’，操作列显示文字‘已停止’。
> 4. 每行透出‘已生成 X 个任务’及‘备注’内容。"
