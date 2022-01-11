import Link from "next/link"
import { useState } from "react"
import { useRouter } from 'next/router'
import ButtonBottomScreen from "../../../components/ButtonBottomScreen";
import ScreenIntroduction from "../../../components/ScreenIntroduction";
import Screen from "../../../components/Screen";
import Textarea from "../../../components/Textarea";
import useCreateCharacter from '../../../components/useCreateCharacter';

function Form() {
	const [selectedTraits, setSelectedTraits] = useState(['', ''])
	const router = useRouter()
	const { updateCharacter } = useCreateCharacter()

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

			<div className="px-4 pt-2 mt-2">
				<h3 className="mb-2 font-semibold border-b border-solid border-slate-200">Trait 1</h3>
				<Textarea
					value={selectedTraits[0]}
					onChange={(e) => setSelectedTraits([e.target.value, selectedTraits[1]])}
				/>
			</div>

			<div className="px-4 pt-2 mt-2">
				<h3 className="mb-2 font-semibold border-b border-solid border-slate-200">Trait 2</h3>
				<Textarea
					value={selectedTraits[1]}
					onChange={(e) => setSelectedTraits([selectedTraits[0], e.target.value])}
				/>
			</div>

			<ButtonBottomScreen
				variant="cta"
				onClick={() => {
					const url = '/character/create/ideals'
					router.push(url)
					updateCharacter({ traits: selectedTraits, step: 'ideals', url })
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