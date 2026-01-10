import React, { useMemo } from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import { Database, Map, X, Info, Maximize2 } from "lucide-react"

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	Button,
	StandardTooltip,
} from "@src/components/ui"
import { useAppTranslation } from "@src/i18n/TranslationContext"
import { useExtensionState } from "@src/context/ExtensionStateContext"
import { useRepoMap } from "@src/context/RepoMapContext"
import { cn } from "@src/lib/utils"
import HolographicMap from "../map/HolographicMap"
import type { IndexingStatus } from "@roo/ExtensionMessage"
import { vscode } from "@src/utils/vscode"

interface CodebaseStatusDialogProps {
	isOpen: boolean
	onClose: () => void
	indexingStatus: IndexingStatus
}

export const CodebaseStatusDialog: React.FC<CodebaseStatusDialogProps> = ({
	isOpen,
	onClose,
	indexingStatus,
}) => {
	const { t } = useAppTranslation()
	const { repoMapData } = useRepoMap()
	const { codebaseIndexConfig } = useExtensionState()

	const progressPercentage = useMemo(
		() =>
			indexingStatus.totalItems > 0
				? Math.round((indexingStatus.processedItems / indexingStatus.totalItems) * 100)
				: 0,
		[indexingStatus.processedItems, indexingStatus.totalItems],
	)

	const transformStyleString = `translateX(-${100 - progressPercentage}%)`

	const handleStartIndexing = () => {
		vscode.postMessage({ type: "startIndexing" })
	}

	const handleGenerateRepoMap = () => {
		vscode.postMessage({ type: "generateRepoMap" })
	}

	return (
		<Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
			<DialogContent className="max-w-4xl w-[90vw] h-[85vh] flex flex-col p-0 overflow-hidden bg-vscode-sideBar-background border-vscode-widget-border">
				<DialogHeader className="p-4 border-b border-vscode-widget-border flex flex-row items-center justify-between space-y-0">
					<div className="flex items-center gap-2">
						<Database className="w-5 h-5 text-vscode-foreground" />
						<DialogTitle className="text-lg font-semibold text-vscode-foreground">
							{t("settings:codeIndex.title")}
						</DialogTitle>
					</div>
					<Button
						variant="ghost"
						size="sm"
						onClick={onClose}
						className="h-8 w-8 p-0 hover:bg-vscode-toolbar-hoverBackground">
						<X className="w-5 h-5" />
					</Button>
				</DialogHeader>

				<div className="flex-1 flex flex-col overflow-hidden p-4 gap-4">
					{/* Indexing Status Section */}
					<div className="bg-vscode-editor-background border border-vscode-widget-border rounded-lg p-4 space-y-3 shadow-sm">
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-3">
								<span
									className={cn("w-3 h-3 rounded-full shadow-sm", {
										"bg-gray-400": indexingStatus.systemStatus === "Standby",
										"bg-yellow-500 animate-pulse": indexingStatus.systemStatus === "Indexing",
										"bg-green-500 shadow-green-500/20": indexingStatus.systemStatus === "Indexed",
										"bg-red-500 shadow-red-500/20": indexingStatus.systemStatus === "Error",
									})}
								/>
								<span className="font-medium text-vscode-foreground text-sm uppercase tracking-wider">
									{t(`settings:codeIndex.indexingStatuses.${indexingStatus.systemStatus.toLowerCase()}`)}
								</span>
							</div>
							<div className="flex items-center gap-2">
								{indexingStatus.systemStatus === "Standby" && codebaseIndexConfig?.codebaseIndexEnabled && (
									<Button size="sm" onClick={handleStartIndexing} className="h-8 px-3 text-xs">
										{t("settings:codeIndex.startIndexingButton")}
									</Button>
								)}
								<Button 
									variant="outline" 
									size="sm" 
									onClick={handleGenerateRepoMap}
									className="h-8 px-3 text-xs border-vscode-button-secondaryBackground text-vscode-button-secondaryForeground hover:bg-vscode-button-secondaryHoverBackground"
								>
									<Map className="w-3.5 h-3.5 mr-1.5" />
									{t("chat:generateRepoMap") || "Refresh Map"}
								</Button>
								<Button 
									variant="outline" 
									size="sm" 
									onClick={() => vscode.postMessage({ type: "openRepoMap" } as any)}
									className="h-8 px-3 text-xs border-vscode-button-secondaryBackground text-vscode-button-secondaryForeground hover:bg-vscode-button-secondaryHoverBackground"
								>
									<Maximize2 className="w-3.5 h-3.5 mr-1.5" />
									Fullscreen
								</Button>
							</div>
						</div>

						{indexingStatus.systemStatus === "Indexing" && (
							<div className="space-y-2">
								<div className="flex justify-between text-xs text-vscode-descriptionForeground font-medium">
									<span>{indexingStatus.message || t("chat:indexingStatus.indexing", { percentage: progressPercentage })}</span>
									<span>{progressPercentage}%</span>
								</div>
								<ProgressPrimitive.Root
									className="relative h-1.5 w-full overflow-hidden rounded-full bg-vscode-progressBar-background"
									value={progressPercentage}>
									<ProgressPrimitive.Indicator
										className="h-full w-full flex-1 bg-vscode-progressBar-foreground transition-transform duration-500 ease-out"
										style={{ transform: transformStyleString }}
									/>
								</ProgressPrimitive.Root>
							</div>
						)}

						{indexingStatus.systemStatus === "Indexed" && (
							<div className="flex items-center gap-2 text-xs text-vscode-descriptionForeground bg-vscode-sideBar-background p-2 rounded border border-vscode-widget-border/50">
								<Info className="w-3.5 h-3.5" />
								<span>{t("chat:indexingStatus.ready")} • {repoMapData?.files?.length || 0} {t("settings:codeIndex.filesIndexed") || "Files Indexed"}</span>
							</div>
						)}
					</div>

					{/* Map Section */}
					<div className="flex-1 min-h-0 bg-vscode-editor-background border border-vscode-widget-border rounded-lg overflow-hidden relative shadow-inner">
						<HolographicMap data={repoMapData} visible={true} />
						
						{/* Overlay for status messages when map is empty */}
						{(!repoMapData || repoMapData.files.length === 0) && (
							<div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-vscode-editor-background/80 backdrop-blur-sm">
								<Map className="w-12 h-12 text-vscode-descriptionForeground/20 mb-4" />
								<h3 className="text-vscode-foreground font-medium mb-2">
									{t("chat:repoMap.noData") || "No Repository Map Data"}
								</h3>
								<p className="text-sm text-vscode-descriptionForeground max-w-sm">
									{t("chat:repoMap.noDataDescription") || "Generate a repository map to visualize the structural relationships in your codebase."}
								</p>
								<Button variant="secondary" onClick={handleGenerateRepoMap} className="mt-4">
									{t("chat:generateRepoMap") || "Generate Map"}
								</Button>
							</div>
						)}
					</div>
				</div>
				
				<div className="p-3 bg-vscode-sideBar-background border-t border-vscode-widget-border flex justify-end">
					<Button variant="secondary" size="sm" onClick={onClose} className="text-xs h-7 px-4">
						{t("common:close") || "Close"}
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	)
}
