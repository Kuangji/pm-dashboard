# Unsupported File Placeholder Preview Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Render unsupported document files such as `.pen` as visible placeholder preview cards while keeping download behavior consistent with previewable files.

**Architecture:** Keep the existing manifest and document routing unchanged. Update the unsupported-file viewer to render a richer placeholder card and route downloads through the existing `/api/download/[...slug]` endpoint, with a small regression test around the component markup.

**Tech Stack:** Next.js App Router, React 19, TypeScript, `node:test`, `tsx`

---

### Task 1: Lock The Unsupported-File Viewer Behavior

**Files:**
- Create: `app/components/BinaryViewer.test.tsx`
- Modify: `app/components/BinaryViewer.tsx`

- [ ] **Step 1: Write the failing test**

Write a component-level regression test that renders `BinaryViewer` to static HTML and asserts:
- unsupported files show placeholder preview copy
- the file extension is surfaced
- the download link targets `/api/download/...`
- the legacy `/content/docs/...` URL is not used

- [ ] **Step 2: Run test to verify it fails**

Run: `npx tsx --test app/components/BinaryViewer.test.tsx`
Expected: FAIL because the current component renders a button-only binary state and still points at `/content/docs/...`

- [ ] **Step 3: Implement the minimal viewer change**

Update `BinaryViewer` to:
- accept the file extension
- render a placeholder-card style preview state
- expose a direct download anchor using `/api/download/${encodedSlug}`

- [ ] **Step 4: Re-run the test**

Run: `npx tsx --test app/components/BinaryViewer.test.tsx`
Expected: PASS

### Task 2: Thread The New Metadata Through The Viewer Boundary

**Files:**
- Modify: `app/components/DocumentViewer.tsx`

- [ ] **Step 1: Pass the document extension into `BinaryViewer`**

- [ ] **Step 2: Verify the binary document route still compiles cleanly**

Run: `npm run lint`
Expected: PASS

### Task 3: Final Verification

**Files:**
- Review only

- [ ] **Step 1: Run focused regression test**

Run: `npx tsx --test app/components/BinaryViewer.test.tsx`
Expected: PASS

- [ ] **Step 2: Run repository lint**

Run: `npm run lint`
Expected: PASS

- [ ] **Step 3: Run production build**

Run: `npm run build`
Expected: PASS
