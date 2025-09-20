import { useAuth } from "@/hooks/useAuth";
import { Stack } from "expo-router";

const AppRouter = () => {
  const { user } = useAuth();
  const isLoggedIn = user !== null;

  return (
    <Stack>
      <Stack.Protected guard={!isLoggedIn}>
        <Stack.Screen name="login" options={{ headerShown: false }} />
      </Stack.Protected>

      <Stack.Protected guard={isLoggedIn}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="modal"
          options={{ presentation: "modal", title: "Modal" }}
        />
      </Stack.Protected>
    </Stack>
  );
};

export default AppRouter;
