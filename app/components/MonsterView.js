import clsx from "clsx";
import useI18n from "../modules/i18n/useI18n";
import useTheme from "../modules/theme/useTheme";

import HtmlContent from "./HtmlContent"
import Tag from './Tag';
import StatsSmall from "./StatsSmall"
import Image from "./Image"

function Section({ title, children }) {
  return (
    <div className="mt-4">
      <div className="text-lg font-semibold width-full border-b border-solid border-gray-600 border-opacity-10 mb-2 pb-0.5">
        {title}
      </div>
      <div className="whitespace-pre-wrap text-md">{children}</div>
    </div>
  )
}

function MonsterView({ monster }) {
  const { tr, isDefaultLang, trDefaultLang } = useI18n();
  const theme = useTheme()

  const otherNames = [
    monster.otherNameLocalized && monster.otherNameLocalized.fr,
    monster.otherNameLocalized && monster.otherNameLocalized.en,
    !isDefaultLang && trDefaultLang(monster.nameLocalized),
  ].filter(Boolean);

  const tags = [
    ...monster.environments?.map(environment => ({
      label: (
        <span>
          {environment}
        </span>
      ),
      className: "text-gray-600 bg-gray-200",
      link: "",
    })),

    monster.source && {
      label: (
        <span>
          {monster.source}
          {monster.sourcePage && <span> (p.{monster.sourcePage})</span>}
        </span>
      ),
      className: "text-amber-600 bg-amber-200",
      link: "",
    },
  ].filter(Boolean)

  return (
    <div
      className="px-4"
    >
      <div className="flex justify-between">
        <div>
          <div className="text-xs gap-1">
            <div className={clsx("mb-1 ml-1", theme.metaColor)}>
              {otherNames.join(", ")}
              <div>
                {tr(monster.meta)}
              </div>
            </div>
            <div>
              {monster.isLegendary && (
                <Tag label="Legendaire" small className="text-amber-600 border border-solid border-amber-600" />
              )}
            </div>
          </div>

        </div>
        <div className="">
          <Tag
            className="text-gray-600 bg-gray-200 flex justify-center items-center"
          >
            {monster.ac}
          </Tag>
          <Tag
            className="text-gray-600 bg-gray-200 flex justify-center items-center mt-2"
          >
            {monster.hp}
          </Tag>
          <div>
            {/* TODO: */}
            {monster.speed}
          </div>
        </div>
      </div>
    
      <div className="flex-1">
        <div>
          <div className="my-3 text-sm">
            {/* TODO: */}
          </div>

          <div className="mt-6 mb-4">
            <StatsSmall stats={monster.stats} />
            {/* 
             // TODO:
            - saving throws 
            - speed
            - skills
            - imageUrl
            - damageImmunities
            - conditionImmunities
            - damageResistances
            - damageVulnerabilities
            - reactions
            - isLegendary
            */}
          </div>

          {monster.imageUrl && (
            <div className="flex justify-center shadow-md">
              <Image alt={tr(monster.nameLocalized)} src={monster.imageUrl} />
            </div>
          )}

          <div className="mt-4">
            <div className="font-semibold width-full border-b border-solid border-gray-600 border-opacity-10 mb-2 pb-0.5">
            </div>
            <div className="whitespace-pre-wrap text-md">
              <p>
                <span className="font-semibold">Languages</span> <span className="text-sm">{tr(monster.languages)}</span>
              </p>
              <p>
                <span className="font-semibold">Sens</span> <span className="text-sm">{tr(monster.senses)}</span>
              </p>
              <p>
                <span className="font-semibold">Challenge</span> <span className="text-sm">{tr(monster.challenge.label)}</span>
              </p>
              {/* TODO: Proficiency Bonus +2 */}
            </div>
          </div>

          {monster.resume && (
            <div className="mt-4">
              <Section title="Résumé">
               {tr(monster.resume)}
              </Section>
            </div>
          )}

          {tr(monster.desc) && (
            <div className="mt-4">
              <Section title="Description">
               <HtmlContent html={tr(monster.desc)} />
              </Section>
            </div>
          )}

          <div className="mt-4">
            <Section title="Traits">
             <HtmlContent html={tr(monster.traits)}/>
            </Section>
          </div>

          <div className="mt-4">
            <Section title="Actions">
             <HtmlContent html={tr(monster.actions)}/>
            </Section>
          </div>

          {monster.legendaryActions && (
            <Section title="Legendary actions">
              <HtmlContent html={tr(monster.legendaryActions)} />
            </Section>
          )}

        </div>
      </div>

      {tags && (
        <div className="flex flex-row mt-8 flex-wrap gap-1">
          {tags.filter(Boolean).map((tag, index) => (
            <Tag key={index} className={clsx('', tag.className)}>
              {tag.label}
            </Tag>
          ))}
        </div>
      )}

      <div className='mb-8'>&nbsp;</div>
    </div>
  );
}

export default MonsterView;
