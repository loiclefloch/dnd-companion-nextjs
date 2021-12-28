import { createElement, useContext } from "react";
import { ScreenAsModalContext } from "./screenAsModalContext";

const ScreenAsModalRenderer = () => {
	const { screenAsModalConfiguration, show, hideScreenAsModal } = useContext(ScreenAsModalContext);

	if (show && show) {
		return <div className="fixed z-30 inset-0 overflow-y-auto bottom-0 top-0 right-0 left-0 bg-white">
			{createElement(
				screenAsModalConfiguration.component,
				{
					...screenAsModalConfiguration.props,
					onCloseScreen: hideScreenAsModal
				}
			)}
		</div>;
	}

	return null;
};

export default ScreenAsModalRenderer;