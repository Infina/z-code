import * as path from "path"
import * as fs from "fs"
import { spawn } from "child_process"

/**
 * 调试脚本：验证带空格路径下的 child_process.spawn 行为
 * 以及探测真实的 Workspace 结构
 */
async function debug() {
    const cwd = process.cwd()
    console.log(`[DEBUG] Current Node CWD: "${cwd}"`)
    
    const parentDir = path.dirname(cwd)
    const parentFiles = fs.readdirSync(parentDir)
    console.log(`[DEBUG] Parent Directory Files: ${JSON.stringify(parentFiles)}`)

    const currentFiles = fs.readdirSync(cwd)
    console.log(`[DEBUG] Current Directory Files: ${JSON.stringify(currentFiles)}`)

    // 测试 Rust 二进制文件（如果存在）
    const roostBin = path.join(cwd, "bin", "roost_bin")
    if (fs.existsSync(roostBin)) {
        console.log(`[DEBUG] Found roost_bin at: "${roostBin}"`)
        
        // 测试带空格路径的参数传递
        // 模拟 Rust 引擎调用
        const testArgs = ["--json", "--path", cwd]
        console.log(`[DEBUG] Spawning Rust with args: ${JSON.stringify(testArgs)}`)
        
        const proc = spawn(roostBin, testArgs)
        
        proc.stdout.on("data", (data) => {
            console.log(`[RUST STDOUT]: ${data.toString().substring(0, 100)}...`)
        })

        proc.stderr.on("data", (data) => {
            console.error(`[RUST STDERR]: ${data.toString()}`)
        })

        proc.on("close", (code) => {
            console.log(`[DEBUG] Rust process exited with code ${code}`)
        })
    } else {
        console.log(`[DEBUG] roost_bin NOT found at "${roostBin}". Please run 'pnpm run build' first.`)
    }
}

debug().catch(console.error)
