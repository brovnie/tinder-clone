import AuthForm from "@/components/auth-form";
import { Colors } from "@/constants/theme";
import Constants from "expo-constants";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, Text, useColorScheme, View } from "react-native";

const Login = () => {
  const isExpoGo = Constants.appOwnership === "expo";
  const colorScheme = useColorScheme();

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
    <View className="mx-10 flex-1 justify-center">
      <AuthForm type="login" />
      <Link
        href={"/singup"}
        className="flex justify-center py-5 active:bg-slate-200 dark:active:bg-slate-800 rounded-3xl"
        asChild
      >
        <Pressable>
          <Text className="text-center text-base dark:text-white">
            Don&apos;t have an account?{" "}
            <Text
              className="font-bold"
              style={{
                color: Colors[colorScheme ?? "light"].button,
              }}
            >
              Register.
            </Text>
          </Text>
        </Pressable>
      </Link>
      {GoogleLoginButton ? <GoogleLoginButton /> : null}
      {isExpoGo && (
        <Text className="dark:text-white py-2 w-full text-center">
          Google Sign-In is not available in Expo Go.
        </Text>
      )}
    </View>
  );
};

export default Login;
