# Demo Screenshot Thumbnails Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Generate real screenshots for demos and expose them through `manifest.navigation.demos[].thumbnail` so demo cards render useful previews.

**Architecture:** Add a focused `scripts/lib/demo-screenshots.ts` helper that owns screenshot path calculation, staleness checks, and Playwright capture. `scripts/generate-manifest.ts` calls the helper while scanning demos and writes the resulting public path to manifest. Existing demo card rendering can keep consuming `thumbnail`.

**Tech Stack:** Node `node:test`, TypeScript/tsx, Playwright Chromium, Next static public paths.

---

### Task 1: Screenshot Helper Behavior

**Files:**
- Create: `scripts/lib/demo-screenshots.ts`
- Test: `scripts/demo-screenshots.test.ts`

- [ ] Write tests for public thumbnail path, stale detection, and skip behavior when screenshot is newer than demo files.
- [ ] Run `npx tsx --test scripts/demo-screenshots.test.ts` and confirm failure before implementation.
- [ ] Implement helper functions with injectable capture function for tests.
- [ ] Re-run test and confirm pass.

### Task 2: Manifest Integration

**Files:**
- Modify: `scripts/generate-manifest.ts`
- Modify: `package.json`

- [ ] Add Playwright as a dev dependency.
- [ ] Call screenshot helper from `scanDemos()` after `demo.json` exists.
- [ ] Preserve existing config thumbnail when explicitly provided; otherwise use generated screenshot path.
- [ ] Keep screenshot failures non-fatal with a warning.

### Task 3: Verification

**Files:**
- Generated: `public/demos/*/screenshot.png`
- Generated: `public/content/manifest.json`

- [ ] Run focused tests.
- [ ] Run `npm run generate-manifest` and confirm screenshots are created.
- [ ] Run `npm run build` to verify the static app consumes the manifest.
- [ ] Inspect git diff for generated screenshots and manifest thumbnail paths.
