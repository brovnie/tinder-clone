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
import { SafeAreaView } from "react-native-safe-area-context";
import AppRouter from "./AppRouter";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

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
          >
            <AppRouter />
            <StatusBar style="auto" />
          </SafeAreaView>
        </AuthProvider>
      </PaperProvider>
    </ThemeProvider>
  );
}
