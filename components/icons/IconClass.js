import ClassCleric from "./class/ClassCleric"
import ClassBard from "./class/ClassBard"
import ClassBarbarian from "./class/ClassBarbarian"
import ClassDruid from "./class/ClassDruid"
import ClassFighter from "./class/ClassFighter"
import ClassMonk from "./class/ClassMonk"
import ClassPaladin from "./class/ClassPaladin"
import ClassRanger from "./class/ClassRanger"
import ClassRogue from "./class/ClassRogue"
import ClassSorcerer from "./class/ClassSorcerer"
import ClassWarlock from "./class/ClassWarlock"
import ClassWizard from "./class/ClassWizard"
import { createElement } from "react"
import clsx from "clsx"

function IconClass({ clss, withBgColor, withTextColor, className = {}, ...props }) {
	const map = {
		barbarian: ClassBarbarian,
		bard: ClassBard,
		druid: ClassDruid,
		cleric: ClassCleric,
		fighter: ClassFighter,
		monk: ClassMonk,
		paladin: ClassPaladin,
		ranger: ClassRanger,
		rogue: ClassRogue,
		sorcerer: ClassSorcerer,
		warlock: ClassWarlock,
		wizard: ClassWizard,
	}

	const view = map[clss]
	if (!view) {
		return null
	}

	return createElement(view, { 
		withBgColor,
		withTextColor,
		className: clsx(className, {
			"p-1 rounded ": withBgColor,
	}), ...props })
}

export default IconClass