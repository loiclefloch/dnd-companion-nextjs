import useModal from "./useModal"
import useI18n from "../modules/i18n/useI18n"

function useTip() {
	const { showInfoModal } = useModal()

	return {
		showTip: (text) => {
			showInfoModal({ 
				content: <div className="whitespace-pre-wrap">{text}</div> 
			})
		}
	}
}

export default useTip