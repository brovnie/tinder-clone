import HeaderChat from "@/components/header-chat";
import ReceiverMessage from "@/components/message-receiver";
import SenderMessage from "@/components/message-sender";
import { MatchProfile } from "@/components/types/types";
import FieldInput from "@/components/ui/field-input";
import { Colors } from "@/constants/theme";
import { useAuth } from "@/hooks/useAuth";
import { AntDesign } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { useState } from "react";
import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  TouchableWithoutFeedback,
  useColorScheme,
  View,
} from "react-native";

const Message = () => {
  const { params } = useRoute() as { params: MatchProfile };
  const [input, setInput] = useState<string>("");
  const colorScheme = useColorScheme();
  const [messages, setMessages] = useState([]);
  const sendMessage = () => {};
  const { user } = useAuth();
  return (
    <>
      <HeaderChat
        title={params?.displayName ? params.displayName : "Message"}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS ? "padding" : "height"}
        className="flex-1"
        keyboardVerticalOffset={10}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <FlatList
            className="flex-1 pl-4"
            data={messages}
            keyExtractor={(item: any) => item.id}
            renderItem={({ item }) => {
              return item.userId === user?.uid ? (
                <SenderMessage key={item.id} message={item} />
              ) : (
                <ReceiverMessage key={item.id} message={item} />
              );
            }}
          />
        </TouchableWithoutFeedback>

        <View className="py-5 flex-row items-center bg-white dark:bg-black">
          <View className="flex-1 mx-3">
            <FieldInput
              error=""
              label=""
              placeholder="Enter your message"
              onChangeText={() => {}}
              value={input}
              onSubmitEditing={sendMessage}
            />
          </View>
          <TouchableOpacity
            onPress={sendMessage}
            className="w-12 mr-3 h-12 rounded-full items-center justify-center"
            style={{ backgroundColor: Colors[colorScheme ?? "light"].button }}
          >
            <AntDesign
              name="send"
              size={18}
              color={colorScheme === "light" ? "white" : "black"}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

export default Message;
