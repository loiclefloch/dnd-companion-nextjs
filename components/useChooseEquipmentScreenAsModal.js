import { useState, useMemo } from "react"
import { uniqBy, isEmpty } from "lodash"
import clsx from "clsx"
import useScreenAsModal from "./screenAsModal/useScreenAsModal"
import ScreenAsModal from "./screenAsModal/ScreenAsModal"
import { makeI18n } from "../modules/i18n/useI18n";
import useEquipmentCategories from "../modules/api/useEquipmentCategories";
import useTipDamageType from "./useTipDamageType"
import useEquipmentItemScreenAsModal from "./useEquipmentItemScreenAsModal"
import ButtonBottomScreen from "./ButtonBottomScreen"
import { toggleObjectOnArray } from "../modules/utils/array"
import IconChevronToggle from "./icons/IconChevronToggle"
import useLocalSearch from "./useLocalSearch"
import InputSearch from "./InputSearch"

const useI18n = makeI18n({
	"warn.no damages defined": {
		fr: "No damages defined, look at the description",
		en: "No damages defined, look at the description",
	},
})

function ItemRow({ item, onSelect, selected }) {
	const { tr } = useI18n()
	const { showTipDamageType } = useTipDamageType()
	const { showEquipmentItemScreenAsModal } = useEquipmentItemScreenAsModal()

	if (!item) {
		return null
	}

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
							onClick={() => showEquipmentItemScreenAsModal(item)}
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
										<span>{tr`warn.no damages defined`}</span>
									)}
								</>
							)}

							{item.isArmor && (
								<>
									<span>{item.armorCategory} - </span>
									<span>
										AC {item.armorClass.base} {item.stealthDisadvantage && <span>{tr`stealthDisadvantage`}</span>}
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

function Category({ category, selectedItems, onSelect }) {
	const [open, setOpen] = useState(false)
	const { tr } = useI18n()

	return (
		<div className="mx-4 mt-2 mb-4 select-none relative">
			<div 
				className="flex border-b border-solid border-slate-200 sticky top-8 z-10 bg-app"
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

	function onSelect(item) {
		setSelectedItems(toggleObjectOnArray(selectedItems, item, i => i.index === item.index))
	}

	return (
		<ScreenAsModal
			title={`Équipement`}
			onCloseScreen={onCloseScreen}
			isLoading={equipmentCategoriesResponse.isLoading}
			withBottomSpace
		>
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
							onSelect={() => onSelect(searchResult.item)}
							selected={selectedItems.some(selectedItem => searchResult.item.index === selectedItem.index)}
						/>
					))}
				</div>
			) :
				<div className="pt-2">
					{equipmentCategoriesResponse.data?.map(category => (
						<Category
							key={category.index}
							category={category}
							selectedItems={selectedItems}
							onSelect={onSelect}
						/>
					))}
				</div>
			}

			<ButtonBottomScreen
				hide={isEmpty(selectedItems)}
				variant="cta"
				onClick={() => {
					onChooseEquipment(selectedItems)
					onCloseScreen()
				}}
			>
				{tr`add.action`}
			</ButtonBottomScreen>
		</ScreenAsModal>
	)
}

export default function useChooseEquipmentScreenAsModal() {
	const { showScreenAsModal } = useScreenAsModal()

	return {
		showChooseEquipmentModal: (onChooseEquipment) => {
			showScreenAsModal(ChooseEquipmentScreenAsModal, { onChooseEquipment })
		}
	}
}
