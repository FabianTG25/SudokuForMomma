import { useGame } from "@/context/GameContext";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const Numpad: React.FC = () => {
  const { dispatch, state } = useGame();

  function pressNumber(n: number) {
    if (!state.selected) return;
    dispatch({
      type: "INSERT_NUMBER",
      row: state.selected.row,
      col: state.selected.col,
      value: n,
    });
  }

  function pressDelete() {
    if (!state.selected) return;
    dispatch({
      type: "INSERT_NUMBER",
      row: state.selected.row,
      col: state.selected.col,
      value: null,
    });
  }

  function togglePencil() {
    dispatch({ type: "TOGGLE_PENCIL" });
  }

  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {numbers.map((n) => (
          <TouchableOpacity
            key={n}
            style={styles.key}
            onPress={() => pressNumber(n)}
          >
            <Text style={styles.keyText}>{n}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.rowButtons}>
        <TouchableOpacity style={styles.action} onPress={pressDelete}>
          <Text style={styles.keyText}>Borrar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.action} onPress={togglePencil}>
          <Text style={styles.keyText}>
            {state.pencilMode ? "Lápiz ✓" : "Lápiz"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 12 },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 8,
  },
  key: {
    width: 48,
    height: 48,
    borderRadius: 6,
    backgroundColor: "#eee",
    margin: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  keyText: { fontSize: 18 },
  rowButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  action: {
    padding: 10,
    backgroundColor: "#ddd",
    borderRadius: 6,
    flex: 1,
    marginHorizontal: 6,
    alignItems: "center",
  },
});
