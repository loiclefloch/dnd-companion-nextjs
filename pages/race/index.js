import { useRouter } from 'next/router'
import Screen from "../../components/Screen";
import useRaces from '../../modules/api/useRaces';
import useI18n from '../../modules/i18n/useI18n';
import { ListSelectRowAsCard, ListRowSelectContainer } from "../../components/ListSelectRow"
import IconRace from "../../components/icons/IconRace"
import IconAcademicCap from "../../components/icons/IconAcademicCap"

function RaceRow({ race }) {
	const { tr } = useI18n()
	const router = useRouter()
	const url =  `/race/${race.index}`

	return (
		<ListSelectRowAsCard
			size="small"
			onClick={() => router.push(url)}
			icon={<IconRace race={race.index} className="h-8 fill-slate-600" />}
			title={tr(race.nameLocalized)}
			subtitle={tr(race.resume)}
		/>
	)
}

function Race() {
	const racesResponse = useRaces()

  return (
    <Screen
      title={"Les races"}
			titleIcon={<IconAcademicCap className="w-6 h-6" />}
			isLoading={racesResponse.isLoading}
			withBottomSpace
    >
			<div className="flex flex-col">

				<ListRowSelectContainer className="px-4 mt-4">
					{racesResponse.data?.map(race => (
						<>
							<RaceRow key={`race_${race.index}`} race={race} />
							{race.hasSubraces && (
								<div className='ml-12'>
									{race.subraces.map(subrace => (
										<RaceRow key={`subrace_${subrace.index}`} race={subrace} />
									))}
								</div>
							)}
						</>
					))}
				</ListRowSelectContainer>
			</div>
    </Screen>
  );
}

export default Race;
