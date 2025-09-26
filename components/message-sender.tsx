import { Text, View } from "react-native";
import { Message } from "./types/types";

const SenderMessage = ({ message }: { message: Message }) => {
  return (
    <View className="rounded-lg rounded-tr-none mx-3 my-2 px-5 py-2 ml-auto self-start bg-sky-500 dark:bg-sky-800">
      <Text className="text-white">{message.message}</Text>
    </View>
  );
};

export default SenderMessage;
