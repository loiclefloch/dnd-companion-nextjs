// https://dice-roller.github.io/documentation/guide/#how-it-works
import { DiceRoll } from '@dice-roller/rpg-dice-roller';
import { valueToModifier, valueToModifierLabel } from "../modules/stats"
import useDiceHistory from './useDiceHistory';

function diceRollResultToString(diceRollResult) {
	return { // transform class object to json, to have a proper JSON history
		...diceRollResult.toJSON(),
		rolls: diceRollResult.rolls.map(roll => {
			if (roll.toJSON) {
				return {
					label: roll.toString(),
					...roll.toJSON()
				}
			}
			return {
				label: roll.toString(),
				roll
			}
		})
	}
}
function useDice() {
	const { addDice } = useDiceHistory()

	function rollDice(label, dice, options = {}) {
		const diceRollResult = new DiceRoll(dice)
		const diceResult = Number(diceRollResult.total)
		const result = diceResult

		const roll = { 
			label,
			dice,
			roll,
			diceResult,
			result,
			diceRollResult: diceRollResultToString(diceRollResult),
		}
		
		addDice({
			label,
			historyLabel: label,
			roll,
			onValidate: () => { },
			onReroll: () => {
				rollDice(label, dice, { ...options, isReroll: true })
			},
		})
	}

	function rollStat(label, value, options = {}) {
		const { successValue = null, isReroll = false } = options
		const modifier = valueToModifier(value)

		const dice = `1d20`
		const diceRollResult = new DiceRoll(dice)

		const diceResult = Number(diceRollResult.total)

		const result = diceResult + modifier
		const isSuccess = successValue !== null ? result >= successValue : false

		const roll = {
			isRollStat: true,
			// specific to this roll
			value,
			modifier,
			modifierLabel: valueToModifierLabel(value),	
			// generic roll data 
			dice,
			diceFormatted: `1d20${modifier >= 0 ? '+' : '-'}${Math.abs(modifier)}`,
			isReroll,
			isSuccess,
			isFailure: !isSuccess,
			result,
			successValue,
			successCheckLabel: `>= ${value}`,
			diceResult,
			canCalculateSuccess: successValue !== null,
			isCritic: diceResult === 20 || diceResult === 1,
			isCriticSuccess: diceResult === 20,
			isCriticFailure: diceResult === 1,
			diceRollResult: diceRollResultToString(diceRollResult),
		}

		addDice({
			label,
			historyLabel: label,
			roll,
			onValidate: () => { },
			onReroll: () => {
				rollStat(label, value, { ...options, isReroll: true })
			},
		})
	}

	function rollDamage(label, diceToRun, modifier, damageType, options = {}) {
		const { isReroll = false } = options

		const dice = `${diceToRun}${modifier >= 0 ? '+' : '-'}${Math.abs(modifier)}`

		const diceRollResult = new DiceRoll(dice)

		const diceResult = Number(diceRollResult.total)

		const result = diceResult
		const isSuccess = true

		const roll = {
			isRollDamage: true,

			// specific to this roll
			damageType,
			modifier,
			modifierLabel: `${modifier >= 0 ? '+' : '-'}${Math.abs(modifier)}`,
			// generic roll data 
			dice,
			diceFormatted: `${dice}`,
			isReroll,
			isSuccess,
			isFailure: !isSuccess,
			result,
			successValue: '',
			successCheckLabel: ``,
			diceResult,
			canCalculateSuccess: false,
			isCritic: false,
			isCriticSuccess: false,
			isCriticFailure: false,
			diceRollResult: diceRollResultToString(diceRollResult),
		}

		addDice({
			label,
			historyLabel: `${label} (${damageType.name})`, 
			roll,
			onValidate: () => { },
			onReroll: () => {
				rollDamage(label, diceToRun, modifier, damageType, { ...options, isReroll: true })
			},
		})
	}

	function rollHeal(label, diceToRun, modifier, options = {}) {
		const { isReroll = false } = options

		const dice = `${diceToRun}${modifier >= 0 ? '+' : '-'}${Math.abs(modifier)}`

		const diceRollResult = new DiceRoll(dice)

		const diceResult = Number(diceRollResult.total)

		const result = diceResult
		const isSuccess = true

		const roll = {
			isRollHeal: true,

			// specific to this roll
			modifier,
			modifierLabel: `${modifier >= 0 ? '+' : '-'}${Math.abs(modifier)}`,
			// generic roll data 
			dice,
			diceFormatted: `${dice}`,
			isReroll,
			isSuccess,
			isFailure: !isSuccess,
			result,
			successValue: '',
			successCheckLabel: ``,
			diceResult,
			canCalculateSuccess: false,
			isCritic: false,
			isCriticSuccess: false,
			isCriticFailure: false,
			diceRollResult: diceRollResultToString(diceRollResult),
		}

		addDice({
			label,
			historyLabel: label,
			roll,
			onValidate: () => { },
			onReroll: () => {
				rollDamage(label, diceToRun, modifier, { ...options, isReroll: true })
			},
		})
	}

	return {
		rollDice,
		rollDamage,
		rollHeal,
		rollStat,
	}
}

export default useDice
