import clsx from 'clsx'

import IconPlusMd from "./icons/IconPlusMd"
import IconMinusMd from "./icons/IconMinusMd"

function Button({ label, onClick }) {
	return <div className="px-2 text-lg cursor-pointer" onClick={onClick}>{label}</div>
}

function ChooseNumber({ level, onChange, maxLevel, label = '' }) {
	const isAboveMaximum = level > maxLevel

	return (
		<div className="flex items-center select-none">
			<div className="text-xs">{label}</div>
			<Button size="big" label={<IconMinusMd />} onClick={() => onChange(level - 1)} />
			<div className={clsx("cursor-pointer", {
				"text-red-500": isAboveMaximum
			})}>{level}</div>
			<Button size="big" label={<IconPlusMd />} onClick={() => onChange(level + 1)} />
		</div>
	)
}

export default ChooseNumber