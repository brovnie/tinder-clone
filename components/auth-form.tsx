"use client";
import { Colors } from "@/constants/theme";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { useColorScheme, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";

type AuthType = {
  type: "login" | "signUp";
};

const AuthForm = ({ type }: AuthType) => {
  const colorScheme = useColorScheme();
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const { signUpOrLogin } = useAuth();

  return (
    <View className="flex-col w-full gap-3 justify-center">
      <Text className="text-4xl border-red-400 dark:border-rose-900 border-b-8 py-1 my-3 mx-auto items-center">
        {type === "login" ? "Sing in" : "Sign up"}
      </Text>
      <TextInput
        label="Email"
        mode="outlined"
        autoCapitalize="none"
        placeholder="joe.doe@email.com"
        placeholderTextColor={Colors[colorScheme ?? "light"].inputBorder}
        onChangeText={(text) => setEmail(text)}
        outlineColor={Colors[colorScheme ?? "light"].inputBorder} // border color when not focused
        activeOutlineColor={Colors[colorScheme ?? "light"].inputBorderFocused} // border color when focused (e.g. green)
        theme={{
          colors: {
            primary: "#4ade80", // focused color
            error: "#dc2626",
          },
        }}
        contentStyle={{ paddingHorizontal: 10 }}
      />
      <TextInput
        label="Password"
        mode="outlined"
        autoCapitalize="none"
        placeholder="************"
        placeholderTextColor={Colors[colorScheme ?? "light"].inputBorder}
        onChangeText={(text) => setPassword(text)}
        outlineColor={Colors[colorScheme ?? "light"].inputBorder}
        activeOutlineColor={Colors[colorScheme ?? "light"].inputBorderFocused}
        theme={{
          colors: {
            primary: "#4ade80",
            error: "#dc2626",
          },
        }}
        contentStyle={{ paddingHorizontal: 10 }}
        secureTextEntry
      />
      <View className="mt-3">
        <Button
          mode="contained"
          labelStyle={{ fontSize: 18 }}
          contentStyle={{ height: 50 }}
          onPress={() => signUpOrLogin({ email, password, authType: type })}
          buttonColor={Colors[colorScheme ?? "light"].button}
          textColor="white"
        >
          {type === "login" ? "Sing in" : "Sign up"}
        </Button>
      </View>
    </View>
  );
};

export default AuthForm;
