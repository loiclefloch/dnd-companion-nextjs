import useScreenAsModal from "./screenAsModal/useScreenAsModal"
import useEquipmentItem from "../modules/api/useEquipmentItem";

import ScreenAsModal from "./screenAsModal/ScreenAsModal"
import useI18n from "../modules/i18n/useI18n";
import EquipmentItemView from "./EquipmentItemView";

function EquipmentItemScreenAsModal({ index, onCloseScreen }) {
	const { tr } = useI18n()
	const itemResponse = useEquipmentItem(index)

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

export function useEquipmentItemScreenAsModal() {
	const { showScreenAsModal } = useScreenAsModal()

	return {
		showEquipmentItemScreenAsModal: (index) => {
			showScreenAsModal(EquipmentItemScreenAsModal, {
				index
			})
		}
	}
}

export default EquipmentItemScreenAsModal