import Section from "./Section"
import Paragraph from "./Paragraph"
import useClass from '../../modules/api/useClass';

function Druid() {
	const clssResponse = useClass('druid')
	const clss = clssResponse.data

	if (!clss) {
		return null
	}

	return (
		<div>
			<div>
				<img src="https://www.dndbeyond.com/avatars/thumbnails/6/346/420/618/636272691461725405.png" />
			</div>

			<Paragraph className="mt-4">
				Holding high a gnarled staff wreathed with holly, an elf summons the fury of the storm and calls down explosive bolts of lightning to smite the torch-carrying orcs who threaten her forest.
			</Paragraph>

			<Paragraph className="mt-4">
				Crouching out of sight on a high tree branch in the form of a leopard, a human peers out of the jungle at the strange construction of a temple of Evil Elemental Air, keeping a close eye on the cultists’ activities.
			</Paragraph>

			<Paragraph className="mt-4">
				Swinging a blade formed of pure fire, a half-elf charges into a mass of skeletal soldiers, sundering the unnatural magic that gives the foul creatures the mocking semblance of life.
			</Paragraph>

			<Paragraph className="mt-4">
				Whether calling on the elemental forces of nature or emulating the creatures of the animal world, druids are an embodiment of nature’s resilience, cunning, and fury. They claim no mastery over nature. Instead, they see themselves as extensions of nature’s indomitable will.
			</Paragraph>

			<Section title="Power of nature">
				<Paragraph>
					Druids revere nature above all, gaining their spells and other magical powers either from the force of nature itself or from a nature deity. Many druids pursue a mystic spirituality of transcendent union with nature rather than devotion to a divine entity, while others serve gods of wild nature, animals, or elemental forces. The ancient druidic traditions are sometimes called the Old Faith, in contrast to the worship of gods in temples and shrines.
				</Paragraph>

				<Paragraph>
					Druid spells are oriented toward nature and animals—the power of tooth and claw, of sun and moon, of fire and storm. Druids also gain the ability to take on animal forms, and some druids make a particular study of this practice, even to the point where they prefer animal form to their natural form.
				</Paragraph>
			</Section>
<pre>
							{JSON.stringify(clss, null, 2)}
						</pre>

		</div>
	)
}

export default Druid