import { useState } from "react";

function useScreenAsModalCreator() {
	let [show, setShowScreenAsModal] = useState(false);
	let [screenAsModalConfiguration, setScreenAsModalConfiguration] = useState(null);

	const showScreenAsModal = (component, componentsProps) => {
		setShowScreenAsModal(!show);
		setScreenAsModalConfiguration({ component, props: componentsProps });
	};

	const hideScreenAsModal = () => {
		setShowScreenAsModal(false)
	}

	return { show, showScreenAsModal, hideScreenAsModal, screenAsModalConfiguration };
};

export default useScreenAsModalCreator