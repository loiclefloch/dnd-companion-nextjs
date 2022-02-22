import useScreenAsModal from "./screenAsModal/useScreenAsModal"
import useMagicItem from "../modules/api/useMagicItem";

import ScreenAsModal from "./screenAsModal/ScreenAsModal"
import useI18n from "../modules/i18n/useI18n";
import EquipmentItemView from "./EquipmentItemView";

function MagicItemScreenAsModal({ index, onCloseScreen }) {
	const { tr } = useI18n()
	const itemResponse = useMagicItem(index)

	const item = itemResponse.data

	return (
		<ScreenAsModal 
			title={!item ? '' : tr(item.nameLocalized)}
			isLoading={itemResponse.isLoading}
			onCloseScreen={onCloseScreen}
		>
			{item && <EquipmentItemView item={item} />}
		</ScreenAsModal>
	)
}

export default function useMagicItemScreenAsModal() {
	const { showScreenAsModal } = useScreenAsModal()

	return {
		showMagicItemScreenAsModal: (index) => {
			showScreenAsModal(MagicItemScreenAsModal, {
				index
			})
		}
	}
}