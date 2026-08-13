import { useGame } from "@/context/GameContext";
import { MaterialIcons } from "@expo/vector-icons";
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
    <View style={styles.controlsContainer}>
      <View style={styles.toolbar}>
        <TouchableOpacity
          style={styles.toolButton}
          onPress={() => dispatch({ type: "UNDO" })}
        >
          <MaterialIcons name="undo" size={22} color="#8D6E63" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.toolButton}
          onPress={() => dispatch({ type: "ERASE_CELL" })}
        >
          <MaterialIcons name="backspace" size={22} color="#8D6E63" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.toolButton} onPress={togglePencil}>
          <MaterialIcons name="edit" size={22} color="#8D6E63" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.toolButton}
          onPress={() => dispatch({ type: "HINT" })}
        >
          <MaterialIcons name="lightbulb" size={22} color="#8D6E63" />
        </TouchableOpacity>
      </View>

      <View style={styles.grid}>
        {numbers.map((n) => (
          <TouchableOpacity
            key={n}
            style={styles.key}
            onPress={() => pressNumber(n)}
            activeOpacity={0.85}
          >
            <Text style={styles.keyText}>{n}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  controlsContainer: { padding: 12, backgroundColor: "#FAF8F5" },
  toolbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 8,
  },
  toolButton: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  key: {
    flexBasis: "30%",
    aspectRatio: 1,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    marginBottom: 8,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 1,
  },
  keyText: { fontSize: 28, fontWeight: "600", color: "#333" },
});
