# PROJECT Z: TACTICAL EXECUTION PLAN

**Role:** The Executive Thread.
**Context:** [ROADMAP.md](./ROADMAP.md) (The Strategic View)
**Current Phase:** Phase 1.1 - The Vessel Initialization (Foundation)
**Status:** IN_PROGRESS

> "First, we build the Temple (Container). Then, we summon the God (Logic)."

## IMMEDIATE MISSION: Constructing the Holographic Shell

**Compliance Check:** Aligning with *Eclipse Theia 深度研究方案.md* (Section 8) and *Project Mode & Cloud Arch.md* (Section 2.3).

### Step 1: Sanitation (Zero Point)
- [x] **Action:** Sanitize `z-code` directory (Move existing loose files to `legacy/pre-monorepo`).
- [x] **Action:** Initialize **Git** (Version Control is non-negotiable for Evidence Chain).

### Step 2: The Monorepo Chassis (Nx)
- [x] **Action:** Initialize `pnpm` workspace.
- [x] **Action:** Install **Nx** (`npm add -D nx`).
- [x] **Action:** Configure `nx.json` for **Hybrid Rust-TypeScript Governance** (as per *Cloud Arch* Doc).

### Step 3: The Holographic Body (Eclipse Theia)
- [x] **Action:** Create directory `apps/francis-ide` (Refactored to `apps/francis-ide-browser` & `apps/francis-ide-electron`).
- [x] **Action:** Use `generator-theia-extension` to initialize the project (`libs/francis-ide-extension`).
- [ ] **Action:** **[NEXT]** Define `HolographicShell` Layout:
    - Create `libs/francis-ide-extension/src/browser/holographic-layout.ts`.
    - Implement `ApplicationShell` replacement strategy (bind to `ApplicationShell` symbol).
    - Remove standard `ApplicationShell` (Shell Rebinding).
    - *Reference:* *Eclipse Theia Deep Dive, Section 3.2*.

### Step 4: The Brain Transplant Preparation (Substrate)
- [x] **Action:** Create directory `rust_core/`.
- [ ] **Action:** Initialize `libs/z-protocol`:
    - Define Schema: `UnifiedField` state structure.
    - Set up `build.rs` for generating TS definitions from Rust structs (or use `napi-rs`).
- [ ] **Action:** (Pending) Import verified modules from `../Francis_bot/rust_core` later.

---
*Run `update_todo_list` to track progress against this file.*
