import { useState } from "react"

const ZCodeHero = () => {
	const [imagesBaseUri] = useState(() => {
		const w = window as any
		return w.IMAGES_BASE_URI || ""
	})

	return (
		<div className="mb-4 relative forced-color-adjust-none group flex flex-col items-center w-full pt-4">
			<div className="flex items-center gap-3">
				<img src={imagesBaseUri + "/roo-logo.svg"} alt="Z Code logo" className="h-12 w-12" />
				<span className="text-3xl font-bold tracking-tighter" style={{ color: "var(--vscode-foreground)" }}>Z CODE</span>
			</div>
			<div className="mt-2 text-sm opacity-70">The Last Editor for Francis Architecture.</div>
		</div>
	)
}

export default ZCodeHero
