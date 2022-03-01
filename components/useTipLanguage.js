import useModal from "./useModal"
import languages from "../database/data/languages.json"
import { makeI18n } from "../modules/i18n/useI18n"

const useI18n = makeI18n({
	'language.type.label': {
		fr: `Type :`,
		en: `Type:`,
	},
	'language.spokenBy': {
		fr: `Parlé par:`,
		en: `Spoken by :`,
	},
})

function useTipLanguage() {
	const { tr } = useI18n()
	const { showInfoModal } = useModal()

	return {
		showTipLanguage: (index) => { 
			const language = languages.find(a => a.index === index)
			showInfoModal({ 
				content: (
					<div>
						<p>{tr`language.type.label`} {language.type}</p>
						<p>{tr`language.spokenBy`} {language.typical_speakers?.map(tr).join(', ')}</p>
						<p className="mt-2 whitespace-pre-wrap">{tr(language.desc)}</p>
					</div>
				)
			})
		}
	}
}

export default useTipLanguage