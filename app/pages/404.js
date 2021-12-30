import Screen from "../components/Screen";
// import Image from 'next/image'

import diceBackground from "../components/img/dice_background.png"

export default function Screen404() {
	return (
		<Screen
			title={"Page not found"}
			fullScreen
			iconClassName="fill-white"
			root
		>
			<div 
				className="h-full w-full bg-slate-900"
			>
				<div style={{ backgroundImage: `url("${diceBackground.src}")` }} className="bg-cover bg-center h-full w-full" />
				<h4 className="absolute text-2xl top-1/4 text-white text-center w-full font-semibold">
					404
				</h4>
			</div>
		</Screen>
	)
}
