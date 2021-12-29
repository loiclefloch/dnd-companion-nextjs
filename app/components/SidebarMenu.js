import clsx from "clsx"
import Link from "next/link"
import { useRouter } from 'next/router'

import IconBookOpen from "./icons/IconBookOpen"
import IconUsers from "./icons/IconUsers"
import IconGear from "./icons/IconGear"
import IconHome from "./icons/IconHome"
import IconQuestionMark from "./icons/IconQuestionMark"
import IconX from "./icons/IconX"

function Item({ href = "", icon, label }) {
	const router = useRouter()
	const selected = href === "/" ? router.route === "/" : router.route.startsWith(href)

	return (
		<Link href={href}>
			<a
				className={clsx("w-full font-thin uppercase flex items-centerflex items-center transition-colors duration-200 justify-start p-4 my-2 border-solid", {
				 "text-blue-500 bg-gradient-to-r from-white to-blue-100 border-r-4 border-blue-500 dark:from-gray-700 dark:to-gray-800": selected,
				 "text-gray-500 dark:text-gray-200 hover:text-blue-500": !selected
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

function SidebarMenu({ open, onClose }) {
	return (
		<div 
			className={clsx("h-screen lg:block shadow-lg fixed w-100 bg-gray-400 flex z-50",
				"transform ease-in-out transition-all duration-300", {
				"translate-x-0": open,
				"-translate-x-full": !open,
			})}
		>
			<div className="bg-white h-screen dark:bg-gray-700 w-80">

				<div className="flex">
					<div className="items-center justify-center pt-6 flex-1">
						{/* ICON */}
					</div>
					<div className="pt-2 px-2" onClick={onClose}>
						<IconX className={clsx("w-6 h-6 text-white", 
							"transform ease-in-out transition-all", {
								"opacity-100 duration-700": open,
								"opacity-0 duration-100": !open,
						})} />
					</div>
				</div>

				<nav className="mt-6">
					<div>
						<Item href="/" label="Dashboard" icon={<IconHome className="w-6 h-6" />} />
						<Item href="/characters" label="Characters" icon={<IconUsers className="w-6 h-6" />} />
						<Item href="/spells" label="Sorts" icon={<IconBookOpen className="w-6 h-6" />} />
						<Item href="/monsters" label="Monsters" icon={<IconBookOpen className="w-6 h-6" />} />
					</div>
				</nav>
				<div class="absolute bottom-0 my-4 w-full">
					<Item href="/support" label="Support" icon={<IconQuestionMark className="w-6 h-6" />} />
					<Item href="/settings" label="Settings" icon={<IconGear className="w-6 h-6" />} />
				</div>
			</div>

			{/* right transparant panel TODO: fix */}
			{/* <div className="w-20 h-screen bg-transparent" onClick={onClose}>&nbsp;</div> */}
		</div>
	)
}

export default SidebarMenu