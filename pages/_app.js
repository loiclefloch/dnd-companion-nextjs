import React from 'react'
import clsx from 'clsx';
import '../styles/globals.css'
import { ModalProvider } from "../components/modal/modalContext";
import { CharacterMenuProvider } from "../components/characterMenu/CharacterMenuContext";
import { ScreenAsModalProvider } from "../components/screenAsModal/useScreenAsModal";
import { SidebarMenuProvider } from "../components/sidebarMenu/sidebarMenuContext";
import { CreateCharacterProvider } from "../components/useCreateCharacter"
import { CurrentCharacterProvider } from "../components/useCurrentCharacter"
function MyApp({ Component, pageProps }) {
  return (
    <div
      className={clsx('//dark bg-app', {
        "debug": false
      })}
    >
      <CurrentCharacterProvider>
        <ModalProvider>
          <SidebarMenuProvider>
            <ScreenAsModalProvider>
              <CharacterMenuProvider>
                <CreateCharacterProvider>
                  <Component {...pageProps} />
                </CreateCharacterProvider>
              </CharacterMenuProvider>
            </ScreenAsModalProvider>
          </SidebarMenuProvider>
        </ModalProvider>
      </CurrentCharacterProvider>

      <div id="modal-root" />
    </div>
  )
}

export default MyApp
