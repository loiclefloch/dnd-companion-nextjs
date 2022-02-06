import {createContext} from "react";
import useModalCreator from "./useModalCreator";
import Modal from "./Modal";

let ModalContext;
let { Provider } = (ModalContext = createContext());

ModalContext.displayName = 'ModalContext'

function ModalProvider({ children }) {
	let { show, showModal, hideModal, modalConfiguration } = useModalCreator();

	return (
		<Provider value={{ show, showModal, hideModal, modalConfiguration }}>
			<Modal 
				modalConfiguration={modalConfiguration}
				show={show}
				hideModal={hideModal}
			/>
			{children}
		</Provider>
	);
};

export { ModalContext, ModalProvider };
