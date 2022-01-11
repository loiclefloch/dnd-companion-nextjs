import { useState } from "react"
import { useRouter } from 'next/router'
import ButtonBottomScreen from "../../../components/ButtonBottomScreen";
import ScreenIntroduction from "../../../components/ScreenIntroduction";
import Screen from "../../../components/Screen";
import Textarea from "../../../components/Textarea";
import Link from "next/link"
import useCreateCharacter from '../../../components/useCreateCharacter';

function Form() {
	const { character, updateCharacter } = useCreateCharacter()
	const [bonds, setBonds] = useState(character?.bonds || '')

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

			<div className="px-4 pt-2 mt-2">
				<h3 className="mb-2 font-semibold border-b border-solid border-slate-200">Liens</h3>
				<Textarea 
					rows={12} 
					value={bonds}
					onChange={e => setBonds(e.target.value)}
				/>
			</div>

			<ButtonBottomScreen
				variant="cta"
				onClick={() => {
					updateCharacter({ bonds, step: 'bonds' })
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