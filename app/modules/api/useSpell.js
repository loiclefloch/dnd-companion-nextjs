import { useState, useEffect, useDebugValue } from 'react'
import spells from '../../../database/data/spells.json'
import useApi from "./useApi"


import conjurationWithoutBg from "../../components/img/conjuration-without-bg.png"
import divinationWithoutBg from "../../components/img/divination-without-bg.png"
import transmutationWithoutBg from "../../components/img/transmutation-without-bg.png"
import necromancyWithoutBg from "../../components/img/necromancy-without-bg.png"
import evocationWithoutBg from "../../components/img/evocation-without-bg.png"
import illusionWithoutBg from "../../components/img/illusion-without-bg.png"
import enchantmentWithoutBg from "../../components/img/enchantment-without-bg.png"
import abjurationWithoutBg from "../../components/img/abjuration-without-bg.png"

export function format(spell) {
  if (spell.school)   {
    const images = {
      Conjuration: conjurationWithoutBg.src,
      Divination: divinationWithoutBg.src,
      Transmutation: transmutationWithoutBg.src,
      Necromancy: necromancyWithoutBg.src,
      Evocation: evocationWithoutBg.src,
      Illusion: illusionWithoutBg.src,
      Enchantment: enchantmentWithoutBg.src,
      Abjuration: abjurationWithoutBg.src,
    }
    spell.school.imageUrl = images[spell.school.name] || null
  }

  return spell
}

function useSpell(index) {
  return useApi(format(spells.find(spell => spell.index === index)))
}

export default useSpell