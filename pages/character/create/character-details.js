import { useRouter } from 'next/router'
import ButtonBottomScreen from "../../../components/ButtonBottomScreen";
import Screen from "../../../components/Screen";
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

function Form({ clss }) {
	const { updateCharacter } = useCreateCharacter()
	const router = useRouter()

	return (
		<div className="flex flex-col">

			<div className="relative w-full px-4 mt-12">
				<div>
					// TODO: age
				</div>
				<div>
					// TODO: sex
				</div>
				<div>
					// TODO: Height and weight
				</div>
				<div>
					// TODO: hair color
				</div>
				<div>
					// TODO: eye color
				</div>
				<div>
					// TODO: skin color
				</div>
				<div>
					// TODO: physical characteristics (scar / tatoo etc)
				</div>
			</div>
			<ButtonBottomScreen
				variant="cta"
				onClick={() => {
					updateCharacter({ step: 'character-details' })
				}}
			>
				Suivant
			</ButtonBottomScreen>
		</div>
	)
}

function CreateCharacterDetailsScreen() {
	const router = useRouter()
  return (
		<Screen
			title={"Nouveau personnage"}
		>
			<Form />
    </Screen>
  );
}

export default CreateCharacterDetailsScreen;
