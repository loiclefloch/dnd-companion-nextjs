import { useRouter } from 'next/router'
import Link from "next/link"
import Screen from "../../../../components/Screen";
import useRaces from '../../../../modules/api/useRaces';
import useI18n from '../../../../modules/i18n/useI18n';
import { ListSelectRowAsCard, ListRowSelectContainer } from "../../../../components/ListSelectRow"
import IconRace from "../../../../components/icons/IconRace"
import ScreenIntroduction from "../../../../components/ScreenIntroduction"
import useCreateCharacter from "../../../../components/useCreateCharacter"

function RaceRow({ race, onSelect }) {
	const { tr } = useI18n()
	const url = race.hasSubraces 
		? `/character/create/choose-subrace/${race.index}` 
		: `/character/create/choose-race/${race.index}`

	return (
		<ListSelectRowAsCard
			onClick={() => {
				onSelect(url)
			}}
			icon={<IconRace race={race.index} className="h-8 fill-slate-600" />}
			title={tr(race.nameLocalized)}
			subtitle={tr(race.resume)}
		/>
	)
}


function Form({ racesResponse }) {
	const { updateCharacter } = useCreateCharacter()
	const router = useRouter()

	return (
		<div className="flex flex-col">
			<ScreenIntroduction
				title="Choisissez votre race"
				description={`De nombreuses races existent dans le monde de Donjon & Dragons.`}
				actions={
					<button>En savoir plus</button>
				}
			/>

			<ListRowSelectContainer className="px-4 mt-12">
				{racesResponse.data?.map(race => (
					<RaceRow
						key={race.index}
						race={race}
						onSelect={(url) => {
							if (!race.hasSubraces) {
								updateCharacter({ step: 'choose-race', url })
							} else {
								updateCharacter({ step: 'choose-subrace', url })
							}

							router.push(url)
						}}
					/>
				))}
			</ListRowSelectContainer>
		</div>
	)
}

function ChooseCharacterRace() {
	const racesResponse = useRaces()

	return (
		<Screen
			title={"Choix de la race"}
			isLoading={racesResponse.isLoading}
		>
			<Form racesResponse={racesResponse} />
		</Screen>
	);
}

export default ChooseCharacterRace;
