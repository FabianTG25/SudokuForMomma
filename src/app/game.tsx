import { Board } from "@/components/Board/Board";
import { Numpad } from "@/components/Numpad/Numpad";
import { useGame } from "@/context/GameContext";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function GameScreen() {
  const { state } = useGame();

  React.useEffect(() => {
    console.log("game screen mounted, currentLevel=", state.currentLevel?.id);
  }, [state.currentLevel]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titleCentered}>
          {state.currentLevel
            ? `Nivel ${state.currentLevel.difficulty?.[0].toUpperCase() + state.currentLevel.difficulty?.slice(1)}`
            : "Juego"}
        </Text>
      </View>
      <View style={styles.boardWrapper}>
        <Board />
      </View>
      <Numpad />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#FAF8F5" },
  header: { alignItems: "center", marginBottom: 12 },
  titleCentered: { fontSize: 20, fontWeight: "800", color: "#3E2723" },
  boardWrapper: { alignItems: "center", justifyContent: "center" },
});
