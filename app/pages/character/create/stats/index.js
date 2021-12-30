import { useRouter } from 'next/router'
import Screen from "../../../../components/Screen";
import useSubraces from '../../../../modules/api/useSubraces';
import useRace from '../../../../modules/api/useRace';
import useI18n from '../../../../modules/i18n/useI18n';
import ScreenIntroduction from '../../../../components/ScreenIntroduction';
import ButtonBottomScreen from "../../../../components/ButtonBottomScreen";

function StatsScreen() {
	const { tr } = useI18n()
	const router = useRouter()

	// TODO: get from state
	const character = {
		race: {
			index: 'elf'
		},
		subrace: {
			index: 'high-elf'
		},
	}

	const subracesResponse = useSubraces(character.subrace.index)
	const raceResponse = useRace(character.race.index)

	const race = raceResponse.data
	const subraces = subracesResponse.data

	return (
		<Screen	
			title={tr('Choose stats')}
			isLoading={raceResponse.isLoading || subracesResponse.isLoading}
		>
			<>
				<ScreenIntroduction 
					title="Stats"
					description="Your character has statistics"
				/>
			</>

			<>
				<ButtonBottomScreen
					variant="cta"
					onClick={() => {
						router.push('/character/create/todo')
					}}
				>
					Valider
				</ButtonBottomScreen>
			</>
		</Screen>
  );
}

export default StatsScreen;
