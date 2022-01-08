import { useRouter } from 'next/router'
import Screen from "../../components/Screen";
import useClass from '../../modules/api/useClass';
import useI18n from '../../modules/i18n/useI18n';
import ClassDetailsView from '../../components/classes/ClassDetailsView';

function Clss() {
	const { tr } = useI18n()
	const router = useRouter()
	const clssResponse = useClass(router.query.classIndex)

	const clss = clssResponse.data

	return (
		<Screen
			title={tr(clss?.nameLocalized)}
			isLoading={clssResponse.isLoading}
			withBottomSpace
		>
			{clss && (
				<div className="flex flex-col">
					<div className="relative w-full px-4 mt-12">
						<ClassDetailsView clss={clss.index} />
					</div>
				</div>
			)}
		</Screen>
  );
}

export default Clss;
