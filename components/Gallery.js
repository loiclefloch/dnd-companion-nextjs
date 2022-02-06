import { useGalleryFullScreenAsModal } from "./GalleryFullScreenAsModal"

function Gallery({ title, images }) {
	const { showGalleryFullScreen } = useGalleryFullScreenAsModal()

	return (
		<div className="container grid grid-cols-3 gap-2 mx-auto">
			{images.map(imageData => (
				<img
					key={imageData.url}
					src={imageData.url}
					alt={imageData.label}
					className={"w-full rounded hover:shadow-2xl"}
					onClick={() => showGalleryFullScreen(title, images, imageData)}
				/>
			))}
		</div>
	)
}

export default Gallery