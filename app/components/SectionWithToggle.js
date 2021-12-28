import { useState } from "react"
import clsx from 'clsx'
import IconChevronUp from "./icons/IconChevronUp"
import IconChevronDown from "./icons/IconChevronDown"

function SectionWithToggle({ title, className, children }) {
	const [open, setOpen] = useState(false)

	const Icon = open ? IconChevronUp : IconChevronDown 

	return (
		<div className="shadow-md">
			{/* <div className={clsx("flex bg-slate-800 text-white px-2 py-1 w-full justify-between", className)} onClick={() => setOpen(!open)}> */}
			<div className={clsx("flex border border-solid border-slate-100 text-black px-2 py-1 w-full justify-between rounded-sm", className)} onClick={() => setOpen(!open)}>
				<h4 className="text-md">{title}</h4>
				<span>
					<Icon className="text-gray-600" />
				</span>
			</div>
			{open && (
				<div className="bg-slate-50 pb-4">
					{children}
				</div>
			)}
		</div>
	)
}

export default SectionWithToggle