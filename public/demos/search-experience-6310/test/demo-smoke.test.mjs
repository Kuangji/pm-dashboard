import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const appJs = fs.readFileSync(path.join(dirname, "..", "app.js"), "utf8");
const indexHtml = fs.readFileSync(path.join(dirname, "..", "index.html"), "utf8");
const stylesCss = fs.readFileSync(path.join(dirname, "..", "styles.css"), "utf8");

const requiredTexts = [
  "classic-filter-wrap",
  "platform-switch",
  "simple-filter-row",
  "关键词",
  "自然语言",
  "展示结果",
  "当前搜索条件",
  "2801.74万 条结果",
  "搜索会根据条件生成候选频道列表",
  "href=\"#search\"",
  "href=\"#confirm\"",
  "href=\"#curation\"",
  "nav-search",
  "nav-confirm",
  "nav-curation",
  "nav-placeholder",
  "当前 Demo 只展开网红发现、需求确认和智能精选链路",
  "curation-task-reminder",
  "curation-task-drawer",
  "toggle-curation-tasks",
  "close-task-drawer",
  "close-task-drawer-mask",
  "close-drawer-mask",
  "open-curation-task",
  "ask-delete-session",
  "confirm-delete-session",
  "cancel-delete-session",
  "blocked-delete-session",
  "删除记录",
  "确认删除",
  "运行中任务需先停止生成",
  "classic-row",
  "classic-video-strip",
  "classic-video-thumb",
  "需求确认",
  "confirmLayout",
  "卡片",
  "结构",
  "摘要",
  "set-confirm-layout-cards",
  "set-confirm-layout-structure",
  "set-confirm-layout-brief",
  "confirm-structure-panel",
  "开始 Agent 精选",
  "confirm-brief-hero",
  "需求摘要",
  "需求说明",
  "补充需求或调整条件",
  "候选范围",
  "精选策略",
  "已整理",
  "候选频道",
  "输出设置",
  "查看候选频道",
  "同步到本次需求",
  "忽略本次调整",
  "返回需求确认",
  "开始精选前，先处理搜索条件变化",
  "同步并开始精选",
  "忽略变化并开始精选",
  "发送后自动更新",
  "发送",
  "正在更新",
  "confirm-loading-card",
  "aria-busy",
  "更新中",
  "已更新需求确认内容",
  "重置需求",
  "recall-condition-box",
  "更多候选条件",
  "condition-empty",
  "更多输出规则",
  "保留边界候选",
  "生成推荐理由",
  "Agent 精选",
  "精选任务",
  "精选结果",
  "目标名单",
  "已产出",
  "每批约",
  "生成中",
  "停止生成",
  "target-draft",
  "目标名单数量",
  "目标数量只能增加",
  "当前候选范围无法达到目标名单量",
  "候选范围可能筛不满",
  "补齐 1 个",
  "保存至收藏夹",
  "进入邀约",
  "导出结果",
  "基于当前需求新建任务",
  "new-session-from-current",
  "创建新的精选任务",
  "推荐理由",
  "风险提示",
  "移出精选",
  "curation-review-main",
  "curation-result-row",
  "save-shortlist",
  "send-invite",
  "export-shortlist",
  "推荐理由",
  "stage-unified-edit",
  "stage-recall-edit",
  "stage-strategy-edit",
  "stage-output-20",
  "reset-requirement",
  "show-classic-results",
  "simulate-search-change",
  "sync-search-change",
  "discard-search-change",
  "review-confirm",
  "confirm-fill",
  "skip-fill",
  "stop-curation",
  "confirm-append-target",
  "set-search-mode-natural",
  "set-search-mode-keyword",
  "confirm-drawer",
];

for (const text of requiredTexts) {
  assert.match(appJs, new RegExp(text), `missing demo copy: ${text}`);
}

const requiredDesignTokens = [
  "--action-primary",
  "--action-primary-hover",
  "--text-primary",
  "--text-secondary",
  "--text-tertiary",
  "--bg-page",
  "--bg-surface",
  "--bg-subtle",
  "--border-default",
  "--border-interactive",
  "--control-height-lg",
  "--radius-control-lg",
  "--radius-card-lg",
  "--layout-sidebar",
  "--layout-header",
  "--drawer-width",
];

for (const token of requiredDesignTokens) {
  assert.match(stylesCss, new RegExp(token), `missing design token: ${token}`);
}

assert.match(indexHtml, /app\.js/, "index should load app.js");
assert.match(stylesCss, /\.confirm-drawer/, "confirm drawer styles should exist");
assert.match(stylesCss, /\.classic-search-panel/, "classic search panel styles should exist");
assert.match(stylesCss, /\.classic-results-panel/, "classic result list styles should exist");
assert.doesNotMatch(stylesCss, /--kol-main|--kol-bg/, "old demo visual variables should not return");
assert.doesNotMatch(appJs, /当前候选总池|从 0 开始搜索|改 query 重搜|639 自然语言搜索|智能精选工作台|关键词模式沿用经典搜索框心智|自然语言仍属于标准搜索输入形态|继续调整召回条件|调整召回条件|预览召回结果 A/, "old main-path, explanatory UI copy, or fixed Agent workbench copy should not return");
assert.doesNotMatch(appJs, /待讨论占位|后续 TODO|本次精选输入/, "Agent curation page should be a result-review entity page, not a placeholder");
assert.doesNotMatch(appJs, /Requirement|Step 1 · Recall|Step 2 · Agent Input|Output Config/, "drawer should not expose internal process labels");
assert.doesNotMatch(appJs, /结果确认卡|当前整合需求|确认包|结果集 A|Agent 精选输入|筛选配置|召回范围|策略集合|进入 Agent 态|Agent 态搜索|标准召回条件|非标准精选策略|结果集 B|raw 结果|任务确认卡/, "confirmation-related copy should use user-facing language");
assert.doesNotMatch(appJs, /确认找号需求|你要找什么|找号需求|先筛候选频道|候选频道池|精选偏好|优先看|尽量避开|说明内容|重新填写|系统会分两部分处理|告诉 Agent 重点看什么|本次找号需求|本次精选会使用/, "confirmation-related copy should avoid overly casual wording");
assert.doesNotMatch(appJs, /apply-recall-results|更新结果/, "result set A should not expose a standalone update action");
assert.doesNotMatch(appJs, /策略结构化开关/, "strategy block should not expose a second strategy-like switch group");
assert.doesNotMatch(appJs, />确认补充</, "footer submit should be an icon button, not a text button");
assert.doesNotMatch(appJs + stylesCss, /mode-switch/, "search mode switch should be merged into the search input AI toggle");
assert.match(appJs, /searchMode: "natural"/, "demo should default to natural language mode for walkthrough convenience");
assert.doesNotMatch(appJs, /draftChangeBar|draftChanges|apply-draft-changes|discard-draft-changes|待应用修改|未应用修改|编辑缓冲区|应用修改并重新整合|丢弃修改/, "confirmation card edits should auto-apply after calculation");
assert.doesNotMatch(stylesCss, /\.raw-a-strip\s*\{\s*grid-template-columns:\s*1fr/s, "result set A strip should not collapse into a left-stacked single column");
assert.match(appJs, /const rest = conditions\.slice\(visibleCount\)/, "expanded recall conditions should only render the hidden condition set");
assert.match(appJs, /const hiddenConditions = conditions\.slice\(visibleCount\)/, "brief expanded conditions should only render hidden condition set");
