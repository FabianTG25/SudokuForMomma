import { useGame } from "@/context/GameContext";
import easy from "@/data/levels/easy.json";
import hard from "@/data/levels/hard.json";
import medium from "@/data/levels/medium.json";
import { useRouter } from "expo-router";
import {
    FlatList,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity
} from "react-native";

const LEVELS_BY_DIFFICULTY = { easy, medium, hard } as const;

export default function LevelSelectScreen() {
  const { dispatch } = useGame();
  const router = useRouter();

  function startLevel(level: any) {
    dispatch({ type: "LOAD_LEVEL", level });
    dispatch({ type: "MARK_PLAYED", levelId: level.id });
    router.push("/game");
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Select Level</Text>
      <FlatList
        data={[...easy, ...medium, ...hard]}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => startLevel(item)}
          >
            <Text style={styles.itemText}>
              {item.id} — {item.difficulty}
            </Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 20, marginBottom: 12 },
  item: { padding: 12, borderBottomWidth: 1, borderColor: "#eee" },
  itemText: { fontSize: 14 },
});
