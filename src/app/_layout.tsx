import { GameProvider } from "@/context/GameContext";
import { DefaultTheme, Slot, ThemeProvider } from "expo-router";

export default function AppLayout() {
  return (
    <ThemeProvider value={DefaultTheme}>
      <GameProvider>
        <Slot />
      </GameProvider>
    </ThemeProvider>
  );
}
