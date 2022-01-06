import { createElement, forwardRef } from 'react';
// import clsx from "clsx"

/**
 * Verify we are correctly using our className to prepare for react-native.
 */
function checkClassName(className = '') {
	const classes = className.split(' ')
	if (classes.includes('flex')) {
		if (!classes.includes('flex-col') && !classes.includes('flex-row')) {
			console.warn(`Flex direction missing (flex-row)`)
		}
	}
}

function createNativeElement(displayName, nativeView, check) {

	function buildView({ className, children, ...props }) {
		const buildedClassName = className

		checkClassName(className)
		if (check) {
			check(props, children)
		}

		const elem = createElement(
			nativeView, 
			{ 
				// displayName,
				...props, 
				// 'data-display-name': displayName,
				className: buildedClassName
			}, 
			children
		)

			// elem.displayName = name
			return elem
	}

	return forwardRef(function Element(props, ref) {
		const View = buildView({ ref, ...props })
		return View
	})
}

export default createNativeElement