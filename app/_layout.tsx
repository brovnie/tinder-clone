import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";

import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/use-color-scheme";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthProvider, useAuth } from "@/hooks/useAuth";
import { View, Text } from "react-native";
import AppRoutes from "./AppRoutes";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <AuthProvider>
        <SafeAreaView
          style={{
            backgroundColor:
              colorScheme === "dark"
                ? DarkTheme.colors.background
                : DefaultTheme.colors.background,
          }}
        />
        <AppRoutes />
        <StatusBar style="auto" />
      </AuthProvider>
    </ThemeProvider>
  );
}
