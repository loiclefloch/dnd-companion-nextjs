import { useRouter } from "next/router"
import IconPlus from "../../components/icons/IconPlus"
import IconUsers from "../../components/icons/IconUsers"
import { ListSelectRowAsCard, ListRowSelectContainer } from "../../components/ListSelectRow"
import Screen from "../../components/Screen"
import useI18n from "../../modules/i18n/useI18n"
import useCharacters from "../../modules/api/useCharacters"

function Character({ character }) {
	const { tr } = useI18n()
	const router = useRouter()

	return (
		<ListSelectRowAsCard 
			title={character.name}
			subtitle={
				<span>
					{tr(character.race.nameLocalized)} - {character.classes.map(clss => tr(clss.nameLocalized)).join(', ')}
				</span>
			}
			// TODO: image={}
			onClick={() => router.push(`character/${character.id}`)}
		/>
	)
}

function CharactersScreen() {
	const router = useRouter()
	const charactersResponse = useCharacters()

	return (
		<Screen
			title={"Mes personnages"}
			titleIcon={<IconUsers className="w-6 h-6" />}
			root
			isLoading={charactersResponse.isLoading}
			rightAction={
				<button onClick={() => router.push("/character/create")}>
					<IconPlus className={"h-6 w-6 text-slate-800"} />
				</button>
			}
		>
			<div className="flex">
				<ListRowSelectContainer className="px-4 pb-12 mt-12" data-cy-id="characters-list">
					{charactersResponse.data?.map((character) => (
						<Character
							key={character.name}
							character={character}
						/>
					))}
				</ListRowSelectContainer>
			</div>
		</Screen>
	)
}

export default CharactersScreen