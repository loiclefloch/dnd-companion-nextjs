import isEmpty from "lodash/isEmpty"
import { makeI18n } from "../modules/i18n/useI18n"
import Tag from "../components/Tag"
import LineInfo from "./LineInfo"

const useI18n = makeI18n({
	'spells.title': {
		fr: 'Sorts',
		en: 'Spells',
	},
	'features.title': {
		en: `Features`,
		fr: `Capacités`,
	},
	'abilityBonuses.title':  {
		fr: `Bonus d'abilités`,
		en: 'Ability bonuses',
	},
	'prerequisite.title': {
		fr: `Prérequis`,
		en: 'Prerequisite',
	},
	'prerequisite.warn not verified': {
		fr: 'Attention, certain pré-requis ne peuvent pas être vérifiés automatiquement.',
		en: 'Warning, some prerequisite cannot be verified automatically.',
	},
	'prerequisite.none': {
		fr: 'Aucun prérequis',
		en: 'No prerequisites',
	},
	'options for character.title': {
		fr: 'Options sélectionnées pour %{character.name}',
		en: 'Options selected for %{character.name}'
	},
	'options for character.no options': {
		fr: `Pas d'options existante`,
		en: 'No existing option',
	}
})

export function FeatPrerequisites({ feat }) {
	return (
		<div className="flex gap-2">
			{feat.forRace && (
				feat.prerequisites.map((p, index) => (
					<Tag key={index} size="small" className="border border-slate-600 text-slate-600">
						{p.race.name}
					</Tag>
				))
			)}
			{feat.forAbilityScore && (
				feat.prerequisites.map((p, index) => (
					<Tag key={index} size="small" className="border border-slate-600 text-slate-600">
						{p.abilityScore.name} {`>=`} {p.minimumScore}
					</Tag>
				))
			)}
			{feat.forProficiency && (
				feat.prerequisites.map((p, index) => (
					<Tag key={index} size="small" className="border border-slate-600 text-slate-600">
						{p.proficiency.name}
					</Tag>
				))
			)}
			{feat.forOther && (
				<Tag className="text-meta text-xs border border-slate-600 text-slate-600">
					{feat.prerequisitesLabel}
				</Tag>
			)}
		</div>
	)
}

function CharacterData({ feat, character }) {
	const { tr } = useI18n()
	// TODO: can't retrieve them until we refactor the languages array
	const languages = []
	const spells = character.spellsList.filter(spell => spell.from === 'feat' && spell.feat === feat.index)
	const features = character.features.filter(feature => feature.from === 'feat' && feature.feat === feat.index)
	const statsBonuses = character.statsBonuses.filter(statBonus => statBonus.type === 'feat' && statBonus.feat === feat.index)

	if (!feat.hasOption) {
		return <div>
			<p className="prose">
				{tr`options for character.no options`}
			</p>
		</div>
	}

	return (
		<div>
			{!isEmpty(spells) && (
				<div>
					<h3 className="prose">{tr`spells.title`}</h3>
					<LineInfo.Parent>
						{spells.map(spell => (
							<LineInfo key={spell.index} index={spell.index} label={tr(spell.nameLocalized)} />
						))}
					</LineInfo.Parent>
				</div>
			)}

			{!isEmpty(features) && (
				<div>
					<h3 className="prose">{tr`features.title`}</h3>
					<LineInfo.Parent>
						{features.map(feature => (
							<LineInfo key={feature.index} index={feature.index} label={feature.index} />
						))}
					</LineInfo.Parent>
				</div>
			)}

			{!isEmpty(statsBonuses) && (
				<div>
					<h3 className="prose">{tr`abilityBonuses.title`}</h3>
					<LineInfo.Parent>
						{statsBonuses.map(statBonus => (
							<LineInfo 
								key={statBonus.index} 
								index={statBonus.index} 
								label={statBonus.ability} 
								value={`+${statBonus.bonus}`} 
							/>
						))}
					</LineInfo.Parent>
				</div>
			)}
		</div>
	)
}

function FeatContent({ character, feat }) {
	const { tr } = useI18n()

	return (
		<div className="prose px-4">
			<div>{tr(feat.resume)}</div>

			<div className="whitespace-pre-wrap">
				{tr(feat.desc)}
			</div>

			<div className="mt-8">
				<h3>{tr`prerequisite.title`}</h3>
				{feat.hasPrerequisites && (
					<>
						<em>{tr`prerequisite.warn not verified`}</em>
						<div className="mt-4">
							<FeatPrerequisites feat={feat} />
						</div>
					</>
				)}
				{!feat.hasPrerequisites && (
					<p>{tr`prerequisite.none`}</p>
				)}
			</div>

			{character && (
				<div className="mt-8">
					<h3>{tr('options for character.title', { 'character.name': character.name })}</h3>
					<CharacterData character={character} feat={feat} />
				</div>
			)}
		</div>
	)
}

export default FeatContent