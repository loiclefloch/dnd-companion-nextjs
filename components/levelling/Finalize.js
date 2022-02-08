import Link from "next/link"
import Button from "../Button"

function Finalize({ getBuildedCharacter, finalizeLevelling }) {
	const character = getBuildedCharacter()

	return (
		<div className="prose px-4">
			<h3 className="text-center mt-2">Félicitations, votre montée de niveau est terminée !</h3>

			<div mt="mt-2"></div>

			<h4 className="text-center">
				Il ne vous reste plus qu'à cliquer sur le bouton ci-dessous pour finaliser.
			</h4>

			<div className="flex flex-col gap-8 mt-16">
				<Link href={`/character/levelling`}>
					<Button variant="outlined" color="warning">
						Mettre en pause ma montée de niveau
					</Button>
				</Link>


				<Button 
					variant="outlined"
					color="success"
					onClick={() => {
						finalizeLevelling()
					}}
				>
					Valider ma montée de niveau
				</Button>
			</div>
		</div>
	)
}

export default Finalize