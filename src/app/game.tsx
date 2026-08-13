import { Board } from "@/components/Board/Board";
import { Numpad } from "@/components/Numpad/Numpad";
import { useGame } from "@/context/GameContext";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function GameScreen() {
  const { state } = useGame();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          {state.currentLevel ? state.currentLevel.id : "No level"}
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
  container: { flex: 1, padding: 16 },
  header: { alignItems: "center", marginBottom: 12 },
  title: { fontSize: 18, fontWeight: "700" },
  boardWrapper: { alignItems: "center", justifyContent: "center" },
});
