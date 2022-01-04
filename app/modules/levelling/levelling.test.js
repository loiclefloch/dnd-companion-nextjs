import { map } from "lodash"
import features from "../../../database/data/features.json"
import { getSpellLevelForCharacterLevel, getLevellingSpellDataForClasses } from "./index"


describe("getSpellLevelForCharacterLevel", () => {
  it("with a single class druid", () => {
    const classes = [
			{
				index: "druid"
			}
		]

		expect(getSpellLevelForCharacterLevel(classes, 1)).toEqual(1)
		expect(getSpellLevelForCharacterLevel(classes, 3)).toEqual(2)
		expect(getSpellLevelForCharacterLevel(classes, 3)).toEqual(2)
  })
})

describe("getLevellingSpellDataForClasses", () => {
  it("features references are correct", () => {
		const levellingSpellDataForClasses = getLevellingSpellDataForClasses()
    
		map(levellingSpellDataForClasses, (classData, clss) => {
			map(classData, (levelData, level) => {
				levelData.features?.forEach(featureIndex => {
					expect(features.find(f => f.index === featureIndex)?.index).toEqual(featureIndex)
				})
			})
		})
  })
})

