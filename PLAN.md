# PROJECT Z: TACTICAL EXECUTION PLAN (V3: HYBRID SHELL - WSL2)

**Role:** The Executive Thread.
**Context:** [ROADMAP.md](./ROADMAP.md)
**Status:** **MIGRATION PENDING**
**Hardware Context:** RTX 4090 (Local). Cloud Rental = ABORTED.

> "The Body stays on Windows (GPU). The Soul moves to Linux (WSL). The Ghost runs in the Shell."

## STRATEGIC PIVOT: OPERATION HYBRID SHELL

We encountered a "Windows Native Toolchain Block" (MSBuild failures).
Instead of renting a cloud server (high cost, high latency), we adopt **WSL2** to combine Linux build stability with local 4090 acceleration.

### Step 1: Environmental Migration (User Action)
- [ ] **Action:** Enable WSL2 on Windows 11 (`wsl --install`).
- [ ] **Action:** Install Ubuntu 22.04 LTS.
- [ ] **Action:** Move Codebase.
    - **Do NOT** mount `C:\Users\...` in Linux.
    - **Clone** the repo into `~/project-z` (Linux filesystem) for IO performance.
- [ ] **Action:** VS Code Remote.
    - Open the `~/project-z` folder in VS Code using "WSL" remote.

### Step 2: Linux Bootstrap (Once inside WSL)
- [ ] **Action:** Install Toolchain.
    - `sudo apt-get install build-essential python3 pkg-config libx11-dev libxkbfile-dev libsecret-1-dev`
- [ ] **Action:** Verify Fork Build.
    - Navigate to `platform/theia-fork`.
    - Run `yarn` (or `npm install` now that we have Linux tools).
    - `npm run compile`.

### Step 3: The Holographic Light-Up
- [ ] **Action:** Launch Backend in WSL.
    - `npm run start` (examples/browser).
- [ ] **Action:** Connect Frontend (Windows Chrome).
    - `http://localhost:3000`.
    - Verify: "PROJECT Z : FORK SUBSTRATE ACTIVE" (The injected signal).

### Step 4: The Physics Ignition (Phase 1.2)
- [ ] **Action:** Wire `rust_core` to `node-pty` / Backend logic in the verified environment.

---
*Run `update_todo_list` to track progress.*
