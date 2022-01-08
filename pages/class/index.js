import { useRouter } from 'next/router'
import Link from "next/link"
import Screen from "../../components/Screen";
import useClasses from '../../modules/api/useClasses';
import useI18n from '../../modules/i18n/useI18n';
import { ListSelectRowAsCard, ListRowSelectContainer } from "../../components/ListSelectRow"
import IconRace from "../../components/icons/IconRace"

function ClassRow({ clss }) {
	const { tr } = useI18n()
	const router = useRouter()
	const url =  `/class/${clss.index}`

	return (
		<ListSelectRowAsCard
			size="small"
			onClick={() => router.push(url)}
			icon={<IconRace clss={clss.index} className="h-8 fill-slate-600" />}
			title={tr(clss.nameLocalized)}
			subtitle={tr(clss.resume)}
		/>
	)
}

function Race() {
	const classResponse = useClasses()

  return (
    <Screen
      title={"Les classes"}
			isLoading={classResponse.isLoading}
			withBottomSpace
    >
			<div className="flex flex-col">

				<ListRowSelectContainer className="px-4 mt-4">
					{classResponse.data?.map(clss => (
						<>
							<ClassRow key={`class_${clss.index}`} clss={clss} />
						</>
					))}
				</ListRowSelectContainer>
			</div>
    </Screen>
  );
}

export default Race;
