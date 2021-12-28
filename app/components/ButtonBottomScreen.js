import clsx from 'clsx'

function ButtonBottomScreen({ children, className, ...props }) {
	return (
		<button className={clsx("absolute bottom-0 left-0 right-0 flex justify-center w-full p-2 bg-white text-slate-800 uppercase border-t border-solid border-slate-300", className)} {...props}>
			{children}
		</button>
	)
}

export default ButtonBottomScreen