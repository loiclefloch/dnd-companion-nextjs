import React from 'react'
import '../styles/globals.css'
import { ModalProvider } from "../components/modal/modalContext";
import { CharacterMenuProvider } from "../components/characterMenu/CharacterMenuContext";
import { ScreenAsModalProvider } from "../components/screenAsModal/screenAsModalContext";
import { SidebarMenuProvider } from "../components/sidebarMenu/sidebarMenuContext";
function MyApp({ Component, pageProps }) {
  return (
    <div 
      className='//dark bg-app'
    >
      <ModalProvider>
        <SidebarMenuProvider>
          <CharacterMenuProvider>
            <ScreenAsModalProvider>
              <Component {...pageProps} />
            </ScreenAsModalProvider>
          </CharacterMenuProvider>
        </SidebarMenuProvider>
      </ModalProvider>

      <div id="modal-root" />
    </div>
  )
}

export default MyApp
