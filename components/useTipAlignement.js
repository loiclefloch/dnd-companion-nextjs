import useModal from "./useModal"
import alignements from "../database/data/alignements.json"
import useI18n from "../modules/i18n/useI18n"

function useTipAlignement() {
	const { tr } = useI18n()
	const { showInfoModal } = useModal()

	return {
		showTipAlignement: (index) => { // chaotic-good
			const alignement = alignements.find(a => a.index === index)
			showInfoModal({ 
				content: <div className="whitespace-pre-wrap">{tr(alignement.desc)}</div> 
			})
		}
	}
}

export default useTipAlignement