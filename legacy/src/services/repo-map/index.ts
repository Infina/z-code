import * as child_process from "child_process"
import * as path from "path"
import * as vscode from "vscode"

export interface RepoMapResult {
	files: {
		path: string
		score: number
		definitions: string[]
	}[]
	edges?: {
		source: string
		target: string
		weight: number
	}[]
}

export class RepoMapService {
	private static instance: RepoMapService | undefined
	private binaryPath: string
	private cache: Map<string, string> = new Map()
	private isUpdating: boolean = false
	private lastUpdateTimestamp: number = 0
	private readonly CACHE_TTL = 1000 * 60 * 5 // 5 minutes

	private constructor(private context: vscode.ExtensionContext) {
		this.binaryPath = context.globalState.get<string>("roost_bin_path") || ""
		if (!this.binaryPath) {
			this.binaryPath =
				context.extensionMode === vscode.ExtensionMode.Development
					? path.join(context.extensionPath, "..", "bin", "roost_bin")
					: path.join(context.extensionPath, "bin", "roost_bin")
		}
	}

	public static getInstance(context: vscode.ExtensionContext): RepoMapService {
		if (!RepoMapService.instance) {
			RepoMapService.instance = new RepoMapService(context)
		}
		return RepoMapService.instance
	}

	/**
	 * 获取缓存的 Map，如果没有则触发异步更新并返回空或旧值
	 */
	getOptimisticMap(repoPath: string, focusFiles: string[] = []): string {
		const cacheKey = `${repoPath}:${focusFiles.sort().join(",")}`
		const cached = this.cache.get(cacheKey)
		const now = Date.now()

		const isCacheExpired = now - this.lastUpdateTimestamp > this.CACHE_TTL

		if ((!cached || isCacheExpired) && !this.isUpdating) {
			void this.updateCache(repoPath, focusFiles)
		}

		return cached || ""
	}

	private async updateCache(repoPath: string, focusFiles: string[]): Promise<void> {
		if (this.isUpdating) return
		this.isUpdating = true

		try {
			const map = await this.generateMap(repoPath, focusFiles)
			const cacheKey = `${repoPath}:${focusFiles.sort().join(",")}`
			this.cache.set(cacheKey, map)
			this.lastUpdateTimestamp = Date.now()
		} catch (e) {
			console.error("[RepoMapService] Background update failed:", e)
		} finally {
			this.isUpdating = false
		}
	}

	async generateMap(repoPath: string, focusFiles: string[] = [], tokenBudget?: number): Promise<string> {
		if (!this.binaryPath) {
			throw new Error("Rust binary path not configured")
		}

		return new Promise((resolve, reject) => {
			const args = ["--path", repoPath]
			if (focusFiles.length > 0) {
				args.push("--focus", focusFiles.join(","))
			}
			if (tokenBudget) {
				args.push("--token-budget", tokenBudget.toString())
			}

			child_process.execFile(this.binaryPath, args, (error, stdout, stderr) => {
				if (error) {
					reject(new Error(`Rust Engine error: ${error.message}\n${stderr}`))
					return
				}
				resolve(stdout)
			})
		})
	}

	async generateJsonMap(repoPath: string, focusFiles: string[] = [], tokenBudget?: number): Promise<RepoMapResult> {
		if (!this.binaryPath) {
			throw new Error("Rust binary path not configured")
		}

		return new Promise((resolve, reject) => {
			const args = ["--path", repoPath, "--json"]
			if (focusFiles.length > 0) {
				args.push("--focus", focusFiles.join(","))
			}
			if (tokenBudget) {
				args.push("--token-budget", tokenBudget.toString())
			}

			console.log(`[RepoMapService] Running binary: ${this.binaryPath} ${args.map(arg => `"${arg}"`).join(" ")}`)

			child_process.execFile(this.binaryPath, args, { maxBuffer: 1024 * 1024 * 10, windowsVerbatimArguments: process.platform === "win32" }, (error, stdout, stderr) => {
				if (error) {
					console.error(`[RepoMapService] Binary execution failed:`, error, stderr)
					reject(new Error(`Rust Engine error: ${error.message}\n${stderr}`))
					return
				}
				if (stderr) {
					console.warn(`[RepoMapService] Binary stderr:`, stderr)
				}
				try {
					console.log(`[RepoMapService] Binary stdout length: ${stdout.length}`)
					if (!stdout || stdout.trim() === "") {
						console.warn(`[RepoMapService] Binary returned empty output`)
						resolve({ files: [] })
						return
					}
					// 增加对非法 JSON 的容错
					let result: RepoMapResult;
					try {
						result = JSON.parse(stdout)
					} catch (e) {
						// 尝试寻找 JSON 边界 (某些系统可能会在输出前后打印调试信息)
						const match = stdout.match(/\{[\s\S]*\}/);
						if (match) {
							result = JSON.parse(match[0]);
						} else {
							throw e;
						}
					}
					resolve(result)
				} catch (e) {
					console.warn(`[RepoMapService] JSON parse failed, returning empty map. Output:`, stdout)
					resolve({ files: [] })
				}
			})
		})
	}
}
