import clsx from 'clsx'

function Button({ label, onClick }) {
	return <div className="px-2 cursor-pointer text-lg" onClick={onClick}>{label}</div>
}

function ChooseSpellLevel({ level, onChange, maxLevel, label = '' }) {
	const isAboveMaximum = level > maxLevel

	return (
		<div className="flex items-center select-none">
			<div className="text-xs">{label}</div>
			<Button label="-" onClick={() => onChange(level - 1)} />
			<div className={clsx("cursor-pointer", {
				"text-red-500": isAboveMaximum
			})}>{level}</div>
			<Button label="+" onClick={() => onChange(level + 1)} />
		</div>
	)
}

export default ChooseSpellLevel