import Header from "@/components/header";
import { useAuth } from "@/hooks/useAuth";
import { Stack } from "expo-router";

export const unstable_settings = {
  anchor: "(tabs)",
};

const AppRouter = () => {
  const { user } = useAuth();
  const isLoggedIn = user !== null;

  return (
    <Stack>
      <Stack.Protected guard={!isLoggedIn}>
        <Stack.Screen
          name="login"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="singup"
          options={{
            headerShown: false,
          }}
        />
      </Stack.Protected>

      <Stack.Protected guard={isLoggedIn}>
        <Stack.Screen name="(tabs)" options={{ header: () => <Header /> }} />
        <Stack.Screen
          name="modal"
          options={{ presentation: "modal", headerShown: false }}
        />
        <Stack.Screen
          name="match"
          options={{ presentation: "transparentModal", headerShown: false }}
        />
      </Stack.Protected>
    </Stack>
  );
};

export default AppRouter;
