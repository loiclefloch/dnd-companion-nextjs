
import useImageFullScreenAsModal from "./useImageFullScreenAsModal"
import NextImage from 'next/image'

function Image({ alt, src, ...otherProps }) {
	const { showImageFullScreen } = useImageFullScreenAsModal()
	// can override onClick
	return (
		<NextImage src={src} alt={alt} onClick={() => showImageFullScreen(alt, src)}{...otherProps}  />
	)
}

export default Image