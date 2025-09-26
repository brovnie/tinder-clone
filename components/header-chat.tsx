import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
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
      </View>
    </Appbar.Header>
  );
};

export default HeaderChat;
