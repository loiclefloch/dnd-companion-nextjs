import Link from "next/link"
import { useState } from "react"
import { useRouter } from 'next/router'
import ButtonBottomScreen from "../../../components/ButtonBottomScreen";
import ScreenIntroduction from "../../../components/ScreenIntroduction";
import Screen from "../../../components/Screen";
import Textarea from "../../../components/Textarea";
import useI18n from "../../../modules/i18n/useI18n";
import useCreateCharacter from '../../../components/useCreateCharacter';

function Form() {
	const [ideals, setIdeals] = useState('')
	const router = useRouter()
	const { updateCharacter } = useCreateCharacter()

	return (
		<div className="flex flex-col">
			<ScreenIntroduction
				title="Choisissez les idéaux votre personnage"
				description={`Donnez à votre personnage personnage ...`}
				actions={
					<div className="mt-2">
						<Link href="/rules/ideals">
							En savoir plus
						</Link>
					</div>
				}
			/>

			<div className="px-4 pt-2 mt-2">
				<h3 className="mb-2 font-semibold border-b border-solid border-slate-200">Idéaux</h3>
				<Textarea 
					rows={12} 
					value={ideals}
					onChange={e => setIdeals(e.target.value)}
				/>
			</div>

			<ButtonBottomScreen
				variant="cta"
				onClick={() => {
					const url = '/character/create/bonds'
					router.push(url)
					updateCharacter({ ideals, step: 'bonds', url })
				}}
			>
				Suivant
			</ButtonBottomScreen>
		</div>
	)
}

function CreateCharacterIdeals() {
	const { tr } = useI18n()
	const router = useRouter()

	return (
		<Screen
			title={"Idéaux"}
			withBottomSpace
		>
			<Form />
		</Screen>
	);
}

export default CreateCharacterIdeals;