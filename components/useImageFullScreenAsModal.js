import { useState } from 'react';
import Image from "next/image"
import ScreenAsModal from "./screenAsModal/ScreenAsModal"
import useScreenAsModal from "./screenAsModal/useScreenAsModal"

function ImageFullScreenAsModal({ alt, src, onCloseScreen }) {
	return (
		<ScreenAsModal title={alt} onCloseScreen={onCloseScreen}>
			<div className='flex items-center content-center flex-1 h-full'>
				<Image 
					src={src}    
					alt={alt}
					width="100%"
					height="100%"
				/>
			</div>
		</ScreenAsModal>
	)
}

export default function useImageFullScreenAsModal(defaultFilters = []) {
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