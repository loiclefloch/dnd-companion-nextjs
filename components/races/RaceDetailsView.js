import { createElement } from "react"

import elf from "./elf.mdx"
import dwarf from "./dwarf.mdx"


function RaceDetailsView({ race }) {
	const view = {
		elf: elf,
		dwarf: dwarf
	}

	if (!view[race]) {
		return <p>Not yet created</p>
		// throw new Error(`Race not handled: ${race}`)
	}
	return createElement(view[race])
}

export default RaceDetailsView