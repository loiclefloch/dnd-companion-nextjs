import { getLevellingStages } from "../../modules/levelling"
import { map } from "lodash"

function LevellingTable() {
	return (
		<div className="divide divide-y w-28">
			{map(getLevellingStages(), (requiredXp, level) => (
				<div className="flex">
					<div className="w-10">
						{level}
					</div>
					<div className="text-right w-16">
						{requiredXp}
					</div>
				</div>
			))}
		</div>
	)
}

export default LevellingTable