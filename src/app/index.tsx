import MenuButton from "@/components/MenuButton";
import { COLORS } from "@/constants/theme";
import { useGame } from "@/context/GameContext";
import easy from "@/data/levels/easy.json";
import hard from "@/data/levels/hard.json";
import medium from "@/data/levels/medium.json";
import { useRouter } from "expo-router";
import LottieView from "lottie-react-native";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const LOTTIE_SPEED = 0.55;

export default function MainMenu() {
  const router = useRouter();
  const { state, dispatch } = useGame();

  const lastPlayedId =
    state.currentLevel?.id ||
    (state.playedLevels.length
      ? state.playedLevels[state.playedLevels.length - 1]
      : null);
  const hasPlayable = !!lastPlayedId;

  function handlePlay() {
    if (state.currentLevel) {
      router.push("/game");
      return;
    }
    if (!lastPlayedId) return;
    const pool = [...easy, ...medium, ...hard];
    const found = pool.find((l: any) => l.id === lastPlayedId);
    if (found) {
      dispatch({ type: "LOAD_LEVEL", level: found });
      dispatch({ type: "MARK_PLAYED", levelId: found.id });
      router.push("/game");
    }
  }
  return (
    <View style={styles.wrapper}>
      <LottieView
        source={require("@/assets/background-animation.json")}
        autoPlay
        loop
        speed={LOTTIE_SPEED}
        resizeMode="cover"
        style={styles.lottie}
      />
      <SafeAreaView style={styles.root}>
        <View style={styles.titleWrap}>
          <Text style={styles.title}>Sudoku for Momma</Text>
          <Text style={styles.subtitle}>
            Relájate y disfruta — elige una opción
          </Text>
        </View>

        <View style={styles.menu}>
          <MenuButton
            label="Jugar"
            iconName="play-arrow"
            onPress={handlePlay}
            disabled={!hasPlayable}
          />
          <MenuButton
            label="Explorar Niveles"
            iconName="grid-on"
            onPress={() => router.push("/level-select")}
          />
          <MenuButton
            label="Ajustes"
            iconName="settings"
            onPress={() => router.push("/settings")}
          />
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1, backgroundColor: COLORS.linen },
  lottie: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.6,
  },
  root: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  titleWrap: { marginBottom: 60, alignItems: "center" },
  title: { fontSize: 34, fontWeight: "800", color: COLORS.title },
  subtitle: { fontSize: 14, color: COLORS.subtitle, marginTop: 8 },
  menu: { width: "100%", maxWidth: 420 },
});
