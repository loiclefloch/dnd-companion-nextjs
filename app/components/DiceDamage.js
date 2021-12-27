
import Dice from './Dice'
import DamageTypeLabel from './DamageTypeLabel'

function DiceDamage({ dice, damageType }) {
	return <span className='flex items-center'>
		<Dice dice={dice} />
		<span className='pr-1' />
		<span className="text-sm">
			<DamageTypeLabel damageType={damageType} />
		</span>
	</span>
}

export default DiceDamage