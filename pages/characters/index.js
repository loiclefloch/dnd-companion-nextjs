import { useRouter } from "next/router"
import IconPlus from "../../components/icons/IconPlus"
import IconUsers from "../../components/icons/IconUsers"
import { ListSelectRowAsCard, ListRowSelectContainer } from "../../components/ListSelectRow"
import Screen from "../../components/Screen"
import useI18n from "../../modules/i18n/useI18n"
import useCharacters from "../../modules/api/useCharacters"
import useCreateCharacter from '../../components/useCreateCharacter';
import Button from '../../components/Button';
import { isEmpty } from "lodash"

function Character({ character }) {
	const { tr } = useI18n()
	const router = useRouter()

	console.log({ character })
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
	const { startCreateCharacter } = useCreateCharacter()
	const charactersResponse = useCharacters()

	return (
		<Screen
			title={"Mes personnages"}
			titleIcon={<IconUsers className="w-6 h-6" />}
			root
			isLoading={charactersResponse.isLoading}
			rightAction={
				<button onClick={() => {
					startCreateCharacter()
					router.push("/character/create")
				}}>
					<IconPlus className={"h-6 w-6 text-slate-800"} />
				</button>
			}
		>
			<div>
				{charactersResponse.data && isEmpty(charactersResponse.data) && (
					<div className="flex flex-col items-center w-full p-4 mt-4">
						<p>Vous n'avez pas encore de personnage</p>
						<Button 
							onClick={() => router.push("/character/create")}
							variant="cta"
							className="mt-4"
						>
							Créer mon personnage
						</Button>
					</div>
				)}
				<ListRowSelectContainer className="px-4 pb-12 mt-12" data-cy-id="characters-list">
					{charactersResponse.data?.map((character) => (
						<Character
							key={character.id}
							character={character}
						/>
					))}
				</ListRowSelectContainer>
			</div>
		</Screen>
	)
}

export default CharactersScreen