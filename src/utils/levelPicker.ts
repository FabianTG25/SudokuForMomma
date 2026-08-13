import { Level } from "../types";

export function pickRandomUnplayed(
  levels: Level[],
  played: string[],
): Level | null {
  const pool = levels.filter((l) => !played.includes(l.id));
  if (pool.length === 0) return null;
  const idx = Math.floor(Math.random() * pool.length);
  return pool[idx];
}
