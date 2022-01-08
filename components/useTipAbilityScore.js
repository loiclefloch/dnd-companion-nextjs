import useModal from "./useModal"
import abilityScores from "../database/data/ability-scores.json"
import useI18n from "../modules/i18n/useI18n"

function useTipAbilityScore() {
	const { tr } = useI18n()
	const { showInfoModal } = useModal()

	return {
		showTipAbilityScore: (name) => { // STR, DEX
			const abilityData = abilityScores.find(a => a.name === name)
			showInfoModal({ 
				content: <div className="whitespace-pre-wrap">{tr(abilityData.desc)}</div> 
			})
		}
	}
}

export default useTipAbilityScore