import { useEffect } from "react";
import useContextCharacter from "../components/useContextCharacter"
import Link from 'next/link'
import isEmpty from "lodash/isEmpty"
import clsx from "clsx"
import { getSpellFiltersMatchingData, buildSpellFiltersForCharacter } from "../modules/spells/spellsFilter"
import { sortSpells } from "../modules/spells/spellsSorter"
import useI18n from "../modules/i18n/useI18n";
import useSpells from "../modules/api/useSpells";
import { useSpellModal } from "../components/SpellScreenAsModal";
import { useSpellsListFilterScreenAsModal } from "../components/SpellsListFilterScreenAsModal"
import Screen from "../components/Screen";
import IconFilter from "../components/icons/IconFilter";
import Tag from "../components/Tag"

function IndexScreen() {
  const { lang } = useI18n()
  const contextCharacter = useContextCharacter()

  return (
    <Screen
      title={"Dashboard"}
      root
    >
      <div className="flex">
      </div>
    </Screen>
  );
}

export default IndexScreen;
