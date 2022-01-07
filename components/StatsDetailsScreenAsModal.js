import useScreenAsModal from "./screenAsModal/useScreenAsModal"

import ScreenAsModal from "./screenAsModal/ScreenAsModal"
import useI18n from "../modules/i18n/useI18n";
import { valueToModifier, valueToModifierLabel } from "../modules/stats"
import useDice from "./useDice";

function StatsDetailsScreenAsModal({ stats, onCloseScreen }) {
	const { tr } = useI18n()
	const { rollStat } = useDice()

	const detailedStats = [
			{ label: tr('Acrobatics'), value: stats['DEX'] },
			{ label: tr('Animal Handling'), value: stats['WIS'] },
			{ label: tr('Arcana'), value: stats['INT'] },
			{ label: tr('Athletics'), value: stats['STR'] },
			{ label: tr('Deception'), value: stats['CHA'] },
			{ label: tr('History'), value: stats['INT'] },
			{ label: tr('Insight'), value: stats['WIS'] },
			{ label: tr('Intimidation'), value: stats['CHA'] },
			{ label: tr('Investigation'), value: stats['INT'] },
			{ label: tr('Medicine'), value: stats['WIS'] },
			{ label: tr('Nature'), value: stats['INT'] },
			{ label: tr('Perception'), value: stats['WIS'] },
			{ label: tr('Performance'), value: stats['CHA'] },
			{ label: tr('Persuasion'), value: stats['CHA'] },
			{ label: tr('Religion'), value: stats['INT'] },
			{ label: tr('Sleight of Hand'), value: stats['DEX'] },
			{ label: tr('Stealth'), value: stats['DEX'] },
			{ label: tr('Survival'), value: stats['WIS'] },
	]

	return (
		<ScreenAsModal 
			title={`Détail des statistiques`} 
			onCloseScreen={onCloseScreen}
		>
			<div className="px-4 divide-y divide">
				{detailedStats.map(detailedStat => (
					<div
						key={detailedStat.label}
						className="flex justify-between py-2"
					>
						<div 
							className="pl-4" 
							onClick={() => {
								// TODO: open description
							}}
						>
							{detailedStat.label}
						</div>
						<div 
							className="pr-6"
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
		showStatsDetailsScreenModal: (stats) => {
			showScreenAsModal(StatsDetailsScreenAsModal, { stats })
		}
	}
}

export default StatsDetailsScreenAsModal