import useI18n from "../../../modules/i18n/useI18n"
import useCharacter from "../../../modules/api/useCharacter"
import StatsSmall from "../../../components/StatsSmall"
import { useRouter } from "next/router"
import Screen from "../../../components/Screen"
import { getSpellLevelDataForClassesAndLevel, getSpellLevelForCharacterLevel } from "../../../modules/levelling"

function SpellLevelData({ classes, level }) {
	// TODO: how do we do with multy class?
	const spellLevelData = getSpellLevelDataForClassesAndLevel(classes, level)
	const maxSpellLevel = Math.max(...Object.keys(spellLevelData.slots))

	return (
		<div>
			<table className="mx-4 mt-2">
				<thead>
					<tr>
						<th className="text-sm font-semibold">Level</th>
						{[...Array(maxSpellLevel + 1)].map((_, index) => (
							<th key={index} className="w-8 font-semibold text-center">
								{index === 0 ? "C" : index }
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					<tr>
						<th  className="text-sm font-semibold">Slots</th>
						{[...Array(maxSpellLevel + 1)].map((_, index) => (
							<td key={index} className="text-center">
								{spellLevelData.slots[index]}
							</td>
						))}
					</tr>
				</tbody>
			</table>
		</div>
	)
}


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