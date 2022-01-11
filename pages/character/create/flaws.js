import { useState } from "react"
import { useRouter } from 'next/router'
import ButtonBottomScreen from "../../../components/ButtonBottomScreen";
import ScreenIntroduction from "../../../components/ScreenIntroduction";
import Screen from "../../../components/Screen";
import Textarea from "../../../components/Textarea";
import Link from "next/link"
import useI18n from "../../../modules/i18n/useI18n";
import useCreateCharacter from '../../../components/useCreateCharacter';

function Form() {
	const { character, updateCharacter } = useCreateCharacter()
	const [flaws, setFlaws] = useState(character?.flaws || '')

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

			<div className="px-4 pt-2 mt-2">
				<h3 className="mb-2 font-semibold border-b border-solid border-slate-200">Imperfections</h3>
				<Textarea 
					rows={12} 
					value={flaws}
					onChange={e => setFlaws(e.target.value)}
				/>
			</div>

			<ButtonBottomScreen
				variant="cta"
				onClick={() => {
					updateCharacter({ flaws, step: 'flaws' })
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