import { useContext } from "react"
import { ScreenAsModalContext } from './screenAsModalContext'

function useScreenAsModal() {
	let { showScreenAsModal, hideScreenAsModal } = useContext(ScreenAsModalContext);

	return { showScreenAsModal, hideScreenAsModal }
};

export default useScreenAsModal