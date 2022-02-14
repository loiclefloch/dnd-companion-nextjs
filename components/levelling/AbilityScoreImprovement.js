import { useState, useEffect } from "react"
import { actionLevellingAbilityScoreImprovementScore } from "./action"
import { map, cloneDeep } from "lodash"

import AbilityScoreChooser from "../AbilityScoreChooser"
import ButtonBottomScreen from "../ButtonBottomScreen"
import {
	Tabs,
	Tab,
	TabContent,
	TabContainer,
} from "../Tab"

import { FeatSelector, useFeatStepScreenAsModal } from "./FeatScreens"

function getScoreDiff(stats, baseStats) {
	const diff = {}
	map(baseStats, (amount, ability) => {
		diff[ability] = (stats[ability] || 0) - amount
	})
	return diff
}

function scoreIsValid(diff) {
	const values = Object.values(diff)
	const hasDiffOfTwo = values.includes(2)
	const hasDiffOfOne = values.includes(1)

	const total = values.reduce((total, value) => total + value, 0)

	return (hasDiffOfTwo || hasDiffOfOne) && total === 2
}

function Score({ step, character, levellingDispatch }) {
	const [stats, setStats] = useState(cloneDeep(character.baseStats))

	const scoreDiff = getScoreDiff(stats, character.baseStats)

	const isValid = scoreIsValid(scoreDiff)

	return (
		<>
			<p>Ici vous pouvez choisir d'augmenter une capacité de deux points, ou deux capacités d'un point</p>

			<AbilityScoreChooser
				clss={character.classes[0].index}
				abilities={stats}
				onChange={setStats}
				bonuses={{}}
				scoreDiff={scoreDiff}
			/>

			<ButtonBottomScreen
				variant="cta"
				disabled={!isValid}
				hide={!isValid}
				onClick={() => {
					levellingDispatch(actionLevellingAbilityScoreImprovementScore({ step, type: 'score', scoreDiff }))
				}}
			>
				Continuer
			</ButtonBottomScreen>
		</>
	)
}


function Feat({ step, character, levellingDispatch }) {
	const [selectedFeat, setSelectedFeat] = useState(null)
	const { openFeatStepScreenAsModal } = useFeatStepScreenAsModal()
	return (
		<>
			<p className="prose text-center">
				Ici vous pouvez choisir un feat et ses options.
			</p>

			<FeatSelector
				selectedFeat={selectedFeat}
				setSelectedFeat={setSelectedFeat}
				character={character}
			/>

			<ButtonBottomScreen
				variant="cta"
				disabled={!selectedFeat}
				hide={!selectedFeat}
				onClick={() => openFeatStepScreenAsModal({
					step, 
					character, 
					levellingDispatch,
					feat: selectedFeat,
				})}
			>
				Configurer le feat
			</ButtonBottomScreen>
		</>
	)
}

function AbilityScoreImprovement({ levellingData, getFormattedBuildedCharacter, step, levellingDispatch, clearStepLevellingState }) {
	const character = getFormattedBuildedCharacter()
	useEffect(() => clearStepLevellingState(step), [])

	return (
		<div className="prose mt-8 mx-4">
			<h3 className="text-center">{step.label}</h3>

			<h4 className="mt-4">{step.desc}</h4>

			<p>Vous pouvez au choix augmenté une capactié ou choisir un trait.</p>
			{/* TODO: en savoir plus */}

			<TabContainer defaultTab="score">
				<Tabs>
					<Tab tab="score">Score</Tab>
					<Tab tab="feat">Feat</Tab>
				</Tabs>
				<TabContent tab="score" className="px-2">
					<Score 
						character={character}
						step={step}
						levellingDispatch={levellingDispatch}
					/>
				</TabContent>
				<TabContent tab="feat" className="px-0">
					<Feat
						character={character}
						step={step}
						levellingDispatch={levellingDispatch}
					/>
				</TabContent>
			</TabContainer>

		</div>
	)
}

export default AbilityScoreImprovement