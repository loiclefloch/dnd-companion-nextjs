import { useState } from "react";

export default () => {
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
