import IconX from '../icons/IconX'

function ScreenAsModal({ title, onCloseScreen, children }) {
	return (
		<div className='flex flex-col h-screen'>
			<header className='flex flex-row p-2'>
				<div className='flex-1 text-lg font-semibold'>{title}</div>
				<div>
					<button onClick={onCloseScreen}><IconX className="h-5 w-5" /></button>
				</div>
			</header>
			<div className='flex=1 overflow-y-auto'>
				{children}
			</div>
		</div>
	)
}

export default ScreenAsModal