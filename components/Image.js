
import { useImageFullScreenAsModal } from "./ImageFullScreenAsModal"

function Image({ alt, src, ...otherProps }) {
	const { showImageFullScreen } = useImageFullScreenAsModal()
	// can override onClick
	return (
		<img src={src} alt={alt} onClick={() => showImageFullScreen(alt, src)}{...otherProps}  />
	)
}

export default Image