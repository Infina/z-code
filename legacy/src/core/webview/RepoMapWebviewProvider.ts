import * as vscode from "vscode"
import * as path from "path"
import { getUri } from "./getUri"
import { getNonce } from "./getNonce"
import { ExtensionMessage } from "../../shared/ExtensionMessage"

export class RepoMapWebviewProvider {
	public static readonly viewType = "roo.repoMap"
	private _panel?: vscode.WebviewPanel
	private _disposables: vscode.Disposable[] = []

	constructor(
		private readonly _extensionUri: vscode.Uri,
		private readonly _outputChannel: vscode.OutputChannel,
	) {}

	public show() {
		if (this._panel) {
			this._panel.reveal(vscode.ViewColumn.Active)
			return
		}

		this._panel = vscode.window.createWebviewPanel(
			RepoMapWebviewProvider.viewType,
			"Holographic Repository Map",
			vscode.ViewColumn.Active,
			{
				enableScripts: true,
				retainContextWhenHidden: true,
				localResourceRoots: [this._extensionUri],
			},
		)

		this._panel.webview.html = this._getHtmlForWebview(this._panel.webview)

		this._panel.onDidDispose(() => this.dispose(), null, this._disposables)

		this._panel.webview.onDidReceiveMessage(
			async (message: any) => {
				switch (message.type) {
					case "openFile":
						if (message.text) {
							const uri = vscode.Uri.file(message.text)
							await vscode.window.showTextDocument(uri, {
								viewColumn: vscode.ViewColumn.Beside,
							})
						}
						break
                    case "webviewDidLaunch":
                        this.postMessage({ type: "state", state: { renderContext: "editor" } as any })
                        break
				}
			},
			null,
			this._disposables,
		)
	}

	public postMessage(message: ExtensionMessage) {
		this._panel?.webview.postMessage(message)
	}

    public async postStateToWebview(provider: any) {
        if (this._panel) {
            const state = await provider.getStateToPostToWebview()
            this.postMessage({ type: "state", state })
        }
    }

	public dispose() {
		this._panel?.dispose()
		this._panel = undefined
		while (this._disposables.length) {
			const x = this._disposables.pop()
			if (x) {
				x.dispose()
			}
		}
	}

	private _getHtmlForWebview(webview: vscode.Webview) {
		const stylesUri = getUri(webview, this._extensionUri, ["webview-ui", "build", "assets", "index.css"])
		const scriptUri = getUri(webview, this._extensionUri, ["webview-ui", "build", "assets", "index.js"])
		const nonce = getNonce()

		return `<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource} 'unsafe-inline'; script-src 'nonce-${nonce}'; font-src ${webview.cspSource}; img-src ${webview.cspSource} https:; connect-src ${webview.cspSource} https:;">
				<link rel="stylesheet" href="${stylesUri}">
				<title>Holographic Repository Map</title>
                <style>
                    body { padding: 0; margin: 0; overflow: hidden; background-color: var(--vscode-editor-background); }
                    #root { height: 100vh; width: 100vw; }
                </style>
			</head>
			<body>
				<div id="root"></div>
				<script nonce="${nonce}" src="${scriptUri}"></script>
			</body>
			</html>`
	}
}
