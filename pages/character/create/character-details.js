import { useRouter } from 'next/router'
import ButtonBottomScreen from "../../../components/ButtonBottomScreen";
import Screen from "../../../components/Screen";

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

function CreateCharacterDetailsScreen() {
	const router = useRouter()
  return (
		<Screen
			title={"Nouveau personnage"}
		>
			<div className="flex flex-col">

				<div className="relative w-full px-4 mt-12">
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
						router.push('/character/create/alignment')
					}}
				>
					Suivant
				</ButtonBottomScreen>
			</div>
    </Screen>
  );
}

export default CreateCharacterDetailsScreen;
