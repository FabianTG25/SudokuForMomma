import { useGame } from "@/context/GameContext";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Cell as CellComponent } from "./Cell";

export const Board: React.FC = () => {
  const { state, dispatch } = useGame();
  const board = state.board;

  function handlePress(r: number, c: number) {
    dispatch({ type: "SELECT_CELL", row: r, col: c });
  }

  return (
    <View style={styles.container}>
      {board.map((row, rIdx) => (
        <View key={rIdx} style={styles.row}>
          {row.map((cell, cIdx) => (
            <CellComponent
              key={`${rIdx}-${cIdx}`}
              row={rIdx}
              col={cIdx}
              value={cell.value}
              given={cell.given}
              selected={
                !!state.selected &&
                state.selected.row === rIdx &&
                state.selected.col === cIdx
              }
              onPress={() => handlePress(rIdx, cIdx)}
            />
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 2,
  },
  row: {
    flexDirection: "row",
    gap: 2,
  },
});
