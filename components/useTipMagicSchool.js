import useModal from "./useModal"
import magicSchools from "../database/data/magic-schools.json"
import useI18n from "../modules/i18n/useI18n"

function useTipMagicSchool() {
	const { tr } = useI18n()
	const { showInfoModal } = useModal()

	return {
		showTipMagicSchool: (index) => { // chaotic-good
			const magicSchool = magicSchools.find(a => a.index === index)
			showInfoModal({ 
				content: <div className="whitespace-pre-wrap">{tr(magicSchool.desc)}</div> 
			})
		}
	}
}

export default useTipMagicSchool