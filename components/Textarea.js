import clsx from "clsx"

function Textarea({ rows = 6, className, ...props }) {
	return (
		<textarea 
			className={clsx("w-full p-2 border border-solid rounded-sm border-slate-300", className)}
			rows={rows}
			{...props}
		/>
	)
}

export default Textarea