import { useState } from "react";

function useSidebarMenuCreator() {
	let [show, setShowSidebarMenu] = useState(false);

	return {
		show,
		showSidebarMenu: () => {
			setShowSidebarMenu(!show);
		},
		hideSidebarMenu: () => {
			setShowSidebarMenu(false)
		}
	};
};

export default useSidebarMenuCreator