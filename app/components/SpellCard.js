import useSpell from "../modules/api/useSpell";
import useI18n from "../modules/i18n/useI18n";

import Card from "./Card";

function createClassTag(clss) {
  return {
    label: clss.nameLocalized.en,
    color: "blue", // TODO:
    link: "",
  };
}

function SpellCard({ name }) {
  const { tr, getRangeUnit } = useI18n();
  const spellResponse = useSpell(name);

  const spell = spellResponse.data;

  return (
    <Card
      isLoading={spellResponse.isLoading}
      name={tr(spell?.nameLocalized)}
      meta={spell?.type}
      data={[
        {
          label: "Casting time",
          value: tr(spell?.castingTime),
        },
        {
          label: "Range",
          value: tr(getRangeUnit(spell?.range))
        },
        {
          label: "Components",
          value: tr(spell?.components.text),
        },
        {
          label: "Duration",
          value: tr(spell?.duration),
        },
      ]}
      description={
        <div>
          {spell?.desc.en}
          {spell?.higherLevel && (
            <div>
              <b>At Higher Levels.</b> {tr(spell?.higherLevel)}
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
