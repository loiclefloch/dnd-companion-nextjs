import useScreenAsModal from "./screenAsModal/useScreenAsModal"
import SpellCard from "../components/SpellCard";
import SpellDetail from "../components/SpellDetail";
import ScreenAsModal from "./screenAsModal/ScreenAsModal"
import ScreenAsModalLoading from "./screenAsModal/ScreenAsModalLoading"

import useSpell from "../modules/api/useSpell";
import useI18n from "../modules/i18n/useI18n";

function SpellScreenAsModal({ name, onCloseScreen }) {
 const spellResponse = useSpell(name);
 const { tr } = useI18n()

  const spell = spellResponse.data;

  if (spellResponse.isLoading) {
    return <ScreenAsModalLoading />
  }

	return (
		<ScreenAsModal title={`Sort - ${tr(spell.nameLocalized)}`} onCloseScreen={onCloseScreen}>
			<>
				<SpellCard spell={spell} />
				<SpellDetail spell={spell} />
			</>
		</ScreenAsModal>
	)
}


export function useSpellModal() {
	const { showScreenAsModal } = useScreenAsModal()

	return {
		showSpellModal: (name) => {
			showScreenAsModal(SpellScreenAsModal, { name })
		}
	}
}

export default SpellScreenAsModal