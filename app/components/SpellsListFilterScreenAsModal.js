import { useState } from 'react';
import clsx from "clsx"
import ScreenAsModal from "./screenAsModal/ScreenAsModal"
import { FilterType, filterSpells } from "../modules/spells/spellsFilter"
import useI18n from "../modules/i18n/useI18n";
import useScreenAsModal from "./screenAsModal/useScreenAsModal"
import Button from "./Button"
import BottomScreen from "./BottomScreen"
import useClasses from "../modules/api/useClasses"
import useTheme from '../modules/theme/useTheme';
import { deleteObjectOnArray, toggleValueOnArray, updateObjectOrCreateOnArray } from '../modules/utils/array';
import IconX from './icons/IconX';

const MAX_SPELL_LEVEL = 9 // maximum spell level

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
				{Array.isArray(filter.value) && filter.value.map(v => tr(v)).join(', ')}
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

function FilterClasses({ filters, onChange }) {
	const { tr } = useI18n()
	const classesResponse = useClasses()

	return (
		<Section
			title="Classes"
			isLoading={classesResponse.isLoading}
			filters={filters}
			type={FilterType.CLASS}
			onChange={onChange}
		>
			<ListSelector
				type={FilterType.CLASS}
				filters={filters}
				list={classesResponse.data?.map(clss => ({
					index: clss.index,
					label: tr(clss.nameLocalized),
					value: clss.index,
				}))}
				onChange={onChange}
			/>
		</Section>
	)
}


function FilterSpellLevel({ filters, onChange }) {
	const { tr } = useI18n()
	const classesResponse = useClasses()

	const list = [...Array(MAX_SPELL_LEVEL + 1)].map((_, index) => ({
		index: index,
		label: index,
		value: index,
	}))

	return (
		<Section title="Spell level" isLoading={classesResponse.isLoading} filters={filters} type={FilterType.SPELL_LEVEL} onChange={onChange}>
			<ListSelector
				type={FilterType.SPELL_LEVEL}
				filters={filters}
				list={list}
				onChange={onChange}
			/>
		</Section>
	)
}

const TEST_FILTERS = [
	{
		type: FilterType.CLASS,
		value: ['druid']
	},
	{
		type: FilterType.SPELL_LEVEL,
		value: [0, 1]
	}
]

function SpellsListFilterScreenAsModal({ onFilter, onReset, filters: defaultFilters, onCloseScreen }) {
	const [filters, setFilters] = useState(defaultFilters || [])
	const { tr } = useI18n()

	return (
		<ScreenAsModal title={`Filtres`} onCloseScreen={onCloseScreen}>
			<>
				<FilterClasses filters={filters} onChange={setFilters} />
				<FilterSpellLevel filters={filters} onChange={setFilters} />

				{/* <div>Sub class</div>
				<div>School</div>
				<div>Damage type</div>
				<div>Action</div>
				<div>Range</div>
				<div>Concentration</div>
				<div>Ritual</div>
				<div>Source</div> */}
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

export function useSpellsListFilterScreenAsModal(defaultFilters = []) {
	const [filters, setFilters] = useState(defaultFilters)
	const { showScreenAsModal } = useScreenAsModal()

	return {
		filters,
		filterSpells: (spells) => filterSpells(spells, filters),
		showSpellsListFilterScreen: () => {
			showScreenAsModal(SpellsListFilterScreenAsModal, {
				onReset: () => setFilters(defaultFilters),
				onFilter: setFilters,
				filters,
			})
		}
	}
}

export default SpellsListFilterScreenAsModal