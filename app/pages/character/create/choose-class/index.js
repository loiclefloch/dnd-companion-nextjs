import { useRouter } from 'next/router'
import Screen from "../../../../components/Screen";
import useClasses from '../../../../modules/api/useClasses';
import useI18n from '../../../../modules/i18n/useI18n';
import { ListSelectRowAsCard, ListRowSelectContainer } from "../../../../components/ListSelectRow"
import IconClass from "../../../../components/icons/IconClass"

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
				<div className="px-4 py-5 sm:px-6 border-b w-full">
					<h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Choisissez votre classe</h3>
					<p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-200">
						De nombreuses classes existent dans le monde de Donjon & Dragons.
					</p>
					<button>En savoir plus</button>
				</div>
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
