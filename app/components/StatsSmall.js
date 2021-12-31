import { useStatsDetailsScreenAsModal } from "./StatsDetailsScreenAsModal"
import { valueToModifier, valueToModifierLabel } from "../modules/stats"
import useDice from "./useDice";
import useI18n from "../modules/i18n/useI18n";

function Stat({ label, shortcut, value }) {
	const { tr } = useI18n()
	const { rollStat } = useDice()
	const modifierLabel = valueToModifierLabel(value)

	// TODO: run dice
	return (
		<div className="flex flex-col items-center pr-4 pointer-cursor">
			<div className='uppercase text-slate-600' style={{ fontSize: 10 }}>{shortcut}</div>
			<div 
				className="text-2xl" 
				style={{ marginLeft: -4 }}
				onClick={() => 
					rollStat(tr(label), value)
				}
			>
				{modifierLabel}
			</div>
			<div className="text-sm">{value}</div>
		</div>
	)
}

function StatsSmall({ stats, withDetail }) {
	const { showStatsDetailsScreenModal } = useStatsDetailsScreenAsModal()
	return (
		<>
			<div className="flex justify-between w-full">
				<Stat shortcut="STR" value={stats.STR} />
				<Stat shortcut="DEX" value={stats.DEX} />
				<Stat shortcut="CON" value={stats.CON} />
				<Stat shortcut="INT" value={stats.INT} />
				<Stat shortcut="WIS" value={stats.WIS} />
				<Stat shortcut="CHA" value={stats.CHA} />
			</div>
			{withDetail && (
				<span 
					className="flex justify-end mt-2 mr-2 text-xs uppercase"
					onClick={() => showStatsDetailsScreenModal(stats)}
				>
					Détail
				</span>
			)}
		</>
	)
}

export default StatsSmall