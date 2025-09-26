import HeaderChat from "@/components/header-chat";
import ReceiverMessage from "@/components/message-receiver";
import SenderMessage from "@/components/message-sender";
import { MatchProfile, SingleMessage } from "@/components/types/types";
import FieldInput from "@/components/ui/field-input";
import { Colors } from "@/constants/theme";
import { db } from "@/firebase";
import { useAuth } from "@/hooks/useAuth";
import { AntDesign } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  useColorScheme,
  View,
} from "react-native";
import generateIds from "../lib/generateId";

const Message = () => {
  const { params } = useRoute() as { params: MatchProfile };
  const [input, setInput] = useState<string>("");
  const colorScheme = useColorScheme();
  const [messages, setMessages] = useState<SingleMessage[] | []>([]);
  const { user } = useAuth();
  const inputRef = useRef<TextInput>(null);

  const matchId = user ? generateIds(params?.id, user.uid) : "";

  useEffect(() => {
    if (!user) return;
    onSnapshot(
      query(
        collection(db, "matches", matchId, "messages"),
        orderBy("timestamp", "desc")
      ),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          message: doc.data().message as string,
          photoURL: doc.data().photoURL as string,
        }));
        setMessages(data);
      }
    );
  }, [db, params]);

  const sendMessage = async () => {
    if (!user || !input.trim()) return;

    try {
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const { photoURL } = userDoc.data();

        addDoc(collection(db, "matches", matchId, "messages"), {
          timestamp: serverTimestamp(),
          userId: user.uid,
          displayName: user.displayName,
          photoURL,
          message: input,
        });

        inputRef.current?.blur();
        setInput("");
        inputRef.current?.clear();
      } else {
        console.log("No user document found");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

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
            className="flex-1 pl-4 "
            data={messages}
            inverted={true}
            keyExtractor={(item: any) => item.id}
            renderItem={({ item }) => {
              return item.id === user?.uid ? (
                <SenderMessage key={item.id} message={item} />
              ) : (
                <ReceiverMessage key={item.id} message={item} />
              );
            }}
          />
        </TouchableWithoutFeedback>

        <View className=" py-5 flex-row items-center bg-white dark:bg-black">
          <View className="flex-1 mx-3">
            <FieldInput
              error=""
              label=""
              placeholder="Enter your message"
              onChangeText={(text) => {
                setInput(text);
              }}
              onSubmitEditing={sendMessage}
              inputRef={inputRef}
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
