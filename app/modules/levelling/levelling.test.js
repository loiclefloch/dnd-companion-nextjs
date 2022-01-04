const assert = require("assert");
import { getSpellLevelForCharacterLevel } from "./index"


describe("getSpellLevelForCharacterLevel", () => {
  it("with a single class druid", () => {
    const classes = [
			{
				index: "druid"
			}
		]

		assert.equal(getSpellLevelForCharacterLevel(classes, 1), 1)
		assert.equal(getSpellLevelForCharacterLevel(classes, 3), 2)
		assert.equal(getSpellLevelForCharacterLevel(classes, 3), 2)
  })
})
