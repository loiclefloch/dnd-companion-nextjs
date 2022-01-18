import { useState, useMemo } from "react"
import { uniqBy } from "lodash"
import clsx from "clsx"
import Link from "next/link"
import useScreenAsModal from "./screenAsModal/useScreenAsModal"
import ScreenAsModal from "./screenAsModal/ScreenAsModal"
import useI18n from "../modules/i18n/useI18n";
import useEquipmentCategories from "../modules/api/useEquipmentCategories";
import useTipDamageType from "./useTipDamageType"
import { useEquipmentItemScreenAsModal } from "./EquipmentItemScreenAsModal"
import ButtonBottomScreen from "./ButtonBottomScreen"
import { isEmpty } from "lodash"
import IconChevronToggle from "./icons/IconChevronToggle"
import useLocalSearch from "./useLocalSearch"

function ItemRow({ item, onSelect, selected }) {
	if (!item) {
		return null
	}
	const { tr } = useI18n()
	const { showTipDamageType } = useTipDamageType()
	const { showEquipmentItemScreenAsModal } = useEquipmentItemScreenAsModal()

	return (
		<div
			className={`py-1 border-b border-slate-100 dark:border-gray-50 border-solid  relative`}
			data-cy-item-index={`item-${item.index}`}
		>
			<div className="pl-1">
				<div className="flex flex-row items-center">
					<div className="flex flex-col flex-1">
						<span
							className="flex flex-row items-center font-semibold"
							onClick={() => showEquipmentItemScreenAsModal(item.index)}
						>
							<span>{tr(item.nameLocalized)}</span>
						</span>

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

					<div>
						<div 
							className={clsx("ml-4 w-4 h-4 border border-blue-400 border-solid rounded-full", {
								"bg-blue-400": selected
							})}
							onClick={onSelect}
						/>
					</div>
				</div>

				{/* <p className="pr-2 text-sm">{tr(item.resume)}</p> */}

			</div>
		</div>
  );
}

function Group({ category, selectedItems, onSelect }) {
	const [open, setOpen] = useState(false)
	const { tr } = useI18n()

	return (
		<div className="mx-4 mt-2 mb-4 select-none">
			<div 
				className="flex border-b border-solid border-slate-200"
				onClick={() => setOpen(!open)}
			>
				<div
					className="flex-1 pb-1 font-semibold text-md"
				>
					{tr(category.nameLocalized)}
				</div>
				<div>
					<IconChevronToggle open={open} className="text-gray-600 dark:text-gray-400" />
				</div>
			</div>
			<div 
				className={clsx("py-2", 
					"transform ease-in-out transition-all duration-300", {
					"translate-y-0": open, // TODO: fix animation
					"hidden translate-y-full": !open,
				})}
			>
				{category.equipment.map(item => (
					<ItemRow
						key={`${category.index}_${item.index}`}
						item={item}
						onSelect={() => onSelect(item)}
						selected={selectedItems.some(selectedItem => item.index === selectedItem.index)}
					/>
				))}
				
			</div>
		</div>
	)
}

const searchOptions = { keys: [
	'index', 
	'name', 
	'equipmentCategory.name',
	'nameLocalized.en',

	'weaponCategory',
	'weaponRange',
	'damage.damageType.name'

	// TODO: must give path to a string
	// 'equipmentCategory', 
	// 'properties',
	// 'resume',
	// 'nameLocalized',
	// 'description',
] }

// TODO: proficiences
function ChooseEquipmentScreenAsModal({ onChooseEquipment, onCloseScreen }) {
	const { tr } = useI18n()
	const [selectedItems, setSelectedItems] = useState([])
	const equipmentCategoriesResponse = useEquipmentCategories()

	const equipmentList = useMemo(
		() => uniqBy(equipmentCategoriesResponse.data?.map(group => group.equipment).flat(), item => item.index), 
		[equipmentCategoriesResponse.data]
	)

	const {
		searchResults,
		search,
		term,
		// reset
	} = useLocalSearch({
		data: equipmentList,
		options: searchOptions
	})

	function onSelect(item) {
		setSelectedItems([ ...selectedItems, item ])
	}

	return (
		<ScreenAsModal
			title={`Équipement`}
			onCloseScreen={onCloseScreen}
			isLoading={equipmentCategoriesResponse.isLoading}
		>
			<div className="px-4">
				<input
					type="search"
					className="w-full py-0.5 px-2 border-gray-300 rounded-md sm:text-sm"
					value={term} 
					onChange={e => search(e.target.value)}
				/>
			</div>	

			{searchResults && term ? (
				<div className="mx-4 mt-2 mb-4 select-none">
					{searchResults.map(searchResult => (
						<ItemRow
							key={searchResult.refIndex}
							item={searchResult.item}
							onSelect={() => onSelect(searchResult.item)}
							selected={selectedItems.some(selectedItem => searchResult.item.index === selectedItem.index)}
						/>
					))}
				</div>
			) :
				equipmentCategoriesResponse.data?.map(category => (
					<Group
						key={category.index}
						category={category}
						selectedItems={selectedItems}
						onSelect={onSelect}
					/>
				))
			}

			<ButtonBottomScreen
				hide={isEmpty(selectedItems)}
				variant="cta"
				onClick={() => {
					onChooseEquipment(selectedItems)
					onCloseScreen()
				}}
			>
				Ajouter
			</ButtonBottomScreen>
		</ScreenAsModal>
	)
}

export function useChooseEquipmentScreenAsModal() {
	const { showScreenAsModal } = useScreenAsModal()

	return {
		showChooseEquipmentModal: (onChooseEquipment) => {
			showScreenAsModal(ChooseEquipmentScreenAsModal, { onChooseEquipment })
		}
	}
}
