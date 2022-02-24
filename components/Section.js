import { useState } from "react"
import clsx from "clsx"
import IconChevronToggle from "./icons/IconChevronToggle"

function Section({ title, children, withToggle, className, show: showParam = false, sticky = false }) {
	const [show, setShow] = useState(withToggle ? showParam : true)
	return (
		<div className="pt-2 mt-2 relative">
			<h3 
				className={clsx(
					"mb-2 font-semibold border-b border-solid border-slate-200 flex justify-between",
					{
						"cursor-pointer": withToggle,
						"sticky top-0 bg-app z-20": sticky
					},
					className
				)}
				onClick={() => withToggle && setShow(!show)} 
			>
				<span key="title">{title}</span>
				{withToggle && <IconChevronToggle  key="IconChevronToggle" open={show} onClick={() => setShow(!show)} />}
			</h3>
			{show && <div>{children}</div>}
		</div>
	)
}

export default Section