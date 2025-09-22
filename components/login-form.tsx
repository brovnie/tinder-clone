import { Colors } from "@/constants/theme";
import { useColorScheme, View } from "react-native";
import { Button, TextInput } from "react-native-paper";

const LoginForm = () => {
  const colorScheme = useColorScheme();
  return (
    <View className="flex-col w-full gap-3">
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
      />
      <Button
        mode="contained"
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
