import { useRouter } from 'next/router'
import Screen from "../../../../../../components/Screen";
import useSubrace from '../../../../../../modules/api/useSubrace';
import useI18n from '../../../../../../modules/i18n/useI18n';
import SubraceDetailsView from '../../../../../../components/subraces/SubraceDetailsView';
import ButtonBottomScreen from '../../../../../../components/ButtonBottomScreen';

function SubraceDetailScreen() {
	const { tr } = useI18n()
	const router = useRouter()
	const raceResponse = useSubrace(router.query.subrace || 'high-elf') // TODO:

	const subrace = raceResponse.data

	return (
		<Screen
			title={tr(subrace?.nameLocalized)}
			isLoading={raceResponse.isLoading}
		>
			{subrace && (
				<div className="flex flex-col">
					<div className="relative w-full px-4 mt-12">
						<SubraceDetailsView subrace={subrace.index} />
					</div>

					<ButtonBottomScreen 
						variant="cta"
						onClick={() => {
							router.push('/character/create/choose-class')
						}}
					>
						Choisir
					</ButtonBottomScreen>
				</div>
			)}
		</Screen>
  );
}

export default SubraceDetailScreen;
