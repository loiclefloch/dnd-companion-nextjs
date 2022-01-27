export default api => ({
	"index": "gnome",
	"name": "Gnome",
	"speed": 25,
	"ability_bonuses": [
		api.buildAbilityBonus("int", 2)
	],
	"alignment": "Gnomes are most often good. Those who tend toward law are sages, engineers, researchers, scholars, investigators, or inventors. Those who tend toward chaos are minstrels, tricksters, wanderers, or fanciful jewelers. Gnomes are good-hearted, and even the tricksters among them are more playful than vicious.",
	"age": "Gnomes mature at the same rate humans do, and most are expected to settle down into an adult life by around age 40. They can live 350 to almost 500 years.",
	"size": "Small",
	"size_description": "Gnomes are between 3 and 4 feet tall and average about 40 pounds. Your size is Small.",
	"starting_proficiencies": [],
	"languages": [
		api.buildLanguage("common"),
		api.buildLanguage("gnomish"),
	],
	"language_desc": "You can speak, read, and write Common and Gnomish. The Gnomish language, which uses the Dwarvish script, is renowned for its technical treatises and its catalogs of knowledge about the natural world.",
	"traits": [
		api.buildTrait("darkvision"),
		api.buildTrait("gnome-cunning"),
	],
	"subraces": [
		api.buildRace("rock-gnome"),
	],
})