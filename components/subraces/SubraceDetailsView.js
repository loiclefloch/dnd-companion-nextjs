import { createElement } from "react"

import HighElf from "./high-elf.mdx"

function SubraceDetailsView({ subrace }) {
	const view = {
		'high-elf': HighElf
	}

	if (!view[subrace]) {
		return <p>Not yet created</p>
		// throw new Error(`Race not handled: ${subrace}`)
	}
	return createElement(view[subrace])
}

export default SubraceDetailsView