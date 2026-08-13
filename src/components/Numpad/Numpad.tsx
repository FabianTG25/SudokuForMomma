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
            activeOpacity={0.7}
          >
            <Text style={styles.keyText}>{n}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.rowButtons}>
        <TouchableOpacity style={styles.action} onPress={pressDelete}>
          <Text style={styles.keyText}>Borrar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.action, state.pencilMode ? styles.actionActive : null]}
          onPress={togglePencil}
        >
          <Text style={styles.keyText}>
            {state.pencilMode ? "Lápiz ✓" : "Lápiz"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 14 },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  key: {
    width: 72,
    height: 72,
    borderRadius: 12,
    backgroundColor: "#fafafa",
    margin: 8,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  keyText: { fontSize: 22, fontWeight: "600" },
  rowButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  action: {
    padding: 12,
    backgroundColor: "#eee",
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 6,
    alignItems: "center",
  },
  actionActive: {
    backgroundColor: "#dfefff",
    borderColor: "#86a8ff",
    borderWidth: 1,
  },
});
