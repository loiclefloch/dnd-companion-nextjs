import { useRouter } from 'next/router'
import Screen from "../../../../../components/Screen";
import useSubraces from '../../../../../modules/api/useSubraces';
import useRace from '../../../../../modules/api/useRace';
import useI18n from '../../../../../modules/i18n/useI18n';
import IconSubrace from '../../../../../components/icons/IconSubrace';
import ScreenIntroduction from '../../../../../components/ScreenIntroduction';
import { ListSelectRowAsCard, ListRowSelectContainer } from "../../../../../components/ListSelectRow"
import Button from '../../../../../components/Button';

function SubraceRow({ race, subrace }) {
	const { tr } = useI18n()
	const router = useRouter()
	const url = `/character/create/choose-subrace/${race.index}/${subrace.index}`

	return (
		<ListSelectRowAsCard
			onClick={() => router.push(url)}
			icon={<IconSubrace subrace={subrace.index} className="h-8 fill-slate-600" />}
			title={tr(subrace.nameLocalized)}
			subtitle={tr(subrace.resume)}
		/>
	)
}

function SubracesListScreen() {
	const { tr } = useI18n()
	const router = useRouter()
	const subracesResponse = useSubraces(router.query.race)
	const raceResponse = useRace('elf')

	const race = raceResponse.data
	const subraces = subracesResponse.data

	return (
		<Screen	
			title={tr(race?.nameLocalized)}
			isLoading={raceResponse.isLoading || subracesResponse.isLoading}
		>
			<>
				<ScreenIntroduction 
					title="Choisissez votre sous race"
					description={`La race ${tr(race?.nameLocalized)} est découpée en plusieurs sous-races`}
					actions={
						<a>En savoir plus</a>
					}
				/>

				<ListRowSelectContainer className="px-4 mt-12">
					{subraces?.map(subrace => (
						<SubraceRow key={subrace.index} race={race} subrace={subrace} />
					))}
				</ListRowSelectContainer>
			</>
		</Screen>
  );
}

export default SubracesListScreen;
