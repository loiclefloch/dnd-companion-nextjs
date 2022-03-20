// import ReactMarkdown from 'react-markdown' TODO: remove lib?

import abilityChecks from "./rule-sections/ability-checks.mdx"
import abilityScoresAndModifiers from "./rule-sections/ability-scores-and-modifiers.mdx"
import actionsIncombat from "./rule-sections/actions-in-combat.mdx"
import advantageAndDisadvantage from "./rule-sections/advantage-and-disadvantage.mdx"
import betweenAdventures from "./rule-sections/between-adventures.mdx"
import castingSspell from "./rule-sections/casting-a-spell.mdx"
import cover from "./rule-sections/cover.mdx"
import damageAndHealing from "./rule-sections/damage-and-healing.mdx"
import diseases from "./rule-sections/diseases.mdx"
import fantasyHistoricalPantheons from "./rule-sections/fantasy-historical-pantheons.mdx"
import inspiration from "./rule-sections/inspiration.mdx"
import levelling from "./rule-sections/levelling.mdx"
import madness from "./rule-sections/madness.mdx"
import makingAnAttack from "./rule-sections/making-an-attack.mdx"
import mountedCombat from "./rule-sections/mounted-combat.mdx"
import movementAndPosition from "./rule-sections/movement-and-position.mdx"
import movement from "./rule-sections/movement.mdx"
import objects from "./rule-sections/objects.mdx"
import poisons from "./rule-sections/poisons.mdx"
import proficiencyBonus from "./rule-sections/proficiency-bonus.mdx"
import resting from "./rule-sections/resting.mdx"
import savingThrows from "./rule-sections/saving-throws.mdx"
import sentientMagicItems from "./rule-sections/sentient-magic-items.mdx"
import standardExchangeRates from "./rule-sections/standard-exchange-rates.mdx"
import theEnvironment from "./rule-sections/the-environment.mdx"
import TheOrderOfCombat from "./rule-sections/the-order-of-combat.mdx"
import thePlanesOfExistence from "./rule-sections/the-planes-of-existence.mdx"
import time from "./rule-sections/time.mdx"
import traps from "./rule-sections/traps.mdx"
import underwaterCombat from "./rule-sections/underwater-combat.mdx"
import usingEachAbility from "./rule-sections/using-each-ability.mdx"
import whatIsAspell from "./rule-sections/what-is-a-spell.mdx"

function RuleContent({ index, ruleResponse }) {
	const map = {
		"ability-checks": abilityChecks,
		"ability-scores-and-modifiers": abilityScoresAndModifiers,
		"actions-in-combat": actionsIncombat,
		"advantage-and-disadvantage": advantageAndDisadvantage,
		"between-adventures": betweenAdventures,
		"casting-a-spell": castingSspell,
		"cover": cover,
		"damage-and-healing": damageAndHealing,
		"diseases": diseases,
		"fantasy-historical-pantheons": fantasyHistoricalPantheons,
		"inspiration": inspiration,
		"levelling": levelling,
		"madness": madness,
		"making-an-attack": makingAnAttack,
		"mounted-combat": mountedCombat,
		"movement-and-position": movementAndPosition,
		"movement": movement,
		"objects": objects,
		"poisons": poisons,
		"proficiency-bonus": proficiencyBonus,
		"resting": resting,
		"saving-throws": savingThrows,
		"sentient-magic-items": sentientMagicItems,
		"standard-exchange-rates": standardExchangeRates,
		"the-environment": theEnvironment,
		"the-order-of-combat": TheOrderOfCombat,
		"the-planes-of-existence": thePlanesOfExistence,
		"time": time,
		"traps": traps,
		"underwater-combat": underwaterCombat,
		"using-each-ability": usingEachAbility,
		"what-is-a-spell": whatIsAspell,
	}

	const View = map[index]
	if (View) {
		return <div className="prose"><View /></div>
	} else {
		return <p>Rule not created yet</p>
	}

	// return (
	// 	<>
	// 		<div>TODO: transform to markdown</div>
	// 		<div>
	// 			<ReactMarkdown>
	// 				{/* TRICK: remove first h1 from the markdown, that contains the rule name */}
	// 				{/* TODO: remove trick, change on data file */}
	// 				{ruleResponse.data?.desc.replaceAll(`## ${ruleResponse.data.name}\n\n`, '')}
	// 			</ReactMarkdown>
	// 		</div>
	// 	</>
	// )
}

export default RuleContent