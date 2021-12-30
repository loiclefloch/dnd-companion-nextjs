import ClassDruid from "./ClassDruid"

function IconClass({ clss, ...props }) {
	switch (clss) {
		case 'druid':
			return <ClassDruid {...props} />

		default:
			return null
	}
}

export default IconClass