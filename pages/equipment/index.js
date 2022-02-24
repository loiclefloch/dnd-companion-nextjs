import { useMemo } from "react"
import { uniqBy, isEmpty } from "lodash"
import Link from "next/link"
import Screen from "../../components/Screen"
import useEquipmentCategories from "../../modules/api/useEquipmentCategories";
import useI18n from "../../modules/i18n/useI18n";
import useTipDamageType from "../../components/useTipDamageType"
import useLocalSearch from "../../components/useLocalSearch"
import InputSearch from "../../components/InputSearch"

function ItemRow({ item }) {
	const { tr } = useI18n()
	const { showTipDamageType } = useTipDamageType()

	if (!item) {
		return null
	}

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
												<span>{item.damage.damageDice}</span>
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
										AC {item.armorClass.base} {item.stealthDisadvantage && <span> - Stealth disadvantage</span>}
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

				</div>

				{/* <p className="pr-2 text-sm">{tr(item.resume)}</p> */}

			</div>
		</div>
  );
}

function Category({ category }) {
	const { tr } = useI18n()

	return (
		<div className="relative">
			<div className={`sticky top-8 px-4 py-3 flex items-center font-semibold text-sm 
			text-slate-900 dark:text-slate-200 bg-slate-50/90 dark:bg-slate-700/90 
			backdrop-blur-sm ring-1 ring-slate-900/10 dark:ring-black/10 z-20`}>
				{tr(category.nameLocalized)}
			</div>
			<div className="px-4 py-2 select-none">
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

	const equipmentList = useMemo(
		() => uniqBy(equipmentCategoriesResponse.data?.map(group => group.equipment).flat(), item => item.index), 
		[equipmentCategoriesResponse.data]
	)

	const {
		searchHistory,
		searchResults,
		search,
		term,
		onRemoveHistoryQuery,
		// reset
	} = useLocalSearch('equipment', {
		data: equipmentList,
		options: useLocalSearch.searchOptions.equipment
	})

  return (
		<Screen
			title={"Équipements"}
			// titleIcon={<IconScale className="w-6 h-6" />}
			isLoading={equipmentCategoriesResponse.isLoading}
			root
			withBottomSpace
		>
			<>
				<InputSearch
					className="px-4"
					searchHistory={searchHistory}
					term={term}
					onChange={search}
					onRemoveHistoryQuery={onRemoveHistoryQuery}
				/>
				{searchResults && term ? (
					<div className="mx-4 mt-2 mb-4 select-none">
						{searchResults.map(searchResult => (
							<ItemRow
								key={searchResult.refIndex}
								item={searchResult.item}
							/>
						))}
					</div>
				) : (
					<div className="flex flex-col" data-cy-id="equipments-list">
						{equipmentCategoriesResponse.data?.map(category => (
							<Category key={category.index} category={category} />
						))}
						{/* <Group title="Armes" items={grouped.weapon} />
				<Group title="Armure" items={grouped.armor} />
				<Group title="adventuring-gear" items={grouped['adventuring-gear']} />
				<Group title="Outils" items={grouped.tools} />
				<Group title="Montures et véhicules" items={grouped['mounts-and-vehicles']} /> */}
					</div>
				)}
			</>
		</Screen>
	);
}

export default Equipments;
