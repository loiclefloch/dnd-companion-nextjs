import { useEffect, useState } from "react"
import useTimeout from "../utils/useTimeout"

// TODO: see import useSWR from 'swr'
// https://nextjs.org/docs/basic-features/data-fetching/client-side
function useData(resultData) {
	const [data, setData] = useState(resultData)

	useTimeout(() => {
		setData(resultData)
	}, 100)

	useEffect(() => {
		if (!data && resultData) {
			setData(resultData)
		}
	}, [resultData])

	return { data, isLoading: data === null }
}

export default useData