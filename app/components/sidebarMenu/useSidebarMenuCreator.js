import { useState } from "react";

export default () => {
	let [show, setShowSidebarMenu] = useState(false);

	const showSidebarMenu = (component, componentsProps) => {
		setShowSidebarMenu(!show);
	};

	const hideSidebarMenu = () => {
		setShowSidebarMenu(false)
	}

	return { show, showSidebarMenu, hideSidebarMenu  };
};
