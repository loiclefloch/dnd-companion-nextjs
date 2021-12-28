import useScreenAsModal from "./screenAsModal/useScreenAsModal"
import SpellScreenAsModal from "./SpellScreenAsModal"

function useSpellDialog() {
	const { showScreenAsModal } = useScreenAsModal()

	return {
		showSpellDialog: (name) => {
			showScreenAsModal(SpellScreenAsModal, { name })
		}
	}
}

export default useSpellDialog