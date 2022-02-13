import React, { createElement, createContext, cloneElement, useState, useEffect, useContext } from "react";
import clsx from "clsx";
import ScreenAsModal from "./screenAsModal/ScreenAsModal";
import useScreenAsModal from "./screenAsModal/useScreenAsModal"

const ScreenActiveContext = createContext({
  setActivescreen: (at) => {},
  activeScreen: "",
	steps: []
});

const ScreenActiveProvider = ({ steps, children, onChangeTitle, onCloseScreen, defaultScreen }) => {
  const [activeScreenIndex, setActiveScreenIndex] = useState(defaultScreen);

	const value = {
		activeScreenIndex,
		setActiveScreenIndex,
		steps,
		isLastStep: activeScreenIndex === steps.length - 1,
		onChangeTitle,
		onCloseScreen,
		next: () => {
			setActiveScreenIndex(activeScreenIndex + 1)
		},
		prev: () => {
			setActiveScreenIndex(activeScreenIndex - 1)
		},
	}

  return (
    <ScreenActiveContext.Provider
      value={value}
    >
      {children}
    </ScreenActiveContext.Provider>
  )
};


function ContentScreenAsModal({ view, viewProps, steps, onCloseScreen, }) {
	const [currentTitle, setCurrentTitle] = useState('')
	
	const onChangeTitle = (newTitle) => setCurrentTitle(newTitle)
	
	return (
		<ScreenActiveProvider defaultScreen={0} steps={steps} onChangeTitle={onChangeTitle} onCloseScreen={onCloseScreen}>
			<ScreenAsModal
				title={currentTitle}
				onCloseScreen={onCloseScreen}
			>
				{createElement(view, { steps, ...viewProps })}
			</ScreenAsModal>
		</ScreenActiveProvider>
	)
}

export function ScreenStep({ screen, title, className, children }) {
	const { activeScreenIndex, steps, onChangeTitle } = useContext(ScreenActiveContext);

	const index = steps.findIndex(s => s === screen)

	useEffect(() => {
		if (index === activeScreenIndex) {
			onChangeTitle(title)
		}
	}, [activeScreenIndex])

	if (activeScreenIndex !== index) {
		return null
	}

	return (
		<div className={clsx("pt-2", className)}>
			{children}
		</div>
	)
}

export function useScreenStep() {
	const data = useContext(ScreenActiveContext);	
	return data
}

export function useStepScreenAsModal() {
	const { showScreenAsModal } = useScreenAsModal()

	return {
		openScreenStep: ({ view, viewProps, steps, }) => {
			showScreenAsModal(ContentScreenAsModal, {
				view,
				viewProps,
				steps,
			})
		}
	}
}