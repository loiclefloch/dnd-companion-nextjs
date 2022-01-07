import { useRouter } from 'next/router'

import useSpell from "../../../modules/api/useSpell";
import useI18n from "../../../modules/i18n/useI18n";
import { CharacterProvider} from "../../../modules/character/ContextCharacter"
import useCurrentCharacter from "../../../modules/character/useCurrentCharacter"

import Screen from "../../../components/Screen";
import SpellView from "../../../components/SpellView";
import IconBookOpen from "../../../components/icons/IconBookOpen";
import IconPencil from "../../../components/icons/IconPencil";
import { useEditEditCharacterSpellScreenAsModal } from "../../../components/EditCharacterSpellScreenAsModal";

function Spell() {
	const router = useRouter()
	const { tr } = useI18n()
	const spellResponse = useSpell(router.query.index);
	const {showEditCharacterSpellModal } = useEditEditCharacterSpellScreenAsModal()
	const currentCharacter = useCurrentCharacter()

	const spell = spellResponse.data;

	return (
		<CharacterProvider character={currentCharacter} withCharacterMenu>
			<Screen
				title={!spell ? 'Sort' : `${tr(spell?.nameLocalized)}`}
				titleIcon={<IconBookOpen className="w-6 h-6" />}
				isLoading={spellResponse.isLoading}
				rightAction={
					<IconPencil
						className="w-5 h-5 text-slate-700"
						onClick={() => showEditCharacterSpellModal(spell, currentCharacter)}
					/>
				}
			>
				{spell && (
					<SpellView spell={spell} contextCharacter={currentCharacter} />
				)}
			</Screen>
		</CharacterProvider>
	)
}

export default Spell