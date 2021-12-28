import {createContext} from "react";
import useScreenAsModalCreator from "./useScreenAsModalCreator";
import ScreenAsModalRenderer from "./ScreenAsModalRenderer";

let ScreenAsModalContext;
let { Provider } = (ScreenAsModalContext = createContext());

let ScreenAsModalProvider = ({ children }) => {
	let { show, showScreenAsModal, hideScreenAsModal, screenAsModalConfiguration } = useScreenAsModalCreator();

	return (
		<Provider value={{ show, showScreenAsModal, hideScreenAsModal, screenAsModalConfiguration }}>
			<ScreenAsModalRenderer />
			{children}
		</Provider>
	);
};

export { ScreenAsModalContext, ScreenAsModalProvider };
