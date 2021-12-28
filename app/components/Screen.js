
function ScreenLoading() {
	return (<div>LOADING</div>)
}

function Screen({ title, isLoading, rightAction, children }) {
	return (
		<div className="flex flex-col h-screen">
			<header className='flex flex-row p-2'>
				<div className='flex-1 text-lg font-semibold'>{title}</div>
				{rightAction && rightAction}
			</header>
			<div className="flex-1 overflow-y-auto">
				{isLoading ? <ScreenLoading /> : children}
			</div>
		</div>
	)
}

export default Screen