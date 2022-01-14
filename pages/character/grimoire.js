import groupBy from "lodash/groupBy"
import map from "lodash/map"
import Link from "next/link"
import useI18n from "../../modules/i18n/useI18n"
import { useRouter } from "next/router"
import Screen from "../../components/Screen"
import useCurrentCharacter from "../../modules/character/useCurrentCharacter"
import IconBookOpen from "../../components/icons/IconBookOpen"
import IconPlus from "../../components/icons/IconPlus"
import IconMagicSchool from "../../components/icons/IconMagicSchool"
import CharacterSpellTag from "../../components/CharacterSpellTag"
import SpellRunner from "../../components/SpellRunner"
import Tag from "../../components/Tag"
import clsx from "clsx"

function Spell({ spell, contextCharacter /*onSelect*/ }) {
	const { tr } = useI18n();

	// TODO: if context character has the spell -> style with star / background

	return (
		<Link href={`/character/spells/${spell.index}`}>
			<div
				// onClick={onSelect}
				className={`cursor-pointer py-1 border-b border-slate-100 dark:border-gray-50 border-solid  relative`}
				data-cy-spell-index={`spell-${spell.index}`}
			>
				<div className="pl-3">
					<div className="flex flex-row">
						<div className="flex flex-col flex-1">
							<span className="flex flex-row items-center font-semibold">
								{/* <IconMagicSchool
              school={spell.school.name}
              className="h-6 w-7 text-slate-700"

            /> */}
								<p>{tr(spell.nameLocalized)}</p>
							</span>
							<div className="text-sm text-meta">
								<p>{spell.type}</p>
							</div>
						</div>

						<div
							className="pr-2 mt-1"
						>
							<div className="flex flex-row items-end gap-1">
								{spell.isPrepared && (
									<Tag
										size="small"
										className="text-green-600 border border-green-600"
									>
										Préparé
									</Tag>
								)}

								<IconMagicSchool
									school={spell.school.name}
									className="h-6 pt-1 w-7 text-slate-700"
								/>

							</div>
						</div>

					</div>

			{/* - + modifier
				- + spell attack
				- Save DC
				- time
				- range
				- hit dc
				- effect */}
					<div>
						<Tag
							size="small"
							className="border text-slate-700 border-slate-700"
						>
							{tr(spell.castingTime)}
						</Tag>


						{spell.damage?.type && (
							<Tag
								size="small"
								className="ml-2 border text-slate-700 border-slate-700"
							>
								<SpellRunner contextCharacter={contextCharacter} spell={spell} hideCasting />
							</Tag>
						)}
					</div>

					<p className="pt-2 pr-2 text-sm">{tr(spell.resume)}</p>

				</div>
			</div>
		</Link>
	);
}

function SpellLevelHeader({ level, spellsSlots }) {
	const spellSlot = spellsSlots.find(spell => spell.level === level)

	return (
		<div className="flex items-center py-1 mx-2 my-2 border-b border-solid border-slate-200">
			<div className="flex flex-1 font-semibold">
				{level === 0 ? 'Cantrip' : `Niveau ${level}`}
			</div>
			<div>
				{/* TODO: on click -> tip */}
				{level !== 0 && (
					<div className="flex">
						{([...Array(spellSlot.totalSlots)]).map((_, index) => (
							<div 
								key={index} 
								className={clsx("w-3 h-3 mr-1", {
									"bg-red-400": index <= spellSlot.usedSlots,
									"border border-solid border-slate-400": index > spellSlot.usedSlots,
								})}
							/>
						))}
					</div>
				)}
			</div>
		</div>
	)
}

function Grimoire() {
	const { character } = useCurrentCharacter()

	const groupedBySpellLevel = groupBy(character?.spellsList, spell => spell.level)
	const spellsSlots = character?.spellsSlots

	return (
		<Screen
			title={`${character?.name} - Grimoire`}
			titleIcon={<IconBookOpen className="w-6 h-6" />}
			withCharacterMenu
			rightAction={
				<button
					onClick={() => {

					}}
				>
					<IconPlus className={"h-6 w-6 text-slate-800"} />
				</button>
			}
		>
			{character && (
				<div>
					<div className="flex flex-col gap-2" data-cy-id="spells-list">
						{map(groupedBySpellLevel, (spells, level) => (
							<div key={level}>
								<>
									<SpellLevelHeader level={Number(level)} spellsSlots={spellsSlots} />
								</>
								{spells.map(spell =>
									<Spell
										key={spell.index}
										spell={spell}
									/>
								)}
							</div>
						))}
					</div>
				</div>
			)}
		</Screen>
	)
}

export default Grimoire