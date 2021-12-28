
function ScreenAsModal({ label, onCloseScreen, children }) {
	return (
		<div>
			<div>
				{label}
				<button onClick={onCloseScreen}>x</button>
			</div>
			<div>
				{children}
			</div>
		</div>
	)
}

export default ScreenAsModal