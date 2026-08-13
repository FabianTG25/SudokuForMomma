import { DefaultTheme, ThemeProvider } from "expo-router";

import AppTabs from "@/components/app-tabs";
import { GameProvider } from "@/context/GameContext";

export default function TabLayout() {
  return (
    <ThemeProvider value={DefaultTheme}>
      <GameProvider>
        <AppTabs />
      </GameProvider>
    </ThemeProvider>
  );
}
