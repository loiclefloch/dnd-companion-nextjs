import { useRouter } from 'next/router'
import Link from "next/link"
import Screen from "../../../../components/Screen";
import useRaces from '../../../../modules/api/useRaces';
import useI18n from '../../../../modules/i18n/useI18n';
import { ListSelectRowAsCard, ListRowSelectContainer } from "../../../../components/ListSelectRow"
import IconRace from "../../../../components/icons/IconRace"
import ScreenIntroduction from "../../../../components/ScreenIntroduction"

function RaceRow({ race }) {
	const { tr } = useI18n()
	const router = useRouter()
	const url = race.hasSubraces 
		? `/character/create/choose-subrace/${race.index}` 
		: `/character/create/choose-class`

	return (
		<ListSelectRowAsCard
			onClick={() => router.push(url)}
			icon={<IconRace race={race.index} className="h-8 fill-slate-600" />}
			title={tr(race.nameLocalized)}
			subtitle={tr(race.resume)}
		/>
	)
}

function ChooseCharacterRace() {
	const racesResponse = useRaces()

  return (
    <Screen
      title={"Choix de la race"}
			isLoading={racesResponse.isLoading}
    >
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
						<RaceRow key={race.index} race={race} />
					))}
				</ListRowSelectContainer>
			</div>
    </Screen>
  );
}

export default ChooseCharacterRace;
