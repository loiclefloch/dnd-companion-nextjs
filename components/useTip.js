import useModal from "./useModal"
import { makeI18n } from "../modules/i18n/useI18n"

const useI18n = makeI18n({
	'subclassSpell.tip.1': {
		fr: `Ce sort est un sort qui vous est automatiquement donné grâce à votre sous-classe %{subclass.name}.`,
		en: `This spell is a spell that is automatically given to you thanks to your subclass %{subclass.name}.`,
	},
	'subclassSpell.tip.2': {
		fr: `Il est automatiquement préparé et ne rentre ne rentre pas en compte dans le nombre maxium de sorts préparés.`,
		en: `It is automatically prepared and does not count towards the maximum number of prepared spells.`,
	},
	'preparedSpell.tip': {
		// TODO:
		fr: `Ce sort est un sort est préparé. Vous pourrez lancer ce sort.`,
		en: `This spell is a spell is prepared. You can cast this spell.`,
	},
	'passivePerception.tip.ifProficiency.title': {
		fr: `Si vous maitrisez "Perception"`,
		en: ``,
	},
	'passivePerception.tip.ifProficiency.explain': {
		fr: `= 10 + CHA modifier + proefficiency bonus in Perception`,
		en: ``,
	},
	'passivePerception.tip.else': {
		fr: `Sinon`,
		en: `Else`,
	},
	'passivePerception.tip.ifNoProficiency.explain': {
		fr: `= 10 + CHA modifier`,
		en: ``,
	},
})

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
					<p>{tr('subclassSpell.tip.1', { 'subclass.name': tr(subclass.nameLocalized) })}</p>
					<p>{tr('subclassSpell.tip.2')}</p>
				</div>
			})
		},
		showTipPreparedSpell: () => {
			showInfoModal({
				content: <div className="">
					<p>
						{tr`preparedSpell.tip`}
					</p>
				</div>
			})
		},
		showTipPassivePerception: () => {
			showInfoModal({
				content: <div className="">
					<p>
						{tr`passivePerception.tip.ifProficiency.title`}
						<br />
						<span className="text-meta">{tr`passivePerception.tip.ifProficiency.explain`}</span>
					</p>
					<p className="mt-2">
						{tr`passivePerception.tip.else`}
						<br />
						<span className="text-meta">{tr`passivePerception.tip.ifNoProficiency.explain`}</span>
					</p>
				</div>
			})
		},
	}
}

export default useTip