import Link from "next/link"
import Screen from "../components/Screen";
import useContextCharacter from "../components/useContextCharacter"
import useI18n from "../modules/i18n/useI18n";
import useCurrentCharacter from "../components/useCurrentCharacter";
import Button from "../components/Button";

function CurrentCharacterView() {
  const { character } = useCurrentCharacter();
  const { tr } = useI18n()

  if (!character) {
    return (
      <div className="px-4 py-2">
        <h3 className="prose">Mon personnage</h3>       
        <Link href={`/characters`}>
          <Button variant="outlined" className="mt-2">
            Sélectionner un personnage
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="px-4 py-2">
      <h3 className="prose">Mon personnage</h3>
      <div className="mt-2">
        {character.name} - lvl{character.level} - {tr(character.race.nameLocalized)}
      </div>
      <div className="flex justify-end mt-1">
        <Link href={`/character/${character.id}`}>
          <span className="text-link">Ouvrir</span>
        </Link>
      </div>
    </div>
  )
}

function IndexScreen() {
  const { lang } = useI18n()

  return (
    <Screen
      title={"Dashboard"}
      root
    >
      <CurrentCharacterView />
    </Screen>
  );
}

export default IndexScreen;
