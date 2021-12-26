import useSpell from "../modules/api/useSpell";
import useI18n from "../modules/i18n/useI18n";

import Card from "./Card";
import Tag from './Tag'

function createClassTag(clss) {
  return {
    label: clss.nameLocalized.en,
    color: "blue", // TODO:
    link: "",
  };
}

function SpellCard({ name }) {
  const { tr, getRangeUnit, isDefaultLang, trDefaultLang } = useI18n();
  const spellResponse = useSpell(name);

  const spell = spellResponse.data;

  const otherNames = [
    spell.otherNameLocalized && spell.otherNameLocalized.fr,
    spell.otherNameLocalized && spell.otherNameLocalized.en,
    !isDefaultLang && trDefaultLang(spell?.nameLocalized),
  ].filter(Boolean);

  return (
    <Card
      isLoading={spellResponse.isLoading}
      name={
        <div className="flex justify-between">
          <span>{tr(spell?.nameLocalized)}</span>
          <span
            className="text-lg font-semibold inline-block uppercase rounded-full text-gray-600 bg-gray-200 text-center flex justify-center items-center"
            style={{ width: 30, height: 30 }}
          >
            {spell?.level}
          </span>
        </div>
      }
      meta={
        <div>
          <div className="mt-1 italic">{otherNames.join(", ")}</div>
          <div className="mt-1 italic">{tr(spell?.school.nameLocalized)}</div>
          {(spell?.ritual || spell?.concentration) && (
              <div className="mt-2">
                {spell?.ritual && <Tag label="Ritual" color="blue" />}
                {spell?.concentration && (
                  <Tag label="Concentration" color="blue" />
                )}
              </div>
            )}
        </div>
      }
      // data={[
      //   {
      //     label: "Casting time",
      //     value: tr(spell?.castingTime),
      //   },
      //   {
      //     label: "Range",
      //     value: tr(getRangeUnit(spell?.range)),
      //   },
      //   spell?.components && {
      //     label: "Components",
      //     value: tr(spell?.components.text),
      //   },
      //   {
      //     label: "Duration",
      //     value: tr(spell?.duration),
      //   },
      // ]}
      description={
        <div>
          <div className="my-4">
            {tr(spell?.castingTime)}
            <span> - </span>
            {tr(getRangeUnit(spell?.range))}
            <span> - </span>
            {tr(spell?.duration)}
            <span> - </span>
            {spell?.components.components.join(", ")}
            {spell?.components.materials && <span className="text-sm italic">&nbsp;({spell.components.materials.join(", ")})</span>}
          </div>
          {spell?.resume && (
            <div className="mt-2">
              <b>Resume: </b>
              {tr(spell.resume)}
            </div>
          )}
          <div className="mt-2">
            <b>Description: </b>
            {spell?.desc.en}
          </div>
          {spell?.higherLevel && (
            <div className="mt-2">
              <b>At Higher Levels.</b> {tr(spell.higherLevel)}
              {/* TODO: add avanced mode : healAtSlotLevel */}
            </div>
          )}
        </div>
      }
      tags={[
        ...spell?.classes.map(createClassTag),
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
