import { useState } from "react"
import clsx from "clsx"
import IconChevronToggle from "./icons/IconChevronToggle"

function Section({ title, children, withToggle, className, show: showParam = false }) {
	const [show, setShow] = useState(withToggle ? showParam : true)
	return (
		<div className="pt-2 mt-2">
			<h3 
				className={clsx(
					"mb-2 font-semibold border-b border-solid border-slate-200 flex justify-between",
					{
						"cursor-pointer": withToggle
					},
					className
				)}
				onClick={() => withToggle && setShow(!show)} 
			>
				{title}
				{withToggle && <IconChevronToggle open={show} onClick={() => setShow(!show)} />}
			</h3>
			{show && <div>{children}</div>}
		</div>
	)
}

export default Section