import magicItems from "../../database/data/magic-items.json"
import camelize from "../utils/camelize"
import useApi from "./useApi"


export function formatMagicItem(itemParam) {
	if (!itemParam) {
		return null
	}
	const item = camelize(itemParam)
	item.isMagicItem = true
	item.nameLocalized = {
		en: item.name
	}

	item.resume = {
		en: '',
	}

	item.description = {
		en: item.desc
	}

	delete item.desc

	// TODO: add resume
	// TODO: add description
	// TODO: add image
	return item
}

function useMagicItem(index) {
	return useApi(formatMagicItem(magicItems.find(item => item.index === index)))
}

export default useMagicItem