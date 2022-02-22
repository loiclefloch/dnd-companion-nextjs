import useScreenAsModal from "./screenAsModal/useScreenAsModal"

import SpellView from "../components/SpellView";
import ScreenAsModal from "./screenAsModal/ScreenAsModal"
import ScreenAsModalLoading from "./screenAsModal/ScreenAsModalLoading"

import useSpell from "../modules/api/useSpell";
import useI18n from "../modules/i18n/useI18n";

function SpellScreenAsModal({ index, onCloseScreen }) {
 const spellResponse = useSpell(index);
 const { tr } = useI18n()

  const spell = spellResponse.data;

  if (spellResponse.isLoading) {
    return <ScreenAsModalLoading />
  }

	return (
		<ScreenAsModal title={`Sort - ${tr(spell.nameLocalized)}`} onCloseScreen={onCloseScreen}>
			<SpellView spell={spell} />
		</ScreenAsModal>
	)
}


export default function useSpellModal() {
	const { showScreenAsModal } = useScreenAsModal()

	return {
		showSpellModal: (index) => {
			showScreenAsModal(SpellScreenAsModal, { index })
		}
	}
}
