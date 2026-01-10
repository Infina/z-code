# PROJECT Z: TACTICAL EXECUTION PLAN

**Role:** The Executive Thread.
**Context:** [ROADMAP.md](./ROADMAP.md) (The Strategic View)
**Current Phase:** Phase 1.1 - The Vessel Initialization (Foundation)
**Status:** IN_PROGRESS

> "First, we build the Temple (Container). Then, we summon the God (Logic)."

## IMMEDIATE MISSION: Constructing the Holographic Shell

**Compliance Check:** Aligning with *Eclipse Theia 深度研究方案.md* (Section 8) and *Project Mode & Cloud Arch.md* (Section 2.3).

### Step 1: Sanitation (Zero Point)
- [ ] **Action:** Sanitize `z-code` directory (Move existing loose files to `legacy/pre-monorepo`).
- [ ] **Action:** Initialize **Git** (Version Control is non-negotiable for Evidence Chain).

### Step 2: The Monorepo Chassis (Nx)
- [ ] **Action:** Initialize `pnpm` workspace.
- [ ] **Action:** Install **Nx** (`npm add -D nx`).
- [ ] **Action:** Configure `nx.json` for **Hybrid Rust-TypeScript Governance** (as per *Cloud Arch* Doc).

### Step 3: The Holographic Body (Eclipse Theia)
- [ ] **Action:** Create directory `apps/francis-ide`.
- [ ] **Action:** Use `generator-theia-extension` to initialize the project.
- [ ] **Action:** Prepare for **Shell Replacement**: Define `HolographicShell` structure to eventually Rebind `ApplicationShell` (via InversifyJS).
    - *Reference:* *Eclipse Theia Deep Dive, Section 3.2*.

### Step 4: The Brain Transplant Preparation
- [ ] **Action:** Create directory `rust_core/`.
- [ ] **Action:** Prepare `libs/z-protocol` for **NAPI-RS** bindings (Zero-Copy Bridge).
- [ ] **Action:** (Pending) Import verified modules from `../Francis_bot/rust_core` later.

---
*Run `update_todo_list` to track progress against this file.*
