import { useState } from 'react';
import clsx from "clsx"
import ScreenAsModal from "./screenAsModal/ScreenAsModal"
import { FilterType, filterMonsters } from "../modules/monsters/monstersFilter"
import useI18n from "../modules/i18n/useI18n";
import useScreenAsModal from "./screenAsModal/useScreenAsModal"
import Button from "./Button"
import BottomScreen from "./BottomScreen"
import useTheme from '../modules/theme/useTheme';
import { deleteObjectOnArray, toggleValueOnArray, updateObjectOrCreateOnArray } from '../modules/utils/array';
import IconX from './icons/IconX';

function Section({ title, isLoading, children, filters, type, onChange }) {
	const { tr } = useI18n()
	const [open, setOpen] = useState()

	const filter = filters.find(f => f.type === type)

	return <div className='px-2 mb-2'>
		<div className='flex bg-slate-800 text-white pl-2 py-1'>
			<h4
				className="flex-1"
				onClick={() => setOpen(!open)}
			>
				{title}
			</h4>
			{filter && (
				<span
					className="pr-1"
					onClick={() => onChange(deleteObjectOnArray(filters, f => f.type === type))}
				>
					<IconX className="w-5 h-5 text-slate-200" />
				</span>
			)}
		</div>
		{open && (
			<div className='mb-4'>
				{children}
			</div>
		)}
		{!open && filter && (
			<div className="mb-2 pl-2 mt-2 text-xs text-slate-600">
				{Array.isArray(filter.value) && filter.value.map(v => {
					if (v === 0 && type === FilterType.MONSTER_LEVEL) {
						return tr('cantrip')
					}
					return tr(v)
				}).join(', ')}
				{typeof filter.value == 'boolean' && (value ? "oui" : "non")}
				{typeof filter.value == 'string' && tr(value)}
			</div>
		)}
	</div>
}

function ListItem({ item, selected, onClick }) {
	const theme = useTheme()

	return (
		<li
			className={clsx("flex flex-row items-center content-between w-full px-2 py-1", {
				[theme.listItemSelectedBackground]: selected,
			})}
			onClick={onClick}
		>
			<div className='flex-1'>
				{item.label}
			</div>
			{selected && <IconX className="w-4 h-4" />}
		</li>
	)
}

function ListSelector({ filters, type, list, onChange }) {
	const filter = filters.find(f => f.type === type) || { type, value: [] }

	function toggle(item) {
		const updatedFilter = { ...filter }
		updatedFilter.value = toggleValueOnArray(updatedFilter.value, item.value, a => a)
		const updatedFilters = updateObjectOrCreateOnArray(filters, updatedFilter, f => f.type === type)
		onChange(updatedFilters)
	}

	return (
		<ul className='w-full'>
			{list?.map(item => {
				return (
					<ListItem
						key={item.index}
						item={item}
						onClick={() => toggle(item)}
						selected={filter?.value?.includes(item.value)}
					/>
				)
			})}
		</ul>
	)
}

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
		<Section 
			title="Difficulty" 
			filters={filters} 
			type={FilterType.DIFFICULTY} 
			onChange={onChange}
			>
			<ListSelector
				type={FilterType.DIFFICULTY}
				filters={filters}
				list={list}
				onChange={onChange}
			/>
		</Section>
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
						variant='outlined'
						onClick={() => {
							onReset()
							onCloseScreen()
						}}
					>
						Reset
					</Button>
					<Button
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

export function useMonstersListFilterScreenAsModal(defaultFilters = []) {
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

export default MonstersListFilterScreenAsModal