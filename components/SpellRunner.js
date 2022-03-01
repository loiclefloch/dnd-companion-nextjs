import { makeI18n } from '../modules/i18n/useI18n'
import DamageTypeLabel from "./DamageTypeLabel"
import Button from "./Button"
import useSpellRunner from "./useSpellRunner"

const useI18n = makeI18n({
	'mod pv': {
		fr: '+ %{mod} PV',
		en: '+ %{mod} HP',
	},
	'error cannot cast due to armor not proficiency': {
		fr: `Impossible de caster un sort car vous n'avez pas la maîtrise de votre armure.`,
		en: `Cannot cast a spell because you do not have proficiency with your armor`,
	},
})


function HealRunner({ healAtSlotLevel, spellLevel, formatMod }) {
	const { tr } = useI18n()
	return (
		<div>
			{tr('mod pv', { mod: formatMod(healAtSlotLevel[spellLevel]) })}
		</div>
	)
}

function DamageSlotLevel({ spellLevel, damageAtSlotLevel, damageType, formatMod }) {
	return (
		<div>
			{formatMod(damageAtSlotLevel[spellLevel])}
			<span> </span>
			<DamageTypeLabel damageType={damageType} />
		</div>
	)
}

function DamageCharacterLevel({ characterLevel, damageAtCharacterLevel, damageType, formatMod }) {
	return (
		<div>
			{formatMod(damageAtCharacterLevel[characterLevel])}
			<span> </span>
			<DamageTypeLabel damageType={damageType} />
		</div>
	)
}

function SpellDefinition({ contextCharacter, spell, formatMod }) {
	if (spell.heal) {
		return (
			<HealRunner
				healAtSlotLevel={spell.heal.healAtSlotLevel}
				spellLevel={spell.level}
				formatMod={formatMod}
			/>
		)
	}

	if (spell.damage && spell.damage.damageAtSlotLevel) {
		return (
			<DamageSlotLevel
				spellLevel={spell.level}
				damageAtSlotLevel={spell.damage.damageAtSlotLevel}
				damageType={spell.damage.type}
				formatMod={formatMod}
			/>
		)
	}

	if (spell.damage && spell.damage.damageAtCharacterLevel) {
		return (
			<DamageCharacterLevel
				characterLevel={contextCharacter?.level ?? 1}
				damageAtCharacterLevel={spell.damage.damageAtCharacterLevel}
				damageType={spell.damage.type}
				formatMod={formatMod}
			/>
		)
	}


	return null
}

function SpellRunner({ contextCharacter, hideCasting = false, spell }) {
	const { showSpellRunner } = useSpellRunner()
	const { tr } = useI18n()

	function formatMod(dice) {
		if (contextCharacter) {
			if (dice.includes("MOD")) {
				return <span>{dice.replaceAll("MOD", ``)} {contextCharacter.spellcastingAbilityValue} <span className='text-xs text-meta'>({contextCharacter.spellcastingAbility})</span></span>
			}
		}
		return dice
	}

	return (
		<div className="flex items-center justify-between">
			<div>
				<SpellDefinition
					contextCharacter={contextCharacter}
					spell={spell}
					formatMod={formatMod}
				/>
			</div>
			{!spell.isCantripWithoutNeedToRun 
				&& !hideCasting 
				&& (contextCharacter ? contextCharacter.isProeficientForArmor : true) 
				&& (
					<Button
						className="w-1/3 rounded-sm text-slate-700"
						size="small"
						color="cta"
						variant='outlined'
						onClick={() => showSpellRunner(spell, contextCharacter)}
					>
						{tr('cast')}
					</Button>
				)}
			{contextCharacter && !contextCharacter.isProeficientForArmor && (
				<p className="text-orange-600">
					{tr`error cannot cast due to armor not proficiency`}
				</p>
			)}
		</div>
	)
}

export default SpellRunner