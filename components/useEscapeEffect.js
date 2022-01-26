import { useEffect } from "react"

function useEscapeEffect(onEscape) {
	useEffect(() => {
		const handleEsc = (event) => {
			if (event.keyCode === 27) {
				onEscape()
			}
		};
		window.addEventListener('keydown', handleEsc);

		return () => {
			window.removeEventListener('keydown', handleEsc);
		};
	}, []);
}

export default useEscapeEffect