import clsx from 'clsx'
import { createElement, useContext } from "react";
import { ScreenAsModalContext } from "./screenAsModalContext";

const ScreenAsModalRenderer = () => {
	const { screenAsModalConfiguration, show, hideScreenAsModal } = useContext(ScreenAsModalContext);

	return <div className={clsx("fixed z-40 inset-0 overflow-y-auto bottom-0 top-0 right-0 left-0 bg-white",
		"transform ease-in-out transition-all duration-300", {
		"-translate-y-0": show,
		"translate-y-full": !show,
	})}
	>
		{screenAsModalConfiguration && createElement(
			screenAsModalConfiguration.component,
			{
				...screenAsModalConfiguration.props,
				onCloseScreen: hideScreenAsModal
			}
		)}
	</div>;

	return null;
};

export default ScreenAsModalRenderer;