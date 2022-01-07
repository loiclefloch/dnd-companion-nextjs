import { createElement } from "react"
import get from "lodash/get"

import DruidLevel2 from "./DruidLevel2.mdx"

function LevellingDetail({ level, clss, ...otherProps }) {
	const map = {
		druid: {
			2: DruidLevel2
		}
	}


	const detail = get(map, [ clss.index, level])

	if (!detail) {
		return <p>No specific details about this level</p>
	}

	return createElement(detail, otherProps)
}

export default LevellingDetail