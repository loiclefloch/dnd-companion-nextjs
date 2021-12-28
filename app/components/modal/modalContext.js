import {createContext} from "react";
import useModalCreator from "./useModalCreator";
import Modal from "./Modal";

let ModalContext;
let { Provider } = (ModalContext = createContext());

ModalContext.displayName = 'ModalContext'

let ModalProvider = ({ children }) => {
	let { show, showModal, hideModal, modalConfiguration } = useModalCreator();

	return (
		<Provider value={{ show, showModal, hideModal, modalConfiguration }}>
			<Modal />
			{children}
		</Provider>
	);
};

export { ModalContext, ModalProvider };
