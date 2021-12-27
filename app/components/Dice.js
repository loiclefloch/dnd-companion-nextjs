// https://dice-roller.github.io/documentation/guide/#how-it-works
import { DiceRoll } from '@dice-roller/rpg-dice-roller';

function Dice({ dice, onRoll }) {
	return (
		<span className="cursor-pointer select-none" onClick={() => {
			// TODO: handle 1d8 + MOD (ex: Cure Wounds)
			const roll = new DiceRoll(dice)
			onRoll(dice, roll)
		}}>
			{dice}
		</span>
	)
}

export default Dice