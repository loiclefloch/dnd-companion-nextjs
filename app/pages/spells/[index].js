import { useRouter } from 'next/router'

import useSpell from "../../modules/api/useSpell";
import useI18n from "../../modules/i18n/useI18n";

import Screen from "../../components/Screen";
import SpellCard from "../../components/SpellCard";
import SpellDetail from "../../components/SpellDetail";

function Spell() {
	const router = useRouter()
	const { tr } = useI18n()
	const spellResponse = useSpell(router.query.index);
	const spell = spellResponse.data;

	return (
		<Screen 
			title={!spell ? 'Sort' : `Sort - ${tr(spell?.nameLocalized)}`}
			isLoading={spellResponse.isLoading}
			withBottomSpace
		>
			{spell && (
				<>
					<SpellCard spell={spell} />
					<div className='px-4 pt-4'>
						<SpellDetail spell={spell} />
					</div>
				</>
			)}
		</Screen>
	)
}

export default Spell