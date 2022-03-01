import useModal from "./useModal"
import { makeI18n } from "../modules/i18n/useI18n"
import ConcentrationTip from "../components/tips/ConcentrationTip.mdx"

const useI18n = makeI18n({
	'tip.title': {
		fr: `Concentration`,
		en: `Concentration`,
	},
})

function useTipConcentration() {
	const { tr } = useI18n()
	const { showInfoModal } = useModal()

	return {
		showTipConcentration: () => { 
			showInfoModal({ 
				content: (
					<div className="prose whitespace-pre-wrap">
						<h3>{tr`tip.title`}</h3>
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