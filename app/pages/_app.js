import React from 'react'
import '../styles/globals.css'
import { ModalProvider } from "../components/modalContext";

function MyApp({ Component, pageProps }) {
  return <>
    <ModalProvider>
      <Component {...pageProps} />
    </ModalProvider>

    <div id="modal-root"></div>
  </>
}

export default MyApp
