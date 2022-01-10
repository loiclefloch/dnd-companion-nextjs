import useModal from "./useModal"
import languages from "../database/data/languages.json"
import useI18n from "../modules/i18n/useI18n"

function useTipLanguage() {
	const { tr } = useI18n()
	const { showInfoModal } = useModal()

	return {
		showTipLanguage: (index) => { 
			const language = languages.find(a => a.index === index)
			showInfoModal({ 
				content: <div>
					<p>Type: {language.type}</p>
					<p>Parlé par: {language.typical_speakers?.map(tr).join(', ')}</p>
					<p className="mt-2 whitespace-pre-wrap">{tr(language.desc)}</p>
					</div>
			})
		}
	}
}

export default useTipLanguage