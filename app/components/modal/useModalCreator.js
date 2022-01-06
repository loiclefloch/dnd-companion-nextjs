import { useState } from "react";

function useModalCreator() {
	let [show, setShowModal] = useState(false);
	// - content
	// - type: WARN, INFO, SUCCESS, VALIDATION
	let [modalConfiguration, setModalConfiguration] = useState(null);

	const showModal = (content = false) => {
		setShowModal(!show);
		if (content) {
			setModalConfiguration(content);
		}
	};

	const hideModal = () => {
		setShowModal(false)
	}

	return { show, showModal, hideModal, modalConfiguration };
};

export default useModalCreator