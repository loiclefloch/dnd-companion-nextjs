import useScreenAsModal from "./screenAsModal/useScreenAsModal"
import skills from "../database/data/skills.json"
import ScreenAsModal from "./screenAsModal/ScreenAsModal"
import useI18n from "../modules/i18n/useI18n";
import { valueToModifierLabel } from "../modules/stats"
import useDice from "./useDice";
import useModal from "./useModal"
import useTipAbilityScore from "./useTipAbilityScore"

// TODO: proficiences
function StatsDetailsScreenAsModal({ stats, proficiencyBonus, proficiencies, onCloseScreen }) {
	const { tr } = useI18n()
	const { showInfoModal } = useModal()
	const { rollStat } = useDice()
	const { showTipAbilityScore } = useTipAbilityScore()

	const detailedStats = skills.map(skill => {
		return {
			index: skill.index,
			label: tr(skill.name),
			description: skill.desc,
			ability: skill.ability_score.name,
			value: stats[skill.ability_score.name]
		}
	})

	return (
		<ScreenAsModal 
			title={`Détail des statistiques`} 
			onCloseScreen={onCloseScreen}
		>
			<div>Proficiency +{proficiencyBonus}</div>
			<div className="px-4 divide-y divide">
				{detailedStats.map(detailedStat => (
					<div
						key={detailedStat.label}
						className="flex flex-row justify-between py-2"
					>
						<div 
							className="flex-1 pl-4" 
							onClick={() => {
								showInfoModal({
									content:  <p>{detailedStat.description}</p>
								})
							}}
						>
							{detailedStat.label}
						</div>
						<div 
							className="flex flex-row items-center mt-1 text-2xs text-meta"
							onClick={() => showTipAbilityScore(detailedStat.ability)}
						>
							{detailedStat.ability}
						</div>
						<div 
							className="px-6"
							onClick={() => rollStat(tr(detailedStat.label), detailedStat.value)}
						>
							{valueToModifierLabel(detailedStat.value)}
						</div>
					</div>
				))}
			</div>
		</ScreenAsModal>
	)
}

export function useStatsDetailsScreenAsModal() {
	const { showScreenAsModal } = useScreenAsModal()

	return {
		showStatsDetailsScreenModal: (stats, proficiencyBonus, proficiencies) => {
			showScreenAsModal(StatsDetailsScreenAsModal, { stats, proficiencyBonus, proficiencies })
		}
	}
}

export default StatsDetailsScreenAsModal