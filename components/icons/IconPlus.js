import createIcon from "./createIcon"

export default createIcon('IconPlus', () => (
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
), {
	viewBox: '0 0 24 24',
	stroke: 'currentColor',
	className: 'h-6 w-6'
})
