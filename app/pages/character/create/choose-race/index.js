import { useRouter } from 'next/router'
import Link from "next/link"
import Screen from "../../../../components/Screen";
import useRaces from '../../../../modules/api/useRaces';
import useI18n from '../../../../modules/i18n/useI18n';
import { ListSelectRowAsCard, ListRowSelectContainer } from "../../../../components/ListSelectRow"
import IconRace from "../../../../components/icons/IconRace"

function RaceRow({ race }) {
	const { tr } = useI18n()
	const router = useRouter()
	const url = `/character/create/choose-race/${race.index}`

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
				<div className="px-4 py-5 sm:px-6 border-b w-full">
					<h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Choisissez une race</h3>
					<p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-200">
						De nombreuses races existent dans le monde de Donjon & Dragons.
					</p>
					<button>En savoir plus</button>
				</div>
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
