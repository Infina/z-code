/**
 * The Backend Service for Francis IDE.
 * It bridges the Node.js backend with the Rust High-Performance Substrate.
 */
export declare class FrancisIdeBackendService {
    /**
     * Get the current status of the Rust substrate.
     */
    getStatus(): Promise<string>;
    /**
     * Synchronize entropy values with the Rust engine.
     */
    syncEntropy(value: number): Promise<number>;
}
//# sourceMappingURL=francis-ide-backend-service.d.ts.map