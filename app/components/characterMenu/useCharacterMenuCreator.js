import { useState } from "react";

export default () => {
	let [show, setShowCharacterMenu] = useState(false);

	const showCharacterMenu = () => {
		setShowCharacterMenu(!show);
	};

	const hideCharacterMenu = () => {
		setShowCharacterMenu(false)
	}

	return { show, showCharacterMenu, hideCharacterMenu };
};
