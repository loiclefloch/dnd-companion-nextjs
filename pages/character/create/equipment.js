import { useState } from "react"
import { useRouter } from 'next/router'
import ButtonBottomScreen from "../../../components/ButtonBottomScreen";
import ScreenIntroduction from "../../../components/ScreenIntroduction";
import Screen from "../../../components/Screen";
import Link from "next/link"
import useI18n from "../../../modules/i18n/useI18n";
import useCreateCharacter from '../../../components/useCreateCharacter';

function Form() {
	const router = useRouter()
	const { updateCharacter } = useCreateCharacter()

	return (
		<div className="flex flex-col">
			<ScreenIntroduction
				title="Choisissez votre équipement de départ"
				description={`Donnez à votre personnage ...`}
				actions={
					<div className="mt-2">
						<Link href="/rules/create-character-equipment">
							En savoir plus
						</Link>
					</div>
				}
			/>

			TODO: list availaible starting equipment.

			<ButtonBottomScreen
				variant="cta"
				onClick={() => {
					const url = '/character/create/resume'
					router.push(url)
					updateCharacter({ equipments: [], step: 'resume', url })

				}}
			>
				Suivant
			</ButtonBottomScreen>
		</div>
	)
}


function CreateCharacterEquipment() {
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

export default CreateCharacterEquipment;