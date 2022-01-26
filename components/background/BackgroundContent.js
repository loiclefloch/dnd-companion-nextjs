
import { createElement } from "react"
import useBackground from "../../modules/api/useBackground"
import acolyte from "./acolyte.mdx"
import criminal from "./criminal.mdx"
import folkHero from "./folk-hero.mdx"
import sage from "./sage.mdx"

function Content({ index }) {
	const backgroundResponse = useBackground(index)

	// TODO: display data
	// - good_for_classes
	// - starting_proficiencies
	// - starting_proficiency_options
	// - language_options
	// - starting_currencies
	// - starting_equipment
	// - starting_equipment_options
	// - feature
	// - personality_traits
	// - ideals
	// - bonds
	// - flaws
	return null
}

function BackgroundContent({ index }) {
	const map = {
		acolyte: acolyte,
		criminal: criminal,
		'folk-hero': folkHero,
		sage: sage,
	}

	const View = map[index]
	if (View) {
		return <div className="prose"><View /> <Content index={index} /></div>
	}

	return <p>Background not created yet</p>
}

export default BackgroundContent