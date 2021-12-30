import { useState } from 'react';
import ScreenAsModal from "./screenAsModal/ScreenAsModal"
import useScreenAsModal from "./screenAsModal/useScreenAsModal"

function ImageFullScreenAsModal({ alt, src, onCloseScreen }) {
	return (
		<ScreenAsModal title={alt} alt={alt} onCloseScreen={onCloseScreen}>
			<div className='flex content-center items-center flex-1 h-full'>
				<img src={src} className='w-full' />
			</div>
		</ScreenAsModal>
	)
}

export function useImageFullScreenAsModal(defaultFilters = []) {
	const { showScreenAsModal } = useScreenAsModal()

	return {
		showImageFullScreen: (alt, src) => {
			showScreenAsModal(ImageFullScreenAsModal, {
				alt,
				src,
			})
		}
	}
}

export default ImageFullScreenAsModal