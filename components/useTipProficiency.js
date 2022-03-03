import useModal from "./useModal"
import { makeI18n } from "../modules/i18n/useI18n"

const useI18n = makeI18n({
	'proficientIn': {
		fr: `Maîtrise de %{proficiency.name}`,
		en: `Proeficient in %{proficiency.name}`,
	},
})

function useTipProficiency() {
	const { showInfoModal } = useModal()
	const { tr } = useI18n()

	return {
		showTipProficiency: (proficiency) => { 
			showInfoModal({ 
				content: <div>
					<p className="mt-2 whitespace-pre-wrap">
						{proficiency.isSkill
							? tr(proficiency.skill.desc)
							: tr('proficientIn', { 'proficiency.name': proficiency.name })
						}
					</p>
					</div>
			})
		}
	}
}

export default useTipProficiency