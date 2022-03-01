import { useState } from "react"
import { isEmpty } from "lodash";
import useScreenAsModal from "./screenAsModal/useScreenAsModal"
import ScreenAsModal from "./screenAsModal/ScreenAsModal"
import { makeI18n } from "../modules/i18n/useI18n";
import ButtonBottomScreen from "./ButtonBottomScreen"
import ScreenIntroduction from "./ScreenIntroduction"

const useI18n = makeI18n({
	'screen.title': {
		fr: `Levelling - Gain d'XP`,
		en: `Levelling - XP gain`,
	},
	'screen.introduction.title': {
		fr: `Renseignez votre gain d'XP`,
		en: `Enter your XP gain`,
	},
	'screen.introduction.description': {
		fr: `Vos aventures vous ont apporté de l'expérience. Ajoutez-la ici.`,
		en: `Your adventures have brought you experience. Add it here.`,
	},
	'form.label.placeholder': {
		fr: `Explication du gain d'XP`,
		en: `Explanation of XP gain`,
	},
	'form.amount.placeholder': {
		fr: `Montant`,
		en: `Amount`,
	},
})

function LevellingAddScreenAsModal({ onAddLevelling, onCloseScreen }) {
	const { tr } = useI18n()
	const [formData, setFormData] = useState({
		amount: 0,
		label: ""
	})

	const formIsValid = formData.amount > 0 && !isEmpty(formData.label)

	return (
		<ScreenAsModal 
			title={tr`screen.title`} 
			onCloseScreen={onCloseScreen}
		>

			<ScreenIntroduction
				title={tr`screen.introduction.title`}
				description={tr`screen.introduction.description`}
				actions={null}
			/>

			<div className="relative w-full px-4 mt-12">
				<input
					type="text"
					className="flex-1 w-full px-2 py-1 text-base text-gray-700 placeholder-gray-400 bg-white border border-transparent border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-1 focus:ring-slate-400 focus:border-transparent"
					name="label"
					placeholder={tr`form.label.placeholder`}
					value={formData.label}
					onChange={e => setFormData({ ...formData, label: e.target.value})}
				/>
				<input
					type="number"
					className="flex-1 w-full px-2 py-1 mt-4 text-base text-gray-700 placeholder-gray-400 bg-white border border-transparent border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-1 focus:ring-slate-400 focus:border-transparent"
					name="name"
					placeholder={tr`form.amount.placeholder`}
					value={formData.amount}
					onChange={e => setFormData({ ...formData, amount: e.target.value})}
				/>
			</div>
			<ButtonBottomScreen
				variant="cta"
				disabled={!formIsValid}
				onClick={() => {
					onAddLevelling(formData.label, parseInt(formData.amount, 10))
					onCloseScreen()
				}}
			>
				{tr`add.action`}
			</ButtonBottomScreen>
		</ScreenAsModal>
	)
}

export default function useLevellingAddScreenAsModal() {
	const { showScreenAsModal } = useScreenAsModal()

	return {
		showLevellingAddScreenAsModal: (onAddLevelling) => {
			showScreenAsModal(LevellingAddScreenAsModal, {
				onAddLevelling
			})
		}
	}
}
