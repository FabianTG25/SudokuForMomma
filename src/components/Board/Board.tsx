import { useGame } from "@/context/GameContext";
import React from "react";
import { StyleSheet, View, useWindowDimensions } from "react-native";
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

  const { width } = useWindowDimensions();
  const maxBoardWidth = Math.min(width - 32, 540); // keep margin
  const boardPadding = 6;
  const cellSize = Math.floor((maxBoardWidth - boardPadding * 2) / 9);

  const conflicts = React.useMemo(() => {
    const s = new Set<string>();
    const size = board.length;
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        const v = board[r][c].value;
        if (v == null) continue;
        // row
        for (let cc = 0; cc < size; cc++) {
          if (cc === c) continue;
          if (board[r][cc].value === v) {
            s.add(`${r}-${c}`);
            s.add(`${r}-${cc}`);
          }
        }
        // column
        for (let rr = 0; rr < size; rr++) {
          if (rr === r) continue;
          if (board[rr][c].value === v) {
            s.add(`${r}-${c}`);
            s.add(`${rr}-${c}`);
          }
        }
        // box
        const br = Math.floor(r / 3) * 3;
        const bc = Math.floor(c / 3) * 3;
        for (let rr = br; rr < br + 3; rr++) {
          for (let cc = bc; cc < bc + 3; cc++) {
            if (rr === r && cc === c) continue;
            if (board[rr][cc].value === v) {
              s.add(`${r}-${c}`);
              s.add(`${rr}-${cc}`);
            }
          }
        }
      }
    }
    return s;
  }, [board]);

  return (
    <View style={[styles.container, { width: cellSize * 9 }]}>
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
                notes={cell.notes}
                selected={isSelected}
                highlighted={highlight}
                conflict={conflicts.has(`${rIdx}-${cIdx}`)}
                confirmed={cell.confirmed}
                incorrect={cell.incorrect}
                sameValue={sameValue}
                size={cellSize}
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
    alignSelf: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#5D4037",
    padding: 0,
  },
  row: {
    flexDirection: "row",
  },
});
