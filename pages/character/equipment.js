import isEmpty from "lodash/isEmpty"
import groupBy from "lodash/groupBy"
import useI18n from "../../modules/i18n/useI18n"
import { useRouter } from "next/router"
import Screen from "../../components/Screen"
import useCurrentCharacter from "../../modules/character/useCurrentCharacter"
import IconBriefcase from "../../components/icons/IconBriefcase"
import IconPlus from "../../components/icons/IconPlus"
import useDice from "../../components/useDice";
import { useEquipmentItemScreenAsModal } from "../../components/EquipmentItemScreenAsModal"
import { useMagicItemScreenAsModal } from "../../components/MagicItemScreenAsModal"
import { useChooseEquipmentScreenAsModal } from "../../components/ChooseEquipmentScreenAsModal"
import useTipDamageType from "../../components/useTipDamageType"
import Button from "../../components/Button"

function ItemRow({ item, onClick }) {
	const { tr } = useI18n()
	const { rollDamage } = useDice()
	const { showTipDamageType } = useTipDamageType()

	// TODO:
	const modifier = +2

	return (
		<div
			className={`py-1 border-b border-slate-100 dark:border-gray-50 border-solid  relative`}
			data-cy-item-index={`item-${item.index}`}
		>
			<div className="pl-1">
				<div className="flex flex-row">
					<div className="flex flex-col flex-1">
						<span className="flex flex-row items-center font-semibold" onClick={onClick}>
							<span>{tr(item.nameLocalized)}</span>
						</span>
						<div className="text-sm text-meta">
							{item.isWeapon && (
								<>
									{item.damage && (
										<>
											<span>{item.categoryRange} - </span>
											<span
												className="cursor-pointer"
												
											>
												<span
													onClick={(e) => {
														rollDamage(
															`${tr(item.nameLocalized)}`,
															item.damage.damageDice,
															modifier,
															item.damage.damageType
														)
														e.preventDefault()
													}}
												>
													{item.damage.damageDice} {modifier >= 0 ? '+' : '-'}{modifier}
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
									<span>{item.armorCategory} - </span>
									<span>
										AC {item.armorClass.base} {item.stealthDisadvantage && <span>Stealth disavantage</span>}
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

function Group({ title, items }) {
	const { showEquipmentItemScreenAsModal } = useEquipmentItemScreenAsModal()
	const { showMagicItemScreenAsModal } = useMagicItemScreenAsModal()

	if (!items) {
		return null
	}

	return (
		<div className="mx-4 mt-2 mb-4 select-none">
			<div className="font-semibold text-md">{title}</div>
			<div className="py-2">
				{items?.map((item, index) => (
					<ItemRow
						key={index} // index since we could have multiple times the same item for a character?
						item={item}
						onClick={() => {
							if (item.isMagicItem) {
								showMagicItemScreenAsModal(item.index)
							} else {
								showEquipmentItemScreenAsModal(item.index)
							}
						}}
					/>
				))}
			</div>
		</div>
	)
}

function Character() {
	const router = useRouter()
	const { tr } = useI18n()
	const { character } = useCurrentCharacter()
	const { showChooseEquipmentModal } = useChooseEquipmentScreenAsModal()
	const grouped = groupBy(character?.equipment, item => item.equipmentCategory.index)
	
	// X adventuring-gear
	// X ammunition
	// X armor
	// X mounts-and-vehicles
	// X potion
	// X ring
	// X rod
	// scroll
	// staff
	// tools
	// wand
	// weapon
	// wondrous-items

	function onShowChooseEquipmentModal() {
		showChooseEquipmentModal(
			function onChooseEquipment(list) {

			}
		)
	}

	return (
		<Screen
			title={`${character?.name} - Matériel`}
			titleIcon={<IconBriefcase className="w-6 h-6" />}
			withCharacterMenu
			rightAction={
				<button 
					onClick={onShowChooseEquipmentModal}
				>
					<IconPlus className={"h-6 w-6 text-slate-800"} />
				</button>
			}
		>
			{isEmpty(character?.equipment) && (
				<div className="px-4">
					<p className="mt-12 text-center">
						Vous n'avez pas d'équipment.
					</p>
					<Button 
						variant="outlined"
						className="mt-12"
						onClick={onShowChooseEquipmentModal}
					>
						Ajouter de l'équipment
					</Button>
				</div>
			)}
			{character && (
				<>
					<Group title="Armes" items={grouped.weapon} />
					<Group title="Armure" items={grouped.armor} />
					<Group title="Ring" items={grouped.ring} />
					<Group title="Ammunition" items={grouped.ammunition} />
					<Group title="adventuring-gear" items={grouped['adventuring-gear']} />
					<Group title="Potions" items={grouped.potion} />
					<Group title="Outils" items={grouped.tools} />
					<Group title="Montures et véhicules" items={grouped['mounts-and-vehicles']} />
					<Group title="wondrous-items" items={grouped['wondrous-items']} />
					<Group title="Rod" items={grouped.rod} />
					<Group title="Scroll" items={grouped.scroll} />
					<Group title="Staff" items={grouped.staff} />
					<Group title="Wand" items={grouped.wand} />

				</>
			)}
		</Screen>
	)
}

export default Character