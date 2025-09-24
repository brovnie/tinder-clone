import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { AuthType } from "./types/types";
import Btn from "./ui/button";
import FieldInput from "./ui/field-input";

export type AuthFormType = {
  type: AuthType;
};

const AuthForm = ({ type }: AuthFormType) => {
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const { signUpOrLogin, error } = useAuth();

  return (
    <View className="flex-col w-full gap-3 justify-center">
      <Text className="text-4xl border-red-400 dark:border-rose-900 border-b-8 py-1 my-3 mx-auto items-center">
        {type === "login" ? "Sing in" : "Sign up"}
      </Text>
      {error && (
        <Text className="bg-red-300 dark:bg-red-800 rounded-sm p-3">
          {error}
        </Text>
      )}
      <FieldInput
        label="Email"
        placeholder="joe.doe@email.com"
        onChangeText={(text) => setEmail(text)}
        error={error}
      />
      <FieldInput
        label="Password"
        placeholder="********"
        onChangeText={(text) => setPassword(text)}
        error={error}
        secureTextEntry
      />
      <View className="mt-3">
        <Btn
          onPress={() => signUpOrLogin({ email, password, authType: type })}
          text={type === "login" ? "Sing in" : "Sign up"}
        />
      </View>
    </View>
  );
};

export default AuthForm;
