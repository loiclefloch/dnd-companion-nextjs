import { useState } from 'react'
import useScreenAsModal from "./screenAsModal/useScreenAsModal"

import ScreenAsModal from "./screenAsModal/ScreenAsModal"
import useI18n from "../modules/i18n/useI18n";
import IconShield from "./icons/IconShield"
import IconMagicArmor from "./icons/IconMagicArmor"
import SavingThrows from "./SavingThrows"
import Section from "./Section"


function Shield({ value, label }) {
	return (
		<div
		className="relative flex items-center justify-center align-middle"
	>
		<IconShield className="w-14 h-14 fill-slate-700" />

		<div className="absolute text-xl font-semibold text-slate-700" style={{ marginTop: -6 }}>
			{value}
		</div>
		<div className="absolute -bottom-7 text-md font-semibold text-slate-700">
			{label}
		</div>
	</div>
	)
}

function AcScreenAsModal({ character, onCloseScreen }) {
	const { tr } = useI18n()


	return (
		<ScreenAsModal
			title={`Armure et défense`}
			onCloseScreen={onCloseScreen}
		>

			<div className="px-4">
				<div className='flex justify-between mb-10 mt-4'>
					<Shield value={character.ac.natural} label="Naturelle" />
					<Shield value={character.ac.total} label="Total" />
					<Shield value={character.ac.armor} label="Armure" />
					<Shield value={character.ac.shield} label="Bouclier" />
				</div>	

				{/* TODO: on Modal? */}
				<Section title="Saving throws">
					<SavingThrows savingThrows={character.savingThrows} character={character} />
				</Section>

				<Section title="Protection magique">
					<IconMagicArmor className="w-14 h-14 fill-slate-700" />
					Spell DC: {character.spellSaveDC}
				</Section>
			</div>
		</ScreenAsModal>
	)
}

export function useAcScreenAsModal() {
	const { showScreenAsModal } = useScreenAsModal()

	return {
		showAcScreenAsModal: (character) => {
			showScreenAsModal(AcScreenAsModal, {
				character,
			})
		}
	}
}
