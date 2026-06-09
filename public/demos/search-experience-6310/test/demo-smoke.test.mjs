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
  "href=\"#curation\"",
  "nav-search",
  "nav-curation",
  "nav-placeholder",
  "当前 Demo 只展开网红发现和智能精选链路",
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
  "对当前结果做智能精选",
  "nl-run-search",
  "开始 Agent 精选",
  "精选策略说明",
  "修改精选策略",
  "apply-strategy-text",
  "cancel-strategy-text",
  "strategy-draft",
  "strategyText",
  "精选策略",
  "已整理",
  "候选频道",
  "输出设置",
  "精选数量",
  "output-size",
  "范围 1 - 200",
  "正在更新",
  "confirm-loading-card",
  "aria-busy",
  "更新中",
  "已更新精选策略",
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
  "当前候选频道无法达到目标名单量",
  "target-limit-note",
  "候选频道可能筛不满",
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
  "toggle-strategy-chip",
  "simulate-search-change",
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
assert.doesNotMatch(appJs, /基底选择器|toggle-base|state\.round|round: 1|轮次结果/, "current result-review mainline should not expose legacy round/base-selector concepts");
assert.doesNotMatch(appJs, /<div class="composer-text">/, "natural language composer should be editable in the demo");
assert.doesNotMatch(appJs, /<span>已保存<\/span>|state\.accepted|accepted:/, "agent status panel should not treat save-to-folder as an in-session KPI");
assert.doesNotMatch(appJs, /已保存本次需求|已保存当前候选频道|已按新条件保存候选频道/, "confirmation and curation copy should not use save wording before save-to-folder");
assert.doesNotMatch(appJs, /Requirement|Step 1 · Recall|Step 2 · Agent Input|Output Config/, "drawer should not expose internal process labels");
assert.doesNotMatch(appJs, /结果确认卡|当前整合需求|确认包|结果集 A|Agent 精选输入|筛选配置|召回范围|策略集合|进入 Agent 态|Agent 态搜索|标准召回条件|非标准精选策略|结果集 B|raw 结果|任务确认卡/, "confirmation-related copy should use user-facing language");
assert.doesNotMatch(appJs, /确认找号需求|你要找什么|找号需求|先筛候选频道|候选频道池|精选偏好|优先看|尽量避开|说明内容|重新填写|系统会分两部分处理|告诉 Agent 重点看什么|本次找号需求|本次精选会使用/, "confirmation-related copy should avoid overly casual wording");
assert.doesNotMatch(appJs, /apply-recall-results|更新结果|查看候选频道|返回需求确认|同步到本次需求|忽略本次调整|同步并开始精选|忽略变化并开始精选|开始精选前，先处理搜索条件变化/, "strategy drawer should not expose recall preview or sync actions");
assert.doesNotMatch(appJs, /策略结构化开关/, "strategy block should not expose a second strategy-like switch group");
assert.doesNotMatch(appJs, />确认补充</, "footer submit should be an icon button, not a text button");
assert.doesNotMatch(appJs + stylesCss, /mode-switch/, "search mode switch should be merged into the search input AI toggle");
assert.match(appJs, /searchMode: "natural"/, "demo should default to natural language mode for walkthrough convenience");
assert.doesNotMatch(appJs, /candidatePreviewFromConfirm|nav-confirm|href="#confirm"|syncStatus|pendingAgent|recallAdjusted/, "old confirmation-flow state should not remain");
assert.match(appJs, /shouldShowCurationBridge = true/, "classic-result curation bridge should appear for both keyword and natural-language results");
assert.match(appJs, /data-action="nl-run-search"/, "natural language search button should run search instead of opening the drawer");
assert.doesNotMatch(appJs, /data-action="nl-open-confirm"|shouldShowReturnToConfirm|confirmLayout|set-confirm-layout|confirm-structure-panel|confirm-brief-hero|recallConditionsCard|rawResultSetPreview|conditionSummary|stage-recall-edit|stage-unified-edit|stage-output-20|stage-output-50/, "drawer should not retain old confirmation, preview, or segmented output flows");
assert.doesNotMatch(appJs, /draftChangeBar|draftChanges|apply-draft-changes|discard-draft-changes|待应用修改|未应用修改|编辑缓冲区|应用修改并重新整合|丢弃修改/, "confirmation card edits should auto-apply after calculation");
assert.doesNotMatch(appJs, /<a class="side-item is-child[^>]+nav-confirm/, "strategy drawer should not be a sidebar navigation page");
assert.match(appJs, /type="number"[\s\S]*data-field="output-size"/, "output size should be a free numeric input with bounds");
