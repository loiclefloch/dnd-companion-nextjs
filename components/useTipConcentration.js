import useModal from "./useModal"
import useI18n from "../modules/i18n/useI18n"
import ConcentrationTip from "../components/tips/ConcentrationTip.mdx"

function useTipConcentration() {
	const { tr } = useI18n()
	const { showInfoModal } = useModal()

	return {
		showTipConcentration: () => { 
			showInfoModal({ 
				content: (
					<div className="prose whitespace-pre-wrap">
						<h3>Concentration</h3>
						<div className="mt-2">
							<ConcentrationTip />
						</div>
					</div>
				)
			})
		}
	}
}

export default useTipConcentration