import { createElement } from "react"
import Druid from "./Druid"

function ClassDetailsView({ clss }) {
	const view = {
		druid: Druid 
	}

	if (!view[clss]) {
		throw new Error(`Class not handled: ${clss}`)
	}
	return createElement(view[clss])
}

export default ClassDetailsView