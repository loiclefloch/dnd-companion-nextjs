import Screen from "../components/Screen";
import useContextCharacter from "../components/useContextCharacter"
import useI18n from "../modules/i18n/useI18n";

function IndexScreen() {
  const { lang } = useI18n()
  const contextCharacter = useContextCharacter()

  return (
    <Screen
      title={"Dashboard"}
      root
    >
      <div className="flex">
      </div>
    </Screen>
  );
}

export default IndexScreen;
