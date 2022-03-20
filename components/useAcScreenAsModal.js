import { useState } from 'react'
import useScreenAsModal from "./screenAsModal/useScreenAsModal"

import ScreenAsModal from "./screenAsModal/ScreenAsModal"
import { makeI18n } from "../modules/i18n/useI18n";
import IconShield from "./icons/IconShield"
import IconMagicArmor from "./icons/IconMagicArmor"
import SavingThrows from "./SavingThrows"
import Section from "./Section"

const useI18n = makeI18n({
	'screen.title': {
		fr: 'Armure et défense',
		en: 'Armor and defense',
	},
	'savingThrows.title': {
		fr: 'Saving throws', // TODO: i18n
		en: 'Saving throws',
	},
	'magicProtection.title': {
		fr: "Protection magique",
		en: "Magic protection",
	},
	'ac.natural': {
		fr: 'Naturelle',
		en: 'Natural',
	},
	'ac.total': {
		fr: 'Total',
		en: 'Total',
	},
	'ac.armor': {
		fr: 'Armure',
		en: 'Armor',
	},
	'ac.shield': {
		fr: 'Bouclier',
		en: 'Shield',
	},
	'spellSaveDC': {
		fr: 'Spell DC: %{spellSaveDC}',
		en: 'Spell DC: %{spellSaveDC}',
	},
})

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
			title={tr`screen.title`}
			onCloseScreen={onCloseScreen}
		>

			<div className="px-4">
				<div className='flex justify-between mb-10 mt-4'>
					<Shield value={character.ac.natural} label={tr`ac.natural`} />
					<Shield value={character.ac.total} label={tr`ac.total`} />
					<Shield value={character.ac.armor} label={tr`ac.armor`} />
					<Shield value={character.ac.shield} label={tr`ac.shield`} />
				</div>	

				{/* TODO: on Modal? */}
				<Section title={tr`savingThrows.title`}>
					<SavingThrows savingThrows={character.savingThrows} character={character} />
				</Section>

				<Section title={tr`magicProtection.title`}>
					<IconMagicArmor className="w-14 h-14 fill-slate-700" />
					{tr('spellSaveDC', { spellSaveDC: character.spellSaveDC })}
				</Section>
			</div>
		</ScreenAsModal>
	)
}

export default function useAcScreenAsModal() {
	const { showScreenAsModal } = useScreenAsModal()

	return {
		showAcScreenAsModal: (character) => {
			showScreenAsModal(AcScreenAsModal, {
				character,
			})
		}
	}
}
