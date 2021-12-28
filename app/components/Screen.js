
function ScreenLoading() {
	return (<div>LOADING</div>)
}

function Screen({ isLoading, children }) {

  if (isLoading) {
		return <ScreenLoading />
	}

	return (
		<div>
			{children}
		</div>
	)
}

export default Screen