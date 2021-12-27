// https://dice-roller.github.io/documentation/guide/#how-it-works
import { DiceRoll } from '@dice-roller/rpg-dice-roller';

function Dice({ dice }) {

	const onRun = () => {
		const roll = new DiceRoll(dice)
		alert(`Run dice with ${dice} : ${roll}`)
	}

	return (
		<span className="cursor-pointer" onClick={onRun}>
			{dice}
		</span>
	)
}

export default Dice