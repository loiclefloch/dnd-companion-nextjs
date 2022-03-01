import useScreenAsModal from "./screenAsModal/useScreenAsModal"

import ScreenAsModal from "./screenAsModal/ScreenAsModal"
import { makeI18n } from "../modules/i18n/useI18n";
import FeatContent from "./FeatContent"
import useFeat from "../modules/api/useFeat";

const useI18n = makeI18n({
	'screen.title': {
		fr: 'Talent - %{feat.name}',
		en: 'Feat - %{feat.name}',
	}
})

function FeatScreenAsModal({ index, character, onCloseScreen }) {
	const { tr } = useI18n()
	const featResponse = useFeat(index)

	return (
		<ScreenAsModal
			title={tr('screen.title', { 'feat.name': tr(featResponse.data.nameLocalized)})} 
			isFetching={featResponse.isFetching}
			onCloseScreen={onCloseScreen}
		>
			<FeatContent index={index} feat={featResponse.data} character={character} />
		</ScreenAsModal>
	)
}

export default function useFeatScreenAsModal() {
	const { showScreenAsModal } = useScreenAsModal()

	return {
		showFeatScreenAsModal: (index, character) => {
			showScreenAsModal(FeatScreenAsModal, {
				index,
				character
			})
		}
	}
}
