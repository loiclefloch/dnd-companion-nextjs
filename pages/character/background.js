import Link from "next/link"
import useI18n from "../../modules/i18n/useI18n"
import { useRouter } from "next/router"
import Screen from "../../components/Screen"
import useCurrentCharacter from "../../modules/character/useCurrentCharacter"

function Section({ title, children }) {
	return (
		<div className="pt-2 mt-2">
			<h3 className="mb-2 font-semibold border-b border-solid border-slate-200">{title}</h3>
			<div>{children}</div>
		</div>
	)
}

function Background() {
	const router = useRouter()
	const { tr } = useI18n()
	const { character } = useCurrentCharacter()

	return (
		<Screen
			title={`${character?.name}`}
			// titleIcon={<IconBriefcase className="w-6 h-6" />}
			withCharacterMenu
			withBottomSpace
		// rightAction={ // TODO: edit
		// <button 
		// 	onClick={() => {

		// 	}}
		// >
		// 	<IconPlus className={"h-6 w-6 text-slate-800"} />
		// </button>
		// }
		>
			{character && (
				<>
					<div className="px-4 mt-4">
				
						<div className="mt-4">
							<Section title="Physic">
								<div className="">
									<Link href={`/race/${character.race.index}`}>
										{tr(character.race.nameLocalized)}
									</Link>
									<span> - </span>
									<Link href={`/class/${character.classes[0].index}`}>
										{character.classes.map(clss => tr(clss.nameLocalized)).join(', ')}
									</Link>
								</div>

								<div>
									Age: {character.age}
								</div>
								<div onClick={() => showTipAlignment(character.alignmentIndex)}>
									{character.alignment.name}
								</div>

								<div>TODO: body.age</div>
								<div>TODO: body.sex</div>
								<div>TODO: body.height</div>
								<div>TODO: body.weight</div>
								<div>TODO: body.hairColor</div>
								<div>TODO: body.eyeColor</div>
								<div>TODO: body.skinColor</div>
								<div>TODO: body.physicalCaracteristics</div>
							</Section>

							<Section title="LANGUAGES">
								{character.languages.map((language, index) => (
									<p key={index}>{language}</p>
								))}
							</Section>

							<Section title="IDEALS">
								<div>{character.ideals}</div>
							</Section>

							<Section title="FLAWS">
								<div>{character.flaws}</div>
							</Section>

							<Section title="BONDS">
								<div>{character.bonds}</div>
							</Section>

							<Section title="PERSONNALITY TRAITS">
								{character.traits.map((trait, index) => (
									<p key={index}>{trait}</p>
								))}
							</Section>
						
						</div>
					</div>
				</>
			)}
		</Screen>
	)
}

export default Background