import { useContext } from "react"
import { ScreenAsModalContext } from './screenAsModalContext'

function useScreenAsModal() {
	let { show, showScreenAsModal, hideScreenAsModal } = useContext(ScreenAsModalContext);

	return { show, showScreenAsModal, hideScreenAsModal }
};

export default useScreenAsModal