import Link from "next/link"
import Button from "../Button"
import useCopyToClipboard from "../useCopyToClipboard"
import useAddFlashMessage from "../useAddFlashMessage"

function Finalize({ character, levellingData, levellingState, getBuildedCharacter, finalizeLevelling }) {
	const [_, copy] = useCopyToClipboard()
	const { addSuccessFlashMessage, addErrorFlashMessage, addInfoFlashMessage } = useAddFlashMessage()
	// const finalCharacter = getBuildedCharacter()

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


				<Button 
					variant="outlined"
					color="info"
					className="mt-24"
					onClick={() => {
						const copied = copy({
							character, 
							levellingData,
							levellingState,
						})
						if (copied) {
							addSuccessFlashMessage({ text: 'Donée copiée !'})
						} else {
							addErrorFlashMessage({ text: 'Impossible de copier la donée '})
						}
					}}
				>
					Copier la donnée de debug
				</Button>
			</div>
		</div>
	)
}

export default Finalize