import MenuButton from "@/components/MenuButton";
import { useRouter } from "expo-router";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MainMenu() {
  const router = useRouter();
  return (
    <ImageBackground
      source={require("@/assets/images/tutorial-web.png")}
      resizeMode="cover"
      style={styles.bg}
      imageStyle={{ opacity: 0.12 }}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.headerImage} />
        <View style={styles.inner}>
          <Text style={styles.title}>Sudoku for Momma</Text>
          <Text style={styles.subtitle}>
            Relájate y disfruta — elige una opción
          </Text>

          <View style={styles.menu}>
            <MenuButton
              label="Jugar"
              iconName="play-arrow"
              onPress={() => router.push("/level-select")}
            />
            <MenuButton
              label="Explorar Niveles"
              iconName="grid-on"
              onPress={() => router.push("/explore")}
            />
            <MenuButton
              label="Ajustes"
              iconName="settings"
              onPress={() => router.push("/settings")}
            />
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1 },
  container: { flex: 1, alignItems: "center", backgroundColor: "#FAF8F5" },
  headerImage: {
    flex: 0.2,
    width: "100%",
    backgroundColor: "#5D4037",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  inner: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  title: { fontSize: 34, fontWeight: "800", color: "#4A3B2F", marginTop: 24 },
  subtitle: { fontSize: 14, color: "#6d5448", marginBottom: 24 },
  menu: { width: "100%", maxWidth: 420, alignItems: "center" },
});
