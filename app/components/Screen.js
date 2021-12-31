import clsx from 'clsx'
import { useRouter } from 'next/router'
import IconSpin from "./icons/IconSpin"
import IconBack from "./icons/IconBack"
import useCharacterMenu from "./characterMenu/useCharacterMenu";
import useSidebarMenu from "./sidebarMenu/useSidebarMenu";
import IconMenu from "./icons/IconMenu"
import IconUser from "./icons/IconUser"
import useScreenAsModal from './screenAsModal/useScreenAsModal';

function ScreenLoading() {
	return (
		<div className="flex justify-center w-full h-full">
			<IconSpin className="absolute w-12 h-12 text-slate-400 inset-y-1/3" />
		</div>
	)
}

function CharacterMenuButton() {
	const { show: sidebarMenuShown } =  useSidebarMenu()
	const { show: screenAsModalShown } = useScreenAsModal()
  const { show: characterMenuShown, showCharacterMenu } = useCharacterMenu()

  const hideButton = characterMenuShown || sidebarMenuShown || screenAsModalShown

  // do not display if character menu is open
  return (
    <button 
      className={clsx("fixed z-40 bottom-0 right-0 flex justify-center w-10 p-2 bg-slate-800 text-white uppercase rounded-tl", {
        "opacity-100 duration-500": !hideButton,
        "opacity-0 duration-500": hideButton,
      })}
      onClick={showCharacterMenu}
    >
      <IconUser className="w-5 h-5" />
    </button>
  )
}

function Screen({ 
	title, 
	titleIcon, 
	isLoading, 
	rightAction,
	children, 
	root, 
	fullScreen, 
	withBottomSpace = false, 
	iconClassName, 
	withCharacterMenu 
}) {
	const { show: sidebarMenuShown, showSidebarMenu } =  useSidebarMenu()

	const router = useRouter()

	return (
		<div className="flex flex-col h-screen bg-dark dark:text-white">
			<header className={clsx('flex flex-row p-2 items-center', { "absolute z-40": fullScreen, "hidden": /* TRICK */fullScreen && sidebarMenuShown })}>
				<div className="ml-1 mr-4">
					{!root && (
						<IconBack className={clsx("w-4 h-4", iconClassName)} onClick={router.back} />
					)}
					{root && (
						<IconMenu className={clsx("w-5 h-5", iconClassName)} onClick={showSidebarMenu} />
					)}
				</div>
				{!fullScreen && (
					<div className='flex items-center flex-1 text-lg font-semibold select-none'>
						{titleIcon && <span className="mr-2">{titleIcon}</span>}
						<span>{title}</span>
					</div>
				)}
				{rightAction && !isLoading && rightAction}
			</header>

			<div className="flex-1 overflow-y-auto">
				{isLoading
					? <ScreenLoading />
					: (
						<div
							className={clsx(
								'flex-1 w-full',
								// "h-full",
								{
									'pb-12': withBottomSpace
								}
							)}
						>
							{children}
						</div>
					)}
			</div>

			{withCharacterMenu && <CharacterMenuButton />}
		</div>
	)
}

export default Screen