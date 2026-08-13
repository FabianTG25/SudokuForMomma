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

 

  const PACKS = [
    { id: "pack1", title: "Mañana Tranquila", subtitle: "Modo Fácil • 70 tableros", total: 70, completed: 12, color: "#A1887F" },
    { id: "pack2", title: "Tarde de Café", subtitle: "Modo Medio • 70 tableros", total: 70, completed: 0, color: "#8D6E63" },
    { id: "pack3", title: "Expreso Doble", subtitle: "Modo Difícil • 70 tableros", total: 70, completed: 0, color: "#5D4037" },
  ];

  function handleOpenPack(pack: any) {
    // Navigate to LevelGridScreen for the pack
    router.push(`/level-grid/${pack.id}`);
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Explorar Paquetes</Text>
      <FlatList
        data={PACKS}
        keyExtractor={(p) => p.id}
        contentContainerStyle={styles.list}
        renderItem={({ item: pack }) => (
          <TouchableOpacity
            style={[styles.packCard, { borderLeftColor: pack.color }]}
            onPress={() => handleOpenPack(pack)}
            activeOpacity={0.9}
          >
            <View style={styles.packLeft}>
              <Text style={styles.packTitle}>{pack.title}</Text>
              <Text style={styles.packSubtitle}>{pack.subtitle}</Text>
            </View>
            <View style={styles.packRight}>
              <Text style={styles.packProgressText}>{`${pack.completed} / ${pack.total}`}</Text>
              <View style={styles.progressTrack}>
                <View style={[styles.progressFill, { width: `${Math.round((pack.completed / pack.total) * 100)}%`, backgroundColor: pack.color }]} />
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FAF8F5", padding: 20 },
  title: { fontSize: 20, marginBottom: 12, color: "#3E2723" },
  list: { paddingBottom: 24 },
  packCard: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    marginBottom: 16,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    borderLeftWidth: 6,
  },
  packLeft: { flex: 1 },
  packTitle: { fontSize: 20, fontWeight: "bold", color: "#3E2723", marginBottom: 4 },
  packSubtitle: { fontSize: 14, color: "#8D6E63" },
  packRight: { alignItems: "flex-end", marginLeft: 12, width: 120 },
  packProgressText: { fontSize: 16, fontWeight: "600", color: "#4A3B2F", marginBottom: 8 },
  progressTrack: { height: 4, backgroundColor: "#eee", borderRadius: 2, width: "100%", overflow: "hidden" },
  progressFill: { height: 4, backgroundColor: "#8D6E63", width: "0%" },
})
