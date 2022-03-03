import Screen from "../components/Screen";
import { makeI18n } from "../modules/i18n/useI18n";
import diceBackground from "../components/img/dice_background.png"

const useI18n = makeI18n({
	'404.explain': {
		fr: `Le jet d'Investigation a échoué`,
		en: `The investigation check has failed`
	}
})

export default function Screen404() {
	const { tr } = useI18n()

	return (
		<Screen
			title={"Page not found"}
			fullScreen
			contentFull
			iconClassName="text-white"
		>
			<div 
				className="w-full h-full bg-slate-900"
			>
				<div 
					style={{ backgroundImage: `url("${diceBackground.src}")` }} 
					className="w-full h-full bg-center bg-cover" 
				/>
				<div className="absolute flex flex-col justify-center w-full top-1/4">
					<h4 className="w-full text-2xl font-semibold text-center text-white">
						404
					</h4>
					<h5 className="mt-2 font-semibold text-center text-white">
						{tr`404.explain`}
					</h5>
				</div>
			</div>
		</Screen>
	)
}
