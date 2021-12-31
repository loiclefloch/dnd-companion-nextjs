// https://dice-roller.github.io/documentation/guide/#how-it-works
import { DiceRoll } from '@dice-roller/rpg-dice-roller';
import { valueToModifier, valueToModifierLabel } from "../modules/stats"
import useDiceHistory from './useDiceHistory';

function useDice() {
	const { addDice } = useDiceHistory()
	function rollStat(label, value, options = {}) {
		const { successValue = null, isReroll = false } = options
		const modifier = valueToModifier(value)

		const dice = `1d20`
		const diceRollResult = new DiceRoll(dice)

		const diceResult = Number(diceRollResult.total)

		const result = diceResult + modifier
		const isSuccess = successValue !== null ? result >= successValue : false

		const roll = {
			dice,
			diceFormatted: `1d20${modifier >= 0 ? '+' : '-'}${Math.abs(modifier)}`,
			isReroll,
			value,
			modifier,
			modifierLabel: valueToModifierLabel(value),
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
			diceRollResult: { // transform class object to json, to have a proper JSON history
				...diceRollResult.toJSON(), rolls: diceRollResult.rolls.map(roll => ({
					label: roll.toString(),
					...roll.toJSON()
				}))
			},
		}

		addDice({
			label,
			roll,
			onValidate: () => { },
			onReroll: () => {
				rollStat(label, value, { ...options, isReroll: true })
			},
		})
	}

	return {
		rollDice: (label, dice) => {
			// TODO: refactor
			const roll = new DiceRoll(dice)
			addDice({ label, dice, roll })
		},
		rollStat,
	}
}

export default useDice