import generateIds from "@/app/lib/generateId";
import { db } from "@/firebase";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "expo-router";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Avatar } from "react-native-paper";
import { MatchProfile } from "./types/types";

const ChatRow = ({ details }: { details: MatchProfile }) => {
  const router = useRouter();
  const [lastMessage, setLastMessage] = useState<string>("");
  const { user } = useAuth();
  useEffect(
    () =>
      onSnapshot(
        query(
          collection(
            db,
            "matches",
            generateIds(user!.uid, details.id),
            "messages"
          ),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => {
          //setLastMessage(snapshot.docs[0]))
          const message = snapshot.docs.map((doc) => doc.data())[0].message;
          setLastMessage(message);
        }
      ),
    [db, details]
  );

  return (
    <TouchableOpacity
      className="flex-row items-center px-4 py-2 bg-white dark:bg-slate-800 rounded-xl mx-3 my-2 shadow-md"
      onPress={() => {
        router.navigate({
          pathname: "/message",
          params: {
            ...details,
          },
        });
      }}
    >
      <Avatar.Image
        source={{ uri: details.photoURL }}
        size={55}
        className="mr-4"
      />
      <View className="flex-1">
        <Text className="text-lg font-semibold dark:text-white">
          {details.displayName}
        </Text>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          className="text-sm text-gray-600 dark:text-white"
        >
          {lastMessage || "Say Hi 😄"}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ChatRow;
