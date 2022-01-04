import { useState } from "react";
import clsx from "clsx"
import { deleteObjectOnArray, toggleValueOnArray, updateObjectOrCreateOnArray } from '../modules/utils/array';
import useI18n from "../modules/i18n/useI18n";
import IconX from './icons/IconX';
import IconChevronToggle from './icons/IconChevronToggle';
import { isEmpty } from "lodash";


function cleanFilters(filters) {
	// remove empty filters
	return filters.map(filter => {
		// we selected values from a list and then remove all the values one by one.
		// array is now empty. we need to remove the filter, otherwise we will filter with an empty 
		// array which makes 0 results because they are 0 match.
		if (Array.isArray(filter.value) && isEmpty(filter.value)) {
			return null
		}
		return filter
	}).filter(Boolean)
}

export function FilterSection({
	title,
	isLoading,
	children,
	filters,
	options, // when filter is an array, used to find the value's label
	type,
	onChange,
	containerClassName
}) {
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
			<div>
				<IconChevronToggle open={open} className="pr-2" />
			</div>
		</div>
		{open && (
			<div className={clsx('mb-4', containerClassName)}>
				{children}
			</div>
		)}
		{!open && filter && !isLoading && (
			<div className="flex pt-2 pb-2 pl-2 text-xs text-slate-600 bg-slate-100">
				<div className="flex flex-wrap flex-1 gap-2">
					{Array.isArray(filter.value) &&
						filter.value.map(v => {
							const option = options.find(option => option.value === v)
							// add span for flex to be able to work when the label is not a JSX element (string, number)
							return (
								<span
									key={String(v)}
									onClick={() => {
										const updatedFilter = { ...filter }
										updatedFilter.value = toggleValueOnArray(updatedFilter.value, option.value, a => a)
										const updatedFilters = updateObjectOrCreateOnArray(filters, updatedFilter, f => f.type === type)
										onChange(cleanFilters(updatedFilters))
									}}
								>
									{option.label}
								</span>
							)
						})
					}
					{typeof filter.value == 'boolean' && (value ? "oui" : "non")}
					{typeof filter.value == 'string' && tr(value)}
				</div>
				{filter && (
					<span
						className="px-2"
						onClick={() => onChange(cleanFilters(deleteObjectOnArray(filters, f => f.type === type)))}
					>
						<IconX className="w-5 h-5 text-slate-600" />
					</span>
				)}

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

export function FilterListSelector({ filters, type, options, className, itemClassName, onChange }) {
	const filter = filters.find(f => f.type === type) || { type, value: [] }

	function toggle(item) {
		const updatedFilter = { ...filter }
		updatedFilter.value = toggleValueOnArray(updatedFilter.value, item.value, a => a)
		const updatedFilters = updateObjectOrCreateOnArray(filters, updatedFilter, f => f.type === type)
		onChange(cleanFilters(updatedFilters))
	}

	return (
		<ul className={clsx('w-full', className)}>
			{options?.map(item => {
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