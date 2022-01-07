import groupBy from "lodash/groupBy"
import useI18n from "../../modules/i18n/useI18n"
import { useRouter } from "next/router"
import Link from "next/link"
import Screen from "../../components/Screen"
import useCurrentCharacter from "../../modules/character/useCurrentCharacter"
import IconBriefcase from "../../components/icons/IconBriefcase"
import IconPlus from "../../components/icons/IconPlus"
import useDice from "../../components/useDice";
import { useEquipmentItemScreenAsModal } from "../../components/EquipmentItemScreenAsModal"

// function ItemRow({ item, onClick }) {
// 	return (
// 		<li className="flex flex-row mb-2 border-gray-400" onClick={onClick}>
// 			<div className="flex items-center flex-1 p-4 bg-white border rounded-md shadow cursor-pointer select-none dark:bg-gray-800">
// 				{item.image && (
// 					<div className="flex flex-col items-center justify-center w-10 h-10 mr-4">
// 						<img src={item.image} />
// 					</div>
// 				)}

// 				<div className="flex-1 pl-1 mr-16">
// 					<div className="font-medium dark:text-white">{item.name}</div>
// 				</div>

// 				<div className="">
// 					<IconChevronRight className="text-gray-500 hover:text-gray-800 dark:hover:text-white dark:text-gray-200" />
// 				</div>
// 			</div>
// 		</li>
// 	)
// }

function ItemRow({ item, onClick }) {
	const { tr } = useI18n()
	const { rollDamage } = useDice()

	const isWeapon = item.equipmentCategory.index === "weapon"
	const isArmor = item.equipmentCategory.index === "armor"
	const isAdventuringGear = item.equipmentCategory.index === "adventuring-gear"
	const isTools = item.equipmentCategory.index === "tools"
	const isMountAndVehicules = item.equipmentCategory.index === "mounts-and-vehicles"

	// TODO:
	const modifier = +2

	return (
		<div
			className={`py-1 border-b border-slate-100 dark:border-gray-50 border-solid  relative`}
			data-cy-item-index={`item-${item.index}`}
		>
			<div className="pl-1">
				<div className="flex flex-row">
					<div className="flex flex-col flex-1" onClick={onClick}>
						<span className="flex flex-row items-center font-semibold">
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
												{item.damage.damageDice} {modifier >= 0 ? '+' : '-'}{modifier} {item.damage.damageType.name}
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

	return (
		<div className="mx-4 mt-2 mb-4 select-none">
			<div className="font-semibold text-md">{title}</div>
			<div className="py-2">
				{items.map((item, index) => (
					<ItemRow
						key={index} // index since we could have multiple times the same item for a character?
						item={item}
						onClick={() => showEquipmentItemScreenAsModal(item.index)}
					/>
				))}
			</div>
		</div>
	)
}

function Character() {
	const router = useRouter()
	const { tr } = useI18n()
	const character = useCurrentCharacter()
	const grouped = groupBy(character?.equipment, item => item.equipmentCategory.index)

	return (
		<Screen
			title={`${character?.name} - Matériel`}
			titleIcon={<IconBriefcase className="w-6 h-6" />}
			withCharacterMenu
			rightAction={
				<button 
					onClick={() => {

					}}
				>
					<IconPlus className={"h-6 w-6 text-slate-800"} />
				</button>
			}
		>
			{character && (
				<>
					<Group title="Armes" items={grouped.weapon} />
					<Group title="Armure" items={grouped.armor} />
					<Group title="adventuring-gear" items={grouped['adventuring-gear']} />
					<Group title="Outils" items={grouped.tools} />
					<Group title="Montures et véhicules" items={grouped['mounts-and-vehicles']} />
				</>
			)}
		</Screen>
	)
}

export default Character