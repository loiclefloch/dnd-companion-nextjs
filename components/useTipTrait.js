import useModal from "./useModal"
import traits from "../database/data/traits.json"
import useI18n from "../modules/i18n/useI18n"

function useTipLanguage() {
	const { tr } = useI18n()
	const { showInfoModal } = useModal()

	return {
		showTipLanguage: (index) => { 
			const trait = traits.find(a => a.index === index)
			showInfoModal({ 
				content: <div>
					<p className="mt-2 whitespace-pre-wrap">{tr(trait.desc)}</p>
					</div>
			})
		}
	}
}

export default useTipLanguage