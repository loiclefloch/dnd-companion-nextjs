import useScreenAsModal from "./screenAsModal/useScreenAsModal"
import useEquipmentItem from "../modules/api/useEquipmentItem";

import ScreenAsModal from "./screenAsModal/ScreenAsModal"
import useI18n from "../modules/i18n/useI18n";
import EquipmentItemView from "./EquipmentItemView";

function EquipmentItemScreenAsModal({ item, onCloseScreen }) {
	const { tr } = useI18n()

	return (
		<ScreenAsModal 
			title={!item ? '' : tr(item.nameLocalized)}
			onCloseScreen={onCloseScreen}
		>
			{item && <EquipmentItemView item={item} />}
		</ScreenAsModal>
	)
}

export function useEquipmentItemScreenAsModal() {
	const { showScreenAsModal } = useScreenAsModal()

	return {
		showEquipmentItemScreenAsModal: (item) => {
			showScreenAsModal(EquipmentItemScreenAsModal, {
				item
			})
		}
	}
}

export default EquipmentItemScreenAsModal