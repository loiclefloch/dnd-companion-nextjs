import { useRouter } from 'next/router'
import Screen from "../../../../components/Screen";
import useClasses from '../../../../modules/api/useClasses';
import useI18n from '../../../../modules/i18n/useI18n';
import { ListSelectRowAsCard, ListRowSelectContainer } from "../../../../components/ListSelectRow"
import IconClass from "../../../../components/icons/IconClass"
import ScreenIntroduction from "../../../../components/ScreenIntroduction"

function ClassRow({ clss }) {
	const { tr } = useI18n()
	const router = useRouter()
	const url = `/character/create/choose-class/${clss.index}`

	return (
		<ListSelectRowAsCard 
			onClick={() => router.push(url)}
			icon={<IconClass clss={clss.index} className="h-8 fill-slate-600" />}
			title={tr(clss.nameLocalized)}
			subtitle={tr(clss.resume)}
		/>
	)
}

function ChooseCharacterClass() {
	const classesResponse = useClasses()

	return (
		<Screen
			title={"Choix de la classe"}
			isLoading={classesResponse.isLoading}
		>
			<div className="flex flex-col">
				<ScreenIntroduction
					title="Choisissez votre classe"
					description={`De nombreuses classes existent dans le monde de Donjon & Dragons.`}
					actions={
						<button>En savoir plus</button>
					}
				/>

				<ListRowSelectContainer className="px-4 mt-12">
					{classesResponse.data?.map(clss => (
						<ClassRow key={clss.index} clss={clss} />
					))}
				</ListRowSelectContainer>
			</div>
		</Screen>
  );
}

export default ChooseCharacterClass;
