import { useRouter } from 'next/router'

import useSpell from "../../../modules/api/useSpell";
import useI18n from "../../../modules/i18n/useI18n";
import { CharacterProvider} from "../../../modules/character/ContextCharacter"
import useCurrentCharacter from "../../../components/useCurrentCharacter"

import Screen from "../../../components/Screen";
import SpellView from "../../../components/SpellView";
import IconBookOpen from "../../../components/icons/IconBookOpen";
import IconPencil from "../../../components/icons/IconPencil";
import useEditEditCharacterSpellScreenAsModal from "../../../components/useEditEditCharacterSpellScreenAsModal";

function Spell() {
	const router = useRouter()
	const { tr } = useI18n()
	const spellResponse = useSpell(router.query.index);
	const { showEditCharacterSpellModal } = useEditEditCharacterSpellScreenAsModal()
	const { character, characterDispatch } = useCurrentCharacter()

	const spell = spellResponse.data;

	return (
		<CharacterProvider character={character}>
			<Screen
				title={!spell ? 'Sort' : `${tr(spell?.nameLocalized)}`}
				titleIcon={<IconBookOpen className="w-6 h-6" />}
				isLoading={spellResponse.isLoading}
				rightAction={
					<IconPencil
						className="w-5 h-5 text-slate-700"
						onClick={() => showEditCharacterSpellModal(spell, character, characterDispatch)}
					/>
				}
			>
				{spell && (
					<SpellView spell={spell} character={character} />
				)}
			</Screen>
		</CharacterProvider>
	)
}

export default Spell