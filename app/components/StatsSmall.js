const valueToModifier = {
	1: -5,
	2: -4,
	3: -4,
	4: -3,
	5: -3,
	6: -2,
	7: -2,
	8: -1,
	9: -1,
	10: 0,
	11: 1,
	12: 1,
	13: 1,
	14: 2,
	15: 2,
	16: 3,
	17: 3,
	18: 4,
	19: 4,
	20: 5,
	21: 5,
	22: 6,
	23: 6,
	24: 7,
	25: 7,
	26: 8,
	27: 8,
	28: 9,
	29: 9,
	30: 10,
}

function Stat({ label, shortcut, value }) {
	const modifier = valueToModifier[value]
	// TODO: run dice
	return (
		<div className="flex flex-col items-center pointer-cursor pr-4">
			<div className='uppercase text-slate-600' style={{ fontSize: 10 }}>{shortcut}</div>
			<div className="text-2xl" style={{ marginLeft: -4 }}>{modifier >= 0 && "+"}{modifier}</div>
			<div className="text-sm">{value}</div>
		</div>
	)
}

function StatsSmall({ stats }) {
	return (
		<div className="flex w-full justify-between">
			<Stat shortcut="STR" value={stats.STR} />
			<Stat shortcut="DEX" value={stats.DEX} />
			<Stat shortcut="CON" value={stats.CON} />
			<Stat shortcut="INT" value={stats.INT} />
			<Stat shortcut="WIS" value={stats.WIS} />
			<Stat shortcut="CHA" value={stats.CHA} />
		</div>
	)
}

export default StatsSmall