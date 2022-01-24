
import { createElement } from "react"
import acolyte from "./acolyte.mdx"
import criminal from "./criminal.mdx"
import folkHero from "./folk-hero.mdx"

function BackgroundContent({ index }) {
	const map = {
		acolyte: acolyte,
		criminal: criminal,
		'folk-hero': folkHero
	}

	const View = map[index]
	if (View) {
		return <div className="prose"><View /></div>
	}

	return <p>Background not created yet</p>
}

export default BackgroundContent