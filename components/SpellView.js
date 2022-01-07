import clsx from "clsx";
import useI18n from "../modules/i18n/useI18n";

import IconMagicSchool from "../components/icons/IconMagicSchool"
import Tag from './Tag';
import SpellRunner from "./SpellRunner";
import SpellDetail from "./SpellDetail";
import CharacterSpellTag from "./CharacterSpellTag";

function createClassTag(clss) {
  return {
    label: clss.nameLocalized.en,
    className: "text-blue-600 border border-blue-600",
    link: "",
  };
}

function SpellView({ contextCharacter, spell }) {
  const { tr, getRangeUnit, isDefaultLang, trDefaultLang } = useI18n();

  const otherNames = [
    spell.otherNameLocalized && spell.otherNameLocalized.fr,
    spell.otherNameLocalized && spell.otherNameLocalized.en,
    !isDefaultLang && trDefaultLang(spell.nameLocalized),
  ].filter(Boolean);

  const tags = [
    ...spell.classes.map(createClassTag),
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
          <>
            <CharacterSpellTag character={contextCharacter} spell={spell} />
          </>
        </div>
        <div className="flex flex-col items-end">
          <Tag 
            size="small"
            className="border border-gray-400 text-meta"
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
            {spell.level === 0 ? "cantrip" : `Niveau ${spell.level}`}
          </Tag>
          {(spell.ritual || spell.concentration) && (
            <div className="flex flex-wrap gap-1 mt-2">
              {spell.ritual && (
                <Tag 
                  label="Ritual"
                  size="small"
                  className="flex text-orange-500 border border-orange-500" 
                />
              )}
              {spell.concentration && (
                <Tag 
                  label="Concentration" 
                  size="small"
                  className="flex text-blue-500 border border-blue-500" 
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

          <SpellRunner spell={spell} />

          {spell.resume && (
            <div className="mt-4">
              <div className="font-semibold width-full border-b border-solid border-gray-600 border-opacity-10 mb-2 pb-0.5">
                Résumé:
              </div>
              <div className="whitespace-pre-wrap">{tr(spell.resume)}</div>
            </div>
          )}
          <div className="mt-4">
            <div className="font-semibold width-full border-b border-solid border-gray-600 border-opacity-10 mb-2 pb-0.5">
              Description:
            </div>
            <div className="whitespace-pre-wrap">{tr(spell.desc)}</div>
          </div>
          {spell.higherLevel && (
            <div className="mt-4">
              <div className="font-semibold width-full border-b border-solid border-gray-600 border-opacity-10 mb-2 pb-0.5">
                At Higher Levels:
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

      <SpellDetail spell={spell} />

      {/* add some space at the end of the page */}
      <div className="py-4" />
    </div>
  );
}

export default SpellView;
