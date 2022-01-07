import { createElement } from "react"
import IconConjuration from "./magicSchool/IconConjuration"
import IconDivination from "./magicSchool/IconDivination"
import IconTransmutation from "./magicSchool/IconTransmutation"
import IconNecromancy from "./magicSchool/IconNecromancy"
import IconEvocation from "./magicSchool/IconEvocation"
import IconIllusion from "./magicSchool/IconIllusion"
import IconEnchantment from "./magicSchool/IconEnchantment"
import IconAbjuration from "./magicSchool/IconAbjuration"

function IconMagicSchool({ school, ...props }) {
	const map = {
		conjuration: IconConjuration,
		divination: IconDivination,
		transmutation: IconTransmutation,
		necromancy: IconNecromancy,
		evocation: IconEvocation,
		illusion: IconIllusion,
		enchantment: IconEnchantment,
		abjuration: IconAbjuration,
	}

	const component = map[school?.toLowerCase()]
	if (!component) {
		return null
	}
	return createElement(component, { alt: school, ...props })
}

export default IconMagicSchool