import React from 'react'
import '../styles/globals.css'
import { ModalProvider } from "../components/modal/modalContext";
import { CharacterMenuProvider } from "../components/characterMenu/CharacterMenuContext";
import { ScreenAsModalProvider } from "../components/screenAsModal/screenAsModalContext";
import useCharacterMenu from "../components/characterMenu/useCharacterMenu";

function CharacterMenuButton() {
  const { show, showCharacterMenu } = useCharacterMenu()

  // do not display if character menu is open
  // TODO: show not updated?
  return show ? null : (
    <button 
      className="fixed bottom-0 left-0 right-0 flex w-full content-center bg-black text-white"
      onClick={showCharacterMenu}
    >
      MENU
    </button>
  )
}
function MyApp({ Component, pageProps }) {
  return <>
    <ModalProvider>
      <CharacterMenuProvider>
        <ScreenAsModalProvider>
          <Component {...pageProps} />
          <CharacterMenuButton />
        </ScreenAsModalProvider>
      </CharacterMenuProvider>
    </ModalProvider>

    <div id="modal-root" />
  </>
}

export default MyApp
