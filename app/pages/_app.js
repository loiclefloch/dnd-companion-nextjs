import React from 'react'
import '../styles/globals.css'
import { ModalProvider } from "../components/modal/modalContext";
import { CharacterMenuProvider } from "../components/characterMenu/CharacterMenuContext";
import { ScreenAsModalProvider } from "../components/screenAsModal/screenAsModalContext";
import useCharacterMenu from "../components/characterMenu/useCharacterMenu";
import IconMenu from "../components/icons/IconMenu"

function CharacterMenuButton() {
  const { show, showCharacterMenu } = useCharacterMenu()

  // do not display if character menu is open
  // TODO: show not updated?
  return show ? null : (
    <button 
      className="fixed bottom-0 right-0 flex justify-center w-10 p-2 bg-slate-800 text-white uppercase"
      onClick={showCharacterMenu}
    >
      <IconMenu className="w-5 h-5" />
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
