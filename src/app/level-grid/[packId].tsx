import { useGame } from "@/context/GameContext";
import { MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LevelGridScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const { dispatch } = useGame();
  const packId = String(params.packId ?? "pack1");

  // Mock: generate 70 levels for the pack
  const levels = Array.from({ length: 70 }).map((_, i) => ({
    id: `${packId}-${String(i + 1).padStart(3, "0")}`,
  }));

  function startLevel(level: any) {
    dispatch({ type: "LOAD_LEVEL", level });
    dispatch({ type: "MARK_PLAYED", levelId: level.id });
    router.push("/game");
  }

  const PACK_TITLES: Record<string, string> = {
    pack1: "Mañana Tranquila",
    pack2: "Tarde de Café",
    pack3: "Expreso Doble",
  };

  const packTitle = PACK_TITLES[packId] ?? packId;

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <MaterialIcons name="arrow-back" size={24} color="#8D6E63" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{packTitle}</Text>
        <View style={{ width: 40 }} />
      </View>

      <FlatList
        data={levels}
        keyExtractor={(item) => item.id}
        numColumns={4}
        contentContainerStyle={styles.listContent}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => startLevel(item)}
            style={styles.levelItem}
            activeOpacity={0.8}
          >
            <Text style={styles.levelItemText}>{String(index + 1)}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#FAF8F5" },
  header: {
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: { fontSize: 22, fontWeight: "bold", color: "#4A3B2F" },
  listContent: { paddingHorizontal: 15, paddingBottom: 40 },
  header: {
    paddingTop: 10,
    paddingHorizontal: 16,
    paddingBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: { fontSize: 22, fontWeight: "bold", color: "#4A3B2F" },
  levelItem: {
    width: "21%",
    aspectRatio: 1,
    margin: "2%",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  levelItemText: { fontSize: 24, fontWeight: "600", color: "#5D4037" },
});
