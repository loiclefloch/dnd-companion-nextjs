import { useState } from "react"
import { useRouter } from 'next/router'
import alignments from "../../../database/data/alignments.json"
import ButtonBottomScreen from "../../../components/ButtonBottomScreen";
import ScreenIntroduction from "../../../components/ScreenIntroduction";
import Screen from "../../../components/Screen";
import useTipAlignment from "../../../components/useTipAlignment";
import ListSelector from "../../../components/ListSelector";
import Link from "next/link"
import useI18n from '../../../modules/i18n/useI18n';
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
	const [selectedAlignment, setSelectedAlignment] = useState(null)
	const { showTipAlignment } = useTipAlignment()
	const router = useRouter()
	const { updateCharacter } = useCreateCharacter()

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
					const url = '/character/create/languages'
					router.push(url)
					updateCharacter({ alignmentIndex: selectedAlignment, step: 'languages', url })
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
