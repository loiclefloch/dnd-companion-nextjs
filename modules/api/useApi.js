import { useState } from "react"

function useApi(runner) {
	const [data, setData] = useState(null)

	return { 
		data, 
		isLoading: data === null,
		makeRequest: (...params) => {
			const newData = runner.apply(null, params)
			setData(newData)
		}
	}
}

export default useApi