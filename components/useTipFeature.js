import useModal from "./useModal"
import useI18n from "../modules/i18n/useI18n"
import features from "../database/data/features"

function useTipFeature() {
	const { showInfoModal } = useModal()
	const { tr } = useI18n()

	return {
		showTipFeature: (index) => { 
			const feature = features.find(f => f.index === index)
			showInfoModal({ 
				content: (
					<div className="prose">
						<h4>{tr(feature.name)}</h4>
						<p className="mt-2 whitespace-pre-wrap">
							{tr(feature.desc)}
						</p>
					</div>
				)
			})
		}
	}
}

export default useTipFeature