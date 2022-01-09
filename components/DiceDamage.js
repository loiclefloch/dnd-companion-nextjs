import Dice from './Dice'
import DamageTypeLabel from './DamageTypeLabel'

function DiceDamage({ dice, damageType, onRoll, disabled }) {
	return <span className='flex items-center justify-center'>
		<Dice dice={dice} onRoll={() => !disabled && onRoll()} />
		<span className='pr-1' />
		<span className="text-sm">
			<DamageTypeLabel damageType={damageType} />
		</span>
	</span>
}

export default DiceDamage