
function Section({ title, children }) {
	return (
		<div className="pt-2 mt-2">
			<h3 className="mb-2 font-semibold border-b border-solid border-slate-200">{title}</h3>
			<div>{children}</div>
		</div>
	)
}

export default Section