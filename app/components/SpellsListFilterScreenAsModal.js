import { useState } from 'react';
import ScreenAsModal from "./screenAsModal/ScreenAsModal"
import useI18n from "../modules/i18n/useI18n";
import useScreenAsModal from "./screenAsModal/useScreenAsModal"
import ButtonBottomScreen from "./ButtonBottomScreen"

function SpellsListFilterScreenAsModal({ onFilter, defaultFilters, onCloseScreen }) {
	const [ filters, setFilters ] = useState(defaultFilters || [])
	const { tr } = useI18n()

	return (
		<ScreenAsModal title={`Filtres`} onCloseScreen={onCloseScreen}>
			<>
				<div>Class</div>
				<div>Sub class</div>
				<div>Level</div>
				<div>School</div>
				<div>Damage type</div>
				<div>Action</div>
				<div>Range</div>
				<div>Concentration</div>
				<div>Ritual</div>
				<div>Source</div>
			</>
			<div>
				<ButtonBottomScreen onClick={() => onFilter(filters)}>
					Valider
				</ButtonBottomScreen>
			</div>
		</ScreenAsModal>
	)
}

function filterSpells(spells, filters) {
	return spells 
}

export function useSpellsListFilterScreenAsModal() {
	const [ filters, setFilters ] = useState([
		{
			type: 'class',
			values: ['druid']
		}
	])
	const { showScreenAsModal } = useScreenAsModal()

	return {
		filters,
		filterSpells: (spells) => filterSpells(spells, filters),
		showSpellsListFilterScreen: () => {
			showScreenAsModal(SpellsListFilterScreenAsModal, {
				onFilter: setFilters,
				filters,
			})
		}
	}
}

export default SpellsListFilterScreenAsModal