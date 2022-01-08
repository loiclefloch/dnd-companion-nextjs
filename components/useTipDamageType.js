import useModal from "./useModal"
import damageTypes from "../database/data/damage-types.json"
import useI18n from "../modules/i18n/useI18n"

function useTipDamageType() {
	const { tr } = useI18n()
	const { showInfoModal } = useModal()

	return {
		showTipDamageType: (index) => { // chaotic-good
			const damageType = damageTypes.find(a => a.index === index)
			showInfoModal({ 
				content: <div className="whitespace-pre-wrap">{tr(damageType.desc)}</div> 
			})
		}
	}
}

export default useTipDamageType