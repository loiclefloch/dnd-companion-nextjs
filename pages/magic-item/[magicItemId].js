import { useRouter } from "next/router";
import Screen from "../../components/Screen"
import EquipmentItemView from "../../components/EquipmentItemView"
import useI18n from "../../modules/i18n/useI18n";
import useMagicItem from "../../modules/api/useMagicItem";

function MagicItem() {
	const { tr } = useI18n()
	const router = useRouter()
	const itemResponse = useMagicItem(router.query.magicItemId)

	const item = itemResponse.data

  return (
		<Screen
			title={`Item magique - ${tr(item?.nameLocalized || '')}`}
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

export default MagicItem;