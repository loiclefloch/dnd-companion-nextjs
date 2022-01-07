import { useContext } from "react"
import { SidebarMenuContext } from './sidebarMenuContext'

function useSidebarMenu() {
	let { show, showSidebarMenu, hideSidebarMenu } = useContext(SidebarMenuContext);

	return { show, showSidebarMenu, hideSidebarMenu }
};

export default useSidebarMenu