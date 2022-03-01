import useModal from "./useModal"
import useI18n from "../modules/i18n/useI18n"
import weaponProperties from "../database/data/weapon-properties.json"

function useTipWeaponProperty() {
	const { showInfoModal } = useModal()
	const { tr } = useI18n()

	return {
		showTipWeaponProperty: (index) => { 
			const weaponProperty = weaponProperties.find(w => w.index === index)

			showInfoModal({ 
				content: (
					<div>
						<p className="mt-2 whitespace-pre-wrap">
							{tr(weaponProperty.desc)}
						</p>
					</div>
				)
			})
		}
	}
}

export default useTipWeaponProperty