"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FrancisIdeBackendService = void 0;
const inversify_1 = require("@theia/core/shared/inversify");
// We import the Rust module using require because it's a native module.
// In a production environment, we'd handle the path more robustly.
const rustCore = require('../../../../rust_core/index.js');
/**
 * The Backend Service for Francis IDE.
 * It bridges the Node.js backend with the Rust High-Performance Substrate.
 */
let FrancisIdeBackendService = class FrancisIdeBackendService {
    /**
     * Get the current status of the Rust substrate.
     */
    async getStatus() {
        try {
            return rustCore.getSubstrateStatus();
        }
        catch (error) {
            console.error('Failed to communicate with Rust Substrate:', error);
            return 'Substrate Offline: Communication Error.';
        }
    }
    /**
     * Synchronize entropy values with the Rust engine.
     */
    async syncEntropy(value) {
        return rustCore.syncUnifiedField(value);
    }
};
exports.FrancisIdeBackendService = FrancisIdeBackendService;
exports.FrancisIdeBackendService = FrancisIdeBackendService = __decorate([
    (0, inversify_1.injectable)()
], FrancisIdeBackendService);
//# sourceMappingURL=francis-ide-backend-service.js.map