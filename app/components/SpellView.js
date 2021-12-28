import clsx from "clsx";
import useI18n from "../modules/i18n/useI18n";
import useTheme from "../modules/theme/useTheme";

import Tag from './Tag';
import SpellRunner from "./SpellRunner";
import SpellDetail from "./SpellDetail";

function createClassTag(clss) {
  return {
    label: clss.nameLocalized.en,
    className: "text-blue-600 bg-blue-200",
    link: "",
  };
}

function SpellView({ spell }) {
  const { tr, getRangeUnit, isDefaultLang, trDefaultLang } = useI18n();
  const theme = useTheme()


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
      className: "text-amber-600 bg-amber-200",
      link: "",
    },
  ]

  return (
    <div
      className="px-4"
    >
      <div className="flex justify-between">
        <div>
          <div className="text-xs">
            <div className={clsx("mb-1 ml-1", theme.metaColor)}>{otherNames.join(", ")}</div>
            <Tag className={clsx("mt-1 bg-slate-200", theme.metaColor)}>{tr(spell.school.nameLocalized)}</Tag>
          </div>
        </div>
        <div>
          <Tag
            className="text-gray-600 bg-gray-200 flex justify-center items-center"
          >
            {spell.level === 0 ? "cantrip" : `Niveau ${spell.level}`}
          </Tag>
          {(spell.ritual || spell.concentration) && (
            <div className="mt-2">
              {spell.ritual && <Tag label="Ritual" className="flex text-orange-600 bg-orange-200" />}
              {spell.concentration && (
                <Tag label="Concentration" className="flex text-blue-600 bg-blue-200" />
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
            {spell.components.materials && <span className={clsx("text-sm", theme.metaColor)}>&nbsp;({spell.components.materials.join(", ")})</span>}
          </div>

          <SpellRunner spell={spell} />

          {spell.resume && (
            <div className="mt-2">
              <span className="font-semibold">Resume: </span>
              <div className="whitespace-pre-wrap">{tr(spell.resume)}</div>
            </div>
          )}
          <div className="mt-2">
            <span className="font-semibold">Description: </span>
            <div className="whitespace-pre-wrap">{tr(spell.desc)}</div>
          </div>
          {spell.higherLevel && (
            <div className="mt-2">
              <span className="font-semibold">At Higher Levels.</span> {tr(spell.higherLevel)}
              {/* TODO: add avanced mode : healAtSlotLevel */}
            </div>
          )}
        </div>
      </div>
      {tags && (
        <div className="flex flex-row mt-8 flex-wrap">
          {tags.filter(Boolean).map((tag, index) => (
            <Tag key={index} className={clsx('', tag.className)}>
              {tag.label}
            </Tag>
          ))}
        </div>
      )}

      <div className='mt-4'>
        <SpellDetail spell={spell} />
      </div>
    </div>
  );
}

export default SpellView;
