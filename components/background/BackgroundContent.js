
import { createElement } from "react"
import acolyte from "./acolyte.mdx"

function BackgroundContent({ index }) {
	const map = {
		acolyte: acolyte,
	}

	const View = map[index]
	if (View) {
		return <div className="prose"><View /></div>
	}

	return <p>Background nto created yet</p>
}

export default BackgroundContent