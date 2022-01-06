import { useState } from "react"
import useTimeout from "../utils/useTimeout"

// for now just do like there is a loading
function useApi(resultData) {
	const [data, setData] = useState(null)

	useTimeout(() => {
		setData(resultData)
	}, 200)

	return { data, isLoading: data === null }
}

export default useApi