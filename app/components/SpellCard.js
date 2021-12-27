import clsx from "clsx";
import useSpell from "../modules/api/useSpell";
import useI18n from "../modules/i18n/useI18n";
import useTheme from "../modules/theme/useTheme";

import Card from "./Card";
import Tag from './Tag';
import SpellRunner from "./SpellRunner";

function createClassTag(clss) {
  return {
    label: clss.nameLocalized.en,
    color: "blue", // TODO:
    link: "",
  };
}

function SpellCard({ name }) {
  const { tr, getRangeUnit, isDefaultLang, trDefaultLang } = useI18n();
  const theme = useTheme()
  const spellResponse = useSpell(name);

  const spell = spellResponse.data;

  if (spellResponse.isLoading) {
    return null
  }

  console.log({spellResponse})

  const otherNames = [
    spell.otherNameLocalized && spell.otherNameLocalized.fr,
    spell.otherNameLocalized && spell.otherNameLocalized.en,
    !isDefaultLang && trDefaultLang(spell.nameLocalized),
  ].filter(Boolean);

  return (
    <Card
      isLoading={spellResponse.isLoading}
      name={
        <div className="flex justify-between">
          <span>{tr(spell.nameLocalized)}</span>
          <span
            className="text-lg font-semibold inline-block uppercase rounded-full text-gray-600 bg-gray-200 text-center flex justify-center items-center"
            style={{ width: 30, height: 30 }}
          >
            {spell.level}
          </span>
        </div>
      }
      meta={
        <div>
          <div className={clsx("mt-1", theme.metaColor)}>{otherNames.join(", ")}</div>
          <div className={clsx("mt-1", theme.metaColor)}>{tr(spell.school.nameLocalized)}</div>
          {(spell.ritual || spell.concentration) && (
              <div className="mt-2">
                {spell.ritual && <Tag label="Ritual" color="blue" />}
                {spell.concentration && (
                  <Tag label="Concentration" color="blue" />
                )}
              </div>
            )}
        </div>
      }
      // data={[
      //   {
      //     label: "Casting time",
      //     value: tr(spell.castingTime),
      //   },
      //   {
      //     label: "Range",
      //     value: tr(getRangeUnit(spell.range)),
      //   },
      //   spell.components && {
      //     label: "Components",
      //     value: tr(spell.components.text),
      //   },
      //   {
      //     label: "Duration",
      //     value: tr(spell.duration),
      //   },
      // ]}
      description={
        <div>
          <div className="my-4">
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
              {tr(spell.resume)}
            </div>
          )}
          <div className="mt-2">
            <span className="font-semibold">Description: </span>
            {spell.desc.en}
          </div>
          {spell.higherLevel && (
            <div className="mt-2">
              <span className="font-semibold">At Higher Levels.</span> {tr(spell.higherLevel)}
              {/* TODO: add avanced mode : healAtSlotLevel */}
            </div>
          )}
        </div>
      }
      tags={[
        ...spell.classes.map(createClassTag),
        {
          label: (
            <span>
              {spell.source}
              {spell.sourcePage && <span> (p.{spell.sourcePage})</span>}
            </span>
          ),
          color: "amber",
          link: "",
        },
      ]}
    />
  );
}

export default SpellCard;
