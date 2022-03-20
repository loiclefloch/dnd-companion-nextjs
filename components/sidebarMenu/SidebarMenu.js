import clsx from "clsx"
import Link from "next/link"
import { useRouter } from 'next/router'

import IconBookOpen from "../icons/IconBookOpen"
import IconUsers from "../icons/IconUsers"
import IconGear from "../icons/IconGear"
import IconHome from "../icons/IconHome"
import IconSupport from "../icons/IconSupport"
import IconX from "../icons/IconX"
import IconMonster from "../icons/IconMonster"
import IconGroup from "../icons/IconGroup"
import IconAcademicCap from "../icons/IconAcademicCap"

function Item({ href = "", icon, label, onClick }) {
	const router = useRouter()
	const selected = href === "/" ? router.asPath === "/" : router.asPath.startsWith(href)

	return (
		<Link href={href}>
			<a
				className={clsx("w-full font-thin uppercase flex items-centerflex items-center transition-colors duration-200 justify-start p-4 my-2 border-solid", {
				 "text-blue-500 bg-gradient-to-r border-r-4 border-blue-500 from-gray-700 to-gray-800 fill-blue-500": selected,
				 "text-gray-200 hover:text-blue-500 fill-white": !selected
			 })}
				href="#"
				onClick={onClick}
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
				className={clsx("fixed left-0 right-0 top-0 bottom-0 h-screen-all bg-slate-900",
					"transform ease-linear transition-all", {
					"opacity-50 duration-1000 visible": show,
					"opacity-0 duration-500 hidden": !show,
				})}
			>&nbsp;</div>
			<div
				className={clsx("h-screen-all lg:block shadow-lg fixed flex z-50 w-5/6",
					"transform ease-in-out transition-all duration-300 overflow-y-auto", {
					"translate-x-0": show,
					"-translate-x-full": !show,
				})}
			>
				<div className="z-50 flex flex-col w-full h-screen-all bg-gray-700 dark:bg-gray-700">

					<div className="flex">
						<div className="flex items-center justify-center flex-1 pt-2">
							{/* ICON */}
							<IconGroup className="w-28 text-stone-300" />
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

					<nav className="flex flex-col flex-1 pt-2">
						<div>
							<Item 
								href="/"
								label="Dashboard"
								icon={<IconHome className="w-6 h-6" />}
								onClick={onClose}
							/>
							<Item
								href="/characters"
								label="Personnages"
								icon={<IconUsers className="w-6 h-6" />}
								onClick={onClose}
							/>
							<Item
								href="/spells"
								label="Sorts"
								icon={<IconBookOpen className="w-6 h-6" />}
								onClick={onClose}
							/>
							<Item
								href="/monsters"
								label="Bestiaire"
								icon={<IconMonster className="w-6 h-6" />}
								onClick={onClose}
							/>
							<Item
								href="/equipment"
								label="Équipements"
								icon={<IconBookOpen className="w-6 h-6" />}
								onClick={onClose}
							/>
							<Item
								href="/rules"
								label="Règles"
								icon={<IconAcademicCap className="w-6 h-6" />}
								onClick={onClose}
							/>
						</div>
						<div className="flex flex-col justify-end flex-1 w-full flex-end">
							<Item 
								href="/support" 
								label="Support" 
								icon={<IconSupport className="w-6 h-6" />} 
								onClick={onClose} 
							/>
							<Item 
								href="/settings" 
								label="Paramètres" 
								icon={<IconGear className="w-6 h-6" />} 
								onClick={onClose} 
							/>
						</div>
					</nav>
				</div>
			</div>
		</>
	)
}

export default SidebarMenu