
import Dice from './Dice'

function DiceHeal({ dice, onRoll }) {
	return <span className='flex items-center'>
		<Dice dice={dice} onRoll={onRoll} />
		<span className='pr-1' />
		<span className="text-sm">
			heal
		</span>
	</span>
}

export default DiceHeal