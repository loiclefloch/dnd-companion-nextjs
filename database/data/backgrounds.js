import proficiencies from "./proficiencies.json"

export default [
  {
    "index": "acolyte",
    "name": "Acolyte",
    "starting_proficiencies": [
      {
        "index": "skill-insight",
        "name": "Skill: Insight",
        "url": "/api/proficiencies/skill-insight"
      },
      {
        "index": "skill-religion",
        "name": "Skill: Religion",
        "url": "/api/proficiencies/skill-religion"
      }
    ],
    "language_options": {
      "choose": 2,
      "type": "languages",
      "from": [
        {
          "index": "common",
          "name": "Common",
          "url": "/api/languages/common"
        },
        {
          "index": "dwarvish",
          "name": "Dwarvish",
          "url": "/api/languages/dwarvish"
        },
        {
          "index": "elvish",
          "name": "Elvish",
          "url": "/api/languages/elvish"
        },
        {
          "index": "giant",
          "name": "Giant",
          "url": "/api/languages/giant"
        },
        {
          "index": "gnomish",
          "name": "Gnomish",
          "url": "/api/languages/gnomish"
        },
        {
          "index": "goblin",
          "name": "Goblin",
          "url": "/api/languages/goblin"
        },
        {
          "index": "halfling",
          "name": "Halfling",
          "url": "/api/languages/halfling"
        },
        {
          "index": "orc",
          "name": "Orc",
          "url": "/api/languages/orc"
        },
        {
          "index": "abyssal",
          "name": "Abyssal",
          "url": "/api/languages/abyssal"
        },
        {
          "index": "celestial",
          "name": "Celestial",
          "url": "/api/languages/celestial"
        },
        {
          "index": "draconic",
          "name": "Draconic",
          "url": "/api/languages/draconic"
        },
        {
          "index": "deep-speech",
          "name": "Deep Speech",
          "url": "/api/languages/deep-speech"
        },
        {
          "index": "infernal",
          "name": "Infernal",
          "url": "/api/languages/infernal"
        },
        {
          "index": "primordial",
          "name": "Primordial",
          "url": "/api/languages/primordial"
        },
        {
          "index": "sylvan",
          "name": "Sylvan",
          "url": "/api/languages/sylvan"
        },
        {
          "index": "undercommon",
          "name": "Undercommon",
          "url": "/api/languages/undercommon"
        }
      ]
    },
    "starting_wallet": {
      gp: 15,
    },
    "starting_equipment": [
      {
        "equipment": {
          "index": "clothes-common",
          "name": "Clothes, common",
          "url": "/api/equipment/clothes-common"
        },
        "quantity": 1
      },
      {
        "equipment": {
          "index": "vestments",
          "name": "Vestments",
          "url": "/api/equipment/vestments"
        },
        "quantity": 1
      },
      {
        "equipment": {
          "index": "block-of-incense",
          "name": "Block of incense",
          "url": "/api/equipment/block-of-incense"
        },
        "quantity": 1
      },
      {
        "equipment": {
          "index": "pouch",
          "name": "Pouch",
          "url": "/api/equipment/pouch"
        },
        "quantity": 1
      }
    ],
    "starting_equipment_options": [
      {
        "choose": 1,
        "type": "equipment",
        "from": {
          "equipment_category": {
            "index": "holy-symbols",
            "name": "Holy Symbols",
            "url": "/api/equipment-categories/holy-symbols"
          }
        }
      }
    ],
    "feature": {
      "name": "Shelter of the Faithful",
      "desc": [
        "As an acolyte, you command the respect of those who share your faith, and you can perform the religious ceremonies of your deity. You and your adventuring companions can expect to receive free healing and care at a temple, shrine, or other established presence of your faith, though you must provide any material components needed for spells. Those who share your religion will support you (but only you) at a modest lifestyle.",
        "You might also have ties to a specific temple dedicated to your chosen deity or pantheon, and you have a residence there. This could be the temple where you used to serve, if you remain on good terms with it, or a temple where you have found a new home. While near your temple, you can call upon the priests for assistance, provided the assistance you ask for is not hazardous and you remain in good standing with your temple."
      ]
    },
    "personality_traits": {
      "choose": 2,
      "type": "personality_traits",
      "from": [
        "I idolize a particular hero of my faith, and constantly refer to that person's deeds and example.",
        "I can find common ground between the fiercest enemies, empathizing with them and always working toward peace.",
        "I see omens in every event and action. The gods try to speak to us, we just need to listen.",
        "Nothing can shake my optimistic attitude.",
        "I quote (or misquote) sacred texts and proverbs in almost every situation.",
        "I am tolerant (or intolerant) of other faiths and respect (or condemn) the worship of other gods.",
        "I've enjoyed fine food, drink, and high society among my temple's elite. Rough living grates on me.",
        "I've spent so long in the temple that I have little practical experience dealing with people in the outside world."
      ]
    },
    "ideals": {
      "choose": 1,
      "type": "ideals",
      "from": [
        {
          "desc": "Tradition. The ancient traditions of worship and sacrifice must be preserved and upheld.",
          "alignments": [
            {
              "index": "lawful-good",
              "name": "Lawful Good",
              "url": "/api/alignments/lawful-good"
            },
            {
              "index": "lawful-neutral",
              "name": "Lawful Neutral",
              "url": "/api/alignments/lawful-neutral"
            },
            {
              "index": "lawful-evil",
              "name": "Lawful Evil",
              "url": "/api/alignments/lawful-evil"
            }
          ]
        },
        {
          "desc": "Charity. I always try to help those in need, no matter what the personal cost.",
          "alignments": [
            {
              "index": "lawful-good",
              "name": "Lawful Good",
              "url": "/api/alignments/lawful-good"
            },
            {
              "index": "neutral-good",
              "name": "Neutral Good",
              "url": "/api/alignments/neutral-good"
            },
            {
              "index": "chaotic-good",
              "name": "Chaotic Good",
              "url": "/api/alignments/chaotic-good"
            }
          ]
        },
        {
          "desc": "Change. We must help bring about the changes the gods are constantly working in the world.",
          "alignments": [
            {
              "index": "chaotic-good",
              "name": "Chaotic Good",
              "url": "/api/alignments/chaotic-good"
            },
            {
              "index": "chaotic-neutral",
              "name": "Chaotic Neutral",
              "url": "/api/alignments/chaotic-neutral"
            },
            {
              "index": "chaotic-evil",
              "name": "Chaotic Evil",
              "url": "/api/alignments/chaotic-evil"
            }
          ]
        },
        {
          "desc": "Power. I hope to one day rise to the top of my faith's religious hierarchy.",
          "alignments": [
            {
              "index": "lawful-good",
              "name": "Lawful Good",
              "url": "/api/alignments/lawful-good"
            },
            {
              "index": "lawful-neutral",
              "name": "Lawful Neutral",
              "url": "/api/alignments/lawful-neutral"
            },
            {
              "index": "lawful-evil",
              "name": "Lawful Evil",
              "url": "/api/alignments/lawful-evil"
            }
          ]
        },
        {
          "desc": "Faith. I trust that my deity will guide my actions. I have faith that if I work hard, things will go well.",
          "alignments": [
            {
              "index": "lawful-good",
              "name": "Lawful Good",
              "url": "/api/alignments/lawful-good"
            },
            {
              "index": "lawful-neutral",
              "name": "Lawful Neutral",
              "url": "/api/alignments/lawful-neutral"
            },
            {
              "index": "lawful-evil",
              "name": "Lawful Evil",
              "url": "/api/alignments/lawful-evil"
            }
          ]
        },
        {
          "desc": "Aspiration. I seek to prove myself worthy of my god's favor by matching my actions against his or her teachings.",
          "alignments": [
            {
              "index": "lawful-good",
              "name": "Lawful Good",
              "url": "/api/alignments/lawful-good"
            },
            {
              "index": "neutral-good",
              "name": "Neutral Good",
              "url": "/api/alignments/neutral-good"
            },
            {
              "index": "chaotic-good",
              "name": "Chaotic Good",
              "url": "/api/alignments/chaotic-good"
            },
            {
              "index": "lawful-neutral",
              "name": "Lawful Neutral",
              "url": "/api/alignments/lawful-neutral"
            },
            {
              "index": "neutral",
              "name": "Neutral",
              "url": "/api/alignments/neutral"
            },
            {
              "index": "chaotic-neutral",
              "name": "Chaotic Neutral",
              "url": "/api/alignments/chaotic-neutral"
            },
            {
              "index": "lawful-evil",
              "name": "Lawful Evil",
              "url": "/api/alignments/lawful-evil"
            },
            {
              "index": "neutral-evil",
              "name": "Neutral Evil",
              "url": "/api/alignments/neutral-evil"
            },
            {
              "index": "chaotic-evil",
              "name": "Chaotic Evil",
              "url": "/api/alignments/chaotic-evil"
            }
          ]
        }
      ]
    },
    "bonds": {
      "choose": 1,
      "type": "bonds",
      "from": [
        "I would die to recover an ancient relic of my faith that was lost long ago.",
        "I will someday get revenge on the corrupt temple hierarchy who branded me a heretic.",
        "I owe my life to the priest who took me in when my parents died.",
        "Everything I do is for the common people.",
        "I will do anything to protect the temple where I served.",
        "I seek to preserve a sacred text that my enemies consider heretical and seek to destroy."
      ]
    },
    "flaws": {
      "choose": 1,
      "type": "flaws",
      "from": [
        "I judge others harshly, and myself even more severely.",
        "I put too much trust in those who wield power within my temple's hierarchy.",
        "My piety sometimes leads me to blindly trust those that profess faith in my god.",
        "I am inflexible in my thinking.",
        "I am suspicious of strangers and expect the worst of them.",
        "Once I pick a goal, I become obsessed with it to the detriment of everything else in my life."
      ]
    },
    "url": "/api/backgrounds/acolyte"
  },
  {
    "index": "criminal-spy",
    "name": "Criminal / Spy",
    "starting_proficiencies": [
      {
        "index": "skill-deception",
        "name": "Skill: Deception",
        "url": "/api/proficiencies/skill-deception"
      },
      {
        "index": "skill-stealth",
        "name": "Skill: Stealth",
        "url": "/api/proficiencies/skill-stealth"
      },
      {
        "index": "thieves-tools",
        "name": "Thieves' Tools",
        "url": "/api/proficiencies/thieves-tools"
      }
    ],
    "starting_proficiency_options": {
      "choose": 1,
      "type": "proficiency",
      "from": proficiencies.filter(f => f.type === "Gaming Sets")
    },
    "language_options": null,
    "starting_wallet": {
      gp: 15,
    },
    "starting_equipment": [
      {
        "equipment": {
          "index": "crowbar",
          "name": "Crowbar",
          "url": "/api/equipment/crowbar"
        },
        "quantity": 1
      },
      {
        "equipment": {
          "index": "clothes-common",
          "name": "Clothes, common",
          "url": "/api/equipment/clothes-common"
        },
        "quantity": 1
      }
    ],
    "starting_equipment_options": null,
    "feature": {
      "name": "Criminal Contact",
      "desc": [
        "You have a reliable and trustworthy contact who acts as your liaison to a network of other criminals.",
        "You know how to get messages to and from your contact, even over great distances; specifically, you know the local messengers, corrupt caravan masters, and seedy sailors who can deliver messages for you."
      ]
    },
    "personality_traits": {
      "choose": 2,
      "type": "personality_traits",
      "from": [
        "I always have a plan for what to do when things go wrong.",
        "I am always calm, no matter what the situation. I never raise my voice or let my emotions control me.",
        "The first thing I do in a new place is note the locations of everything valuable—or where such things could be hidden.",
        "I would rather make a new friend than a new enemy.",
        "I am incredibly slow to trust. Those who seem the fairest often have the most to hide.",
        "I don’t pay attention to the risks in a situation. Never tell me the odds.",
        "The best way to get me to do something is to tell me I can’t do it.",
        "I blow up at the slightest insult."
      ]
    },
    "ideals": {
      "choose": 1,
      "type": "ideals",
      "from": [
        {
          "desc": "Honor. I don’t steal from others in the trade.",
          "alignments": [
            {
              "index": "lawful-good",
              "name": "Lawful Good",
              "url": "/api/alignments/lawful-good"
            },
            {
              "index": "lawful-neutral",
              "name": "Lawful Neutral",
              "url": "/api/alignments/lawful-neutral"
            },
            {
              "index": "lawful-evil",
              "name": "Lawful Evil",
              "url": "/api/alignments/lawful-evil"
            }
          ]
        },
        {
          "desc": "Freedom. Chains are meant to be broken, as are those who would forge them",
          "alignments": [
            {
              "index": "chaotic-good",
              "name": "Chaotic Good",
              "url": "/api/alignments/chaotic-good"
            },
            {
              "index": "chaotic-neutral",
              "name": "Chaotic Neutral",
              "url": "/api/alignments/chaotic-neutral"
            },
            {
              "index": "chaotic-evil",
              "name": "Chaotic Evil",
              "url": "/api/alignments/chaotic-evil"
            }
          ]
        },
        {
          "desc": "Charity. I steal from the wealthy so that I can help people in need.",
          "alignments": [
            {
              "index": "lawful-good",
              "name": "Lawful Good",
              "url": "/api/alignments/lawful-good"
            },
            {
              "index": "neutral-good",
              "name": "Neutral Good",
              "url": "/api/alignments/neutral-good"
            },
            {
              "index": "chaotic-good",
              "name": "Chaotic Good",
              "url": "/api/alignments/chaotic-good"
            }
          ]
        },
        {
          "desc": "Greed. I will do whatever it takes to become wealthy.",
          "alignments": [
            {
              "index": "lawful-evil",
              "name": "Lawful Evil",
              "url": "/api/alignments/lawful-evil"
            },
            {
              "index": "neutral-evil",
              "name": "Neutral Evil",
              "url": "/api/alignments/neutral-evil"
            },
            {
              "index": "chaotic-evil",
              "name": "Chaotic Evil",
              "url": "/api/alignments/chaotic-evil"
            }
          ]
        },
        {
          "desc": "People. I’m loyal to my friends, not to any ideals, and everyone else can take a trip down the Styx for all I care.",
          "alignments": [
            {
              "index": "lawful-neutral",
              "name": "Lawful Neutral",
              "url": "/api/alignments/lawful-neutral"
            },
            {
              "index": "neutral",
              "name": "Neutral",
              "url": "/api/alignments/neutral"
            },
            {
              "index": "chaotic-neutral",
              "name": "Chaotic Neutral",
              "url": "/api/alignments/chaotic-neutral"
            }
          ]
        },
        {
          "desc": "Redemption. There’s a spark of good in everyone.",
          "alignments": [
            {
              "index": "lawful-good",
              "name": "Lawful Good",
              "url": "/api/alignments/lawful-good"
            },
            {
              "index": "neutral-good",
              "name": "Neutral Good",
              "url": "/api/alignments/neutral-good"
            },
            {
              "index": "chaotic-good",
              "name": "Chaotic Good",
              "url": "/api/alignments/chaotic-good"
            }
          ]
        }
      ]
    },
    "bonds": {
      "choose": 1,
      "type": "bonds",
      "from": [
        "I’m trying to pay off an old debt I owe to a generous benefactor.",
        "My ill-gotten gains go to support my family.",
        "Something important was taken from me, and I aim to steal it back.",
        "I will become the greatest thief that ever lived.",
        "I’m guilty of a terrible crime. I hope I can redeem myself for it.",
        "Someone I loved died because of a mistake I made. That will never happen again."
      ]
    },
    "flaws": {
      "choose": 1,
      "type": "flaws",
      "from": [
        "When I see something valuable, I can’t think about anything but how to steal it.",
        "When faced with a choice between money and my friends, I usually choose the money.",
        "If there’s a plan, I’ll forget it. If I don’t forget it, I’ll ignore it.",
        "I have a “tell” that reveals when I’m lying.",
        "I turn tail and run when things look bad.",
        "An innocent person is in prison for a crime that I committed. I’m okay with that."
      ]
    },
    "url": "/api/backgrounds/criminal-spy"
  },
  {
    "index": "folk-hero",
    "name": "Folk Hero",
    "starting_proficiencies": [
      {
        "index": "skill-animal-handling",
        "name": "Skill: Animal Handling",
        "url": "/api/proficiencies/skill-handling"
      },
      {
        "index": "skill-survival",
        "name": "Skill: Survival",
        "url": "/api/proficiencies/skill-survival"
      },
      {
        "index": "land-vehicles",
        "name": "Land vehicles",
        "url": "/api/proficiencies/land-vehicles"
      }
    ],
    "starting_proficiency_options": {
      "choose": 1,
      "type": "proficiency",
      "from": proficiencies.filter(f => f.type === "Artisan's Tools")
    },
    "language_options": null,
    "starting_equipment": [
      {
        "equipment": {
          "index": "shovel",
          "name": "Shovel",
          "url": "/api/equipment/shovel"
        },
        "quantity": 1
      },
      {
        "equipment": {
          "index": "clothes-common",
          "name": "Clothes, common",
          "url": "/api/equipment/clothes-common"
        },
        "quantity": 1
      },
      {
        "equipment": {
          "index": "pot-iron",
          "name": "Pot, iron",
          "url": "/api/equipment/pot-iron"
        },
        "quantity": 1
      }
    ],
    "starting_equipment_options": [
      {
        "choose": 1,
        "type": "equipment",
        "from": {
          "equipment_category": {
            "index": "artisans-tools",
            "name": "Artisan's Tools",
            "url": "/api/equipment-categories/artisans-tools"
          }
        }
      }
    ],
    "feature": {
      "name": "Rustic Hospitality",
      "desc": [
        "Since you come from the ranks of the common folk, you fit in among them with ease. You can find a place to hide, rest, or recuperate among other commoners, unless you have shown yourself to be a danger to them. They will shield you from the law or anyone else searching for you, though they will not risk their lives for you."
      ]
    },
    "personality_traits": {
      "choose": 2,
      "type": "personality_traits",
      "from": [
        "I judge people by their actions, not their words.",
        "If someone is in trouble, I’m always ready to lend help.",
        "When I set my mind to something, I follow through no matter what gets in my way.",
        "I have a strong sense of fair play and always try to find the most equitable solution to arguments.",
        "I’m confident in my own abilities and do what I can to instill confidence in others.",
        "Thinking is for other people. I prefer action.",
        "I misuse long words in an attempt to sound smarter.",
        "I get bored easily. When am I going to get on with my destiny?"
      ]
    },
    "ideals": {
      "choose": 1,
      "type": "ideals",
      "from": [
        {
          "desc": "Respect. People deserve to be treated with dignity and respect.",
          "alignments": [
            {
              "index": "lawful-good",
              "name": "Lawful Good",
              "url": "/api/alignments/lawful-good"
            },
            {
              "index": "neutral-good",
              "name": "Neutral Good",
              "url": "/api/alignments/neutral-good"
            },
            {
              "index": "chaotic-good",
              "name": "Chaotic Good",
              "url": "/api/alignments/chaotic-good"
            }
          ]
        },
        {
          "desc": "Fairness. No one should get preferential treatment before the law, and no one is above the law. ",
          "alignments": [
            {
              "index": "lawful-good",
              "name": "Lawful Good",
              "url": "/api/alignments/lawful-good"
            },
            {
              "index": "lawful-neutral",
              "name": "Lawful Neutral",
              "url": "/api/alignments/lawful-neutral"
            },
            {
              "index": "lawful-evil",
              "name": "Lawful Evil",
              "url": "/api/alignments/lawful-evil"
            }
          ]
        },
        {
          "desc": "Freedom. Tyrants must not be allowed to oppress the people.",
          "alignments": [
            {
              "index": "chaotic-good",
              "name": "Chaotic Good",
              "url": "/api/alignments/chaotic-good"
            },
            {
              "index": "chaotic-neutral",
              "name": "Chaotic Neutral",
              "url": "/api/alignments/chaotic-neutral"
            },
            {
              "index": "chaotic-evil",
              "name": "Chaotic Evil",
              "url": "/api/alignments/chaotic-evil"
            }
          ]
        },
        {
          "desc": "Might. If I become strong, I can take what I want—what I deserve. ",
          "alignments": [
            {
              "index": "lawful-evil",
              "name": "Lawful Evil",
              "url": "/api/alignments/lawful-evil"
            },
            {
              "index": "neutral-evil",
              "name": "Neutral Evil",
              "url": "/api/alignments/neutral-evil"
            },
            {
              "index": "chaotic-evil",
              "name": "Chaotic Evil",
              "url": "/api/alignments/chaotic-evil"
            }
          ]
        },
        {
          "desc": "Sincerity. There’s no good in pretending to be something I’m not.",
          "alignments": [
            {
              "index": "lawful-neutral",
              "name": "Lawful Neutral",
              "url": "/api/alignments/lawful-neutral"
            },
            {
              "index": "neutral",
              "name": "Neutral",
              "url": "/api/alignments/neutral"
            },
            {
              "index": "chaotic-neutral",
              "name": "Chaotic Neutral",
              "url": "/api/alignments/chaotic-neutral"
            }
          ]
        },
        {
          "desc": "Destiny. Nothing and no one can steer me away from my higher calling.",
          "alignments": [
            {
              "index": "lawful-good",
              "name": "Lawful Good",
              "url": "/api/alignments/lawful-good"
            },
            {
              "index": "neutral-good",
              "name": "Neutral Good",
              "url": "/api/alignments/neutral-good"
            },
            {
              "index": "chaotic-good",
              "name": "Chaotic Good",
              "url": "/api/alignments/chaotic-good"
            },
            {
              "index": "lawful-neutral",
              "name": "Lawful Neutral",
              "url": "/api/alignments/lawful-neutral"
            },
            {
              "index": "neutral",
              "name": "Neutral",
              "url": "/api/alignments/neutral"
            },
            {
              "index": "chaotic-neutral",
              "name": "Chaotic Neutral",
              "url": "/api/alignments/chaotic-neutral"
            },
            {
              "index": "lawful-evil",
              "name": "Lawful Evil",
              "url": "/api/alignments/lawful-evil"
            },
            {
              "index": "neutral-evil",
              "name": "Neutral Evil",
              "url": "/api/alignments/neutral-evil"
            },
            {
              "index": "chaotic-evil",
              "name": "Chaotic Evil",
              "url": "/api/alignments/chaotic-evil"
            }
          ]
        }
      ]
    },
    "bonds": {
      "choose": 1,
      "type": "bonds",
      "from": [
        "I have a family, but I have no idea where they are. One day, I hope to see them again.",
        "I worked the land, I love the land, and I will protect the land.",
        "A proud noble once gave me a horrible beating, and I will take my revenge on any bully I encounter.",
        "My tools are symbols of my past life, and I carry them so that I will never forget my roots.",
        "I protect those who cannot protect themselves.",
        "I wish my childhood sweetheart had come with me to pursue my destiny."
      ]
    },
    "flaws": {
      "choose": 1,
      "type": "flaws",
      "from": [
        "The tyrant who rules my land will stop at nothing to see me killed.",
        "I’m convinced of the significance of my destiny, and blind to my shortcomings and the risk of failure.",
        "The people who knew me when I was young know my shameful secret, so I can never go home again.",
        "I have a weakness for the vices of the city, especially hard drink.",
        "Secretly, I believe that things would be better if I were a tyrant lording over the land.",
        "I have trouble trusting in my allies."
      ]
    },
    "url": "/api/backgrounds/folk-hero"
  }
]
