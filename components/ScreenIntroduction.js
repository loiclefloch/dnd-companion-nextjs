
function ScreenIntroduction({ title, description, actions }) {
	return (
		<div className="w-full px-4 py-5 border-b sm:px-6">
			{title && (
				<h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
					{title}
				</h3>
			)}
			<p className="max-w-2xl mt-1 text-sm text-gray-500 dark:text-gray-200">
				{description}	
			</p>
			<div>
				{actions}
			</div>
		</div>
	)
}

export default ScreenIntroduction