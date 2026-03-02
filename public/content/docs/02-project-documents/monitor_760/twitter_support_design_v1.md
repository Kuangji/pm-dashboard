# NoxUI 交互方案：内容监控 - Twitter (X) 监控支持 (7.6.0 v1)

## Context for AI (Stitch Context)
> **Project Background**: NoxInfluencer 2.0 (v7.6.0). Adding full support for Twitter (X) post monitoring to provide brands with multi-platform insights.
> **Refactor Goal**: To integrate Twitter's unique metrics and content types seamlessly into the existing monitor list, ensuring visual consistency and data clarity.
> **Key Pain Points**: 
> 1. Standardizing Twitter metrics (Views, Bookmarks) against video metrics.
> 2. Handling text-only posts in a thumbnail-driven list view.
> 3. Dynamic UI adjustments when filtering by platform.
>
> **⚠️ IMPORTANT INSTRUCTION TO AI**: Please analyze this context to understand the domain and user goals. **DO NOT generate any UI screens yet.** Simply reply with "Context Received" to acknowledge that you have understood the background and are ready for specific design tasks.

## 1. 需求分析 (Requirement Analysis)
*   **核心逻辑**: 
    - **动态表头**: 基于平台 Tab 切换，自动调整“阅读量/播放量”和“转推/分享”的标签，并透出“书签”字段。
    - **内容重构**: 针对纯文字推文，通过“文本卡片化”技术生成占位封面。
    - **汇总一致性**: 将 Twitter 指标合并计入全局汇总面板。

## 2. 交互方案 (Interaction Design)

### 2.1 列表视图：动态表头与字段 (Dynamic List)
- **Table Headers**:
    - 当 Tab = `Twitter` 时，字段标签更名：
        - `播放量` -> `阅读量 (Views)`
        - `分享量` -> `转推 (Retweets)`
        - **新增列**: `书签 (Bookmarks)`。
- **Source Label**: Twitter 任务默认显示 `X` 平台 Logo 图标。

### 2.2 纯文字预览卡片 (Text-only Thumbnail)
- **Component**: Generated Text Placeholder.
- **Visuals**:
    - **背景**: 浅蓝色渐变或 NoxBlue 淡色背景。
    - **内容**: 居中显示推文前 50 字，字体采用 14px 细体，带有双引号修饰。
- **Value**: 消除列表中的空白封面，提升视觉连贯性。

### 2.3 汇总面板适配 (Summary Integration)
- **Logic**: 汇总卡片（Stats Cards）自动计算 Twitter 任务的数据。
    - “总播放量”卡片下方增加微型标注：`含 125k 阅读量 (Twitter)`。
    - “总互动量”计入点赞+回复+转推+书签。

## 3. Stitch Prompting Strategy (投喂策略)
1.  **Step 1 (Context Setting)**: 发送 **Context for AI** 章节。
2.  **Step 2 (Execution)**: 按顺序投喂下方场景指令。

## 4. Stitch 原型生成指令集 (Stitch Commands)

> **全局视觉预设 (Global Preset)**: 
> "Design System: Material Design 3. Primary Color: #2E5BFF. **Visual Tokens**: Border Radius: Modal 12px, Button 8px, Card 10px; Spacing: 16px; Density: Compact. **Language**: Simplified Chinese."

### 场景 A: [核心界面] Twitter 平台列表视图
> "设计内容监控的‘任务列表’，当前已选中 ‘Twitter’ 平台 Tab。
> 1. 表格表头显示为：内容、阅读量、点赞、转推、书签、互动率。
> 2. 行 1：一条带图片的推文，预览图显示图片缩略图。
> 3. 行 2：一条‘纯文字’推文，预览图显示一个带蓝色背景的文字摘要卡片。
> 4. 页面顶部的汇总卡片显示总阅读量为 1.2M。"

### 场景 B: [详情展示] Twitter 任务详情预览
> "展示点击 Twitter 任务后弹出的详情抽屉 (Drawer)。
> 1. 顶部显示完整的推文内容（文字+链接），下方显示 X 平台 Logo。
> 2. 数据区域以 2x3 的网格展示：阅读量、点赞、转推、回复、书签、互动率。
> 3. 如果该推文是【投票 (Poll)】，下方额外展示一个投票结果区域，显示选项 A (40%)、选项 B (60%)。"

### 场景 C: [主界面] 推文串 (Thread) 标识
> "在 Twitter 平台列表视图中：
> 1. 第一行：推文标题前带有一个灰色的 [串] 标签。
> 2. 内容预览显示 Thread 的第一张图。"
