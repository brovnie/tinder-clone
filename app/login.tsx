import AuthForm from "@/components/auth-form";
import Constants from "expo-constants";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";

const Login = () => {
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
    <View className="flex-1 justify-center items-center mx-10">
      <AuthForm type="login" />
      <Link href={"/singup"} asChild>
        <Pressable className="py-5">
          <Text className="dark:text-white">
            Don&apos;t have an account?{" "}
            <Text className="bold text-rose-500">Register now</Text>
          </Text>
        </Pressable>
      </Link>
      {GoogleLoginButton ? <GoogleLoginButton /> : null}
      {isExpoGo && (
        <Text className="dark:text-white py-2">
          Google Sign-In is not available in Expo Go.
        </Text>
      )}
    </View>
  );
};

export default Login;
