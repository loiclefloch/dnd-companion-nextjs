import DiceDamage from './DiceDamage'
import DiceHeal from './DiceHeal'
import ChooseSpellLevel from './ChooseSpellLevel'
import useCharacterLevelSelector from "./useCharacterLevelSelector"
import useSpellLevelSelector from "./useSpellLevelSelector"
import useValidation from './useValidation'
import useDiceHistory from './useDiceHistory'
import useI18n from '../modules/i18n/useI18n'

function HealRunner({ spellName, healAtSlotLevel, spellLevel }) {
	const { askValidation } = useValidation()
	const { addDice } = useDiceHistory()
	const { 
		chosenSpellLevel,
		setSpellLevel, 
		maxSpellLevel, 
		isAboveMaximumSpellLevel
		// characterInContext, To use?
	} = useSpellLevelSelector(spellLevel)

	// TODO: Aid is not a dice but a fix value
	// TODO: Aid is per character level, some per slot level
	return (
		<div className="flex">
			<DiceHeal
				dice={healAtSlotLevel[chosenSpellLevel]}
				onRoll={(dice, roll) => {
					const result = () => {
						addDice({ label: `${spellName} Heal`, dice, roll })
					}
					const shouldWarn = isAboveMaximumSpellLevel
					if (shouldWarn) {
						// warn about dice being above the max level then run dice if confirm
						askValidation(
							'Are you sure?',
							'The dice you are about to roll is for a level above the character spell maximum level',
							result
						)
					} else {
						// run dice directly
						result()
					}
				}}
			/>
			<span className="px-1"></span>
			<ChooseSpellLevel
				label="character level"
				level={chosenSpellLevel}
				onChange={setSpellLevel}
				maxLevel={maxSpellLevel}
			/>
		</div>
	)
}

function DamageSlotLevel({ spellName, spellLevel, damageAtSlotLevel, damageType }) {
	const { tr } = useI18n()
	const { askValidation } = useValidation()
	const { addDice } = useDiceHistory()
	const {
		chosenSpellLevel,
		setSpellLevel,
		maxSpellLevel,
		isAboveMaximumSpellLevel,
		// characterInContext, To use?
	} = useSpellLevelSelector(spellLevel)

	return (
		<div className='flex'>
			<DiceDamage
				dice={damageAtSlotLevel[chosenSpellLevel]}
				damageType={damageType}
				onRoll={(dice, roll) => {
					const result = () => {
						addDice({ label: `${spellName} ${tr(damageType.nameLocalized)} damages`, dice, roll })
					}
					const shouldWarn = isAboveMaximumSpellLevel
					if (shouldWarn) {
						// warn about dice being above the max level then run dice if confirm
						askValidation(
							'Are you sure?',
							'The dice you are about to roll is for a level above the character spell maximum level',
							result
						)
					} else {
						// run dice directly
						result()
					}
				}}
			/>
			<span className="px-1"></span>
			<ChooseSpellLevel
				label='spell level'
				level={chosenSpellLevel}
				onChange={setSpellLevel}
				maxLevel={maxSpellLevel}
			/>
		</div>
	)
}

function DamageCharacterLevel({ spellName, spellLevel, damageAtCharacterLevel, damageType }) {
	const { tr } = useI18n()
	const { askValidation } = useValidation()
	const { addDice } = useDiceHistory()
	const {
		characterLevel,
		setCharacterLevel,
		isAboveMaximumCharacterLevel,
		characterMaxLevel,
		// characterInContext, To use?	
	} = useCharacterLevelSelector()

	return (
		<div className='flex'>
			<DiceDamage
				dice={damageAtCharacterLevel[characterLevel]}
				damageType={damageType}
				onRoll={(dice, roll) => {
					const result = () => {
						addDice({ label: `${spellName} ${tr(damageType.nameLocalized)} damages`, dice, roll })
					}
					const shouldWarn = isAboveMaximumCharacterLevel
					if (shouldWarn) {
						// warn about dice being above the max level then run dice if confirm
						askValidation(
							'Are you sure?',
							'The dice you are about to roll is for a level above the character level',
							result
						)
					} else {
						// run dice directly
						result()
					}
				}}
			/>
			<span className="px-1"></span>
			<ChooseSpellLevel
				label='character level'
				level={characterLevel}
				onChange={setCharacterLevel}
				maxLevel={characterMaxLevel}
			/>
		</div>
	)
}

function SpellRunner({ spell }) {
	const { tr } = useI18n()

	if (spell.heal) {
		return <HealRunner spellName={tr(spell.nameLocalized)} healAtSlotLevel={spell.heal.healAtSlotLevel} spellLevel={spell.level} />
	}

	if (spell.damage && spell.damage.damageAtSlotLevel) {
		return <DamageSlotLevel spellName={tr(spell.nameLocalized)} spellLevel={spell.level} damageAtSlotLevel={spell.damage.damageAtSlotLevel} damageType={spell.damage.type} />
	}

	if (spell.damage && spell.damage.damageAtCharacterLevel) {
		return <DamageCharacterLevel spellName={tr(spell.nameLocalized)} spellLevel={spell.level} damageAtCharacterLevel={spell.damage.damageAtCharacterLevel} damageType={spell.damage.type} />
	}

	return null
}

export default SpellRunner