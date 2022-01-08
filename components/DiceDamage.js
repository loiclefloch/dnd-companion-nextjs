import Dice from './Dice'
import DamageTypeLabel from './DamageTypeLabel'

function DiceDamage({ dice, damageType, onRoll }) {
	return <span className='flex items-center'>
		<Dice dice={dice} onRoll={onRoll} />
		<span className='pr-1' />
		<span className="text-sm">
			<DamageTypeLabel damageType={damageType} />
		</span>
	</span>
}

export default DiceDamage