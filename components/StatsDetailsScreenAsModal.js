import useScreenAsModal from "./screenAsModal/useScreenAsModal"
import ScreenAsModal from "./screenAsModal/ScreenAsModal"
import StatsDetails from "./StatsDetails"

function StatsDetailsScreenAsModal({ skills, character, onCloseScreen }) {
	return (
		<ScreenAsModal 
			title={`Compétences`} 
			onCloseScreen={onCloseScreen}
		>
			<StatsDetails 
				skills={skills}
				character={character}
			/>
		</ScreenAsModal>
	)
}

export function useStatsDetailsScreenAsModal() {
	const { showScreenAsModal } = useScreenAsModal()

	return {
		showStatsDetailsScreenModal: (skills, character) => {
			showScreenAsModal(StatsDetailsScreenAsModal, { skills, character })
		}
	}
}

export default StatsDetailsScreenAsModal