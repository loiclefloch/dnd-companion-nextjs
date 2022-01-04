import useI18n from "../../../modules/i18n/useI18n"
import useCharacter from "../../../modules/api/useCharacter"
import StatsSmall from "../../../components/StatsSmall"
import { useRouter } from "next/router"
import Screen from "../../../components/Screen"
import SpellLevelData from "../../../components/SpellLevelData"

function Character() {
	const router = useRouter()
	const { tr } = useI18n()
	const characterResponse = useCharacter(router.query.characterId)

	const character = characterResponse.data

	return (
		<Screen
			title={character?.name}
			// titleIcon={<IconUsers className="w-6 h-6" />}
			isLoading={characterResponse.isLoading}
			withCharacterMenu
			rightAction={
				// TODO: edit?
				<button onClick={() => router.push("/character/create")}>
					{/* <IconPlus className={"h-6 w-6 text-slate-800"} /> */}
				</button>
			}
		>
			{character && (
				<>
					<div className="px-4">
						{tr(character.race.nameLocalized)} - {character.classes.map(clss => tr(clss.nameLocalized)).join(', ')}
					</div>
					<div className="px-4 my-4">
						<StatsSmall stats={character?.stats} withDetail />
					</div>

					<div>
						<h3 className="mx-4 mt-4 text-xl border-b border-slate-300">Spells slots</h3>
						<SpellLevelData classes={character.classes} level={character.level} />
					</div>

				</>
			)}
		</Screen>
	)
}

export default Character