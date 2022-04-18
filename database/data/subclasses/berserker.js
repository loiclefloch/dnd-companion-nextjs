const berserker = (api) => ({
  "index": "berserker",
  "class": {
    "index": "barbarian",
    "name": "Barbarian",
    "url": "/api/classes/barbarian"
  },
  "nameLocalized": "Berserker",
  "name": "Berserker",
  "subclass_flavor": "Primal Path",
  "desc": [
    "For some barbarians, rage is a means to an end--that end being violence. The Path of the Berserker is a path of untrammeled fury, slick with blood. As you enter the berserker's rage, you thrill in the chaos of battle, heedless of your own health or well-being."
  ],
  "subclass_levels": "/api/subclasses/berserker/levels",
  "url": "/api/subclasses/berserker",
  "levelling": {
    ...api.applyLevellingLevelNotCreatedYet(1, 20),
  }
})

export default berserker