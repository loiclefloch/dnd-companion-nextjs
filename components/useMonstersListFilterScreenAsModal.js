import { useState } from 'react';
import ScreenAsModal from "./screenAsModal/ScreenAsModal"
import { FilterType, filterMonsters } from "../modules/monsters/monstersFilter"
import useI18n from "../modules/i18n/useI18n";
import useScreenAsModal from "./screenAsModal/useScreenAsModal"
import Button from "./Button"
import BottomScreen from "./BottomScreen"
import {FilterSection, FilterListSelector } from "./Filter"

function FilterDifficulty({ filters, onChange }) {
	const list =  [
		"0",
		"1/8",
		"1/4",
		"1/2",
		"1",
		"2",
		"3",
		"4",
		"5",
		"6",
		"7",
		"8",
		"9",
		"10",
		"11",
		"12",
		"13",
		"14",
		"15",
		"16",
		"17",
		"19",
		"20",
		"21",
		"22",
		"23",
		"24",
		"30",
	].map((value) => ({
		index: value,
		label: value,
		value: value,
	}))

	return (
		<FilterSection 
			title="Difficulty" 
			filters={filters} 
			type={FilterType.DIFFICULTY} 
			options={list}
			onChange={onChange}
		>
			<FilterListSelector
				type={FilterType.DIFFICULTY}
				filters={filters}
				options={list}
				onChange={onChange}
				className="grid grid-cols-4 gap-1 p-1 bg-slate-100"
				itemClassName="bg-white m-0"
			/>
		</FilterSection>
	)
}

function MonstersListFilterScreenAsModal({ onFilter, onReset, filters: defaultFilters, onCloseScreen }) {
	const [filters, setFilters] = useState(defaultFilters || [])
	const { tr } = useI18n()

	return (
		<ScreenAsModal title={`Filtres`} onCloseScreen={onCloseScreen}>
			<>
				<FilterDifficulty filters={filters} onChange={setFilters} />

			</>
			<div>
				<BottomScreen>
					<Button
						size="big"
						variant='outlined'
						onClick={() => {
							onReset()
							onCloseScreen()
						}}
					>
						Reset
					</Button>
					<Button
						size="big"
						variant='cta'
						onClick={() => {
							onFilter(filters)
							onCloseScreen()
						}}
					>
						Valider
					</Button>
				</BottomScreen>

			</div>
		</ScreenAsModal>
	)
}

export default function useMonstersListFilterScreenAsModal(defaultFilters = []) {
	const [filters, setFilters] = useState(defaultFilters)
	const { showScreenAsModal } = useScreenAsModal()

	return {
		filters,
		filterMonsters: (monsters) => filterMonsters(monsters, filters),
		showMonstersListFilterScreen: () => {
			showScreenAsModal(MonstersListFilterScreenAsModal, {
				onReset: () => setFilters(defaultFilters),
				onFilter: setFilters,
				filters,
			})
		}
	}
}
