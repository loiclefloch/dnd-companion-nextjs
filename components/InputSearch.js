import { useState } from "react"
import ClickAwayListener from 'react-click-away-listener'
import isEmpty from "lodash/isEmpty"
import IconClock from "./icons/IconClock"

function InputSearch({ searchHistory, term, onChange }) {
	const [showHistory, setShowHistory] = useState(false)

	return <div className="flex">
		<input
			type="search"
			placeholder="Rechercher"
			className="w-full py-0.5 px-2 border-gray-300 rounded-md sm:text-sm"
			value={term}
			onChange={e => onChange(e.target.value)}
		/>

		<div onClick={() => setShowHistory(!showHistory)}>
			<IconClock className="text-slate-600 ml-1.5" />
		</div>
	<div>

	</div>
		{showHistory && (
			<ClickAwayListener onClickAway={() => setShowHistory(false)}>
				<div className="bg-white p-4 absolute w-3/4 z-20 shadow-lg right-4 mt-7">
					<div className="divide divide-y">
						{isEmpty(searchHistory) ? (
							<div>
								Pas d'historique
							</div>
						) : (
							searchHistory.map((query, index) => (
								<div
									key={index}
									className="py-2"
									onClick={() => {
										onChange(query)
										setShowHistory(false)
									}}
								>
									{query}
								</div>
							))
						)}
					</div>
				</div>
			</ClickAwayListener>
		)}
	</div>

}

export default InputSearch