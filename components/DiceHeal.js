
import Dice from './Dice'

function DiceHeal({ dice, onRoll, disabled }) {
	return <span className='flex items-center'>
		<Dice dice={dice} onRoll={!disabled && onRoll()} />
		<span className='pr-1' />
		<span className="text-sm">
			heal
		</span>
	</span>
}

export default DiceHeal