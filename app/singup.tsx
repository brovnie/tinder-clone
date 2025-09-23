import AuthForm from "@/components/auth-form";
import { Link } from "expo-router";
import { Text, View } from "react-native";

const SignUp = () => {
  return (
    <View className="mx-10 ">
      <AuthForm type="signUp" />
      <Link href="/login">
        <Text className="dark:text-white">
          Go back to <Text>Login</Text>
        </Text>
      </Link>
    </View>
  );
};

export default SignUp;
