import IconSpin from "./icons/IconSpin"

function ScreenLoading() {
	return (
		<div className="flex w-full h-full justify-center">
			<IconSpin className="w-12 h-12 text-slate-400 absolute inset-y-1/3" />
		</div>
	)
}

function Screen({ title, isLoading, rightAction, children }) {
	return (
		<div className="flex flex-col h-screen">
			<header className='flex flex-row p-2'>
				<div className='flex-1 text-lg font-semibold'>{title}</div>
				{rightAction && !isLoading && rightAction}
			</header>
			<div className="flex-1 overflow-y-auto">
				{isLoading ? <ScreenLoading /> : children}
			</div>
		</div>
	)
}

export default Screen