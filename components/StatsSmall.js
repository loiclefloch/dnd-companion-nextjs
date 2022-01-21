import clsx from "clsx"
import { useStatsDetailsScreenAsModal } from "./StatsDetailsScreenAsModal"
import { valueToModifierLabel } from "../modules/stats"
import useDice from "./useDice";
import useTipAbilityScore from "./useTipAbilityScore";
import useI18n from "../modules/i18n/useI18n";

function Stat({ label, shortcut, value, character }) {
	const { tr } = useI18n()
	const { rollStat } = useDice()
	const { showTipAbilityScore } = useTipAbilityScore()
	const modifierLabel = valueToModifierLabel(value)

	const disadvantage = character && character?.abilityDisadvantage[shortcut.toLowerCase()] === true

	return (
		<div 
			className={clsx("flex flex-col items-center pr-4 pointer-cursor", {
				"text-red-800": disadvantage
			})}
		>
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

function StatsSmall({ stats, skills, character, withDetail }) {
	const { tr } = useI18n()
	const { showStatsDetailsScreenModal } = useStatsDetailsScreenAsModal()
	return (
		<>
			<div className="flex justify-between w-full">
				<Stat label={tr("STR")} shortcut="STR" value={stats.STR} character={character} />
				<Stat label={tr("DEX")} shortcut="DEX" value={stats.DEX} character={character} />
				<Stat label={tr("CON")} shortcut="CON" value={stats.CON} character={character} />
				<Stat label={tr("INT")} shortcut="INT" value={stats.INT} character={character} />
				<Stat label={tr("WIS")} shortcut="WIS" value={stats.WIS} character={character} />
				<Stat label={tr("CHA")} shortcut="CHA" value={stats.CHA} character={character} />
			</div>
			{withDetail && (
				<span 
					className="flex justify-end mt-2 mr-2 text-xs uppercase"
					onClick={() => showStatsDetailsScreenModal(skills, character)}
				>
					Détail
				</span>
			)}
		</>
	)
}

export default StatsSmall