const openHand = (api) => ({
  "index": "open-hand",
  "class": {
    "index": "monk",
    "name": "Monk",
    "url": "/api/classes/monk"
  },
  "nameLocalized": "Open Hand",
  "name": "Open Hand",
  "subclass_flavor": "Monastic Tradition",
  "desc": [
    "Monks of the Way of the Open Hand are the ultimate masters of martial arts combat, whether armed or unarmed. They learn techniques to push and trip their opponents, manipulate ki to heal damage to their bodies, and practice advanced meditation that can protect them from harm."
  ],
  "subclass_levels": "/api/subclasses/open-hand/levels",
  "url": "/api/subclasses/open-hand",
  "levelling": {
    ...api.applyLevellingLevelNotCreatedYet(1, 20),
  }
})

export default openHand