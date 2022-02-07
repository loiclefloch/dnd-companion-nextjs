import { map } from "lodash"
import {
	filterDuplicates
} from "../../modules/utils/array"

export function actionLevellingStart({ step }) {
	return {
		type: 'actionLevellingStart',
		apply: () => ({
			step
		}),
		build: ({ character, newLevel }) => {
			character.level = newLevel
		}
	}
}

export function actionLevellingAddFeatures({ step, features }) {
	return {
		type: 'actionLevellingAddFeatures',
		apply: () => ({
			step,
			features,
		}),
		build: ({ character, newLevel }) => {
			if (!character.features) {
				character.features = []
			}

			features.forEach(feature => {
				character.features.push({
					index: feature,
					type: "levelling",
					level: newLevel,
				})
			})

			character.features = filterDuplicates(character.features, i => i.index)
		}
	}
}

export function actionLevellingAddHp({ step, hp }) {
	return {
		type: 'actionLevellingAddHp',
		apply: () => ({
			step,
			hp
		}),
		build: ({ character }) => {
			character.maxHp += hp
		}
	}
}

export function actionLevellingLevelSlots({ step, spellsSlots }) {
	return {
		type: 'actionLevellingLevelSlots',
		apply: () => ({
			step,
			spellsSlots,
		}),
		build: ({ character }) => {
			character.spellsSlots = spellsSlots
		}
	}
}

export function actionLevellingAbilityScoreImprovement({ step, type, scoreDiff, feat }) {
	return {
		type: 'actionLevellingAbilityScoreImprovement',
		apply: () => ({
			step, 
			type,
			scoreDiff,
			feat,
		}),
		build: ({ character, newLevel }) => {
			if (type === 'feat') {
				if (!character.feats) {
					character.feats = []
				}
				character.feats.push({ index: feat.index, level: newLevel })

			} else if (type === 'score') {
				map(scoreDiff, (bonus, ability) => {
					if (bonus > 0) {
						character.statsBonuses.push({
							ability,
							bonus,
							type: "ability-score-improvement",
						})
						character.stats[ability] += bonus
					}
				})
			}
		}
	}
}

// TODO: clean spellsUsed?