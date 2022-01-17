import { useGalleryFullScreenAsModal } from "./GalleryFullScreenAsModal"

function Gallery({ title, images }) {
	const { showGalleryFullScreen } = useGalleryFullScreenAsModal()

	return (
		<div className="container grid grid-cols-3 gap-2 mx-auto">
			{images.map((imageData, index) => (
				<img
					onClick={() => showGalleryFullScreen(title, images, imageData)}
					key={imageData.url}
					src={imageData.url}
					alt={imageData.label}
					className={"w-full rounded hover:shadow-2xl"}
				/>
			))}
		</div>
	)
}

export default Gallery