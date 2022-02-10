import Link from "next/link"
import useI18n from "../../modules/i18n/useI18n"
import { useRouter } from "next/router"
import Screen from "../../components/Screen"
import useCurrentCharacter from "../../components/useCurrentCharacter"
import CharacterResume from "../../components/CharacterResume"
import Button from "../../components/Button"

function Background() {
	const { character, rawCharacter } = useCurrentCharacter()

	return (
		<Screen
			title={`${character?.name} - Résumé`}
			// titleIcon={<IconBriefcase className="w-6 h-6" />}
			root
			withCharacterMenu
			withBottomSpace
		// rightAction={ // TODO: edit
		// <button 
		// 	onClick={() => {

		// 	}}
		// >
		// 	<IconPlus className={"h-6 w-6 text-slate-800"} />
		// </button>
		// }
		>
			<div className="mx-4">
				<Button 
					variant="outlined"
					onClick={() => {
						navigator.clipboard.writeText(JSON.stringify(rawCharacter, null, 2))
						alert('Donnée copiée ! Sauvegardez la en la collant quelque part')
					}}
				>
					Copier la donnée
				</Button>
			</div>

			{character && (
				<CharacterResume character={character} />
			)}

		</Screen>
	)
}

export default Background

