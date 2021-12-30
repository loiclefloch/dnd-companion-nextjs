import React from 'react'
import '../styles/globals.css'
import clsx from "clsx";
import { ModalProvider } from "../components/modal/modalContext";
import { CharacterMenuProvider } from "../components/characterMenu/CharacterMenuContext";
import { ScreenAsModalProvider } from "../components/screenAsModal/screenAsModalContext";
import { SidebarMenuProvider } from "../components/sidebarMenu/sidebarMenuContext";
import useCharacterMenu from "../components/characterMenu/useCharacterMenu";
import useSidebarMenu from "../components/sidebarMenu/useSidebarMenu";
import IconMenu from "../components/icons/IconMenu"

function CharacterMenuButton() {
	const { show: sidebarMenuShown } =  useSidebarMenu()
  const { show: characterMenuShown, showCharacterMenu } = useCharacterMenu()

  const showButton = characterMenuShown || sidebarMenuShown

  // do not display if character menu is open
  return (
    <button 
      className={clsx("fixed z-40 bottom-0 right-0 flex justify-center w-10 p-2 bg-slate-800 text-white uppercase", {
        "opacity-100 duration-500": !showButton,
        "opacity-0 duration-500": showButton,
      })}
      onClick={showCharacterMenu}
    >
      <IconMenu className="w-5 h-5" />
    </button>
  )
}
function MyApp({ Component, pageProps }) {
  return <>
    <ModalProvider>
      <SidebarMenuProvider>
        <CharacterMenuProvider>
          <ScreenAsModalProvider>
            <Component {...pageProps} />
            <CharacterMenuButton />
          </ScreenAsModalProvider>
        </CharacterMenuProvider>
      </SidebarMenuProvider>
    </ModalProvider>

    <div id="modal-root" />
  </>
}

export default MyApp
