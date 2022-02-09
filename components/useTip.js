import useModal from "./useModal"
import useI18n from "../modules/i18n/useI18n"

function useTip() {
	const { tr } = useI18n()
	const { showInfoModal } = useModal()

	return {
		showTip: (text) => {
			showInfoModal({ 
				content: <div className="whitespace-pre-wrap">{text}</div> 
			})
		},
		showTipSubclassSpell: (subclass) => {
			showInfoModal({ 
				content: <div className="">
					<p>
						Ce sort est un sort qui vous est automatiquement donné grâce à votre sous-classe {tr(subclass.nameLocalized)}.
					</p>
					<p>
						Il est automatiquement préparé et ne rentre ne rentre pas en compte dans le nombre maxium de sorts préparés.
					</p>
				</div>
			})
		},
		showTipPreparedSpell: () => {
			showInfoModal({ 
				content: <div className="">
					<p>
						{/* TODO: */}
						Ce sort est un sort est préparé. Vous pourrez lancer ce sort.
					</p>
				</div>
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