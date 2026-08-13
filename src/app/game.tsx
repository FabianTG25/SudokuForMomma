import { Board } from "@/components/Board/Board";
import { Numpad } from "@/components/Numpad/Numpad";
import { useGame } from "@/context/GameContext";
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function GameScreen() {
  const { state, dispatch } = useGame();

  React.useEffect(() => {
    console.log("game screen mounted, currentLevel=", state.currentLevel?.id);
  }, [state.currentLevel]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>
            {state.currentLevel ? state.currentLevel.id : "No level"}
          </Text>
          <Text style={styles.subtitle}>
            {state.currentLevel?.difficulty ?? ""}
          </Text>
        </View>
        <View style={styles.rightHeader}>
          <Text
            style={[styles.pill, state.pencilMode ? styles.pillActive : null]}
          >
            {state.pencilMode ? "Lápiz" : "Números"}
          </Text>
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={() => dispatch({ type: "CONFIRM_BOARD" })}
          >
            <Text style={styles.confirmText}>Confirmar</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.boardWrapper}>
        <Board />
      </View>
      <Numpad />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: {
    alignItems: "center",
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: { fontSize: 20, fontWeight: "800" },
  subtitle: { fontSize: 12, color: "#666" },
  rightHeader: { justifyContent: "center", alignItems: "center" },
  pill: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
  },
  pillActive: {
    backgroundColor: "#dfefff",
    borderWidth: 1,
    borderColor: "#86a8ff",
  },
  confirmButton: {
    marginTop: 8,
    backgroundColor: '#3b82f6',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  confirmText: { color: '#fff', fontWeight: '700' },
  boardWrapper: { alignItems: "center", justifyContent: "center" },
});
