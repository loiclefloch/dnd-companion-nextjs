import { createContext, useState, useContext } from "react";
import clsx from "clsx";

const TabActiveContext = createContext({
  setActivetab: (at) => {},
  activeTab: "",
});

const TabActiveProvider = ({ children, defaultTab }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
  return (
    <TabActiveContext.Provider
      value={{
        activeTab,
        setActiveTab
      }}
    >
      {children}
    </TabActiveContext.Provider>
  );
};

export function Tab({ tab, children }) {
	const { activeTab, setActiveTab } = useContext(TabActiveContext);

	const isActive = activeTab === tab

	return (
		<div
			className={clsx(
				"w-full text-center hover:bg-black/[0.22] font-medium",
				{
					"bg-slate-100": isActive,
					"border-b border-solid border-black/[0.12] bg-black/[0.12]": isActive,
					" border-solid border-b border-black/[0.12]": !isActive,
				}
			)}
			onClick={() => setActiveTab(tab)}
		>
			{children}
		</div>
	)
}

export function Tabs({ children }) {
	return (
		<div
			className="flex justify-center items-center cursor-pointer"
		>
			{children}
		</div>
	)
}

export function TabContent({ tab, className, children }) {
	const { activeTab } = useContext(TabActiveContext);

	if (activeTab !== tab) {
		return null
	}

	return <div className={clsx(className)}>{children}</div>
}

export function TabContainer({ defaultTab, className, children }) {
	return (
		<TabActiveProvider 
			defaultTab={defaultTab}
		>
			<div className={className}>{children}</div>
		</TabActiveProvider>
	)
}
