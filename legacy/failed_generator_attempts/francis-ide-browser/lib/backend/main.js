/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "../../libs/francis-ide-extension/lib/node/francis-ide-backend-module.js"
/*!*******************************************************************************!*\
  !*** ../../libs/francis-ide-extension/lib/node/francis-ide-backend-module.js ***!
  \*******************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const inversify_1 = __webpack_require__(/*! @theia/core/shared/inversify */ "../../node_modules/.pnpm/@theia+core@1.67.0_@theia+electron@1.67.0_electron@38.4.0_/node_modules/@theia/core/shared/inversify/index.js");
const francis_ide_backend_service_1 = __webpack_require__(/*! ./francis-ide-backend-service */ "../../libs/francis-ide-extension/lib/node/francis-ide-backend-service.js");
exports["default"] = new inversify_1.ContainerModule(bind => {
    bind(francis_ide_backend_service_1.FrancisIdeBackendService).toSelf().inSingletonScope();
});


/***/ },

/***/ "../../libs/francis-ide-extension/lib/node/francis-ide-backend-service.js"
/*!********************************************************************************!*\
  !*** ../../libs/francis-ide-extension/lib/node/francis-ide-backend-service.js ***!
  \********************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FrancisIdeBackendService = void 0;
const inversify_1 = __webpack_require__(/*! @theia/core/shared/inversify */ "../../node_modules/.pnpm/@theia+core@1.67.0_@theia+electron@1.67.0_electron@38.4.0_/node_modules/@theia/core/shared/inversify/index.js");
// We import the Rust module using require because it's a native module.
// In a production environment, we'd handle the path more robustly.
const rustCore = __webpack_require__(/*! ../../../../rust_core/index.js */ "../../rust_core/index.js");
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


/***/ },

/***/ "../../node_modules/.pnpm/@parcel+watcher@2.5.1/node_modules/@parcel/watcher sync recursive"
/*!*****************************************************************************************!*\
  !*** ../../node_modules/.pnpm/@parcel+watcher@2.5.1/node_modules/@parcel/watcher/ sync ***!
  \*****************************************************************************************/
(module) {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = () => ([]);
webpackEmptyContext.resolve = webpackEmptyContext;
webpackEmptyContext.id = "../../node_modules/.pnpm/@parcel+watcher@2.5.1/node_modules/@parcel/watcher sync recursive";
module.exports = webpackEmptyContext;

/***/ },

/***/ "../../node_modules/.pnpm/@stroncium+procfs@1.2.1/node_modules/@stroncium/procfs/lib/parsers sync recursive ^\\.\\/.*$"
/*!******************************************************************************************************************!*\
  !*** ../../node_modules/.pnpm/@stroncium+procfs@1.2.1/node_modules/@stroncium/procfs/lib/parsers/ sync ^\.\/.*$ ***!
  \******************************************************************************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var map = {
	"./cgroups": "../../node_modules/.pnpm/@stroncium+procfs@1.2.1/node_modules/@stroncium/procfs/lib/parsers/cgroups.js",
	"./cgroups.js": "../../node_modules/.pnpm/@stroncium+procfs@1.2.1/node_modules/@stroncium/procfs/lib/parsers/cgroups.js",
	"./config": "../../node_modules/.pnpm/@stroncium+procfs@1.2.1/node_modules/@stroncium/procfs/lib/parsers/config.js",
	"./config.js": "../../node_modules/.pnpm/@stroncium+procfs@1.2.1/node_modules/@stroncium/procfs/lib/parsers/config.js",
	"./cpuinfo": "../../node_modules/.pnpm/@stroncium+procfs@1.2.1/node_modules/@stroncium/procfs/lib/parsers/cpuinfo.js",
	"./cpuinfo.js": "../../node_modules/.pnpm/@stroncium+procfs@1.2.1/node_modules/@stroncium/procfs/lib/parsers/cpuinfo.js",
	"./devices": "../../node_modules/.pnpm/@stroncium+procfs@1.2.1/node_modules/@stroncium/procfs/lib/parsers/devices.js",
	"./devices.js": "../../node_modules/.pnpm/@stroncium+procfs@1.2.1/node_modules/@stroncium/procfs/lib/parsers/devices.js",
	"./diskstats": "../../node_modules/.pnpm/@stroncium+procfs@1.2.1/node_modules/@stroncium/procfs/lib/parsers/diskstats.js",
	"./diskstats.js": "../../node_modules/.pnpm/@stroncium+procfs@1.2.1/node_modules/@stroncium/procfs/lib/parsers/diskstats.js",
	"./filesystems": "../../node_modules/.pnpm/@stroncium+procfs@1.2.1/node_modules/@stroncium/procfs/lib/parsers/filesystems.js",
	"./filesystems.js": "../../node_modules/.pnpm/@stroncium+procfs@1.2.1/node_modules/@stroncium/procfs/lib/parsers/filesystems.js",
	"./loadavg": "../../node_modules/.pnpm/@stroncium+procfs@1.2.1/node_modules/@stroncium/procfs/lib/parsers/loadavg.js",
	"./loadavg.js": "../../node_modules/.pnpm/@stroncium+procfs@1.2.1/node_modules/@stroncium/procfs/lib/parsers/loadavg.js",
	"./meminfo": "../../node_modules/.pnpm/@stroncium+procfs@1.2.1/node_modules/@stroncium/procfs/lib/parsers/meminfo.js",
	"./meminfo.js": "../../node_modules/.pnpm/@stroncium+procfs@1.2.1/node_modules/@stroncium/procfs/lib/parsers/meminfo.js",
	"./partitions": "../../node_modules/.pnpm/@stroncium+procfs@1.2.1/node_modules/@stroncium/procfs/lib/parsers/partitions.js",
	"./partitions.js": "../../node_modules/.pnpm/@stroncium+procfs@1.2.1/node_modules/@stroncium/procfs/lib/parsers/partitions.js",
	"./processAutogroup": "../../node_modules/.pnpm/@stroncium+procfs@1.2.1/node_modules/@stroncium/procfs/lib/parsers/processAutogroup.js",
	"./processAutogroup.js": "../../node_modules/.pnpm/@stroncium+procfs@1.2.1/node_modules/@stroncium/procfs/lib/parsers/processAutogroup.js",
	"./processCgroups": "../../node_modules/.pnpm/@stroncium+procfs@1.2.1/node_modules/@stroncium/procfs/lib/parsers/processCgroups.js",
	"./processCgroups.js": "../../node_modules/.pnpm/@stroncium+procfs@1.2.1/node_modules/@stroncium/procfs/lib/parsers/processCgroups.js",
	"./processCmdline": "../../node_modules/.pnpm/@stroncium+procfs@1.2.1/node_modules/@stroncium/procfs/lib/parsers/processCmdline.js",
	"./processCmdline.js": "../../node_modules/.pnpm/@stroncium+procfs@1.2.1/node_modules/@stroncium/procfs/lib/parsers/processCmdline.js",
	"./processEnviron": "../../node_modules/.pnpm/@stroncium+procfs@1.2.1/node_modules/@stroncium/procfs/lib/parsers/processEnviron.js",
	"./processEnviron.js": "../../node_modules/.pnpm/@stroncium+procfs@1.2.1/node_modules/@stroncium/procfs/lib/parsers/processEnviron.js",
	"./processExe": "../../node_modules/.pnpm/@stroncium+procfs@1.2.1/node_modules/@stroncium/procfs/lib/parsers/processExe.js",
	"./processExe.js": "../../node_modules/.pnpm/@stroncium+procfs@1.2.1/node_modules/@stroncium/procfs/lib/parsers/processExe.js",
	"./processFd": "../../node_modules/.pnpm/@stroncium+procfs@1.2.1/node_modules/@stroncium/procfs/lib/parsers/processFd.js",
	"./processFd.js": "../../node_modules/.pnpm/@stroncium+procfs@1.2.1/node_modules/@stroncium/procfs/lib/parsers/processFd.js",
	"./processFdinfo": "../../node_modules/.pnpm/@stroncium+procfs@1.2.1/node_modules/@stroncium/procfs/lib/parsers/processFdinfo.js",
	"./processFdinfo.js": "../../node_modules/.pnpm/@stroncium+procfs@1.2.1/node_modules/@stroncium/procfs/lib/parsers/processFdinfo.js",
	"./processFds": "../../node_modules/.pnpm/@stroncium+procfs@1.2.1/node_modules/@stroncium/procfs/lib/parsers/processFds.js",
	"./processFds.js": "../../node_modules/.pnpm/@stroncium+procfs@1.2.1/node_modules/@stroncium/procfs/lib/parsers/processFds.js",
	"./processGidMap": "../../node_modules/.pnpm/@stroncium+procfs@1.2.1/node_modules/@stroncium/procfs/lib/parsers/processGidMap.js",
	"./processGidMap.js": "../../node_modules/.pnpm/@stroncium+procfs@1.2.1/node_modules/@stroncium/procfs/lib/parsers/processGidMap.js",
	"./processIo": "../../node_modules/.pnpm/@stroncium+procfs@1.2.1/node_modules/@stroncium/procfs/lib/parsers/processIo.js",
	"./processIo.js": "../../node_modules/.pnpm/@stroncium+procfs@1.2.1/node_modules/@stroncium/procfs/lib/parsers/processIo.js",
	"./processLimits": "../../node_modules/.pnpm/@stroncium+procfs@1.2.1/node_modules/@stroncium/procfs/lib/parsers/processLimits.js",
	"./processLimits.js": "../../node_modules/.pnpm/@stroncium+procfs@1.2.1/node_modules/@stroncium/procfs/lib/parsers/processLimits.js",
	"./processMountinfo": "../../node_modules/.pnpm/@stroncium+procfs@1.2.1/node_modules/@stroncium/procfs/lib/parsers/processMountinfo.js",
	"./processMountinfo.js": "../../node_modules/.pnpm/@stroncium+procfs@1.2.1/node_modules/@stroncium/procfs/lib/parsers/processMountinfo.js",
	"./processNetDev": "../../node_modules/.pnpm/@stroncium+procfs@1.2.1/node_modules/@stroncium/procfs/lib/parsers/processNetDev.js",
	"./processNetDev.js": "../../node_modules/.pnpm/@stroncium+procfs@1.2.1/node_modules/@stroncium/procfs/lib/parsers/processNetDev.js",
	"./processNetTcp4": "../../node_modules/.pnpm/@stroncium+procfs@1.2.1/node_modules/@stroncium/procfs/lib/parsers/processNetTcp4.js",
	"./processNetTcp4.js": "../../node_modules/.pnpm/@stroncium+procfs@1.2.1/node_modules/@stroncium/procfs/lib/parsers/processNetTcp4.js",
	"./processNetTcp6": "../../node_modules/.pnpm/@stroncium+procfs@1.2.1/node_modules/@stroncium/procfs/lib/parsers/processNetTcp6.js",
	"./processNetTcp6.js": "../../node_modules/.pnpm/@stroncium+procfs@1.2.1/node_modules/@stroncium/procfs/lib/parsers/processNetTcp6.js",
	"./processNetUdp4": "../../node_modules/.pnpm/@stroncium+procfs@1.2.1/node_modules/@stroncium/procfs/lib/parsers/processNetUdp4.js",
	"./processNetUdp4.js": "../../node_modules/.pnpm/@stroncium+procfs@1.2.1/node_modules/@stroncium/procfs/lib/parsers/processNetUdp4.js",
	"./processNetUdp6": "../../node_modules/.pnpm/@stroncium+procfs@1.2.1/node_modules/@stroncium/procfs/lib/parsers/processNetUdp6.js",
	"./processNetUdp6.js": "../../node_modules/.pnpm/@stroncium+procfs@1.2.1/node_modules/@stroncium/procfs/lib/parsers/processNetUdp6.js",
	"./processNetUnix": "../../node_modules/.pnpm/@stroncium+procfs@1.2.1/node_modules/@stroncium/procfs/lib/parsers/processNetUnix.js",
	"./processNetUnix.js": "../../node_modules/.pnpm/@stroncium+procfs@1.2.1/node_modules/@stroncium/procfs/lib/parsers/processNetUnix.js",
	"./processNetWireless": "../../node_modules/.pnpm/@stroncium+procfs@1.2.1/node_modules/@stroncium/procfs/lib/parsers/processNetWireless.js",
	"./processNetWireless.js": "../../node_modules/.pnpm/@stroncium+procfs@1.2.1/node_modules/@stroncium/procfs/lib/parsers/processNetWireless.js",
	"./processStat": "../../node_modules/.pnpm/@stroncium+procfs@1.2.1/node_modules/@stroncium/procfs/lib/parsers/processStat.js",
	"./processStat.js": "../../node_modules/.pnpm/@stroncium+procfs@1.2.1/node_modules/@stroncium/procfs/lib/parsers/processStat.js",
	"./processStatm": "../../node_modules/.pnpm/@stroncium+procfs@1.2.1/node_modules/@stroncium/procfs/lib/parsers/processStatm.js",
	"./processStatm.js": "../../node_modules/.pnpm/@stroncium+procfs@1.2.1/node_modules/@stroncium/procfs/lib/parsers/processStatm.js",
	"./processStatus": "../../node_modules/.pnpm/@stroncium+procfs@1.2.1/node_modules/@stroncium/procfs/lib/parsers/processStatus.js",
	"./processStatus.js": "../../node_modules/.pnpm/@stroncium+procfs@1.2.1/node_modules/@stroncium/procfs/lib/parsers/processStatus.js",
	"./processThreads": "../../node_modules/.pnpm/@stroncium+procfs@1.2.1/node_modules/@stroncium/procfs/lib/parsers/processThreads.js",
	"./processThreads.js": "../../node_modules/.pnpm/@stroncium+procfs@1.2.1/node_modules/@stroncium/procfs/lib/parsers/processThreads.js",
	"./processUidMap": "../../node_modules/.pnpm/@stroncium+procfs@1.2.1/node_modules/@stroncium/procfs/lib/parsers/processUidMap.js",
	"./processUidMap.js": "../../node_modules/.pnpm/@stroncium+procfs@1.2.1/node_modules/@stroncium/procfs/lib/parsers/processUidMap.js",
	"./processes": "../../node_modules/.pnpm/@stroncium+procfs@1.2.1/node_modules/@stroncium/procfs/lib/parsers/processes.js",
	"./processes.js": "../../node_modules/.pnpm/@stroncium+procfs@1.2.1/node_modules/@stroncium/procfs/lib/parsers/processes.js",
	"./stat": "../../node_modules/.pnpm/@stroncium+procfs@1.2.1/node_modules/@stroncium/procfs/lib/parsers/stat.js",
	"./stat.js": "../../node_modules/.pnpm/@stroncium+procfs@1.2.1/node_modules/@stroncium/procfs/lib/parsers/stat.js",
	"./swaps": "../../node_modules/.pnpm/@stroncium+procfs@1.2.1/node_modules/@stroncium/procfs/lib/parsers/swaps.js",
	"./swaps.js": "../../node_modules/.pnpm/@stroncium+procfs@1.2.1/node_modules/@stroncium/procfs/lib/parsers/swaps.js",
	"./uptime": "../../node_modules/.pnpm/@stroncium+procfs@1.2.1/node_modules/@stroncium/procfs/lib/parsers/uptime.js",
	"./uptime.js": "../../node_modules/.pnpm/@stroncium+procfs@1.2.1/node_modules/@stroncium/procfs/lib/parsers/uptime.js",
	"./utils": "../../node_modules/.pnpm/@stroncium+procfs@1.2.1/node_modules/@stroncium/procfs/lib/parsers/utils.js",
	"./utils.js": "../../node_modules/.pnpm/@stroncium+procfs@1.2.1/node_modules/@stroncium/procfs/lib/parsers/utils.js"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "../../node_modules/.pnpm/@stroncium+procfs@1.2.1/node_modules/@stroncium/procfs/lib/parsers sync recursive ^\\.\\/.*$";

/***/ },

/***/ "../../node_modules/.pnpm/express@4.22.1/node_modules/express/lib sync recursive"
/*!******************************************************************************!*\
  !*** ../../node_modules/.pnpm/express@4.22.1/node_modules/express/lib/ sync ***!
  \******************************************************************************/
(module) {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = () => ([]);
webpackEmptyContext.resolve = webpackEmptyContext;
webpackEmptyContext.id = "../../node_modules/.pnpm/express@4.22.1/node_modules/express/lib sync recursive";
module.exports = webpackEmptyContext;

/***/ },

/***/ "../../node_modules/.pnpm/require-main-filename@2.0.0/node_modules/require-main-filename sync recursive"
/*!*****************************************************************************************************!*\
  !*** ../../node_modules/.pnpm/require-main-filename@2.0.0/node_modules/require-main-filename/ sync ***!
  \*****************************************************************************************************/
(module) {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = () => ([]);
webpackEmptyContext.resolve = webpackEmptyContext;
webpackEmptyContext.id = "../../node_modules/.pnpm/require-main-filename@2.0.0/node_modules/require-main-filename sync recursive";
module.exports = webpackEmptyContext;

/***/ },

/***/ "../../node_modules/.pnpm/vscode-languageserver-types@3.17.5/node_modules/vscode-languageserver-types/lib/umd sync recursive"
/*!**************************************************************************************************************************!*\
  !*** ../../node_modules/.pnpm/vscode-languageserver-types@3.17.5/node_modules/vscode-languageserver-types/lib/umd/ sync ***!
  \**************************************************************************************************************************/
(module) {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = () => ([]);
webpackEmptyContext.resolve = webpackEmptyContext;
webpackEmptyContext.id = "../../node_modules/.pnpm/vscode-languageserver-types@3.17.5/node_modules/vscode-languageserver-types/lib/umd sync recursive";
module.exports = webpackEmptyContext;

/***/ },

/***/ "../../node_modules/.pnpm/yargs-parser@18.1.3/node_modules/yargs-parser sync recursive"
/*!************************************************************************************!*\
  !*** ../../node_modules/.pnpm/yargs-parser@18.1.3/node_modules/yargs-parser/ sync ***!
  \************************************************************************************/
(module) {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = () => ([]);
webpackEmptyContext.resolve = webpackEmptyContext;
webpackEmptyContext.id = "../../node_modules/.pnpm/yargs-parser@18.1.3/node_modules/yargs-parser sync recursive";
module.exports = webpackEmptyContext;

/***/ },

/***/ "../../node_modules/.pnpm/yargs@15.4.1/node_modules/yargs sync recursive"
/*!**********************************************************************!*\
  !*** ../../node_modules/.pnpm/yargs@15.4.1/node_modules/yargs/ sync ***!
  \**********************************************************************/
(module) {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = () => ([]);
webpackEmptyContext.resolve = webpackEmptyContext;
webpackEmptyContext.id = "../../node_modules/.pnpm/yargs@15.4.1/node_modules/yargs sync recursive";
module.exports = webpackEmptyContext;

/***/ },

/***/ "../../node_modules/.pnpm/yargs@15.4.1/node_modules/yargs/build/lib sync recursive"
/*!********************************************************************************!*\
  !*** ../../node_modules/.pnpm/yargs@15.4.1/node_modules/yargs/build/lib/ sync ***!
  \********************************************************************************/
(module) {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = () => ([]);
webpackEmptyContext.resolve = webpackEmptyContext;
webpackEmptyContext.id = "../../node_modules/.pnpm/yargs@15.4.1/node_modules/yargs/build/lib sync recursive";
module.exports = webpackEmptyContext;

/***/ },

/***/ "../../rust_core/index.js"
/*!********************************!*\
  !*** ../../rust_core/index.js ***!
  \********************************/
(module, __unused_webpack_exports, __webpack_require__) {

/* tslint:disable */
/* eslint-disable */
/* prettier-ignore */

/* auto-generated by NAPI-RS */

const { existsSync, readFileSync } = __webpack_require__(/*! fs */ "fs")
const { join } = __webpack_require__(/*! path */ "path")

const { platform, arch } = process

let nativeBinding = null
let localFileExisted = false
let loadError = null

function isMusl() {
  // For Node 10
  if (!process.report || typeof process.report.getReport !== 'function') {
    try {
      const lddPath = (__webpack_require__(/*! child_process */ "child_process").execSync)('which ldd').toString().trim()
      return readFileSync(lddPath, 'utf8').includes('musl')
    } catch (e) {
      return true
    }
  } else {
    const { glibcVersionRuntime } = process.report.getReport().header
    return !glibcVersionRuntime
  }
}

switch (platform) {
  case 'android':
    switch (arch) {
      case 'arm64':
        localFileExisted = existsSync(join(__dirname, 'rust-core.android-arm64.node'))
        try {
          if (localFileExisted) {
            nativeBinding = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module './rust-core.android-arm64.node'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()))
          } else {
            nativeBinding = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'rust-core-android-arm64'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()))
          }
        } catch (e) {
          loadError = e
        }
        break
      case 'arm':
        localFileExisted = existsSync(join(__dirname, 'rust-core.android-arm-eabi.node'))
        try {
          if (localFileExisted) {
            nativeBinding = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module './rust-core.android-arm-eabi.node'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()))
          } else {
            nativeBinding = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'rust-core-android-arm-eabi'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()))
          }
        } catch (e) {
          loadError = e
        }
        break
      default:
        throw new Error(`Unsupported architecture on Android ${arch}`)
    }
    break
  case 'win32':
    switch (arch) {
      case 'x64':
        localFileExisted = existsSync(
          join(__dirname, 'rust-core.win32-x64-msvc.node')
        )
        try {
          if (localFileExisted) {
            nativeBinding = __webpack_require__(/*! ./rust-core.win32-x64-msvc.node */ "../../rust_core/rust-core.win32-x64-msvc.node")
          } else {
            nativeBinding = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'rust-core-win32-x64-msvc'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()))
          }
        } catch (e) {
          loadError = e
        }
        break
      case 'ia32':
        localFileExisted = existsSync(
          join(__dirname, 'rust-core.win32-ia32-msvc.node')
        )
        try {
          if (localFileExisted) {
            nativeBinding = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module './rust-core.win32-ia32-msvc.node'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()))
          } else {
            nativeBinding = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'rust-core-win32-ia32-msvc'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()))
          }
        } catch (e) {
          loadError = e
        }
        break
      case 'arm64':
        localFileExisted = existsSync(
          join(__dirname, 'rust-core.win32-arm64-msvc.node')
        )
        try {
          if (localFileExisted) {
            nativeBinding = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module './rust-core.win32-arm64-msvc.node'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()))
          } else {
            nativeBinding = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'rust-core-win32-arm64-msvc'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()))
          }
        } catch (e) {
          loadError = e
        }
        break
      default:
        throw new Error(`Unsupported architecture on Windows: ${arch}`)
    }
    break
  case 'darwin':
    localFileExisted = existsSync(join(__dirname, 'rust-core.darwin-universal.node'))
    try {
      if (localFileExisted) {
        nativeBinding = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module './rust-core.darwin-universal.node'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()))
      } else {
        nativeBinding = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'rust-core-darwin-universal'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()))
      }
      break
    } catch {}
    switch (arch) {
      case 'x64':
        localFileExisted = existsSync(join(__dirname, 'rust-core.darwin-x64.node'))
        try {
          if (localFileExisted) {
            nativeBinding = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module './rust-core.darwin-x64.node'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()))
          } else {
            nativeBinding = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'rust-core-darwin-x64'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()))
          }
        } catch (e) {
          loadError = e
        }
        break
      case 'arm64':
        localFileExisted = existsSync(
          join(__dirname, 'rust-core.darwin-arm64.node')
        )
        try {
          if (localFileExisted) {
            nativeBinding = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module './rust-core.darwin-arm64.node'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()))
          } else {
            nativeBinding = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'rust-core-darwin-arm64'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()))
          }
        } catch (e) {
          loadError = e
        }
        break
      default:
        throw new Error(`Unsupported architecture on macOS: ${arch}`)
    }
    break
  case 'freebsd':
    if (arch !== 'x64') {
      throw new Error(`Unsupported architecture on FreeBSD: ${arch}`)
    }
    localFileExisted = existsSync(join(__dirname, 'rust-core.freebsd-x64.node'))
    try {
      if (localFileExisted) {
        nativeBinding = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module './rust-core.freebsd-x64.node'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()))
      } else {
        nativeBinding = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'rust-core-freebsd-x64'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()))
      }
    } catch (e) {
      loadError = e
    }
    break
  case 'linux':
    switch (arch) {
      case 'x64':
        if (isMusl()) {
          localFileExisted = existsSync(
            join(__dirname, 'rust-core.linux-x64-musl.node')
          )
          try {
            if (localFileExisted) {
              nativeBinding = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module './rust-core.linux-x64-musl.node'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()))
            } else {
              nativeBinding = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'rust-core-linux-x64-musl'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()))
            }
          } catch (e) {
            loadError = e
          }
        } else {
          localFileExisted = existsSync(
            join(__dirname, 'rust-core.linux-x64-gnu.node')
          )
          try {
            if (localFileExisted) {
              nativeBinding = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module './rust-core.linux-x64-gnu.node'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()))
            } else {
              nativeBinding = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'rust-core-linux-x64-gnu'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()))
            }
          } catch (e) {
            loadError = e
          }
        }
        break
      case 'arm64':
        if (isMusl()) {
          localFileExisted = existsSync(
            join(__dirname, 'rust-core.linux-arm64-musl.node')
          )
          try {
            if (localFileExisted) {
              nativeBinding = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module './rust-core.linux-arm64-musl.node'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()))
            } else {
              nativeBinding = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'rust-core-linux-arm64-musl'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()))
            }
          } catch (e) {
            loadError = e
          }
        } else {
          localFileExisted = existsSync(
            join(__dirname, 'rust-core.linux-arm64-gnu.node')
          )
          try {
            if (localFileExisted) {
              nativeBinding = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module './rust-core.linux-arm64-gnu.node'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()))
            } else {
              nativeBinding = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'rust-core-linux-arm64-gnu'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()))
            }
          } catch (e) {
            loadError = e
          }
        }
        break
      case 'arm':
        if (isMusl()) {
          localFileExisted = existsSync(
            join(__dirname, 'rust-core.linux-arm-musleabihf.node')
          )
          try {
            if (localFileExisted) {
              nativeBinding = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module './rust-core.linux-arm-musleabihf.node'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()))
            } else {
              nativeBinding = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'rust-core-linux-arm-musleabihf'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()))
            }
          } catch (e) {
            loadError = e
          }
        } else {
          localFileExisted = existsSync(
            join(__dirname, 'rust-core.linux-arm-gnueabihf.node')
          )
          try {
            if (localFileExisted) {
              nativeBinding = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module './rust-core.linux-arm-gnueabihf.node'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()))
            } else {
              nativeBinding = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'rust-core-linux-arm-gnueabihf'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()))
            }
          } catch (e) {
            loadError = e
          }
        }
        break
      case 'riscv64':
        if (isMusl()) {
          localFileExisted = existsSync(
            join(__dirname, 'rust-core.linux-riscv64-musl.node')
          )
          try {
            if (localFileExisted) {
              nativeBinding = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module './rust-core.linux-riscv64-musl.node'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()))
            } else {
              nativeBinding = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'rust-core-linux-riscv64-musl'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()))
            }
          } catch (e) {
            loadError = e
          }
        } else {
          localFileExisted = existsSync(
            join(__dirname, 'rust-core.linux-riscv64-gnu.node')
          )
          try {
            if (localFileExisted) {
              nativeBinding = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module './rust-core.linux-riscv64-gnu.node'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()))
            } else {
              nativeBinding = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'rust-core-linux-riscv64-gnu'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()))
            }
          } catch (e) {
            loadError = e
          }
        }
        break
      case 's390x':
        localFileExisted = existsSync(
          join(__dirname, 'rust-core.linux-s390x-gnu.node')
        )
        try {
          if (localFileExisted) {
            nativeBinding = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module './rust-core.linux-s390x-gnu.node'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()))
          } else {
            nativeBinding = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'rust-core-linux-s390x-gnu'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()))
          }
        } catch (e) {
          loadError = e
        }
        break
      default:
        throw new Error(`Unsupported architecture on Linux: ${arch}`)
    }
    break
  default:
    throw new Error(`Unsupported OS: ${platform}, architecture: ${arch}`)
}

if (!nativeBinding) {
  if (loadError) {
    throw loadError
  }
  throw new Error(`Failed to load native binding`)
}

const { getSubstrateStatus, syncUnifiedField } = nativeBinding

module.exports.getSubstrateStatus = getSubstrateStatus
module.exports.syncUnifiedField = syncUnifiedField


/***/ },

/***/ "../../rust_core/rust-core.win32-x64-msvc.node"
/*!*****************************************************!*\
  !*** ../../rust_core/rust-core.win32-x64-msvc.node ***!
  \*****************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

/* module decorator */ module = __webpack_require__.nmd(module);

try {
  process.dlopen(module, (__webpack_require__(/*! path */ "path").join)(__dirname, __webpack_require__.p, "native/rust-core.win32-x64-msvc.node"));
} catch (error) {
  throw new Error('node-loader:\n' + error);
}


/***/ },

/***/ "./src-gen/backend/main.js"
/*!*********************************!*\
  !*** ./src-gen/backend/main.js ***!
  \*********************************/
(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

// @ts-check
const { BackendApplicationConfigProvider } = __webpack_require__(/*! @theia/core/lib/node/backend-application-config-provider */ "../../node_modules/.pnpm/@theia+core@1.67.0_@theia+electron@1.67.0_electron@38.4.0_/node_modules/@theia/core/lib/node/backend-application-config-provider.js");
const main = __webpack_require__(/*! @theia/core/lib/node/main */ "../../node_modules/.pnpm/@theia+core@1.67.0_@theia+electron@1.67.0_electron@38.4.0_/node_modules/@theia/core/lib/node/main.js");

BackendApplicationConfigProvider.set({
    "singleInstance": true,
    "frontendConnectionTimeout": 0,
    "configurationFolder": ".theia"
});

globalThis.extensionInfo = [
    {
        "name": "@theia/electron",
        "version": "1.67.0"
    },
    {
        "name": "@theia/core",
        "version": "1.67.0"
    },
    {
        "name": "@theia/variable-resolver",
        "version": "1.67.0"
    },
    {
        "name": "@theia/editor",
        "version": "1.67.0"
    },
    {
        "name": "@theia/filesystem",
        "version": "1.67.0"
    },
    {
        "name": "@theia/messages",
        "version": "1.67.0"
    },
    {
        "name": "@theia/workspace",
        "version": "1.67.0"
    },
    {
        "name": "@theia/markers",
        "version": "1.67.0"
    },
    {
        "name": "@theia/outline-view",
        "version": "1.67.0"
    },
    {
        "name": "@theia/monaco",
        "version": "1.67.0"
    },
    {
        "name": "francis-ide-extension",
        "version": "0.0.1"
    }
];

const serverModule = __webpack_require__(/*! ./server */ "./src-gen/backend/server.js");
const serverAddress = main.start(serverModule());

serverAddress.then((addressInfo) => {
    if (process && process.send && addressInfo) {
        process.send(addressInfo);
    }
});

globalThis.serverAddress = serverAddress;


/***/ },

/***/ "./src-gen/backend/server.js"
/*!***********************************!*\
  !*** ./src-gen/backend/server.js ***!
  \***********************************/
(module, __unused_webpack_exports, __webpack_require__) {

// @ts-check
__webpack_require__(/*! reflect-metadata */ "../../node_modules/.pnpm/reflect-metadata@0.2.2/node_modules/reflect-metadata/Reflect.js");

// Erase the ELECTRON_RUN_AS_NODE variable from the environment, else Electron apps started using Theia will pick it up.
if ('ELECTRON_RUN_AS_NODE' in process.env) {
    delete process.env.ELECTRON_RUN_AS_NODE;
}

const path = __webpack_require__(/*! path */ "path");
process.env.THEIA_APP_PROJECT_PATH = path.resolve(__dirname, '..', '..')
const express = __webpack_require__(/*! @theia/core/shared/express */ "../../node_modules/.pnpm/@theia+core@1.67.0_@theia+electron@1.67.0_electron@38.4.0_/node_modules/@theia/core/shared/express/index.js");
const { Container } = __webpack_require__(/*! @theia/core/shared/inversify */ "../../node_modules/.pnpm/@theia+core@1.67.0_@theia+electron@1.67.0_electron@38.4.0_/node_modules/@theia/core/shared/inversify/index.js");
const { BackendApplication, BackendApplicationServer, CliManager } = __webpack_require__(/*! @theia/core/lib/node */ "../../node_modules/.pnpm/@theia+core@1.67.0_@theia+electron@1.67.0_electron@38.4.0_/node_modules/@theia/core/lib/node/index.js");
const { backendApplicationModule } = __webpack_require__(/*! @theia/core/lib/node/backend-application-module */ "../../node_modules/.pnpm/@theia+core@1.67.0_@theia+electron@1.67.0_electron@38.4.0_/node_modules/@theia/core/lib/node/backend-application-module.js");
const { messagingBackendModule } = __webpack_require__(/*! @theia/core/lib/node/messaging/messaging-backend-module */ "../../node_modules/.pnpm/@theia+core@1.67.0_@theia+electron@1.67.0_electron@38.4.0_/node_modules/@theia/core/lib/node/messaging/messaging-backend-module.js");
const { loggerBackendModule } = __webpack_require__(/*! @theia/core/lib/node/logger-backend-module */ "../../node_modules/.pnpm/@theia+core@1.67.0_@theia+electron@1.67.0_electron@38.4.0_/node_modules/@theia/core/lib/node/logger-backend-module.js");

const container = new Container();
container.load(backendApplicationModule);
container.load(messagingBackendModule);
container.load(loggerBackendModule);

function defaultServeStatic(app) {
    app.use(express.static(path.resolve(__dirname, '../../lib/frontend')))
}

function load(raw) {
    return Promise.resolve(raw).then(
        module => container.load(module.default)
    );
}

async function start(port, host, argv = process.argv) {
    if (!container.isBound(BackendApplicationServer)) {
        container.bind(BackendApplicationServer).toConstantValue({ configure: defaultServeStatic });
    }
    let result = undefined;
    await container.get(CliManager).initializeCli(argv.slice(2), 
        () => container.get(BackendApplication).configured,
        async () => {
            result = container.get(BackendApplication).start(port, host);
        });
    if (result) {
        return result;
    } else {
        return Promise.reject(0);
    }
}

module.exports = async (port, host, argv) => {
    try {
        await load(__webpack_require__(/*! @theia/core/lib/node/i18n/i18n-backend-module */ "../../node_modules/.pnpm/@theia+core@1.67.0_@theia+electron@1.67.0_electron@38.4.0_/node_modules/@theia/core/lib/node/i18n/i18n-backend-module.js"));
        await load(__webpack_require__(/*! @theia/core/lib/node/hosting/backend-hosting-module */ "../../node_modules/.pnpm/@theia+core@1.67.0_@theia+electron@1.67.0_electron@38.4.0_/node_modules/@theia/core/lib/node/hosting/backend-hosting-module.js"));
        await load(__webpack_require__(/*! @theia/core/lib/node/request/backend-request-module */ "../../node_modules/.pnpm/@theia+core@1.67.0_@theia+electron@1.67.0_electron@38.4.0_/node_modules/@theia/core/lib/node/request/backend-request-module.js"));
        await load(__webpack_require__(/*! @theia/editor/lib/node/editor-backend-module */ "../../node_modules/.pnpm/@theia+editor@1.67.0_@theia+electron@1.67.0_electron@38.4.0_/node_modules/@theia/editor/lib/node/editor-backend-module.js"));
        await load(__webpack_require__(/*! @theia/filesystem/lib/node/filesystem-backend-module */ "../../node_modules/.pnpm/@theia+filesystem@1.67.0_@t_9d39de5495845f9d687ca7913e4225ef/node_modules/@theia/filesystem/lib/node/filesystem-backend-module.js"));
        await load(__webpack_require__(/*! @theia/filesystem/lib/node/download/file-download-backend-module */ "../../node_modules/.pnpm/@theia+filesystem@1.67.0_@t_9d39de5495845f9d687ca7913e4225ef/node_modules/@theia/filesystem/lib/node/download/file-download-backend-module.js"));
        await load(__webpack_require__(/*! @theia/messages/lib/node/messages-backend-module */ "../../node_modules/.pnpm/@theia+messages@1.67.0_@the_d4413dbc4797d8af46e9edbcf6fcfdf5/node_modules/@theia/messages/lib/node/messages-backend-module.js"));
        await load(__webpack_require__(/*! @theia/workspace/lib/node/workspace-backend-module */ "../../node_modules/.pnpm/@theia+workspace@1.67.0_@th_6cbbcef1cda2431e10ea2c215aaa1d1b/node_modules/@theia/workspace/lib/node/workspace-backend-module.js"));
        await load(__webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module '@theia/markers/lib/node/problem-backend-module'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())));
        await load(__webpack_require__(/*! francis-ide-extension/lib/node/francis-ide-backend-module */ "../../libs/francis-ide-extension/lib/node/francis-ide-backend-module.js"));
        return await start(port, host, argv);
    } catch (error) {
        if (typeof error !== 'number') {
            console.error('Failed to start the backend application:');
            console.error(error); 
            process.exitCode = 1;
        }
        throw error;
    }
}


/***/ },

/***/ "assert"
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
(module) {

"use strict";
module.exports = require("assert");

/***/ },

/***/ "async_hooks"
/*!******************************!*\
  !*** external "async_hooks" ***!
  \******************************/
(module) {

"use strict";
module.exports = require("async_hooks");

/***/ },

/***/ "buffer"
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
(module) {

"use strict";
module.exports = require("buffer");

/***/ },

/***/ "child_process"
/*!********************************!*\
  !*** external "child_process" ***!
  \********************************/
(module) {

"use strict";
module.exports = require("child_process");

/***/ },

/***/ "constants"
/*!****************************!*\
  !*** external "constants" ***!
  \****************************/
(module) {

"use strict";
module.exports = require("constants");

/***/ },

/***/ "crypto"
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
(module) {

"use strict";
module.exports = require("crypto");

/***/ },

/***/ "dns"
/*!**********************!*\
  !*** external "dns" ***!
  \**********************/
(module) {

"use strict";
module.exports = require("dns");

/***/ },

/***/ "drivelist"
/*!****************************!*\
  !*** external "drivelist" ***!
  \****************************/
(module) {

"use strict";
module.exports = drivelist;

/***/ },

/***/ "events"
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
(module) {

"use strict";
module.exports = require("events");

/***/ },

/***/ "fs"
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
(module) {

"use strict";
module.exports = require("fs");

/***/ },

/***/ "http"
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
(module) {

"use strict";
module.exports = require("http");

/***/ },

/***/ "http2"
/*!************************!*\
  !*** external "http2" ***!
  \************************/
(module) {

"use strict";
module.exports = require("http2");

/***/ },

/***/ "https"
/*!************************!*\
  !*** external "https" ***!
  \************************/
(module) {

"use strict";
module.exports = require("https");

/***/ },

/***/ "keytar"
/*!*************************!*\
  !*** external "keytar" ***!
  \*************************/
(module) {

"use strict";
module.exports = keytar;

/***/ },

/***/ "module"
/*!*************************!*\
  !*** external "module" ***!
  \*************************/
(module) {

"use strict";
module.exports = require("module");

/***/ },

/***/ "net"
/*!**********************!*\
  !*** external "net" ***!
  \**********************/
(module) {

"use strict";
module.exports = require("net");

/***/ },

/***/ "node:events"
/*!******************************!*\
  !*** external "node:events" ***!
  \******************************/
(module) {

"use strict";
module.exports = require("node:events");

/***/ },

/***/ "node:fs"
/*!**************************!*\
  !*** external "node:fs" ***!
  \**************************/
(module) {

"use strict";
module.exports = require("node:fs");

/***/ },

/***/ "node:fs/promises"
/*!***********************************!*\
  !*** external "node:fs/promises" ***!
  \***********************************/
(module) {

"use strict";
module.exports = require("node:fs/promises");

/***/ },

/***/ "node:path"
/*!****************************!*\
  !*** external "node:path" ***!
  \****************************/
(module) {

"use strict";
module.exports = require("node:path");

/***/ },

/***/ "node:stream"
/*!******************************!*\
  !*** external "node:stream" ***!
  \******************************/
(module) {

"use strict";
module.exports = require("node:stream");

/***/ },

/***/ "node:string_decoder"
/*!**************************************!*\
  !*** external "node:string_decoder" ***!
  \**************************************/
(module) {

"use strict";
module.exports = require("node:string_decoder");

/***/ },

/***/ "node:url"
/*!***************************!*\
  !*** external "node:url" ***!
  \***************************/
(module) {

"use strict";
module.exports = require("node:url");

/***/ },

/***/ "os"
/*!*********************!*\
  !*** external "os" ***!
  \*********************/
(module) {

"use strict";
module.exports = require("os");

/***/ },

/***/ "path"
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
(module) {

"use strict";
module.exports = require("path");

/***/ },

/***/ "perf_hooks"
/*!*****************************!*\
  !*** external "perf_hooks" ***!
  \*****************************/
(module) {

"use strict";
module.exports = require("perf_hooks");

/***/ },

/***/ "pnpapi"
/*!*************************!*\
  !*** external "pnpapi" ***!
  \*************************/
(module) {

"use strict";
module.exports = require("pnpapi");

/***/ },

/***/ "querystring"
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
(module) {

"use strict";
module.exports = require("querystring");

/***/ },

/***/ "readline"
/*!***************************!*\
  !*** external "readline" ***!
  \***************************/
(module) {

"use strict";
module.exports = require("readline");

/***/ },

/***/ "stream"
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
(module) {

"use strict";
module.exports = require("stream");

/***/ },

/***/ "string_decoder"
/*!*********************************!*\
  !*** external "string_decoder" ***!
  \*********************************/
(module) {

"use strict";
module.exports = require("string_decoder");

/***/ },

/***/ "timers"
/*!*************************!*\
  !*** external "timers" ***!
  \*************************/
(module) {

"use strict";
module.exports = require("timers");

/***/ },

/***/ "tls"
/*!**********************!*\
  !*** external "tls" ***!
  \**********************/
(module) {

"use strict";
module.exports = require("tls");

/***/ },

/***/ "tty"
/*!**********************!*\
  !*** external "tty" ***!
  \**********************/
(module) {

"use strict";
module.exports = require("tty");

/***/ },

/***/ "url"
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
(module) {

"use strict";
module.exports = require("url");

/***/ },

/***/ "util"
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
(module) {

"use strict";
module.exports = require("util");

/***/ },

/***/ "util/types"
/*!*****************************!*\
  !*** external "util/types" ***!
  \*****************************/
(module) {

"use strict";
module.exports = require("util/types");

/***/ },

/***/ "worker_threads"
/*!*********************************!*\
  !*** external "worker_threads" ***!
  \*********************************/
(module) {

"use strict";
module.exports = require("worker_threads");

/***/ },

/***/ "zlib"
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
(module) {

"use strict";
module.exports = require("zlib");

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Check if module exists (development only)
/******/ 		if (__webpack_modules__[moduleId] === undefined) {
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = __webpack_module_cache__;
/******/ 	
/******/ 	// the startup function
/******/ 	__webpack_require__.x = () => {
/******/ 		// Load entry module and return exports
/******/ 		var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_pnpm_theia_core_1_67_0__theia_electron_1_67_0_electron_38_4_0__node_modu-178b13","vendors-node_modules_pnpm_theia_filesystem_1_67_0__t_9d39de5495845f9d687ca7913e4225ef_node_mo-94a6b6","vendors-node_modules_pnpm_theia_core_1_67_0__theia_electron_1_67_0_electron_38_4_0__node_modu-226a69","vendors-node_modules_pnpm_stroncium_procfs_1_2_1_node_modules_stroncium_procfs_lib_parsers_cg-51dbf8"], () => (__webpack_require__("./src-gen/backend/main.js")))
/******/ 		__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 		return __webpack_exports__;
/******/ 	};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks and chunks that the entrypoint depends on
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + ".js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "";
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/require chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded chunks
/******/ 		// "1" means "loaded", otherwise not loaded yet
/******/ 		var installedChunks = {
/******/ 			"main": 1
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.O.require = (chunkId) => (installedChunks[chunkId]);
/******/ 		
/******/ 		var installChunk = (chunk) => {
/******/ 			var moreModules = chunk.modules, chunkIds = chunk.ids, runtime = chunk.runtime;
/******/ 			for(var moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 				}
/******/ 			}
/******/ 			if(runtime) runtime(__webpack_require__);
/******/ 			for(var i = 0; i < chunkIds.length; i++)
/******/ 				installedChunks[chunkIds[i]] = 1;
/******/ 			__webpack_require__.O();
/******/ 		};
/******/ 		
/******/ 		// require() chunk loading for javascript
/******/ 		__webpack_require__.f.require = (chunkId, promises) => {
/******/ 			// "1" is the signal for "already loaded"
/******/ 			if(!installedChunks[chunkId]) {
/******/ 				if(true) { // all chunks have JS
/******/ 					var installedChunk = require("./" + __webpack_require__.u(chunkId));
/******/ 					if (!installedChunks[chunkId]) {
/******/ 						installChunk(installedChunk);
/******/ 					}
/******/ 				} else installedChunks[chunkId] = 1;
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		// no external install chunk
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/startup chunk dependencies */
/******/ 	(() => {
/******/ 		var next = __webpack_require__.x;
/******/ 		__webpack_require__.x = () => {
/******/ 			__webpack_require__.e("vendors-node_modules_pnpm_theia_core_1_67_0__theia_electron_1_67_0_electron_38_4_0__node_modu-178b13");
/******/ 			__webpack_require__.e("vendors-node_modules_pnpm_theia_filesystem_1_67_0__t_9d39de5495845f9d687ca7913e4225ef_node_mo-94a6b6");
/******/ 			__webpack_require__.e("vendors-node_modules_pnpm_theia_core_1_67_0__theia_electron_1_67_0_electron_38_4_0__node_modu-226a69");
/******/ 			__webpack_require__.e("vendors-node_modules_pnpm_stroncium_procfs_1_2_1_node_modules_stroncium_procfs_lib_parsers_cg-51dbf8");
/******/ 			return next();
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// module cache are used so entry inlining is disabled
/******/ 	// run startup
/******/ 	var __webpack_exports__ = __webpack_require__.x();
/******/ 	
/******/ })()
;
//# sourceMappingURL=main.js.map