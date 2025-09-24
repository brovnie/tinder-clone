import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { PaperProvider } from "react-native-paper";

import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/use-color-scheme";
import { AuthProvider } from "@/hooks/useAuth";
import * as SystemUI from "expo-system-ui";
import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import "../global.css";
import AppRouter from "./AppRouter";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    SystemUI.setBackgroundColorAsync(
      colorScheme === "dark"
        ? DarkTheme.colors.background
        : DefaultTheme.colors.background
    );
  }, [colorScheme]);
  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <PaperProvider>
        <AuthProvider>
          <SafeAreaView
            style={{
              flex: 1,
              backgroundColor:
                colorScheme === "dark"
                  ? DarkTheme.colors.background
                  : DefaultTheme.colors.background,
            }}
            edges={["left", "right", "bottom"]}
          >
            <AppRouter />
            <StatusBar style="auto" />
          </SafeAreaView>
        </AuthProvider>
      </PaperProvider>
    </ThemeProvider>
  );
}
