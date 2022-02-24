import useTipDamageType from "./useTipDamageType"
import useI18n from "../modules/i18n/useI18n"
import ItemTagIsEquipped from "./ItemTagIsEquipped"

function CharacterEquipmentItemRow({ character, item, onClick }) {
	const { tr } = useI18n()
	const { showTipDamageType } = useTipDamageType()

	return (
		<div
			className={`py-1 border-b border-slate-100 dark:border-gray-50 border-solid  relative`}
			data-cy-item-index={`item-${item.index}`}
		>
			<div className="pl-1">
				<div className="flex flex-row">
					<div className="flex flex-col flex-1">
						<span 
							className="flex flex-row items-center font-semibold" 
							onClick={onClick}
						>
							<span>{tr(item.nameLocalized)}</span>
							{item.quantity > 1 && <span className="ml-2 text-xs text-meta">x{item.quantity}</span>}
						</span>
						{item.canBeEquipped &&  (
							<div>
								<ItemTagIsEquipped item={item} onClick={onClick} hideNotEquipped />
							</div>
						)}
						<div className="text-sm text-meta">
							{item.isWeapon && (
								<>
									{item.damage && (
										<>
											<span>{item.categoryRange} — </span>
											<span
												className="cursor-pointer"
											>
												<span>
													{item.damage.damageDice}{item?.attackRollModifierLabel || "+MOD"}
												</span>
												<span> </span>
												<span onClick={() => showTipDamageType(item.damage.damageType.index)}>{item.damage.damageType.name}</span>
											</span>
										</>
									)}
									{!item.damage && (
										<span>No damages defined, look at the description</span>
									)}
								</>
							)}

							{item.isArmor && (
								<>
									<span>{item.armorCategory} — </span>
									<span>
										AC {item.armorClass.base} {item.stealthDisadvantage && <span> — Stealth disadvantage</span>}
									</span>
								</>
							)}


							{item.isAdventuringGear && (
								<>
									<span>{item.gearCategory.name}</span>
								</>
							)}

							{item.isTools && (
								<>
									<span>{item.toolCategory}</span>
								</>
							)}

							{item.isMountAndVehicules && (
								<>
									<span>{item.vehicleCategory} </span>
									{item.speed && (
										<span> - {item.speed.quantity} {item.speed.unit}</span>
									)}
								</>
							)}
						</div>
					</div>

					<div
						className="pr-2 mt-1"
					>
						<div className="flex flex-row items-end gap-1">

						</div>
					</div>

				</div>

				<p className="pr-2 text-sm">{tr(item.resume)}</p>

			</div>
		</div>
  );
}

export default CharacterEquipmentItemRow