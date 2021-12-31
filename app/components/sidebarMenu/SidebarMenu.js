import clsx from "clsx"
import Link from "next/link"
import { useRouter } from 'next/router'

import IconBookOpen from "../icons/IconBookOpen"
import IconUsers from "../icons/IconUsers"
import IconGear from "../icons/IconGear"
import IconHome from "../icons/IconHome"
import IconQuestionMark from "../icons/IconQuestionMark"
import IconX from "../icons/IconX"

function Item({ href = "", icon, label }) {
	const router = useRouter()
	const selected = href === "/" ? router.asPath === "/" : router.asPath.startsWith(href)

	return (
		<Link href={href}>
			<a
				className={clsx("w-full font-thin uppercase flex items-centerflex items-center transition-colors duration-200 justify-start p-4 my-2 border-solid", {
				 "text-blue-500 bg-gradient-to-r border-r-4 border-blue-500 from-gray-700 to-gray-800": selected,
				 "text-gray-200 hover:text-blue-500": !selected
			 })}
				href="#"
			>
				<span className="text-left">
					{icon}
				</span>
				<span className="mx-4 text-sm font-normal">
					{label}
				</span>
			</a>
		</Link>
	)
}

function SidebarMenu({ show, onClose }) {
	return (
		<>
			{/* right transparant panel TODO: fix */}
			<div
				onClick={onClose}
				style={{ zIndex: 49 }} // z-50 - 1
				className={clsx("fixed left-0 right-0 top-0 bottom-0 h-screen bg-slate-900",
					"transform ease-linear transition-all", {
					"opacity-50 duration-1000 visible": show,
					"opacity-0 duration-500 hidden": !show,
				})}
			>&nbsp;</div>
			<div
				className={clsx("h-screen lg:block shadow-lg fixed flex z-50 w-5/6",
					"transform ease-in-out transition-all duration-300", {
					"translate-x-0": show,
					"-translate-x-full": !show,
				})}
			>
				<div className="z-50 w-full h-screen bg-gray-700 dark:bg-gray-700">

					<div className="flex">
						<div className="items-center justify-center flex-1 pt-6">
							{/* ICON */}
						</div>
						<div className="px-2 pt-2" onClick={onClose}>
							<IconX 
								className={clsx("w-6 h-6 text-white",
									"transform ease-in-out transition-all", {
									"opacity-100 duration-700": show,
									"opacity-0 duration-100": !show,
								})}
							/>
						</div>
					</div>

					<nav className="flex flex-col h-full pt-6">
						<div>
							<Item href="/" label="Dashboard" icon={<IconHome className="w-6 h-6" />} />
							<Item href="/characters" label="Characters" icon={<IconUsers className="w-6 h-6" />} />
							<Item href="/spells" label="Sorts" icon={<IconBookOpen className="w-6 h-6" />} />
							<Item href="/monsters" label="Monstres" icon={<IconBookOpen className="w-6 h-6" />} />
						</div>
						<div className="flex flex-col justify-end flex-1 w-full pb-8 my-4 flex-end">
							<Item href="/support" label="Support" icon={<IconQuestionMark className="w-6 h-6" />} />
							<Item href="/settings" label="Settings" icon={<IconGear className="w-6 h-6" />} />
						</div>
					</nav>
				</div>
			</div>
		</>
	)
}

export default SidebarMenu