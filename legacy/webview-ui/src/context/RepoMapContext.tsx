import React, { createContext, useContext, useEffect, useState, ReactNode } from "react"
import { ExtensionMessage } from "@roo/ExtensionMessage"
import { RepoMapData } from "../utils/mapLayout"

export interface RepoMapContextType {
	repoMapData: RepoMapData | null
	setRepoMapData: (data: RepoMapData | null) => void
}

const RepoMapContext = createContext<RepoMapContextType | undefined>(undefined)

export const RepoMapProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [repoMapData, setRepoMapData] = useState<RepoMapData | null>(null)

	useEffect(() => {
		const handleMessage = (event: MessageEvent) => {
			const message: ExtensionMessage = event.data
			if (message.type === "repoMapUpdate") {
				try {
					const data = typeof message.text === "string" ? JSON.parse(message.text) : message.payload
					setRepoMapData(data)
				} catch (e) {
					console.error("Failed to parse repo map data", e)
				}
			}
		}

		window.addEventListener("message", handleMessage)
		return () => window.removeEventListener("message", handleMessage)
	}, [])

	return <RepoMapContext.Provider value={{ repoMapData, setRepoMapData }}>{children}</RepoMapContext.Provider>
}

export const useRepoMap = () => {
	const context = useContext(RepoMapContext)
	if (context === undefined) {
		throw new Error("useRepoMap must be used within a RepoMapProvider")
	}
	return context
}
