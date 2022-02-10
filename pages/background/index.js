import { useRouter } from 'next/router'
import Screen from "../../components/Screen";
import useBackgrounds from '../../modules/api/useBackgrounds';
import useI18n from '../../modules/i18n/useI18n';
import { ListSelectRowAsCard, ListRowSelectContainer } from "../../components/ListSelectRow"
import IconAcademicCap from "../../components/icons/IconAcademicCap"

function BackgroundRow({ background }) {
	const { tr } = useI18n()
	const router = useRouter()
	const url =  `/background/${background.index}`

	return (
		<ListSelectRowAsCard
			size="small"
			onClick={() => router.push(url)}
			title={tr(background.nameLocalized)}
			subtitle={tr(background.resume)}
		/>
	)
}

function Backgrounds() {
	const backgroundsResponse = useBackgrounds()

  return (
    <Screen
      title={"Les backgrounds"}
			titleIcon={<IconAcademicCap className="w-6 h-6" />}
			isLoading={backgroundsResponse.isLoading}
			withBottomSpace
    >
			<div className="flex flex-col">

				<ListRowSelectContainer className="px-4 mt-4">
					{backgroundsResponse.data?.map(background => (
						<>
							<BackgroundRow key={`background_${background.index}`} background={background} />
						</>
					))}
				</ListRowSelectContainer>
			</div>
    </Screen>
  );
}

export default Backgrounds;
