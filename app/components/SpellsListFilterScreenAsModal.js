import { useState } from 'react';
import ScreenAsModal from "./screenAsModal/ScreenAsModal"
import { FilterType, filterSpells } from "../modules/spells/spellsFilter"
import useI18n from "../modules/i18n/useI18n";
import useScreenAsModal from "./screenAsModal/useScreenAsModal"
import Button from "./Button"
import BottomScreen from "./BottomScreen"
import useClasses from "../modules/api/useClasses"
import useMagicSchools from "../modules/api/useMagicSchools"
import IconMagicSchool from './icons/IconMagicSchool';
import {FilterSection, FilterListSelector } from "./Filter"

const MAX_SPELL_LEVEL = 9 // maximum spell level


function FilterClasses({ filters, onChange }) {
	const { tr } = useI18n()
	const classesResponse = useClasses()

	const options = classesResponse.data?.map(clss => ({
		index: clss.index,
		label: tr(clss.nameLocalized),
		value: clss.index,
	}))

	return (
		<FilterSection
			title="Classes"
			isLoading={classesResponse.isLoading}
			filters={filters}
			type={FilterType.CLASS}
			onChange={onChange}
			options={options}
		>
			<FilterListSelector
				type={FilterType.CLASS}
				filters={filters}
				className="divide-y bg-slate-100 divide"
				options={options}
				onChange={onChange}
			/>
		</FilterSection>
	)
}


function FilterSpellLevel({ filters, onChange }) {
	const { tr } = useI18n()
	const classesResponse = useClasses()

	const options = [...Array(MAX_SPELL_LEVEL + 1)].map((_, index) => ({
		index: index,
		label: index === 0 ? 'Cantrip' : index,
		value: index,
	}))

	return (
		<FilterSection 
			title="Spell level" 
			isLoading={classesResponse.isLoading} 
			filters={filters} 
			type={FilterType.SPELL_LEVEL} 
			onChange={onChange}
			options={options}
		>
			<FilterListSelector
				type={FilterType.SPELL_LEVEL}
				filters={filters}
				options={options}
				onChange={onChange}
				className="grid grid-cols-4 gap-1 p-1 bg-slate-100"
				itemClassName="bg-white m-0"
			/>
		</FilterSection>
	)
}

function FilterMagicSchool({ filters, onChange }) {
	const { tr } = useI18n()
	const magicSchoolsResponse = useMagicSchools()

	const options = magicSchoolsResponse.data?.map(magicSchool => ({
		index: magicSchool.index,
		label: (
			<span className='flex items-center'>
				<IconMagicSchool school={magicSchool.index} className="h-6 mr-2 2-6" />
				{tr(magicSchool.nameLocalized)}
			</span>
		),
		value: magicSchool.index,
	}))

	return (
		<FilterSection
			title="Magic schools"
			isLoading={magicSchoolsResponse.isLoading}
			filters={filters}
			options={options}
			type={FilterType.MAGIC_SCHOOL}
			onChange={onChange}
		>
			<FilterListSelector
				type={FilterType.MAGIC_SCHOOL}
				filters={filters}
				className="divide-y bg-slate-100 divide"
				options={options}
				onChange={onChange}
			/>
		</FilterSection>
	)
}

function SpellsListFilterScreenAsModal({ onFilter, onReset, filters: defaultFilters, onCloseScreen }) {
	const [filters, setFilters] = useState(defaultFilters || [])
	const { tr } = useI18n()

	return (
		<ScreenAsModal title={`Filtres`} onCloseScreen={onCloseScreen}>
			<>
				<FilterClasses filters={filters} onChange={setFilters} />
				<FilterSpellLevel filters={filters} onChange={setFilters} />	
				<FilterMagicSchool filters={filters} onChange={setFilters} />


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