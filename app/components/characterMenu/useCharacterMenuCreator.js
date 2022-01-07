import { useState } from "react";

function useCharacterMenuCreator() {
	let [show, setShowCharacterMenu] = useState(false);

	const showCharacterMenu = () => {
		setShowCharacterMenu(!show);
	};

	const hideCharacterMenu = () => {
		setShowCharacterMenu(false)
	}

	return { show, showCharacterMenu, hideCharacterMenu };
};

export default useCharacterMenuCreator