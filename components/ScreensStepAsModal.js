import React, { createContext, cloneElement, useState, useEffect, useContext } from "react";
import clsx from "clsx";
import ScreenAsModal from "./screenAsModal/ScreenAsModal";
import useScreenAsModal from "./screenAsModal/useScreenAsModal"

const ScreenActiveContext = createContext({
  setActivescreen: (at) => {},
  activeScreen: "",
});


function ContentScreenAsModal({ title, steps, onCloseScreen,children }) {
	const [currentTitle, setCurrentTitle] = useState(title)
	return (
		<ScreenAsModal
			title={currentTitle}
			onCloseScreen={onCloseScreen}
		>
			<ScreenStepContainer
				steps={steps}
			>
				{cloneElement(children, 
					{
						steps,
						onCloseScreen,
						onChangeTitle: (newTitle) => setCurrentTitle(newTitle)
					}
				)}
			</ScreenStepContainer>
		</ScreenAsModal>
	)
}

export function useScreenStepAsModal() {
	const { showScreenAsModal } = useScreenAsModal()

	return {
		openScreenStep: (title, steps, children) => {
			showScreenAsModal(ContentScreenAsModal, {
				title,
				steps,
				children,
			})
		}
	}
}

const ScreenActiveProvider = ({ children, steps, defaultScreen }) => {
  const [activeScreen, setActiveScreen] = useState(defaultScreen);

	const value = {
		activeScreen,
		setActiveScreen,
		steps,
		next: () => {
			const currentIndex = steps.findIndex(s => s === activeScreen)
			setActiveScreen(steps[currentIndex + 1])
		},
		prev: () => {
			const currentIndex = steps.findIndex(s => s === activeScreen)
			setActiveScreen(steps[currentIndex - 1])
		}
	}

  return (
    <ScreenActiveContext.Provider
      value={value}
    >
      {children}
    </ScreenActiveContext.Provider>
  )
};

export function ScreenStepContainer({ steps, children }) {
		// all is display on the ScreenModal
	return (
		<ScreenActiveProvider steps={steps} defaultScreen={steps[0]}>
			{children}
		</ScreenActiveProvider>
	)
}

export function ScreenStep({ screen, onChangeTitle, title, className, children }) {
	const { activeScreen } = useContext(ScreenActiveContext);

	useEffect(() => {
		if (screen === activeScreen) {
			onChangeTitle(title)
		}
	}, [screen, activeScreen])

	if (activeScreen !== screen) {
		return null
	}

	return <div className={clsx("pt-2", className)}>{children}</div>
}

export function useScreenStep() {
	const data = useContext(ScreenActiveContext);	
	return data
}