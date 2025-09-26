import { Colors } from "@/constants/theme";
import { Foundation, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, useColorScheme, View } from "react-native";
import { Appbar } from "react-native-paper";

type HeaderChatTypes = {
  title: string;
  callEnabled?: boolean;
};

const HeaderChat = ({ title, callEnabled }: HeaderChatTypes) => {
  const colorScheme = useColorScheme();
  const router = useRouter();
  return (
    <Appbar.Header>
      <View className="w-full justify-between items-center flex-row">
        <View className="flex-row items-center">
          <TouchableOpacity
            onPress={() => {
              if (title === "Chat") {
                router.back();
              } else {
                router.navigate("/chat");
              }
            }}
          >
            <Ionicons
              name="chevron-back-outline"
              size={34}
              color={Colors[colorScheme ?? "light"].button}
            />
          </TouchableOpacity>
          <Text className="text-2xl font-bold pl-2 dark:text-white">
            {title}
          </Text>
        </View>
        <TouchableOpacity className="rounded-full mr-4 w-14 h-14 bg-red-400 dark:bg-red-800 items-center justify-center">
          <Foundation
            name="telephone"
            size={32}
            color={colorScheme === "light" ? "white" : "black"}
          />
        </TouchableOpacity>
      </View>
    </Appbar.Header>
  );
};

export default HeaderChat;
