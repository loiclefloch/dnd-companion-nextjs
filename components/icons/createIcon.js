import { createElement } from "react"
import clsx from "clsx"

// icons from https://heroicons.com/

const createIcon = (IconName, Component,  { className: creationClassName, ...creationProps } = {}) => {
	const Icon = ({ className, children, ...props }) => {
		return (
			<svg xmlns="http://www.w3.org/2000/svg" className={clsx(creationClassName, className)} {...creationProps} {...props}>
				{createElement(Component)}
			</svg>
		)
	}

	Icon.displayName = IconName
	return Icon
}

export default createIcon