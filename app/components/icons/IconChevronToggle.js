import { createElement } from "react"

import IconChevronUp from "./IconChevronUp"
import IconChevronDown from "./IconChevronDown"

function IconChevronToggle({ open, ...props }) {
	const icon = open ? IconChevronUp : IconChevronDown

	return createElement(icon, {...props})
}

export default IconChevronToggle