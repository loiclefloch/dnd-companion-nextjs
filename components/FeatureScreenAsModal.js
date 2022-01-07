import Link from 'next/link'
import useScreenAsModal from "./screenAsModal/useScreenAsModal"

import useI18n from "../modules/i18n/useI18n";
import ScreenAsModal from "./screenAsModal/ScreenAsModal"
import FeatureView from "./FeatureView"

function FeatureScreenAsModal({ feature, onCloseScreen }) {
	const { tr } = useI18n()


	return (
		<ScreenAsModal
			title={`Feature - ${tr(feature.nameLocalized)}`}
			onCloseScreen={onCloseScreen}
		>
			<FeatureView feature={feature} />
		</ScreenAsModal>
	)
}


export function useFeatureScreenAsModal() {
	const { showScreenAsModal } = useScreenAsModal()

	return {
		showFeatureScreenAsModal: (feature) => {
			showScreenAsModal(FeatureScreenAsModal, { feature })
		}
	}
}

export default FeatureScreenAsModal