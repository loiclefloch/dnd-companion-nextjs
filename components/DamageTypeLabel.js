import useI18n from "../modules/i18n/useI18n";
import useTipDamageType from "./useTipDamageType"

// TODO: icon with tooltip
function DamageTypeLabel({ damageType }) {
	const { tr } = useI18n()
	const { showTipDamageType } = useTipDamageType()
	
	return (
		<span onClick={() => showTipDamageType(damageType.index)}>
			{damageType ? tr(damageType.nameLocalized) : tr('unknown')}
		</span>
	)
}

export default DamageTypeLabel