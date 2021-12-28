import { useRouter } from 'next/router'
import IconSpin from "./icons/IconSpin"
import IconMenu from "./icons/IconMenu"
import IconBack from "./icons/IconBack"

function ScreenLoading() {
	return (
		<div className="flex w-full h-full justify-center">
			<IconSpin className="w-12 h-12 text-slate-400 absolute inset-y-1/3" />
		</div>
	)
}

function Screen({ title, isLoading, rightAction, children, root, withBottomSpace }) {
	const router = useRouter()

	return (
		<div className="flex flex-col h-screen">
			<header className='flex flex-row p-2 items-center'>
				<div className="mr-4 ml-1">
					{!root && (
						<IconBack className="w-4 h-4" onClick={router.back} />
					)}
					{root && (
						<IconMenu className="w-5 h-5" onClick={() => {}} />
					)}
				</div>
				<div className='flex-1 text-lg font-semibold'>{title}</div>
				{rightAction && !isLoading && rightAction}
			</header>
			<div className="flex-1 overflow-y-auto">
				{isLoading ? <ScreenLoading /> : children}
			</div>
			<div className='pb-12' />
		</div>
	)
}

export default Screen