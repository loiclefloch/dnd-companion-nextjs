import groupBy from "lodash/groupBy"
import Link from "next/link"
import Screen from "../../components/Screen"
import useEquipmentCategories from "../../modules/api/useEquipmentCategories";
import useI18n from "../../modules/i18n/useI18n";

function ItemRow({ item }) {
	const { tr } = useI18n()

	return (
		<div
			className={`py-1 border-b border-slate-100 dark:border-gray-50 border-solid  relative`}
			data-cy-item-index={`item-${item.index}`}
		>
			<div className="pl-1">
				<div className="flex flex-row">
					<div className="flex flex-col flex-1">
						<Link href={item.isMagicItem ? `/magic-item/${item.index}` : `/equipment/${item.index}`}>
							<span className="flex flex-row items-center font-semibold">
								<span>{tr(item.nameLocalized)}</span>
							</span>
						</Link>
						<div className="text-md">
							{tr(item.resume)}
						</div>
						<div className="text-sm text-meta">
							{item.isWeapon && (
								<>
									{item.damage && (
										<>
											<span>{item.categoryRange} - </span>
											<span className="cursor-pointer">
												{item.damage.damageDice} {item.damage.damageType.name}
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

function Group({ category }) {
	const { tr } = useI18n()

	return (
		<div className="mx-4 mt-2 mb-4 select-none">
			<div className="font-semibold text-md">{tr(category.nameLocalized)}</div>
			<div className="py-2">
				{category.equipment.map(item => (
					<ItemRow
						key={`${category.index}_${item.index}`}
						item={item}
					/>
				))}
			</div>
		</div>
	)
}

function Equipments() {
	const equipmentCategoriesResponse = useEquipmentCategories()

  return (
		<Screen
			title={"Équipements"}
			// titleIcon={<IconScale className="w-6 h-6" />}
			isLoading={equipmentCategoriesResponse.isLoading}
			root
			withBottomSpace
		>
			<div className="flex flex-col" data-cy-id="equipments-list">
				{equipmentCategoriesResponse.data?.map(category => (
					<Group key={category.index} category={category} />
				))}
				{/* <Group title="Armes" items={grouped.weapon} />
				<Group title="Armure" items={grouped.armor} />
				<Group title="adventuring-gear" items={grouped['adventuring-gear']} />
				<Group title="Outils" items={grouped.tools} />
				<Group title="Montures et véhicules" items={grouped['mounts-and-vehicles']} /> */}
			</div>
		</Screen>
	);
}

export default Equipments;
