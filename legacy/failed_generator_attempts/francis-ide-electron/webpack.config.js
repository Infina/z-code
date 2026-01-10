/**
 * This file can be edited to customize webpack configuration.
 * To reset delete this file and rerun theia build again.
 */
// @ts-check
const configs = require('./gen-webpack.config.js');
const nodeConfig = require('./gen-webpack.node.config.js');

// Customize node configuration to handle native modules and Rust core correctly
const backendConfig = nodeConfig.config;

// We mark rust_core as external to prevent webpack from trying to bundle 
// its platform-specific dynamic requires, which causes build warnings and runtime errors.
backendConfig.externals = [
    ...(Array.isArray(backendConfig.externals) ? backendConfig.externals : []),
    'rust_core',
    'keytar',
    'drivelist'
];

module.exports = [
    ...configs,
    backendConfig
];
