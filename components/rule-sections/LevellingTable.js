import { getLevellingStages } from "../../modules/levelling"
import { map } from "lodash"

function LevellingTable() {
	const levellingStages  = getLevellingStages()
	return (
		<div className="divide divide-y">
			{map(levellingStages, (requiredXp, level) => (
				<div className="flex" key={level}>
					<div className="w-10 pl-4">
						{level}
					</div>
					<div className="text-right w-16 ml-6">
						{requiredXp}
					</div>
					{level > 1 && (
						<div className="text-right w-16 ml-6">
							+{requiredXp - levellingStages[level - 1]}
						</div>
					)}
				</div>
			))}
		</div>
	)
}

export default LevellingTable