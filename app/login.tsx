import { useAuth } from "@/hooks/useAuth";
import Constants from "expo-constants";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

const Login = () => {
  const { user } = useAuth();
  const isExpoGo = Constants.appOwnership === "expo";

  const [GoogleLoginButton, setGoogleLoginButton] =
    useState<React.ComponentType | null>(null);

  useEffect(() => {
    if (!isExpoGo) {
      import("@/components/google-login-button").then((module) => {
        setGoogleLoginButton(() => module.default);
      });
    }
  }, [isExpoGo]);

  return (
    <View className="flex-1 justify-center items-center">
      {GoogleLoginButton ? <GoogleLoginButton /> : null}
      {isExpoGo && <Text>Google Sign-In is not available in Expo Go.</Text>}
    </View>
  );
};

export default Login;
