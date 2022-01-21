import { useState } from "react"
import { useRouter } from 'next/router'
import ButtonBottomScreen from "../../../components/ButtonBottomScreen";
import ScreenIntroduction from "../../../components/ScreenIntroduction";
import Screen from "../../../components/Screen";
import Textarea from "../../../components/Textarea";
import Link from "next/link"
import useCreateCharacter from '../../../components/useCreateCharacter';
import ListSelector from '../../../components/ListSelector';
import Button from "../../../components/Button";

function Custom({
	chosenBonds,
	setChosenBonds,
}) {
	return (
		<>
			<div className="px-4 pt-2 mt-2">
				<h3 className="mb-2 font-semibold border-b border-solid border-slate-200">Liens</h3>
				<Textarea 
					rows={12} 
					value={chosenBonds}
					onChange={e => setChosenBonds(e.target.value)}
				/>
			</div>
		</>
	)
}

function List({
	bonds,
	chosenBonds,
	setChosenBonds,
}) {
	return (
		<div className="px-4 pt-2 mt-2">
			<h3 className="mb-2 font-semibold border-b border-solid border-slate-200">Choissiez {bonds.choose} lien</h3>
			<ListSelector
				value={chosenBonds}
				options={bonds.from?.map(option => {
					return ({
						label: <div className="flex">
							{option}
						</div>,
						value: option,
						selected: chosenBonds.includes(option)
					})
				})}
				onChange={setChosenBonds}
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
	const [chosenBonds, setChosenBonds] = useState(character?.bonds || '')
	const [mode, setMode] = useState(null)

	const bonds = background?.bonds

	return (
		<div className="flex flex-col">
			<ScreenIntroduction
				title="Choisissez les liens de votre personnage"
				description={`Donnez à votre personnage personnage ...`}
				actions={
					<div className="mt-2">
						<Link href="/rules/bonds">
							En savoir plus
						</Link>
					</div>
				}
			/>

			<>
				{mode === Mode.LIST && (
					<List
						bonds={bonds}
						chosenBonds={chosenBonds}
						setChosenBonds={setChosenBonds}
					/>
				)}

				{mode === Mode.CUSTOM && (
					<Custom
						chosenBonds={chosenBonds}
						setChosenBonds={setChosenBonds}
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
					updateCharacter({ bonds: chosenBonds, step: 'bonds' })
				}}
			>
				Suivant
			</ButtonBottomScreen>
		</div>
	)
}

function CreateCharacterBonds() {
	return (
		<Screen
			title={"Liens"}
			withBottomSpace
		>
			<Form />
    </Screen>
  );
}

export default CreateCharacterBonds;