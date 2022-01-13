import { useContext } from "react"
import {createContext} from "react";
import useScreenAsModalCreator from "./useScreenAsModalCreator";
import ScreenAsModalRenderer from "./ScreenAsModalRenderer";

let ScreenAsModalContext;
let { Provider } = (ScreenAsModalContext = createContext());

ScreenAsModalContext.displayName = 'ScreenAsModalContext'

function ScreenAsModalProvider({ children }) {
	let { show, showScreenAsModal, hideScreenAsModal, screenAsModalConfiguration } = useScreenAsModalCreator();

	return (
		<Provider value={{ show, showScreenAsModal, hideScreenAsModal, screenAsModalConfiguration }}>
			<ScreenAsModalRenderer />
			{children}
		</Provider>
	);
};

export { ScreenAsModalContext, ScreenAsModalProvider };

function useScreenAsModal() {
	let { show, showScreenAsModal, hideScreenAsModal } = useContext(ScreenAsModalContext);

	return { show, showScreenAsModal, hideScreenAsModal }
};

export default useScreenAsModal