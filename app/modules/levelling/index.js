// Experience Points	Level	Proficiency Bonus
// 0	1	+2
// 300	2	+2
// 900	3	+2
// 2,700	4	+2
// 6,500	5	+3
// 14,000	6	+3
// 23,000	7	+3
// 34,000	8	+3
// 48,000	9	+4
// 64,000	10	+4
// 85,000	11	+4
// 100,000	12	+4
// 120,000	13	+5
// 140,000	14	+5
// 165,000	15	+5
// 195,000	16	+5
// 225,000	17	+6
// 265,000	18	+6
// 305,000	19	+6
// 355,000	20	+6

export function getLevellingStages() {
	return {
		1: 0,
		2: 300,
		3: 900,
		4: 2700,
		5: 6500,
		6: 14000,
		7: 23000,
		8: 34000,
		9: 48000,
		10: 64000,
		11: 85000,
		12: 100000,
		13: 120000,
		14: 140000,
		15: 165000,
		16: 195000,
		17: 225000,
		18: 265000,
		19: 305000,
		20: 355000,
	}
}

export function getNextLevelExperienceStage(level) {
	if (level === 20) {
		return 0 // no more level after 20
	}
	return getLevellingStages()[level + 1]
}

export function getLevelExperienceStage(level) {
	return getLevellingStages()[level]
}


export function getLevelProficiencyBonus(level) {
	const levellingProficiencyBonus = {
		1: +2,
		2: +2,
		3: +2,
		4: +2,
		5: +3,
		6: +3,
		7: +3,
		8: +3,
		9: +4,
		10: +4,
		11: +4,
		12: +4,
		13: +5,
		14: +5,
		15: +5,
		16: +5,
		17: +6,
		18: +6,
		19: +6,
		20: +6,
	}

	return levellingProficiencyBonus[level]
}


// TODO: implement
export function getSpellLevelForCharacterLevel(characterClasses, characterLevel) {
	const map = {
		druid: {
			// level: 1
			1: {
				0: 2,
				1: 2,
			},
			2: {
				0: 2,
				1: 3,
			},
			3: {
				0: 2,
				1: 3,
				2: 2,
			},
			3: {
				0: 3,
				1: 4,
				2: 3
			}
		}
	}

	function getMaxLevel(levelSpellData) {
		if (!levelSpellData) {
			return 0
		}

		return Math.max(...Object.keys(levelSpellData))
	}

	const levelsPerClasses = characterClasses.map(clss => {
		return getMaxLevel(map[clss.index][characterLevel])
	})

	return Math.max(levelsPerClasses)
}