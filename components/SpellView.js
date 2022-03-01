import clsx from "clsx";
import { makeI18n } from "../modules/i18n/useI18n";

import IconMagicSchool from "../components/icons/IconMagicSchool"
import Tag from './Tag';
import SpellRunner from "./SpellRunner";
import SpellDetail from "./SpellDetail";
import CharacterSpellTag from "./CharacterSpellTag";
import CharacterSpellSource from "./CharacterSpellSource"
import useTipMagicSchool from "./useTipMagicSchool"
import useTipConcentration from "./useTipConcentration"
import useTipRitual from "./useTipRitual"

const useI18n = makeI18n({
  'spell cannot be prepared 1': {
    fr: 'Ce sort est un sort de sous-classe toujours préparé.',
    en: 'Ce sort est un sort de sous-classe toujours préparé.',
  },
  'spell cannot be prepared 2': {
    fr: 'Il ne rentre pas en compte dans le nombre maxium de sorts préparés.',
    en: 'Il ne rentre pas en compte dans le nombre maxium de sorts préparés.',
  },
  'spell always prepared': {
    fr: 'Ce sort est toujours préparé. Il ne rentre pas en compte dans le nombre maxium de sorts préparés',
    en: 'Ce sort est toujours préparé. Il ne rentre pas en compte dans le nombre maxium de sorts préparés',
  },
  'spell resume.title': {
    fr: "Résumé",
    en: "Resume",
  },
  'description.title': {
    fr: "Description",
    en: "Description",
  },
  'at higher levels.title': {
    fr: 'À plus haut niveau',
    en: 'At Higher Levels',
  },
})

function createCharacterClassTag(clss) {
  return {
    label: clss.nameLocalized.en,
    className: "text-blue-600 border border-blue-600",
    link: "",
  };
}

function SpellView({ character, spell }) {
  const { tr, getRangeUnit, isDefaultLang, trDefaultLang } = useI18n();
  const { showTipMagicSchool } = useTipMagicSchool()
  const { showTipConcentration } = useTipConcentration()
  const { showTipRitual } = useTipRitual()
  
  const otherNames = [
    spell.otherNameLocalized && spell.otherNameLocalized.fr,
    spell.otherNameLocalized && spell.otherNameLocalized.en,
    !isDefaultLang && trDefaultLang(spell.nameLocalized),
  ].filter(Boolean);

  const isContextCharacter = !!character

	const characterSpell = character && character.spellsList.find(s => s.index === spell.index)

  const isLearned = isContextCharacter && !!characterSpell
  const isPrepared = isContextCharacter && characterSpell?.isPrepared
	const isSubclassSpell = isContextCharacter && characterSpell?.isSubclassSpell
	const isForcedPrepared = isContextCharacter && characterSpell?.isForcedPrepared


  const tags = [
    ...spell.classes.map(createCharacterClassTag),
    {
      label: (
        <span>
          {spell.source}
          {spell.sourcePage && <span> (p.{spell.sourcePage})</span>}
        </span>
      ),
      className: "text-amber-600 border border-amber-600",
      link: "",
    },
  ]

  return (
    <div
      className="flex flex-col flex-1 h-full px-4"
    >
      <div className="flex justify-between">
        <div>
          <div className="gap-1 text-xs">
            <div className="mb-1 ml-1 text-meta">{otherNames.join(", ")}</div>
          </div>
          <div className="flex gap-2">
            <CharacterSpellTag character={character} spell={spell} />
            <CharacterSpellSource character={character} spell={spell} />
          </div>
        </div>
        <div className="flex flex-col items-end">
          <Tag 
            size="small"
            className="border border-gray-400 text-meta"
            onClick={() => showTipMagicSchool(spell.school.index)}
          >
            <IconMagicSchool
              school={spell.school.name}
              className="w-5 h-5 mr-1 text-slate-700"
            />
            {tr(spell.school.nameLocalized)}
          </Tag>
          <Tag
            size="small"
            className="flex items-center justify-center mt-1 text-gray-600 border border-gray-400"
          >
            {spell.isCantrip ? "cantrip" : `Niveau ${spell.level}`}
          </Tag>
          {(spell.ritual || spell.concentration) && (
            <div className="flex flex-wrap gap-1 mt-2">
              {spell.ritual && ( // TODO: tip
                <Tag 
                  label="Ritual"
                  size="small"
                  className="flex text-orange-500 border border-orange-500" 
                  onClick={() => showTipRitual()}
                />
              )}
              {spell.concentration && ( // TODO: tip
                <Tag 
                  label="Concentration" 
                  size="small"
                  className="flex text-blue-500 border border-blue-500" 
                  onClick={() => showTipConcentration()}
                />
              )}
            </div>
          )}
        </div>
      </div>

      <div className="flex-1">
        <div>
          <div className="my-3 text-sm">
            {tr(spell.castingTime)}
            <span> - </span>
            {tr(getRangeUnit(spell.range))}
            <span> - </span>
            {tr(spell.duration)}
            <span> - </span>
            {spell.components.components.join(", ")}
            {spell.components.materials && <span className="text-sm text-meta">&nbsp;({spell.components.materials.join(", ")})</span>}
          </div>

          <SpellRunner spell={spell} contextCharacter={character} />

          <div>
            {isSubclassSpell && (
              <p className="mt-8">
                {tr`spell cannot be prepared 1`}
                <br />
                {tr`spell cannot be prepared 2`}
              </p>
            )}

            {isForcedPrepared && !isSubclassSpell && (
              <p className="mt-8">{tr`spell always prepared`}</p>
            )}
          </div>

          {spell.resume && (
            <div className="mt-4">
              <div className="font-semibold width-full border-b border-solid border-gray-600 border-opacity-10 mb-2 pb-0.5">
               {tr`spell resume.title`} 
              </div>
              <div className="whitespace-pre-wrap">{tr(spell.resume)}</div>
            </div>
          )}
          <div className="mt-4">
            <div className="font-semibold width-full border-b border-solid border-gray-600 border-opacity-10 mb-2 pb-0.5">
              {tr`description.title`}
            </div>
            <div className="whitespace-pre-wrap">{tr(spell.desc)}</div>
          </div>
          {spell.higherLevel && (
            <div className="mt-4">
              <div className="font-semibold width-full border-b border-solid border-gray-600 border-opacity-10 mb-2 pb-0.5">
                {tr`at higher levels.title`}
              </div>
              <div>
                {tr(spell.higherLevel)}
              </div>
              {/* TODO: add avanced mode : healAtSlotLevel */}
            </div>
          )}
        </div>
      </div>
      {tags && (
        <div className="flex flex-row flex-wrap gap-1 pb-4 mt-8">
          {tags.filter(Boolean).map((tag, index) => (
            <Tag 
              key={index} 
              className={clsx('', tag.className)}
              size="small"
            >
              {tag.label}
            </Tag>
          ))}
        </div>
      )}

      <SpellDetail spell={spell} contextCharacter={character} />

      {/* add some space at the end of the page */}
      <div className="py-4" />
    </div>
  );
}

export default SpellView;
