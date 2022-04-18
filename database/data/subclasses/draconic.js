const draconic = (api) => ({
  "index": "draconic",
  "class": {
    "index": "sorcerer",
    "name": "Sorcerer",
    "url": "/api/classes/sorcerer"
  },
  "nameLocalized": "Draconic",
  "name": "Draconic",
  "subclass_flavor": "Sorcerous Origins",
  "desc": [
    "Your innate magic comes from draconic magic that was mingled with your blood or that of your ancestors. Most often, sorcerers with this origin trace their descent back to a mighty sorcerer of ancient times who made a bargain with a dragon or who might even have claimed a dragon parent. Some of these bloodlines are well established in the world, but most are obscure. Any given sorcerer could be the first of a new bloodline, as a result of a pact or some other exceptional circumstance."
  ],
  "subclass_levels": "/api/subclasses/draconic/levels",
  "url": "/api/subclasses/draconic",
  "levelling": {
    ...api.applyLevellingLevelNotCreatedYet(1, 20),
  }
})

export default draconic