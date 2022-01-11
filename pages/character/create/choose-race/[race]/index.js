import { useRouter } from 'next/router'
import Screen from "../../../../../components/Screen";
import useRace from '../../../../../modules/api/useRace';
import useI18n from '../../../../../modules/i18n/useI18n';
import RaceDetailsView from '../../../../../components/races/RaceDetailsView';
import ButtonBottomScreen from '../../../../../components/ButtonBottomScreen';
import useCreateCharacter from '../../../../../components/useCreateCharacter';

function Form({ race }) {
	const router = useRouter()
	const { updateCharacter } = useCreateCharacter()

	return (
		<div className="flex flex-col">
			<div className="relative w-full px-4 mt-12">
				<RaceDetailsView race={race.index} />
			</div>

			<ButtonBottomScreen
				variant="cta"
				onClick={() => {
					const url = '/character/create/choose-class'
					updateCharacter({ race: race.index, step: 'choose-race', url })
				}}
			>
				Choisir
			</ButtonBottomScreen>
		</div>
	)
}

function DisplayCharacterRace() {
	const { tr } = useI18n()
	const router = useRouter()
	const raceResponse = useRace(router.query.race)

	const race = raceResponse.data

	return (
		<Screen
			title={tr(race?.nameLocalized)}
			isLoading={raceResponse.isLoading}
		>
			{race && (
				<Form race={race} />
			)}
		</Screen>
  );
}

export default DisplayCharacterRace;
