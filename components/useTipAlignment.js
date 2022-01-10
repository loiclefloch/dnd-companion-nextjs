import useModal from "./useModal"
import alignments from "../database/data/alignments.json"
import useI18n from "../modules/i18n/useI18n"

function useTipAlignment() {
	const { tr } = useI18n()
	const { showInfoModal } = useModal()

	return {
		showTipAlignment: (index) => { // chaotic-good
			const alignment = alignments.find(a => a.index === index)
			showInfoModal({ 
				content: <div className="whitespace-pre-wrap">{tr(alignment.desc)}</div> 
			})
		}
	}
}

export default useTipAlignment