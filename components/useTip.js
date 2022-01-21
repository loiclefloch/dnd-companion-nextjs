import useModal from "./useModal"
import useI18n from "../modules/i18n/useI18n"

function useTip() {
	const { showInfoModal } = useModal()

	return {
		showTip: (text) => {
			showInfoModal({ 
				content: <div className="whitespace-pre-wrap">{text}</div> 
			})
		},
		showTipPassivePerception: () => {
			showInfoModal({ 
				content: <div className="">
					<p>
						Si vous maitrisez "Perception"
						<br />
						<span className="text-meta">= 10 + CHA modifier + proefficiency bonus in Perception</span>
					</p>
					<p className="mt-2">
						Sinon
						<br />
						<span className="text-meta">= 10 + CHA modifier</span>
					</p>
				</div>
			})
		},
	}
}

export default useTip