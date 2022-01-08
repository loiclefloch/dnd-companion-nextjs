import { useRouter } from 'next/router'
import Screen from "../../components/Screen";
import useRace from '../../modules/api/useRace';
import useI18n from '../../modules/i18n/useI18n';
import RaceDetailsView from '../../components/races/RaceDetailsView';
import SubraceDetailsView from '../../components/subraces/SubraceDetailsView';

function Race() {
	const { tr } = useI18n()
	const router = useRouter()
	const raceResponse = useRace(router.query.raceIndex)

	const race = raceResponse.data

	return (
		<Screen
			title={tr(race?.nameLocalized)}
			isLoading={raceResponse.isLoading}
			withBottomSpace
		>
			<div className="p-4">
				{race && (
					race.isSubrace ? (
						<SubraceDetailsView subrace={race.index} />
					) : (
						<RaceDetailsView race={race.index} />
					)
				)}
			</div>
		</Screen>
  );
}

export default Race;
