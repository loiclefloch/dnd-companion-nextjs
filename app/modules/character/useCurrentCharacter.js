import classes from '../../../database/data/classes.json'

function useCurrentCharacter() {
	return {
		level: 1,
		maxSpellLevel: 1,
		classes: [
			classes.find(clss => clss.index === 'druid')
		]
	}
}

export default useCurrentCharacter