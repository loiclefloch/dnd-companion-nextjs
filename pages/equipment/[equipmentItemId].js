import { useRouter } from "next/router";
import Screen from "../../components/Screen"
import EquipmentItemView from "../../components/EquipmentItemView"
import useEquipmentItem from "../../modules/api/useEquipmentItem";
import useI18n from "../../modules/i18n/useI18n";

function EquipmentItem() {
	const { tr } = useI18n()
	const router = useRouter()
	const itemResponse = useEquipmentItem(router.query.equipmentItemId)

	const item = itemResponse.data

  return (
		<Screen
			title={`Équipement - ${tr(item?.nameLocalized || '')}`}
			// titleIcon={<IconScale className="w-6 h-6" />}
			isLoading={itemResponse.isLoading}
			withBottomSpace
		>
			{item && (
				<EquipmentItemView item={itemResponse.data} />
			)}
		</Screen>
	);
}

export default EquipmentItem;
useEquipmentItem