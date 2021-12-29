import { useState } from 'react'
import { useRouter } from 'next/router'
import IconSpin from "./icons/IconSpin"
import IconMenu from "./icons/IconMenu"
import IconBack from "./icons/IconBack"
import SidebarMenu from './SidebarMenu'

function ScreenLoading() {
	return (
		<div className="flex w-full h-full justify-center">
			<IconSpin className="w-12 h-12 text-slate-400 absolute inset-y-1/3" />
		</div>
	)
}

function Screen({ title, titleIcon, isLoading, rightAction, children, root, withBottomSpace }) {
	const [sidebarOpen, setSidebarOpen] = useState(false)

	const router = useRouter()

	return (
		<div className="flex flex-col h-screen">
			{root && (
				<SidebarMenu open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
			)}
			<header className='flex flex-row p-2 items-center'>
				<div className="mr-4 ml-1">
					{!root && (
						<IconBack className="w-4 h-4" onClick={router.back} />
					)}
					{root && (
						<IconMenu className="w-5 h-5" onClick={() => setSidebarOpen(true)} />
					)}
				</div>
				<div className='flex-1 text-lg font-semibold flex items-center'>
					{titleIcon && <span className="mr-2">{titleIcon}</span>}
					<span>{title}</span>
				</div>
				{rightAction && !isLoading && rightAction}
			</header>
			<div className="flex-1 overflow-y-auto">
				{isLoading 
					? <ScreenLoading /> 
					:  <div className='flex-1 w-full h-full'>{children}</div>
				}
			</div>
		</div>
	)
}

export default Screen