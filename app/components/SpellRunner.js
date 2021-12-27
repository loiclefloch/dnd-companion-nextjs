import { useState, useCallback } from 'react'
import useI18n from '../modules/i18n/useI18n'
import DiceDamage from './DiceDamage'
import ChooseSpellLevel from './ChooseSpellLevel'
import useCharacterLevelSelector from "./useCharacterLevelSelector"
import useSpellLevelSelector from "./useSpellLevelSelector"

function HealRunner({ heal, spellLevel }) {
	const [chosenSpellLevel, setChosenSpellLevel] = useSpellLevelSelector(spellLevel)

	return (
		<div>
			<ChooseSpellLevel 
				spellLevel={spellLevel} 
				chosenSpellLevel={chosenSpellLevel} 
				setChosenSpellLevel={setChosenSpellLevel} 
			/>
		</div>
	)
}

function DamageSlotLevel({ spellLevel, damageAtSlotLevel, damageType }) {
	const [chosenSpellLevel, setChosenSpellLevel] = useSpellLevelSelector(spellLevel)

	return (
		<div className='flex'>
			<DiceDamage dice={damageAtSlotLevel[chosenSpellLevel]} damageType={damageType} />
			<span className="px-1"></span>
			<ChooseSpellLevel 
				spellLevel={spellLevel} 
				chosenSpellLevel={chosenSpellLevel} 
				setChosenSpellLevel={setChosenSpellLevel} 
			/>
		</div>
	)
}

function DamageCharacterLevel({ spellLevel, damageAtCharacterLevel, damageType }) {
	const {tr} = useI18n()
	const [chosenCharacterLevel, setChosenCharacterLevel] = useCharacterLevelSelector()

	return (
		<div>
			<ChooseSpellLevel
				spellLevel={spellLevel}
				chosenSpellLevel={chosenSpellLevel}
				setChosenSpellLevel={setChosenSpellLevel}
			/>
			<DiceDamage dice={damageAtCharacterLevel[chosenCharacterLevel]} damageType={damageType} />
		</div>
	)
}

function SpellRunner({ spell }) {
	if (spell.heal) {
		return <HealRunner heal={spell.heal} />
	}

	if (spell.damage && spell.damage.damageAtSlotLevel) {
		return <DamageSlotLevel spellLevel={spell.level} damageAtSlotLevel={spell.damage.damageAtSlotLevel} damageType={spell.damage.type} />
	}

	if (spell.damage && spell.damage.damageAtCharacterLevel) {
		return <DamageCharacterLevel spellLevel={spell.level} damageAtCharacterLevel={spell.damage.damageAtCharacterLevel} damageType={spell.damage.type} />
	}

	return null
}

export default SpellRunner