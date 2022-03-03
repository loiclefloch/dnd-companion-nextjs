import { actionLevellingNext } from "./action"
import useI18n from "../../modules/i18n/useI18n"

import ButtonBottomScreen from "../../components/ButtonBottomScreen"

// describe WIP levelling
function LevellingDoesNotExists({ step, levellingDispatch }) {


	return (
		<div className="prose px-4 mt-4">
			<h3>
				Work in progress
			</h3>
			<p>
				{step.type === 'level-does-not-exists-for-level-for-race' && 
					<span>
						{`La montée de niveau n'est pas terminé pour la race ${step.race} et le niveau ${step.level}`}
					</span>
				}
				{step.type === 'level-does-not-exists-for-race' && 
					<span>
						{`La montée de niveau n'est pas terminé pour la race ${step.race}`}
					</span>
				}
				{step.type === 'level-does-not-exists-for-level-for-class' && 
					<span>
						{`La montée de niveau n'est pas terminé pour la class ${step.clss} et le niveau ${step.level}`}
					</span>
				}
				{step.type === 'level-does-not-exists-for-class' && 
					<span>
						{`La montée de niveau n'est pas terminé pour la class ${step.clss}`}
					</span>
				}
			</p>

			<p className="text-meta">{step.label}</p>

			<ButtonBottomScreen 
				variant="cta" 
				onClick={() => levellingDispatch(actionLevellingNext({ step }))}
			>
				Continuer quand même
			</ButtonBottomScreen>
		</div>
	)
}

export default LevellingDoesNotExists