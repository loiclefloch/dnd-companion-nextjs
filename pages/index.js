import Link from "next/link"
import Screen from "../components/Screen";
import { makeI18n } from "../modules/i18n/useI18n";
import useCurrentCharacter from "../components/useCurrentCharacter";
import Button from "../components/Button";
import { useRouter } from "next/router";
import { ListSelectRowAsCard } from "../components/ListSelectRow"

const useI18n = makeI18n({
  'screen.title': {
    fr: 'Dashboard',
    en: 'Dashboard',
  },
  'title.myCharacter': {
    fr: 'Mon personnage',
    en: 'My character',
  },
  'select character': {
    fr: 'Sélectionner un personnage',
    en: 'Select a character'
  }
})

function CurrentCharacterView() {
  const { character } = useCurrentCharacter();
  const router = useRouter()
  const { tr } = useI18n()

  if (!character) {
    return (
      <div className="px-4 py-2">
        <h3 className="prose">{tr`title.myCharacter`}</h3>       
        <Link href={`/characters`}>
          <Button variant="outlined" className="mt-2">
           {tr`select character`} 
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="px-4 py-2 prose">
      <h2 className="prose">{tr`title.myCharacter`}</h2>

      <div>
        <ListSelectRowAsCard
          title={character.name}
          subtitle={
            <span>
              {tr(character.race.nameLocalized)} - {character.classes.map(clss => tr(clss.nameLocalized)).join(', ')}
            </span>
          }
          selected
          onClick={() => router.push(`character/${character.id}`)}
        />
      </div>
    </div>
  )
}

function IndexScreen() {
  const { tr } = useI18n()

  return (
    <Screen
      title={tr`screen.title`}
      root
    >
      <CurrentCharacterView />
    </Screen>
  );
}

export default IndexScreen;
