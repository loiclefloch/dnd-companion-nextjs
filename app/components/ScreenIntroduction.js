

function ScreenIntroduction({ title, description, actions }) {

	return (
		<div className="px-4 py-5 sm:px-6 border-b w-full">
			<h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
				{title}
			</h3>
			<p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-200">
				{description}	
			</p>
			<div>
				{actions}
			</div>
		</div>
	)
}

export default ScreenIntroduction