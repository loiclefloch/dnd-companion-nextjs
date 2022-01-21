import useModal from "./useModal"
import useI18n from "../modules/i18n/useI18n"

function useTipProficiency() {
	const { showInfoModal } = useModal()
	const { tr } = useI18n()

	return {
		showTipProficiency: (proficiency) => { 
			showInfoModal({ 
				content: <div>
					<p className="mt-2 whitespace-pre-wrap">
						{proficiency.isSkill ? tr(proficiency.skill.desc) : ''}
					</p>
					</div>
			})
		}
	}
}

export default useTipProficiency