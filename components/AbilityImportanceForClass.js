import clsx from "clsx"
import {
	AbilityImportance,
	getImportanceForClass,
	getImportanceTip,
} from "../modules/character"
import useTip from "./useTip"

function AbilityImportanceForClass({ className, clss, ability }) {
	const { showTip } = useTip()

	const importanceForClass = getImportanceForClass(clss?.index || clss)
	const importance = importanceForClass && importanceForClass[ability]
	return (
		<div
			className={clsx(className, {
				"bg-blue-400": importance === AbilityImportance.FANTASTIC,
				"bg-green-400": importance === AbilityImportance.GOOD,
				"bg-yellow-400": importance === AbilityImportance.OK,
				"bg-red-400": importance === AbilityImportance.BAD,
			})}
			onClick={() => {
				showTip(getImportanceTip(importance))
			}}
		/>
	)
}

export default AbilityImportanceForClass