import clsx from 'clsx'

function BottomScreen({ children, className, ...props }) {
	return (
		<div className={clsx("absolute bottom-0 left-0 right-0 flex justify-center w-full bg-white text-slate-800 uppercase", className)} {...props}>
			{children}
		</div>
	)
}

export default BottomScreen