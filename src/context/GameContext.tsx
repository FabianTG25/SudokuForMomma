import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useReducer } from "react";
import { Board, Cell, GameState, Level } from "../types";

const ACTIVE_BOARD_KEY = "sudoku_activeBoard_v1";
const PLAYED_LEVELS_KEY = "sudoku_playedLevels_v1";

type Action =
  | { type: "LOAD_LEVEL"; level: Level }
  | { type: "SELECT_CELL"; row: number; col: number }
  | {
      type: "INSERT_NUMBER";
      row: number;
      col: number;
      value: number | null;
      pencil?: boolean;
    }
  | { type: "TOGGLE_PENCIL" }
  | { type: "MARK_PLAYED"; levelId: string }
  | { type: "CONFIRM_BOARD" }
  | { type: "SET_STATE"; state: Partial<GameState> };

const initialBoard = (): Board => {
  const b: Board = [];
  for (let r = 0; r < 9; r++) {
    const row: Cell[] = [];
    for (let c = 0; c < 9; c++) {
      row.push({ row: r, col: c, value: null, given: false, notes: [] });
    }
    b.push(row);
  }
  return b;
};

const initialState: GameState = {
  currentLevel: null,
  board: initialBoard(),
  selected: null,
  pencilMode: false,
  playedLevels: [],
};

function parsePuzzle(puzzle: string): Board {
  const board = initialBoard();
  const s = puzzle.replace(/[^0-9.]/g, "");
  for (let i = 0; i < Math.min(81, s.length); i++) {
    const ch = s[i];
    const row = Math.floor(i / 9);
    const col = i % 9;
    if (ch && ch !== "." && ch !== "0") {
      board[row][col].value = parseInt(ch, 10);
      board[row][col].given = true;
    }
  }
  return board;
}

function reducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case "LOAD_LEVEL": {
      try {
        const board = parsePuzzle(action.level.puzzle);
        console.log("LOAD_LEVEL", action.level.id);
        // mark given cells as confirmed and initialize flags
        for (let r = 0; r < 9; r++) {
          for (let c = 0; c < 9; c++) {
            if (board[r][c].given) board[r][c].confirmed = true;
            else {
              board[r][c].confirmed = false;
              board[r][c].incorrect = false;
            }
          }
        }

        return {
          ...state,
          currentLevel: action.level,
          board,
          selected: null,
          pencilMode: false,
        };
      } catch (err) {
        console.error("Error in LOAD_LEVEL", err);
        throw err;
      }
    }
    case "SELECT_CELL":
      return { ...state, selected: { row: action.row, col: action.col } };
    case "INSERT_NUMBER": {
      const { row, col, value, pencil } = action;
      const board = state.board.map((r) => r.map((c) => ({ ...c })));
      const cell = board[row][col];
      if (cell.given) return state;
      if (pencil || state.pencilMode) {
        // toggle note
        const notes = new Set(cell.notes);
        if (value === null) {
          // clear notes
          cell.notes = [];
        } else if (notes.has(value)) {
          notes.delete(value);
          cell.notes = Array.from(notes).sort();
        } else {
          notes.add(value);
          cell.notes = Array.from(notes).sort();
        }
      } else {
        // Allow tentative entry: set value, clear notes, mark unconfirmed
        cell.value = value;
        cell.notes = [];
        cell.confirmed = false;
        cell.incorrect = false;
      }
      return { ...state, board, selected: { row, col } };
    }
    case "CONFIRM_BOARD": {
      if (!state.currentLevel) return state;
      const board = state.board.map((r) => r.map((c) => ({ ...c })));
      const sol = state.currentLevel.solution.replace(/[^0-9]/g, "");
      for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
          const idx = r * 9 + c;
          const expected = idx < sol.length ? parseInt(sol[idx], 10) : null;
          const cell = board[r][c];
          if (cell.given) {
            cell.confirmed = true;
            cell.incorrect = false;
            continue;
          }
          if (cell.value === null) {
            cell.confirmed = false;
            cell.incorrect = false;
            continue;
          }
          if (expected !== null && !Number.isNaN(expected) && cell.value === expected) {
            cell.confirmed = true;
            cell.incorrect = false;
          } else {
            cell.confirmed = false;
            cell.incorrect = true;
          }
        }
      }
      // log summary
      let correct = 0;
      let incorrect = 0;
      for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
          const cell = board[r][c];
          if (cell.confirmed) correct++;
          if (cell.incorrect) incorrect++;
        }
      }
      console.log("CONFIRM_BOARD result", { correct, incorrect });
      return { ...state, board };
    }
    case "TOGGLE_PENCIL":
      return { ...state, pencilMode: !state.pencilMode };
    case "MARK_PLAYED":
      return {
        ...state,
        playedLevels: Array.from(
          new Set([...state.playedLevels, action.levelId]),
        ),
      };
    case "SET_STATE":
      return { ...state, ...action.state };
    default:
      return state;
  }
}

const GameContext = createContext<{
  state: GameState;
  dispatch: React.Dispatch<Action>;
  loadSavedState: () => Promise<void>;
} | null>(null);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Load saved state once
  const loadSavedState = async () => {
    try {
      const raw = await AsyncStorage.getItem(ACTIVE_BOARD_KEY);
      const playedRaw = await AsyncStorage.getItem(PLAYED_LEVELS_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        dispatch({ type: "SET_STATE", state: parsed });
      }
      if (playedRaw) {
        const played = JSON.parse(playedRaw) as string[];
        dispatch({ type: "SET_STATE", state: { playedLevels: played } });
      }
    } catch (err) {
      // ignore
    }
  };

  useEffect(() => {
    loadSavedState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Autosave with debounce
  useEffect(() => {
    let t: ReturnType<typeof setTimeout> | null = setTimeout(() => {
      AsyncStorage.setItem(
        ACTIVE_BOARD_KEY,
        JSON.stringify({
          currentLevel: state.currentLevel,
          board: state.board,
          selected: state.selected,
          pencilMode: state.pencilMode,
        }),
      ).catch(() => {});
      AsyncStorage.setItem(
        PLAYED_LEVELS_KEY,
        JSON.stringify(state.playedLevels),
      ).catch(() => {});
    }, 700);
    return () => {
      if (t) clearTimeout(t);
    };
  }, [
    state.currentLevel,
    state.board,
    state.selected,
    state.pencilMode,
    state.playedLevels,
  ]);

  return (
    <GameContext.Provider value={{ state, dispatch, loadSavedState }}>
      {children}
    </GameContext.Provider>
  );
};

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be used within GameProvider");
  return ctx;
}
