import { actionLevellingAbilityScoreImprovement } from "./action"
import { useState } from "react"
import { map, cloneDeep, forEach } from "lodash"

import AbilityScoreChooser from "../AbilityScoreChooser"
import ButtonBottomScreen from "../ButtonBottomScreen"
import {
	Tabs,
	Tab,
	TabContent,
	TabContainer,
} from "../Tab"
import useFeats from "../../modules/api/useFeats"
import ListSelector from "../../components/ListSelector";
import { useFeatScreenAsModal } from "../../components/FeatScreenAsModal"
import useI18n from "../../modules/i18n/useI18n"

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
				onClick={() => {
					levellingDispatch(actionLevellingAbilityScoreImprovement({ step, type: 'score', scoreDiff }))
				}}
			>
				Continuer
			</ButtonBottomScreen>
		</>
	)
}

function Feat({ step, character, levellingDispatch }) {
	const [selectedFeat, setSelectedFeat] = useState(null)
	const { tr } = useI18n()
	const { showFeatScreenAsModal } = useFeatScreenAsModal()
	const featsResponse = useFeats()

	return (
		<>
			<p>Ici vous pouvez choisir un feat</p>
			{/* TODO: learn more */}

			{/* TODO: disabled feats already on character */}
			{/* TODO: disable feats that cannot be used for the character */}
			{/* TODO: some feats makes us select a +1 ability, we should display the option + save the data somewhere */}
			<ListSelector
				value={selectedFeat}
				options={featsResponse.data?.map(feat => ({
					label: tr(feat.nameLocalized),
					value: feat,
					selected: selectedFeat?.index === feat.index,
					rightView: <div
						className="px-4 py-2 text-xs text-meta"
						onClick={() => showFeatScreenAsModal(feat.index)}
					>
						?
					</div>
				}))}
				onChange={setSelectedFeat}
			/>

			<ButtonBottomScreen
				variant="cta"
				disabled={!selectedFeat}
				onClick={() => {
					levellingDispatch(actionLevellingAbilityScoreImprovement({ step, type: 'feat', feat: selectedFeat }))
				}}
			>
				Continuer
			</ButtonBottomScreen>
		</>
	)
}

function AbilityScoreImprovement({ levellingData, character, step, levellingDispatch }) {
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
				<TabContent tab="score" className="px-4">
					<Score 
						character={character}
						step={step}
						levellingDispatch={levellingDispatch}
					/>
				</TabContent>
				<TabContent tab="feat" className="px-4">
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