import clsx from "clsx"

import IconChevronRight from "./icons/IconChevronRight"

export function ListSelectRow({ icon, image, title, subtitle, onClick }) {
	const hasLeftPart = !!(icon || image)
	return (
		<li className="flex flex-row" onClick={onClick}>
			<div className="flex items-center flex-1 p-4 cursor-pointer select-none">
				{hasLeftPart && (
					<div className="flex flex-col items-center justify-center w-10 h-10 mr-4">
						{image && <img src={image} />}
						{icon && icon}
						</div>
					)}

				<div className="flex-1 pl-1 mr-16">
					<div className="font-medium dark:text-white">{title}</div>
					<div className="text-sm text-gray-600 dark:text-gray-200">{subtitle}</div>
				</div>

				<div className="">
					<IconChevronRight className="text-gray-500 hover:text-gray-800 dark:hover:text-white dark:text-gray-200" />
				</div>
			</div>
		</li>
	)
}

export function ListSelectRowAsCard({ icon, image, title, subtitle, onClick, size = "medium" }) {
	const hasLeftPart = !!(icon || image)
	return (
		<li className="flex flex-row mb-2 border-gray-400" onClick={onClick}>
			<div className={clsx("flex items-center flex-1  bg-white border rounded-md shadow cursor-pointer select-none dark:bg-gray-800", {
				"p-4": size === "medium",
				"p-2": size === "small",
			})}>
				{hasLeftPart && (
					<div className="flex flex-col items-center justify-center w-10 h-10 mr-4">
						{image && <img src={image} />}
						{icon && icon}
						</div>
					)}

				<div className="flex-1 pl-1 mr-16">
					<div className="font-medium dark:text-white">{title}</div>
					<div className="text-sm text-gray-600 dark:text-gray-200">{subtitle}</div>
				</div>

				<div className="">
					<IconChevronRight className="text-gray-500 hover:text-gray-800 dark:hover:text-white dark:text-gray-200" />
				</div>
			</div>
		</li>
	)
}

export function ListRowSelectContainer({ className, children }) {
	return (
		// <ul className='container flex flex-col divide-y divide'>
		<ul className={clsx(className, 'flex flex-col container')}>
			{children}
		</ul>
	)
}
