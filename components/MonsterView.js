import clsx from "clsx";
import { makeI18n } from "../modules/i18n/useI18n";

import HtmlContent from "./HtmlContent"
import Tag from './Tag';
import StatsSmall from "./StatsSmall"
import Image from "./Image"
import Gallery from "./Gallery"
import useGalleryFullScreenAsModal from "./useGalleryFullScreenAsModal"
import useDice from "./useDice";
import Section from "./Section"

const useI18n = makeI18n({
  'monter.hp': {
    fr: `Points de vie %{monster.name}`,
    en: `HP %{monster.name}`,
  },
  'monter.gallery': {
    fr: `Gallerie %{monster.name}`,
    en: `Gallery %{monster.name}`,
  },
  'languages.title': {
    fr: 'Languages',
    en: 'Languages',
  },
  'senses.title': {
    fr: 'Sens',
    en: 'Senses',
  },
  'alignment.title': {
    fr: `Alignement`,
    en: `Alignment`,
  },
  'speed.title': {
    fr: `Vitesse`,
    en: `Speed`,
  },
  'challenge.title': {
    fr: `Challenge`,
    en: `Challenge`,
  },
  'resume.title': {
    fr: `Résumé`,
    en: `Resume`,
  },
  'description.title': {
    fr: `Description`,
    en: `Description`,
  },
  'ecology.title': {
    fr: `Ecologie`,
    en: `Ecology`,
  },
  'traits.title': {
    fr: `Traits`,
    en: `Traits`,
  },
  'legendaryActions.title': {
    fr: `Actions légendaires`,
    en: `Legendary actions`,
  },
  'actions.title': {
    fr: `Actions`,
    en: `Actions`,
  },
})

function MonsterView({ monster }) {
  const { tr, isDefaultLang, trDefaultLang } = useI18n();
  const { rollDice } = useDice()
	const { showGalleryFullScreen } = useGalleryFullScreenAsModal()

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
                <Tag label={tr`legendary.label`} size="small" className="border border-solid text-amber-600 border-amber-600" />
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
            onClick={() => rollDice(
              tr('monster.hp', { 'monster.name': tr(monster.nameLocalized) }),
              monster.hpDice
            )}
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
              <Image 
                alt={tr(monster.nameLocalized)} 
                src={monster.imageUrl} 
                onClick={() => showGalleryFullScreen(
                  tr('monter.gallery', { 'monster.name': tr(monster.nameLocalized)}),
                  monster.images, 
                  monster.images[0]
                )}
              />
            </div>
          )}

          <div className="mt-4">
            <div className="font-semibold width-full border-b border-solid border-gray-600 border-opacity-10 mb-2 pb-0.5">
            </div>
            <div className="whitespace-pre-wrap text-md">
              <p>
                <span className="font-semibold">{tr`languages.title`}</span>
                <span> </span>
                {monster.languages ? (
                  <span className="text-sm">{tr(monster.languages)}</span>
                ) : (
                  <span>-</span>
                )}
              </p>
              <p>
                <span className="font-semibold">{tr`senses.title`}</span>
                <span> </span>
                <span className="text-sm">{tr(monster.senses)}</span>
              </p>
              <p>
                <span className="font-semibold">{tr`challenge.title`}</span>
                <span> </span>
                <span className="text-sm">{tr(monster.challenge.label)}</span>
              </p>

              <p>
                <span className="font-semibold">{tr`speed.title`}</span>
                <span> </span>
                <span className="text-sm">{tr(monster.speedType)} {tr(monster.speed)}</span>
              </p>

              <p>
                <span className="font-semibold">{tr`alignment.title`}</span>
                <span> </span>
                <span className="text-sm">{tr(monster.alignment)}</span>
              </p>
              {/* TODO: Proficiency Bonus +2 */}
            </div>
          </div>

          {monster.resume && (
            <div className="mt-4">
              <Section title={tr`resume.title`}>
               {tr(monster.resume)}
              </Section>
            </div>
          )}

          {tr(monster.desc) && (
            <div className="mt-4">
              <Section title={tr`description.title`} withToggle>
               <HtmlContent html={tr(monster.desc)} />
              </Section>
            </div>
          )}

          {monster.ecology && (
            <div className="mt-4">
              <Section title={tr`ecology.title`} withToggle>
                {tr(monster.ecology)}
              </Section>
            </div>
          )}

          <div className="mt-4">
            <Section title={tr`traits.title`} withToggle>
             <HtmlContent html={tr(monster.traits)}/>
            </Section>
          </div>

          <div className="mt-4">
            <Section title={tr`actions.title`} withToggle>
             <HtmlContent html={tr(monster.actions)}/>
            </Section>
          </div>

          {monster.legendaryActions && (
            <Section title={tr`"legendaryActions.title"`} withToggle>
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
        <div className="mt-8">
          <Gallery 
            title={tr('monter.gallery', { 'monster.name': tr(monster.nameLocalized) })}
            images={monster.images} 
          />
        </div>
      )}

      <div className='mb-8'>&nbsp;</div>
    </div>
  );
}

export default MonsterView;
