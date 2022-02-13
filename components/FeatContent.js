import isEmpty from "lodash/isEmpty"
import useI18n from "../modules/i18n/useI18n"
import Tag from "../components/Tag"
import LineInfo from "./LineInfo"

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
						{p.abilityScore.name} >= {p.minimumScore}
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

	return (
		<div>
			{!isEmpty(spells) && (
				<div>
					<h3 className="prose">Sorts</h3>
					<LineInfo.Parent>
						{spells.map(spell => (
							<LineInfo index={spell.index} label={tr(spell.nameLocalized)} />
						))}
					</LineInfo.Parent>
				</div>
			)}

			{!isEmpty(features) && (
				<div>
					<h3 className="prose">features</h3>
					<LineInfo.Parent>
						{features.map(feature => (
							<LineInfo index={feature.index} label={feature.index} />
						))}
					</LineInfo.Parent>
				</div>
			)}

			{!isEmpty(statsBonuses) && (
				<div>
					<h3 className="prose">Bonus d'abilités</h3>
					<LineInfo.Parent>
						{statsBonuses.map(statBonus => (
							<LineInfo 
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
				<h3>Prérequis :</h3>
				{feat.hasPrerequisites && (
					<>
						<em>Attention, certain pré-requis ne peuvent pas être vérifiés automatiquement.</em>
						<div className="mt-4">
							<FeatPrerequisites feat={feat} />
						</div>
					</>
				)}
				{!feat.hasPrerequisites && (
					<p>Aucun prérequis</p>
				)}
			</div>

			{character && (
				<div className="mt-8">
					<h3>Options sélectionnées pour {character.name}</h3>
					<CharacterData character={character} feat={feat} />
				</div>
			)}
		</div>
	)
}

export default FeatContent