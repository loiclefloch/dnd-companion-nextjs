import createIcon from "./createIcon"

export default createIcon('IconCheck', () => (
	<>
		<circle cx="12" cy="12" r="12" fill="#fff" opacity="0.2"></circle>
		<path d="M7 13l3 3 7-7" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
	</>
), { viewBox: '0 0 24 24', fill: "none" })