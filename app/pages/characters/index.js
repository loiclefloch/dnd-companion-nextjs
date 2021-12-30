import { useRouter } from "next/router"
import IconPlus from "../../components/icons/IconPlus"
import IconUsers from "../../components/icons/IconUsers"
import { ListSelectRowAsCard, ListRowSelectContainer } from "../../components/ListSelectRow"
import Screen from "../../components/Screen"

const characters = [
	{
		id: 1,
		name: 'Ylvir',
		race: {
			index: 'elf'
		}
	}
]

function Character({ character }) {
	const router = useRouter()

	return (
		<ListSelectRowAsCard 
			title={character.name}
			// TODO: image={}
			onClick={() => router.push(`character/${character.id}`)}
		/>
	)
}

function CharactersScreen() {
	const router = useRouter()

	return (
		<Screen
			title={"Mes personnages"}
			titleIcon={<IconUsers className="w-6 h-6" />}
			root
			rightAction={
				<button onClick={() => router.push("/character/create")}>
					<IconPlus className={"h-6 w-6 text-slate-800"} />
				</button>
			}
		>
			<div className="flex">
				<ListRowSelectContainer className="mt-12 pb-12 px-4" data-cy-id="characters-list">
					{characters.map((character) => (
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