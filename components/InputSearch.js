import { useState, useRef } from "react"
import ClickAwayListener from 'react-click-away-listener'
import isEmpty from "lodash/isEmpty"
import IconClock from "./icons/IconClock"
import IconX from "./icons/IconX"
import clsx from "clsx"

function InputSearch({ searchHistory, onRemoveHistoryQuery, className, term, onChange }) {
	const [showHistory, setShowHistory] = useState(false)
	const inputRef = useRef()

	return (
		<div className={clsx("flex items-center sticky", "sticky top-0 pb-2 bg-app z-20", className)}>
			<div 
				className={clsx(`relative w-full flex text-left bg-white shadow-md cursor-default 
				focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white 
			focus-visible:ring-offset-teal-300 focus-visible:ring-offset-2 sm:text-sm overflow-hidden
 				items-center
			`,
					{
						"rounded-b-none": showHistory,
						"rounded-lg": !showHistory
					}
				)}
			>
				<input
					ref={inputRef}
					type="text"
					placeholder="Rechercher"
					className={clsx("w-full py-1 px-2 border-gray-300 text-sm rounded-md",
						"focus:border-gray-600 border-none focus:ring-0 pl-3 leading-5 text-gray-900",
					)}
					value={term}
					onChange={e => onChange(e.target.value)}
				/>

				<span onClick={() => onChange("")}>
					<IconX className="w-4 h-4 text-slate-600 ml-1.5 mr-1" />
				</span>

				<span onClick={(e) => { 
					setShowHistory(!showHistory)
				}}>
					<IconClock className="text-slate-600 ml-1.5 mr-3" />
				</span>
			</div>

			{showHistory && (
				<ClickAwayListener 
					onClickAway={(e) => {
						setShowHistory(false)
						e.preventDefault() // avoid messing with IconClock
					}}
				>
					<div
						className="px-4 absolute w-full z-20 right-0"
						style={{ top: inputRef.current.getBoundingClientRect().top - 20, }}
					>
						<div className="divide divide-y px-4 bg-white shadow-lg rounded-b-md pt-1">
							{isEmpty(searchHistory) ? (
								<div>
									Pas d'historique
								</div>
							) : (
								searchHistory.map((query, index) => (
									<div
										key={index}
										className="py-2 leading-5 text-sm flex justify-between"
										
									>
										<div
											className="flex-1"
											onClick={() => {
												onChange(query)
												setShowHistory(false)
											}}
										>
											{query}
										</div>
										<div>
											<IconX 
											 className="w-4 h-4 text-slate-400"
												onClick={() => onRemoveHistoryQuery(query)} 
											/>
										</div>
									</div>
								))
							)}
						</div>
					</div>
				</ClickAwayListener>
			)}
		</div>
	)
}

export default InputSearch