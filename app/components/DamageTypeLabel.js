import useI18n from "../modules/i18n/useI18n";


// TODO: icon with tooltip
function DamageTypeLabel({ damageType }) {
	const { tr } = useI18n()
	
	return <span>
		{tr(damageType.nameLocalized)}
	</span>
}

export default DamageTypeLabel