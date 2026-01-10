import { injectable } from '@theia/core/shared/inversify';

// We import the Rust module using require because it's a native module.
// In a production environment, we'd handle the path more robustly.
const rustCore = require('../../../../rust_core/index.js');

/**
 * The Backend Service for Francis IDE.
 * It bridges the Node.js backend with the Rust High-Performance Substrate.
 */
@injectable()
export class FrancisIdeBackendService {
    
    /**
     * Get the current status of the Rust substrate.
     */
    async getStatus(): Promise<string> {
        try {
            return rustCore.getSubstrateStatus();
        } catch (error) {
            console.error('Failed to communicate with Rust Substrate:', error);
            return 'Substrate Offline: Communication Error.';
        }
    }

    /**
     * Synchronize entropy values with the Rust engine.
     */
    async syncEntropy(value: number): Promise<number> {
        return rustCore.syncUnifiedField(value);
    }
}
