import clsx from "clsx"

function LineInfoParent({ className, children }) {
	return (
		<div className={clsx(className, "divide divide-y px-4")}>
			{children}
		</div>
	)
}

function LineInfo({ label, value, onClick, onClickValue }) {
	return (
		<div 
			onClick={onClick}
			className="flex py-1"
		>
			<div className="flex flex-1">{label}</div>
			<div onClick={onClickValue}>{value}</div>
		</div>
	)
}

function LineInfoParagraph({ label, value, onClick }) {
	return (
		<div 
			onClick={onClick}
			className="flex flex-col py-1 prose w-full pt-4"
		>
			<h4>{label}</h4>
			<p>{value}</p>
		</div>
	)
}

LineInfo.Parent = LineInfoParent
LineInfo.Paragraph = LineInfoParagraph

export default LineInfo