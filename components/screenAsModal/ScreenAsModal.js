import IconX from '../icons/IconX'

function ScreenAsModal({ title, onCloseScreen, children }) {
	return (
		<div className='flex flex-col h-screen bg-app'>
			<header className='flex flex-row p-2'>
				<div className='flex-1 text-lg font-semibold text-center'>{title}</div>
				<div className='flex'>
					<button onClick={onCloseScreen}><IconX className="w-5 h-5" /></button>
				</div>
			</header>
			<div className='flex-1 overflow-y-auto'>
				{children}
			</div>
		</div>
	)
}

export default ScreenAsModal