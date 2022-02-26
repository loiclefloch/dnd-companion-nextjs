import { useRouter } from "next/router"
import IconPlus from "../../components/icons/IconPlus"
import IconUsers from "../../components/icons/IconUsers"
import { ListSelectRowAsCard, ListRowSelectContainer } from "../../components/ListSelectRow"
import Screen from "../../components/Screen"
import { makeI18n } from "../../modules/i18n/useI18n"
import useCharacters from "../../modules/api/useCharacters"
import useCreateCharacter from '../../components/useCreateCharacter'
import useCurrentCharacter from '../../components/useCurrentCharacter'
import Button from '../../components/Button'
import { isEmpty } from "lodash"

const useI18n = makeI18n(() => ({
	'screen.title': {
		fr: 'Mes personnages',
		en: 'My characters',
	},
	'no characters yet': {
		fr: `Vous n'avez pas encore de personnage`,
		en: `You do not have any character yet`,
	},
	'btn.create my character': {
		fr: `Créer mon personnage`
	},
}))

function Character({ character, selected }) {
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
			selected={selected}
			// TODO: image={}
			onClick={() => router.push(`character/${character.id}`)}
		/>
	)
}


function CharactersScreen() {
	const { tr } = useI18n()
	const router = useRouter()
	const { startCreateCharacter } = useCreateCharacter()
	const charactersResponse = useCharacters()
	const { character: currentCharacter } = useCurrentCharacter()

	return (
		<Screen
			title={tr`screen.title`}
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
						<p>{tr`no characters yet`}</p>
						<Button 
							onClick={() => router.push("/character/create")}
							variant="cta"
							className="mt-4"
						>
						{tr`btn.create my character`}	
						</Button>
					</div>
				)}
				<ListRowSelectContainer className="px-4 pb-12 mt-12" data-cy-id="characters-list">
					{charactersResponse.data?.map((character) => (
						<Character
							key={character.id}
							character={character}
							selected={currentCharacter?.id === character.id}
						/>
					))}
				</ListRowSelectContainer>
			</div>
		</Screen>
	)
}

export default CharactersScreen