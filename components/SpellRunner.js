import useI18n from '../modules/i18n/useI18n'
import DamageTypeLabel from "./DamageTypeLabel"
import Button from "./Button"
import { useSpellRunner } from "./SpellRunnerScreenAsModal"

function HealRunner({ healAtSlotLevel, spellLevel, formatMod }) {
	return (
		<div>
			+ {formatMod(healAtSlotLevel[spellLevel])} PV
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
	const { tr } = useI18n()

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

	function formatMod(dice) {
		if (contextCharacter) {
			if (dice.includes("MOD")) {
				return <span>{dice.replaceAll("MOD", ``)} {contextCharacter.spellModValue} <span className='text-xs text-meta'>({contextCharacter.spellMod})</span></span>
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
			{!spell.isCantripWithoutNeedToRun && !hideCasting && (
				<Button
					className="w-1/3 rounded-sm text-slate-700"
					size="small"
					color="cta"
					variant='outlined'
					onClick={() => showSpellRunner(spell, contextCharacter)}
				>
					Caster
				</Button>
			)}
		</div>
	)
}

export default SpellRunner