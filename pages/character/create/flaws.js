import { useState } from "react"
import { useRouter } from 'next/router'
import ButtonBottomScreen from "../../../components/ButtonBottomScreen";
import ScreenIntroduction from "../../../components/ScreenIntroduction";
import Screen from "../../../components/Screen";
import Textarea from "../../../components/Textarea";
import Link from "next/link"
import useI18n from "../../../modules/i18n/useI18n";
import useCreateCharacter from '../../../components/useCreateCharacter';
import ListSelector from '../../../components/ListSelector';
import Button from "../../../components/Button";

function Custom({
	chosenFlaws,
	setChosenFlaws,
}) {
	return (
		<>
			<div className="px-4 pt-2 mt-2">
				<h3 className="mb-2 font-semibold border-b border-solid border-slate-200">Liens</h3>
				<Textarea 
					rows={12} 
					value={chosenFlaws}
					onChange={e => setChosenFlaws(e.target.value)}
				/>
			</div>
		</>
	)
}

function List({
	flaws,
	chosenFlaws,
	setChosenFlaws,
}) {
	return (
		<div className="px-4 pt-2 mt-2">
			<h3 className="mb-2 font-semibold border-b border-solid border-slate-200">Choissiez {flaws.choose} lien</h3>
			<ListSelector
				value={chosenFlaws}
				options={flaws.from?.map(option => {
					return ({
						label: <div className="flex">
							{option}
						</div>,
						value: option,
						selected: chosenFlaws.includes(option)
					})
				})}
				onChange={setChosenFlaws}
			/>
		</div>
	)
}
function Form() {
	const Mode = {
		LIST: 'LIST',
		CUSTOM: 'CUSTOM',
	}

	const { background, character, updateCharacter } = useCreateCharacter()
	const [chosenFlaws, setChosenFlaws] = useState(character?.flaws || '')
	const [mode, setMode] = useState(null)

	const flaws = background?.flaws

	return (
		<div className="flex flex-col">
			<ScreenIntroduction
				title="Choisissez les imperfections de votre personnage"
				description={`Donnez à votre personnage personnage ...`}
				actions={
					<div className="mt-2">
						<Link href="/rules/flaws">
							En savoir plus
						</Link>
					</div>
				}
			/>

			<>
				{mode === Mode.LIST && (
					<List
						flaws={flaws}
						chosenFlaws={chosenFlaws}
						setChosenFlaws={setChosenFlaws}
					/>
				)}

				{mode === Mode.CUSTOM && (
					<Custom
						chosenFlaws={chosenFlaws}
						setChosenFlaws={setChosenFlaws}
					/>
				)}

				<div className="px-4">
					{(mode !== Mode.LIST) && (
						<Button
							variant="outlined"
							className="mt-2"
							onClick={() => setMode(Mode.LIST)}
						>
							Choisir dans une liste prédéfinie
						</Button>
					)}
					{(mode !== Mode.CUSTOM) && (
						<Button
							variant="outlined"
							className="mt-2"
							onClick={() => setMode(Mode.CUSTOM)}
						>
							Customiser
						</Button>
					)}
				</div>
			</>

			<ButtonBottomScreen
				variant="cta"
				onClick={() => {
					updateCharacter({ flaws: chosenFlaws, step: 'flaws' })
				}}
			>
				Suivant
			</ButtonBottomScreen>
		</div>
	)
}

function CreateCharacterFlaws() {
	const { tr } = useI18n()
	const router = useRouter()

	return (
		<Screen
			title={"Imperfections"}
			withBottomSpace
		>
			<Form />
    </Screen>
  )
}

export default CreateCharacterFlaws;