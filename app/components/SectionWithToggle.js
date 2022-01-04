import { useState } from "react"
import clsx from 'clsx'
import IconChevronToggle from "./icons/IconChevronToggle"

function SectionWithToggle({ title, className, children }) {
	const [open, setOpen] = useState(false)

	return (
		<div className="shadow-md">
			{/* <div className={clsx("flex bg-slate-800 text-white px-2 py-1 w-full justify-between", className)} onClick={() => setOpen(!open)}> */}
			<div 
				className={clsx(`flex border border-solid border-slate-100 dark:border-gray-50 
			text-black px-2 py-1 w-full justify-between rounded-sm dark:text-white`, className)}
				onClick={() => setOpen(!open)}
			>
				<h4 className="text-md">{title}</h4>
				<span>
					<IconChevronToggle open={open} className="text-gray-600 dark:text-gray-400" />
				</span>
			</div>
			{open && (
				<div className="bg-slate-50 bg-dark">
					{children}
				</div>
			)}
		</div>
	)
}

export default SectionWithToggle