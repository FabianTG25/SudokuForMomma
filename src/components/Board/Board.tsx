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

  const selected = state.selected;

  function inSameBox(r1: number, c1: number, r2: number, c2: number) {
    return (
      Math.floor(r1 / 3) === Math.floor(r2 / 3) &&
      Math.floor(c1 / 3) === Math.floor(c2 / 3)
    );
  }

  const selectedValue = selected
    ? board[selected.row][selected.col].value
    : null;

  return (
    <View style={styles.container}>
      {board.map((row, rIdx) => (
        <View key={rIdx} style={styles.row}>
          {row.map((cell, cIdx) => {
            const isSelected =
              !!selected && selected.row === rIdx && selected.col === cIdx;
            const highlight =
              !!selected &&
              (selected.row === rIdx ||
                selected.col === cIdx ||
                inSameBox(selected.row, selected.col, rIdx, cIdx));
            const sameValue =
              selectedValue !== null &&
              cell.value === selectedValue &&
              !isSelected;
            return (
              <CellComponent
                key={`${rIdx}-${cIdx}`}
                row={rIdx}
                col={cIdx}
                value={cell.value}
                given={cell.given}
                selected={isSelected}
                highlighted={highlight}
                sameValue={sameValue}
                onPress={() => handlePress(rIdx, cIdx)}
              />
            );
          })}
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
