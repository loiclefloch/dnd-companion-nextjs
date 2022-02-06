const isBrowser = typeof window !== "undefined";

export function createStorage(key) {
	return {
		setItem: (data) => {
			if (!isBrowser) {
				return
			}
			localStorage.setItem(key, JSON.stringify(data))
		},
		getItem: () => {
			if (!isBrowser) {
				return undefined
			}
			
			return JSON.parse(localStorage.getItem(key))
		},
		getKey: () => key
	}
}
