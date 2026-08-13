export type Difficulty = 'easy' | 'medium' | 'hard';

export type Cell = {
  row: number;
  col: number;
  value: number | null;
  given: boolean;
  notes: number[];
};

export type Board = Cell[][]; // 9x9

export interface Level {
  id: string;
  puzzle: string; // 81 chars, '.' for empty
  solution: string; // 81 chars
  difficulty: Difficulty;
  meta?: Record<string, any>;
}

export interface GameState {
  currentLevel: Level | null;
  board: Board;
  selected: { row: number; col: number } | null;
  pencilMode: boolean;
  playedLevels: string[];
}
