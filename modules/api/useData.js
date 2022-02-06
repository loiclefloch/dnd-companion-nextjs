import { useState } from "react"
import useTimeout from "../utils/useTimeout"

function useData(resultData) {
	const [data, setData] = useState(resultData)

	useTimeout(() => {
		setData(resultData)
	}, 100)

	return { data, isLoading: data === null }
}

export default useData