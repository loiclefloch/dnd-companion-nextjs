import useModal from "./useModal"
import useI18n from "../modules/i18n/useI18n"

function useTipRitual() {
	const { tr } = useI18n()
	const { showInfoModal } = useModal()

	return {
		showTipRitual: (index) => { 
			showInfoModal({ 
				content: <div>
					<p className="mt-2 whitespace-pre-wrap">
						{/* TODO: text ritual */}
						Un rituel ...
					</p>
					</div>
			})
		}
	}
}

export default useTipRitual