"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HolographicShell = void 0;
const inversify_1 = require("@theia/core/shared/inversify");
const application_shell_1 = require("@theia/core/lib/browser/shell/application-shell");
/**
 * The HolographicShell replaces the default Theia ApplicationShell.
 * It serves as the visual substrate for Project Z's immersive interface.
 *
 * Future iterations will implement a non-document-centric layout,
 * utilizing WebGPU for the Visual Projection Layer (VPL).
 */
let HolographicShell = class HolographicShell extends application_shell_1.ApplicationShell {
    /**
     * Assemble the application shell layout.
     * We override this to provide the entry point for Project Z's custom layout geometry.
     */
    createLayout() {
        const layout = super.createLayout();
        console.log('Holographic Shell: Geometry Flow established.');
        return layout;
    }
    /**
     * Placeholder for future Z-Link protocol integration.
     */
    initializeZLink() {
        // TODO: Implement Arrow Flight / JSON-RPC bridge initialization
    }
};
exports.HolographicShell = HolographicShell;
exports.HolographicShell = HolographicShell = __decorate([
    (0, inversify_1.injectable)()
], HolographicShell);
//# sourceMappingURL=holographic-shell.js.map