import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { Avatar } from "react-native-paper";
import { MatchProfile } from "./types/types";

const ChatRow = ({ details }: { details: MatchProfile }) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => {
        router.navigate({
          pathname: "/message",
          params: {
            ...details,
          },
        });
      }}
      className="flex-row shadow-md bg-white dark:bg-slate-800 rounded-lg mx-3 my-1 py-3"
    >
      <Avatar.Image
        source={{ uri: details.photoURL }}
        size={55}
        className="mx-4"
      />
      <View>
        <Text className="dark:text-white font-semibold text-xl">
          {details.displayName}
        </Text>
        <Text className="dark:text-white">Say Hi 😄</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ChatRow;
