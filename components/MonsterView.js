import clsx from "clsx";
import useI18n from "../modules/i18n/useI18n";

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
          <div className="gap-1 text-xs">
            <div className="mb-1 ml-1 text-meta">
              {otherNames.join(", ")}
              <div>
                {tr(monster.meta)}
              </div>
            </div>
            <div>
              {monster.isLegendary && (
                <Tag label="Legendaire" size="small" className="border border-solid text-amber-600 border-amber-600" />
              )}
            </div>
          </div>

        </div>
        <div className="">
          <Tag
            className="flex items-center justify-center text-gray-600 normal-case bg-gray-200"
          >
            {monster.ac}
          </Tag>
          <Tag
            className="flex items-center justify-center mt-2 text-gray-600 normal-case bg-gray-200"
          >
            {monster.hp}
          </Tag>
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
                <span className="font-semibold">Languages</span>
                <span> </span>
                {monster.languages ? (
                  <span className="text-sm">{tr(monster.languages)}</span>
                ) : (
                  <span>-</span>
                )}
              </p>
              <p>
                <span className="font-semibold">Sens</span>
                <span> </span>
                <span className="text-sm">{tr(monster.senses)}</span>
              </p>
              <p>
                <span className="font-semibold">Challenge</span>
                <span> </span>
                <span className="text-sm">{tr(monster.challenge.label)}</span>
              </p>

              <p>
                <span className="font-semibold">Speed</span>
                <span> </span>
                <span className="text-sm">{tr(monster.speedType)} {tr(monster.speed)}</span>
              </p>

              <p>
                <span className="font-semibold">Alignement</span>
                <span> </span>
                <span className="text-sm">{tr(monster.alignment)}</span>
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

          {monster.ecology && (
            <div className="mt-4">
              <Section title="Écologie">
                {tr(monster.ecology)}
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
        <div className="flex flex-row flex-wrap gap-1 mt-8">
          {tags.filter(Boolean).map((tag, index) => (
            <Tag key={index} className={clsx('', tag.className)}>
              {tag.label}
            </Tag>
          ))}
        </div>
      )}

      {/* TODO: Gallery component */}
      {monster.images && (
        <div className="flex gap-2 mt-8">
          {monster.images.map((imageData) => (
            <Image 
              key={imageData.url} 
              src={imageData.url} 
              alt={imageData.label} 
              className={monster.images.length === 1 ? "w-full" : "w-1/3"} 
            />
          ))}
        </div>
      )}

      <div className='mb-8'>&nbsp;</div>
    </div>
  );
}

export default MonsterView;
