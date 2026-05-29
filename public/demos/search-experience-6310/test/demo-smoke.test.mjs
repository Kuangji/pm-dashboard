import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const appJs = fs.readFileSync(path.join(dirname, "..", "app.js"), "utf8");
const indexHtml = fs.readFileSync(path.join(dirname, "..", "index.html"), "utf8");

const requiredTexts = [
  "生成确认卡",
  "确认抽屉",
  "自然语言直达智能精选",
  "Agent 任务确认",
  "轻确认：基于当前结果",
  "完整确认：重新召回后精选",
  "召回条件",
  "精选策略",
  "输出目标",
  "先看搜索结果",
  "直接智能精选",
  "调整召回条件",
  "重新召回后精选",
  "confirm-drawer",
];

for (const text of requiredTexts) {
  assert.match(appJs, new RegExp(text), `missing demo copy: ${text}`);
}

assert.match(indexHtml, /app\.js/, "index should load app.js");
assert.doesNotMatch(appJs, /下一批|当前候选总池|从 0 开始搜索|改 query 重搜/, "old main-path copy should not return");
