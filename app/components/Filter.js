import { useState } from "react";
import clsx from "clsx"
import { deleteObjectOnArray, toggleValueOnArray, updateObjectOrCreateOnArray } from '../modules/utils/array';
import { FilterType as SpellsFilterType } from "../modules/spells/spellsFilter"
import useI18n from "../modules/i18n/useI18n";
import IconX from './icons/IconX';

export function FilterSection({ title, isLoading, children, filters, type, onChange, containerClassName }) {
	const { tr } = useI18n()
	const [open, setOpen] = useState()

	const filter = filters.find(f => f.type === type)

	return <div className='px-2 mb-2 shadow'>
		<div className='flex py-1 pl-2 text-white bg-slate-700'>
			<h4
				className="flex-1"
				style={{
					fontVariant: 'small-caps'
				}}
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
			<div className={clsx('mb-4', containerClassName)}>
				{children}
			</div>
		)}
		{!open && filter && (
			<div className="pt-2 pb-2 pl-2 text-xs text-slate-600 bg-slate-100">
				{Array.isArray(filter.value) && filter.value.map(v => {
					if (v === 0 && type === SpellsFilterType.SPELL_LEVEL) {
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


export function FilterListItem({ item, selected, className, onClick }) {
	return (
		<li
			className={clsx("flex flex-row items-center content-between w-full px-2 py-1", {
				"bg-list-item-selected": selected,
			}, className)}
			onClick={onClick}
		>
			<div className='flex-1'>
				{item.label}
			</div>
			{selected && <IconX className="w-4 h-4" />}
		</li>
	)
}

export function FilterListSelector({ filters, type, list, className, itemClassName, onChange }) {
	const filter = filters.find(f => f.type === type) || { type, value: [] }

	function toggle(item) {
		const updatedFilter = { ...filter }
		updatedFilter.value = toggleValueOnArray(updatedFilter.value, item.value, a => a)
		const updatedFilters = updateObjectOrCreateOnArray(filters, updatedFilter, f => f.type === type)
		onChange(updatedFilters)
	}

	return (
		<ul className={clsx('w-full', className)}>
			{list?.map(item => {
				return (
					<FilterListItem
						key={item.index}
						item={item}
						className={itemClassName}
						onClick={() => toggle(item)}
						selected={filter?.value?.includes(item.value)}
					/>
				)
			})}
		</ul>
	)
}