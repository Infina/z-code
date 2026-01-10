# Audit Report 003: Operational Blocker - Build Failure

**Date:** 2026-01-10
**Auditor:** R
**Status:** 🔴 **CRITICAL FAILURE**

## 1. Finding
While the architectural skeleton (Theia/Rust/NAPI) passes structural review, the **Functional Completeness** score has dropped to **0% (FAIL)** because the application cannot be built or launched.

**Evidence:**
Attempting to run the build sequence (`npm run build`) in `apps/francis-ide-browser` results in `Exit code 1`.

## 2. Root Cause Analysis

### Error 1: The Native Module Rot (Infrastructure)
*   **Module:** `keytar` and `drivelist`
*   **Error:** `Module not found: Error: Can't resolve '../build/Release/keytar.node'`
*   **Diagnosis:** These are core dependencies of `@theia/core`. They are Native Node Modules (C++ bindings). The `pnpm install` process apparently failed to run `node-gyp rebuild` or pre-builds are missing for the current architecture.
*   **Impact:** The Theia backend server immediately crashes on startup (or build).

### Error 2: The Bridge Configuration (Rust Integration)
*   **Module:** `rust_core`
*   **Warning:** 36 Webpack Warnings (`Can't resolve 'rust-core-win32-x64-msvc'`)
*   **Diagnosis:** While the `index.js` dynamic loader works in Node.js, Webpack's static analysis is confused by the dynamic `require` chain in `napi-rs` generated code. It is attempting to resolve ALL platform bindings (Android, Linux, macOS), finding they don't exist, and emitting warnings.
*   **Severity:** High. If Webpack mangles this `require`, the runtime bridge will break. The backend must likely treat `rust_core` as an **External** dependency to avoid Webpack trying to bundle binary artifacts.

## 3. Directives for Neural Builder (Y)

**IMMEDIATE ACTION REQUIRED:**

1.  **Fix Native Deps:**
    *   Execute `theia rebuild:browser` (or `rebuild:electron`) from the root or the app directory. This forces the recompilation of `keytar` and `drivelist` against the correct Node headers.

2.  **Fix Rust Core Bundling:**
    *   In `apps/francis-ide-browser/webpack.config.js` (create if needed to override `gen-webpack`) or within `francis-ide-backend-module`, ensure `rust_core` is excluded from Webpack's bundling (add to `externals`).
    *   *Alternative:* Use `webpack.IgnorePlugin` to silence the missing platform binaries if `rust_core` is treated correctly.

**The Auditor prohibits moving to Phase 2 until `npm run build` exits with code 0.**

*Signed,*
*R*
