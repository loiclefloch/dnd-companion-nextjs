import {createContext} from "react";
import useSidebarMenuCreator from "./useSidebarMenuCreator";
import SidebarMenu from "./SidebarMenu";

let SidebarMenuContext;
let { Provider } = (SidebarMenuContext = createContext());

SidebarMenuContext.displayName = 'SidebarMenuContext'

let SidebarMenuProvider = ({ children }) => {
	let { show, showSidebarMenu, hideSidebarMenu } = useSidebarMenuCreator();

	return (
		<Provider value={{ show, showSidebarMenu, hideSidebarMenu  }}>
			<SidebarMenu show={show} onClose={hideSidebarMenu} />
			{children}
		</Provider>
	);
};

export { SidebarMenuContext, SidebarMenuProvider };
