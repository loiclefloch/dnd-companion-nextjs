const assert = require("assert");

const { convertRetardUnitToMetric, extractRetardUnit } = require("./utils");

describe("extractRetardUnit", () => {
  it("should extract 5 feet", () => {
    assert.equal(extractRetardUnit("5 feet").amount, 5);
    assert.equal(extractRetardUnit("5 feet").unit, 'feet');
    assert.equal(extractRetardUnit("5 feet").type, 'distant');
  })
  it("should extract 1 mile", () => {
    assert.equal(extractRetardUnit("1 mile").amount, 1);
    assert.equal(extractRetardUnit("1 mile").unit, 'mile');
  })
})

describe("convertRetardUnitToMetric", () => {
  it("should convert 5 feet into meters", () => {
    assert.equal(convertRetardUnitToMetric("5 feet").amount, 1.5);
    assert.equal(convertRetardUnitToMetric("5 feet").unit, 'meter');
  });
  it("should convert 15 feet into meters", () => {
    assert.equal(convertRetardUnitToMetric("15 feet").amount, 4.5)
    assert.equal(convertRetardUnitToMetric("15 feet").unit, 'meter');
  });
  it("should convert 1 mile into kilometers", () => {
    assert.equal(convertRetardUnitToMetric("1 mile").amount, 1.5)
    assert.equal(convertRetardUnitToMetric("1 mile").unit, 'kilometer');
  });
});
