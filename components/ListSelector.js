import clsx from "clsx"
import { toggleValueOnArray } from "../modules/utils/array"

function ListSelectorRow({
	label,
	selected,
	rightView,
	disabled,
	onClick,
}) {
	return (
		<div 
			className="flex items-center w-full p-2 py-1 select-none"
		>
			<div className="w-8">
				<div
					className={clsx("w-4 h-4 cursor-pointer", {
						"border border-solid rounded-full border-slate-400": !selected,
						"border border-solid rounded-full border-blue-400 bg-blue-400": selected,
					})}
					onClick={onClick}
				/>
			</div>
			<div
				onClick={onClick}
				className={clsx("flex flex-1 cursor-pointer", {
					"text-gray-400": disabled,
				})}
			>
				{label}
			</div>
			<div>{rightView}</div>
		</div>
	)
}

function ListSelector({ value, options, onChange, multiple = false, nbMaxValues = null }) {
	return (
		<div className="relative w-full gap-2 px-2 divide-y divider">
			{options?.map(option => (
				<ListSelectorRow 
					key={option.key || `${JSON.stringify(option.value)}`}
					label={option.label} 
					selected={option.selected}
					rightView={option.rightView}
					disabled={option.disabled}
					onClick={() => {
						if (option.disabled) {
							return
						}
						if (multiple) {
							const updated = toggleValueOnArray(value, option.value, a => a)
							if (!nbMaxValues) {
								onChange(updated)
							} else {
								if (updated.length > nbMaxValues) {
									// remove older selected value
									onChange(updated.reverse().slice(0, nbMaxValues).reverse())
								} else {
									onChange(updated)
								}
							}
						} else {
							onChange(option.value)
						}
					}} 
				/>
			))}
		</div>
	)
}

ListSelector.Row = ListSelectorRow

export default ListSelector