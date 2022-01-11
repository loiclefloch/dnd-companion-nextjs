import { isEmpty } from 'lodash';
import { useRouter } from 'next/router'
import { useState } from 'react';
import ButtonBottomScreen from "../../../components/ButtonBottomScreen";
import Screen from "../../../components/Screen";
import useCreateCharacter from "../../../components/useCreateCharacter"

function Form() {
	const router = useRouter()
	const { character, updateCharacter } = useCreateCharacter()
	const [ name, setName ] = useState(character?.name || '')

	const formHasErrors = isEmpty(name)

	return (
		<div className="flex flex-col">

			{/* TODO: name generator */}
			<div className="relative w-full px-4 mt-12">
				<input
					type="text"
					className="flex-1 w-full px-2 py-1 text-base text-gray-700 placeholder-gray-400 bg-white border border-transparent border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-1 focus:ring-slate-400 focus:border-transparent"
					name="name"
					placeholder="Your name"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>

			</div>

			<ButtonBottomScreen
				// TODO:
				// disabled={formHasErrors}
				variant="cta"
				onClick={() => {
					updateCharacter({ name, step: 'initial', url: '/character/create/choose-race' })
				}}
			>
				Suivant
			</ButtonBottomScreen>
		</div>
	)
}

function CreateCharacterScreen() {
  return (
    <Screen
      title={"Nouveau personnage"}
    >
			<Form />
    </Screen>
  );
}

export default CreateCharacterScreen;
