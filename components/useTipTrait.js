import useModal from "./useModal"
import useI18n from "../modules/i18n/useI18n"

function useTipTrait() {
	const { tr } = useI18n()
	const { showInfoModal } = useModal()

	return {
		showTipTrait: (trait) => { 
			showInfoModal({ 
				content: (
					<div>
						<p className="mt-2 whitespace-pre-wrap">{tr(trait.desc)}</p>
					</div>
				)
			})
		}
	}
}

export default useTipTrait