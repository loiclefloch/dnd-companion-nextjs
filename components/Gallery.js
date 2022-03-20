import Image from "next/image"
import useGalleryFullScreenAsModal from "./useGalleryFullScreenAsModal"

function Gallery({ title, images }) {
	const { showGalleryFullScreen } = useGalleryFullScreenAsModal()

	return (
		<div className="container grid grid-cols-3 gap-2 mx-auto">
			{images.map(imageData => (
				<div key={imageData.url} style={{ width: '100%', height: '100px', position: 'relative', display: "block" }}>
					<Image
						key={imageData.url}
						src={imageData.url}
						alt={imageData.label}
						layout='fill'
						objectFit='contain'
						className={"w-full rounded hover:shadow-2xl"}
						onClick={() => showGalleryFullScreen(title, images, imageData)}
					/>
				</div>
			))}
		</div>
	)
}

export default Gallery