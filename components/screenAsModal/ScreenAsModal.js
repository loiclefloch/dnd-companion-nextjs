import IconX from '../icons/IconX'
import IconSpin from "../icons/IconSpin"

function ScreenLoading() {
	return (
		<div className="flex justify-center w-full h-full">
			<IconSpin className="absolute w-12 h-12 text-slate-400 inset-y-1/3" />
		</div>
	)
}

function ScreenAsModal({ title, isLoading, onCloseScreen, children }) {
	return (
		<div className='flex flex-col h-screen bg-app'>
			<header className='flex flex-row p-2'>
				<div className='flex-1 text-lg font-semibold text-center'>{title}</div>
				<div className='flex'>
					<button onClick={onCloseScreen}><IconX className="w-5 h-5" /></button>
				</div>
			</header>
			<div className='flex-1 overflow-y-auto'>
			{isLoading
					? <ScreenLoading />
					: children
				}
			</div>
		</div>
	)
}

export default ScreenAsModal