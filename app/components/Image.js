
import { useImageFullScreenAsModal } from "./ImageFullScreenAsModal"

function Image({ alt, src, ...otherProps }) {
	const { showImageFullScreen } = useImageFullScreenAsModal()
	return (
		<img src={src} alt={alt} {...otherProps} onClick={() => showImageFullScreen(alt, src)} />
	)
}

export default Image