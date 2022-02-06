import { useEffect, useState, useCallback, useDebugValue } from "react"

function useStorage(storage, defaultValue) {
	const [value, setValue] = useState(storage.getItem())

	useDebugValue(storage.getKey())

	const set = useCallback((newValue) => {
		storage.setItem(newValue)
		setValue(newValue)
	}, [storage])

	useEffect(() => {
		if (!value && defaultValue) {
			set(defaultValue)
		}
	})

	return [
		value,
		set
	]
}

export default useStorage