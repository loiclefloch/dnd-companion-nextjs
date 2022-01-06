import { useEffect, useState } from "react";
import Link from 'next/link'
import isEmpty from "lodash/isEmpty"
import clsx from "clsx"
import { getSpellFiltersMatchingData, buildSpellFiltersForCharacter } from "../modules/spells/spellsFilter"
import { sortSpells } from "../modules/spells/spellsSorter"
import useI18n from "../modules/i18n/useI18n";
import useSpells from "../modules/api/useSpells";
import { useSpellsListFilterScreenAsModal } from "../components/SpellsListFilterScreenAsModal"
import Screen from "../components/Screen";
import IconFilter from "../components/icons/IconFilter";
import Tag from "../components/Tag"
import IconBookOpen from "../components/icons/IconBookOpen"
import IconMagicSchool from "../components/icons/IconMagicSchool"
import CharacterSpellTag from "./CharacterSpellTag";
import Div from "../components/elem/Div"
import Span from "../components/elem/Span"
import P from "../components/elem/P"
import Text from "../components/elem/Text"

function SpellFilters({ spell, filters }) {
  return (
    <Div className="flex flex-wrap gap-1 mt-2">
      {getSpellFiltersMatchingData(spell, filters).map(data => (
        <Tag
          key={`${data.label}-${data.value}`} 
          className="pt-1 pb-1 pl-1 pr-1 text-xs text-gray-600 border border-solid border-slate-400"
          color="slate"
          size="small"
        >
          {data.label && <Text className="text-xs lowercase">{data.label}: </Text>}<Text>{data.value}</Text>
        </Tag>
      ))}
    </Div>
  )
}

function Spell({ spell, filters, isLearned, isPrepared, contextCharacter /*onSelect*/ }) {
  const { tr } = useI18n();
	
	const isContextCharacter = !!contextCharacter

  // TODO: if context character has the spell -> style with star / background

  return (
    <Link href={isContextCharacter ? `/character/spells/${spell.index}` : `/spells/${spell.index}`}>
      <Div
        // onClick={onSelect}
        className={`cursor-pointer py-1 border-b border-slate-100 dark:border-gray-50 border-solid  relative`}
        data-test={`spell-${spell.index}`}
      >
        <Div className="pl-3">
          <Div className="flex flex-row">
            <Div className="flex flex-col flex-1">
              <Span className="flex flex-row items-center font-semibold">
                {/* <IconMagicSchool
              school={spell.school.name}
              className="h-6 w-7 text-slate-700"

            /> */}
                <Text>{tr(spell.nameLocalized)}</Text>
              </Span>
              <Div className="text-sm text-meta">
                <Text>{spell.type}</Text>
              </Div>
            </Div>

            <Div
              className="pr-2 mt-1"
            >
              <Div className="flex flex-row items-end gap-1">
                <>
									<CharacterSpellTag character={contextCharacter} spell={spell} />
                </>

                <IconMagicSchool
                  school={spell.school.name}
                  className="h-6 pt-1 w-7 text-slate-700"
                />

              </Div>
            </Div>

          </Div>

          <P className="pr-2 text-sm">{tr(spell.resume)}</P>

          {!isEmpty(filters) && !isContextCharacter && <SpellFilters spell={spell} filters={filters} />}

        </Div>
      </Div>
    </Link>
  );
}

function Spells({ contextCharacter }) {
  const { lang } = useI18n()
  const spellsResponse = useSpells();
  const [defaultFilters, setDefaultFilters ] = useState(null)

	const isContextualCharacter = !!contextCharacter

  // const { showSpellModal } = useSpellModal()
  const { filters, filterSpells, showSpellsListFilterScreen } = useSpellsListFilterScreenAsModal(
    defaultFilters
  )
  
  useEffect(() => {
    if (contextCharacter) {
      setDefaultFilters(buildSpellFiltersForCharacter(contextCharacter))
    }
  }, [contextCharacter])
  useEffect(() => {
    // ritual
    // showSpellModal(spellsResponse.data.find((spell) => spell.name === "Meld Into Stone").name)

    // Two french name
    // showSpellModal(spellsResponse.data.find((spell) => spell.name === "Animate Objects").name)

    // Dice action damage spell level
    // showSpellModal(spellsResponse.data.find((spell) => spell.name === "Thunderwave").name)

    // Dice action damages character level
    // showSpellModal(spellsResponse.data.find((spell) => spell.name === "Acid Splash").name)

    // showSpellsListFilterScreen()
  }, [])

  return (
    <Screen
      title={contextCharacter ? `Sorts - ${contextCharacter.name}` : "Sorts"}
      titleIcon={<IconBookOpen className="w-6 h-6" />}
      root
      withCharacterMenu
      withBottomSpace
      isLoading={spellsResponse.isLoading}
      rightAction={
        <button onClick={() => showSpellsListFilterScreen()}>
          <IconFilter className={clsx("h-6 w-6 text-gray-500", {
            // change color when they are filters
            "text-blue-400": !isEmpty(filters),
          })} />
        </button>
      }
    >
      <Div className="flex flex-col gap-2" data-cy-id="spells-list">
        {sortSpells(filterSpells(spellsResponse.data), lang)?.map((spell) => (
          <Spell
            key={spell.name}
            spell={spell}
            // onSelect={() => showSpellModal(spell.index)}
            filters={filters}
						contextCharacter={contextCharacter}
            isLearned={contextCharacter && contextCharacter.spellsList.some(s => spell.index === s.index)}
            isPrepared={contextCharacter && contextCharacter.spellsList.find(s => spell.index === s.index)?.isPrepared || false}
          />
        ))}
      </Div>
    </Screen>
  );
}

export default Spells;
