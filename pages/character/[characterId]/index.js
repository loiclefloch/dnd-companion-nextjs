import Link from "next/link"
import useI18n from "../../../modules/i18n/useI18n"
import useCharacter from "../../../modules/api/useCharacter"
import StatsSmall from "../../../components/StatsSmall"
import { useRouter } from "next/router"
import Screen from "../../../components/Screen"
import SpellLevelData from "../../../components/SpellLevelData"
import useTipAlignement from "../../../components/useTipAlignement"

function Character() {
	const router = useRouter()
	const { tr } = useI18n()
	const { showTipAlignement } = useTipAlignement()
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
						<Link href={`/race/${character.race.index}`}>
							{tr(character.race.nameLocalized)}
						</Link>
						<span> - </span>
						<Link href={`/class/${character.classes[0].index}`}>
							{character.classes.map(clss => tr(clss.nameLocalized)).join(', ')}
						</Link>
					</div>
					<div className="px-4 my-4">
						<StatsSmall stats={character?.stats} withDetail />
					</div>

					<div>
						<h3 className="mx-4 mt-4 text-xl border-b border-slate-300">Spells slots</h3>
						<SpellLevelData classes={character.classes} level={character.level} />
					</div>

					<div className="px-4 mt-4">
						<div>
							Age: {character.age}
						</div>
						<div onClick={() => showTipAlignement(character.alignementIndex)}>
							{character.alignementIndex}
						</div>
					</div>
				</>
			)}
		</Screen>
	)
}

export default Character