import { useGame } from "@/context/GameContext";
import easy from "@/data/levels/easy.json";
import hard from "@/data/levels/hard.json";
import medium from "@/data/levels/medium.json";
import { useRouter } from "expo-router";
import React from "react";
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const LEVELS_BY_DIFFICULTY = { easy, medium, hard } as const;

export default function LevelSelectScreen() {
  const { dispatch } = useGame();
  const router = useRouter();

  React.useEffect(() => {
    console.log("level-select mounted");
  }, []);

  function startLevel(level: any) {
    try {
      console.log("startLevel ->", level.id);
      dispatch({ type: "LOAD_LEVEL", level });
      dispatch({ type: "MARK_PLAYED", levelId: level.id });
      router.push("/game");
      console.log("navigation attempted to game");
    } catch (err: any) {
      const msg = err?.message ?? String(err);
      console.error("startLevel error", err);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Select Level</Text>
      <FlatList
        data={[...easy, ...medium, ...hard]}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        numColumns={3}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.cardWrapper}
            onPress={() => startLevel(item)}
          >
            <View style={styles.card}>
              <Text style={styles.cardText}>{item.id}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FAF8F5" },
  title: { fontSize: 20, marginBottom: 12, color: "#3E2723", padding: 16 },
  list: { paddingBottom: 24, paddingHorizontal: 8 },
  cardWrapper: { flex: 1, margin: 8 },
  card: {
    flex: 1,
    aspectRatio: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
  },
  cardText: { fontSize: 24, color: "#5D4037", fontWeight: "700" },
});
