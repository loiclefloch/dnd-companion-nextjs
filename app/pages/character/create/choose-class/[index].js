import { useRouter } from 'next/router'
import Screen from "../../../../components/Screen";
import useClass from '../../../../modules/api/useClass';
import useI18n from '../../../../modules/i18n/useI18n';
import ClassDetailsView from '../../../../components/classes/ClassDetailsView';
import ButtonBottomScreen from '../../../../components/ButtonBottomScreen';

function DisplayCharacterClass() {
	const { tr } = useI18n()
	const router = useRouter()
	const clssResponse = useClass(router.query.index || 'druid') // TODO:

	const clss = clssResponse.data

	return (
		<Screen
			title={tr(clss?.nameLocalized)}
			isLoading={clssResponse.isLoading}
		>
			{clss && (
				<div className="flex flex-col">
					<div className="relative w-full px-4 mt-12">
						<ClassDetailsView clss={clss.index} />
					</div>

					<ButtonBottomScreen 
						variant="cta"
						onClick={() => {
							router.push('/character/create/stats')
						}}
					>
						Choisir
					</ButtonBottomScreen>
				</div>
			)}
		</Screen>
  );
}

export default DisplayCharacterClass;