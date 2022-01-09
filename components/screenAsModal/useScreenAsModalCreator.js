import { useState } from "react";

function useScreenAsModalCreator() {
	let [show, setShowScreenAsModal] = useState(false);
	let [screenAsModalConfiguration, setScreenAsModalConfiguration] = useState(null);

	const showScreenAsModal = (component, componentsProps) => {
		// TODO: stack to enable multi-modal opening on top on another
		setShowScreenAsModal(true);
		setScreenAsModalConfiguration({ component, props: componentsProps });
	};

	const hideScreenAsModal = () => {
		setShowScreenAsModal(false)
		setScreenAsModalConfiguration(null)
	}

	return { show, showScreenAsModal, hideScreenAsModal, screenAsModalConfiguration };
};

export default useScreenAsModalCreator