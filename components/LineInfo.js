import clsx from "clsx"

function LineInfoParent({ className, children }) {
	return (
		<div className={clsx(className, "divide divide-y px-4")}>
			{children}
		</div>
	)
}

function LineInfo({ label, value, onClick }) {
	return (
		<div 
			onClick={onClick}
			className="flex py-1"
		>
			<div className="flex flex-1">{label}</div>
			<div>{value}</div>
		</div>
	)
}

LineInfo.Parent = LineInfoParent

export default LineInfo