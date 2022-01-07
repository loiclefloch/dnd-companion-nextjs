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
				className="w-full h-full bg-slate-900"
			>
				<div style={{ backgroundImage: `url("${diceBackground.src}")` }} className="w-full h-full bg-center bg-cover" />
				<div className="absolute flex flex-col justify-center w-full top-1/4">
					<h4 className="w-full text-2xl font-semibold text-center text-white">
						404
					</h4>
					<h5 className="mt-2 font-semibold text-center text-white">
						Le jet d'Investigation a échoué
					</h5>
				</div>
			</div>
		</Screen>
	)
}
