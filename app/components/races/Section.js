

function Section({ title, children }) {
	return (
		<div className="mt-12">
			<h4 className="text-lg font-semibold">{title}</h4>
			<div className="mt-2">{children}</div>
		</div>
	)
}

export default Section