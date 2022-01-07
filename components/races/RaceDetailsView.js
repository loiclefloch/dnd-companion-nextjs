import { createElement } from "react"
import Elf from "./Elf"

function RaceDetailsView({ race }) {
	const view = {
		elf: Elf
	}

	if (!view[race]) {
		throw new Error(`Race not handled: ${race}`)
	}
	return createElement(view[race])
}

export default RaceDetailsView