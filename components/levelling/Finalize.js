

function Finalize({ getBuildedCharacter }) {
	const builded = getBuildedCharacter()

	return <pre>
		{JSON.stringify(builded, null, 2)}
	</pre>
}

export default Finalize