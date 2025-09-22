import { Colors } from "@/constants/theme";
import { useColorScheme, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";

const LoginForm = () => {
  const colorScheme = useColorScheme();
  return (
    <View className="flex-col w-full gap-3 justify-center">
      <Text className="text-4xl border-red-400 border-b-8 py-1 my-3 mx-auto items-center">
        Sing in
      </Text>
      <TextInput
        label="Email"
        mode="outlined"
        placeholder="joe.doe@email.com"
        placeholderTextColor={Colors[colorScheme ?? "light"].inputBorder}
        onChangeText={() => {}}
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
        placeholder="************"
        placeholderTextColor={Colors[colorScheme ?? "light"].inputBorder}
        onChangeText={() => {}}
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
      <Button
        mode="contained"
        className="mt-3"
        contentStyle={{ height: 50 }}
        onPress={() => console.log("Pressed")}
        buttonColor={Colors[colorScheme ?? "light"].button}
      >
        Sing in
      </Button>
    </View>
  );
};

export default LoginForm;
