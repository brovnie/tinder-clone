import { Text, View } from "react-native";
import { Avatar } from "react-native-paper";
import { Message } from "./types/types";

const ReceiverMessage = ({ message }: { message: Message }) => {
  return (
    <View className="bg-rose-500 dark:bg-rose-800 self-start rounded-lg rounded-tl-none mx-3 my-2 px-5 py-2 ml-14 relative">
      <Avatar.Image
        size={44}
        source={{ uri: message.profileURL }}
        className="absolute top-0 -left-14 "
      />
      <Text className="text-white">{message.message}</Text>
    </View>
  );
};

export default ReceiverMessage;
