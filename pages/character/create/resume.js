import { useState } from "react"
import { useRouter } from 'next/router'
import ButtonBottomScreen from "../../../components/ButtonBottomScreen";
import ScreenIntroduction from "../../../components/ScreenIntroduction";
import Screen from "../../../components/Screen";
import Link from "next/link"
import useI18n from "../../../modules/i18n/useI18n";

function CreateCharacterResume() {
	const { tr } = useI18n()
	const router = useRouter()

	return (
		<Screen
			title={"Votre personnage"}
			withBottomSpace
		>
			<div className="flex flex-col">
				<ScreenIntroduction
					title="Résumé de votre personnage"
					description={`Donnez à votre personnage ...`}
					actions={
						<div className="mt-2">
							<Link href="/rules/create-character-equipment">
								En savoir plus
							</Link>
						</div>
					}
				/>

				<div className="px-4 mt-4">
					<div>
						TODO: resume character
					</div>
					<div>
				// TODO: if need to choose spells add a tip to how choose them
					</div>
				</div>

				<ButtonBottomScreen 
					variant="cta"
					onClick={() => {
						router.push('/')
					}}
				>
					Terminer la création
				</ButtonBottomScreen>
			</div>
    </Screen>
  );
}

export default CreateCharacterResume;