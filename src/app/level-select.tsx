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
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => startLevel(item)}>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>{item.id}</Text>
              <Text style={styles.cardSubtitle}>{item.difficulty}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#FAF8F5" },
  title: { fontSize: 20, marginBottom: 12, color: "#3E2723" },
  list: { paddingBottom: 24 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  cardTitle: { fontSize: 16, fontWeight: "700", color: "#3E2723" },
  cardSubtitle: { fontSize: 12, color: "#6d5448", marginTop: 4 },
});
