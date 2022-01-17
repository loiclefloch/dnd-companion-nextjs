import { useStatsDetailsScreenAsModal } from "./StatsDetailsScreenAsModal"
import { valueToModifierLabel } from "../modules/stats"
import useDice from "./useDice";
import useTipAbilityScore from "./useTipAbilityScore";
import useI18n from "../modules/i18n/useI18n";

function Stat({ label, shortcut, value }) {
	const { tr } = useI18n()
	const { rollStat } = useDice()
	const { showTipAbilityScore } = useTipAbilityScore()
	const modifierLabel = valueToModifierLabel(value)

	return (
		<div className="flex flex-col items-center pr-4 pointer-cursor">
			<div 
				className='uppercase text-slate-600' 
				style={{ fontSize: 10 }}
				onClick={() => showTipAbilityScore(shortcut)}
			>
				{shortcut}
			</div>
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

function StatsSmall({ stats, skills, withDetail }) {
	const { tr } = useI18n()
	const { showStatsDetailsScreenModal } = useStatsDetailsScreenAsModal()
	return (
		<>
			<div className="flex justify-between w-full">
				<Stat label={tr("STR")} shortcut="STR" value={stats.STR} />
				<Stat label={tr("DEX")} shortcut="DEX" value={stats.DEX} />
				<Stat label={tr("CON")} shortcut="CON" value={stats.CON} />
				<Stat label={tr("INT")} shortcut="INT" value={stats.INT} />
				<Stat label={tr("WIS")} shortcut="WIS" value={stats.WIS} />
				<Stat label={tr("CHA")} shortcut="CHA" value={stats.CHA} />
			</div>
			{withDetail && (
				<span 
					className="flex justify-end mt-2 mr-2 text-xs uppercase"
					onClick={() => showStatsDetailsScreenModal(skills)}
				>
					Détail
				</span>
			)}
		</>
	)
}

export default StatsSmall