import { useState } from 'react';
import { useRouter } from 'next/router'
import ButtonBottomScreen from "../../../components/ButtonBottomScreen";
import Screen from "../../../components/Screen";
import Textarea from '../../../components/Textarea';
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

function FormControl({ label, id, children }) {
	return (
		<div className="mb-4">
			<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={id}>
				{label}
			</label>
			{children}
		</div >
	)
}

function Input({ label, id, body, type, update }) {
	return (
		<FormControl id={id} label={label}>
			<input 
				className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
				id={id}
				type={type}
				value={body[id]}
				onChange={update(id, type)}
			/>
		</FormControl>
	)
}

function Form({ clss }) {
	const { character, updateCharacter } = useCreateCharacter()
	const [body, setBody] = useState({ ...character.body })

	const update = (key, type = 'text') => e => {
		setBody({
			...body,
			[key]: type === 'number' ? new Number(e.target.value).toString() : e.target.value
		})
	}

	return (
		<div className="flex flex-col">

			<div className="relative w-full px-4 mt-12">
				<Input 
					type="number"
					id="age"
					label="Age"
					update={update}
					body={body}
				/>
					
				<div>
					<Input 
						type="text" 
						id='genre' 
						label="Genre"
						update={update} 
						body={body}
					/>
				</div>
				<div>
					<Input 
						type="number" 
						id='height' 
						label="Taille"
						update={update} 
						body={body}
					/>
					<Input 
						type="number" 
						id='weight' 
						label="Poids"
						update={update} 
						body={body}
					/>
				</div>
				<div>
					<Input 
						type="text" 
						id='hairColor' 
						label="Couleur des cheveux"
						update={update} 
						body={body}
					/>

				</div>
				<div>
					<Input 
						type="text" 
						id='eyeColor' 
						label="Couleur des yeux"
						update={update} 
						body={body}
					/>
				</div>
				<div>
					<Input 
						type="text" 
						id='skinColor' 
						label="Couleur de la peau"
						update={update} 
						body={body}
					/>
				</div>
				
				<FormControl 
					label="Caractéristiques physiques"
					id="physicalcharacteristics"
				>
					<Textarea value={body.physicalcharacteristics} onChange={update('physicalcharacteristics')} />
				</FormControl>
			</div>
			<ButtonBottomScreen
				variant="cta"
				onClick={() => {
					updateCharacter({ body, step: 'character-details' })
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
