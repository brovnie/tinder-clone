import AuthForm from "@/components/auth-form";
import { Colors } from "@/constants/theme";
import { Link } from "expo-router";
import { Pressable, Text, useColorScheme, View } from "react-native";

const SignUp = () => {
  const colorScheme = useColorScheme();

  return (
    <View className="mx-10 justify-center flex-1">
      <AuthForm type="signUp" />
      <Link
        href={"/login"}
        className="flex justify-center py-5 active:bg-slate-200 dark:active:bg-slate-800 rounded-3xl"
        asChild
      >
        <Pressable>
          <Text className="text-center text-base dark:text-white">
            Got back to{" "}
            <Text
              className="font-bold text-rose-500"
              style={{
                color: Colors[colorScheme ?? "light"].button,
              }}
            >
              login.
            </Text>
          </Text>
        </Pressable>
      </Link>
    </View>
  );
};

export default SignUp;
