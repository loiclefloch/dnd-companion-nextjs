import { useRouter } from 'next/router'
import ButtonBottomScreen from "../../../components/ButtonBottomScreen";
import Screen from "../../../components/Screen";

function CreateCharacterScreen() {
	const router = useRouter()
  return (
    <Screen
      title={"Nouveau personnage"}
    >
			<div className="flex flex-col">

				{/* TODO: name generator */}
				<div className="relative w-full px-4 mt-12">
					<input 
						type="text"
						className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-1 px-2 bg-white text-gray-700 
						placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-1 focus:ring-slate-400 focus:border-transparent"
						name="name"
						placeholder="Your name" 
					/>
				</div>
				<ButtonBottomScreen 
					variant="cta"
					onClick={() => {
						router.push('/character/create/choose-race')
					}}
				>
					Suivant
				</ButtonBottomScreen>
			</div>
    </Screen>
  );
}

export default CreateCharacterScreen;
