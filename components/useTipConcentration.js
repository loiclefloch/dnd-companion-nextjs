import useModal from "./useModal"
import useI18n from "../modules/i18n/useI18n"

function useTipConcentration() {
	const { tr } = useI18n()
	const { showInfoModal } = useModal()

	return {
		showTipConcentration: (index) => { 
			showInfoModal({ 
				content: <div>
					<p className="mt-2 whitespace-pre-wrap">
						{/* TODO: text concentration */}
						La concentration ...
					</p>
					</div>
			})
		}
	}
}

export default useTipConcentration