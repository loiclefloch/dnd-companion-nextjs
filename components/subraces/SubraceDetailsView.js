import { createElement } from "react"

function SubraceDetailsView({ subrace }) {
	const view = {
	}

	if (!view[subrace]) {
		return null
		// throw new Error(`Race not handled: ${subrace}`)
	}
	return createElement(view[subrace])
}

export default SubraceDetailsView