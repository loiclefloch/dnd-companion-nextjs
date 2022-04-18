const champion = (api) => ({
  "index": "champion",
  "class": {
    "index": "fighter",
    "name": "Fighter",
    "url": "/api/classes/fighter"
  },
  "nameLocalized": "Champion",
  "name": "Champion",
  "subclass_flavor": "Martial Archetype",
  "desc": [
    "The archetypal Champion focuses on the development of raw physical power honed to deadly perfection. Those who model themselves on this archetype combine rigorous training with physical excellence to deal devastating blows."
  ],
  "subclass_levels": "/api/subclasses/champion/levels",
  "url": "/api/subclasses/champion",
  "levelling": {
    ...api.applyLevellingLevelNoop(1, 9),
    ...api.applyLevellingLevelNotCreatedYet(10, 20),
	  // TODO: levelling - level 10
  }
})

export default champion