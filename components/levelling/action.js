import { map } from "lodash"
import { filterDuplicates } from "../../modules/utils/array"
// import applyFeatOnCharacterOnFeatAdded from "../applyFeatOnCharacterOnFeatAdded"

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

function addFeaturesOptions(character, newLevel, featuresOptions) {
  if (featuresOptions) {
    featuresOptions.forEach((featureOption) => {
      if (featureOption.isFeatures) {
        featureOption.features.forEach((feature) => {
          character.features.push({
            index: feature,
            type: "levelling",
            from: featureOption.featureIndex,
            level: newLevel,
          });
        });
      } else if (featureOption.isExpertises) {
				// TODO: skillsProficiencies is an array of strings. we cannot add type / from like features :/
				// TODO: rename to expertises?
				if (!character.proficiencies) {
					character.proficiencies = []
				}
				featureOption.expertises.forEach(e => character.proficiencies.push({
					index: e,
					type: "levelling",
					sourceType: "levelling", // TODO: rename to type.
					from: featureOption.featureIndex,
					level: newLevel,
				}))
			} else {
        // debugger;
        // throw new Error(`not handled`);
      }
    });
  }
}
export function actionLevellingAddFeatures({ step, features, featuresOptions }) {
	return {
		type: 'actionLevellingAddFeatures',
		apply: () => ({
			step,
			features,
			featuresOptions, // featureIndex, isFeatures + features || TODO
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

			addFeaturesOptions(character, newLevel, featuresOptions)

			character.features = filterDuplicates(character.features, i => i.index)
		}
	}
}

export function actionLevellingAddHp({ step, hp, diceResult }) {
	return {
		type: 'actionLevellingAddHp',
		apply: () => ({
			step,
			hp,
			diceResult
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

export function actionLevellingAbilityScoreImprovementFeat({ 
	step,
	feat,
	selectedOption,
	selectedSpells,
}) {
	return {
		type: 'actionLevellingAbilityScoreImprovementFeat',
		apply: () => ({
			step,
			feat,
			selectedOption,
			selectedSpells,
		}),
		build: ({ character, newLevel }) => {
			if (!character.feats) {
				character.feats = []
			}
			character.feats.push({
				index:
					feat.index,
				level: newLevel,
				options: selectedOption,
				spells: selectedSpells,
			})

			if (selectedOption) {
				if (selectedOption.type === "abilityOption") {
					selectedOption.abilities.forEach(value => {
						character.statsBonuses.push({
							ability: value.ability.index.toUpperCase(),
							type: "feat",
							bonus: value.bonus,
							feat: feat.index
						})
					})
				} else {
					throw new Error(`Not handled`)
				}
			}
		}
	}
}


export function actionLevellingAbilityScoreImprovementScore({ 
	step, 
	scoreDiff, 
}) {
	return {
		type: 'actionLevellingAbilityScoreImprovementScore',
		apply: () => ({
			step, 
			scoreDiff,
		}),
		build: ({ character, newLevel }) => {
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

export function actionLevellingUpdateProficiencyBonus({ step }) {
	return {
		type: 'actionLevellingUpdateProficiencyBonus',
		apply: () => ({
			step, 
		}),
		build: () => {
		}
	}
}

export function actionLevellingSacredOath({ step, selectedSubclass, featuresOptions }) {
	return {
		type: 'actionLevellingSacredOath',
		apply: () => ({
			step,
			selectedSubclass,
			featuresOptions,
		}),
		build: ({ character, newLevel }) => {
			// TODO: add other settings
			character.subclass = {
				index: selectedSubclass.index,
			}

			addFeaturesOptions(character, newLevel, featuresOptions)

			character.features = filterDuplicates(character.features, i => i.index)
		}
	}
}

export function actionLevellingBardCollege({ step, selectedSubclass, featuresOptions }) {
	return {
		type: 'actionLevellingBardCollege',
		apply: () => ({
			step,
			selectedSubclass,
			featuresOptions,
		}),
		build: ({ character, newLevel }) => {
			// TODO: add other settings
			character.subclass = {
				index: selectedSubclass.index,
			}

			addFeaturesOptions(character, newLevel, featuresOptions)

			character.features = filterDuplicates(character.features, i => i.index)
		}
	}
}

// TODO: clean spellsUsed?