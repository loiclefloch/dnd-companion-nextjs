import clsx from "clsx"
import useScreenAsModal from "./screenAsModal/useScreenAsModal"
import ScreenAsModal from "./screenAsModal/ScreenAsModal"
import useCharacterLevelSelector from "./useCharacterLevelSelector"
import useSpellLevelSelector from "./useSpellLevelSelector"
import useI18n from '../modules/i18n/useI18n'
import ButtonBottomScreen from "./ButtonBottomScreen"
import DamageTypeLabel from "./DamageTypeLabel"
import IconPlusMd from "./icons/IconPlusMd"
import IconMinusMd from "./icons/IconMinusMd"
import { CharacterProvider} from "../modules/character/ContextCharacter"
import useDice from "./useDice"

function Button({ label, onClick }) {
	return <div className="px-2 text-lg cursor-pointer" onClick={onClick}>{label}</div>
}

function ChooseNumber({ level, onChange, maxLevel, label = '' }) {
	const isAboveMaximum = level > maxLevel

	return (
		<div className="flex flex-col items-center select-none">
			<div className="text-lg">{label}</div>
			<div className="flex items-center justify-center mt-6">
				<Button size="big" label={<IconMinusMd className="w-8 h-8" />} onClick={() => onChange(Math.min(level - 1, 5))} />
				<div className={clsx("text-3xl px-4", {
					"text-orange-400": isAboveMaximum
				})}>{level}</div>
				<Button size="big" label={<IconPlusMd className="w-8 h-8" />} onClick={() => onChange(Math.max(level + 1, 18))} />
			</div>
		</div>
	)
}

function Warn({ show, message }) {
	if (!show) {
		return null
	}

	return (
		<div className="text-orange-400">
			<h4 className="text-xl font-semibold">Êtes-vous sûr ?</h4>
			<p className="p-4 px-8">{message}</p>
		</div>
	)
}

function RunnerBlock({ dice, spellLevel, chooser, message, onRun }) {
	return (
		<div className="flex flex-col justify-center flex-1 mt-12 align-center">
			<div className="text-2xl font-semibold">
				{dice}
			</div>

			<div className="mt-12 text-center">
				{message}
			</div>

			<div className="flex flex-col justify-end flex-1">
			

				<div className="flex flex-col items-center justify-end mb-20 text-xl">
					{chooser}
				</div>

				<div className="justify-end mb-20 text-center">
					{spellLevel !== 0 ? (
						<>
							<p>Ce sort utilisera un emplacement de sort de niveau {spellLevel}</p>
							<p>(X restants)</p>
						</>
					) : (
						<>
							<p>Cantrip.</p>
							<p>Aucun emplacement de sort ne sera utilisé.</p>
						</>
					)}
				</div>
			</div>
		
			<div>
				<ButtonBottomScreen
					onClick={onRun}
					variant="cta"
				>
					Lancer le sort
				</ButtonBottomScreen>
			</div>
		</div>
	)
}

function DiceDamage({ dice, damageType }) {
	return (
		<div className="flex flex-col items-center">
			<div>{dice}</div>
			<div className="mt-1">
				<DamageTypeLabel damageType={damageType} />
			</div>
		</div>
	)
}

function DiceHeal({ dice }) {
	return (
		<div className="flex flex-col items-center">
			<div>
				{dice}
				<span> </span>
				<span>PV</span>
			</div>
		</div>
	)
}

// http://localhost:3000/character/spells/aid
// http://localhost:3000/character/spells/healing-word -> MOD
function HealRunner({ 
	spellName, 
	healAtSlotLevel, 
	spellLevel, 
	contextCharacter,
	formatMod,
	onRun, 
}) {
	const { tr } = useI18n()
	const { rollHeal } = useDice()
	const {
		chosenSpellLevel,
		setSpellLevel,
		maxSpellLevel,
		isAboveMaximumSpellLevel
		// characterInContext, To use?
	} = useSpellLevelSelector(spellLevel)

	const shouldWarn = isAboveMaximumSpellLevel

	const modifier = 0 // TODO: spell modifier

	const dice = formatMod(healAtSlotLevel[chosenSpellLevel])

	// TODO: Aid is not a dice but a fix value
	// NOTE: "Aid is per character level" case does not exists yet on the spell list.
	return (
		<RunnerBlock
			contextCharacter={contextCharacter}
			spellLevel={spellLevel}
			dice={
				<DiceHeal
					dice={dice}
				/>
			}
			chooser={
				<ChooseNumber
					label="Niveau du personnage"
					level={chosenSpellLevel}
					onChange={setSpellLevel}
					maxLevel={maxSpellLevel}
				/>
			}
			message={shouldWarn && (
				<div className="text-orange-400">
					<Warn
						show={shouldWarn}
						message={tr({
							en: "The dice are for a level above your maximum level",
							fr: "Les dés sont pour un niveau supérieur à votre niveau",
						})}
					/>
				</div>
			)}
			onRun={() => {
				rollHeal(spellName, dice, modifier)
				onRun()
			}}
		/>
	)
}

function DamageSlotLevel({ 
	spellName, 
	spellLevel, 
	damageAtSlotLevel, 
	damageType,
	contextCharacter,
	onRun, 
	formatMod,
}) {
	const { tr } = useI18n()
	const { rollDamage } = useDice()
	const {
		chosenSpellLevel,
		setSpellLevel,
		maxSpellLevel,
		isAboveMaximumSpellLevel,
		// characterInContext, To use?
	} = useSpellLevelSelector(spellLevel)

	const modifier = 0 // TODO: spell modifier
	const shouldWarn = isAboveMaximumSpellLevel

	const dice = formatMod(damageAtSlotLevel[chosenSpellLevel])

	return (
		<RunnerBlock
			contextCharacter={contextCharacter}
			spellLevel={chosenSpellLevel}
			dice={
				<DiceDamage
					dice={dice}
					damageType={damageType}
				/>
			}
			chooser={
				<ChooseNumber
					label='Niveau du sort'
					level={chosenSpellLevel}
					onChange={setSpellLevel}
					maxLevel={maxSpellLevel}
				/>
			}
			message={
				<div>
					<Warn
						show={shouldWarn}
						message={tr({
							en: "The dice are for a level above the character spell maximum level",
							fr: "Les dés sont pour niveau supérieur à votre maximum",
						})}
					/>
				</div>
			}
			onRun={() => {
				rollDamage(spellName, dice, modifier, damageType)
				onRun()
			}}
		/>
	)
}

// http://localhost:3000/character/spells/chill-touch
function DamageCharacterLevel({ 
	spellName, 
	spellLevel,
	damageAtCharacterLevel, 
	damageType, 
	contextCharacter,
	onRun, 
	formatMod,
}) {
	const { tr } = useI18n()
	const { rollDamage } = useDice()
	const {
		characterLevel,
		setCharacterLevel,
		isAboveMaximumCharacterLevel,
		characterMaxLevel,
		// characterInContext, To use?	
	} = useCharacterLevelSelector()

	const modifier = 0 // TODO: spell modifier
	const shouldWarn = isAboveMaximumCharacterLevel

	const dice = formatMod(damageAtCharacterLevel[characterLevel])
	
	return (
		<RunnerBlock
			contextCharacter={contextCharacter}
			spellLevel={spellLevel}
			dice={
				<DiceDamage
					dice={dice}
					damageType={damageType}
				/>
			}
			chooser={
				<ChooseNumber
					label='Niveau du personnage'
					level={characterLevel}
					onChange={setCharacterLevel}
					maxLevel={characterMaxLevel}
				/>
			}
			message={shouldWarn && (
				<div>
					<Warn
						show={shouldWarn}
						message={tr({
							en: "The dice are for a level above your maximum level",
							fr: "Les dés sont pour un niveau supérieur à votre niveau",
						})}
					/>
				</div>
			)}
			onRun={() => {
				const modifier = ''
				rollDamage(spellName, dice, modifier, damageType)
				onRun()
			}}
		/>
	)
}

function SpellRun({ contextCharacter, spell, onRun }) {
	const { tr } = useI18n()

	function formatMod(dice) {
		if (contextCharacter) {
			return dice.replaceAll("MOD", contextCharacter.spellModValue)
		}
		return dice
	}

	if (spell.heal) {
		return (
			<HealRunner
				spellName={tr(spell.nameLocalized)}
				healAtSlotLevel={spell.heal.healAtSlotLevel}
				spellLevel={spell.level}
				contextCharacter={contextCharacter}
				onRun={onRun}
				formatMod={formatMod}
			/>
		)
	}

	if (spell.damage && spell.damage.damageAtSlotLevel) {
		return (
			<DamageSlotLevel
				spellName={tr(spell.nameLocalized)}
				spellLevel={spell.level}
				damageAtSlotLevel={spell.damage.damageAtSlotLevel}
				damageType={spell.damage.type}
				contextCharacter={contextCharacter}
				onRun={onRun}
				formatMod={formatMod}
			/>
		)
	}

	if (spell.damage && spell.damage.damageAtCharacterLevel) {
		return (
			<DamageCharacterLevel
				spellName={tr(spell.nameLocalized)}
				spellLevel={spell.level}
				characterLevel={contextCharacter?.level ?? 1}
				damageAtCharacterLevel={spell.damage.damageAtCharacterLevel}
				damageType={spell.damage.type}
				contextCharacter={contextCharacter}
				onRun={onRun}
				formatMod={formatMod}
			/>
		)
	}

	if (!contextCharacter) {
		// display nothing since there is no dice to run, only character spell slots to impact
		return null
	}

	return (
		<RunnerBlock
			onRun={onRun}
		/>
	)
}

function SpellRunnerScreenAsModal({ contextCharacter, spell, onCloseScreen }) {
	const { tr } = useI18n()

	function onRun() {
		// TODO: impact spell slot from contextCharacter if given
		onCloseScreen()
	}

	return (
		<ScreenAsModal title={``} onCloseScreen={onCloseScreen}>
			<CharacterProvider character={contextCharacter}>
				<div className="flex flex-col h-full">
					<h2 className="mt-20 text-2xl font-semibold text-center">
						{tr(spell.nameLocalized)}
					</h2>
					<SpellRun spell={spell} contextCharacter={contextCharacter} onRun={onRun} />
				</div>
			</CharacterProvider>
		</ScreenAsModal>
	)
}

export function useSpellRunner() {
	const { showScreenAsModal } = useScreenAsModal()

	return {
		showSpellRunner: (spell, contextCharacter) => {
			showScreenAsModal(SpellRunnerScreenAsModal, { spell, contextCharacter })
		}
	}
}

export default SpellRunnerScreenAsModal