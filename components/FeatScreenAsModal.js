import useScreenAsModal from "./screenAsModal/useScreenAsModal"

import ScreenAsModal from "./screenAsModal/ScreenAsModal"
import useI18n from "../modules/i18n/useI18n";
import FeatContent from "./FeatContent"
import useFeat from "../modules/api/useFeat";

function FeatScreenAsModal({ index, onCloseScreen }) {
	const { tr } = useI18n()
	const featResponse = useFeat(index)

	return (
		<ScreenAsModal
			title={`Feat - ${tr(featResponse.data.nameLocalized)}`} 
			isFetching={featResponse.isFetching}
			onCloseScreen={onCloseScreen}
		>
			<FeatContent index={index} feat={featResponse.data} />
		</ScreenAsModal>
	)
}

export function useFeatScreenAsModal() {
	const { showScreenAsModal } = useScreenAsModal()

	return {
		showFeatScreenAsModal: (index) => {
			showScreenAsModal(FeatScreenAsModal, {
				index
			})
		}
	}
}
