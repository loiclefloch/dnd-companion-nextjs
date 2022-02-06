import { useState } from 'react';
import clsx from "clsx"
import ScreenAsModal from "./screenAsModal/ScreenAsModal"
import useScreenAsModal from "./screenAsModal/useScreenAsModal"

function GalleryFullScreenAsModal({ title, images, currentImage, onCloseScreen }) {
	const [image, setImage ] = useState(currentImage || images[0])

	return (
		<ScreenAsModal title={title} onCloseScreen={onCloseScreen}>
			<div className='flex items-center content-center flex-1 h-full'>
				<div
					onClick={() => {
						const index = images.findIndex(imageData => imageData.url === image.url)
						setImage(images[index === 0 ? images.length - 1: index - 1])
					}}
					className='absolute top-0 bottom-0 left-0 w-1/5'
				>
				</div>
				<img src={image.url} className='w-full' alt={image.label} />
				<div
					onClick={() => {
						const index = images.findIndex(imageData => imageData.url === image.url)
						setImage(images[index === images.length - 1 ? 0 : index + 1])
					}}
					className='absolute bottom-0 right-0 w-1/5 top-20'
				>
				</div>

				<div className='absolute flex justify-center gap-1 left-2 right-2 bottom-6'>
					{images.map((imageData)  => (
						<div
							className={clsx("w-2 h-2 border border-solid border-slate-500 rounded-full", {
								"bg-slate-500": imageData.url === image.url
							})}
						/>
					))}
				</div>
			</div>
		</ScreenAsModal>
	)
}

export function useGalleryFullScreenAsModal(defaultFilters = []) {
	const { showScreenAsModal } = useScreenAsModal()

	return {
		showGalleryFullScreen: (title, images, currentImage) => {
			showScreenAsModal(GalleryFullScreenAsModal, {
				title,
				images,
				currentImage
			})
		}
	}
}