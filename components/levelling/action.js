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

export function actionLevellingNext({ step }) {
	return {
		type: 'actionLevellingNext',
		apply: () => ({
			step
		}),
		build: ({ character, newLevel }) => {
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
        debugger;
        throw new Error(`not handled`);
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
	selectedOptions,
}) {
	return {
		type: 'actionLevellingAbilityScoreImprovementFeat',
		apply: () => ({
			step,
			feat,
			selectedOptions,
		}),
		build: ({ character, newLevel }) => {
			if (!character.feats) {
				character.feats = []
			}
			const characterFeat = {
				index: feat.index,
				level: newLevel,
			}
			character.feats.push(characterFeat)

			if (selectedOptions) {
				map(selectedOptions, (selectedOption, type) => {
					
					switch (type) {
						case 'abilityOption':
							selectedOption.abilities.forEach(value => {

								character.statsBonuses.push({
									ability: value.ability.index.toUpperCase(),
									type: "feat",
									feat: feat.index,
									bonus: value.bonus,
								})

							})
							break

						case 'spellOptions':
							selectedOption.forEach(spellOption => {
								const spells = spellOption.spells
								spells.forEach(spell => {
									character.spellsList.push({
										index: spell.index,
										from: "feat",
										feat: feat.index,
										"isPrepared": false,
									})
								})
							})
							// console.log({spellsList: character.spellsList })
							break

						case 'featuresOptions':
							selectedOption.forEach(spellOption => {
								const features = spellOption.features
								features.forEach(feature => {
									character.features.push({
										index: feature.index,
										type: "levelling",
										from: "feat",
										feat: feat.index,
										level: newLevel,
									});
								})
							})
							break

						case 'languagesOptions':
							selectedOption.languages.forEach(language => {
								// TODO: languages is an array of strings. we cannot add type / from like features :/
								character.languages.push(language)
								// {
								// 	index: language,
								// 	type: "levelling",
								// 	from: "feat",
								// 	feat: feat.index,
								// 	level: newLevel,
								// });
							})
							break

						default:
							debugger
							throw new Error(`Not handled`)
					}
				})
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

export function actionLevellingRoguishArchetypes({ step, selectedSubclass }) {
	return {
		type: 'actionLevellingRoguishArchetypes',
		apply: () => ({
			step,
			selectedSubclass,
		}),
		build: ({ character, newLevel }) => {
			// TODO: add other settings
			character.subclass = {
				index: selectedSubclass.index,
			}
		}
	}
}

export function actionLevellingMartialArchetypes({ step, selectedSubclass }) {
	return {
		type: 'actionLevellingMartialArchetypes',
		apply: () => ({
			step,
			selectedSubclass,
		}),
		build: ({ character, newLevel }) => {
			// TODO: add other settings
			character.subclass = {
				index: selectedSubclass.index,
			}
		}
	}
}

// TODO: clean spellsUsed?