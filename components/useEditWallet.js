import { useState } from "react"
import useScreenAsModal from "./screenAsModal/useScreenAsModal"
import ScreenAsModal from "./screenAsModal/ScreenAsModal"
import { makeI18n } from "../modules/i18n/useI18n";
import ButtonBottomScreen from "./ButtonBottomScreen"
import ScreenIntroduction from "./ScreenIntroduction"
import { isEmpty } from "lodash"

const useI18n = makeI18n({
	'addExpense.screen.title': {
		fr: `Ajouter une dépense`,
		en: `Add an expense`,
	},
	'addIncome.screen.title': {
		fr: `Ajouter un revenu`,
		en: `Add an income`,
	},
	'form.label.placeholder': {
		fr: `Explication`,
		en: `Reason`,
	},
})

function Input({ label, name, ...props }) {

	return (
		<div className="mt-4">
			<label htmlFor={name} className="pl-2">{label}</label>
			<input id={name} name={name} {...props} className="w-20 ml-4 py-1 px-2" />
		</div>
	)
}

function EditWalletScreenAsModal({ onSubmit, isAddIncome, isAddExpense, onCloseScreen }) {
	const { tr } = useI18n()
	const [formData, setFormData] = useState({
		cp: 0,
		sp: 0,
		gp: 0,
		ep: 0,
		pp: 0,
		label: ""
	})

	const currenciesNames = [
		"cp",
		"sp",
		"gp",
		"ep",
		"pp",
	]

	const totalAmount = currenciesNames.map(name => formData[name] || 0).reduce((total, amount) => total + amount, 0)

	const formIsValid = formData.cp >= 0
		&& formData.sp >= 0
		&& formData.gp >= 0
		&& formData.ep >= 0
		&& formData.pp >= 0
		&& totalAmount > 0
		&& !isEmpty(formData.label)

	return (
		<ScreenAsModal
			title={isAddExpense ? tr`addExpense.screen.title` : tr`addIncome.screen.title`}
			onCloseScreen={onCloseScreen}
		>
			<ScreenIntroduction
				title={isAddExpense ? `Renseignez votre dépense` : `Renseignez votre revenu`}
				description={"Vos aventures vous ont apporté de l'expérience. Ajoutez-la ici."}
				actions={null}
			/>

			<div className="relative w-full px-4 mt-12">
				<input
					type="text"
					className="flex-1 w-full px-2 py-1 text-base text-gray-700 placeholder-gray-400 bg-white border border-transparent border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-1 focus:ring-slate-400 focus:border-transparent"
					name="label"
					placeholder={tr`form.label.placeholder`}
					value={formData.label}
					onChange={e => setFormData({ ...formData, label: e.target.value })}
				/>

				{currenciesNames.map(currencyName => (
					<Input
						type="number"
						key={currencyName}
						className="flex-1 w-full px-2 py-1 mt-4 text-base text-gray-700 placeholder-gray-400 bg-white border border-transparent border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-1 focus:ring-slate-400 focus:border-transparent"
						name={currencyName}
						label={currencyName}
						value={formData[currencyName]}
						onChange={e => setFormData({ ...formData, [currencyName]: e.target.value })}
					/>
				))}
			
			</div>
			<ButtonBottomScreen
				variant="cta"
				disabled={!formIsValid}
				hide={!formIsValid}
				onClick={() => {
					onSubmit(formData)
					onCloseScreen()
				}}
			>
				{tr`add.action`}
			</ButtonBottomScreen>
		</ScreenAsModal>
	)
}

export function useEditWallet() {
	const { showScreenAsModal } = useScreenAsModal()

	return {
		showAddWalletIncome: ({ onSubmit }) => {
			showScreenAsModal(EditWalletScreenAsModal, { onSubmit, isAddIncome: true })
		},
		showAddWalletExpense: ({ onSubmit }) => {
			showScreenAsModal(EditWalletScreenAsModal, { onSubmit, isAddExpense: true })
		}
	}
}

export default useEditWallet