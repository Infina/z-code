# PROJECT Z: GRAND ROADMAP (STRATEGIC DATALINK)

**Source of Truth:** Based on `past research/current/002/` Analysis.
**Objective:** Construct the **Bi-Modal Demiurge** (Theia + Rust + Sim2Real) for AGI Bootstrapping.

> "There is no Object. There is only Geometry and Flow." - The Axiom

## Phase 1: The Hardened Body & P0 Foundation (固本)
**Goal:** Establish the **Trinitarian Validation System** and the Physical Substrate (Node B).
*Focus: Backend, Rust, Evidence Chain, Physics.*

- [ ] **P0.1: Legacy Sanitation** (Entropy Reduction)
    - Move "Old Flesh" (VS Code Fork, previous research) to `legacy/`.
    - Establish Monorepo root structure (`apps/`, `libs/`, `rust_core/`).
- [ ] **P0.2: Trinitarian Evidence Chain** (Verifiable Truth)
    - Implement `qrlm_evidence_repair` (Merkle Tree Self-Healing).
    - Implement Atomic `fs2` Cross-Process Mutex logging (strict JSONL).
    - **KPI:** `p_valid` 24h p50 > 2 on local validation loop.
- [ ] **P0.3: UPE (Universal Physics Engine) Initialization**
    - Compile `francis_core` with `features = ["upe_multiverse", "superfluid"]`.
    - Deploy `qrlm_sched` Daemon (Headless Heartbeat) as a Theia Backend Extension (Headless).
    - Ensure Sim2Real cycle runs independently of UI connection.

## Phase 2: The Holographic Shell & Z-Link (成像)
**Goal:** Deploy the **Visual Projection Layer (VPL)** on Node A.
*Focus: Frontend, WebGPU, Protocol, Theia.*

- [ ] **P2.1: Z-Link Protocol Definition**
    - Define strict Schema (WIT/FlatBuffers) in `libs/z-protocol`.
    - Channels: `vpl.stream` (Arrow Flight/Binary) and `rpc.control` (JSON-RPC).
- [ ] **P2.2: Theia Shell Replacement**
    - Implement `HolographicShell` (Unbind default Shell, Rebind Custom).
    - Remove/Hide standard "Document-Centric" Widgets (File Explorer, Markers).
- [ ] **P2.3: WebGPU Rendering Kernel**
    - Initialize `wgpu` context in Theia Frontend.
    - Implement Compute Shaders for Force-Directed Layout (Million-Node Scale).
    - Bridge Rust `unified_field` physics state to Frontend via Zero-Copy `SharedArrayBuffer` (if local) or Arrow Flight (if remote).

## Phase 3: Self-Organization & Bootstrapping (进化)
**Goal:** Close the loop. The system modifies itself.
*Focus: Q-RLM, SOLC, WASM, Evolution.*

- [ ] **P3.1: Repo Map "Self-Knowledge"**
    - Port Aider's Map algo to Rust (`tree-sitter` + `petgraph` + `rayon`).
    - Implement Personalized PageRank (PPR) based on Chat Context focus.
- [ ] **P3.2: SOLC (Logic Crystallizer) Deployment**
    - Integrate `q_rlm` decision loop: `Text -> SOLC -> LogicGraph -> UPE -> Evidence`.
- [ ] **P3.3: WASM Hot-Swap**
    - Compile SOLC Logic strategies to WASM.
    - Implement "Hot-Evolution": Daemon reloads WASM strategy without restart.
