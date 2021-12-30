import clsx from "clsx"

import IconChevronRight from "./icons/IconChevronRight"

export function ListSelectRow({ icon, image, title, subtitle, onClick }) {
	const hasLeftPart = !!(icon || image)
	return (
		<li className="flex flex-row" onClick={onClick}>
			<div className="select-none cursor-pointer flex flex-1 items-center p-4">
				{hasLeftPart && (
					<div className="flex flex-col w-10 h-10 justify-center items-center mr-4">
						{image && <img src={image} />}
						{icon && icon}
						</div>
					)}

				<div className="flex-1 pl-1 mr-16">
					<div className="font-medium dark:text-white">{title}</div>
					<div className="text-gray-600 dark:text-gray-200 text-sm">{subtitle}</div>
				</div>

				<div className="">
					<IconChevronRight className="hover:text-gray-800 dark:hover:text-white dark:text-gray-200 text-gray-500" />
				</div>
			</div>
		</li>
	)
}

export function ListSelectRowAsCard({ icon, image, title, subtitle, onClick }) {
	const hasLeftPart = !!(icon || image)
	return (
		<li className="border-gray-400 flex flex-row mb-2" onClick={onClick}>
			<div className="shadow border select-none cursor-pointer bg-white dark:bg-gray-800 rounded-md flex flex-1 items-center p-4">
				{hasLeftPart && (
					<div className="flex flex-col w-10 h-10 justify-center items-center mr-4">
						{image && <img src={image} />}
						{icon && icon}
						</div>
					)}

				<div className="flex-1 pl-1 mr-16">
					<div className="font-medium dark:text-white">{title}</div>
					<div className="text-gray-600 dark:text-gray-200 text-sm">{subtitle}</div>
				</div>

				<div className="">
					<IconChevronRight className="hover:text-gray-800 dark:hover:text-white dark:text-gray-200 text-gray-500" />
				</div>
			</div>
		</li>
	)
}

export function ListRowSelectContainer({ className, children }) {
	return (
		// <ul className='flex flex-col divide divide-y container'>
		<ul className={clsx(className, 'flex flex-col container')}>
			{children}
		</ul>
	)
}
