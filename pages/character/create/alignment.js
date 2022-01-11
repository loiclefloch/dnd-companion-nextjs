import { useState } from "react"
import alignments from "../../../database/data/alignments.json"
import ButtonBottomScreen from "../../../components/ButtonBottomScreen";
import ScreenIntroduction from "../../../components/ScreenIntroduction";
import Screen from "../../../components/Screen";
import useTipAlignment from "../../../components/useTipAlignment";
import ListSelector from "../../../components/ListSelector";
import Link from "next/link"
import useCreateCharacter from '../../../components/useCreateCharacter';

// TODO: put on race data
const defaultData = {
	// TODO: min / max
	human: {
		baseHeight: {
			pouce: 4.8,
		},
		baseWeight: {
			lb: 110,
		}
	},
	'high-elft': {
		baseHeight: {
			pouce: 4.6,
		},
		baseWeight: {
			lb: 90,
		}
	}
}

function Form() {
	const { character, updateCharacter } = useCreateCharacter()
	// TODO: default useState does not work
	const [selectedAlignment, setSelectedAlignment] = useState(character?.alignmentIndex)
	const { showTipAlignment } = useTipAlignment()

	return (
		<div className="flex flex-col">
			<ScreenIntroduction
				title="Choisissez votre alignement"
				description={`L'alignement ...`}
				actions={
					<div className="mt-2">
						<Link href="/rules/alignment">
							En savoir plus
						</Link>
					</div>
				}
			/>

			{/* TODO: use ListSelector */}
			<ListSelector
				value={selectedAlignment}
				options={alignments.map(alignment => ({
					label: alignment.name,
					value: alignment.index,
					selected: selectedAlignment === alignment.index,
					rightView: (
						<div
							className="px-4 py-2 text-xs text-meta"
							onClick={() => showTipAlignment(alignment.index)}
						>
							?
						</div>
					)
				}))}
				onChange={setSelectedAlignment}
			/>

			<ButtonBottomScreen
				variant="cta"
				onClick={() => {
					updateCharacter({ alignmentIndex: selectedAlignment, step: 'alignment' })
				}}
			>
				Suivant
			</ButtonBottomScreen>
		</div>
	)
}

function CreateCharacterAlignment() {
  return (
    <Screen
      title={"Alignement"}
    >
			<Form />
    </Screen>
  );
}

export default CreateCharacterAlignment;
