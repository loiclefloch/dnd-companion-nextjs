const hunter = (api) => ({
  "index": "hunter",
  "class": {
    "index": "ranger",
    "name": "Ranger",
    "url": "/api/classes/ranger"
  },
  "nameLocalized": "Hunter",
  "name": "Hunter",
  "subclass_flavor": "Ranger Archetype",
  "desc": [
    "Emulating the Hunter archetype means accepting your place as a bulwark between civilization and the terrors of the wilderness. As you walk the Hunter's path, you learn specialized techniques for fighting the threats you face, from rampaging ogres and hordes of orcs to towering giants and terrifying dragons."
  ],
  "subclass_levels": "/api/subclasses/hunter/levels",
  "url": "/api/subclasses/hunter",
  "levelling": {
    ...api.applyLevellingLevelNotCreatedYet(1, 20),
  }
})

export default hunter