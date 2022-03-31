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
			
			const itemData = localStorage.getItem(key)
			try {
				return JSON.parse(itemData)
			} catch (e) {
				debugger
				return null
			}
		},
		getKey: () => key
	}
}
