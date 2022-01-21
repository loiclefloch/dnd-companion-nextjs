import Link from "next/link"
import { useState } from "react"
import ButtonBottomScreen from "../../../components/ButtonBottomScreen";
import ScreenIntroduction from "../../../components/ScreenIntroduction";
import Textarea from "../../../components/Textarea";
import Button from "../../../components/Button";
import Screen from "../../../components/Screen";
import useCreateCharacter from '../../../components/useCreateCharacter';
import ListSelector from '../../../components/ListSelector';

function Custom({
	chosenTraits,
	setChosenTraits,
}) {
	return (
		<>
			<div className="px-4 pt-2 mt-2">
				<h3 className="mb-2 font-semibold border-b border-solid border-slate-200">Trait 1</h3>
				<Textarea
					value={chosenTraits[0]}
					onChange={(e) => setChosenTraits([e.target.value, chosenTraits[1]])}
				/>
			</div>

			<div className="px-4 pt-2 mt-2">
				<h3 className="mb-2 font-semibold border-b border-solid border-slate-200">Trait 2</h3>
				<Textarea
					value={chosenTraits[1]}
					onChange={(e) => setChosenTraits([chosenTraits[0], e.target.value])}
				/>
			</div>
		</>
	)
}

function List({
	personalityTraits,
	chosenTraits,
	setChosenTraits,
}) {
	return (
		<div className="px-4 pt-2 mt-2">
			<h3 className="mb-2 font-semibold border-b border-solid border-slate-200">Choissiez {personalityTraits.choose} traits</h3>
			<ListSelector
				value={chosenTraits}
				multiple
				nbMaxValues={personalityTraits.choose}
				options={personalityTraits.from?.map(option => {
					return ({
						label: <div className="flex">
							{option}
						</div>,
						value: option,
						selected: chosenTraits.includes(option)
					})
				})}
				onChange={setChosenTraits}
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
	const [chosenTraits, setChosenTraits ] = useState(character?.traits || [])
	const [mode, setMode] = useState(null)

	const personalityTraits = background?.personalityTraits

	return (
		<div className="flex flex-col">
			<ScreenIntroduction
				title="Choisissez les traits de personnalités de votre personnage"
				description={`Donnez à votre personnage personnage ...`}
				actions={
					<div className="mt-2">
						<Link href="/rules/personnality-traits">
							En savoir plus
						</Link>
					</div>
				}
			/>

			<>
			{mode === Mode.LIST && (
					<List
						personalityTraits={personalityTraits}
						chosenTraits={chosenTraits}
						setChosenTraits={setChosenTraits}
					/>
				)}

				{mode === Mode.CUSTOM && (
					<Custom
						chosenTraits={chosenTraits}
						setChosenTraits={setChosenTraits}
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
					updateCharacter({ 
						traits: chosenTraits,
						step: 'personnality-traits' 
					})
				}}
			>
				Suivant
			</ButtonBottomScreen>
		</div>
	)
}

function CreateCharacterPersonnalityTraits() {
	return (
		<Screen
			title={"Traits de personnalités"}
			withBottomSpace
		>
			<Form />
    </Screen>
  );
}

export default CreateCharacterPersonnalityTraits;